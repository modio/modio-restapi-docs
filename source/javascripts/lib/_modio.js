$(document).ready(function() {
	/**
	 Custom highlighting
	 */
	var target;

	$('tr').hover(function() {
		if (! ($(this).children('th').length > 0)) {
			$(this).addClass('shadow-drop-lr');
			$(this).css({'cursor':'pointer'});
			var attribute = $(this).find('td:first-child').clone();
			attribute.find('a').remove();
			attribute = attribute.text();

			if (attribute == '200') {
				// Means we are in the "Response Schema" section under
				// an endpoint and we don't need to do highlighing
				return false;
			}

			var codeblock = $(this).parent().parent().prev().prev().children().first().children();

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
		}
	}, function() {
		$(this).removeClass('shadow-drop-lr');
		$(target).css({'color':'#e6db74', 'font-weight':'normal', 'border-bottom':'none'});
	});
	
	$('table tbody tr').each(function() {
		if($('td:first-child', this).not('.collapsed').text()[0] == '»') {
			$(this).addClass('iscollapsed').hide();
			
			if($(this).prev().find('td:first-child').text()[0] != '»') {
				$(this).prev().find('td:first-child').append('<a href="#" class="togglecollapse" style="background: rgba(0,0,0,.05); border-radius: 3px; display: inline-block; font-size: 10px; margin-left: 4px; padding: 2px 5px;">expand</a>');
			}
		} else {
			$(this).addClass('notcollapsed');
		}
	});
	
	$('.togglecollapse').click(function() {
		$(this).closest('tr').nextUntil('.notcollapsed', 'tr').toggle();
		if($(this).closest('tr').next('tr').is(':visible')) {
			$(this).text('collapse');
		} else {
			$(this).text('expand');
		}
		return false;
	});
});