import axios from 'axios'
import {joinUrl} from 'assets/js/util.js'

export function getAllCityList() {

    const url = joinUrl('/action2/AllCity.ashx')
    return axios.get(url).then((res) => {
        return Promise.resolve(res.data)
    })
}