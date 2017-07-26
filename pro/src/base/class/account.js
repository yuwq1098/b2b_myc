// 账户余额的构造类
class balanceData{
    constructor(data) {
	    this.balance = data.YE||0                  // 平台余额
	    this.xinyu = data.XYJ||0                   // 信誉保证金
	    this.buyDeposit = data.BuyCarBZJ||0        // 买车保证金
	    this.sellDeposit = data.SellCarBZJ||0      // 卖车保证金
	    this.managed = data.CK||0                  // 买车委托款
	}
}

// 账单信息的构造类
class billInfo{
    constructor(data) {
	    this.cid = data.TradeId||""                  // 流水号
	    this.type = data.TradeDirection||""          // 交易类别
	    this.belong = data.TradeSource||""           // 交易所属
	    this.price = data.TradeAmount||""            // 交易金额
	    this.desc = data.TradeDescription||""        // 交易明细
	    this.status =  data.TradeStatus||""          // 交易状态
	    this.statusText =  data.StatusText||""       // 文本
	    this.timeStart = data.PayTimeStart||""            // 交易开始时间
	    this.timeEnd = data.PayTimeEnd||""                // 交易结束时间

	    // if(this.price==0){
     //        return;
	    // }else{
	    	
	    // 	this.price = Math.abs(+this.price);
	    // 	switch(this.type){
	    // 		case "充值":
	    // 		    return this.price = '+'+ this.price
	    // 		    break;
     //            case "提现":
     //                return this.price = '-'+ this.price
     //                break;
     //            case "转账":
     //                return this.price = '-'+ this.price
     //                break;
	    // 	}
	    // }
	}
}

// 账单详情的构造类
class billDetails{
    constructor(data) {
	    this.billId = data.TradeId||""                  // 交易流水号
	    this.source = data.TradeSource||""              // 交易类型
	    this.direction = data.TradeDirection||""        // 交易动向
	    this.payType = data.PayType||""                 // 支付方式
	    this.amount = data.TradeAmount||0               // 交易金额
	    this.startTime = data.PayTimeStart||""          // 交易发起时间
	    this.endTime = data.PayTimeEnd||"暂无数据"      // 交易结束时间
	    this.orderNo = data.OrderNumber||""             // 订单号
	    this.otherTradeNo = data.OtherTradeNo||""       // 第三方交易单号（微信支付宝银行支付时会有）
	    this.desc = data.TradeDescription||""           // 交易详情描述
	    // 交易状态（-1异常关闭，0待处理、待支付，1已处理、已支付，2提现处理中）
	    this.status = data.TradeStatus||data.TradeStatus===0?data.TradeStatus:""              
	    this.progress = data.TradeProgress||0           // 交易进度
	    
        
        // 交易类型文本提示
	    this.payTypeText = ""
	    switch(this.payType){
            case 'alipay':
                this.payTypeText = "支付宝"
                break;
            case 'wxpay_jsapi':
                this.payTypeText = "微信支付"
                break;
            case 'wxpay_app':
                this.payTypeText = "微信支付"
                break;
            case 'wxpay_native':
                this.payTypeText = "微信扫码支付"
                break;
            case '木有车':
                this.payTypeText = "余额支付"
                break;
            case 'abc':
                this.payTypeText = "农行支付"
                break;
            case 'union_pay':
                this.payTypeText = "银联支付"
                break;
	    }
        
        // 是否是车辆（商品）交易
        this.isBuyProduct = false
        if(this.orderNo!=""){
            this.isBuyProduct = true
        }

        this.statusText = ""
        switch(this.status){
            case -1:
                if(this.direction=="充值"){
                    this.statusText = "充值异常关闭"
                }else if(this.direction=="提现"){
                    this.statusText = "提现异常关闭"
                }else{
                    this.statusText = "交易异常关闭"
                }
                break;
            case 0:
                if(this.direction=="充值"){
                    this.statusText = "充值待处理"
                }else if(this.direction=="提现"){
                    this.statusText = "提现待处理"
                }else{
                    this.statusText = "交易待支付"
                }
                break;
            case 1:
                if(this.direction=="充值"){
                    this.statusText = "充值已完成"
                }else if(this.direction=="提现"){
                    this.statusText = "提现已完成"
                }else{
                    this.statusText = "交易已完成"
                }
                break;
            case 2:
                if(this.direction=="充值"){
                    this.statusText = "充值正在处理中"
                }else if(this.direction=="提现"){
                    this.statusText = "提现正在处理中"
                }else{
                    this.statusText = "交易正在处理中"
                }
                break;
	    }

	}
}



export {balanceData,billInfo,billDetails};