<template>
	<div class="updTelephone">
        <div class="g-mn-con">
            <m-head>修改手机号绑定</m-head>
            <div class="m-upd-box">
                
            </div>
        </div>        
	</div>
</template>

<script>
    import MHead from "components/base/memberHd.vue"
	export default {
        name: "updTelephone",
        // 数据
        data() {
            return{
                ruleForm: {
                    pass: '',
                    newPass: '',
                    checkPass: ''
                },
            }
        },
        // 自定义函数(方法)
        methods: {

        },
        // 在当前模块注册组件
        components:{
            MHead,
        },
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import './upd_tel.styl'
</style>
