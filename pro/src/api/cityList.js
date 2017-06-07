import axios from 'axios'

export function getAllCityList() {
    const url = '/api/action2/AllCity.ashx'

    return axios.get(url).then((res) => {
        return Promise.resolve(res.data)
    })
}

