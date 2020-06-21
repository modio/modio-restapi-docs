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

	// dropdown for unsuccessful responses
	$("h3[id$='-responses']").next('table').each(function() {
		table = $(this).find('tbody tr');
		table.not(':first').hide();
		const possibleErrorRefs = [];

		$(this).find('tbody tr').each(function(i, el) {
			const HTTP_BAD_REQUEST = 400;
			const HTTP_CODE_INDEX = 0;
			const ERROR_REF_INDEX = 2;
			const SCHEMA_INDEX = 4;
			const ERROR_REF_WIDTH_MULTIPLIER = 3;

			const prevRowCode = $(this).closest('tr').prev().find('td').eq(HTTP_CODE_INDEX).text();
			const currentRowErrorRef = $(this).find('td').eq(ERROR_REF_INDEX).text();
			possibleErrorRefs.push('<strong>' + currentRowErrorRef + '</strong>');

			if (currentRowErrorRef) {
				const errorRefColumn = $(this).find('td').eq(ERROR_REF_INDEX);
				errorRefColumn.html(currentRowErrorRef);
				errorRefColumn.css('min-width', errorRefColumn.outerWidth()*ERROR_REF_WIDTH_MULTIPLIER);
			}

			if (prevRowCode >= HTTP_BAD_REQUEST) {
				$(this).find('td').eq(SCHEMA_INDEX).html('');
			}
		});

		if (table.length > 1 && possibleErrorRefs.length) {
			$('<aside class="error-possible-codes-notice"><span>Possible error ref codes returned from this endpoint: ' + possibleErrorRefs.join(', ').replace(/,\s/, '') + '.</span><br><span class="error-preview-link"><a href="#" class="toggle-error-collapse">Click to see all error details</a></span></aside>').insertAfter($(this).closest('table'));
		}
	});

	$('.toggle-error-collapse').click(function(e) {
		e.preventDefault();
		const SLIDE_DELAY = 75;
		const SLIDE_SPEED = 600;
		
		const globalErrorSummary = 'The above <strong>error reference codes</strong> are specific to the <i>'+$(this).parents('aside').prevAll('h2').first().text()+'</i> endpoint and there is a possibility you can encounter more common error codes, such as validation and authentication errors when making a request. To ensure your application can handle all potential responses please refer to the <a href="#error-codes">common error codes</a> section.';
		
		$(this).parent().prevAll('span').html(globalErrorSummary);
		$('.error-preview-link', this).remove();

		$(this).parents('.error-possible-codes-notice').prev('table').each(function() {
			$(this).find('tr').each(function(index) {
				if ($(this).is(':not(:first-child)')) {
					$(this).delay(index*SLIDE_DELAY).slideToggle(SLIDE_SPEED);
				}
			});
		});
		$(this).remove();
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