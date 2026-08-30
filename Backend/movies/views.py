from django.shortcuts import render
from django.http import JsonResponse
from .models import Movie


def home(request):
    return JsonResponse({
        "message": "CineMovie API is running!"
    })


def movie_list(request):
    movies = Movie.objects.all().values(
        "tmdb_id",
        "title",
        "original_title",
        "overview",
        "release_date",
        "popularity",
        "vote_average",
        "vote_count",
    )

    return JsonResponse(list(movies), safe=False)