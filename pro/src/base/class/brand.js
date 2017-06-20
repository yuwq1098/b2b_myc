// 车品牌构造类
class brandInfo{
	constructor(data) {
	    this.id = data.brand_id
	    this.name = data.brand_name
	    this.key = data.key_word
	    this.imgUrl = `http://wx.chageche.cn/static/images/brand/large/b${data.brand_id}.jpg`
	}
}

export {brandInfo};