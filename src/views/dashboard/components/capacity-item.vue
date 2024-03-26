<template>
  <div class="capacity-item">
    <div class="progress">
      <el-progress type="circle" :percentage="props.info.percentage" stroke-width="8" width="100">
        <template #default="{ percentage }">
          <div class="percentage-value">
            <span>{{ props.info.percentage }}</span>
            <span>%</span>
          </div>
          <div class="percentage-label">
            <span>{{ props.info.usedCount }}</span>
            <span>{{ props.info.usedUnit }}</span>
          </div>
        </template>
      </el-progress>
    </div>
    <div class="detail">
      <div class="detail-title">{{ props.info.name }}</div>
      <div class="detail-data">
        <span class="count usable-count">{{ props.info.freeCount }}</span>
        <span class="unit">{{ props.info.freeUnit }}</span>
        <span class="split">/</span>
        <span class="count total-count">{{ props.info.totalCount }}</span>
        <span class="unit">{{ props.info.totalUnit }}</span>
      </div>
      <div class="description">可用容量 / 总容量</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {defineProps} from 'vue'

const props = defineProps({
  info: Object
})
</script>

<style scoped lang="scss">
.capacity-item {
  height: 100px;
  display: flex;
  margin-top: 14px;
  .progress {
    .percentage-value {
      height: 24px;
      text-align: center;
      &>span:nth-child(1) {
        color: #303133;
        font-size: 16px;
        font-weight: bold;
        line-height: 24px;
      }
      &>span:nth-child(2) {
        color: #909399;
        font-size: 12px;
        line-height: 28px;
        margin-left: 3px;
      }
    }
    .percentage-label {
      height: 24px;
      text-align: center;
      &>span:nth-child(1) {
        color: #909399;
        font-weight: bold;
        font-size: 16px;
        line-height: 24px;
      }
      &>span:nth-child(2) {
        color: #909399;
        font-size: 12px;
        line-height: 20px;
        margin-left: 3px;
      }
    }
  }
  .detail {
    flex: 1;
    margin-left: 24px;
    .detail-title {
      color: #303133;
      font-size: 14px;
      line-height: 22px;
      margin-top: 4px;
      margin-bottom: 14px;
    }
    .detail-data {
      display: flex;
      .count {
        font-weight: bold;
        font-size: 24px;
        display: inline-block;
        line-height: 24px;
      }
      .usable-count {
        color: #409EFF;
      }
      .total-count {
        color: #606266;
      }
      .unit {
        color: #606266;
        font-size: 12px;
        margin-left: 4px;
        display: inline-flex;
        align-items: flex-end;
      }
      .split {
        color: #909399;
        font-size: 20px;
        line-height: 22px;
        margin: 0 4px;
      }
    }
    .description {
      color: #909399;
      font-size: 14px;
      line-height: 22px;
      height: 22px;
    }
  }
}
</style>