<!-- 车商圈 -->

<template>
	<div class="dealerCircle">
        <section class="f__w1200">
            <gk-bread-crumb
                :crumbItems="crumbItems"
                ></gk-bread-crumb><!-- 面包屑组件 -->
            <div class="m-dealer-container">
                <div class="svg-dynamic">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                        <rect width="300" height="100"
                            style="fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)"/>
                    </svg>
                    
                </div><!-- svg动效 -->
                <div class="m-header">
                    <div>
                        <span>认证车店总数：{{dealerCDGTotal}}</span>
                        <span>今日新增：{{dealerCDGTotal}}</span>
                    </div>
                    <div>只看合作商</div>
                    <div class="hd-search-box">
                        <input class="u-ipt" type="text"
                            v-model="srhKeyword"
                            :placeholder="'可输入姓名 | 车行名 | 所在地 | 电话'" />
                        <i class="iconfont icon-search"></i>
                        <div class="u-borderAction"></div><!-- 边框线动效补充 -->
                    </div>

                </div><!-- 头部搜索区域 -->

                <div class="dealer-info-erea">
                    <ul class="dealer-lst f__clearfix">
                        <template v-for="(item,index) in dealerCDGList">
                            <li class="dealer-item">
                                <a href="javascript:;" class="u-box">
                                    <div class="front">
                                        <div class="avatar">
                                            <img :src="item.faceUrl" :alt="item.cdgName"/>
                                        </div><!-- 头像 -->
                                        <p class="line-info cdg-nmae">{{item.cdgName}}</p>
                                        <p class="line-info owner-info">清远市-{{item.nikeName}}</p>
                                        <div class="line-box"
                                            ><em class="on-sale-num" :class="{'single':+item.carCount<10}">{{item.carCount}}</em>
                                        </div>
                                        <span class="on-sale-txt">在售车辆</span>
                                    </div><!-- 正面 -->

                                    <div class="reverse">
                                        <div class="avatar">
                                            <img :src="item.faceUrl" :alt="item.cdgName"/>
                                        </div><!-- 头像 -->
                                        <div class="u-auType" v-if="!item.isPartner"
                                            :class="[item.authType=='个人车行'?'v1':'v2']">
                                            <template v-if="item.authType=='个人车行'">个人车商</template>
                                            <template v-else>企业车商</template>
                                        </div><!-- 认证类型 -->
                                        <div class="u-auType v3" v-else>合作商</div><!-- 认证类型 -->

                                        <div class="u-address">{{item.address | addressFormat2}}</div>

                                        <router-link class="u-btn enter" tag="a"
                                            :to="{path:'/merchantDetails',query:{cid:item.mid}}">进入店铺</router-link>
                                    </div><!-- 反面 -->
                                </a>
                            </li>
                        </template>
                    </ul>
                </div><!-- 车行信息 -->

                <div class="m-pagination">
                    <list-paging
                        :total="300"
                        :currPageNo="3"
                        :pageSize="35"
                        @currentPageChange="reRenderPage"
                        >
                    </list-paging><!-- 分页器 -->
                </div><!-- 分页容器 -->

            </div><!-- 车商圈容器 -->
        </section>
	</div>
</template>




<script>

    // 获取数据的api
    import api from 'api/getData.js'
    // 引入系统变量
    import * as SYSTEM from 'api/system.js'
    // vuex状态管理
    import { mapGetters,mapActions } from 'vuex'
    // 工具类
    import {dataToJson} from "assets/js/util.js"
    // dom操作类
    import * as geekDom from 'assets/js/dom.js'
    // 单个车店排名信息的构造类
    import {dealerInfo} from 'base/class/dealerCircle.js'


    // 面包屑组件
    import gkBreadCrumb from "components/common/gkBreadcrumb.vue"
    // 自己做的分页器
    import listPaging from "components/common/listPaging.vue"
    // 网站外层面包屑列表本地化资源
    import {crumbsInfo} from "api/localJson/homeCrumb.js"

	export default {
        name: "dealerCircle",
        // 在当前模块注册组件
        components:{
            gkBreadCrumb,
            listPaging,
        },
        // 数据
        data() {
            return{
                // 面包屑列表信息
                crumbItems: crumbsInfo['dealerCircle'],

                dealerCDGList: [],                       // 车店搜索结果 车店列表
                dealerCDGTotal : 0,                      // 车店总数量
                todayAddDealer: 0,                       // 今天新增认证车店数
                // 搜索关键词
                srhKeyword: "",
            }
        },
        // 生命周期,开始的时候
        created(){

        },
        // 当dom挂载到$el上的钩子事件
        mounted(){

        },
        activated(){
            // 获取车店搜索结果
            this.getDealerCDGList();
        },

        // 退出的生命周期钩子
        deactivated(){

        },

        // 数据侦听
        watch:{

        },

        // 属性计算
        computed:{

        },
        methods:{

            // 格式化车行列表
            _normalizeCdgList(list) {
                let arr = [];
                list.forEach((item,index) => {
                    arr.push(new dealerInfo(item));
                })
                return arr;
            },

            // 获取车行搜索结果
            getDealerCDGList(){
                let data = {
                    PageIndex: 1,
                    PageSize: 35,
                }
                api.carDealerCircleRanking(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.dealerCDGList = this._normalizeCdgList(res.data.CdgList);
                        this.todayAddDealer = res.data.TodayCnt;
                        this.dealerCDGTotal = res.data.Total;
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

            // 分页器重新渲染
            reRenderPage(pageno){
                console.log("分页器重新选择了分页",pageno)
            },
        }
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'
</style>
