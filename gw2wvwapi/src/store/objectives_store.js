import axios from 'axios'

export default {
    state: {
        AllObjectives: []
    },
    mutations: {
        saveAllObjectives(state, data) {
            state.AllObjectives = data;
        }
    },
    actions: {
        getAllObjectives(store) {
            store.commit('isLoading', true);
            axios.post('/api', { command: 'WvW.Get.Objectives.All' })
            .then(result => {
                store.commit('isLoading', false);
                var objectives = result.data.data;
                store.commit('saveAllObjectives', objectives);
            });
        }
    }
  }