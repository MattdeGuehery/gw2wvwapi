<template>
    <div>
        <div class="darkMode">
            <span class="darkModeText">Dark Mode </span><el-switch @click="switchDarkMode" v-model="darkMode" :label="darkMode" :checked="darkMode" active-color="#123123"></el-switch>
        </div>
        <el-tabs type="card">
            <el-tab-pane label="Abilities">
                <abilities></abilities>
            </el-tab-pane>
            <el-tab-pane label="Abilities Calculator">
                <abilities-calculator></abilities-calculator>
            </el-tab-pane>
            <el-tab-pane label="Ranks">
                <ranks></ranks>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import Abilities from '@/components/Abilities'
    import AbilitiesCalculator from '@/components/AbilitiesCalculator'
    import Ranks from '@/components/Ranks'
    import store from '../store'
    export default {
        data() {
            return {
            }
        },
        components: {
            'abilities': Abilities,
            'abilities-calculator': AbilitiesCalculator,
            'ranks': Ranks
        },
        methods: {
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

    body.darkmode {
        background-color: black;
    }
</style>