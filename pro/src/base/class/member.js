// 引入系统变量
import * as SYSTEM from 'api/system.js'

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
                            if(index==0){
                                if(arr[1].AuthInfo.AuthStatus==1){
                                    this.auth = "个人车行";
                                }
                            }else if(index==1){
                                if(arr[0].AuthInfo.AuthStatus==1){
                                    this.auth = "个人车行";
                                }
                            }
                        }
                    }
                })
                return;
        	}
        	if(arr.length==1){
                // 有认证成功，不管是车行还是个人认证
                if(arr[0].AuthInfo.AuthStatus==1){
                    this.auth = arr[0].AuthInfo.AuthType;
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
	    this.blance = data.Blance||0           // 余额
	    this.credit = data.CreditPoint||0      // 信誉保证金
	    this.regDate = data.RegDate||""        // 注册时间
	    this.hasPaypwd = data.HasPaypwd||""    // 是否有交易密码
	    this.cdgAuth = data.CdgAuth||""        // 车行认证信息数组，没时为[]数组
	    // 认证状态
	    this.authName = "未实名认证"           // 真实姓名
	    this.authStatus = false                // 认证状态码
        this.authStatusText = ""               // 认证状态码对应文本
        // 是否已认证个人车行
        this.isPassPerson = false
        
        // 当前正在认证的认证Id
        this.curApplyId = ""
        // 当前正在认证的认证类型
        this.curApplyType = ""
        // 当前正在认证的认证信息
        this.curApplyInfo = {}
        // 当前认证的数量
        this.hasApplyCount = 0
        // 用户审核不通过时的提示
        this.errorApplyText = "后台人员没有对你说什么，请致电客服咨询"

        //如果未认证，那么身份标识为未认证
        if(data.CdgAuth&&data.CdgAuth.length>0){
        		
            this.authStatus = data.CdgAuth[0].AuthInfo.AuthStatus;
            switch(data.CdgAuth[0].AuthInfo.AuthStatus){
                case 0:
                    this.authStatusText = "审核中";   
                    break;
                case 1:
                    this.authStatusText = "审核成功";   
                    break;
                case -1:
                    this.authStatusText = "审核失败";   
                    break;
            }
            
            // 是否已认证个人车行
            data.CdgAuth.forEach((item,index)=>{
                if(data.CdgAuth[index].AuthInfo.AuthType=="个人车行"&&
                    data.CdgAuth[index].AuthInfo.AuthStatus==1){
                    this.isPassPerson = true;
                }
            })
        }
   
        // 是否有足够的保证金
        this.hasEnoughCredit = this.credit>=SYSTEM.MIN_CREDIT_GOLD
        // 是否认证成功  
        this.isAuthSuccess = false                  
         
        // 逻辑判断是否认证成功
        if(data.CdgAuth&&data.CdgAuth.length==1){
            this.hasApplyCount = 1
        	if(data.CdgAuth[0].AuthInfo.AuthStatus==1) this.isAuthSuccess = true;
            // 当前认证类型
            this.curApplyType = data.CdgAuth[0].AuthInfo.AuthType;
            this.curApplyInfo = data.CdgAuth[0];
            this.curApplyId = data.CdgAuth[0].AuthInfo.AuthId;
            this.errorApplyText = data.CdgAuth[0].AuthInfo.CheckDescription;
            
            // 认证标识
            if(data.CdgAuth[0].AuthInfo.AuthStatus==1){
                this.authName = data.CdgAuth[0].AuthInfo.CertificateName;
            }else if(data.CdgAuth[0].AuthInfo.AuthStatus==0){
                this.authName = "认证中";
            }

        }else if(data.CdgAuth&&data.CdgAuth.length==2){
            this.hasApplyCount = 2
        	this.isAuthSuccess = true;
            let isAuthSuccessNumber = 0;
            
            data.CdgAuth.forEach((item,index)=>{
                if(data.CdgAuth[index].AuthInfo.AuthStatus==1){
                    isAuthSuccessNumber++;
                }
                if(data.CdgAuth[index].AuthInfo.AuthType=="企业车行"){
                    // 当前认证类型
                    this.curApplyType = "企业车行";
                    this.curApplyInfo = data.CdgAuth[index];
                    this.curApplyId = data.CdgAuth[index].AuthInfo.AuthId;
                    this.errorApplyText = data.CdgAuth[index].AuthInfo.CheckDescription;
                    // 认证名
                    this.authName = data.CdgAuth[index].AuthInfo.CertificateName;
                }
            })
            // 有几个认证成功的
            if(isAuthSuccessNumber==0){
                switch(this.authStatus){
                    case 0:
                        this.authName = "认证中";
                        break;
                    case -1:
                        this.authName = "未通过认证";
                        break;
                    default:
                        this.authName = "未实名认证";
                        break;
                }
                
            }
            
        }

	    
	}
}

export {headMember,sidebarMember,memberInfo};