# This is the Sign-up and Login form for Students

from django import forms
from django.contrib.auth.forms import  UserCreationForm
from .models import Student

class StudentCreationForm(forms.ModelForm):
    password1 = forms.CharField(label="Password", widget=forms.PasswordInput)
    password2 = forms.CharField(label="Confirm Password", widget=forms.PasswordInput)

    class Meta:
        model = Student
        fields = ("admission_number", "full_name", "course", "year_of_study", "faculty")

    # Password validation logic
    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match")
        return password2
    
    def save(self, commit=True):
        student = super().save(commit=False)
        student.set_password(self.cleaned_data["password1"])
        if commit:
            student.save()
        return student

# Student login form    
class StudentLoginForm(forms.Form):
    admission_number = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)

# Student signup form using UserCreationForm
class StudentSignupForm(UserCreationForm):
    class Meta:
        model = Student
        fields = ['admission_number', 'full_name', 'password1', 'password2' ]

# Student profile update form
class StudentProfileForm(forms.ModelForm):
    class Meta:
        model = Student
        fields = ['course', 'year_of_study', 'faculty']