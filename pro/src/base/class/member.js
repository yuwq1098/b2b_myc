class headMember{
	constructor(data) {
	    this.id = data.MemberID,
	    this.name = data.NickName,
	    this.imgUrl = data.PhotoURL?data.PhotoURL:require('assets/img/default-person.png')
	}
}

export {headMember};