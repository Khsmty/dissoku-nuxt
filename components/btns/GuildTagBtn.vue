<template>
  <v-chip
    label
    nuxt
    style="text-transform: none"
    :color="$getTagColor(categoryid)"
    :to="`/search/tag/${encodeURIComponent(name)}?page=1`"
    :small="Boolean(small)"
  >
    {{ name }}<span v-if="count">({{ count }})</span>
  </v-chip>
</template>

<script>
export default {
  props: ['name', 'small', 'count', 'categoryid']
}
</script>