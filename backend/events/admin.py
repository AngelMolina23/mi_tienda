from django.contrib import admin
from .models import Event


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "event_date", "location", "capacity", "status")
    list_filter = ("status", "event_date")
    search_fields = ("name", "location")