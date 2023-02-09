<template>
    <div>
        <h1 style="margin-bottom: 10px">餐品管理</h1>
        <el-form :inline="true" :model="query" class="demo-form-inline">
            <el-form-item label="餐品名称">
                <el-input v-model="query.fname" clearable placeholder="请输入餐品名"></el-input>
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
                :data="foods"
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
                    prop="foodno"
                    label="序号">
                <!--prop="empno"-->
            </el-table-column>
            <el-table-column
                    prop="foodno"
                    width="120"
                    label="餐品编号">
            </el-table-column>
            <el-table-column
                    prop="fname"
                    label="餐品名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="餐品价格"
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
            <el-form :model="foodForm" ref="foodForm" :rules="rules">
                <el-form-item v-if="foodForm.foodno != ''" style="width: 400px;" label="餐品编号" :label-width="formLabelWidth" prop="empno">
                    <el-input v-model="foodForm.foodno" autocomplete="off" readonly></el-input>
                </el-form-item>
                <el-form-item style="width: 400px;" label="餐品名称" :label-width="formLabelWidth" prop="fname">
                    <el-input v-model="foodForm.fname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item style="width: 400px;" label="餐品单价" :label-width="formLabelWidth" prop="price">
                    <el-input v-model="foodForm.price" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveFood">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "InfoManageOfFood",
        data(){
            var checkname = (rule, value, callback) => {
                var oldName = this.oldNameCheck
                if (oldName != value) {
                    this.$http.get("/checkSameNameFood", {
                        params: {
                            fname: value
                        }
                    }).then(res => {
                        // this.$message.success('重名查询成功')
                        // console.log(res.data)
                        if (res.data != '' && res.data != null) {
                            callback(new Error("餐品已存在，请直接更新其信息"))
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
                    fname: [
                        {required: true, message: "请填写名称", trigger: "blur"},
                        { validator: checkname, trigger: "blur" },
                    ],
                    price: [
                        {required: true, message: "请填写价格", trigger: "blur"},
                        {required: true, pattern: /(^[1-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/, message: '价格应为大于零的整数或不超过两位的小数'}
                    ]
                },
                total: 0,
                query:{
                    // 查询条件
                    fname: '',
                    page: 1,
                    limit: 10
                },
                // deptList: [],
                // 展示的餐品信息列表，包括餐品号、餐品名称、餐品单价
                foods: [],
                // 弹出层是否显示
                dialogFormVisible: false,
                // 新增的表单数据源
                foodForm: {
                    foodno: '',
                    fname: '',
                    price: ''
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
            getFoodsListByPage() {
                this.$http.post("/foodsListByPage", this.query).then(res => {
                    // console.log(res.data)
                    this.foods = res.data.data
                    this.total = res.data.count
                }).catch(() => {
                    this.$message.error("部门信息加载失败，请联系管理员")
                })
            },
            // 点击按钮查询
            search(){
                this.query.page = 1
                this.getFoodsListByPage()
            },

            // 当"每页多少条"被改变时触发，val 代表改变后每页多少条
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.query.limit = val
                this.search()
            },
            // 当“当前页”被改变时触发，val 代表当前页
            handleCurrentChange(val) {
                this.query.page = val
                this.getFoodsListByPage()
            },
            // 打开弹出层
            add() {
                this.dialogFormVisible = true
                this.title = "新增餐品"
                this.foodForm = {
                    foodno: '',
                    fname: '',
                    price: ''
                }
            },
            update() {
                // 判断是否只选中了一条
                let selections = this.selectionItems
                if (selections.length != 1) {
                    this.$message.warning("请选择一种餐品进行修改")
                    return
                }
                // 打开弹出层
                this.dialogFormVisible = true
                // 重置表单
                if (this.$refs["foodForm"] != null) {
                    this.$refs["foodForm"].resetFields()
                }
                this.title = "修改餐品信息"
                // 给表单元素赋值
                this.foodForm = selections[0]
                this.oldNameCheck = selections[0].fname
            },
            del() {
                let selection = this.selectionItems
                //判断被选中的条数
                if (selection.length == 0){
                    this.$message.warning("请至少选择一条数据")
                    return
                }
                //要求用户确认
                this.$confirm('确定删除所选餐品吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //获取被选中项的empno
                    let arr = []
                    for (let i = 0; i < selection.length; i++) {
                        arr.push(selection[i].foodno)
                    }
                    // debugger
                    this.$http.post("/delFoods", arr).then(res => {
                        // debugger
                        if (res.data == "success") {
                            this.$message.success("删除成功")
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
            // 保存餐品信息
            saveFood() {
                // 表单校验
                this.$refs["foodForm"].validate(valid => {
                    if(valid) {
                        // 默认走修改
                        let url = '/updateFood';
                        let msg = '修改'
                        if (this.foodForm.foodno == '') {
                            url = '/addFood';
                            msg = '新增'
                        }

                        this.$http.post(url, this.foodForm).then(res => {
                            if (res.data == "success") {
                                this.$message.success(msg + "成功")
                            } else {
                                this.$message.error(msg + "失败")
                            }
                            // 关闭弹出层
                            this.dialogFormVisible = false
                            // this.query.page = 1
                            this.getFoodsListByPage()
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