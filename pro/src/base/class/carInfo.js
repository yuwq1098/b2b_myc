// b2b车辆信息构造类
class b2bCarInfo{
	constructor(data) {
	    this.id = data.CarId||""                          // 车辆ID
	    // 首图
	    this.imgUrl = data.FileUri?data.FileUri+"?imageView2/3/w/400/h/300":""
	    // ?imageMogr2/auto-orient
	    this.name = data.Title||""                        // 标题
	    this.inCity = data.CarInCity||""                  // 所在城市
	    this.plateDate = data.OnLicensePlateDate||""      // 上牌时间
	    this.mileage = data.Mileage||0                    // 里程
	    this.price = data.B2BPrice||0                     // b2b价格
	    this.retailPrice = data.RetailPrice||0            // 普通价格
	    this.shelveTime = data.ShelveTime||""             // 上架时间或刷新上架时间
	    
	    this.cName = data.CDGName||""                     // 车行名
        this.authType = data.AuthType||""                 // 车行认证类别： 个人车行、企业车行
	    this.hasInCart = data.HasInCart||""                // 是否加入购物车
	}
}

// b2c车辆信息的构造类
class b2cCarInfo{
	constructor(data) {
		
        this.id = data.CarId||""                          // 车辆ID
        // 首图
        this.imgUrl = data.FileUri?data.FileUri+"?imageView2/3/w/400/h/300":""
        this.name = data.Title||""                        // 标题
        this.inCity = data.CarInCity||""                  // 所在城市
        this.plateDate = data.OnLicensePlateDate||""      // 上牌时间
        this.mileage = data.Mileage||0                    // 里程
        this.price = data.B2BPrice||0                     // b2b价格
        this.retailPrice = data.RetailPrice||0            // 普通价格
        this.shelveTime = data.ShelveTime||""             // 上架时间或刷新上架时间
        this.cName = data.CDGName||""                     // 车行名
        this.authType = data.AuthType||""                 // 车行认证类别： 个人车行、企业车行
        this.hasInCart = data.HasInCart||0                // 是否加入购物车
	}
}

// 车行车辆信息的构造类
class merchantCarInfo{
	constructor(data) {
	    this.id = data.CarId||""                        // 车辆id
	    this.imgUrl = data.TitlePhoto?data.TitlePhoto+"?imageView2/3/w/400/h/300":""               // 首图链接
	    this.title = data.Title||""                     // 标题
	    this.city = data.CarInCity||""                  // 所在城市
	    this.plateDate = data.OnLicensePlateDate||""    // 上牌时间
	    this.mileage = data.Mileage||""                 // 里程
	    this.price = data.B2BPrice||""                  // 批发价
	    this.retailPrice = data.RetailPrice||""         // 普通市场价
	}
}


export {b2bCarInfo,b2cCarInfo,merchantCarInfo};

