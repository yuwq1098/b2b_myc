<template>
	<div class="personalSetting">

        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="个人资料设置"
            >
            <div slot="content">
                <member-inner>
                    <div class="m-personal-wrap">
                        <div class="m-personal-box info" v-show="isInfoShow">
                            <div class="m-hd">
                                <a href="javascript:;" class="u-edit" @click="goEdit()" title="编辑个人信息">
                                    <i class="iconfont icon-bianji1"></i>编辑
                                </a>
                                <div class="m-face">
                                    <img :src="memberData.imgUrl" />
                                </div><!--用户头像展示 -->
                            </div>
                            <div class="m-info">
                                <div class="m-line-box f__clearfix">
                                    <span class="u-attr">昵称：</span>
                                    <div class="u-data">
                                        <span class="data">{{memberData.name}}</span>
                                    </div>
                                </div>
                                <div class="m-line-box f__clearfix">
                                    <span class="u-attr">真实姓名：</span>
                                    <div class="u-data">
                                        <span class="data">
                                            <template v-if="memberData&&memberData.authName=='未实名认证'"
                                                >{{memberData.authName}}</template>
                                            <template v-else
                                                >{{memberData.authName | usernameFormat}}</template>
                                        </span>
                                        <router-link :to="{path:'/member/applyHome'}" 
                                            class="u-lk operate"
                                            tag="a"
                                            >
                                            <template
                                                v-if="memberData&&(memberData.authName=='未实名认证'&&memberData.hasApplyCount==0)"
                                                >立即认证
                                            </template>
                                            <template
                                                v-else
                                                >管理我的认证
                                            </template>
                                        </router-link>
                                    </div>
                                </div>
                                <div class="m-line-box f__clearfix">
                                    <span class="u-attr">绑定手机号：</span>
                                    <div class="u-data">
                                        <span class="data">{{memberData.tel | telFormat}}</span>
                                        <router-link :to="{path:'/member/safetyTel'}" 
                                            class="u-lk operate"
                                            tag="a"
                                            >更换绑定</router-link>
                                    </div>
                                </div>
                                <div class="m-line-box f__clearfix">
                                    <span class="u-attr">性别：</span>
                                    <div class="u-data">{{memberData.sex}}</div>
                                </div>
                            </div><!-- 用户信息展示 -->
                        </div>
                        <div class="m-personal-box edit" v-show="!isInfoShow">
                            <!-- 文件上传 -->
                            <input 
                                v-show="false" 
                                @change="uploadInputChange" 
                                type="file" 
                                ref="uploadInputFile" 
                                accept="image/png,image/jpeg,image/jpg"
                                /><!-- 真实的文件上传按钮 -->

                            <avatar-clip
                                v-if="isShowAvatarClip"
                                :clipImage="avatarClipImg"
                                @closeClip="closeClip"
                                @uploadAvatarSuccess="clipImageSuccess">
                            </avatar-clip><!-- 图片上传组件 -->

                            <div class="m-hd">
                                <div class="m-face">
                                    <img :src="faceImg" />
                                    <a class="u-mask" @click="onTriggerUpload" >
                                        <i class="iconfont icon-xj"></i>
                                    </a><!-- 头像蒙层 -->
                                </div><!--用户头像展示 -->
                                <span class="u-tips" v-if="uploadTips">{{uploadTips}}</span>
                            </div>
                            <div class="m-info">
                                <div class="m-line-box f__clearfix input">
                                    <span class="u-attr">昵称：</span>
                                    <div class="u-con">
                                        <input type="text" class="u-ipt" placeholder="请输入您的昵称" v-model="nickname" />
                                    </div>
                                    <p class="nickname-error" v-if="errors.has('nickname')">
                                        <i class="iconfont icon-jinggao1"></i>{{errors.first('nickname')}}
                                    </p><!-- 错误 -->
                                </div>
                                <div class="m-line-box f__clearfix">
                                    <span class="u-attr">性别：</span>
                                    <div class="u-con">
                                        <el-radio class="radio" v-model="sex" label="男">男</el-radio>
                                        <el-radio class="radio" v-model="sex" label="女">女</el-radio>
                                    </div>
                                </div>
                                <div class="m-line-error" v-if="errorText">
                                    <p class="error-txt">
                                        <i class="iconfont icon-jinggao1"></i>{{errorText}}</p>
                                </div><!-- 报错 -->
                                <div class="m-btn-box f__clearfix">
                                    <a href="javascript:;"
                                        @click="onSubmit()" class="u-btn commit"
                                        >保存
                                    </a>
                                    <a href="javascript:;" 
                                        @click="goBack()" class="u-lk back"
                                        >返回
                                    </a>
                                </div><!-- 按钮框 -->
                            </div><!-- 用户信息展示 -->
                        </div>
                    </div><!-- 个人资料 -->
                </member-inner>
            </div><!-- 个人资料设置内容 -->
        </member-layout>

	</div>
</template>

<script>

    // 获取数据的api
    import api from 'api/getData.js'
    // 引入系统变量
    import * as SYSTEM from 'api/system.js'
    // vuex状态管理
    import {mapActions} from 'vuex'
    // 工具类
    import {dataToJson} from "assets/js/util.js"
    // dom操作类
    import * as geekDom from 'assets/js/dom.js'
    // 用户信息的构造类
    import {memberInfo} from 'base/class/member.js'

    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue'
    // 会员中心子内容组件
    import memberInner from 'components/layout/memberInner.vue'
    // vue头像剪裁组件
    import avatarClip from 'components/common/avatarClip.vue'

    //引入表单验证
    import { Validator } from 'vee-validate';

	export default {
        name: "personalSetting",
        // 自定义表单验证
        validator: null,
        // 在当前模块注册组件
        components:{
            memberLayout,
            memberInner,
            avatarClip,
        },
        // 数据
        data() {
            return{
                // 控制展示页和编辑页的显隐
                isInfoShow: true,
                memberData: {},

                // 表单验证报错集合
                errors: null,

                // 头像图片
                faceImg: "",
                // 编辑时双向绑定的昵称
                nickname: "",
                sex: "",
                // 上传的文件信息
                imgFileId: "",        // 上传图片的id
                myFile: {},
                newFileBase64: "",    // 新文件的Base64位图片
                uploadTips: "",       // 图片上传提示
                errorText: "",        // 总错误提示
                // 显示头像裁切
                isShowAvatarClip: false,
                avatarClipImg: "",

            }
        },
        //生命周期,开始的时候
        created(){
            this.validator = new Validator({
                nickname: 'required|min:2|max:12',
            });
            this.$set(this, 'errors', this.validator.errors);
        },
        mounted(){

        },
        activated(){
            // 获取用户信息
            this.getMemberInfo();
        },
        //退出的生命周期钩子
        deactivated(){
            this.isInfoShow = true;
        },
        // 属性值计算
        computed:{

        },
        // 数据侦听
        watch:{
            imgFileId(val){
                this.errorText = "";
            },
            nickname(val){
                this.validator.validate('nickname',val);
                this.errorText = "";
            },
            sex(val){
                this.errorText = "";
            },
        },
        // 自定义函数(方法)
        methods: {
            ...mapActions(['getUserData','setSignOut']),
            // 获取用户信息
            getMemberInfo(){
                let data = {}
                api.getMyMemberInfo(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.memberData = new memberInfo(res.data);
                        // 为编辑页的信息赋值
                        this.setEditInfo();
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

            // 为编辑页的信息赋值
            setEditInfo(){
                this.faceImg = this.memberData.imgUrl;
                this.nickname = this.memberData.name;
                this.sex = this.memberData.sex;
            },
            
            // 触发图片文件选择
            onTriggerUpload(){
                var uploadInputFile = this.$refs.uploadInputFile;
                uploadInputFile.click();
            },
            
            // 头像文件的值发生变化
            uploadInputChange(){
                let that = this;
                var photoFile = this.$refs.uploadInputFile.files;
                if(photoFile.length<=0) return;
                this._getBase64Img(photoFile,function(myFile,base64Img){
                    that.isShowAvatarClip = true;
                    that.avatarClipImg = base64Img;
                });
            },

            // 获取Base64位的图片
            _getBase64Img(files,callBack){
                let myFile = files[0];
                geekDom.getBase64FromImgFile(myFile,function(base64Img){
                    if(callBack){
                        callBack(myFile,base64Img);
                    }
                })
            },

            // 图片上传成功
            clipImageSuccess(base64str,fileId){
                this.imgFileId = fileId;
                this.faceImg = base64str;
                this.closeClip();
            },

            // 关闭图像裁切组件
            closeClip(){
                this.isShowAvatarClip = false;
            },

            // 操作上传文件
            operateUploadFile(photoFile){
                this._getBase64Img(photoFile,function(myFile,base64Img){
                    me.myFile = Object.assign(myFile,{
                        base64Img: base64Img
                    });
                    me._compressBase64Image(base64Img,function(base64str){
                        me.newFileBase64 = base64str;
                        me.faceImg = base64str;
                        me.uploadTips = "图片正在上传...";
                        me.fileUpload(me.myFile.name,base64str);
                    })
                })
            },

            //图片上传
            fileUpload(name,base64str){
                let me = this;
                let data = {
                    title: name,
                    dataUrl: base64str,
                }

                api.uploadPublicFileBatch(data).then(res=>{
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.imgFileId = res.data.FileId;
                        this.uploadTips = "图片上传成功";
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '上传失败',
                            message: res.msg,
                            type: 'error',
                            duration: 2000,
                        });
                    }
                })
            },

            // 前往编辑
            goEdit(){
                this.isInfoShow = false;
                this.errors.clear();
            },
            // 提交修改
            onSubmit(){

                let data = {}
                if(this.nickname==this.memberData.name&&
                    this.sex==this.memberData.sex&&
                    !this.imgFileId)
                {
                    this.errorText = "您尚未修改任何信息";
                    return;
                }else{
                    if(this.nickname!=this.memberData.name){
                        data.NickName = this.nickname;
                    }else if(this.sex != this.memberData.sex){
                        data.Sex = this.sex;
                    }else if(this.imgFileId){
                        data.PhotoURL = this.imgFileId;
                    }
                }

                // 当用户输入昵称时做字段验证
                if(this.nickname!=this.memberData.name){
                    this.validator.validateAll({
                        nickname: this.nickname,
                    }).then((res) => {
                         
                        // 验证成功
                        if(res) {
                            this.putCommit(data);
                        };
                        
                    }).catch(error => {
                        console.log(error);
                    });
                }else{
                    this.putCommit(data);
                }
            },

            // 提交操作（与后台交互）
            putCommit(data){
                api.editMemberInfo(data).then(res=>{
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.goBack();
                        // 获取用户信息
                        this.getMemberInfo();
                        // 更新用户基本数据
                        this._updateUserData();
                        this.$notify({
                            title: '个人信息修改成功',
                            message: res.msg,
                            type: 'success',
                            duration: 1500,
                        });
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '修改失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                }) 
            },

            //获取/更新用户基本数据
            _updateUserData(){
                let data = {
                    a:'0'
                };
                let me = this;
                this.getUserData({
                    data:data,
                    callBack: function(code){
                        if(code==SYSTEM.CODE_IS_OUT){
                            me._signPast();
                        }
                    }
                });
            },
            
            // 身份过期
            _signPast(){
                this.$notify({
                    title: '身份过期',
                    message: '身份过期，请重新登录',
                    type: 'error',
                    duration: 3000,
                });
                this.$router.push({ path: '/'})
                //调用vuex的注销方法
                this.setSignOut();
                this.errors.clear();
            },

            // 返回
            goBack(){
                // 为编辑页的信息赋值
                this.setEditInfo();
                this.isInfoShow = true;
            },
        },
        
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import '~assets/css/mixin.styl'
    .m-personal-box
        .el-radio__label 
            font-size 14px
            color #959595
            padding-left 10px
            cursor pointer
        .el-radio__input
            _display(inline-block)
            _translate3d(0,-1px)
        .el-radio__input.is-checked .el-radio__inner
            border-color #1e8bd8 + 10%
            background #1e8bd8 + 10%
        .el-radio__inner:hover
            border-color #1e8bd8

</style>


<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'

</style>
