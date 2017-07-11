// 车行信息的构造类
class cdgClass{
	constructor(data) {
	    this.id = data.SellerId||""           // 车商ID
	    this.cdgName = data.CdgName||""       // 车行名称
	    this.faceUrl = data.PhotoURL||""      // 头像
	    this.userName = data.UserName||""     // 联系人名称
	    this.address = data.Address||""       // 地址
	    this.volume = data.OrderPercent||0   // 成交数
	    this.grade = data.GoodEvaluate||0    // 分数
	}
}

// 车辆信息的构造类
class carClass{
	constructor(data) {
	    this.id = data.CarId||""                        // 车辆ID
	    this.imgUrl = data.FileUri||""                  // 首图链接
	    this.title = data.Title||""                     // 标题
	    this.city = data.CarInCity||""                  // 所在城市
	    this.plateDate = data.OnLicensePlateDate||""    // 上牌时间
	    this.mileage = data.Mileage||""                 // 里程
	    this.price = data.B2BPrice||0                   // 批发价
	    this.cdgName = data.CDGName||""                 // 车行名
	    this.authType = data.AuthType||""               // 车行类别
	    this.status = data.Status||""                   // 车辆状态
	}
}

export {cdgClass,carClass};