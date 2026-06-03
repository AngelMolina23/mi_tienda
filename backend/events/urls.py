from django.urls import path
from .views import EventListView, EventReservationCreateView

urlpatterns = [
    path("", EventListView.as_view()),
    path("reservations/", EventReservationCreateView.as_view()),
]