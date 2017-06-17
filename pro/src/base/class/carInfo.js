class b2bCarInfo{
	constructor(data) {
	    this.id = data.CarId                            // 车辆ID
	    this.name = data.Title                          // 标题
	    this.mileage = data.Mileage                     // 行驶里程
	    this.plateDate = data.OnLicensePlateDate        // 上牌时间
	    this.city = data.CarInCity                      // 所在城市
	    this.imgUrl = data.FileUri                      // 首图
	    this.retailPrice = data.RetailPrice             // 普通价格
	    this.price = data.B2BPrice                      // b2b价格
	    this.cName = data.CDGName                       // 车行名
        this.authType = data.AuthType                   // 车行认证类别： 个人车行、企业车行
	    this.hasInCart = data.HasInCart                 // 是否加入购物车
	}
}

class b2cCarInfo{
	constructor(data) {
	    this.id = data.CarId
	    this.name = data.Title
	    this.mileage = data.Mileage
	    this.plateDate = data.OnLicensePlateDate
	    this.inCity = data.CarInCity
	    this.imgUrl = data.FileUri
	    this.retailPrice = data.RetailPrice
	}
}

export {b2bCarInfo,b2cCarInfo};

