<template>
    <div>
        
        <el-container>
            <el-header>
                <div class="left">
                    <el-select
                        clearable
                        filterable 
                        v-model="selectedWorld">
                        <el-option-group v-for="(group, key) in worlds" :key="key" :label="key">
                            <el-option 
                                v-for="world in group" 
                                :key="world.id" 
                                :label="world.name" 
                                :value="world.id">
                            </el-option>
                        </el-option-group>
                    </el-select>
                </div>
            </el-header>
            <el-main v-if="chosenMatch">
                {{ chosenMatch }}
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: 'Matches',
        data() {
            return {
                worlds: {
                    "North American": [{
                        id:'',
                        name:'',
                        population:''
                    }],
                    "International": [{
                        id:'',
                        name:'',
                        population:''
                    }]
                },
                selectedWorld: '',
                selectedMatch: ''
            }
        },
        mounted() {
            this.$store.dispatch('getAllMatches');
            this.getWorlds();
        },
        methods: {
            getWorlds() {
                var worlds = this.$store.state.worlds.AllWorlds;
                var USWorlds = worlds.filter(w => w.id < 2000);
                var IntWorlds = worlds.filter(w => w.id > 2000);
                var worldGroups = { "North American": USWorlds, "International": IntWorlds }
                this.worlds = worldGroups;
            }
        },
        computed: {
            AllMatches() {
                return this.$store.state.matches.AllMatches;
            },
            chosenMatch() {
                return this.selectedMatch && this.$store.state.matches.AllMatches && this.$store.state.matches.AllMatches.length > 0 ? this.$store.state.matches.AllMatches[this.selectedMatch] : {};
            }
        },
        watch: {
            selectedWorld() {
                var worldid = this.selectedWorld;
                var matches = this.AllMatches;
                var matchidArrays = _.map(matches, function(match) {
                    return _.map(match.all_worlds, function(worlds) {
                        return worlds;
                    });
                });
                var matchids = _.map(matchidArrays, function(match) {
                    return _.flattenDeep(match);
                });
                var matchIndex = _.findIndex(matchids, function(m){
                    return m.indexOf(worldid) > -1;
                });
                this.selectedMatch = matchIndex;
            }
        }
    }
</script>

<style>
    .left {
        float: left
    }

    .margin-space-bottom {
        margin-bottom: 20px;
    }

    .odd {
        background-color: #EDEDED;
    }
</style>