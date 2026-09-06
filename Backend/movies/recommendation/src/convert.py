import ast
from nltk.stem import PorterStemmer
ps = PorterStemmer()
def convert_text(text):
    l = []
    for i in ast.literal_eval(text):
        l.append(i['name'])
    return l
def convert_crew(text):
    l = []
    for i in ast.literal_eval(text):
        if i['job'] == 'Director':
          l.append(i['name'])
          break
    return l
def convert_cast(text):
    l = []
    counter = 0
    for i in ast.literal_eval(text):
        if counter < 3:
          l.append(i['name'])
          counter+=1
    return l
def remove_space(word):
    l= []
    for i in word:
        l.append(i.replace(" ",""))
    return l
def stems(text):
    l = []
    for i in text.split():
        l.append(ps.stem(i))
    return " ".join(l)
def partial_match(movie_genres,selected_genres):
    #selected_genres = ["Action","Comedy"]
    return len(set(movie_genres) & set(selected_genres))

def exact_match(movie_genres,selected_genres):
    #selected_genres = ["Action","Comedy"]
    return set(movie_genres) == set(selected_genres)
