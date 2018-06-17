import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import abilities from './abilities_store'

Vue.use(Vuex);

var store = new Vuex.Store({
    modules: {
        abilities: abilities
    },
    state: {
        darkMode: false
    },
    mutations: {
        darkMode: function(state) {
            state.darkMode = !state.darkMode;
        }
    },
    actions: {
    }
});

export default store;