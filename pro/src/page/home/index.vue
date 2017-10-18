<!-- 网站首页 -->
<template>
    <div class="home">
        <div class="g-doc">
            
        </div><!-- 文档 -->
    </div>
</template>

<script>

    export default {
        name: 'home',
        // 注册组件
        components: {

        },
        data () {
            return {

            }
        },
        //keep-alive之后页面会缓存，不会执行created(),和mounted(),但是会执行activated()
        activated() {

        },

        //退出的生命周期钩子
        deactivated(){

        },
        computed:{

        },
        watch:{


        },
    }
</script>


<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

