from rest_framework import serializers
from .models import Movie


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = [
            "tmdb_id",
            "title",
            "original_title",
            "original_language",
            "overview",
            "tagline",
            "homepage",
            "release_date",
            "budget",
            "revenue",
            "runtime",
            "popularity",
            "vote_average",
            "vote_count",
            "status",
            "genres",
            "keywords",
            "production_companies",
            "production_countries",
            "spoken_languages",
        ]