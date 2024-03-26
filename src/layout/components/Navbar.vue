<template>
  <div class="header-content">
    <div class="logo">
      <img src="@/assets/images/dashboard/logo.png">
    </div>
    <div class="title">联通云运营管理平台</div>
    <div class="menu-list">
      <MenuList />
    </div>
    <div class="search">
      <el-input v-model="search">
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
    </div>
    <div class="config">
      <el-dropdown class="avatar-container hover-effect" trigger="click" @command="handleCommand">
        <el-icon style="cursor: pointer"><Setting /></el-icon>
        <template #dropdown>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <el-dropdown-item command="thresholdConfig">告警阈值设置</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="user">
      <User />
    </div>

    <ThresholdDialog :dialog-visible.sync="thresholdDialog.show" @closeDialog="thresholdClose"/>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import User from './User.vue'
import MenuList from './MenuList.vue'
import ThresholdDialog from './threshold-dialog.vue'

let search = ref('')

const thresholdDialog = reactive({
  show: false
})

const handleCommand = (event:string) => {
  if (event == 'thresholdConfig') {
    thresholdDialog.show = true
  }
}

const thresholdClose = () => {
  thresholdDialog.show = false
}
</script>

<style scoped lang="scss">
.header-content {
  display: flex;
  height: 100%;
  align-items: center;
  .title {
    flex: 0 0 280px;
    color: #231D1D;
    font-family: PingFang SC;
    font-weight: 500;
    font-size: 24px;
    line-height: normal;
    letter-spacing: 0px;
    text-align: left;
    padding-left: 8px;
  }
  .menu-list {
    flex: 1;
  }
  .search {
    width: 280px;
    ::v-deep .el-input__wrapper {
      border-radius: 75px;
      background: #F0F0F0;
    }
  }
  .config {
    margin-left: 42.5px;
    margin-right: 42.5px;
    display: flex;
    align-items: center;
  }
}
</style>