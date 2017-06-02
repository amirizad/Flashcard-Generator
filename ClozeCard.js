function ClozeCard(text, cloze){
  if(this instanceof ClozeCard) {
		this.cloze = cloze;
		this.fullText = text;
		this.partial = this.createPartial();
  } else {
		return new ClozeCard(text, cloze);
  }    
};

ClozeCard.prototype.createPartial = function(){
	var text = this.fullText;
	var cloze = new RegExp(this.cloze, "gi");
	if (text.search(cloze) !== -1){
		return text.replace(cloze, '...');
	} else {
		var err = new Error('"' + this.cloze + '" doesn\'t appear in "' + text + '"');
		console.log('\n*** Error ***');
		console.error(err.message);
	}
}

module.exports = ClozeCard;