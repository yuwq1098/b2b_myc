<template>
    <div id="sidebar">
        <div class="m-sdb-box">
            <section class="m-sdb-hd">
                <div class="u-pic">
                    <img src="../../assets/img/businesses-face.png" alt="用户头像"/>
                </div>
                <p class="u-name">王晓丽</p>
                <div class="u-line"></div><!-- 分割线 -->
            </section><!-- 侧边栏头部（用户信息） -->
            <section class="m-sdb-menu">
                <div class="m-menu-lst">
                    <div class="m-menu-item" v-for="(menu,index) in sdMenu">
                        <div class="m-submenu-hd" @click="toggleClass(index)">{{menu.title}}<i class="iconfont icon-arrowright1" :class="[isActive[index]?'on':'']"></i></div>
                        <div class="m-submenu-gp" v-show="isActive[index]">
                            <transition-group name="submenu-gp">
                                <div class="u-submenu-item" v-for="submenu in menu.children" :key="submenu">
                                    <router-link :to="{path:submenu.hash}" v-text="submenu.title" tag="div"></router-link>
                                </div>
                            </transition-group>
                        </div>
                    </div>
                </div>
            </section><!-- 菜单 -->
        </div>
    </div>
</template>

<script>

    const MENU = [
        {
            'title': '车辆订单',
            'hash':'',
            'children': [
                {
                    'title': '买车订单',
                    'hash':'/member/order/buyCar',
                },
                {
                    'title': '卖车订单',
                    'hash':'/member/order/sellCar',
                },
                {
                    'title': '退款维权',
                    'hash':'',
                },
            ]
        },
        {
            'title': '车行认证',
            'hash':'',
            'children': [
                {
                    'title': '车行认证1',
                    'hash':'',
                },
                {
                    'title': '车行认证2',
                    'hash':'',
                },
                {
                    'title': '车行认证3',
                    'hash':'',
                },
            ]
        },
        {
            'title': '我的钱包',
            'hash':'',
            'children': [
                {
                    'title': '我的钱包1',
                    'hash':'',
                },
                {
                    'title': '我的钱包2',
                    'hash':'',
                },
                {
                    'title': '我的钱包3',
                    'hash':'',
                },
            ]  
        },
        {
            'title': '收藏',
            'hash':'',
            'children': [
                {
                    'title': '收藏的车辆',
                    'hash':'/member/collect/car',
                },
                {
                    'title': '收藏的车行',
                    'hash':'/member/collect/merchant',
                },
            ]  
        },
        {
            'title': '车源管理',
            'hash':'',
            'children': [
                {
                    'title': '车源管理1',
                    'hash':'',
                },
                {
                    'title': '车源管理2',
                    'hash':'',
                },
                {
                    'title': '车源管理3',
                    'hash':'',
                },
            ]  
        },
        {
            'title': '设置',
            'hash':'',
            'children': [
                {
                    'title': '设置1',
                    'hash':'',
                },
                {
                    'title': '设置2',
                    'hash':'',
                },
                {
                    'title': '设置3',
                    'hash':'',
                },
            ]  
        }
    ];
	export default {
        name: "sidebar",
        // 数据
        data() {
            return{
                sdMenu: MENU,
                open: false,
                isActive: [false, false, false, false, false]
            }
        },
        // 自定义函数(方法)
        methods: {
            toggleClass: function (index) {

                //结构赋值
                if(!this.isActive[index]){
                    this.isActive = [false, false, false, false, false];
                }
                this.$set(this.isActive,index,!this.isActive[index]);
                
            },
        },
        // 在当前模块注册组件
        components:{

        },
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import './sidebar.styl'
    
    .submenu-gp-enter-active, .submenu-gp-leave-active {
        transition: all 1s;
    }
    .submenu-gp-enter, .submenu-gp-leave-active {
        opacity: 0;
        transform: translateX(180px);
        transform: scale(0);
    }
</style>
