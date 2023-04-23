<template>
  <div>
    <h1>Create Review for {{ movie.Title }}</h1>
    <form @submit.prevent="submitReview">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" />
      <label for="rating">Rating:</label>
      <select id="rating" v-model="rating">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <label for="comment">Comment:</label>
      <textarea id="comment" v-model="comment"></textarea>
      <button type="submit">Submit Review</button>
    </form>
  </div>
</template>

<script>
import env from "@/env.ts";

export default {
  data() {
    return {
      username: "",
      rating: "",
      comment: "",
    };
  },
  methods: {
    submitReview() {
      const reviewData = {
        username: this.username,
        rating: this.rating,
        comment: this.comment,
      };
      console.log("Review data:", reviewData);
      // reset after submission
      this.username = "";
      this.rating = "";
      this.comment = "";

      // Call TMDB API to post review
      const movieId = this.$route.params.id;
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${env.apiKey}&language=en-US&page=1`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reviewData),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Review posted:", data);
        })
        .catch((error) => {
          console.error("Failed to post review:", error);
        });
    },
  },
};
</script>

<style scoped>
/* TBC */
</style>
