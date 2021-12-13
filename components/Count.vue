<template>
  <v-row
    justify="center"
    align="center"
  >
    <v-col v-if="data.count">
      <h3
        class="text-body1 float-right"
        style="color:#ADADAD;"
      >
        {{ data.range_first }}~{{ data.range_last }}{{ getUnit() }}(全{{ data.count }}{{ getUnit() }}中)
      </h3>
    </v-col>
    <v-col v-else>
      <h3
        class="text-h6 float-right"
        style="color:#ADADAD;"
      >
        0 {{ getUnit() }}
      </h3>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ['data', 'type'],
  methods: {
    getUnit () {
      if (this.type == 'profile') {
        return '件'
      } else if(this.type == 'bot') {
        return '体'
      }
      return 'サーバー'
    }
  }
}
</script>