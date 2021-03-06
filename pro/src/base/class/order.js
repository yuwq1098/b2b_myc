// 买车 订单信息的构造类
class buyOrderInfo{
    constructor(data) {
	    this.id = data.OrderId||""                         // 订单号
	    this.createTime = data.OrderCreateTime||""         // 订单创建时间
	    this.status = data.OrderStatus||0                  // 订单状态
	    this.statusTime = data.OrderStatusTime||""         // 订单当前状态时间
	    this.errorStatus = data.ErrStatus||0               // 维权发起前订单的状态
	    this.errOriginator = data.ErrOriginator||""        // 订单异常发起人（卖家、买家、平台）
	    this.ErrDesc = data.ErrDescription||""             // 订单异常发起时填写的原因

	    this.carId = data.CarId||""                        // 车辆id
	    this.carTitle = data.Title||""                     // 订单标题（一般就是车型名）
	    // 车辆首图链接
	    this.imgUrl = data.FirstImg?data.FirstImg+"?imageView2/3/w/200/h/150":"";                   
	    this.inCity = data.CarInCity||""                   // 车辆所在地
	    this.plateDate = data.OnLicensePlateDate||""       // 上牌时间
	    this.mileage = data.Mileage||0                     // 里程数
	    this.price = data.B2BPrice||0                      // 一口价

	    this.needManaged= data.NeedEntrustCarMoney||""     // 是否托管车款
	    this.managedPrice = data.CarMoneyValue||""         // 托管的车款额度
	    this.buyerId = data.BuyyerId||""                   // 买家id
	    this.buyerName = data.BuyerNickName||""            // 买家昵称
	    this.buyerTel = data.BuyerMobile||""               // 买家电话
	    this.buyerFace = data.BuyerPhoto||""               // 买家头像
	    this.sellerId = data.SellerId||""                  // 卖家id
	    this.sellerName = data.SellerNickName||""          // 卖家昵称
	    this.sellerTel = data.SellerMobile||""             // 卖家电话
	    this.sellerFace = data.SellerPhoto||""             // 卖家头像

	    this.statusDesc = ""        // 订单状态描述

	    switch(this.status){
            case 0:   // 待卖方发起合同
                return this.statusDesc = "待卖方发起合同";
                break;
            case 1:   // 待我方签署合同
                return this.statusDesc = "待我方签署合同";
                break;
            case 2:   // 待我方支付保证金
                return this.statusDesc = "待我方支付保证金";
                break;
            case 3:   // 待卖方支付保证金
                return this.statusDesc = "待卖方支付保证金";
                break;
            case 4:   // 待我方支付尾款
                return this.statusDesc = "待我方支付尾款";
                break;
            case 5:   // 待卖方发货
                return this.statusDesc = "待卖方发货";
                break;
            case 6:   // 带我方验收
                return this.statusDesc = "带我方验收";
                break;
            case 7:   // 交易完毕
                return this.statusDesc = "交易完毕";
                break;
        }

	}
}

// 卖车 订单信息的构造类
class sellOrderInfo{
    constructor(data) {
	    this.id = data.OrderId||""                         // 订单号
	    this.createTime = data.OrderCreateTime||""         // 订单创建时间
	    this.status = data.OrderStatus||0                  // 订单状态
	    this.statusTime = data.OrderStatusTime||""         // 订单当前状态时间
	    this.errorStatus = data.ErrStatus||0               // 维权发起前订单的状态
	    this.errOriginator = data.ErrOriginator||""        // 订单异常发起人（卖家、买家、平台）
	    this.ErrDesc = data.ErrDescription||""             // 订单异常发起时填写的原因

	    this.carId = data.CarId||""                        // 车辆id
	    this.carTitle = data.Title||""                     // 订单标题（一般就是车型名）
	    // 车辆首图链接
	    this.imgUrl = data.FirstImg?data.FirstImg+"?imageView2/3/w/200/h/150":"";                   
	    this.inCity = data.CarInCity||""                   // 车辆所在地
	    this.plateDate = data.OnLicensePlateDate||""       // 上牌时间
	    this.mileage = data.Mileage||0                     // 里程数
	    this.price = data.B2BPrice||0                      // 一口价

	    this.needManaged= data.NeedEntrustCarMoney||""     // 是否托管车款
	    this.managedPrice = data.CarMoneyValue||""         // 托管的车款额度
	    this.buyerId = data.BuyyerId||""                   // 买家id
	    this.buyerName = data.BuyerNickName||""            // 买家昵称
	    this.buyerTel = data.BuyerMobile||""               // 买家电话
	    this.buyerFace = data.BuyerPhoto||""               // 买家头像
	    this.sellerId = data.SellerId||""                  // 卖家id
	    this.sellerName = data.SellerNickName||""          // 卖家昵称
	    this.sellerTel = data.SellerMobile||""             // 卖家电话
	    this.sellerFace = data.SellerPhoto||""             // 卖家头像

	    this.statusDesc = ""        // 订单状态描述

	    switch(this.status){
            case 0:   // 待发起合同
                return this.statusDesc = "待我方发起合同";
                break;
            case 1:   // 待买方签署合同
                return this.statusDesc = "待买方签署合同";
                break;
            case 2:   // 待买方支付保证金
                return this.statusDesc = "待买方支付保证金";
                break;
            case 3:   // 待我方支付保证金
                return this.statusDesc = "待我方支付保证金";
                break;
            case 4:   // 待买方支付尾款
                return this.statusDesc = "待买方支付尾款";
                break;
            case 5:   // 待我方发货
                return this.statusDesc = "待我方发货";
                break;
            case 6:   // 待买方验收
                return this.statusDesc = "待买方验收";
                break;
            case 7:   // 交易完毕
                return this.statusDesc = "交易完毕";
                break;
        }

	}
}

// 订单信息的构造类
class orderInfo{
    constructor(data) {
	    this.id = data.OrderId||""                         // 订单号
	    this.createTime = data.OrderCreateTime||""         // 订单创建时间
	    // 订单状态
	    this.status = data.OrderStatus||data.OrderStatus===0?data.OrderStatus:0
	    this.statusTime = data.OrderStatusTime||""         // 订单当前状态时间
	    // 维权发起前订单的状态
	    this.errorStatus = data.ErrStatus||data.ErrStatus===0?data.ErrStatus:0
	    this.errOriginator = data.ErrOriginator||""        // 订单异常发起人（卖家、买家、平台）
	    this.ErrDesc = data.ErrDescription||""             // 订单异常发起时填写的原因

	    this.carId = data.CarId||""                        // 车辆id
	    this.carTitle = data.Title||""                     // 订单标题（一般就是车型名）
	    // 车辆首图链接
	    this.imgUrl = data.FirstImg?data.FirstImg+"?imageView2/3/w/200/h/150":"";                   
	    this.inCity = data.CarInCity||""                   // 车辆所在地
	    this.plateDate = data.OnLicensePlateDate||""       // 上牌时间
	    this.mileage = data.Mileage||0                     // 里程数
	    this.price = data.B2BPrice||0                      // 一口价

	    this.needManaged= data.NeedEntrustCarMoney||""     // 是否托管车款
	    this.managedPrice = data.CarMoneyValue||""         // 托管的车款额度
	    this.buyerId = data.BuyyerId||""                   // 买家id
	    this.buyerName = data.BuyerNickName||""            // 买家昵称
	    this.buyerTel = data.BuyerMobile||""               // 买家电话
	    this.buyerFace = data.BuyerPhoto||""               // 买家头像
	    this.sellerId = data.SellerId||""                  // 卖家id
	    this.sellerName = data.SellerNickName||""          // 卖家昵称
	    this.sellerTel = data.SellerMobile||""             // 卖家电话
	    this.sellerFace = data.SellerPhoto||""             // 卖家头像

	    this.statusDesc = ""        // 订单状态描述


        this.orderDesc = ""         // 订单状态描述
	    switch(this.status){
	    	case -10:   // 仲裁中
                return this.orderDesc = "仲裁中";
                break;
            case -5:   // 仲双方不交易
                return this.orderDesc = "双方和平取消";
                break;
            case -4:   // 仲买取消
                return this.orderDesc = "责任方为买方";
                break;
            case -3:   // 仲卖取消
                return this.orderDesc = "责任方为卖方";
                break;
            case -2:   // 买取消
                return this.orderDesc = "买方强制取消";
                break;
            case -1:   // 卖取消
                return this.orderDesc = "卖方强制取消";
                break;
        }

	}
}

// 发起合同信息的构造类
class sponsorContract{
    constructor(data) {

    	this.carId = data.CarId||""                        // 车辆id
    	this.sellerId = data.SellerId||""                  // 卖家id
    	this.seller = data.Seller||""                      // 卖家
    	this.sellerIdcNo = data.SellerIdcNo||""            // 卖方身份证号
    	this.buyerId = data.BuyerId||""                    // 买方id
    	this.buyer = data.Buyer||""                        // 买家
    	this.buyerIdcNo = data.BuyerIdcNo||""              // 买方身份证号
    	this.vin = data.VinNumber||""                      // vin车架号
    	this.transfer = data.CanTransfer||""               // 能否过户
    	// 车况描述
    	this.otherDescription = data.CarOtherDescription||""             
    	this.finalPrice = data.FinalPrice||0               // 成交价
    	this.sellerDeposit = data.SellerCashDeposit||0     // 卖方保证金
    	this.buyerDeposit = data.BuyerCashDeposit||0       // 买方保证金

    }
}

// 合同详情的构造类
class contractDetails{

    constructor(data) {
        
        this.orderId = data.OrderId||""                    // 订单id
    	this.carId = data.CarId||""                        // 车辆id
    	this.contractBody = data.ContractBody||{}          // 合同内容
    	this.carInfo = data.CarInfo||{}                    // 车辆信息（本对像里返回全为String）

    	this.sellerId = data.SellerId||""                  // 卖家id
    	this.sellerTel = data.SellMobile||""               // 卖家电话
    	this.sellerSignImg = data.SellerSignUrl||""        // 卖家签名图片
    	this.sellerSignTime = data.SellerSignTime||""      // 卖家签署时间

    	this.buyerId = data.BuyerId||""                    // 买方id
    	this.buyerTel = data.BuyerMobile||""               // 买方电话
    	this.buyerSignImg = data.BuyerSignUrl||""          // 买方签名图片
    	this.buyerSignTime = data.BuyerSignTime||""        // 买方签署时间
        
        this.waring =  data.Waring||""                     // 警告内容，非常重要，如果合同有异常，会在这里有提示内容，给及时弹窗给客户查看
        this.timeStamp =  data.ContractTimeStamp||0        // 合同末次时间戳（7月20日起买家签署必须时，必须使用，避免卖家在买家签署期间修改了合同，而不同步）

    }

}

// 合同详情的构造类
class contractBody{

    constructor(data) {

    	this.seller = data.Seller||""                      // 卖家
    	this.sellerIdcNo = data.SellerIdcNo||""            // 卖方身份证号
    	this.buyer = data.Buyer||""                        // 买家
    	this.buyerIdcNo = data.BuyerIdcNo||""              // 买方身份证号

    	this.plateNumber = data.PlateNumber||""            // 车牌号
    	this.vin = data.VinNumber||""                      // vin车架号
    	this.engineNumber = data.EngineNumber||""          // 发动机号
        
        // 抵押按揭(有无按揭)
    	this.hasMortgage = data.HasMortgage!=undefined?data.HasMortgage.toString():""
    	// 能否过户
    	this.transfer = data.CanTransfer!=undefined?data.CanTransfer.toString():""        

    	this.pickArchiveDate = data.PickArchiveDate||""    // 提档日期
    	this.buyerPickCarDate = data.BuyerPickCarDate||""  // 提车日期
    	this.carOtherDesc = data.CarOtherDescription||""   // 车况描述
    	this.finalPrice = data.FinalPrice||0               // 成交价
    	this.sellerDeposit = data.SellerCashDeposit||0     // 卖方保证金
    	this.buyerDeposit = data.BuyerCashDeposit||0       // 买方保证金
        // 是否托管车款
    	this.needEntrust = data.NeedEntrustCarMoney!=undefined?data.NeedEntrustCarMoney.toString():""    
    	this.entrustMoney = data.CarMoneyValue||0          // 托管的车款金额
    }

}

export {
	buyOrderInfo,
	sellOrderInfo,
	orderInfo,
	sponsorContract,
	contractDetails,
	contractBody,
};
