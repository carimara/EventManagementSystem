from rest_framework.permissions import BasePermission


class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.userprofile.role == "admin"


class IsOrganizer(BasePermission):
    def has_permission(self, request, view):
        return request.user.userprofile.role in [
            "admin",
            "organizer",
        ]
