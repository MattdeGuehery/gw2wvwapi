<template>
    <div>
        <div class="darkMode">
            <span class="darkModeText">Dark Mode </span><el-switch v-model="darkMode" active-color="#123123"></el-switch>
        </div>
        <el-tabs type="card" @tab-click="switchTab">
            <el-tab-pane label="Abilities">
                <abilities></abilities>
            </el-tab-pane>
            <el-tab-pane label="Ranks">Ranks</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import Abilities from '@/components/Abilities'
    import store from '../store'
    export default {
        data() {
            return {
            }
        },
        components: {
            'abilities': Abilities
        },
        methods: {
            switchTab(tab, event) {
                console.log(tab, event);
            },
            switchDarkMode() {
                this.darkMode = !this.darkMode;
            }
        },
        computed: {
            darkMode() {
                return store.commit('darkMode');
            }
        }
    }
</script>

<style scoped>
    .darkMode {
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 5px;
    }

    /**************************************
     * Dark Mode
    ***************************************/

    .darkmode body {
        background-color: 
    }
</style>