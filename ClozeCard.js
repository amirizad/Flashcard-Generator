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
	return text.search(cloze) !== -1 ? text.replace(cloze, '...') :
		'"' + this.cloze + '" doesn\'t appear in "' + text + '"';
}

module.exports = ClozeCard;