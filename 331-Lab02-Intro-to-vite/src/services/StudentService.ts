import axios from 'axios'

// 创建axios实例
const apiClient = axios.create({
  baseURL: 'https://dv-student-backend-2019.appspot.com',
  headers: {
    'Content-Type': 'application/json'
  }
})

// 定义学生类型接口
export interface Student {
  name: string
  surname: string
  gpa: number
  id?: string
}

// 学生服务类
class StudentService {
  // 获取所有学生信息
  async getStudents() {
    try {
      const response = await apiClient.get<Student[]>('/students')
      return response
    } catch (error) {
      console.error('获取学生信息失败:', error)
      throw error
    }
  }
}

export default new StudentService()