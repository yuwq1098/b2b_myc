
/** 
* @description 网站底部信息数据的本地化资源 
* @creatDate 2017-6-15
* @author Geek.Yu  email:1098654043@qq.com
*/ 


//版权信息
export const cprtInfo = [
    {
        title: "部分一",
        txtItems:[
            "Copyright © 2016-2017 木有车 All Rights Reserved",
            "赣ICP备17000387号-1",
        ]
    },
    {
        title: "部分二",
        txt: "版权所有： 南昌小目标车网科技发展股份有限公司"
    }
]

//咨询服务
export const counseling = {
    title: '木有车客服热线',
    tel: '400-900-9936',
    desc: '免费咨询（咨询、投诉、建议）',
    workTime: '周一至周六 9:00-18:00（工作时间）',
}

// 二维码信息
export const ewmItems = [
    {
        title: '微信公众号',
        imgUrl: require('assets/img/myc_ewm_wechat.jpg'),
    },
    {
        title: '下载APP',
        imgUrl: require('assets/img/myc_ewm_app.jpg'),
    }
]



//诚信网站图片
export const footCprtImgItems = [
    {
        title: '可信网站',
        href: '',
        imgUrl: require("assets/img/credible-icon.png"),
    },
    {
        title: '诚信网站',
        href: '',
        imgUrl: require("assets/img/honest-icon.png"),
    }
]

//底部链接新
export const lkInfoItems = [
    {
        id: 1,
        desc: '木有车主要的链接',
        items:[
            {
                name: "关于我们",
                path: "/about"
            },
            {
                name: "联系我们",
                path: "/about/contact"
            },
            {
                name: "帮助中心",
                path: ""
            },
            {
                name: "隐私保护承诺",
                path: ""
            },
            {
                name: "意见反馈",
                path: "/about/feedback"
            },
        ]
    },
    {
        id: 2,
        desc: '木有车业务指导链接',
        items:[
            {
                name: "平台各类协议",
                path: ""
            },
            {
                name: "常见问题",
                path: ""
            },
            {
                name: "B2B车辆交易流程详解",
                path: ""
            },
            {
                name: "平台功能（视频介绍）",
                path: "/practice"
            },
            {
                name: "招贤纳士",
                path: "/about/recruit"
            },
        ]
    }
]