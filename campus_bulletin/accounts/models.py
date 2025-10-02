from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Creating models for the Students Login/Signup

class StudentManager(BaseUserManager):
    def create_user(self, admission_number, full_name, password=None):
        if not admission_number:
            raise ValueError("Admission number is required")
        student = self.model(
            admission_number=admission_number,
            full_name=full_name
        )
        student.set_password(password)
        student.save(using=self._db)
        return student
    def create_superuser(self, admission_number, full_name, password=None):
        student = self.create_user(admission_number, full_name, password)
        student.is_admin = True
        student.save(using=self._db)
        return student
    
class Student(AbstractBaseUser):
    admission_number = models.CharField(max_length=50, unique=True)
    full_name = models.CharField(max_length=100)
    course = models.CharField(max_length=100, blank=True, null=True)
    year_of_study = models.IntegerField(blank=True, null=True)
    faculty = models.CharField(max_length=100, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = StudentManager()

    USERNAME_FIELD = 'admission_number'
    REQUIRED_FIELDS = ['full_name']

    def __str__(self):
        return f"{self.admission_number} - {self.full_name}"
    
    
