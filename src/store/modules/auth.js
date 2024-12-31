import { API_URL } from '@/config';

export default {
  namespaced: true,
  
  state: {
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    role: localStorage.getItem('role') || null,
    permissions: JSON.parse(localStorage.getItem('permissions')) || null,
    loading: false,
    error: null,
    users: []
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_ROLE(state, role) {
      state.role = role;
    },
    SET_PERMISSIONS(state, permissions) {
      state.permissions = permissions;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    CLEAR_AUTH(state) {
      state.token = null;
      state.user = null;
      state.error = null;
    },
    SET_USERS(state, users) {
      state.users = users;
    }
  },

  actions: {
    async login({ commit }, credentials) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      
      try {
        const response = await fetch(`${API_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });

        if (!response.ok) {
          throw new Error('Ошибка авторизации');
        }

        const data = await response.json();
        
        if (data.user.token) {
          const user = data.user;
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify({
            id: user.id,
            name: user.name,
            login: user.login
          }));
          
          commit('SET_TOKEN', user.token);
          commit('SET_USER', {
            id: user.id,
            name: user.name,
            login: user.login
          });

          localStorage.setItem('role', data.role);
          localStorage.setItem('permissions', JSON.stringify(data.permissions));

          commit('SET_ROLE', data.role);
          commit('SET_PERMISSIONS', data.permissions);

          return true;
        }
      } catch (error) {
        commit('SET_ERROR', error.message);
        return false;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async logout({ commit, state }) {
      try {
        const response = await fetch(`${API_URL}/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${state.token}`,
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Ошибка при выходе из системы');
        }
      } catch (error) {
        console.error('Ошибка при выходе:', error);
      } finally {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        commit('CLEAR_AUTH');
      }
    },

    async fetchUsers({ commit, state }) {
      try {
        const response = await fetch(`${API_URL}/users`, {
          headers: {
            'Authorization': `Bearer ${state.token}`,
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Ошибка получения списка пользователей');
        }

        const data = await response.json();
        commit('SET_USERS', data.data);
      } catch (error) {
        console.error('Ошибка при получении пользователей:', error);
      }
    }
  },

  getters: {
    isAuthenticated: state => !!state.token,
    getUser: state => state.user,
    getRole: state => state.role,
    getPermissions: state => state.permissions,
    getError: state => state.error,
    isLoading: state => state.loading,
    getUsers: state => state.users
  }
}; 