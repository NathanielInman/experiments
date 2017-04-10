var Lexer = function(buf) {
	this.pos = 0;
	this.buf = buf||"";
	this.buflen = buf.length;

	// operator -> token name
	this.keyword={
	'alert':0,
	'appendChild':1,
	'arguments':2,
	'array':3,
	'blur':4,
	'checked':5,
	'childNodes':6,
	'className':7,
	'confirm':8,
	'dialogArguments':9,
	'event':10,
	'focus':11,
	'getElementById':12,
	'getElementsByTagName':13,
	'innerHTML':14,
	'keyCode':15,
	'length':16,
	'location':17,
	'null':18,
	'number':19,
	'parentNode':20,
	'push':21,
	'RegExp':22,
	'replace':23,
	'selectNodes':24,
	'selectSingleNode':25,
	'setAttribute':26,
	'split':27,
	'src':28,
	'srcElement':29,
	'test':30,
	'undefined':31,
	'value':32,
	'window':33,
	'constructor':34,
	'declare':35,
	'Objectabstract':36,
	'boolean':37,
	'break':38,
	'byte':39,
	'case':40,
	'catch':41,
	'char':42,
	'class':43,
	'const':44,
	'continue':45,
	'debugger':46,
	'default':47,
	'delete':48,
	'do':49,
	'double':50,
	'else':51,
	'enum':52,
	'export':53,
	'extends':54,
	'final':55,
	'finally':56,
	'float':57,
	'for':58,
	'function':59,
	'goto':60,
	'if':61,
	'implements':62,
	'import':63,
	'in':64,
	'instanceof':65,
	'int':66,
	'interface':67,
	'long':68,
	'native':69,
	'new':70,
	'package':71,
	'private':72,
	'protected':73,
	'public':74,
	'return':75,
	'short':76,
	'static':77,
	'super':78,
	'switch':79,
	'synchronized':80,
	'this':81,
	'throw':82,
	'throws':83,
	'transient':84,
	'try':85,
	'typeof':86,
	'var':87,
	'void':88,
	'volatile':89,
	'while':90,
	'with':91,
	'true':92,
	'false':93,
	'prototype':94
	};
	this.tokentable = {
		'+':	'PLUS',
		'-':	'MINUS',
		'*':	'MULTIPLY',
		'.':	'PERIOD',
		'\\': 	'BACKSLASH',
		':':	'COLON',
		'%':	'PERCENT',
		'|':	'PIPE',
		'!':	'EXCLAMATION',
		'?':	'QUESTION',
		'#':	'POUND',
		'&':	'AMPERSAND',
		';':	'SEMI',
		',':	'COMMA',
		'(':	'L_PAREN',
		')':	'R_PAREN',
		'<':	'L_ANG',
		'>':	'R_ANG',
		'{':	'L_BRACE',
		'}':	'R_BRACE',
		'[':	'L_BRACKET',
		']':	'R_BRACKET',
		'=':	'EQUALS',
		' ':	'SPACE',
		'\n': 	'NEW_LINE',
		'\r': 	'CARRIAGE',
		'\t': 	'TAB'
	};
}

// Get the next token from the current buffer. A token is an object with
// the following properties:
// - name: name of the pattern that this token matched (taken from rules).
// - value: actual string value of the token.
// - pos: offset in the current buffer where the token starts.
//
// If there are no more tokens in the buffer, returns null. In case of
// an error throws Error.
Lexer.prototype.token = function() {
	//this._skipnontokens();
	if (this.pos >= this.buflen) {
		return null;
	} //end if

	// The char at this.pos is part of a real token. Figure out which.
	var c = this.buf.charAt(this.pos);

	// '/' is treated specially, because it starts a comment if followed by
	// another '/'. If not followed by another '/', it's the DIVIDE
	// operator.
	if (c === '/') {
		var next_c = this.buf.charAt(this.pos + 1);
		if (next_c === '/') {
			return this._process_comment();
		} else {
			return {name: 'DIVIDE', value: '/', pos: this.pos++};
		} //end if
	} else {
		// Look it up in the table of operators
		var op = this.tokentable[c];
		if (op !== undefined) {
			return {name: op, value: c, pos: this.pos++};
		} else {
			// Not an operator - so it's the beginning of another token.
			if (Lexer._isalpha(c)) {
				return this._process_identifier();
			} else if (Lexer._isdigit(c)) {
				return this._process_number();
			} else if (c === '"'|| c==="'") {
				return this._process_quote();
			} else {
				return undefined; //the lexer is finished
			} //end if
		} //end if
	} //end if
} //end Lexer class

Lexer._isnewline = function(c) {
	return c === '\r' || c === '\n';
}

Lexer._isdigit = function(c) {
	return c >= '0' && c <= '9';
}

Lexer._isalpha = function(c) {
	return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') ||	c === '_' || c === '$';
}

Lexer._isalphanum = function(c) {
	return Lexer._isalpha(c)||Lexer._isdigit(c);
}

Lexer.prototype._process_number = function() {
	var endpos = this.pos + 1;
	while (endpos < this.buflen && Lexer._isdigit(this.buf.charAt(endpos))) {
		endpos++;
	}

	var tok = {
		name: 'NUMBER',
		value: this.buf.substring(this.pos, endpos),
		pos: this.pos
	};
	this.pos = endpos;
	return tok;
}

Lexer.prototype._process_comment = function() {
	var endpos = this.pos + 2;
	// Skip until the end of the line
	var c = this.buf.charAt(this.pos + 2);
	while (endpos < this.buflen && !Lexer._isnewline(this.buf.charAt(endpos))) {
		endpos++;
	}
	var tok = {
		name: 'COMMENT',
		value: this.buf.substring(this.pos, endpos),
		pos: this.pos
	};
	this.pos = endpos + 1;
	return tok;
}

Lexer.prototype._process_identifier = function() {
	var endpos = this.pos + 1;
	while (endpos < this.buflen && Lexer._isalphanum(this.buf.charAt(endpos))) {
		endpos++;
	}	
	var tok = {
		name: 'IDENTIFIER',
		value: this.buf.substring(this.pos, endpos),
		pos: this.pos
	};
	this.pos = endpos;
	return tok;
}

Lexer.prototype._process_quote = function() {
	// this.pos points at the opening quote. Find the ending quote.
	var i1=this.buf.indexOf('"',this.pos+1);
	var i2=this.buf.indexOf("'",this.pos+1);
	var end_index=i1<i2&&i1!=-1||i2==-1?i1:i2;

	if (end_index === -1) {
		throw Error('Unterminated quote at ' + this.pos);
	} else {
		var tok = {
			name: 'QUOTE',
			value: this.buf.substring(this.pos, end_index + 1),
			pos: this.pos
		};
		this.pos = end_index + 1;
		return tok;
	}
}

Lexer.prototype._skipnontokens = function() {
	while (this.pos < this.buflen) {
		var c = this.buf.charAt(this.pos);
		if (c == ' ' || c == '\t' || c == '\r' || c == '\n') {
			this.pos++;
		} else {
			break;
		}
	}
}
/******************************************\
 TESTING THE LEXER
\******************************************/
var $=function(o){return document.getElementById(o);};
var testString=
	"Lexer.prototype._skipnontokens = function() {\r"+
	"   bob+=380/280;\n"+
	"   //this is a test comment\n\n"+
	"   while (this.pos < this.buflen) {\n"+
	"      var c = this.buf.charAt(this.pos);\n"+
	"      if (c == ' ' || c == '\\t' || c == '\\r' || c == '\\n') {\n"+
	"         this.pos++;\n"+
	"      } else {\n"+
	"         break;\n"+
	"      }\n"+
	"   }\n"+
	"}";
var myLexer= new Lexer(testString);
var cToken,result="",color="",raw="";
while(cToken=myLexer.token()){
	result+="{name:\""+cToken.name+"\",";
	result+="value:\""+cToken.value.replace(/\r/g, "\\r").replace(/\n/g,"\\n")+"\",";
	result+="pos:\""+cToken.pos+"\"}<br/>"
	if(myLexer.keyword[cToken.value]!==undefined){color+="<span style='color:#FFFF80'>";
	}else if(cToken.name=='IDENTIFIER'){color+="<span style='color:#87ACD1'>";
	}else if(cToken.name=='NUMBER'){color+="<span style='color:#D170FC'>";
	}else if(cToken.name=='QUOTE'){color+="<span style='color:#FFFFFF'>";
	}else if(cToken.name=='COMMENT'){color+="<span style='color:#3A8BDA'>";
	}else{color+="<span style='color:#55CE71'>"}
	color+=cToken.value.replace('/n','<br/>')+"</span>";
	raw+=cToken.value;
}; //end while
$('body').innerHTML=result;
$('exam').innerHTML=raw;
$('color').innerHTML=color;