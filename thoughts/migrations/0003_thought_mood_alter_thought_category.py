# Generated by Django 4.2.20 on 2025-03-24 15:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('thoughts', '0002_alter_thought_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='thought',
            name='mood',
            field=models.CharField(blank=True, choices=[('happy', 'Happy'), ('sad', 'Sad'), ('angry', 'Angry'), ('anxious', 'Anxious'), ('neutral', 'Neutral')], max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='thought',
            name='category',
            field=models.CharField(blank=True, choices=[('worry', 'Worry'), ('idea', 'Idea'), ('reminder', 'Reminder'), ('other', 'Other'), ('gratitude', 'Gratitude')], max_length=10, null=True),
        ),
    ]
