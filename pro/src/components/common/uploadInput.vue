<!--  
 **  @description 文件上传(button区域)
 --> 

<template>
    <div class="uploadInput">
        <div class="m-upload-hd">
            <!-- 文件上传 -->
            <input 
                v-show="isShowRealInput" 
                @change="uploadInputChange" 
                type="file" 
                ref="uploadInputFile" 
                accept="image/*" 
                multiple
                />

            <div class="m-oper-box f__clearfix">
                <div class="u-oper-btn" @click="onTriggerUploadIpt">
                    <a href="javascript:;" class="u-lk">
                        <span class="u-btn-tit">{{btnText}}</span>
                        <i class="iconfont icon-shangchuan1"></i><!-- 上传小图标 -->
                    </a>
                </div><!-- 上传按钮 -->
                <div class="u-oper-tip">
                    <p class="u-txt">{{uploadTip}}</p>
                </div><!-- 上传提示 -->
            </div><!-- 操作区 -->
        </div><!-- 上传文件区域区头部 -->
    </div>
</template>

<script>

    // 最大上传数量
    const maxUploadSize = 6;

    export default {
        name: "uploadInput",
        // 在当前模块注册组件
        components:{
            
        },
        // 数据
        data() {
            return{
                // 真实的input：files 隐藏
                isShowRealInput: false,
            }
        },
        props:{
            btnText:{
                type: String,
                default: "开始上传"
            },
            uploadTip:{
                type: String,
                default: "图片比例控制在4:3"
            },
            files: {
                type: Array,
                default: function(){
                    return [];
                }
            },
        },
        // 数据侦听
        watch:{
            
        },
        // 再次进入生命周期钩子(因为keep-alive的原因,created和mounted在页面切换过程中都是无效的)
        activated(){

        },
        computed:{
                
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
                var uploadInputFile = this.$refs.uploadInputFile.files;
                if(uploadInputFile.length<=0) return;
                if(uploadInputFile.length > maxUploadSize){
                    this.$message.error('最多同时只可上传'+maxUploadSize+'张图片');
                    return;
                }
                this.$emit('uploadChange',uploadInputFile);
            }
        },
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'
    .m-upload-hd
        .m-oper-box
            position relative
            height 44px
            margin-bottom 12px
            .u-oper-btn
                width 250px
                height 38px
                line-height 34px
                text-align center
                _completeCenter(0,auto)
                _spacingPlus(1px)
                _borderRadius(3px)
                color #f4f4f4
                background $c_blue + 5% - 3deg
                .iconfont
                    _display(inline-block)
                    font-size 18px
                    _translate3d(0,2px)
                &:hover
                    background $c_blue + 3%
                .u-lk
                    _display()
                    width 100%
                    height 100%
                    color #f4f4f4
            .u-oper-tip
                width 500px
                height 38px
                line-height 19px
                font-size 12px
                color #959595
                padding 3px 0
                margin-left 268px
</style>
