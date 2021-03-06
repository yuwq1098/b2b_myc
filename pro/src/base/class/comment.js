// 回复的评论信息的构造类
class rlyCommentClass{
	constructor(data) {
	    this.id = data.CommentId||""           // 评论ID
	    this.memberId = data.MemberId||""      // 会员ID
	    this.name = data.NickName||""          // 昵称
	    // 头像
	    this.imgUrl = data.PhotoURL?data.PhotoURL+"?imageView2/3/w/200/h/200":require('assets/img/none-face.png')
        this.content = data.Content||""        // 内容

	    this.time = data.CommentTime||""       // 评论发布时间
	    this.upvoteCount = data.IUpvoted||0    // 点赞数
	    this.upvoted = data.IUpvoted||0        // 是否点赞

	    this.replyName = data.BeReplyNickName||""        // 被回复人昵称
	    // 被回复人头像
	    this.replyAvatar = data.BeReplyPhotoURL?data.BeReplyPhotoURL+"?imageView2/3/w/200/h/200":require('assets/img/none-face.png')
	    this.replyContent = data.BeReplyContent||""      // 被回复的内容
	    this.replyCommentId = data.BeReplyCommentId||""         // 被回复的Id

	}
}


// 评论信息的构造类
class commentClass{
	constructor(data) {
	    this.id = data.CommentId||""           // 评论ID
	    this.time = data.CommentTime||""       // 评论发布时间

        this.memberId = data.MemberId||""      // 会员ID
	    this.content = data.Content||""        // 内容
	    this.name = data.NickName||""          // 昵称
	    // 头像
	    this.imgUrl = data.PhotoURL?data.PhotoURL+"?imageView2/3/w/200/h/200":require('assets/img/none-face.png')
	    this.upvoteCount = data.IUpvoted||0    // 点赞数
	    this.upvoted = data.IUpvoted||0        // 是否点赞
	    this.rlyCount = data.RlyCount||0       // 回复书
	    this.rlyList = data.RlyList||[]        // 回复列表

	    // 格式化评论信息列表
        function _normalizeCommentList(list) {
            let arr = [];
            list.forEach((item,index) => {
                arr.push(new rlyCommentClass(item));
            })
            return arr;
        }

	    if(this.rlyList.length>0){
            this.rlyList = _normalizeCommentList(this.rlyList)
	    }else{
	    	this.rlyList = []
	    }

	    this.isShowPanel = false                // 评论面板的显示隐藏
	}
}

// 评论信息的构造类
class judgeInfo{
	constructor(data) {
	    this.low = data.LowCount||0            // 适中价格评价数
	    this.high = data.HighCount||0          // 价格高评价数
        this.total = data.TotalCount||0        // 总评价数

	    this.hasJudged = data.HasJudged||false                        // 是否已经评价过了，true表示已评价过
	    this.myJudge = data.MyJudgeResult||0                          // 我的评价结果 （1/-1/0 1高，-1低，0未评）
	    this.activityCount = data.B2BCarPriceJudgeActivityCount||0    // 总评价数达到此数值时，是否低价车功能才生效
	    this.isNiceCar = data.B2BCarPriceNicePercent||0               // 低价数÷总评价数>=0.7 表示是低价车
	}
}



export {commentClass,rlyCommentClass,judgeInfo};