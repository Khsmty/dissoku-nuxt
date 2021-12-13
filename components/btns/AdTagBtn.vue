<template>
  <v-chip
    label
    nuxt
    style="text-transform: none"
    :color="$getTagColor('ad')"
    :href="url"
    :small="Boolean(small)"
  >
    {{ name }}
  </v-chip>
</template>

<script>
export default {
  props: ['name', 'small', 'url']
}
</script>