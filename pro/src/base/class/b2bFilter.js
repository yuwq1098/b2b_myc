
//展示用户所选筛选条件构造类
class filterShowData{
    constructor(key,value,label) {
	    this.key = key||""                                 //键
	    this.value = value||""                             //值
	    this.label = label||""                             //对应标签(显示给用户看)
	}
}

export {filterShowData}