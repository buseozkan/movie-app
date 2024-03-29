<template>
  <div class="home">
    <form @submit.prevent="SearchMovies()" class="search-box">
      <input
        class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        placeholder="Search for movies by title"
        type="text"
        name="search"
        v-model="search"
      />
      <input
        class="rounded-lg w-2 max-w-xs bg-lime-600"
        type="submit"
        value="Search"
      />
    </form>
    <div class="flex justify-center mt-4">
      <button
        @click="refresh"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Refresh
      </button>
    </div>
    <div class="movies-list">
      <div class="movie" v-for="movie in movies" :key="movie.imdbID">
        <router-link :to="'/movie/' + movie.imdbID" class="movie-link">
          <div class="product-image">
            <img :src="movie.Poster" alt="Movie Poster" />
            <div class="type">{{ movie.Type }}</div>
          </div>
          <div class="detail">
            <p class="year">{{ movie.Year }}</p>
            <h3>{{ movie.Title }}</h3>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import env from "@/env.ts";

export default {
  setup() {
    const search = ref("");
    const movies = ref([]);
    const searchResults = ref([]);

    // Fetch search results from local storage on component mount
    onMounted(() => {
      const searchResultsData = localStorage.getItem("searchResults");
      if (searchResultsData) {
        searchResults.value = JSON.parse(searchResultsData);
        movies.value = searchResults.value;
      }
    });

    const SearchMovies = () => {
      if (search.value !== "") {
        fetch(`http://www.omdbapi.com/?apikey=${env.apiKey}&s=${search.value}`)
          .then((response) => response.json())
          .then((data) => {
            movies.value = data.Search;
            searchResults.value = data.Search;
            search.value = "";
            localStorage.setItem("searchResults", JSON.stringify(data.Search));
          });
      }
    };

    const directorResults = computed(() => {
      return searchResults.value && searchResults.value.length > 0
        ? searchResults.value.filter((movie) =>
            movie.Director.toLowerCase().includes(search.value.toLowerCase())
          )
        : [];
    });

    const goBack = () => {
      // Navigate back to the previous page
      window.history.back();
    };

    const refresh = () => {
      localStorage.removeItem("searchResults");
      searchResults.value = [];
      movies.value = [];
    };

    return {
      search,
      movies,
      SearchMovies,
      directorResults,
      goBack,
      refresh,
    };
  },
};
</script>

<style lang="scss">
.home {
  .search-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px;

    input {
      display: block;
      appearance: none;
      border: none;
      outline: none;
      background: none;

      &[type="text"] {
        &::placeholder {
          color: #f3f3f3;
        }
        &:focus {
          box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
        }
      }

      &[type="submit"] {
        width: 100%;
        max-width: 300px;
        background-color: #42b883;
        padding: 16px;
        border-radius: 8px;
        color: #fff;
        font-size: 20px;
        text-transform: uppercase;
        transition: 0.4s;

        &:active {
          background-color: #3b8070;
        }
      }
    }
  }

  .movies-list {
    display: flex;
    flex-wrap: wrap;
    margin: 0px 8px;

    .movie {
      max-width: 50%;
      flex: 1 1 50%;
      padding: 16px 8px;

      .movie-link {
        display: flex;
        flex-direction: column;
        height: 100%;

        .product-image {
          position: relative;
          display: block;

          img {
            display: block;
            width: 100%;
            height: 275px;
            object-fit: cover;
          }

          .type {
            position: absolute;
            padding: 8px 16px;
            background-color: #42b883;
            color: #fff;
            bottom: 16px;
            left: 0px;
            text-transform: capitalize;
          }
        }

        .detail {
          background-color: #496583;
          padding: 16px 8px;
          flex: 1 1 100%;
          border-radius: 0px 0px 8px 8px;

          .year {
            color: #aaa;
            font-size: 14px;
          }
          .names {
            color: #aaa;
            font-size: 15px;
          }
          h3 {
            color: #fff;
            font-weight: 600;
            font-size: 18px;
          }
        }
      }
    }
  }
}
</style>
