
from django.urls import path
from .views import (
    movie_list,
    home_movie,
    signup,
    login,
    current_user,
    logout,
    csrf_token,
    delete_account,
    movie_list2,
    recommendations,
    top_rated,
    searchmovielist,
    movie_detail,
    add_history,
    history,
)

urlpatterns = [
    path("", movie_list, name="movie-list"),
    path("movielist2/", movie_list2, name="movie-list2"),
    path("home/", home_movie, name="home"),
    path("signup/", signup, name="signup"),
    path("login/", login, name="login"),
    path("me/", current_user, name="current-user"),
    path("logout/", logout, name="logout"),
    path("csrf/", csrf_token, name="csrf"),
    path("delete-account/", delete_account, name="delete-account"),
    path("recommendations/", recommendations, name="recommendations"),
    path("top-rated/", top_rated, name="top-rated"),
    path("searchmovielist/", searchmovielist, name="search-movie-list"),
    path("movie/<int:tmdb_id>/", movie_detail, name="movie-detail"),

    # Watch history
    path("add-history/<int:tmdb_id>/", add_history, name="add-history"),
    path("history/", history, name="history"),
]

