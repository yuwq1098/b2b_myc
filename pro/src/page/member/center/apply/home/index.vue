<template>
    <div class="applyHome">
        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="我的认证"
            >
            <div slot="content">
                
                <member-inner>
                    <div class="m-apply-wrap">
                        <!-- <p>是否已开始认证：{{isApplyStart}}</p>
                        <p>按钮文本：{{btnText}}</p>
                        <p>第一个盒子信息：{{box1Info}}</p>
                        <p>第二个盒子信息：{{box2Info}}</p> -->
                        <div class="m-mn not"
                            v-if="memberData.authStatus!=1"
                            >
                            <div class="u-tit">{{box1Info.title}}</div><!-- 标题 -->
                            <div class="u-speak">{{box1Info.desc}}</div><!-- 说些什么 -->
                            <a class="u-btn open-up"
                                @click="enterApply()">{{btnText}}
                            </a>
                            <router-link class="u-btn download"
                                :to="{path:'/download'}"
                                >
                            </router-link><!-- 下载APP -->
                        </div><!-- 认证内容（未通过认证） -->
                        <div class="m-mn success"
                            v-if="memberData.authStatus==1"
                            >
                            <div class="u-tit">{{box2Info.title}}</div><!-- 标题 -->
                            <div class="u-speak">{{box2Info.desc}}</div><!-- 说些什么 -->
                            <router-link class="u-btn download"
                                :to="{path:'/download'}"
                                >
                            </router-link><!-- 下载APP -->
                        </div><!-- 认证内容（认证成功） -->
                        <div class="m-other" v-if="memberData.curApplyType=='个人车行'">
                            <div class="u-info">
                                <div class="u-tit">认证资料更新上传</div><!-- 标题 -->
                                <div class="u-speak">营业执照补交</div><!-- 说些什么 -->
                            </div><!-- 信息区 -->
                            <router-link class="u-btn replenish"
                                :to="{path:'/member/merchantApply',query:{authId:memberData.curApplyId}}"
                                >立即上传
                            </router-link>
                        </div><!-- 认证资料补充 -->
                        
                        <div class="m-other" v-if="memberData.curApplyType=='企业车行'&&memberData.authStatus==1">
                            <div class="u-info">
                                <div class="u-tit">成功认证企业车行</div><!-- 标题 -->
                                <div class="u-speak">前往查看认证信息</div><!-- 说些什么 -->
                            </div><!-- 信息区 -->
                            <a class="u-btn replenish"
                                @click="enterApply()">查看信息
                            </a>
                        </div><!-- 认证资料补充 -->

                    </div><!-- 认证容器 -->
                </member-inner>

            </div><!-- 我的认证主页页面内容 -->
        </member-layout>
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
    // vuex状态管理
    import {mapGetters} from 'vuex'
    // 用户信息的构造类
    import {memberInfo} from 'base/class/member.js'

    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue' 
    // 会员中心子内容组件
    import memberInner from 'components/layout/memberInner.vue'


    export default {
        
        name: "applyHome",
        // 在当前模块注册组件
        components:{
            memberLayout,
            memberInner,
        },
        // 数据
        data() {
            return{
                memberData: {},               // 用户信息
                isApplyStart: false,          // 是否开始认证
            }
        },
        //生命周期,开始的时候
        created(){
            
        },
        mounted(){

        },
        activated(){
            // 获取用户信息
            this.getMemberInfo();
        },
        // 退出的生命周期钩子
        deactivated(){
            this.$destroy();
        },
        // 属性值计算
        computed:{
            // vuex 状态字段
            ...mapGetters(['loginStatus']),

            // 开通认证按钮的显示文本
            btnText(){
                let txt = "";
                if(this.isApplyStart==false) return "点击此处开通认证";
                switch(this.memberData.authStatus){
                    case 0:
                        return "查看认证进度"
                        break;
                    case -1:
                        return "查看失败原因"
                        break;
                }
            },

            // 开通认证的信息
            box1Info(){
                let obj = {}
                if(!this.isApplyStart){
                    return {
                        title: "您尚未认证",
                        desc: "未认证，无法在b2b交易",
                    }
                }
                let theApplyType = "";
                if(this.memberData.curApplyType=="个人车行"){
                    theApplyType = "个人车商"
                }else if(this.memberData.curApplyType=="企业车行"){
                    theApplyType = "企业车商"
                }
                switch(this.memberData.authStatus){
                    case 0:
                        return obj = {
                            title: theApplyType+"认证中",
                            desc: "认证中，请耐心等待审核",
                        };
                        break;
                    case -1:
                        return obj = {
                            title: theApplyType+"认证失败",
                            desc: "认证失败，请重新认证",
                        };
                        break;
                }
            },

            // 认证成功的信息
            box2Info(){
                let theApplyType = "";
                if(this.memberData.curApplyType=="个人车行"){
                    theApplyType = "个人车商"
                }else if(this.memberData.curApplyType=="企业车行"){
                    theApplyType = "企业车商"
                }
                if(this.memberData.authStatus==1){
                    return {
                        title: "恭喜您，"+theApplyType+"认证已成功！",
                        desc: "认证类型："+theApplyType,
                    }
                }
            },

        },
        // 数据侦听
        watch:{
            // 退出登录时，清除数据
            loginStatus(val){
                if(!val){
                    // 数据重置
                    this.reset();
                }
            },
        },
        // 自定义函数(方法)
        methods: {
            // 格式化用户信息
            _normalizeMember(data) {
                return new memberInfo(data);
            },
            // 获取用户信息
            getMemberInfo(){
                let data = {}
                api.getMyMemberInfo(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        // 格式化用户信息
                        this.memberData = this._normalizeMember(res.data);
                        // 设置认证信息
                        this.setAuthData(this.memberData.cdgAuth);

                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '信息获取失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                })   
            },
            // 设置认证信息
            setAuthData(arr){
                // 当不存在认证信息时
                if(arr.length==0) return;
                
                // 当存在信息时，告诉视图，已经开始认证（结果就是通过，不通过）
                this.isApplyStart = true;

            },

            // 进入认证，查看认证等
            enterApply(){
                setTimeout(() => {
                    if(!this.authId==""){
                        this.$router.push({
                            path:'/member/putApply',
                            query:{authId:this.authId}
                        });
                    }else{
                        this.$router.push({path:'/member/putApply'});
                    }
                });
            }, 
            
            // 数据重置
            reset(){
                this.memberData = {};                 // 用户信息
                this.isApplyStart = false;            // 是否开始认证
            },
        },
        
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'

</style>
