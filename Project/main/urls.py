from django.conf.urls import url
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
	# /
	url(r'^$', views.index, name="index"),

	url(r'^lesson/$', views.mainLesson, name="mainLesson"),

	url(r'^quiz/$', views.mainQuiz, name="mainQuiz"),

	url(r'^lesson/(?P<lesson_id>[0-9]+)/$', views.getLesson, name="getLesson"),

	url(r'^quiz/(?P<quiz_id>[0-9]+)/$', views.getQuiz, name="getQuiz"),
]

urlpatterns = format_suffix_patterns(urlpatterns)