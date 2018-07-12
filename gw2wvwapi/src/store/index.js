import Vue from 'vue'
import Vuex from 'vuex'
import abilities from './abilities_store'
import ranks from './ranks_store'
import matches from './matches_store'
import worlds from './worlds_store'
import objectives from './objectives_store'

Vue.use(Vuex);

var store = new Vuex.Store({
    modules: {
        abilities: abilities,
        ranks: ranks,
        matches: matches,
        worlds: worlds,
        objectives: objectives
    },
    state: {
        darkMode: false,
        loadingCount: 0
    },
    mutations: {
        darkMode: function(state, value) {
            state.darkMode = value;
        },
        isLoading(state, value) {
            if (value) {
                state.loadingCount++;
            } else {
                state.loadingCount--;
            }
        }
    },
    getters: {
        isLoading(state) {
            return state.loadingCount > 0;
        }
    },
    actions: {
    }
});

export default store;