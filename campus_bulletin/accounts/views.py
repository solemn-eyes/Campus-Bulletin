# Student views

from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from .forms import StudentCreationForm, StudentLoginForm

# Sign-up view for Students
def student_signup(request):
    if request.method == "POST":
        form = StudentCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("student_login")
    else:
        form = StudentCreationForm()
    return render(request, "accounts/signup.html", {"form": form})

# Login view for Students
def student_login(request):
    if request.method == "POST":
        form = StudentLoginForm(request.POST)
        if form.is_valid():
            admission_number = form.cleaned_data.get("admission_number")
            password = form.cleaned_data.get("password")
            student = authenticate(request, admission_number=admission_number, password=password)
            if student is not None:
                login(request, student)
                return redirect("student_dashboard")
            else:
                form.add_error(None, "Invalid admission number or password")
    else:
        form = StudentLoginForm()
    return render(request, "accounts/login.html", {"form": form})

# Logout view for Students
def student_logout(request):
    logout(request)
    return redirect("login")