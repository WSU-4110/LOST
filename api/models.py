from turtle import back
from django.db import models
import string 
import random

# Creating Database model
class Database(models.Model):

    userEmail = models.IntegerField()
    trackID = models.IntegerField()
    loudness = models.IntegerField()
    location = models.CharField(max_length=200)
    mood = models.CharField(max_length=200)
    activity = models.CharField(max_length=200)
    custom_attr1 = models.CharField(max_length=200)
    custom_attr2 = models.CharField(max_length=200)
    custom_attr3 = models.CharField(max_length=200)

    class Meta:
        unique_together = (('userEmail', 'trackID'),)
  

