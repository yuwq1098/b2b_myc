
/** 
* @description 会员中心面包屑列表本地化资源 
* @creatDate 2017-6-28
* @author Geek.Yu  email:1098654043@qq.com
*/ 

// 面包屑hash哈希匹配
export const crumbsHash = {
    
    // 我的认证
    '/member/applyHome':[
        {
            pathName:"认证主页",
            path:"/member/applyHome",
        }
    ],
    // 认证资料提交
    '/member/putApply':[
        {
            pathName:"认证主页",
            path:"/member/applyHome",
        },
        {
            pathName:"认证资料提交",
            path:"/member/putApply",
        }
    ],
    // 车行认证营业执照补交
    '/member/merchantApply':[
        {
            pathName:"认证主页",
            path:"/member/applyHome",
        },
        {
            pathName:"营业执照补交",
            path:"/member/merchantApply",
        }
    ],
    // 我的购物车
    '/member/shopCart':[
        {
            pathName:"我的购物车",
            path:"/member/shopCart",
        }
    ],
    // 买车订单
    '/member/buyOrder':[
        {
            pathName:"买车订单",
            path:"/member/buyOrder",
        }
    ],
    // 卖车订单
    '/member/sellOrder':[
        {
            pathName:"卖车订单",
            path:"/member/sellOrder",
        }
    ],
    
    // 买车订单-详情页
    '/member/buyOrderDetails':[
        {
            pathName:"买车订单",
            path:"/member/buyOrder",
        },
        {
            pathName:"订单详情",
            path:"/member/buyOrderDetails",
        }
    ],
    // 卖车订单-详情页
    '/member/sellOrderDetails':[
        {
            pathName:"卖车订单",
            path:"/member/sellOrder",
        },
        {
            pathName:"订单详情",
            path:"/member/sellOrderDetails",
        }
    ],
    // 订单支付
    '/member/orderPay':[
        {
            pathName:"订单支付",
            path:"/member/orderPay",
        }
    ],
    // 支付托管车款（尾款）
    '/member/fullPayout':[
        {
            pathName:"买车订单",
            path:"/member/buyOrder",
        },
        {
            pathName:"支付托管车款（尾款）",
            path:"/member/fullPayout",
        }
    ],
    // 买家签收
    '/member/signOff':[
        {
            pathName:"买车订单",
            path:"/member/buyOrder",
        },
        {
            pathName:"买家确认签收",
            path:"/member/signOff",
        }
    ],
    // 维权申请页
    '/member/arbitrateApply':[
        {
            pathName:"维权申请页",
            path:"/member/arbitrateApply",
        }
    ],
    // 买车仲裁维权列表
    '/member/buyArbitrateList':[
        {
            pathName:"买车订单",
            path:"/member/buyOrder",
        },
        {
            pathName:"买车仲裁维权列表",
            path:"/member/buyArbitrateList",
        }
    ],
    // 卖车仲裁维权列表
    '/member/sellArbitrateList':[
        {
            pathName:"卖车订单",
            path:"/member/sellOrder",
        },
        {
            pathName:"卖车仲裁维权列表",
            path:"/member/sellArbitrateList",
        }
    ],
    // 买家维权详情页
    '/member/arbitrateBuy':[
        {
            pathName:"仲裁维权列表",
            path:"/member/buyArbitrateList",
        },
        {
            pathName:"买家维权详情页",
            path:"/member/arbitrateBuy",
        }
    ],
    // 卖家维权详情页
    '/member/arbitrateSell':[
        {
            pathName:"仲裁维权列表",
            path:"/member/sellArbitrateList",
        },
        {
            pathName:"卖家维权详情页",
            path:"/member/arbitrateSell",
        }
    ],

    // 买方签署合同
    '/member/contractBuy':[
        {
            pathName:"买车订单",
            path:"/member/buyOrder",
        },
        {
            pathName:"买方签署合同",
            path:"/member/contractBuy",
        }
    ],
    // 卖方发起合同
    '/member/contractSell':[
        {
            pathName:"卖车订单",
            path:"/member/sellOrder",
        },
        {
            pathName:"卖方发起合同",
            path:"/member/contractSell",
        }
    ],
    // 合同详情
    '/member/contractDetails':[
        {
            pathName:"查看买卖车合同",
            path:"/member/contractDetails",
        }
    ],
    // 我的车源
    '/member/sourceHome':[
        {
            pathName:"我的车源",
            path:"/member/sourceHome",
        }
    ],
    // 编辑车源
    '/member/sourceEdit':[
        {
            pathName:"我的车源",
            path:"/member/sourceHome",
        },
        {
            pathName:"编辑车源",
            path:"/member/sourceEdit",
        },
    ],
    // 现金账户
    '/member/wallet':[
        {
            pathName:"现金账户",
            path:"/member/wallet",
        }
    ],
    // 账单详情
    '/member/billDetails':[
        {
            pathName:"现金账户",
            path:"/member/wallet",
        },
        {
            pathName:"账单详情",
            path:"/member/billDetails",
        },
    ],
    // 充值
    '/member/recharge':[
        {
            pathName:"现金账户",
            path:"/member/wallet",
        },
        {
            pathName:"充值",
            path:"/member/recharge",
        },
    ],
    // 提现
    '/member/withdraw':[
        {
            pathName:"现金账户",
            path:"/member/wallet",
        },
        {
            pathName:"提现",
            path:"/member/withdraw",
        },
    ],
    // 车辆收藏页
    '/member/collectCar':[
        {
            pathName:"车辆收藏",
            path:"/member/collectCar",
        }
    ],
    // 车行收藏页
    '/member/merchantCar':[
        {
            pathName:"车行收藏",
            path:"/member/merchantCar",
        }
    ],
    // 个人资料设置
    '/member/personal':[
        {
            pathName:"个人资料设置",
            path:"/member/personal",
        }
    ],
    // 绑定银行卡
    '/member/cardManage':[
        {
            pathName:"绑定银行卡",
            path:"/member/cardManage",
        }
    ],
    // 银行卡修改
    '/member/cardEdit':[
        {
            pathName:"绑定银行卡",
            path:"/member/cardManage",
        },
        {
            pathName:"编辑银行卡",
            path:"/member/cardEdit",
        },
    ],
    // 银行卡新增
    '/member/cardAdd':[
        {
            pathName:"绑定银行卡",
            path:"/member/cardManage",
        },
        {
            pathName:"新增银行卡",
            path:"/member/cardAdd",
        },
    ],
	// 安全中心页
    '/member/safetyCenter':[
        {
            pathName:"安全中心",
            path:"/member/safetyCenter",
        }
    ],
	// 密码修改页
    '/member/safetyPass':[
        {
            pathName:"安全中心",
            path:"/member/safetyCenter",
        },
        {
            pathName:"密码修改",
            path:"/member/safetyPass",
        }
    ],
    // 忘记密码
    '/member/safetyForget':[
        {
            pathName:"安全中心",
            path:"/member/safetyCenter",
        },
        {
            pathName:"忘记密码",
            path:"/member/safetyForget",
        }
    ],
	// 更改手机绑定
    '/member/safetyTel':[
        {
            pathName:"安全中心",
            path:"/member/safetyCenter",
        },
        {
            pathName:"更改手机绑定",
            path:"/member/safetyTel",
        }
    ],
    // 设置支付密码
    '/member/payPass':[
        {
            pathName:"安全中心",
            path:"/member/safetyCenter",
        },
        {
            pathName:"设置支付密码",
            path:"/member/payPass",
        }
    ],
    // 修改支付密码
    '/member/editPayPass':[
        {
            pathName:"安全中心",
            path:"/member/safetyCenter",
        },
        {
            pathName:"修改支付密码",
            path:"/member/editPayPass",
        }
    ],
    // 找回（忘记）支付密码
    '/member/forgetPayPass':[
        {
            pathName:"安全中心",
            path:"/member/safetyCenter",
        },
        {
            pathName:"找回支付密码",
            path:"/member/forgetPayPass",
        }
    ],
}