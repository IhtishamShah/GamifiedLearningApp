# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-01-10 18:36
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_auto_20170110_2121'),
    ]

    operations = [
        migrations.AddField(
            model_name='lessontracker',
            name='score',
            field=models.IntegerField(default=0),
        ),
    ]
