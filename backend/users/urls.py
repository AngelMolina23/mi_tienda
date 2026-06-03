from django.urls import path
from .views import ProfileView, RegisterView, ClientDashboardView


urlpatterns = [
    path("profile/", ProfileView.as_view()),
    path("register/", RegisterView.as_view()),
    path("dashboard/", ClientDashboardView.as_view()),
]