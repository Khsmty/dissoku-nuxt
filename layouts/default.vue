<template>
  <v-app id="app">
    <Header />
    <nuxt />
  </v-app>
</template>

<script>
import Header from "@/components/Header.vue"
export default {
  components: { Header }
}
</script>

<style>
html, body {
  width: 100%;
  overflow-x: hidden;
  background-color: #36393F;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #36393F;
}
::-webkit-scrollbar{
  width: 8px;
  background-color: #2E3338;
}
::-webkit-scrollbar-track{
  display: none;
}
::-webkit-scrollbar-thumb{
  background: #202225;
  border-radius: 8px;
  box-shadow: none;
}
.v-input__append-outer{
  padding: 0 !important;
  margin: 0 !important;
}
.search-box.v-input .v-input__slot{
  border-top-right-radius: 0px;
  -webkit-border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  -webkit-border-bottom-right-radius: 0px;
}
.app-cls{
  padding-top: 100rem;
}
.rel-link{
  text-decoration:none;
}
.rel-link:hover{
  text-decoration: underline;
}


</style>
