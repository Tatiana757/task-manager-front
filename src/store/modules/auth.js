import { API_URL } from '@/config';

export default {
  namespaced: true,
  
  state: {
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
    error: null
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, user) {
      state.user = user;
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
        
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify({
            id: data.id,
            name: data.name,
            login: data.login
          }));
          
          commit('SET_TOKEN', data.token);
          commit('SET_USER', {
            id: data.id,
            name: data.name,
            login: data.login
          });
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
    }
  },

  getters: {
    isAuthenticated: state => !!state.token,
    getUser: state => state.user,
    getError: state => state.error,
    isLoading: state => state.loading
  }
}; 