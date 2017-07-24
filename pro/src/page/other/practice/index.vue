<!--  
  @description 视频帮助页 
  @creatDate 2017-7-22
  @author Geek.Yu  email:1098654043@qq.com
-->
<template>
	<div class="practice">
        <div class="g-doc">
            <div class="g-bd">
                <section class="f__w1200">
                    <gk-bread-crumb
                        :crumbItems="crumbItems"
                        ></gk-bread-crumb><!-- 面包屑组件 -->
                    <div class="m-practice-box">
                        <div class="m-pic-wrap" v-show="false"></div><!-- 海报大图 -->
                        <div class="m-video-wrap">
                            <div class="m-hd">
                                <p class="tit">木有车视频</p>
                            </div><!-- 头部标题 -->
                            <div class="m-con"
                                :class="{'v2':videoItems.length>4&&
                                            videoItems.length<=8,
                                        'v3':videoItems.length>8&&videoItems.length<=12,
                                        'v4':videoItems.length>12}"
                                >
                                <ul class="u-video-lst f__clearfix">
                                    <template v-for="(item,index) in videoItems">
                                        <li class="u-item"
                                            :class="'column3'">
                                            <a href="javascript:;" class="u-box"
                                                @click="playVideo(item.title,item.videoUrl)">
                                                <div class="u-video-box">
                                                    <img class="u-pic" src="../../../assets/img/u-video-ditu.png" alt="蛋疼" />
                                                    <!-- <video class="u-video" id="video" controls="controls">
                                                        <source :src="item.videoUrl">  
                                                    </video>   -->
                                                    <!-- <div id="output"></div>   -->
                                                    <div class="video-btn"></div><!-- 视频播放按钮 -->
                                                </div><!-- 视频播放盒子 -->
                                                <div class="u-con">
                                                    <div class="issuer">南昌小目标车网</div>
                                                    <h4 class="title">{{item.title}}</h4>
                                                </div><!-- 视频内容 -->
                                            </a>
                                        </li>    
                                    </template>
                                    <!-- <template v-for="(item,index) in videoItems"
                                        v-if="index>=3">
                                        <li class="u-item"
                                            :class="'column2'">
                                            <div class="u-video-box">
                                                
                                            </div>视频播放盒子
                                            <div class="u-con">
                                                <div class="issuer">南昌小目标车网</div>
                                                <h4 class="title">{{item.title}}</h4>
                                            </div>视频内容
                                        </li>    
                                    </template> -->
                                </ul>
                            </div><!-- 内容 -->
                        </div><!-- 视频播放区 -->
                    </div><!-- 视频演示 -->
                </section>
            </div>
        </div>
        

        <div class="m-player-wrap" v-show="isShowVideoBox"
            ref="myPlayerWrap">
            <div class="m-mask"></div><!-- 遮罩层 -->
            <div class="m-player-box">
                <div class="m-hd">
                    <p class="tit">{{vBoxTitle}}</p>
                    <a href="javascript:;" class="u-btn close"
                        title="关闭播放器" 
                        @click="closePlayer()"
                        ><i class="iconfont icon-closecircle"></i>
                    </a>
                </div>
                <div class="m-con">
                    <video-player
                        ref="videoPlayer"
                        :options="playerOptions">
                    </video-player>
                </div>
            </div><!-- 播放器盒子 -->
        </div><!-- 播放器 -->
	    
	</div>
</template>

<script>
    
    // 获取数据的api
    import api from 'api/getData.js'
    // 引入系统变量
    import * as SYSTEM from 'api/system.js'
    // dom操作方法
    import * as geekDom from "assets/js/dom.js"

    // 网站外层面包屑列表本地化资源
    import {crumbsInfo} from "api/localJson/homeCrumb.js"
    
    // 广告帮助视频信息的构造类
    import { adVideoInfo } from "base/class/video.js"
    // 面包屑组件
    import gkBreadCrumb from "components/common/gkBreadcrumb.vue"

    import { videoPlayer } from 'vue-video-player'


	export default {
        name: "practice",
        // 在当前模块注册组件
        components:{
            // 面包屑组件
            gkBreadCrumb,
            // vue视频播放器
            videoPlayer,
        },
        // 数据
        data() {
            return{
                // 面包屑列表信息
                crumbItems: crumbsInfo['practice'],
                // 视频资源集合
                videoItems: [],
                // 视频播放盒子
                isShowVideoBox: false,
                
                // 视频播放器标题
                vBoxTitle: "",

                playerOptions: {

                    // 组件配置
                    start: 0,                 // 第几秒开始播放
                    playsinline: false,
                    height: 450,              // 视频盒子高度
                    autoplay: true,           // 是否自动播放

                    // 播放js配置
                    muted: false,             // 是否静音
                    percentAsDecimal: 2,      // 音量百分比
                    language: 'en',
                    playbackRates: [0.7, 1.0, 1.5, 2.0],
                    sources: [{
                        type: "video/mp4",
                        src: ""
                    }],
                    poster: require("assets/img/u-video-ditu.png"),
                }

            }
        },
        //生命周期,开始的时候
        created(){
            
        },
        mounted(){
            
        },
        activated(){
            // 获取视频信息
            this.getVideosData();
            // 鼠标滚轮事件
            geekDom.preventScroll(this.$refs.myPlayerWrap);
        },
        //退出的生命周期钩子
        deactivated(){

        },
        // 计算数据
        computed:{
            
        },
        //数据侦听
        watch:{
            
        },
        // 自定义函数(方法)
        methods: {
            
            // 格式化用户信息
            _normalizeAdVideo(list) {
                let arr = [];
                list.forEach((item) => {
                    arr.push(new adVideoInfo(item))
                });
                return arr;
            },

            // 获取视频信息
            getVideosData(){
                api.getAdVideos().then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        // 视频资源集合
                        this.videoItems = this._normalizeAdVideo(res.data.AdvertisementVideo);
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

            // 视频播放
            playVideo(tit,videoUrl){
                // 如果请求的视频资源没有加载出来，播放自然也不能走
                let bool = this.videoItems&&this.videoItems.length>0;
                if(!bool) return;

                // 获取播放器对象
                this.player = this.getPlayerObj();
                // 播放器标题
                this.vBoxTitle = tit;
                this.isShowVideoBox = true;
                // 指定开始播放的时间
                this.player.currentTime(0);
                // 开始播放
                this.player.play();
                
                // 指定播放路径
                this.playerOptions.sources[0].src = videoUrl;
            },
            // 关闭播放器盒子
            closePlayer(){
                // 获取播放器对象
                this.player = this.getPlayerObj();
                this.isShowVideoBox = false;
                // this.player.dispose();  // 销毁视频播放器
                // 暂停播放
                this.player.pause();
            },

            // 重新获取播放器对象
            getPlayerObj(){
                return this.$refs.videoPlayer.player;
            }
        },
	}
</script>


<style lang="stylus" rel="stylesheet/stylus">
    @import '~assets/css/mixin.styl'
    .m-player-wrap
        .video-js.vjs-custom-skin
            &:focus
                outline none
        .video-js .vjs-control-bar
            background #1D2A33
            _translate3d(0,72px)
        .vjs-has-started.vjs-user-inactive.vjs-playing .vjs-control-bar
            visibility visible
            _opacity(1)
        .vjs-load-progress,
        .vjs-play-progress,
        .vjs-mouse-display
            cursor pointer
</style>

<!-- 视频播放盒子的样式 -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'video.styl'    
</style>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'
</style>
