<template>
	<div class="memberInner">
        <div class="m-member-inner">
            <slot></slot>
        </div>
	</div>
</template>

<script>

    // 数据hash匹配
    import {crumbsHash} from "api/localJson/crumbItems.js"

	export default {
        name: "memberInner",
        // 数据
        data() {
            return{

            }
        },
        props:{

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
    .m-member-inner
        padding 15px
</style>
