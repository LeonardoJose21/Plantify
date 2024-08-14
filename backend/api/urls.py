from django.urls import path
from .views import UserDetailView

urlpatterns = [
    path('api/user/', UserDetailView.as_view(), name='user-detail'),
]