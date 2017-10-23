// b2b车辆信息构造类
class b2bCarInfo {
    constructor(data) {
        this.id = data.CarId || "" // 车辆ID
            // 首图
        this.imgUrl = data.FileUri ? data.FileUri + "?imageView2/1/w/400/h/300/q/75|imageslim" : ""

        // ?imageMogr2/auto-orient
        this.name = data.Title || "" // 标题
        this.inCity = data.CarInCity || "" // 车辆所在城市
        this.plateDate = data.OnLicensePlateDate || "" // 上牌时间
        this.mileage = data.Mileage || 0 // 里程
        this.price = data.B2BPrice || 0 // b2b价格
        this.retailPrice = data.RetailPrice || 0 // 普通价格
        this.shelveTime = data.ShelveTime || "" // 上架时间或刷新上架时间

        this.cName = data.CDGName || "" // 车行名
        this.authType = data.AuthType || "" // 车行认证类别： 个人车行、企业车行
        this.hasInCart = data.HasInCart || "" // 是否加入购物车
    }
}

// b2c车辆信息的构造类
class b2cCarInfo {
    constructor(data) {

        this.id = data.CarId || "" // 车辆ID
            // 首图
        this.imgUrl = data.FileUri ? data.FileUri + "?imageView2/1/w/400/h/300/q/75|imageslim" : ""
        this.name = data.Title || "" // 标题
        this.inCity = data.CarInCity || "" // 车辆所在城市
        this.plateDate = data.OnLicensePlateDate || "" // 上牌时间
        this.mileage = data.Mileage || 0 // 里程
        this.price = data.B2BPrice || 0 // b2b价格
        this.retailPrice = data.RetailPrice || 0 // 普通价格
        this.shelveTime = data.ShelveTime || "" // 上架时间或刷新上架时间
        this.cName = data.CDGName || "" // 车行名
        this.authType = data.AuthType || "" // 车行认证类别： 个人车行、企业车行
        this.hasInCart = data.HasInCart || 0 // 是否加入购物车
    }
}


// 低价车辆信息的构造类
class lowPriceInfo {
    constructor(data) {

        this.id = data.CarId || "" // 车辆ID
            // 首图
        this.imgUrl = data.FileUri ? data.FileUri + "?imageView2/1/w/400/h/300/q/75|imageslim" : ""

        this.name = data.Title || "" // 标题
        this.inCity = data.CarInCity || "" // 车辆所在城市
        this.plateDate = data.OnLicensePlateDate || "" // 上牌时间
        this.mileage = data.Mileage || 0 // 里程
        this.price = data.B2BPrice || 0 // b2b价格
        this.retailPrice = data.RetailPrice || 0 // 普通价格
        this.shelveTime = data.ShelveTime || "" // 上架时间或刷新上架时间

        this.cName = data.CDGName || "" // 车行名
        this.authType = data.AuthType || "" // 车行认证类别： 个人车行、企业车行
        this.hasInCart = data.HasInCart || "" // 是否加入购物车
    }

}

// 金蛋车信息
class eggCarInfo {
    constructor(data) {
        this.id = data.CarId || "" // 车辆ID
            // 首图
        this.imgUrl = data.FileUri ? data.FileUri + "?imageView2/1/w/400/h/300/q/75|imageslim" : ""

        this.name = data.Title || "" // 标题
        this.inCity = data.CarInCity || "" // 车辆所在城市
        this.plateDate = data.OnLicensePlateDate || "" // 上牌时间
        this.mid = data.MemberId || "" // 会员id
        this.mileage = data.Mileage || 0 // 里程
        this.price = data.B2BPrice || 0 // b2b价格
        this.retailPrice = data.RetailPrice || 0 // 普通价格
        this.shelveTime = data.ShelveTime || "" // 上架时间或刷新上架时间

    }
}


// 砸金蛋人物列表信息构造类
class eggGetListClass {
    constructor(data) {
        this.cName = data.CdgName || ""
        this.amount = data.EggAmount || ""
        this.getEggTime = data.EggGetTime || ""
        this.mid = data.MemberId || ""
        this.photoURL = data.PhotoURL || ""
        this.totalAmount = data.TotalGetAmount || ""
    }
}

// 金蛋信息构造类
class eggInfoClass {
    constructor(data) {
        this.amount = data.MyAmount || 0
        this.nextActSeconds = data.NextActSeconds || 0
        this.totalEggCnt = data.TotalEggCnt || ""
        this.totalGetAmount = data.TotalGetAmount || ""
        this.waitEggsCount = data.WaifEggCnt || ""
        this.waitEggsId = data.WaifEggId || "";
    }
}

// 红包车信息的构造类
class goldenEggsInfo {
    constructor(data) {

        this.carInfo = data.CarInfo || "" // 车辆信息
        this.eggGetList = data.EggGetList || "" // 砸金蛋信息列表
        this.eggInfo = data.EggInfo || {} // 金蛋信息

        // 数据结构变形
        this.carInfo = new eggCarInfo(this.carInfo);
        // 砸金蛋信息
        let theGetEggList = [];
        this.eggGetList.forEach((item, index) => {
            theGetEggList.push(new eggGetListClass(item));
        });
        this.eggGetList = theGetEggList;
        // 使用金蛋信息构造类格式化
        this.eggInfo = new eggInfoClass(this.eggInfo);
    }
}

// 新车的构造类
class newCarInfo {
    constructor(data) {
        this.shopId = data.ShopId || "" // 店铺id
        this.id = data.CarId || "" // 车辆id
        this.brandSeries = data.BrandSeries || "" // 车牌车系
        this.mode = data.ModelName || "" // 车辆型号
        this.price = data.Price || "" // 价格
        this.officialPrice = data.OfficialSalePrice || "" // 指导价
        this.seriesPhoto = data.SeriesPhoto ? data.SeriesPhoto + "?imageView2/1/w/600/h/400/q/75|imageslim" : "" // 车系图标
        this.total = data.Total || "" // 查询结果条数
    }
}

// 车行车辆信息的构造类
class merchantCarInfo {
    constructor(data) {
        this.id = data.CarId || "" // 车辆id
        this.imgUrl = data.TitlePhoto ? data.TitlePhoto + "?imageView2/1/w/400/h/300/q/75|imageslim" : "" // 首图链接
        this.title = data.Title || "" // 标题
        this.city = data.CarInCity || "" // 所在城市
        this.plateDate = data.OnLicensePlateDate || "" // 上牌时间
        this.mileage = data.Mileage || "" // 里程
        this.price = data.B2BPrice || "" // 批发价
        this.retailPrice = data.RetailPrice || "" // 普通市场价
    }
}

// 在售车源信息的构造类
class onSaleCarInfo {
    constructor(data) {
        this.id = data.CarId || "" // 车辆id
        this.imgUrl = data.TitlePhoto ? data.TitlePhoto + "?imageView2/1/w/400/h/300/q/75|imageslim" : "" // 首图链接
        this.name = data.Title || "" // 标题
        this.inCity = data.CarInCity || "" // 所在城市
        this.plateDate = data.OnLicensePlateDate || "" // 上牌时间
        this.mileage = data.Mileage || "" // 里程
        this.price = data.B2BPrice || "" // 批发价
        this.retailPrice = data.RetailPrice || "" // 普通市场价
        this.favorite = data.CarFavorite || false // 是否收藏
    }
}


export { b2bCarInfo, b2cCarInfo, lowPriceInfo, goldenEggsInfo, newCarInfo, merchantCarInfo, onSaleCarInfo };