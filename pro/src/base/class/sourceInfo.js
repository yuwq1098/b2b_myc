// 车源信息的构造类
class sourceInfo{
    constructor(data) {
	    this.id = data.CarId||""                  // 车辆id
	    this.viewPeople = data.BrowserCount||0    // 浏览量
	    this.imgUrl = data.FirstImg||""           // 首图
	    // this.imgUrl = require("assets/img/car-details_001.jpg")
	    this.title = data.Title||""               // 标题
	    this.checkTime = data.CheckTime||""       // 审核时间
	    this.checkRemark = data.CheckRemark||""   // 审核失败备注
	    this.shelveTime = data.ShelveTime||"无时间数据"     // 最后上架时间
	    this.inCity = data.CarInCity||"未知城市"          // 车辆所在城市
	    // 上牌时间
	    this.plateDate = data.OnLicensePlateDate||""
	    this.mileage = data.Mileage||0           // 行驶里程
	    this.price = data.B2BPrice||0            // 价格
	    this.retailPrice = data.RetailPrice||0   // 普通市场价格
	    this.status = data.Status||0             // 车源状态

	    //如果未认证，那么身份标识为未认证
	    switch(this.status.toString()){
	        case "1":   // 在售
	            this.statusTetx = "在售"
	            break;
	        case "2":   // 交易中
	            this.statusTetx = "交易中"
	            break;
	        case "0":   // 审核中
	            this.statusTetx = "审核中"
	            break;
	        case "3":   // 已售
	            this.statusTetx = "已售"
	            break;
	        case "-1":   // 已下架
	            this.statusTetx = "已下架"
	            break;
	        case "-2":   // 审核失败
	            this.statusTetx = "审核失败"
	            break;
	    }
	}
}

export {sourceInfo};