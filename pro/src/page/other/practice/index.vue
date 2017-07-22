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
                                :class="{'v2':videoItems.length>4,'v3':videoItems.length>8}"
                                >
                                <ul class="u-video-lst f__clearfix">
                                    <template v-for="(item,index) in videoItems">
                                        <li class="u-item"
                                            :class="'column3'">
                                            <a href="javascript:;" class="u-box">
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
        

        <div class="m-player-wrap" v-show="true">
            <div class="m-mask"></div><!-- 遮罩层 -->
            <div class="m-player-box">
                <div class="m-hd">
                    <div class="tit">我笑了</div>
                </div>
                <div class="m-con">
                    <video-player  ref="videoPlayer"
                        :options="playerOptions"
                        @play="onPlayerPlay($event)"
                        @pause="onPlayerPause($event)"
                        @ended="onPlayerEnded($event)"
                        @playing="onPlayerPlaying($event)"
                        @statechanged="playerStateChanged($event)"
                        @ready="playerReadied">
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

                playerOptions: {

                    // component options
                    start: 0,
                    playsinline: false,

                    // videojs options
                    muted: true,
                    language: 'en',
                    playbackRates: [0.7, 1.0, 1.5, 2.0],
                    sources: [{
                        type: "video/mp4",
                        src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
                    }],
                    poster: require("assets/img/u-video-ditu.png"),
                }

            }
        },
        //生命周期,开始的时候
        created(){
          
        },
        mounted(){
            console.log('this is current player instance object', this.player)
        },
        activated(){
            // 获取视频信息
            this.getVideosData();
        },
        //退出的生命周期钩子
        deactivated(){

        },
        // 计算数据
        computed:{
            player() {
                return this.$refs.videoPlayer.player
            }
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

            // listen event
            onPlayerPlay(player) {
                // console.log('player play!', player)
            },
            onPlayerPause(player) {
                // console.log('player pause!', player)
            },
            onPlayerEnded(player) {

            },
            onPlayerPlaying(player) {

            },
            // or listen state event
            playerStateChanged(playerCurrentState) {
                // console.log('player current update state', playerCurrentState)
            },

              // player is ready
            playerReadied(player) {
                console.log('the player is readied', player)
                // you can use it to do something...
                // player.[methods]
            }
        },
	}
</script>

<!-- 视频播放盒子 -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'
    .m-player-wrap
        width 100%
        height 100%
        position fixed
        left 0
        top 0
        right 0
        bottom 0
        z-index 20170721
        .m-mask
            width @width
            height @height
            background rgba(0,0,0,.55)
    
</style>


<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'

</style>
