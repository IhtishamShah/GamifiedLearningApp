from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Account(models.Model):
	username = models.CharField(max_length=40)
	email = models.CharField(max_length=40)
	password = models.CharField(max_length=40)

	def __unicode__(self):
		return self.username + " - " + self.email + " - " + self.password

class Lesson(models.Model):
	description = models.CharField(max_length=100)
	filepath = models.CharField(max_length=100)

	def __unicode__(self):
		return self.description + " - " + self.filepath

class LessonTracker(models.Model):
	account = models.ForeignKey(Account, on_delete=models.CASCADE)
	lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)

	def __unicode__(self):
		return self.account + " - " + self.lesson