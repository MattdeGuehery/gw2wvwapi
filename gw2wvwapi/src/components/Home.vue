<template>
    <div>
        <div id="darkMode">
            <span class="darkModeText">Dark Mode </span><el-switch @click="switchDarkMode" v-model="darkMode" :label="darkMode" :checked="darkMode" active-color="#121212"></el-switch>
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
            <el-tab-pane label="Worlds">
                <worlds></worlds>
            </el-tab-pane>
            <el-tab-pane lazy label="Objectives">
                <objectives></objectives>
            </el-tab-pane>
            <el-tab-pane lazy label="Matches">
                <matches></matches>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import Abilities from '@/components/Abilities'
    import AbilitiesCalculator from '@/components/AbilitiesCalculator'
    import Ranks from '@/components/Ranks'
    import Matches from '@/components/Matches'
    import Worlds from '@/components/Worlds'
    import Objectives from '@/components/Objectives'
    import axios from 'axios'
    export default {
        data() {
            return {
            }
        },
        components: {
            'abilities': Abilities,
            'abilities-calculator': AbilitiesCalculator,
            'ranks': Ranks,
            'matches': Matches,
            'worlds': Worlds,
            'objectives': Objectives
        },
        mounted() {
        },
        methods: {
            switchDarkMode(value) {
                if (value) {
                    
                } else {
                    
                }
            },
            getBodyTag() {
                var tag = '';
                try {
                    tag = document.getElementsByTagName("body")[0];
                } catch (e) {
                    console.log(e);
                    tag = false;
                }
                return tag;
            }
        },
        computed: {
            darkMode: {
                set(value) {
                    var element = this.getBodyTag();
                    if (element) {
                        if (element.classList) {
                            element.classList.toggle("darkMode");
                        } else {
                            // For IE9
                            var classes = element.className.split(" ");
                            var i = classes.indexOf("darkMode");

                            if (i >= 0) {
                                classes.splice(i, 1);
                            } else {
                                classes.push("darkMode");
                                element.className = classes.join(" "); 
                            }
                        }
                    }
                    return this.$store.commit('darkMode', value);
                },
                get() {
                    return this.$store.state.darkMode;
                }
            }
        }
    }
</script>

<style scoped>
    #darkMode {
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 5px;
    }

    .darkmode {
        background-color: black;
    }

    /**************************************
     * Dark Mode
    ***************************************/

    body.darkmode {
        background-color: black;
    }
</style>