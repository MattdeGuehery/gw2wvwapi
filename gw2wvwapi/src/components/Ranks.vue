<template>
    <div>
        <el-container>
            <el-aside width="20%"></el-aside>
            <el-main>
                <el-row>
                    <el-col :span="6"></el-col>
                    <el-col :span="8"><h1>Title</h1></el-col>
                    <el-col :span="4"><h1>Rank</h1></el-col>
                    <el-col :span="6"></el-col>
                </el-row>
                <el-row v-for="(r, i) in AllRanks" :key="r.id" :class="{ 'odd': i % 2 === 0}">
                    <el-col :span="6"></el-col>
                    <el-col :span="8">{{ r.title }}</el-col>
                    <el-col :span="4">{{ r.min_rank }}</el-col>
                    <el-col :span="6"></el-col>
                </el-row>
            </el-main>
            <el-aside width="20%"></el-aside>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: 'Ranks',
        data: function() {
            return {
            }
        },
        mounted: function() {
            this.$store.dispatch('getAllRanks');
        },
        methods: {
        },
        computed: {
            AllRanks() {
                return this.$store.state.ranks.AllRanks;
            },
            isLoading() {
                return this.$store.getters.isLoading;
            }
        }
    }
</script>

<style>
    .margin-space-bottom {
        margin-bottom: 20px;
    }

    .odd {
        background-color: #EDEDED;
    }
</style>