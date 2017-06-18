/**
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
required - 匹配为空
size:{kb} - 文件大小不超过
url:{domain?} - (指定域名的)url
 */

/**
插件自带的errors方法   
在当前组件使用的方式 => this.errors.all()

errors.first('field') - 获取关于当前field的第一个错误信息
collect('field') - 获取关于当前field的所有错误信息(list)
has('field') - 当前filed是否有错误(true/false)
all() - 当前表单所有错误(list)
any() - 当前表单是否有任何错误(true/false)
add(String field, String msg) - 添加错误
clear() - 清除错误
count() - 错误数量
remove(String field) - 清除指定filed的所有错误
*/


import VeeValidate, { Validator } from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN';
// 按照下面的方式引入中文包，会报这个错   
// Uncaught TypeError: Cannot read property 'name' of undefined
// import zh_CN from 'assets/js/zh_CN.js';


// 验证器配置信息
const vConfig = {
  errorBagName: 'allErrors',     // 如果属性有冲突，那么改变这个错误提示的名字.
  fieldsBagName: 'fields',    // 将在Vue的实例数据中注入的字段(旗帜)对象的名称。
  delay: 20,                  // 延迟时间(验证延时触发) 我这里改成 20ms，一般设置0
  locale: 'zh_CN',            // 加载语言包 (zh_CN中文包)，默认en,  英文字体包
  messages: null,         
  strict: true,               // 没有规则的字段将会失败，除非严格设置为false。
  
  enableAutoClasses: false,   // 在输入或组件的根元素上应用自动类。
  classNames: {
    touched: 'touched',       // the control has been blurred
    untouched: 'untouched',   // the control hasn't been blurred
    valid: 'valid',           // model is valid
    invalid: 'invalid',       // model is invalid
    pristine: 'pristine',     // control has not been interacted with
    dirty: 'dirty'            // control has been interacted with
  },

  /**
  * @description 可用参数, 常用表单事件 onkeyup,onkeydown,onfocus,onblur
  * @targetUrl  参考网址路径:  http://www.w3school.com.cn/tags/html_ref_eventattributes.asp
  */
  events: 'input|blur|keyup',       // input的频率远高于blur, 事件触发, 如果提供了空字符串，它将禁用所有侦听器。
                          
  inject: true,               // 指定是否应该为所有组件自动注入验证器实例，检查组件注入(高级注射)以获得更多信息。
};

/**
* @effect 与验证器字典合并的字典，检查自定义消息
* @description 验证规则 
*    [custom messages](rules.html#custom-messages) and [localization](localization.html) sections.
*    用户自定义消息(rules.html#custom-messages)和本地化(localization.html)部分。
* @supplement 在zh_CN下改变中文提示，改变
*/

const dictionary = {
    zh_CN: {
        // 默认的匹配提示
        messages: {
            required:(field)=> "请输入"+field
        },
        // 用户自定义匹配提示(简单说就是不想用默认的)
        custom: {
            mobile: {
                required:(field)=> field+'为空,你好意思吗' // messages can be strings as well.
            },
            email: {
                email:(field)=> field+'格式不对' // messages can be strings as well.
            },
        },
        attributes:{
            email:'邮箱',
            password:'密码',
            name:'name',
        }
    }
};

/*
* @description 手机号验证规则
*/
Validator.extend('mobile', {
    messages: {
        zh_CN:(field, args) => field + '必须是11位手机号码',
    },
    validate: (value, args) => {
       return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
    }
});

/*
* @description 异步验证,返回一个promise
*/
Validator.extend('verify_coupon', {
    getMessage: (field) => `The ${field} is not a valid coupon.`,
    validate: (value) => new Promise(resolve => {
        console.log("我是异步验证")
    })
});

const validator = new Validator();

validator.attach('email', 'required|email');
validator.attach('name', 'required|alpha|min:3');

Validator.addLocale(zh_CN);
Validator.updateDictionary(dictionary);

export {VeeValidate, vConfig, validator};