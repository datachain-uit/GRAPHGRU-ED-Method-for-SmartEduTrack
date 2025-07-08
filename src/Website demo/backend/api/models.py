from djongo import models  # Sử dụng models từ djongo thay cho django.db


class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(
        "auth.User", on_delete=models.CASCADE, related_name="notes"
    )  # Chắc chắn rằng 'User' được tham chiếu đúng

    def __str__(self):
        return self.title


class TableProperty(models.Model):
    dataset_name = models.CharField(max_length=255, null=True, blank=True)
    File = models.CharField(max_length=255, null=True, blank=True)
    missing_value_rate = models.CharField(max_length=20, null=True, blank=True)
    num_rows = models.IntegerField(null=True, blank=True)
    num_column = models.IntegerField(null=True, blank=True)
    num_duplicates = models.IntegerField(null=True, blank=True)
    data_types = models.JSONField(null=True, blank=True)

    class Meta:
        db_table = "table_properties"


class QualityMetricsStudentEducation(models.Model):
    dataset = models.CharField(max_length=100)
    completeness = models.CharField(max_length=10)
    consistency = models.CharField(max_length=10)
    evaluation = models.JSONField(default=dict)
    performance_model = models.JSONField(default=dict)

    class Meta:
        db_table = "quality_metrics_student_education"


class StudentPerformance(models.Model):
    dataset = models.CharField(max_length=100)
    label = models.JSONField(default=dict)
    missing_value_rate = models.CharField(max_length=20, null=True, blank=True)
    num_row = models.IntegerField(null=True, blank=True)
    num_column = models.IntegerField(null=True, blank=True)
    num_duplicates = models.IntegerField(null=True, blank=True)
    data_types = models.JSONField(null=True, blank=True)
    detail_column = models.JSONField(default=dict)

    class Meta:
        db_table = "raw_data_education"


class RecommenderDataset(models.Model):
    dataset_name = models.CharField(max_length=100)
    dataset_info = models.JSONField(default=dict)
    gender_rate = models.JSONField(null=True, blank=True)
    top10field = models.JSONField(default=dict)
    evaluation = models.JSONField(default=dict)
    descriptiveStatistics = models.JSONField(default=dict)

    class Meta:
        db_table = "recommender_dataset"


class StudentPerformanceWeek3(models.Model):
    _id = models.ObjectIdField(primary_key=True, editable=False)
    user_id = models.CharField(max_length=50)
    course_id = models.CharField(max_length=50)
    gender = models.IntegerField(choices=[(0, 'Male'), (1, 'Female')], null=True, blank=True)
    school = models.CharField(max_length=255)
    enroll_time = models.DateTimeField()

    # Week 1 metrics
    comment_count_week1 = models.IntegerField(default=0)
    reply_count_week1 = models.IntegerField(default=0)
    questions_done_week1 = models.IntegerField(default=0)
    attempts_count_week1 = models.IntegerField(default=0)
    correct_answers_week1 = models.IntegerField(default=0)
    total_score_week1 = models.IntegerField(default=0)
    user_watching_time_week1 = models.FloatField(default=0.0)

    # Week 2 metrics
    comment_count_week2 = models.IntegerField(default=0)
    reply_count_week2 = models.IntegerField(default=0)
    questions_done_week2 = models.IntegerField(default=0)
    attempts_count_week2 = models.IntegerField(default=0)
    correct_answers_week2 = models.IntegerField(default=0)
    total_score_week2 = models.IntegerField(default=0)
    user_watching_time_week2 = models.FloatField(default=0.0)

    # Week 3 metrics
    comment_count_week3 = models.IntegerField(default=0)
    reply_count_week3 = models.IntegerField(default=0)
    questions_done_week3 = models.IntegerField(default=0)
    attempts_count_week3 = models.IntegerField(default=0)
    correct_answers_week3 = models.IntegerField(default=0)
    total_score_week3 = models.IntegerField(default=0)
    user_watching_time_week3 = models.FloatField(default=0.0)

    # Classification
    classification = models.CharField(max_length=5)
    classification_encoded = models.IntegerField()

    # Encoded values for school and course_id
    school_encoded = models.IntegerField()
    course_id_encoded = models.IntegerField()

    class Meta:
        db_table = "student_performance_week3"