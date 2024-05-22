from django.contrib import admin
from .models import EventType, Event, Booking


class BookingInline(admin.TabularInline):
    model = Booking
    extra = 1


@admin.register(EventType)
class EventTypeAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "description")
    search_fields = ("name", "description")


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "description", "event_type", "date", "created_by")
    list_filter = ("event_type", "date")
    search_fields = ("name", "description", "event_type", "date", "created_by")
    raw_id_fields = ("created_by",)
    inlines = [BookingInline]


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ("id", "event", "user", "created_at")
    list_filter = ("created_at",)
    search_fields = ("event", "user")
    raw_id_fields = ("event", "user")
