import App from '../App'


// 网站首页
const index = r => require.ensure([], () => r(require('page/home')), 'index')
    // b2b大厅(买车)
const b2bHall = r => require.ensure([], () => r(require('page/buy/b2bHall')), 'b2bHall')
    // 购物车
const shoppingCart = r => require.ensure([], () => r(require('page/shoppingCart')), 'shoppingCart')


// 卖车大厅
const sell = r => require.ensure([], () => r(require('page/sell/sell.vue')), 'sell')
    // 发布车辆订单填写页
const sendCar = r => require.ensure([], () => r(require('page/sell/sendCar.vue')), 'sendCar')
    // 车商圈
const dealerCircle = r => require.ensure([], () => r(require('page/dealer-circle')), 'dealerCircle');


// b2b车辆详情
const b2bCarDetails = r => require.ensure([], () => r(require('page/car-details/b2bCar.vue')), 'b2bCarDetails')

// 车商详情页
const merchantDetails = r => require.ensure([], () => r(require('page/merchant-details')), 'merchantDetails')


// 会员中心
const member = r => require.ensure([], () => r(require('page/member/member')), 'member')
    // 会员中心首页（大概的包括各种信息）
const memberHome = r => require.ensure([], () => r(require('page/member/home')), 'memberHome')


// 用户中心 => 我的认证 => 认证首页
const applyHome = r => require.ensure([], () => r(require('page/member/center/apply/home')), 'applyHome')
    // 用户中心 => 我的认证 => 上传认证资料
const putApply = r => require.ensure([], () => r(require('page/member/center/apply/put')), 'putApply')
    // 用户中心 => 我的认证 => 补交认证资料
const merchantApply = r => require.ensure([], () => r(require('page/member/center/apply/merchant')), 'merchantApply')


// 用户中心 => 我的购物车
const m_shoppingCart = r => require.ensure([], () => r(require('page/member/center/shopping-cart')), 'm_shoppingCart')


// 买车订单
const buyOrder = r => require.ensure([], () => r(require('page/member/order/buy')), 'buyOrder')
    // 卖车订单
const sellOrder = r => require.ensure([], () => r(require('page/member/order/sell')), 'sellOrder')


// 买车订单 => 订单详情
const buyOrderDetails = r => require.ensure([], () => r(require('page/member/order/details/buy')), 'buyOrderDetails')
    // 卖车订单 => 订单详情
const sellOrderDetails = r => require.ensure([], () => r(require('page/member/order/details/sell')), 'sellOrderDetails')


// 订单管理 => 买车合同
const contractBuy = r => require.ensure([], () => r(require('page/member/contract/buyCar/index')), 'contractBuy')
    // 订单管理 => 卖车合同
const contractSell = r => require.ensure([], () => r(require('page/member/contract/sellCar/index')), 'contractSell')
    // 订单管理 => 卖方修改合同
const editContract = r => require.ensure([], () => r(require('page/member/contract/sellCar/editContract')), 'editContract')
    // 订单管理 => 合同详情
const contractDetails = r => require.ensure([], () => r(require('page/member/contract/details/index')), 'contractDetails')


// 订单管理 => 订单支付
const orderPay = r => require.ensure([], () => r(require('page/member/payment')), 'orderPay')
    // 订单管理 => 支付托管车款（尾款）
const fullPayout = r => require.ensure([], () => r(require('page/member/payment/fullPayout')), 'fullPayout')
    // 订单管理 => 买家签收
const signOff = r => require.ensure([], () => r(require('page/member/payment/signOff')), 'signOff')


// 订单管理 => 维权申请页
const arbitrateApply = r => require.ensure([], () => r(require('page/member/order/arbitrate/apply')), 'arbitrateApply')
    // 订单管理 => 买家维权详情页
const arbitrateBuy = r => require.ensure([], () => r(require('page/member/order/arbitrate/details/buy')), 'arbitrateBuy')
    // 订单管理 => 卖家维权详情页
const arbitrateSell = r => require.ensure([], () => r(require('page/member/order/arbitrate/details/sell')), 'arbitrateSell')
    // 订单管理 => 买车仲裁列表
const buyArbitrateList = r => require.ensure([], () => r(require('page/member/order/arbitrate/list/buy')), 'buyArbitrateList')
    // 订单管理 => 卖车仲裁列表
const sellArbitrateList = r => require.ensure([], () => r(require('page/member/order/arbitrate/list/sell')), 'sellArbitrateList')


// 车源管理 => 我的车源
const mySource = r => require.ensure([], () => r(require('page/member/car-source/manage')), 'mySource')
    // 车源管理 => 编辑车源
const editSource = r => require.ensure([], () => r(require('page/member/car-source/edit')), 'editSource')


// 我的钱包 => 钱包主页
const walletHome = r => require.ensure([], () => r(require('page/member/wallet/home')), 'walletHome')
    // 我的钱包 => 账单详情
const billDetails = r => require.ensure([], () => r(require('page/member/wallet/bill-details')), 'billDetails')
    // 我的钱包 => 充值
const recharge = r => require.ensure([], () => r(require('page/member/wallet/recharge')), 'recharge')
    // 我的钱包 => 提现
const withdraw = r => require.ensure([], () => r(require('page/member/wallet/withdraw')), 'withdraw')


// 我的收藏 => 车辆收藏
const carCollect = r => require.ensure([], () => r(require('page/member/collect/car/index')), 'carCollect')
    // 我的收藏 => 车商收藏
const merchantCollect = r => require.ensure([], () => r(require('page/member/collect/merchant/index')), 'merchantCollect')


// 账户设置 => 个人资料设置
const personalSetting = r => require.ensure([], () => r(require('page/member/setting/personal')), 'personalSetting')
    // 账户设置 => 银行卡管理
const bankCardManage = r => require.ensure([], () => r(require('page/member/setting/bank-card/list')), 'bankCardManage')
    // 账户设置 => 银行卡修改
const bankCardEdit = r => require.ensure([], () => r(require('page/member/setting/bank-card/edit')), 'bankCardEdit')
    // 账户设置 => 银行卡添加
const bankCardAdd = r => require.ensure([], () => r(require('page/member/setting/bank-card/add')), 'bankCardAdd')


// 账户设置 => 安全中心 => 内容主页
const safetyCenter = r => require.ensure([], () => r(require('page/member/setting/safety')), 'safetyCenter')
    // 账户设置 => 安全中心 => 密码修改
const safetyPass = r => require.ensure([], () => r(require('page/member/setting/safety/password')), 'safetyPass')
    // 账户设置 => 安全中心 => 忘记密码
const safetyForget = r => require.ensure([], () => r(require('page/member/setting/safety/forget')), 'safetyForget')
    // 账户设置 => 安全中心 => 手机号绑定修改
const safetyTel = r => require.ensure([], () => r(require('page/member/setting/safety/telephone')), 'safetyTel')


// 账户设置 => 安全中心 => 设置支付密码
const payPass = r => require.ensure([], () => r(require('page/member/setting/safety/payPass')), 'payPass')
    // 账户设置 => 安全中心 => 修改支付密码
const editPayPass = r => require.ensure([], () => r(require('page/member/setting/safety/editPayPass')), 'editPayPass')
    // 账户设置 => 安全中心 => 忘记支付密码
const forgetPayPass = r => require.ensure([], () => r(require('page/member/setting/safety/forgetPayPass')), 'forgetPayPass')


// 其他 => 木有车服务
const service = r => require.ensure([], () => r(require('page/other/service')), 'service')
    // 其他 => 视频操作演示
const practice = r => require.ensure([], () => r(require('page/other/practice')), 'practice')
    // 其他 => APP下载
const download = r => require.ensure([], () => r(require('page/other/download')), 'download')
    // 其他 => 404空页面
const page404 = r => require.ensure([], () => r(require('page/other/404')), 'page404')


// 更多网站功能 => 关于我们
const about = r => require.ensure([], () => r(require('page/more/about')), 'about')
    // 更多网站功能 => 我们是谁
const who = r => require.ensure([], () => r(require('page/more/about-inner/who')), 'who')
    // 更多网站功能 => 我们做啥
const what = r => require.ensure([], () => r(require('page/more/about-inner/what')), 'what')
    // 更多网站功能 => 我们有啥（优势）
const advantage = r => require.ensure([], () => r(require('page/more/about-inner/advantage')), 'advantage')
    // 更多网站功能 => 联系我们
const contact = r => require.ensure([], () => r(require('page/more/about-inner/contact')), 'contact')
    // 更多网站功能 => 招贤纳士
const recruit = r => require.ensure([], () => r(require('page/more/about-inner/recruit')), 'recruit')
    // 更多网站功能 => 合作伙伴
const partner = r => require.ensure([], () => r(require('page/more/about-inner/partner')), 'partner')
    // 更多网站功能 => 意见反馈
const feedback = r => require.ensure([], () => r(require('page/more/about-inner/feedback')), 'feedback')


// 更多网站功能 => 帮助中心
const helpCenter = r => require.ensure([], () => r(require('page/more/help')), 'helpCenter')
    // 更多网站功能 => 常见问题
const FAQ = r => require.ensure([], () => r(require('page/more/help-inner/FAQ')), 'FAQ')
    // 更多网站功能 => 平台各类协议
const agreement = r => require.ensure([], () => r(require('page/more/help-inner/agreement')), 'agreement')
    // 更多网站功能 => 认证流程及审批
const applyFlow = r => require.ensure([], () => r(require('page/more/help-inner/apply-flow')), 'applyFlow')
    // 更多网站功能 => 交易流程详解
const dealFlow = r => require.ensure([], () => r(require('page/more/help-inner/deal-flow')), 'dealFlow')
    // 更多网站功能 => 隐私保护承诺
const privacy = r => require.ensure([], () => r(require('page/more/help-inner/privacy')), 'privacy')


// 测试--分享
const share = r => require.ensure([], () => r(require('page/test/share.vue')), 'share')


// 定义路由
export default [{
    path: '/',
    component: App, // 顶层路由，对应index.html
    children: [ // 二级路由，对应App.vue
        {
            // 页面为空时跳转至首页
            path: '',
            redirect: '/home' // 页面重定向
        },
        {
            // 首页
            path: '/index',
            component: index,
            alias: '/home', // 使用别名
            meta: {
                notGoTop: true,
                hasWebSide: true, // 是否有网站侧栏条
                title: '首页', // 网页信息title
                headType: 'home', // 头部  
            }
        },
        {
            // b2b大厅(买车)
            path: '/b2bHall',
            component: b2bHall,
            meta: {
                hasWebSide: true, // 是否有网站侧栏条 
                title: '二手车交易大厅', // 网页信息title 
            }
        },
        {
            // b2b车辆详情
            path: '/b2bCarDetails',
            component: b2bCarDetails,
            alias: '/b2bCar', // 使用别名
            meta: {
                hasWebSide: true, // 是否有网站侧栏条 
                title: 'b2b车辆详情', // 网页信息title 
            },
        },
        {
            // 购物车
            path: '/shoppingCart',
            component: shoppingCart,
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                hasWebSide: true, // 是否有网站侧栏条 
                title: '购物车', // 网页信息title 
            },
        },
        {
            // 车行详情
            path: '/merchantDetails',
            component: merchantDetails,
            meta: {
                hasWebSide: true, // 是否有网站侧栏条
                title: '车商详情', // 网页信息title 
            },
        },
        {
            // 卖车大厅
            path: '/sell',
            component: sell,
            alias: '/sellHome', // 使用别名
            meta: {
                hasWebSide: true, // 是否有网站侧栏条
                title: '卖车大厅', // 网页信息title 
            }
        },
        {
            // 发布车辆订单填写页
            path: '/sendCar',
            component: sendCar,
            alias: '/sellSend', // 使用别名
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                hasWebSide: true, // 是否有网站侧栏条
                title: '发布新车', // 网页信息title 
            },
        },
        {
            // 车商圈
            path: '/dealerCircle',
            component: dealerCircle,
            alias: '/dealer', // 使用别名
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                hasWebSide: true, // 是否有网站侧栏条
                title: '车商圈', // 网页信息title
            },
        },
        {
            // 木有车服务
            path: '/service',
            component: service,
            alias: '/siteServer', // 使用别名
            meta: {
                hasWebSide: true, // 是否有网站侧栏条
                title: '木有车服务', // 网页信息title
            }
        },
        {
            // 视频操作演示
            path: '/practice',
            component: practice,
            meta: {
                hasWebSide: true, // 是否有网站侧栏条
                title: '视频教程（帮助）', // 网页信息title
            }
        },
        {
            // APP下载页
            path: '/download',
            component: download,
            meta: {
                hasWebSide: true, // 是否有网站侧栏条
                title: 'app下载', // 网页信息title
            }
        },
        {
            // 关于我们
            path: '/about',
            component: about,
            redirect: '/about/who',
            children: [{
                    // 我们是谁
                    path: 'who',
                    component: who,
                    meta: {
                        hasWebSide: true, // 是否有网站侧栏条
                        title: '我们是谁', // 网页信息title
                    },
                },
                {
                    // 我们做啥
                    path: 'what',
                    component: what,
                    meta: {
                        hasWebSide: true, // 是否有网站侧栏条
                        title: '我们做啥', // 网页信息title
                    },
                },
                {
                    // 我们有啥（优势）
                    path: 'advantage',
                    component: advantage,
                    meta: {
                        hasWebSide: true, // 是否有网站侧栏条
                        title: '我们的优势', // 网页信息title
                    },
                },
                {
                    // 联系我们
                    path: 'contact',
                    component: contact,
                    meta: {
                        hasWebSide: true, // 是否有网站侧栏条
                        title: '联系我们', // 网页信息title
                    },
                },
                {
                    // 意见反馈
                    path: 'feedback',
                    component: feedback,
                    meta: {
                        hasWebSide: true, // 是否有网站侧栏条
                        title: '意见反馈', // 网页信息title
                    },
                },
                {
                    // 合作伙伴
                    path: 'partner',
                    component: partner,
                    meta: {
                        hasWebSide: true, // 是否有网站侧栏条
                        title: '友情链接', // 网页信息title
                    },
                },
                {
                    // 网站招聘
                    path: 'recruit',
                    component: recruit,
                    meta: {
                        hasWebSide: true, // 是否有网站侧栏条
                        title: '招贤纳士', // 网页信息title
                    },
                },
            ]
        },
        {
            // 帮助中心
            path: '/helpCenter',
            component: helpCenter,
            redirect: '/helpCenter/FAQ',
            meta: {
                hasWebSide: true, // 是否有网站侧栏条 
            },
            children: [{
                    // 常见问题
                    path: 'FAQ',
                    component: FAQ,
                    meta: {
                        hasWebSide: true, // 是否有网站侧栏条
                        title: '常见问题', // 网页信息title
                    }
                },
                {
                    // 隐私保护承诺
                    path: 'privacy',
                    component: privacy,
                    meta: {
                        hasWebSide: true, // 是否有网站侧栏条
                        title: '隐私保护承诺', // 网页信息title
                    }
                },
                {
                    // 认证流程及审核
                    path: 'applyFlow',
                    component: applyFlow,
                    meta: {
                        hasWebSide: true, // 是否有网站侧栏条
                        title: '认证流程及审核', // 网页信息title
                    }
                },
                {
                    // 交易流程详解
                    path: 'dealFlow',
                    component: dealFlow,
                    meta: {
                        hasWebSide: true, // 是否有网站侧栏条
                        title: '交易流程详解', // 网页信息title
                    }
                },
            ]
        },
        {
            // 平台各类协议
            path: '/agreement',
            component: agreement,
            meta: {
                hasWebSide: true, // 是否有网站侧栏条
                title: '平台各类协议', // 网页信息title
            }
        },
        {
            // 会员中心
            path: '/member',
            component: member,
            redirect: '/member/home',
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                isEnabledKefu: true, // 不启用客服
            },
            children: [{
                    // 会员主页
                    path: 'home',
                    component: memberHome,
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '我的主页', // 网页信息title
                    },
                },
                {
                    // 认证主页
                    path: 'applyHome',
                    component: applyHome,
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '车商认证', // 网页信息title
                    },
                },
                {
                    // 上传认证资料
                    path: 'putApply',
                    component: putApply,
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '认证车商资料', // 网页信息title
                    },
                },
                {
                    // 补交认证资料
                    path: 'merchantApply',
                    component: merchantApply,
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '升级企业车商', // 网页信息title
                    },
                },
                {
                    // 我的购物车(会员中心)
                    path: 'mCart',
                    component: shoppingCart,
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '我的购物车(会员中心)', // 网页信息title
                    },
                },
                {
                    // 买车订单
                    path: 'buyOrder',
                    component: buyOrder,
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '买车订单', // 网页信息title
                    },
                },
                {
                    // 卖车订单
                    path: 'sellOrder',
                    component: sellOrder,
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '卖车订单', // 网页信息title
                    },
                },
                {
                    // 买车订单-详情页
                    path: 'buyOrderDetails',
                    component: buyOrderDetails,
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '买车订单详情', // 网页信息title
                    },
                },
                {
                    // 卖车订单-详情页
                    path: 'sellOrderDetails',
                    component: sellOrderDetails,
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '卖车订单详情', // 网页信息title
                    },
                },
                {
                    // 订单管理-买车合同
                    path: 'contractBuy',
                    component: contractBuy,
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '买车合同', // 网页信息title
                    },
                },
                {
                    // 订单管理-卖车合同
                    path: 'contractSell',
                    component: contractSell,
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '卖车合同', // 网页信息title
                    },
                },
                {
                    // 订单管理-卖方修改合同
                    path: 'editContract',
                    component: editContract,
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '卖方修改合同', // 网页信息title
                    },
                },
                {
                    // 订单管理-合同详情
                    path: 'contractDetails',
                    component: contractDetails,
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '合同详情', // 网页信息title
                    },
                },
                {
                    // 订单管理-订单支付
                    path: 'orderPay',
                    component: orderPay,
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '订单支付', // 网页信息title
                    },
                },
                {
                    // 订单管理-支付托管车款（尾款）
                    path: 'fullPayout',
                    component: fullPayout,
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '支付托管车款（尾款）', // 网页信息title
                    },
                },
                {
                    // 订单管理-买家签收
                    path: 'signOff',
                    component: signOff,
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '买家签收', // 网页信息title
                    },
                },
                {
                    // 订单管理-维权申请页
                    path: 'arbitrateApply',
                    component: arbitrateApply,
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '维权申请', // 网页信息title
                    },
                },
                {
                    // 订单管理-买家维权详情页
                    path: 'arbitrateBuy',
                    component: arbitrateBuy,
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '买家维权详情', // 网页信息title
                    },
                },
                {
                    // 订单管理-卖家维权详情页
                    path: 'arbitrateSell',
                    component: arbitrateSell,
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '卖家维权详情', // 网页信息title
                    },
                },
                {
                    // 订单管理-买车仲裁列表
                    path: 'buyArbitrateList',
                    component: buyArbitrateList,
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '买车仲裁列表', // 网页信息title
                    },
                },
                {
                    // 订单管理-卖车仲裁列表
                    path: 'sellArbitrateList',
                    component: sellArbitrateList,
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '卖车仲裁列表', // 网页信息title
                    },
                },
                {
                    // 我的车源
                    path: 'car-source',
                    component: mySource,
                    alias: 'sourceHome', // 使用别名
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '我的车源', // 网页信息title
                    },
                },
                {
                    // 编辑车源
                    path: 'edit-source',
                    component: editSource,
                    alias: 'sourceEdit', // 使用别名
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '编辑车源', // 网页信息title
                    },
                },
                {
                    // 我的钱包主页
                    path: 'wallet-home',
                    component: walletHome,
                    alias: 'wallet', // 使用别名
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '我的钱包', // 网页信息title
                    },
                },
                {
                    // 账单详情页
                    path: 'bill-details',
                    component: billDetails,
                    alias: 'billDetails', // 使用别名
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '账单详情', // 网页信息title
                    },
                },
                {
                    // 充值
                    path: 'recharge',
                    component: recharge,
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '充值', // 网页信息title
                    },
                },
                {
                    // 提现
                    path: 'withdraw',
                    component: withdraw,
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '提现', // 网页信息title
                    },
                },
                {
                    // 车辆收藏
                    path: 'collect-car',
                    component: carCollect,
                    alias: 'collectCar', // 使用别名
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '车辆收藏', // 网页信息title
                    },
                },
                {
                    // 车行收藏
                    path: 'merchant-car',
                    component: merchantCollect,
                    alias: 'merchantCar', // 使用别名
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '车行收藏', // 网页信息title
                    },
                },
                {
                    // 个人资料设置
                    path: 'personal',
                    component: personalSetting,
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '个人资料设置', // 网页信息title
                    },
                },
                {
                    // 银行卡管理
                    path: 'cardManage',
                    component: bankCardManage,
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '银行卡管理', // 网页信息title
                    },
                },
                {
                    // 银行卡修改
                    path: 'cardEdit',
                    component: bankCardEdit,
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '银行卡修改', // 网页信息title
                    },
                },
                {
                    // 银行卡添加
                    path: 'cardAdd',
                    component: bankCardAdd,
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '银行卡添加', // 网页信息title
                    },
                },
                {
                    // 安全中心
                    path: 'safetyCenter',
                    component: safetyCenter,
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '安全中心', // 网页信息title
                    },
                },
                {
                    // 密码修改
                    path: 'safetyPass',
                    component: safetyPass,
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '密码修改', // 网页信息title
                    },
                },
                {
                    // 找回密码
                    path: 'safetyForget',
                    component: safetyForget,
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '找回密码', // 网页信息title
                    },
                },
                {
                    // 手机号绑定修改
                    path: 'safetyTel',
                    component: safetyTel,
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '手机号绑定修改', // 网页信息title
                    },
                },
                {
                    // 设置支付密码
                    path: 'payPass',
                    component: payPass,
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '设置支付密码', // 网页信息title
                    },
                },
                {
                    // 修改支付密码
                    path: 'editPayPass',
                    component: editPayPass,
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '修改支付密码', // 网页信息title
                    },
                },
                {
                    // 忘记支付密码
                    path: 'forgetPayPass',
                    component: forgetPayPass,
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                        title: '忘记支付密码', // 网页信息title
                    },
                },

            ]
        },
        {
            // 测试分享
            path: '/share',
            component: share,
            meta: {}
        },
        {
            // 404页面
            path: '/page404',
            component: page404,
            meta: {
                title: '404页面', // 网页信息title
            }
        },
        {
            // 所有未匹配到的页面
            path: "*",
            redirect: "/page404"
        },
    ],

}]