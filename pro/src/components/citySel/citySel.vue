<template>
    <div class="m-ci-box" ref="citySelBox">
    	<div class="m-sch-box">
    		
    	</div><!-- 头部 -->
    	<div class="m-ix-bar">
                
        </div><!-- 索引条 -->
        <div class="m-ci-con">
            
        </div><!-- 城市信息盒子 -->
    </div>
</template>

<script>
    import {pinyin} from 'assets/js/pinyin.js'; 
    import {getAllCityList} from 'api/getData.js'
    import CityInfo from 'base/getter/city'

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
        	}
        },
        mounted(){
            let cityBoxDom = this.$refs.citySelBox;
            this._preventScroll(cityBoxDom)
        },
        computed:{
            
        },
        methods:{
        	//获取所有城市的列表
        	_getAllCityList(){
        		getAllCityList().then((res) => {
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
                    console.log(this.citys);
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
            //阻止滚轮事件冒泡
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
            }
        }
	}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './citySel.styl'
</style>