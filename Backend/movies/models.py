from django.db import models
from django.contrib.auth.models import User



class Movie(models.Model):
    tmdb_id = models.IntegerField(unique=True)
    title = models.CharField(max_length=500)
    original_title = models.CharField(max_length=500, blank=True)
    original_language = models.CharField(max_length=10, blank=True)

    overview = models.TextField(blank=True)
    tagline = models.TextField(blank=True)
    homepage = models.URLField(blank=True)

    release_date = models.DateField(null=True, blank=True)

    budget = models.BigIntegerField(default=0)
    revenue = models.BigIntegerField(default=0)
    runtime = models.IntegerField(null=True, blank=True)

    popularity = models.FloatField(default=0)
    vote_average = models.FloatField(default=0)
    vote_count = models.IntegerField(default=0)

    status = models.CharField(max_length=50, blank=True)

    genres = models.JSONField(default=list, blank=True)
    keywords = models.JSONField(default=list, blank=True)
    production_companies = models.JSONField(default=list, blank=True)
    production_countries = models.JSONField(default=list, blank=True)
    spoken_languages = models.JSONField(default=list, blank=True)

    def __str__(self):
        return self.title


class MovieCredits(models.Model):
    movie = models.OneToOneField(
        Movie,
        on_delete=models.CASCADE,
        related_name="credits"
    )

    cast = models.JSONField(default=list, blank=True)
    crew = models.JSONField(default=list, blank=True)

    def __str__(self):
        return f"{self.movie.title} Credits"







class WatchHistory(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="watch_history"
    )

    movie = models.ForeignKey(
        Movie,
        on_delete=models.CASCADE,
        related_name="watched_by"
    )

    watched_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-watched_at"]

    def __str__(self):
        return f"{self.user.username} watched {self.movie.title}"

# Create your models here.
