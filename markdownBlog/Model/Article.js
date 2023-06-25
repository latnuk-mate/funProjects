const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify');
const DOMpurify = require('dompurify')
const { JSDOM } = require('jsdom')
const createDomPurify = DOMpurify(new JSDOM().window);
const ArticleSchema = new mongoose.Schema({
	title:{
	type: String,
	required: true
	},
	description:{
	type:String,
	},
	markdown:{
	type: String,
	requied: true
	},
	createdAt:{
	type: Date,
	default: Date.now
	},
	slug:{
	type: String,
	required: true,
	unique: true
	},
	sanitizeHTML:{
	type: String,
	required: true
	}
});

	ArticleSchema.pre('validate', function(next){
	if(this.title){
	this.slug = slugify(this.title, { lower: true, strict: true });
	}
	if(this.markdown){
	this.sanitizeHTML = createDomPurify.sanitize(marked.parse(this.markdown))
}
	next();
});

	module.exports = mongoose.model('Article', ArticleSchema);
