from django.conf.urls import url
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
	# /
	url(r'^$', views.login, name="login"),

	url(r'^main/$', views.index, name="index"),

	# url(r'^logincheck/$', views.logincheck, name="logincheck"),

	url(r'^logout/$', views.logout, name="logout"),

	url(r'^lesson/(?P<lesson_id>[0-9]+)/$', views.lessonViews, name="lessonViews"),

	url(r'^quiz/(?P<quiz_id>[0-9]+)/$', views.quizViews, name="quizViews"),

	url(r'leaderboard/', views.leaderboardViews, name="leaderboardViews")
]

urlpatterns = format_suffix_patterns(urlpatterns)