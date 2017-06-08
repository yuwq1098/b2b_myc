import axios from 'axios'
import {joinUrl} from 'assets/js/util.js'

/**
 * 创建临时数据
 */
const setpromise = data => {
	return new Promise((resolve, reject) => {
		resolve(data)
	})
}

//获取所有城市
const getAllCityList = function() {

    const url = joinUrl('/action2/AllCity.ashx')
    return axios.get(url).then((res) => {
        return setpromise(res.data)
    })
}

//获取B2B大厅车辆列表
const getB2BCarList = function(city) {

	const url = joinUrl('/action2/B2BCarList.ashx')
	let data = {
        PageSize: 8,
        PageIndex: 1,
        CarInCity: city?city:false,
	}
    return axios.post(url,data).then((res) => {
        return setpromise(res.data)
    })
}

export{getAllCityList,getB2BCarList}