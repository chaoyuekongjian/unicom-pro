<template>
  <div class="content">
    <UserStatistics :data="data.userStatistics" v-show="data.dataReceived" />
    <CapacityStatistics :data="data.capacityStatistics" v-show="data.dataReceived" />

    <locationPoint
        v-for="item in data.cityList"
        :position="{top: item.top || 0, left: item.left || 0, nameOffset: item.nameOffset, itemOffset: item.itemOffset}"
        :name="item.name"
        :warn="item.warn"
        :data="item.data"
    />
  </div>
</template>

<script setup lang="ts">
import UserStatistics from './components/user-statistics.vue'
import CapacityStatistics from './components/capacity-statistics.vue'
import locationPoint from './components/location-point.vue'

import { fetchCDMs } from '@/api'
import { map, find, assign } from 'lodash'
import {reactive} from 'vue'

// const cityList = [
//   {name: '广州市', top: '400px', left: '920px', nameOffset: { marginLeft: '0px', marginTop: '20px' }, itemOffset: { marginLeft: '20px', marginTop: '-40px' }},
//   {name: '深圳市', top: '570px', left: '1150px', nameOffset: { marginLeft: '-60px', marginTop: '-20px' }, itemOffset: { marginLeft: '20px', marginTop: '-30px' }},
//   {name: '佛山市', top: '430px', left: '870px', nameOffset: { marginLeft: '-60px', marginTop: '-20px' }, itemOffset: { marginLeft: '-50px', marginTop: '10px' }},
//   {name: '东莞市', top: '460px', left: '1050px', nameOffset: { marginLeft: '-40px', marginTop: '20px' }, itemOffset: { marginLeft: '25px', marginTop: '-10px' }, warn: true}
// ]

const data = reactive({
  userStatistics: [],
  capacityStatistics: [],
  dataReceived: false,
  cityList: [
    {name: '广州', label: '广州市', top: '400px', left: '920px', nameOffset: { marginLeft: '0px', marginTop: '20px' }, itemOffset: { marginLeft: '20px', marginTop: '-40px' }},
    {name: '深圳', label: '深圳市', top: '570px', left: '1150px', nameOffset: { marginLeft: '-60px', marginTop: '-20px' }, itemOffset: { marginLeft: '20px', marginTop: '-30px' }},
    {name: '佛山', label: '佛山市', top: '430px', left: '870px', nameOffset: { marginLeft: '-60px', marginTop: '-20px' }, itemOffset: { marginLeft: '-50px', marginTop: '10px' }},
    {name: '东莞', label: '东莞市', top: '460px', left: '1050px', nameOffset: { marginLeft: '-40px', marginTop: '20px' }, itemOffset: { marginLeft: '25px', marginTop: '-10px' }, warn: true}
  ]

})

const getCDMs = () => {
  const params = {
    withDiskStatus: true,
    withUserStatus: true,
    page: 0,
    size: 9999
  }
  fetchCDMs(params).then(res => {
    data.userStatistics = map(res.data.data.content, d => {
      return {
        name: d.name,
        userCount: d.totalTenantCount,
        usableUserCount: d.enableTenantCount
      }
    })
    data.capacityStatistics = map(res.data.data.content, d => assign(d.cdmDiskStorageStatus, {
      name: d.name
    }))
    data.dataReceived = true
    map(data.cityList, d => {
      const temp = find(res.data.data.content, i => i.name == d.name)
      if (temp) {
        d.data = {
          userCount: temp.totalTenantCount,
          usableUserCount: temp.enableTenantCount,
          usedPercent: temp.cdmDiskStorageStatus.usedPercent,
          percentage: Number(temp.cdmDiskStorageStatus.usedPercent.split('%')[0]),
          usedCount: Number(temp.cdmDiskStorageStatus.used.split(' ')[0]),
          usedUnit: temp.cdmDiskStorageStatus.used.split(' ')[1],
          totalCount: Number(temp.cdmDiskStorageStatus.total.split(' ')[0]),
          totalUnit: temp.cdmDiskStorageStatus.total.split(' ')[1]
        }
      }
    })
  })
}
getCDMs()
</script>

<style lang="scss">
.content {
  height: calc(100% - 80px);
  background: url('@/assets/images/dashboard/map.png') no-repeat center center;
  background-size: cover;
  padding: 40px 24px;
}
.statistics {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 6px 0 #646A813F;
  width: 371px;
  padding: 24px;
  .title {
    height: 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &>div:nth-child(1) {
      color: #303133;
      font-family: PingFang SC;
      font-weight: 400;
      font-size: 20px;
      line-height: normal;
      letter-spacing: 1px;
    }
    &>div:nth-child(2) {
      color: #D80A17;
      font-size: 12px;
      line-height: normal;
      letter-spacing: 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      &>span {
        margin-right: 13.33px;
      }
    }
  }
}
</style>