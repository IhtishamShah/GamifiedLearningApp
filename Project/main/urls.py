from django.conf.urls import url
from . import views

urlpatterns = [
	# /
	url(r'^$', views.index, name="index"),

	url(r'^account/$', views.getAccount, name="getAccount"),

	# /123
	url(r'^account/(?P<acc_id>[0-9]+)/$', views.getAccountById, name="getAccountById"),
]