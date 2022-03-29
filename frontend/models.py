from django.db import models

# Create your models here.

# Creating Database model
class Database(models.Model):

    userEmail = models.IntegerField(unique=True)
    trackID = models.IntegerField(max_length=50, unique=True)
    loudness = models.IntegerField(max_length=50)
    location = models.CharField(max_length=200)
    mood = models.CharField(max_length=200)
    activity = models.CharField(max_length=200)
    custom_attr1 = models.CharField(max_length=200)
    custom_attr2 = models.CharField(max_length=200)
    custom_attr3 = models.CharField(max_length=200)