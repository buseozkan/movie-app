<template>
  <div class="landing-page">
    <h1 class="text-4xl font-bold mb-6">
      Movie Search App for Razor Software Engineering
    </h1>
    <p class="text-gray-600 mb-8">
      Search for movies and series and explore details!
    </p>
    <router-link
      to="/Search/"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Go to Movie Search
    </router-link>
  </div>
</template>

<style scoped>
.landing-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  color: rgb(59 130 246);
}

p {
  color: #777;
}

.router-link {
  margin-top: 1rem;
}
</style>
