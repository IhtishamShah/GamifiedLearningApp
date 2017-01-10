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
	return HttpResponse("<h1>Hello! (say it like Reinhardt)</h1>")

def mainLesson(request):
	return render(request, 'main/lessons.html')

def mainQuiz(request):
	return render(request, 'main/quizzes.html')	

@api_view(['GET', 'POST'])
def getLesson(request, lesson_id):

	if request.method == 'GET':
		lesson = "/../lessons/lesson" + str(1) + ".json"
		data = (open(os.path.dirname(__file__) + lesson).read())
		return HttpResponse(data)

def getQuiz(request, quiz_id):
	quiz = "/../quizzes/quiz" + str(1) + ".json"
	data = (open(os.path.dirname(__file__) + quiz).read())
	return HttpResponse(data)