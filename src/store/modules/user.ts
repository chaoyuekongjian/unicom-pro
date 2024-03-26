import { defineStore } from "pinia";
import { toRefs, reactive } from "vue";

export interface UserState {
  username: string;
  password: string;
  token: string;
  roles: Array<string>;
  userInfo: any;
  avatarUrl: string;
}

interface UserInfo {
  roles: string[];
}

export const userStore = defineStore(
  "userStore",
  () => {
    const state = reactive<UserState>({
      username: "",
      password: "",
      token: "",
      roles: [],
      userInfo: "",
      avatarUrl: "",
    });

    const resetToken = () => {
      state.token = "";
    };

    const setUserInfo = (data: any) => {
      state.token = data.token;
      state.userInfo = JSON.stringify(data);
    };

    const setUserAvatar = (url: string) => {
      state.avatarUrl = url;
    };

    const setInfo = (roles: string[]) => {
      state.roles = roles;
    };

    const getInfo = () => {
      return new Promise<UserInfo>((resolve) => {
        setInfo(["dashboard", "user-manage", "operation-log"]);
        resolve({ roles: ["dashboard", "user-manage", "operation-log"] });
      });
    };

    return {
      ...toRefs(state),
      resetToken,
      setUserInfo,
      setUserAvatar,
      getInfo,
    };
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          storage: localStorage, // 默认为sessionStorage
          paths: ["userInfo", "token"], // 数据持久化 指定字段保存
        },
      ],
    },
  }
);
