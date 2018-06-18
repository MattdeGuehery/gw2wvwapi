import Vue from 'vue'
import Vuex from 'vuex'
import abilities from './abilities_store'
import ranks from './ranks_store'

Vue.use(Vuex);

var store = new Vuex.Store({
    modules: {
        abilities: abilities,
        ranks: ranks
    },
    state: {
        darkMode: false
    },
    mutations: {
        darkMode: function(state, value) {
            state.darkMode = value;
        }
    },
    actions: {
    }
});

export default store;