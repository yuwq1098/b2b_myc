<!--
 **  @description 多图拖拽裁切上传组件
 -->

<template>

    <div class="multiFiles">

        <!-- 文件上传 -->
        <input
            v-show="isShowRealInput"
            @change="uploadInputChange"
            type="file"
            ref="uploadInputFile"
            :accept="acceptType"
            multiple
            />

        <div class="img-upload-box">
        	<div class="upload-top f__clearfix">
                <div class="add-img-wrap">
                    <button class="add-btn" @click="onTriggerUploadIpt">上传</button>
                </div><!-- 按钮上传 -->
                <div class="drag-wrap" ref="dragArea"
                    @dragenter="dragDomEnterFn($event)"
                    @dragover="dragDomOverFn($event)"
                    @dragleave="dragDomLeaveFn($event)"
                    @drop="fileDropFn($event)"
                    >
                    <p class="explain">或将文件拖拽到此处</p>
                </div>
            </div>
            <div class="img-container" v-show="realFiles.length>0">
                <ul class="photo-file-lst f__clearfix" v-for="(item,index) in realFiles">
                    <template v-for="(item,index) in realFiles">
                    	<li class="photo-item" :key="'p'+index">
	                		<div class="u-pic">
	                            <img :src="item.base64Img" alt="程序截图"/>
	                        </div>
	                	</li>
                    </template>
                </ul>
            </div><!-- 图片容器 -->
        </div><!-- 单文件图片裁切 -->

    </div>

</template>

<script>

    // 获取api
    import api from 'api/getData.js'
    // 引入系统变量
    import * as SYSTEM from 'api/system.js'
    // dom操作类
    import * as geekDom from 'assets/js/dom.js'
    // 工具类
    import {dataToJson} from 'assets/js/util.js'

	export default {
        name: "multiFiles",
        // 数据
        props:{

        },
        data() {
            return{
            	// 接受上传文件的类型 ->  直接使用通配符*，会使得图片类型检测过程更缓慢
            	acceptType: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
                // 真实的input：files 隐藏
                isShowRealInput: false,
                allInputFiles: [],
                // 单次最大上传数
                maxUploadSize: 6,
                // 真实图片文件集合
                realFiles: [],
            }
        },
        // 创建vue实例
        created(){

        },
        // vue实例挂载在Dom上时
        mounted(){

        },
        //重新进入该组件
        activated(){

        },
        //销毁
        deactivated(){

        },
        // 自定义函数(方法)
        methods: {
            // 点击虚拟上传按钮触发真实的input:file
            onTriggerUploadIpt(){
                let uploadFileDom = this.$refs.uploadInputFile;
                uploadFileDom.click();
            },

            // 当值变化时
            uploadInputChange(){
            	let currUploadFiles = this.$refs.uploadInputFile.files;
            	// 处理当前选择的文件
            	this.disposeCurrFiles(currUploadFiles);
            },

            // 当被鼠标拖动的对象进入其容器范围内时触发此事件，阻止默认行为
            dragDomEnterFn(e){
                e.preventDefault();
            },
            // 当某被拖动的对象在另一对象容器范围内拖动时触发此事件，阻止默认行为
            dragDomOverFn(e){
                e.preventDefault();
            },
            // 当被鼠标拖动的对象离开其容器范围内时触发此事件，阻止默认行为
            dragDomLeaveFn(e){
                e.preventDefault();
            },
            // 在一个拖动过程中，释放鼠标键，拖拽放置，也需要阻止默认行为
            fileDropFn(e){
                e.preventDefault();
                let currUploadFiles = e.dataTransfer.files;
                // 处理当前选择的文件
            	this.disposeCurrFiles(currUploadFiles);
            },

            // 处理当前选择的文件
            disposeCurrFiles(currFiles){
                let that = this;
                // 如果用户选择的图片文件小于0
            	if(currFiles.length<=0) return;
            	if(currFiles.length > this.maxUploadSize){
                    this.$message.error('最多可一次性上传'+this.maxUploadSize+'张图片');
                    return;
                }
                //当 已选图像文件中的数量大于0
                if(this.realFiles.length>0){
                    // 判断文件是否重复
                    var isRepeat = geekDom.isRepeatSelectionByFiles(currFiles,this.realFiles);
                    if(isRepeat){
                        this.$message.error('请不要选择相同的图片');
                        return;
                    }
                }

                // 对选择的图片进行处理
                this._setPhotoFiles(currFiles,function(myFile,base64Img){
                    that.realFiles.push(Object.assign(myFile,{
                        base64Img: base64Img,
                        isLoad: true,
                    }));
                })
            },

            // 循环处理我们的图片
            _setPhotoFiles(files,callBack){

        		for (var key of Object.keys(files)) {
                    let myFile = files[key];
                    geekDom.getBase64FromImgFile(myFile,function(base64Img){
                        if(callBack){
                            callBack(myFile,base64Img);  
                        }
                    })
                }
            },

			//图片上传
            fileUpload(index,name,base64str){
                let that = this;
                let data = {
                    title: name,
                    dataUrl: base64str,
                }
                api.uploadPublicFileBatch(data).then(res=>{
                    if(res.code==SYSTEM.CODE_IS_OK){
                        that.realFiles[index].fileId = res.data.FileId;
                        //将新的用户选择的图片文件集合派发给父组件
                        that.changeFiles();
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '图片上传失败',
                            message: res.msg,
                            type: 'error',
                            duration: 2000,
                        });
                    }
                })
            },

            // 用户选择的图片文件集合派发给父组件
            changeFiles(){
                console.log(this.realFiles);
            },



        },
        // 在当前模块注册组件
        components:{

        },
	}

</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>

    @import '~assets/css/mixin.styl'
    .img-upload-box
        .upload-top
            .add-img-wrap,.drag-wrap
                float left
                _display()
                margin-right 12px
                background #fdfdfd
            .add-img-wrap
                width 180px
                height 130px
                _borderAll(#ddd,,dashed)
                background #fdfdfd url('../../assets/img/add_img.png') center 5px no-repeat
                background-size 75px 65px
                position relative
                .add-btn
                    width @width - 24px
                    height 36px
                    line-height @height
                    text-align center
                    border none
                    _borderRadius(3px)
                    _completeCenter(,,auto,12px)
                    background-color $c_blue
                    color #fff
                    font-size 15px
                    _spacingPlus(3px)
                    &:hover
                        background $c_blue - 12%
                    &:active
                        background $c_blue + 2%
            .drag-wrap
                width 480px
                height 130px
                _borderAll(#ddd,,dashed)
                position relative
                .explain
                    height 28px
                    line-height 28px
                    color #999
                    font-size 13px
                    text-align center
                    _completeCenter()
        .img-container
            .photo-file-lst
            	.photo-item
            		height 150px
            		margin 15px 15px 0 0
            		float left
            		.u-pic
            			height @height
            			img
            				height @height
            				width auto

</style>
