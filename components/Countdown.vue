<template>
  <div
    class="pt-4"
    style="display: flex;"
  >
    <div class="block">
      <p class="digit">
        {{ hours | two_digits }}:
      </p>
    </div>
    <div class="block">
      <p class="digit">
        {{ minutes | two_digits }}:
      </p>
    </div>
    <div class="block">
      <p class="digit">
        {{ seconds | two_digits }}
      </p>
      <p class="text" />
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    two_digits (value) {
      if (value < 0) {
        return '00'
      }
      if (value.toString().length <= 1) {
        return `0${value}`
      }
      return value
    }
  },
  props: ['date'],
  data() {
    return {
      now: Math.trunc((new Date()).getTime() / 1000)
    }
  },
  computed: {
    dateInMilliseconds() {
      return Math.trunc(Date.parse(this.date) / 1000) + (60 * 60 * 24)
    },
    seconds() {
      return (this.dateInMilliseconds - this.now) % 60
    },
    minutes() {
      return Math.trunc((this.dateInMilliseconds - this.now) / 60) % 60
    },
    hours() {
      return Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60) % 24
    },
    days() {
      return Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60 / 24)
    }
  },
  mounted() {
    window.setInterval(() => {
      this.now = Math.trunc((new Date()).getTime() / 1000)
    },1000)
  }
}
</script>

<style scoped>
</style>