<template>
    <div>
        <div class="darkMode">
            <span class="darkModeText">Dark Mode </span><el-switch @click="switchDarkMode" v-model="darkMode" :label="darkMode" :checked="darkMode" active-color="#123123"></el-switch>
        </div>
        <el-tabs type="card" @tab-click="switchTab">
            <el-tab-pane label="Abilities">
                <abilities></abilities>
            </el-tab-pane>
            <el-tab-pane label="Abilities Calculator">
                <abilitiescalculator></abilitiescalculator>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import Abilities from '@/components/Abilities'
    import AbilitiesCalculator from '@/components/AbilitiesCalculator'
    import store from '../store'
    export default {
        data() {
            return {
            }
        },
        components: {
            'abilities': Abilities,
            'abilitiescalculator': AbilitiesCalculator
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
            darkMode: {
                set(value) {
                    return store.commit('darkMode', value);
                },
                get() {
                    return this.$store.state.darkMode;
                }
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