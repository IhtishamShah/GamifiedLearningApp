from django.shortcuts import *
from django.http import *
from models import *
import json
import os.path
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

def index(request):
	return render(request, 'main/quizzes.html')

@api_view(['GET', 'POST'])
def login(request):
	if request.session.has_key("userid"):
		print request.session["userid"]
		return HttpResponseRedirect('/main')

	if request.method == 'GET':	
		return render(request, 'main/test.html')

	if request.method == 'POST':
		u = request.POST.get("username")
		p = request.POST.get("password")
		x = Account.objects.get(username=u)
		if (x.password == p):
			request.session["userid"] = x.id
			return HttpResponseRedirect('/main')
		else:
			return HttpResponse(status=500)

def logout(request):
	try:
		del request.session["userid"]
	except:
		pass
	return HttpResponseRedirect('/')

@api_view(['GET'])
def lessonViews(request, lesson_id):
	if request.method == 'GET':
		lesson = Lesson.objects.get(id=lesson_id).filepath
		# lesson = "/../lessons/lesson" + str(lesson_id) + ".json"
		data = (open(os.path.dirname(__file__) + lesson).read())
		return HttpResponse(data)

@api_view(['GET', 'POST'])
def quizViews(request, quiz_id):
	if request.method == 'GET':
		quiz = Lesson.objects.get(id=quiz_id).quizfilepath
		# quiz = "/../quizzes/quiz" + str(quiz) + ".json"
		data = (open(os.path.dirname(__file__) + quiz).read())
		return HttpResponse(data)

	if request.method == 'POST':
		lessonId = request.POST.get("lessonId")
		score = request.POST.get("score")
		acc = Account.objects.get(id=request.session["userid"])
		less = Lesson.objects.get(id=lessonId)
		lts = LessonTracker.objects.filter(account=acc)

		check = False
		for l in lts:
			if lesson == l.lesson:
				check = True

		if check:
			lt = LessonTracker.objects.get(account=acc, lesson=less)
			lt.score = score
			lt.save()
		else:	
			lt = LessonTracker()
			lt.account = acc
			lt.lesson = lesson
			lt.score = score
			lt.save()

@api_view(['GET'])
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