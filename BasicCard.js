var JsonStorage = require('./json.js');
var jsonFile = new JsonStorage();

function BasicCard(front, back){
  if(this instanceof BasicCard) {
    this.type = 'basic';
		this.front = front;
		this.back = back;
    jsonFile.writeData('b', this);
  } else {
		return new BasicCard(front, back);
  }
};

module.exports = BasicCard;