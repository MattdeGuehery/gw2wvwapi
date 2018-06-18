import axios from 'axios'
import Vue from 'vue'
export default {
    state: {
        isLoading: false,
        Abilities: {},
        AllAbilities: {},
        removedAbilities: {}
    },
    mutations: {
        selectAbility(state, ability) {
            state.Abilities[ability].isChecked = !state.Abilities[ability].isChecked;
        },
        selectAllAbilities(state, value) {
            for (var i in state.Abilities) {
                state.Abilities[i].isChecked = value;
            }
        },
        saveAbilities(state, abilities) {
            var abilitiesObj = {};
            for (var i in abilities) {
                abilitiesObj[i] = !abilitiesObj.hasOwnProperty(i) ? {} : abilitiesObj[i];
                for (var j in abilities[i]) {
                    abilitiesObj[i][j] = !abilitiesObj[i].hasOwnProperty(j) ? abilities[i][j] : abilitiesObj[i][j];
                }
            }
            state.Abilities = abilitiesObj;
        },
        saveAllAbilities(state, abilities) {
            for (var i in abilities) {
                Vue.set(state.AllAbilities, i, abilities[i]);
                for (var j in abilities[i][j]) {
                    Vue.set(state.AllAbilities[i], j, abilities[i][j]);
                }
            }
        },
        saveRemovedAbilities(state, removedAbilities) {
            var removedObj = {};
            for (var i in removedAbilities) {
                removedObj[i] = !removedObj.hasOwnProperty(i) ? {} : removedObj[i];
                for (var j in removedAbilities[i]) {
                    removedObj[i][j] = !removedObj[i].hasOwnProperty(j) ? removedAbilities[i][j] : removedObj[i][j];
                }
            }
            for (var i in state.removedAbilities) {
                removedObj[i] = !removedObj.hasOwnProperty(i) ? {} : removedObj[i];
                for (var j in state.removedAbilities[i]) {
                    removedObj[i][j] = !removedObj[i].hasOwnProperty(j) ? state.removedAbilities[i][j] : removedObj[i][j];
                }
            }
            state.removedAbilities = removedObj;
        },
        isLoading(state, value) {
            state.isLoading = value;
        }
    },
    actions: {
        removeAbility(store, index) {
            var abilitiesObj = {};
            var removedObj = {};
            for (var i in store.state.Abilities) {
                if (i !== index) {
                    abilitiesObj[i] = !abilitiesObj.hasOwnProperty(i) ? {} : abilitiesObj[i];
                    for (var j in store.state.Abilities[i]) {
                        abilitiesObj[i][j] = !abilitiesObj[i].hasOwnProperty(j) ? store.state.Abilities[i][j] : abilitiesObj[i][j];
                    }
                } else {
                    removedObj[index] = !removedObj.hasOwnProperty(index) ? {} : removedObj[index];
                    for (var j in store.state.Abilities[i]) {
                        removedObj[index][j] = !removedObj[index].hasOwnProperty(j) ? store.state.Abilities[index][j] : removedObj[index][j];
                    }
                    removedObj[index].removeIndex = Object.keys(store.state.removedAbilities).length;
                }
            }
            store.commit('saveAbilities', abilitiesObj);
            store.commit('saveRemovedAbilities', removedObj);
        },
        undoAbilityRemove(store) {
            var removedKeys = Object.keys(store.state.removedAbilities);
            if (removedKeys.length === 0) { return }
            var abilityValues = Object.values(store.state.removedAbilities);
            var abilityName = abilityValues.sort((a,b) => { return b.removeIndex - a.removeIndex}).map(y => store.state.removedAbilities[y.name].name)[0];
            var ability = store.state.removedAbilities[abilityName];
            delete ability.removeIndex;
            delete store.state.removedAbilities[ability.name];
            store.state.Abilities[ability.name] = ability;
            store.commit('saveAbilities', store.state.Abilities);
        },
        getAllAbilities(store) {
            store.commit('isLoading', true);
            axios.post('/api', { command: "WvW.Get.Abilities.All" })
            .then((result) => {
                store.commit('isLoading', false);
                var body = result.data.data;
                body.forEach((b, i) => {
                    b.isChecked = false;
                    b.index = i;
                });
                var abilities = {};
                var obj = body.reduce((acc, cur) => {
                    abilities[cur.name] = cur;
                    return abilities;
                }, {});
                store.commit('saveAbilities', abilities);
                store.commit('saveAllAbilities', abilities);
            }).catch(function(err) {
                console.log(err);
            });
        },
        getAbilities(store, abilities) {
            store.commit('isLoading', true);
            
            var data = {
                command: "WvW.Get.Abilities.ByIds",
                record: abilities
            }
            axios.post('/api', data)
            .then((result) => {
                store.commit('isLoading', false);
                var body = result.data.data;
                body.forEach((b, i) => {
                    b.isChecked = false;
                    b.index = i;
                });
                var abilities = {};
                var obj = body.reduce((acc, cur) => {
                    abilities[cur.name] = cur;
                    return abilities;
                }, {});
                store.commit('saveAbilities', abilities);
            }).catch((err) => {
                console.log(err);
            });
        }
    }
  }