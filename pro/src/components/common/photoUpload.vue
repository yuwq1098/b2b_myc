<!--  
 **  @description 图片文件上传（汽车图片上传）
 --> 

<template>
    <div class="photoUpload">
        <div class="m-upload-box">
            <p>汽车图片文件上传</p>
        </div>
    </div>
</template>

<script>

    export default {
        name: "photoUpload",
        // 数据
        data() {
            return{
                
            }
        },
        props:{
            
        },
        // 数据侦听
        watch:{
            
        },
        // 再次进入生命周期钩子(因为keep-alive的原因,created和mounted在页面切换过程中都是无效的)
        activated(){

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
    @import '~assets/css/mixin.styl'

</style>
