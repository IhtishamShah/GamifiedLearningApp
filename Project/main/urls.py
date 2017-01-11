from django.conf.urls import url
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
	# /
	url(r'^$', views.index, name="index"),

	url(r'^login/$', views.login, name="login"),

	url(r'^lesson/$', views.mainLesson, name="mainLesson"),

	url(r'^quiz/$', views.mainQuiz, name="mainQuiz"),

	url(r'^lesson/(?P<lesson_id>[0-9]+)/$', views.lessonViews, name="lessonViews"),

	url(r'^quiz/(?P<quiz_id>[0-9]+)/$', views.quizViews, name="quizViews"),
]

urlpatterns = format_suffix_patterns(urlpatterns)