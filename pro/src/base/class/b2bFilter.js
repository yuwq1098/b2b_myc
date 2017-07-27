
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
        this.carInCity = data.carInCity||"",                        // 车辆所在市
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

//用户向后台发起api请求的数据的构造类
class searchFilterClass{
    constructor(data) {
        this.PageSize = data.PageSize||"8",                            // pageSize页面规格 默认10
        this.PageIndex = data.PageIndex||"1",                          // pageIndex当前页序 默认第1页
        this.CarBrandId = data.CarBrandId||"",                                // 汽车品牌id
        this.CarSeriesId = data.CarSeriesId||"",                              // 车系id
        this.CarInCity = data.CarInCity||"",                                  // 车辆所在市
        this.DischargeStandard = data.DischargeStandard||"",                  // 排放标准, 国1, 国2, ...
        this.Color = data.Color||"",                                          // 颜色
        this.OnLicensePlateDateFrom = data.OnLicensePlateDateFrom||"",        // 上牌日期起 2016-01-01（通过计算车龄反算出上牌日期）
        this.OnLicensePlateDateTo = data.OnLicensePlateDateTo||"",            // 上牌日期止 2016-09-01（通过计算车龄反算出上牌日期）
        this.MileageFrom = data.MileageFrom||"",                              // 最低里程  0   (单位万公里)
        this.MileageTo = data.MileageTo||"",                                  // 最高里程  5   (单位万公里)
        this.B2BPriceFrom = data.B2BPriceFrom||"",                            // 最低价格  0   (单位万元)
        this.B2BPriceTo = data.B2BPriceTo||"",                                // 最高价格  10  (单位万元)
        this.ServiceCharacteristics = data.ServiceCharacteristics||"",        // 运营类型 string  非营运
        this.TransferTimesFrom = data.TransferTimesFrom||"",                  // 最少过户次数 0
        this.TransferTimesTo = data.TransferTimesTo||"",                      // 最多过户次数 2
        this.KeyCountFrom = data.KeyCountFrom||"",                            // 钥匙数起 0
        this.KeyCountTo = data.KeyCountTo||"",                                // 钥匙数止于 5
        this.GearType = data.GearType||"",                            // 手/自动挡  int  1是手动 2是自动
        this.SortType = data.SortType||""                            // 排序关键字： string 价格最低、价格最高、车龄最短、里程最少、最近更新
    }
}

export {filterShowData,filterDataClass,searchFilterClass}