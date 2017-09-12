/**
 * 全局code代码
 */

//成功
export const CODE_IS_OK = 0
//失败
export const CODE_IS_ERROR = -1
//身份过期,需要重新登录
export const CODE_IS_OUT = -4000



// 信誉保证金
export const MIN_CREDIT_GOLD = 200
// 支付信誉保证金提示文本
export const DEAL_CREDIT_TEXT = "200元（限时活动）"; 

// b2b大厅搜索条数限制
export const HALL_RESULE_PAGE_SIZE = 25

// 评论搜索条数限制
export const COMMENT_RESULE_PAGE_SIZE = 5

// 手机车辆详情路径
export const MOBILE_CAR_DETAILS_URL_ROOT = "https://"+(process.env.NODE_ENV === 'production' ? 'www': "test")+".muyouche.com/mo1/?#/B2BDetail?CarId="

// 车价评判高低的基数权重
export const JUDGE_PRICE_WEIGHTED = 10

/**
 * B2B订单状态
 */

// -10仲裁中，
// -5仲双方不交易，
// -4仲买取消，
// -3仲卖取消，
// -2买取消，
// -1卖取消，
// 0新单（待卖方签署合同-》指定车款是否平台托管，托管的额度是多少？），
// 1卖方已签（待买方签），
// 2买方签（待买方支付保证金），
// 3买已付保证金（待卖方支付保证金—-如果没托管车款，卖方付款完后进入5待卖家发货），
// 4卖方已付保证金（待买家托管车款—-付完车款后进入5），
// 5待卖家发货，
// 6卖家已发货（待买家验收），
// 7买家验收（终结）



 /**
 * B2B车辆状态
 */

// status=
// -2审核失败·
// -1下架·
// 0待审核·
// 1审核成功·
// 2交易中·
// 3交易完成·



