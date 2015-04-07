
module.exports = {

	slugify: function (text) {
	  return text.toString().toLowerCase()
	    .replace(/\s+/g, '-')           // Replace spaces with -
	    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
	    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
	    .replace(/^-+/, '')             // Trim - from start of text
	    .replace(/-+$/, '');            // Trim - from end of text
	},
	
	ordinal: function (n) {
	   var s=["th","st","nd","rd"],
	       v=n%100;
	   return n+(s[(v-20)%10]||s[v]||s[0]);
	},

	uniq: function(a) {
	    return a.reduce(function(p, c) {
	        if (p.indexOf(c) < 0) p.push(c);
	        return p;
	    }, []);
	}

}

