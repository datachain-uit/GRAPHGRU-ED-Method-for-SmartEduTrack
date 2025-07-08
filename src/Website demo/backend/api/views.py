from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from .models import TableProperty, QualityMetricsStudentEducation, StudentPerformance, RecommenderDataset, StudentPerformanceWeek3
from tensorflow.keras.models import load_model
from django.http import JsonResponse
import numpy as np
import pandas as pd
import joblib

model = load_model("./GRU-model/gru_week3_model.h5", compile=False)
scaler = joblib.load("./GRU-model/minmax_scaler.pkl")
numerical_columns = [
    'comment_count_week1', 'reply_count_week1', 'questions_done_week1',
    'attempts_count_week1', 'correct_answers_week1', 'total_score_week1',
    'user_watching_time_week1', 'comment_count_week2', 'reply_count_week2',
    'questions_done_week2', 'attempts_count_week2', 'correct_answers_week2',
    'total_score_week2', 'user_watching_time_week2', 'comment_count_week3',
    'reply_count_week3', 'questions_done_week3', 'attempts_count_week3',
    'correct_answers_week3', 'total_score_week3', 'user_watching_time_week3'
]
def preprocess_input(data, scaler):
    # Cột dạng số cần mapping lại từ data vào đúng numerical_columns
    column_mapping = {
        'comment_count_week1': data.get("comment_count_week1", 0),
        'reply_count_week1': data.get("reply_count_week1", 0),
        'questions_done_week1': data.get("questions_done_week1", 0),
        'attempts_count_week1': data.get("attempts_count_week1", 0),  
        'correct_answers_week1': data.get("correct_answers_week1", 0),
        'total_score_week1': data.get("total_score_week1", 0),
        'user_watching_time_week1': data.get("user_watching_time_week1", 0),

        'comment_count_week2': data.get("comment_count_week2", 0),
        'reply_count_week2': data.get("reply_count_week2", 0),
        'questions_done_week2': data.get("questions_done_week2", 0),
        'attempts_count_week2': data.get("attempts_count_week2", 0),
        'correct_answers_week2': data.get("correct_answers_week2", 0),
        'total_score_week2': data.get("total_score_week2", 0),
        'user_watching_time_week2': data.get("user_watching_time_week2", 0),

        'comment_count_week3': data.get("comment_count_week3", 0),
        'reply_count_week3': data.get("reply_count_week3", 0),
        'questions_done_week3': data.get("questions_done_week3", 0),
        'attempts_count_week3': data.get("attempts_count_week3", 0),
        'correct_answers_week3': data.get("correct_answers_week3", 0),
        'total_score_week3': data.get("total_score_week3", 0),
        'user_watching_time_week3': data.get("user_watching_time_week3", 0),
    }

    # Đưa vào DataFrame với đúng thứ tự các cột đã sử dụng khi train
    df_num = pd.DataFrame([column_mapping[col] for col in numerical_columns], index=numerical_columns).T
    numerical_scaled = scaler.transform(df_num)[0]

    # Dữ liệu dạng phân loại
    categorical_features = [
        data.get("gender", 0),
        data.get("school_encoded", 0),
        data.get("course_id_encoded", 0)
    ]

    # Trả về array cho model
    features = categorical_features + list(numerical_scaled)
    return np.array(features).reshape(1, -1, 1)

@csrf_exempt
def predict_label(request):
    if request.method == "POST":
        data = request.POST

        # Tiền xử lý input với scaler
        X_new = preprocess_input(data, scaler)

        # Dự đoán
        predictions = model.predict(X_new)
        predicted_class = int(np.argmax(predictions, axis=1)[0])
        label_mapping = {
            0: 'A',
            1: 'B',
            2: 'C',
            3: 'D',
            4: 'E'
        }
        predicted_label = label_mapping.get(predicted_class, 'Unknown')
        print("Predict label:", predicted_label)

        return JsonResponse({
            "predicted_label": predicted_label
        })

    return JsonResponse({"error": "Invalid request method"}, status=400)


@api_view(['GET'])
def get_data_propertise(request):
    data = list(TableProperty.objects.all().values())
    return Response({
        "message": "Dữ liệu từ MongoDB:",
        "data": data
    })


@api_view(['GET'])
def get_data_learner_week3(request):
    queryset = StudentPerformanceWeek3.objects.all()
    data = []
    for obj in queryset:
        d = obj.__dict__.copy()
        # Xóa trường nội bộ _state để tránh lỗi
        d.pop('_state', None)
        # Convert ObjectId sang str
        d['_id'] = str(obj._id)
        data.append(d)
    
    return Response({
        "message": "Dữ liệu từ MongoDB:",
        "data": data
    })
    
@api_view(['GET'])
def get_quality_metrics(request):
    data = list(QualityMetricsStudentEducation.objects.all().values())
    return Response({
        "message": "Dữ liệu từ MongoDB:",
        "data": data
    })
    
@api_view(['GET'])
def get_student_perf(request):
    data = list(StudentPerformance.objects.all().values())
    return Response({
        "message": "Dữ liệu từ MongoDB:",
        "data": data
    })

@api_view(['GET'])
def get_recommender_datainfo(request):
    data = list(RecommenderDataset.objects.all().values())
    return Response({
        "message": "Dữ liệu từ MongoDB:",
        "data": data
    })
# Create your views here.

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)
            
class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
