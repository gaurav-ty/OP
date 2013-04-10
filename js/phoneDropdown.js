
$(function() {
	loadHdrCityDetls();	
	bindPositionPickupPopup();
	$("body").on('click', function() {
		dropDownEvents();
		$('a.onwdrRght').removeClass('more-link-active');
	}); 
});



function hideDropUps(ddContnr,isFromToDDContnr, searchCityTB, toFromDDResult) {
//To hide the dropdowns & remove the active classes when opening other dropdowns and when clicked on body
	if ($(".contactNoContnr").hasClass("active")) {
		$(".contactNoContnr").removeClass("active");
	}
	
	$(".dropDown").hide();
}

function dropDownEvents() {
	//To close dropdowns when clicked anywhere else on the body

		if ($(".ui-autocomplete").is(':visible')) {
			$("#fromCityDD").val('');
			$("#fromCityDD").autocomplete("search", [''])
		}
		hideDropUps();        
		if ($(".dropDown").is(':visible')) {
			$(".ddContnr").removeClass("active");
			$(".dropDown").hide();
			if ($(".srchBusesDDWrap.active").size() > 0) {
				$(".srchBusesDDWrap.active").removeClass('active');
			}
		}

}


function hdrContactDDSlideUp(contactNoDD, contactNoContnr) {
	contactNoDD.hide();
	$(contactNoContnr).removeClass('active');
}

function loadHdrCityDetls() {
	//For contact No dropdown in header
	function hideHeaderContactDD() {
		if ($(".contactNoDD").is(':visible')) {
			var contactNoDD = $(".contactNoDD");
			var contactNoContnr = $(".contactNoContnr");
			hdrContactDDSlideUp(contactNoDD, contactNoContnr);
		}
	}

	$(".contactDetlsBlk").on('click', function(e) {
		
		e.preventDefault();
		e.stopPropagation();
		$(".ddContnr,.srchBusesDDWrap").removeClass("active");		
		$('.contactNoDD > ul > li').eq(0).focus();
		var contactNoDD = $(".contactNoDD");		
		var contactNoContnr = $(".contactNoContnr");
		$(".dropDown").not(contactNoDD).hide();
		if (contactNoDD.is(':visible')) {
			
			hdrContactDDSlideUp(contactNoDD, contactNoContnr);
		} else {
			
			$(".contactNoContnr").addClass('active');
			contactNoDD.show();
		}
	});
	setDefaultCity(0);
	// Hardcoding the value to 0. Should pass the index of the li that has to be shown on the header

	//Method to set the city name in the header and hide from the drop down.
	function setDefaultCity(index) {
		var seltdLoctn = $(".contactNoDD li:eq(" + index + ")").children("label").text();
		var seltdLoctnNo = $(".contactNoDD li:eq(" + index + ")").children("span").text();
		$(".currLoctn").text(seltdLoctn);
		$(".currNo").text(seltdLoctnNo);
	}


	$(".contactNoDD li").on('mouseenter', function(e) {
		$this = $(this);
		$this.siblings().removeClass('cityLi-hover');
		$this.addClass('cityLi-hover');
	});

	$(".contactNoDD li").on('click', function(e) {
		var clkdItem = $(this);
		var seltdLoctn = clkdItem.children("label").text();
		var seltdLoctnNo = clkdItem.children("span").text();
		$(".contactNoBlk  .currLoctn").text(seltdLoctn);
		$(".contactNoBlk  .currNo").text(seltdLoctnNo);
		$(".contactNoDD").slideUp();
		$('.contactNoDD, .contactNoContnr').removeClass('active');
		$(".contactNoDD li").show();
		clkdItem.hide();
	});


}



function bindPositionPickupPopup() {
	$('.onwdrRght,.pickupPop').on('click', function(e) {
//shows pickup details popup when clicked on the pickup link on the payments page
		e.stopPropagation();
		var $this = $(this)
		if ($this.hasClass("onwdrRght")) {
			$(this).toggleClass('more-link-active');
			var $thisPickupPop = $this.next('.pickupPop');
			$(".pickupPop").not($thisPickupPop).hide();
			$thisPickupPop.toggle();
		}
	});

}
