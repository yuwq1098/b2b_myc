<!--  
 **  @description 图片文件上传（汽辆图片上传）
 --> 

<template>
    <div class="photoUpload">
        <div class="m-upload-wrap">

            <!-- 文件上传(button区域)组件 -->
            <upload-input
                btnText="上传车辆图片"
                uploadTip="按住Ctrl键可批量上传，图片比例为4:3，支持jpg/gif/png格式，每张最大2M，请最少上传6张。遵循下图从各个角度拍摄照片可以使咨询量提升80%哦！"
                :files="photoFiles"
                @uploadChange="photoFilesChange"
                :maxUploadSize='15'
                >
            </upload-input>

            <div class="m-file-box">
                <div class="m-file-example" v-show="newFiles.length==0">
                    <ul class="m-pic-lst f__clearfix">
                        <template v-for="item in photoExamples">
                            <li class="u-item">
                                <div class="u-pic">
                                    <img :src="item.imgUrl" :alt="'上传图片示例-'+item.title"/>
                                </div>
                                <p class="u-info">
                                    <span>示例</span>
                                    <i>·</i>
                                    <span>{{item.title}}</span>
                                </p>
                            </li>    
                        </template>
                    </ul>
                </div><!-- 文件上传例子(当没有上传文件，文件列表为空时显示) -->

                <div class="m-files-gp" v-show="newFiles.length>0">
                    <transition-group 
                        name="img-list" 
                        class="m-pic-lst f__clearfix"
                        id="js__photo_files" tag="ul"
                        >
                        <template v-for="(item,index) in newFiles">
                            <li class="u-item" :key="index">
                                <div class="u-pic">
                                    <img :src="item.base64Img" @load="fileUpload(index,item.name,item.base64Img)" alt="上传的图片名"/>
                                </div>
                                <div class="u-progress-bar">
                                    <div class="progress-inner"></div>
                                </div><!-- 进度条 -->
                                <div class="u-oper">
                                    <div class="oper-inner">
                                        <a href="javascript:;" 
                                            @click="picturePreview(item.base64Img)" 
                                            class="u-lk" title="查看大图">
                                            <i class="iconfont icon-iossearchstrong"></i>
                                        </a>
                                        <a href="javascript:;" class="u-lk"
                                            @click="removePictureFile(index)" 
                                            title="删除此图">
                                            <i class="iconfont icon-empty"></i>
                                        </a>
                                    </div>
                                </div><!-- 操作 -->
                                <div class="u-loading">
                                    正在上传
                                </div>
                            </li>
                        </template>
                    </transition-group>
                </div>
            </div><!-- 显示文件区 -->

            <img id="waterMark" 
                ref="waterMark"
                :src="watermarkImg" 
                alt="木有车车辆图片水印" v-show="false" /><!-- 水印 -->

            <el-dialog v-model="dialogVisible" size="small">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog><!-- 显示大图（对话框）组件 -->
        </div>
    </div>
</template>

<script>
    
    // 加载jq
    import $ from "jquery"
    // 获取api
    import api from 'api/getData.js'
    // 本地数据 发布车辆图片上传示例
    import {photoExamples} from "api/localJson/sendCar.js"
    // dom操作类
    import * as geekDom from 'assets/js/dom.js'
    // 工具类
    import {joinUrl,dataToJson,strToJson} from 'assets/js/util.js'
    // 本地存储工具
    import {store} from 'assets/js/store.js'
    // md5加密
    import {md5} from 'assets/js/md5.js'
    // 文件上传(button区域)
    import uploadInput from "components/common/uploadInput.vue"

    // 单张图片1MB(大于30k就压缩,否则不做处理&&可直接上传)
    const MAX_FILE_SIZE_30KB = 30 * 1024;

    export default {
        name: "photoUpload",
        // 在当前模块注册组件
        components:{
            uploadInput:uploadInput,
        },
        // 数据
        data() {
            return{
                // 图片上传示例
                photoExamples: photoExamples,
                // 用户选择的图片文件集合
                photoFiles: [],
                newFiles: [],
                // 图片放大对话框
                dialogImageUrl: '',
                dialogVisible: false,
                // 木有车水印
                watermarkImg: require("assets/img/u-watermark-myc.png"),
            }
        },
        props:{
            // 最大上传数量
            maxUploadSize:{
                type: Number,
                default: 6,
            }
        },
        // 数据侦听
        watch:{

        },
        // 再次进入生命周期钩子(因为keep-alive的原因,created和mounted在页面切换过程中都是无效的)
        activated(){

        },
        // 计算
        computed:{

        },
        // 自定义函数(方法)
        methods: {
            // 用户选择图片（选择后的回调）
            photoFilesChange(files){
                let me = this;
                //当图片上传总数大于 约定的上传上限
                if(this.photoFiles.length + files.length > this.maxUploadSize){
                    this.$message.error('最多只能上传'+this.maxUploadSize+"张");
                    return;
                }
                //当 已选图像文件中的数量大于0
                if(this.photoFiles.length>0){
                    // 判断文件是否重复
                    var isRepeat = geekDom.isRepeatSelectionByFiles(files,this.photoFiles);
                    if(isRepeat){
                        this.$message.error('请不要选择相同的图片');
                        return;
                    }
                }

                // 对选择的图片进行处理
                this._setPhotoFiles(files,function(myFile,base64Img){
                    // 选择的图片文件大于30kb就进入压缩
                    if(base64Img.length>MAX_FILE_SIZE_30KB){
                        //调用压缩图片的方法
                        me._compressBase64Image(base64Img,function(base64str){
                            me.joinArrayFiles(myFile,base64str);
                        });

                    }else{
                        me.joinArrayFiles(myFile,base64Img);
                    }
                });
            },

            // 循环处理我们的图片
            _setPhotoFiles(files,callBack){  
                for (var key of Object.keys(files)) {
                    let myFile = files[key];
                    geekDom.getBase64FromImgFile(myFile,function(base64Img){
                        callBack&&callBack(myFile,base64Img);
                    })
                }
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

                // 获取水印的DOM
                var waterMarkDom = this.$refs.waterMark;

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

                    //调整的裁切信息
                    var _resize_info={  
                        w:0,  
                        h:0,
                        l:0,
                        r:0,
                    };

                    // 期望获取裁剪后图片的信息
                    var get_info = {
                        w: 640*2,
                        h: 480*2,
                    }

                    // 使用canvas裁剪图片
                    geekDom.drawToCanvasJoinWatermark(img,get_info.w,get_info.h,width,height,waterMarkDom,(base64str)=>{
                        callBack&&callBack(base64str);
                    })
                }
            },

            // 将图片置入相应的Array集合
            joinArrayFiles(myFile,base64Img,hasCompress){
                this.newFiles.push(Object.assign(myFile,{
                    base64Img: base64Img,
                    isLoad: true,
                }));
            },

            //图片上传
            fileUpload(index,name,base64str){
                let me = this;
                let data = {
                    title: name,
                    dataUrl: base64str,
                }
                var js__photo_files = $("#js__photo_files");
                var curLoadingDom = js__photo_files.find(".u-item").eq(index).find(".u-loading");

                api.uploadPublicFileBatch(data).then(res=>{
                    if(res.code==0){
                        curLoadingDom.remove();
                        me.newFiles[index].fileId = res.data.FileId;
                        //将新的用户选择的图片文件集合派发给父组件
                        me.changeFiles();
                    }else if(res.code==-4000){
                        console.log("身份过期");
                    }
                })
            },
            // 放大查看对应图片
            picturePreview(base64Img) {
                this.dialogImageUrl = base64Img;
                this.dialogVisible = true;
            },
            // 用户选择的图片文件集合派发给父组件
            changeFiles(){
                this.$emit('changeFiles',this.newFiles);
            },
            // 删除对应图片
            removePictureFile(index){
                this.photoFiles.splice(index, 1)
                this.newFiles.splice(index, 1);
                this.changeFiles();
            }

        },
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'
    //图片列表过渡效果
    .img-list-enter-active
        _transitionAll(.4s,,0.1s)
    .img-list-leave-active
        _transitionAll(.4s,cubic-bezier(0.22, 0.61, 0.21, 0.92))

    .img-list-enter
        _opacity(0)
        _translate3d(0,30px)
    .img-list-leave-active
        _opacity(0)
        _translate3d(0,-50px)

    .m-upload-wrap
        .m-file-box
            padding 10px 0 15px
            _border(bottom,#e2e2e2)
            margin-bottom 10px
            .m-file-example
                width 800px
                position relative
                .m-pic-lst
                    width 800px + 16px
                    margin-left -16px
                    .u-item
                        width 120px
                        margin-left 16px
                        height 120px
                        float left
                        .u-pic
                            width @width
                            height 90px
                            img
                                width @width
                                height @height
                        .u-info
                            text-align center
                            height 22px
                            line-height 22px
                            color #959595
                            font-size 12px
                            _spacingPlus()
                            margin 5px 0 3px
            .m-files-gp
                width 800px
                position relative
                .m-pic-lst
                    width 800px + 16px
                    margin-left -16px
                    .u-item
                        margin-left 16px
                        height 90px
                        float left
                        margin-bottom 8px
                        position relative
                        .u-pic
                            width auto
                            height 90px
                            img
                                width @width
                                height @height
                        .u-oper
                            _display(none)
                            width 100%
                            height 90px
                            line-height 90px
                            color #f4f4f4
                            text-align center
                            _completeCenter()
                            background rgba(4,121,204,0.55);
                            .u-lk
                                color #f4f4f4
                                .iconfont
                                    font-size 24px
                        &:hover
                            .u-pic,.u-pic img
                                cursor pointer
                            .u-oper
                                _display()
                        .u-loading
                            width 100%
                            height 90px
                            line-height 90px
                            color $c_blue + 5% - 3deg
                            text-align center
                            _completeCenter()
                            background rgba(255,255,255,.90);


</style>
