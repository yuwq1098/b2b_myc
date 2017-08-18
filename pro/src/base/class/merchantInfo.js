// 车行信息构造类
class merchantInfo{
	constructor(data) {
	    this.id = data.MemberId||""                                 // 车行的会员 MemberId
	    this.name = data.CdgName||"暂无数据"                                // 车行名
	    this.authType = data.AuthType||"暂无数据"                   // 认证类别（企业车行、个人车行）
	    this.username = data.UserName||"暂无数据"                   // 联系人
	    this.tel = data.Mobile||"18700000000"                       // 联系人电话
	    this.address = data.Address||"暂无地址"                     // 地址
	    this.fixtureNumber = data.ShippingCount||"0"                // 总成交单数
	    this.onSale = data.CarCount||"0"                            // 在售车辆数
	    this.isFavorite = data.HasFavorite||false                   // 是否收藏了此车行
        this.favoriteNum = data.CdgFvCount||0                       // 收藏数
	    this.isPartner =  data.IsB2BPartner||true                   // 是否为合作商省份
	    this.carList = data.CarList||[]                             // 在售车辆列表
	}
}

export {merchantInfo};

