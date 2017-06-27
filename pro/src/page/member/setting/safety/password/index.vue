<template>
    <div class="safetyPass">

        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="安全中心"
            >
            <div slot="safety">
                <div class="m-form-wrap">
                    <g-form>
                        <g-form-item
                            placeholder="请输入当前密码"
                            errorText="请输入当前密码"
                            :errorShow="true"
                            inputType="password"
                            title="当前密码"
                            >
                        </g-form-item>
                        <g-form-item
                            placeholder="请输入新密码"
                            errorText="请输入新密码"
                            :errorShow="false"
                            inputType="password"
                            title="新密码"
                            >
                        </g-form-item>
                        <g-form-item
                            placeholder="请输入确认密码"
                            errorText="请输入确认密码"
                            :errorShow="false"
                            inputType="password"
                            title="确认密码"
                            >
                        </g-form-item>

                        <div slot="btnBox">
                            <a href="javascript:;" class="u-btn primary">
                                确认修改
                            </a>
                            <a href="javascript:;" class="u-btn hollow">
                                重置
                            </a>
                        </div>
                    </g-form>
                </div>
            </div>
        </member-layout>

        
    </div>
</template>

<script>
    
    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue' 

    // 引入会员中心 表单组件
    import gForm from "components/member/form.vue"
    // 引入会员中心 表单item组件
    import gFormItem from "components/member/formItem.vue"

    export default {

        name: "safetyPass",
        // 在当前模块注册组件
        components:{
            memberLayout,
            gForm,
            gFormItem,
        },
        // 数据
        data() {
            return{
                
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
