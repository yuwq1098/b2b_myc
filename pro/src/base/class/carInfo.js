class b2bCarInfo{
	constructor(data) {
	    this.id = data.CarId
	    this.name = data.Title
	    this.mileage = data.Mileage
	    this.plateDate = data.OnLicensePlateDate
	    this.inCity = data.CarInCity
	    this.imgUrl = data.FileUri
	    this.retailPrice = data.RetailPrice
	}
}

class b2cCarInfo{
	constructor(data) {
	    this.id = data.CarId
	    this.name = data.Title
	    this.mileage = data.Mileage
	    this.plateDate = data.OnLicensePlateDate
	    this.inCity = data.CarInCity
	    this.imgUrl = data.FileUri
	    this.retailPrice = data.RetailPrice
	}
}

export {b2bCarInfo,b2cCarInfo};

