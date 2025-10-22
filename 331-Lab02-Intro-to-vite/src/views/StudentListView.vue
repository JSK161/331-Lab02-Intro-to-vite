<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Student } from '../services/StudentService'

// Initialize empty array, data will be filled from mock data
const students = ref<Student[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// Using local mock data on component mount
onMounted(() => {
  loading.value = true
  try {
    console.log('Using local mock data...')
    // Local mock data (English)
    students.value = [
      { name: 'John', surname: 'Smith', gpa: 3.8, id: '1' },
      { name: 'Emma', surname: 'Johnson', gpa: 3.9, id: '2' },
      { name: 'Michael', surname: 'Brown', gpa: 3.7, id: '3' },
      { name: 'Sophia', surname: 'Davis', gpa: 4.0, id: '4' },
      { name: 'James', surname: 'Wilson', gpa: 3.6, id: '5' }
    ]
    console.log('Local mock data loaded successfully! Total', students.value.length, 'students')
  } catch (err) {
    console.error('Error loading local data:', err)
    error.value = 'Failed to load data'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="student-list-container">
    <h1>Student Information List</h1>
    
    <!-- Loading state -->
    <div v-if="loading" class="loading">Loading student data from API...</div>
    
    <!-- Error state -->
    <div v-else-if="error" class="error">{{ error }}</div>
    
    <!-- Student list -->
    <div v-else-if="students.length > 0" class="student-cards">
      <div v-for="student in students" :key="student.id || `${student.name}-${student.surname}`" class="student-card">
        <h2>{{ student.name }} {{ student.surname }}</h2>
        <div class="gpa">GPA: {{ student.gpa.toFixed(2) }}</div>
      </div>
    </div>
    
    <!-- No data state -->
    <div v-else class="no-data">No student data found</div>
  </div>
</template>

<style scoped>
.student-list-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 28px;
}

.loading, .error, .no-data {
  text-align: center;
  padding: 60px 20px;
  font-size: 18px;
}

.error {
  color: #e74c3c;
  background-color: #fdedec;
  border-radius: 8px;
  border: 1px solid #f5c6cb;
}

.no-data {
  color: #6c757d;
}

.student-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.student-card {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  border: 2px solid #3498db;
}

.student-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.student-card h2 {
  margin: 0 0 15px 0;
  color: #2c3e50;
  font-size: 20px;
}

.gpa {
  font-size: 18px;
  font-weight: bold;
  color: #3498db;
}
</style>