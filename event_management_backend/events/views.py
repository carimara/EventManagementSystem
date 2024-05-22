from django.forms import ValidationError
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import EventType, Event, Booking
from .serializers import EventTypeSerializer, EventSerializer, BookingSerializer
from users.decorators import IsAdmin, IsOrganizer


class EventTypeViewSet(viewsets.ModelViewSet):
    queryset = EventType.objects.all()
    serializer_class = EventTypeSerializer
    permission_classes = [IsAuthenticated, IsOrganizer,]


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated, IsOrganizer]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def perform_update(self, serializer):
        serializer.save()


class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        event = serializer.validated_data['event']
        if event.capacity > 0:
            event.capacity -= 1
            event.save()
            serializer.save(user=self.request.user)
        else:
            raise ValidationError('This event is fully booked.')
