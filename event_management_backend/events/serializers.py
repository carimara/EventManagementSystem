from rest_framework import serializers
from django.contrib.auth.models import User
from .models import EventType, Event, Booking

class EventTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventType
        fields = "__all__"


class EventSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source='created_by.username')
    class Meta:
        model = Event
        fields = ['id', 'name', 'description', 'event_type', 'date', 'created_by', 'location', 'capacity']


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = "__all__"
