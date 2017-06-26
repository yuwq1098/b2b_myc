<template>
	<div class="updPwd">
        <div class="g-mn-con">
            <m-head>修改密码</m-head>
            <div class="m-upd-box">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item class="mb-30" label="当前密码" prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" auto-complete="off" placeholder="请输入当前密码"></el-input>
                    </el-form-item>
                    <el-form-item class="mb-30" label="新密码" prop="newPass">
                        <el-input type="password" v-model="ruleForm.newPass" auto-complete="off" placeholder="请输入新密码"></el-input>
                    </el-form-item>
                    <el-form-item class="mb-30" label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" placeholder="请再输入新密码"></el-input>
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
        name: "updPwd",
        // 数据
        data() {
            //自定义验证规则
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入当前密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validateNewPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.newPass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return{
                ruleForm: {
                    pass: '',
                    newPass: '',
                    checkPass: ''
                },
                rules: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' },
                        { min: 6, max: 13, message: '密码长度在 6 到 13 个字符', trigger: 'change' }
                    ],
                    newPass: [
                        { validator: validateNewPass, trigger: 'blur' },
                        { min: 6, max: 13, message: '密码长度在 6 到 13 个字符', trigger: 'change' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' },
                        { min: 6, max: 13, message: '密码长度在 6 到 13 个字符', trigger: 'change' }
                    ]
                }
            }
        },
        // 自定义函数(方法)
        methods: {
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
        // 在当前模块注册组件
        components:{
            MHead,
        },
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import './upd_pwd.styl'
</style>
