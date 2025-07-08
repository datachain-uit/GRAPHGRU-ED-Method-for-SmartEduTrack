from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path("datapropertise/", views.get_data_propertise, name="get_data_propertise"),
    path("metrics/", views.get_quality_metrics, name="get_quality_metrics"),
    path("student_perf/", views.get_student_perf, name = "student_perf"),
    path("recommender_datainfo/", views.get_recommender_datainfo, name = "recommender_datainfo"),
    path("data_week3/", views.get_data_learner_week3, name = "data_week3"),
    path("predict/", views.predict_label, name = "predict_label"),
]