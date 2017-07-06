<template>
     <!-- @mousewheel="_stopBubble($event)" -->
    <transition name="zoom-in-top">
        <div class="m-ci-box" ref="citySelBox">
        	<div class="m-sch-box"  v-if="false">
        		<div class="m-sch-bar f__clearfix">
                    <div class="m-sch-ipt f__fl">
                        <input type="text" class="u-ipt" v-model="schValue" placeholder="请输入城市名称" />
                        <a class="u-close" @click="clearVal" v-show="schValue"><i class="iconfont icon-guanbi2fill"></i></a><!-- 关闭 -->
                    </div>
                    <div class="u-sch-btn f__fr"><i class="iconfont icon-iossearchstrong"></i>搜索</div><!-- 搜索 -->
                    <div class="m-sch-res-box" v-show="schValue">
                        <ul class="m-res-lst">
                            <li class="u-item" v-for="item in schList"></li>
                        </ul>
                    </div><!-- 搜索结果列表 -->
                </div>
        	</div><!-- 头部 -->
        	<div class="m-ix-bar f__clearfix">
                <ul class="u-ix-lst f__clearfix">
                    <li class="u-ix-item" @click="changeCurIndnx(index)" v-for="(item,index) in shortcutList" :data-index="index" :class="[{'current':currentIndex===index},{'first':index==0}]">{{item}}</li>
                </ul><!-- 索引列表 -->    
            </div><!-- 索引条 -->
            <!-- @mousewheel="_stopBubble($event)" -->
            <div class="m-ci-con" ref="cityListBox">
                <ul class="m-ci-lst">
                    <li class="m-ci-item f__clearfix" ref="cityItem" v-for="group in citys">
                        <span class="u-ci-tit" :class="{'vital':group.title=='周边'}">{{group.title}}</span>
                        <div class="u-gp-con">
                            <ul class="u-gp-lst f__clearfix">
                                <li class="u-gp-item" @click="gotoLink(item.name,item.code)" v-for="item in group.items">
                                    {{item.name}}
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div><!-- 城市信息盒子 -->
        </div>
    </transition>
</template>

<script>
    import {pinyin} from 'assets/js/pinyin.js'; 
    import api from 'api/getData.js'
    import CityInfo from 'base/getter/city'
    import {mapGetters,mapActions} from 'vuex'

    const AROUND_CITY_LEN = 10
    const AROUND_NAME = '周边'

	export default {
		name: 'cityChoose',
		created(){
        	//所有城市列表
            this.allCityList = [];
            //仅仅所有城市列表
            this.onlyCityList = [];
            //城市转拼音
            this.cityToSpellList = [];
            //-获取城市信息列表
            this._getAllCityList();
        },
        data(){
        	return{
                citys:[],
                currentIndex: 0,
                schValue: '',
                schList: [],  //搜索结果列表
        	}
        },
        props:{
            // 显隐状态
            isShow: Boolean,
        },
        mounted(){
            // let cityBoxDom = this.$refs.citySelBox;
            // this._preventScroll(cityBoxDom);
        },
        computed:{
            //城市索引列表
            shortcutList() {
                return this.citys.map((group) => {
                    return group.title
                })
            },

        },
        methods:{
            ...mapActions([
                'setCurrentCity', //映射 this.setCurrentCity() 为 this.$store.dispatch('setCurrentCity')
            ]),
        	//获取所有城市的列表
        	_getAllCityList(){
        		api.getAllCityList().then((res) => {
			        this.allCityList = res.data
			        this._updateCityList();
		        })
        	},
        	//更改城市list
            _updateCityList(){
            	let newCityList = [];
                if(this.allCityList.length){
                	this.allCityList.forEach((value,index) => {
                        if(this._isNotStreet(value.Code)) newCityList.push(value)
                	})
                	this.onlyCityList = newCityList;
                	// 城市转拼音
                	this._getCityToSpellList();
                }
            },
            //不是街道(并且不是省)
            _isNotStreet(num){
            	return /^\d{4}(0)(0)$/.test(num) && !/^\d{2}(0){4}$/.test(num)
            },
            //城市转拼音键
            _getCityToSpellList(){
                let spellCityList = [];
                if(this.onlyCityList.length){
                    this.onlyCityList.forEach((value,index) => {
                        let obj = {};
                        obj.word = pinyin.getCamelChars(value.Name);
                        obj.key = obj.word.substr(0,1);
                        Object.assign(value, obj); 
                        spellCityList.push(value)
                    })
                    this.citys = this._normalizeCity(spellCityList);
                }
            },
            //格式化城市列表
            _normalizeCity(list) {
                let map = {
			        around: {
			            title: AROUND_NAME,
			            items: []
			        }
		        }
		        list.forEach((item, index) => {
			        if (index < AROUND_CITY_LEN) {
			            map.around.items.push(new CityInfo({
			                item: item
			            }));
			        }
			        const key = item.key
			        if (!map[key]) {
			            map[key] = {
			                title: key,
			                items: []
			            }
			        }
			        map[key].items.push(new CityInfo({
                        item: item
                    }));
			    })
                // 为了得到有序列表，我们需要处理 map
                let nature = []
                let around = []
                //循环map分别得到两个数组
                for (let key in map) {
			        let val = map[key]
			        if (val.title.match(/[a-zA-Z]/)) {
			            nature.push(val)
			        } else if (val.title === AROUND_NAME) {
			            around.push(val)
			        }
		        }
                //根据字母A-Za-z规则顺序排序
		        nature.sort((a,b) => {
		        	return a.title.charCodeAt(0) - b.title.charCodeAt(0);
		        })
                //将nature数据连接在around数据背后一起返回出去
		        return around.concat(nature);
            },
            // 阻止滚轮事件冒泡
            _preventScroll(el){
                let me = el;
                if(navigator.userAgent.indexOf("Firefox")>0){ 
                    me.addEventListener('DOMMouseScroll',function(e){   
                        e.preventDefault(); 
                    },false);  
                }else{ 
                    me.onmousewheel = function(e){    
                        e = e || window.event;   
                        return false; 
                    };
                } 
                return this; 
            },
            //阻止事件冒泡
            _stopBubble(e){ 
                e = e || window.event;
                // 如果提供了事件对象，则这是一个非IE浏览器
                if(e && e.stopPropagation){//阻止冒泡
                    // 因此它支持W3C的stopPropagation()方法 
                    e.stopPropagation();
                }else{
                    // 否则，我们需要使用IE的方式来取消事件冒泡
                    e.cancelBubble = true;
                }

            },
            //更改当前城市索引
            changeCurIndnx(index){
                let me = this;
                let cityListDom = me.$refs.cityListBox;

                this.currentIndex = index;
                //设置滚动条高度
                let stop = me.$refs.cityItem[index].offsetTop;
                cityListDom.scrollTop = stop
            },
            //点击城市link
            gotoLink(cityName,cityCode){
                console.log("怎么会点两下")
                let data = {
                    name: cityName,
                    code: cityCode
                }
                this.setCurrentCity(data);
                this.currentIndex = 0;
                this.$emit('setCityChooseShow',false);
            },
            //删除searchVal
            clearVal(){
                this.schValue = '';
            },
            //匹配搜索结果
            _resListBySch(val){
                console.log("匹配搜索结果");
            }
        },
        watch: {
            schValue: function (val) {
                this._resListBySch(val);
            },
            // 侦听显隐值
            isShow: function (val) {
                if(val){
                    let cityListDom = this.$refs.cityListBox;
                    cityListDom.scrollTop = 0,
                    this.currentIndex = 0;
                }
            }
        },
	}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './citySel.styl'
</style>