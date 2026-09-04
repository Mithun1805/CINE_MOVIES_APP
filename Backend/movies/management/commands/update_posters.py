import time
import requests

from django.core.management.base import BaseCommand
from django.conf import settings

from movies.models import Movie


class Command(BaseCommand):
    help = "Retry missing movie posters from TMDB"

    MAX_RETRIES = 6
    TIMEOUT = (10, 30)
    DELAY = 0.5

    def handle(self, *args, **options):

        movies = Movie.objects.filter(
            poster_path__isnull=True
        ) | Movie.objects.filter(
            poster_path=""
        )

        total = movies.count()

        self.stdout.write(
            self.style.SUCCESS(
                f"Found {total} movies without posters."
            )
        )

        if total == 0:
            self.stdout.write(
                self.style.SUCCESS(
                    "Nothing to update."
                )
            )
            return

        headers = {
            "Authorization": f"Bearer {settings.TMDB_API_KEY}",
            "accept": "application/json",
            "User-Agent": "CineMovie/1.0",
        }

        session = requests.Session()
        session.headers.update(headers)

        updated = 0
        no_poster = 0
        not_found = 0
        failed = 0

        for index, movie in enumerate(movies, start=1):

            url = (
                f"https://api.themoviedb.org/3/movie/"
                f"{movie.tmdb_id}"
            )

            completed = False

            for attempt in range(1, self.MAX_RETRIES + 1):

                try:

                    response = session.get(
                        url,
                        timeout=self.TIMEOUT,
                    )

                    if response.status_code == 200:

                        data = response.json()

                        poster = data.get("poster_path")
                        backdrop = data.get("backdrop_path")

                        movie.poster_path = poster or ""
                        movie.backdrop_path = backdrop or ""

                        movie.save(
                            update_fields=[
                                "poster_path",
                                "backdrop_path",
                            ]
                        )

                        if poster:

                            updated += 1

                            self.stdout.write(
                                self.style.SUCCESS(
                                    f"[{index}/{total}] "
                                    f"{movie.title} ✓"
                                )
                            )

                        else:

                            no_poster += 1

                            self.stdout.write(
                                f"[{index}/{total}] "
                                f"{movie.title} - "
                                f"No poster on TMDB"
                            )

                        completed = True
                        break

                    elif response.status_code == 404:

                        not_found += 1

                        self.stdout.write(
                            f"[{index}/{total}] "
                            f"{movie.title} - "
                            f"TMDB movie not found"
                        )

                        completed = True
                        break

                    elif response.status_code == 429:

                        wait = 15

                        retry_after = response.headers.get(
                            "Retry-After"
                        )

                        if retry_after:
                            try:
                                wait = int(retry_after)
                            except ValueError:
                                pass

                        self.stdout.write(
                            f"[{index}/{total}] "
                            f"{movie.title} - "
                            f"Rate limited. "
                            f"Waiting {wait}s..."
                        )

                        time.sleep(wait)

                    elif response.status_code >= 500:

                        wait = min(
                            2 ** attempt,
                            60
                        )

                        self.stdout.write(
                            f"[{index}/{total}] "
                            f"{movie.title} - "
                            f"HTTP {response.status_code}. "
                            f"Retry {attempt}/"
                            f"{self.MAX_RETRIES} "
                            f"in {wait}s..."
                        )

                        time.sleep(wait)

                    else:

                        failed += 1

                        self.stdout.write(
                            f"[{index}/{total}] "
                            f"{movie.title} - "
                            f"HTTP {response.status_code}"
                        )

                        completed = True
                        break

                except (
                    requests.exceptions.ConnectionError,
                    requests.exceptions.Timeout,
                ) as error:

                    wait = min(
                        2 ** attempt,
                        60
                    )

                    self.stdout.write(
                        f"[{index}/{total}] "
                        f"{movie.title} - "
                        f"Attempt {attempt}/"
                        f"{self.MAX_RETRIES} failed: "
                        f"{type(error).__name__}. "
                        f"Retrying in {wait}s..."
                    )

                    time.sleep(wait)

                except Exception as error:

                    failed += 1

                    self.stdout.write(
                        f"[{index}/{total}] "
                        f"{movie.title} - "
                        f"Unexpected error: {error}"
                    )

                    completed = True
                    break

            if not completed:

                failed += 1

                self.stdout.write(
                    self.style.ERROR(
                        f"[{index}/{total}] "
                        f"{movie.title} - "
                        f"FAILED after "
                        f"{self.MAX_RETRIES} attempts"
                    )
                )

            time.sleep(self.DELAY)

        session.close()

        self.stdout.write("")
        self.stdout.write("=" * 60)
        self.stdout.write("FINAL RESULT")
        self.stdout.write("=" * 60)

        self.stdout.write(
            self.style.SUCCESS(
                f"Updated: {updated}"
            )
        )

        self.stdout.write(
            self.style.WARNING(
                f"No poster on TMDB: {no_poster}"
            )
        )

        self.stdout.write(
            self.style.WARNING(
                f"TMDB not found: {not_found}"
            )
        )

        self.stdout.write(
            self.style.ERROR(
                f"Network/other failures: {failed}"
            )
        )

        self.stdout.write("=" * 60)