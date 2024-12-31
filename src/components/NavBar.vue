<template>
  <nav class="navbar">
    <div class="navbar-content">
      <div class="navbar-brand">
        <img src="@/assets/logo.png" alt="Logo" class="logo">
        <span class="brand-name">Task Manager</span>
      </div>

      <div class="navbar-right">
        <div class="user-info" v-if="user">
          <span class="user-name">{{ user.name }}</span>
          <div class="avatar">
            {{ getUserInitials }}
          </div>
        </div>
        
        <button @click="handleLogout" class="logout-btn">
          <i class="fas fa-sign-out-alt"></i>
          Выйти
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'NavBar',

  computed: {
    ...mapGetters('auth', ['getUser']),
    user() {
      return this.getUser;
    },
    getUserInitials() {
      if (!this.user?.name) return '';
      return this.user.name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase();
    }
  },

  methods: {
    ...mapActions('auth', ['logout']),
    async handleLogout() {
      await this.logout();
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.navbar {
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 12px 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  height: 32px;
  width: auto;
}

.brand-name {
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-name {
  font-size: 14px;
  color: #4a5568;
}

.avatar {
  width: 36px;
  height: 36px;
  background: #42b983;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
}

.logout-btn {
  background: none;
  border: none;
  color: #718096;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  transition: all 0.2s ease;
}

.logout-btn:hover {
  background: #f7fafc;
  color: #e53e3e;
}

@media (max-width: 768px) {
  .navbar-content {
    padding: 0 20px;
  }

  .brand-name {
    display: none;
  }

  .user-name {
    display: none;
  }
}
</style> 