/** 
* @description 数据哈希（hash）匹配
* @creatDate 2017-6-16
* @author Geek.Yu  email:1098654043@qq.com
*/ 

// dom操作方法
import * as geekDom from "assets/js/dom.js"

export const userFilterLabel = {
	//车龄
    'age':{
        '-1':'不限',
    	'1':'1年内',
    	'2':'1-3年',
    	'3':'3-5年',
    	'4':'5-8年',
    	'5':'8年以上'
    },
    //排放标准
    'dischargeStandard':{
        '-1':'不限',
    	'1':'国1',
    	'2':'国2',
    	'3':'国3',
    	'4':'国4',
    	'5':'国5'
    },
    //里程数
    'mileage':{
        '-1':'不限',
    	'1':'一万公里内',
    	'2':'1-3万公里内',
    	'3':'3-6万公里内',
    	'4':'6-10万公里内',
    	'5':'10-20万公里内',
    	'6':'20万公里以上',
    },
    //手自动挡
    'gearType':{
        '-1':'不限',
    	'1':'手动挡',
    	'2':'自动挡',
    },
    //过户次数
    'transferCount':{
        '-1':'不限',
    	'1':'1次',
    	'2':'2次',
    	'3':'3-5次',
    	'4':'5-8次',
    },
    //运营类型
    'serviceType':{
        '-1':'不限',
    	'1':'非营运',
    	'2':'营运',
    	'3':'营转非',
    },
    //钥匙数
    'keyCount':{
    	'-1':'不限',
    	'1':'1把',
    	'2':'2把',
    	'3':'3-5把',
    	'4':'5-8把',
    	'5':'8把以上'
    }
}

export const userFilterData = {
	//车龄
    'age':{
        '-1':function(){
            return geekDom.getDateByAge(null,null);
        },
    	'1':function(){
            return geekDom.getDateByAge(null,1);                   //1年内
        },
    	'2':function(){
            return geekDom.getDateByAge(1,3);                      //1-3年
        },
    	'3':function(){
            return geekDom.getDateByAge(3,5);                      //3-5年
        },
    	'4':function(){
            return geekDom.getDateByAge(5,8);                      //5-8年
        },
    	'5':function(){
            return geekDom.getDateByAge(8,null);                   //8年以上
        }
    },
    //排放标准
    'dischargeStandard':{
        '-1':function(){
            return '';   
        },
        '1':function(){
            return '国1';  
        },
        '2':function(){
            return '国2';  
        },
        '3':function(){
            return '国3';  
        },
        '4':function(){
            return '国4';  
        },
        '5':function(){
            return '国5'; 
        }
    },
    //里程
    'mileage':{
        '-1':function(){
            return ['',''];   
        },
        '1':function(){
            return ['','1'];   
        },
        '2':function(){
            return ['1','3'];   
        },
        '3':function(){
            return ['3','6'];    
        },
        '4':function(){
            return ['6','10'];     
        },
        '5':function(){
            return ['10','20'];   
        },
        '6':function(){
            return ['20',''];  
        },
    },
    //手/自动挡
    'gearType':{
        '-1':function(){
            return '';   
        },
        '1':function(){
            return '1';   
        },
        '2':function(){
            return '2';   
        },
    },
    //过户次数
    'transferCount':{
        '-1':function(){
            return ['',''];   
        },
        '1':function(){
            return ['1','1'];   
        },
        '2':function(){
            return ['2','2'];   
        },
        '3':function(){
            return ['3','5'];   
        },
        '4':function(){
            return ['5','8'];   
        },
    },
    //运营类型
    'serviceType':{
        '-1':function(){
            return '';   
        },
        '1':function(){
            return '非营运';   
        },
        '2':function(){
            return '营运';   
        },
        '3':function(){
            return '营转非';   
        },
    },
    //钥匙数
    'keyCount':{
        '-1':function(){
            return ['',''];   
        },
        '1':function(){
            return ['1','1'];   
        },
        '2':function(){
            return ['2','2'];   
        },
        '3':function(){
            return ['3','5'];   
        },
        '4':function(){
            return ['5','8'];   
        },
        '5':function(){
            return ['8',''];   
        },
    }
}