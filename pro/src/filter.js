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

// 去除年份日期转换
export const dateFormatRemoverYear = (data) => {
    if(!data&&data!=0) return;
    var data = data&&data.substr(5,);
    var str = data.substr(0,2)+"/"+data.substr(3,2)+"  "+data.substr(6,)
    return str.toString();
}

// 日期转换
export const dateDayFormat = (data) => {
    if(!data&&data!=0) return;
    var data = data&&data.substr(0,10);
    return data.toString();
}

// 分钟转换
export const dateMinuteFormat = (data) => {
    if(!data&&data!=0) return;
    var data = data&&data.substr(0,16);
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

//---综合油耗单位
export const literFn = (data,num=1) => {
    var number = data||0;
    return parseFloat(number).toFixed(num)+" L/100km"
}

//---城市单位去空，江西省=>江西
export const cityFn = (str) => {
    if(!str&&str!=0) return;
    return str.replace(/['省'|'市']/g,'')
}

//---评分格式转换
export const gradeFormat = (num) => {
    let number = parseInt(num);
    return parseFloat(num * 5).toFixed(1);
}

//---地址格式转换 / => 点
export const addressFormat = (str) => {
    if(!str&&str!=0) return;
    return str.replace(/[/]/g,' · ')
}

//---地址格式转换 / => 点
export const addressFormat2 = (str) => {
    if(!str&&str!=0) return;
    return str.replace(/[/]/g,'')
}

//---手机号格式转换 => 188****6264
export const telFormat = (str) => {
    if(!str&&str!=0) return;
    return str.substr(0,3) + "****" + str.substr(7,4)
}

//---用户姓名式转换 => *文强
export const usernameFormat = (str) => {
    if(!str&&str!=0) return;
    return '*'+str.substr(1,str.length)
}

//---Boolean转换 => 是/否
export const boolFormat = (str) => {
    if(!str&&str!="") return;
    return str=="true"?"是":"否"
}

//---Boolean转换 => 能/不能
export const canFormat = (str) => {
    if(!str&&str!="") return;
    return str=="true"?"能":"不能"
}