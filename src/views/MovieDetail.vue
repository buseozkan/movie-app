<template>
  <div class="movie-detail">
    <h2>{{ movie.Title }}</h2>
    <p><strong>Director:</strong> {{ movie.Director }}</p>
    <p><strong>Actors:</strong> {{ movie.Actors }}</p>
    <p><strong>Release Date:</strong> {{ movie.Released }}</p>
    <p><strong>Runtime:</strong> {{ movie.Runtime }}</p>
    <img :src="movie.Poster" alt="Movie Poster" class="featured-img" />
    <p><strong>Brief Summary:</strong> {{ movie.Plot }}</p>
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
          console.log(data);
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
