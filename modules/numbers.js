function Numbers() {}

Numbers.reduceDigits = function(n) {
	while (n >= 10) {
		n = Numbers.sumDigits(n);
	}
	
	return n;
};

Numbers.sumDigits = function(n) {
	var sum = 0;
	var mul = 10;
	
	while (n > 0) {
		sum += n % mul;
		n = parseInt(n / mul);
	}
	
	return sum;
};

Numbers.toRoman = function(n) {
	var decs = [ "I", "X", "C", "M" ];
	var mids = [ "V", "L", "D" ];
	var num = "";
	var mul = 10;
	var mid = 5;
	var i = 0;
	var digit, repeat, pivot, modp, aux;
	
	while (n > 0) {
		digit = n % mul;
		n = parseInt(n / mul);
		repeat = decs[i];
		pivot = digit == 9 ? decs[i+1] : digit == 0 ? "" : mids[i];
		modp = digit % mid;
		i++;
		
		if (modp == 4) {
			aux = repeat + pivot;
		} else if (modp == 0) {
			aux = pivot;
		} else {
			aux = ((digit > 5) ? pivot : "") + repeat.repeat(modp);
		}
		
		num = aux + num;
	}
	
	return num;
};
