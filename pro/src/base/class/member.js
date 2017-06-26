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
	    this.auth = ""
        
        //如果未认证，那么身份标识为未认证
        if(!data.CdgAuth){
            this.auth = "未认证"
        }else{
        	if(!data.CdgAuth.AuthType){
        		this.auth = "未认证"
        	}else{
        		this.auth = data.CdgAuth.AuthType
        	}
        }
	    
	}
}

export {headMember,sidebarMember};