<template>
	<div class="member">
	    <div class="g-doc">
			<c-head></c-head>
            <div class="g-bd">
                <section class="f__w1200">
                    <div class="m-crm">
                        <span>当前位置：</span>
                        <el-breadcrumb separator=">">
                            <el-breadcrumb-item :to="{ path: '/' }">个人中心</el-breadcrumb-item>
                            <el-breadcrumb-item>车辆订单</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div><!-- 面包屑 -->

                    <div class="m-bd-wrap f__clearfix">
                        <sidebar class="f__fl"></sidebar><!-- 侧边栏 -->
                        <section class="m-bd-mn f__fr">
                            
                        </section>     
                    </div>
                </section><!-- 1200px布局 -->
            </div><!-- 网页主体 -->
			<c-foot></c-foot>
		</div>
	</div>
</template>

<script>
    import cHead from "../../components/head/header.vue"
    import cFoot from "../../components/foot/footer.vue"
    //侧边栏
    import sidebar from "./sidebar.vue"

	export default {
        name: "member",
        // 数据
        data() {
            return{
                
            }
        },
        // 自定义函数(方法)
        methods: {
            
        },
        // 在当前模块注册组件
        components:{
            cHead,
            cFoot,
            sidebar,
        },
	}
</script>

<!-- 限定作用域 -->
<style lang="stylus" rel="stylesheet/stylus" scope>
    @import './member.styl'
</style>
