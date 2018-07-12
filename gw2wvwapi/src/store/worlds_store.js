import axios from 'axios'

export default {
    state: {
        AllWorlds: []
    },
    mutations: {
        saveAllWorlds(state, data) {
            state.AllWorlds = data
        }
    },
    actions: {
        getAllWorlds(store) {
            store.commit('isLoading', true);
            axios.post('/api', { command: 'Worlds.Get.All' })
            .then(result => {
                store.commit('isLoading', false);
                var worlds = result.data.data;
                store.commit('saveAllWorlds', worlds);
            });
        }
    }
  }