

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
* @description ���û��������ֵ����Լ�� 
* @param val ��Ҫ���Ƶ�ֵ
* @param type [1] ֻ������������
*             [2] ֻ����������,����С����. 
* @return val ����ƥ����ֵ
*/ 
export function valReplace(val,type){
    var val = val.toString();
    var newVal = null;

    switch(type){
        case 1:
            newVal = val.replace(/\D/g,'');
            break;
        case 2:
            //�޸���һ���ַ���С���� �����.  
            if(val !=''&& val.substr(0,1) == '.'){  
                val="";  
            }  
            val = val.replace(/[^\d.]/g,"");  //��������֡��͡�.��������ַ�  
            val = val.replace(/\.{2,}/g,"."); //ֻ������һ��. ��������       
            val = val.replace(".","$#$").replace(/\./g,"").replace("$#$",".");      
            val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//ֻ����������С��       
            if(val.indexOf(".")< 0 && val !=""){//�����Ѿ����ˣ��˴����Ƶ������û��С���㣬��λ����Ϊ������ 01��02�Ľ��  
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



//����css��ʽ
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

//����css3��ʽ
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

//��ȡԪ�������������ĺ�����
export function getLeftToBrowser(e) {
  var offset=e.offsetLeft; 
  if(e.offsetParent!=null) offset+=getLeftToBrowser(e.offsetParent); 
  return offset; 
}

/** 
* @description �ж϶����������Ƿ���ֵ����1���Ϳ��ԣ�
* @param obj ��Ҫ�����Ķ���
* @function ͨ��es6�﷨ʵ��
* @return boolean  ����һ��������ֵtrue,û��������ֵfalse 
*/ 
export function isObjHasValue(obj){

    //obj�ǿսض�
    if(!obj||obj.length<=0) return;

    let onOff = false;
    //��������
    for (var key of Object.keys(obj)) {
        let bool = (obj[key]&&obj[key]!=-1)?true:false;
        onOff = onOff||bool;
    }
    return onOff;
}

/** 
* @description ���obj������ֵ
* @param obj ��Ҫ�����Ķ���
* @function ͨ��es6�﷨ʵ��
* @return newObj ����һ���¶����ȥ
*/ 
export function clearObjAllValue(obj){
    
    //obj�ǿսض�
    if(!obj||obj.length<=0) return;

    let newObj = {}

    //��������
    for (var key of Object.keys(obj)) {
        obj[key] = null;
        newObj.push(obj[key]);
    }
    console.log(newObj);
    return newObj;
}

/** 
* @description ��ֹ�¼�ð�� 
* @param obj ��ֹ�¼�ð�ݵĶ���(1������)
*/ 
export function cancelBubbleOne(obj,Fn){
    obj.onclick = function(ev){
        var e=ev||event;
        if(e && e.stopPropagation){//��ֹð��
            e.stopPropagation();
        }else{
            window.event.cancelBubble = true;
        }
    } 
    //�����¼�ð��
    document.onclick=function(ev){
        var e=ev||event;
        var target=e.target||e.srcElement;
        if(e.target!=obj)//�¼�����
        {
            //���лص���ʱ��ִ�лص�
            Fn&&Fn();
        }
    }    
    return;
};

/** 
* @description ��ֹ�¼�ð�� 
* @param obj ��ֹ�¼�ð�ݵĶ���(2������)
*/ 
export function cancelBubbleTwo(obj1,obj2,Fn){
    obj1.onclick = function(ev){
        var e=ev||event;
        if(e && e.stopPropagation){//��ֹð��
            e.stopPropagation();
        }else{
            window.event.cancelBubble = true;
        }
    } 
    obj2.onclick = function(ev){
        var e=ev||event;
        if(e && e.stopPropagation){//��ֹð��
            e.stopPropagation();
        }else{
            window.event.cancelBubble = true;
        }
    } 
    //�����¼�ð��
    document.onclick=function(ev){
        var e=ev||event;
        var target=e.target||e.srcElement;
        if(e.target!=obj1&&e.target!=obj2)//�¼�����
        {
            //���лص���ʱ��ִ�лص�
            Fn&&Fn();
        }
    }    
    return;
};

/** 
* @description ��ҳ�Ĺ��� 
* @param obj Ҫ�����ĸ����� 
* @param dis ÿ���˶��ľ��� 
* @param msec ��ʱ��Ƶ�� 
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
* @description �¼��󶨣����ݸ������ 
* @param target �¼��������� 
* @param type �¼� 
* @param func �¼������� 
*/ 
export function addEvent(target, type, func) { 
    if (target.addEventListener) //��ie ��ie9 
        target.addEventListener(type, func, false); 
    else if (target.attachEvent) //ie6��ie8 
        target.attachEvent("on" + type, func); 
    else target["on" + type] = func; //ie5 
}; 

/** 
* @description �¼��Ƴ������ݸ������ 
* @param target �¼��������� 
* @param type �¼� 
* @param func �¼������� 
*/ 
export function removeEvent(target, type, func){ 
    if (target.removeEventListener) 
        target.removeEventListener(type, func, false); 
    else if (target.detachEvent) 
        target.detachEvent("on" + type, func); 
    else target["on" + type] = null; 
};  

//��ȡdata��ƴ��
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
