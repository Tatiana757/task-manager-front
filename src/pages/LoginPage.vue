<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-header">
        <h2>Вход в систему</h2>
        <div class="decorative-line"></div>
      </div>
      
      <div class="form-group">
        <label for="login">Логин:</label>
        <div class="input-wrapper">
          <i class="fas fa-user"></i>
          <input 
            type="text" 
            id="login" 
            v-model="login" 
            required
            placeholder="Введите логин"
          >
        </div>
      </div>

      <div class="form-group">
        <label for="password">Пароль:</label>
        <div class="input-wrapper">
          <i class="fas fa-lock"></i>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            required
            placeholder="Введите пароль"
          >
        </div>
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <button type="submit" class="login-button" :disabled="isLoading">
        <span>{{ isLoading ? 'Вход...' : 'Войти' }}</span>
        <i class="fas fa-arrow-right" v-if="!isLoading"></i>
        <i class="fas fa-spinner fa-spin" v-else></i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'LoginPage',
  
  data() {
    return {
      login: '',
      password: ''
    }
  },

  computed: {
    ...mapGetters('auth', ['isLoading', 'getError']),
    error() {
      return this.getError;
    }
  },

  methods: {
    ...mapActions({
      loginAction: 'auth/login'
    }),
    
    async handleLogin() {
      const success = await this.loginAction({
        login: this.login,
        password: this.password
      });

      if (success) {
        this.$router.push('/tasks');
      }
    }
  }
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
}

.login-form {
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 400px;
  position: relative;
  overflow: hidden;
}

.login-form::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, #42b983, #3aa876);
}

.form-header {
  margin-bottom: 2rem;
  position: relative;
}

.decorative-line {
  width: 50px;
  height: 3px;
  background: #42b983;
  margin-top: 0.5rem;
}

h2 {
  color: #2c3e50;
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 500;
  font-size: 0.9rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper i {
  position: absolute;
  left: 12px;
  color: #42b983;
  font-size: 1rem;
}

input {
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 2.5rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f8f9fa;
}

input:focus {
  outline: none;
  border-color: #42b983;
  background: white;
  box-shadow: 0 0 0 4px rgba(66, 185, 131, 0.1);
}

.login-button {
  width: 100%;
  padding: 0.875rem;
  background: linear-gradient(90deg, #42b983, #3aa876);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 185, 131, 0.2);
}

.login-button i {
  transition: transform 0.3s ease;
}

.login-button:hover i {
  transform: translateX(4px);
}

@media (max-width: 480px) {
  .login-form {
    margin: 1rem;
    padding: 1.5rem;
  }
}

.error-message {
  color: #dc3545;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.fa-spinner {
  margin-left: 0.5rem;
}
</style> 