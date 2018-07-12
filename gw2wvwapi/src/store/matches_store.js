import axios from 'axios'

export default {
    state: {
        AllMatches: []
    },
    mutations: {
        saveAllMatches(state, data) {
            state.AllMatches = data;
        }
    },
    actions: {
        getAllMatches(store) {
            store.commit('isLoading', true);
            axios.post('/api', { command: 'WvW.Get.Matches.All' })
            .then(result => {
                store.commit('isLoading', false);
                var matches = result.data.data;
                store.commit('saveAllMatches', matches);
            });
        }
    }
  }