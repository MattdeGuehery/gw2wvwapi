import axios from 'axios'

export default {
    state: {
        isLoading: false,
        Abilities: [],
        AllAbilities: [],
        removedAbilities: []
    },
    mutations: {
        saveAbilities: function(state, abilities) {
            state.Abilities = abilities;
        },
        removeAbility: function(state, index) {
            state.removedAbilities.push(state.Abilities[index]);
            return state.Abilities.splice(index, 1);
        },
        undoAbilityRemove: function(state, index) {
            if (state.removedAbilities.length === 0) { return }
            var arrayItem = state.removedAbilities.pop();
            state.Abilities.splice(arrayItem.index, 0, arrayItem);
            state.Abilities.sort((a,b) => { b.index - a.index });
            return state.Abilities;
        },
        isLoading(state, value) {
            state.isLoading = value;
        }
    },
    actions: {
        getAllAbilities: function(store) {
            store.commit('isLoading', true);
            var data = {
                command: "WvW.Get.Abilities.All"
            }
            axios.post('/api', data)
            .then(function(result) {
                store.commit('isLoading', false);
                var body = result.data.data;
                body.forEach((b, i) => {
                    b.isChecked = false;
                    b.index = i;
                });
                store.commit('saveAbilities', body);
            }).catch(function(err) {
                console.log(err);
            });
        },
        getAbilities: function(store, abilities) {
            store.commit('isLoading', true);
            
            var data = {
                command: "WvW.Get.Abilities.ByIds",
                record: ['2','4','5','8']
            }
            axios.post('/api', data)
            .then(function(result) {
                store.commit('isLoading', false);
                var body = result.data.data;
                body.forEach((b, i) => {
                    b.isChecked = false;
                    b.index = i;
                });
                store.commit('saveAbilities', body);
            }).catch(function(err) {
                console.log(err);
            });
        }
    }
  }