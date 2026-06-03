from django.contrib import admin
from .models import Event, EventReservation





@admin.register(EventReservation)
class EventReservationAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "email",
        "phone",
        "event_date",
        "event_type",
        "user",
        "created_at"
    )

    list_filter = (
        "event_type",
        "event_date",
        "created_at"
    )

    search_fields = (
        "name",
        "email",
        "phone",
        "event_type"
    )