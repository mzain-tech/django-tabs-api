from django.db import models
from django.conf import settings

# Create your models here.
class Tab(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    emoji = models.CharField(max_length=10, blank=True, null=True)

    def __str__(self):
        return self.name
    