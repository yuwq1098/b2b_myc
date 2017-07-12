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
	    	let arr = data.CdgAuth;
	    	if(arr.length==2){
	    		arr.forEach((item,index)=>{
                    // 有认证成功，不管是车行还是个人认证
                    if(arr[index].AuthInfo.AuthType=='企业车行'){
                        if(arr[index].AuthInfo.AuthStatus==1){
                            this.auth = "企业车行";
                        }else{
                        	this.auth = "个人车行";
                        }
                    }
                })
                return;
        	}
        	if(arr.length==1){
                // 有认证成功，不管是车行还是个人认证
                if(arr[0].AuthInfo.AuthStatus==1){
                    this.auth = "个人车行";
                }else if(arr[0].AuthInfo.AuthStatus==0){
                	this.auth = "认证中";
                }else{
                	this.auth = "未认证";
                }
                return;
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
	    this.hasPaypwd = data.HasPaypwd||""  // 是否有交易密码
	    this.cdgAuth = data.CdgAuth||""        // 车行认证信息数组，没时为[]数组
	    // 认证状态
	    this.authName = "未实名认证"           // 真实姓名
	    this.authStatus = false                // 未认证

        //如果未认证，那么身份标识为未认证
        if(data.CdgAuth&&data.CdgAuth.length>0){
        	if(data.CdgAuth[0].AuthInfo.CertificateName){
        		this.authName = data.CdgAuth[0].AuthInfo.CertificateName;
        		this.authStatus = true
        	}
        }
	    
	}
}

export {headMember,sidebarMember,memberInfo};