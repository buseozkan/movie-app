<template>
  <div class="home">
    <div class="feature-card">
      <router-link to="/movie/tt0409591">
        <img
          src="https://img.freepik.com/free-photo/beautiful-milky-way-night-sky_53876-139825.jpg?w=1800&t=st=1681677712~exp=1681678312~hmac=a33af4f6f8c06a99cde197a8ebf7c8238950bbb408d21f1902fac22ffb71c421"
          alt="poster"
          class="featured-img"
        />
      </router-link>
    </div>
    <form @submit.prevent="SearchMovies()" class="search-box">
      <input
        type="text"
        placeholder="Search by title, director, or actor"
        v-model="search"
      />
      <input type="submit" value="Search" />
    </form>
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
            <p><strong>Director:</strong> {{ movie.Director }}</p>
            <p class="names">Actors: {{ movie.Actors }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import env from "@/env.ts";

export default {
  setup() {
    const search = ref("");
    const movies = ref([]);

    const SearchMovies = () => {
      if (search.value !== "") {
        fetch(
          `http://www.omdbapi.com/?apikey=${env.apiKey}&s=${search.value}&type=movie`
        )
          .then((response) => response.json())
          .then((data) => {
            movies.value = data.Search;
            search.value = "";
          });

        fetch(
          `http://www.omdbapi.com/?apikey=${env.apiKey}&s=${search.value}&type=series`
        )
          .then((response) => response.json())
          .then((data) => {
            movies.value = [...movies.value, ...data.Search];
            search.value = "";
          });

        fetch(
          `http://www.omdbapi.com/?apikey=${env.apiKey}&s=${search.value}&type=episode`
        )
          .then((response) => response.json())
          .then((data) => {
            movies.value = [...movies.value, ...data.Search];
            search.value = "";
          });

        // Search by director name
        fetch(
          `http://www.omdbapi.com/?apikey=${env.apiKey}&s=${search.value}&type=movie&director=${search.value}`
        )
          .then((response) => response.json())
          .then((data) => {
            movies.value = [...movies.value, ...data.Search];
            search.value = "";
          });

        // Search by actor name
        fetch(
          `http://www.omdbapi.com/?apikey=${env.apiKey}&s=${search.value}&type=movie&actor=${search.value}`
        ).then((response) => response.json());
      }
    };
    const directorResults = computed(() => {
      return movies.value
        ? movies.value.filter((movie) =>
            movie.Director.toLowerCase().includes(search.value.toLowerCase())
          )
        : [];
    });
    return {
      search,
      movies,
      SearchMovies,
      directorResults,
    };
  },
};
</script>

<style lang="scss">
.home {
  .feature-card {
    position: relative;

    .featured-image {
      display: block;
      width: 100%;
      height: 300px;
      object-fit: cover;
      position: relative;
      z-index: 0;
    }

    .detail {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.6);
      padding: 16px;
      z-index: 1;

      h3 {
        color: #fff;
        margin-bottom: 16px;
      }

      p {
        color: #fff;
      }
    }
  }
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
        width: 100%;
        color: #fff;
        background-color: #496583;
        font-size: 20px;
        padding: 10px 16px;
        border-radius: 8px;
        margin-bottom: 15px;
        transition: 0.4s;

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
