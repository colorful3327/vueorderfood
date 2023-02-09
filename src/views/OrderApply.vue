<template>
    <div>
        <!--申请信息-->
        <el-form :model="orderapply" ref="orderForm" size="mini" :rules="orderFormRules"
                 style="margin-left: 20%"
                 label-width="100px" class="demo-ruleForm">
            <el-row>
                <el-col>
                    <span>这是加班订餐页 </span>
                    <el-button type="primary" @click="saveOrder">保存</el-button>
                    <el-button type="primary" @click="submitOrder">提交</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="申请编号">
                        <el-input readonly v-model="orderapply.orderno"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="费用性质">
                        <el-input readonly value="公司管理"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="申请人">
                        <el-input readonly v-model="orderapply.uname"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="费用部门">
                        <el-input readonly v-model="orderapply.dname"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="订餐人员" prop="selectEnames">
                        <el-input readonly v-model="orderapply.selectEnames">
                            <el-button style="padding-right:10px" slot="suffix" type="text" @click="selectEmps">选择</el-button>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="订餐类型" prop="orderfoodtype">
                        <el-input readonly v-model="orderapply.orderfoodtype"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="订餐数量" prop="foodamount">
                        <el-input readonly v-model="orderapply.foodamount"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="总价" prop="totalmoney">
                        <el-input readonly v-model="orderapply.totalmoney"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="申请时间">
                        <el-input readonly v-model="orderapply.ordertime"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='8'>
                    <el-form-item label="备注">
                        <el-input v-model="orderapply.note"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>


        <!--弹出层，订餐人员选择-->
        <el-dialog width="72%" :title="title" :visible.sync="dialogFormVisible">
            <el-button type="primary" @click="confirmEmps">确定</el-button>
            <!--<el-button type="primary" @click="handleQueryCheckSelectEmps">测试测试</el-button>-->
            <div id="dynamic-component-demo">
                <div style="width: 900px;">
                    <el-form ref="selectEmpsForm">
                        <el-row style="display: flex;">
                            <el-col :span="10" style="width: 390px; border: 1px solid #ebeef5;">
                                <div style="padding: 5px 15px 10px; background-color: #f5f7fa; border-radius: 3px;">
                                    <el-form-item label="未选列表">
                                        <span style="float: right;">{{ listArr.length }}</span>
                                        <el-table :data="listArr" style="width: 100%;" border height="393" @selection-change="checkAll">
                                            <el-table-column type="selection"></el-table-column>
                                            <el-table-column
                                                    type="index"
                                                    width="81"

                                                    label="序号">
                                            </el-table-column>
                                            <el-table-column prop="ename" label="姓名"></el-table-column>
                                            <el-table-column prop="empno" label="ID" v-if="false"></el-table-column>
                                        </el-table>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="3" style="width: 80px; padding: 0 10px; display: flex; flex-direction: column; justify-content: center; ">
                                <!--穿梭框选中-->
                                <div style="display: flex; justify-content: center;">
                                    <el-button class="middle-circle" icon="el-icon-arrow-right" :disabled="!leftData.length" size="mini" type="primary"
                                               @click="handelSelect" >加入</el-button>
                                </div>
                                <!--穿梭框取消-->
                                <div style="display: flex; justify-content: center;">
                                    <el-button class="middle-circle" icon="el-icon-arrow-left" :disabled="!rightData.length" size="mini" type="primary" style="margin-top: 10px; margin-left: 0px;"
                                               @click="handleRemoveSelect" >移除</el-button>
                                </div>
                            </el-col>
                            <el-col :span="10" style="width: 390px; border: 1px solid #ebeef5;">
                                <div style="padding: 5px 15px 10px; background-color: #f5f7fa; border-radius: 3px;">
                                    <el-form-item label="已选列表">
                                        <span style="float: right;">{{ selectArr.length }}</span>
                                        <el-table :data="selectArr" style="width: 100%;" border height="393"
                                                  @selection-change="checkRightAll" ref="rightTableOfSelectEmps">
                                            <el-table-column type="selection"></el-table-column>
                                            <el-table-column
                                                    type="index"
                                                    width="81"

                                                    label="序号">
                                            </el-table-column>
                                            <el-table-column prop="ename" label="姓名"></el-table-column>
                                            <el-table-column prop="empno" label="ID" v-if="false"></el-table-column>
                                        </el-table>
                                    </el-form-item>
                                </div>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </div>
        </el-dialog>


        <!--选饭区域，可添加、删除、选择菜品显示单价输入数量填写备注-->
        <div style="margin-top: 20px;margin-left: 16%;width: 80%;align-items: center">
            <el-form ref="checkedfoodform" :rules="formRules" :inline="true" :model="checkedfoodform" label-width="80px">
                <div v-for="(item, index) in checkedfoodform.orderfoodinfo" :key="index" style="float:left;">
                    <el-form-item
                            label="餐品种类"
                    >
                        <el-select :disabled="addFood" style="width: 150px" v-model="item.foodno"
                                   placeholder="请选择菜品" @change="changeFoodType(item.foodno, index)">
                            <el-option v-for="(item, index) in foodList" :key="index" :label="item.fname" :value="item.foodno"></el-option>
                        </el-select>
                    </el-form-item>
                    <!--:prop="'orderfoodinfo.' + index + '.foodamount'"
                    :rules="[
                    { required: true, message: '请输入数量', trigger: 'blur' },
                    { pattern: /^\+?[1-9]\d*$/, message: '请完善选餐条目'}
                    ]"-->
                    <el-form-item
                            label="数量"
                    >
                        <el-input style="width: 90px" v-model="item.foodamount" @change="changeAmount" :readonly="addFood"></el-input>
                    </el-form-item>
                    <el-form-item
                            label="价格"
                    >
                        <el-input style="width: 90px" :value="item.price" :readonly="addFood"></el-input>
                    </el-form-item>
                    <el-form-item
                            label="备注"
                    >
                        <el-input style="width: 150px" v-model="item.notes" :readonly="addFood"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button v-if="index+1 == checkedfoodform.orderfoodinfo.length" @click="addItem" :disabled="addItemControl" type="primary">增加</el-button>
                        <el-button v-if="index !== 0" @click="deleteItem(item, index)" type="danger">删除</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </div>

</template>

<script>
    export default {
        name: "OrderApply",
        data() {
            return {
                // 餐品选择的各个输入框 readonly
                addFood: true,
                // 新增餐品种类按钮 disabled
                addItemControl: true,
                uname: sessionStorage.getItem('uname'),
                dname: sessionStorage.getItem('dname'),
                // 当前时间
                nowtime: '',
                // 去订餐
                orderapply: {
                    orderno: '',
                    ordertime: '',
                    empno: sessionStorage.getItem('empno'),
                    orderfoodtype: '',
                    foodamount: '',
                    totalmoney: '',
                    status: 1,
                    note: '',

                    orderfoodinfo: [],
                    uname: sessionStorage.getItem('uname'),
                    dname: sessionStorage.getItem('dname'),
                    empnos: [],
                    selectEnames: [],
                    // 另一张表的信息
                    // orderfoodinfo: []
                },
                // 选中的订餐人员姓名
                // selectEnames: [],
                // 穿梭框-左栏-部门编号去查询
                queryLeft: {
                    deptno: sessionStorage.getItem('deptno')
                    // deptno: '1'
                },
                deptno: '1',
                // thisemp: {},

                // 弹出层
                // 弹出层是否显示
                dialogFormVisible: false,
                // 弹出层标题
                title: "人员选择",
                searchParam: {},
                // 左栏信息
                // listArr: [
                //     { id: 1, name: "AAA", age: 1 },
                //     { id: 2, name: "BBB", age: 1 },
                //     { id: 3, name: "CCC", age: 1 },
                //     { id: 4, name: "DDD", age: 1 },
                //     { id: 5, name: "EEE", age: 1 },
                //     { id: 6, name: "FFF", age: 1 },
                //     { id: 7, name: "GGG", age: 1 },
                //     { id: 8, name: "HHH", age: 1 },
                //     { id: 9, name: "III", age: 1 },
                //     { id: 10, name: "JJJ", age: 1 },
                //     { id: 11, name: "KKK", age: 1 },
                //     { id: 12, name: "LLL", age: 1 },
                // ],
                listArr: [],
                // 右栏信息
                selectArr: [],
                // 右栏员工编号
                selectArrEmpnos: [],
                //
                changeArr: [],
                // 左边选中列表数据
                leftData: [],
                // 右边选中列表数据
                rightData: [],
                // 查询条件 - 选完订餐人，点击保存@click，去后台查一下都有谁不能订餐
                //      根据 时间(动态获取年月日 自行拼接时分秒)、订餐类型、部门编号
                queryCheckSelectEmps: {
                    timeBegin: '',  // 动态年月日拼接 00:00:00
                    timeEnd: '',    // 动态年月日拼接 23:59:59
                    foodType: '',   // 用那个自动填进去的类型
                    deptno: sessionStorage.getItem('deptno'),
                },
                // 员工们的编号 - 已经订餐了的，他们不再可以订餐
                hasOrderedFoodEmpnos: [],

                // 选择菜品
                checkedfoodform: {
                    orderfoodinfo: [
                        {
                            // orderno: '',
                            // name: "",
                            // phone: "",
                            foodno: '',
                            foodamount: '',
                            price: '',
                            notes: ''
                        }
                    ]
                },
                // 都有什么菜
                foodList: [],
                // 校验餐品信息
                formRules: {
                    // foodamount: [
                    //     {required: true, message: "请填写数量", trigger: "blur"}
                    // ]
                    // foodno: [
                    //     {required: true, message: "请选择菜品", trigger: "blur"}
                    // ]
                },
                // 校验订单信息
                orderFormRules: {
                    selectEnames: [
                        {required: true, message: "请选择订餐人", trigger: "change"}
                    ],
                    foodamount: [
                        // {required: true, message: "请选择餐品类别及数量", trigger: "change"},
                        {required: true, pattern: /^\+?[1-9]\d*$/, message: '请检查餐品类别及数量'}
                    ],
                    totalmoney: [
                        // {required: true, message: "请选择餐品类别及数量", trigger: "change"},
                        // { pattern:  /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/, message: '请选择餐品类型'}
                    ],
                },
                msg: ''
            }
        },
        methods: {
            // 去订餐
            saveOrder() {
                // this.$message.success("点击了保存")
                // this.dialogFormVisible = true
                // this.confirmEmps()
                this.orderapply.status = 1
                this.sendOrderApply()
            },
            submitOrder() {
                // this.$message.success("点击了提交")
                // this.confirmEmps()
                this.orderapply.status = 2
                this.sendOrderApply()

                // 子传父
                // this.$emit("getInfo", this.msg)
            },
            // 订单数据发给后台
            // 撤回到这里
            async sendOrderApply() {
                this.$refs["orderForm"].validate(valid => {
                    if (!valid) {
                        this.$message.warning('请完善订单信息')
                    }
                })
                this.setQueryCheckSelectEmps()
                // 关于同步 - 再说 - 写在 then 之内
                await this.$http.post("/getEmpnosCannotBook", this.queryCheckSelectEmps).then(res => {
                    console.log('res')
                    console.log(res)
                    this.hasOrderedFoodEmpnos = res.data
                }).catch(() => {
                    this.$message.error("获取已订餐人员失败,请联系管理员")
                })

                this.$refs.rightTableOfSelectEmps.clearSelection()
                this.selectArr.forEach(item => {
                    for (let i = 0; i < this.hasOrderedFoodEmpnos.length; i++) {
                        if (item.empno == this.hasOrderedFoodEmpnos[i]) {
                            this.dialogFormVisible = true
                            this.$refs.rightTableOfSelectEmps.toggleRowSelection(item, true)
                        }
                    }
                })
                if (this.rightData != '') {
                    this.dialogFormVisible = true
                    this.$message.warning('有人手快一步，订好餐了，请移出')
                    return
                }

                this.$refs["orderForm"].validate(valid => {
                    if (valid) {
                        // 准备提交
                        // this.orderapply.status = 1
                        this.orderapply.ordertime = this.getCurrentTime()
                        this.orderapply.orderfoodinfo = this.checkedfoodform.orderfoodinfo
                        // console.log(this.orderapply)
                        this.$http.post('/addOrderRecord', this.orderapply).then(res => {
                            if (res.data == "fail") {
                                this.$message.error("操作失败")
                            } else {
                                this.$message.success("操作成功")
                                this.orderapply.orderno = res.data
                                // console.log(res.data)
                            }
                            if (this.orderapply.status == '2') {
                                this.$emit("getInfo", this.msg)
                            }
                        }).catch(() => {
                            this.$message.error("失败，请联系管理员")
                        })
                    }
                })
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
            // 根据时间范围自动确定订餐类型
            setOrderfoodtype() {
                // 10:30 之前午餐，8:30上班
                // 13:30-16:30 晚餐
                if (this.checkTimeInRange("8:30:00", "10:30:00")) {
                    this.orderapply.orderfoodtype = '午餐'
                } else if (this.checkTimeInRange("13:30:00", "16:30:00")) {
                    this.orderapply.orderfoodtype = '晚餐'
                } else {
                    this.orderapply.orderfoodtype = 'error'
                }
            },

            // 弹出层显示
            selectEmps() {
                // this.$message.success("点击了选择")
                this.dialogFormVisible = true
            },

            // 弹出层
            checkAll(val) {
                this.leftData = val;
            },
            checkRightAll(val) {
                this.rightData = val;
            },
            // 穿梭框选中
            handelSelect() {
                console.log('从左到右')
                for (let i = 0; i < this.selectArr.length; i++) {
                    for (let j = 0; j < this.leftData.length; j++) {
                        if (this.leftData[j].empno === this.selectArr[i].empno) {
                            this.leftData = []; // 避免 左边勾选内容 leftData 与 右边内容 selectArr 重复
                        }
                    }
                }
                this.selectArr = this.handleConcatArr(
                    this.selectArr,
                    this.leftData
                );
                this.handleRemoveTabList(this.leftData, this.listArr);
                this.leftData = [];
            },
            // 穿梭框取消
            handleRemoveSelect() {
                console.log('从右到左')
                this.listArr = this.handleConcatArr(this.listArr, this.rightData);
                this.handleRemoveTabList(this.rightData, this.selectArr);
                this.rightData = [];
                //
                // this.confirmEmps()
                // this.changeAmount()
                // console.log(this.orderapply.empnos)
            },
            handleConcatArr(selectArr, leftData) {
                let arr = [];
                arr = arr.concat(selectArr, leftData);
                return arr;
            },
            handleRemoveTabList(isNeedArr, originalArr) {
                if (isNeedArr.length && originalArr.length) {
                    for (let i = 0; i < isNeedArr.length; i++) {
                        for (let k = 0; k < originalArr.length; k++) {
                            if (isNeedArr[i]["empno"] === originalArr[k]["empno"]) {
                                originalArr.splice(k, 1);
                            }
                        }
                    }
                }
            },

            // 获取同一个部门的员工的编号和姓名，显示在左栏
            getEmpListByDept() {
                // console.log('触发getEmpListByDept')
                // console.log(typeof Number(sessionStorage.getItem('deptno')))
                // this.$http.post("/getEmpListByDept", this.queryLeft)
                // this.$http.get("/getEmpListByDept", {
                //     params: {
                //         dname: sessionStorage.getItem('dname')
                //     }
                // })
                this.$http.get("/getEmpListByDept", {
                    params: {
                        deptno: Number(sessionStorage.getItem('deptno'))
                    }
                }).then(res => {
                    // console.log('THEN then')
                    // console.log(res.data)
                    for (var key in res.data) {
                        var param = {};
                        param.empno= res.data[key].empno;
                        param.ename= res.data[key].ename;
                        this.listArr.push(param);
                    }
                    // console.log('listArr:')
                    // console.log(this.listArr)
                    // this.listArr = res.data.data
                }).catch(() => {
                    this.$message.error("员工选择列表加载失败，请联系管理员")
                })
            },
            // 选好订餐人以后点击“确定”按钮
            async confirmEmps() {
                // 检查一下选的订餐人是否都可以订餐
                this.setQueryCheckSelectEmps()

                await this.$http.post("/getEmpnosCannotBook", this.queryCheckSelectEmps).then(res => {
                    // console.log('res')
                    // console.log(res)
                    this.hasOrderedFoodEmpnos = res.data
                }).catch(() => {
                    this.$message.error("获取已订餐人员失败,请联系管理员")
                })

                this.$refs.rightTableOfSelectEmps.clearSelection()
                this.selectArr.forEach(item => {
                    for (let i = 0; i < this.hasOrderedFoodEmpnos.length; i++) {
                        if (item.empno == this.hasOrderedFoodEmpnos[i]) {
                            this.$refs.rightTableOfSelectEmps.toggleRowSelection(item, true)
                        }
                    }
                })
                if (this.rightData != '') {
                    this.$message.warning('有人已经订好餐了，请点击移出~')
                    // this.dialogFormVisible = true
                    return
                }
                //
                this.orderapply.empnos = []
                this.orderapply.selectEnames = []
                for (var key in this.selectArr) {
                    this.orderapply.empnos.push(this.selectArr[key].empno);
                    this.orderapply.selectEnames.push(this.selectArr[key].ename)
                }
                // console.log('selectArrEmpnos')
                // console.log(this.selectArrEmpnos)
                // 选中的人员编号
                // var empnos = []
                // this.orderapply.empnos = this.selectArrEmpnos
                // console.log('empnos')
                // console.log(this.orderapply.empnos)
                // console.log('selectEnames')
                // console.log(this.orderapply.selectEnames)
                // this.$http.post("/getEnameByEmpnos", empnos).then(res => {
                //     console.log(res)
                // }).catch(() => {
                //     this.$message.warning("存姓名失败了")
                // })
                this.dialogFormVisible = false
                if (this.orderapply.empnos == '') {
                    console.log('订餐人员为空')
                    this.addItemControl = true
                    this.addFood = true
                    this.checkedfoodform = {
                        orderfoodinfo: [
                            {
                                // orderno: '',
                                // name: "",
                                // phone: "",
                                foodno: '',
                                foodamount: '',
                                price: '',
                                notes: ''
                            }
                        ]
                    }
                    this.orderapply.foodamount = ''
                    this.orderapply.totalmoney = ''
                } else {
                    console.log('订餐人员不为空')
                    this.addItemControl = false
                    this.addFood = false
                }
                this.changeAmount()
                this.setQueryCheckSelectEmps()
            },
            // 为查询已订餐员工的查询条件赋值
            setQueryCheckSelectEmps() {
                var date = new Date();//当前时间
                var year = date.getFullYear() //返回指定日期的年份
                var month = date.getMonth() + 1;//月
                var day = date.getDate();//日
                //当前时间
                var curTime = year + "-" + month + "-" + day;
                this.queryCheckSelectEmps.timeBegin = curTime + ' 00:00:00'
                this.queryCheckSelectEmps.timeEnd = curTime + ' 23:59:59'
                this.queryCheckSelectEmps.foodType = this.orderapply.orderfoodtype
                // console.log(this.queryCheckSelectEmps)  // 通过
                // 把这个 queryCheckSelectEmps 传走，得到已进入订餐流程(不是保存或驳回状态)的员工的编号
            },
            // 去做重复订餐的访问后台，把结果存到一个校验数组里 - 同步请求，写在下面那个异步里了
            sendQueryCheckSelectEmps() {
                // debugger
                this.$http.post("/getEmpnosCannotBook", this.queryCheckSelectEmps).then(res => {
                    console.log('res')
                    console.log(res)
                    this.hasOrderedFoodEmpnos = res.data
                }).catch(() => {
                    this.$message.error("获取已订餐人员失败,请联系管理员")
                })
            },
            // async goNextQuestion() {
            //     await   Vue.http.post(url, {}).then(function (resp) {
            //     })
            //     //这里之后的代码等待http结果返回后才执行
            // },

            // 判断重复订餐人员，并提示/直接帮他选中？
            async handleQueryCheckSelectEmps() {
                // justTestTest测试基本可以了，一会儿整合
                this.setQueryCheckSelectEmps()

                // console.log('this.selectArr')
                // console.log(this.selectArr)
                // console.log('查询之前')
                // console.log(this.hasOrderedFoodEmpnos)
                // await this.sendQueryCheckSelectEmps()
                await this.$http.post("/getEmpnosCannotBook", this.queryCheckSelectEmps).then(res => {
                    // console.log('res')
                    // console.log(res)
                    this.hasOrderedFoodEmpnos = res.data
                }).catch(() => {
                    this.$message.error("获取已订餐人员失败,请联系管理员")
                })
                // console.log('查询之后')
                // console.log(this.hasOrderedFoodEmpnos)

                this.$refs.rightTableOfSelectEmps.clearSelection()
                // console.log(this.hasOrderedFoodEmpnos)  // 第一次点击 得到空？异步？
                // console.log('this.hasOrderedFoodEmpnos')
                // console.log(this.hasOrderedFoodEmpnos)
                // debugger
                this.selectArr.forEach(item => {
                    for (let i = 0; i < this.hasOrderedFoodEmpnos.length; i++) {
                        if (item.empno == this.hasOrderedFoodEmpnos[i]) {
                            this.$refs.rightTableOfSelectEmps.toggleRowSelection(item, true)
                        }
                    }
                })
                if (this.rightData != '') {
                    this.$message.error('有人已经订好餐了，请点击移出~')
                    return
                }
            },
            // 试试根据条件选中右栏某行数据
            justTestTest() {
                // this.setQueryCheckSelectEmps()
                // this.sendQueryCheckSelectEmps()
                // this.$refs.rightTableOfSelectEmps.clearSelection()
                // var empnosTest = [6, 7]
                // this.selectArr.forEach(item => {
                //     // debugger
                //     // if (item.empno == 6) {
                //     //     this.$refs.rightTableOfSelectEmps.toggleRowSelection(item, true)
                //     // }
                //     for (let i = 0; i < empnosTest.length; i++) {
                //         if (item.empno == empnosTest[i]) {
                //             this.$refs.rightTableOfSelectEmps.toggleRowSelection(item, true)
                //         }
                //     }
                //     // 通过，empnosTest 之后改为从后台获取的不可订餐的员工编号
                //     // 如果有，就给他选中，让他看看然后自己移除，卡住保存不让他存，
                //     // 直到都符合规则，再保存好订餐人员
                // })
            },

            // 选择菜品
            // 新增一行
            addItem() {
                this.checkedfoodform.orderfoodinfo.push({
                    // name: "",
                    // phone: ""
                    foodno: '',
                    foodamount: '',
                    price: '',
                    notes: ''
                });
                this.changeAmount()
            },
            sure(checkedfoodform) {
                console.log(this.checkedfoodform.orderfoodinfo.length, "length");
                this.$refs[checkedfoodform].validate(valid => {
                    if (valid) {
                        alert("submit!");
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
            deleteItem(item, index) {
                this.checkedfoodform.orderfoodinfo.splice(index, 1);
                console.log(this.checkedfoodform.orderfoodinfo, "删除");
                this.changeAmount()
            },
            // 获取餐品信息
            getAllFood() {
                this.$http.post("/foodList").then(res => {
                    //
                    this.foodList = res.data
                }).catch(() => {
                    this.$message.error("餐品信息加载失败，请联系管理员")
                })
            },
            // 选择菜品
            changeFoodType(foodno, index) {
                this.changeAmount()
                // debugger
                for (var i=0; i<this.checkedfoodform.orderfoodinfo.length; i++) {
                    for (var j=i+1; j<this.checkedfoodform.orderfoodinfo.length; j++) {
                        if (this.checkedfoodform.orderfoodinfo[i].foodno == this.checkedfoodform.orderfoodinfo[j].foodno) {
                            this.orderapply.foodamount = '请将重复类别的餐品合并预定'
                            return
                        }
                    }
                }

                // 根据 foodno 获取 price，根据 index 决定把 price 存到第几栏
                for (let i = 0; i < this.foodList.length; i++) {
                    // debugger
                    if (foodno == this.foodList[i].foodno) {
                        this.checkedfoodform.orderfoodinfo[index].price = this.foodList[i].price
                        break
                    }
                }
                this.changeAmount()
            },
            // 动态填写某类餐品数量，计算总价、总数
            changeAmount() {
                var sumCount = 0;   // 总数
                var sumMoney = 0;   // 总价
                for (let i = 0; i < this.checkedfoodform.orderfoodinfo.length; i++) {
                    if (isNaN(this.checkedfoodform.orderfoodinfo[i].foodamount) ||
                        isNaN(this.checkedfoodform.orderfoodinfo[i].price) ||
                        this.checkedfoodform.orderfoodinfo[i].foodamount == '' ||
                        this.checkedfoodform.orderfoodinfo[i].price == '') {
                        // break
                        this.orderapply.foodamount = '请选择类别并输入合理的数量'
                        return
                    }
                    sumCount += Number(this.checkedfoodform.orderfoodinfo[i].foodamount)
                    sumMoney += Number(this.checkedfoodform.orderfoodinfo[i].price) * Number(this.checkedfoodform.orderfoodinfo[i].foodamount)
                }
                if (sumCount > this.orderapply.empnos.length) {
                    this.orderapply.foodamount = '请节约订餐，餐品数不可超过总人数';
                    return;
                }
                this.orderapply.foodamount = sumCount;
                this.orderapply.totalmoney = sumMoney;
            },

            //获取系统时间
            getCurrentTime() {
                var date = new Date();//当前时间
                var year = date.getFullYear() //返回指定日期的年份
                var month = date.getMonth() + 1;//月
                var day = date.getDate();//日
                var hour = date.getHours();//时
                var minute = date.getMinutes();//分
                var second = date.getSeconds();//秒
                //当前时间
                var curTime = year + "-" + month + "-" + day
                    + " " + hour + ":" + minute + ":" + second;
                return curTime;
            }
        },
        created() {
            this.getEmpListByDept()
            this.getAllFood()
            this.setOrderfoodtype()

            // 缓一下，理理这会儿思路
            // 订单信息表：编号-自动，时间-前台实时获取显示在输入框?，申请人即员工编号-session，订餐类型-根据时间自动填进去，
            //              订餐数-选好饭之后算一下填进去，总金额-一样，状态码-成功提交后再设置，
            //              人员选择-穿梭框-选完之后把员工编号和员工姓名都存一下，编号要提交到关系表，姓名要显示在页面中
            // 穿梭框：一开始把一个部门里的人全都无脑显示出来，获取到编号和姓名，穿梭到右栏的拿出来。
            //          选完的时候，点提交，控制一下，有人订了就不让提交，提示一下谁订了，穿梭回左栏才可以提交
            //      如何确认谁订餐？一个饭点的订单都找出来，根据订单编号去看关系表，有对应员工编号的就不能重复被订餐
        }
    }
</script>

<style scoped>

</style>