from django.shortcuts import render
from django.http import JsonResponse
from .models import Movie
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import MovieSerializer,SignupSerializer
from django.contrib.auth import authenticate, login as django_login,logout as django_logout
from django.contrib.auth.models import User
from django.middleware.csrf import get_token


def home(request):
    return JsonResponse({
        "message": "CineMovie API is running!"
    })




@api_view(["GET"]) 
def movie_list(request): 
    movies = Movie.objects.all()[:20] 
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data)

@api_view(["GET"]) 
def home_movie(request):
     movie = Movie.objects.get(tmdb_id=41154)
     serializer = MovieSerializer(movie) 
     return Response(serializer.data)




@api_view(["POST"])
def signup(request):
    serializer = SignupSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "Signup successful"},
            status=201
        )

    return Response(serializer.errors, status=400)





@api_view(["POST"])
def login(request):
    print("🔥 LOGIN VIEW CALLED")
    email = request.data.get("email")
    password = request.data.get("password")

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response(
            {"message": "Invalid username or password"},
            status=401
        )

    authenticated_user = authenticate(
        username=user.username,
        password=password
    )

    if authenticated_user is not None:

        # Clear any existing browser session first
        django_logout(request)

        # Create a new session for this user
        django_login(request, authenticated_user)

        print("LOGIN USER:", request.user)
        print("LOGIN SESSION:", request.session.session_key)

        return Response({
            "message": "Login successful",
            "username": authenticated_user.username,
            "email": authenticated_user.email
        }, status=200)

    return Response(
        {"message": "Invalid username or password"},
        status=401
    )

@api_view(["GET"])
def current_user(request):

    print("SESSION USER:", request.user)
    print("SESSION KEY:", request.session.session_key)

    if not request.user.is_authenticated:
        return Response(
            {"message": "Not authenticated"},
            status=401
        )

    return Response({
        "username": request.user.username,
        "email": request.user.email
    })


@api_view(["GET"])
def csrf_token(request):
    return Response({
        "csrfToken": get_token(request)
    })

@api_view(["POST"])
def logout(request):
    django_logout(request)

    return Response({
        "message": "Logout successful"
    })


@api_view(["DELETE"])
def delete_account(request):
    if not request.user.is_authenticated:
        return Response(
            {"message": "Not authenticated"},
            status=401
        )

    user = request.user

    # Delete the user's account
    user.delete()

    # Clear the session
    django_logout(request)

    return Response(
        {"message": "Account deleted successfully"},
        status=200
    )