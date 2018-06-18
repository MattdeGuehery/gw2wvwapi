<template>
    <div>
        <el-row class="margin-space-bottom" :gutter="10">
            <el-col :span="12"><el-button :loading="isLoading" type="primary" class="abilities-button" @click="restoreAbilities">Restore All Abilities</el-button></el-col>
            <el-col :span="12"><el-button :disabled="Object.keys(removedAbilities).length === 0" :loading="isLoading" type="primary" class="abilities-button" @click="undoAbilityRemove">Undo Remove</el-button></el-col>
        </el-row>
        <el-collapse class="margin-space-bottom collapse">
            <el-row class="margin-space-bottom">
                <el-col :span="24"><el-button :disabled="checkedAbilities.length === 0" :loading="isLoading" type="primary" class="abilities-button" @click="getSelectedAbilities">Get Selected Abilities</el-button></el-col>
            </el-row>
            <el-row class="margin-space-bottom">
                <el-col>
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleSelectAllChange" border>Select All</el-checkbox>
                </el-col>
                <el-checkbox-group v-model="checkedAbilities" @change="handleAbilitySelection">
                    <el-col :span="24">
                        <el-checkbox v-for="ability in AllAbilities" :name="ability.name" :label="ability.name" :value="ability.name" :checked="ability.isChecked" :key="ability.id" border>{{ ability.name }}</el-checkbox>
                    </el-col>
                </el-checkbox-group>
            </el-row>
        </el-collapse>
        <el-container class="margin-space-bottom" v-for="(a, index) in Abilities" :key="a.id">
            <el-aside width="128px"><img class="aside icon" :src="a.icon" /></el-aside>
            <el-container>
                <el-header class="background margin-space-bottom"><h2>{{ a.name }}</h2></el-header>
                <el-row type="flex" justify="end">
                    <el-col class="description" :span="24">{{ a.description }}</el-col>
                </el-row>
                <el-main>
                    <el-row class="margin-space-bottom" type="flex" justify="end">
                        <el-col :span="3"><div class="grid-content"><b>Rank</b></div></el-col>
                        <el-col :span="18"><div class="grid-content"><b>Effect</b></div></el-col>
                        <el-col :span="3"><div class="grid-content"><b>Ability Cost</b></div></el-col>
                    </el-row>
                    <el-row type="flex" justify="end" v-for="(r, i) in a.ranks" :key="i">
                        <el-col :class="{ 'odd': (i % 2 === 0) }" :span="3"><div class="grid-content">Rank {{ i+1 }}</div></el-col>
                        <el-col :class="{ 'odd': (i % 2 === 0) }" :span="18"><div class="grid-content">{{ r.effect }}</div></el-col>
                        <el-col :class="{ 'odd': (i % 2 === 0) }" :span="3"><div class="grid-content">{{ r.cost }}</div></el-col>
                    </el-row>
                </el-main>
            </el-container>
            <el-aside><el-button type="danger" @click="removeAbility(index)">Remove Rank</el-button><br/></el-aside>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: 'Abilities',
        data() {
            return {
                checkAbilities: [],
                checkAll: false,
                isIndeterminate: false
            }
        },
        mounted() {
            this.$store.dispatch('getAllAbilities');
        },
        methods: {
            handleSelectAllChange(value) {
                if (value) {
                    var abilityArray = [];
                    for (var i in this.$store.state.abilities.Abilities) {
                        abilityArray.push(i);
                    }
                    this.checkAbilities = abilityArray;
                } else {
                    this.checkAbilities = [];
                }
                this.$store.commit('selectAllAbilities', value);
                this.isIndeterminate = false;
            },
            handleAbilitySelection(value) {
                if (value && value.length) {
                    var abilityLength = Object.keys(this.$store.state.abilities.AllAbilities).length;
                    this.checkAll = value.length === abilityLength;
                    this.$store.commit('selectAbility', value[value.length - 1]);
                }
                this.isIndeterminate = this.checkAbilities.length > 0 && this.checkAbilities.length < abilityLength;
            },
            getSelectedAbilities() {
                var abilityids = this.checkedAbilities.map(x => this.$store.state.abilities.AllAbilities[x].id);
                console.log(abilityids);
                this.$store.dispatch('getAbilities', abilityids);
            },
            removeAbility(index) {
                this.$store.dispatch('removeAbility', index);
            },
            undoAbilityRemove() {
                this.$store.dispatch('undoAbilityRemove');
            },
            restoreAbilities() {
                this.$store.dispatch('getAllAbilities');
            }
        },
        computed: {
            checkedAbilities: {
                set(value) {
                    var abilitiesChecked = [];
                    if (value) {
                        if (value.length < this.checkAbilities.length) {
                            this.checkAbilities = value;
                        } else {
                            value.forEach(v => {
                                if (this.checkAbilities.indexOf(v) === -1) {
                                    this.checkAbilities.push(v);
                                }
                            });
                        }
                        value.forEach(v => {
                            if (abilitiesChecked.indexOf(v) === -1) {
                                abilitiesChecked.push(this.$store.state.abilities.Abilities[v]);
                            }
                        })
                    } else {
                        var keys = Object.keys(this.$store.state.abilities.Abilities);
                        for (var i in keys) {
                            if (this.$store.state.abilities.Abilities[keys[i]].isChecked) {
                                abilitiesChecked.push(this.$store.state.abilities.Abilities[keys[i]]);
                            }
                        }
                    }
                    return abilitiesChecked;
                },
                get(){
                    return this.checkAbilities;
                }
            },
            Abilities() {
                var abilities = this.$store.state.abilities.Abilities;
                var abilitiesArray = Object.keys(abilities).sort((a,b) => {
                    var ab = parseInt(abilities[a].index);
                    var ba = parseInt(abilities[b].index);
                    return ab > ba ? 1 : ab < ba ? -1 : 0 
                }).map(x => abilities[x]);
                
                var abilitiesObj = {};
                var obj = abilitiesArray.reduce((acc, cur) => {
                    abilitiesObj[cur.name] = cur;
                    return abilitiesObj;
                }, {});
                return abilitiesObj;
            },
            AllAbilities() {
                return this.$store.state.abilities.AllAbilities;
            },
            isLoading() {
                return this.$store.state.abilities.isLoading;
            },
            removedAbilities() {
                return this.$store.state.abilities.removedAbilities;
            }
        }
    }
</script>

<style>
    .abilities-button {
        display: inline-block;
        font-size: 1.2em;
        width: 40em;
    }

    .collapse {
        padding-top: 20px;
        background-color: #EFEFEF;
    }

    .el-checkbox {
        background-color: #FFFFFF;
    }

    .margin-space-bottom {
        margin-bottom: 20px;
    }

    .aside {
        margin-top: 50%;
    }

    .odd {
        background-color: #EDEDED;
    }

    .icon {
        border-radius: 10px;
    }

    .el-col {
        margin-bottom: 2px;
    }

    .description {
        font-size: 1.2em;
    }

    .background {
        text-align: center;
        background-color: #DDDDDD;
        border-radius: 10px;
    }

    /****************************
    ** Dark Mode
    *****************************/
/*
    body.darkmode {
        background-color: #262626;
        color: #DDDDDD;
    }

    .darkmode::placeholder {
        color: #CCCCCC;
    }

    .darkmode input {
        background-color: #262626;
        color: #EEEEEE;
    }

    .darkmode .card {
        background-color: #343434;
        color: #DDDDDD;
    }

    .darkmode .message-body {
        padding: 1em;
        overflow: hidden;
        background-color: #343434;
        color: #DDDDDD;
    }

    .darkmode .odd {
        background-color: #464646;
    }
*/
</style>