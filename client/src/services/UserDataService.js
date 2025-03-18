import http from '../http-common'

class UserDataService {
  create (data) {
    return http.post('/user', data)
  }

  login (data) {
    return http.post('/user/login', data)
      .then(response => {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('role', response.data.role)
        return response.data
      })
  }

  getAuth () {
    return http.get('/user/auth', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  logout () {
    return http.get('/user/logout')
  }

  getAllTasks () {
    return http.get('/tasks')
  }

  getUserTasks (username) {
    return http.get(`/tasks/user/${username}`)
  }

  createTask (taskData) {
    console.log('Send task :', taskData)
    return http.post('/tasks/create', taskData)
  }

  updateTaskStatus (taskId, status) {
    return http.put('/tasks/update-status', { taskId, status })
  }

  getClients () {
    return http.get('/tasks/clients')
      .then(response => {
        console.log('Customers received :', response.data)
        return response
      })
      .catch(error => {
        console.error('Error retrieving customers :', error.response?.data || error)
        throw error
      })
  }

  deleteTask (taskId) {
    console.log(`Delete ID task : ${taskId}`)
    return http.delete(`/tasks/${taskId}`)
  }
}

export default new UserDataService()
