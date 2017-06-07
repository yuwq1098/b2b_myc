export default class CityInfo {
	constructor({item}) {
		this.code = item.Code;
        this.name = item.Name;
        this.key = item.key;
        this.word = item.word;
	}
}