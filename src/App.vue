<template>
  <SalariesPage />
</template>

<script>
import SalariesPage from "./views/SalariesPage.vue";

export default {
  name: "App",
  components: {
    SalariesPage,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 80%;
  margin: auto;
  margin-top: 60px;
}
</style>
