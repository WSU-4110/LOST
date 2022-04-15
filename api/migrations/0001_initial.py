# Generated by Django 4.0.3 on 2022-04-15 04:51

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Database',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('userEmail', models.CharField(max_length=200)),
                ('trackID', models.CharField(max_length=200)),
                ('loudness', models.FloatField()),
                ('location', models.CharField(max_length=200, null=True)),
                ('mood', models.CharField(max_length=200, null=True)),
                ('activity', models.CharField(max_length=200, null=True)),
                ('custom_attr1', models.CharField(max_length=200, null=True)),
                ('custom_attr2', models.CharField(max_length=200, null=True)),
                ('custom_attr3', models.CharField(max_length=200, null=True)),
            ],
            options={
                'unique_together': {('userEmail', 'trackID')},
            },
        ),
    ]
