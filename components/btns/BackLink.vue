<template>
  <nuxt-link
    class="float-left linktext-back text-body-1"
    :to="to"
  >
    {{ text }}
  </nuxt-link>
</template>

<script>
export default {
  props: ['to', 'text']
}
</script>

<style scoped>
.linktext-back:before {
  content: "←";
  padding-left: .4em;
  text-align: center;
}
.linktext-back{
  color: #2196F3;
  transition: 0.3s;
  text-decoration: none;
}
.linktext-back:hover{
  color: #1E88E5;
  transition: 0.3s;
}
</style>