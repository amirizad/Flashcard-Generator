var fs = require("fs");

var JsonStorage = function() {
  this.readData = function(type) {
		fs.readFile(type + "-cards.json", function(err, data){
			if(err){console.log(err)};
			console.log(data);
			return JSON.parse(data);
		});
	};
  this.writeData = function(type, obj) {
		fs.readFile(type + "-cards.json", function(err, data){
			if(err){console.log(err)};
			var json = JSON.parse(data);
			json.push(obj);
			fs.writeFile(type + "-cards.json", JSON.stringify(json));
		});
  };
};

module.exports = JsonStorage;