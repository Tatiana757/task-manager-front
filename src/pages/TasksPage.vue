<template>
  <div class="tasks-container">
    <div class="tasks-header">
      <h1>Задачи</h1>
      <button class="add-task-btn" @click="showModal = true">
        <i class="fas fa-plus"></i> Новая задача
      </button>
    </div>

    <div v-if="isLoading" class="loading">
      Загрузка...
    </div>

    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-else class="kanban-board">
      <!-- Колонка "Новые" -->
      <div class="kanban-column">
        <div class="column-header pending">
          <h2>Новые</h2>
          <span class="task-count">{{ getTasksByStatus('pending').length }}</span>
        </div>
        <div class="column-content">
          <div v-for="task in getTasksByStatus('pending')" 
               :key="task.id" 
               class="task-card"
               @click="openEditModal(task)">
            <h3>{{ task.title }}</h3>
            <p class="description">{{ task.description }}</p>
            <div class="task-info">
              <div class="users-info">
                <p>{{ task.responsible_user.name }}</p>
              </div>
              <div class="dates">
                <p>{{ formatDate(task.created_at) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Колонка "В работе" -->
      <div class="kanban-column">
        <div class="column-header in-progress">
          <h2>В работе</h2>
          <span class="task-count">{{ getTasksByStatus('in_progress').length }}</span>
        </div>
        <div class="column-content">
          <div v-for="task in getTasksByStatus('in_progress')" 
               :key="task.id" 
               class="task-card"
               @click="openEditModal(task)">
            <h3>{{ task.title }}</h3>
            <p class="description">{{ task.description }}</p>
            <div class="task-info">
              <div class="users-info">
                <p>{{ task.responsible_user.name }}</p>
              </div>
              <div class="dates">
                <p>{{ formatDate(task.created_at) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Колонка "Завершенные" -->
      <div class="kanban-column">
        <div class="column-header completed">
          <h2>Завершенные</h2>
          <span class="task-count">{{ getTasksByStatus('completed').length }}</span>
        </div>
        <div class="column-content">
          <div v-for="task in getTasksByStatus('completed')" 
               :key="task.id" 
               class="task-card"
               @click="openEditModal(task)">
            <h3>{{ task.title }}</h3>
            <p class="description">{{ task.description }}</p>
            <div class="task-info">
              <div class="users-info">
                <p>{{ task.responsible_user.name }}</p>
              </div>
              <div class="dates">
                <p>{{ formatDate(task.created_at) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <TaskModal 
      v-if="showModal" 
      :task="selectedTask"
      @close="closeModal"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import TaskModal from '@/components/TaskModal.vue';

export default {
  name: 'TasksPage',
  
  components: {
    TaskModal
  },

  data() {
    return {
      showModal: false,
      selectedTask: null
    }
  },

  computed: {
    ...mapGetters('tasks', ['getTasks', 'isLoading', 'getError', 'getPagination']),
    tasks() {
      return this.getTasks;
    },
    error() {
      return this.getError;
    }
  },

  methods: {
    ...mapActions('tasks', ['fetchTasks']),
    
    getTasksByStatus(status) {
      return this.tasks.filter(task => task.status === status);
    },

    formatDate(dateString) {
      return new Date(dateString).toLocaleString('ru', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      });
    },

    openEditModal(task) {
      this.selectedTask = task;
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
      this.selectedTask = null;
    }
  },

  created() {
    this.fetchTasks();
  }
}
</script>

<style scoped>
.tasks-container {
  padding: 30px;
  max-width: 1400px;
  margin: 0 auto;
  background: #f8f9fa;
  min-height: calc(100vh - 60px);
}

.tasks-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.tasks-header h1 {
  font-size: 28px;
  color: #2c3e50;
  font-weight: 600;
  margin: 0;
}

.add-task-btn {
  background: #42b983;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(66, 185, 131, 0.1);
}

.add-task-btn:hover {
  background: #3aa876;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(66, 185, 131, 0.2);
}

.kanban-board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 20px;
  min-height: calc(100vh - 150px);
}

.kanban-column {
  background: #f1f5f9;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.column-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}

.column-header h2 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.column-header.pending {
  color: #2b6cb0;
}

.column-header.in-progress {
  color: #c05621;
}

.column-header.completed {
  color: #2f855a;
}

.task-count {
  background: rgba(0, 0, 0, 0.1);
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
}

.column-content {
  flex: 1;
  overflow-y: auto;
  padding-right: 4px;
}

.column-content::-webkit-scrollbar {
  width: 4px;
}

.column-content::-webkit-scrollbar-track {
  background: transparent;
}

.column-content::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 2px;
}

.task-card {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.task-card h3 {
  font-size: 16px;
  margin: 0 0 8px 0;
  color: #2d3748;
}

.description {
  font-size: 14px;
  color: #4a5568;
  margin: 0 0 12px 0;
  line-height: 1.4;
}

.task-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #718096;
}

.users-info p {
  margin: 0;
  display: flex;
  align-items: center;
}

.dates p {
  margin: 0;
}

.loading {
  text-align: center;
  padding: 60px;
  color: #4a5568;
  font-size: 16px;
}

.error-message {
  color: #e53e3e;
  background: #fff5f5;
  padding: 16px;
  border-radius: 8px;
  margin: 20px 0;
  font-size: 15px;
  border: 1px solid #fed7d7;
}

@media (max-width: 1024px) {
  .kanban-board {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .kanban-column {
    min-height: auto;
  }
}
</style> 