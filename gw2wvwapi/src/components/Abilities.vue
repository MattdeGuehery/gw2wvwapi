<template>
    <div>
        <el-row class="margin-space-bottom" :gutter="10">
            <el-col :span="8"><el-button :loading="isLoading" type="primary" class="restore-abilities" @click="restoreAbilities()">Restore All Abilities</el-button></el-col>
            <el-col :span="8"><el-button :loading="isLoading" type="primary" class="restore-abilities" @click="refreshAbilities()">Refresh Abilities</el-button></el-col>
            <el-col :span="8"><el-button :loading="isLoading" type="primary" class="restore-abilities" @click="undoAbilityRemove()">Undo Remove</el-button></el-col>
        </el-row>
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
    import axios from 'axios'
    export default {
        name: 'Abilities',
        data: function() {
            return {
            }
        },
        mounted: function() {
            this.$store.dispatch('getAllAbilities');
        },
        methods: {
            removeAbility(index) {
                this.$store.commit('removeAbility', index);
            },
            undoAbilityRemove() {
                this.$store.commit('undoAbilityRemove')
            },
            restoreAbilities: function() {
                this.$store.dispatch('getAllAbilities');
            },
            getAbilities: function(abilities) {
                this.$store.dispatch('getAbilities', abilities);
            },
            refreshAbilities: function() {
            }
        },
        computed: {
            Abilities() {
                return this.$store.state.abilities.Abilities;
            },
            AllAbilities() {
                return this.$store.state.abilities.AllAbilities;
            },
            isLoading() {
                return this.$store.state.abilities.isLoading;
            }
        }
    }
</script>

<style>
    .restore-abilities {
        display: inline-block;
        font-size: 1.2em;
        width: 30em;
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