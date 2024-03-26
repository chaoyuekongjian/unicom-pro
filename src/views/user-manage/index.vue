<template>
  <div class="user-operation-content">
    <div class="title">
      用户管理
    </div>
    <div class="table-content">
      <div class="table-operation">
        <el-button type="primary" @click="handleAdd">
          <el-icon><Plus /></el-icon>
          <span style="margin-left: 5px">添加</span>
        </el-button>
        <el-input style="margin-left: 24px" v-model="query.search" placeholder="请输入用户名称">
          <template #suffix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </div>
      <div class="table">
        <el-table :data="tableData.data" height="500" style="width: 100%">
          <el-table-column type="expand">
            <template #default="props">
              <div class="expand-row">
                <div>
                  <span>客户名称</span>
                  <span>{{ props.row.clientName || '--' }}</span>
                </div>
                <div>
                  <span>联系人</span>
                  <span>{{ props.row.contact || '--' }}</span>
                </div>
                <div>
                  <span>联系电话</span>
                  <span>{{ props.row.mobile || '--' }}</span>
                </div>
                <div>
                  <span>邮箱</span>
                  <span>{{ props.row.email || '--' }}</span>
                </div>
                <div>
                  <span>备注</span>
                  <span>{{ props.row.remarks || '--' }}</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="username" label="用户名称" width="210">
            <template #default="scope">
              {{ scope.row.username || '--' }}
            </template>
          </el-table-column>
          <el-table-column prop="location" label="所属资源池" width="210">
            <template #default="scope">
              {{ scope.row.loaction || '--' }}
            </template>
          </el-table-column>
          <el-table-column prop="storageTotal" label="存储可用量/存储总量/使用率">
            <template #default="scope">
              {{ scope.row.storageTotal || '--' }}
            </template>
          </el-table-column>
<!--          <el-table-column prop="address" label="分配开始时间" width="180" />-->
          <el-table-column prop="expireAt" label="到期时间" width="210">
            <template #default="scope">
              {{ scope.row.expireAt || '--' }}
            </template>
          </el-table-column>
<!--          <el-table-column prop="address" label="分配时间" width="180" />-->
          <el-table-column prop="enabled" label="状态" width="210">
            <template #default="scope">
              <i
                  class="iconfont icon-zhengchang"
                  :class="scope.row.enabled ? 'icon-zhengchang theme-green' : 'icon-yichang theme-failed'"
              ></i>
              {{ scope.row.enabled ? '启用' : '禁用' }}
            </template>
          </el-table-column>
          <el-table-column prop="createdAt" label="用户创建时间" width="210">
            <template #default="scope">
              {{ scope.row.createdAt ? $moment(scope.row.createdAt).format('YYYY-MM-DD HH:mm:ss') : '--' }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="210">
            <template #default="scope">
              <div class="operation-column">
                <el-button type="text" @click="() => handleEdit(scope.row)">编辑</el-button>
                <el-dropdown @command="command => handleCommand(command, scope.row)">
                  <div>
                    <i class="iconfont icon-ellipsis-v1 theme-color cursor" />
                  </div>
                  <template #dropdown>
                    <el-dropdown-menu class="user-dropdown">
                      <el-dropdown-item command="handleChangeVol">容量调整</el-dropdown-item>
                      <el-dropdown-item command="handleChangeTime">时长调整</el-dropdown-item>
                      <el-dropdown-item command="handleDelete">删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
            v-model:currentPage="query.currentPage"
            v-model:page-size="query.pageSize"
            :page-sizes="[10, 20, 30, 50]"
            small
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
      </div>
    </div>

    <AddUserDialog :mode="addUserDialog.mode" :data="addUserDialog.data" :dialog-visible.sync="addUserDialog.show" :cdm-list="data.cdmList" @closeDialog="addUserClose"/>
  </div>
</template>

<script lang="ts" setup>
import AddUserDialog from './components/add-user-dialog.vue'
import {reactive, ref} from 'vue'
import { fetchUserList, fetchCDMs, deleteUser } from '@/api'
import {map, assign} from 'lodash'
import {ElMessage, ElMessageBox} from 'element-plus'

const query = reactive({
  search: '',
  currentPage: 1,
  pageSize: 10
})
let tableData = reactive({
  data: [],
  total: 100
})
const addUserDialog = reactive({
  show: false,
  mode: 'add',
  data: {}
})

const data = reactive({
  cdmList: []
})

const handleSizeChange = size => {
  query.pageSize = size
  getList()
}
const handleCurrentChange = page => {
  query.currentPage = page
  getList()
}

const handleEdit = row => {
  addUserDialog.show = true
  addUserDialog.data = row
  addUserDialog.mode = 'edit'
}

const addUserClose = () => {
  addUserDialog.show = false
  addUserDialog.data = {}
  getList()
}

const handleCommand = (command, row) => {
  if (command == 'handleChangeVol') {
    handleChangeVol(row)
  } else if (command == 'handleChangeTime') {
    handleChangeTime(row)
  } else if (command == 'handleDelete') {
    handleDelete(row)
  }
}

const handleChangeVol = row => {
  addUserDialog.show = true
  addUserDialog.data = row
  addUserDialog.mode = 'storage'
}

const handleChangeTime = row => {
  addUserDialog.show = true
  addUserDialog.data = row
  addUserDialog.mode = 'time'
}

const handleDelete = row => {
  ElMessageBox.confirm('确认删除？', 'Warning',{
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteUser(row.id).then(res => {
      ElMessage.success('删除成功')
      getList()
    })
  })
}

const handleAdd = () => {
  addUserDialog.show = true
  addUserDialog.mode = 'add'
}

const getCdmList = () => {
  const params = {
    withDiskStatus: false,
    withUserStatus: false,
    page: 0,
    size: 9999
  }
  fetchCDMs(params).then(res => {
    data.cdmList = map(res.data.data.content, d => {
      return {
        label: d.name,
        value: d.id
      }
    })
  })
}
const getList = () => {
  const params = {
    page: query.currentPage - 1,
    size: query.pageSize
  }
  fetchUserList(params).then(res => {
    tableData.data = map(res.data.data.content, d => {
      return assign(d, {
        storageTotal: `${d.storage.number}${d.storage.unit}`
      })
    })
    tableData.total = res.data.data.total
  })
}
getList()
getCdmList()
</script>

<style scoped lang="scss">
.user-operation-content {
  background: #F5F5F5;
  height: calc(100% - 50px);
  padding: 24px;
  .title {
    color: #231D1D;
    font-size: 16px;
    margin-bottom: 24px;
  }
  .table-content {
    background: #FFFFFF;
    padding: 16px 24px 88px 24px;
    .table-operation {
      float: right;
      display: flex;
    }
    .table {
      clear: both;
      padding-top: 16px;
    }
    .pagination {
      margin-top: 24px;
      display: flex;
      justify-content: flex-end;
    }
  }
  .operation-column {
    display: flex;
    align-items: center;
    .el-button {
      margin-right: 24px;
    }
  }
  .expand-row {
    padding: 8px 24px;
    font-size: 14px;
    &>div {
      display: flex;
      margin-top: 8px;
      margin-bottom: 16px;
      &>span:nth-child(1) {
        width: 80px;
        color: #909399;
      }
      &>span:nth-child(2) {
        color: #606266
      }
    }
  }
}
</style>