# Generated by Django 2.2.7 on 2021-01-07 12:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='choice',
            options={'verbose_name': '选项', 'verbose_name_plural': '选项'},
        ),
        migrations.AlterModelOptions(
            name='question',
            options={'verbose_name': '问题', 'verbose_name_plural': '问题'},
        ),
        migrations.AlterField(
            model_name='choice',
            name='choice_text',
            field=models.CharField(max_length=200, verbose_name='选项'),
        ),
        migrations.AlterField(
            model_name='choice',
            name='votes',
            field=models.IntegerField(default=0, verbose_name='票数'),
        ),
        migrations.AlterField(
            model_name='question',
            name='pub_date',
            field=models.DateTimeField(verbose_name='发布时间'),
        ),
        migrations.AlterField(
            model_name='question',
            name='question_text',
            field=models.CharField(max_length=200, verbose_name='问题'),
        ),
    ]
