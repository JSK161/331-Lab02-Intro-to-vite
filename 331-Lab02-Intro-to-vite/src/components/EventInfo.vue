<template>
  <div class="event-info">
    <div class="info-item">{{ event.category }}</div>
    <div class="info-item">{{ event.organizer }}</div>
  </div>
</template>

<script setup lang="ts">
import type { Event } from '../types';

interface Props {
  event: Event;
}

const props = defineProps<Props>();
</script>

<style scoped>
.event-info {
  text-align: right;
  width: 100%;
  max-width: 300px;
  margin: 10px 0;
}

.info-item {
  font-size: 16px;
  margin: 5px 0;
}
</style>