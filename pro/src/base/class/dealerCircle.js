// 单个车店排名信息的构造类
class dealerInfo{
    constructor(data) {

        this.mid = data.MemberId||""        // 会员id
        this.authType = data.AuthType||""   // 认证类别
        this.cdgName = data.CdgName||""     // 车行名
        this.address = data.Address||""     // 地址
        this.nikeName = data.NickName||""   // 昵称
        this.phone = data.Mobile||""        // 电话

        // 头像
        this.faceUrl = data.PhotoURL?data.PhotoURL+"?imageView2/3/w/200/h/200":require('assets/img/none-face.png')
        this.childCount = data.ChildCnt||""         // 推荐车商数
        this.carCount = data.CarCnt||0              // 发车数
        this.memberLevel = data.MemLevel||""        // 会员级别 STOCKHOLDER 是原始股东
        this.hasFavorites = data.HasFav||""         // 是否收藏0，1
        this.hasCredit = data.HasCreditPoint||""    // 是否有信誉金0，1
        this.province = data.Province||""           // 省
        this.city = data.City||""                   // 市
        this.isPartner = data.IsB2BPartner||false   // 是否为合作商true,false

	}
}

export {dealerInfo};