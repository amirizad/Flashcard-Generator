// var inquirer  = require('inquirer');
var BasicCard = require('./BasicCard.js');
var ClozeCard = require('./ClozeCard.js');



var firstPresident = BasicCard("Who was the first president of the United States?",
                                "George Washington");


try {
    var firstPresidentCloze = ClozeCard("George Washington was the first president of " +
                                    "the United States.", "George Washington");
} catch (e) {
    console.log("A terrible error occurred!!");
}


console.log('\n--------- Basic Card ---------')
console.log('Front: ' + firstPresident.front);
console.log('Back: ' + firstPresident.back);
console.log('\n--------- Cloze Card ---------')
console.log('Cloze: ' + firstPresidentCloze.cloze);
console.log('Partial: ' + firstPresidentCloze.partial);
console.log('Full Text: ' + firstPresidentCloze.fullText);
console.log('-----------------------\n')