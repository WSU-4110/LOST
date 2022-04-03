

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_home_code'),
    ]

    operations = [
        migrations.CreateModel(
            name='Database',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('userEmail', models.IntegerField(unique=True)),
                ('trackID', models.IntegerField(unique=True)),
                ('loudness', models.IntegerField()),
                ('location', models.CharField(max_length=200)),
                ('mood', models.CharField(max_length=200)),
                ('activity', models.CharField(max_length=200)),
                ('custom_attr1', models.CharField(max_length=200)),
                ('custom_attr2', models.CharField(max_length=200)),
                ('custom_attr3', models.CharField(max_length=200)),
            ],
            options={
                'unique_together': {('userEmail', 'trackID')},
            },
        ),
    ]
