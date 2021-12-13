<template>
  <v-row
    v-if="reviewCnt"
    class="mb-5"
  >
    <v-col
      cols="12"
      class="pb-0"
    >
      <p
        class="text-subtitle-1 font-weight-bold float-left mb-0"
        style="color: #bdbdbd"
      >
        <span>{{ title }}</span>
      </p>
    </v-col>
    <v-col
      cols="12"
      class="pl-4"
    >
      <v-row>
        <v-col
          style="text-align:left;"
          class="pt-5 pl-1"
          cols="3"
          xl="2"
        >
          <span><span class="text-h3">{{ scoreAvg }}</span><span style="font-color: #bdbdbd">/5</span></span>
        </v-col>
        <v-col
          :class="$vuetify.breakpoint.name != 'xs' ? '' : 'ml-0 pl-0'"
          class="pt-5"
          cols="9"
          xl="10"
        >
          <v-rating
            style="text-align:left;"
            length="5"
            size="50"
            :value="scoreAvg"
            color="yellow darken-3"
            readonly
            half-increments
          />
          <v-subheader class="pl-2">
            {{ reviewCnt }} 件のレビュー
          </v-subheader>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ['reviewCnt', 'scoreAvg', 'title']
}
</script>
