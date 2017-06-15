//首页搜索条构造类
class searchCarResult{
	constructor(data) {
	    this.id = data.CarId
	    this.name = data.Title
	}
}

//b2c大厅数据筛选构造类
class filterDataClass{
    constructor(data) {
	    this.brand = data.brand||""                   //车牌
	    this.series = data.series||""                 //车系
	    this.price = data.price||""                   //价格
	    this.model = data.model||""                   //车型
	    this.age = data.age||""                                     //车龄
	    this.dischargeStandard = data.dischargeStandard||""         //排放标准
	    this.mileage = data.mileage||""                             //里程
	    this.gearType = data.gearType||""                           //手/自动挡
	    this.color = data.color||""                                 //颜色
	    this.transferCount = data.transferCount||""                 //过户次数
	    this.serviceType = data.serviceType||""                     //营运类型
	    this.sortType = data.sortType||""                           //搜索结果排序结果
	}
}

export {searchCarResult,filterDataClass}