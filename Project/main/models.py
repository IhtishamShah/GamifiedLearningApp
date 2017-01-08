from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Account(models.Model):
	id = models.AutoField(primary_key=True)
	username = models.CharField(max_length=40, unique=True)
	email = models.CharField(max_length=40)
	password = models.CharField(max_length=40)

	def __unicode__(self):
		return str(self.id) + ' - ' + self.username

class Lesson(models.Model):
	id = models.AutoField(primary_key=True)
	description = models.CharField(max_length=100)
	filepath = models.CharField(max_length=100)

	def __unicode__(self):
		return str(self.id) + ' - ' + self.description

class LessonTracker(models.Model):
	id = models.AutoField(primary_key=True)
	account = models.ForeignKey(Account, on_delete=models.CASCADE)
	lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)

	def __unicode__(self):
		return str(self.id) + ' - (' + str(self.account) + ") - (" + str(self.lesson) + ')'