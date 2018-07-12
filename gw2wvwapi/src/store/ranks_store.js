import axios from 'axios'

export default {
    state: {
        rankTitles: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Mithril', 'Diamond'],
        AllRanks: [{
            id: '',
            min_rank: '',
            bracket: '',
            title: ''
        }]
    },
    mutations: {
        saveAllRanks(state, data) {
            state.AllRanks = data;
        }
    },
    actions: {
        getAllRanks(store) {
            store.commit('isLoading', true);
            axios.post('/api', { command: 'WvW.Get.Ranks.All' })
            .then(result => {
                store.commit('isLoading', false);
                var ranks = result.data.data;
                store.commit('saveAllRanks', ranks);
            });
        }
    }
  }