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


export {balanceData,billInfo};