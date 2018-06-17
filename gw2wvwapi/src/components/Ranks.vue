<template>
    <div>
        <el-row class="margin-space-bottom" :gutter="20">
            <el-col :span="12"><el-button :loading="isLoading" type="primary" class="restore-abilities" @click="restoreAbilities()">Restore Abilities</el-button></el-col>
            <el-col :span="12"><el-button type="primary" class="restore-abilities" @click="undoAbilityRemove()">Undo Remove</el-button></el-col>
        </el-row>
        <el-container class="margin-space-bottom" v-for="(a, index) in Abilities" :key="a.id">
            <el-aside width="128px"><img class="aside icon" :src="a.icon"></img></el-aside>
            <el-container>
                <el-header class="background"><h2>{{ a.name }}</h2></el-header>
                <el-row type="flex" justify="end">
                    <el-col :span="24">{{ a.description }}</el-col>
                </el-row>
                <el-main>
                    <el-row class="margin-space-bottom" type="flex" justify="end">
                        <el-col :span="3"><div class="grid-content"><b>Rank</b></div></el-col>
                        <el-col :span="18"><div class="grid-content"><b>Effect</b></div></el-col>
                        <el-col :span="3"><div class="grid-content"><b>Ability Cost</b></div></el-col>
                    </el-row>
                    <el-row type="flex" justify="end" v-for="(r, i) in a.ranks" :key="i">
                        <el-col :class="{ 'odd': (i % 2 === 0) }" :span="3"><div class="grid-content">Rank {{ i+1 }}:</div></el-col>
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
    import store from '../store'
    import axios from 'axios'
    export default {
        name: 'Ranks',
        data: function() {
            return {
            }
        },
        mounted: function() {
            store.dispatch('getAllAbilities');
        },
        methods: {
            removeAbility(index) {
                store.commit('removeAbility', index);
            },
            undoAbilityRemove() {
                store.commit('undoAbilityRemove')
            },
            restoreAbilities: function() {
                store.dispatch('getAllAbilities');
            },
            getAbilities: function(abilities) {
                store.dispatch('getAbilities', abilities);
            }
        },
        computed: {
            Abilities() {
                return store.state.Abilities;
            },
            AllAbilities() {
                return store.state.AllAbilities;
            },
            isLoading() {
                return store.state.isLoading;
            }
        }
    }
</script>

<style>
    .restore-abilities {
        display: inline-block;
        font-size: 1.2em;
        width: 40em;
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

    .background {
        text-align: center;
        background-color: #DDDDDD;
        border-radius: 10px;
    }
</style>