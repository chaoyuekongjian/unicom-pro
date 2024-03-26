<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const data: {
      a: number
    } = {
      a: 0,
    }
    return data
  },
  data() {
    return {
    }
  },
  methods: {

  },
  watch: {

  },
  mounted() {
    // console.log(111111, this.getRouters)
  }
})
</script>

<style lang="scss" scoped>

</style>
