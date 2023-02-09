<template>
    <div>
        <!--<h2>欢迎 {{job}} {{uname}}</h2>-->
        <el-descriptions class="margin-top" title="个人信息" :column="1" style="width: 40%;" border>
            <template slot="extra">
                <el-button type="primary" size="small" @click="openChangePwd">修改密码</el-button>
            </template>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-user"></i>
                    姓名
                </template>
                {{query.ename}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-user"></i>
                    工号
                </template>
                {{emp.empno}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-mobile-phone"></i>
                    联系方式
                </template>
                {{emp.contact}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-location-outline"></i>
                    所属部门
                </template>
                {{emp.dname}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-tickets"></i>
                    工作
                </template>
                {{emp.job}}
            </el-descriptions-item>
            <!--<el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-office-building"></i>
                    性别
                </template>
            </el-descriptions-item>-->
        </el-descriptions>
        <el-dialog width="40%" title="修改密码" :visible.sync="dialogFormVisible">
            <el-form :model="changePwd" ref="pwdForm" :rules="changePwdRules">
                <el-form-item v-if="false" style="width: 400px;" label="称呼" :label-width="formLabelWidth" prop="empno">
                    <el-input v-model="changePwd.uname" autocomplete="off" readonly></el-input>
                </el-form-item>
                <el-form-item style="width: 400px;" label="原密码" :label-width="formLabelWidth" prop="password">
                    <el-input v-model="changePwd.password" autocomplete="off" show-password></el-input>
                </el-form-item>
                <el-form-item style="width: 400px;" label="新密码" :label-width="formLabelWidth" prop="newpwd">
                    <el-input v-model="changePwd.newpwd" autocomplete="off" show-password></el-input>
                </el-form-item>
                <el-form-item style="width: 400px;" label="确认密码" :label-width="formLabelWidth" prop="newpwd2">
                    <el-input v-model="changePwd.newpwd2" autocomplete="off" show-password></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="changePassword">确 定</el-button>
            </div>
        </el-dialog>
        <!--用描述列表-->
        <!--<div>
            <el-row :gutter="20" style="margin: auto">
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>个人中心</span>
                            </div>
                            <div class="name-role">
                                <span class="sender">{{emp.job}} - {{query.ename}}</span>
                            </div>
                            <el-divider></el-divider>
                            <div class="personal-relation">
                                <div class="relation-item">工号:
                                    <div style="float: right; padding-right:20px;">
                                        {{emp.empno}}
                                    </div>
                                </div>
                            </div>
                            <div class="personal-relation">
                                <div class="relation-item">性别:
                                    <div style="float: right; padding-right:20px;">
                                        {{emp.sex}}
                                    </div>
                                </div>
                            </div>
                            <div class="personal-relation">
                                <div class="relation-item">联系方式:
                                    <div style="float: right; padding-right:20px;">
                                        {{emp.contact}}
                                    </div>
                                </div>
                            </div>
                            <div class="personal-relation">
                                <div class="relation-item">所属部门:
                                    <div style="float: right; padding-right:20px;">
                                        {{emp.dname}}
                                    </div>
                                </div>
                            </div>
                            <div class="personal-relation">
                                <div class="relation-item">职务:
                                    <div style="float: right; padding-right:20px;">
                                        {{emp.job}}
                                    </div>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </el-col>
            </el-row>
        </div>-->
    </div>
</template>

<script>
    export default {
        name: "WelcomeEmp",
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.changePwd.newpwd2 !== '') {
                        this.$refs.pwdForm.validateField('newpwd2');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.changePwd.newpwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                changePwdRules: {
                    password: [
                        {required: true, message: "请填写原密码", trigger: "blur"}
                    ],
                    newpwd: [
                        {required: true, message: "请填写新密码", trigger: "blur"},
                        {min: 6, max: 18, message: '用户密码的长度在6～18个字符', trigger: 'blur'},
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    newpwd2: [
                        {required: true, message: "请确认新密码", trigger: "blur"},
                        {min: 6, max: 18, message: '用户密码的长度在6～18个字符', trigger: 'blur'},
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                },
                // job: sessionStorage.getItem('job'),
                query: {
                    ename: sessionStorage.getItem('uname'),
                },
                emp:{
                    empno: '',
                    sex: '',
                    contact: '',
                    deptno: '',
                    dname: '',
                    job: '',
                },
                chkJob: false,

                // 修改密码
                changePwd: {
                    uname: sessionStorage.getItem('uname'),
                    password: '',   // 原密码
                    newpwd: '',
                    newpwd2: '',
                },
                // 弹出层表单的左侧提示文字的宽度
                formLabelWidth: '120px',
                // 弹出层是否显示
                dialogFormVisible: false,
            }
        },
        computed: {

        },
        methods: {
            getEmpInfo() {
                if (sessionStorage.getItem('job') == '订餐管理') {
                    return
                }
                this.$http.post("/getEmpInfo", this.query).then(res => {
                    // console.log(res.data.data)
                    // console.log(res.data.data.dname)
                    this.emp = res.data.data
                    sessionStorage.setItem("thisemp", this.emp)
                    sessionStorage.setItem("empno", this.emp.empno)
                    sessionStorage.setItem("dname", this.emp.dname)
                    sessionStorage.setItem("deptno", this.emp.deptno)
                    // console.log(sessionStorage.getItem('deptno'))
                }).catch(() => {
                    this.$message.error("员工信息加载失败，请联系管理员")
                })
            },
            openChangePwd() {
                // this.$message.warning('赶紧做')
                this.dialogFormVisible = true
            },
            // 去改密码
            changePassword() {
                this.$refs["pwdForm"].validate(valid => {
                    if (!valid) {return}
                    this.$http.post("/changePwd", this.changePwd).then(res => {
                        if (res.data == "success") {
                            this.$message.success("修改密码成功")
                            this.changePwd.password = ''
                            this.changePwd.newpwd = ''
                            this.changePwd.newpwd2 = ''
                            this.dialogFormVisible = false
                        } else if (res.data == "error") {
                            this.$message.error("原密码输入有误，请检查")
                        } else {
                            this.$message.error("修改密码失败")
                        }
                    }).catch(() => {
                        this.$message.error("修改密码失败，请联系管理员")
                    })
                })
            },
        },
        created() {
            // 页面加载
            this.getEmpInfo()
        }
    }
</script>

<style scoped>
    .box-card {
        width: 500px;
    }
</style>