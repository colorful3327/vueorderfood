<template>
    <div>
        <!--<el-header>
            <div class="block">
                &lt;!&ndash;<span>审批审批审批 - </span>&ndash;&gt;
                <span class="demonstration">申请日期 </span>
                <el-date-picker
                        :editable="false"
                        :clearable="false"
                        v-model="datequeryofmanager"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy年M月d日"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions">
                </el-date-picker>
                <el-select clearable v-model="foodtype" placeholder="请选择类型" @change="managerChangeType">
                    <el-option label="午餐" value="午餐"></el-option>
                    <el-option label="晚餐" value="晚餐"></el-option>
                </el-select>

                <el-button type="primary" @click="searchForManager">查询</el-button>
                <el-button type="primary" @click="letOrderYes">通过</el-button>
                &lt;!&ndash;<el-button type="warning" @click="searchSummaryInfo">测试查询汇总信息</el-button>&ndash;&gt;
            </div>
        </el-header>-->
        <el-main>
            <!--<el-collapse>
                &lt;!&ndash;v-model="activeNames" @change="handleChange"&ndash;&gt;
                <el-collapse-item title="审批统计" name="1">
                <el-descriptions class="margin-top" :column="4"  border>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-circle-check"></i>
                            已通过订单数
                        </template>
                        <span>{{descriptionOrderIsHandle.count}}</span>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-fork-spoon"></i>
                            订餐数量
                        </template>
                        <span>{{descriptionOrderIsHandle.amount}}</span>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-money"></i>
                            订餐总价
                        </template>
                        <span>{{descriptionOrderIsHandle.totalMoney}}</span>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-tickets"></i>
                            明细
                        </template>
                        <span>{{descriptionOrderIsHandle.details}}</span>
                    </el-descriptions-item>
                    &lt;!&ndash;第二行&ndash;&gt;
                    &lt;!&ndash;<el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-remove-outline"></i>
                            待审批订单数
                        </template>
                        <span>{{descriptionOrderToHandle.count}}</span>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-fork-spoon"></i>
                            订餐数量
                        </template>
                        <span>{{descriptionOrderToHandle.amount}}</span>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-money"></i>
                            订餐总价
                        </template>
                        <span>{{descriptionOrderToHandle.totalMoney}}</span>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-tickets"></i>
                            明细
                        </template>
                        <span>{{descriptionOrderToHandle.details}}</span>
                    </el-descriptions-item>&ndash;&gt;
                </el-descriptions>
                </el-collapse-item>
            </el-collapse>-->


            <el-row>
                <el-col :span="7">
                    <el-calendar>
                        <template
                                slot="dateCell"
                                slot-scope="{date, data}">
                            <div @click="searchForManager(data.day)">
                                {{  data.day.split('-').slice(2).join('-') }}
                            </div>
                        </template>
                    </el-calendar>
                </el-col>
                <el-col :span="17">
                    <el-row>
                        <el-col :span="5" align="left">
                            &nbsp;&nbsp;费用信息</el-col>
                        <el-col :span="11"><div>&nbsp;</div></el-col>
                        <el-col :span="8" align="right">
                            <el-select clearable v-model="foodtype" placeholder="请选择订餐类型" @change="managerChangeType">
                                <el-option label="午餐" value="午餐"></el-option>
                                <el-option label="晚餐" value="晚餐"></el-option>
                            </el-select>&nbsp;
                            <el-button-group>
                                <el-button type="primary" @click="letOrderYes">通过</el-button>
                                <!--<el-button type="primary" @click="submit('提交')">提交</el-button>-->
                                <!--<el-button type="warning" @click="dialogFormVisible = true">退回</el-button>-->
                            </el-button-group>
                        </el-col>
                    </el-row>
                    <el-descriptions :column="1" border style="margin-left: 10px;margin-top: 14px">
                        <el-descriptions-item label="已通过订单数"  >
                            {{this.descriptionOrderIsHandle.count}}
                        </el-descriptions-item>
                        <el-descriptions-item label="订餐数量" >
                            {{this.descriptionOrderIsHandle.amount}}
                        </el-descriptions-item>
                        <el-descriptions-item label="订餐金额">
                            {{this.descriptionOrderIsHandle.totalMoney}}
                        </el-descriptions-item>
                        <el-descriptions-item label="餐品明细">
                            {{this.descriptionOrderIsHandle.details}}
                        </el-descriptions-item>
                    </el-descriptions>
                </el-col>
            </el-row>



            <!--<el-descriptions class="margin-top" title="审批统计" :column="4" :size="size" border>
                <template slot="extra">
                    <el-button type="primary" size="small">更新统计信息</el-button>
                </template>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-user"></i>
                        已通过订单数
                    </template>
                    1
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-mobile-phone"></i>
                        订餐数量
                    </template>
                    4
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-location-outline"></i>
                        订餐总价
                    </template>
                    60
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-tickets"></i>
                        明细
                    </template>
                    包子4份
                </el-descriptions-item>
                &lt;!&ndash;第二行&ndash;&gt;
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-user"></i>
                        待审批订单数
                    </template>
                    2
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-mobile-phone"></i>
                        订餐数量
                    </template>
                    2
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-location-outline"></i>
                        订餐总价
                    </template>
                    30
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-tickets"></i>
                        明细
                    </template>
                    盒饭两份
                </el-descriptions-item>
            </el-descriptions>-->
            <el-table
                    stripe
                    :data="ordersManagerNeed"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @select="selectRow"
                    @select-all="selectAll"
                    :header-cell-style="{background:'#000'}"
            >
                <!--复选框-->
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <!--索引列-->
                <el-table-column
                        type="index"
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
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="enames"
                        show-overflow-tooltip
                        label="订餐人员"
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
                <el-table-column
                        prop="sname"
                        label="当前状态">
                </el-table-column>
                <el-table-column
                        prop="note"
                        show-overflow-tooltip
                        label="备注">
                </el-table-column>
                <!--<el-table-column-->
                <!--        prop="reasonrejection"-->
                <!--        show-overflow-tooltip-->
                <!--        label="驳回意见">-->
                <!--</el-table-column>-->
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                    <template slot-scope="scope">
                        <el-button @click="getOrderFoodList(scope.row)" type="text" size="small">详情</el-button>
                        <el-button @click="letOrderNo(scope.row)" type="text" size="small">驳回</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="querymanager.page"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="querymanager.limit"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
            <!--弹出层 填写驳回信息 rejectInfo -->
            <el-dialog width="40%"  :visible.sync="dialogFormVisible">
                <!--refs-->
                <el-form :model="rejectInfo" ref="rejectInfo" :rules="rejectInfoRules">
                    <el-form-item style="width: 400px;" label="驳回意见"  prop="info">
                        <el-input
                            v-model="rejectInfo.info"
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 4}"
                            autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="confirmRejectInfo">确 定</el-button>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                </div>
            </el-dialog>

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
        </el-main>
    </div>
</template>

<script>
    export default {
        name: "ManagerPage",
        data() {
            return {
                total: 0,
                // 点击查看的单个订单具体信息
                orderOtherInfo: {
                    ordertime: '',
                    applyer: '',
                    foodList: ''
                },

                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                            // this.searchForManager(data.day)
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                // 管理日期查询
                datequeryofmanager: '',
                // 多条件查询
                querymanager: {
                    datestart: '',
                    dateend: '',
                    deptno: sessionStorage.getItem('deptno'),
                    status: 2,
                    orderfoodtype: '',
                    page: 1,
                    limit: 10
                },
                // 查询结果
                ordersManagerNeed: [],
                //
                foodtype: '',

                // 被选中的项的集合
                selectionItems: [],
                // 条件 点击通过/驳回，去更新后台
                updInfo: {
                    ordernos: [],
                    status: '',
                    reasonrejection: ''
                },

                // 驳回信息
                rejectInfo: {
                    info: ''
                },
                // 驳回的那行的orderno
                rejectOrderNo: '',
                // 弹出层是否显示
                dialogFormVisible: false,
                dialogFormVisible2: false,
                // 弹出层表单校验
                rejectInfoRules: {
                    info: [
                        {required: true, message: "请填写驳回意见~", trigger: "blur"}
                    ]
                },

                // 查询条件 - 汇总信息 - 部门经理/管理员审批界面显示
                searchOrderSummaryQuery: {
                    // datestart: '',      // 一开始直接设置死 - 更新 - 不了
                    // dateend: '',        // 一开始直接设置死 - 不了
                    // orderfoodtype: '',  // 一开始设置死 - 不了
                    deptno: '',         // 根据情况，部门经理就是本部门，管理员就是空。session - job
                    statuslist: [],     // 查之前再说 session-job 部门经理  2 3，管理 3 4，对应待处理 通过
                    // status: '',
                    datestart: '',
                    dateend: '',
                    orderfoodtype: ''
                },
                // 汇总信息查询结果 - 这个时间点这顿饭的那些订单某个审批状态的各类餐品数量及总价，一堆
                resOrderSummary: [
                    {
                        // 某类餐品的统计
                        fname: '',  // 名字
                        foodno: '', // 编号
                        price: '',  // 单价
                        total: '',  // 数量
                        totalprice: ''  // 总价
                    },
                    // 可能多个
                ],
                resOrderSummary2: [],
                // 订单数 - 某状态
                // 描述列表第一行：已通过的订单汇总信息
                descriptionOrderIsHandle: {
                    // 后台返回的是各个餐品的数量、总价，咱们还得汇总一下
                    count: '正在查询订单数1',      // 订单数 - 从后台直接得到
                    amount: '正在查询1',     // 总数量 - 算
                    totalMoney: '正在查询1', // 总金额 - 算
                    details: '正在查询1',    // 明细 - 拼起来
                },
                // 描述列表第二行：待处理的订单汇总信息 - 已废弃
                descriptionOrderToHandle: {
                    count: '正在查询2',      // 订单数
                    amount: '正在查询2',     // 总数量
                    totalMoney: '正在查询2', // 总金额
                    details: '正在查询2',    // 明细
                },
            };
        },
        mounted() {
            // this.$refs.datePick.focus(); // 让日历组件默认触发焦点事件
        },
        methods: {
            // 时间切割
            formatterTime(row,column){
                let data = row[column.property]
                return  /\d{4}-\d{1,2}-\d{1,2}/g.exec(data )
            },
            letOrderYes() {
                // this.$message.success('通过')
                this.managerUpdOrders()
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
            letOrderNo(row) {
                // 加个判断，不是今天的这顿饭，就不让操作。
                var date = new Date();//当前时间
                var year = date.getFullYear() //返回指定日期的年份
                var month = date.getMonth() + 1;//月
                var day = date.getDate();//日
                var checkdate = year + '-' + month + '-' + day

                var foodtp = ''
                if (this.checkTimeInRange("00:00:00", "11:59:59")) {
                    foodtp = '午餐'
                } else if (this.checkTimeInRange("12:00:00", "18:00:00")){
                    foodtp = '晚餐'
                } else {
                    foodtp = 'error'
                }
                // 10:30 之前午餐，8:30上班
                // 13:30-16:30 晚餐
                // if (this.checkTimeInRange("00:00:00", "11:59:59")) {
                //     this.foodtype = '午餐'
                // } else {
                //     this.foodtype = '晚餐'
                // }
                // this.setFoodtypeAndDate()
                // debugger
                if (!(checkdate == this.datequeryofmanager && foodtp == this.querymanager.orderfoodtype)) {
                    this.$message.warning('请对本时间段订单进行操作')
                    this.setFoodtypeAndDate()
                    return;
                }
                // this.$message.warning('驳回')
                // console.log(row)
                this.rejectOrderNo = row.orderno
                this.dialogFormVisible = true
            },
            // 此刻要管理的
            async searchForManager(date) {
                if (sessionStorage.getItem('job') == '订餐管理') {
                    this.querymanager.deptno = ''
                    this.querymanager.status = 3
                }

                // this.querymanager.datestart = this.datequeryofmanager + ' 00:00:00'
                // this.querymanager.dateend = this.datequeryofmanager + ' 23:59:59'
                this.querymanager.datestart = date + ' 00:00:00'
                this.querymanager.dateend = date + ' 23:59:59'

                // debugger

                // this.$nextTick(() => {})
                // this.$message.success('查询')
                // console.log(this.querymanager)
                await this.$http.post("/listForManage", this.querymanager).then(res => {
                    this.ordersManagerNeed = res.data.data
                    this.total = res.data.count

                    this.searchSummaryInfo()
                }).catch(() => {
                    this.$message.error("订餐记录加载失败，请联系管理员")
                })
            },

            getCurrentTime() {
                var date = new Date();//当前时间
                var year = date.getFullYear() //返回指定日期的年份
                var month = date.getMonth() + 1;//月
                var day = date.getDate();//日
                // var hour = date.getHours();//时
                // var minute = date.getMinutes();//分
                // var second = date.getSeconds();//秒
                //当前时间
                var curTime = year + "-" + month + "-" + day
                    // + " " + hour + ":" + minute + ":" + second;
                return curTime;
            },
            managerChangeType() {
                // this.$message.success('改变类型')
                this.querymanager.orderfoodtype = this.foodtype
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
            // 餐品类型
            setFoodtypeAndDate() {
                var date = new Date();//当前时间
                var year = date.getFullYear() //返回指定日期的年份
                var month = date.getMonth() + 1;//月
                var day = date.getDate();//日
                this.datequeryofmanager = year + '-' + month + '-' + day
                // 10:30 之前午餐，8:30上班
                // 13:30-16:30 晚餐
                if (this.checkTimeInRange("00:00:00", "11:59:59")) {
                    this.foodtype = '午餐'
                } else {
                    this.foodtype = '晚餐'
                }
                this.querymanager.orderfoodtype = this.foodtype
                this.querymanager.datestart = this.datequeryofmanager + ' 00:00:00'
                this.querymanager.dateend = this.datequeryofmanager + ' 23:59:59'

                this.searchOrderSummaryQuery.orderfoodtype = this.foodtype
                this.searchOrderSummaryQuery.datestart = this.datequeryofmanager + ' 00:00:00'
                this.searchOrderSummaryQuery.dateend = this.datequeryofmanager + ' 23:59:59'
            },
            // 查询管理员现在该审批的那些订单

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
            // 当对某行选中或取消选择都会触发
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
            // 点击通过，去更新后台
            managerUpdOrders() {
                let selection = this.selectionItems
                // 判断被选中的条数
                if (selection.length == 0){
                    this.$message.warning("请至少选择一条订单")
                    return
                }

                // 加个判断，不是今天的这顿饭，就不让操作。
                var date = new Date();//当前时间
                var year = date.getFullYear() //返回指定日期的年份
                var month = date.getMonth() + 1;//月
                var day = date.getDate();//日
                var checkdate = year + '-' + month + '-' + day

                var foodtp = ''
                if (this.checkTimeInRange("00:00:00", "11:59:59")) {
                    foodtp = '午餐'
                } else if (this.checkTimeInRange("12:00:00", "18:00:00")){
                    foodtp = '晚餐'
                } else {
                    foodtp = 'error'
                }
                // if (this.checkTimeInRange("00:00:00", "11:59:59")) {
                //     this.foodtype = '午餐'
                // } else {
                //     this.foodtype = '晚餐'
                // }
                // debugger
                this.setFoodtypeAndDate()
                if (!(checkdate == this.datequeryofmanager && foodtp == this.querymanager.orderfoodtype)) {
                    this.$message.warning('请查询本时间段订餐信息进行操作')
                    return;
                }

                // 要求用户确认
                this.$confirm('确定通过这些订餐申请吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let arr = []
                    for (let i = 0; i < selection.length; i++) {
                        arr.push(selection[i].orderno)
                    }
                    this.updInfo.ordernos = arr
                    this.updInfo.status = 3
                    if (sessionStorage.getItem('job') == '订餐管理') {
                        this.updInfo.status = 4
                    }
                    this.$http.post("/managerUpdOrders", this.updInfo).then(res => {
                        if (res.data == "success") {
                            this.$message.success("操作成功")
                            // this.getEmpList()
                            // 待续，跨页通过
                        } else {
                            this.$message.warning("操作失败")
                        }
                        // this.searchForManager()
                        this.searchForManager(this.getCurrentTime())
                        this.updInfo =  {
                            ordernos: [],
                            status: '',
                            reasonrejection: ''
                        }
                        this.searchSummaryInfo()
                        this.selectionItems = []
                    }).catch(() => {
                        this.$message.warning("操作失败，联系管理员")
                    })
                })
            },

            // 点击驳回弹出层的“确认按钮”
            confirmRejectInfo() {
                // this.$message.success('点击了驳回层的确定按钮')
                this.$refs["rejectInfo"].validate(valid => {
                    if(valid) {
                        this.updInfo.ordernos = [this.rejectOrderNo]
                        this.updInfo.status = 0
                        this.updInfo.reasonrejection = this.rejectInfo.info
                        this.$http.post("/managerUpdOrders", this.updInfo).then(res => {
                            if (res.data == "success") {
                                this.$message.success("操作成功")
                            } else {
                                this.$message.warning("操作失败")
                            }
                            this.dialogFormVisible = false
                            // this.searchForManager()
                            this.searchForManager(this.getCurrentTime())
                            this.updInfo =  {
                                ordernos: [],
                                status: '',
                                reasonrejection: ''
                            }
                            this.rejectInfo.info = ''
                            this.searchSummaryInfo()
                        }).catch(() => {
                            this.$message.warning("操作失败，联系管理员")
                        })
                    }
                })
            },

            // 查询汇总信息
            searchSummaryInfo() {
                var thisjob = sessionStorage.getItem('job') // 你什么身份？
                // if (thisjob == '部门经理') {
                //     this.searchOrderSummaryQuery.deptno = sessionStorage.getItem('deptno')
                //     this.searchOrderSummaryQuery.status = 2   // 待部门确认
                // } else if (thisjob == '订餐管理') {
                //     this.searchOrderSummaryQuery.deptno = ''
                //     this.searchOrderSummaryQuery.status = 3   // 待系统确认
                // }
                // // console.log(this.searchOrderSummaryQuery)
                // this.$http.post("/listStatisticFoodInfo", this.searchOrderSummaryQuery).then(res => {
                //     // this.$message.success('查询成功，控制台看看res')
                //     // console.log(res)
                //     this.resOrderSummary = res.data
                //     // console.log(this.resOrderSummary)
                //     var amount = 0
                //     var totalMoney = 0
                //     var details = ''
                //     for (let i = 0; i < this.resOrderSummary.length; i++) {
                //         amount += this.resOrderSummary[i].total
                //         totalMoney += this.resOrderSummary[i].totalprice
                //         details += (this.resOrderSummary[i].fname + this.resOrderSummary[i].total + '份 ')
                //     }
                //     this.descriptionOrderToHandle.amount = amount
                //     this.descriptionOrderToHandle.totalMoney = totalMoney
                //     this.descriptionOrderToHandle.details = details
                //     console.log('初步统计 - 还没算数量')
                //     console.log(this.descriptionOrderToHandle)
                // }).catch(() => {
                //     this.$message.warning("汇总信息获取失败，联系管理员")
                // })
                // // 待审批订单总数
                // this.$http.post("/getCountByStatus", this.searchOrderSummaryQuery).then(res => {
                //     // this.$message.success('得到某状态订单总数')
                //     // console.log('得到某状态订单总数')
                //     // console.log(res.data)
                //     this.descriptionOrderToHandle.count = res.data
                // }).catch(() => {
                //     this.$message.warning("订单总数获取失败，联系管理员")
                // })

                if (thisjob == '部门经理') {
                    this.searchOrderSummaryQuery.deptno = sessionStorage.getItem('deptno')
                    this.searchOrderSummaryQuery.statuslist = [3, 4]   // 待管理员确认 - 部门经理已通过
                } else if (thisjob == '订餐管理') {
                    this.searchOrderSummaryQuery.deptno = ''
                    this.searchOrderSummaryQuery.statuslist = [4]   // 完成
                }

                this.searchOrderSummaryQuery.datestart = this.querymanager.datestart
                this.searchOrderSummaryQuery.dateend = this.querymanager.dateend
                this.searchOrderSummaryQuery.orderfoodtype = this.querymanager.orderfoodtype

                this.$http.post("/listStatisticFoodInfo", this.searchOrderSummaryQuery).then(res => {
                    this.resOrderSummary2 = res.data
                    var amount = 0
                    var totalMoney = 0
                    var details = ''
                    for (let i = 0; i < this.resOrderSummary2.length; i++) {
                        amount += this.resOrderSummary2[i].total
                        totalMoney += this.resOrderSummary2[i].totalprice
                        details += (this.resOrderSummary2[i].fname + this.resOrderSummary2[i].total + '份 ')
                    }
                    this.descriptionOrderIsHandle.amount = amount
                    this.descriptionOrderIsHandle.totalMoney = totalMoney
                    this.descriptionOrderIsHandle.details = details
                }).catch(() => {
                    this.$message.warning("汇总信息获取失败，联系管理员")
                })
                // 已通过订单总数
                this.$http.post("/getCountByStatus", this.searchOrderSummaryQuery).then(res => {
                    this.descriptionOrderIsHandle.count = res.data
                }).catch(() => {
                    this.$message.warning("订单总数获取失败，联系管理员")
                })
            },
        },
        created() {
            this.setFoodtypeAndDate()
            this.searchForManager(this.getCurrentTime())
            // console.log(this.querymanager)
            this.searchSummaryInfo()
        }
    }
</script>

<style lang="css">
    .el-calendar__header {
        display: flex;
        padding: 0 !important;
        justify-content: space-between;
        border-bottom: 1px solid #EBEEF5;
    }
    .el-calendar-table .el-calendar-day {
        box-sizing: border-box;
        padding: 8px ;
        height: 28px!important;
    }
    .el-calendar__body {
        padding: 0 !important;
    }
</style>