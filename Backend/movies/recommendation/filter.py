import pandas as pd
from src.convert import convert_text, partial_match, exact_match

movies = pd.read_csv("imdb_top_1000.csv")

movies['genres_list'] = movies['genres'].apply(convert_text)

all_genres = sorted({g for genres in movies["genres_list"] for g in genres})


def recommend_movies(selected_genres, top_n=5):

    movies["exact_match"] = movies["genres_list"].apply(
        lambda x: exact_match(x, selected_genres)
    )

    movies["partial_score"] = movies["genres_list"].apply(
        lambda x: partial_match(x, selected_genres)
    )

    filtered_movies = movies[movies["partial_score"] > 0]

    filtered_movies = filtered_movies.sort_values(
        by=["exact_match", "partial_score"],
        ascending=False
    )

    recommended = filtered_movies.head(top_n)

    

    return recommended["title"].tolist()








