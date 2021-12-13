<template>
  <div class="breadcrumb-area">
    <div
      class="breadcrumb-item text-caption"
      style="display:flex;flex-wrap:wrap;"
    >
      <div
        v-for="(v, index) in breadcrumbs"
        :key="index"
      >
        <div v-if="v.path">
          <nuxt-link
            :to="v.path"
            style="text-decoration:none;color:#bdbdbd;"
          >
            <span class="link">{{ v.name }}</span>
          </nuxt-link>
          <span class="space">&nbsp;&nbsp;/&nbsp;&nbsp;</span>
        </div>
        <div
          v-else
          style="color:#bdbdbd;"
        >
          {{ v.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["breadcrumbs"]
}
</script>