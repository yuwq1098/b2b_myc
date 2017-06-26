<template>
	<div class="updTelephone">
        <div class="g-mn-con">
            <m-head>修改手机号绑定</m-head>
            <div class="m-upd-box">
                <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item class="mb-30" label="手机号" 
                        prop="telephone" 
                        :rules="[
                            { required: true, message: '手机号不能为空'},
                            { type: 'number', message: '手机号必须为数字值'}
                        ]">
                        <el-input type="telephone" v-model.number="ruleForm.telephone" placeholder="请填写要修改的手机号"></el-input>
                    </el-form-item>
                    <el-form-item class="mb-30" label="验证码" 
                        prop="vCode"
                        :rules="[
                            { required: true, message: '验证码不能为空'},
                            { type: 'number', message: '验证码必须为数字值'}
                        ]">
                        <el-col :span="14">
                            <el-input class="" type="text" v-model="ruleForm.vCode" placeholder="请填写验证码"></el-input>
                        </el-col>
                        <el-col :span="9" :offset="1">
                            <el-button type="button" :disabled="codeSecond!==0" class="u-vCode" style="width: 100%" @click.prevent="getCode">{{getCodeText}}</el-button>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
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
                codeSecond: 0,
                ruleForm: {
                    telephone: '',
                    vCode: '',
                },
            }
        },
        // 自定义函数(方法)
        methods: {
            getCode(){
                this.codeSecond = 60;
                let codeInterval;

                codeInterval = setInterval(() => {
                    if(this.codeSecond===0){
                        clearInterval(codeInterval);
                    }
                    this.codeSecond--
                },1000);
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('修改成功!');
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        computed:{
            getCodeText(){
                return this.codeSecond===0?"获取验证码":this.codeSecond+"秒后可重新获取";
            }
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
