<template>
    <div class="applyHome">
        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="我的认证"
            >
            <div slot="content">
                
                <member-inner>
                    <div class="m-apply-wrap">
                        <!-- <p>是否已开始认证: {{isApplyStart}}</p>
                        <p>认证id: {{authId}}</p>
                        <p>认证类型: {{authApply}}</p>
                        <p>认证状态: {{authStatus}}</p>
                        <p>至少认证成功一条: {{hasApplySuccess}}</p>
                        <p>认证记录数: {{hasApplyCount}}</p> -->
                        <div class="m-mn not"
                            v-if="!hasApplySuccess"
                            >
                            <div class="u-tit">{{box1Info.title}}</div><!-- 标题 -->
                            <div class="u-speak">{{box1Info.desc}}</div><!-- 说些什么 -->
                            <a class="u-btn open-up"
                                @click="enterApply()">{{btnText}}</a>
                            <router-link class="u-btn download"
                                :to="{path:'/download'}"
                                >
                            </router-link><!-- 下载APP -->
                        </div><!-- 认证内容（未通过认证） -->
                        <div class="m-mn success"
                            v-if="hasApplySuccess"
                            >
                            <div class="u-tit">{{box2Info.title}}</div><!-- 标题 -->
                            <div class="u-speak">{{box2Info.desc}}</div><!-- 说些什么 -->
                            <router-link class="u-btn download"
                                :to="{path:'/download'}"
                                >
                            </router-link><!-- 下载APP -->
                        </div><!-- 认证内容（认证成功） -->
                        <div class="m-other" v-if="isShowMerchant">
                            <div class="u-info">
                                <div class="u-tit">认证资料更新上传</div><!-- 标题 -->
                                <div class="u-speak">营业执照补交</div><!-- 说些什么 -->
                            </div><!-- 信息区 -->
                            <router-link class="u-btn replenish"
                                :to="{path:'/member/merchantApply'}"
                                >立即上传
                            </router-link>
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
                authId: "",                   // 认证ID
                authApply: "",                // 认证身份
                authStatus: "",               // 认证状态
                hasApplySuccess: false,       // 有认证成功的类型
                hasApplyCount: 0,             // 有几条认证记录，通常最多只有两条，个人认证及企业认证
                isShowMerchant: false,        // 是否显示营业执照补交
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

        },
        // 属性值计算
        computed:{
            // vuex 状态字段
            ...mapGetters(['loginStatus']),
            // 开通认证按钮的显示文本
            btnText(){
                let txt = "";
                if(this.authApply=="") return "点击此处开通认证";

                if(!this.authApply==""){
                    if(this.authApply=="个人车行"){
                        switch(this.authStatus){
                            case 0:
                                return txt = "查看认证进度";
                                break;
                            case -1:
                                return txt = "重新开通认证";
                                break;
                        }
                        return txt;
                    }
                }
            },

            // 开通认证的信息
            box1Info(){
                let obj = {}
                if(this.hasApplyCount==0){
                    return {
                        title: "您尚未认证",
                        desc: "未认证，无法在b2b交易",
                    }
                }
                if(this.hasApplyCount==1){
                    switch(this.authStatus){
                        case 0:
                            return obj = {
                                title: this.authApply+"认证中",
                                desc: "认证中，请耐心等待审核",
                            };
                            break;
                        case -1:
                            return obj = {
                                title: this.authApply+"认证失败",
                                desc: "认证失败，请重新认证",
                            };
                            break;
                    }
                }

            },

            // 认证成功的信息
            box2Info(){
                if(this.hasApplySuccess&&this.hasApplyCount==2&&this.authStatus==1){
                    return {
                        title: "恭喜您，企业车行认证已成功！",
                        desc: "认证类型：企业认证",
                    }
                }
                if(this.hasApplySuccess&&this.authStatus!=1){
                    return {
                        title: "恭喜您，个人车行认证已成功！",
                        desc: "认证类型：个人认证",
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
                        // 获取是否显示补交营业执照的DOM
                        this.getIsShowMerchant();
                        console.log("我的个人信息",dataToJson(this.memberData))
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

                // 当只有一条认证信息时，就只返回这一条信息的值
                if(arr.length==1){
                    this.authId = arr[0].AuthInfo.AuthId;            // 认证ID
                    this.authApply = arr[0].AuthInfo.AuthType;       // 认证类型  企业车行、个人车行
                    this.authStatus = arr[0].AuthInfo.AuthStatus;    // 认证状态, 0待处理，1成功，-1失败
                    this.hasApplyCount = 1;
                    // 有认证成功，不管是车行还是个人认证
                    if(this.authStatus==1){
                        this.hasApplySuccess = true;
                    }
                    return;
                }

                // 当有两条时，只读取企业认证的信息
                if(arr.length==2){
                    this.hasApplyCount = 2;
                    arr.forEach((item,index)=>{
                        // 有认证成功，不管是车行还是个人认证
                        if(arr[index].AuthInfo.AuthStatus==1){
                            this.hasApplySuccess = true;
                        }
                        if(arr[index].AuthInfo.AuthType=='企业车行'){
                            this.authId = arr[index].AuthInfo.AuthId;            // 认证ID
                            this.authApply = arr[index].AuthInfo.AuthType;       // 认证类型  企业车行、个人车行
                            this.authStatus = arr[index].AuthInfo.AuthStatus;    // 认证状态, 0待处理，1成功，-1失败
                        }
                    })
                    return;
                }
            },

            // 获取是否显示补交营业执照的DOM
            getIsShowMerchant(){
                let res = this.hasApplySuccess&&
                            this.hasApplyCount==2&&
                            this.authStatus==1;
                this.isShowMerchant = !res;
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
                this.memberData= {};
                this.isApplyStart= false;
                this.authId= "";
                this.authApply= "";
                this.authStatus= "";
                this.hasApplySuccess= false;
                this.hasApplyCount= 0;
                this.isShowMerchant= false;
            },
        },
        
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'


</style>
