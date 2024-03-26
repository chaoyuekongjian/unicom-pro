import { defineStore } from 'pinia'
import { toRefs, reactive } from 'vue'

export interface RouterState {
    activeRoute: string
}

export const routerStore = defineStore('routerStore', () => {
    const state = reactive<RouterState>({
        activeRoute: ''
    })

    const changeRouter = (path: string) => {
        state.activeRoute = path
    }
    
    return { ...toRefs(state), changeRouter }
}, {
    persist: {
        enabled: true,
    }
})
