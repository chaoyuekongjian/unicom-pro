<template>
  <div class="location-point">
    <div class="location-name">{{ name }}</div>
    <el-tooltip
        class="box-item"
        effect="light"
        trigger="click"
        placement="right"
        popper-class="data-content"
        :disabled="!data"
    >
      <div class="location-item">
        <div :class="props.warn ? 'warn' : ''">
          <i class="iconfont icon-ziyuanchi" />
        </div>
      </div>
      <template #content>
        <div>
          <div class="title">{{ name }}资源池</div>
          <div>
            <div class="sub-title">租户数量</div>
            <div class="user-count">{{ data.usableUserCount }} / {{ data.userCount }}</div>
          </div>
          <div>
            <div class="sub-title">
              <span>存储使用率</span>
              <span>{{ data.usedPercent }}</span>
            </div>
            <div class="progress">
              <el-progress :percentage="data.percentage" :show-text="false" />
            </div>
          </div>
          <div>
            <div class="sub-title flex">
              <div>已用容量</div>
              <div>
                <span class="count">{{ data.usedCount }}</span>
                <span class="unit">{{ ` ${data.usedUnit}` }}</span>
              </div>
            </div>
          </div>
          <div>
            <div class="sub-title flex">
              <div>总容量</div>
              <div>
                <span class="count">{{ data.totalCount }}</span>
                <span class="unit"> {{ ` ${data.totalUnit}` }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>
import {defineProps, ref} from 'vue'

const props = defineProps({
  position: Object,
  name: String,
  warn: Boolean,
  data: Object
})

const left = ref(props.position.left)
const top = ref(props.position.top)
const nameMarginLeft = ref(props.position.nameOffset.marginLeft)
const nameMarginTop = ref(props.position.nameOffset.marginTop)
const itemMarginLeft = ref(props.position.itemOffset.marginLeft)
const itemMarginTop = ref(props.position.itemOffset.marginTop)
</script>

<style lang="scss">
$color: #409EFF;
$warnColor: #F56C6C;
$pointColor: #D80A17;

.location-point {
  width: 11.34px;
  height: 11.34px;
  position: absolute;
  z-index: 9;
  background: $pointColor;
  border-radius: 11.34px;
  left: v-bind(left);
  top: v-bind(top);
  .location-name {
    position: absolute;
    color: #67696D;
    z-index: 9;
    margin-left: v-bind(nameMarginLeft);
    margin-top: v-bind(nameMarginTop);
    width: 100px;
  }
  .location-item {
    position: absolute;
    width: 48px;
    height: 48px;
    border-radius: 48px;
    background: #fff;
    z-index: 9;
    margin-left: v-bind(itemMarginLeft);
    margin-top: v-bind(itemMarginTop);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &>div:nth-child(1) {
      width: 42px;
      height: 42px;
      border-radius: 42px;
      border: 1px solid $color;
      display: flex;
      justify-content: center;
      align-items: center;
      &>i {
        color: $color;
        font-size: 24px;
      }
    }
    .warn {
      border-color: $warnColor!important;
      &>i {
        color: $warnColor!important;
      }
    }
  }
}
</style>