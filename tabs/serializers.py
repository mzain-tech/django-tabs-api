from rest_framework import serializers
from .models import Tab

class Tabserializer(serializers.ModelSerializer):
    class Meta:
        model = Tab
        fields = ['id', 'name', 'emoji']