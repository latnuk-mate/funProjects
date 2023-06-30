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

	EditIcon: function(storyUser, loggedUser, id, floating=true){
	try{
		if(storyUser._id.toString() == loggedUser._id.toString()){
			if(floating){
		return `<a href="stories/edit<%= id %>" class="btn-floating halfway-fab blue lighten-3">
		<i class="fa fa-pen-to-square fa-small"></i> </a>`
		}
		else{
			return `<a href="stories/edit<%= id %>">
			<i class="fa fa-pen-to-square fa-small"></i> </a>`
		}}
	else{
 	return "";
	}
	}catch(err){
		console.log(err)
	}
}
}
