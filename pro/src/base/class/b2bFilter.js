
//展示用户所选筛选条件构造类
class filterShowData{
    constructor(key,value,label) {
	    this.key = key||""                                 //键
	    this.value = value||""                             //值
	    this.label = label||""                             //对应标签(显示给用户看)
	}
}

//b2c大厅数据筛选构造类
class filterDataClass{
    constructor(data) {
	    this.brand = data.brand||""                                 //车牌
	    this.series = data.series||""                               //车系
	    this.price = data.price||""                                 //价格
	    this.age = data.age||""                                     //车龄
	    this.dischargeStandard = data.dischargeStandard||""         //排放标准
	    this.mileage = data.mileage||""                             //里程
	    this.gearType = data.gearType||""                           //手/自动挡
	    this.color = data.color||""                                 //颜色
	    this.transferCount = data.transferCount||""                 //过户次数
	    this.serviceType = data.serviceType||""                     //营运类型
	    this.keyCount = data.keyCount||""                           //钥匙数
	    this.sortType = data.sortType||""                           //搜索结果排序结果
	}
}

export {filterShowData,filterDataClass}