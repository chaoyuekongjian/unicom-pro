<template>
  <div class="login-container">
    <el-image class="el-image-bg" :src="require('@/assets/images/login/bg.png')">
      <div slot="placeholder" class="image-slot">
        加载中<span class="dot">...</span>
      </div>
    </el-image>
    <div class="form-content">
      <div class="logo-content">
        <img src="@/assets/images/login/logo.png" alt="">
        <div>联通云运营管理平台</div>
      </div>
      <div class="login-content">
        <div class="title">欢迎登录</div>
        <el-form ref="loginForm" :model="form.detail" :rules="form.rules">
          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
                clearable
                ref="username"
                v-model.trim="form.detail.username"
                placeholder="账号"
                name="username"
                type="text"
                tabindex="1"
                @keyup.enter.native="handleLogin"
            />
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
                clearable
                ref="password"
                v-model="form.detail.password"
                type="password"
                placeholder="密码"
                name="password"
                tabindex="2"
                @keyup.enter.native="handleLogin"
            />
          </el-form-item>
          <div class="checkbox-label">
            <el-checkbox v-model="rememberPwd">记住密码</el-checkbox>
            <el-button type="text">忘记密码</el-button>
          </div>
          <el-button class="login-btn" @click="handleLogin">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { login } from '@/api'
import appStore from '@/store'
import { useRouter } from 'vue-router'

const { setUserInfo } = appStore.userStore
const { changeRouter } = appStore.routerStore
const router = useRouter()

const loginForm = ref<FormInstance>()

const validateUsername = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  }
  else {
    callback()
  }
}
const validatePassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  }
  else {
    callback()
  }
}

const form = reactive({
  detail: {
    username: '',
    password: ''
  },
  rules: {
    username: [{validator: validateUsername,trigger: 'blur', type: 'string', required: true}],
    password: [{validator: validatePassword,trigger: 'blur', type: 'string', required: true}]
  }
})
const rememberPwd = ref(false)

const handleLogin = (e: Event) => {
  loginForm.value.validate((valid, msg) => {
    if (valid) {
      const params = {
        username: form.detail.username,
        password: form.detail.password
      }
      login(params).then(res => {
        if (res.data.code == 'SUCCEEDED') {
          // store.commit('user/SET_USER_INFO', res.data.data)
          // store.commit('router/CHANGE_ROUTE', '/dashboard')
          setUserInfo(res.data.data)
          changeRouter('/dashboard')
          router.push('/dashboard')
        }
      })
    }
  })
}
</script>

<style scoped lang="scss">
$themeColor: #D80A17;
.login-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  min-width: 1366px;
  background-color: #F7F9FB;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 1440px) {
    min-height: 768px;
  }
  @media screen and (min-width: 1441px) {
    min-height: 900px;
  }

  .form-content {
    flex: 0 0 448px;
    padding: 140px 160px 0 160px;
    color: #231D1D;
    .logo-content {
      display: flex;
      img {
        flex: 0 0 146px;
      }
      &>div {
        flex: 0 0 270px;
        margin-left: 32px;
        display: flex;
        align-items: flex-end;
        font-size: 30px;
      }
    }
    .login-content {
      margin-top: 80px;
      .title {
        font-size: 38px;
        font-weight: bold;
        letter-spacing: 5px;
      }
      .el-form {
        margin-top: 48px;
        .el-input {
          height: 54px;
          font-size: 16px;
        }
      }
      .el-form-item {
        margin-bottom: 32px;
      }
      ::v-deep .el-input__wrapper {
        padding-left: 44px;
      }
      .svg-container {
        color: $themeColor;
        vertical-align: middle;
        display: inline-block;
        width: 30px;
        position: absolute;
        z-index: 999;
        .svg-icon {
          height: 14px;
          height: 14px;
        }
        padding: 6px 5px 6px 15px;
        // @media screen and (min-width: 1440px) {
        //   padding: 6px 5px 6px 15px;
        // }
        // @media screen and (max-width: 1439px) {

        // }
      }
      .checkbox-label {
        display: flex;
        justify-content: space-between;
      }
      .login-btn {
        margin-top: 32px;
        width: 100%;
        height: 54px;
        border-radius: 83px;
        background: linear-gradient(-89.1deg, #D80A17 0%, #FD4853 100%);
        color: #fff;
        font-size: 16px;
        letter-spacing: 5px;
        border: none;
      }
    }
  }
}
</style>
