// 发布订单的向后端请求的构造类
class sendCarForm{
	constructor(data) {
	    this.CarBaseInfo = {

	    	// 修改时必填原先记录主键，如果是新增加则不传
            CarId: data.carId||"",                          // 车辆Id,修改时需带有                    

            CarModelId: data.selectedModel||"",             // 车型id
            B2BPrice: data.fixedPrice||"",                  // B2B价格 单位：万元
            RetailPrice: data.retailPrice||"",              // 普通分享价格 单位：万元
            OutFactoryDate: data.outFactoryDate||"",        // 出厂日期2015-01-01，如果没填就传空字符传
            OnLicensePlateDate: data.plateDate||"",         // 上牌时间2015-01-01
            Liter: data.liter||"",                          // 排量(1.0~7.0)

            // 排放标准：国12345
            DischargeStandard: data.dischargeStandard||"",        
            Mileage: data.mileage||"",                      // 真实里程
            Color: data.color||"",                          // 颜色：红色
            VehicleConfiguration: "",                       // 车辆配置
            TransferTimes: data.changeNum||"",              // 过户次数
            LicensePlateInCity: data.plateInCity||"",       // 车牌归属地：110000
            CarInCity: data.carInCity||"",                  // 车身所在城市：110000

            //强险到期时：有强险时，以本机时间+1年（如：2018-01-02），无强险时以本机时间-1年（如2016-01-02）
            CompulsoryInsuranceExpiration:data.insuranceDate||"",

            CarDescription: data.desc||"",                  // 车况描述
            PostToRetailMarket: data.isPostRetail||false,      // 是否发布到普通二手车市场
            Vin: data.vin||"",                              // 车架号
            ServiceCharacteristics: data.serviceType||"",   // 使用性质（非营运，非营运租赁，营运，营转非）
	    }
        
        // 其他车况内容补充，参考示例(可不填)
	    this.CarOtherInfo = [];               
         
        // 录音描述、车辆照片、（选填）出厂铭牌
	    this.CarFileInfo = []
        
        // 如果有车辆铭牌图片文件
	    if(data.nameplate&&data.nameplate.length>0){
            data.nameplate.forEach((item,index) => {
                let data = {}
                data.FileId = item.fileId;
                data.Title = "出厂铭牌";
                data.GroupName = "出厂铭牌"
                this.CarFileInfo.push(data);
            });
	    }

	    // 如果有车辆铭牌图片文件
	    if(data.photo&&data.photo.length>0){
            data.photo.forEach((item,index) => {
                let data = {}
                data.FileId = item.fileId;
                data.Title = "车辆照片";
                data.GroupName = "车辆照片"
                this.CarFileInfo.push(data);
            });
	    }
        
        
	}
}


export {sendCarForm}