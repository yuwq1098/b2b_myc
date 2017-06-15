

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
