$(document).ready(function() {
	/*!
	 Custom mod.io highlighting
	 */
	var target;

	$('tr').hover(function() {
		$(this).addClass('shadow-drop-lr');
		$(this).css({'cursor':'pointer'});
		var attribute = $(this).find('td:first-child').text();

		if (attribute == "200") {
			// Means we are in the "Response Schema" section under
			// an endpoint and we don't need to do highlighing
			return false;
		}

		var codeblock = $(this).parent().parent().prev().prev().children().first().children();
		var nesting_levels = 0;

		/*
		for (var i = 0, len = attribute.length; i < len; i++) {
			if (attribute[i] == '»') {
				// we will need to use this to know
				// what value we need to highlight if
				// the response contains more than one
				// duplicate value
				nesting_levels++;
			}
		};
		*/

		$(codeblock).each(function(i, obj) {
			if ($(obj).first().hasClass('s2')) {
				var col = $(obj).first();
				attribute = attribute.replace(' ', '');
				attribute = attribute.replace('»', '');

				if ($(col).text() == '"'+attribute+'"') {
						target = $(col);
						$(target).css({
							'color':'#fff', 
							'font-weight':'bold', 
							'border-bottom':'1px solid #44bfd4'
						});
						return false;
				}
			}
		});
	}, function() {
		$(this).removeClass('shadow-drop-lr');
		$(target).css({'color':'#e6db74', 'font-weight':'normal', 'border-bottom':'none'});
	});
});