import { userStore } from './modules/user'
import { routerStore } from './modules/router'
import { permissionStore } from './modules/permission'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
export const pinia = createPinia()
pinia.use(piniaPluginPersist) // 数据持久化插件

interface IAppStore {
  userStore: ReturnType<typeof userStore>;
  routerStore: ReturnType<typeof routerStore>;
  permissionStore: ReturnType<typeof permissionStore>;
}

const appStore: IAppStore = {} as IAppStore;

export const registerStore = () => {
  appStore.userStore = userStore()
  appStore.routerStore = routerStore()
  appStore.permissionStore = permissionStore()
}

export default appStore
