<template>
  <div class="personal-center-content">
    <div class="title">
      个人中心
    </div>
    <div class="account-content">
      <div class="account-title">
        我的账号
      </div>
      <div class="account-avatar">
        <div>
          <el-image style="width: 80px; height: 80px; border-radius: 80px" :src="avatarUrl" />
        </div>
        <div>
          {{ username }}
        </div>
        <div class="avatar-change-btn">
          <el-upload
              class="avatar-uploader"
              action="/api/avatar"
              :headers="requestHeaders"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :on-error="handleAvatarFailed"
              >
            <span>修改头像</span>
            <el-icon><ArrowRight /></el-icon>
          </el-upload>
<!--          <span>
            修改头像
          </span>-->
        </div>
      </div>
      <div class="account-info">
        <div>
          我的信息
        </div>
        <el-form ref="loginForm" :model="form.detail" :rules="form.rules" label-width="118px" label-position="left">
          <el-form-item prop="oldPassword" label="原密码">
            <el-input
                clearable
                v-model.trim="form.detail.oldPassword"
                placeholder="请输入原密码"
                type="password"
            />
          </el-form-item>
          <el-form-item prop="newPassword" label="新密码">
            <el-input
                clearable
                v-model="form.detail.newPassword"
                type="password"
                placeholder="密码长度为8~64位，须由数字、字母组成，可包含特殊字符"
            />
          </el-form-item>
          <el-form-item prop="confirmPassword" label="确认新密码">
            <el-input
                clearable
                v-model="form.detail.confirmPassword"
                type="password"
                placeholder="请在此输入新密码"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleChangePwd">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { changePassword } from '@/api'
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import appStore from '@/store'
import { storeToRefs } from 'pinia'

const { avatarUrl, username, token } = storeToRefs(appStore.userStore)
const { setUserAvatar } = appStore.userStore

const requestHeaders = {
  Authorization: 'Bearer ' + token
}

const form = reactive({
  detail: {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  },
  rules: {}
})

const handleChangePwd = () => {
  const params = {
    oldPassword: form.detail.oldPassword,
    newPassword: form.detail.newPassword
  }
  changePassword(params).then(res => {
    ElMessage.success('密码修改成功')
  })
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  // url.value = URL.createObjectURL(uploadFile.raw!)
  avatarUrl.value = response.data.url
  setUserAvatar(response.data.url)
}

const handleAvatarFailed: UploadProps['onError'] = (
    error,
    uploadFile
) => {
  ElMessage.error('头像修改失败')
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (file) => {
  const type = ['image/gif', 'image/jpg', 'image/png', 'image/bmp', 'image/jpeg'].indexOf(file.type) != -1;
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!type) {
    ElMessage.error('允许上传的图片格式有：gif、jpg、png、bmp、jpeg');
    return false
  }
  if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过 2MB!');
    return false
  }
  return true
}
</script>

<style scoped lang="scss">
.personal-center-content {
  background: #F5F5F5;
  height: calc(100% - 50px);
  padding: 24px;
  .title {
    color: #231D1D;
    font-size: 16px;
    margin-bottom: 24px;
  }
  .account-content {
    background: #FFFFFF;
    padding: 16px 24px 88px 24px;
    .account-title {
      color: #303133;
      font-size: 16px;
      margin-bottom: 17px;
    }
    .account-avatar {
      width: 564px;
      height: 160px;
      display: flex;
      align-items: center;
      &>div:nth-child(1) {
        margin-right: 24px;
      }
      &>div:nth-child(2) {
        color: #303133;
        font-size: 20px;
        flex: 1;
      }
      .avatar-change-btn {
        display: flex;
        align-items: center;
        cursor: pointer;
        .avatar-uploader {
          display: flex;
          align-items: center;
          span {
            color: #606266;
            font-size: 12px;
          }
          .el-icon {
            width: 12px;
            height: 12px;
            margin-left: 13.33px;
          }
        }
      }
    }
    .account-info {
      width: 564px;
      padding: 33px 24px;
      .el-form {
        margin-top: 32px;
        .el-form-item {
          height: 40px;
          margin-bottom: 24px;
          .el-input {
            height: 40px;
          }
        }
        ::v-deep .el-form-item__label {
          color: #606266;
          height: 40px;
          line-height: 40px;
          font-weight: normal!important;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
