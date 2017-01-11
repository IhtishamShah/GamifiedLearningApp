from django.shortcuts import *
from django.http import *
from models import *
import json
import os.path
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

def index(request):
	return render(request, 'main/index.html')

@api_view(['POST'])
def login(request):
	if request.method == 'POST':
		# u = request.POST.get("username")
		# p = request.POST.get("password")
		return HttpResponse("Hello")

def mainLesson(request):
	return render(request, 'main/lessons.html')

def mainQuiz(request):
	return render(request, 'main/quizzes.html')	

def lessonViews(request, lesson_id):
	# lesson = Lesson.objects.get(id=lesson_id).filepath
	lesson = "/../lessons/lesson" + str(lesson_id) + ".json"
	data = (open(os.path.dirname(__file__) + lesson).read())
	return HttpResponse(data)

@api_view(['GET', 'POST'])
def quizViews(request, quiz_id):
	if request.method == 'GET':
		# quiz = Lesson.objects.get(id=quiz_id).quizfilepath
		quiz = "/../quizzes/quiz" + str(quiz) + ".json"
		data = (open(os.path.dirname(__file__) + quiz).read())
		return HttpResponse(data)