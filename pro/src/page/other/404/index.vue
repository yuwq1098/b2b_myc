<template>
    <div class="page404">
        <div>不好意思，页面不见了，我们的程序员小哥正在建设中</div>
    </div>
</template>

<script>
    
    // 获取数据的api
    import api from 'api/getData.js'
    // 引入系统变量
    import * as SYSTEM from 'api/system.js'
    // 工具类
    import {dataToJson} from "assets/js/util.js"
    // dom操作类
    import * as geekDom from 'assets/js/dom.js'


    export default {
        name: "page404",
        // 自定义表单验证
        validator: null,
        // 在当前模块注册组件
        components:{

        },
        // 数据
        data() {
            return{


            }
        },
        //生命周期,开始的时候
        created(){

        },
        mounted(){

        },
        activated(){

        },
        //退出的生命周期钩子
        deactivated(){

        },
        // 数据侦听
        watch:{

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
