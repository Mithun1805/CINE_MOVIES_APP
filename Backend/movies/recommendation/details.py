import pandas as pd

from src.convert import convert_text, convert_cast, convert_crew, stems, remove_space



movies = pd.read_csv("tmdb_5000_movies.csv")
credits = pd.read_csv("tmdb_5000_credits.csv")

movies = movies.merge(credits, on='title')

movies = movies[['movie_id','title','overview','genres','keywords','cast','crew']]




movies['genres'] = movies['genres'].apply(convert_text)
movies['keywords'] = movies['keywords'].apply(convert_text)
movies['cast'] = movies['cast'].apply(convert_cast)
movies['crew'] = movies['crew'].apply(convert_crew)

movies = movies.rename(columns={"crew":"Director"})

movies.drop(["keywords"],axis=1,inplace =True)

about = movies