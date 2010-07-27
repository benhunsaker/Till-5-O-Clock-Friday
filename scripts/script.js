$(document).ready(function(){
	var first_str = "<section class=\"number first\"><div class=\"upper_number\">0</div><div class=\"lower_number\">0</div><div class=\"number_ring\"></div></section>";
	var second_str = "<section class=\"number second\"><div class=\"upper_number\">0</div><div class=\"lower_number\">0</div><div class=\"number_ring\"></div></section>"
	
	var clock = {
		day: {
			first:$(first_str)
		},
		hour: {
			first: $(first_str),
			second: $(second_str)
		},
		min: {
			first: $(first_str),
			second: $(second_str)
		},
		sec: {
			first: $(first_str),
			second: $(second_str)
		}
	}
	
	var numbers = new Array('zero','one','two','three','four','five','six','seven','eight','nine');
	
	clock.hour.first.addClass("hour");
	clock.hour.second.addClass("hour");
	clock.day.first.addClass("day");
	
	$("#main").append(clock.day.first);
	$("#main").append(clock.hour.first);
	$("#main").append(clock.hour.second);
	$("#main").append(clock.min.first);
	$("#main").append(clock.min.second);
	$("#main").append(clock.sec.first);
	$("#main").append(clock.sec.second);
	
	$("#main").append($('<section id="day_divider" class="clock_divider">:</section>'));
	$("#main").append($('<section id="hour_divider" class="clock_divider">:</section>'));
	$("#main").append($('<section id="min_divider" class="clock_divider">:</section>'));
	
	$("#main").append($('<section id="days_label" class="label">Days</section>'));
	$("#main").append($('<section id="hours_label" class="label">Hours</section>'));
	$("#main").append($('<section id="minutes_label" class="label">Minutes</section>'));
	$("#main").append($('<section id="seconds_label" class="label">Seconds</section>'));
	
	var Today = new Date();
	var days_till_friday = 5 - Today.getDay();
	var Friday = new Date()
	
	Friday.setDate(Today.getDate() + days_till_friday);
	Friday.setHours(17);
	Friday.setMinutes(00);
	Friday.setSeconds(00);
	
	var time_left = (Friday - Today)/1000;		//in seconds

	var days_left = time_left/(3600 * 24);
	init_number(days_left, clock.day);
	
	var hours_left = (time_left%(3600 * 24))/3600;
	init_number(hours_left, clock.hour);
	
	var min_left = (time_left%3600)/60;
	init_number(min_left, clock.min);
	
	var sec_left = (time_left%3600)%60;
	init_number(sec_left, clock.sec);
	
	change_clock();
	
	function change_clock(){
		countdown(clock.sec.second);
		setTimeout(change_clock,1000)
	}
	
	function countdown(number){
		var new_num = $('div',number).first().text() - 1;
		if(new_num < 0){
			if(number.hasClass('second')){
				if(number.hasClass('hour')){
					flip_number(number, 3);
				}
				else{
					flip_number(number, 9);
				}
			}
			else{
				if(number.hasClass('hour')){
					flip_number(number, 2);
				}
				else{
					flip_number(number, 5);
				}
			}
			countdown(number.prev('section.number:first'));
		}
		else
			flip_number(number, new_num);
	}
	
	function flip_number(number, new_number){
		var num = {
			upper: $('div.upper_number:first', number),
			lower: $('div.lower_number:first', number)
		}
		
		var upClone = num.upper.clone();
		var lowClone = num.lower.clone();
		lowClone.css('height','0px');
		number.append(upClone);
		number.append(lowClone);
		
		for(n in numbers){
			num.upper.removeClass(numbers[n]);
			lowClone.removeClass(numbers[n]);
		}
		
		num.upper.text(new_number);
		num.upper.addClass(numbers[new_number]);
		
		lowClone.text(new_number);
		lowClone.addClass(numbers[new_number]);
		
		upClone.animate({'height': '0px','top': num.upper.innerHeight() + "px"}, {
			duration: 400,
			queue: false,
			easing: 'easeInQuart',
			complete: function (){
				lowClone.animate({'height': num.lower.innerHeight() + "px"}, {
					duration: 400,
					queue: false,
					easing: 'easeOutBounce',
					complete: function(){
						upClone.detach();
						num.lower.detach();
					}
				});
			}
		});
		
	}
	
	function init_number(number, num_container){
		var i = number.toString();
		var decimal_index = i.indexOf('.');
		var integer;
		if(decimal_index == -1)
			 integer = i;
		else
			integer = i.slice(0, decimal_index);
			
		if(integer < 10 && num_container.second){
			integer = "0" + integer;
		}
		
		$('div', num_container.first).text(integer[0]);
		$('div', num_container.first).addClass(numbers[integer[0]]);
		
		if(num_container.second){
			$('div', num_container.second).text(integer[1]);
			$('div', num_container.second).addClass(numbers[integer[1]]);
		}
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