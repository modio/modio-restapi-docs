$(document).ready(function() {
	var highlightTarget;
	
	function setDropdownVersion() {
		var oldApiVersion = window.location.pathname.replace(/\//g, '');

		if (oldApiVersion) {
			$('select option[value="' + oldApiVersion + '"]').attr("selected", "selected");
		}
	}
	setDropdownVersion();

	/**
	 Version selection
	 */
	$('#version_dropdown').change(function() {
		var version = $(this).val();
		var latest = $(this).attr('data-latest');
		window.location = "http://" + window.location.host + "/" + (latest ? '' : version);
	});


	/**
	 Custom highlighting
	 */
	$('tr').hover(function() {
		if (! ($(this).children('th').length > 0)) {
			$(this).addClass('shadow-drop-lr');
			$(this).addClass('show-pointer');
			var attribute = $(this).find('td:first-child').clone();
			attribute.find('a').remove();
			attribute = attribute.text();

			var jsonExampleBlock = $(this).closest('table').prev().prev().find('code').children();

			$(jsonExampleBlock).each(function(i, obj) {
				if ($(obj).first().hasClass('s2')) {
					var col = $(obj).first();
					attribute = attribute.replace(' ', '');

					if ($(col).text() == '"'+attribute+'"') {
						highlightTarget = $(col);
            $(highlightTarget).addClass('json-example-highlight');
						return false;
					}
				}
			});
		}
	}, function() {
		$(this).removeClass('shadow-drop-lr');
		$('span.s2').removeClass('json-example-highlight');
	});

	/**
	 Object nesting expand/collapse
	 */
	$('table tbody tr').each(function() {
		td = $('td:first-child', this).not('.collapsed');
		
		if (td.text()[0] == '»') {
			level = (td.text().match(/»/g)||[]).length;
			$(this).addClass('iscollapsed').addClass('level').addClass('level'+level).hide();
			td.html(td.html().replace(/»/g, ''));
			
			if (!$(this).prev().hasClass('level') || $(this).prev().hasClass('level'+(level-1))) {
				$(this).prev().find('td:first-child').append('<a href="#" class="togglecollapse" data-level="'+level+'" style="background: rgba(0,0,0,.05); border-radius: 3px; display: inline-block; font-size: 10px; margin-left: 4px; padding: 2px 5px;">expand</a>');
			}
		} else {
			$(this).addClass('notcollapsed');
		}
	});
	
	$('.togglecollapse').click(function() {
		if ($(this).closest('tr').next('tr').is(':visible')) {
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

	/**
	 Add class to tools table & remove formatting placeholders.
	 */
	$('#implementation').nextAll('table:eq(1)').addClass('plugingrid');
	$('#external-app-ticket-authentication-flow').nextAll('table:first').addClass('plugingrid');
	$('table.plugingrid > thead > tr > th').not(':first').not(':eq(3)').remove();

	/**
	 Add class to changelog grid table.
	 */
	$('.changelog').find('table').addClass('changeloggrid');
});