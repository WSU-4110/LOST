# Generated by Django 4.0.3 on 2022-04-25 15:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_playlists'),
    ]

    operations = [
        migrations.AddField(
            model_name='playlists',
            name='playlistID',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='playlists',
            name='userID',
            field=models.CharField(max_length=200, null=True),
        ),
    ]
