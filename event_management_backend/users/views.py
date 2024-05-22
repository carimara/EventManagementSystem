from rest_framework import generics, status
from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import UserProfile
from .serializers import UserSerializer, UserProfileSerializer

# Create your views here.
class UserDetailView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)


class RegisterView(generics.CreateAPIView):
    qeueryset = User.objects.all()
    permission_classes = [AllowAny,]

    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")
        email = request.data.get("email")
        role = request.data.get("role")

        if not username or not password or not email or not role:
            return Response(
                data={
                    "message": "Please provide username, password, email and role"
                },
                status=400,
            )

        if User.objects.filter(username=username).exists():
            return Response(
                data={
                    "message": "Username already exists"
                },
                status=400
            )

        if User.objects.filter(email=email).exists():
            return Response(
                data={
                    "message": "Email already exists"
                },
                status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        user_profile, created = UserProfile.objects.get_or_create(
            user=user,
        )
        user_profile.role = role
        user_profile.save()

        if created:
            return Response(
                data={
                    "message": "User created successfully"
                },
                status=status.HTTP_201_CREATED
            )
            

        return Response(
            data={
                "message": "User created successfully"
            },
            status=status.HTTP_201_CREATED
        )