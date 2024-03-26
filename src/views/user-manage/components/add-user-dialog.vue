<template>
  <el-dialog
      :title="getTitle"
      v-model="dialogVisible"
      :before-close="handleDialogClose"
      width="50%"
      class="file-container"
      :close-on-click-modal="false"
  >
    <el-form :model="form.detail" :rules="form.rules" label-position="left" label-width="120px">
      <el-form-item prop="clientName" label="客户名称" v-if="mode == 'add' || mode =='edit'">
        <el-input
            clearable
            v-model.trim="form.detail.clientName"
            placeholder="请输入客户名称"
            type="text"
        />
      </el-form-item>
      <el-form-item prop="username" label="用户名称" v-if="mode == 'add' || mode =='edit'">
        <el-input
            clearable
            v-model.trim="form.detail.username"
            placeholder="请输入用户名称，支持中文、英文、数字、下划线"
            type="text"
        />
      </el-form-item>
      <el-form-item prop="username" label="用户密码" v-if="mode == 'add'">
        <el-input
            clearable
            v-model.trim="form.detail.password"
            placeholder="请输入用户密码"
            type="password"
        />
      </el-form-item>
      <el-form-item prop="cdmInstanceId" label="所属资源池" v-if="mode == 'add' || mode =='edit'">
        <el-select v-model="form.detail.cdmInstanceId" style="width: 100%" :disabled="props.mode == 'edit'">
          <el-option
              v-for="item in cdmList"
              :key="item.value"
              :value="item.value"
              :label="item.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="storageNumber" label="分配存储容量" v-if="mode == 'add' || mode == 'storage'">
        <el-input
            clearable
            v-model.trim="form.detail.storageNumber"
            placeholder="请输入"
            type="text"
        >
          <template #append>
            <el-select v-model="form.detail.storageUnit" style="width: 79px">
              <el-option label="GB" value="GB" />
              <el-option label="TB" value="TB" />
            </el-select>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="spanNumber" label="分配可用时长" v-if="mode == 'add' || mode =='time'">
        <el-input
            clearable
            v-model.trim="form.detail.spanNumber"
            placeholder="请输入"
            type="text"
        >
          <template #append>
            <el-select v-model="form.detail.spanUnit" style="width: 79px">
              <el-option label="月" value="MONTH" />
              <el-option label="年" value="YEAR" />
            </el-select>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="enabled" label="状态" v-if="mode == 'add' || mode =='edit'">
        <el-switch
            v-model="form.detail.enabled"
        />
        <span style="margin-left: 8px">
          {{ form.detail.enabled ? '启用' : '禁用' }}
        </span>
      </el-form-item>
      <el-form-item prop="contact" label="联系人" v-if="mode == 'add' || mode =='edit'">
        <el-input
            clearable
            v-model.trim="form.detail.contact"
            placeholder="请输入联系人"
            type="text"
        />
      </el-form-item>
      <el-form-item prop="mobile" label="联系电话" v-if="mode == 'add' || mode =='edit'">
        <el-input
            clearable
            v-model.trim="form.detail.mobile"
            placeholder="请输入联系电话"
            type="text"
        />
      </el-form-item>
      <el-form-item prop="email" label="邮箱" v-if="mode == 'add' || mode =='edit'">
        <el-input
            clearable
            v-model.trim="form.detail.email"
            placeholder="请输入邮箱"
            type="text"
        />
      </el-form-item>
      <el-form-item prop="remarks" label="备注" v-if="mode == 'add' || mode =='edit'">
        <el-input
            clearable
            v-model.trim="form.detail.remarks"
            placeholder="请输入备注"
            type="text"
        />
      </el-form-item>
    </el-form>
    <div class="dialog-footer">
      <el-button @click="handleDialogClose">取消</el-button>
      <el-button type="primary" @click="handleSure">确定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import {defineProps, reactive, defineEmits, watch, computed} from 'vue'
import { createUser, editUser, editStorage, editTime } from '@/api'
import {ElMessage} from 'element-plus'
import { get } from 'lodash'

const emit = defineEmits(['closeDialog'])

const props = defineProps({
  dialogVisible: Boolean,
  cdmList: Array,
  mode: String,
  data: Object
})
const form = reactive({
  detail: {
    username: '',
    password: '',
    clientName: '',
    volume: '',
    enabled: true,
    contact: '',
    mobile: '',
    email: '',
    remarks: '',
    cdmInstanceId: '',
    storageNumber: '',
    storageUnit: 'TB',
    spanNumber: '',
    spanUnit: 'MONTH',
    start: ''
  },
  rules: {
    username: [{trigger: 'blur', type: 'string', required: true}],
    clientName: [{trigger: 'blur', type: 'string', required: true}],
    password: [{trigger: 'blur', type: 'string', required: true}],
    cdmInstanceId: [{trigger: 'blur', type: 'string', required: true}],
    storageNumber: [{trigger: 'blur', type: 'string', required: true}],
    enabled: [{trigger: 'blur', type: 'string', required: true}],
    spanNumber: [{trigger: 'blur', type: 'string', required: true}],
    contact: [{trigger: 'blur', type: 'string', required: true}],
    mobile: [{trigger: 'blur', type: 'string', required: true}],
    email: [{trigger: 'blur', type: 'string', required: true}],
    remarks: [{trigger: 'blur', type: 'string', required: true}],
  }
})

const handleDialogClose = () => {
  initForm()
  emit('closeDialog')
}

const handleSure = () => {
  let params
  if (props.mode == 'add' || props.mode == 'edit') {
    params = {
      username: form.detail.username,
      clientName: form.detail.clientName,
      password: props.mode == 'add' ? form.detail.password : undefined,
      cdmInstanceId: props.mode == 'add' ? form.detail.cdmInstanceId : undefined,
      storage: props.mode == 'add' ? {
        number: Number(form.detail.storageNumber),
        unit: form.detail.storageUnit
      } : undefined,
      time: props.mode == 'add' ? {
        start: form.detail.start || Date.parse(new Date()),
        spanNumber: form.detail.spanNumber,
        spanUnit: form.detail.spanUnit
      } : undefined,
      enabled: form.detail.enabled,
      contact: form.detail.contact,
      mobile: form.detail.mobile,
      email: form.detail.email,
      remarks: form.detail.remarks
    }
  } else if (props.mode == 'storage') {
    params = {
      number: Number(form.detail.storageNumber),
      unit: form.detail.storageUnit
    }
  } else if (props.mode == 'time') {
    params = {
      start: form.detail.start || Date.parse(new Date()),
      spanNumber: form.detail.spanNumber,
      spanUnit: form.detail.spanUnit
    }
  }

  const func = {
    'add': createUser,
    'edit': editUser,
    'storage': editStorage,
    'time': editTime
  }

 /* const func = () => {
    switch(props.mode) {
      case 'add':
        return createUser;
      case 'edit':
        return editUser;
      case 'storage':
        // return editStorage
    }
  }*/

  func[props.mode](params, props.mode == 'add' ? undefined : props.data.id).then(res => {
    const message = {
      'add': '用户创建成功',
      'edit': '用户修改成功',
      'storage': '容量修改成功',
      'time': '时长修改成功'
    }
    ElMessage.success(message[props.mode])
    handleDialogClose()
  })
}

const initForm = () => {
  form.detail = {
    username: '',
    password: '',
    clientName: '',
    volume: '',
    enabled: true,
    contact: '',
    mobile: '',
    email: '',
    remarks: '',
    cdmInstanceId: '',
    storageNumber: '',
    storageUnit: 'TB',
    spanNumber: '',
    spanUnit: 'MONTH',
    start: ''
  }
}

watch(props, val => {
  if (val.dialogVisible) {
    if (val.mode == 'edit') {
      form.detail = val.data
      form.detail.storageNumber = get(val, 'data.storage.number', '')
      form.detail.storageUnit = get(val, 'data.storage.unit', '')
    } else if (val.mode == 'storage') {
      form.detail.storageNumber = get(val, 'data.storage.number', '')
      form.detail.storageUnit = get(val, 'data.storage.unit', '')
    } else if (val.mode == 'time') {
      form.detail.spanNumber = get(val, 'data.time.spanNumber', '')
      form.detail.spanUnit = get(val, 'data.time.spanUnit', '')
      form.detail.start = get(val, 'data.time.start', '')
    }
  }
})

const getTitle = computed(() => {
  if (props.mode == 'add') {
    return '添加用户'
  } else if (props.mode == 'edit') {
    return '编辑用户'
  } else if (props.mode == 'storage') {
    return '容量调整'
  } else if (props.mode == 'time') {
    return '时长调整'
  }
})
</script>

<style scoped lang="scss">
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>