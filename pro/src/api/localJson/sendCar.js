
/** 
* @description 发布订单下拉菜单数据列表本地化资源 
* @creatDate 2017-6-21
* @author Geek.Yu  email:1098654043@qq.com
*/ 

//过户次数
export const changeNum = [
    {
        label: "1次",
        value: '1',
    },
    {
        label: "2次",
        value: '2',
    },
    {
        label: "3次",
        value: '3',
    },
    {
        label: "4次",
        value: '4',
    },
    {
        label: "5次",
        value: '5',
    },
    {
        label: "6次",
        value: '6',
    },
    {
        label: "7次",
        value: '7',
    },
    {
        label: "8次",
        value: '8',
    },
    {
        label: "9次",
        value: '9',
    },
    {
        label: "10次",
        value: '10',
    },
]

// 排放标准
export const dischargeStandard = [
    // {
    //     label: "国1",
    //     value: '国1',
    // },
    // {
    //     label: "国2",
    //     value: '国2',
    // },
    {
        label: "不祥",
        value: '-1',
    },
    {
        label: "国3",
        value: '国3',
    },
    {
        label: "国4",
        value: '国4',
    },
    {
        label: "国5",
        value: '国5',
    },
]


// 营运类型
export const ServiceCharacteristics = [
    {
        label: '非营运',
        value: '非营运',
    },
    {
        label: "非营运租赁",
        value: '非营运租赁',
    },
    {
        label: "营运",
        value: '营运',
    },
    {
        label: "营转非",
        value: '营转非',
    },
]

// 车辆发布的传图示例
export const photoExamples = [
    {
        title: "左前",
        imgUrl: require("assets/img/upload-example_01.jpg"),
    },
    {
        title: "正前",
        imgUrl: require("assets/img/upload-example_02.jpg"),
    },
    {
        title: "侧面",
        imgUrl: require("assets/img/upload-example_03.jpg"),
    },
    {
        title: "后面",
        imgUrl: require("assets/img/upload-example_04.jpg"),
    },
    {
        title: "中控",
        imgUrl: require("assets/img/upload-example_05.jpg"),
    },
    {
        title: "座椅",
        imgUrl: require("assets/img/upload-example_06.jpg"),
    },
]

// 发布的车辆铭牌传图示例
export const nameplateExamples = [
    {
        title: "车辆铭牌1",
        imgUrl: require("assets/img/vehicle-nameplate_01.jpg"),
    },
    {
        title: "车辆铭牌2",
        imgUrl: require("assets/img/vehicle-nameplate_02.jpg"),
    },
]


// 车辆信息完善
export const supplementGroup = [
    {
        gpTitle: "事故情况",
        gpCode: "a",
        items:[
            {'label':"无事故无火烧无水浸"},
            {'label':"水浸车"},
            {'label':"火烧车"},
            {'label':"事故车"}
        ]
    },
    {
        gpTitle: "钣金情况",
        gpCode: "b",
        items:[
            {'label':"全车原钣"},
            {'label':"1~2处"},
            {'label':"3~5处"},
            {'label':"6处及以上"}
        ]
    },
    {
        gpTitle: "漆面情况",
        gpCode: "c",
        items:[
            {'label':"全车原漆"},
            {'label':"1~2面"},
            {'label':"3~5面"},
            {'label':"6面及以上"}
        ]
    },
    {
        gpTitle: "内饰情况",
        gpCode: "d",
        items:[
            {'label':"接近全新"},
            {'label':"6~8成新"},
            {'label':"5成以下"},
            {'label':"内饰换新"}
        ]
    },
]


