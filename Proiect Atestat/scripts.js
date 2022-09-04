function reset() {
	document.form.result.value = "";
}
function rand() {
	reset();
	
	var lb = prompt("Please enter the lower bound:");
	
	if( lb != null ) {
		while( isNaN(lb) ) {
			lb = prompt("Invalid number! Try again:");
		}
		
		var ub = prompt("Please enter the upper bound:");
		
		if( ub != null ) {
			while( isNaN(ub) ) {
				ub = prompt("Invalid number! Try again:");
			}
			
			if( parseInt(lb) > parseInt(ub) ) {
				let aux=lb;
				lb=ub;
				ub=aux;
			}
			
			var nr = parseInt(lb) + parseInt(Math.floor(Math.random() * (ub-lb+1)));
			insert(nr);
		}
	}
}
function insert(next) {
	var val = document.form.result.value;

	if( val.length==0 ){
		if( next=="+" || next=="/" || next=="*" )
			return;
		else if( next=="." )
			document.form.result.value += "0.";
		else
			document.form.result.value += next;
	}
	else if( val.length==1 ) {
		if( val[0]=="-" ) {
			if( next=="+" )
				document.form.result.value = "";
			else if( next=="*" || next=="/" )
				return;
			else if( next=="." )
				document.form.result.value += "0.";
			else
				document.form.result.value += next;
		}
		else if( val[0]=="0" && "0"<=next && next<="9" )
			document.form.result.value = next;
		else
			document.form.result.value += next;
	}
	else if( val.length==2 && val=="-0" && "0"<=next && next<="9" )
		return;
	else if( val[val.length - 1]=="." && (next=="+" || next=="-" || next=="*" || next=="/") )
		document.form.result.value += "0" + next;
	else if( (val[val.length - 1]=="+" || val[val.length - 1]=="-" || val[val.length - 1]=="*" || val[val.length - 1]=="/")
					&& (next=="+" || next=="-" || next=="*" || next=="/") )
		document.form.result.value = val.substring(0, val.length - 1) + next;
	else if( next=="." ){
		var i = val.length - 1;
		var point = false;
		while( i>=0 && val[i]!="+" && val[i]!="-" && val[i]!="*" && val[i]!="/" && !point )	{
			if( val[i]=="." )
				point = true;
			i--;
		}
		if( !point )
			document.form.result.value += next;
		else
			return;
	} 
	else
		document.form.result.value += next;
}

const re = /[+\-]?(([0-9]+\.[0-9]+)|([0-9]+\.?)|(\.?[0-9]+))([+\-/*](([0-9]+\.[0-9]+)|([0-9]+\.?)|(\.?[0-9]+)))*/;
var p = 2;

function okpar() {
  var nrp = 0;
	var expr = document.form.result.value;
	
	for( var i = 0; i < expr.length; i++ ) {
    if( expr[i] == '(' )
      nrp++;
    if( expr[i] == ')' )
      nrp--;
		if( nrp < 0 )
			return false;
  }

  if( nrp == 0 )
		return true;
 
 return false;
}
function round( ans ) {
	if( p == 6 )
		return ans;
	
	var pow = 10 ** p;
	return Math.round(pow * ans) / pow;
}
function equal() {
	var val = document.form.result.value;
	
	if( val ) {
		if( re.test(val) && okpar() )
			document.form.result.value = round(parseFloat(eval(val)));
		else {
			document.form.result.value = "Syntax error!";
			setTimeout(function() { reset(); }, 1000);
		}
	}
}
function next( ){
	var val = document.getElementById("precision").value;
	
	p = (p + 2) % 8;
	
	if( p == 0 )
		p = 2;
	
	if( p == '6' )
		document.getElementById("precision").value = 'F';
	else
		document.getElementById("precision").value = '.' + p;
}
function back() {
	var val = document.form.result.value;
	document.form.result.value = val.substring(0, val.length - 1); 
}
setInterval(function() {
    if( document.form.result.value === "NaN" ) {
			reset();
    }
}, 1000);