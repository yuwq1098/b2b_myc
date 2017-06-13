import api from 'api/getData.js'

//过户次数
export const changeNum = [
    {
        label: '不限',
        value: '-1',
    },
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
]

// 车龄
export const carAge = [
    {
        label: '不限',
        value: '-1',
    },
    {
        label: "一年内",
        value: '1',
    },
    {
        label: "1-3年",
        value: '2',
    },
    {
        label: "3-5年",
        value: '3',
    },
    {
        label: "5-8年",
        value: '4',
    },
    {
        label: "8年以上",
        value: '5',
    },
]

// 车型
export const carModel = [
    {
        label: '不限',
        value: '-1',
    },
    {
        label: "微型车",
        value: '1',
    },
    {
        label: "小型车",
        value: '2',
    },
    {
        label: "紧凑型",
        value: '3',
    },
    {
        label: "中型车",
        value: '4',
    },
    {
        label: "中大型",
        value: '5',
    },
    {
        label: "豪华型",
        value: '6',
    },
    {
        label: "跑车",
        value: '7',
    },
]

// 里程
export const mileage = [
    {
        label: '不限',
        value: '-1',
    },
    {
        label: "一万公里内",
        value: '1',
    },
    {
        label: "1-3万公里内",
        value: '2',
    },
    {
        label: "3-6万公里内",
        value: '3',
    },
    {
        label: "6-10万公里内",
        value: '4',
    },
    {
        label: "10-20万公里内",
        value: '5',
    },
    {
        label: "20万公里以上",
        value: '6',
    }
]

// 排量
export const displacement = [
    {
        label: '不限',
        value: '-1',
    },
    {
        label: "1.0L以下",
        value: '1',
    },
    {
        label: "1.1L-1.6L",
        value: '2',
    },
    {
        label: "1.6L-2.0L",
        value: '3',
    },
    {
        label: "2.0L-2.5L",
        value: '4',
    },
    {
        label: "2.5L-3.0L",
        value: '5',
    },
    {
        label: "4.0L以上",
        value: '6',
    }
]

// 排放标准
export const dischargeStandard = [
    {
        label: '不限',
        value: '-1',
    },
    {
        label: "国1",
        value: '1',
    },
    {
        label: "国2",
        value: '2',
    },
    {
        label: "国3",
        value: '3',
    },
    {
        label: "国4",
        value: '4',
    },
    {
        label: "国5",
        value: '5',
    }
]

// 排放标准
export const GearType = [
    {
        label: '不限',
        value: '-1',
    },
    {
        label: "手动挡",
        value: '1',
    },
    {
        label: "自动挡",
        value: '2',
    }
]

// 营运类型
export const ServiceCharacteristics = [
    {
        label: '不限',
        value: '-1',
    },
    {
        label: "非营运",
        value: '1',
    },
    {
        label: "营运",
        value: '2',
    },
    {
        label: "营转非",
        value: '3',
    }
]