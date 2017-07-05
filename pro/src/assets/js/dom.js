

export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }

  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

/** 
* @description 将图片文件转换成Base64格式
* @param file Object 图片文件对象
* @param callBack Function 回调方法
*/ 
export function getBase64FromImgFile(file,callBack){
    var reader = new FileReader();  
    reader.onload = function(e) {  
        var base64Img= e.target.result;
        if(callBack){  
            callBack(base64Img);  
        }  
    };  
    reader.readAsDataURL(file);  
}


/** 
* @description 数组数据倍增
* @param array,num  数组  翻几倍
* @param array 数组
*/ 

export function doubleArray(array,num=2){
    
    let arr = array; 
    // arr.push(...array);
    for(let i = 0; i<num; i++){
        arr = arr.concat(arr);
    }
    return arr;
}

/** 
* @description 使用canvas裁剪/压缩图片
* @param img,theW,theH,realW,realH  Number/String 传值 图片及各种canvas信息
* @param callBack Function 回调方法
*/ 
export function drawToCanvas(img,theW,theH,realW,realH,callback){
    var canvas = document.createElement("canvas");  
    canvas.width=theW;  
    canvas.height=theH;  
    var ctx = canvas.getContext('2d');  
    ctx.drawImage(
        img,    //规定要使用的图像、画布或视频。
        0,      //开始剪切的 x 坐标位置,  
        0,      //开始剪切的 y 坐标位置,  
        realW,  //被剪切图像的宽度,  
        realH,  //被剪切图像的高度,
        0,      //在画布上放置图像的 x 坐标位置,  
        0,      //在画布上放置图像的 y 坐标位置,  
        theW,   //要使用的图像的宽度。（伸展或缩小图像） 
        theH    //要使用的图像的高度。（伸展或缩小图像）
    );  

    //--获取base64字符串及canvas对象传给success函数。  
    var base64str=canvas.toDataURL("image/jpeg");  
    if(callback){  
        callback(base64str,canvas);  
    }  
}

/** 
* @description 判断用户当前选择的文件是不是已经在之前的文件列表里了 
* @param newfiles Object 当前选择的文件
* @param curFiles Array  已选择的文件列表
* @return fileRepeat  boolean 返回是否有重复  true 有, false 没有
*/ 
export function isRepeatSelectionByFiles(newfiles,curFiles){

    let isRepeat = false;
    for (var key of Object.keys(newfiles)) {
        let _files =  newfiles[key];
        
        for(let i = 0; i<curFiles.length; i++)
        {
            let item = curFiles[i];
            if(item.name==_files.name&&
                item.size==_files.size&&
                item.type==_files.type)
            {
                isRepeat = true;
                break;
            }
        }
        if(isRepeat) break;
    }
    return isRepeat;
}


/** 
* @description 对用户表单输入的值进行约束 
* @param val 需要控制的值
* @param type [1] 只允许输入数字
*             [2] 只能输入数字,能输小数点. 
* @return val 返回匹配后的值
*/ 
export function valReplace(val,type){
    var val = val.toString();
    var newVal = null;

    switch(type){
        case 1:
            newVal = val.replace(/\D/g,'');
            break;
        case 2:
            //修复第一个字符是小数点 的情况.  
            if(val !=''&& val.substr(0,1) == '.'){  
                val="";  
            }  
            val = val.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
            val = val.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的       
            val = val.replace(".","$#$").replace(/\./g,"").replace("$#$",".");      
            val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数       
            if(val.indexOf(".")< 0 && val !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
                if(val.substr(0,1) == '0' && val.length == 2){  
                    val= val.substr(1,val.length);      
                }  
            }
            return newVal = val;
            break;
        default:
          return newVal = val.replace(/\D/g,'');
    }
    return newVal;
}



//设置css样式
export function css(obj,attr,value){
  if(arguments.length==2){
    if(attr=='scale'|| attr=='rotate'|| attr=='rotateX'||attr=='rotateY'||attr=='scaleX'||attr=='scaleY'||attr=='translateY'||attr=='translateX'){
      if(!obj.$Transform)obj.$Transform={};
      switch(attr){
        case 'scale':
        case 'scaleX':
        case 'scaleY':
          return typeof(obj.$Transform[attr])=='number'?obj.$Transform[attr]:100;
          break;
        default:
          return obj.$Transform[attr]?obj.$Transform[attr]:0;
      }
    }
    var current=getStyle(obj,attr);
    return attr=='opacity'?Math.round(parseFloat(current)*100):parseInt(current);   
  }else if(arguments.length==3){
    switch(attr){
      case 'scale':
      case 'scaleX':
      case 'scaleY':
      case 'rotate':
      case 'rotateX':
      case 'rotateY':
      case 'translateZ':
      case 'translateX':
      case 'translateY':
        setCss3(obj,attr,value);
        break;
      case 'width':
      case 'height':
      case 'paddingLeft':
      case 'paddingTop':
      case 'paddingRight':
      case 'paddingBottom':
        value=Math.max(value,0);
      case 'left':
      case 'top':
      case 'marginLeft':
      case 'marginTop':
      case 'marginRight':
      case 'marginBottom':
        obj.style[attr]=typeof(value=='string')?value:value+'px';
        break;
      case 'opacity':
        obj.style.filter="alpha(opacity:"+value+")";
        obj.style.opacity=value/100;
        break;
      default:
        obj.style[attr]=value;
    }
  }
  return function(attr_in,value_in){css(obj,attr_in,value_in)};
};

//兼容css3样式
export function setCss3(obj, attr, value){
  var str='';
  var val='';
  var arr=['Webkit','Moz','O','ms',''];
  if(!obj['$Transform']){
    obj['$Transform']={};
  }
  obj['$Transform'][attr]=parseInt(value);
  for(str in obj['$Transform']){
    switch(str){
      case 'scale':
      case 'scaleX':
      case 'scaleY':
        val+=str+'('+(obj['$Transform'][str]/100)+')';  
        break;
      case 'rotate':
      case 'rotateX':
      case 'rotateY':
        val+=str+'('+(obj['$Transform'][str])+'deg)'; 
        break;
      case 'translateX':
      case 'translateY':
      case 'translateZ':
        val+=str+'('+(obj['$Transform'][str])+'px)';  
        break;
    }
  }
  for(var i=0;i<arr.length;i++){
    obj.style[arr[i]+'Transform']=val;
  } 
};  

//获取元素相对于浏览器的横坐标
export function getLeftToBrowser(e) {
  var offset=e.offsetLeft; 
  if(e.offsetParent!=null) offset+=getLeftToBrowser(e.offsetParent); 
  return offset; 
}


/**
 * 格式化时间(已过去时间)
 * 
 * @param {String} str
 * @returns 格式化后的时间
 */
export const passByFormatDate = (str) => {
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

// 对Date的扩展，将 Date 转化为指定格式的String   
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
export function dateFormat(fmt,timestamp){ 

  var myTimestamp = new Date(parseInt(timestamp));
  var date={   
    "M+":myTimestamp.getMonth()+1,                 //月份   
    "d+":myTimestamp.getDate(),                    //日   
    "H+":myTimestamp.getHours(),                   //小时   
    "m+":myTimestamp.getMinutes(),                 //分   
    "s+":myTimestamp.getSeconds(),                 //秒   
    "q+":Math.floor((myTimestamp.getMonth()+3)/3), //季度，+3为了好取整   
    "S":myTimestamp.getMilliseconds()              //毫秒   
  };   
  if(/(y+)/.test(fmt)){//RegExp.$1(正则表达式的第一个匹配，一共有99个匹配)
    fmt=fmt.replace(RegExp.$1,(myTimestamp.getFullYear()+"").substr(4-RegExp.$1.length));  
    for(var k in date){  
      if(new RegExp("("+k+")").test(fmt)){
        fmt=fmt.replace(RegExp.$1,(RegExp.$1.length==1)?(date[k]):(("00"+ date[k]).substr((""+ date[k]).length)));   
      } 
    }
  }     
  return fmt;   
};

/** 
* @description 根据时间对象格式化时间
* @param fmt 时间格式 "yyyy-MM-dd hh:mm:ss.S"   "yyyy-M-d h:m:s.S"
* @param data 时间对象（结果）
* @return DATE.string  返回日期   2016-01-01
*/
export function formatDateByDate(fmt,data){ 

  var myDate = new Date(data);
  var date={   
    "M+":myDate.getMonth()+1,                 //月份   
    "d+":myDate.getDate(),                    //日   
    "H+":myDate.getHours(),                   //小时   
    "m+":myDate.getMinutes(),                 //分   
    "s+":myDate.getSeconds(),                 //秒   
    "q+":Math.floor((myDate.getMonth()+3)/3), //季度，+3为了好取整   
    "S":myDate.getMilliseconds()              //毫秒   
  };   
  if(/(y+)/.test(fmt)){//RegExp.$1(正则表达式的第一个匹配，一共有99个匹配)
    fmt=fmt.replace(RegExp.$1,(myDate.getFullYear()+"").substr(4-RegExp.$1.length));  
    for(var k in date){  
      if(new RegExp("("+k+")").test(fmt)){
        fmt=fmt.replace(RegExp.$1,(RegExp.$1.length==1)?(date[k]):(("00"+ date[k]).substr((""+ date[k]).length)));   
      } 
    }
  }     
  return fmt;   
};


/** 
* @description 根据int车龄推算出  时间 
* @param minAge maxAge 传入int  最小车龄 最大车龄
* @function 通过es6语法实现
* @return DATE.string  返回日期   2016-01-01
*/ 
export function getDateByInt(int){

    var dateTime = '';
    // 目标时间戳
    var targetTimestamp = getLastYearYestdy(new Date(),int);
    dateTime = dateFormat("yyyy-MM-dd",targetTimestamp)

    return dateTime;
}

 //获得几年前（int）在昨天这一天的日期   
export function getLastYearYestdy(date,num){   
    var yearNum = num||1;
     var strYear = date.getFullYear() - yearNum;     
     var strDay = date.getDate();     
     var strMonth = date.getMonth()+1;   
     if(strMonth<10)     
     {     
        strMonth="0"+strMonth;     
     }   
     if(strDay<10)     
     {     
        strDay="0"+strDay;     
     }
     // 如果该日期合法 比如闰年有2-29 / 平年有2-28 
     if(checkDate(parseInt(strYear),parseInt(strMonth),parseInt(strDay))){
         var datastr = strYear+"-"+strMonth+"-"+strDay; 
         return +new Date(datastr); 
     }

     // 否则使用时间戳方式
     return +new Date(date) - 31536000000
       
}

//判断给定日期是否合法
export function checkDate(year,month,date){
    var now = new Date(year,month -1,date);
    if(now.getDate()===date&&now.getFullYear()==year&&now.getMonth()===(month-1)){
        return true;
    }
    return false;
}  


/** 
* @description 根据int车龄推算出  时间区间 返回两个date
* @param minAge maxAge 传入int  最小车龄 最大车龄
* @function 通过es6语法实现
* @return Array  返回日期区间  dateFrom 起   dateTo 止
*/ 
export function getDateByAge(minAge,maxAge){
    
    let [dateFrom,dateTo] = ['',''];
        
    // if(minAge&&!maxAge){   //如果只有最小值
    //     dateTo =  getDateByInt(minAge);          //比如两年前，  就是最大时间 2015
    // }else if(!minAge&&maxAge){ //如果只有最大值
    //     dateFrom =  getDateByInt(maxAge);        //比如五年内，  就是最小时间 2012
    // }else if(minAge&&maxAge){//如果有最大值和最小值
    //     dateTo =  getDateByInt(minAge);          //比如两年前，  就是最大时间 2015
    //     dateFrom =  getDateByInt(maxAge);        //比如五年内，  就是最小时间 2012
    // }

    if((minAge&&!maxAge)||(minAge&&maxAge)) dateTo =  getDateByInt(minAge);          //比如两年前，  就是最大时间 2015
    if((!minAge&&maxAge)||(minAge&&maxAge)) dateFrom =  getDateByInt(maxAge);        //比如五年内，  就是最小时间 2012


    return [dateFrom,dateTo]
}

/** 
* @description 判断对象中属性是否含有值（有1个就可以）
* @param obj 需要遍历的对象
* @function 通过es6语法实现
* @return boolean  至少一个属性有值true,没有属性有值false 
*/ 
export function isObjHasValue(obj){

    //obj非空截断
    if(!obj||obj.length<=0) return;

    let onOff = false;
    //遍历对象
    for (var key of Object.keys(obj)) {
        // let bool = (obj[key]&&obj[key]!=-1)?true:false;
        let bool = obj[key]?true:false;
        onOff = onOff||bool;
    }
    return onOff;
}

/** 
* @description 清空obj的所有值
* @param obj 需要遍历的对象
* @function 通过es6语法实现
* @return newObj 返回一个新对象回去
*/ 
export function clearObjAllValue(obj){
    
    //obj非空截断
    if(!obj||obj.length<=0) return;

    let newObj = {}

    //遍历对象
    for (var key of Object.keys(obj)) {
        obj[key] = null;
        newObj.push(obj[key]);
    }
    console.log(newObj);
    return newObj;
}

/** 
* @description 阻止事件冒泡 
* @param obj 阻止事件冒泡的对象(1个对象)
*/ 
export function cancelBubbleOne(obj,Fn){
    obj.onclick = function(ev){
        var e=ev||event;
        if(e && e.stopPropagation){//阻止冒泡
            e.stopPropagation();
        }else{
            window.event.cancelBubble = true;
        }
    } 
    //处理事件冒泡
    document.onclick=function(ev){
        var e=ev||event;
        var target=e.target||e.srcElement;
        if(e.target!=obj)//事件对象
        {
            //当有回调的时候执行回调
            Fn&&Fn();
        }
    }    
    return;
};

/** 
* @description 阻止事件冒泡 
* @param obj 阻止事件冒泡的对象(2个对象)
*/ 
export function cancelBubbleTwo(obj1,obj2,Fn){
    obj1.onclick = function(ev){
        var e=ev||event;
        if(e && e.stopPropagation){//阻止冒泡
            e.stopPropagation();
        }else{
            window.event.cancelBubble = true;
        }
    } 
    obj2.onclick = function(ev){
        var e=ev||event;
        if(e && e.stopPropagation){//阻止冒泡
            e.stopPropagation();
        }else{
            window.event.cancelBubble = true;
        }
    } 
    //处理事件冒泡
    document.onclick=function(ev){
        var e=ev||event;
        var target=e.target||e.srcElement;
        if(e.target!=obj1&&e.target!=obj2)//事件对象
        {
            //当有回调的时候执行回调
            Fn&&Fn();
        }
    }    
    return;
};

/** 
* @description 首页的公告 
* @param obj 要滚动的父容器 
* @param dis 每次运动的距离 
* @param msec 定时器频率 
*/ 
export function autoNoticeHorizontal(obj,onOFF,dis,msec){
  var oLi=obj.children;
  var iL=oLi.length*2;
  var iW=0;
  var iNow=0;
  var onOFF = onOFF||false;
  var indexInterval = null;
  if(onOFF&&!indexInterval){
      css(obj,'translateX',0);
      clearInterval(indexInterval);
      indexInterval = null;
      return;
  }    
  obj.innerHTML+=obj.innerHTML;
  for(var i=0;i<obj.children.length;i++){
    iW=obj.children[i].offsetWidth*iL;
  }   
  obj.style.width=iW+'px';
  
  indexInterval = setInterval(function(){
    if(css(obj,'translateX')<=-iW/2){
      css(obj,'translateX',-14);  
    }
    css(obj,'translateX',css(obj,'translateX')-(dis||1));
  },msec||25);
};

/** 
* @description 事件绑定，兼容各浏览器 
* @param target 事件触发对象 
* @param type 事件 
* @param func 事件处理函数 
*/ 
export function addEvent(target, type, func) { 
    if (target.addEventListener) //非ie 和ie9 
        target.addEventListener(type, func, false); 
    else if (target.attachEvent) //ie6到ie8 
        target.attachEvent("on" + type, func); 
    else target["on" + type] = func; //ie5 
}; 

/** 
* @description 事件移除，兼容各浏览器 
* @param target 事件触发对象 
* @param type 事件 
* @param func 事件处理函数 
*/ 
export function removeEvent(target, type, func){ 
    if (target.removeEventListener) 
        target.removeEventListener(type, func, false); 
    else if (target.detachEvent) 
        target.detachEvent("on" + type, func); 
    else target["on" + type] = null; 
};  

//获取data，拼接
export function getData(el, name, val) {
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}

let elementStyle = document.createElement('div').style
let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
