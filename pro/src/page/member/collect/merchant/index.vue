<template>
    <div class="merchantCollect">

        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="车行收藏"
            >
            <div slot="content">
                
                <member-inner>
                    <div class="m-collect-wrap" v-if="mCollectList.length>=0">
                        <transition-group 
                            name="cdg-list" 
                            class="m-merchant-lst f__clearfix" tag="ul"
                            >
                            <template v-for="(item,index) in mCollectList">

                                <li class="m-item" v-bind:key="item">
                                    <a href="javascript:;" @click="enterCdg(item.id)" class="u-lk-box">
                                        <div class="m-face">
                                            <img :src="item.faceUrl" :alt="item.cdgName">
                                        </div><!-- 头像 -->
                                        <div class="m-info">
                                            <a class="u-close" @click.stop="delCdg(item.id,index)" title="取消收藏"><i class="iconfont icon-delete1"></i></a><!-- 删除 -->
                                            <div class="u-hd f__clearfix">
                                                <p class="u-cdg f__fl">
                                                    {{item.cdgName}}</p>
                                                <p class="u-name f__fl"><span class="u-attr">联系人：</span>{{item.userName}}</p>
                                            </div>
                                            <div class="u-grade f__clearfix">
                                                <p class="volume f__fl">
                                                    <span class="u-attr">成交数：</span><em class="vital">{{item.volume}}</em>单
                                                </p>
                                                <p class="grade f__fl">
                                                    <span class="u-attr">评分：</span><em class="vital">{{item.grade | gradeFormat}}</em>分
                                                </p>
                                            </div>
                                            <div class="u-address">
                                                <span class="u-attr">地址：</span>
                                                <em class="address">{{item.address | addressFormat}}</em>
                                            </div>
                                        </div><!-- 车商信息 -->
                                    </a>
                                </li>
                            </template>
                        </transition-group>
                    </div>

                    <not-content
                        v-if="mCollectList.length==0"
                        speak="您暂时还没有收藏任何车行，赶紧去别地瞅瞅吧!"
                        >
                    </not-content><!-- 缺省组件 -->

                </member-inner>

            </div><!-- 车行收藏内容 -->
        </member-layout>
        
    </div>
</template>

<script>


    // 获取数据的api
    import api from 'api/getData.js'
    // 引入系统变量
    import * as SYSTEM from 'api/system.js'
    // 工具类
    import {dataToJson} from "assets/js/util.js"
    // 收藏车行信息的构造类
    import {cdgClass} from "base/class/collect.js"

    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue'
    // 会员中心子内容组件
    import memberInner from 'components/layout/memberInner.vue' 
    // 会员中心缺省组件
    import notContent from 'components/member/notCon.vue' 

    export default {

        name: "merchantCollect",
        // 在当前模块注册组件
        components: {
            memberLayout,
            memberInner,
            notContent,
        },
        // 数据
        data() {
            return{
                userFace: require("assets/img/logos-pic2.png"),
                // 收藏的车商列表集合
                mCollectList: [],
            }
        },
        //生命周期,开始的时候
        created(){

        },
        mounted(){

        },
        activated(){
            // 获取我收藏的车行列表
            this.getMerchantCollect();
        },
        //退出的生命周期钩子
        deactivated(){

        },
        //数据侦听
        watch:{

        },
        // 自定义函数(方法)
        methods: {
            // 获取我收藏的车行列表
            getMerchantCollect(){
                let data = {
                    ActType: 'MyList',
                }
                api.myFavoriteCdg(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        if(res.data.length==0){
                            this.mCollectList = [];
                            return;
                        }
                        this.mCollectList = this._normalizeCdg(res.data);
                    }
                })
            },
            // 格式化车行信息列表
            _normalizeCdg(list) {
                let arr = []
                list.forEach(item => {
                    arr.push(new cdgClass(item));
                });
                return arr;
            },
            // 进入车行详情
            enterCdg(id){
                console.log("进入车行");
            },
            // 删除车行
            delCdg(id,index){
                let data = {
                    ActType: 'Delete',
                    SellerId: id,
                }
                api.myFavoriteCdg(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        // 删除对应车行，同步数据
                        this.mCollectList.splice(index, 1)
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '删除失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                })
            }
        },
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'
</style>
