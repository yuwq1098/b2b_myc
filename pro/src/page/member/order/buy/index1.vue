<template>
	<div class="orderBuy">
	    <div class="g-mn-con">
            <div class="m-hd">
                <h3 class="u-tit">{{pageTitle}}</h3>
            </div><!-- 顶部标题头 -->
            <div class="m-order-tap" v-loading="loading">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="全部订单" name="all">
                        <all-order-table order-type="all"></all-order-table>
                    </el-tab-pane>
                    <el-tab-pane label="待签订电子合同" name="contract">
                        <order-table order-type="contract"></order-table>
                    </el-tab-pane>
                    <el-tab-pane label="待支付定金" name="payment">
                        <order-table order-type="payment"></order-table>
                    </el-tab-pane>
                    <el-tab-pane label="待过户验收" name="check">
                        <order-table order-type="check"></order-table>
                    </el-tab-pane>
                    <el-tab-pane label="过户完成" name="success">
                        <order-table order-type="success"></order-table>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        
	</div>
</template>

<script>
    import orderTable from "components/table/order-table";
    import allOrderTable from "components/table/all-order-table";
	export default {
        name: "orderBuy",
        // 数据
        data() {
            return{
                pageTitle: "买车订单",
                activeName: 'all',
                loading: false,
            }
        },
        // 自定义函数(方法)
        methods: {
            handleClick(tab, event) {
                //当前选择的是第几个tab
                console.log(this.activeName);
            }
        },
        // 在当前模块注册组件
        components:{
            orderTable,
            allOrderTable,
        },
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import './index.styl'
</style>
