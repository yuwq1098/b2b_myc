//首页搜索条构造类
class searchCarResult {
    constructor(data) {
        this.id = data.CarId
        this.name = data.Title
        this.stype = 1
    }
}


export { searchCarResult }