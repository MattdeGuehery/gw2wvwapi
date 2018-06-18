import axios from 'axios'
import Vue from 'vue'

export default {
    state: {
        isLoading: false,
        rankTitles: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Mithril', 'Diamond'],
        AllRanks: []
    },
    mutations: {
        saveAllRanks(state, data) {
            for (var i in data) {
                Vue.set(state.AllRanks, i, data[i]);
                for (var j in data[i][j]) {
                    Vue.set(state.AllRanks[i], j, data[i][j]);
                }
            }
        }
    },
    actions: {
        getAllRanks(store) {
            store.commit('isLoading', true);
            axios.post('/api', { command: 'WvW.Get.Ranks.All' })
            .then(result => {
                var ranks = result.data.data;
                ranks.forEach(r => {
                    var bracket = '';
                    var title = r.title.slice(0, r.title.indexOf(' ') + 1).trim();
                    if (store.state.rankTitles && store.state.rankTitles.filter(x => x.indexOf(title) !== -1).length > 0) {
                        bracket = store.state.rankTitles[store.state.rankTitles.indexOf(title)];
                    }
                    Vue.set(r, 'bracket', bracket);
                });
                store.commit('saveAllRanks', ranks);
            });
        }
    }
  }