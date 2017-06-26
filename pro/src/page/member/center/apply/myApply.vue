<template>
	<div class="myApply">
        <div class="g-mn-con">
            <m-head>我的认证</m-head>
        </div>
        
        <div class="m-flow-wrap">
            <apply-flow :step="step" :flowItems="flowItems"></apply-flow>
        </div><!-- 认证流程容器 -->

        <div class="m-apply-wrap">
            <div class="m-apply-con v1" v-show="step===1">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                      <el-form-item label="审批人">
                        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                      </el-form-item>
                      <el-form-item label="活动区域">
                        <el-select v-model="formInline.region" placeholder="活动区域">
                          <el-option label="区域一" value="shanghai"></el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                      </el-form-item><el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                      </el-form-item>
                    </el-form>

                <!-- <div class="apply-form">
                    <el-form ref="apply-form" :model="formA" :rules="formARules" label-width="120px">
                        <el-form-item label="车行名称" prop="name">
                            <el-input v-model="formA.name"  placeholder="请填写车行名称"></el-input>
                        </el-form-item>
                        <el-form-item label="车行地址">
                            <el-input v-model="formA.address"  placeholder="请填写车行地址"></el-input>
                        </el-form-item>
                        <el-form-item label="车行类型">
                            <el-select v-model="formA.authType" placeholder="请选择车行类型">
                                <el-option label="企业车行" value="企业车行"></el-option>
                                <el-option label="个人车行" value="个人车行"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="车行介绍">
                            <el-input type="textarea" v-model="formA.description" placeholder="请简单介绍一下您的车行吧！"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">下一步</el-button>
                        </el-form-item>
                    </el-form>
                </div> -->
            </div>
            <div class="m-apply-con v2" v-show="step===2">
                
            </div>
            <div class="m-apply-con v3" v-show="step===3">
                
            </div>
            <div class="m-apply-con v4" v-show="step===4">
                
            </div>
        </div>

	</div>
</template>

<script>
    
    import MHead from "components/base/memberHd.vue"
    import applyFlow from "./apply_flow.vue"
    import {applyFlowItems as flowItems} from "api/localJson/flowData.js"


	export default {
        name: "myApply",
        // 数据
        data() {
            return{
                flowItems: flowItems,
                step: 1,
                //第一步
                /*formA: {
                    name: '',          // 车行姓名
                    address: '',       // 江西/南昌
                    addressDes: '',    // 详细地址     
                    authType: '',      // 车行认证 类型
                    description: '',   // 企业描述
                },
                formARules:{
                    name: [
                        { required: true, message: '请输入车行姓名', trigger: 'blur' },
                        { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                    ],
                }*/
                formInline: {
                  user: '',
                  region: ''
                }
            }
        },
        // 自定义函数(方法)
        methods: {
            //提交
            onSubmit() {
                console.log('submit!');
            },
        },
        // 在当前模块注册组件
        components:{
            MHead,
            applyFlow,
        },
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import './apply.styl'
</style>
