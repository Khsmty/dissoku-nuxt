<template>
  <v-chip
    label
    nuxt
    style="text-transform: none"
    :color="$getTagColor(categoryid)"
    :to="`/friend/search/tag/${encodeURIComponent(name)}?page=1`"
    :small="Boolean(small)"
  >
    {{ name }}
  </v-chip>
</template>

<script>
export default {
  props: ['name', 'small', 'categoryid']
}
</script>