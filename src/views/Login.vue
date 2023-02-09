<template>
    <div>
        <h1 id="h1" ref="h1" style="margin: 50px">欢迎登录订餐系统</h1>
        <el-row>
            <el-col :span="8" :offset="8">
                <!-- ref 属性：可以通过它获取 DOM 元素，是 Vue 的属性
                     model 属性：表示表单绑定的数据是一个对象
                -->
                <el-form :rules="rules" ref="form" :model="loginForm" label-width="80px">
                    <el-form-item label="账号" prop="uname">
                        <el-input v-model="loginForm.uname" placeholder="请输入账号" :readonly="setReadonly"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <!-- show-password 设置为密码框 -->
                        <el-input v-model="loginForm.password" placeholder="请输入密码" :readonly="setReadonly" show-password></el-input>
                    </el-form-item>
                    <!--下拉框选择身份
                    <el-select v-model="value" placeholder="身份">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>-->
                    <br>
                    <el-button type="primary" @click="toLogin">登录</el-button>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                msg: "你好",
                setReadonly: false,
                loginForm: {
                    uname: "",
                    password: ""
                },
                rules: {
                    uname: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                },
                // options: [{
                //     value: '员工登录',
                //     label: '员工'
                // }, {
                //     value: '管理登录',
                //     label: '管理'
                // }],
                // value: '员工登录'
            }
        },
        methods: {
            toLogin() {
                this.$refs["form"].validate((valid) => {
                    if (!valid) {
                        // 结束方法
                        return
                    }
                    this.setReadonly = true
                    this.$http.post("/login", this.loginForm).then((res) => {
                        console.log(res)
                        if (res.data != null && res.data != "") {
                            this.$store.dispatch("setUname", this.loginForm.uname)
                            sessionStorage.setItem("uname", this.loginForm.uname)
                            this.$store.dispatch("setJob", res.data.job)
                            sessionStorage.setItem("job", res.data.job)

                            if (res.data.job == '普通员工' || res.data.job == '部门经理') {
                                this.$router.push("/empIndex")
                            } else if (res.data.job == '订餐管理') {
                                this.$router.push("/empIndex")
                            } else if (res.data.job == '信息管理') {
                                this.$router.push("/infoManage")
                            }
                        } else {
                            this.setReadonly = false
                            this.$message.error('账号密码错误');
                        }
                    })
                })
                // console.log(this.msg)
            },
        },
    }
</script>


<style scoped>

</style>