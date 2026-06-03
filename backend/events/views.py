from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Event, EventReservation
from .serializers import EventSerializer, EventReservationSerializer


class EventListView(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class EventReservationCreateView(generics.CreateAPIView):
    serializer_class = EventReservationSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)