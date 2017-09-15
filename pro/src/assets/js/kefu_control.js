var kefuObj = {
    count: 0,
    _currInterval: null,
    // 查找次数
    maxSearch: 60,
    intervalTime: 500,
}

function clearMyInterval(){
    clearInterval(kefuObj._currInterval);
    kefuObj = null
}

/**
* @description 判断DOM上是否含有指定类名
* @param el 事件作用对象
* @param className 类名
*/
function hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
}

/**
* @description 为DOM添加指定类名
*/
function addClass(el, className) {
    if (hasClass(el, className)) {
        return;
    }
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
}

/**
* @description 为DOM删除指定类名
*/
function removeClass(el,className) {
    if (!hasClass(el, className)) {
        return;
    }
    el.classList.remove(className);
}

// 设置客服样式
function setKefuDomStyle(el){
    el.style.bottom = "5px";
    el.style.right = "47px";
    el.style.top = "";
    el.style.zIndex = "999";
    addClass(el,'f__display_block')
    el.id = "myc_kefu"
}

function setKefuDomStyle2(el){
    addClass(el,'f__display_block')
}

kefuObj._currInterval = setInterval(function(){
    var _kefu = document.getElementsByClassName("kf_qycn_com_cckf_icon");

    if(_kefu.length>0){
        // 设置客服样式
        setKefuDomStyle(_kefu[0])
        setKefuDomStyle2(_kefu[1])
        clearMyInterval();
        return;
    }
    kefuObj.count++;
    if(kefuObj.count>=kefuObj.maxSearch){
        clearMyInterval();
    }
},kefuObj.intervalTime);