<template>
    <div class="collectCar">
        <div class="g-mn-con">
            <div class="m-hd">
                <h3 class="u-tit">我的收藏</h3>
            </div><!-- 顶部标题头 -->
            <div class="m-tap">
                <ul class="m-tap-lst f__clearfix">
                    <li class="u-tap-item">
                        <router-link :to="{path:'/member/collect/car'}" class="u-lk" tag="div">
                            收藏的车辆
                        </router-link>
                    </li>
                    <li class="u-tap-item on">
                        <router-link :to="{path:'/member/collect/merchant'}" class="u-lk" tag="div">
                            收藏的车行
                        </router-link>
                    </li>
                </ul>
            </div><!-- 条件切换tap -->
            <div class="m-mn-wrap">
                <div class="m-merchant-wrap">
                    <ul class="m-list f__clearfix">
                        <li class="m-item f__clearfix">
                            <div class="m-mct-info f__fl f__clearfix">
                                <div class="m-face f__fl">
                                    <img src="../../../assets/img/businesses-face.png" alt="车行的头像" />
                                </div><!-- 头像 -->
                                <div class="m-info-mn  f__fr">
                                    <div class="u-tit">南昌阳光车服务</div><!-- 标题 -->
                                    <div class="u-star">
                                        <span v-for="n in 5">
                                            <i class="iconfont icon-collection_fill"></i>
                                        </span>
                                    </div><!-- 星评 -->
                                    <div class="u-succeed">成交数：<em class="vital">191</em>笔</div><!-- 成交数 -->
                                    <div class="u-txt">王晓丽</div><!-- 联系人(负责人) -->
                                    <div class="u-txt">13652496521</div><!-- 联系电话 -->
                                    <div class="u-txt">青山湖北大道99号</div><!-- 地址 -->
                                </div><!-- 主要信息 --> 
                                <a href="javascript:;" class="u-rm" title="将本车行从您的收藏夹中移除"><i class="iconfont icon-shanchu"></i></a><!-- 删除 --> 
                            </div><!-- 车行信息 -->
                            <div class="m-mct-con f__fr">
                                <div class="m-tap-opts">
                                    <ul class="m-tap-lst f__clearfix">
                                        <li class="u-tap-item on">在售（10）</li>
                                        <li class="u-tap-item">在售（6）</li>
                                    </ul>
                                </div><!-- 选项切换 -->
                                <div class="m-car-wrap">
                                    <ul class="m-car-lst f__clearfix">
                                        <li class="m-car-item" v-for="n in 3">
                                            <a href="javascript:;" class="u-lk">
                                                <div class="u-pic">
                                                    <img src="../../../assets/img/car_02.jpg" alt="车辆图"/>
                                                </div>
                                                <div class="u-con">
                                                    <div class="u-tit">大众-朗逸 2011款 1.6L 手动品悠版大众-朗逸 2011款 1.6L 手动品悠版</div>
                                                    <div class="u-price">批发价：<em class="price">￥4.00万</em></div>    
                                                </div>
                                                
                                            </a>
                                        </li>
                                    </ul>
                                </div><!-- 车辆列表（车行拥有的车辆） -->
                                <a href="javascript:;" class="u-more">查看更多<i class="iconfont icon-enter"></i></a><!-- 查看更多 -->
                            </div>
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
    @import './merchant.styl'
</style>
