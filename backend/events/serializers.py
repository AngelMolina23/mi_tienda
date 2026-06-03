from rest_framework import serializers
from .models import Event, EventReservation


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = "__all__"


class EventReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventReservation
        fields = "__all__"
        read_only_fields = (
            "user",
            "created_at",
        )