/** 
 * @description 更多网站功能的本地数据
 * @creatDate 2017-08-19
 * @author Geek.Yu  email:1098654043@qq.com
 */

// 侧边栏--关于我们
export const aboutMenu = [{
        'title': '我们是谁',
        'hash': '/about/who',
    },
    {
        'title': '我们做啥',
        'hash': '/about/what',
    },
    // {
    //     'title': '我们的优势',
    //     'hash': '/about/advantage',
    // },
    {
        'title': '联系我们',
        'hash': '/about/contact',
    },
    {
        'title': '帮助中心',
        'hash': '/helpCenter',
    },
    {
        'title': '意见反馈',
        'hash': '/about/feedback',
    },
    {
        'title': '友情链接',
        'hash': '/about/partner',
    },
    {
        'title': '招贤纳士',
        'hash': '/about/recruit',
    },

]

// 侧边栏--帮助中心
export const helpMenu = [{
        'title': '常见问题',
        'hash': '/helpCenter/FAQ',
    },
    {
        'title': '平台功能（视频）',
        'hash': '/practice',
    },
    {
        'title': 'B2B交易规则',
        'hash': '/helpCenter/dealFlow',
    },
    {
        'title': '认证流程及审批',
        'hash': '/helpCenter/applyFlow',
    },
    {
        'title': '隐私保护承诺',
        'hash': '/helpCenter/privacy',
    },
    {
        'title': '关于我们',
        'hash': '/about',
    },

]


// 引入系统变量
import * as SYSTEM from 'api/system.js'

// 帮助中心 - FAQ常见问题的数据
export const FAQData = [{
        'title': '平台入驻需支付入驻费吗？',
        'info': [
            "a. 木有车平台除B2B大厅须支付" + SYSTEM.DEAL_CREDIT_TEXT + "商家认证信誉金外，其他项目入驻均免费；",
            "b. B2B大厅里商家认证金在正常情况下，需退款，可全额退回至个人钱包（特殊情况如，卖方在B2B大厅里发布车辆，有买方购买且签合同情况下，卖方在自己订单里取消订单，需支付200元违约金，违约金返守约方）。",
        ],
    },
    {
        'title': '进入二手车B2B市场是免费的吗？',
        'info': [
            "可以在二手车B2B市场免费查看车辆信息，不可以进行交易。",
            "（交易需先进行商家认证，认证时需支付" + SYSTEM.DEAL_CREDIT_TEXT + "商家信誉保证金）",
        ],
    },
    {
        'title': '什么是信誉保证金？',
        'info': [
            "信誉保证金是商家在B2B市场内进行商家认证时交付的商家认证款项，可随时提现，提现平台不扣退款费。",
        ],
    },
    {
        'title': '平台办业务需支付交易费吗？',
        'info': [
            "木有车平台除在B2B大厅交易成功后，买卖双方每人每次需要支付200元的交易费（交易费买卖双方上家与平台平分），平台其他项目均不收交易费。",
        ],
    },
    {
        'title': '进入B2B大厅流程？',
        'info': [
            "a. 进入木有车APP首页，点击进入二手车B2B大厅；",
            "b. " + SYSTEM.DEAL_CREDIT_TEXT + "商家认证信誉保证金；",
            "c. 进行买车/卖车。",
        ],
    },
    {
        'title': '入驻平台B2B有什么优势？',
        'info': [
            "a. 免费查询4s保养记录；",
            "b. 违章免费查询；",
            "c. 免费查看批发车源（享受查看批发价特权）；",
            "d. 一口价专区（万人诚信批发交易平台）；",
            "e. 交易仲裁服务（公正处理争议纠纷）；",
            "f. 资金由农业银行托管，安全放心；",
            "g. 查看成交记录、出价、询价 ；",
            "h. 异地车辆成交后托运服务。",
        ],
    },
    {
        'title': '在B2B买卖车辆需支付保证金？',
        'info': [
            "a. 为了保证买卖双方的权益，在交易时双方均需支付3000元保证金，保证金由平台第三方农业银行全程托管；",
            "b. 交易确认完成，保证金全额退回个人钱包；",
            "c. 买卖双方一方违约时，交易金全额归守约方所有。",
        ],
    },
    {
        'title': 'B2C大厅优势？',
        'info': [
            "a. 免费入驻B2C大厅；",
            "b. 在B2C零售大厅里购车，可发给朋友圈好友砍至最低价；",
            "c. B2C零售大厅提供二手车估值、购车计算、查保养、查违章等。",
        ],
    },
]