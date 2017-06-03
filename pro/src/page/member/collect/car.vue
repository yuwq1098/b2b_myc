<template>
	<div class="collectCar">
	    <div class="g-mn-con">
            <div class="m-hd">
                <h3 class="u-tit">我的收藏</h3>
            </div><!-- 顶部标题头 -->
            <div class="m-tap">
                <ul class="m-tap-lst f__clearfix">
                    <li class="u-tap-item on">
                        <router-link :to="{path:'/member/collect/car'}" class="u-lk" tag="div">
                            收藏的车辆
                        </router-link>
                    </li>
                    <li class="u-tap-item">
                        <router-link :to="{path:'/member/collect/merchant'}" class="u-lk" tag="div">
                            收藏的车行
                        </router-link>
                    </li>
                </ul>
            </div><!-- 条件切换tap -->
            <div class="m-mn-wrap">
                <div class="m-lst-wrap">
                    <ul class="m-car-list f__clearfix">
                        <li class="m-car-item">
                            <a href="javascript:;" class="u-lk">
                                <div class="u-pic-box">
                                    <section class="i-close">
                                        <i class="iconfont icon-shanchu"></i>
                                    </section>
                                    <div class="u-pic">
                                        <img src="../../../assets/img/car_02.jpg" alt="车辆图"/>
                                    </div><!-- 图片容器 -->
                                    <p class="u-txt">找相似</p>
                                </div><!-- 图片容器 -->
                                <div class="u-con">
                                    <div class="u-tit">大众-朗逸 2011款 1.6L 手动品悠版</div><!-- 标题 -->
                                    <div class="u-price">批发价：<em class="price">￥4.00万</em></div><!-- 价格 -->
                                    <div class="u-collect">已有<strong class="vital">15</strong>人收藏</div><!-- 收藏人数 -->
                                </div><!-- 内容 -->
                            </a>  
                        </li>
                        <li class="m-car-item">
                            <a href="javascript:;" class="u-lk">
                                <div class="u-pic-box">
                                    <section class="i-close">
                                        <i class="iconfont icon-shanchu"></i>
                                    </section>
                                    <div class="u-pic">
                                        <img src="../../../assets/img/car_02.jpg" alt="车辆图"/>
                                    </div><!-- 图片容器 -->
                                    <p class="u-txt">找相似</p>
                                </div><!-- 图片容器 -->
                                <div class="u-con">
                                    <div class="u-tit">大众-朗逸 2011款 1.6L 手动品悠版</div><!-- 标题 -->
                                    <div class="u-price">批发价：<em class="price">￥4.00万</em></div><!-- 价格 -->
                                    <div class="u-collect">已有<strong class="vital">15</strong>人收藏</div><!-- 收藏人数 -->
                                </div><!-- 内容 -->
                            </a>  
                        </li>
                        <li class="m-car-item">
                            <a href="javascript:;" class="u-lk">
                                <div class="u-pic-box">
                                    <section class="i-close">
                                        <i class="iconfont icon-shanchu"></i>
                                    </section>
                                    <div class="u-pic">
                                        <img src="../../../assets/img/car_02.jpg" alt="车辆图"/>
                                    </div><!-- 图片容器 -->
                                    <p class="u-txt">找相似</p>
                                </div><!-- 图片容器 -->
                                <div class="u-con">
                                    <div class="u-tit">大众-朗逸 2011款 1.6L 手动品悠版</div><!-- 标题 -->
                                    <div class="u-price">批发价：<em class="price">￥4.00万</em></div><!-- 价格 -->
                                    <div class="u-collect">已有<strong class="vital">15</strong>人收藏</div><!-- 收藏人数 -->
                                </div><!-- 内容 -->
                            </a>  
                        </li>
                        <li class="m-car-item">
                            <a href="javascript:;" class="u-lk">
                                <div class="u-pic-box">
                                    <section class="i-close">
                                        <i class="iconfont icon-shanchu"></i>
                                    </section>
                                    <div class="u-pic">
                                        <img src="../../../assets/img/car_02.jpg" alt="车辆图"/>
                                    </div><!-- 图片容器 -->
                                    <p class="u-txt">找相似</p>
                                </div><!-- 图片容器 -->
                                <div class="u-con">
                                    <div class="u-tit">大众-朗逸 2011款 1.6L 手动品悠版</div><!-- 标题 -->
                                    <div class="u-price">批发价：<em class="price">￥4.00万</em></div><!-- 价格 -->
                                    <div class="u-collect">已有<strong class="vital">15</strong>人收藏</div><!-- 收藏人数 -->
                                </div><!-- 内容 -->
                            </a>  
                        </li>
                    </ul>
                </div>
            </div>
        </div><!-- 中心内容 -->
	</div>
</template>

<script>
	export default {
        name: "collectCar",
        // 数据
        data() {
            return{
                
            }
        },
        // 自定义函数(方法)
        methods: {
            
        },
        // 在当前模块注册组件
        components:{

        },
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import './car.styl'
</style>
