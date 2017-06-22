<!--  
 **  @description 图片文件上传（汽车图片上传）
 --> 

<template>
    <div class="photoUpload">
        <div class="m-upload-wrap">
            <div class="m-oper-box f__clearfix">
               
                <vue-file-upload
                    :url= "apiUrl"
                    ref= "photoUploader"
                    id= "photoUploader"
                    :multiple= "true"
                    :max= "6"
                    :filters= "filters"
                    :events= "cbEvents"
                    :request-options= "reqopts"
                    @onAdd= "onAddItem"
                    v-show= "false"
                    >
                </vue-file-upload>

                <div class="u-oper-btn" @click="onPhotoUpload">
                    <a href="javascript:;" class="u-lk">
                        <span class="u-btn-tit">点击上传车辆图片</span>
                        <i class="iconfont icon-shangchuan1"></i><!-- 上传小图标 -->
                    </a>
                </div><!-- 上传按钮 -->
                <div class="u-oper-tip">
                    <p class="u-txt">按住Ctrl键可批量上传，图片比例为4:3，支持jpg/gif/png格式，每张最大2M，请最少上传2张。遵循下图从各个角度拍摄照片可以使咨询量提升80%哦！
                    </p>
                </div><!-- 上传提示 -->
            </div><!-- 操作区 -->
            <table>
                <thead>
                    <tr>
                        <th>文件名</th>
                        <th>文件大小</th>
                        <th>上传进度</th>
                        <th>上传状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(file,index) in files">
                        <td>{{file.name}}</td>
                        <td>{{file.size}}</td>
                        <td>{{file.progress}}</td>
                        <td>{{onStatus(file)}}</td>
                        <td>
                            <button
                                class="xoppp"
                                :data-index="index"
                                type='button'
                                @click="uploadItem(file)"
                                >
                                上传
                            </button>
                            <button
                                type="button"
                                @click="uploadAll"
                                >
                                上传所有文件
                            </button>
                            <button
                                type="button"
                                @click="clearAll"
                                >
                                清空文件列表
                            </button>  
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="m-file-box">
                <div class="m-file-example">
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
            </div><!-- 显示文件区 -->
        </div>
    </div>
</template>

<script>
    
    import $ from "jquery"
    // 本地数据 发布车辆图片上传势力
    import {photoExamples} from "api/localJson/sendCar.js"
    // 引入文件上传组件
    import vueFileUpload from 'vue-file-upload';
    // 工具类
    import {joinUrl,dataToJson,strToJson} from 'assets/js/util.js'
    // 本地存储工具
    import {store} from 'assets/js/store.js'
    // md5加密 
    import {md5} from 'assets/js/md5.js'

    export default {
        name: "photoUpload",
        // 在当前模块注册组件
        components:{
            vueFileUpload,
        },
        // 数据
        data() {
            return{
                photoExamples: photoExamples,
                // 已选择的文件
                files:[],
                //文件过滤器，只能上传图片
                filters:[
                {
                    name:"imageFilter",
                    fn(file){
                        var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                        return '|jpg|png|jpeg|'.indexOf(type) !== -1;
                    }
                }],
                //回调函数绑定
                cbEvents:{
                    onCompleteUpload:(file,response,status,header)=>{
                        console.log(response);
                        console.log(file);
                        console.log("finish upload;");
                    }
                },
                apiUrl: joinUrl("/action2/UploadPublicFileBatch.ashx"),
                //xhr请求附带参数
                
            }
        },
        props:{
            
        },
        // 数据侦听
        watch:{
            
        },
        // 再次进入生命周期钩子(因为keep-alive的原因,created和mounted在页面切换过程中都是无效的)
        activated(){
            
            // this.reqopts.headers = this.getSign();
            // console.log("xxx",this.reqopts);

            // var xoppp = $(".xoppp");
            // xoppp.on("click",function(){

            // })

            // let [timestamp,token,secret,sign] = this.getSignHeaders();
            // this.reqopts.headers = {timestamp:timestamp,token:token,sign:sign}
            // console.log("请求头",this.reqopts.headers);
        },
        computed:{
            reqopts(){
                return {
                    formData:{
                        fileType: 'img',
                    },
                    headers: {
                        timestamp: ((+new Date())/1000).toFixed(0),
                        token: strToJson(store.get('loginInfo')).AccessToken,
                        sign: strToJson(store.get('loginInfo')).AccessSecret,   
                    },
                    responseType:'json',
                    withCredentials:false
                }
            }
                
        },
        // 自定义函数(方法)
        methods: {
            onStatus(file){
                if(file.isSuccess){
                    return "上传成功";
                }else if(file.isError){
                    return "上传失败";
                }else if(file.isUploading){
                    return "正在上传";
                }else{
                    return "待上传";
                }
            },
            getSign(){
                let [timestamp,token,secret,sign] = this.getSignHeaders();
                return {timestamp:timestamp,token:token,sign:sign};
            },
            onAddItem(files){
                console.log("是不是蛋疼",files);
                this.files = files;
                var photoUploader = this.$refs.photoUploader.$el;
            },
            uploadItem(file){
                function getSignHeaders(){
                    let [timestamp,token,secret,sign] = [null,null,null,null];
                    if(store.get('loginInfo')){
                        [timestamp,token,secret]=[
                            ((+new Date())/1000).toFixed(0),
                            strToJson(store.get('loginInfo')).AccessToken,
                            strToJson(store.get('loginInfo')).AccessSecret,      
                        ];
                        sign=md5(timestamp+token+secret);
                    }
                    return [timestamp,token,secret,sign]
                }

                //单个文件上传
                this.reqopts.headers = getSignHeaders();
                console.log(this.reqopts.headers)
                setTimeout(()=>{
                    file.upload();
                },200);
                
            },
            uploadAll(){
                //上传所有文件
                this.$refs.photoUploader.uploadAll();
            },
            clearAll(){
                //清空所有文件
                this.$refs.photoUploader.clearAll();
            },
            // 上传车辆文件图片
            onPhotoUpload(){
                var photoUploader = this.$refs.photoUploader.$el;
                photoUploader.getElementsByTagName('input')[0].click();
            },
            // 获取签名及token
            getSignHeaders(){
                let [timestamp,token,secret,sign] = [null,null,null,null];
                if(store.get('loginInfo')){
                    [timestamp,token,secret]=[
                        ((+new Date())/1000).toFixed(0),
                        strToJson(store.get('loginInfo')).AccessToken,
                        strToJson(store.get('loginInfo')).AccessSecret,      
                    ];
                    sign=md5(timestamp+token+secret);
                }
                return [timestamp,token,secret,sign]
            },
        },
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'
    .m-upload-wrap
        .m-oper-box
            position relative
            height 44px
            margin-bottom 12px
            .u-oper-btn
                width 250px
                height 38px
                line-height 34px
                text-align center
                background #ff6533
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


</style>
