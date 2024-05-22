from django.urls import path, include
from rest_framework import routers
from .views import EventViewSet, EventTypeViewSet, BookingViewSet


router = routers.SimpleRouter()
router.register(r"event_types", EventTypeViewSet)
router.register(r"events", EventViewSet)
router.register(r"booking", BookingViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
