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
            required:(field)=> "请输入"+field,
            decimal:(field,params)=> '请输入'+params+'位小数以内的数字',
            between:(field,params) => '请输入'+params[0]+'~'+params[1]+'之间的值',
            min:(field,params) => '请最少输入'+params+'个字符',
            max:(field,params) => '最多允许输入'+params+'个字符',
            alpha_dash:(field,params) => '只能输入数字和字母'
        },
        // 用户自定义匹配提示(简单说就是不想用默认的)
        custom: {
            mobile: {
                required:(field)=> field+'为空,你好意思吗' // messages can be strings as well.
            },
            email: {
                email:(field)=> field+'格式不对' // messages can be strings as well.
            },
            carInCity:{
                required:()=> '请选择车辆所在地' 
            },
            selectedModel:{
                required:()=> '请选择品牌车型' 
            },
            plateInCity:{
                required:()=> '请选择车牌归属地' 
            },
            plateDate:{
                required:()=> '请选择上牌日期' 
            },
            changeNum:{
                required:()=> '请选择过户次数' 
            },
            outFactoryDate:{
                required:()=> '请选择出厂日期'
            },
            fixedPrice:{
                required:()=> '请填写一口价'
            },
            retailPrice:{
                required:()=> '请填写零售价'
            },
            mileage:{
                required:()=> '请填写行驶里程'
            },
            dischargeStandard:{
                required:()=> '请选择排放标准'
            },
            liter:{
                required:()=> '请填写排量',
                between:(field,params) => '请输入'+params[0]+'.0L ~ '+params[1]+'.0L 之间的值',
            },
            insuranceDate:{
                required:()=> '请选择交强险日期'
            },
            serviceType:{
                required:()=> '请选择使用性质'
            },
            vin:{
                required:()=> '请填写车架号',
                min:()=> '车架号一般由17位字符组成',
                max:()=> '车架号一般由17位字符组成',
            },
            color:{
                required:()=> '请选择车身颜色'
            },
            desc:{
                required:(field)=> '请填写'+field,
                min:(field,params) => '请填写10 ~ 300字的'+field,
                max:(field,params) => '请填写10 ~ 300字的'+field
            },
            nameplate:{
                between:() => '请上传1~3张车铭牌图片'
            },
            photo:{
                between:() => '请上传2~12张车辆图片'
            },
            pass:{
                min:()=> '密码由6-22位数字与字母组成,暂不支持符号',
                max:()=> '密码由6-22位数字与字母组成,暂不支持符号',
            },
            newPass:{
                min:()=> '密码由6-22位数字与字母组成,暂不支持符号',
                max:()=> '密码由6-22位数字与字母组成,暂不支持符号',
            },
            imgCode:{
                min:(field)=> field+'由4位字符组成',
                max:(field)=> field+'由4位字符组成',
            },
            smsCode:{
                min:(field)=> field+'由4位数字组成',
                max:(field)=> field+'由4位数字组成',
            },
            passReg:{
                min:()=> '密码由6-22位数字与字母组成,暂不支持符号',
                max:()=> '密码由6-22位数字与字母组成,暂不支持符号',
            },
            imgCodeReg:{
                min:(field)=> field+'由4位字符组成',
                max:(field)=> field+'由4位字符组成',
            },
            smsCodeReg:{
                min:(field)=> field+'由4位数字组成',
                max:(field)=> field+'由4位数字组成',
            },
            nickname:{
                min:(field)=> field+'由2~12个字符组成',
                max:(field)=> field+'由2~12个字符组成',
            },
            payPass:{
                min:(field)=> '输入6位数字组成的'+field,
                max:(field)=> '输入6位数字组成的'+field,
            },
            oldPayPass:{
                min:(field)=> '输入6位数字组成的'+field,
                max:(field)=> '输入6位数字组成的'+field,
            },
            newPayPass:{
                min:(field)=> '输入6位数字组成的'+field,
                max:(field)=> '输入6位数字组成的'+field,
            },
            checkPayPass:{
                confirmed:(field)=> '请再次输入以确认您的密码',
            },
            cdgCity:{
                required:()=> '请选择车行所在地'
            },
            rMoney:{
                between:()=> '单笔充值最低100元,限额100万'
            }
        },
        attributes:{
            tel: '手机号码',
            email:'邮箱',
            password:'密码',
            name:'name',
            desc: '车主留言',
            fixedPrice: "一口价",
            retailPrice: '零售价',
            pass: '密码',
            newPass: '新密码',
            checkPass: '确认密码',
            imgCode: '图形验证码',
            smsCode: '短信验证码',
            oldTel: '(旧)手机号码',
            oldImgCode: '(旧)图形验证码',
            oldCode: '(旧)短信验证码',
            newTel: '(新)手机号码',
            newImgCode: '(新)图形验证码',
            newCode: '(新)短信验证码',
            nameOne: '用户名',
            passOne: '密码',
            telReg: "手机号",
            passReg: "密码",
            imgCodeReg: "图形验证码",
            smsCodeReg: "短信验证码",
            nickname: "昵称",
            payPass: "支付密码",
            checkPayPass: "确认支付密码",
            newPayPass: "新支付密码",
            oldPayPass: "旧支付密码",
            authName: "真实姓名",
            authNumber: "身份证号",
            cdgName: "车行名称",
            cdgCity: "车行所在地",
            cdgAddress: "车行详细地址",
            cdgDesc: "车行描述",
            rMoney: "充值金额",
            wMoney: "提现金额",
            alipayAccount: "支付宝账号",
            nBankCard: "农行卡号",
            nOpenAccountName: "开户名",
            realName: "真实姓名",
            aReplenish: "具体的仲裁理由",
            plateNumber: "车牌号",
            engineNumber: "发动机号",
            finalPrice: "成交价",
            trusteeMoney: "托管尾款",
        }
    }
};

/*
* @description 用户名验证规则
*/
Validator.extend('uname', {
    messages: {
        zh_CN:(field, args) => '登录名通常是手机号哦！',
    },
    validate: (value, args) => {
       return value.length <= 11 && value.length >= 4
    }
});


/*
* @description 手机号验证规则
*/
Validator.extend('mobile', {
    messages: {
        zh_CN:(field, args) => field + '必须是11位',
    },
    validate: (value, args) => {
       return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
    }
});


/*
* @description 只允许用户输入数字规则
*/
Validator.extend('number', {
    messages: {
        zh_CN:(field, args) => '您不能输入数字以外的字符',
    },
    validate: (value, args) => {
       return /^([0-9]+)$/.test(value)
    }
});


/*
* @description 身份证号验证规则
*/
Validator.extend('identity', {
    messages: {
        zh_CN:(field, args) => '请输入正确的身份证号码',
    },
    validate: (value, args) => {
       // return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)
       return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/.test(value)
    }
});


/*
* @description QQ号验证规则
*/
Validator.extend('QQ', {
    messages: {
        zh_CN:(field, args) => '请输入正确的QQ号码',
    },
    validate: (value, args) => {
        var reg = new RegExp("/^[1-9]\d{4,11}$/","i");
        return reg.test(value)
    }
});


/*
* @description 车牌号验证规则
*/
Validator.extend('plateNumber', {
    messages: {
        zh_CN:(field, args) => '请输入正确的车牌号码，例: 赣A6P522',
    },
    validate: (value, args) => {
       return /^[\u4E00-\u9FA5][\da-zA-Z]{6}$/.test(value)
    }
});


/*
* @description 发动机号验证规则
*/
Validator.extend('engineNumber', {
    messages: {
        zh_CN:(field, args) => '请输入正确的发动机号',
    },
    validate: (value, args) => {
       return /^[a-zA-Z0-9]{16}$/.test(value)
    }
});


/*
* @description 只能输入中文和英文
*/
Validator.extend('CN_EN', {
    messages: {
        zh_CN:(field, args) => '请输入中英文的组合',
    },
    validate: (value, args) => {
       return /^[\u4E00-\u9FA5A-Za-z]+$/.test(value)
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