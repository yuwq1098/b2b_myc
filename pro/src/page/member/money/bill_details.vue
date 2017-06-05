<template>
	<div class="billDetails">
        <div class="g-mn-con">
            <m-head>账单详情</m-head>
            <m-hint>
                <p>说明：电脑端暂不支持提现。如需提现，请到<em class="u-vital">“木有车app-我的-我的钱包”</em>中进行提现。<a class="u-vital">木有车app下载链接&gt;&gt;</a></p>
            </m-hint><!-- 提示 -->

            <div class="m-tb-info">
                <el-table
                    :data="billList"
                    style="width: 100%"
                    :row-class-name="tableRowClassName">
                    <el-table-column
                        prop="date"
                        label="创建时间"
                        width="220">
                    </el-table-column>
                    <el-table-column
                        prop="orderNo"
                        label="订单编号"
                        header-align="center"
                        align="center"
                        width="220">
                    </el-table-column>
                    <el-table-column
                        prop="price"
                        align="right"
                        label="金额（元）"
                        width="170">
                    </el-table-column>
                    <el-table-column
                        prop="state"
                        align="center"
                        label="状态"
                        width="170">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template scope="scope">
                            <el-button
                                size="small"
                                @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

        </div>
	</div>
</template>

<script>
    import MHint from "components/base/mHint.vue"
    import MHead from "components/base/memberHd.vue"
	
    export default {
    
        name: "billDetails",
        // 数据
        data() {
            return{
                billList: [{
                    date: '2017-05-06 13:54',
                    orderNo: "20506464644642588",
                    price: '-600.00',
                    state: '已付款',
                }, {
                    date: '2017-05-06 13:54',
                    orderNo: "20506464644642588",
                    price: '-600.00',
                    state: '已付款',
                }, {
                    date: '2017-05-06 13:54',
                    orderNo: "20506464644642588",
                    price: '-600.00',
                    state: '已付款',
                }, {
                    date: '2017-05-06 13:54',
                    orderNo: "20506464644642588",
                    price: '-600.00',
                    state: '已付款',
                }],
            }
        },
        // 自定义函数(方法)
        methods: {
            tableRowClassName(row, index) {
                if (index === 1) {
                    return 'info-row';
                } else if (index === 3) {
                    return 'positive-row';
                }
                return '';
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            }
        },
        // 在当前模块注册组件
        components:{
            MHint,
            MHead,
        },
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import './bill_details.styl'
</style>
