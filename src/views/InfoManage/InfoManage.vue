<template>
    <div style="height: 100%">
        <el-container style="height: 100%">
            <el-header>
                欢迎你 {{uname}}
                <el-button type="info" style="float: right;position: relative;z-index: 1;" @click="loginOut">退出登录</el-button>
            </el-header>
            <el-container style="height: 100%">
                <el-aside width="220px" style="background-color: rgb(238, 241, 246);height: 100%">
                    <!-- :router="true" 开启 vue-router,以index的值作为path跳转-->
                    <!--default-active="/deptList"-->
                    <el-menu
                            style="height: 100%;"
                            :default-active="toPath"
                            class="el-menu-vertical-demo"
                            background-color="#545c64"
                            text-color="#fff"
                            active-text-color="#ffd04b"
                            :router="true"
                    >
                        <el-menu-item index="/infoManageOfEmp">
                            <!--通过修改class可以修改图标-->
                            <i class="el-icon-user"></i>
                            <span slot="title">员工管理</span>
                        </el-menu-item>
                        <el-menu-item index="/infoManageOfDept">
                            <i class="el-icon-office-building"></i>
                            <span slot="title">部门管理</span>
                        </el-menu-item>
                        <el-menu-item index="/infoManageOfFood">
                            <i class="el-icon-fork-spoon"></i>
                            <span slot="title">餐品管理</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-container style="height: 100%;">
                    <el-main>
                        <router-view></router-view>
                    </el-main>
                    <!--<el-footer>Footer</el-footer>-->
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "InfoManage",
        data() {
            return {
                uname: sessionStorage.getItem("uname"),
                toPath: sessionStorage.getItem("toPath")
            }
        },
        methods: {
            loginOut() {
                this.$confirm('是否立即退出?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    sessionStorage.setItem('uname', '')
                    sessionStorage.setItem('job', '')
                    this.$router.push("/")
                })
            },
        }
    }
</script>

<style scoped>
    .el-header {
        background-color: #373d41;
    }
    .el-main {
        background-color: #eaedf1;
    }
    .el-container {
        height: 100%;
    }
    /*头部样式*/
    .el-header {
        background-color: #373d41;
        display: flex;
        /*左右贴边*/
        justify-content: space-between;
        padding-left: 0;
        align-items: center;
        color: #fff;
        font-size: 20px;
    }
    .el-header>div {
        display: flex;
        align-items: center;
    }
    .el-header>div>span {
        cursor: pointer;
    }
    .el-header span {
        margin-left: 15px;
    }
    .el-aside {
        height: 500px;
    }
</style>