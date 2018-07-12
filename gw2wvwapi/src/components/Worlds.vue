<template>
    <div>
        <el-container>
            <el-aside width="20%"></el-aside>
            <el-main>
                <el-row>
                    <el-col :span="3"></el-col>
                    <el-col :span="3"><h1>ID</h1></el-col>
                    <el-col :span="9"><h1>World</h1></el-col>
                    <el-col :span="6"><h1>Population</h1></el-col>
                    <el-col :span="3"></el-col>
                </el-row>
                <el-row v-for="(w, i) in AllWorlds" :key="w.id" :class="{ 'odd': i % 2 === 0}">
                    <el-col :span="3"></el-col>
                    <el-col :span="3">{{ w.id }}</el-col>
                    <el-col :span="9">{{ w.name }}</el-col>
                    <el-col :span="6">{{ w.population }}</el-col>
                    <el-col :span="3"></el-col>
                </el-row>
            </el-main>
            <el-aside width="20%"></el-aside>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: 'Matches',
        data: function() {
            return {
            }
        },
        mounted: function() {
            this.$store.dispatch('getAllWorlds');
        },
        methods: {
        },
        computed: {
            AllWorlds() {
                return this.$store.state.worlds.AllWorlds;
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