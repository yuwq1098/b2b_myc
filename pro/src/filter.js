// 去空
export const clearNull = v => {
    return v.replace(/null/g,'')
}

/**
 * 格式化时间
 * 
 * @param {String} str
 * @returns 格式化后的时间
 */
export const formatDate = (str) => {
    if (!str) return ''
    var date = new Date(str)
    var time = new Date().getTime() - date.getTime() //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
    if (time < 0) {
        return ''
    } else if ((time / 1000 < 30)) {
        return '刚刚'
    } else if (time / 1000 < 60) {
        return parseInt((time / 1000)) + '秒前'
    } else if ((time / 60000) < 60) {
        return parseInt((time / 60000)) + '分钟前'
    } else if ((time / 3600000) < 24) {
        return parseInt(time / 3600000) + '小时前'
    } else if ((time / 86400000) < 31) {
        return parseInt(time / 86400000) + '天前'
    } else if ((time / 2592000000) < 12) {
        return parseInt(time / 2592000000) + '月前'
    } else {
        return parseInt(time / 31536000000) + '年前'
    }
}


//----时间转换

//转换成2015年02月
export const dateFn = (data) => {
	if(!data&&data!=0) return;
    var data = data.substr(0,4)+'年'+data.substr(5,2)+'月';
    return data.toString();
}

//转换成2015年
export const dateFnToYear = (data) => {
	if(!data&&data!=0) return;
    var data = data&&data.substr(0,4)+'年';
    return data.toString();
}

//----公里单位转换

//转换成15.2万公里
export const mileFn = (data) => {
	if(!data&&data!=0) return;
    return parseInt(data).toFixed(1)+"万公里"
}

//---价格小数加零
export const priceToFixed = (data,num=1) => {
    if (!data) return ''
    return parseFloat(data).toFixed(num)+"万元"
}
