var flashCards = [];
var card = {};
var lib = new MyLibrary();

if (localStorage.getItem("flashCardsStore") !== null) {
	flashCards = JSON.parse(localStorage.getItem('flashCardsStore'));
};

if (flashCards.length > 0) {
	addCards();
} else {
	initiateFirstCard();
};

$('input[type=radio]').change( function() {
	$('.fortoggle').toggleClass('hide');
	$('#cardtype').val($("input[name='options']:checked"). val());
	addCards();
});

$('.form-control').keyup(function(){
	$thisgroup = $(this).closest('.group');
	$field = $.trim($(this).val());
	if( !$field ) {
		$(this).prev().addClass('warning');
		$thisgroup.find('.btn').attr('disabled', 'disabled');
	} else {
		$(this).prev().removeClass('warning');
	};

	var empty = $thisgroup.find("input").filter(function() {
    	return $.trim($(this).val()) === "";
    });
    if(empty.length === 0) {
		$thisgroup.find('.btn').removeAttr('disabled');
    };
});

$('.save').click(function(e){
	e.preventDefault();
	addCard();
})

$('.send').click(function(e){
	e.preventDefault();
	var type = $(this).hasClass('basic')?'basic':'cloze';
	checkAnswer(type);
})

function addCards(){
	var cardType = $('#cardtype').val();
	$('#cards-panel').html('');
	$('#' + cardType +'-input .form-control').val('');
	$('.message').text('');
	for ( i = 0 ; i < flashCards.length ; i++){
		if (flashCards[i].type === cardType){
			addCardBtn(i);
		};
	};
};

function addCard(){
	card = {};
	$('.message').text('');
	var cardType = $('#cardtype').val();
	if (cardType === 'basic'){
		var cardFront = $('#front').val();
		var cardBack = $('#back').val();
		card = lib.createCard(cardType, cardFront, cardBack);
	} else {
		var text = $('#text').val();
		var cloze = $('#cloze').val();
		card = lib.createCard(cardType, text, cloze);
	};
	if ( $.isEmptyObject(card) ) {
		$('#addmessage').text('Error: ' + card.message);
	} else {
		flashCards.push(card);
		localStorage.setItem("flashCardsStore", JSON.stringify(flashCards));
		$('#' + cardType +'-input .form-control').val('');
		addCardBtn(flashCards.length - 1);
	}
};

function addCardBtn(n){
	var num = $('#cards-panel :button:last-child').text();
	var cardNo = 1;
	if (num) { cardNo = parseInt(num) + 1 };
	var $btn = $('<button>').addClass('btn btn-primary cardbtn')
		.text(cardNo).attr('data-value', n)
		.click(function(){
			CardBtnClicked(n);
			$(this).addClass('active');
		});
	$('#cards-panel').append($btn);
};

function checkAnswer(){
	var cardType = $('#cardtype').val();
	var answer = '';
	if ( cardType === 'basic' ){
		answer = $('#basicanswer').val();
		if ( card.back === answer){
			$('#basicmessage').text('Correct');
		} else {
			$('#basicmessage').text('Incorrect answer!');
		};
		$('#flipcard').addClass('flip')
	} else {
		answer = $('#clozeanswer').val();
		if ( card.cloze === answer){
			$('#clozemessage').text('Correct');
		} else {
			$('#clozemessage').text('Incorrect answer!');
		};
		$('.clozetxt').html(card.fullText);
	};
};

function CardBtnClicked(n){
	$('.message').text('');
	$('.answer').val('');
	card = flashCards[n];
	$('.cardbtn').removeClass('active');
	if ( card.type === 'basic' ){
		$('#flipcard').removeClass('flip');
		$('#cardfront').html(card.front);
		$('#cardback').html(card.back);
	} else {
		$('.clozetxt').html(card.partial);

	};
};

function initiateFirstCard(){
	$('#front').val('Who was the first president of the United States?');
	$('#back').val('George Washington');
	$('#text').val('George Washington was the first president of the United States.');
	$('#cloze').val('George Washington');
	$('.save').removeAttr('disabled');
};