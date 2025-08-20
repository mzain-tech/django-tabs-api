from django.shortcuts import render
from rest_framework import generics, permissions
from .models import Tab
from .serializers import Tabserializer
# Create your views here.

class TabListCreateView(generics.ListCreateAPIView):
    serializer_class = Tabserializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Tab.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TabDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = Tabserializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Tab.objects.filter(user=self.request.user)     
    




