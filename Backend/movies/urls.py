from django.urls import path
from .views import movie_list,home_movie, signup,login, current_user,logout,csrf_token,delete_account

urlpatterns = [
    path("", movie_list, name="movie-list"),
    path("home/",home_movie,name="home"),
    path("signup/",signup,name="signup"),
    path("login/",login,name="login"),
    path("me/", current_user,name="current-user"),
    path("logout/",logout, name="logout"),
    path("csrf/", csrf_token, name="csrf"),
    path("delete-account/", delete_account, name="delete-account"),

]