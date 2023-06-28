var moment = require('moment');

	module.exports = {
	formatDate: (date,format)=>{
	return moment(date).format(format);
	},
	truncateString: function(str, len){
   	 if(str.length > len && str.length > 0){
      	var newString = str + '';
      	 newString = str.substr(0 , len);
      	 newString = str.substr(0 , newString.lastIndexOf(' '));
       	newString = newString.length > 0 ? newString : str.substr(0 , len);
       		return newString + "...";
   		 }
   		return str;
  	},

	stripTag: function(input) {
		let string = input.toString();
		return string.replace(/(<([^>]+)>)/ig, '');
	},

	EditIcon: function(storyUser, loggedUser, id, float=true){
		 if(storyUser._id.toString() == loggedUser._id.toString()){
			if(float){
		`<a href="/edit/user<%=id %>" class="btn-floating halfway-fab blue">
    		<i class="fas fa-edit fa-small"></i> </a>`
		}
		else{
		`<a href="/edit/user<%=id %>">
    			<i class="fas fa-edit fa-small"></i> </a>`
		}}
	else{
 	return "";
	}
}
}
