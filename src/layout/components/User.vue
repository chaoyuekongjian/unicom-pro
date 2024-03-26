<template>
  <div>
    <el-dropdown class="avatar-container hover-effect" trigger="click" @command="handleCommand">
      <div class="avatar-wrapper">
        <!-- <span class="user-avatar" /> -->
        <el-image class="user-avatar" :src="avatarUrl"/>
        <span class="user-name">
          {{ username }}
        </span>
<!--        {{ getUsername() }}-->
        <el-icon><ArrowDown /></el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu slot="dropdown" class="user-dropdown" v-loading="loading" element-loading-text="正在登出...">
          <el-dropdown-item command="userCenter">个人中心</el-dropdown-item>
          <el-dropdown-item command="logOut">退出</el-dropdown-item>
          <!-- <el-dropdown-item>{{generateName('common.basic-information')}}</el-dropdown-item> -->
          <!--        <el-dropdown-item>{{generateName('common.lock-sys')}}</el-dropdown-item>-->
          <!--        <el-dropdown-item>{{ generateName('login.logout') }}</el-dropdown-item>-->
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import {computed, ref} from 'vue'
import { useRouter } from 'vue-router'
import appStore from '@/store'
import { storeToRefs } from 'pinia'

const { avatarUrl, username } = storeToRefs(appStore.userStore)
const { changeRouter } = appStore.routerStore
const { resetToken } = appStore.userStore

const router = useRouter()
let loading = ref(false)

const handleCommand = (event:string) => {
  if (event == 'userCenter') {
    changeRouter('')
    router.push('/persenal-center')
  } else if (event == 'logOut') {
    resetToken()
    location.reload()
  }
}
</script>

<style scoped lang="scss">
.avatar-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;

  .user-avatar {
    cursor: pointer;
    border-radius: 24px;
    margin-right: 4px;
    width: 24px;
    height: 24px;
  }
  .user-name {
    margin-right: 4px;
  }
}

</style>
