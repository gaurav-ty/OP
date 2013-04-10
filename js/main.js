

$('#discount-coupon').hide();


/*net banking radio button and li click event*/
$('.popular-banks li').on('click',function(e){
	$(this).siblings().removeAttr('checked');
	$(this).find('input').attr('checked', 'checked');
	$(this).siblings().removeClass('active-bank').addClass('inActiveBnk');
	$(this).removeClass('inActiveBnk').addClass('active-bank');
	checkRadioSelect(e);
});

$('.popular-banks li input[type="radio"]').on('change',function(e){
	$(this).parent('li').siblings().removeClass('active-bank').addClass('inActiveBnk');
	$(this).parent('li').removeClass('inActiveBnk').addClass('active-bank');
	checkRadioSelect(e);
});

/*FOR DISCOUNT COUPON CHECKBOX */
$('#coupon-checkbox').on('click',function(e){
	if($(this).is(":checked")){
		$('#discount-coupon').slideDown('fast');
	}
	else{
		$('#discount-coupon').slideUp('fast');
	}
});


$(document).ready(function(){
	is_supported_browser();
	//tabs 
	$('.tabs')
		.tabs({active: 0}).addClass('ui-tabs-vertical ui-helper-clearfix');
		
	$('.tabs_payment').tabs({active:0,
		activate: function(){
			calculateHeight();
			textarea_blank();
		}
	}).addClass('ui-tabs-vertical ui-helper-clearfix');
	
	/*uniform and tooltip*/
	$("select").uniform();
	$("input[name=slt-cash-card], input[name=mobilePymnt],input[type=checkbox] ").uniform();
	
	/*calculate the height of right content depending on left content*/
	calculateHeight();
	
	$(':input[placeholder]').placeholder();
	
	$('.load-focus').focus();
	
	/*refresh issue of uniform js for checkbox*/
	$('#coupon-checkbox').attr('checked',false);
	$('#coupon-checkbox').parent().removeClass('checked');
	
	/*refresh issue of uniform js for radio button*/
	$('input[name=slt-cash-card]:first').attr('checked',true);
	$('input[name=slt-cash-card]').parent().removeClass('checked');
	/*set first radio button selected on page load*/
	$('input[name=slt-cash-card]:first').parent().addClass('checked');
	
	/*refresh issue for radio button in net banking*/
	$('input[name=net-bank]').attr('checked',false);
	textarea_blank();
	
	/*focus event for IE7 browser*/
	if($.browser.msie && parseInt($.browser.version, 10) == 7) {
    	$("input[type=text]").bind('focus blur',function(){$(this).toggleClass('focus')});
		$("input[type=password]").bind('focus blur',function(){$(this).toggleClass('focus')});
		$("textarea.full-add").bind('focus blur',function(){$(this).toggleClass('focus')});
	} 
});

/*credit card and debit card number check*/
jQuery(function($){
	$('[data-numeric]').payment('restrictNumeric');
	$('.cc-number').payment('formatCardNumber');
	$('.cc-exp').payment('formatCardExpiry');
	$('.cc-cvc').payment('formatCardCVC');
	
	
	$('.cc-number').blur(function(e){
		e.preventDefault();
		$('input').removeClass('invalid');
		$('.validation').removeClass('passed failed');
		
		var cardType = $.payment.cardType($('.cc-number').val());
		
		/*check the lunn's alog and the blan value for the credit card*/
		if((!$.payment.validateCardNumber($('.cc-number').val())) && ($('.cc-number').val() != "")){
			$('.errCont').show();
			$('.cc-number').css('border','1px solid #f00');
		}
		else{
			$('.errCont').hide();
			$('.cc-number').css('border','1px solid #BDBDBD');
		}
		//$('.cc-number').toggleClass('invalid', !$.payment.validateCardNumber($('.cc-number').val()));
		$('.cc-number').blur(function(){
			if(($('.cc-number').val() != "")){
				$('.cc-number').addClass('invalid');
			}
		});
		$('.cc-exp').toggleClass('invalid', !$.payment.validateCardExpiry($('.cc-exp').payment('cardExpiryVal')));
		$('.cc-cvc').toggleClass('invalid', !$.payment.validateCardCVC($('.cc-cvc').val(), cardType));
	});
	
	
	
	$('.cc-number').keyup(function(){
		var getClass = $(this).attr("class"),
			splitClass = getClass.split("cc-number");
		
		for(i=0; i<splitClass.length; i++){
			$(this).parents('.card-check').removeClass().addClass('fltLt card-check').addClass(splitClass[i]);
			
			/*for cvv image to change*/
			var liClass = $('.tab-content ul li:visible').find('.card-check');
			if(liClass.hasClass('amex')){
				$('.tab-content  ul li').find('.cvv-image').removeClass('visa-card').addClass('amex-card');
				$('.tab-content  ul li').find('.cvv-text').text('The 4 digit number printed above your account number on the face of the card.');
				$('#amexDetails').slideDown('fast',function(){
					calculateHeight();
				});
				
			}
			else if (liClass.hasClass('unknown')){
				$('.tab-content  ul li').find('.cvv-image').removeClass().addClass('cvv-image');
				$('#amexDetails').slideUp('fast',function(){
					calculateHeight();
				});
				
			}
			else{
				$('.tab-content  ul li').find('.cvv-image').removeClass('amex-card').addClass('visa-card');
				$('.tab-content  ul li').find('.cvv-text').text('The 3 digit number printed on the back of the card.');
			}
		}
	});
});


$('#netBank-otherBank').change(function(e){
	checkRadioSelect(e);
});

/*Change the state of radio and select for net banking section*/
function checkRadioSelect(e){
	if(e.target.id === "netBank-otherBank"){
		$('.popular-banks li input[type="radio"]').each(function(){
			$('.popular-banks li input[type="radio"]').removeAttr('checked');
			$('.popular-banks li').removeClass('active-bank').addClass('inActiveBnk');
		});
	}
	else{
		$('#netBank-otherBank').prev('span').text('--Please select your bank--');
		$('#netBank-otherBank').find('option[value="default"]').attr("selected",true);
	}
}


/*calculate the height of right content depending on left content*/
function calculateHeight(){
	var height = ($('.contentLt').height() - 11); /*9 deducted becoz of padding*/
	$('.contentRt').css('height',height);
}



/*textarea on focus to clear*/
function textarea_blank(){
	var credit_text= $('textarea.full-add').val(),
		cod_text = $('.cod_textarea').val();

	$('.full-add, .cod_textarea').focus(
		function() {
			if (($(this).val() == credit_text) || ($(this).val() == cod_text))
				$(this).val("");
				$(this).css('color','#000000');
		}
	);
	$('.full-add, .cod_textarea').blur(
		function() {
			if ($(this).val() == "")
				$(this).val(credit_text);
				$(this).css('color','#757575');
		}
	);
}

function is_supported_browser()
{
 	/*Detect browser version*/
	var userAgent = navigator.userAgent.toLowerCase();
	var browser = {
		version: (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [])[1],
		safari: /webkit/.test( userAgent ),
		opera: /opera/.test( userAgent ),
		msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ),
		mozilla: /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent )
	};
	/*alert('Browser Version='+browser.version.toString()+ ' Safari='+(browser.safari? 'Yes': 'No')+' Opera='+(browser.opera? 'Yes': 'No')+' IE='+(browser.msie? 'Yes': 'No')+' FF='+(browser.mozilla? 'Yes': 'No'));*/
	/* Is this a version of Chrome?*/
	if(browser.version.toString() == 525.19){
		$('head').append('<link rel="stylesheet" href="./css/chrome_old.css" type="text/css" />');
	}

	/* Is this a version of Opera?*/	
	if(browser.version.toString() <=9.80){
		$('head').append('<link rel="stylesheet" href="./css/opera.css" type="text/css" />');
	}
	
	/* Is this a version of Firefox?*/	
	if(browser.version.toString() <= "1.9.0.19"){
		$('head').append('<link rel="stylesheet" href="./css/ff_old.css" type="text/css" />');
	}
}