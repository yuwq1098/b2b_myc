
// 广告帮助视频信息的构造类
class adVideoInfo{
    constructor(data) {
	    this.title = data.Title||0                    // 标题
	    this.videoUrl = data.VideoUrl||0              // 视频资源路径
	}
}

export { adVideoInfo };