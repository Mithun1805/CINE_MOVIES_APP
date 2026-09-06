
import pandas as pd
from pathlib import Path

from .src.convert import (
    convert_text,
    convert_cast,
    convert_crew,
    stems,
    remove_space
)

from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity


# recommendation.py
# movies app -> Backend/movies/
# data folder -> CINE_MOVIES_APP/data/

BASE_DIR = Path(__file__).resolve().parent.parent.parent
DATA_DIR = BASE_DIR / "data"

movies = pd.read_csv(DATA_DIR / "tmdb_5000_movies.csv")
credits = pd.read_csv(DATA_DIR / "tmdb_5000_credits.csv")


movies = movies.merge(credits, on="title")

movies = movies[
    [
        "movie_id",
        "title",
        "overview",
        "genres",
        "keywords",
        "cast",
        "crew"
    ]
]

movies.dropna(inplace=True)

movies["genres"] = movies["genres"].apply(convert_text)
movies["keywords"] = movies["keywords"].apply(convert_text)
movies["cast"] = movies["cast"].apply(convert_cast)
movies["crew"] = movies["crew"].apply(convert_crew)

movies["overview"] = movies["overview"].apply(lambda x: x.split())

movies["cast"] = movies["cast"].apply(remove_space)
movies["crew"] = movies["crew"].apply(remove_space)
movies["genres"] = movies["genres"].apply(remove_space)
movies["keywords"] = movies["keywords"].apply(remove_space)

movies["tags"] = (
    movies["overview"]
    + movies["genres"]
    + movies["keywords"]
    + movies["cast"]
    + movies["crew"]
)

new_df = movies[["movie_id", "title", "tags"]].copy()

new_df["tags"] = new_df["tags"].apply(lambda x: " ".join(x))
new_df["tags"] = new_df["tags"].apply(lambda x: x.lower())
new_df["tags"] = new_df["tags"].apply(stems)


cv = CountVectorizer(
    max_features=5000,
    stop_words="english"
)

vector = cv.fit_transform(new_df["tags"]).toarray()

similarity = cosine_similarity(vector)


def recommend_movies(movie_title, top_n=5):

    movie_title = movie_title.lower()

    matches = new_df[
        new_df["title"].str.lower() == movie_title
    ]

    if matches.empty:
        return []

    movie_index = matches.index[0]

    distances = similarity[movie_index]

    movie_indices = sorted(
        list(enumerate(distances)),
        reverse=True,
        key=lambda x: x[1]
    )[1:top_n + 1]

    recommendations = []

    for index, score in movie_indices:
        recommendations.append({
            "movie_id": int(new_df.iloc[index]["movie_id"]),
            "title": new_df.iloc[index]["title"],
            "score": float(score)
        })

    return recommendations

