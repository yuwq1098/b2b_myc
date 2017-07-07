class headMember{
	constructor(data) {
	    this.id = data.MemberID
	    this.name = data.NickName
	    this.imgUrl = data.PhotoURL?data.PhotoURL:require('assets/img/none-face.png')
	}
}

class sidebarMember{
    constructor(data) {
	    this.id = data.MemberID||""
	    this.name = data.NickName||""
	    this.imgUrl = data.PhotoURL?data.PhotoURL:require('assets/img/none-face.png')
	    this.tel = data.Mobile||""
	    // 认证状态
	    this.auth = "未认证"
	    //如果未认证，那么身份标识为未认证
        if(data.CdgAuth&&data.CdgAuth.length>0){
        	if(data.CdgAuth.length==2){
                this.auth = "企业车行" 
                return;
        	}
        	if(data.CdgAuth[0].CdgInfo.AuthType){
        		this.auth = data.CdgAuth[0].CdgInfo.AuthType;
        	}
        }
	    
	}
}

class memberInfo{
    constructor(data) {
	    this.id = data.MemberID||""
	    this.name = data.NickName||""
	    this.imgUrl = data.PhotoURL?data.PhotoURL:require('assets/img/none-face.png')
	    this.tel = data.Mobile||""
	    this.sex = data.Sex||"暂未设置"
	    this.blance = data.Blance||0          // 余额
	    this.credit = data.CreditPoint||0     // 信誉保证金
	    this.regDate = data.RegDate||""        // 注册时间
	    this.hasPaypwd = data.CreditPoint||""  // 是否有交易密码
	    this.cdgAuth = data.CdgAuth||""        // 车行认证信息数组，没时为[]数组
	    // 认证状态
	    this.authName = "未实名认证"           // 真实姓名
	    this.authStatus = false                // 未认证

        //如果未认证，那么身份标识为未认证
        if(data.CdgAuth.length>0){
        	if(data.CdgAuth[0].AuthInfo.CertificateName){
        		this.authName = data.CdgAuth[0].AuthInfo.CertificateName;
        		this.authStatus = true
        	}
        }
	    
	}
}

export {headMember,sidebarMember,memberInfo};