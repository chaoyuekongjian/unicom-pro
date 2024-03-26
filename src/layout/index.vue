<template>
  <div class="app-container">
    <el-container>
      <el-header class="header">
        <Navbar />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import Navbar from './components/Navbar.vue'
import {fetchAvatar} from '@/api'
import appStore from '@/store'
const { setUserAvatar } = appStore.userStore
const getAvatar = () => {
  fetchAvatar().then(res => {
    setUserAvatar(res.data.data.avatar)
  })
}
getAvatar()
</script>

<style lang="scss" scoped>
.app-container{
  //background: $color;
}
</style>
