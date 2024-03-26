<template>
  <el-dialog
      title="告警阈值设置"
      v-model="dialogVisible"
      :before-close="handleDialogClose"
      width="50%"
      class="file-container"
      :close-on-click-modal="false"
  >
    <el-form v-loading="form.loading" ref="loginForm" :model="form.detail" :rules="form.rules" label-position="left" label-width="161px">
      <el-form-item prop="storageRate" label="存储使用率告警阈值">
        <el-input
            v-model.trim="form.detail.storageRate"
            placeholder="请输入"
            type="text"
        >
          <template #suffix>
            <div>%</div>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="days" label="可用时长告警阈值">
        <el-input
            v-model.trim="form.detail.days"
            placeholder="请输入"
            type="text"
        >
          <template #suffix>
            <div>天</div>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <div class="dialog-footer">
      <el-button @click="handleDialogClose">取消</el-button>
      <el-button type="primary" @click="handleSure" :disabled="form.loading">确定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import {defineProps, reactive, watch, defineEmits} from 'vue'
import { fetchThreshold, setThreshold } from '@/api'
import {ElMessage} from "element-plus";

const emit = defineEmits(['closeDialog'])

const props = defineProps({
  dialogVisible: Boolean,
})

const form = reactive({
  detail: {
    storageRate: '',
    days: ''
  },
  rules: {},
  loading: false
})

const handleDialogClose = () => {
  emit('closeDialog')
}

const handleSure = () => {
  const params = {
    storageRate: form.detail.storageRate,
    days: form.detail.days
  }
  setThreshold(params).then(res => {
    ElMessage.success('修改告警阈值成功')
    handleDialogClose()
  })
}

const getThreshold = () => {
  form.loading = true
  fetchThreshold().then(res => {
    form.loading = false
    form.detail.storageRate = res.data.data.storageRate
    form.detail.days = res.data.data.days
  }).catch(() => {
    form.loading = false
  })
}

watch(props, val => {
  if (val.dialogVisible) {
    getThreshold()
  }
})
</script>

<style scoped lang="scss">
.el-form-item {
  height: 40px;
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  .el-input {
    height: 40px;
  }
}
.dialog-footer {
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
}
</style>