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
		td = $('td:first-child', this).not('.collapsed');
		
		if(td.text()[0] == '»') {
			level = (td.text().match(/»/g)||[]).length;
			$(this).addClass('iscollapsed').addClass('level').addClass('level'+level).hide();
			td.html(td.html().replace(/»/g, ''));
			
			if(!$(this).prev().hasClass('level') || $(this).prev().hasClass('level'+(level-1))) {
				$(this).prev().find('td:first-child').append('<a href="#" class="togglecollapse" data-level="'+level+'" style="background: rgba(0,0,0,.05); border-radius: 3px; display: inline-block; font-size: 10px; margin-left: 4px; padding: 2px 5px;">expand</a>');
			}
		} else {
			$(this).addClass('notcollapsed');
		}
	});
	
	$('.togglecollapse').click(function() {
		if($(this).closest('tr').next('tr').is(':visible')) {
			$(this).closest('tr').nextUntil('.notcollapsed,.level'+($(this).data('level')-1), 'tr.level'+$(this).data('level')).each(function(){
				$(this).hide();
				$('.togglecollapse', this).text('expand');
			});
			$(this).text('expand');
		} else {
			$(this).closest('tr').nextUntil('.notcollapsed,.level'+($(this).data('level')-1), 'tr.level'+$(this).data('level')).show();
			$(this).text('collapse');
		}
		return false;
	});
});