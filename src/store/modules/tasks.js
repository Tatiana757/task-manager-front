import { API_URL } from '@/config';

export default {
  namespaced: true,

  state: {
    tasks: [],
    loading: false,
    error: null,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      total: 0,
      perPage: 20
    }
  },

  mutations: {
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_PAGINATION(state, { current_page, last_page, total, per_page }) {
      state.pagination = {
        currentPage: current_page,
        totalPages: last_page,
        total: total,
        perPage: per_page
      };
    }
  },

  actions: {
    async fetchTasks({ commit, rootState }, page = 1) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);

      try {
        const response = await fetch(`${API_URL}/tasks?page=${page}`, {
          headers: {
            'Authorization': `Bearer ${rootState.auth.token}`,
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Ошибка получения задач');
        }

        const data = await response.json();
        
        commit('SET_TASKS', data.data);
        commit('SET_PAGINATION', data.meta);
        
      } catch (error) {
        commit('SET_ERROR', error.message);
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async createTask({ commit, rootState, dispatch }, taskData) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      
      try {
        const response = await fetch(`${API_URL}/tasks`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${rootState.auth.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(taskData)
        });

        if (!response.ok) {
          throw new Error('Ошибка при создании задачи');
        }

        // Обновляем список задач
        await dispatch('fetchTasks');
        return true;
      } catch (error) {
        commit('SET_ERROR', error.message);
        return false;
      } finally {
        commit('SET_LOADING', false);
      }
    }
  },

  getters: {
    getTasks: state => state.tasks,
    isLoading: state => state.loading,
    getError: state => state.error,
    getPagination: state => state.pagination
  }
}; 