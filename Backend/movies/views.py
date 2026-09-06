from django.shortcuts import render
from django.http import JsonResponse
from .models import Movie,MovieCredits,WatchHistory
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import MovieSerializer,SignupSerializer
from django.contrib.auth import authenticate, login as django_login,logout as django_logout
from django.contrib.auth.models import User
from django.middleware.csrf import get_token
from .recommendation.data_handle import recommend_movies


def home(request):
    return JsonResponse({
        "message": "CineMovie API is running!"
    })




@api_view(["GET"]) 
def movie_list(request): 
    movies = Movie.objects.all()[:10] 
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data)

@api_view(["GET"]) 
def movie_list2(request): 
    movies = Movie.objects.all()[10:20] 
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



@api_view(["GET"])
def recommendations(request):

    movie_title = request.GET.get("movie")

    if not movie_title:
        return Response(
            {"message": "Movie title is required"},
            status=400
        )

    results = recommend_movies(movie_title, top_n=10)

    # Get movie IDs from recommender
    movie_ids = [movie["movie_id"] for movie in results]

    # Get movies from Django database
    movies = Movie.objects.filter(tmdb_id__in=movie_ids)

    serializer = MovieSerializer(movies, many=True)

    return Response(serializer.data)




@api_view(["GET"])
def top_rated(request):
    movies = Movie.objects.all().order_by("-vote_average")[:20]

    serializer = MovieSerializer(movies, many=True)

    return Response(serializer.data)



@api_view(["GET"])
def searchmovielist(request):

    query = request.GET.get("q", "").strip()

    if not query:
        return Response([])

    movies = Movie.objects.filter(
        title__istartswith=query
    ).values(
        "tmdb_id",
        "title",
        "poster_path"
    )[:10]

    return Response(list(movies))



@api_view(["GET"])
def movie_detail(request, tmdb_id):
    print("🔥 MOVIE DETAILS CALLED")
    print("TMDB ID:", tmdb_id)

    try:
        movie = Movie.objects.get(tmdb_id=tmdb_id)
        print("MOVIE FOUND:", movie.title)
    except Movie.DoesNotExist:
        return Response(
            {"message": "Movie not found"},
            status=404
        )

    director = "Unknown"

    try:
        credits = movie.credits

        for person in credits.crew:
            if person.get("job") == "Director":
                director = person.get("name", "Unknown")
                break

    except MovieCredits.DoesNotExist:
        pass

    return Response({
        "tmdb_id": movie.tmdb_id,
        "title": movie.title,
        "poster_path": movie.poster_path,
        "backdrop_path": movie.backdrop_path,
        "overview": movie.overview,
        "vote_average": movie.vote_average,
        "release_date": movie.release_date,
        "runtime": movie.runtime,
        "director": director,
        "genres": movie.genres,
    })



@api_view(["POST"])
def add_history(request, tmdb_id):

    if not request.user.is_authenticated:
        return Response(
            {"message": "Not authenticated"},
            status=401
        )

    try:
        movie = Movie.objects.get(tmdb_id=tmdb_id)
    except Movie.DoesNotExist:
        return Response(
            {"message": "Movie not found"},
            status=404
        )

    WatchHistory.objects.create(
        user=request.user,
        movie=movie
    )

    return Response(
        {"message": "Added to history"},
        status=201
    )


@api_view(["GET"])
def history(request):

    if not request.user.is_authenticated:
        return Response(
            {"message": "Not authenticated"},
            status=401
        )

    history_items = WatchHistory.objects.filter(
        user=request.user
    ).select_related("movie")

    return Response([
        {
            "id": item.id,
            "tmdb_id": item.movie.tmdb_id,
            "title": item.movie.title,
            "poster_path": item.movie.poster_path,
            "watched_at": item.watched_at,
        }
        for item in history_items
    ])
