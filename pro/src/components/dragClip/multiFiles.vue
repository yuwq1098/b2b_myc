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
            accept="image/*"
            multiple
            />

        <div class="img-upload-box">
        	<div class="upload-top f__clearfix">
                <div class="add-img-wrap">
                    <button class="add-btn" @click="onTriggerUploadIpt">上传</button>
                </div><!-- 按钮上传 -->
                <div class="drag-wrap" ref="dragArea">
                    <p class="explain">或将文件拖拽到此处</p>
                </div>
            </div>
            <div class="img-container">
                  
            </div><!-- 图片容器 -->
        </div><!-- 单文件图片裁切 -->

    </div>

</template>

<script>

	export default {
        name: "multiFiles",
        // 数据
        props:{

        },
        data() {
            return{
                // 真实的input：files 隐藏
                isShowRealInput: false,
            }
        },
        // 创建vue实例
        created(){
            this.$nextTick(()=>{
                console.log("aaaa");
                this.initDragEvent();
            })
        },
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
                var uploadInputFile = this.$refs.uploadInputFile;
                uploadInputFile.click();
            },
            // 当值变化时
            uploadInputChange(){
            	console.log("选择的文件发生了变化")
                // var uploadInputFile = this.$refs.uploadInputFile.files;
                // if(uploadInputFile.length<=0) return;
                // if(uploadInputFile.length > this.maxUploadSize){
                //     this.$message.error('最多同时只可上传'+this.maxUploadSize+'张图片');
                //     return;
                // }
                // this.$emit('uploadChange',uploadInputFile);
            },
            initDragEvent(){
            	var dragDom = this.$refs.dragArea;
            	//拖拽放置，也需要阻止默认行为
                dragDom.ondrop = function(e) {
                	console.log("在拖拽中")
                	console.log(e);
                }
            }
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
            min-height 180px
            _display(none)

</style>
