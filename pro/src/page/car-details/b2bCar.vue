<template>
	<div class="b2bCarDetails">
	    <div class="g-doc">
            <div class="g-bd">
                <section class="f__w1200">

                    <gk-bread-crumb
                        :crumbItems="crumbItems"
                        ></gk-bread-crumb><!-- 面包屑组件 -->

                    <div class="m-mn-hd f__clearfix">
                        <div class="f__fl" v-if="carImgData.imgItems">
                            <fc-slide :carImgData="carImgData"></fc-slide>
                        </div>

                        <div class="m-mn-info f__fr">
                            <div class="m-tit">{{basicInfo.title}}</div>
                            <div class="m-pic f__clearfix">
                                <template v-if="!hasLogin&&!hasAuth=='1'">
                                    <span class="u-txt">未登录</span>
                                </template>
                                <template v-else-if="hasAuth!='1'">
                                    <span class="u-txt">您尚未通过认证</span>
                                </template>
                                <template v-else>
                                    <span class="u-price">￥<em class="vital">{{basicInfo.price| priceFormat(2)}}</em>万</span>
                                </template>

                                <span class="u-del">零售价：{{basicInfo.retailPrice | priceFormat(2)}}万</span>

                                <p class="u-view" v-if="otherInfo.browseCount&&otherInfo.browseCount>0">
                                    <i class="iconfont icon-yuedu"></i>{{otherInfo.browseCount}}
                                </p>
                            </div><!-- 价格 -->

                            <div class="m-des">
                                <div class="m-lst-wrap">
                                    <ul class="m-des-lst f__clearfix">
                                        <li class="u-item">
                                            <p class="u-tit" v-if="basicInfo.mileage">{{basicInfo.mileage | mileFn(2)}}</p>
                                            <p class="u-tit" v-else>暂无数据</p>
                                            <p class="u-des">表显里程</p>
                                        </li>
                                        <li class="u-item">
                                            <p class="u-tit" v-if="basicInfo.transferTimes!='0'">{{basicInfo.transferTimes}}次</p>
                                            <p class="u-tit" v-else>暂无数据</p>
                                            <p class="u-des">过户次数</p>
                                        </li>
                                        <li class="u-item">
                                            <p class="u-tit" v-if="basicInfo.liter">{{basicInfo.liter |literFn}}</p>
                                            <p class="u-tit" v-else>暂无数据</p>
                                            <p class="u-des">综合油耗</p>
                                        </li>
                                        <li class="u-item">
                                            <p class="u-tit">{{basicInfo.plateDate | dateFn}}</p>
                                            <p class="u-des">上牌时间</p>
                                        </li>
                                        <li class="u-item">
                                            <p class="u-tit" v-if="basicInfo.plateInProvince&&basicInfo.plateInCity">
                                                <template>{{basicInfo.plateInProvince | cityFn}}</template><!--
                                                --><template v-if="basicInfo.plateInProvince!=basicInfo.plateInCity"
                                                    >{{basicInfo.plateInCity | cityFn}}
                                                </template>
                                            </p>
                                            <p class="u-tit" v-else>暂无数据</p>
                                            <p class="u-des">牌照归属</p>
                                        </li>
                                        <li class="u-item">
                                            <p class="u-tit" v-if="basicInfo.serviceType">{{basicInfo.serviceType}}</p>
                                            <p class="u-tit" v-else>暂无数据</p>
                                            <p class="u-des">使用性质</p>
                                        </li>
                                    </ul>
                                </div>
                            </div><!-- 产品描述 -->

                            <div class="m-vote">

                                <div class="progress-container">
                                    <div class="top f__clearfix">
                                        <span class="text-lt">这辆车价格很不错</span>
                                        <div class="pk-text"
                                            ><em class="p-txt">P</em>
                                            <em class="k-txt">K</em>
                                        </div>
                                        <span class="text-rt">这辆车价格贼高</span>
                                    </div><!-- 头部信息 -->
                                    <div class="progress-box">
                                        <section class="vup-progress"
                                            :style="{width: (+lowPageWeight)+'%'}"
                                            ></section>
                                        <div class="decorate-wrapper">
                                            <div class="middle-decorate"
                                            :style="{left: (+lowPageWeight)+'%'}"
                                            ></div><!-- 装饰物 -->
                                        </div>
                                        <section class="vdown-progress"
                                            :style="{width: (-lowPageWeight+100)+'%'}"
                                            ></section>
                                    </div><!-- 进度条容器 -->
                                    <div class="volume f__clearfix">
                                        <span class="volume-lt">{{judgeCarInfo.low}}</span>
                                        <span class="volume-rt">{{judgeCarInfo.high}}</span>
                                    </div><!-- 投票量 -->
                                </div>

                                <template v-if="judgeCarInfo.hasJudged">
                                    <a class="u-btn vote-up"
                                        :class="{'active':judgeCarInfo.hasJudged&&judgeCarInfo.myJudge==-1}"
                                        @click="putHasJudged()"
                                        ></a><!-- 合适，低，赞 -->
                                    <a class="u-btn vote-down"
                                        :class="{'active':judgeCarInfo.hasJudged&&judgeCarInfo.myJudge==1}"
                                        @click="putHasJudged()"
                                        ></a><!-- 价太高，踩 -->
                                </template>
                                <template v-else>
                                    <a class="u-btn vote-up"
                                        :class="{'active':judgeCarInfo.hasJudged&&judgeCarInfo.myJudge==-1}"
                                        @click="putCarPriceJudge(-1)"
                                        ></a><!-- 合适，低，赞 -->
                                    <a class="u-btn vote-down"
                                        :class="{'active':judgeCarInfo.hasJudged&&judgeCarInfo.myJudge==1}"
                                        @click="putCarPriceJudge(1)"
                                        ></a><!-- 价太高，踩 -->
                                </template>
                            </div><!-- 投票 -->

                            <div class="m-opra f__clearfix">
                                <template v-if="!hasLogin"
                                    >
                                    <a class="u-btn v2"
                                        @click="noLoginByCollect()"
                                        >收藏车辆</a>
                                </template>
                                <template v-else>
                                    <a class="u-btn v2"
                                        v-if="!otherInfo.isInFavorite"
                                        @click="inMyCollect(1,basicInfo.id)"
                                        >收藏车辆</a>
                                    <a href="javascript:;" class="u-btn cancel"
                                        v-if="otherInfo.isInFavorite"
                                        @click="inMyCollect(2,basicInfo.id)"
                                        >取消收藏</a>
                                </template>

                                <template v-if="!hasLogin"
                                    >
                                    <a class="u-btn"
                                        v-if="!otherInfo.isInCart"
                                        @click="noLoginByInCart()"
                                        >加入购物车</a>
                                    <a href="javascript:;" class="u-btn not"
                                        v-if="otherInfo.isInCart">已加入购物车</a>
                                </template>
                                <template v-else>
                                    <a class="u-btn"
                                        v-if="!otherInfo.isInCart"
                                        @click="inShopingCart(basicInfo.id)"
                                        >加入购物车</a>
                                    <a href="javascript:;" class="u-btn not"
                                        v-if="otherInfo.isInCart">已加入购物车</a>
                                </template>

                                <template v-if="hasLogin"
                                    >
                                    <template v-if="!hasAuth=='1'||!hasCredit"
                                    >
                                        <a class="u-btn v3"
                                            v-if="basicInfo.status=='1'"
                                            @click="addOrderPrivilege()"
                                            >秒杀下单
                                        </a>
                                        <a href="javascript:;" class="u-btn not"
                                            v-else
                                            >秒杀下单
                                        </a>
                                    </template>
                                    <template v-else>
                                        <a class="u-btn v3"
                                            v-if="basicInfo.status=='1'"
                                            @click="addOrder(basicInfo.id)"
                                            >秒杀下单
                                        </a>
                                        <a href="javascript:;" class="u-btn not"
                                            v-else
                                            >秒杀下单
                                        </a>
                                    </template>
                                </template>
                            </div><!-- 操作 -->

                            <div class="m-share" v-if="isShareShow">
                                <span class="u-attr">车辆分享至：</span>
                                <gk-share class="share-box"
                                    :options="shareOptions"></gk-share>
                            </div><!-- 分享 -->

                            <div class="m-offer-mobile">
                                <transition name="moveUpFade">
                                    <section class="m-details-unfold" v-show="isShowDetailsUnfold">
                                        <div class="u-pic">
                                            <img :src="carDetailsEwmIMG" alt="用手机查看车" />
                                            <i class="decorate"></i><!-- 装饰物 -->
                                        </div>
                                    </section><!-- 车详情二维码展开 -->
                                </transition>

                                <a class="u-btn look"
                                    @mouseover="usePhoneLook(true)" @mouseleave="usePhoneLook(false)">
                                    <i class="iconfont icon-erweima3"></i>
                                    <span class="txt">使用手机查看</span>
                                </a>

                                <a class="u-btn offer"
                                    @click="openBidPopup()">
                                    <i class="ico"></i>
                                    <span class="txt">向ta出价</span>
                                </a>
                            </div><!-- 报价，及使用手机看 -->

                        </div><!-- 主要信息 -->
                    </div><!-- 主要的头部信息 -->

                    <div class="m-basic-info f__boxClearM">
                        <div class="box-header">
                            <i class="icon-block"></i><h3>基本信息</h3>
                        </div><!-- 标题 -->
                        <div class="basic-con">
                            <ul class="info-lst f__clearfix">
                                <li class="grid-6">
                                    <span class="attr">上牌日期：</span>
                                    <span class="data" v-if="basicInfo.plateDate">{{basicInfo.plateDate | dateDayFormat}}</span>
                                    <span class="data" v-else>暂无数据</span>
                                </li>
                                <li class="grid-6">
                                    <span class="attr">排放标准：</span>
                                    <span class="data" v-if="basicInfo.dischargeStandard">{{basicInfo.dischargeStandard | dateDayFormat}}</span>
                                    <span class="data" v-else>暂无数据</span>
                                </li>
                                <li class="grid-6">
                                    <span class="attr">汽车排量：</span>
                                    <span class="data" v-if="basicInfo.liter">{{basicInfo.liter |literFn}}</span>
                                    <span class="data" v-else>暂无数据</span>
                                </li>
                                <li class="grid-6">
                                    <span class="attr">过户次数：</span>
                                    <span class="data">{{basicInfo.transferTimes}}次</span>
                                </li>
                                <li class="grid-6">
                                    <span class="attr">使用性质：</span>
                                    <span class="data" v-if="basicInfo.serviceType">{{basicInfo.serviceType}}</span>
                                    <span class="data" v-else>暂无数据</span>
                                </li>
                                <li class="grid-6">
                                    <span class="attr">车辆颜色：</span>
                                    <span class="data" v-if="basicInfo.color">{{basicInfo.color}}</span>
                                    <span class="data" v-else>暂无数据</span>
                                </li>
                                <li class="grid-6">
                                    <span class="attr">真实里程数：</span>
                                    <span class="data" v-if="basicInfo.mileage">{{basicInfo.mileage | mileFn(2)}}</span>
                                    <span class="data" v-else>暂无数据</span>
                                </li>
                                <li class="grid-6">
                                    <span class="attr">车辆所在地：</span>
                                    <span class="data" v-if="basicInfo.inProvince">{{basicInfo.inProvince}}{{basicInfo.inCity}}</span>
                                    <span class="data" v-else>暂无数据</span>
                                </li>
                                <li class="grid-6">
                                    <span class="attr">牌照归属地：</span>
                                    <span class="data" v-if="basicInfo.plateInProvince"
                                        >{{basicInfo.plateInProvince}}{{basicInfo.plateInCity}}</span>
                                    <span class="data" v-else>暂无数据</span>
                                </li>
                                <li class="grid-6">
                                    <span class="attr">有无交强险：</span>
                                    <span class="data">{{basicInfo.compulsoryData?"有":"无"}}</span>
                                </li>
                                <li class="grid-20 f__clearfix">
                                    <div class="u-block-info">
                                        <span class="attr">车商店铺名称：</span>
                                        <span class="data">{{otherInfo.cdgName}}</span>
                                    </div>
                                    <div class="box-tip businessmen-note">
                                        <div class="tip-content fold" v-if="isShowDescMore"
                                            ><p class="txt">{{basicInfo.desc.substr(0,158)+"..."}}</p>
                                            <a class="u-lk unfold" @click="unfoldDescMore(false)"><pre>&darr;</pre>展开更多</a>
                                        </div>
                                        <div class="tip-content" v-if="!isShowDescMore"
                                            >{{basicInfo.desc||'车主暂未对该车源进行描述'}}
                                            <div class="link-wrap f__clearfix"
                                                v-if="basicInfo.desc&&basicInfo.desc.length>158">
                                                <a class="u-lk fold-lk" @click="unfoldDescMore(true)"
                                                    ><pre>&uarr;</pre>收起</a>
                                            </div>
                                        </div>
                                        <span class="tip-arrow"></span><!-- 箭头装饰物 -->
                                    </div><!-- 车商描述 -->
                                </li>
                            </ul>
                        </div><!-- 信息内容 -->
                    </div><!-- 车辆信息 -->

                    <div class="m-supplement-info f__boxClearM" v-if="carDetails&&carDetails.length>0">
                        <div class="box-header">
                            <i class="icon-block"></i><h3>车况内容补充</h3>
                        </div><!-- 标题 -->
                        <div class="supplement-con">
                            <ul class="info-lst f__clearfix">
                                <template v-for="item in carDetails">
                                    <li>
                                        <span class="attr">{{item.label}}：</span>
                                        <span class="data">{{item.desc}}</span>
                                    </li>
                                </template>
                            </ul>
                        </div><!-- 信息内容 -->
                    </div><!-- 车辆信息 -->

                    <div class="m-carPhoto f__boxClearM"
                        v-if="carImgData.imgItems&&carImgData.imgItems.length>=2"
                        >
                        <div class="box-header">
                            <i class="icon-block"></i><h3>车辆图片</h3>
                        </div><!-- 标题 -->
                        <div class="m-photo-con">
                            <ul class="m-photo-lst f__clearfix">
                                <template v-for="(item,index) in carImgData.imgItems">
                                    <li class="m-item">
                                        <div class="u-pic">
                                            <img ondragstart="return false" v-lazy="item.fileUrl" :alt="item.title" />
                                        </div>
                                    </li>
                                </template>
                            </ul>
                        </div><!-- 图片内容 -->
                    </div><!-- 车辆图片信息 -->

                    <div class="m-dealer f__boxClearM">
                        <div class="m-box-hd">
                            <h4>店铺信息</h4>
                        </div><!-- 标题 -->
                        <div class="store-info f__clearfix">
                            <div class="u-info-lt">

                                <router-link :to="{path:'/merchantDetails',query:{cid:basicInfo.mid}}" class="store-pic" tag="a">
                                    <img :src="otherInfo.faceImgUrl" :alt="otherInfo.cdgName" />
                                </router-link>

                                <div class="store-basic">
                                    <div class="line-tit">
                                        <router-link :to="{path:'/merchantDetails',query:{cid:basicInfo.mid}}" class="name" tag="a"
                                            >{{otherInfo.cdgName}}</router-link>
                                    </div>

                                    <div class="line-box">
                                        <span><em class="vital">{{otherInfo.onSellCount}}</em>在售</span>
                                        <i class="separated">|</i>
                                        <span>认证类型：{{theAuthType}}</span>
                                    </div>

                                    <div class="line-box btnWrap">
                                        <router-link class="u-btn" tag="a"
                                            :to="{path:'/merchantDetails',query:{cid:basicInfo.mid}}"
                                            >进入该店铺
                                        </router-link>

                                        <template v-if="!hasLogin"
                                            >
                                            <a class="u-collect"
                                                @click="noLoginByAttention()">收藏车店</a>
                                        </template>
                                        <template v-else>
                                            <a class="u-collect" v-if="!cdgIsFavorite"
                                                @click="setAttention(1,basicInfo.mid)">收藏车店</a>
                                            <a class="u-collect cancel" v-else
                                                @click="setAttention(2,basicInfo.mid)">取消收藏</a>
                                        </template>
                                    </div>
                                </div>
                            </div><!-- 左侧主要信息 -->

                            <div class="u-info-rt">
                                <ul>
                                    <li>
                                        <i class="adorn"></i>
                                        <span class="attr">电话：</span>
                                        <template v-if="!hasLogin"
                                                >
                                            <p class="data">{{otherInfo.tel | telFormat}}</p>
                                        </template>
                                        <template v-else>
                                            <p class="data">{{otherInfo.tel}}</p>
                                        </template>
                                    </li>
                                    <li>
                                        <i class="adorn"></i>
                                        <span class="attr">地址：</span>
                                        <p class="data">{{otherInfo.address | addressFormat2}}</p>
                                    </li>
                                    <li class="desc">
                                        <i class="adorn"></i>
                                        <span class="attr">店铺描述：</span>
                                        <p class="data desc"
                                            >{{otherInfo.desc}}</p>
                                    </li>
                                </ul>
                            </div><!-- 右侧信息 -->
                        </div><!-- 店铺信息 -->
                    </div><!-- 车商信息 -->

                    <div class="m-comment-car">
                        <div class="m-box-hd">
                            <h4>大家来留言</h4>
                        </div><!-- 标题 -->
                        <div class="m-speak-con">
                            <div class="put-comment">
                                <form class="new-comment">
                                    <a class="avatar">
                                        <img :src="memberData.imgUrl" :alt="memberData.name" />
                                    </a><!-- 头像 -->
                                    <textarea placeholder="写下您的留言..." maxlength="150"
                                        @focus="FCommentFocus()"
                                        v-model="FCommentContent">
                                    </textarea>
                                    <div class="write-function-box f__clearfix"
                                        v-show="isStartComment">
                                        <div class="tips">
                                            <span><em>Ctrl+回车键</em>发表</span><!-- Ctrl+回车键 发表 -->
                                        </div>
                                        <a class="u-btn okay" @click="FPutComment">发表</a><!-- 发送 -->
                                        <a class="u-btn cancel" @click="FCommentCloseBox">取消</a><!-- 取消 -->
                                    </div>
                                </form>
                            </div><!-- 发表留言 -->
                            <div class="comment-container" ref="ctContainer">
                                <div class="top">
                                    <span v-if="carCommentList.length == 0">留言</span>
                                    <span v-else>共{{resultPage.totalPage}}条留言</span>
                                    <a class="show-comment-btn" @click="showCommentList=!showCommentList">
                                        <template v-if="showCommentList"><i class="iconfont unshow icon-yincang1"></i>隐藏留言</template>
                                        <template v-else><i class="iconfont icon-yincang"></i>显示留言</template>
                                    </a>
                                </div>
                                <template v-if="showCommentList">
                                    <div class="comment-lst" v-if="carCommentList.length > 0">
                                        <template v-for="(item,index) in carCommentList">
                                            <div class="comment-item">
                                                <div class="comment-main">
                                                    <div class="author">
                                                        <a class="avatar">
                                                            <img :src="item.imgUrl" :alt="item.name" />
                                                        </a>
                                                        <div class="info">
                                                            <div class="name">{{item.name}}</div>
                                                            <div class="time">{{item.time | formatDate}}</div>
                                                        </div>
                                                    </div>
                                                    <div class="info-wrap">
                                                        <p class="speak">{{item.content}}</p>
                                                        <div class="tool-group f__clearfix">
                                                            <a class="u-lk like" @click="commentLike(item.id,index,item.upvoted)
                                                                " :class="{'active':item.upvoted==1}">
                                                                <i class="iconfont icon-boshiweb_yizan"
                                                                    v-if="item.upvoted==1"></i><!-- 已赞 -->
                                                                <i class="iconfont icon-boshiweb_weizan"
                                                                    v-else></i><!-- 点赞 -->
                                                                <span>{{item.upvoteCount}}人赞</span>
                                                            </a><!-- 点赞 -->
                                                            <a class="u-lk reply" @click="putRlyComment(1,item.isShowPanel,index,item.id)">
                                                                <i class="iconfont icon-huifu3"></i>
                                                                <span>回复</span>
                                                            </a><!-- 回复 -->
                                                            <a class="u-lk delete" v-show="memberData.id==item.memberId" @click="deleteComment(item.id)"
                                                                >删除
                                                            </a>
                                                        </div><!-- 工具组 -->
                                                    </div>
                                                </div>
                                                <div class="sub-comment-lst">
                                                    <template  v-if="item.rlyList.length>0" v-for="(rlyItem,rlyIndex) in item.rlyList">
                                                        <div class="sub-comment-item">
                                                            <p class="info">
                                                                <a href="javascript:;" class="author-name">{{rlyItem.name}}</a>：
                                                                <span>
                                                                    <a href="javascript:;" class="author-name" 
                                                                    v-if="rlyItem.replyCommentId!=item.id">{{'@'+rlyItem.replyName}}</a>
                                                                    <em>{{rlyItem.content}}</em>
                                                                </span>
                                                            </p>
                                                            <div class="sub-tool-group f__clearfix">
                                                                <span class="sub-time">{{rlyItem.time | formatDate}}</span>
                                                                <a class="u-lk sub-reply" @click="putRlyComment(2,item.isShowPanel,index,rlyItem.id,rlyIndex,rlyItem.name)">
                                                                    <i class="iconfont icon-huifu3"></i>
                                                                    <span>回复</span>
                                                                </a>
                                                                <a class="u-lk delete" v-show="memberData.id==rlyItem.memberId" @click="deleteComment(rlyItem.id)"
                                                                >删除
                                                            </a>
                                                            </div>
                                                        </div>
                                                    </template>

                                                    <div class="more-comment">
                                                        <a class="add-comment-btn" @click="putRlyComment(1,item.isShowPanel,index,item.id)">
                                                            <template v-if="item.isShowPanel">
                                                                <i class="iconfont icon-shouqi pack-up"></i>
                                                                <span>收起评论框</span>
                                                            </template>
                                                            <template v-else>
                                                                <i class="iconfont icon-bianji5"></i>
                                                                <span>添加新评论</span>
                                                            </template>
                                                        </a>
                                                    </div><!-- 添加新评论按钮 -->

                                                    <div class="sub-new-comment" v-show="item.isShowPanel">
                                                        <form>
                                                            <textarea ref="rlyCommentTexearea" placeholder="写下您的留言..." maxlength="150"
                                                                v-model="rlyCommentContent"></textarea>
                                                            <div class="write-function-box f__clearfix">
                                                                <div class="tips">
                                                                    <span><em>Ctrl+回车键</em>发表</span><!-- Ctrl+回车键 发表 -->
                                                                </div>
                                                                <a class="u-btn okay" @click="putComment('2')">发表</a><!-- 发送 -->
                                                                <a class="u-btn cancel" @click="rlyCommentCloseBox">取消</a><!-- 取消 -->
                                                            </div>
                                                        </form>
                                                    </div><!-- 子回复评论 -->
                                                </div><!-- 子回复评论列表 -->

                                            </div>
                                        </template>
                                    </div><!-- 评论列表 -->

                                    <div class="pagination" v-if="resultPage.totalPage > resultPage.pageSize">
                                        <el-pagination
                                            @current-change="handleCurrentChange"
                                            :current-page.sync="resultPage.currentPage"
                                            :page-size="resultPage.pageSize"
                                            layout="prev, pager, next"
                                            :total="resultPage.totalPage"
                                            class="el-page">
                                        </el-pagination>
                                    </div><!-- 评论分页 -->
                                </template>

                                <div class="no-data"  v-if="carCommentList.length == 0"
                                    >暂时还没有人评论这辆车，说说您独特的见解吧~~</div>

                                <div class="tips-show" v-if="carCommentList.length > 0 && !showCommentList"
                                    >默认隐藏留言信息，点击右上角的 ‘显示留言’ 可显示留言列表哟 ~~
                                </div>
                            </div><!-- 评论列表 -->

                        </div>
                    </div><!-- 众人评车 -->

                    <div class="m-selling-car f__boxClearM">
                        <div class="m-box-hd">
                            <h4>店铺在售车源</h4>
                            <template v-if="otherInfo.onSellCount>5">
                                <router-link class="view-more" tag="a"
                                    :to="{path:'/merchantDetails',query:{cid:basicInfo.mid}}"
                                    >查看更多
                                </router-link>
                            </template>
                        </div><!-- 标题 -->
                        <div class="m-onSale-con">
                            <template v-if="onSaleCarList&&onSaleCarList.length>0">
                                <on-sale-list
                                    :carList="onSaleCarList"
                                    :loginStatus="loginStatus"
                                    :hasAuth= "hasAuth"
                                    >
                                </on-sale-list>
                            </template>
                        </div>
                    </div><!-- 店铺在售车源 -->

                    <div class="m-process f__boxClearM">
                        <div class="box-header">
                            <i class="icon-block"></i><h3>购车流程</h3>
                        </div><!-- 标题 -->
                        <div class="u-pic">
                            <img ondragstart="return false" :src="buyCarFlowImg" alt="购车流程图" />
                        </div>
                    </div><!-- 购车流程 -->

                    <div class="m-remd">

                        <div class="box-header">
                            <i class="icon-block"></i><h3>相似推荐</h3>
                        </div><!-- 标题 -->

                        <div class="m-lst-gp-b">
                            <ul class="m-lst f__clearfix"
                                v-if="similarList&&similarList.length>0">
                                <remd-list-box
                                    :carList="similarList"
                                    >
                                </remd-list-box>
                            </ul>
                            <ul class="m-lst f__clearfix"
                                v-else>
                                <remd-list-box
                                    :carList="b2bCarList"
                                    >
                                </remd-list-box>
                            </ul>
                        </div><!-- 列表组b -->
                    </div><!-- 相似推荐 -->

                </section><!-- 1200px布局 -->

                <div class="m-bid-wrapper" v-if="isShowBidPopup">
                    <bid-popup
                        :ownerFixedPrice="basicInfo.price"
                        :hasAuth="hasAuth"
                        :oldPriceInfo="myHistoryBid"
                        @putBidPopup="putBidPopup"
                        @cancelBidPopup="cancelBidPopup"></bid-popup>
                </div><!-- 我要出价 -->

            </div><!-- 网页主体 -->
		</div>
	</div>
</template>


<script>

    // 引入jq
    import $ from "jquery"
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
    // 用户信息的构造类
    import {memberInfo} from 'base/class/member.js'

    // 车行信息的构造类
    import {basicInfo,carOtherDetails,fileInfoList,otherInfo} from 'base/class/carDetails.js'
    // 在售车源信息的构造类
    import {onSaleCarInfo} from "base/class/carInfo.js"
    // 评论信息的构造类
    import {commentClass,judgeInfo} from "base/class/comment.js"

    // 网站外层面包屑列表本地化资源
    import {crumbsInfo} from "api/localJson/homeCrumb.js"
    // 面包屑组件
    import gkBreadCrumb from "components/common/gkBreadcrumb.vue"

    // 双向控制焦点图组件
    import fcSlide from "components/slide/fc_slide.vue"

    // b2b车辆信息构造类
    import {b2bCarInfo} from "base/class/carInfo.js"
    // 相似推荐信息列表盒子
    import remdListBox from "components/boxLayout/remdListBox.vue"

    // 社会分享组件
    import gkShare from "components/common/gkShare.vue"
    // 车店在售车源列表
    import onSaleList from "components/boxLayout/onSaleList.vue"
    // 出价弹出组件
    import bidPopup from "components/common/bidPopup.vue"

    // 引入二维码转换器
    import QRCode from 'qrcode';

    var wx = require('weixin-js-sdk');

    export default {
        name: "b2bCarDetails",
        // 在当前模块注册组件
        components:{
            gkBreadCrumb,
            fcSlide,
            remdListBox,
            gkShare,
            onSaleList,
            bidPopup,
        },
        // 数据
        data() {
            return{

                memberData: new memberInfo({}),            //用户信息

                isShareShow: false,    // 分享组件显示隐藏
                shareOptions: {},      // 分享组件配置

                // 是否登录
                hasLogin: "",
                // 是否认证
                hasAuth: "",
                // 是否有足额的信誉保证金
                hasCredit: "",

                // 车辆ID
                carId: 0,
                // 流程图
                buyCarFlowImg: require("assets/img/img-flow.png"),

                // 车辆基本信息
                basicInfo:{},

                // 车况信息列表
                carDetails: [],

                // 文件列表
                fileInfoList:[],
                // 其他信息
                otherInfo:{},

                // 车辆图片信息
                carImgData:{
                    merchantName : "暂无数据",
                    imgItems:[]
                },

                // 相似推荐列表
                similarList: [],
                // 车辆列表
                b2bCarList: [],
                // 店铺在售车源
                onSaleCarList: [],
                // 是否收藏车店
                cdgIsFavorite: false,

                // 评论总条数
                carCommentListTotal: 0,
                // 评论列表
                carCommentList: [],

                // 是否开始评论
                isStartComment: false,
                // 评论的内容
                FCommentContent: "",

                // 回复评论的内容
                rlyCommentContent: "",
                // 回复评论打开的面板类型  , 0未打开,1父回复按钮触发,2子回复按钮触发
                rlyCommentPanelType: 0,
                // 回复面板打开的当前索引
                currRlyPanelIndex: -1,
                // 回复子面板打开的索引 
                rlyCommentPanelIndex: -1,
                // 回复评论的Id
                rlyCommentId: "",

                // 是否显示全部的评论信息
                showCommentList: false,


                /**
                  * @description 结果集分页信息
                  */
                resultPage:{
                    currentPage : 1,
                    pageSize : SYSTEM.COMMENT_RESULE_PAGE_SIZE,
                    totalPage : 0
                },

                // 价格评判信息
                judgeCarInfo: {},
                // 计算评低价的占有率
                lowPageWeight: 50,

                // 显示用手机看
                isShowDetailsUnfold: false,
                // 车辆详情手机二维码
                carDetailsEwmIMG: "",

                // 显示店铺详情的更多
                isShowDescMore: false,

                // 是否显示出价弹出框
                isShowBidPopup: false,

                // 我的历史出价
                myHistoryBid: {},
            }
        },
        //生命周期,开始的时候
        created(){

        },
        mounted(){

        },
        activated(){

            // 获取hash 带参中的车辆ID
            this.carId = this.$router.currentRoute.query.CarId;

            // 获取车辆信息
            this.getCarDetailsInfo();

            // 获取车辆列表信息
            this.getCarList();

            // 获取用户信息
            this.getMemberInfo();

            // 获取车辆留言列表
            this.getCarCommentList();

            // 获取评价信息
            this.getJudgeInfo();

            // 获取车辆详情手机链接二维码
            this.getMobileEwmIMG();

        },
        //退出的生命周期钩子
        deactivated(){
            // 重置
            this.reset();
        },
        // 数据侦听
        watch:{

            // 侦听路由变化
            $route (to, from) {

                // if(to.path=="/b2bCar"){
                if(to.path==from.path){

                    // 分享组件显示隐藏
                    this.isShareShow = false;
                    this.shareOptions = {};

                    // 获取hash 带参中的车辆ID
                    this.carId = to.query.CarId;
                    // 获取车辆信息
                    this.getCarDetailsInfo();
                    // 获取车辆列表信息
                    this.getCarList();
                }else{
                    this.$destroy();
                }
            },

            // 侦听登录状态
            loginStatus(val){
                if(val){
                    // 获取用户信息
                    this.getMemberInfo();
                    this.getCarDetailsInfo();
                }else{
                    this.memberData = null;
                }
            },

        },
        // 属性计算
        computed:{

            ...mapGetters(['loginStatus']),

            // 面包屑列表信息
            crumbItems(){
                if(this.basicInfo){
                    return crumbsInfo['b2bCar'](this.basicInfo.title)
                }
            },

            theAuthType(){
                if(this.otherInfo.authType=="个人车行"){
                    return "个人车商";
                }else if(this.otherInfo.authType=="企业车行"){
                    return "企业车商";
                }
            }

        },
        // vue实例方法
        methods:{

            ...mapActions(['getMyShoppingNumber']),

            // 格式化用户信息
            _normalizeMember(data) {
                return new memberInfo(data);
            },
            // 获取用户信息
            getMemberInfo(){
                if(!this.loginStatus) return;

                let data = {}
                api.getMyMemberInfo(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.memberData = this._normalizeMember(res.data);
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

            // 判断是不是下单的资格
            addOrderPrivilege(){

                if(!this.hasAuth=='1'&&!this.hasCredit){
                    this.$confirm('尊贵的用户，您好！通过认证并交纳一定的保证金，方可在我司平台办理业务，谢谢！', '您尚未通过认证', {
                        confirmButtonText: '前往认证',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        // 前往车行认证页面
                        this.$router.push({path:'/member/applyHome'});
                    }).catch(() => {

                    });
                }else if(!this.hasCredit){
                    this.$confirm('尊贵的用户，您好！您的保证金余额不足'+SYSTEM.MIN_CREDIT_GOLD+'元，无法正常下单，请前往充值！', '保证金不足', {
                        confirmButtonText: '前往充值',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        // 前往保证金充值页面
                        this.$router.push({path:'/member/recharge',query:{type:2}});
                    }).catch(() => {

                    });
                }

            },

            // 收藏车辆
            noLoginByCollect(){
                this.$notify({
                    title: '您尚未登录',
                    message: '登录后可进行收藏车辆操作',
                    type: 'error',
                    duration: 2000,
                });
            },

            // 加入购物车
            noLoginByInCart(){
                this.$notify({
                    title: '您尚未登录',
                    message: '登录后可进行加入购物车操作',
                    type: 'error',
                    duration: 2000,
                });
            },

            // 收藏车店的未登录
            noLoginByAttention(){
                this.$notify({
                    title: '您尚未登录',
                    message: '登录后可进行收藏车店操作',
                    type: 'error',
                    duration: 2000,
                });
            },

            // 格式化车辆基本信息
            _normalizeBasicInfo(data) {
                return new basicInfo(data);
            },

            // 格式化车辆信息补充
            _normalizeCarOtherInfo(list) {
                let arr = [];
                list.forEach((item,index) => {
                    arr.push(new carOtherDetails(item));
                })
                return arr;
            },

            // 格式化车辆文件列表
            _normalizeFileList(list) {
                let arr = [];
                list.forEach((item,index) => {
                    arr.push(new fileInfoList(item));
                })
                return arr;
            },

            // 格式化车辆其他信息
            _normalizeOtherInfo(data) {
                return new otherInfo(data);
            },

            // 微信分享SDK
            WXShareSDK(obj){

                var WxApiArr = ['onMenuShareAppMessage','onMenuShareTimeline','onMenuShareWeibo','onMenuShareQQ','onMenuShareQZone']

                var curLink = window.location.href.split("#")[0];
                // 获取微信jsApi签名
                api.getWxApiSign({url:curLink}).then((res) => {
                    let data = res.data;
                    if(res.code==SYSTEM.CODE_IS_OK){
                        wx.config({
                            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: data.appId, // 必填，公众号的唯一标识
                            timestamp: data.timestamp, // 必填，生成签名的时间戳
                            nonceStr: data.nonceStr, // 必填，生成签名的随机串
                            signature: data.signature,// 必填，签名，见附录1
                            jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        });
                    }
                });

                // 需要检测的JS接口列表是否成功
                wx.checkJsApi({
                    jsApiList: [].concat(WxApiArr),  // 需要检测的JS接口列表，所有JS接口列表见附录2,
                    success: function(res) {
                        console.log("检测api",res)
                        // 以键值对的形式返回，可用的api值true，不可用为false
                        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                        // console.log("支持分享到朋友圈")
                    }
                });

                // 微信分享的数据
                var wxData = {
                    title: obj.title||document.title,   // 分享标题
                    desc: obj.content||document.title,  // 分享内容
                    link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: obj.pic, // 分享图标
                };


                // 分享的回调函数
                var wxCallbacks={
                    success:function(){
                        // 用户确认分享后执行的回调函数
                    },
                    cancel:function(){
                        // 用户取消分享后执行的回调函数
                    },
                    fail:function(){
                        //接口调用失败时执行的回调函数
                    },
                    complete:function(){
                        // 接口调用完成时执行的回调函数，无论成功或失败都会执行。
                    },
                    trigger:function(){
                        //监听Menu中的按钮点击时触发的方法，该方法仅支持Menu中的相关接口。 
                    }
                };

                var newShareOptions = Object.assign(wxData,wxCallbacks);

                // 微信配置就绪
                wx.ready(function(){
                    console.log("准备就绪")
                    for(let i = 0; i<WxApiArr.length; i++){
                        wx[i](newShareOptions);
                    }
                });

                // 微信借口错误
                wx.error(function(res){
                    console.log(res);
                });

            },


            // 获取车辆详情信息
            getCarDetailsInfo(){
                var data = {
                    CarId : this.carId,
                }
                api.getCarDetalis(data).then((res) => {
                    if(res.code==SYSTEM.CODE_IS_OK){

                        // 获取车辆详情基本信息
                        this.basicInfo = this._normalizeBasicInfo(res.data.CarInfo)
                        // 车辆信息补充
                        if(res.data.CarDetails.length==0){
                            this.carDetails = []
                        }else{
                            this.carDetails = this._normalizeCarOtherInfo(res.data.CarDetails)
                        }


                        // 车辆异常状态提示
                        this.abnormalStatusTips(this.basicInfo.status);

                        // 获取车辆图片列表信息
                        this.fileInfoList = this._normalizeFileList(res.data.CarFiles)
                        // 获取车辆其他相关信息
                        this.otherInfo = this._normalizeOtherInfo(res.data.OtherInfo);

                        // 是否展示更多
                        if(this.basicInfo.desc.length>158){
                            this.isShowDescMore = true;
                        }

                        // 获取权限相关的信息
                        this.hasLogin = res.HasLogin;
                        this.hasAuth = res.HasAuth;
                        this.hasCredit = res.HasCredit;

                        //获取车辆图片数据
                        setTimeout(() => {
                            // 获取在售车辆列表
                            this.getOnSaleCar(this.basicInfo.mid);

                            this.carImgData = this.getCarImgsData(this.fileInfoList,this.otherInfo);
                            // 获取相似推荐数据
                            this.similarList = this._normalizeB2bCarInfo(res.data.SimilarRecommend)
                            // 获取分享标题
                            let carTit = ((this.basicInfo.title).split(" ")).join("_");

                            // 设置网页title
                            var options = {
                                title: carTit+"__"+this.otherInfo.cdgName+"__b2b车辆详情",
                            }
                            this.docTitle(options)

                            // 设置分享信息
                            let share_tit = carTit+"__"+this.otherInfo.cdgName+"__b2b车辆详情____木有车B2B汽车服务平台 - 木有车（www.muyouche.com）";
                            let share_desc = "扎心了老铁，天大喜讯！"+this.otherInfo.cdgName+"在木有车发布了一辆非常不错的"+carTit+"。喜欢的朋友还犹豫什么，木有车B2B二手车安全放心的交易，您不容错过！";

                            let newObj = {
                                title: share_tit,
                                content: share_desc,
                                pic: this.fileInfoList[0].fileUrl,
                            }

                            // 分享组件配置及显隐
                            this.shareOptions = Object.assign(newObj,{});
                            this.isShareShow = true;

                            // 如果进入的网页是微信
                            if(geekDom.isWeiXin()){
                                this.WXShareSDK(newObj);
                            }

                        })

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

            // 使用手机看
            usePhoneLook(type){
                this.isShowDetailsUnfold = type;
            },

            // 获取车辆详情手机链接二维码
            getMobileEwmIMG(){
                var theMobileUrl = SYSTEM.MOBILE_CAR_DETAILS_URL_ROOT+this.carId;
                var that = this;
                var opts = {
                    errorCorrectionLevel: 'Q',
                    type: 'image/jpeg',
                    color:{
                        light: "#fff",
                        dark: "072c4c",
                    },
                    margin: 1,
                    scale: 18,
                    rendererOpts: {
                        quality: 0.4
                    }
                }
                // 微信二维码
                QRCode.toDataURL(theMobileUrl,opts,function (err, url) {
                    // 车辆详情手机二维码
                    that.carDetailsEwmIMG = url
                })
            },

            // 展开更多
            unfoldDescMore(type){
                this.isShowDescMore = type;
            },

            // 打开出价弹出框
            openBidPopup(){
                if(!this.hasLogin){
                    this.$notify({
                        title: '您尚未登录',
                        message: '请先登录，认证后可使用出价功能',
                        type: 'error',
                        duration: 2000,
                    });
                    return;
                };
                if(!this.hasAuth){
                    this.$notify({
                        title: '您尚未通过认证',
                        message: '通过认证认证后可使用出价功能',
                        type: 'error',
                        duration: 2000,
                    });
                    return;
                };
                // 重新获取我的历史报价
                this.getMyBidData();
                this.isShowBidPopup = true;

            },

            // 格式化历史出价信息
            _normalizeMyHistoryBid(arr){
                let data = {}
                arr.forEach((item,index)=>{
                    if(item.CarId == this.carId){
                        data = {
                            price: item.Price,
                            time: item.QuotedTime,
                        }
                    }
                })
                return data;
            },

            // 获取我的报价
            getMyBidData(){
                let data = {
                    ActType: "MyQuotedPrice",
                    PageIndex: "0",
                    PageSize: "5",
                    CarId: this.carId
                }
                api.quotedPrice(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.myHistoryBid =  this._normalizeMyHistoryBid(res.data)
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '信息获取失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                });
            },

            // 发起报价申请
            putBidPopup(offerPrice){
                let data = {
                    ActType: "QuotedPrice",
                    QuotedPrice: offerPrice,
                    CarId: this.carId
                }
                this.$confirm('您的报价是：'+offerPrice+"万元", '确认发布这条报价？', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.commitOfferPrice(data)
                }).catch(() => {

                });
            },

            // 提交报价
            commitOfferPrice(data){
                api.quotedPrice(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.$notify({
                            title: '报价成功',
                            message: res.msg,
                            type: 'success',
                            duration: 1500,
                        });
                        // 关闭出价弹出框
                        this.cancelBidPopup();
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '操作失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                });
            },

            // 关闭出价弹出框
            cancelBidPopup(){
                this.isShowBidPopup = false;
            },

            // 直接对该车辆发起评论
            putComment(type){
                if(!this.loginStatus){
                    this.$notify({
                        title: '您尚未登录',
                        message: '登录后可进行评论操作',
                        type: 'error',
                        duration: 2000,
                    });
                    return;
                };
                let commentContent = "";
                if(type=='1'){
                    commentContent = this.FCommentContent;
                }else if(type=="2"){
                    if(this.rlyCommentPanelType == 2){
                        var quotesIndex = /[：]/.exec(this.rlyCommentContent).index;
                        commentContent = this.rlyCommentContent.substr(quotesIndex+1);
                    }else{
                        commentContent = this.rlyCommentContent;
                    }
                }

                let data = {
                    ActType : 'Comment',
                    Content : commentContent,
                    CarId : this.carId,
                    BeReplyCommentId : type=='2'?this.rlyCommentId:'',     // 被回复者的id
                }
                this.$confirm('评论内容：'+commentContent, '确认发表这条评论？', {
                    confirmButtonText: '确认发表',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.commitCarComment(type,data);
                }).catch(() => {

                });

            },

            // 提交评论接口
            commitCarComment(type,data){
                api.carComment(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.$notify({
                            title: '评论成功',
                            message: res.msg,
                            type: 'success',
                            duration: 1500,
                        });
                        if(type=='1'){
                            // 重新获取评论列表
                            this.getCarCommentList();
                            this.FCommentCloseBox();
                            // 如果列表框是隐藏的
                            if(!this.showCommentList){
                                this.showCommentList = true;
                            }
                        }else{
                            // 重新获取评论列表
                            this.getCarCommentList();
                            this.rlyCommentCloseBox();
                        }

                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '操作失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                });
            },

            // 对评论进行评论
            putRlyComment(type,isShow,index,id,rlyIndex,name){

                // 回复评论的id
                this.rlyCommentId = id;

                // 如果打开的是其他评论，则隐藏那个评论
                if(this.currRlyPanelIndex!=-1&&index!=this.currRlyPanelIndex){
                    this.isShowRlyPanel(true,this.currRlyPanelIndex);
                }

                if(isShow&&this.rlyCommentPanelType!=type){  // 如果框是打开的，并且是父回复类型与子回复类型的区别
                    this.rlyCommentFocus(index);
                    if(type==2){
                        this.rlyCommentContent = "@"+name+"：";
                    }else{
                        this.rlyCommentContent = "";
                    }

                }else if(isShow&&this.rlyCommentPanelType==type&&type==2&&this.rlyCommentPanelIndex!=rlyIndex){
                    // 回复子评论切换
                    this.rlyCommentFocus(index);
                    this.rlyCommentContent = "@"+name+"：";
                }else{

                    // 如果用户直接选择回复子评论
                    if(type==2&&!isShow){
                        this.isShowRlyPanel(isShow,index);
                        setTimeout(()=>{
                            this.rlyCommentContent = "@"+name+"：";
                        })
                    }else{
                        this.isShowRlyPanel(isShow,index);
                    }
                }
                setTimeout(()=>{
                    // 赋值控制相关组件的显示
                    this.rlyCommentPanelType = type;
                    this.currRlyPanelIndex = index;
                    this.rlyCommentPanelIndex = rlyIndex;
                })

            },

            // 格式化评论信息列表
            _normalizeCommentList(list) {
                let arr = [];
                list.forEach((item,index) => {
                    arr.push(new commentClass(item));
                })
                return arr;
            },

            // 获取车辆评论列表
            getCarCommentList(){
                let data = {
                    ActType : 'CarCommentList',
                    CarId: this.carId,
                    PageIndex: this.resultPage.currentPage,
                    PageSize: SYSTEM.COMMENT_RESULE_PAGE_SIZE
                }
                api.carComment(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.resultPage.totalPage = res.Total;
                        this.carCommentList = this._normalizeCommentList(res.data);
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '操作失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                });
            },

            // 删除自己的评论
            deleteComment(id){
                let data = {
                    ActType : 'Delete',
                    BeReplyCommentId: id
                }
                this.$confirm('点击确认，删除该评论', '确认删除这条评论？', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.commitDeleteComment(data);
                }).catch(() => {

                });

            },

            // 提交删除评论
            commitDeleteComment(data){
                api.carComment(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.$notify({
                            title: '删除评论成功',
                            message: res.msg,
                            type: 'success',
                            duration: 1500,
                        });
                        // 重新获取评论列表
                        this.getCarCommentList();
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '操作失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                });
            },

            //分页页号切换触发
            handleCurrentChange(val) {
                this.resultPage.currentPage = val;
                // 重新获取评论列表
                this.getCarCommentList();
                var ctContainer = this.$refs.ctContainer;
                var ctContainerOffsetTop = this.$refs.ctContainer.offsetTop;
                geekDom.goOffsetTop(ctContainerOffsetTop - 100);
            },

            // 点赞评论
            commentLike(id,index,onOff){
                let data = {
                    ActType: onOff!=1?'Upvote':'Downvote',
                    BeReplyCommentId: id,
                }
                api.carComment(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        // 重新获取评论列表
                        this.getCarCommentList();
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '操作失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                });
            },

            // 发表评论
            FPutComment(){
                if(!this.loginStatus){
                    this.$notify({
                        title: '您尚未登录',
                        message: '登录后可进行评论操作',
                        type: 'error',
                        duration: 2000,
                    });
                    return;
                };
                this.putComment('1');
            },

            // 大评论框获取焦点
            FCommentFocus(){
                this.isStartComment = true;
                var that = this;
                geekDom.bindkeydown(13,'ctrlKey',function(){
                    that.FPutComment();
                })
            },

            // 大评论框关闭
            FCommentCloseBox(){
                document.onkeydown = null;
                this.isStartComment = false;
                this.FCommentContent = "";
            },

            // 回复评论框的显示隐藏
            isShowRlyPanel(isShow,index){
                // this.$refs.rlyCommentTexearea[index].focus()
                // 显示隐藏切换
                this.carCommentList[index].isShowPanel = !isShow;
                setTimeout(()=>{
                    if(isShow){ // 如果回复评论框隐藏，那么type赋值为0
                        this.rlyCommentContent = "";
                        this.rlyCommentPanelType = 0;
                        this.currRlyPanelIndex = -1;
                        this.rlyCommentPanelIndex = -1;
                        this.rlyCommentId = "";
                    }else{
                        this.rlyCommentFocus(index);
                    }
                })

            },

            // 小评论框获取焦点
            rlyCommentFocus(index){
                var that = this;
                this.FCommentCloseBox();
                this.$refs.rlyCommentTexearea[index].focus();

                geekDom.bindkeydown(13,'ctrlKey',function(){
                    that.putComment('2');
                })
            },

            // 小评论框关闭
            rlyCommentCloseBox(){
                // 回复评论框的显示隐藏
                this.isShowRlyPanel(true,this.currRlyPanelIndex)
            },

            // 格式化用户信息
            _normalizeJudgeInfo(data) {
                return new judgeInfo(data);
            },

            // 获取车价评判信息
            getJudgeInfo(){
                let data = {
                    ActType :"PriceJudgeDetail",
                    CarId: this.carId,
                }
                api.judgeCarPrice(data).then(res => {

                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.judgeCarInfo = this._normalizeJudgeInfo(res.data);
                        this.lowPageWeight = (((this.judgeCarInfo.low+(SYSTEM.JUDGE_PRICE_WEIGHTED/2))/(this.judgeCarInfo.total+SYSTEM.JUDGE_PRICE_WEIGHTED))*100).toFixed(2);
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '车价评判信息获取失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                })
            },

            // 提交车价高低评判
            putCarPriceJudge(type){
                let data = {
                    ActType :"JudgePrice",
                    CarId: this.carId,
                    PriceLevel: type,
                }
                api.judgeCarPrice(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.$notify({
                            title: '车价评判成功',
                            message: res.msg,
                            type: 'success',
                            duration: 1500,
                        });
                        // 重新获取车价评判信息
                        this.getJudgeInfo();
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '车价评判操作失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                })
            },

            // 评价过
            putHasJudged(){
                this.$notify({
                    title: '这辆车您已评价过',
                    message: "您已为该车进行过价格评判了，请勿重复操作",
                    type: 'error',
                    duration: 1500,
                });
            },

            // 车辆异常状态提示
            abnormalStatusTips(status){

                // 提示类型
                let tipsType = "";
                // 提示状态
                let tipsStatus = "";

                switch(status){
                    case 1:       // 在售
                        tipsType = "success";
                        break;
                    case -1:      // 已下架
                        tipsType = "1";
                        tipsStatus = "已下架"
                        break;
                    case 0:       // 审核中
                        tipsType = "1";
                        tipsStatus = "正在审核中"
                        break;
                    case 2:       // 交易中
                        tipsType = "2";
                        tipsStatus = "正在交易中"
                        break;
                    case 3:       // 交易成功
                        tipsType = "1";
                        tipsStatus = "已成功交易"
                        break;
                    case -2:      // 审核失败
                        tipsType = "1";
                        tipsStatus = "未通过审核"
                        break;
                }

                setTimeout(()=>{
                    // 如果该车辆在售，啥也不提示
                    if(tipsType=="success") return;
                    if(tipsType=="1"){
                        this.$alert('很抱歉，该车辆的信息或无效或过期，我们希望您尝试访问别的车辆信息', '此车源'+tipsStatus, {
                            confirmButtonText: '我知道了',
                            type: 'error',
                            callback: () => {
                                this.$router.go(-1);
                            }
                        });
                    }else if(tipsType=="2"){
                        this.$alert('该车源正在交易中，您可以继续查看车辆详情，但您无购买权限', '此车源'+tipsStatus, {
                            confirmButtonText: '我知道了',
                            type: 'warning',
                            callback: () => {
                                return;
                            }
                        });
                    }
                })

            },

            // 获取车辆图片列表
            getCarImgsData(list,otherInfo){
                let map = {
                    merchantName : "",
                    imgItems:[]
                }
                map.merchantName = otherInfo.cdgName;
                if(list.length<=0) return map;
                list.forEach((item, index) => {
                    if(item.type=="img"&&item.groupName=="车辆照片"){
                        map.imgItems.push(item)
                    }
                });
                return map;
            },

            // 关注和取消关注的事件
            setAttention(type,id){
                let act = "";
                if(type==1){
                    act="Add";
                }else{
                    act="Delete"
                }

                let data = {
                    ActType: act,
                    SellerId: id
                }

                // 关注和取消关注
                api.myFavoriteCdg(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        // 假刷新
                        if(type==1){
                            this.cdgIsFavorite = true;
                            this.$notify({
                                title: '成功关注车店',
                                message: res.msg,
                                type: 'success',
                                duration: 1500,
                            });
                        }else{
                            this.cdgIsFavorite = false;
                            this.$notify({
                                title: '取消关注成功',
                                message: '您已成功取消关注',
                                type: 'success',
                                duration: 1500,
                            })
                        }

                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '操作失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                })
            },

            // 加入购物车
            inShopingCart(id){
                let data = {
                    ActType: 'Add',
                    CarId: id,
                }
                api.manageShoppingCart(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.otherInfo.isInCart = true;
                        // 重新获取购物车内车辆数量
                        this.getMyShoppingNumber();
                        this.$notify({
                            title: '成功加入购物车',
                            message: res.msg,
                            type: 'success',
                            duration: 1500,
                        });
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '加入购物车失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                })
            },

            // 加入车辆收藏
            inMyCollect(type,id){
                let act = "";
                if(type==1){
                    act="Add";
                }else{
                    act="Delete"
                }
                let data = {
                    ActType: act,
                    CarId: id,
                }
                api.myFavoriteCar(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){

                        // 假刷新
                        if(type==1){
                            this.otherInfo.isInFavorite = true;
                            this.$notify({
                                title: '车辆收藏成功',
                                message: res.msg,
                                type: 'success',
                                duration: 1500,
                            });
                        }else{
                            this.otherInfo.isInFavorite = false;
                            this.$notify({
                                title: '取消车辆收藏',
                                message: '您已成功取消车辆收藏',
                                type: 'success',
                                duration: 1500,
                            })
                        }

                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '车辆收藏失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                })
            },

            // 下单
            addOrder(carId){

                this.$alert(
                        `1.点击“立即秒杀”键之前，请与卖方对接车况，谈好成交价格
                         2.一旦确认“立即秒杀”，任何一方反悔，将自动扣除信誉保证金`+SYSTEM.MIN_CREDIT_GOLD+`元给守约方`
                        , '温馨提示', {
                        confirmButtonText: '立即秒杀',
                        type: 'warning',
                    }).then(() => {
                        this.$confirm('点击“确认秒杀”后，平台将锁定双方信誉保证金，同时该车辆也将被锁定，并显示正在交易中，卖家将发送电子购车合同，请认真考虑后下单！', '秒杀下单提示', {
                                confirmButtonText: '确认秒杀',
                                cancelButtonText: '再考虑看看',
                                type: 'warning'
                            }).then(() => {
                                this.putB2BOrder(carId);
                            }).catch(() => {

                            });
                    }).catch(() => {
                        return;
                    });
            },

            // 提交下单申请
            putB2BOrder(carId){
                let data = {
                    CarId: carId,
                }
                api.getAddB2BOrder(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.$notify({
                            title: '下单成功',
                            message: res.msg,
                            type: 'success',
                            duration: 1500,
                        });
                        this.basicInfo.status = "2";
                        setTimeout(()=>{
                            this.$router.push({path:'/member/buyOrder'})
                        },300)
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '下单失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                })
            },

            // 获取车辆信息
            getCarList(){
                let data = {
                    PageIndex : '1',
                    PageSize: '5',
                }
                api.getB2BCarList(data).then((res) => {
                    this.b2bCarList = this._normalizeB2bCarInfo(res.data)
                });
            },

            //使用b2b抽象类完成carInfo
            _normalizeB2bCarInfo(list){
                let carInfo = [];
                list.forEach((item, index) => {
                    carInfo.push(new b2bCarInfo(item))
                });
                return carInfo;
            },

            // 格式化车行车辆信息列表
            _normalizeCarList(list) {
                let arr = [];
                list.forEach((item,index) => {
                    if(index<5){
                        arr.push(new onSaleCarInfo(item));
                    }
                })
                return arr;
            },


            // 获取卖家店铺在售车源信息列表
            getOnSaleCar(id){
                let data = {
                    SellerId: id,
                }
                api.CDGStoreDetails(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){

                        this.cdgIsFavorite = res.data.HasFavorite;
                        this.onSaleCarList = this._normalizeCarList(res.data.CarList);

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

            reset(){
                // 清除本页的按键绑定
                document.onkeydown = null;

                // 是否开始评论
                this.isStartComment = false;
                // 评论的内容
                this.FCommentContent = "";
                // 回复评论的内容
                this.rlyCommentContent = "";
                // 重置回复评论框的状态
                this.rlyCommentPanelType = 0;
                this.currRlyPanelIndex = -1;
                this.rlyCommentPanelIndex = -1;
                this.rlyCommentId = "";

                this.showCommentList = false;

                this.resultPage = {
                    currentPage : 1,
                    pageSize : SYSTEM.COMMENT_RESULE_PAGE_SIZE,
                    totalPage : 0
                }
            },

        }
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'b2bCar.styl'
</style>
