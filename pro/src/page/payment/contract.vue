<template>
    <div id="payContract">
        <div>我是签订合同页</div>
        <router-link :to="{path:'/pay/deposit'}" class="u-btn">跳转至支付定金页</router-link>
    </div>
</template>


<script>
   export default{
        name: "payContract",
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

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
   @import "./contract.styl"
</style>