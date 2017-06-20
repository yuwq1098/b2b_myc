// 级联菜单-车品牌的构造类
class brandCascader{
	constructor(data) {
	    this.label = data.brand_name
	    this.value = data.brand_id
	    this.children = []
	}
}

// 级联菜单-车系的构造类
class seriesCascader{
	constructor(data) {
	    this.label = data.series_name
	    this.value = data.series_id
	    this.children = []
	}
}

// 级联菜单-车型选择的构造类
class modelCascader{
	constructor(data) {
	    this.label = data.model_name
	    this.value = data.model_id
	}
}

// 级联菜单-省份(直辖市)选择的构造类
class provinceCascader{
    constructor(data) {
	    this.label = data.Name
	    this.value = data.Code
	    this.children = []
	}
}

// 级联菜单-城市选择的构造类
class cityCascader{
    constructor(data) {
	    this.label = data.Name
	    this.value = data.Code
	}
}

export {
	brandCascader,
	seriesCascader,
	modelCascader,
	provinceCascader,
	cityCascader
};