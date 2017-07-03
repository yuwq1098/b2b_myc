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

export {balanceData};