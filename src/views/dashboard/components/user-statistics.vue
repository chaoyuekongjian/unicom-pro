<template>
  <div class="statistics user-statistics">
    <div class="title">
      <div>资源池租户数量</div>
      <div v-if="data.userList.length > 4">
        <span>查看更多</span>
        <el-icon><ArrowRight /></el-icon>
      </div>
    </div>
    <div class="user-list">
      <div v-for="item in data.userGroup">
        <UserItem v-for="user in item" :info="user"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {defineProps, reactive, watch} from 'vue'
import { chunk } from 'lodash'
import UserItem from './user-item.vue'

const props = defineProps({
  data: Array
})

const data = reactive({
  userList: [],
  userGroup: []
})

watch(props, val => {
  data.userList = val.data
  data.userGroup = chunk(data.userList, 2)
})

// let userList = [
//     {name: '广州', usableUserCount: 1000, userCount: 1600},
//     {name: '深圳', usableUserCount: 1000, userCount: 1600},
//     {name: '佛山', usableUserCount: 1000, userCount: 1600},
//     {name: '东莞', usableUserCount: 1000, userCount: 1600}
// ]
// const userGroup = chunk(userList, 2)
</script>

<style scoped lang="scss">
.user-list {
  &>div {
    display: flex;
    margin-top: 30px;
    &>div {
      flex: 1;
    }
  }
}
</style>