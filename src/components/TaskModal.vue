<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>{{ title }}</h3>
        <button class="close-btn" @click="$emit('close')">&times;</button>
      </div>

      <form @submit.prevent="handleSubmit" class="task-form">
        <div class="form-group">
          <label>Название:</label>
          <input 
            v-model="form.title" 
            type="text" 
            required
            placeholder="Введите название задачи"
          >
        </div>

        <div class="form-group">
          <label>Описание:</label>
          <textarea 
            v-model="form.description" 
            rows="4"
            placeholder="Введите описание задачи"
          ></textarea>
        </div>

        <div class="form-group">
          <label>Статус:</label>
          <select v-model="form.status">
            <option value="new">Новая</option>
            <option value="in_progress">В работе</option>
            <option value="completed">Завершена</option>
          </select>
        </div>

        <div class="form-group">
          <label>Ответственный:</label>
          <select v-model="form.responsible_user_id" required>
            <option value="" disabled>Выберите ответственного</option>
            <option v-for="user in users" :key="user.id" :value="user.id">
              {{ user.name }}
            </option>
          </select>
        </div>

        <div class="form-actions">
          <button type="button" class="cancel-btn" @click="$emit('close')">
            Отмена
          </button>
          <button type="submit" class="submit-btn" :disabled="isLoading">
            {{ isLoading ? 'Создание...' : 'Создать' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'TaskModal',
  
  data() {
    return {
      form: {
        title: '',
        description: '',
        status: 'new',
        responsible_user_id: ''
      }
    }
  },

  computed: {
    ...mapGetters('tasks', ['isLoading']),
    ...mapGetters('auth', ['getUsers']),
    users() {
      return this.getUsers;
    }
  },

  methods: {
    ...mapActions('tasks', ['createTask']),
    ...mapActions('auth', ['fetchUsers']),
    
    async handleSubmit() {
      const success = await this.createTask(this.form);
      if (success) {
        this.$emit('close');
      }
    }
  },

  created() {
    this.fetchUsers();
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  padding: 24px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.modal-header h3 {
  margin: 0;
  color: #2c3e50;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #718096;
}

.task-form {
  display: grid;
  gap: 20px;
}

.form-group {
  display: grid;
  gap: 8px;
}

.form-group label {
  font-size: 14px;
  color: #4a5568;
}

.form-group input,
.form-group textarea,
.form-group select {
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 12px;
}

.cancel-btn,
.submit-btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}

.cancel-btn {
  background: white;
  border: 1px solid #e2e8f0;
  color: #4a5568;
}

.submit-btn {
  background: #42b983;
  border: none;
  color: white;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style> 