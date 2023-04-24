<template>
  <div class="movie-detail">
    <button @click="goBack()" class="rounded-xl bg-slate-200 w-12">Back</button>

    <h2>{{ movie.Title }}</h2>
    <p><strong>Director:</strong> {{ movie.Director }}</p>
    <p><strong>Actors:</strong> {{ movie.Actors }}</p>
    <p><strong>Release Date:</strong> {{ movie.Released }}</p>
    <p><strong>Runtime:</strong> {{ movie.Runtime }}</p>
    <p><strong>IMDb Rating:</strong> {{ movie.imdbRating }} / 10</p>
    <p v-if="movie.Ratings && movie.Ratings.length > 1">
      <strong>Rotten Tomatoes:</strong> {{ movie.Ratings[1].Value }}
    </p>
    <p v-if="movie.Ratings && movie.Ratings.length > 2">
      <strong>Metacritic:</strong> {{ movie.Ratings[2].Value }}
    </p>

    <img :src="movie.Poster" alt="Movie Poster" class="featured-img" />
    <p><strong>Brief Summary:</strong> {{ movie.Plot }}</p>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import env from "@/env.ts";

export default {
  setup() {
    const movie = ref({});
    const route = useRoute();
    const router = useRouter();
    const movies = ref([]);
    const search = ref("");
    const searchResults = ref([]);

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

    const goBack = () => {
      router.push({ path: "/" });
    };

    return {
      movie,
      goBack,
      search,
      route,
      movies,
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
