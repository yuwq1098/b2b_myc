<template>
    <div id="payDeposit">
        <div>我是支付定金页</div>
    </div>
</template>


<script>
   export default{
        name: "payDeposit",
        //数据
        data(){
           return{
               
           }
        },
        // 组件值传递（单向传递）
        props:{

        },
        //自定义函数（方法）
        methods:{
            
        },
        //属性计算
        computed: {
            
        },
        //当el被$el替换，并挂载到实例上去之后调用该钩子
        mounted(){
            
        },
        // 字段变化侦听
        watch: {
            
        },
        // 在当前模块注册组件
        components:{

        }
   }

</script>

<!-- 引入支付环节的页面样式 -->
<style lang="stylus" rel="stylesheet/stylus" scope>
   @import "./deposit.styl"
</style>