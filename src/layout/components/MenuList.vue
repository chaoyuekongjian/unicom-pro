<template>
  <div class="menu-content">
    <el-menu
        :default-active="activeIndex"
        :ellipsis="false"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
    >
      <el-menu-item v-for="route in usableRouters" :index="route.path" :key="route.path">
        <i :class="route.meta && route.meta.icon"></i>
        <span>{{ route.name }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import appStore from '@/store'
import { filter } from 'lodash'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
const { activeRoute } = storeToRefs(appStore.routerStore)
const { changeRouter } = appStore.routerStore
const { getRouters } = appStore.permissionStore

const router = useRouter()
let activeIndex = ref(computed(() => activeRoute))
const handleSelect = (path: string) => {
  router.push(path)
  changeRouter(path)
}
const usableRouters = computed(() => {
  return filter(getRouters(), (d: any) => {
    return d.meta && d.meta.role
  }) as any[]
})
</script>

<style scoped lang="scss">
.menu-content {
  display: flex;
}
</style>
