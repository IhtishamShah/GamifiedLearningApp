# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-01-10 18:38
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_lessontracker_score'),
    ]

    operations = [
        migrations.AddField(
            model_name='lesson',
            name='quizfilepath',
            field=models.CharField(default='', max_length=100),
        ),
    ]