from django.urls import path
from .views import movie_list,home

urlpatterns = [
    path("movies/", movie_list, name="movie-list"),
    path("",home,name="home")
]