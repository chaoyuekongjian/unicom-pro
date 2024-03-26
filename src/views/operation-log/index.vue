<template>
  <div class="user-operation-content">
    <div class="title">
      操作日志
    </div>
    <div class="table-content">
      <div class="table-operation">
        <el-input style="margin-left: 24px" v-model="query.search" placeholder="请输入日志内容" @blur="handleSearch">
          <template #suffix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </div>
      <div class="table">
        <el-table :data="tableData.data" height="500" style="width: 100%">
          <el-table-column prop="username" label="操作用户" width="210">
            <template #default="scope">
              {{ scope.row.username || '--' }}
            </template>
          </el-table-column>
          <el-table-column prop="desc" label="操作类型" width="210">
            <template #default="scope">
              {{ scope.row.desc || '--' }}
            </template>
          </el-table-column>
          <el-table-column prop="remoteIp" label="IP" width="210">
            <template #default="scope">
              {{ scope.row.remoteIp || '--' }}
            </template>
          </el-table-column>
          <el-table-column prop="operationAt" label="操作时间" width="210">
            <template #default="scope">
              {{ scope.row.operationAt || '--' }}
            </template>
          </el-table-column>
          <!-- <el-table-column prop="enabled" label="状态" width="210">
            <template #default="scope">
              <i
                  class="iconfont icon-zhengchang"
                  :class="scope.row.enabled ? 'icon-zhengchang theme-green' : 'icon-yichang theme-failed'"
              ></i>
              {{ scope.row.enabled ? '启用' : '禁用' }}
            </template>
          </el-table-column> -->
          <el-table-column prop="detail" label="操作记录">
            <template #default="scope">
              {{ scope.row.detail || '--' }}
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
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { fetchOperationLog } from '@/api'

const query = reactive({
  search: '',
  currentPage: 1,
  pageSize: 10
})

let tableData = reactive({
  data: [],
  total: 100
})

const data = reactive({
  cdmList: []
})

const handleSizeChange = (size: number) => {
  query.pageSize = size
  getList()
}
const handleCurrentChange = (page: number) => {
  query.currentPage = page
  getList()
}

const handleSearch = () => {
  getList()
}

const getList = () => {
  const params = {
    page: query.currentPage - 1,
    size: query.pageSize,
    search: query.search
  }
  fetchOperationLog(params).then(res => {
    tableData.data = res.data.data.content
    tableData.total = res.data.data.total
  })
}
getList()
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