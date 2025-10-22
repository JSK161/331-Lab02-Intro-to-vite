<script setup lang="ts">
import EventCard from '../components/EventCard.vue'
import EventInfo from '../components/EventInfo.vue'
import type { Event } from '../types'
import { ref, onMounted, watch } from 'vue'
import EventService from '@/services/EventService'

const events = ref<Event[] | null>(null)

// 监听events数据变化
watch(events, (newValue, oldValue) => {
  console.log('events数据发生变化')
  console.log('旧值：', oldValue)
  console.log('新值：', newValue)
}, { deep: true })

onMounted(() => {
  console.log('组件已挂载，开始获取事件数据...')
  EventService.getEvents()
    .then((response) => {
      console.log('获取数据成功！')
      console.log('返回的数据：', response.data)
      console.log('事件数量：', response.data.length)
      events.value = response.data
      console.log('events状态已更新')
    })
    .catch((error) => {
        console.error('请求失败！错误信息：', error)
        if (error.response) {
          console.error('响应状态：', error.response.status)
          console.error('响应数据：', error.response.data)
        }
      })
      .finally(() => {
        console.log('请求完成')
      })
})
</script>

<template>
  <h1>Events For Good</h1>
  <div class="events">
    <div v-if="events" class="event-list">
      <div v-for="event in events" :key="event.id" class="event-container">
        <EventCard :event="event" />
        <EventInfo :event="event" />
      </div>
    </div>
    <div v-else class="loading">加载中...</div>
  </div>
</template>