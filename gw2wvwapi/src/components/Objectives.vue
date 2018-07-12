<template>
    <div>
        <el-container>
            <el-main v-if="Objectives">
                {{ Objectives }}
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: 'Matches',
        data() {
            return {
            }
        },
        mounted() {
            this.$store.dispatch('getAllObjectives');
        },
        computed: {
            Objectives() {
                this.$store.state.objectives.AllObjectives;
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