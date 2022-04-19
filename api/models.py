from turtle import back
from django.db import models

# Creating Database model
class Database(models.Model):

    userEmail = models.CharField(max_length=200)
    trackID = models.CharField(max_length=200)
    loudness = models.FloatField()
    location = models.CharField(max_length=50, null=True)
    mood = models.CharField(max_length=50, null=True)
    activity = models.CharField(max_length=50, null=True)
    custom_attr = models.CharField(max_length=50, null=True)
    custom_attrtwo = models.CharField(max_length=50, null=True)
    custom_attrthree = models.CharField(max_length=50, null=True)

    class Meta:
        unique_together = (('userEmail', 'trackID'),)
  
class Attributes(models.Model):
    userEmail = models.CharField(max_length=200)
    attr = models.CharField(max_length=50)

    class Meta:
        unique_together = (('userEmail', 'attr'),)