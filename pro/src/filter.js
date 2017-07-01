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

/**
 * 日常问候
 * @param {String} str 任意字符串
 * @return 问候语
 */
export const greetByDate = (data) => {

    var hours = +(new Date().getHours());
    if(hours>11&&hours<=14){
        return "中午好，"
    }else if(hours>14&&hours<=18){
        return "下午好，"
    }else if(hours>18&&hours<=23){
        return "晚上好，"
    }else if(hours>=0&&hours<=4){
        return "夜深了，要注意休息哦！"
    }else if(hours>4&&hours<=11){
        return "早上好！"
    }
}


//----时间转换

//转换成2015年02月
export const dateFn = (data) => {
	if(!data&&data!=0) return;
    var data = data.substr(0,4)+'年'+data.substr(5,2)+'月';
    return data.toString();
}

//转换成2015年02月04日
export const dateFnToDay = (data) => {
    if(!data&&data!=0) return;
    var data = data.substr(0,4)+'年'+data.substr(5,2)+'月'+data.substr(8,2)+'日';
    return data.toString();
}

//转换成2015年
export const dateFnToYear = (data) => {
	if(!data&&data!=0) return;
    var data = data&&data.substr(0,4)+'年';
    return data.toString();
}

// 年份转换
export const dateYearFormat = (data) => {
    if(!data&&data!=0) return;
    var data = data&&data.substr(0,4);
    return data.toString();
}

// 年份转换
export const dateDayFormat = (data) => {
    if(!data&&data!=0) return;
    var data = data&&data.substr(0,10);
    return data.toString();
}

//----公里单位转换

//转换成15.2万公里
export const mileFn = (data,num=1) => {
    var number = data||0;
    return parseInt(number).toFixed(num)+"万公里"
}

//---价格小数加零
export const priceToFixed = (data,num=1) => {
    var number = data||0;
    return parseFloat(number).toFixed(num)+"万元"
}

export const priceFormat = (data,num=1) => {
    var number = data||0;
    return parseFloat(number).toFixed(num)
}

//---评分格式转换
export const gradeFormat = (num) => {
    let number = parseInt(num);
    return parseFloat(num * 5).toFixed(1);
}

//---地址格式转换 / => 点
export const addressFormat = (str) => {
    return str.replace(/[/]/g,' · ')
}

//---手机号格式转换 => 188****6264
export const telFormat = (str) => {
    if(!str&&str!=0) return;
    return str.substr(0,3) + "****" + str.substr(7,4)
}