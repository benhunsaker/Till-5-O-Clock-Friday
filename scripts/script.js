$(document).ready(function(){
	var day = $('#days');
	var hour = $('#hours');
	var min = $('#minutes');
	var seconds = $('#seconds');
	
	var Today = new Date();
	var days_till_friday = 5 - Today.getDay();
	var Friday = new Date()
	Friday.setDate(Today.getDate() + days_till_friday);
	Friday.setHours(17);
	Friday.setMinutes(00);
	Friday.setSeconds(00);
	
	var time_left = (Friday - Today)/1000;		//in seconds

	var days_left = time_left/(3600 * 24);
	day.text(process_new_number(days_left, true));
	
	var hours_left = (time_left%(3600 * 24))/3600;
	hour.text(process_new_number(hours_left));
	
	var min_left = (time_left%3600)/60;
	min.text(process_new_number(min_left));
	
	var sec_left = (time_left%3600)%60;
	seconds.text(process_new_number(sec_left));
	
	countdown();
	
	function countdown(){
		num_of_seconds = seconds.text()-1;
		
		if(num_of_seconds < 0){
			seconds.text('59');
			num_of_mins = min.text()-1;
			if(num_of_mins < 0){
				min.text('59');
				num_of_hours = hour.text()-1;
				if(num_of_hours < 0){
					hour.text('23');
					day.text(day.text()-1);
				}
				else
					hour.text(process_new_number(num_of_hours));
			}
			else
				min.text(process_new_number(num_of_mins));
		}
		else
			seconds.text(process_new_number(num_of_seconds));
		
		setTimeout(countdown,1000)
	}
	
	function process_new_number(number, exclude_leading_zero){
		var i = number.toString();
		var decimal_index = i.indexOf('.');
		var integer;
		if(decimal_index == -1)
			 integer = i;
		else
			integer = i.slice(0, decimal_index);

		if(integer < 10 && !exclude_leading_zero)
			integer = "0" + integer;

		return integer;
	}	
});


jQuery.fn.log = function(){
	if (window && window.console && window.console.log){
		if(arguments.length)
	    	for(var i=0, len = arguments.length; i < len; i++)
	      		console.log(arguments[i]);
		else
			console.log(this[0]);
	}
}

function log(message){
	jQuery.fn.log(message);
}