from rest_framework import serializers
from .models import Movie
from django.contrib.auth.models import User


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = [ "tmdb_id", "title", "poster_path","backdrop_path","overview","vote_average","genres","status"]

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username","email", "password"]
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )
            