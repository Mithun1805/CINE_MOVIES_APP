import csv
import json
from datetime import datetime

from django.core.management.base import BaseCommand
from movies.models import Movie


class Command(BaseCommand):
    help = "Import TMDB movies dataset into PostgreSQL"

    def handle(self, *args, **kwargs):

        file_path = "Data/tmdb_5000_movies.csv"

        self.stdout.write("Starting movie import...")

        created = 0
        updated = 0
        skipped = 0

        with open(file_path, "r", encoding="utf-8") as file:

            reader = csv.DictReader(file)

            for row in reader:

                try:
                    # -------------------------
                    # TMDB ID
                    # -------------------------
                    tmdb_id = int(row["id"])

                    # -------------------------
                    # Release date
                    # -------------------------
                    release_date = None

                    if row["release_date"]:
                        try:
                            release_date = datetime.strptime(
                                row["release_date"],
                                "%Y-%m-%d"
                            ).date()
                        except ValueError:
                            release_date = None

                    # -------------------------
                    # JSON fields
                    # -------------------------
                    genres = json.loads(row["genres"]) if row["genres"] else []
                    keywords = json.loads(row["keywords"]) if row["keywords"] else []
                    production_companies = (
                        json.loads(row["production_companies"])
                        if row["production_companies"]
                        else []
                    )
                    production_countries = (
                        json.loads(row["production_countries"])
                        if row["production_countries"]
                        else []
                    )
                    spoken_languages = (
                        json.loads(row["spoken_languages"])
                        if row["spoken_languages"]
                        else []
                    )

                    # -------------------------
                    # Create or update movie
                    # -------------------------
                    movie, was_created = Movie.objects.update_or_create(
                        tmdb_id=tmdb_id,

                        defaults={
                            "title": row["title"] or "",
                            "original_title": row["original_title"] or "",
                            "original_language": row["original_language"] or "",
                            "overview": row["overview"] or "",
                            "tagline": row["tagline"] or "",
                            "homepage": row["homepage"] or "",

                            "release_date": release_date,

                            "budget": int(row["budget"] or 0),
                            "revenue": int(row["revenue"] or 0),

                            "runtime": (
                                int(float(row["runtime"]))
                                if row["runtime"]
                                else None
                            ),

                            "popularity": float(row["popularity"] or 0),
                            "vote_average": float(row["vote_average"] or 0),
                            "vote_count": int(row["vote_count"] or 0),

                            "status": row["status"] or "",

                            "genres": genres,
                            "keywords": keywords,
                            "production_companies": production_companies,
                            "production_countries": production_countries,
                            "spoken_languages": spoken_languages,
                        }
                    )

                    if was_created:
                        created += 1
                    else:
                        updated += 1

                except Exception as e:
                    skipped += 1

                    self.stdout.write(
                        self.style.WARNING(
                            f"Skipped movie: {row.get('title', 'Unknown')} - {e}"
                        )
                    )

        self.stdout.write("")
        self.stdout.write(
            self.style.SUCCESS(
                f"Import complete!"
            )
        )

        self.stdout.write(f"Created: {created}")
        self.stdout.write(f"Updated: {updated}")
        self.stdout.write(f"Skipped: {skipped}")