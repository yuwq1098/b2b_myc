<template>
    <div class="focusSlide" v-show="carImgData">
        <div class="m-sld-wrap" id="cSlide">
            <div class="m-sld" id="ban_pic">
                <div class="prev1" id="prev"></div>
		        <div class="next1" id="next"></div>
                <ul class="m-sld-lst">
                    <li slot="sld-item" class="u-sld-item" v-for="item in carImgData.imgItems">
                        <img v-lazy="item.fileUrl" :alt="item.title" />
                    </li>
                </ul>
            </div><!-- 主轮播 -->
            <div class="m-info-bar">
                <p class="u-info">{{carImgData.merchantName}}</p>
                <section class="u-pages">
                    <i class="i-img-thumb"></i><!-- 缩略图小icon -->
                    <span class="u-page">{{curSildeNumber}}/{{carImgData.imgItems.length}}</span>
                </section>
            </div>
        </div><!-- 主轮播容器 -->

        <div class="m-sld-cd-wrap" ref="thumbs">
            <a href="javascript:;" class="u-prev-cd-btn" id="prev_btn">
                <i class="iconfont icon-arrowleft1"></i>
            </a>
            <div class="m-sld-cd" id="ban_num">
                <ul class="m-sld-cd-lst">
                    <li slot="sld-cd-item" class="u-sld-cd-item" v-for="item in carImgData.imgItems">
                        <img v-lazy="item.fileUrl" :alt="item.title" />
                    </li>
                </ul>
            </div><!-- 小轮播（焦点） -->
            <a href="javascript:;" class="u-next-cd-btn" id="next_btn">
                <i class="iconfont icon-arrowright1"></i>
            </a>
        </div><!-- 次轮播容器 -->
    </div><!-- 轮播控件 -->
</template>


<script type="text/javascript">
    
    import {jq} from 'assets/js/picTab.js'

    export default {
        name:'focusSlide',
		// 数据
		data() {
			return{
                curSildeNumber: 1,
                defaultImgItem: [
                    {
                        title:'没有信息',
                        fileUrl: require('assets/img/car-default.jpg'),
                    }],
			}
		},
		props: {
            carImgData:{
                type: Object,
                default: {
                    merchantName:"暂无信息",
                    imgItems:[
                        {
                            title:'没有信息',
                            fileUrl: require('assets/img/car-default.jpg'),
                        },
                    ]
                },
            }
		},
		mounted(){
            
		},
		methods:{

		},
        //数据侦听
        watch:{
            carImgData: function(val){
                if(val.imgItems.length==0){
                    val.imgItems = this.defaultImgItem;
                }

                let me = this;
                setTimeout(() => {
                    jq('#cSlide').banqh({
                        box:"#cSlide",//总框架
                        pic:"#ban_pic",//大图框架
                        pnum:"#ban_num",//小图框架
                        prev_btn:"#prev_btn",//小图左箭头
                        next_btn:"#next_btn",//小图右箭头
                        prev:"#prev",//大图左箭头
                        next:"#next",//大图右箭头
                        autoplay:false,//是否自动播放
                        delayTime:400,//切换一张图片时间
                        pop_delayTime:400,//弹出框切换一张图片时间
                        order:0,//当前显示的图片（从0开始）
                        picdire:true,//大图滚动方向（true为水平方向滚动）
                        mindire:true,//小图滚动方向（true为水平方向滚动）
                        min_picnum:4,//小图显示数量
                        onSlideChangeEnd: function(can){
                            me.curSildeNumber = can.xtqhnum + 1;
                        }
                    })
                },20)
            },
        }

	}
</script>

<!-- 限定作用域 -->
<style lang="stylus" rel="stylesheet/stylus" scope>
	@import './fc_slide.styl'
</style>