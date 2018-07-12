<template>
    <div>
        <el-container>
            <el-aside width="2em"></el-aside>
            <el-main>
                <el-row>
                    <el-col :xs="6" :sm="6" :md="8" :lg="12" :xl="15" class="calcheader">Ability</el-col>
                    <el-col :xs="5" :sm="5" :md="4" :lg="3" :xl="2" class="calcheader"><el-button @click="clearAllRanks()">Clear All</el-button></el-col>
                    <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3" class="calcheader">Rank Level</el-col>
                    <el-col :xs="5" :sm="5" :md="4" :lg="3" :xl="2" class="calcheader"><el-button @click="maxAllRanks()">Max All</el-button></el-col>
                    <el-col :xs="3" :sm="3" :md="3" :lg="2" :xl="2"><el-card shadow="never">{{ totalRanks }}</el-card></el-col>
                </el-row>
                <el-row v-for="(a, index) in AllAbilities" :key="a.id">
                    <el-col :class="{'odd': index % 2 === 0, 'padding-space-top': true }" :span="24">
                        <el-row>
                            <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                                <!-- <img class="calcicon" :src="a.icon" /> -->
                            </el-col>
                            <el-col :xs="4" :sm="4" :md="6" :lg="9" :xl="13" class="calcabilities">
                                <b>{{ a.name }}</b>
                                <el-row>
                                    <el-col>{{ a.description }}</el-col>
                                </el-row>
                            </el-col>
                            <el-col :xs="5" :sm="5" :md="4" :lg="3" :xl="2"><el-button @click="clearRank(a)">Clear</el-button><el-button @click="decrementRank(a)">-</el-button></el-col>
                            <el-col :xs="5" :sm="5" :md="5" :lg="4" :xl="3">
                                <el-tooltip v-for="(r, i) in a.ranks" :key="i" :open-delay=openDelay placement="top">
                                    <div slot="content">{{ r.effect }}</div>
                                    <div @click="adjustToRank(a, i)" :class="{ 'calcranks': true, 'calcrankshover': i < a.rankLevel, 'calcranksactive': a.rankLevel == a.ranks.length }"></div>
                                </el-tooltip>
                            </el-col>
                            <el-col :xs="5" :sm="5" :md="4" :lg="3" :xl="2"><el-button @click="incrementRank(a)">+</el-button><el-button @click="maxRank(a)">Max</el-button></el-col>
                            <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="2" class="padding-space-right"><el-card shadow="never">{{ a.totalCost }} / {{ a.maxCost }}</el-card></el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </el-main>
            <el-aside width="2em"></el-aside>
        </el-container>
    </div>
</template>

<script>
import Vue from 'vue'
    export default {
        name: 'AbilitiesCalculator',
        data() {
            return {
                Abilities: [],
                openDelay: 600
            }
        },
        methods: {
            decrementRank(ability) {
                if (ability.rankLevel > 0) {
                    for (var i in ability.ranks) {
                        if ((ability.rankLevel - 1) == i) {
                            var rank = ability.ranks[i];
                            ability.totalCost -= rank.cost;
                            break;
                        }
                    }
                    ability.rankLevel -= 1;
                }
            },
            incrementRank(ability) {
                if (ability.rankLevel < ability.ranks.length) {
                    for (var i in ability.ranks) {
                        if (ability.rankLevel == i) {
                            var rank = ability.ranks[i];
                            ability.totalCost += rank.cost;
                        }
                    }
                    ability.rankLevel += 1;
                }
            },
            clearRank(ability) {
                ability.rankLevel = 0;
                ability.totalCost = 0;
            },
            maxRank(ability) {
                ability.rankLevel = ability.ranks.length;
                ability.totalCost = ability.ranks.map(x => x.cost).reduce((a, c) => a + c);
            },
            maxAllRanks() {
                this.Abilities.forEach(a => {
                    a.rankLevel = a.ranks.length;
                    a.totalCost = a.ranks.map(x => x.cost).reduce((b, c) => b + c);
                });
            },
            clearAllRanks() {
                this.Abilities.forEach(a => {
                    a.rankLevel = 0;
                    a.totalCost = 0;
                });
            },
            adjustToRank(ability, rankIndex) {
                if (ability.rankLevel < rankIndex + 1) {
                    while((rankIndex + 1) > ability.rankLevel) {
                        this.incrementRank(ability);
                    }
                } else if (ability.rankLevel > rankIndex + 1) {
                    while((rankIndex) < ability.rankLevel) {
                        this.decrementRank(ability);
                    }
                }
            }
        },
        computed: {
            AllAbilities() {
                var abilities = Object.keys(this.$store.state.abilities.AllAbilities).map(x => this.$store.state.abilities.AllAbilities[x]);
                abilities.forEach(a => {
                    var maxcost = a.ranks.map(x => x.cost).reduce((b, c) => b + c);
                    Vue.set(a, 'rankLevel', 0);
                    Vue.set(a, 'totalCost', 0);
                    Vue.set(a, 'maxCost', maxcost);
                });
                this.Abilities = abilities;
                return this.Abilities;
            },
            totalRanks() {
                var abilities = this.Abilities;
                var counter = 0;
                for (var i in abilities) {
                    counter += abilities[i].totalCost;
                }
                return counter;
            },
            isLoading() {
                return this.$store.getters.isLoading;
            }
        }
    }
</script>

<style>
    .padding-space-top {
        padding-top: 5px;
    }

    .padding-space-right {
        padding-right: 5px;
    }

    .abilities-button {
        display: inline-block;
        font-size: 1.2em;
        width: 40em;
    }

    .calcicon {
        width: 50%;
        height: 50%;
        border-radius: 5px;
    }

    .calcabilities {
        text-align: left;
        font-size: 1.1em;
        margin-bottom: 2px;
    }

    .description {
        font-size: 1.2em;
    }

    .calcranks {
        position: relative;
        display: inline-block;
        border-radius: 5px;
        border: .5px solid rgba(100, 100, 100, 0.7);
        width: 20px;
        margin-left: 1px;
        height: 50px;
        background: rgba(255, 255, 255, 1); /* Grey background */
        outline: none; /* Remove outline */
        opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
        -webkit-transition: .2s; /* 0.2 seconds transition on hover */
        transition: opacity .2s;
    }

    .calcranksactive {
        background: linear-gradient(to top left, #ffff00 0%, #ffffcc 90%);
        border: .5px solid rgba(100, 100, 100, 0.9);
    }

    .calcheader {
        font-size: 1.8em;
        font-weight: bold;
    }

    .background {
        text-align: center;
        background-color: #DDDDDD;
        border-radius: 10px;
    }

    .calcranks:hover {
        background-color: #6680a8;
    }

    .calcrankshover {
        background-color: #6680a8;
    }

    .odd {
        background-color: #EDEDED;
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