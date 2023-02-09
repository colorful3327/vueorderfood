<template>
    <div>
        <h1 style="margin-bottom: 10px">部门管理</h1>
        <el-form :inline="true" :model="query" class="demo-form-inline">
            <el-form-item label="部门名称">
                <el-input v-model="query.dname" clearable placeholder="部门名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
            <el-form-item style="margin-left: 70px">
                <el-button type="primary" @click="add">新增</el-button>
                <el-button type="primary" @click="update">修改</el-button>
                <el-button type="danger" @click="del">删除</el-button>
            </el-form-item>
        </el-form>
        <el-table
                :data="depts"
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
                    prop="deptno"
                    width="120"
                    label="部门编号">
            </el-table-column>
            <el-table-column
                    prop="dname"
                    label="部门名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="totalemp"
                    label="部门人数"
                    width="180">
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
            <el-form :model="deptForm" ref="deptForm" :rules="rules">
                <el-form-item v-if="deptForm.deptno != ''" style="width: 400px;" label="部门编号" :label-width="formLabelWidth" prop="empno">
                    <el-input v-model="deptForm.deptno" autocomplete="off" readonly></el-input>
                </el-form-item>
                <el-form-item style="width: 400px;" label="部门名称" :label-width="formLabelWidth" prop="dname">
                    <el-input v-model="deptForm.dname" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveDept">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "InfoManageOfDept",
        data(){
            var checkname = (rule, value, callback) => {
                var oldName = this.oldNameCheck
                if (oldName != value) {
                    this.$http.get("/checkSameNameDept", {
                        params: {
                            dname: value
                        }
                    }).then(res => {
                        if (res.data != '' && res.data != null) {
                            callback(new Error("此部门名已存在，请重新输入"))
                        } else {
                            callback()
                        }
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
                    dname: [
                        {required: true, message: "请填写名称", trigger: "blur"},
                        { validator: checkname, trigger: "blur" },
                    ],
                },
                total: 0,
                query:{
                    // 查询条件
                    dname: '',
                    // ename:"",
                    // deptno:'',
                    page: 1,
                    limit: 10
                },
                deptList: [],
                // 展示的部门信息列表，包括部门号、部门名称、部门人数
                depts: [],
                // 弹出层是否显示
                dialogFormVisible: false,
                // 新增的表单数据源
                deptForm: {
                    // empno: '',
                    // ename: '',
                    // sex: '男',
                    // contact: '',
                    deptno: '',
                    // job: '',
                    dname: ''
                },
                // 弹出层表单的左侧提示文字的宽度
                formLabelWidth: '120px',
                // 被选中的项的集合
                selectionItems: [],
                // 弹出层标题
                title: "",
                // 暂存名字的，重名校验那里
                oldNameCheck: "",
            }
        },
        methods:{
            // 部门信息 编号、名称、人数
            getDeptAndTotalEmpList() {
                this.$http.post("/deptAndTotalEmpList", this.query).then(res => {
                    // console.log(res.data)
                    this.depts = res.data.data
                    this.total = res.data.count
                }).catch(() => {
                    this.$message.error("部门信息加载失败，请联系管理员")
                })
            },
            // 点击按钮查询
            search(){
                this.query.page = 1
                this.getDeptAndTotalEmpList()
            },
            // 获取全部部门信息
            // getAllDept() {
            //     this.$http.post("/deptList").then(res => {
            //         //
            //         this.deptList = res.data
            //     }).catch(() => {
            //         this.$message.error("部门信息加载失败，请联系管理员")
            //     })
            // },

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
                this.getDeptAndTotalEmpList()
            },
            // 打开弹出层
            add() {
                this.dialogFormVisible = true
                this.title = "新增部门"
                this.deptForm = {
                    deptno: '',
                    dname: ''
                }
            },
            update() {
                // 判断是否只选中了一条
                let selections = this.selectionItems
                if (selections.length != 1) {
                    this.$message.warning("请选择一个部门进行修改")
                    return
                }
                // 打开弹出层
                this.dialogFormVisible = true
                // 重置表单
                if (this.$refs["deptForm"] != null) {
                    this.$refs["deptForm"].resetFields()
                }
                this.title = "修改部门信息"
                // 给表单元素赋值
                this.deptForm = selections[0]
                this.oldNameCheck = selections[0].dname
            },
            del() {
                let selection = this.selectionItems
                //判断被选中的条数
                if (selection.length == 0){
                    this.$message.warning("请至少选择一条数据")
                    return
                }
                for (let i = 0; i < selection.length; i++) {
                    if (selection[i].totalemp != 0) {
                        this.$message.warning('请先安顿好部门内员工再删除')
                        return
                    }
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
                        arr.push(selection[i].deptno)
                    }
                    this.$http.post("/delDepts", arr).then(res => {
                        if (res.data == "success") {
                            this.$message.success("删除成功")
                            // this.getDeptAndTotalEmpList()
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
            saveDept() {
                // 表单校验
                this.$refs["deptForm"].validate(valid => {
                    if(valid) {
                        // 默认走修改
                        let url = '/updateDept';
                        let msg = '修改'
                        if (this.deptForm.deptno == '') {
                            url = '/addDept';
                            msg = '新增'
                        }

                        this.$http.post(url, this.deptForm).then(res => {
                            if (res.data == "success") {
                                this.$message.success(msg + "成功")
                            } else {
                                this.$message.error(msg + "失败")
                            }
                            // 关闭弹出层
                            this.dialogFormVisible = false
                            // this.query.page = 1
                            this.getDeptAndTotalEmpList()
                        }).catch(() => {
                            this.$message.error(msg + "失败，请联系管理员")
                        })
                    }
                })
            },
            // row 当前行
            selectRow(selection, row) {
                this.selectionItems = selection
            },
            // 全选
            selectAll(selection) {
                this.selectionItems = selection
            }
        },
        created() {
            this.search()
        }
    }
</script>

<style scoped>

</style>