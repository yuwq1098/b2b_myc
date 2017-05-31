<template>
    <div class="m-sdb-box">
        <section class="m-sdb-hd">
            <div class="m-member-info">
                <div class="u-pic">
                    <img src="../../assets/img/businesses-face.png" alt="用户头像"/>
                </div>
                <p class="u-name">王晓丽</p>
            </div>
        </section><!-- 侧边栏头部（用户信息） -->
        <section class="m-sdb-menu">
            <div class="m-menu-lst">
                <div class="m-menu-item">
                    <div class="m-submenu-hd">车辆订单<i class="iconfont icon-arrowright1"></i></div>
                    <div class="m-submenu-gp">
                        <div class="u-submenu-item">
                            买车订单
                        </div>
                        <div class="u-submenu-item">
                            卖车订单
                        </div>
                        <div class="u-submenu-item">
                            退款维权
                        </div>
                    </div>
                </div>
                <div class="m-menu-item">
                    <div class="m-submenu-hd">车行认证<i class="iconfont icon-arrowright1"></i></div>
                    <div class="m-submenu-gp">
                        <div class="u-submenu-item">
                            车行认证item1
                        </div>
                        <div class="u-submenu-item">
                            车行认证item3
                        </div>
                        <div class="u-submenu-item">
                            车行认证item3
                        </div>
                    </div>
                </div>
                <div class="m-menu-item">
                    <div class="m-submenu-hd">我的钱包<i class="iconfont icon-arrowright1"></i></div>
                    <div class="m-submenu-gp">
                        <div class="u-submenu-item">
                            我的钱包item1
                        </div>
                        <div class="u-submenu-item">
                            我的钱包item3
                        </div>
                        <div class="u-submenu-item">
                            我的钱包item3
                        </div>
                    </div>
                </div>
                <div class="m-menu-item">
                    <div class="m-submenu-hd">我的收藏<i class="iconfont icon-arrowright1"></i></div>
                    <div class="m-submenu-gp">
                        <div class="u-submenu-item">
                            我的收藏item1
                        </div>
                        <div class="u-submenu-item">
                            我的收藏item3
                        </div>
                        <div class="u-submenu-item">
                            我的收藏item3
                        </div>
                    </div>
                </div>
                <div class="m-menu-item">
                    <div class="m-submenu-hd">车源管理<i class="iconfont icon-arrowright1"></i></div>
                    <div class="m-submenu-gp">
                        <div class="u-submenu-item">
                            车源管理item1
                        </div>
                        <div class="u-submenu-item">
                            车源管理item3
                        </div>
                        <div class="u-submenu-item">
                            车源管理item3
                        </div>
                    </div>
                </div>
                <div class="m-menu-item">
                    <div class="m-submenu-hd">设置<i class="iconfont icon-arrowright1"></i></div>
                    <div class="m-submenu-gp">
                        <div class="u-submenu-item">
                            设置item1
                        </div>
                        <div class="u-submenu-item">
                            设置item3
                        </div>
                        <div class="u-submenu-item">
                            设置item3
                        </div>
                    </div>
                </div>
            </div>
            
        </section><!-- 菜单 -->
    </div>
</template>

<script>

	export default {
        name: "sidebar",
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

<!-- 限定作用域 -->
<style lang="stylus" rel="stylesheet/stylus" scope>
    @import './sidebar.styl'
</style>
