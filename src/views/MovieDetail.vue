<template>
  <div class="movie-detail">
    <h2>{{ movie.Title }}</h2>
    <p>{{ movie.Year }}</p>
    <img :src="movie.Poster" alt="Movie Poster" class="featured-img" />
    <p>{{ movie.Plot }}</p>
    <div v-if="directorResults.length > 0">
      <h3>Search Results by Director:</h3>
      <ul>
        <li v-for="result in directorResults" :key="result.imdbID">
          {{ result.Title }}
        </li>
      </ul>
    </div>

    <!-- Display actor search results -->
    <div v-if="actorResults.length > 0">
      <h3>Search Results by Actor:</h3>
      <ul>
        <li v-for="result in actorResults" :key="result.imdbID">
          {{ result.Title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount, computed } from "vue";
import { useRoute } from "vue-router";
import env from "@/env.ts";

export default {
  setup() {
    const movie = ref({});
    const route = useRoute();
    const movies = ref([]);
    const search = ref("");

    onBeforeMount(() => {
      fetch(
        `https://www.omdbapi.com/?apikey=${env.apiKey}&i=${route.params.id}&plot=full`
      )
        .then((response) => response.json())
        .then((data) => {
          movie.value = data;
        });

      // Search by title (generic search)
      fetch(
        `http://www.omdbapi.com/?apikey=${env.apiKey}&s=${search.value}&type=movie`
      )
        .then((response) => response.json())
        .then((data) => {
          movies.value = data.Search;
        });
    });

    // Add computed properties for director and actor search results
    const directorResults = computed(() => {
      return movies.value
        ? movies.value.filter((movie) =>
            movie.Director.toLowerCase().includes(search.value.toLowerCase())
          )
        : [];
    });

    const actorResults = computed(() => {
      return movies.value
        ? movies.value.filter((movie) =>
            movie.Actors.toLowerCase().includes(search.value.toLowerCase())
          )
        : [];
    });

    return {
      movie,
      search,
      route,
      movies,
      directorResults,
      actorResults,
    };
  },
};
</script>

<style lang="scss">
.movie-detail {
  padding: 16px;

  h2 {
    color: #fff;
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 16px;
  }

  .featured-img {
    display: block;
    max-width: 200px;
    margin-bottom: 16px;
  }

  p {
    color: #fff;
    font-size: 18px;
    line-height: 1.4;
  }
}
</style>
