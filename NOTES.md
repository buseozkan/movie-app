# STEPS
1. Endpoints
2. Navbar
3. Pages
4. Styling


## Endpoints
 
### GET 
- Films/Movies
- Actors
- Directors
- Runtime
- A berief Summary
- Reviews
- Release Date 

### POST 
- Reviews 

---

## Pages 
1. Homepage / Landing Page 
    
2. Movies detail page when clicked on a movie 
3. Search results page
    - flex boxes of the movies load as scroll down maybe




## Styling 
- install Tailwind
- install SASS
- compile SASS to CSS 
``npm install node-sass --save-dev``



## LIMITATIONS with APIs
# Both The Movie Database & IMDBAPI 
- can not search movies via director names and/or actor names, if searched only prints the movies including the searched name

# The Movie Database
- Search movies doesn't print all the desired information for some, such as names of the movies, posters of the movies, release dates of the movies. 
- The HomeView with TMDB is the file in `src/views/HomeTMDB.vue`. 
- no POST options.


# IMDBAPI 
- `Director name` and `Actors names` are not within the response of the `GET` call for the search movies, therefore the names weren't possible to shown in the search area. 
- two GET endpoints (no POST options):
    - Search
    - ID or Title

# The search api call database chosen = IMDBAPI 
This is due to the IMDBAPI providing a better response to searched movies including all the information needed even though it has its limitations mentioned above. 
- In addition to searching `movies`, I have added the results to return `series` too and label each response with movie/serie type. 

