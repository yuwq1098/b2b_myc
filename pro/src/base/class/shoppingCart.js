// 购物车商品信息构造类
class goodsInfo{
	constructor(data) {
        this.id = data.CarId                                            // 车辆ID
        this.cartId = data.CartId                                       // 购物车ID
        this.imgUrl = data.FileUri+"?imageView2/3/w/300/h/225"||""      // 首图链接
        this.title = data.Title||""                                     // 首图链接
        this.status = data.Status||""                                   // 车辆状态
        this.inCity = data.CarInCity||""                                // 所在城市
        this.plateDate = data.OnLicensePlateDate||""       // 上牌时间
        this.mileage = data.Mileage||""                    // 里程
	    this.price = data.B2BPrice||""                     // 批发价
	    this.retailPrice = data.RetailPrice||""            // 普通市场价
	    this.addedTime = data.ShelveTime||""               // 最后上架的时间
	    this.cdgName = data.CDGName||""                    // 车行名称
	    this.authType = data.AuthType||""                  // 认证类型
	    this.rowNo = data.RowIndex||""                     // 行号 
        
        // 状态文本
	    this.statusText = ""

	    switch(this.status){
	    	case -1:
	    	    this.statusText = "已下架";
	    	    break;
	    	case 1:
	    	    this.statusText = "在售";
	    	    break;
	    	case 2:
	    	    this.statusText = "交易中";
	    	    break;
	    	case 3:
	    	    this.statusText = "交易完成";
	    	    break;
	    	case 0:
	    	    this.statusText = "待审核";
	    	    break;
	    	case -2:
	    	    this.statusText = "审核失败";
	    	    break;
	    	case -10:
	    	    this.statusText = "仲裁中";
	    	    break;
	    }           

	}
}

export {goodsInfo};