<template>
    <div style="position: relative;">
        <el-button type="info" style="float: right;position: relative;z-index: 1;" @click="loginOut">退出登录</el-button>
        <el-tabs v-model="editableTabsValue" type="card"
                 ref="tabs"
                 @tab-click="tabClickHandler"
                 @tab-remove="removeTab">
            <el-tab-pane
                    v-for="(item, index) in editableTabs"
                    :closable="item.close"
                    :key="item.name"
                    :label="item.title"
                    :name="item.name"
            >
                <!--{{item.content}}-->
                <div v-if="item.name == 1">
                    <WelcomeEmp></WelcomeEmp>
                </div>
                <div v-else-if="item.name == 2">
                    <!--<OrderRecords></OrderRecords>-->
                    <el-container>
                        <!---->
                        <el-header>
                            <div class="block">
                                <span class="demonstration">申请日期 </span>
                                <el-date-picker
                                        v-model="datequery"
                                        type="daterange"
                                        align="right"
                                        unlink-panels
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        :picker-options="pickerOptions"
                                        format="yyyy年M月d日"
                                        value-format="yyyy-MM-dd"
                                        clearable
                                >
                                </el-date-picker>

                                <el-button type="primary" @click="search">查询</el-button>
                                <el-button @click="addTab(editableTabsValue)" :disabled="ifAddTabCanClick" v-if="addOrderApply">新增</el-button>
                                <el-button type="warning" @click="delOrders" v-if="addOrderApply">删除</el-button>
                                <el-button type="warning" @click="testclear" >test</el-button>
                                <!--<el-button type="warning" @click="testtest">TEST - test</el-button>-->
                            </div>
                        </el-header>
                        <el-main>
                            <!--更多查询-待补充-已补充-->
                            <el-collapse  @change="handleChange">
                                <el-collapse-item title="更多查询" name="1" v-if="!addOrderApply">
                                    <el-form :inline="true" :model="query" class="demo-form-inline">
                                        <el-form-item label="订餐类型">
                                            <el-select v-model="query.orderfoodtype" clearable placeholder="午餐/晚餐">
                                                <el-option label="午餐" value="午餐"></el-option>
                                                <el-option label="晚餐" value="晚餐"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item style="width: 400px;" label="费用部门" prop="deptno">
                                            <el-select v-model="query.deptno" placeholder="请选择部门" clearable>
                                                <el-option v-for="dept in deptList" :label="dept.dname" :value="dept.deptno"></el-option>
                                                <!--<el-option label="部门一" value="1"></el-option>
                                                <el-option label="部门二" value="2"></el-option>
                                                <el-option label="部门三" value="3"></el-option>-->
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item style="width: 400px;" label="当前状态" prop="status">
                                            <el-select v-model="query.status" placeholder="审批进度" clearable>
                                                <el-option v-for="status in statusList" :label="status.sname" :value="status.status"></el-option>
                                               <!--<el-option label="驳回" value="0"></el-option>
                                                <el-option label="未提交" value="1"></el-option>
                                                <el-option label="待部门确认" value="2"></el-option>
                                                <el-option label="待系统确认" value="3"></el-option>
                                                <el-option label="完成" value="4"></el-option>-->
                                            </el-select>
                                        </el-form-item>
                                    </el-form>
                                </el-collapse-item>
                            </el-collapse>
                            <!--更多查询-待补充-->
                            <el-table
                                    ref="multipleSelectable"
                                    :row-key="getRowKeys"

                                    stripe
                                    :data="orders"
                                    tooltip-effect="dark"
                                    style="width: 100%"
                                    @select="selectRow"
                                    @select-all="selectAll"
                                    :header-cell-style="{background:'#000'}"
                                >
                                <!--复选框-->
                                <el-table-column
                                        v-if="addOrderApply"
                                        type="selection"
                                        :reserve-selection="true"
                                        width="55">
                                </el-table-column>
                                <!--索引列-->
                                <el-table-column
                                        type="index"
                                        :index="indexMethod"

                                        width="81"
                                        prop="empno"
                                        label="序号">
                                </el-table-column>

                                <el-table-column
                                        prop="orderno"
                                        label="申请编号">
                                </el-table-column>
                                <el-table-column
                                        prop="dname"
                                        label="费用部门">
                                </el-table-column>
                                <el-table-column
                                        sortable
                                        prop="ordertime"
                                        :formatter="formatterTime"
                                        label="申请日期"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="enames"
                                        label="订餐人员"
                                        show-overflow-tooltip
                                        width="120">
                                </el-table-column>
                                <el-table-column
                                        prop="orderfoodtype"
                                        label="订餐类型">
                                </el-table-column>
                                <el-table-column
                                        prop="foodamount"
                                        label="订餐数量">
                                </el-table-column>
                                <el-table-column
                                        prop="totalmoney"
                                        label="费用金额">
                                </el-table-column>
                                <!--<el-table-column-->
                                <!--        prop="status"-->
                                <!--        label="当前状态">-->
                                <!--</el-table-column>-->
                                <el-table-column
                                        prop="sname"
                                        label="当前状态">
                                </el-table-column>
                                <el-table-column
                                        prop="note"
                                        show-overflow-tooltip
                                        label="备注">
                                </el-table-column>
                                <el-table-column
                                        prop="reasonrejection"
                                        show-overflow-tooltip
                                        label="驳回意见">
                                </el-table-column>
                                <el-table-column
                                        fixed="right"
                                        label="操作"
                                        width="100">
                                    <template slot-scope="scope">
                                        <el-button @click="getOrderFoodList(scope.row)" type="text" size="small">详情</el-button>
                                        <!--<el-button @click="letOrderNo(scope.row)" type="text" size="small">驳回</el-button>-->
                                    </template>
                                </el-table-column>
                            </el-table>

                            <el-dialog width="40%" :title="title" :visible.sync="dialogFormVisible2">
                                <!--refs-->
                                <el-descriptions class="margin-top" title="其他信息" :column="1" :size="size" border>
                                    <!--<el-descriptions-item>
                                        <template slot="label">
                                            <i class="el-icon-mobile-phone"></i>
                                            申请人
                                        </template>
                                        {{orderOtherInfo.applyer}}
                                    </el-descriptions-item>-->
                                    <el-descriptions-item>
                                        <template slot="label">
                                            <i class="el-icon-user"></i>
                                            具体时间
                                        </template>
                                        {{orderOtherInfo.ordertime}}
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        <template slot="label">
                                            <i class="el-icon-location-outline"></i>
                                            餐品详情
                                        </template>
                                        {{orderOtherInfo.foodList}}
                                    </el-descriptions-item>
                                </el-descriptions>
                            </el-dialog>

                            <!--
                                @size-change 当每页条数改变时触发，参数是每页条数
                                @current-change 页码改变时触发，
                                current-page 当前页，v-bind
                                page-sizes 用户可选的每页条数
                                page-size 每页几条
                                total 总条数
                            -->
                            <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="query.page"
                                    :page-sizes="[10, 20, 30, 40]"
                                    :page-size="query.limit"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="total">
                            </el-pagination>
                        </el-main>
                    </el-container>
                </div>
                <div v-else-if="item.name == 3">
                    <ManagerPage ref="ManagerPage" :key="componentKey"></ManagerPage>
                </div>
                <div v-else-if="item.title == '加班订餐'">
                    <OrderApply :pMsg="msg" num="1" @getInfo="getMsg"></OrderApply>
                </div>

            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import WelcomeEmp from "@/views/WelcomeEmp.vue"
    import OrderApply from "@/views/OrderApply.vue"
    import ManagerPage from "@/views/ManagerPage.vue"
    export default {
        name: "EmpIndex",
        components: {
            WelcomeEmp,
            OrderApply,
            ManagerPage,
        },
        data() {
            return {
                dialogFormVisible2: false,
                // 点击查看的单个订单具体信息
                orderOtherInfo: {
                    ordertime: '',
                    applyer: '',
                    foodList: ''
                },

                total: 0,
                datequery: '',
                job: sessionStorage.getItem('job'),
                uname: sessionStorage.getItem('uname'),
                dname: '',
                query:{
                    // 查询条件
                    datestart: '',
                    dateend: '',
                    uname: sessionStorage.getItem('uname'),
                    orderfoodtype: '',
                    status: '',
                    page: 1,
                    limit: 10,
                    deptno: sessionStorage.getItem('deptno'),
                    // deptno: ''
                },

                formInline: {
                    user: '',
                    region: ''
                },
                deptList: [],
                statusList: [],

                editableTabsValue: '2',
                editableTabs: [{
                    title: '信息中心',
                    name: '1',
                    content: '这是欢迎页',
                    // close: 'closeable'
                }, {
                    title: '订餐记录',
                    name: '2',
                    content: '这是订餐记录页',
                }, {
                    title: '订单审批',
                    name: '3',
                    content: '这是审批页',
                    status: false
                }],
                tabIndex: 3,
                // 日期选择
                pickerOptions: {
                    shortcuts: [{
                        text: '本月',
                        onClick(picker) {
                            picker.$emit('pick', [new Date(), new Date()]);
                        }
                    }, {
                        text: '今年至今',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date(new Date().getFullYear(), 0);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近六个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setMonth(start.getMonth() - 6);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                // 查询结果
                orders: [],
                multipleSelection: [],

                // // 去订餐
                // orderapply: {
                //     orderno: '',
                //     ordertime: '',
                //     dname: '',
                //     orderfoodtype: '',
                // }

                // 被选中的项的集合
                selectionItems: [],

                // 新增 按钮的disabled
                ifAddTabCanClick: false,

                // 员工与经理的新增的差别
                checkWhoAdd: '',

                componentKey: 0,
                addOrderApply: true,

                // testShowOrHide: true
                activeNames: [],
            }
        },
        methods: {

            // 跨页保留
            getRowKeys(row) {
                return row.orderno;
            },
            // 序号连续
            indexMethod(index) {
                let curpage = this.query.page;  //单前页码，具体看组件取值
                let limitpage = this.query.limit;     //每页条数，具体是组件取值
                return index + 1 + (curpage - 1) * limitpage;
            },

            // 时间切割
            formatterTime(row,column){
                let data = row[column.property]
                return  /\d{4}-\d{1,2}-\d{1,2}/g.exec(data )
            },
            // 部门信息
            getAllDept() {
                this.$http.post("/deptList").then(res => {
                    this.deptList = res.data
                }).catch(() => {
                    this.$message.error("部门信息加载失败，请联系管理员")
                })
            },
            // 审批状态信息
            getAllStatusName() {
                this.$http.post("/statusnameList").then(res => {
                    this.statusList = res.data
                }).catch(() => {
                    this.$message.error("审批状态信息加载失败，请联系管理员")
                })
            },

            // 条件查询员工订餐信息
            getEmpOrderRecords() {
                // console.log(this.datequery)
                // this.uname = $store.state.uname
                if (this.datequery != null && this.datequery != "") {
                    this.query.datestart = this.datequery[0]
                    this.query.dateend = this.datequery[1]
                } else {
                    this.query.datestart = ''
                    this.query.dateend = ''
                }
                if (sessionStorage.getItem('uname') == 'adminfood') {
                    this.query.uname = ''
                }
                // debugger
                this.$http.post("/list", this.query).then(res => {
                    // console.log(res.data.data[0].dname)
                    this.orders = res.data.data
                    this.total = res.data.count
                    // this.dname = res.data.data[0].dname
                    // sessionStorage.setItem("dname", res.data.data[0].dname)
                }).catch(() => {
                    this.$message.error("订餐记录加载失败，请联系管理员")
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
                this.getEmpOrderRecords()
            },

            // 点击按钮查询
            search(){
                this.query.page = 1
                this.getEmpOrderRecords()
            },
            // 点击查看订单餐品详情
            getOrderFoodList(row) {
                this.dialogFormVisible2 = true
                // debugger
                this.$http.get("/getOrderFoodList", {
                    params: {
                        orderno: row.orderno
                    }
                }).then(res => {
                    // this.orderOtherInfo = res.data.data
                    console.log(res)
                    this.resOrderSummary2 = res.data
                    // var amount = 0
                    // var totalMoney = 0
                    var details = ''
                    for (let i = 0; i < this.resOrderSummary2.length; i++) {
                        // amount += this.resOrderSummary2[i].total
                        // totalMoney += this.resOrderSummary2[i].totalprice
                        details += (this.resOrderSummary2[i].fname + this.resOrderSummary2[i].foodamount + '份 ')
                    }
                    var time = this.resOrderSummary2[0].ordertime
                    var d = new Date(time);
                    var ordertime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                    // this.orderOtherInfo.ordertime = this.resOrderSummary2[0].ordertime
                    this.orderOtherInfo.ordertime = ordertime
                    this.orderOtherInfo.applyer = this.resOrderSummary2[0].ename
                    this.orderOtherInfo.foodList = details

                    // this.descriptionOrderIsHandle.amount = amount
                    // this.descriptionOrderIsHandle.totalMoney = totalMoney
                    // this.descriptionOrderIsHandle.details = details
                }).catch(() => {
                    this.$message.error("订单详情加载失败，请联系管理员")
                })
            },
            addTab(targetName) {


                // 时间检查，不在时间范围内不让订餐
                if (!(this.checkTimeInRange("08:30:00", "10:30:00") || this.checkTimeInRange("13:30:00", "16:30:00"))) {
                    this.$message.warning('订餐时间已过，午餐在10:30之前，晚餐13:30-16:30')
                    return
                }

                // this.$message.success(this.checkWhoAdd)
                // this.editableTabsValue
                // debugger
                // this.ifAddTabCanClick = true
                if (this.editableTabs.length > 3) {
                    this.$message.warning('请先完成当前订单申请')
                    return
                }
                let newTabName = ++this.tabIndex + '';
                this.editableTabs.push({
                    title: '加班订餐',
                    name: newTabName,
                    content: '这是订餐页',
                    // close: 'closeable'
                });
                // this.setShowingPage()
                this.editableTabsValue = newTabName
                // this.checkWhoAdd = ''
                // this.editableTabsValue = 1;
            },
            removeTab(targetName) {
                let tabs = this.editableTabs;
                let activeName = this.editableTabsValue;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.name;
                            }
                        }
                    });
                }

                this.editableTabsValue = activeName;
                this.editableTabs = tabs.filter(tab => tab.name !== targetName);
            },

            // 判断时间处于某个范围
            checkTimeInRange(beginTime, endTime) {
                var nowDate = new Date();
                var beginDate = new Date(nowDate);
                var endDate = new Date(nowDate);
                // debugger
                console.log(beginDate)
                // 13:30:00
                // 13:30
                var beginIndex1 = beginTime.indexOf("\:");
                var beginIndex2 = beginTime.lastIndexOf("\:");
                var beginHour = beginTime.substring(0, beginIndex1);
                var beginMinue = beginTime.substring(beginIndex1 + 1, beginIndex2);
                var beginSecond = beginTime.substring(beginIndex2 + 1, beginTime.length);
                beginDate.setHours(beginHour, beginMinue, beginSecond, 0);

                var endIndex1 = endTime.indexOf("\:");
                var endIndex2 = endTime.lastIndexOf("\:");
                var endHour = endTime.substring(0, endIndex1);
                var endMinue = endTime.substring(endIndex1 + 1, endIndex2);
                var endSecond = endTime.substring(endIndex2 + 1, endTime.length);
                endDate.setHours(endHour, endMinue, endSecond, 0);
                return nowDate.getTime() - beginDate.getTime() >= 0 && nowDate.getTime() <= endDate.getTime();
            },
            // // 去订餐
            // saveOrder() {
            // },
            // submitOrder() {
            // },


            // TEST this.$refs.multipleSelectable.clearSelection()
            testclear() {
                this.$message.success('点击了test')
                // debugger
                this.$nextTick(() => {
                    for(var i=0;i<this.$refs.multipleSelectable.length;i++){
                        this.$refs.multipleSelectable[i].clearSelection();
                    }
                })
                    // this.$refs.multipleSelectable.clearSelection()
                this.$message.success('test要结束了')
            },
            // 批量删除
            delOrders() {
                let selection = this.selectionItems
                //判断被选中的条数
                if (selection.length == 0){
                    this.$message.warning("请至少选择一条数据")
                    return
                }
                // debugger
                for (let i = 0; i < selection.length; i++) {
                    if (!(selection[i].sname == "驳回" || selection[i].sname == "未提交")) {
                        this.$message.warning('只可删除未提交或被驳回的订单记录')
                        return
                    }
                }
                //要求用户确认
                this.$confirm('确定删除所选订单吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //获取被选中项的empno
                    let arr = []
                    for (let i = 0; i < selection.length; i++) {
                        arr.push(selection[i].orderno)
                    }
                    this.$http.post("/delOrderRecords", arr).then(res => {
                        // debugger
                        if (res.data = "success") {
                            this.$message.success("删除成功")
                            // debugger
                            this.$nextTick(() => {
                                this.$refs.multipleSelectable.clearSelection()
                                // this.selectionItems = []
                            })
                                this.search()

                            // this.getEmpList()
                            // this.search()
                            // 待续，跨页删除
                        } else {
                            this.$message.warning("删除失败")
                        }
                        // this.search()
                        // this.$nextTick(() => {
                        //     this.$refs.multipleSelectable.clearSelection()
                        // })
                        // this.selectionItems = []
                    }).catch(() => {
                        this.$message.warning("删除失败，联系管理员")
                    })
                })
            },

            // 当对某行选中或取消选择都会触发
            // selection 被选中的项的集合
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
            },

            // 点击标签触发
            tabClickHandler() {
                // this.$message.success('触发tab-click')
                // this.search()
            },

            // 试试
            testtest() {
                // this.editableTabs.pop()
                // this.ifAddTabCanClick = false
                // this.testShowOrHide = false
            },
            // 父接子
            getMsg(msg) {
                this.editableTabs.pop()
                this.ifAddTabCanClick = false
                // this.editableTabsValue = '2'
                this.setShowingPage()
                this.search()
                this.componentKey += 1  // 这个好像可以，白天再试试
                // this.$refs.ManagerPage.searchForManager()   // 不好使
            },
            ifHideTabs () {
                this.$nextTick(() => {
                    // 此处的id为tab- name
                    if (this.job == '普通员工') {
                        this.$refs.tabs.$children[0].$refs.tabs[2].style.display = 'none'
                    }
                })
            },
            // 设置显示哪一页
            setShowingPage() {
                // debugger
                if (this.job == '普通员工') {
                    this.editableTabsValue = '2'
                } else if (this.job == '部门经理' || this.job == '订餐管理') {
                    this.editableTabsValue = '3'
                }
                if (this.job == '订餐管理') {
                    this.editableTabs.shift()
                }
                // if ((this.job == '普通员工' && this.checkWhoAdd == '')  ||
                //     (this.job == '普通员工' && this.checkWhoAdd != '')){
                //     this.editableTabsValue = '2'
                // } else if ((this.job == '部门经理' && this.checkWhoAdd == '') ) {
                //     this.editableTabsValue = '3'
                // } else if ((this.job == '部门经理' && this.checkWhoAdd != '')) {
                //     this.editableTabsValue = '3'
                // }
            },
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
            // 按钮是否显示 - 失败了
            setBtmAndIndexIfShow() {
                this.addOrderApply = sessionStorage.getItem('job') != '订餐管理'
            },

            handleChange(val) {
                console.log(val);
            }
        },
        computed: {
            // addOrderApply() {
            //     return sessionStorage.getItem('job') != '订餐管理';
            // },
            // delOrderApply() {
            //     return sessionStorage.getItem('job') == '订餐管理';
            // }

            // 根据身份跳转初始页面
            // editableTabsValue: function () {
            //     if (this.job == '普通员工') {
            //         return '2'
            //     } else if (this.job == '部门经理') {
            //         return '3'
            //     }
            //     // if (this.job == '普通员工' && this.checkWhoAdd != '') {
            //     //     return '3'
            //     // } else if (this.job == '部门经理' && this.checkWhoAdd != '') {
            //     //     return '4'
            //     // }
            // },
            // ifShowManagerPage: function () {
            //     if (this.job == '普通员工') {
            //         return false
            //     } else if (this.job == '部门经理') {
            //         return true
            //     }
            // }
        },
        mounted () {
            this.ifHideTabs()
        },
        created() {
            // 页面一加载就去获取
            this.search()
            console.log(this.job)
            this.setShowingPage()
            this.setBtmAndIndexIfShow()
            this.getAllDept()
            this.getAllStatusName()
        },
        mounted() {
            this.$refs.multipleSelectable.clearSelection()
        }
    }
</script>

<style scoped>

</style>