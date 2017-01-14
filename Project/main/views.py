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
	return render(request, 'main/test.html')

def login(request):
	if request.session.has_key("userid"):
		return HttpResponseRedirect('/quiz')
	return render(request, 'main/test.html')

@api_view(['POST'])
def logincheck(request):
	print request.session
	if request.session.has_key("userid"):
		return HttpResponseRedirect('/quiz')
	if request.method == 'POST':
		u = request.POST.get("username")
		p = request.POST.get("password")
		x = Account.objects.get(username=u)

		if (x.password == p):
			request.session["userid"] = x.id
			return HttpResponse("Hello " + x.firstname)
		else:
			return HttpResponse("Username and password do not match") 

def logout(request):
	u = Account.objects.get(id=request.session["userid"]).username
	try:
		del request.session['userid']
	except:
		pass
	return HttpResponse("<h1>" + u + " logged out!</h1>")
	
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

@api_view(['GET', 'POST'])
def leaderboardViews(request):
	if request.method == 'GET':
		obj = {}
		accounts = Account.objects.all()
		for acc in accounts:
			id = acc.id
			user = acc.username
			obj[username] = 0
			l = LessonTracker.objects.filter(account=id)
			for i in l:
				obj[username] += i.score

		return HttpResponse(obj)

	if request.method == 'POST':
		lessonId = request.POST.get("lessonId")
		score = request.POST.get("score")

		acc = Account.objects.get(id=request.session["userid"])
		lesson = Lesson.objects.get(id=lessonId)

		lt = LessonTracker()

		lt.account = acc
		lt.lesson = lesson
		lt.score = score
		lt.save()