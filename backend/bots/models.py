from django.db import models

# Create your models here.
class Bot(models.Model):
    sender = models.CharField(max_length=50)
    text = models.TextField()

    def __str__(self):
        return self.sender + ": " + self.text
    