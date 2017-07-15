<!--  
 **  证件上传组件
 --> 

<template>
    <div class="voucherUpload">
       <div class="m-upload-wrap">
            <input 
                v-show="false" 
                @change="uploadInputChange" 
                type="file" 
                ref="uploadInputFile" 
                accept="image/png,image/jpeg,image/jpg"
                /><!-- 真实的文件上传按钮 -->

            <div class="not"
                @click="onTriggerUpload()"
                v-show="!fileImg">
                <div class="u-icon">
                    <i class="iconfont icon-tianjia5"></i>
                </div>
                <p class="txt">{{tips}}</p>
            </div>

            <div class="u-pic" v-show="fileImg">
                <img class="fileImg" :src="fileImg" :title="tips"/>
                <template v-show="!isLoading">
                    <div class="u-oper">
                        <div class="oper-inner">
                            <a href="javascript:;" 
                                @click="picturePreview(fileImg)" 
                                class="u-lk" title="查看大图">
                                <i class="iconfont icon-iossearchstrong"></i>
                            </a>
                            <a href="javascript:;" class="u-lk"
                                @click="onTriggerUpload()" 
                                title="更换图片">
                                <i class="iconfont icon-zhongxinshangchuan"></i>
                            </a>
                        </div>
                    </div>
                </template>
                <div class="u-loading" v-show="isLoading">
                    <div class="icon">
                        <i class="iconfont icon-jiazai"></i>
                    </div>
                    <p class="txt">正在上传，请稍后</p>
                </div>
            </div>

            <el-dialog v-model="dialogVisible" size="small">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog><!-- 显示大图（对话框）组件 -->

       </div><!-- 文件上传容器 -->
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

    export default {
        name: "voucherUpload",
        // 数据
        data() {
            return{
                
                // 所选的图片
                fileImg: "",
                // 上传的文件信息
                imgFileId: "",        // 上传图片的id
                myFile: {},

                // 是否显示load
                isLoading: false,
                // 是否上传失败
                isUploadFailure: false,

                // 图片放大对话框
                dialogImageUrl: '',
                dialogVisible: false
            }
        },
        props:{
            // 上传提示
            tips: {
                type: String,
                default: "上传文件"
            },
        },
        //生命周期,开始的时候
        created(){
            
        },
        mounted(){

        },
        activated(){

        },
        // 退出的生命周期钩子
        deactivated(){

        },
        // 属性值计算
        computed:{

        },
        // 数据侦听
        watch:{

        },
        // 自定义函数(方法)
        methods: {
            // 触发图片文件选择
            onTriggerUpload(){
                var uploadInputFile = this.$refs.uploadInputFile;
                uploadInputFile.click();
            },

            // 图片文件更新
            uploadInputChange(){
                let me = this;
                var photoFile = this.$refs.uploadInputFile.files;
                if(photoFile.length<=0) return;
                this._getBase64Img(photoFile,function(myFile,base64Img){
                    me.myFile = Object.assign(myFile,{
                        base64Img: base64Img
                    });
                    me._compressBase64Image(base64Img,function(base64str){
                        me.fileImg = base64str;
                        me.isLoading = true;
                        me.fileUpload(me.myFile.name,base64str);
                    })
                })
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

            // 压缩图片
            _compressBase64Image(base64Img,callBack){
                 
                let me = this;
                //    用于压缩图片的canvas
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext('2d');
                //    瓦片canvas
                var tCanvas = document.createElement("canvas");
                var tctx = tCanvas.getContext("2d");
                

                var img = new Image();
                img.src = base64Img;
                if (img.complete) {
                    myCallback();
                } else {
                    img.onload = myCallback;
                }

                function myCallback() {
                    var initSize = img.src.length;
                    var width = img.width;
                    var height = img.height;
                    var scale = 1;
                    var fixedPixel = 200;

                    //调整的被裁切图片的信息
                    var _resize_info={  
                        w:0,  
                        h:0,
                        l:0,
                        r:0,
                    };

                    // 期望获取裁剪后图片的信息
                    var get_info = {
                        w: 640,
                        h: 480,
                    }
                    
                    // 保证图片比例
                    if(width>height){
                        _resize_info.h = height;
                        _resize_info.w = height;
                    }else{
                        _resize_info.w = width;
                        _resize_info.h = width;
                    }

                    img.width = get_info.w;
                    img.height = get_info.h;

                    
                    // 使用canvas裁剪图片
                    geekDom.drawToCanvas(
                        img,
                        get_info.w,
                        get_info.h,
                        _resize_info.w,
                        _resize_info.h,
                        function(base64str){
                            if(callBack){  
                                callBack(base64str);  
                            }  
                        }
                    )
                }
            },

            //图片上传
            fileUpload(name,base64str){
                let me = this;
                let data = {
                    title: name,
                    dataUrl: base64str,
                }
                // 上传至隐私类图片
                api.uploadPrivateFileBase64(data).then(res=>{
                    this.isLoading = false;
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.imgFileId = res.data.imgId;
                        this.$emit('changeFiles',this.imgFileId);
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

            // 放大查看对应图片
            picturePreview(base64Img) {
                this.dialogImageUrl = base64Img;
                this.dialogVisible = true;
            },
            
            // 重置数据
            reset(){
              
            }
        },
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'

    /*
     * Animation
     */
    @-webkit-keyframes ball-clip-rotate {
        0% {
            -webkit-transform: rotate(0deg);
                    transform: rotate(0deg);
        }
        50% {
            -webkit-transform: rotate(180deg);
                    transform: rotate(180deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
                    transform: rotate(360deg);
        }
    }
    @-moz-keyframes ball-clip-rotate {
        0% {
            -moz-transform: rotate(0deg);
                 transform: rotate(0deg);
        }
        50% {
            -moz-transform: rotate(180deg);
                 transform: rotate(180deg);
        }
        100% {
            -moz-transform: rotate(360deg);
                 transform: rotate(360deg);
        }
    }
    @-o-keyframes ball-clip-rotate {
        0% {
            -o-transform: rotate(0deg);
               transform: rotate(0deg);
        }
        50% {
            -o-transform: rotate(180deg);
               transform: rotate(180deg);
        }
        100% {
            -o-transform: rotate(360deg);
               transform: rotate(360deg);
        }
    }
    @keyframes ball-clip-rotate {
        0% {
            -webkit-transform: rotate(0deg);
               -moz-transform: rotate(0deg);
                 -o-transform: rotate(0deg);
                    transform: rotate(0deg);
        }
        50% {
            -webkit-transform: rotate(180deg);
               -moz-transform: rotate(180deg);
                 -o-transform: rotate(180deg);
                    transform: rotate(180deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
               -moz-transform: rotate(360deg);
                 -o-transform: rotate(360deg);
                    transform: rotate(360deg);
        }
    }

    .u-upload
        width 200px - 4px
        height 150px - 4px
        position relative
        .not
            width @width - 16px
            height @height - 16px
            _completeCenter()
            cursor pointer
            & *
                cursor @cursor
            .u-icon
                width 72px
                text-align center
                height 72px
                line-height 72px
                _completeCenter(,,15px,auto)
                .iconfont
                    font-size 48px
                    color #c2c2c2
            .txt
                font-size 13px
                text-align center
                height 24px
                line-height 24px
                color #c2c2c2
                _spacingPlus()
                margin 84px 0 0
        .u-pic
            width @width
            height @height
            .fileImg
                width @width - 16px
                height @height - 16px
                _completeCenter()
            .u-oper
                _display(none)
                width @width - 16px
                height @height - 16px
                color #f4f4f4
                text-align center
                _completeCenter()
                background rgba(4,121,204,0.55);
                .oper-inner
                    width @width
                    height @height
                    line-height @height
                    _completeCenter()
                    .u-lk
                        color #f4f4f4
                        .iconfont
                            font-size 24px
                            margin 0 5px
            &:hover
                .u-pic,.u-pic img
                    cursor pointer
                .u-oper
                    _display()
            .u-loading
                _display()
                width @width - 16px
                height @height - 16px
                z-index 9
                background rgba(0,0,0,.55)
                _completeCenter()
                .icon
                    width 42px
                    text-align center
                    height 42px
                    line-height 42px
                    _completeCenter(,,30px,auto)
                    _animationSingle(ball-clip-rotate,1.25s)
                    _transformOrigin(50%,48%)
                    .iconfont
                        font-size 32px
                        color #e2e2e2
                .txt
                    width @width - 20px
                    margin 72px 10px 0
                    text-align center
                    height 24px
                    line-height 24px
                    font-size 13px
                    color #e2e2e2
                    _spacingPlus()

</style>
