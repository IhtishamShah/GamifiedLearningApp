from django.conf.urls import url
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
	# /
	url(r'^$', views.index, name="index"),

	url(r'^account/$', views.getAccount, name="getAccount"),

	# /123
	url(r'^account/(?P<acc_id>[0-9]+)/$', views.getAccountById, name="getAccountById"),

	url(r'^lesson/(?P<lesson_id>[0-9]+)/$', views.getLesson, name="getLesson"),

	url(r'^quiz/(?P<quiz_id>[0-9]+)/$', views.getQuiz, name="getQuiz"),
]

urlpatterns = format_suffix_patterns(urlpatterns)