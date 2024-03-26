<template>
  <div class="user-item">
    <div class="mark-line"></div>
    <div class="user-item-content">
      <div class="user-name">{{ props.info.name }}</div>
      <div class="user-count">
        <span>{{ props.info.usableUserCount }}</span> / <span>{{ props.info.userCount }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({
  info: Object
})
</script>

<style scoped lang="scss">
.user-item {
  display: inline-flex;
  height: 50px;
  .mark-line {
    width: 4px;
    background: #D80A17;
    border-radius: 100px;
  }
  .user-item-content {
    margin-left: 16px;
    .user-name {
      color: #909399;
      font-size: 14px;
      line-height: 22px;
      height: 22px;
      text-align: left;
    }
    .user-count {
      font-size: 16px;
      height: 28px;
      line-height: 28px;
      &>span:nth-child(1) {
        color: #D80A17
      }
      &>span:nth-child(2) {
        color: #545C79
      }
    }
  }
}
</style>