<template>
	<div class="carCollect">
    
	    <!-- 会员中心内容布局组件 -->
        <member-layout
            title="车辆收藏"
            >
            <div slot="content">
                
                <member-inner>
                    <div class="m-collect-wrap">
                        <ul class="m-car-lst f__clearfix">
                            <template v-for="n in 10">
                                <li class="u-item">
                                    <a href="javascript:;" class="u-lk-box">
                                        <div class="u-pic-box">
                                            <span class="u-mark">个人车行</span>
                                            <div class="u-pic">
                                                <img :src="imgUrl" alt="车辆图"/>
                                            </div><!-- 图片容器 -->
                                            <a href="javascript:;" class="u-lk cancel" title="取消收藏">取消收藏</a>
                                        </div><!-- 图片容器 -->
                                        <div class="u-con">
                                            <div class="u-tit">
                                                大众-朗逸 2011款 1.6L 手动品悠版
                                            </div><!-- 标题 -->
                                            <div class="u-price">批发价：<em class="vital">4.00万</em></div><!-- 价格 -->
                                            <div class="u-merchant">车商：无形之刃</div><!-- 车商 -->
                                            <div class="u-other">南昌市/2011年/7.10万公里</div><!-- 其他 -->
                                        </div><!-- 内容 -->
                                    </a>
                                </li>
                            </template>
                        </ul>
                    </div>
                </member-inner>

            </div><!-- 车辆收藏内容 -->
        </member-layout>
	</div>
</template>

<script>

    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue' 
    // 会员中心子内容组件
    import memberInner from 'components/layout/memberInner.vue' 

	export default {
        
        name: "carCollect",
        // 在当前模块注册组件
        components:{
            memberLayout,
            memberInner
        },
        // 数据
        data() {
            return{
                imgUrl: require("assets/img/car_02.jpg"),
            }
        },
        // 自定义函数(方法)
        methods: {
            
        },
        
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'
</style>
