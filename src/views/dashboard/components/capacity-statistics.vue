<template>
  <div class="statistics capacity-statistics">
    <div class="title">
      <div>资源池容量统计</div>
      <div v-if="data.capacityList.length > 4">
        <span>查看更多</span>
        <el-icon><ArrowRight /></el-icon>
      </div>
    </div>
    <div class="capacity-list">
      <CapacityItem v-for="item in data.capacityList" :info="item" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {defineProps, reactive, watch} from 'vue'
import CapacityItem from './capacity-item.vue'
import { map, assign } from 'lodash'

const props = defineProps({
  data: Array
})

const data = reactive<{ capacityList: any[] }>({
  capacityList: []
})

watch(props, val => {
  data.capacityList = map(val.data, (d: any) => {
    return assign(d, {
      percentage: Number(d.usedPercent.split('%')[0]),
      usedCount: Number(d.used.split(' ')[0]),
      usedUnit: d.used.split(' ')[1],
      freeCount: Number(d.free.split(' ')[0]),
      freeUnit: d.free.split(' ')[1],
      totalCount: Number(d.total.split(' ')[0]),
      totalUnit: d.total.split(' ')[1]
    })
  })
})
// const capacityList = [
//   { name: '广州', usable: 450, total: 600, surplus: 150 },
//   { name: '深圳', usable: 450, total: 600, surplus: 150 },
//   { name: '佛山', usable: 450, total: 600, surplus: 150 },
//   { name: '东莞', usable: 450, total: 600, surplus: 150 },
// ]
</script>

<style scoped lang="scss">
.capacity-statistics {
  margin-top: 30px;
  .capacity-list {
    margin-top: 30px;
  }
}
</style>