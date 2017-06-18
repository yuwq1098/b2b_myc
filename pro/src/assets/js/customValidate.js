/*
插件自带的验证规则：
after{target} - 比target要大的一个合法日期，格式(DD/MM/YYYY)
alpha - 只包含英文字符
alpha_dash - 可以包含英文、数字、下划线、破折号
alpha_num - 可以包含英文和数字
before:{target} - 和after相反
between:{min},{max} - 在min和max之间的数字
confirmed:{target} - 必须和target一样
date_between:{min,max} - 日期在min和max之间
date_format:{format} - 合法的format格式化日期
decimal:{decimals?} - 数字，而且是decimals进制
digits:{length} - 长度为length的数字
dimensions:{width},{height} - 符合宽高规定的图片
email - 不解释
ext:[extensions] - 后缀名
image - 图片 
in:[list] - 包含在数组list内的值
ip - ipv4地址
max:{length} - 最大长度为length的字符
mimes:[list] - 文件类型
min - max相反
mot_in - in相反
numeric - 只允许数字
regex:{pattern} - 值必须符合正则pattern
required - 不解释
size:{kb} - 文件大小不超过
url:{domain?} - (指定域名的)url
 */


import VeeValidate, { Validator } from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN';
// 按照下面的方式引入中文包，会报这个错   
// Uncaught TypeError: Cannot read property 'name' of undefined
// import zh_CN from 'assets/js/zh_CN.js';


// 验证配置设置
const vConfig = {
  errorBagName: 'errors', // 如果属性有冲突，那么改变这个错误提示的名字.
  delay: 0,               // 延迟时间
  locale: 'zh_CN',        // 加载语言包
  messages: null,          
  strict: true,
  events: 'input|blur',
};

/*
*自定义规则：****
*/
Validator.extend('abc', {
    messages: {
        zh_CN: field => field + ':' + '我笑了',
    },
    validate: value => {
        return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
    }
});

/*
*异步验证****
*/
Validator.extend('verify_coupon', {
    getMessage: (field) => `The ${field} is not a valid coupon.`,
    validate: (value) => new Promise(resolve => {
        console.log("我是异步验证")
    })
});

Validator.addLocale(zh_CN);

export {VeeValidate,vConfig};