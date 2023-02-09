<template>
    <div>
        <h1 style="margin-bottom: 10px">员工管理</h1>
        <el-form :inline="true" :model="query" class="demo-form-inline">
            <el-form-item label="姓名">
                <el-input v-model="query.ename" clearable placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item label="部门">
                <el-select v-model="query.deptno" clearable placeholder="部门">
                    <el-option v-for="dept in deptList" :label="dept.dname" :value="dept.deptno"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
            <el-form-item style="margin-left: 70px">
                <el-button type="primary" @click="add">新增</el-button>
                <el-button type="primary" @click="update">修改</el-button>
                <el-button type="primary" @click="resetPwd">重置密码</el-button>
                <el-button type="danger" @click="del">删除</el-button>
            </el-form-item>
        </el-form>
        <el-table
                :data="emps"
                stripe
                height="400px"
                @select="selectRow"
                @select-all="selectAll"
                style="width: 100%">
            <!--复选框-->
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <!--索引列-->
            <el-table-column
                    type="index"
                    width="81"
                    label="序号">
                    <!--prop="empno"-->
            </el-table-column>
            <el-table-column
                    prop="empno"
                    label="工号">
            </el-table-column>
            <el-table-column
                    prop="ename"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="sex"
                    label="性别">
            </el-table-column>
            <el-table-column
                    prop="contact"
                    label="联系方式">
            </el-table-column>
            <el-table-column
                    prop="job"
                    label="工作">
            </el-table-column>
            <el-table-column
                    prop="dname"
                    label="部门">
            </el-table-column>
        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="query.page"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="query.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
        <!--弹出层-->
        <el-dialog width="40%" :title="title" :visible.sync="dialogFormVisible">
            <!--refs-->
            <el-form :model="empForm" ref="empForm" :rules="rules">
                <el-form-item v-if="empForm.empno != ''" style="width: 400px;" label="员工编号" :label-width="formLabelWidth" prop="empno">
                    <el-input v-model="empForm.empno" autocomplete="off" readonly></el-input>
                </el-form-item>
                <el-form-item style="width: 400px;" label="姓名" :label-width="formLabelWidth" prop="ename">
                    <el-input v-model="empForm.ename" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item style="width: 400px;" label="性别" :label-width="formLabelWidth" prop="sex">
                    <!--label 是单选框的 value-->
                    <el-radio v-model="empForm.sex" label="男">男</el-radio>
                    <el-radio v-model="empForm.sex" label="女">女</el-radio>
                </el-form-item>
                <el-form-item style="width: 400px;" label="联系方式" :label-width="formLabelWidth" prop="contact">
                    <el-input v-model="empForm.contact" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item style="width: 400px;" label="部门" :label-width="formLabelWidth" prop="deptno">
                    <el-select style="width: 100%;" v-model="empForm.deptno" placeholder="请选择部门" clearable>
                        <el-option v-for="dept in deptList" :label="dept.dname" :value="dept.deptno"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="width: 400px;" label="工作" :label-width="formLabelWidth" prop="job">
                    <el-select style="width: 100%;" v-model="empForm.job" placeholder="请选择工作">
                        <el-option label="普通员工" value="普通员工"></el-option>
                        <el-option label="部门经理" value="部门经理"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEmp">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "InfoManageOfEmp",
        data(){
            var checkname = (rule, value, callback) => {
                // debugger
                var oldName = this.oldNameCheck
                if (oldName != value) {
                    this.$http.get("/checkSameName", {
                        params: {
                            ename: value
                        }
                    }).then(res => {
                        // this.$message.success('重名查询成功')
                        // console.log(res.data)
                        if (res.data != '' && res.data != null) {
                            callback(new Error("用户名已存在，请重新输入"))
                        } else {
                            callback()
                        }
                        // this.$message.warning('重名查询成功')
                    }).catch(() => {
                        this.$message.error("失败失败 请求失败 fail error")
                    })
                } else {
                    callback()
                }
                // callback()
            }
            return{
                rules: {
                    ename: [
                        {required: true, message: "员工姓名不可为空", trigger: "blur"},
                        { validator: checkname, trigger: "blur" },
                    ],
                    contact: [
                        {required: true, message: "联系方式", trigger: "change"},
                        {pattern: /(^1[3|4|5|6|7|8|9][0-9]{9})|(^[A-Za-z0-9]+([_.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$)/, message: '请输入电话或邮箱'}
                    ],
                    job : [
                        {required: true, message: "工作不可为空", trigger: "blur"}
                    ],
                    deptno: [
                        {required: true, message: "部门不可为空", trigger: "change"}
                    ]
                },
                total: 0,
                query:{
                    // 查询条件
                    ename:"",
                    deptno:'',
                    page: 1,
                    limit: 10
                },
                deptList: [],
                emps: [],
                // 弹出层是否显示
                dialogFormVisible: false,
                // 新增的表单数据源
                empForm: {
                    empno: '',
                    ename: '',
                    // uname: this.empForm.ename,
                    sex: '男',
                    contact: '',
                    deptno: '',
                    job: '',
                    olduname: ''
                    // dname: ''
                },
                // 弹出层表单的左侧提示文字的宽度
                formLabelWidth: '120px',
                // 被选中的项的集合
                selectionItems: [],
                // 弹出层标题
                title: "",
                // 暂存名字的，重名校验那里
                oldNameCheck: ""
            }
        },
        methods:{
            // 条件查询员工信息
            getEmpList() {
                this.$http.post("/listEmp", this.query).then(res => {
                    this.emps = res.data.data
                    this.total = res.data.count
                }).catch(() => {
                    this.$message.error("员工信息加载失败，请联系管理员")
                })
            },
            // 点击按钮查询
            search(){
                this.query.page = 1
                this.getEmpList()
            },
            // 获取全部部门信息
            getAllDept() {
                this.$http.post("/deptList").then(res => {
                    //
                    this.deptList = res.data
                }).catch(() => {
                    this.$message.error("部门信息加载失败，请联系管理员")
                })
            },
            // 当"每页多少条"被改变时触发，val 代表改变后每页多少条
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.query.limit = val
                this.search()
            },
            // 当“当前页”被改变时触发，val 代表当前页
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                this.query.page = val
                this.getEmpList()
            },
            // 打开弹出层
            add() {
                this.dialogFormVisible = true
                this.title = "新增员工"
                this.empForm = {
                    empno: '',
                    ename: '',
                    sex: '男',
                    contact: '',
                    deptno: '',
                    job: '',
                }

            },
            update() {
                // 判断是否只选中了一条
                let selections = this.selectionItems
                if (selections.length != 1) {
                    this.$message.warning("请选择一条数据进行修改")
                    return
                }
                // 打开弹出层
                this.dialogFormVisible = true
                // 重置表单
                if (this.$refs["empForm"] != null) {
                    this.$refs["empForm"].resetFields()
                }
                this.title = "修改员工信息"
                // 给表单元素赋值
                this.empForm = selections[0]
                this.oldNameCheck = selections[0].ename
                this.empForm.olduname = selections[0].ename
            },
            resetPwd() {
                let selection = this.selectionItems
                //判断被选中的条数
                if (selection.length == 0){
                    this.$message.warning("请至少选择一为员工")
                    return
                }
                //要求用户确认
                this.$confirm('确定重置所选员工密码吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //获取被选中项的 ename
                    let arr = []
                    for (let i = 0; i < selection.length; i++) {
                        arr.push(selection[i].ename)
                    }
                    this.$http.post("/resetPwd", arr).then(res => {
                        if (res.data == "success") {
                            this.$message.success("成功，重置新密码为000000")
                            this.search()
                        } else {
                            this.$message.warning("重置失败")
                        }
                        this.selectionItems = []
                    }).catch(() => {
                        this.$message.warning("重置失败，联系管理员")
                    })
                })
            },
            del() {
                let selection = this.selectionItems
                //判断被选中的条数
                if (selection.length == 0){
                    this.$message.warning("请至少选择一条数据")
                    return
                }
                //要求用户确认
                this.$confirm('确定删除所选员工吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //获取被选中项的empno
                    let arr = []
                    for (let i = 0; i < selection.length; i++) {
                        arr.push(selection[i].ename)
                    }
                    // this.$http.get("/updEmpDeptnoToToDelete", {
                    //     params: {
                    //         empno: Number(sessionStorage.getItem('deptno'))
                    //     }
                    // }).then(res => {
                    //     // console.log('THEN then')
                    //     // console.log(res.data)
                    //     for (var key in res.data) {
                    //         var param = {};
                    //         param.empno= res.data[key].empno;
                    //         param.ename= res.data[key].ename;
                    //         this.listArr.push(param);
                    //     }
                    //     // console.log('listArr:')
                    //     // console.log(this.listArr)
                    //     // this.listArr = res.data.data
                    // }).catch(() => {
                    //     this.$message.error("员工选择列表加载失败，请联系管理员")
                    // })
                    // this.$http.post("/delEmps", arr).then(res => {
                    this.$http.post("/updEmpDeptnoToToDelete", arr).then(res => {
                        if (res.data == "success") {
                            this.$message.success("删除成功")
                            // this.getEmpList()
                            this.search()
                            // 待续，跨页删除
                        } else {
                            this.$message.warning("删除失败")
                        }
                        this.selectionItems = []
                    }).catch(() => {
                        this.$message.warning("删除失败，联系管理员")
                    })
                })
            },
            // 保存员工信息
            saveEmp() {
                // 表单校验
                this.$refs["empForm"].validate(valid => {
                    if(valid) {
                        // 默认走修改
                        let url = '/updateEmp';
                        let msg = '修改'
                        if (this.empForm.empno == '') {
                            url = '/addEmp';
                            msg = '新增'
                        }

                        this.$http.post(url, this.empForm).then(res => {
                            if (res.data == "success") {
                                this.$message.success(msg + "成功")
                            } else {
                                this.$message.error(msg + "失败")
                            }
                            // 关闭弹出层
                            this.dialogFormVisible = false
                            // this.query.page = 1
                            this.getEmpList()
                        }).catch(() => {
                            this.$message.error(msg + "失败，请联系管理员")
                        })
                    }
                })
            },
            // row 当前行
            selectRow(selection, row) {
                this.selectionItems = selection
                // console.log("selection")
                // console.log(selection)
                // console.log("row")
                // console.log(row)
            },
            // 全选
            selectAll(selection) {
                this.selectionItems = selection
            }
        },
        created() {
            // 页面一加载就去获取
            this.getAllDept()
            this.search()
        }
    }
</script>

<style scoped>

</style>