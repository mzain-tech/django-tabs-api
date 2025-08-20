from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView

urlpatterns = [
    # signup (custom view)
    path("signup/", RegisterView.as_view(), name="signup"),

    # signin (JWT)
    path("signin/", TokenObtainPairView.as_view(), name="token_obtain_pair"),

    # refresh token
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]