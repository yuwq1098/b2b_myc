<!--  
 **  @description 网站更多功能 - 布局组件
 --> 

<template>
	<div class="aboutLayout">
        <div class="m-about-mn">
            <div class="m-about-hd">
                <p class="tit">{{title}}</p>
            </div>
            <div class="m-article" :class="{'v2':articleType=='v2'}">
                <slot>
                    <!-- 页面内容 -->
                </slot>
            </div>
        </div>
	</div>
</template>

<script>


	export default {
        name: "aboutLayout",
        // 数据
        data() {
            return{

            }
        },
        props:{
            title:{
                type: String,
                default: "页面标题",
            },
            // 文章样式
            articleType:{
                type: String,
                default: '',
            }
        },
        //生命周期,该组件被创建的时候
        created(){

        },
        activated(){

        },
        //退出的生命周期钩子
        deactivated(){

        },
        // 自定义函数(方法)
        methods: {

        },
        // 在当前模块注册组件
        components:{

        },
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'
</style>
