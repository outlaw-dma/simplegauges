(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * jQuery JavaScript Library v2.1.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:11Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android < 4.0, iOS < 6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android < 4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Math.random();
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android < 4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



/*
	Implementation Summary

	1. Enforce API surface and semantic compatibility with 1.9.x branch
	2. Improve the module's maintainability by reducing the storage
		paths to a single mechanism.
	3. Use the same single mechanism to support "private" and "user" data.
	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	5. Avoid exposing implementation details on user objects (eg. expando properties)
	6. Provide a clear path for implementation upgrade to WeakMap in 2014
*/
var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// #11217 - WebKit loses check when the name is after the checked attribute
	// Support: Windows Web Apps (WWA)
	// `name` and `type` need .setAttribute for WWA
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE9-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome < 28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Create "bubbling" focus and blur events
// Support: Firefox, Chrome, Safari
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE 9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE 9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Support: IE >= 9
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Support: IE >= 9
		// Fix Cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit
					// jQuery.merge because push.apply(_, arraylike) throws
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit
					// jQuery.merge because push.apply(_, arraylike) throws
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Fixes #12346
					// Support: Webkit, IE
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') in IE9, see #12537
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {
				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {
				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifying setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS 5.1, Android 4.x, Android 2.3
	// Check the default checkbox/radio value ("" on old WebKit; "on" elsewhere)
	support.checkOn = input.value !== "";

	// Must access the parent to make an option select properly
	// Support: IE9, IE10
	support.optSelected = opt.selected;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Check if an input maintains its value after becoming a radio
	// Support: IE9, IE10
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

// Support: IE9+
// Selectedness for an option in an optgroup can be inaccurate
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// We assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

}).call(this,require("IrXUsu"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/bower_components/jquery/dist/jquery.js","/bower_components/jquery/dist")
},{"IrXUsu":8,"buffer":5}],2:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
steelseries = require('./lib/steelseries.js');
$ = require('./bower_components/jquery/dist/jquery');
simplegauges = require('./lib/simplegauges.js');
}).call(this,require("IrXUsu"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/fake_91e7bd09.js","/")
},{"./bower_components/jquery/dist/jquery":1,"./lib/simplegauges.js":3,"./lib/steelseries.js":4,"IrXUsu":8,"buffer":5}],3:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
function GaugeSet() {
  this.speed = new steelseries.Radial('speedCanvas', {
    gaugeType: steelseries.GaugeType.TYPE4,
    frameDesign: steelseries.FrameDesign.TILTED_BLACK,
    size: 400,
    titleString: "SOG",
    unitString: "knots",
    lcdVisible: true,
    maxValue:10,
    maxMeasuredValue:0,
    maxMeasuredValueVisible:true,
    thresholdVisible:false,
    ledVisible:false,
    pointerType: steelseries.PointerType.TYPE4
  });

  this.depth = new steelseries.Radial('depthCanvas', {
    gaugeType: steelseries.GaugeType.TYPE4,
    frameDesign: steelseries.FrameDesign.TILTED_BLACK,
    size: 400,
    section: [
      steelseries.Section(0, 4, 'rgba(255, 0, 0, 0.3)'),
      steelseries.Section(4, 8, 'rgba(220, 220, 0, 0.3)') 
    ],
    titleString: "Depth",
    unitString: "m",
    lcdVisible: true,
    maxValue:20,
    maxMeasuredValue:0,
    maxMeasuredValueVisible:true,
    thresholdVisible:false,
    ledVisible:false,
    pointerType: steelseries.PointerType.TYPE2
  });

  this.compass = new steelseries.Compass('compassCanvas', {
    frameDesign: steelseries.FrameDesign.TILTED_BLACK,
    size: 400,
    rotateFace: true,
    pointerType: steelseries.PointerType.TYPE5
  });

  this.wind = new steelseries.WindDirection('windCanvas', {
    frameDesign: steelseries.FrameDesign.TILTED_BLACK,
    size: 400,
    lcdVisible: true,
    degreeScaleHalf: true,
    pointSymbolsVisible: false,
    pointerType: steelseries.PointerType.TYPE5,
  });


  this.eventHandlers = {
    "navigation": {
      "speedThroughWater" : function(data) {
        if (data.value != null) {
          this.speed.setValue(data.value);
        }
      }.bind(this),
      "courseOverGroundTrue": function(data) { this.compass.setValue(data.value);}.bind(this)
    },
    "environment": {
      "depth": function(data) { this.depth.setValue(data.value);}.bind(this),
      "windAngleApparent": function(data) { this.wind.setValueLatest(data.value);}.bind(this)
    }
  }
  this.dispatch = this.doDispatch.bind(this);
};

GaugeSet.prototype = {
  dispatchInTree: function (singleSignalK, eventHandlerTree) {
  var branchName = Object.keys(singleSignalK)[0];
  if (typeof eventHandlerTree[branchName] === 'function') {
    eventHandlerTree[branchName](singleSignalK[branchName])
  } else if (typeof eventHandlerTree[branchName] === 'undefined') {
  } else {
    this.dispatchInTree(singleSignalK[branchName], eventHandlerTree[branchName]);
  }
},
doDispatch:function dispatch(data) {
  this.dispatchInTree(data, this.eventHandlers);
}
}



module.exports.GaugeSet = GaugeSet;
}).call(this,require("IrXUsu"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/lib/simplegauges.js","/lib")
},{"IrXUsu":8,"buffer":5}],4:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * Name          : steelseries.js
 * Authors       : Gerrit Grunwald, Mark Crossley
 * Last modified : 29.01.2014
 * Revision      : 0.14.7
 *
 * Copyright (c) 2011, Gerrit Grunwald, Mark Crossley
 * All rights reserved.
 *
 *  Redistribution and use in source and binary forms, with or without modification, are permitted
 *  provided that the following conditions are met:
 *
 *  # Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 *  # Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided with the distribution.
 *
 *   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING,
 *   BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 *   SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 *   DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES, LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 *   INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
 *   OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
/*globals Tween */
/*jshint onevar:false,plusplus:false,nomen:false,bitwise:false*/
'option strict';

module.exports =  (function () {

    // Constants
    var HALF_PI     = Math.PI * 0.5,
        TWO_PI      = Math.PI * 2,
        PI          = Math.PI,
        RAD_FACTOR  = Math.PI / 180,
        DEG_FACTOR  = 180 / Math.PI,
        doc         = document,
        lcdFontName = 'LCDMono2Ultra,Arial,Verdana,sans-serif',
        stdFontName = 'Arial,Verdana,sans-serif';

    //*************************************   C O M P O N O N E N T S   ************************************************
    var radial = function (canvas, parameters) {
        parameters = parameters || {};
        var gaugeType = (undefined === parameters.gaugeType ? steelseries.GaugeType.TYPE4 : parameters.gaugeType),
            size = (undefined === parameters.size ? 0 : parameters.size),
            minValue = (undefined === parameters.minValue ? 0 : parameters.minValue),
            maxValue = (undefined === parameters.maxValue ? (minValue + 100) : parameters.maxValue),
            niceScale = (undefined === parameters.niceScale ? true : parameters.niceScale),
            threshold = (undefined === parameters.threshold ? (maxValue - minValue) / 2 + minValue: parameters.threshold),
            thresholdRising = (undefined === parameters.thresholdRising ? true : parameters.thresholdRising),
            section = (undefined === parameters.section ? null : parameters.section),
            area = (undefined === parameters.area ? null : parameters.area),
            titleString = (undefined === parameters.titleString ? '' : parameters.titleString),
            unitString = (undefined === parameters.unitString ? '' : parameters.unitString),
            frameDesign = (undefined === parameters.frameDesign ? steelseries.FrameDesign.METAL : parameters.frameDesign),
            frameVisible = (undefined === parameters.frameVisible ? true : parameters.frameVisible),
            backgroundColor = (undefined === parameters.backgroundColor ? steelseries.BackgroundColor.DARK_GRAY : parameters.backgroundColor),
            backgroundVisible = (undefined === parameters.backgroundVisible ? true : parameters.backgroundVisible),
            pointerType = (undefined === parameters.pointerType ? steelseries.PointerType.TYPE1 : parameters.pointerType),
            pointerColor = (undefined === parameters.pointerColor ? steelseries.ColorDef.RED : parameters.pointerColor),
            knobType = (undefined === parameters.knobType ? steelseries.KnobType.STANDARD_KNOB : parameters.knobType),
            knobStyle = (undefined === parameters.knobStyle ? steelseries.KnobStyle.SILVER : parameters.knobStyle),
            lcdColor = (undefined === parameters.lcdColor ? steelseries.LcdColor.STANDARD : parameters.lcdColor),
            lcdVisible = (undefined === parameters.lcdVisible ? true : parameters.lcdVisible),
            lcdDecimals = (undefined === parameters.lcdDecimals ? 2 : parameters.lcdDecimals),
            digitalFont = (undefined === parameters.digitalFont ? false : parameters.digitalFont),
            fractionalScaleDecimals = (undefined === parameters.fractionalScaleDecimals ? 1 : parameters.fractionalScaleDecimals),
            ledColor = (undefined === parameters.ledColor ? steelseries.LedColor.RED_LED : parameters.ledColor),
            ledVisible = (undefined === parameters.ledVisible ? true : parameters.ledVisible),
            userLedColor = (undefined === parameters.userLedColor ? steelseries.LedColor.GREEN_LED : parameters.userLedColor),
            userLedVisible = (undefined === parameters.userLedVisible ? false : parameters.userLedVisible),
            thresholdVisible = (undefined === parameters.thresholdVisible ? true : parameters.thresholdVisible),
            minMeasuredValueVisible = (undefined === parameters.minMeasuredValueVisible ? false : parameters.minMeasuredValueVisible),
            maxMeasuredValueVisible = (undefined === parameters.maxMeasuredValueVisible ? false : parameters.maxMeasuredValueVisible),
            foregroundType = (undefined === parameters.foregroundType ? steelseries.ForegroundType.TYPE1 : parameters.foregroundType),
            foregroundVisible = (undefined === parameters.foregroundVisible ? true : parameters.foregroundVisible),
            labelNumberFormat = (undefined === parameters.labelNumberFormat ? steelseries.LabelNumberFormat.STANDARD : parameters.labelNumberFormat),
            playAlarm = (undefined === parameters.playAlarm ? false : parameters.playAlarm),
            alarmSound = (undefined === parameters.alarmSound ? false : parameters.alarmSound),
            customLayer = (undefined === parameters.customLayer ? null : parameters.customLayer),
            tickLabelOrientation = (undefined === parameters.tickLabelOrientation ? (gaugeType === steelseries.GaugeType.TYPE1 ? steelseries.TickLabelOrientation.TANGENT : steelseries.TickLabelOrientation.NORMAL) : parameters.tickLabelOrientation),
            trendVisible = (undefined === parameters.trendVisible ? false : parameters.trendVisible),
            trendColors = (undefined === parameters.trendColors ? [steelseries.LedColor.RED_LED, steelseries.LedColor.GREEN_LED, steelseries.LedColor.CYAN_LED] : parameters.trendColors),
            useOdometer = (undefined === parameters.useOdometer ? false : parameters.useOdometer),
            odometerParams = (undefined === parameters.odometerParams ? {} : parameters.odometerParams),
            odometerUseValue = (undefined === parameters.odometerUseValue ? false : parameters.odometerUseValue),
            fullScaleDeflectionTime = (undefined === parameters.fullScaleDeflectionTime ? 2.5 : parameters.fullScaleDeflectionTime);

        // Get the canvas context and clear it
        var mainCtx = getCanvasContext(canvas);
        // Has a size been specified?
        if (size === 0) {
            size = Math.min(mainCtx.canvas.width, mainCtx.canvas.height);
        }

        // Set the size - also clears the canvas
        mainCtx.canvas.width = size;
        mainCtx.canvas.height = size;

        // Create audio tag for alarm sound
        var audioElement;
        if (playAlarm && alarmSound !== false) {
            audioElement = doc.createElement('audio');
            audioElement.setAttribute('src', alarmSound);
            audioElement.setAttribute('preload', 'auto');
        }

        var value = minValue;
        var odoValue = minValue;
        var self = this;

        // Properties
        var minMeasuredValue = maxValue;
        var maxMeasuredValue = minValue;

        var ledBlinking = false;
        var userLedBlinking = false;

        var ledTimerId = 0;
        var userLedTimerId = 0;
        var tween;
        var repainting = false;

        var trendIndicator = steelseries.TrendState.OFF;
        var trendSize = size * 0.06;
        var trendPosX = size * 0.29;
        var trendPosY = size * 0.36;

        // GaugeType specific private variables
        var freeAreaAngle;
        var rotationOffset;
        var tickmarkOffset;
        var angleRange;
        var angleStep;

        var angle = rotationOffset + (value - minValue) * angleStep;

        var imageWidth = size;
        var imageHeight = size;

        var centerX = imageWidth / 2;
        var centerY = imageHeight / 2;

        // Misc
        var ledSize = size * 0.093457;
        var ledPosX = 0.6 * imageWidth;
        var ledPosY = 0.4 * imageHeight;
        var userLedPosX = gaugeType === steelseries.GaugeType.TYPE3 ? 0.6 * imageWidth : centerX - ledSize / 2;
        var userLedPosY = gaugeType === steelseries.GaugeType.TYPE3 ? 0.72 * imageHeight : 0.75 * imageHeight;
        var lcdFontHeight = Math.floor(imageWidth / 10);
        var stdFont = lcdFontHeight + 'px ' + stdFontName;
        var lcdFont = lcdFontHeight + 'px ' + lcdFontName;
        var lcdHeight = imageHeight * 0.13;
        var lcdWidth = imageWidth * 0.4;
        var lcdPosX = (imageWidth - lcdWidth) / 2;
        var lcdPosY = imageHeight * 0.57;
        var odoPosX, odoPosY = imageHeight * 0.61;
        var shadowOffset = imageWidth * 0.006;

        // Constants
        var initialized = false;

        // Tickmark specific private variables
        var niceMinValue = minValue;
        var niceMaxValue = maxValue;
        var niceRange = maxValue - minValue;
        var range = niceMaxValue - niceMinValue;
        var minorTickSpacing = 0;
        var majorTickSpacing = 0;
        var maxNoOfMinorTicks = 10;
        var maxNoOfMajorTicks = 10;

        // Method to calculate nice values for min, max and range for the tickmarks
        var calculate = function calculate() {
            if (niceScale) {
                niceRange = calcNiceNumber(maxValue - minValue, false);
                majorTickSpacing = calcNiceNumber(niceRange / (maxNoOfMajorTicks - 1), true);
                niceMinValue = Math.floor(minValue / majorTickSpacing) * majorTickSpacing;
                niceMaxValue = Math.ceil(maxValue / majorTickSpacing) * majorTickSpacing;
                minorTickSpacing = calcNiceNumber(majorTickSpacing / (maxNoOfMinorTicks - 1), true);
                minValue = niceMinValue;
                maxValue = niceMaxValue;
                range = maxValue - minValue;
            } else {
                niceRange = (maxValue - minValue);
                niceMinValue = minValue;
                niceMaxValue = maxValue;
                range = niceRange;
                majorTickSpacing = calcNiceNumber(niceRange / (maxNoOfMajorTicks - 1), true);
                minorTickSpacing = calcNiceNumber(majorTickSpacing / (maxNoOfMinorTicks - 1), true);
            }

            switch (gaugeType.type) {
            case 'type1':
                freeAreaAngle = 0;
                rotationOffset = PI;
                tickmarkOffset = HALF_PI;
                angleRange = HALF_PI;
                angleStep = angleRange / range;
                break;

            case 'type2':
                freeAreaAngle = 0;
                rotationOffset = PI;
                tickmarkOffset = HALF_PI;
                angleRange = PI;
                angleStep = angleRange / range;
                break;

            case 'type3':
                freeAreaAngle = 0;
                rotationOffset = HALF_PI;
                tickmarkOffset = 0;
                angleRange = 1.5 * PI;
                angleStep = angleRange / range;
                break;

            case 'type4':
            /* falls through */
            default:
                freeAreaAngle = 60 * RAD_FACTOR;
                rotationOffset = HALF_PI + (freeAreaAngle / 2);
                tickmarkOffset = 0;
                angleRange = TWO_PI - freeAreaAngle;
                angleStep = angleRange / range;
                break;
            }
            angle = rotationOffset + (value - minValue) * angleStep;
        };

        // **************   Buffer creation  ********************
        // Buffer for the frame
        var frameBuffer = createBuffer(size, size);
        var frameContext = frameBuffer.getContext('2d');

        // Buffer for the background
        var backgroundBuffer = createBuffer(size, size);
        var backgroundContext = backgroundBuffer.getContext('2d');

        var lcdBuffer;

        // Buffer for led on painting code
        var ledBufferOn = createBuffer(ledSize, ledSize);
        var ledContextOn = ledBufferOn.getContext('2d');

        // Buffer for led off painting code
        var ledBufferOff = createBuffer(ledSize, ledSize);
        var ledContextOff = ledBufferOff.getContext('2d');

        // Buffer for current led painting code
        var ledBuffer = ledBufferOff;

        // Buffer for user led on painting code
        var userLedBufferOn = createBuffer(ledSize, ledSize);
        var userLedContextOn = userLedBufferOn.getContext('2d');

        // Buffer for user led off painting code
        var userLedBufferOff = createBuffer(ledSize, ledSize);
        var userLedContextOff = userLedBufferOff.getContext('2d');

        // Buffer for current user led painting code
        var userLedBuffer = userLedBufferOff;

        // Buffer for the minMeasuredValue indicator
        var minMeasuredValueBuffer = createBuffer(Math.ceil(size * 0.028037), Math.ceil(size * 0.028037));
        var minMeasuredValueCtx = minMeasuredValueBuffer.getContext('2d');

        // Buffer for the maxMeasuredValue indicator
        var maxMeasuredValueBuffer = createBuffer(Math.ceil(size * 0.028037), Math.ceil(size * 0.028037));
        var maxMeasuredValueCtx = maxMeasuredValueBuffer.getContext('2d');

        // Buffer for pointer image painting code
        var pointerBuffer = createBuffer(size, size);
        var pointerContext = pointerBuffer.getContext('2d');

        // Buffer for static foreground painting code
        var foregroundBuffer = createBuffer(size, size);
        var foregroundContext = foregroundBuffer.getContext('2d');

        // Buffers for trend indicators
        var trendUpBuffer, trendSteadyBuffer, trendDownBuffer, trendOffBuffer;

        // Buffer for odometer
        var odoGauge, odoBuffer, odoContext;
        if (useOdometer && lcdVisible) {
            odoBuffer = createBuffer(10, 10);          // size doesn't matter, it will get reset by odometer code
            odoContext = odoBuffer.getContext('2d');
        }

        // **************   Image creation  ********************
        var drawLcdText = function (ctx, value) {
            ctx.restore();
            ctx.save();
            ctx.textAlign = 'right';
            ctx.strokeStyle = lcdColor.textColor;
            ctx.fillStyle = lcdColor.textColor;

            if (lcdColor === steelseries.LcdColor.STANDARD || lcdColor === steelseries.LcdColor.STANDARD_GREEN) {
                ctx.shadowColor = 'gray';
                ctx.shadowOffsetX = imageWidth * 0.007;
                ctx.shadowOffsetY = imageWidth * 0.007;
                ctx.shadowBlur = imageWidth * 0.007;
            }
            if (digitalFont) {
                ctx.font = lcdFont;
            } else {
                ctx.font = stdFont;
            }
            ctx.fillText(value.toFixed(lcdDecimals), lcdPosX + lcdWidth - lcdWidth * 0.05, lcdPosY + lcdHeight * 0.5 + lcdFontHeight * 0.38, lcdWidth * 0.9);

            ctx.restore();
        };

        var drawPostsImage = function (ctx) {
            ctx.save();

            if ('type1' === gaugeType.type) {
                // Draw max center top post
                ctx.drawImage(createKnobImage(Math.ceil(imageHeight * 0.037383), steelseries.KnobType.STANDARD_KNOB, knobStyle), imageWidth * 0.523364, imageHeight * 0.130841);
            }

            if ('type1' === gaugeType.type || 'type2' === gaugeType.type) {
                // Draw min left post
                ctx.drawImage(createKnobImage(Math.ceil(imageHeight * 0.037383), steelseries.KnobType.STANDARD_KNOB, knobStyle), imageWidth * 0.130841, imageHeight * 0.514018);
            }

            if ('type2' === gaugeType.type || 'type3' === gaugeType.type) {
                // Draw max right post
                ctx.drawImage(createKnobImage(Math.ceil(imageHeight * 0.037383), steelseries.KnobType.STANDARD_KNOB, knobStyle), imageWidth * 0.831775, imageHeight * 0.514018);
            }

            if ('type3' === gaugeType.type) {
                // Draw min center bottom post
                ctx.drawImage(createKnobImage(Math.ceil(imageHeight * 0.037383), steelseries.KnobType.STANDARD_KNOB, knobStyle), imageWidth * 0.523364, imageHeight * 0.831775);
            }

            if ('type4' === gaugeType.type) {
                // Min post
                ctx.drawImage(createKnobImage(Math.ceil(imageHeight * 0.037383), steelseries.KnobType.STANDARD_KNOB, knobStyle), imageWidth * 0.336448, imageHeight * 0.803738);

                // Max post
                ctx.drawImage(createKnobImage(Math.ceil(imageHeight * 0.037383), steelseries.KnobType.STANDARD_KNOB, knobStyle), imageWidth * 0.626168, imageHeight * 0.803738);
            }

            ctx.restore();

        };

        var createThresholdImage = function () {
            var thresholdBuffer = doc.createElement('canvas');
            thresholdBuffer.width = Math.ceil(size * 0.046728);
            thresholdBuffer.height = Math.ceil(thresholdBuffer.width * 0.9);
            var thresholdCtx = thresholdBuffer.getContext('2d');

            thresholdCtx.save();
            var gradThreshold = thresholdCtx.createLinearGradient(0, 0.1, 0, thresholdBuffer.height * 0.9);
            gradThreshold.addColorStop(0, '#520000');
            gradThreshold.addColorStop(0.3, '#fc1d00');
            gradThreshold.addColorStop(0.59, '#fc1d00');
            gradThreshold.addColorStop(1, '#520000');
            thresholdCtx.fillStyle = gradThreshold;

            thresholdCtx.beginPath();
            thresholdCtx.moveTo(thresholdBuffer.width * 0.5, 0.1);
            thresholdCtx.lineTo(thresholdBuffer.width * 0.9, thresholdBuffer.height * 0.9);
            thresholdCtx.lineTo(thresholdBuffer.width * 0.1, thresholdBuffer.height * 0.9);
            thresholdCtx.lineTo(thresholdBuffer.width * 0.5, 0.1);
            thresholdCtx.closePath();

            thresholdCtx.fill();
            thresholdCtx.strokeStyle = '#FFFFFF';
            thresholdCtx.stroke();

            thresholdCtx.restore();

            return thresholdBuffer;
        };

        var drawAreaSectionImage = function (ctx, start, stop, color, filled) {
            if (start < minValue) {
                start = minValue;
            } else if (start > maxValue) {
                start = maxValue;
            }
            if (stop < minValue) {
                stop = minValue;
            } else if (stop > maxValue) {
                stop = maxValue;
            }
            if (start >= stop) {
                return;
            }
            ctx.save();
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.lineWidth = imageWidth * 0.035;
            var startAngle = (angleRange / range * start - angleRange / range * minValue);
            var stopAngle = startAngle + (stop - start) / (range / angleRange);
            ctx.translate(centerX, centerY);
            ctx.rotate(rotationOffset);
            ctx.beginPath();
            if (filled) {
                ctx.moveTo(0, 0);
                ctx.arc(0, 0, imageWidth * 0.365 - ctx.lineWidth / 2, startAngle, stopAngle, false);
            } else {
                ctx.arc(0, 0, imageWidth * 0.365, startAngle, stopAngle, false);
            }
            if (filled) {
                ctx.moveTo(0, 0);
                ctx.fill();
            } else {
                ctx.stroke();
            }

            ctx.translate(-centerX, -centerY);
            ctx.restore();
        };

        var drawTickmarksImage = function (ctx, labelNumberFormat) {
            var fontSize = Math.ceil(imageWidth * 0.04),
                alpha = rotationOffset,      // Tracks total rotation
                rotationStep = angleStep * minorTickSpacing,
                textRotationAngle,
                valueCounter = minValue,
                majorTickCounter = maxNoOfMinorTicks - 1,
                OUTER_POINT = imageWidth * 0.38,
                MAJOR_INNER_POINT = imageWidth * 0.35,
                MED_INNER_POINT = imageWidth * 0.355,
                MINOR_INNER_POINT = imageWidth * 0.36,
                TEXT_TRANSLATE_X = imageWidth * 0.3,
                TEXT_WIDTH = imageWidth * 0.1,
                HALF_MAX_NO_OF_MINOR_TICKS = maxNoOfMinorTicks / 2,
                MAX_VALUE_ROUNDED = parseFloat(maxValue.toFixed(2)),
                i;

            backgroundColor.labelColor.setAlpha(1);
            ctx.save();
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = fontSize + 'px' + stdFontName;
            ctx.strokeStyle = backgroundColor.labelColor.getRgbaColor();
            ctx.fillStyle = backgroundColor.labelColor.getRgbaColor();
            ctx.translate(centerX, centerY);
            ctx.rotate(rotationOffset);

            if (gaugeType.type === 'type1' || gaugeType.type === 'type2') {
                TEXT_WIDTH = imageWidth * 0.04;
            }

            for (i = minValue; parseFloat(i.toFixed(2)) <= MAX_VALUE_ROUNDED; i += minorTickSpacing) {
                textRotationAngle = rotationStep + HALF_PI;
                majorTickCounter++;
                // Draw major tickmarks
                if (majorTickCounter === maxNoOfMinorTicks) {
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.moveTo(OUTER_POINT, 0);
                    ctx.lineTo(MAJOR_INNER_POINT, 0);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.save();
                    ctx.translate(TEXT_TRANSLATE_X, 0);

                    switch (tickLabelOrientation.type) {
                    case 'horizontal':
                        textRotationAngle = -alpha;
                        break;

                    case 'tangent':
                        textRotationAngle = (alpha <= HALF_PI + PI ? PI : 0);
                        break;

                    case 'normal':
                    /* falls through */
                    default:
                        textRotationAngle = HALF_PI;
                        break;
                    }
                    ctx.rotate(textRotationAngle);

                    switch (labelNumberFormat.format) {
                    case 'fractional':
                        ctx.fillText((valueCounter.toFixed(fractionalScaleDecimals)), 0, 0, TEXT_WIDTH);
                        break;

                    case 'scientific':
                        ctx.fillText((valueCounter.toPrecision(2)), 0, 0, TEXT_WIDTH);
                        break;

                    case 'standard':
                    /* falls through */
                    default:
                        ctx.fillText((valueCounter.toFixed(0)), 0, 0, TEXT_WIDTH);
                        break;
                    }
                    ctx.translate(-TEXT_TRANSLATE_X, 0);
                    ctx.restore();

                    valueCounter += majorTickSpacing;
                    majorTickCounter = 0;
                    ctx.rotate(rotationStep);
                    alpha += rotationStep;
                    continue;
                }

                // Draw tickmark every minor tickmark spacing
                if (0 === maxNoOfMinorTicks % 2 && majorTickCounter === (HALF_MAX_NO_OF_MINOR_TICKS)) {
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(OUTER_POINT, 0);
                    ctx.lineTo(MED_INNER_POINT, 0);
                    ctx.closePath();
                    ctx.stroke();
                } else {
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(OUTER_POINT, 0);
                    ctx.lineTo(MINOR_INNER_POINT, 0);
                    ctx.closePath();
                    ctx.stroke();
                }
                ctx.rotate(rotationStep);
                alpha += rotationStep;
            }

            /*
             // Logarithmic scale
             var tmp = 0.1;
             var minValueLog10 = 0.1;
             var maxValueLog10 = parseInt(Math.pow(10, Math.ceil(Math.log10(maxValue))));
             var drawLabel = true;
             angleStep = angleRange / (maxValueLog10 - minValueLog10)
             for (var scaleFactor = minValueLog10 ; scaleFactor <= maxValueLog10 ; scaleFactor *= 10)
             {
             for (var i = parseFloat((1 * scaleFactor).toFixed(1)) ; i < parseFloat((10 * scaleFactor).toFixed(1)) ; i += scaleFactor)
             {
             textRotationAngle =+ rotationStep + HALF_PI;

             if(drawLabel)
             {
             ctx.lineWidth = 1.5;
             ctx.beginPath();
             ctx.moveTo(imageWidth * 0.38,0);
             ctx.lineTo(imageWidth * 0.35,0);
             ctx.closePath();
             ctx.stroke();
             ctx.save();
             ctx.translate(imageWidth * 0.31, 0);
             ctx.rotate(textRotationAngle);
             ctx.fillText(parseFloat((i).toFixed(1)), 0, 0, imageWidth * 0.0375);
             ctx.translate(-imageWidth * 0.31, 0);
             ctx.restore();
             drawLabel = false;
             }
             else
             {
             ctx.lineWidth = 0.5;
             ctx.beginPath();
             ctx.moveTo(imageWidth * 0.38,0);
             ctx.lineTo(imageWidth * 0.36,0);
             ctx.closePath();
             ctx.stroke();
             }
             //doc.write('log10 scale value: ' + parseFloat((i).toFixed(1)) + '<br>');
             //Math.log10(parseFloat((i).toFixed(1)));

             ctx.rotate(rotationStep);
             }
             tmp = 0.1;
             drawLabel = true;
             }
             */

            ctx.translate(-centerX, -centerY);
            ctx.restore();
        };

        // **************   Initialization  ********************
        // Draw all static painting code to background
        var init = function (parameters) {
            parameters = parameters || {};
            var drawFrame = (undefined === parameters.frame ? false : parameters.frame);
            var drawBackground = (undefined === parameters.background ? false : parameters.background);
            var drawLed = (undefined === parameters.led ? false : parameters.led);
            var drawUserLed = (undefined === parameters.userLed ? false : parameters.userLed);
            var drawPointer = (undefined === parameters.pointer ? false : parameters.pointer);
            var drawForeground = (undefined === parameters.foreground ? false : parameters.foreground);
            var drawTrend = (undefined === parameters.trend ? false : parameters.trend);
            var drawOdo = (undefined === parameters.odo ? false : parameters.odo);

            initialized = true;

            // Calculate the current min and max values and the range
            calculate();

            // Create frame in frame buffer (backgroundBuffer)
            if (drawFrame && frameVisible) {
                drawRadialFrameImage(frameContext, frameDesign, centerX, centerY, imageWidth, imageHeight);
            }

            // Create background in background buffer (backgroundBuffer)
            if (drawBackground && backgroundVisible) {
                drawRadialBackgroundImage(backgroundContext, backgroundColor, centerX, centerY, imageWidth, imageHeight);

                // Create custom layer in background buffer (backgroundBuffer)
                drawRadialCustomImage(backgroundContext, customLayer, centerX, centerY, imageWidth, imageHeight);
            }

            if (drawLed) {
                // Draw LED ON in ledBuffer_ON
                ledContextOn.drawImage(createLedImage(Math.ceil(size * 0.093457), 1, ledColor), 0, 0);

                // Draw LED OFF in ledBuffer_OFF
                ledContextOff.drawImage(createLedImage(Math.ceil(size * 0.093457), 0, ledColor), 0, 0);
            }

            if (drawUserLed) {
                // Draw user LED ON in userLedBuffer_ON
                userLedContextOn.drawImage(createLedImage(Math.ceil(size * 0.093457), 1, userLedColor), 0, 0);

                // Draw user LED OFF in userLedBuffer_OFF
                userLedContextOff.drawImage(createLedImage(Math.ceil(size * 0.093457), 0, userLedColor), 0, 0);
            }

            // Draw min measured value indicator in minMeasuredValueBuffer
            if (minMeasuredValueVisible) {
                minMeasuredValueCtx.drawImage(createMeasuredValueImage(Math.ceil(size * 0.028037), steelseries.ColorDef.BLUE.dark.getRgbaColor(), true, true), 0, 0);
            }

            // Draw max measured value indicator in maxMeasuredValueBuffer
            if (maxMeasuredValueVisible) {
                maxMeasuredValueCtx.drawImage(createMeasuredValueImage(Math.ceil(size * 0.028037), steelseries.ColorDef.RED.medium.getRgbaColor(), true), 0, 0);
            }

            // Create alignment posts in background buffer (backgroundBuffer)
            if (drawBackground && backgroundVisible) {
                drawPostsImage(backgroundContext);

                // Create section in background buffer (backgroundBuffer)
                if (null !== section && 0 < section.length) {
                    var sectionIndex = section.length;
                    do {
                        sectionIndex--;
                        drawAreaSectionImage(backgroundContext, section[sectionIndex].start, section[sectionIndex].stop, section[sectionIndex].color, false);
                    }
                    while (0 < sectionIndex);
                }

                // Create area in background buffer (backgroundBuffer)
                if (null !== area && 0 < area.length) {
                    var areaIndex = area.length;
                    do {
                        areaIndex--;
                        drawAreaSectionImage(backgroundContext, area[areaIndex].start, area[areaIndex].stop, area[areaIndex].color, true);
                    }
                    while (0 < areaIndex);
                }

                // Create tickmarks in background buffer (backgroundBuffer)
                drawTickmarksImage(backgroundContext, labelNumberFormat);

                // Create title in background buffer (backgroundBuffer)
                drawTitleImage(backgroundContext, imageWidth, imageHeight, titleString, unitString, backgroundColor, true, true);
            }

            // Draw threshold image to background context
            if (drawBackground && thresholdVisible) {
                backgroundContext.save();
                backgroundContext.translate(centerX, centerY);
                backgroundContext.rotate(rotationOffset + (threshold - minValue) * angleStep + HALF_PI);
                backgroundContext.translate(-centerX, -centerY);
                backgroundContext.drawImage(createThresholdImage(), imageWidth * 0.475, imageHeight * 0.13);
                backgroundContext.translate(centerX, centerY);
                backgroundContext.restore();
            }

            // Create lcd background if selected in background buffer (backgroundBuffer)
            if (drawBackground && lcdVisible) {
                if (useOdometer && drawOdo) {
                    odoGauge = new steelseries.Odometer('', {
                            _context: odoContext,
                            height: size * 0.075,
                            decimals: odometerParams.decimals,
                            digits: (odometerParams.digits === undefined ? 5 : odometerParams.digits),
                            valueForeColor: odometerParams.valueForeColor,
                            valueBackColor: odometerParams.valueBackColor,
                            decimalForeColor: odometerParams.decimalForeColor,
                            decimalBackColor: odometerParams.decimalBackColor,
                            font: odometerParams.font,
                            value: value
                        });
                    odoPosX = (imageWidth - odoBuffer.width) / 2;
                } else if (!useOdometer) {
                    lcdBuffer = createLcdBackgroundImage(lcdWidth, lcdHeight, lcdColor);
                    backgroundContext.drawImage(lcdBuffer, lcdPosX, lcdPosY);
                }
            }

            // Create pointer image in pointer buffer (contentBuffer)
            if (drawPointer) {
                drawPointerImage(pointerContext, imageWidth, pointerType, pointerColor, backgroundColor.labelColor);
            }

            // Create foreground in foreground buffer (foregroundBuffer)
            if (drawForeground && foregroundVisible) {
                var knobVisible = (pointerType.type === 'type15' || pointerType.type === 'type16' ? false : true);
                drawRadialForegroundImage(foregroundContext, foregroundType, imageWidth, imageHeight, knobVisible, knobType, knobStyle, gaugeType);
            }

            // Create the trend indicator buffers
            if (drawTrend && trendVisible) {
                trendUpBuffer = createTrendIndicator(trendSize, steelseries.TrendState.UP, trendColors);
                trendSteadyBuffer = createTrendIndicator(trendSize, steelseries.TrendState.STEADY, trendColors);
                trendDownBuffer = createTrendIndicator(trendSize, steelseries.TrendState.DOWN, trendColors);
                trendOffBuffer = createTrendIndicator(trendSize, steelseries.TrendState.OFF, trendColors);
            }
        };

        var resetBuffers = function (buffers) {
            buffers = buffers || {};
            var resetFrame = (undefined === buffers.frame ? false : buffers.frame);
            var resetBackground = (undefined === buffers.background ? false : buffers.background);
            var resetLed = (undefined === buffers.led ? false : buffers.led);
            var resetUserLed = (undefined === buffers.userLed ? false : buffers.userLed);
            var resetPointer = (undefined === buffers.pointer ? false : buffers.pointer);
            var resetForeground = (undefined === buffers.foreground ? false : buffers.foreground);

            if (resetFrame) {
                frameBuffer.width = size;
                frameBuffer.height = size;
                frameContext = frameBuffer.getContext('2d');
            }

            if (resetBackground) {
                backgroundBuffer.width = size;
                backgroundBuffer.height = size;
                backgroundContext = backgroundBuffer.getContext('2d');
            }

            if (resetLed) {
                ledBufferOn.width = Math.ceil(size * 0.093457);
                ledBufferOn.height = Math.ceil(size * 0.093457);
                ledContextOn = ledBufferOn.getContext('2d');

                ledBufferOff.width = Math.ceil(size * 0.093457);
                ledBufferOff.height = Math.ceil(size * 0.093457);
                ledContextOff = ledBufferOff.getContext('2d');

                // Buffer for current led painting code
                ledBuffer = ledBufferOff;
            }

            if (resetUserLed) {
                userLedBufferOn.width = Math.ceil(size * 0.093457);
                userLedBufferOn.height = Math.ceil(size * 0.093457);
                userLedContextOn = userLedBufferOn.getContext('2d');

                userLedBufferOff.width = Math.ceil(size * 0.093457);
                userLedBufferOff.height = Math.ceil(size * 0.093457);
                userLedContextOff = userLedBufferOff.getContext('2d');

                // Buffer for current user led painting code
                userLedBuffer = userLedBufferOff;
            }

            if (resetPointer) {
                pointerBuffer.width = size;
                pointerBuffer.height = size;
                pointerContext = pointerBuffer.getContext('2d');
            }

            if (resetForeground) {
                foregroundBuffer.width = size;
                foregroundBuffer.height = size;
                foregroundContext = foregroundBuffer.getContext('2d');
            }
        };

        var toggleAndRepaintLed = function () {
            if (ledVisible) {
                if (ledBuffer === ledBufferOn) {
                    ledBuffer = ledBufferOff;
                } else {
                    ledBuffer = ledBufferOn;
                }
                if (!repainting) {
                    repainting = true;
                    requestAnimFrame(self.repaint);
                }
            }
        };

        var toggleAndRepaintUserLed = function () {
            if (userLedVisible) {
                if (userLedBuffer === userLedBufferOn) {
                    userLedBuffer = userLedBufferOff;
                } else {
                    userLedBuffer = userLedBufferOn;
                }
                if (!repainting) {
                    repainting = true;
                    requestAnimFrame(self.repaint);
                }
            }
        };

        var blink = function (blinking) {
            if (blinking) {
                ledTimerId = setInterval(toggleAndRepaintLed, 1000);
            } else {
                clearInterval(ledTimerId);
                ledBuffer = ledBufferOff;
            }
        };

        var blinkUser = function (blinking) {
            if (blinking) {
                userLedTimerId = setInterval(toggleAndRepaintUserLed, 1000);
            } else {
                clearInterval(userLedTimerId);
                userLedBuffer = userLedBufferOff;
            }
        };

        //************************************ Public methods **************************************
        this.setValue = function (newValue) {
            newValue = parseFloat(newValue);
            var targetValue = newValue < minValue ? minValue : (newValue > maxValue ? maxValue : newValue);
            if (value !== targetValue) {
                value = targetValue;

                if (value > maxMeasuredValue) {
                    maxMeasuredValue = value;
                }
                if (value < minMeasuredValue) {
                    minMeasuredValue = value;
                }

                if ((value >= threshold && !ledBlinking && thresholdRising) ||
                    (value <= threshold && !ledBlinking && !thresholdRising)) {
                    ledBlinking = true;
                    blink(ledBlinking);
                    if (playAlarm) {
                        audioElement.play();
                    }
                } else if ((value < threshold && ledBlinking && thresholdRising) ||
                           (value > threshold && ledBlinking && !thresholdRising)) {
                    ledBlinking = false;
                    blink(ledBlinking);
                    if (playAlarm) {
                        audioElement.pause();
                    }
                }
                this.repaint();
            }
            return this;
        };

        this.getValue = function () {
            return value;
        };

        this.setOdoValue = function (newValue) {
            newValue = parseFloat(newValue);
            var targetValue = (newValue < 0 ? 0 : newValue);
            if (odoValue !== targetValue) {
                odoValue = targetValue;
                this.repaint();
            }
            return this;
        };

        this.getOdoValue = function () {
            return odoValue;
        };

        this.setValueAnimated = function (newValue, callback) {
            newValue = parseFloat(newValue);
            var targetValue = (newValue < minValue ? minValue : (newValue > maxValue ? maxValue : newValue)),
                gauge = this,
                time;

            if (value !== targetValue) {
                if (undefined !== tween && tween.isPlaying) {
                    tween.stop();
                }
                time = fullScaleDeflectionTime * Math.abs(targetValue - value) / (maxValue - minValue);
                time = Math.max(time, fullScaleDeflectionTime / 5);
                tween = new Tween({}, '', Tween.regularEaseInOut, value, targetValue, time);
                //tween = new Tween({}, '', Tween.regularEaseInOut, value, targetValue, 1);
                //tween = new Tween(new Object(), '', Tween.strongEaseInOut, value, targetValue, 1);

                tween.onMotionChanged = function (event) {
                    value = event.target._pos;

                    if ((value >= threshold && !ledBlinking && thresholdRising) ||
                        (value <= threshold && !ledBlinking && !thresholdRising)) {
                        ledBlinking = true;
                        blink(ledBlinking);
                        if (playAlarm) {
                            audioElement.play();
                        }
                    } else if ((value < threshold && ledBlinking && thresholdRising) ||
                               (value > threshold && ledBlinking && !thresholdRising)) {
                        ledBlinking = false;
                        blink(ledBlinking);
                        if (playAlarm) {
                            audioElement.pause();
                        }
                    }

                    if (value > maxMeasuredValue) {
                        maxMeasuredValue = value;
                    }
                    if (value < minMeasuredValue) {
                        minMeasuredValue = value;
                    }
                    if (!repainting) {
                        repainting = true;
                        requestAnimFrame(gauge.repaint);
                    }
                };

                // do we have a callback function to process?
                if (callback && typeof(callback) === "function") {
                    tween.onMotionFinished = callback;
                }

                tween.start();
            }
            return this;
        };

        this.resetMinMeasuredValue = function () {
            minMeasuredValue = value;
            this.repaint();
        };

        this.resetMaxMeasuredValue = function () {
            maxMeasuredValue = value;
            this.repaint();
            return this;
        };

        this.setMinMeasuredValueVisible = function (visible) {
            minMeasuredValueVisible = !!visible;
            this.repaint();
            return this;
        };

        this.setMaxMeasuredValueVisible = function (visible) {
            maxMeasuredValueVisible = !!visible;
            this.repaint();
            return this;
        };

        this.setMaxMeasuredValue = function (newValue) {
            newValue = parseFloat(newValue);
            var targetValue = newValue < minValue ? minValue : (newValue > maxValue ? maxValue : newValue);
            maxMeasuredValue = targetValue;
            this.repaint();
            return this;
        };

        this.setMinMeasuredValue = function (newValue) {
            newValue = parseFloat(newValue);
            var targetValue = newValue < minValue ? minValue : (newValue > maxValue ? maxValue : newValue);
            minMeasuredValue = targetValue;
            this.repaint();
            return this;
        };

        this.setTitleString = function (title) {
            titleString = title;
            resetBuffers({background: true});
            init({background: true});
            this.repaint();
            return this;
        };

        this.setUnitString = function (unit) {
            unitString = unit;
            resetBuffers({background: true});
            init({background: true});
            this.repaint();
            return this;
        };

        this.setMinValue = function (value) {
            minValue = parseFloat(value);
            resetBuffers({frame: true,
                          background: true});
            init({frame: true,
                  background: true});
            this.repaint();
            return this;
        };

        this.getMinValue = function () {
            return minValue;
        };

        this.setMaxValue = function (value) {
            maxValue = parseFloat(value);
            resetBuffers({frame: true,
                          background: true});
            init({frame: true,
                  background: true});
            this.repaint();
            return this;
        };

        this.getMaxValue = function () {
            return maxValue;
        };

        this.setThreshold = function (newValue) {
            newValue = parseFloat(newValue);
            var targetValue = newValue < minValue ? minValue : (newValue > maxValue ? maxValue : newValue);
            threshold = targetValue;
            resetBuffers({background: true});
            init({background: true});
            this.repaint();
            return this;
        };

        this.setArea = function (areaVal) {
            area = areaVal;
            resetBuffers({background: true,
                          foreground: true});
            init({background: true,
                  foreground: true
                  });
            this.repaint();
            return this;
        };

        this.setSection = function (areaSec) {
            section = areaSec;
            resetBuffers({background: true,
                          foreground: true});
            init({background: true,
                  foreground: true
                  });
            this.repaint();
            return this;
        };

        this.setThresholdVisible = function (visible) {
            thresholdVisible = !!visible;
            this.repaint();
            return this;
        };

        this.setThresholdRising = function (rising) {
            thresholdRising = !!rising;
            // reset existing threshold alerts
            ledBlinking = !ledBlinking;
            blink(ledBlinking);
            this.repaint();
            return this;
        };

        this.setLcdDecimals = function (decimals) {
            lcdDecimals = parseInt(decimals, 10);
            this.repaint();
            return this;
        };

        this.setFrameDesign = function (newFrameDesign) {
            resetBuffers({frame: true});
            frameDesign = newFrameDesign;
            init({frame: true});
            this.repaint();
            return this;
        };

        this.setBackgroundColor = function (newBackgroundColor) {
            resetBuffers({background: true,
                          pointer: (pointerType.type === 'type2' || pointerType.type === 'type13' ? true : false)       // type2 & 13 depend on background
                });
            backgroundColor = newBackgroundColor;
            init({background: true,   // type2 & 13 depend on background
                  pointer: (pointerType.type === 'type2' || pointerType.type === 'type13' ? true : false)
                });
            this.repaint();
            return this;
        };

        this.setForegroundType = function (newForegroundType) {
            resetBuffers({foreground: true});
            foregroundType = newForegroundType;
            init({foreground: true});
            this.repaint();
            return this;
        };

        this.setPointerType = function (newPointerType) {
            resetBuffers({pointer: true,
                          foreground: true
                         });
            pointerType = newPointerType;
            init({pointer: true,
                  foreground: true
                  });
            this.repaint();
            return this;
        };

        this.setPointerColor = function (newPointerColor) {
            resetBuffers({pointer: true});
            pointerColor = newPointerColor;
            init({pointer: true});
            this.repaint();
            return this;
        };

        this.setLedColor = function (newLedColor) {
            resetBuffers({led: true});
            ledColor = newLedColor;
            init({led: true});
            this.repaint();
            return this;
        };

        this.setUserLedColor = function (newLedColor) {
            resetBuffers({userLed: true});
            userLedColor = newLedColor;
            init({userLed: true});
            this.repaint();
            return this;
        };

        this.toggleUserLed = function () {
            if (userLedBuffer === userLedBufferOn) {
                userLedBuffer = userLedBufferOff;
            } else {
                userLedBuffer = userLedBufferOn;
            }
            this.repaint();
            return this;
        };

        this.setUserLedOnOff = function (on) {
            if (true === on) {
                userLedBuffer = userLedBufferOn;
            } else {
                userLedBuffer = userLedBufferOff;
            }
            this.repaint();
            return this;
        };

        this.blinkUserLed = function (blink) {
            if (blink) {
                if (!userLedBlinking) {
                    blinkUser(true);
                    userLedBlinking = true;
                }
            } else {
                if (userLedBlinking) {
                    clearInterval(userLedTimerId);
                    userLedBlinking = false;
                }
            }
            return this;
        };

        this.setLedVisible = function (visible) {
            ledVisible = !!visible;
            this.repaint();
            return this;
        };

        this.setUserLedVisible = function (visible) {
            userLedVisible = !!visible;
            this.repaint();
            return this;
        };

        this.setLcdColor = function (newLcdColor) {
            lcdColor = newLcdColor;
            resetBuffers({background: true});
            init({background: true});
            this.repaint();
            return this;
        };

        this.setTrend = function (newValue) {
            trendIndicator = newValue;
            this.repaint();
            return this;
        };

        this.setTrendVisible = function (visible) {
            trendVisible = !!visible;
            this.repaint();
            return this;
        };

        this.setFractionalScaleDecimals = function (decimals) {
            fractionalScaleDecimals = parseInt(decimals, 10);
            resetBuffers({background: true});
            init({background: true});
            this.repaint();
            return this;
        };

        this.setLabelNumberFormat = function (format) {
            labelNumberFormat = format;
            resetBuffers({background: true});
            init({background: true});
            this.repaint();
            return this;
        };

        this.repaint = function () {
            if (!initialized) {
                init({frame: true,
                      background: true,
                      led: true,
                      userLed: true,
                      pointer: true,
                      trend: true,
                      foreground: true,
                      odo: true});
            }
            mainCtx.clearRect(0, 0, size, size);

            // Draw frame
            if (frameVisible) {
                mainCtx.drawImage(frameBuffer, 0, 0);
            }

            // Draw buffered image to visible canvas
            mainCtx.drawImage(backgroundBuffer, 0, 0);

            // Draw lcd display
            if (lcdVisible) {
                if (useOdometer) {
                    odoGauge.setValue(odometerUseValue ? value : odoValue);
                    mainCtx.drawImage(odoBuffer, odoPosX, odoPosY);
                } else {
                    drawLcdText(mainCtx, value);
                }
            }

            // Draw led
            if (ledVisible) {
                mainCtx.drawImage(ledBuffer, ledPosX, ledPosY);
            }

            // Draw user led
            if (userLedVisible) {
                mainCtx.drawImage(userLedBuffer, userLedPosX, userLedPosY);
            }

            // Draw the trend indicator
            if (trendVisible) {
                switch (trendIndicator.state) {
                case 'up':
                    mainCtx.drawImage(trendUpBuffer, trendPosX, trendPosY);
                    break;
                case 'steady':
                    mainCtx.drawImage(trendSteadyBuffer, trendPosX, trendPosY);
                    break;
                case 'down':
                    mainCtx.drawImage(trendDownBuffer, trendPosX, trendPosY);
                    break;
                case 'off':
                    mainCtx.drawImage(trendOffBuffer, trendPosX, trendPosY);
                    break;
                }
            }

            // Draw min measured value indicator
            if (minMeasuredValueVisible) {
                mainCtx.save();
                mainCtx.translate(centerX, centerY);
                mainCtx.rotate(rotationOffset + HALF_PI + (minMeasuredValue - minValue) * angleStep);
                mainCtx.translate(-centerX, -centerY);
                mainCtx.drawImage(minMeasuredValueBuffer, mainCtx.canvas.width * 0.4865, mainCtx.canvas.height * 0.105);
                mainCtx.restore();
            }

            // Draw max measured value indicator
            if (maxMeasuredValueVisible) {
                mainCtx.save();
                mainCtx.translate(centerX, centerY);
                mainCtx.rotate(rotationOffset + HALF_PI + (maxMeasuredValue - minValue) * angleStep);
                mainCtx.translate(-centerX, -centerY);
                mainCtx.drawImage(maxMeasuredValueBuffer, mainCtx.canvas.width * 0.4865, mainCtx.canvas.height * 0.105);
                mainCtx.restore();
            }

            angle = rotationOffset + HALF_PI + (value - minValue) * angleStep;

            // Define rotation center
            mainCtx.save();
            mainCtx.translate(centerX, centerY);
            mainCtx.rotate(angle);
            mainCtx.translate(-centerX, -centerY);
            // Set the pointer shadow params
            mainCtx.shadowColor = 'rgba(0, 0, 0, 0.8)';
            mainCtx.shadowOffsetX = mainCtx.shadowOffsetY = shadowOffset;
            mainCtx.shadowBlur = shadowOffset * 2;
            // Draw the pointer
            mainCtx.drawImage(pointerBuffer, 0, 0);
            // Undo the translations & shadow settings
            mainCtx.restore();

            // Draw foreground
            if (foregroundVisible) {
                mainCtx.drawImage(foregroundBuffer, 0, 0);
            }

            repainting = false;
        };

        // Visualize the component
        this.repaint();

        return this;
    };

    var radialBargraph = function (canvas, parameters) {
        parameters = parameters || {};
        var gaugeType = (undefined === parameters.gaugeType ? steelseries.GaugeType.TYPE4 : parameters.gaugeType),
            size = (undefined === parameters.size ? 0 : parameters.size),
            minValue = (undefined === parameters.minValue ? 0 : parameters.minValue),
            maxValue = (undefined === parameters.maxValue ? (minValue + 100) : parameters.maxValue),
            niceScale = (undefined === parameters.niceScale ? true : parameters.niceScale),
            threshold = (undefined === parameters.threshold ? (maxValue - minValue) / 2 + minValue: parameters.threshold),
            thresholdRising = (undefined === parameters.thresholdRising ? true : parameters.thresholdRising),
            section = (undefined === parameters.section ? null : parameters.section),
            useSectionColors = (undefined === parameters.useSectionColors ? false : parameters.useSectionColors),
            titleString = (undefined === parameters.titleString ? '' : parameters.titleString),
            unitString = (undefined === parameters.unitString ? '' : parameters.unitString),
            frameDesign = (undefined === parameters.frameDesign ? steelseries.FrameDesign.METAL : parameters.frameDesign),
            frameVisible = (undefined === parameters.frameVisible ? true : parameters.frameVisible),
            backgroundColor = (undefined === parameters.backgroundColor ? steelseries.BackgroundColor.DARK_GRAY : parameters.backgroundColor),
            backgroundVisible = (undefined === parameters.backgroundVisible ? true : parameters.backgroundVisible),
            valueColor = (undefined === parameters.valueColor ? steelseries.ColorDef.RED : parameters.valueColor),
            lcdColor = (undefined === parameters.lcdColor ? steelseries.LcdColor.STANDARD : parameters.lcdColor),
            lcdVisible = (undefined === parameters.lcdVisible ? true : parameters.lcdVisible),
            lcdDecimals = (undefined === parameters.lcdDecimals ? 2 : parameters.lcdDecimals),
            digitalFont = (undefined === parameters.digitalFont ? false : parameters.digitalFont),
            fractionalScaleDecimals = (undefined === parameters.fractionalScaleDecimals ? 1 : parameters.fractionalScaleDecimals),
            customLayer = (undefined === parameters.customLayer ? null : parameters.customLayer),
            ledColor = (undefined === parameters.ledColor ? steelseries.LedColor.RED_LED : parameters.ledColor),
            ledVisible = (undefined === parameters.ledVisible ? true : parameters.ledVisible),
            userLedColor = (undefined === parameters.userLedColor ? steelseries.LedColor.GREEN_LED : parameters.userLedColor),
            userLedVisible = (undefined === parameters.userLedVisible ? false : parameters.userLedVisible),
            labelNumberFormat = (undefined === parameters.labelNumberFormat ? steelseries.LabelNumberFormat.STANDARD : parameters.labelNumberFormat),
            foregroundType = (undefined === parameters.foregroundType ? steelseries.ForegroundType.TYPE1 : parameters.foregroundType),
            foregroundVisible = (undefined === parameters.foregroundVisible ? true : parameters.foregroundVisible),
            playAlarm = (undefined === parameters.playAlarm ? false : parameters.playAlarm),
            alarmSound = (undefined === parameters.alarmSound ? false : parameters.alarmSound),
            valueGradient = (undefined === parameters.valueGradient ? null : parameters.valueGradient),
            useValueGradient = (undefined === parameters.useValueGradient ? false : parameters.useValueGradient),
            tickLabelOrientation = (undefined === parameters.tickLabelOrientation ? (gaugeType === steelseries.GaugeType.TYPE1 ? steelseries.TickLabelOrientation.TANGENT : steelseries.TickLabelOrientation.NORMAL) : parameters.tickLabelOrientation),
            trendVisible = (undefined === parameters.trendVisible ? false : parameters.trendVisible),
            trendColors = (undefined === parameters.trendColors ? [steelseries.LedColor.RED_LED, steelseries.LedColor.GREEN_LED, steelseries.LedColor.CYAN_LED] : parameters.trendColors),
            fullScaleDeflectionTime = (undefined === parameters.fullScaleDeflectionTime ? 2.5 : parameters.fullScaleDeflectionTime);

        // Get the canvas context and clear it
        var mainCtx = getCanvasContext(canvas);
        // Has a size been specified?
        if (size === 0) {
            size = Math.min(mainCtx.canvas.width, mainCtx.canvas.height);
        }

        // Set the size - also clears the canvas
        mainCtx.canvas.width = size;
        mainCtx.canvas.height = size;

        // Create audio tag for alarm sound
        if (playAlarm && alarmSound !== false) {
            var audioElement = doc.createElement('audio');
            audioElement.setAttribute('src', alarmSound);
            audioElement.setAttribute('preload', 'auto');
        }

        var value = minValue;
        var range = maxValue - minValue;
        var ledBlinking = false;
        var ledTimerId = 0;
        var userLedBlinking = false;
        var userLedTimerId = 0;
        var tween;
        var self = this;
        var repainting = false;

        // GaugeType specific private variables
        var freeAreaAngle;
        var rotationOffset;
        var bargraphOffset;
        var tickmarkOffset;
        var angleRange;
        var degAngleRange;
        var angleStep;
        var angle;

        var sectionAngles = [];
        var isSectionsVisible = false;
        var isGradientVisible = false;

        var imageWidth = size;
        var imageHeight = size;

        var centerX = imageWidth / 2;
        var centerY = imageHeight / 2;

        // Misc
        var lcdFontHeight = Math.floor(imageWidth / 10);
        var stdFont = lcdFontHeight + 'px ' + stdFontName;
        var lcdFont = lcdFontHeight + 'px ' + lcdFontName;
        var lcdHeight = imageHeight * 0.13;
        var lcdWidth = imageWidth * 0.4;
        var lcdPosX = (imageWidth - lcdWidth) / 2;
        var lcdPosY = imageHeight / 2 - lcdHeight / 2;

        // Constants
        var ACTIVE_LED_POS_X = imageWidth * 0.116822;
        var ACTIVE_LED_POS_Y = imageWidth * 0.485981;
        var LED_SIZE = Math.ceil(size * 0.093457);
        //var LED_POS_X = imageWidth * 0.453271;
        var LED_POS_X = imageWidth * 0.53;
        var LED_POS_Y = imageHeight * 0.61;
        var USER_LED_POS_X = gaugeType === steelseries.GaugeType.TYPE3 ? 0.7 * imageWidth : centerX - LED_SIZE / 2;
        var USER_LED_POS_Y = gaugeType === steelseries.GaugeType.TYPE3 ? 0.61 * imageHeight : 0.75 * imageHeight;

        var trendIndicator = steelseries.TrendState.OFF;
        var trendSize = size * 0.06;
        var trendPosX = size * 0.38;
        var trendPosY = size * 0.57;

        switch (gaugeType.type) {
        case 'type1':
            freeAreaAngle = 0;
            rotationOffset = PI;
            bargraphOffset = 0;
            tickmarkOffset = HALF_PI;
            angleRange = HALF_PI;
            degAngleRange = angleRange * DEG_FACTOR;
            angleStep = angleRange / range;
            break;

        case 'type2':
            freeAreaAngle = 0;
            rotationOffset = PI;
            bargraphOffset = 0;
            tickmarkOffset = HALF_PI;
            angleRange = PI;
            degAngleRange = angleRange * DEG_FACTOR;
            angleStep = angleRange / range;
            break;

        case 'type3':
            freeAreaAngle = 0;
            rotationOffset = HALF_PI;
            bargraphOffset = -HALF_PI;
            tickmarkOffset = 0;
            angleRange = 1.5 * PI;
            degAngleRange = angleRange * DEG_FACTOR;
            angleStep = angleRange / range;
            break;

        case 'type4':
        /* falls through */
        default:
            freeAreaAngle = 60 * RAD_FACTOR;
            rotationOffset = HALF_PI + (freeAreaAngle / 2);
            bargraphOffset = -TWO_PI / 6;
            tickmarkOffset = 0;
            angleRange = TWO_PI - freeAreaAngle;
            degAngleRange = angleRange * DEG_FACTOR;
            angleStep = angleRange / range;
            break;
        }

        // Buffer for the frame
        var frameBuffer = createBuffer(size, size);
        var frameContext = frameBuffer.getContext('2d');

        // Buffer for static background painting code
        var backgroundBuffer = createBuffer(size, size);
        var backgroundContext = backgroundBuffer.getContext('2d');

        var lcdBuffer;

        // Buffer for active bargraph led
        var activeLedBuffer = createBuffer(Math.ceil(size * 0.060747), Math.ceil(size * 0.023364));
        var activeLedContext = activeLedBuffer.getContext('2d');

        // Buffer for led on painting code
        var ledBufferOn = createBuffer(LED_SIZE, LED_SIZE);
        var ledContextOn = ledBufferOn.getContext('2d');

        // Buffer for led off painting code
        var ledBufferOff = createBuffer(LED_SIZE, LED_SIZE);
        var ledContextOff = ledBufferOff.getContext('2d');

        // Buffer for current led painting code
        var ledBuffer = ledBufferOff;

        // Buffer for user led on painting code
        var userLedBufferOn = createBuffer(LED_SIZE, LED_SIZE);
        var userLedContextOn = userLedBufferOn.getContext('2d');

        // Buffer for user led off painting code
        var userLedBufferOff = createBuffer(LED_SIZE, LED_SIZE);
        var userLedContextOff = userLedBufferOff.getContext('2d');

        // Buffer for current user led painting code
        var userLedBuffer = userLedBufferOff;
        // Buffer for the background of the led
        var ledBackground;

        // Buffer for static foreground painting code
        var foregroundBuffer = createBuffer(size, size);
        var foregroundContext = foregroundBuffer.getContext('2d');

        // Buffers for trend indicators
        var trendUpBuffer, trendSteadyBuffer, trendDownBuffer, trendOffBuffer;

        var initialized = false;

        // Tickmark specific private variables
        var niceMinValue = minValue;
        var niceMaxValue = maxValue;
        var niceRange = maxValue - minValue;
        range = niceMaxValue - niceMinValue;
        var minorTickSpacing = 0;
        var majorTickSpacing = 0;
        var maxNoOfMinorTicks = 10;
        var maxNoOfMajorTicks = 10;

        // Method to calculate nice values for min, max and range for the tickmarks
        var calculate = function calculate() {
            if (niceScale) {
                niceRange = calcNiceNumber(maxValue - minValue, false);
                majorTickSpacing = calcNiceNumber(niceRange / (maxNoOfMajorTicks - 1), true);
                niceMinValue = Math.floor(minValue / majorTickSpacing) * majorTickSpacing;
                niceMaxValue = Math.ceil(maxValue / majorTickSpacing) * majorTickSpacing;
                minorTickSpacing = calcNiceNumber(majorTickSpacing / (maxNoOfMinorTicks - 1), true);
                minValue = niceMinValue;
                maxValue = niceMaxValue;
                range = maxValue - minValue;
            } else {
                niceRange = (maxValue - minValue);
                niceMinValue = minValue;
                niceMaxValue = maxValue;
                range = niceRange;
                //minorTickSpacing = 1;
                //majorTickSpacing = 10;
                majorTickSpacing = calcNiceNumber(niceRange / (maxNoOfMajorTicks - 1), true);
                minorTickSpacing = calcNiceNumber(majorTickSpacing / (maxNoOfMinorTicks - 1), true);
            }

            switch (gaugeType.type) {
            case 'type1':
                freeAreaAngle = 0;
                rotationOffset = PI;
                tickmarkOffset = HALF_PI;
                angleRange = HALF_PI;
                angleStep = angleRange / range;
                break;

            case 'type2':
                freeAreaAngle = 0;
                rotationOffset = PI;
                tickmarkOffset = HALF_PI;
                angleRange = PI;
                angleStep = angleRange / range;
                break;

            case 'type3':
                freeAreaAngle = 0;
                rotationOffset = HALF_PI;
                tickmarkOffset = 0;
                angleRange = 1.5 * PI;
                angleStep = angleRange / range;
                break;

            case 'type4':       // fall through
            /* falls through */
            default:
                freeAreaAngle = 60 * RAD_FACTOR;
                rotationOffset = HALF_PI + (freeAreaAngle / 2);
                tickmarkOffset = 0;
                angleRange = TWO_PI - freeAreaAngle;
                angleStep = angleRange / range;
                break;
            }
            angle = rotationOffset + (value - minValue) * angleStep;
        };

        //********************************* Private methods *********************************
        // Draw all static painting code to background
        var init = function (parameters) {
            parameters = parameters || {};
            var drawFrame = (undefined === parameters.frame ? false : parameters.frame);
            var drawBackground = (undefined === parameters.background ? false : parameters.background);
            var drawLed = (undefined === parameters.led ? false : parameters.led);
            var drawUserLed = (undefined === parameters.userLed ? false : parameters.userLed);
            var drawValue =  (undefined === parameters.value ? false : parameters.value);
            var drawForeground = (undefined === parameters.foreground ? false : parameters.foreground);
            var drawTrend = (undefined === parameters.trend ? false : parameters.trend);

            initialized = true;

            calculate();

            // Create frame in frame buffer (frameBuffer)
            if (drawFrame && frameVisible) {
                drawRadialFrameImage(frameContext, frameDesign, centerX, centerY, imageWidth, imageHeight);
            }

            // Create background in background buffer (backgroundBuffer)
            if (drawBackground && backgroundVisible) {
                drawRadialBackgroundImage(backgroundContext, backgroundColor, centerX, centerY, imageWidth, imageHeight);

                // Create custom layer in background buffer (backgroundBuffer)
                drawRadialCustomImage(backgroundContext, customLayer, centerX, centerY, imageWidth, imageHeight);
            }

            if (drawLed) {
                // Draw LED ON in ledBuffer_ON
                ledContextOn.drawImage(createLedImage(LED_SIZE, 1, ledColor), 0, 0);

                // Draw LED OFF in ledBuffer_OFF
                ledContextOff.drawImage(createLedImage(LED_SIZE, 0, ledColor), 0, 0);

                // Buffer the background of the led for blinking
                ledBackground = backgroundContext.getImageData(LED_POS_X, LED_POS_Y, LED_SIZE, LED_SIZE);
            }

            if (drawUserLed) {
                // Draw user LED ON in userLedBuffer_ON
                userLedContextOn.drawImage(createLedImage(Math.ceil(LED_SIZE), 1, userLedColor), 0, 0);

                // Draw user LED OFF in userLedBuffer_OFF
                userLedContextOff.drawImage(createLedImage(Math.ceil(LED_SIZE), 0, userLedColor), 0, 0);
            }

            if (drawBackground) {
                // Create bargraphtrack in background buffer (backgroundBuffer)
                drawBargraphTrackImage(backgroundContext);
            }

            // Create tickmarks in background buffer (backgroundBuffer)
            if (drawBackground  && backgroundVisible) {
                drawTickmarksImage(backgroundContext, labelNumberFormat);

                // Create title in background buffer (backgroundBuffer)
                drawTitleImage(backgroundContext, imageWidth, imageHeight, titleString, unitString, backgroundColor, true, true);
            }

            // Create lcd background if selected in background buffer (backgroundBuffer)
            if (drawBackground && lcdVisible) {
                lcdBuffer = createLcdBackgroundImage(lcdWidth, lcdHeight, lcdColor);
                backgroundContext.drawImage(lcdBuffer, lcdPosX, lcdPosY);
            }

            // Convert Section values into angles
            isSectionsVisible = false;
            if (useSectionColors && null !== section && 0 < section.length) {
                isSectionsVisible = true;
                var sectionIndex = section.length;
                sectionAngles = [];
                do {
                    sectionIndex--;
                    sectionAngles.push({start: (((section[sectionIndex].start + Math.abs(minValue)) / (maxValue - minValue)) * degAngleRange),
                                         stop: (((section[sectionIndex].stop + Math.abs(minValue)) / (maxValue - minValue)) * degAngleRange),
                                        color: customColorDef(section[sectionIndex].color)});
                } while (0 < sectionIndex);
            }

            // Use a gradient for the valueColor?
            isGradientVisible = false;
            if (useValueGradient && valueGradient !== null) {
                // force section colors off!
                isSectionsVisible = false;
                isGradientVisible = true;
            }

            // Create an image of an active led in active led buffer (activeLedBuffer)
            if (drawValue) {
                drawActiveLed(activeLedContext, valueColor);
            }

            // Create foreground in foreground buffer (foregroundBuffer)
            if (drawForeground && foregroundVisible) {
                drawRadialForegroundImage(foregroundContext, foregroundType, imageWidth, imageHeight, false);
            }

            // Create the trend indicator buffers
            if (drawTrend && trendVisible) {
                trendUpBuffer = createTrendIndicator(trendSize, steelseries.TrendState.UP, trendColors);
                trendSteadyBuffer = createTrendIndicator(trendSize, steelseries.TrendState.STEADY, trendColors);
                trendDownBuffer = createTrendIndicator(trendSize, steelseries.TrendState.DOWN, trendColors);
                trendOffBuffer = createTrendIndicator(trendSize, steelseries.TrendState.OFF, trendColors);
            }
        };

        var resetBuffers = function (buffers) {
            buffers = buffers || {};
            var resetFrame = (undefined === buffers.frame ? false : buffers.frame);
            var resetBackground = (undefined === buffers.background ? false : buffers.background);
            var resetLed = (undefined === buffers.led ? false : buffers.led);
            var resetUserLed = (undefined === buffers.userLed ? false : buffers.userLed);
            var resetValue = (undefined === buffers.value ? false : buffers.value);
            var resetForeground = (undefined === buffers.foreground ? false : buffers.foreground);

            // Buffer for the frame
            if (resetFrame) {
                frameBuffer.width = size;
                frameBuffer.height = size;
                frameContext = frameBuffer.getContext('2d');
            }

            // Buffer for static background painting code
            if (resetBackground) {
                backgroundBuffer.width = size;
                backgroundBuffer.height = size;
                backgroundContext = backgroundBuffer.getContext('2d');
            }

            // Buffer for active bargraph led
            if (resetValue) {
                activeLedBuffer.width = Math.ceil(size * 0.060747);
                activeLedBuffer.height = Math.ceil(size * 0.023364);
                activeLedContext = activeLedBuffer.getContext('2d');
            }

            if (resetLed) {
                // Buffer for led on painting code
                ledBufferOn.width = Math.ceil(LED_SIZE);
                ledBufferOn.height = Math.ceil(LED_SIZE);
                ledContextOn = ledBufferOn.getContext('2d');

                // Buffer for led off painting code
                ledBufferOff.width = Math.ceil(LED_SIZE);
                ledBufferOff.height = Math.ceil(LED_SIZE);
                ledContextOff = ledBufferOff.getContext('2d');

                // Buffer for current led painting code
                ledBuffer = ledBufferOff;
            }

            if (resetUserLed) {
                userLedBufferOn.width = Math.ceil(LED_SIZE);
                userLedBufferOn.height = Math.ceil(LED_SIZE);
                userLedContextOn = userLedBufferOn.getContext('2d');

                userLedBufferOff.width = Math.ceil(LED_SIZE);
                userLedBufferOff.height = Math.ceil(LED_SIZE);
                userLedContextOff = userLedBufferOff.getContext('2d');

                // Buffer for current user led painting code
                userLedBuffer = userLedBufferOff;
            }

            // Buffer for static foreground painting code
            if (resetForeground) {
                foregroundBuffer.width = size;
                foregroundBuffer.height = size;
                foregroundContext = foregroundBuffer.getContext('2d');
            }
        };

        var drawBargraphTrackImage = function (ctx) {

            ctx.save();

            // Bargraphtrack

            // Frame
            ctx.save();
            ctx.lineWidth = size * 0.085;
            ctx.beginPath();
            ctx.translate(centerX, centerY);
            ctx.rotate(rotationOffset - 4 * RAD_FACTOR);
            ctx.translate(-centerX, -centerY);
            ctx.arc(centerX, centerY, imageWidth * 0.355140, 0, angleRange + 8 * RAD_FACTOR, false);
            ctx.rotate(-rotationOffset);
            var ledTrackFrameGradient = ctx.createLinearGradient(0, 0.107476 * imageHeight, 0, 0.897195 * imageHeight);
            ledTrackFrameGradient.addColorStop(0, '#000000');
            ledTrackFrameGradient.addColorStop(0.22, '#333333');
            ledTrackFrameGradient.addColorStop(0.76, '#333333');
            ledTrackFrameGradient.addColorStop(1, '#cccccc');
            ctx.strokeStyle = ledTrackFrameGradient;
            ctx.stroke();
            ctx.restore();

            // Main
            ctx.save();
            ctx.lineWidth = size * 0.075;
            ctx.beginPath();
            ctx.translate(centerX, centerY);
            ctx.rotate(rotationOffset - 4 * RAD_FACTOR);
            ctx.translate(-centerX, -centerY);
            ctx.arc(centerX, centerY, imageWidth * 0.355140, 0, angleRange + 8 * RAD_FACTOR, false);
            ctx.rotate(-rotationOffset);
            var ledTrackMainGradient = ctx.createLinearGradient(0, 0.112149 * imageHeight, 0, 0.892523 * imageHeight);
            ledTrackMainGradient.addColorStop(0, '#111111');
            ledTrackMainGradient.addColorStop(1, '#333333');
            ctx.strokeStyle = ledTrackMainGradient;
            ctx.stroke();
            ctx.restore();

            // Draw inactive leds
            var ledCenterX = (imageWidth * 0.116822 + imageWidth * 0.060747) / 2;
            var ledCenterY = (imageWidth * 0.485981 + imageWidth * 0.023364) / 2;
            var ledOffGradient = ctx.createRadialGradient(ledCenterX, ledCenterY, 0, ledCenterX, ledCenterY, 0.030373 * imageWidth);
            ledOffGradient.addColorStop(0, '#3c3c3c');
            ledOffGradient.addColorStop(1, '#323232');
            var angle = 0;
            for (angle = 0; angle <= degAngleRange; angle += 5) {
                ctx.save();
                ctx.translate(centerX, centerY);
                ctx.rotate((angle * RAD_FACTOR) + bargraphOffset);
                ctx.translate(-centerX, -centerY);
                ctx.beginPath();
                ctx.rect(imageWidth * 0.116822, imageWidth * 0.485981, imageWidth * 0.060747, imageWidth * 0.023364);
                ctx.closePath();
                ctx.fillStyle = ledOffGradient;
                ctx.fill();
                ctx.restore();
            }

            ctx.restore();
        };

        var drawActiveLed = function (ctx, color) {
            ctx.save();
            ctx.beginPath();
            ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.closePath();
            var ledCenterX = (ctx.canvas.width / 2);
            var ledCenterY = (ctx.canvas.height / 2);
            var ledGradient = mainCtx.createRadialGradient(ledCenterX, ledCenterY, 0, ledCenterX, ledCenterY, ctx.canvas.width / 2);
            ledGradient.addColorStop(0, color.light.getRgbaColor());
            ledGradient.addColorStop(1, color.dark.getRgbaColor());
            ctx.fillStyle = ledGradient;
            ctx.fill();
            ctx.restore();
        };

        var drawLcdText = function (ctx, value) {

            ctx.save();
            ctx.textAlign = 'right';
            ctx.strokeStyle = lcdColor.textColor;
            ctx.fillStyle = lcdColor.textColor;

            if (lcdColor === steelseries.LcdColor.STANDARD || lcdColor === steelseries.LcdColor.STANDARD_GREEN) {
                ctx.shadowColor = 'gray';
                ctx.shadowOffsetX = imageWidth * 0.007;
                ctx.shadowOffsetY = imageWidth * 0.007;
                ctx.shadowBlur = imageWidth * 0.007;
            }

            if (digitalFont) {
                ctx.font = lcdFont;
            } else {
                ctx.font = stdFont;
            }
            ctx.fillText(value.toFixed(lcdDecimals), lcdPosX + lcdWidth - lcdWidth * 0.05, lcdPosY + lcdHeight * 0.5 + lcdFontHeight * 0.38, lcdWidth * 0.9);

            ctx.restore();
        };

        var drawTickmarksImage = function (ctx, labelNumberFormat) {
            var alpha = rotationOffset,      // Tracks total rotation
                rotationStep = angleStep * minorTickSpacing,
                textRotationAngle,
                fontSize = Math.ceil(imageWidth * 0.04),
                valueCounter = minValue,
                majorTickCounter = maxNoOfMinorTicks - 1,
                TEXT_TRANSLATE_X = imageWidth * 0.28,
                TEXT_WIDTH = imageWidth * 0.1,
                MAX_VALUE_ROUNDED = parseFloat(maxValue.toFixed(2)),
                i;

            backgroundColor.labelColor.setAlpha(1);
            ctx.save();
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = fontSize + 'px ' + stdFontName;
            ctx.strokeStyle = backgroundColor.labelColor.getRgbaColor();
            ctx.fillStyle = backgroundColor.labelColor.getRgbaColor();
            ctx.translate(centerX, centerY);
            ctx.rotate(rotationOffset);

            if (gaugeType.type === 'type1' || gaugeType.type === 'type2') {
                TEXT_WIDTH = imageWidth * 0.0375;
            }

            for (i = minValue; parseFloat(i.toFixed(2)) <= MAX_VALUE_ROUNDED; i += minorTickSpacing) {
                textRotationAngle = + rotationStep + HALF_PI;
                majorTickCounter++;
                // Draw major tickmarks
                if (majorTickCounter === maxNoOfMinorTicks) {
                    ctx.save();
                    ctx.translate(TEXT_TRANSLATE_X, 0);

                    switch (tickLabelOrientation.type) {
                    case 'horizontal':
                        textRotationAngle = -alpha;
                        break;

                    case 'tangent':
                        textRotationAngle = (alpha <= HALF_PI + PI ? PI : 0);
                        break;

                    case 'normal':
                    /* falls through */
                    default:
                        textRotationAngle = HALF_PI;
                        break;
                    }
                    ctx.rotate(textRotationAngle);

                    switch (labelNumberFormat.format) {
                    case 'fractional':
                        ctx.fillText((valueCounter.toFixed(fractionalScaleDecimals)), 0, 0, TEXT_WIDTH);
                        break;

                    case 'scientific':
                        ctx.fillText((valueCounter.toPrecision(2)), 0, 0, TEXT_WIDTH);
                        break;

                    case 'standard':
                    /* falls through */
                    default:
                        ctx.fillText((valueCounter.toFixed(0)), 0, 0, TEXT_WIDTH);
                        break;
                    }
                    ctx.translate(-TEXT_TRANSLATE_X, 0);
                    ctx.restore();

                    valueCounter += majorTickSpacing;
                    majorTickCounter = 0;
                    ctx.rotate(rotationStep);
                    alpha += rotationStep;
                    continue;
                }
                ctx.rotate(rotationStep);
                alpha += rotationStep;
            }

            ctx.translate(-centerX, -centerY);
            ctx.restore();
        };

        var blink = function (blinking) {
            if (blinking) {
                ledTimerId = setInterval(toggleAndRepaintLed, 1000);
            } else {
                clearInterval(ledTimerId);
                ledBuffer = ledBufferOff;
            }
        };

        var blinkUser = function (blinking) {
            if (blinking) {
                userLedTimerId = setInterval(toggleAndRepaintUserLed, 1000);
            } else {
                clearInterval(userLedTimerId);
                userLedBuffer = userLedBufferOff;
            }
        };

        var toggleAndRepaintLed = function () {
            if (ledVisible) {
                if (ledBuffer === ledBufferOn) {
                    ledBuffer = ledBufferOff;
                } else {
                    ledBuffer = ledBufferOn;
                }
                if (!repainting) {
                    repainting = true;
                    requestAnimFrame(self.repaint);
                }
            }
        };

        var toggleAndRepaintUserLed = function () {
            if (userLedVisible) {
                if (userLedBuffer === userLedBufferOn) {
                    userLedBuffer = userLedBufferOff;
                } else {
                    userLedBuffer = userLedBufferOn;
                }
                if (!repainting) {
                    repainting = true;
                    requestAnimFrame(self.repaint);
                }
            }
        };

        //********************************* Public methods *********************************
        this.setValue = function (newValue) {
            newValue = parseFloat(newValue);
            var targetValue = (newValue < minValue ? minValue : (newValue > maxValue ? maxValue : newValue));
            if (value !== targetValue) {
                value = targetValue;
                if ((value >= threshold && !ledBlinking && thresholdRising) ||
                    (value <= threshold && !ledBlinking && !thresholdRising)) {
                    ledBlinking = true;
                    blink(ledBlinking);
                    if (playAlarm) {
                        audioElement.play();
                    }
                } else if ((value < threshold && ledBlinking && thresholdRising) ||
                           (value > threshold && ledBlinking && !thresholdRising)) {
                    ledBlinking = false;
                    blink(ledBlinking);
                    if (playAlarm) {
                        audioElement.pause();
                    }
                }
                this.repaint();
            }
            return this;
        };

        this.getValue = function () {
            return value;
        };

        this.setValueAnimated = function (newValue, callback) {
            newValue = parseFloat(newValue);
            var targetValue = (newValue < minValue ? minValue : (newValue > maxValue ? maxValue : newValue)),
                gauge = this,
                time;

            if (value !== targetValue) {
                if (undefined !== tween && tween.isPlaying) {
                    tween.stop();
                }

                time = fullScaleDeflectionTime * Math.abs(targetValue - value) / (maxValue - minValue);
                time = Math.max(time, fullScaleDeflectionTime / 5);
                tween = new Tween({}, '', Tween.regularEaseInOut, value, targetValue, time);
                //tween = new Tween({}, '', Tween.regularEaseInOut, value, targetValue, 1);
                //tween = new Tween(new Object(), '', Tween.strongEaseInOut, this.value, targetValue, 1);
                tween.onMotionChanged = function (event) {
                    value = event.target._pos;

                    if ((value >= threshold && !ledBlinking && thresholdRising) ||
                        (value <= threshold && !ledBlinking && !thresholdRising)) {
                        ledBlinking = true;
                        blink(ledBlinking);
                        if (playAlarm) {
                            audioElement.play();
                        }
                    } else if ((value < threshold && ledBlinking && thresholdRising) ||
                               (value > threshold && ledBlinking && !thresholdRising)) {
                        ledBlinking = false;
                        blink(ledBlinking);
                        if (playAlarm) {
                            audioElement.pause();
                        }
                    }
                    if (!repainting) {
                        repainting = true;
                        requestAnimFrame(gauge.repaint);
                    }
                };

                // do we have a callback function to process?
                if (callback && typeof(callback) === "function") {
                    tween.onMotionFinished = callback;
                }

                tween.start();
            }
            return this;
        };

        this.setFrameDesign = function (newFrameDesign) {
            resetBuffers({frame: true});
            frameDesign = newFrameDesign;
            init({frame: true});
            this.repaint();
            return this;
        };

        this.setBackgroundColor = function (newBackgroundColor) {
            resetBuffers({background: true,
                          led: true});
            backgroundColor = newBackgroundColor;
            init({background: true,
                  led: true});
            this.repaint();
            return this;
        };

        this.setForegroundType = function (newForegroundType) {
            resetBuffers({foreground: true});
            foregroundType = newForegroundType;
            init({foreground: true});
            this.repaint();
            return this;
        };

        this.setValueColor = function (newValueColor) {
            resetBuffers({value: true});
            valueColor = newValueColor;
            init({value: true});
            this.repaint();
            return this;
        };

        this.setLedColor = function (newLedColor) {
            resetBuffers({led: true});
            ledColor = newLedColor;
            init({led: true});
            this.repaint();
            return this;
        };

        this.setUserLedColor = function (newLedColor) {
            resetBuffers({userLed: true});
            userLedColor = newLedColor;
            init({userLed: true});
            this.repaint();
            return this;
        };

        this.toggleUserLed = function () {
            if (userLedBuffer === userLedBufferOn) {
                userLedBuffer = userLedBufferOff;
            } else {
                userLedBuffer = userLedBufferOn;
            }
            this.repaint();
            return this;
        };

        this.setUserLedOnOff = function (on) {
            if (true === on) {
                userLedBuffer = userLedBufferOn;
            } else {
                userLedBuffer = userLedBufferOff;
            }
            this.repaint();
            return this;
        };

        this.blinkUserLed = function (blink) {
            if (blink) {
                if (!userLedBlinking) {
                    blinkUser(true);
                    userLedBlinking = true;
                }
            } else {
                if (userLedBlinking) {
                    clearInterval(userLedTimerId);
                    userLedBlinking = false;
                }
            }
            return this;
        };

        this.setLedVisible = function (visible) {
            ledVisible = !!visible;
            this.repaint();
            return this;
        };

        this.setUserLedVisible = function (visible) {
            userLedVisible = !!visible;
            this.repaint();
            return this;
        };

        this.setLcdColor = function (newLcdColor) {
            lcdColor = newLcdColor;
            resetBuffers({background: true});
            init({background: true});
            this.repaint();
            return this;
        };

        this.setLcdDecimals = function (decimals) {
            lcdDecimals = parseInt(decimals, 10);
            this.repaint();
            return this;
        };

        this.setSection = function (areaSec) {
            section = areaSec;
            init();
            this.repaint();
            return this;
        };

        this.setSectionActive = function (value) {
            useSectionColors = value;
            init();
            this.repaint();
            return this;
        };

        this.setGradient = function (grad) {
            valueGradient = grad;
            init();
            this.repaint();
            return this;
        };

        this.setGradientActive = function (value) {
            useValueGradient = value;
            init();
            this.repaint();
            return this;
        };

        this.setMinValue = function (value) {
            minValue = value;
            resetBuffers({background: true});
            init({background: true});
            this.repaint();
            return this;
        };

        this.getMinValue = function () {
            return minValue;
        };

        this.setMaxValue = function (value) {
            maxValue = value;
            resetBuffers({background: true});
            init({background: true});
            this.repaint();
            return this;
        };

        this.getMaxValue = function () {
            return maxValue;
        };

        this.setThreshold = function (newValue) {
            newValue = parseFloat(newValue);
            var targetValue = newValue < minValue ? minValue : (newValue > maxValue ? maxValue : newValue);
            threshold = targetValue;
            resetBuffers({background: true});
            init({background: true});
            this.repaint();
            return this;
        };

        this.setThresholdRising = function (rising) {
            thresholdRising = !!rising;
            // reset existing threshold alerts
            ledBlinking = !ledBlinking;
            blink(ledBlinking);
            this.repaint();
            return this;
        };

        this.setTitleString = function (title) {
            titleString = title;
            resetBuffers({background: true});
            init({background: true});
            this.repaint();
            return this;
        };

        this.setUnitString = function (unit) {
            unitString = unit;
            resetBuffers({background: true});
            init({background: true});
            this.repaint();
            return this;
        };

        this.setTrend = function (newValue) {
            trendIndicator = newValue;
            this.repaint();
            return this;
        };

        this.setTrendVisible = function (visible) {
            trendVisible = !!visible;
            this.repaint();
            return this;
        };

        this.setFractionalScaleDecimals = function (decimals) {
            fractionalScaleDecimals = parseInt(decimals, 10);
            resetBuffers({background: true});
            init({background: true});
            this.repaint();
        };

        this.setLabelNumberFormat = function (format) {
            labelNumberFormat = format;
            resetBuffers({background: true});
            init({background: true});
            this.repaint();
            return this;
        };

        this.repaint = function () {
            var activeLedAngle = ((value - minValue) / (maxValue - minValue)) * degAngleRange,
                activeLedColor,
                lastActiveLedColor = valueColor,
                angle, i,
                currentValue,
                gradRange,
                fraction;

            if (!initialized) {
                init({frame: true,
                      background: true,
                      led: true,
                      userLed: true,
                      value: true,
                      trend: true,
                      foreground: true});
            }

            mainCtx.clearRect(0, 0, size, size);

            // Draw frame image
            if (frameVisible) {
                mainCtx.drawImage(frameBuffer, 0, 0);
            }

            // Draw buffered image to visible canvas
            mainCtx.drawImage(backgroundBuffer, 0, 0);

            // Draw active leds
            for (angle = 0; angle <= activeLedAngle; angle += 5) {
                //check for LED color
                activeLedColor = valueColor;
                // Use a gradient for value colors?
                if (isGradientVisible) {
                    // Convert angle back to value
                    currentValue = minValue + (angle / degAngleRange) * (maxValue - minValue);
                    gradRange = valueGradient.getEnd() - valueGradient.getStart();
                    fraction = currentValue / gradRange;
                    fraction = Math.max(Math.min(fraction, 1), 0);
                    activeLedColor = customColorDef(valueGradient.getColorAt(fraction).getRgbaColor());
                } else if (isSectionsVisible) {
                    for (i = 0; i < sectionAngles.length; i++) {
                        if (angle >= sectionAngles[i].start && angle < sectionAngles[i].stop) {
                            activeLedColor = sectionAngles[i].color;
                            break;
                        }
                    }
                }
                // Has LED color changed? If so redraw the buffer
                if (lastActiveLedColor.medium.getHexColor() !== activeLedColor.medium.getHexColor()) {
                    drawActiveLed(activeLedContext, activeLedColor);
                    lastActiveLedColor = activeLedColor;
                }
                mainCtx.save();
                mainCtx.translate(centerX, centerY);
                mainCtx.rotate((angle * RAD_FACTOR) + bargraphOffset);
                mainCtx.translate(-centerX, -centerY);
                mainCtx.drawImage(activeLedBuffer, ACTIVE_LED_POS_X, ACTIVE_LED_POS_Y);
                mainCtx.restore();
            }

            // Draw lcd display
            if (lcdVisible) {
                drawLcdText(mainCtx, value);
            }

            // Draw led
            if (ledVisible) {
                mainCtx.drawImage(ledBuffer, LED_POS_X, LED_POS_Y);
            }

            // Draw user led
            if (userLedVisible) {
                mainCtx.drawImage(userLedBuffer, USER_LED_POS_X, USER_LED_POS_Y);
            }

            // Draw the trend indicator
            if (trendVisible) {
                switch (trendIndicator.state) {
                case 'up':
                    mainCtx.drawImage(trendUpBuffer, trendPosX, trendPosY);
                    break;
                case 'steady':
                    mainCtx.drawImage(trendSteadyBuffer, trendPosX, trendPosY);
                    break;
                case 'down':
                    mainCtx.drawImage(trendDownBuffer, trendPosX, trendPosY);
                    break;
                case 'off':
                    mainCtx.drawImage(trendOffBuffer, trendPosX, trendPosY);
                    break;
                }
            }

            // Draw foreground
            if (foregroundVisible) {
                mainCtx.drawImage(foregroundBuffer, 0, 0);
            }

            repainting = false;
        };

        // Visualize the component
        this.repaint();

        return this;
    };

    var radialVertical = function (canvas, parameters) {
        parameters = parameters || {};
        var orientation = (undefined === parameters.orientation ? steelseries.Orientation.NORTH : parameters.orientation),
            size = (undefined === parameters.size ? 0 : parameters.size),
            minValue = (undefined === parameters.minValue ? 0 : parameters.minValue),
            maxValue = (undefined === parameters.maxValue ? (minValue + 100) : parameters.maxValue),
            niceScale = (undefined === parameters.niceScale ? true : parameters.niceScale),
            threshold = (undefined === parameters.threshold ? (maxValue - minValue) / 2 + minValue: parameters.threshold),
            section = (undefined === parameters.section ? null : parameters.section),
            area = (undefined === parameters.area ? null : parameters.area),
            titleString = (undefined === parameters.titleString ? '' : parameters.titleString),
            unitString = (undefined === parameters.unitString ? '' : parameters.unitString),
            frameDesign = (undefined === parameters.frameDesign ? steelseries.FrameDesign.METAL : parameters.frameDesign),
            frameVisible = (undefined === parameters.frameVisible ? true : parameters.frameVisible),
            backgroundColor = (undefined === parameters.backgroundColor ? steelseries.BackgroundColor.DARK_GRAY : parameters.backgroundColor),
            backgroundVisible = (undefined === parameters.backgroundVisible ? true : parameters.backgroundVisible),
            pointerType = (undefined === parameters.pointerType ? steelseries.PointerType.TYPE1 : parameters.pointerType),
            pointerColor = (undefined === parameters.pointerColor ? steelseries.ColorDef.RED : parameters.pointerColor),
            knobType = (undefined === parameters.knobType ? steelseries.KnobType.STANDARD_KNOB : parameters.knobType),
            knobStyle = (undefined === parameters.knobStyle ? steelseries.KnobStyle.SILVER : parameters.knobStyle),
            ledColor = (undefined === parameters.ledColor ? steelseries.LedColor.RED_LED : parameters.ledColor),
            ledVisible = (undefined === parameters.ledVisible ? true : parameters.ledVisible),
            thresholdVisible = (undefined === parameters.thresholdVisible ? true : parameters.thresholdVisible),
            thresholdRising = (undefined === parameters.thresholdRising ? true : parameters.thresholdRising),
            minMeasuredValueVisible = (undefined === parameters.minMeasuredValueVisible ? false : parameters.minMeasuredValueVisible),
            maxMeasuredValueVisible = (undefined === parameters.maxMeasuredValueVisible ? false : parameters.maxMeasuredValueVisible),
            foregroundType = (undefined === parameters.foregroundType ? steelseries.ForegroundType.TYPE1 : parameters.foregroundType),
            foregroundVisible = (undefined === parameters.foregroundVisible ? true : parameters.foregroundVisible),
            labelNumberFormat = (undefined === parameters.labelNumberFormat ? steelseries.LabelNumberFormat.STANDARD : parameters.labelNumberFormat),
            playAlarm = (undefined === parameters.playAlarm ? false : parameters.playAlarm),
            alarmSound = (undefined === parameters.alarmSound ? false : parameters.alarmSound),
            fullScaleDeflectionTime = (undefined === parameters.fullScaleDeflectionTime ? 2.5 : parameters.fullScaleDeflectionTime);

        // Get the canvas context and clear it
        var mainCtx = getCanvasContext(canvas);
        // Has a size been specified?
        if (size === 0) {
            size = Math.min(mainCtx.canvas.width, mainCtx.canvas.height);
        }

        // Set the size - also clears the canvas
        mainCtx.canvas.width = size;
        mainCtx.canvas.height = size;

        // Create audio tag for alarm sound
        if (playAlarm && alarmSound !== false) {
            var audioElement = doc.createElement('audio');
            audioElement.setAttribute('src', alarmSound);
            audioElement.setAttribute('preload', 'auto');
        }
        var gaugeType = steelseries.GaugeType.TYPE5;

        var self = this;
        var value = minValue;

        // Properties
        var minMeasuredValue = maxValue;
        var maxMeasuredValue = minValue;
        var imageWidth = size;
        var imageHeight = size;

        var ledBlinking = false;

        var ledTimerId = 0;
        var tween;
        var repainting = false;

        // Tickmark specific private variables
        var niceMinValue = minValue;
        var niceMaxValue = maxValue;
        var niceRange = maxValue - minValue;
        var range = niceMaxValue - niceMinValue;
        var minorTickSpacing = 0;
        var majorTickSpacing = 0;
        var maxNoOfMinorTicks = 10;
        var maxNoOfMajorTicks = 10;

        var freeAreaAngle = 0;
        var rotationOffset = 1.25 * PI;
        var tickmarkOffset = 1.25 * PI;
        var angleRange = HALF_PI;
        var angleStep = angleRange / range;
        var shadowOffset = imageWidth * 0.006;
        var pointerOffset = imageWidth * 1.17 / 2;

        var initialized = false;

        var angle = rotationOffset + (value - minValue) * angleStep;

        var centerX = imageWidth / 2;
        var centerY = imageHeight * 0.733644;

        // Misc
        var ledPosX = 0.455 * imageWidth;
        var ledPosY = 0.51 * imageHeight;

        // Method to calculate nice values for min, max and range for the tickmarks
        var calculate = function calculate() {
            if (niceScale) {
                niceRange = calcNiceNumber(maxValue - minValue, false);
                majorTickSpacing = calcNiceNumber(niceRange / (maxNoOfMajorTicks - 1), true);
                niceMinValue = Math.floor(minValue / majorTickSpacing) * majorTickSpacing;
                niceMaxValue = Math.ceil(maxValue / majorTickSpacing) * majorTickSpacing;
                minorTickSpacing = calcNiceNumber(majorTickSpacing / (maxNoOfMinorTicks - 1), true);
                minValue = niceMinValue;
                maxValue = niceMaxValue;
                range = maxValue - minValue;
            }
            else {
                niceRange = (maxValue - minValue);
                niceMinValue = minValue;
                niceMaxValue = maxValue;
                range = niceRange;
                minorTickSpacing = 1;
                majorTickSpacing = 10;
            }

            freeAreaAngle = 0;
            rotationOffset = 1.25 * PI;
            tickmarkOffset = 1.25 * PI;
            angleRange = HALF_PI;
            angleStep = angleRange / range;

            angle = rotationOffset + (value - minValue) * angleStep;
        };

        // **************   Buffer creation  ********************
        // Buffer for the frame
        var frameBuffer = createBuffer(size, size);
        var frameContext = frameBuffer.getContext('2d');

        // Buffer for the background
        var backgroundBuffer = createBuffer(size, size);
        var backgroundContext = backgroundBuffer.getContext('2d');

        // Buffer for led on painting code
        var ledBufferOn = createBuffer(size * 0.093457, size * 0.093457);
        var ledContextOn = ledBufferOn.getContext('2d');

        // Buffer for led off painting code
        var ledBufferOff = createBuffer(size * 0.093457, size * 0.093457);
        var ledContextOff = ledBufferOff.getContext('2d');

        // Buffer for current led painting code
        var ledBuffer = ledBufferOff;

        // Buffer for the minMeasuredValue indicator
        var minMeasuredValueBuffer = createBuffer(Math.ceil(size * 0.028037), Math.ceil(size * 0.028037));
        var minMeasuredValueCtx = minMeasuredValueBuffer.getContext('2d');

        // Buffer for the maxMeasuredValue indicator
        var maxMeasuredValueBuffer = createBuffer(Math.ceil(size * 0.028037), Math.ceil(size * 0.028037));
        var maxMeasuredValueCtx = maxMeasuredValueBuffer.getContext('2d');

        // Buffer for pointer image painting code
        var pointerBuffer = createBuffer(size, size);
        var pointerContext = pointerBuffer.getContext('2d');

        // Buffer for static foreground painting code
        var foregroundBuffer = createBuffer(size, size);
        var foregroundContext = foregroundBuffer.getContext('2d');

        // **************   Image creation  ********************
        var drawPostsImage = function (ctx) {
            if ('type5' === gaugeType.type) {
                ctx.save();
                if (orientation.type === 'west') {
                    // Min post
                    ctx.drawImage(createKnobImage(Math.ceil(imageHeight * 0.037383), steelseries.KnobType.STANDARD_KNOB, knobStyle), imageWidth * 0.44, imageHeight * 0.80);
                    // Max post
                    ctx.drawImage(createKnobImage(Math.ceil(imageHeight * 0.037383), steelseries.KnobType.STANDARD_KNOB, knobStyle), imageWidth * 0.44, imageHeight * 0.16);
                } else if (orientation.type === 'east') {
                    // Min post
                    ctx.drawImage(createKnobImage(Math.ceil(imageHeight * 0.037383), steelseries.KnobType.STANDARD_KNOB, knobStyle), imageWidth * 0.52, imageHeight * 0.80);
                    // Max post
                    ctx.drawImage(createKnobImage(Math.ceil(imageHeight * 0.037383), steelseries.KnobType.STANDARD_KNOB, knobStyle), imageWidth * 0.52, imageHeight * 0.16);
                } else {
                    // Min post
                    ctx.drawImage(createKnobImage(Math.ceil(imageHeight * 0.037383), steelseries.KnobType.STANDARD_KNOB, knobStyle), imageWidth * 0.2 - imageHeight * 0.037383, imageHeight * 0.446666);
                    // Max post
                    ctx.drawImage(createKnobImage(Math.ceil(imageHeight * 0.037383), steelseries.KnobType.STANDARD_KNOB, knobStyle), imageWidth * 0.8, imageHeight * 0.446666);
                }
                ctx.restore();
            }
        };

        var createThresholdImage = function () {
            var thresholdBuffer = doc.createElement('canvas');
            thresholdBuffer.width = Math.ceil(size * 0.046728);
            thresholdBuffer.height = Math.ceil(thresholdBuffer.width * 0.9);
            var thresholdCtx = thresholdBuffer.getContext('2d');

            thresholdCtx.save();
            var gradThreshold = thresholdCtx.createLinearGradient(0, 0.1, 0, thresholdBuffer.height * 0.9);
            gradThreshold.addColorStop(0, '#520000');
            gradThreshold.addColorStop(0.3, '#fc1d00');
            gradThreshold.addColorStop(0.59, '#fc1d00');
            gradThreshold.addColorStop(1, '#520000');
            thresholdCtx.fillStyle = gradThreshold;

            thresholdCtx.beginPath();
            thresholdCtx.moveTo(thresholdBuffer.width * 0.5, 0.1);
            thresholdCtx.lineTo(thresholdBuffer.width * 0.9, thresholdBuffer.height * 0.9);
            thresholdCtx.lineTo(thresholdBuffer.width * 0.1, thresholdBuffer.height * 0.9);
            thresholdCtx.lineTo(thresholdBuffer.width * 0.5, 0.1);
            thresholdCtx.closePath();

            thresholdCtx.fill();
            thresholdCtx.strokeStyle = '#FFFFFF';
            thresholdCtx.stroke();

            thresholdCtx.restore();

            return thresholdBuffer;
        };

        var drawAreaSectionImage = function (ctx, start, stop, color, filled) {
            ctx.save();
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.lineWidth = imageWidth * 0.035;
            var startAngle = (angleRange / range * start - angleRange / range * minValue);
            var stopAngle = startAngle + (stop - start) / (range / angleRange);
            ctx.translate(centerX, centerY);
            ctx.rotate(rotationOffset);
            ctx.beginPath();
            if (filled) {
                ctx.moveTo(0, 0);
                ctx.arc(0, 0, imageWidth * 0.365 - ctx.lineWidth / 2, startAngle, stopAngle, false);
            } else {
                ctx.arc(0, 0, imageWidth * 0.365, startAngle, stopAngle, false);
            }
            if (filled) {
                ctx.moveTo(0, 0);
                ctx.fill();
            } else {
                ctx.stroke();
            }

            ctx.translate(-centerX, -centerY);
            ctx.restore();
        };

        var drawTitleImage = function (ctx) {
            var titleWidth, unitWidth;
            ctx.save();
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.strokeStyle = backgroundColor.labelColor.getRgbaColor();
            ctx.fillStyle = backgroundColor.labelColor.getRgbaColor();

            ctx.font = 0.046728 * imageWidth + 'px ' + stdFontName;
            titleWidth = ctx.measureText(titleString).width;
            ctx.fillText(titleString, (imageWidth - titleWidth) / 2, imageHeight * 0.4, imageWidth * 0.3);
            unitWidth = ctx.measureText(unitString).width;
            ctx.fillText(unitString, (imageWidth - unitWidth) / 2, imageHeight * 0.47, imageWidth * 0.2);

            ctx.restore();
        };

        var drawTickmarksImage = function (ctx, labelNumberFormat) {
            backgroundColor.labelColor.setAlpha(1);
            ctx.save();

            if (steelseries.Orientation.WEST === orientation) {
                ctx.translate(centerX, centerX);
                ctx.rotate(-HALF_PI);
                ctx.translate(-centerX, -centerX);
            }
            if (steelseries.Orientation.EAST === orientation) {
                ctx.translate(centerX, centerX);
                ctx.rotate(HALF_PI);
                ctx.translate(-centerX, -centerX);
            }

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            var fontSize = Math.ceil(imageWidth * 0.04);
            ctx.font = fontSize + 'px ' + stdFontName;
            ctx.strokeStyle = backgroundColor.labelColor.getRgbaColor();
            ctx.fillStyle = backgroundColor.labelColor.getRgbaColor();
            ctx.translate(centerX, centerY);
            ctx.rotate(rotationOffset);
            var rotationStep = angleStep * minorTickSpacing;
            var textRotationAngle;

            var valueCounter = minValue;
            var majorTickCounter = maxNoOfMinorTicks - 1;

            var OUTER_POINT = imageWidth * 0.44;
            var MAJOR_INNER_POINT = imageWidth * 0.41;
            var MED_INNER_POINT = imageWidth * 0.415;
            var MINOR_INNER_POINT = imageWidth * 0.42;
            var TEXT_TRANSLATE_X = imageWidth * 0.48;
            var TEXT_WIDTH = imageWidth * 0.04;
            var HALF_MAX_NO_OF_MINOR_TICKS = maxNoOfMinorTicks / 2;
            var MAX_VALUE_ROUNDED = parseFloat(maxValue.toFixed(2));
            var i;

            for (i = minValue; parseFloat(i.toFixed(2)) <= MAX_VALUE_ROUNDED; i += minorTickSpacing) {
                textRotationAngle = + rotationStep + HALF_PI;
                majorTickCounter++;
                // Draw major tickmarks
                if (majorTickCounter === maxNoOfMinorTicks) {
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.moveTo(OUTER_POINT, 0);
                    ctx.lineTo(MAJOR_INNER_POINT, 0);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.save();
                    ctx.translate(TEXT_TRANSLATE_X, 0);
                    ctx.rotate(textRotationAngle);
                    switch (labelNumberFormat.format) {
                    case 'fractional':
                        ctx.fillText((valueCounter.toFixed(2)), 0, 0, TEXT_WIDTH);
                        break;

                    case 'scientific':
                        ctx.fillText((valueCounter.toPrecision(2)), 0, 0, TEXT_WIDTH);
                        break;

                    case 'standard':
                    /* falls through */
                    default:
                        ctx.fillText((valueCounter.toFixed(0)), 0, 0, TEXT_WIDTH);
                        break;
                    }
                    ctx.translate(-TEXT_TRANSLATE_X, 0);
                    ctx.restore();

                    valueCounter += majorTickSpacing;
                    majorTickCounter = 0;
                    ctx.rotate(rotationStep);
                    continue;
                }

                // Draw tickmark every minor tickmark spacing
                if (0 === maxNoOfMinorTicks % 2 && majorTickCounter === (HALF_MAX_NO_OF_MINOR_TICKS)) {
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(OUTER_POINT, 0);
                    ctx.lineTo(MED_INNER_POINT, 0);
                    ctx.closePath();
                    ctx.stroke();
                } else {
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(OUTER_POINT, 0);
                    ctx.lineTo(MINOR_INNER_POINT, 0);
                    ctx.closePath();
                    ctx.stroke();
                }
                ctx.rotate(rotationStep);
            }

            /*
             // Logarithmic scale
             var tmp = 0.1;
             var minValueLog10 = 0.1;
             var maxValueLog10 = parseInt(Math.pow(10, Math.ceil(Math.log10(maxValue))));
             var drawLabel = true;
             angleStep = angleRange / (maxValueLog10 - minValueLog10)
             for (var scaleFactor = minValueLog10 ; scaleFactor <= maxValueLog10 ; scaleFactor *= 10)
             {
             for (var i = parseFloat((1 * scaleFactor).toFixed(1)) ; i < parseFloat((10 * scaleFactor).toFixed(1)) ; i += scaleFactor)
             {
             textRotationAngle =+ rotationStep + HALF_PI;

             if(drawLabel)
             {
             ctx.lineWidth = 1.5;
             ctx.beginPath();
             ctx.moveTo(imageWidth * 0.38,0);
             ctx.lineTo(imageWidth * 0.35,0);
             ctx.closePath();
             ctx.stroke();
             ctx.save();
             ctx.translate(imageWidth * 0.31, 0);
             ctx.rotate(textRotationAngle);
             ctx.fillText(parseFloat((i).toFixed(1)), 0, 0, imageWidth * 0.0375);
             ctx.translate(-imageWidth * 0.31, 0);
             ctx.restore();
             drawLabel = false;
             }
             else
             {
             ctx.lineWidth = 0.5;
             ctx.beginPath();
             ctx.moveTo(imageWidth * 0.38,0);
             ctx.lineTo(imageWidth * 0.36,0);
             ctx.closePath();
             ctx.stroke();
             }
             //doc.write('log10 scale value: ' + parseFloat((i).toFixed(1)) + '<br>');
             //Math.log10(parseFloat((i).toFixed(1)));

             ctx.rotate(rotationStep);
             }
             tmp = 0.1;
             drawLabel = true;
             }
             */

            ctx.translate(-centerX, -centerY);
            ctx.restore();
        };

        // **************   Initialization  ********************
        // Draw all static painting code to background
        var init = function (parameters) {
            parameters = parameters || {};
            var drawFrame = (undefined === parameters.frame ? false : parameters.frame);
            var drawBackground = (undefined === parameters.background ? false : parameters.background);
            var drawLed = (undefined === parameters.led ? false : parameters.led);
            var drawPointer = (undefined === parameters.pointer ? false : parameters.pointer);
            var drawForeground = (undefined === parameters.foreground ? false : parameters.foreground);

            initialized = true;

            // Calculate the current min and max values and the range
            calculate();

            // Create frame in frame buffer (backgroundBuffer)
            if (drawFrame && frameVisible) {
                drawRadialFrameImage(frameContext, frameDesign, centerX, size / 2, imageWidth, imageHeight);
            }

            // Create background in background buffer (backgroundBuffer)
            if (drawBackground && backgroundVisible) {
                drawRadialBackgroundImage(backgroundContext, backgroundColor, centerX, size / 2, imageWidth, imageHeight);
            }

            // Draw LED ON in ledBuffer_ON
            if (drawLed) {
                ledContextOn.drawImage(createLedImage(Math.ceil(size * 0.093457), 1, ledColor), 0, 0);

                // Draw LED ON in ledBuffer_OFF
                ledContextOff.drawImage(createLedImage(Math.ceil(size * 0.093457), 0, ledColor), 0, 0);
            }

            // Draw min measured value indicator in minMeasuredValueBuffer
            if (minMeasuredValueVisible) {
                minMeasuredValueCtx.drawImage(createMeasuredValueImage(Math.ceil(size * 0.028037), steelseries.ColorDef.BLUE.dark.getRgbaColor(), true, true), 0, 0);
                minMeasuredValueCtx.restore();
            }

            // Draw max measured value indicator in maxMeasuredValueBuffer
            if (maxMeasuredValueVisible) {
                maxMeasuredValueCtx.drawImage(createMeasuredValueImage(Math.ceil(size * 0.028037), steelseries.ColorDef.RED.medium.getRgbaColor(), true), 0, 0);
                maxMeasuredValueCtx.restore();
            }

            // Create alignment posts in background buffer (backgroundBuffer)
            if (drawBackground && backgroundVisible) {
                drawPostsImage(backgroundContext);

                // Create section in background buffer (backgroundBuffer)
                if (null !== section && 0 < section.length) {
                    backgroundContext.save();
                    if (steelseries.Orientation.WEST === orientation) {
                        backgroundContext.translate(centerX, centerX);
                        backgroundContext.rotate(-HALF_PI);
                        backgroundContext.translate(-centerX, -centerX);
                    } else if (steelseries.Orientation.EAST === orientation) {
                        backgroundContext.translate(centerX, centerX);
                        backgroundContext.rotate(HALF_PI);
                        backgroundContext.translate(-centerX, -centerX);
                    }
                    var sectionIndex = section.length;
                    do {
                        sectionIndex--;
                        drawAreaSectionImage(backgroundContext, section[sectionIndex].start, section[sectionIndex].stop, section[sectionIndex].color, false);
                    }
                    while (0 < sectionIndex);
                    backgroundContext.restore();
                }

                // Create area in background buffer (backgroundBuffer)
                if (null !== area && 0 < area.length) {
                    if (steelseries.Orientation.WEST === orientation) {
                        backgroundContext.translate(centerX, centerX);
                        backgroundContext.rotate(-HALF_PI);
                        backgroundContext.translate(-centerX, -centerX);
                    }
                    if (steelseries.Orientation.EAST === orientation) {
                        backgroundContext.translate(centerX, centerX);
                        backgroundContext.rotate(HALF_PI);
                        backgroundContext.translate(-centerX, -centerX);
                    }
                    var areaIndex = area.length;
                    do {
                        areaIndex--;
                        drawAreaSectionImage(backgroundContext, area[areaIndex].start, area[areaIndex].stop, area[areaIndex].color, true);
                    }
                    while (0 < areaIndex);
                    backgroundContext.restore();
                }

                // Create tickmarks in background buffer (backgroundBuffer)
                drawTickmarksImage(backgroundContext, labelNumberFormat);

                // Create title in background buffer (backgroundBuffer)
                drawTitleImage(backgroundContext);
            }

            // Draw threshold image to background context
            if (thresholdVisible) {
                backgroundContext.save();
                if (steelseries.Orientation.WEST === orientation) {
                    backgroundContext.translate(centerX, centerX);
                    backgroundContext.rotate(-HALF_PI);
                    backgroundContext.translate(-centerX, -centerX);
                }
                if (steelseries.Orientation.EAST === orientation) {
                    backgroundContext.translate(centerX, centerX);
                    backgroundContext.rotate(HALF_PI);
                    backgroundContext.translate(-centerX, -centerX);
                }
                backgroundContext.translate(centerX, centerY);
                backgroundContext.rotate(rotationOffset + (threshold - minValue) * angleStep + HALF_PI);
                backgroundContext.translate(-centerX, -centerY);
                backgroundContext.drawImage(createThresholdImage(), imageWidth * 0.475, imageHeight * 0.32);
                backgroundContext.restore();
            }

            // Create pointer image in pointer buffer (contentBuffer)
            if (drawPointer) {
                drawPointerImage(pointerContext, imageWidth * 1.17, pointerType, pointerColor, backgroundColor.labelColor);

            }

            // Create foreground in foreground buffer (foregroundBuffer)
            if (drawForeground && foregroundVisible) {
                var knobVisible = (pointerType.type === 'type15' || pointerType.type === 'type16' ? false : true);
                drawRadialForegroundImage(foregroundContext, foregroundType, imageWidth, imageHeight, knobVisible, knobType, knobStyle, gaugeType, orientation);
            }
        };

        var resetBuffers = function (buffers) {
            buffers = buffers || {};
            var resetFrame = (undefined === buffers.frame ? false : buffers.frame);
            var resetBackground = (undefined === buffers.background ? false : buffers.background);
            var resetLed = (undefined === buffers.led ? false : buffers.led);
            var resetPointer = (undefined === buffers.pointer ? false : buffers.pointer);
            var resetForeground = (undefined === buffers.foreground ? false : buffers.foreground);

            if (resetFrame) {
                frameBuffer.width = size;
                frameBuffer.height = size;
                frameContext = frameBuffer.getContext('2d');
            }

            if (resetBackground) {
                backgroundBuffer.width = size;
                backgroundBuffer.height = size;
                backgroundContext = backgroundBuffer.getContext('2d');
            }

            if (resetLed) {
                ledBufferOn.width = Math.ceil(size * 0.093457);
                ledBufferOn.height = Math.ceil(size * 0.093457);
                ledContextOn = ledBufferOn.getContext('2d');

                ledBufferOff.width = Math.ceil(size * 0.093457);
                ledBufferOff.height = Math.ceil(size * 0.093457);
                ledContextOff = ledBufferOff.getContext('2d');

                // Buffer for current led painting code
                ledBuffer = ledBufferOff;
            }

            if (resetPointer) {
                pointerBuffer.width = size;
                pointerBuffer.height = size;
                pointerContext = pointerBuffer.getContext('2d');
            }

            if (resetForeground) {
                foregroundBuffer.width = size;
                foregroundBuffer.height = size;
                foregroundContext = foregroundBuffer.getContext('2d');
            }
        };

        var blink = function (blinking) {
            if (blinking) {
                ledTimerId = setInterval(toggleAndRepaintLed, 1000);
            } else {
                clearInterval(ledTimerId);
                ledBuffer = ledBufferOff;
            }
        };

        var toggleAndRepaintLed = function () {
            if (ledVisible) {
                if (ledBuffer === ledBufferOn) {
                    ledBuffer = ledBufferOff;
                } else {
                    ledBuffer = ledBufferOn;
                }
                if (!repainting) {
                    repainting = true;
                    requestAnimFrame(self.repaint);
                }
            }
        };

        //************************************ Public methods **************************************
        this.setValue = function (newValue) {
            newValue = parseFloat(newValue);
            var targetValue = (newValue < minValue ? minValue : (newValue > maxValue ? maxValue : newValue));
            if (value !== targetValue) {
                value = targetValue;

                if (value > maxMeasuredValue) {
                    maxMeasuredValue = value;
                }
                if (value < minMeasuredValue) {
                    minMeasuredValue = value;
                }

                if ((value >= threshold && !ledBlinking && thresholdRising) ||
                    (value <= threshold && !ledBlinking && !thresholdRising)) {
                    ledBlinking = true;
                    blink(ledBlinking);
                    if (playAlarm) {
                        audioElement.play();
                    }
                } else if ((value < threshold && ledBlinking && thresholdRising) ||
                           (value > threshold && ledBlinking && !thresholdRising)) {
                    ledBlinking = false;
                    blink(ledBlinking);
                    if (playAlarm) {
                        audioElement.pause();
                    }
                }

                this.repaint();
            }
            return this;
        };

        this.getValue = function () {
            return value;
        };

        this.setValueAnimated = function (newValue, callback) {
            newValue = parseFloat(newValue);
            var targetValue = (newValue < minValue ? minValue : (newValue > maxValue ? maxValue : newValue)),
                gauge = this,
                time;

            if (value !== targetValue) {
                if (undefined !==  tween && tween.isPlaying) {
                    tween.stop();
                }

                time = fullScaleDeflectionTime * Math.abs(targetValue - value) / (maxValue - minValue);
                time = Math.max(time, fullScaleDeflectionTime / 5);
                tween = new Tween({}, '', Tween.regularEaseInOut, value, targetValue, time);
                //tween = new Tween({}, '', Tween.regularEaseInOut, value, targetValue, 1);
                //tween = new Tween(new Object(), '', Tween.strongEaseInOut, value, targetValue, 1);
                tween.onMotionChanged = function (event) {
                    value = event.target._pos;

                    if ((value >= threshold && !ledBlinking && thresholdRising) ||
                        (value <= threshold && !ledBlinking && !thresholdRising)) {
                        ledBlinking = true;
                        blink(ledBlinking);
                        if (playAlarm) {
                            audioElement.play();
                        }
                    } else if ((value < threshold && ledBlinking && thresholdRising) ||
                               (value > threshold && ledBlinking && !thresholdRising)) {
                        ledBlinking = false;
                        blink(ledBlinking);
                        if (playAlarm) {
                            audioElement.pause();
                        }
                    }

                    if (value > maxMeasuredValue) {
                        maxMeasuredValue = value;
                    }
                    if (value < minMeasuredValue) {
                        minMeasuredValue = value;
                    }

                    if (!repainting) {
                        repainting = true;
                        requestAnimFrame(gauge.repaint);
                    }
                };

                // do we have a callback function to process?
                if (callback && typeof(callback) === "function") {
                    tween.onMotionFinished = callback;
                }

                tween.start();
            }
            return this;
        };

        this.resetMinMeasuredValue = function () {
            minMeasuredValue = value;
            this.repaint();
            return this;
        };

        this.resetMaxMeasuredValue = function () {
            maxMeasuredValue = value;
            this.repaint();
            return this;
        };

        this.setMinMeasuredValueVisible = function (visible) {
            minMeasuredValueVisible = !!visible;
            this.repaint();
            return this;
        };

        this.setMaxMeasuredValueVisible = function (visible) {
            maxMeasuredValueVisible = !!visible;
            this.repaint();
            return this;
        };

        this.setThresholdVisible = function (visible) {
            thresholdVisible = !!visible;
            this.repaint();
            return this;
        };

        this.setThresholdRising = function (rising) {
            thresholdRising = !!rising;
            // reset existing threshold alerts
            ledBlinking = !ledBlinking;
            blink(ledBlinking);
            this.repaint();
            return this;
        };

        this.setFrameDesign = function (newFrameDesign) {
            resetBuffers({frame: true});
            frameDesign = newFrameDesign;
            init({frame: true});
            this.repaint();
            return this;
        };

        this.setBackgroundColor = function (newBackgroundColor) {
            resetBuffers({background: true,
                          pointer: (pointerType.type === 'type2' || pointerType.type === 'type13' ? true : false)       // type2 & 13 depend on background
                          });
            backgroundColor = newBackgroundColor;
            init({background: true,
                  pointer: (pointerType.type === 'type2' || pointerType.type === 'type13' ? true : false)       // type2 & 13 depend on background
                });
            this.repaint();
            return this;
        };

        this.setForegroundType = function (newForegroundType) {
            resetBuffers({foreground: true});
            foregroundType = newForegroundType;
            init({foreground: true});
            this.repaint();
            return this;
        };

        this.setPointerType = function (newPointerType) {
            resetBuffers({pointer: true,
                          foreground: true  // Required as type15 does not need a knob
                         });
            pointerType = newPointerType;
            init({pointer: true,
                  foreground: true
                 });
            this.repaint();
            return this;
        };

        this.setPointerColor = function (newPointerColor) {
            resetBuffers({pointer: true});
            pointerColor = newPointerColor;
            init({pointer: true});
            this.repaint();
            return this;
        };

        this.setLedColor = function (newLedColor) {
            resetBuffers({led: true});
            ledColor = newLedColor;
            init({led: true});
            this.repaint();
            return this;
        };

        this.setLedVisible = function (visible) {
            ledVisible = !!visible;
            this.repaint();
            return this;
        };

        this.repaint = function () {
            if (!initialized) {
                init({frame: true,
                      background: true,
                      led: true,
                      pointer: true,
                      foreground: true});
            }

            mainCtx.clearRect(0, 0, size, size);
            mainCtx.save();

            // Draw frame
            if (frameVisible) {
                mainCtx.drawImage(frameBuffer, 0, 0);
            }

            // Draw buffered image to visible canvas
            mainCtx.drawImage(backgroundBuffer, 0, 0);

            // Draw led
            if (ledVisible) {
                mainCtx.drawImage(ledBuffer, ledPosX, ledPosY);
            }

            if (steelseries.Orientation.WEST === orientation) {
                mainCtx.translate(centerX, centerX);
                mainCtx.rotate(-HALF_PI);
                mainCtx.translate(-centerX, -centerX);
            }
            if (steelseries.Orientation.EAST === orientation) {
                mainCtx.translate(centerX, centerX);
                mainCtx.rotate(HALF_PI);
                mainCtx.translate(-centerX, -centerX);
            }

            // Draw min measured value indicator
            if (minMeasuredValueVisible) {
                mainCtx.save();
                mainCtx.translate(centerX, centerY);
                mainCtx.rotate(rotationOffset + HALF_PI + (minMeasuredValue - minValue) * angleStep);
                mainCtx.translate(-centerX, -centerY);
                mainCtx.drawImage(minMeasuredValueBuffer, mainCtx.canvas.width * 0.4865, mainCtx.canvas.height * 0.27);
                mainCtx.restore();
            }

            // Draw max measured value indicator
            if (maxMeasuredValueVisible) {
                mainCtx.save();
                mainCtx.translate(centerX, centerY);
                mainCtx.rotate(rotationOffset + HALF_PI + (maxMeasuredValue - minValue) * angleStep);
                mainCtx.translate(-centerX, -centerY);
                mainCtx.drawImage(maxMeasuredValueBuffer, mainCtx.canvas.width * 0.4865, mainCtx.canvas.height * 0.27);
                mainCtx.restore();
            }

            angle = rotationOffset + HALF_PI + (value - minValue) * angleStep;

            // Define rotation center
            mainCtx.save();
            mainCtx.translate(centerX, centerY);
            mainCtx.rotate(angle);
            // Set the pointer shadow params
            mainCtx.shadowColor = 'rgba(0, 0, 0, 0.8)';
            mainCtx.shadowOffsetX = mainCtx.shadowOffsetY = shadowOffset;
            mainCtx.shadowBlur = shadowOffset * 2;
            // Draw pointer
            mainCtx.translate(-pointerOffset, -pointerOffset);
            mainCtx.drawImage(pointerBuffer, 0, 0);
            // Undo the translations & shadow settings
            mainCtx.restore();

            // Draw foreground
            if (foregroundVisible) {
                if (steelseries.Orientation.WEST === orientation) {
                    mainCtx.translate(centerX, centerX);
                    mainCtx.rotate(HALF_PI);
                    mainCtx.translate(-centerX, -centerX);
                } else if (steelseries.Orientation.EAST === orientation) {
                    mainCtx.translate(centerX, centerX);
                    mainCtx.rotate(-HALF_PI);
                    mainCtx.translate(-centerX, -centerX);
                }
                mainCtx.drawImage(foregroundBuffer, 0, 0);
            }
            mainCtx.restore();

            repainting = false;
        };

        // Visualize the component
        this.repaint();

        return this;
    };

    var linear = function (canvas, parameters) {
        parameters = parameters || {};
        var gaugeType = (undefined === parameters.gaugeType ? steelseries.GaugeType.TYPE1 : parameters.gaugeType),
            width = (undefined === parameters.width ? 0 : parameters.width),
            height = (undefined === parameters.height ? 0 : parameters.height),
            minValue = (undefined === parameters.minValue ? 0 : parameters.minValue),
            maxValue = (undefined === parameters.maxValue ? (minValue + 100) : parameters.maxValue),
            niceScale = (undefined === parameters.niceScale ? true : parameters.niceScale),
            threshold = (undefined === parameters.threshold ? (maxValue - minValue) / 2 + minValue: parameters.threshold),
            titleString = (undefined === parameters.titleString ? '' : parameters.titleString),
            unitString = (undefined === parameters.unitString ? '' : parameters.unitString),
            frameDesign = (undefined === parameters.frameDesign ? steelseries.FrameDesign.METAL : parameters.frameDesign),
            frameVisible = (undefined === parameters.frameVisible ? true : parameters.frameVisible),
            backgroundColor = (undefined === parameters.backgroundColor ? steelseries.BackgroundColor.DARK_GRAY : parameters.backgroundColor),
            backgroundVisible = (undefined === parameters.backgroundVisible ? true : parameters.backgroundVisible),
            valueColor = (undefined === parameters.valueColor ? steelseries.ColorDef.RED : parameters.valueColor),
            lcdColor = (undefined === parameters.lcdColor ? steelseries.LcdColor.STANDARD : parameters.lcdColor),
            lcdVisible = (undefined === parameters.lcdVisible ? true : parameters.lcdVisible),
            lcdDecimals = (undefined === parameters.lcdDecimals ? 2 : parameters.lcdDecimals),
            digitalFont = (undefined === parameters.digitalFont ? false : parameters.digitalFont),
            ledColor = (undefined === parameters.ledColor ? steelseries.LedColor.RED_LED : parameters.ledColor),
            ledVisible = (undefined === parameters.ledVisible ? true : parameters.ledVisible),
            thresholdVisible = (undefined === parameters.thresholdVisible ? true : parameters.thresholdVisible),
            thresholdRising = (undefined === parameters.thresholdRising ? true : parameters.thresholdRising),
            minMeasuredValueVisible = (undefined === parameters.minMeasuredValueVisible ? false : parameters.minMeasuredValueVisible),
            maxMeasuredValueVisible = (undefined === parameters.maxMeasuredValueVisible ? false : parameters.maxMeasuredValueVisible),
            labelNumberFormat = (undefined === parameters.labelNumberFormat ? steelseries.LabelNumberFormat.STANDARD : parameters.labelNumberFormat),
            foregroundVisible = (undefined === parameters.foregroundVisible ? true : parameters.foregroundVisible),
            playAlarm = (undefined === parameters.playAlarm ? false : parameters.playAlarm),
            alarmSound = (undefined === parameters.alarmSound ? false : parameters.alarmSound),
            fullScaleDeflectionTime = (undefined === parameters.fullScaleDeflectionTime ? 2.5 : parameters.fullScaleDeflectionTime);

        // Get the canvas context and clear it
        var mainCtx = getCanvasContext(canvas);
        // Has a size been specified?
        if (width === 0) {
            width = mainCtx.canvas.width;
        }
        if (height === 0) {
            height = mainCtx.canvas.height;
        }

        // Set the size - also clears the canvas
        mainCtx.canvas.width = width;
        mainCtx.canvas.height = height;

        var imageWidth = width;
        var imageHeight = height;

        // Create audio tag for alarm sound
        if (playAlarm && alarmSound !== false) {
            var audioElement = doc.createElement('audio');
            audioElement.setAttribute('src', alarmSound);
            //audioElement.setAttribute('src', 'js/alarm.mp3');
            audioElement.setAttribute('preload', 'auto');
        }

        var self = this;
        var value = minValue;

        // Properties
        var minMeasuredValue = maxValue;
        var maxMeasuredValue = minValue;

        // Check gaugeType is 1 or 2
        if (gaugeType.type !== 'type1' && gaugeType.type !== 'type2') {
            gaugeType = steelseries.GaugeType.TYPE1;
        }

        var tween;
        var ledBlinking = false;
        var repainting = false;

        var ledTimerId = 0;

        var vertical = width <= height;

        // Constants
        var ledPosX;
        var ledPosY;
        var ledSize = Math.round((vertical ? height : width) * 0.05);
        var minMaxIndSize = Math.round((vertical ? width : height) * 0.05);
        var stdFont;
        var lcdFont;

        // Misc
        if (vertical) {
            ledPosX = imageWidth / 2 - ledSize / 2;
            ledPosY = (gaugeType.type === 'type1' ? 0.053 : 0.038) * imageHeight;
            stdFont = Math.floor(imageHeight / 22) + 'px ' + stdFontName;
            lcdFont = Math.floor(imageHeight / 22) + 'px ' + lcdFontName;
        } else {
            ledPosX = 0.89 * imageWidth;
            ledPosY = imageHeight / 2 - ledSize / 2;
            stdFont = Math.floor(imageHeight / 10) + 'px ' + stdFontName;
            lcdFont = Math.floor(imageHeight / 10) + 'px ' + lcdFontName;
        }

        var initialized = false;

        // Tickmark specific private variables
        var niceMinValue = minValue;
        var niceMaxValue = maxValue;
        var niceRange = maxValue - minValue;
        var range = niceMaxValue - niceMinValue;
        var minorTickSpacing = 0;
        var majorTickSpacing = 0;
        var maxNoOfMinorTicks = 10;
        var maxNoOfMajorTicks = 10;

        // Method to calculate nice values for min, max and range for the tickmarks
        var calculate = function calculate() {
            if (niceScale) {
                niceRange = calcNiceNumber(maxValue - minValue, false);
                majorTickSpacing = calcNiceNumber(niceRange / (maxNoOfMajorTicks - 1), true);
                niceMinValue = Math.floor(minValue / majorTickSpacing) * majorTickSpacing;
                niceMaxValue = Math.ceil(maxValue / majorTickSpacing) * majorTickSpacing;
                minorTickSpacing = calcNiceNumber(majorTickSpacing / (maxNoOfMinorTicks - 1), true);
                minValue = niceMinValue;
                maxValue = niceMaxValue;
                range = maxValue - minValue;
            } else {
                niceRange = (maxValue - minValue);
                niceMinValue = minValue;
                niceMaxValue = maxValue;
                range = niceRange;
                minorTickSpacing = 1;
                majorTickSpacing = 10;
            }
        };

        // **************   Buffer creation  ********************
        // Buffer for the frame
        var frameBuffer = createBuffer(width, height);
        var frameContext = frameBuffer.getContext('2d');

        // Buffer for the background
        var backgroundBuffer = createBuffer(width, height);
        var backgroundContext = backgroundBuffer.getContext('2d');

        var lcdBuffer;

        // Buffer for led on painting code
        var ledBufferOn = createBuffer(ledSize, ledSize);
        var ledContextOn = ledBufferOn.getContext('2d');

        // Buffer for led off painting code
        var ledBufferOff = createBuffer(ledSize, ledSize);
        var ledContextOff = ledBufferOff.getContext('2d');

        // Buffer for current led painting code
        var ledBuffer = ledBufferOff;

        // Buffer for the minMeasuredValue indicator
        var minMeasuredValueBuffer = createBuffer(minMaxIndSize, minMaxIndSize);
        var minMeasuredValueCtx = minMeasuredValueBuffer.getContext('2d');

        // Buffer for the maxMeasuredValue indicator
        var maxMeasuredValueBuffer = createBuffer(minMaxIndSize, minMaxIndSize);
        var maxMeasuredValueCtx = maxMeasuredValueBuffer.getContext('2d');

        // Buffer for static foreground painting code
        var foregroundBuffer = createBuffer(width, height);
        var foregroundContext = foregroundBuffer.getContext('2d');

        // **************   Image creation  ********************
        var drawLcdText = function (ctx, value, vertical) {
            ctx.save();
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            ctx.strokeStyle = lcdColor.textColor;
            ctx.fillStyle = lcdColor.textColor;

            if (lcdColor === steelseries.LcdColor.STANDARD || lcdColor === steelseries.LcdColor.STANDARD_GREEN) {
                ctx.shadowColor = 'gray';
                if (vertical) {
                    ctx.shadowOffsetX = imageHeight * 0.003;
                    ctx.shadowOffsetY = imageHeight * 0.003;
                    ctx.shadowBlur = imageHeight * 0.004;
                } else {
                    ctx.shadowOffsetX = imageHeight * 0.007;
                    ctx.shadowOffsetY = imageHeight * 0.007;
                    ctx.shadowBlur = imageHeight * 0.009;
                }
            }

            var lcdTextX;
            var lcdTextY;
            var lcdTextWidth;

            if (digitalFont) {
                ctx.font = lcdFont;
            } else {
                ctx.font = stdFont;
            }

            if (vertical) {
                lcdTextX = (imageWidth - (imageWidth * 0.571428)) / 2  + imageWidth * 0.571428 - 2;
                lcdTextY = imageHeight * 0.88 + 1 + (imageHeight * 0.055 - 2) / 2;
                lcdTextWidth = imageWidth * 0.7 - 2;
            } else {
                lcdTextX = (imageWidth * 0.695) + imageWidth * 0.18 - 2;
                lcdTextY = (imageHeight * 0.22) + 1 + (imageHeight * 0.15 - 2) / 2;
                lcdTextWidth = imageHeight * 0.22 - 2;
            }

            ctx.fillText(value.toFixed(lcdDecimals), lcdTextX, lcdTextY, lcdTextWidth);

            ctx.restore();
        };

        var createThresholdImage = function (vertical) {
            var thresholdBuffer = doc.createElement('canvas');
            var thresholdCtx = thresholdBuffer.getContext('2d');
            thresholdBuffer.height = thresholdBuffer.width = minMaxIndSize;

            thresholdCtx.save();
            var gradThreshold = thresholdCtx.createLinearGradient(0, 0.1, 0, thresholdBuffer.height * 0.9);
            gradThreshold.addColorStop(0, '#520000');
            gradThreshold.addColorStop(0.3, '#fc1d00');
            gradThreshold.addColorStop(0.59, '#fc1d00');
            gradThreshold.addColorStop(1, '#520000');
            thresholdCtx.fillStyle = gradThreshold;

            if (vertical) {
                thresholdCtx.beginPath();
                thresholdCtx.moveTo(0.1, thresholdBuffer.height * 0.5);
                thresholdCtx.lineTo(thresholdBuffer.width * 0.9, 0.1);
                thresholdCtx.lineTo(thresholdBuffer.width * 0.9, thresholdBuffer.height * 0.9);
                thresholdCtx.closePath();
            } else {
                thresholdCtx.beginPath();
                thresholdCtx.moveTo(0.1, 0.1);
                thresholdCtx.lineTo(thresholdBuffer.width * 0.9, 0.1);
                thresholdCtx.lineTo(thresholdBuffer.width * 0.5, thresholdBuffer.height * 0.9);
                thresholdCtx.closePath();
            }

            thresholdCtx.fill();
            thresholdCtx.strokeStyle = '#FFFFFF';
            thresholdCtx.stroke();

            thresholdCtx.restore();

            return thresholdBuffer;
        };

        var drawTickmarksImage = function (ctx, labelNumberFormat, vertical) {
            backgroundColor.labelColor.setAlpha(1);
            ctx.save();
            ctx.textBaseline = 'middle';
            var TEXT_WIDTH = imageWidth * 0.1;
            ctx.strokeStyle = backgroundColor.labelColor.getRgbaColor();
            ctx.fillStyle = backgroundColor.labelColor.getRgbaColor();

            var valueCounter = minValue;
            var majorTickCounter = maxNoOfMinorTicks - 1;
            var tickCounter;
            var currentPos;
            var scaleBoundsX;
            var scaleBoundsY;
            var scaleBoundsW;
            var scaleBoundsH;
            var tickSpaceScaling = 1;

            var minorTickStart;
            var minorTickStop;
            var mediumTickStart;
            var mediumTickStop;
            var majorTickStart;
            var majorTickStop;
            if (vertical) {
                minorTickStart = (0.34 * imageWidth);
                minorTickStop = (0.36 * imageWidth);
                mediumTickStart = (0.33 * imageWidth);
                mediumTickStop = (0.36 * imageWidth);
                majorTickStart = (0.32 * imageWidth);
                majorTickStop = (0.36 * imageWidth);
                ctx.textAlign = 'right';
                scaleBoundsX = 0;
                scaleBoundsY = imageHeight * 0.128640;
                scaleBoundsW = 0;
                if (gaugeType.type === 'type1') {
                    scaleBoundsH = (imageHeight * 0.856796 - imageHeight * 0.128640);
                } else {
                    scaleBoundsH = (imageHeight * 0.7475 - imageHeight * 0.128640);
                }
                tickSpaceScaling = scaleBoundsH / (maxValue - minValue);
            } else {
                minorTickStart = (0.65 * imageHeight);
                minorTickStop = (0.63 * imageHeight);
                mediumTickStart = (0.66 * imageHeight);
                mediumTickStop = (0.63 * imageHeight);
                majorTickStart = (0.67 * imageHeight);
                majorTickStop = (0.63 * imageHeight);
                ctx.textAlign = 'center';
                scaleBoundsY = 0;
                if (gaugeType.type === 'type1') {
                    scaleBoundsX = imageWidth * 0.142857;
                    scaleBoundsW = (imageWidth * 0.871012 - scaleBoundsX);
                } else {
                    scaleBoundsX = imageWidth * 0.19857;
                    scaleBoundsW = (imageWidth * 0.82 - scaleBoundsX);
                }
                scaleBoundsH = 0;
                tickSpaceScaling = scaleBoundsW / (maxValue - minValue);
            }

            var labelCounter;
            for (labelCounter = minValue, tickCounter = 0; labelCounter <= maxValue; labelCounter += minorTickSpacing, tickCounter += minorTickSpacing) {

                // Calculate the bounds of the scaling
                if (vertical) {
                    currentPos = scaleBoundsY + scaleBoundsH - tickCounter * tickSpaceScaling;
                } else {
                    currentPos = scaleBoundsX + tickCounter * tickSpaceScaling;
                }

                majorTickCounter++;

                // Draw tickmark every major tickmark spacing
                if (majorTickCounter === maxNoOfMinorTicks) {

                    // Draw the major tickmarks
                    ctx.lineWidth = 1.5;
                    drawLinearTicks(ctx, majorTickStart, majorTickStop, currentPos, vertical);

                    // Draw the standard tickmark labels
                    if (vertical) {
                        // Vertical orientation
                        switch (labelNumberFormat.format) {
                        case 'fractional':
                            ctx.fillText((valueCounter.toFixed(2)), imageWidth * 0.28, currentPos, TEXT_WIDTH);
                            break;

                        case 'scientific':
                            ctx.fillText((valueCounter.toPrecision(2)), imageWidth * 0.28, currentPos, TEXT_WIDTH);
                            break;

                        case 'standard':
                        /* falls through */
                        default:
                            ctx.fillText((valueCounter.toFixed(0)), imageWidth * 0.28, currentPos, TEXT_WIDTH);
                            break;
                        }
                    } else {
                        // Horizontal orientation
                        switch (labelNumberFormat.format) {
                        case 'fractional':
                            ctx.fillText((valueCounter.toFixed(2)), currentPos, (imageHeight * 0.73), TEXT_WIDTH);
                            break;

                        case 'scientific':
                            ctx.fillText((valueCounter.toPrecision(2)), currentPos, (imageHeight * 0.73), TEXT_WIDTH);
                            break;

                        case 'standard':
                        /* falls through */
                        default:
                            ctx.fillText((valueCounter.toFixed(0)), currentPos, (imageHeight * 0.73), TEXT_WIDTH);
                            break;
                        }
                    }

                    valueCounter += majorTickSpacing;
                    majorTickCounter = 0;
                    continue;
                }

                // Draw tickmark every minor tickmark spacing
                if (0 === maxNoOfMinorTicks % 2 && majorTickCounter === (maxNoOfMinorTicks / 2)) {
                    ctx.lineWidth = 1;
                    drawLinearTicks(ctx, mediumTickStart, mediumTickStop, currentPos, vertical);
                } else {
                    ctx.lineWidth = 0.5;
                    drawLinearTicks(ctx, minorTickStart, minorTickStop, currentPos, vertical);
                }
            }

            ctx.restore();
        };

        var drawLinearTicks = function (ctx, tickStart, tickStop, currentPos, vertical) {
            if (vertical) {
                // Vertical orientation
                ctx.beginPath();
                ctx.moveTo(tickStart, currentPos);
                ctx.lineTo(tickStop, currentPos);
                ctx.closePath();
                ctx.stroke();
            } else {
                // Horizontal orientation
                ctx.beginPath();
                ctx.moveTo(currentPos, tickStart);
                ctx.lineTo(currentPos, tickStop);
                ctx.closePath();
                ctx.stroke();
            }
        };

        // **************   Initialization  ********************
        var init = function (parameters) {
            parameters = parameters || {};
            var drawFrame = (undefined === parameters.frame ? false : parameters.frame);
            var drawBackground = (undefined === parameters.background ? false : parameters.background);
            var drawLed = (undefined === parameters.led ? false : parameters.led);
            var drawForeground = (undefined === parameters.foreground ? false : parameters.foreground);

            var yOffset;
            var yRange;
            var valuePos;

            initialized = true;

            // Calculate the current min and max values and the range
            calculate();

            // Create frame in frame buffer (backgroundBuffer)
            if (drawFrame && frameVisible) {
                drawLinearFrameImage(frameContext, frameDesign, imageWidth, imageHeight, vertical);
            }

            // Create background in background buffer (backgroundBuffer)
            if (drawBackground && backgroundVisible) {
                drawLinearBackgroundImage(backgroundContext, backgroundColor, imageWidth, imageHeight, vertical);
            }

            // draw Thermometer outline
            if (drawBackground && gaugeType.type === 'type2') {
                drawBackgroundImage(backgroundContext);
            }

            if (drawLed) {
                if (vertical) {
                    // Draw LED ON in ledBuffer_ON
                    ledContextOn.drawImage(createLedImage(ledSize, 1, ledColor), 0, 0);

                    // Draw LED ON in ledBuffer_OFF
                    ledContextOff.drawImage(createLedImage(ledSize, 0, ledColor), 0, 0);
                } else {
                    // Draw LED ON in ledBuffer_ON
                    ledContextOn.drawImage(createLedImage(ledSize, 1, ledColor), 0, 0);

                    // Draw LED ON in ledBuffer_OFF
                    ledContextOff.drawImage(createLedImage(ledSize, 0, ledColor), 0, 0);
                }
            }

            // Draw min measured value indicator in minMeasuredValueBuffer
            if (minMeasuredValueVisible) {
                if (vertical) {
                    minMeasuredValueCtx.drawImage(createMeasuredValueImage(minMaxIndSize, steelseries.ColorDef.BLUE.dark.getRgbaColor(), false, vertical), 0, 0);
                } else {
                    minMeasuredValueCtx.drawImage(createMeasuredValueImage(minMaxIndSize, steelseries.ColorDef.BLUE.dark.getRgbaColor(), false, vertical), 0, 0);
                }
            }

            // Draw max measured value indicator in maxMeasuredValueBuffer
            if (maxMeasuredValueVisible) {
                if (vertical) {
                    maxMeasuredValueCtx.drawImage(createMeasuredValueImage(minMaxIndSize, steelseries.ColorDef.RED.medium.getRgbaColor(), false, vertical), 0, 0);
                } else {
                    maxMeasuredValueCtx.drawImage(createMeasuredValueImage(minMaxIndSize, steelseries.ColorDef.RED.medium.getRgbaColor(), false, vertical), 0, 0);
                }
            }

            // Create alignment posts in background buffer (backgroundBuffer)
            if (drawBackground && backgroundVisible) {

                // Create tickmarks in background buffer (backgroundBuffer)
                drawTickmarksImage(backgroundContext, labelNumberFormat, vertical);

                // Create title in background buffer (backgroundBuffer)
                if (vertical) {
                    drawTitleImage(backgroundContext, imageWidth, imageHeight, titleString, unitString, backgroundColor, vertical, null, lcdVisible, gaugeType);
                } else {
                    drawTitleImage(backgroundContext, imageWidth, imageHeight, titleString, unitString, backgroundColor, vertical, null, lcdVisible, gaugeType);
                }
            }

            // Draw threshold image to background context
            if (drawBackground && thresholdVisible) {
                backgroundContext.save();
                if (vertical) {
                    // Vertical orientation
                    yOffset = (gaugeType.type === 'type1' ? 0.856796 : 0.7475);
                    yRange = yOffset - 0.128640;
                    valuePos = imageHeight * yOffset - (imageHeight * yRange) * (threshold - minValue) / (maxValue - minValue);
                    backgroundContext.translate(imageWidth * 0.365, valuePos - minMaxIndSize / 2);
                } else {
                    // Horizontal orientation
                    yOffset = (gaugeType.type === 'type1' ? 0.871012 : 0.82);
                    yRange = yOffset - (gaugeType.type === 'type1' ? 0.142857 : 0.19857);
                    valuePos = imageWidth * yRange * (threshold - minValue) / (maxValue - minValue);
                    backgroundContext.translate(imageWidth * (gaugeType.type === 'type1' ? 0.142857 : 0.19857) - minMaxIndSize / 2 + valuePos, imageHeight * 0.58);
                }
                backgroundContext.drawImage(createThresholdImage(vertical), 0, 0);
                backgroundContext.restore();
            }

            // Create lcd background if selected in background buffer (backgroundBuffer)
            if (drawBackground && lcdVisible) {
                if (vertical) {
                    lcdBuffer = createLcdBackgroundImage(imageWidth * 0.571428, imageHeight * 0.055, lcdColor);
                    backgroundContext.drawImage(lcdBuffer, ((imageWidth - (imageWidth * 0.571428)) / 2), imageHeight * 0.88);
                } else {
                    lcdBuffer = createLcdBackgroundImage(imageWidth * 0.18, imageHeight * 0.15, lcdColor);
                    backgroundContext.drawImage(lcdBuffer, imageWidth * 0.695, imageHeight * 0.22);
                }
            }

            // add thermometer stem foreground
            if (drawForeground && gaugeType.type === 'type2') {
                drawForegroundImage(foregroundContext);
            }

            // Create foreground in foreground buffer (foregroundBuffer)
            if (drawForeground && foregroundVisible) {
                drawLinearForegroundImage(foregroundContext, imageWidth, imageHeight, vertical, false);
            }
        };

        var resetBuffers = function (buffers) {
            buffers = buffers || {};
            var resetFrame = (undefined === buffers.frame ? false : buffers.frame);
            var resetBackground = (undefined === buffers.background ? false : buffers.background);
            var resetLed = (undefined === buffers.led ? false : buffers.led);
            var resetForeground = (undefined === buffers.foreground ? false : buffers.foreground);

            if (resetFrame) {
                frameBuffer.width = width;
                frameBuffer.height = height;
                frameContext = frameBuffer.getContext('2d');
            }

            if (resetBackground) {
                backgroundBuffer.width = width;
                backgroundBuffer.height = height;
                backgroundContext = backgroundBuffer.getContext('2d');
            }

            if (resetLed) {
                ledBufferOn.width = Math.ceil(width * 0.093457);
                ledBufferOn.height = Math.ceil(height * 0.093457);
                ledContextOn = ledBufferOn.getContext('2d');

                ledBufferOff.width = Math.ceil(width * 0.093457);
                ledBufferOff.height = Math.ceil(height * 0.093457);
                ledContextOff = ledBufferOff.getContext('2d');

                // Buffer for current led painting code
                ledBuffer = ledBufferOff;
            }

            if (resetForeground) {
                foregroundBuffer.width = width;
                foregroundBuffer.height = height;
                foregroundContext = foregroundBuffer.getContext('2d');
            }
        };

        var blink = function (blinking) {
            if (blinking) {
                ledTimerId = setInterval(toggleAndRepaintLed, 1000);
            } else {
                clearInterval(ledTimerId);
                ledBuffer = ledBufferOff;
            }
        };

        var toggleAndRepaintLed = function () {
            if (ledVisible) {
                if (ledBuffer === ledBufferOn) {
                    ledBuffer = ledBufferOff;
                } else {
                    ledBuffer = ledBufferOn;
                }
                if (!repainting) {
                    repainting = true;
                    requestAnimFrame(self.repaint);
                }
            }
        };

        var drawValue = function (ctx, imageWidth, imageHeight) {
            var top; // position of max value
            var bottom; // position of min value
            var labelColor = backgroundColor.labelColor;
            var fullSize;
            var valueSize, valueTop;
            var valueStartX, valueStartY, valueStopX, valueStopY;
            var valueBackgroundStartX, valueBackgroundStartY, valueBackgroundStopX, valueBackgroundStopY;
            var valueBorderStartX, valueBorderStartY, valueBorderStopX, valueBorderStopY;
            var valueForegroundStartX, valueForegroundStartY, valueForegroundStopX, valueForegroundStopY;

            // Orientation dependend definitions
            if (vertical) {
                // Vertical orientation
                top =  imageHeight * 0.128640; // position of max value
                if (gaugeType.type === 'type1') {
                    bottom = imageHeight * 0.856796; // position of min value
                } else {
                    bottom = imageHeight * 0.7475;
                }
                fullSize = bottom - top;
                valueSize = fullSize * (value - minValue) / (maxValue - minValue);
                valueTop = bottom - valueSize;
                valueBackgroundStartX = 0;
                valueBackgroundStartY = top;
                valueBackgroundStopX = 0;
                valueBackgroundStopY = bottom;
            } else {
                // Horizontal orientation
                if (gaugeType.type === 'type1') {
                    top = imageWidth * 0.871012; // position of max value
                    bottom = imageWidth * 0.142857; // position of min value
                } else {
                    top = imageWidth * 0.82; // position of max value
                    bottom = imageWidth * 0.19857; // position of min value
                }
                fullSize = top - bottom;
                valueSize = fullSize * (value - minValue) / (maxValue - minValue);
                valueTop = bottom;
                valueBackgroundStartX = top;
                valueBackgroundStartY = 0;
                valueBackgroundStopX = bottom;
                valueBackgroundStopY = 0;
            }
            if (gaugeType.type === 'type1') {
                var darker = (backgroundColor === steelseries.BackgroundColor.CARBON ||
                              backgroundColor === steelseries.BackgroundColor.PUNCHED_SHEET ||
                              backgroundColor === steelseries.BackgroundColor.STAINLESS ||
                              backgroundColor === steelseries.BackgroundColor.BRUSHED_STAINLESS ||
                              backgroundColor === steelseries.BackgroundColor.TURNED) ? 0.3 : 0;
                var valueBackgroundTrackGradient = ctx.createLinearGradient(valueBackgroundStartX, valueBackgroundStartY, valueBackgroundStopX, valueBackgroundStopY);
                labelColor.setAlpha(0.05 + darker);
                valueBackgroundTrackGradient.addColorStop(0, labelColor.getRgbaColor());
                labelColor.setAlpha(0.15 + darker);
                valueBackgroundTrackGradient.addColorStop(0.48, labelColor.getRgbaColor());
                labelColor.setAlpha(0.15 + darker);
                valueBackgroundTrackGradient.addColorStop(0.49, labelColor.getRgbaColor());
                labelColor.setAlpha(0.05 + darker);
                valueBackgroundTrackGradient.addColorStop(1, labelColor.getRgbaColor());
                ctx.fillStyle = valueBackgroundTrackGradient;

                if (vertical) {
                    ctx.fillRect(imageWidth * 0.435714, top, imageWidth * 0.142857, fullSize);
                } else {
                    ctx.fillRect(imageWidth * 0.142857, imageHeight * 0.435714, fullSize, imageHeight * 0.142857);
                }

                if (vertical) {
                    // Vertical orientation
                    valueBorderStartX = 0;
                    valueBorderStartY = top;
                    valueBorderStopX = 0;
                    valueBorderStopY = top + fullSize;
                } else {
                    // Horizontal orientation
                    valueBorderStartX = imageWidth * 0.142857 + fullSize;
                    valueBorderStartY = 0;
                    valueBorderStopX = imageWidth * 0.142857;
                    valueBorderStopY = 0;
                }
                var valueBorderGradient = ctx.createLinearGradient(valueBorderStartX, valueBorderStartY, valueBorderStopX, valueBorderStopY);
                labelColor.setAlpha(0.3 + darker);
                valueBorderGradient.addColorStop(0, labelColor.getRgbaColor());
                labelColor.setAlpha(0.69);
                valueBorderGradient.addColorStop(0.48, labelColor.getRgbaColor());
                labelColor.setAlpha(0.7);
                valueBorderGradient.addColorStop(0.49, labelColor.getRgbaColor());
                labelColor.setAlpha(0.4);
                valueBorderGradient.addColorStop(1, labelColor.getRgbaColor());
                ctx.fillStyle = valueBorderGradient;
                if (vertical) {
                    ctx.fillRect(imageWidth * 0.435714, top, imageWidth * 0.007142, fullSize);
                    ctx.fillRect(imageWidth * 0.571428, top, imageWidth * 0.007142, fullSize);
                } else {
                    ctx.fillRect(imageWidth * 0.142857, imageHeight * 0.435714, fullSize, imageHeight * 0.007142);
                    ctx.fillRect(imageWidth * 0.142857, imageHeight * 0.571428, fullSize, imageHeight * 0.007142);
                }
            }
            if (vertical) {
                // Vertical orientation
                if (gaugeType.type === 'type1') {
                    valueStartX = imageWidth * 0.45;
                    valueStartY = 0;
                    valueStopX = imageWidth * 0.45 + imageWidth * 0.114285;
                    valueStopY = 0;
                } else {
                    valueStartX = imageWidth / 2 - imageHeight * 0.0486 / 2;
                    valueStartY = 0;
                    valueStopX = valueStartX + imageHeight * 0.053;
                    valueStopY = 0;
                }
            } else {
                // Horizontal orientation
                if (gaugeType.type === 'type1') {
                    valueStartX = 0;
                    valueStartY = imageHeight * 0.45;
                    valueStopX = 0;
                    valueStopY = imageHeight * 0.45 + imageHeight * 0.114285;
                } else {
                    valueStartX = 0;
                    valueStartY = imageHeight / 2 - imageWidth * 0.0250;
                    valueStopX = 0;
                    valueStopY = valueStartY + imageWidth * 0.053;
                }
            }

            var valueBackgroundGradient = ctx.createLinearGradient(valueStartX, valueStartY, valueStopX, valueStopY);
            valueBackgroundGradient.addColorStop(0, valueColor.medium.getRgbaColor());
            valueBackgroundGradient.addColorStop(1, valueColor.light.getRgbaColor());
            ctx.fillStyle = valueBackgroundGradient;
            var thermoTweak = (gaugeType.type === 'type1' ? 0 : (vertical ? imageHeight * 0.05 : imageWidth * 0.05));
            if (vertical) {
                ctx.fillRect(valueStartX, valueTop, valueStopX - valueStartX, valueSize + thermoTweak);
            } else {
                ctx.fillRect(valueTop - thermoTweak, valueStartY, valueSize + thermoTweak, valueStopY - valueStartY);
            }

            if (gaugeType.type === 'type1') {
                // The light effect on the value
                if (vertical) {
                    // Vertical orientation
                    valueForegroundStartX = imageWidth * 0.45;
                    valueForegroundStartY = 0;
                    valueForegroundStopX = valueForegroundStartX + imageWidth * 0.05;
                    valueForegroundStopY = 0;
                } else {
                    // Horizontal orientation
                    valueForegroundStartX = 0;
                    valueForegroundStartY = imageHeight * 0.45;
                    valueForegroundStopX = 0;
                    valueForegroundStopY = valueForegroundStartY + imageHeight * 0.05;
                }
                var valueForegroundGradient = ctx.createLinearGradient(valueForegroundStartX, valueForegroundStartY, valueForegroundStopX, valueForegroundStopY);
                valueForegroundGradient.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
                valueForegroundGradient.addColorStop(0.98, 'rgba(255, 255, 255, 0.0)');
                ctx.fillStyle = valueForegroundGradient;
                if (vertical) {
                    ctx.fillRect(valueForegroundStartX, valueTop, valueForegroundStopX, valueSize);
                } else {
                    ctx.fillRect(valueTop, valueForegroundStartY, valueSize, valueForegroundStopY - valueForegroundStartY);
                }
            }
        };

        var drawForegroundImage = function (ctx) {
            var foreSize = (vertical ? imageHeight : imageWidth);

            ctx.save();
            if (vertical) {
                ctx.translate(imageWidth / 2, 0);
            } else {
                ctx.translate(imageWidth / 2, imageHeight / 2);
                ctx.rotate(HALF_PI);
                ctx.translate(0, -imageWidth / 2 + imageWidth * 0.05);
            }

            // draw bulb
            ctx.beginPath();
            ctx.moveTo(-0.0490 * foreSize, 0.825 * foreSize);
            ctx.bezierCurveTo(-0.0490 * foreSize, 0.7975 * foreSize, -0.0264 * foreSize, 0.775 * foreSize, 0.0013 * foreSize, 0.775 * foreSize);
            ctx.bezierCurveTo(0.0264 * foreSize, 0.775 * foreSize, 0.0490 * foreSize, 0.7975 * foreSize, 0.0490 * foreSize, 0.825 * foreSize);
            ctx.bezierCurveTo(0.0490 * foreSize, 0.85 * foreSize, 0.0264 * foreSize, 0.8725 * foreSize, 0.0013 * foreSize, 0.8725 * foreSize);
            ctx.bezierCurveTo(-0.0264 * foreSize, 0.8725 * foreSize, -0.0490 * foreSize, 0.85 * foreSize, -0.0490 * foreSize, 0.825 * foreSize);
            ctx.closePath();
            var grad = ctx.createRadialGradient(0 * foreSize, 0.825 * foreSize, 0, 0 * foreSize, 0.825 * foreSize, 0.0490 * foreSize);
            grad.addColorStop(0, valueColor.medium.getRgbaColor());
            grad.addColorStop(0.3, valueColor.medium.getRgbaColor());
            grad.addColorStop(1, valueColor.light.getRgbaColor());
            ctx.fillStyle = grad;
            ctx.fill();

            // draw bulb highlight
            ctx.beginPath();
            if (vertical) {
                ctx.moveTo(-0.0365 * foreSize, 0.8075 * foreSize);
                ctx.bezierCurveTo(-0.0365 * foreSize, 0.7925 * foreSize, -0.0214 * foreSize, 0.7875 * foreSize, -0.0214 * foreSize, 0.7825 * foreSize);
                ctx.bezierCurveTo(0.0189 * foreSize, 0.785 * foreSize, 0.0365 * foreSize, 0.7925 * foreSize, 0.0365 * foreSize, 0.8075 * foreSize);
                ctx.bezierCurveTo(0.0365 * foreSize, 0.8175 * foreSize, 0.0214 * foreSize, 0.815 * foreSize, 0.0013 * foreSize, 0.8125 * foreSize);
                ctx.bezierCurveTo(-0.0189 * foreSize, 0.8125 * foreSize, -0.0365 * foreSize, 0.8175 * foreSize, -0.0365 * foreSize, 0.8075 * foreSize);
                grad = ctx.createRadialGradient(0, 0.8 * foreSize, 0, 0, 0.8 * foreSize, 0.0377 * foreSize);
            } else {
                ctx.beginPath();
                ctx.moveTo(-0.0214 * foreSize, 0.86 * foreSize);
                ctx.bezierCurveTo(-0.0365 * foreSize, 0.86 * foreSize, -0.0415 * foreSize, 0.845 * foreSize, -0.0465 * foreSize, 0.825 * foreSize);
                ctx.bezierCurveTo(-0.0465 * foreSize, 0.805 * foreSize, -0.0365 * foreSize, 0.7875 * foreSize, -0.0214 * foreSize, 0.7875 * foreSize);
                ctx.bezierCurveTo(-0.0113 * foreSize, 0.7875 * foreSize, -0.0163 * foreSize, 0.8025 * foreSize, -0.0163 * foreSize, 0.8225 * foreSize);
                ctx.bezierCurveTo(-0.0163 * foreSize, 0.8425 * foreSize, -0.0113 * foreSize, 0.86 * foreSize, -0.0214 * foreSize, 0.86 * foreSize);
                grad = ctx.createRadialGradient(-0.03 * foreSize, 0.8225 * foreSize, 0, -0.03 * foreSize, 0.8225 * foreSize, 0.0377 * foreSize);
            }
            grad.addColorStop(0.0, 'rgba(255, 255, 255, 0.55)');
            grad.addColorStop(1.0, 'rgba(255, 255, 255, 0.05)');
            ctx.fillStyle = grad;
            ctx.closePath();
            ctx.fill();

            // stem highlight
            ctx.beginPath();
            ctx.moveTo(-0.0214 * foreSize, 0.115 * foreSize);
            ctx.bezierCurveTo(-0.0214 * foreSize, 0.1075 * foreSize, -0.0163 * foreSize, 0.1025 * foreSize, -0.0113 * foreSize, 0.1025 * foreSize);
            ctx.bezierCurveTo(-0.0113 * foreSize, 0.1025 * foreSize, -0.0113 * foreSize, 0.1025 * foreSize, -0.0113 * foreSize, 0.1025 * foreSize);
            ctx.bezierCurveTo(-0.0038 * foreSize, 0.1025 * foreSize, 0.0013 * foreSize, 0.1075 * foreSize, 0.0013 * foreSize, 0.115 * foreSize);
            ctx.bezierCurveTo(0.0013 * foreSize, 0.115 * foreSize, 0.0013 * foreSize, 0.76 * foreSize, 0.0013 * foreSize, 0.76 * foreSize);
            ctx.bezierCurveTo(0.0013 * foreSize, 0.7675 * foreSize, -0.0038 * foreSize, 0.7725 * foreSize, -0.0113 * foreSize, 0.7725 * foreSize);
            ctx.bezierCurveTo(-0.0113 * foreSize, 0.7725 * foreSize, -0.0113 * foreSize, 0.7725 * foreSize, -0.0113 * foreSize, 0.7725 * foreSize);
            ctx.bezierCurveTo(-0.0163 * foreSize, 0.7725 * foreSize, -0.0214 * foreSize, 0.7675 * foreSize, -0.0214 * foreSize, 0.76 * foreSize);
            ctx.bezierCurveTo(-0.0214 * foreSize, 0.76 * foreSize, -0.0214 * foreSize, 0.115 * foreSize, -0.0214 * foreSize, 0.115 * foreSize);
            ctx.closePath();
            grad = ctx.createLinearGradient(-0.0189 * foreSize, 0, 0.0013 * foreSize, 0);
            grad.addColorStop(0.0, 'rgba(255, 255, 255, 0.1)');
            grad.addColorStop(0.34, 'rgba(255, 255, 255, 0.5)');
            grad.addColorStop(1.0, 'rgba(255, 255, 255, 0.1)');
            ctx.fillStyle = grad;
            ctx.fill();

            ctx.restore();
        };

        var drawBackgroundImage = function (ctx) {
            var backSize = (vertical ? imageHeight : imageWidth);
            ctx.save();
            if (vertical) {
                ctx.translate(imageWidth / 2, 0);
            } else {
                ctx.translate(imageWidth / 2, imageHeight / 2);
                ctx.rotate(HALF_PI);
                ctx.translate(0, -imageWidth / 2 + imageWidth * 0.05);
            }
            ctx.beginPath();
            ctx.moveTo(-0.0516 * backSize, 0.825 * backSize);
            ctx.bezierCurveTo(-0.0516 * backSize, 0.8525 * backSize, -0.0289 * backSize, 0.875 * backSize, 0.0013 * backSize, 0.875 * backSize);
            ctx.bezierCurveTo(0.0289 * backSize, 0.875 * backSize, 0.0516 * backSize, 0.8525 * backSize, 0.0516 * backSize, 0.825 * backSize);
            ctx.bezierCurveTo(0.0516 * backSize, 0.8075 * backSize, 0.0440 * backSize, 0.7925 * backSize, 0.0314 * backSize, 0.7825 * backSize);
            ctx.bezierCurveTo(0.0314 * backSize, 0.7825 * backSize, 0.0314 * backSize, 0.12 * backSize, 0.0314 * backSize, 0.12 * backSize);
            ctx.bezierCurveTo(0.0314 * backSize, 0.1025 * backSize, 0.0189 * backSize, 0.0875 * backSize, 0.0013 * backSize, 0.0875 * backSize);
            ctx.bezierCurveTo(-0.0163 * backSize, 0.0875 * backSize, -0.0289 * backSize, 0.1025 * backSize, -0.0289 * backSize, 0.12 * backSize);
            ctx.bezierCurveTo(-0.0289 * backSize, 0.12 * backSize, -0.0289 * backSize, 0.7825 * backSize, -0.0289 * backSize, 0.7825 * backSize);
            ctx.bezierCurveTo(-0.0415 * backSize, 0.79 * backSize, -0.0516 * backSize, 0.805 * backSize, -0.0516 * backSize, 0.825 * backSize);
            ctx.closePath();
            var grad = ctx.createLinearGradient(-0.0163 * backSize, 0, 0.0289 * backSize, 0);
            grad.addColorStop(0, 'rgba(226, 226, 226, 0.5)');
            grad.addColorStop(0.5, 'rgba(226, 226, 226, 0.2)');
            grad.addColorStop(1, 'rgba(226, 226, 226, 0.5)');
            ctx.fillStyle = grad;
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(153, 153, 153, 0.5)';
            ctx.stroke();
            ctx.restore();
        };

        //************************************ Public methods **************************************
        this.setValue = function (newValue) {
            newValue = parseFloat(newValue);
            var targetValue = (newValue < minValue ? minValue : (newValue > maxValue ? maxValue : newValue));
            if (value !== targetValue) {
                value = targetValue;

                if (value > maxMeasuredValue) {
                    maxMeasuredValue = value;
                }
                if (value < minMeasuredValue) {
                    minMeasuredValue = value;
                }

                if ((value >= threshold && !ledBlinking && thresholdRising) ||
                    (value <= threshold && !ledBlinking && !thresholdRising)) {
                    ledBlinking = true;
                    blink(ledBlinking);
                    if (playAlarm) {
                        audioElement.play();
                    }
                } else if ((value < threshold && ledBlinking && thresholdRising) ||
                           (value > threshold && ledBlinking && !thresholdRising)) {
                    ledBlinking = false;
                    blink(ledBlinking);
                    if (playAlarm) {
                        audioElement.pause();
                    }
                }

                this.repaint();
            }
            return this;
        };

        this.getValue = function () {
            return value;
        };

        this.setValueAnimated = function (newValue, callback) {
            var targetValue,
                gauge = this,
                time;
            newValue = parseFloat(newValue);
            targetValue = (newValue < minValue ? minValue : (newValue > maxValue ? maxValue : newValue));
            if (value !== targetValue) {
                if (undefined !== tween && tween.isPlaying) {
                    tween.stop();
                }

                time = fullScaleDeflectionTime * Math.abs(targetValue - value) / (maxValue - minValue);
                time = Math.max(time, fullScaleDeflectionTime / 5);
                tween = new Tween({}, '', Tween.regularEaseInOut, value, targetValue, time);
                //tween = new Tween({}, '', Tween.regularEaseInOut, value, targetValue, 1);

                tween.onMotionChanged = function (event) {
                    value = event.target._pos;
                    if (value > maxMeasuredValue) {
                        maxMeasuredValue = value;
                    }
                    if (value < minMeasuredValue) {
                        minMeasuredValue = value;
                    }

                    if ((value >= threshold && !ledBlinking && thresholdRising) ||
                        (value <= threshold && !ledBlinking && !thresholdRising)) {
                        ledBlinking = true;
                        blink(ledBlinking);
                        if (playAlarm) {
                            audioElement.play();
                        }
                    } else if ((value < threshold && ledBlinking && thresholdRising) ||
                               (value > threshold && ledBlinking && !thresholdRising)) {
                        ledBlinking = false;
                        blink(ledBlinking);
                        if (playAlarm) {
                            audioElement.pause();
                        }
                    }
                    if (!repainting) {
                        repainting = true;
                        requestAnimFrame(gauge.repaint);
                    }
                };

                // do we have a callback function to process?
                if (callback && typeof(callback) === "function") {
                    tween.onMotionFinished = callback;
                }

                tween.start();
            }
            return this;
        };

        this.resetMinMeasuredValue = function () {
            minMeasuredValue = value;
            this.repaint();
            return this;
        };

        this.resetMaxMeasuredValue = function () {
            maxMeasuredValue = value;
            this.repaint();
            return this;
        };

        this.setMinMeasuredValueVisible = function (visible) {
            minMeasuredValueVisible = !!visible;
            this.repaint();
            return this;
        };

        this.setMaxMeasuredValueVisible = function (visible) {
            maxMeasuredValueVisible = !!visible;
            this.repaint();
            return this;
        };

        this.setThreshold = function (threshVal) {
            threshVal = parseFloat(threshVal);
            var targetValue = (threshVal < minValue ? minValue : (threshVal > maxValue ? maxValue : threshVal));
            threshold = targetValue;
            resetBuffers({background: true});
            init({background: true});
            this.repaint();
            return this;
        };

        this.setThresholdVisible = function (visible) {
            thresholdVisible = !!visible;
            this.repaint();
            return this;
        };

        this.setThresholdRising = function (rising) {
            thresholdRising = !!rising;
            // reset existing threshold alerts
            ledBlinking = !ledBlinking;
            blink(ledBlinking);
            this.repaint();
            return this;
        };

        this.setLcdDecimals = function (decimals) {
            lcdDecimals = parseInt(decimals, 10);
            this.repaint();
            return this;
        };

        this.setFrameDesign = function (newFrameDesign) {
            resetBuffers({frame: true});
            frameDesign = newFrameDesign;
            init({frame: true});
            this.repaint();
            return this;
        };

        this.setBackgroundColor = function (newBackgroundColor) {
            resetBuffers({background: true});
            backgroundColor = newBackgroundColor;
            init({background: true});
            this.repaint();
            return this;
        };

        this.setValueColor = function (newValueColor) {
            resetBuffers({foreground: true});
            valueColor = newValueColor;
            init({foreground: true});
            this.repaint();
            return this;
        };

        this.setLedColor = function (newLedColor) {
            resetBuffers({led: true});
            ledColor = newLedColor;
            init({led: true});
            this.repaint();
            return this;
        };

        this.setLedVisible = function (visible) {
            ledVisible = !!visible;
            this.repaint();
            return this;
        };

        this.setLcdColor = function (newLcdColor) {
            resetBuffers({background: true});
            lcdColor = newLcdColor;
            init({background: true});
            this.repaint();
            return this;
        };

        this.setMaxMeasuredValue = function (newVal) {
            newVal = parseFloat(newVal);
            var targetValue = (newVal < minValue ? minValue : (newVal > maxValue ? maxValue : newVal));
            maxMeasuredValue = targetValue;
            this.repaint();
            return this;
        };

        this.setMinMeasuredValue = function (newVal) {
            newVal = parseFloat(newVal);
            var targetValue = (newVal < minValue ? minValue : (newVal > maxValue ? maxValue : newVal));
            minMeasuredValue = targetValue;
            this.repaint();
            return this;
        };

        this.setTitleString = function (title) {
            titleString = title;
            resetBuffers({background: true});
            init({background: true});
            this.repaint();
            return this;
        };

        this.setUnitString = function (unit) {
            unitString = unit;
            resetBuffers({background: true});
            init({background: true});
            this.repaint();
            return this;
        };

        this.setMinValue = function (newVal) {
            resetBuffers({background: true});
            minValue = parseFloat(newVal);
            if (minMeasuredValue < minValue) {
                minMeasuredValue = minValue;
            }
            if (value < minValue) {
                value = minValue;
            }
            init({background: true});
            this.repaint();
            return this;
        };

        this.getMinValue = function () {
            return minValue;
        };

        this.setMaxValue = function (newVal) {
            resetBuffers({background: true});
            maxValue = parseFloat(newVal);
            if (maxMeasuredValue > maxValue) {
                maxMeasuredValue = maxValue;
            }
            if (value > maxValue) {
                value = maxValue;
            }
            init({background: true});
            this.repaint();
            return this;
        };

        this.getMaxValue = function () {
            return maxValue;
        };

        this.repaint = function () {
            if (!initialized) {
                init({frame: true,
                      background: true,
                      led: true,
                      foreground: true});
            }

            mainCtx.clearRect(0, 0, mainCtx.canvas.width, mainCtx.canvas.height);

            // Draw frame
            if (frameVisible) {
                mainCtx.drawImage(frameBuffer, 0, 0);
            }

            // Draw buffered image to visible canvas
            mainCtx.drawImage(backgroundBuffer, 0, 0);

            // Draw lcd display
            if (lcdVisible) {
                drawLcdText(mainCtx, value, vertical);
            }

            // Draw led
            if (ledVisible) {
                mainCtx.drawImage(ledBuffer, ledPosX, ledPosY);
            }

            var valuePos;
            var yOffset;
            var yRange;
            var minMaxX, minMaxY;
            // Draw min measured value indicator
            if (minMeasuredValueVisible) {
                if (vertical) {
                    yOffset = (gaugeType.type === 'type1' ? 0.856796 : 0.7475);
                    yRange = (yOffset - 0.128640);
                    valuePos = imageHeight * yOffset - (imageHeight * yRange) * (minMeasuredValue - minValue) / (maxValue - minValue);
                    minMaxX = imageWidth * 0.34 - minMeasuredValueBuffer.width;
                    minMaxY = valuePos - minMeasuredValueBuffer.height / 2;
                } else {
                    yOffset = (gaugeType.type === 'type1' ? 0.871012 : 0.82);
                    yRange = yOffset - (gaugeType.type === 'type1' ? 0.142857 : 0.19857);
                    valuePos = (imageWidth * yRange) * (minMeasuredValue - minValue) / (maxValue - minValue);
                    minMaxX = imageWidth * (gaugeType.type === 'type1' ? 0.142857 : 0.19857) - minMeasuredValueBuffer.height / 2 + valuePos;
                    minMaxY = imageHeight * 0.65;
                }
                mainCtx.drawImage(minMeasuredValueBuffer, minMaxX, minMaxY);
            }

            // Draw max measured value indicator
            if (maxMeasuredValueVisible) {
                if (vertical) {
                    valuePos = imageHeight * yOffset - (imageHeight * yRange) * (maxMeasuredValue - minValue) / (maxValue - minValue);
                    minMaxX = imageWidth * 0.34 - maxMeasuredValueBuffer.width;
                    minMaxY = valuePos - maxMeasuredValueBuffer.height / 2;
                } else {
                    yOffset = (gaugeType.type === 'type1' ? 0.871012 : 0.8);
                    yRange = yOffset - (gaugeType.type === 'type1' ? 0.14857 : 0.19857);
                    valuePos = (imageWidth * yRange) * (maxMeasuredValue - minValue) / (maxValue - minValue);
                    minMaxX = imageWidth * (gaugeType.type === 'type1' ? 0.142857 : 0.19857) - maxMeasuredValueBuffer.height / 2 + valuePos;
                    minMaxY = imageHeight * 0.65;
                }
                mainCtx.drawImage(maxMeasuredValueBuffer, minMaxX, minMaxY);
            }

            mainCtx.save();
            drawValue(mainCtx, imageWidth, imageHeight);
            mainCtx.restore();

            // Draw foreground
            if (foregroundVisible || gaugeType.type === 'type2') {
                mainCtx.drawImage(foregroundBuffer, 0, 0);
            }

            repainting = false;
        };

        // Visualize the component
        this.repaint();

        return this;
    };

    var linearBargraph = function (canvas, parameters) {
        parameters = parameters || {};
        var width = (undefined === parameters.width ? 0 : parameters.width),
            height = (undefined === parameters.height ? 0 : parameters.height),
            minValue = (undefined === parameters.minValue ? 0 : parameters.minValue),
            maxValue = (undefined === parameters.maxValue ? (minValue + 100) : parameters.maxValue),
            section = (undefined === parameters.section ? null : parameters.section),
            useSectionColors = (undefined === parameters.useSectionColors ? false : parameters.useSectionColors),
            niceScale = (undefined === parameters.niceScale ? true : parameters.niceScale),
            threshold = (undefined === parameters.threshold ? (maxValue - minValue) / 2 + minValue: parameters.threshold),
            titleString = (undefined === parameters.titleString ? '' : parameters.titleString),
            unitString = (undefined === parameters.unitString ? '' : parameters.unitString),
            frameDesign = (undefined === parameters.frameDesign ? steelseries.FrameDesign.METAL : parameters.frameDesign),
            frameVisible = (undefined === parameters.frameVisible ? true : parameters.frameVisible),
            backgroundColor = (undefined === parameters.backgroundColor ? steelseries.BackgroundColor.DARK_GRAY : parameters.backgroundColor),
            backgroundVisible = (undefined === parameters.backgroundVisible ? true : parameters.backgroundVisible),
            valueColor = (undefined === parameters.valueColor ? steelseries.ColorDef.RED : parameters.valueColor),
            lcdColor = (undefined === parameters.lcdColor ? steelseries.LcdColor.STANDARD : parameters.lcdColor),
            lcdVisible = (undefined === parameters.lcdVisible ? true : parameters.lcdVisible),
            lcdDecimals = (undefined === parameters.lcdDecimals ? 2 : parameters.lcdDecimals),
            digitalFont = (undefined === parameters.digitalFont ? false : parameters.digitalFont),
            ledColor = (undefined === parameters.ledColor ? steelseries.LedColor.RED_LED : parameters.ledColor),
            ledVisible = (undefined === parameters.ledVisible ? true : parameters.ledVisible),
            thresholdVisible = (undefined === parameters.thresholdVisible ? true : parameters.thresholdVisible),
            thresholdRising = (undefined === parameters.thresholdRising ? true : parameters.thresholdRising),
            minMeasuredValueVisible = (undefined === parameters.minMeasuredValueVisible ? false : parameters.minMeasuredValueVisible),
            maxMeasuredValueVisible = (undefined === parameters.maxMeasuredValueVisible ? false : parameters.maxMeasuredValueVisible),
            labelNumberFormat = (undefined === parameters.labelNumberFormat ? steelseries.LabelNumberFormat.STANDARD : parameters.labelNumberFormat),
            foregroundVisible = (undefined === parameters.foregroundVisible ? true : parameters.foregroundVisible),
            playAlarm = (undefined === parameters.playAlarm ? false : parameters.playAlarm),
            alarmSound = (undefined === parameters.alarmSound ? false : parameters.alarmSound),
            valueGradient = (undefined === parameters.valueGradient ? null : parameters.valueGradient),
            useValueGradient = (undefined === parameters.useValueGradient ? false : parameters.useValueGradient),
            fullScaleDeflectionTime = (undefined === parameters.fullScaleDeflectionTime ? 2.5 : parameters.fullScaleDeflectionTime);

        // Get the canvas context and clear it
        var mainCtx = getCanvasContext(canvas);
        // Has a size been specified?
        if (width === 0) {
            width = mainCtx.canvas.width;
        }
        if (height === 0) {
            height = mainCtx.canvas.height;
        }

        // Set the size - also clears the canvas
        mainCtx.canvas.width = width;
        mainCtx.canvas.height = height;

        var imageWidth = width;
        var imageHeight = height;

        // Create audio tag for alarm sound
        if (playAlarm && alarmSound !== false) {
            var audioElement = doc.createElement('audio');
            audioElement.setAttribute('src', alarmSound);
            audioElement.setAttribute('preload', 'auto');
        }

        var self = this;
        var value = minValue;

        // Properties
        var minMeasuredValue = maxValue;
        var maxMeasuredValue = minValue;

        var tween;
        var ledBlinking = false;
        var repainting = false;
        var isSectionsVisible = false;
        var isGradientVisible = false;
        var sectionPixels = [];
        var ledTimerId = 0;

        var vertical = width <= height;

        // Constants
        var ledPosX;
        var ledPosY;
        var ledSize = Math.round((vertical ? height : width) * 0.05);
        var minMaxIndSize = Math.round((vertical ? width : height) * 0.05);
        var stdFont;
        var lcdFont;

        if (vertical) {
            ledPosX = imageWidth / 2 - ledSize / 2;
            ledPosY = 0.053 * imageHeight;
            stdFont = Math.floor(imageHeight / 22) + 'px ' + stdFontName;
            lcdFont = Math.floor(imageHeight / 22) + 'px ' + lcdFontName;
        } else {
            ledPosX = 0.89 * imageWidth;
            ledPosY = imageHeight / 1.95 - ledSize / 2;
            stdFont = Math.floor(imageHeight / 10) + 'px ' + stdFontName;
            lcdFont = Math.floor(imageHeight / 10) + 'px ' + lcdFontName;
        }

        var initialized = false;

        // Tickmark specific private variables
        var niceMinValue = minValue;
        var niceMaxValue = maxValue;
        var niceRange = maxValue - minValue;
        var range = niceMaxValue - niceMinValue;
        var minorTickSpacing = 0;
        var majorTickSpacing = 0;
        var maxNoOfMinorTicks = 10;
        var maxNoOfMajorTicks = 10;

        // Method to calculate nice values for min, max and range for the tickmarks
        var calculate = function calculate() {
            if (niceScale) {
                niceRange = calcNiceNumber(maxValue - minValue, false);
                majorTickSpacing = calcNiceNumber(niceRange / (maxNoOfMajorTicks - 1), true);
                niceMinValue = Math.floor(minValue / majorTickSpacing) * majorTickSpacing;
                niceMaxValue = Math.ceil(maxValue / majorTickSpacing) * majorTickSpacing;
                minorTickSpacing = calcNiceNumber(majorTickSpacing / (maxNoOfMinorTicks - 1), true);
                minValue = niceMinValue;
                maxValue = niceMaxValue;
                range = maxValue - minValue;
            } else {
                niceRange = (maxValue - minValue);
                niceMinValue = minValue;
                niceMaxValue = maxValue;
                range = niceRange;
                minorTickSpacing = 1;
                majorTickSpacing = 10;
            }
        };

        // **************   Buffer creation  ********************
        // Buffer for the frame
        var frameBuffer = createBuffer(width, height);
        var frameContext = frameBuffer.getContext('2d');

        // Buffer for the background
        var backgroundBuffer = createBuffer(width, height);
        var backgroundContext = backgroundBuffer.getContext('2d');

        var lcdBuffer;

        // Buffer for active bargraph led
        var activeLedBuffer = doc.createElement('canvas');
        if (vertical) {
            activeLedBuffer.width = imageWidth * 0.121428;
            activeLedBuffer.height = imageHeight * 0.012135;
        } else {
            activeLedBuffer.width = imageWidth * 0.012135;
            activeLedBuffer.height = imageHeight * 0.121428;
        }
        var activeLedContext = activeLedBuffer.getContext('2d');

        // Buffer for active bargraph led
        var inActiveLedBuffer = doc.createElement('canvas');
        if (vertical) {
            inActiveLedBuffer.width = imageWidth * 0.121428;
            inActiveLedBuffer.height = imageHeight * 0.012135;
        } else {
            inActiveLedBuffer.width = imageWidth * 0.012135;
            inActiveLedBuffer.height = imageHeight * 0.121428;
        }
        var inActiveLedContext = inActiveLedBuffer.getContext('2d');

        // Buffer for led on painting code
        var ledBufferOn = createBuffer(ledSize, ledSize);
        var ledContextOn = ledBufferOn.getContext('2d');

        // Buffer for led off painting code
        var ledBufferOff = createBuffer(ledSize, ledSize);
        var ledContextOff = ledBufferOff.getContext('2d');

        // Buffer for current led painting code
        var ledBuffer = ledBufferOff;

        // Buffer for the minMeasuredValue indicator
        var minMeasuredValueBuffer = createBuffer(minMaxIndSize, minMaxIndSize);
        var minMeasuredValueCtx = minMeasuredValueBuffer.getContext('2d');

        // Buffer for the maxMeasuredValue indicator
        var maxMeasuredValueBuffer = createBuffer(minMaxIndSize, minMaxIndSize);
        var maxMeasuredValueCtx = maxMeasuredValueBuffer.getContext('2d');

        // Buffer for static foreground painting code
        var foregroundBuffer = createBuffer(width, height);
        var foregroundContext = foregroundBuffer.getContext('2d');

        // **************   Image creation  ********************
        var drawLcdText = function (ctx, value, vertical) {
            ctx.save();
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            ctx.strokeStyle = lcdColor.textColor;
            ctx.fillStyle = lcdColor.textColor;

            if (lcdColor === steelseries.LcdColor.STANDARD || lcdColor === steelseries.LcdColor.STANDARD_GREEN) {
                ctx.shadowColor = 'gray';
                if (vertical) {
                    ctx.shadowOffsetX = imageWidth * 0.007;
                    ctx.shadowOffsetY = imageWidth * 0.007;
                    ctx.shadowBlur = imageWidth * 0.009;
                } else {
                    ctx.shadowOffsetX = imageHeight * 0.007;
                    ctx.shadowOffsetY = imageHeight * 0.007;
                    ctx.shadowBlur = imageHeight * 0.009;
                }
            }

            var lcdTextX;
            var lcdTextY;
            var lcdTextWidth;

            if (digitalFont) {
                ctx.font = lcdFont;
            } else {
                ctx.font = stdFont;
            }

            if (vertical) {
                lcdTextX = (imageWidth - (imageWidth * 0.571428)) / 2 + 1 + imageWidth * 0.571428 - 2;
                lcdTextY = imageHeight * 0.88 + 1 + (imageHeight * 0.055 - 2) / 2;
                lcdTextWidth = imageWidth * 0.7 - 2;
            } else {
                lcdTextX = (imageWidth * 0.695) + imageWidth * 0.18 - 2;
                lcdTextY = (imageHeight * 0.22) + 1 + (imageHeight * 0.15 - 2) / 2;
                lcdTextWidth = imageHeight * 0.22 - 2;
            }

            ctx.fillText(value.toFixed(lcdDecimals), lcdTextX, lcdTextY, lcdTextWidth);

            ctx.restore();
        };

        var createThresholdImage = function (vertical) {
            var thresholdBuffer = doc.createElement('canvas');
            thresholdBuffer.height = thresholdBuffer.width = minMaxIndSize;
            var thresholdCtx = thresholdBuffer.getContext('2d');

            thresholdCtx.save();
            var gradThreshold = thresholdCtx.createLinearGradient(0, 0.1, 0, thresholdBuffer.height * 0.9);
            gradThreshold.addColorStop(0, '#520000');
            gradThreshold.addColorStop(0.3, '#fc1d00');
            gradThreshold.addColorStop(0.59, '#fc1d00');
            gradThreshold.addColorStop(1, '#520000');
            thresholdCtx.fillStyle = gradThreshold;

            if (vertical) {
                thresholdCtx.beginPath();
                thresholdCtx.moveTo(0.1, thresholdBuffer.height * 0.5);
                thresholdCtx.lineTo(thresholdBuffer.width * 0.9, 0.1);
                thresholdCtx.lineTo(thresholdBuffer.width * 0.9, thresholdBuffer.height * 0.9);
                thresholdCtx.closePath();
            } else {
                thresholdCtx.beginPath();
                thresholdCtx.moveTo(0.1, 0.1);
                thresholdCtx.lineTo(thresholdBuffer.width * 0.9, 0.1);
                thresholdCtx.lineTo(thresholdBuffer.width * 0.5, thresholdBuffer.height * 0.9);
                thresholdCtx.closePath();
            }

            thresholdCtx.fill();
            thresholdCtx.strokeStyle = '#FFFFFF';
            thresholdCtx.stroke();

            thresholdCtx.restore();

            return thresholdBuffer;
        };

        var drawTickmarksImage = function (ctx, labelNumberFormat, vertical) {
            backgroundColor.labelColor.setAlpha(1);
            ctx.save();
            ctx.textBaseline = 'middle';
            var TEXT_WIDTH = imageWidth * 0.1;
            ctx.strokeStyle = backgroundColor.labelColor.getRgbaColor();
            ctx.fillStyle = backgroundColor.labelColor.getRgbaColor();

            var valueCounter = minValue;
            var majorTickCounter = maxNoOfMinorTicks - 1;
            var tickCounter;
            var currentPos;
            var scaleBoundsX;
            var scaleBoundsY;
            var scaleBoundsW;
            var scaleBoundsH;
            var tickSpaceScaling = 1;

            var minorTickStart;
            var minorTickStop;
            var mediumTickStart;
            var mediumTickStop;
            var majorTickStart;
            var majorTickStop;
            if (vertical) {
                minorTickStart = (0.34 * imageWidth);
                minorTickStop = (0.36 * imageWidth);
                mediumTickStart = (0.33 * imageWidth);
                mediumTickStop = (0.36 * imageWidth);
                majorTickStart = (0.32 * imageWidth);
                majorTickStop = (0.36 * imageWidth);
                ctx.textAlign = 'right';
                scaleBoundsX = 0;
                scaleBoundsY = imageHeight * 0.128640;
                scaleBoundsW = 0;
                scaleBoundsH = (imageHeight * 0.856796 - imageHeight * 0.128640);
                tickSpaceScaling = scaleBoundsH / (maxValue - minValue);
            } else {
                minorTickStart = (0.65 * imageHeight);
                minorTickStop = (0.63 * imageHeight);
                mediumTickStart = (0.66 * imageHeight);
                mediumTickStop = (0.63 * imageHeight);
                majorTickStart = (0.67 * imageHeight);
                majorTickStop = (0.63 * imageHeight);
                ctx.textAlign = 'center';
                scaleBoundsX = imageWidth * 0.142857;
                scaleBoundsY = 0;
                scaleBoundsW = (imageWidth * 0.871012 - imageWidth * 0.142857);
                scaleBoundsH = 0;
                tickSpaceScaling = scaleBoundsW / (maxValue - minValue);
            }

            var labelCounter;
            for (labelCounter = minValue, tickCounter = 0; labelCounter <= maxValue; labelCounter += minorTickSpacing, tickCounter += minorTickSpacing) {

                // Calculate the bounds of the scaling
                if (vertical) {
                    currentPos = scaleBoundsY + scaleBoundsH - tickCounter * tickSpaceScaling;
                } else {
                    currentPos = scaleBoundsX + tickCounter * tickSpaceScaling;
                }

                majorTickCounter++;

                // Draw tickmark every major tickmark spacing
                if (majorTickCounter === maxNoOfMinorTicks) {

                    // Draw the major tickmarks
                    ctx.lineWidth = 1.5;
                    drawLinearTicks(ctx, majorTickStart, majorTickStop, currentPos, vertical);

                    // Draw the standard tickmark labels
                    if (vertical) {
                        // Vertical orientation
                        switch (labelNumberFormat.format) {
                        case 'fractional':
                            ctx.fillText((valueCounter.toFixed(2)), imageWidth * 0.28, currentPos, TEXT_WIDTH);
                            break;

                        case 'scientific':
                            ctx.fillText((valueCounter.toPrecision(2)), imageWidth * 0.28, currentPos, TEXT_WIDTH);
                            break;

                        case 'standard':
                        /* falls through */
                        default:
                            ctx.fillText((valueCounter.toFixed(0)), imageWidth * 0.28, currentPos, TEXT_WIDTH);
                            break;
                        }
                    } else {
                        // Horizontal orientation
                        switch (labelNumberFormat.format) {
                        case 'fractional':
                            ctx.fillText((valueCounter.toFixed(2)), currentPos, (imageHeight * 0.73), TEXT_WIDTH);
                            break;

                        case 'scientific':
                            ctx.fillText((valueCounter.toPrecision(2)), currentPos, (imageHeight * 0.73), TEXT_WIDTH);
                            break;

                        case 'standard':
                        /* falls through */
                        default:
                            ctx.fillText((valueCounter.toFixed(0)), currentPos, (imageHeight * 0.73), TEXT_WIDTH);
                            break;
                        }
                    }

                    valueCounter += majorTickSpacing;
                    majorTickCounter = 0;
                    continue;
                }

                // Draw tickmark every minor tickmark spacing
                if (0 === maxNoOfMinorTicks % 2 && majorTickCounter === (maxNoOfMinorTicks / 2)) {
                    ctx.lineWidth = 1;
                    drawLinearTicks(ctx, mediumTickStart, mediumTickStop, currentPos, vertical);
                } else {
                    ctx.lineWidth = 0.5;
                    drawLinearTicks(ctx, minorTickStart, minorTickStop, currentPos, vertical);
                }
            }

            ctx.restore();
        };

        var drawLinearTicks = function (ctx, tickStart, tickStop, currentPos, vertical) {
            if (vertical) {
                // Vertical orientation
                ctx.beginPath();
                ctx.moveTo(tickStart, currentPos);
                ctx.lineTo(tickStop, currentPos);
                ctx.closePath();
                ctx.stroke();
            } else {
                // Horizontal orientation
                ctx.beginPath();
                ctx.moveTo(currentPos, tickStart);
                ctx.lineTo(currentPos, tickStop);
                ctx.closePath();
                ctx.stroke();
            }
        };

        // **************   Initialization  ********************
        var init = function (parameters) {
            parameters = parameters || {};
            var drawFrame = (undefined === parameters.frame ? false : parameters.frame);
            var drawBackground = (undefined === parameters.background ? false : parameters.background);
            var drawLed = (undefined === parameters.led ? false : parameters.led);
            var drawForeground = (undefined === parameters.foreground ? false : parameters.foreground);
            var drawBargraphLed = (undefined === parameters.bargraphled ? false : parameters.bargraphled);

            initialized = true;

            // Calculate the current min and max values and the range
            calculate();

            // Create frame in frame buffer (backgroundBuffer)
            if (drawFrame && frameVisible) {
                drawLinearFrameImage(frameContext, frameDesign, imageWidth, imageHeight, vertical);
            }

            // Create background in background buffer (backgroundBuffer)
            if (drawBackground && backgroundVisible) {
                drawLinearBackgroundImage(backgroundContext, backgroundColor, imageWidth, imageHeight, vertical);
            }

            if (drawLed) {
                if (vertical) {
                    // Draw LED ON in ledBuffer_ON
                    ledContextOn.drawImage(createLedImage(ledSize, 1, ledColor), 0, 0);

                    // Draw LED ON in ledBuffer_OFF
                    ledContextOff.drawImage(createLedImage(ledSize, 0, ledColor), 0, 0);
                } else {
                    // Draw LED ON in ledBuffer_ON
                    ledContextOn.drawImage(createLedImage(ledSize, 1, ledColor), 0, 0);

                    // Draw LED ON in ledBuffer_OFF
                    ledContextOff.drawImage(createLedImage(ledSize, 0, ledColor), 0, 0);
                }
            }

            // Draw min measured value indicator in minMeasuredValueBuffer
            if (minMeasuredValueVisible) {
                if (vertical) {
                    minMeasuredValueCtx.drawImage(createMeasuredValueImage(minMaxIndSize, steelseries.ColorDef.BLUE.dark.getRgbaColor(), false, vertical), 0, 0);
                } else {
                    minMeasuredValueCtx.drawImage(createMeasuredValueImage(minMaxIndSize, steelseries.ColorDef.BLUE.dark.getRgbaColor(), false, vertical), 0, 0);
                }
            }

            // Draw max measured value indicator in maxMeasuredValueBuffer
            if (maxMeasuredValueVisible) {
                if (vertical) {
                    maxMeasuredValueCtx.drawImage(createMeasuredValueImage(minMaxIndSize, steelseries.ColorDef.RED.medium.getRgbaColor(), false, vertical), 0, 0);
                } else {
                    maxMeasuredValueCtx.drawImage(createMeasuredValueImage(minMaxIndSize, steelseries.ColorDef.RED.medium.getRgbaColor(), false, vertical), 0, 0);
                }
            }

            // Create alignment posts in background buffer (backgroundBuffer)
            if (drawBackground && backgroundVisible) {
                var valuePos;
                // Create tickmarks in background buffer (backgroundBuffer)
                drawTickmarksImage(backgroundContext, labelNumberFormat, vertical);

                // Draw threshold image to background context
                if (thresholdVisible) {
                    backgroundContext.save();
                    if (vertical) {
                        // Vertical orientation
                        valuePos = imageHeight * 0.856796 - (imageHeight * 0.728155) * (threshold - minValue) / (maxValue - minValue);
                        backgroundContext.translate(imageWidth * 0.365, valuePos - minMaxIndSize / 2);
                    } else {
                        // Horizontal orientation
                        valuePos = (imageWidth * 0.856796 - imageWidth * 0.128640) * (threshold - minValue) / (maxValue - minValue);
                        backgroundContext.translate(imageWidth * 0.142857 - minMaxIndSize / 2 + valuePos, imageHeight * 0.58);
                    }
                    backgroundContext.drawImage(createThresholdImage(vertical), 0, 0);
                    backgroundContext.restore();
                }

                // Create title in background buffer (backgroundBuffer)
                if (vertical) {
                    drawTitleImage(backgroundContext, imageWidth, imageHeight, titleString, unitString, backgroundColor, vertical, null, lcdVisible);
                } else {
                    drawTitleImage(backgroundContext, imageWidth, imageHeight, titleString, unitString, backgroundColor, vertical, null, lcdVisible);
                }
            }

            // Create lcd background if selected in background buffer (backgroundBuffer)
            if (drawBackground && lcdVisible) {
                if (vertical) {
                    lcdBuffer = createLcdBackgroundImage(imageWidth * 0.571428, imageHeight * 0.055, lcdColor);
                    backgroundContext.drawImage(lcdBuffer, ((imageWidth - (imageWidth * 0.571428)) / 2), imageHeight * 0.88);
                } else {
                    lcdBuffer = createLcdBackgroundImage(imageWidth * 0.18, imageHeight * 0.15, lcdColor);
                    backgroundContext.drawImage(lcdBuffer, imageWidth * 0.695, imageHeight * 0.22);
                }
            }

            // Draw leds of bargraph
            if (drawBargraphLed) {
                drawInActiveLed(inActiveLedContext);
                drawActiveLed(activeLedContext, valueColor);
            }

            // Convert Section values into pixels
            isSectionsVisible = false;
            if (null !== section && 0 < section.length) {
                isSectionsVisible = true;
                var sectionIndex = section.length;
                var top, bottom, fullSize, ledWidth2;

                if (vertical) {
                    // Vertical orientation
                    top =  imageHeight * 0.128640; // position of max value
                    bottom = imageHeight * 0.856796; // position of min value
                    fullSize = bottom - top;
                    ledWidth2 = 0;
                } else {
                    // Horizontal orientation
                    top = imageWidth * 0.856796; // position of max value
                    bottom = imageWidth * 0.128640;
                    fullSize = top - bottom;
                    ledWidth2 = imageWidth * 0.012135 / 2;
                }
                sectionPixels = [];
                do {
                    sectionIndex--;
                    sectionPixels.push({start: (((section[sectionIndex].start + Math.abs(minValue)) / (maxValue - minValue)) * fullSize - ledWidth2),
                                         stop: (((section[sectionIndex].stop + Math.abs(minValue)) / (maxValue - minValue)) * fullSize - ledWidth2),
                                        color: customColorDef(section[sectionIndex].color)});
                } while (0 < sectionIndex);
            }

            // Use a gradient for the valueColor?
            isGradientVisible = false;
            if (useValueGradient && valueGradient !== null) {
                // force section colors off!
                isSectionsVisible = false;
                isGradientVisible = true;
            }

            // Create foreground in foreground buffer (foregroundBuffer)
            if (drawForeground && foregroundVisible) {
                drawLinearForegroundImage(foregroundContext, imageWidth, imageHeight, vertical, false);
            }
        };

        var resetBuffers = function (buffers) {
            buffers = buffers || {};
            var resetFrame = (undefined === buffers.frame ? false : buffers.frame);
            var resetBackground = (undefined === buffers.background ? false : buffers.background);
            var resetLed = (undefined === buffers.led ? false : buffers.led);
            var resetBargraphLed = (undefined === buffers.bargraphled ? false : buffers.bargraphled);
            var resetForeground = (undefined === buffers.foreground ? false : buffers.foreground);

            if (resetFrame) {
                frameBuffer.width = width;
                frameBuffer.height = height;
                frameContext = frameBuffer.getContext('2d');
            }

            if (resetBackground) {
                backgroundBuffer.width = width;
                backgroundBuffer.height = height;
                backgroundContext = backgroundBuffer.getContext('2d');
            }

            if (resetBargraphLed) {
                if (vertical) {
                    activeLedBuffer.width = width * 0.121428;
                    activeLedBuffer.height = height * 0.012135;
                } else {
                    activeLedBuffer.width = width * 0.012135;
                    activeLedBuffer.height = height * 0.121428;
                }
                activeLedContext = activeLedBuffer.getContext('2d');

                // Buffer for active bargraph led
                if (vertical) {
                    inActiveLedBuffer.width = width * 0.121428;
                    inActiveLedBuffer.height = height * 0.012135;
                } else {
                    inActiveLedBuffer.width = width * 0.012135;
                    inActiveLedBuffer.height = height * 0.121428;
                }
                inActiveLedContext = inActiveLedBuffer.getContext('2d');
            }

            if (resetLed) {
                ledBufferOn.width = Math.ceil(width * 0.093457);
                ledBufferOn.height = Math.ceil(height * 0.093457);
                ledContextOn = ledBufferOn.getContext('2d');

                ledBufferOff.width = Math.ceil(width * 0.093457);
                ledBufferOff.height = Math.ceil(height * 0.093457);
                ledContextOff = ledBufferOff.getContext('2d');

                // Buffer for current led painting code
                ledBuffer = ledBufferOff;
            }

            if (resetForeground) {
                foregroundBuffer.width = width;
                foregroundBuffer.height = height;
                foregroundContext = foregroundBuffer.getContext('2d');
            }
        };

        var blink = function (blinking) {
            if (blinking) {
                ledTimerId = setInterval(toggleAndRepaintLed, 1000);
            } else {
                clearInterval(ledTimerId);
                ledBuffer = ledBufferOff;
            }
        };

        var toggleAndRepaintLed = function () {
            if (ledVisible) {
                if (ledBuffer === ledBufferOn) {
                    ledBuffer = ledBufferOff;
                } else {
                    ledBuffer = ledBufferOn;
                }
                if (!repainting) {
                    repainting = true;
                    requestAnimFrame(self.repaint);
                }
            }
        };

        var drawValue = function (ctx, imageWidth, imageHeight) {
            var top; // position of max value
            var bottom; // position of min value
            var labelColor = backgroundColor.labelColor;
            var fullSize;
            var valueSize;
            var valueTop;
            var valueBackgroundStartX;
            var valueBackgroundStartY;
            var valueBackgroundStopX;
            var valueBackgroundStopY;
            var valueBorderStartX;
            var valueBorderStartY;
            var valueBorderStopX;
            var valueBorderStopY;
            var currentValue;
            var gradRange;
            var fraction;

            // Orientation dependend definitions
            if (vertical) {
                // Vertical orientation
                top =  imageHeight * 0.128640; // position of max value
                bottom = imageHeight * 0.856796; // position of min value
                fullSize = bottom - top;
                valueSize = fullSize * (value - minValue) / (maxValue - minValue);
                valueTop = top + fullSize - valueSize;
                valueBackgroundStartX = 0;
                valueBackgroundStartY = top;
                valueBackgroundStopX = 0;
                valueBackgroundStopY = top + fullSize * 1.014;
            } else {
                // Horizontal orientation
                top = imageWidth * 0.856796; // position of max value
                bottom = imageWidth * 0.128640;
                fullSize = top - bottom;
                valueSize = fullSize * (value - minValue) / (maxValue - minValue);
                valueTop = bottom;
                valueBackgroundStartX = imageWidth * 0.13;
                valueBackgroundStartY = imageHeight * 0.435714;
                valueBackgroundStopX = valueBackgroundStartX + fullSize * 1.035;
                valueBackgroundStopY = valueBackgroundStartY;
            }

            var darker = (backgroundColor === steelseries.BackgroundColor.CARBON ||
                          backgroundColor === steelseries.BackgroundColor.PUNCHED_SHEET ||
                          backgroundColor === steelseries.BackgroundColor.STAINLESS ||
                          backgroundColor === steelseries.BackgroundColor.BRUSHED_STAINLESS ||
                          backgroundColor === steelseries.BackgroundColor.TURNED) ? 0.3 : 0;

            var valueBackgroundTrackGradient = ctx.createLinearGradient(valueBackgroundStartX, valueBackgroundStartY, valueBackgroundStopX, valueBackgroundStopY);
            labelColor.setAlpha(0.047058 + darker);
            valueBackgroundTrackGradient.addColorStop(0, labelColor.getRgbaColor());
            labelColor.setAlpha(0.145098 + darker);
            valueBackgroundTrackGradient.addColorStop(0.48, labelColor.getRgbaColor());
            labelColor.setAlpha(0.149019 + darker);
            valueBackgroundTrackGradient.addColorStop(0.49, labelColor.getRgbaColor());
            labelColor.setAlpha(0.047058 + darker);
            valueBackgroundTrackGradient.addColorStop(1, labelColor.getRgbaColor());
            ctx.fillStyle = valueBackgroundTrackGradient;

            if (vertical) {
                ctx.fillRect(imageWidth * 0.435714, top, imageWidth * 0.15, fullSize * 1.014);
            } else {
                ctx.fillRect(valueBackgroundStartX, valueBackgroundStartY, fullSize * 1.035, imageHeight * 0.152857);
            }

            if (vertical) {
                // Vertical orientation
                valueBorderStartX = 0;
                valueBorderStartY = top;
                valueBorderStopX = 0;
                valueBorderStopY = top + fullSize * 1.014;
            } else {
                // Horizontal orientation                ;
                valueBorderStartX = valueBackgroundStartX;
                valueBorderStartY = 0;
                valueBorderStopX = valueBackgroundStopX;
                valueBorderStopY = 0;
            }

            var valueBorderGradient = ctx.createLinearGradient(valueBorderStartX, valueBorderStartY, valueBorderStopX, valueBorderStopY);
            labelColor.setAlpha(0.298039 + darker);
            valueBorderGradient.addColorStop(0, labelColor.getRgbaColor());
            labelColor.setAlpha(0.686274 + darker);
            valueBorderGradient.addColorStop(0.48, labelColor.getRgbaColor());
            labelColor.setAlpha(0.698039 + darker);
            valueBorderGradient.addColorStop(0.49, labelColor.getRgbaColor());
            labelColor.setAlpha(0.4 + darker);
            valueBorderGradient.addColorStop(1, labelColor.getRgbaColor());
            ctx.fillStyle = valueBorderGradient;
            if (vertical) {
                ctx.fillRect(imageWidth * 0.435714, top, imageWidth * 0.007142, fullSize * 1.014);
                ctx.fillRect(imageWidth * 0.571428, top, imageWidth * 0.007142, fullSize * 1.014);
            } else {
                ctx.fillRect(imageWidth * 0.13, imageHeight * 0.435714, fullSize * 1.035, imageHeight * 0.007142);
                ctx.fillRect(imageWidth * 0.13, imageHeight * 0.571428, fullSize * 1.035, imageHeight * 0.007142);
            }

            // Prepare led specific variables
            var ledX;
            var ledY;
            var ledW;
            var ledH;
            var ledCenterX;
            var ledCenterY;
            var activeLeds;
            var inactiveLeds;
            if (vertical) {
                // VERTICAL
                ledX = imageWidth * 0.45;
                ledY = imageHeight * 0.851941;
                ledW = imageWidth * 0.121428;
                ledH = imageHeight * 0.012135;
                ledCenterX = (ledX + ledW) / 2;
                ledCenterY = (ledY + ledH) / 2;
            } else {
                // HORIZONTAL
                ledX = imageWidth * 0.142857;
                ledY = imageHeight * 0.45;
                ledW = imageWidth * 0.012135;
                ledH = imageHeight * 0.121428;
                ledCenterX = (ledX + ledW) / 2;
                ledCenterY = (ledY + ledH) / 2;
            }

            var translateX, translateY;
            var activeLedColor;
            var lastActiveLedColor = valueColor;
            var i;
            // Draw the value
            if (vertical) {
                // Draw the inactive leds
                inactiveLeds = fullSize;
                for (translateY = 0 ; translateY <= inactiveLeds ; translateY += ledH + 1) {
                    ctx.translate(0, -translateY);
                    ctx.drawImage(inActiveLedBuffer, ledX, ledY);
                    ctx.translate(0, translateY);
                }
                // Draw the active leds in dependence on the current value
                activeLeds = ((value - minValue) / (maxValue - minValue)) * fullSize;
                for (translateY = 0 ; translateY <= activeLeds ; translateY += ledH + 1) {
                    //check for LED color
                    activeLedColor = valueColor;
                    // Use a gradient for value colors?
                    if (isGradientVisible) {
                        // Convert pixel back to value
                        currentValue = minValue + (translateY / fullSize) * (maxValue - minValue);
                        gradRange = valueGradient.getEnd() - valueGradient.getStart();
                        fraction = currentValue / gradRange;
                        fraction = Math.max(Math.min(fraction, 1), 0);
                        activeLedColor = customColorDef(valueGradient.getColorAt(fraction).getRgbaColor());
                    } else if (isSectionsVisible) {
                        for (i = 0; i < sectionPixels.length; i++) {
                            if (translateY >= sectionPixels[i].start && translateY < sectionPixels[i].stop) {
                                activeLedColor = sectionPixels[i].color;
                                break;
                            }
                        }
                    }
                    // Has LED color changed? If so redraw the buffer
                    if (lastActiveLedColor.medium.getHexColor() !== activeLedColor.medium.getHexColor()) {
                        drawActiveLed(activeLedContext, activeLedColor);
                        lastActiveLedColor = activeLedColor;
                    }
                    // Draw LED
                    ctx.translate(0, -translateY);
                    ctx.drawImage(activeLedBuffer, ledX, ledY);
                    ctx.translate(0, translateY);
                }
            } else {
                // Draw the inactive leds
                inactiveLeds = fullSize;
                for (translateX = -(ledW / 2) ; translateX <= inactiveLeds ; translateX += ledW + 1) {
                    ctx.translate(translateX, 0);
                    ctx.drawImage(inActiveLedBuffer, ledX, ledY);
                    ctx.translate(-translateX, 0);
                }
                // Draw the active leds in dependence on the current value
                activeLeds = ((value - minValue) / (maxValue - minValue)) * fullSize;
                for (translateX = -(ledW / 2) ; translateX <= activeLeds ; translateX += ledW + 1) {
                    //check for LED color
                    activeLedColor = valueColor;
                    if (isGradientVisible) {
                        // Convert pixel back to value
                        currentValue = minValue + (translateX / fullSize) * (maxValue - minValue);
                        gradRange = valueGradient.getEnd() - valueGradient.getStart();
                        fraction = currentValue / gradRange;
                        fraction = Math.max(Math.min(fraction, 1), 0);
                        activeLedColor = customColorDef(valueGradient.getColorAt(fraction).getRgbaColor());
                    } else if (isSectionsVisible) {
                        for (i = 0; i < sectionPixels.length; i++) {
                            if (translateX >= sectionPixels[i].start && translateX < sectionPixels[i].stop) {
                                activeLedColor = sectionPixels[i].color;
                                break;
                            }
                        }
                    }
                    // Has LED color changed? If so redraw the buffer
                    if (lastActiveLedColor.medium.getHexColor() !== activeLedColor.medium.getHexColor()) {
                        drawActiveLed(activeLedContext, activeLedColor);
                        lastActiveLedColor = activeLedColor;
                    }
                    ctx.translate(translateX, 0);
                    ctx.drawImage(activeLedBuffer, ledX, ledY);
                    ctx.translate(-translateX, 0);
                }
            }
        };

        var drawInActiveLed = function (ctx) {
            ctx.save();
            ctx.beginPath();
            ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.closePath();
            var ledCenterX = (ctx.canvas.width / 2);
            var ledCenterY = (ctx.canvas.height / 2);
            var ledGradient = mainCtx.createRadialGradient(ledCenterX, ledCenterY, 0, ledCenterX, ledCenterY, ctx.canvas.width / 2);
            ledGradient.addColorStop(0, '#3c3c3c');
            ledGradient.addColorStop(1, '#323232');
            ctx.fillStyle = ledGradient;
            ctx.fill();
            ctx.restore();
        };

        var drawActiveLed = function (ctx, color) {
            ctx.save();
            ctx.beginPath();
            ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.closePath();
            var ledCenterX = (ctx.canvas.width / 2);
            var ledCenterY = (ctx.canvas.height / 2);
            var outerRadius;
            if (vertical) {
                outerRadius = ctx.canvas.width / 2;
            } else {
                outerRadius = ctx.canvas.height / 2;
            }
            var ledGradient = mainCtx.createRadialGradient(ledCenterX, ledCenterY, 0, ledCenterX, ledCenterY, outerRadius);
            ledGradient.addColorStop(0, color.light.getRgbaColor());
            ledGradient.addColorStop(1, color.dark.getRgbaColor());
            ctx.fillStyle = ledGradient;
            ctx.fill();
            ctx.restore();
        };

        //************************************ Public methods **************************************
        this.setValue = function (newValue) {
            newValue = parseFloat(newValue);
            var targetValue = (newValue < minValue ? minValue : (newValue > maxValue ? maxValue : newValue));
            if (value !== targetValue) {
                value = targetValue;

                if (value > maxMeasuredValue) {
                    maxMeasuredValue = value;
                }
                if (value < minMeasuredValue) {
                    minMeasuredValue = value;
                }

                if ((value >= threshold && !ledBlinking && thresholdRising) ||
                    (value <= threshold && !ledBlinking && !thresholdRising)) {
                    ledBlinking = true;
                    blink(ledBlinking);
                    if (playAlarm) {
                        audioElement.play();
                    }
                } else if ((value < threshold && ledBlinking && thresholdRising) ||
                           (value > threshold && ledBlinking && !thresholdRising)) {
                    ledBlinking = false;
                    blink(ledBlinking);
                    if (playAlarm) {
                        audioElement.pause();
                    }
                }

                this.repaint();
            }
            return this;
        };

        this.getValue = function () {
            return value;
        };

        this.setValueAnimated = function (newValue, callback) {
            var targetValue,
                gauge = this,
                time;
            newValue = parseFloat(newValue);
            targetValue = (newValue < minValue ? minValue : (newValue > maxValue ? maxValue : newValue));

            if (value !== targetValue) {
                if (undefined !== tween && tween.isPlaying) {
                    tween.stop();
                }

                time = fullScaleDeflectionTime * Math.abs(targetValue - value) / (maxValue - minValue);
                time = Math.max(time, fullScaleDeflectionTime / 5);
                tween = new Tween({}, '', Tween.regularEaseInOut, value, targetValue, time);
                //tween = new Tween({}, '', Tween.regularEaseInOut, value, targetValue, 1);
                //tween = new Tween(new Object(), '', Tween.strongEaseInOut, value, targetValue, 1);
                tween.onMotionChanged = function (event) {
                    value = event.target._pos;

                    if ((value >= threshold && !ledBlinking && thresholdRising) ||
                        (value <= threshold && !ledBlinking && !thresholdRising)) {
                        ledBlinking = true;
                        blink(ledBlinking);
                        if (playAlarm) {
                            audioElement.play();
                        }
                    } else if ((value < threshold && ledBlinking && thresholdRising) ||
                               (value > threshold && ledBlinking && !thresholdRising)) {
                        ledBlinking = false;
                        blink(ledBlinking);
                        if (playAlarm) {
                            audioElement.pause();
                        }
                    }

                    if (value > maxMeasuredValue) {
                        maxMeasuredValue = value;
                    }
                    if (value < minMeasuredValue) {
                        minMeasuredValue = value;
                    }

                    if (!repainting) {
                        repainting = true;
                        requestAnimFrame(gauge.repaint);
                    }
                };

                // do we have a callback function to process?
                if (callback && typeof(callback) === "function") {
                    tween.onMotionFinished = callback;
                }

                tween.start();
            }
            return this;
        };

        this.resetMinMeasuredValue = function () {
            minMeasuredValue = value;
            this.repaint();
            return this;
        };

        this.resetMaxMeasuredValue = function () {
            maxMeasuredValue = value;
            this.repaint();
            return this;
        };

        this.setMinMeasuredValueVisible = function (visible) {
            minMeasuredValueVisible = !!visible;
            this.repaint();
            return this;
        };

        this.setMaxMeasuredValueVisible = function (visible) {
            maxMeasuredValueVisible = !!visible;
            this.repaint();
            return this;
        };

        this.setThresholdVisible = function (visible) {
            thresholdVisible = !!visible;
            this.repaint();
            return this;
        };

        this.setThresholdRising = function (rising) {
            thresholdRising = !!rising;
            // reset existing threshold alerts
            ledBlinking = !ledBlinking;
            blink(ledBlinking);
            this.repaint();
            return this;
        };

        this.setLcdDecimals = function (decimals) {
            lcdDecimals = parseInt(decimals, 10);
            this.repaint();
            return this;
        };

        this.setFrameDesign = function (newFrameDesign) {
            resetBuffers({frame: true});
            frameDesign = newFrameDesign;
            init({frame: true});
            this.repaint();
            return this;
        };

        this.setBackgroundColor = function (newBackgroundColor) {
            resetBuffers({background: true});
            backgroundColor = newBackgroundColor;
            init({background: true});
            this.repaint();
            return this;
        };

        this.setValueColor = function (newValueColor) {
            resetBuffers({bargraphled: true});
            valueColor = newValueColor;
            init({bargraphled: true});
            this.repaint();
            return this;
        };

        this.setLedColor = function (newLedColor) {
            resetBuffers({led: true});
            ledColor = newLedColor;
            init({led: true});
            this.repaint();
            return this;
        };

        this.setLedVisible = function (visible) {
            ledVisible = !!visible;
            this.repaint();
            return this;
        };

        this.setLcdColor = function (newLcdColor) {
            lcdColor = newLcdColor;
            resetBuffers({background: true});
            init({background: true});
            this.repaint();
            return this;
        };

        this.setSection = function (areaSec) {
            section = areaSec;
            init();
            this.repaint();
            return this;
        };

        this.setSectionActive = function (value) {
            useSectionColors = value;
            init();
            this.repaint();
            return this;
        };

        this.setGradient = function (grad) {
            valueGradient = grad;
            init();
            this.repaint();
            return this;
        };

        this.setGradientActive = function (value) {
            useValueGradient = value;
            init();
            this.repaint();
            return this;
        };

        this.setMaxMeasuredValue = function (newValue) {
            newValue = parseFloat(newValue);
            var targetValue = (newValue < minValue ? minValue : (newValue > maxValue ? maxValue : newValue));
            if (maxMeasuredValue !== targetValue) {
                maxMeasuredValue = targetValue;
                this.repaint();
            }
            return this;
        };

        this.setMinMeasuredValue = function (newValue) {
            newValue = parseFloat(newValue);
            var targetValue = (newValue < minValue ? minValue : (newValue > maxValue ? maxValue : newValue));
            if (minMeasuredValue !== targetValue) {
                minMeasuredValue = targetValue;
                this.repaint();
            }
            return this;
        };

        this.setTitleString = function (title) {
            titleString = title;
            resetBuffers({background: true});
            init({background: true});
            this.repaint();
            return this;
        };

        this.setUnitString = function (unit) {
            unitString = unit;
            resetBuffers({background: true});
            init({background: true});
            this.repaint();
            return this;
        };

        this.setMinValue = function (value) {
            minValue = parseFloat(value);
            resetBuffers({background: true,
                          foreground: true,
                          pointer: true});
            init({background: true,
                foreground: true,
                pointer: true});
            this.repaint();
            return this;
        };

        this.getMinValue = function () {
            return minValue;
        };

        this.setMaxValue = function (value) {
            maxValue = parseFloat(value);
            resetBuffers({background: true,
                          foreground: true,
                          pointer: true});
            init({background: true,
                  foreground: true,
                  pointer: true});
            this.repaint();
            return this;
        };

        this.getMaxValue = function () {
            return maxValue;
        };

        this.setThreshold = function (newValue) {
            newValue = parseFloat(newValue);
            var targetValue = (newValue < minValue ? minValue : (newValue > maxValue ? maxValue : newValue));
            if (threshold !== targetValue) {
                threshold = targetValue;
                resetBuffers({background: true});
                init({background: true});
                this.repaint();
            }
            return this;
        };

        this.setThresholdVisible = function (visible) {
            thresholdVisible = !!visible;
            this.repaint();
            return this;
        };

        this.repaint = function () {
            if (!initialized) {
                init({frame: true,
                      background: true,
                      led: true,
                      pointer: true,
                      foreground: true,
                      bargraphled: true});
            }

            //mainCtx.save();
            mainCtx.clearRect(0, 0, mainCtx.canvas.width, mainCtx.canvas.height);

            // Draw frame
            if (frameVisible) {
                mainCtx.drawImage(frameBuffer, 0, 0);
            }

            // Draw buffered image to visible canvas
            if (backgroundVisible) {
                mainCtx.drawImage(backgroundBuffer, 0, 0);
            }

            // Draw lcd display
            if (lcdVisible) {
                drawLcdText(mainCtx, value, vertical);
            }

            // Draw led
            if (ledVisible) {
                mainCtx.drawImage(ledBuffer, ledPosX, ledPosY);
            }
            var valuePos;
            var minMaxX, minMaxY;
           // Draw min measured value indicator
            if (minMeasuredValueVisible) {
                if (vertical) {
                    valuePos = imageHeight * 0.856796 - (imageHeight * 0.728155) * (minMeasuredValue - minValue) / (maxValue - minValue);
                    minMaxX = imageWidth * 0.34 - minMeasuredValueBuffer.width;
                    minMaxY = valuePos - minMeasuredValueBuffer.height / 2;
                } else {
                    valuePos = ((imageWidth * 0.856796) - (imageWidth * 0.128640)) * (minMeasuredValue - minValue) / (maxValue - minValue);
                    minMaxX = imageWidth * 0.142857 - minMeasuredValueBuffer.height / 2 + valuePos;
                    minMaxY = imageHeight * 0.65;
                }
                mainCtx.drawImage(minMeasuredValueBuffer, minMaxX, minMaxY);
            }

            // Draw max measured value indicator
            if (maxMeasuredValueVisible) {
                if (vertical) {
                    valuePos = imageHeight * 0.856796 - (imageHeight * 0.728155) * (maxMeasuredValue - minValue) / (maxValue - minValue);
                    minMaxX = imageWidth * 0.34 - maxMeasuredValueBuffer.width;
                    minMaxY = valuePos - maxMeasuredValueBuffer.height / 2;
                } else {
                    valuePos = ((imageWidth * 0.856796) - (imageWidth * 0.128640)) * (maxMeasuredValue - minValue) / (maxValue - minValue);
                    minMaxX = imageWidth * 0.142857 - maxMeasuredValueBuffer.height / 2 + valuePos;
                    minMaxY = imageHeight * 0.65;
                }
                mainCtx.drawImage(maxMeasuredValueBuffer, minMaxX, minMaxY);
            }

            mainCtx.save();
            drawValue(mainCtx, imageWidth, imageHeight);
            mainCtx.restore();

            // Draw foreground
            if (foregroundVisible) {
                mainCtx.drawImage(foregroundBuffer, 0, 0);
            }

            repainting = false;
        };

        // Visualize the component
        this.repaint();

        return this;
    };

    var displaySingle = function (canvas, parameters) {
        parameters = parameters || {};
        var width = (undefined === parameters.width ? 0 : parameters.width),
            height = (undefined === parameters.height ? 0 : parameters.height),
            lcdColor = (undefined === parameters.lcdColor ? steelseries.LcdColor.STANDARD : parameters.lcdColor),
            lcdDecimals = (undefined === parameters.lcdDecimals ? 2 : parameters.lcdDecimals),
            unitString = (undefined === parameters.unitString ? '' : parameters.unitString),
            unitStringVisible = (undefined === parameters.unitStringVisible ? false : parameters.unitStringVisible),
            headerString = (undefined === parameters.headerString ? '' : parameters.headerString),
            headerStringVisible = (undefined === parameters.headerStringVisible ? false : parameters.headerStringVisible),
            digitalFont = (undefined === parameters.digitalFont ? false : parameters.digitalFont),
            valuesNumeric = (undefined === parameters.valuesNumeric ? true : parameters.valuesNumeric),
            value = (undefined === parameters.value ? 0 : parameters.value),
            alwaysScroll = (undefined === parameters.alwaysScroll ? false : parameters.alwaysScroll),
            autoScroll = (undefined === parameters.autoScroll ? false : parameters.autoScroll),
            section = (undefined === parameters.section ? null : parameters.section);

        var scrolling = false;
        var scrollX = 0;
        var scrollTimer;
        var repainting = false;

        var self = this;

        // Get the canvas context and clear it
        var mainCtx = getCanvasContext(canvas);
        // Has a size been specified?
        if (width === 0) {
            width = mainCtx.canvas.width;
        }
        if (height === 0) {
            height = mainCtx.canvas.height;
        }

        // Set the size - also clears the canvas
        mainCtx.canvas.width = width;
        mainCtx.canvas.height = height;

        var imageWidth = width;
        var imageHeight = height;
        var textWidth = 0;

        var fontHeight = Math.floor(imageHeight / 1.5);
        var stdFont = fontHeight + 'px ' + stdFontName;
        var lcdFont = fontHeight + 'px ' + lcdFontName;

        var initialized = false;

        // **************   Buffer creation  ********************
        // Buffer for the lcd
        var lcdBuffer;
        var sectionBuffer = [];
        var sectionForegroundColor = [];

        // **************   Image creation  ********************
        var drawLcdText = function (value, color) {
            mainCtx.save();
            mainCtx.textAlign = 'right';
            //mainCtx.textBaseline = 'top';
            mainCtx.strokeStyle = color;
            mainCtx.fillStyle = color;

            mainCtx.beginPath();
            mainCtx.rect(2, 0, imageWidth - 4, imageHeight);
            mainCtx.closePath();
            mainCtx.clip();

            if ((lcdColor === steelseries.LcdColor.STANDARD || lcdColor === steelseries.LcdColor.STANDARD_GREEN) &&
                 section === null) {
                mainCtx.shadowColor = 'gray';
                mainCtx.shadowOffsetX = imageHeight * 0.035;
                mainCtx.shadowOffsetY = imageHeight * 0.035;
                mainCtx.shadowBlur = imageHeight * 0.055;
            }

            mainCtx.font = digitalFont ? lcdFont : stdFont;

            if (valuesNumeric) {
                // Numeric value
                var unitWidth = 0;
                textWidth = 0;
                if (unitStringVisible) {
                    mainCtx.font = Math.floor(imageHeight / 2.5) + 'px ' + stdFontName;
                    unitWidth = mainCtx.measureText(unitString).width;
                }
                mainCtx.font = digitalFont ? lcdFont : stdFont;
                var lcdText = value.toFixed(lcdDecimals);
                textWidth = mainCtx.measureText(lcdText).width;
                var vPos = 0.38;
                if (headerStringVisible) {
                    vPos = 0.52;
                }

                mainCtx.fillText(lcdText, imageWidth - unitWidth - 4 - scrollX, imageHeight * 0.5 + fontHeight * vPos);

                if (unitStringVisible) {
                    mainCtx.font = Math.floor(imageHeight / 2.5) + 'px ' + stdFontName;
                    mainCtx.fillText(unitString, imageWidth - 2 - scrollX, imageHeight * 0.5 + fontHeight * vPos);
                }
                if (headerStringVisible) {
                    mainCtx.textAlign = 'center';
                    mainCtx.font = Math.floor(imageHeight / 3.5) + 'px ' + stdFontName;
                    mainCtx.fillText(headerString, imageWidth / 2, imageHeight * 0.3);
                }
            } else {
                // Text value
                textWidth = mainCtx.measureText(value).width;
                if (alwaysScroll || (autoScroll && textWidth > imageWidth - 4)) {
                    if (!scrolling) {
                        if (textWidth > imageWidth * 0.8) {
                            scrollX = imageWidth - textWidth - imageWidth * 0.2; // leave 20% blank leading space to give time to read start of message
                        } else {
                            scrollX = 0;
                        }
                        scrolling = true;
                        clearTimeout(scrollTimer);  // kill any pending animate
                        scrollTimer = setTimeout(animate, 200);
                    }
                } else if (autoScroll && textWidth <= imageWidth - 4) {
                    scrollX = 0;
                    scrolling = false;
                }
                mainCtx.fillText(value, imageWidth - 2 - scrollX, imageHeight * 0.5 + fontHeight * 0.38);
            }
            mainCtx.restore();
        };

        var createLcdSectionImage = function (width, height, color, lcdColor) {
            var lcdSectionBuffer = createBuffer(width, height);
            var lcdCtx = lcdSectionBuffer.getContext('2d');

            lcdCtx.save();
            var xB = 0;
            var yB = 0;
            var wB = width;
            var hB = height;
            var rB = Math.min(width, height) * 0.095;

            var lcdBackground = lcdCtx.createLinearGradient(0, yB, 0, yB + hB);

            lcdBackground.addColorStop(0, '#4c4c4c');
            lcdBackground.addColorStop(0.08, '#666666');
            lcdBackground.addColorStop(0.92, '#666666');
            lcdBackground.addColorStop(1, '#e6e6e6');
            lcdCtx.fillStyle = lcdBackground;

            roundedRectangle(lcdCtx, xB, yB, wB, hB, rB);

            lcdCtx.fill();
            lcdCtx.restore();

            lcdCtx.save();

            var rgb = getColorValues(color);
            var hsb = rgbToHsb(rgb[0], rgb[1], rgb[2]);

            var rgbStart = getColorValues(lcdColor.gradientStartColor);
            var hsbStart = rgbToHsb(rgbStart[0], rgbStart[1], rgbStart[2]);
            var rgbFraction1 = getColorValues(lcdColor.gradientFraction1Color);
            var hsbFraction1 = rgbToHsb(rgbFraction1[0], rgbFraction1[1], rgbFraction1[2]);
            var rgbFraction2 = getColorValues(lcdColor.gradientFraction2Color);
            var hsbFraction2 = rgbToHsb(rgbFraction2[0], rgbFraction2[1], rgbFraction2[2]);
            var rgbFraction3 = getColorValues(lcdColor.gradientFraction3Color);
            var hsbFraction3 = rgbToHsb(rgbFraction3[0], rgbFraction3[1], rgbFraction3[2]);
            var rgbStop = getColorValues(lcdColor.gradientStopColor);
            var hsbStop = rgbToHsb(rgbStop[0], rgbStop[1], rgbStop[2]);

            var startColor = hsbToRgb(hsb[0], hsb[1], hsbStart[2] - 0.31);
            var fraction1Color = hsbToRgb(hsb[0], hsb[1], hsbFraction1[2] - 0.31);
            var fraction2Color = hsbToRgb(hsb[0], hsb[1], hsbFraction2[2] - 0.31);
            var fraction3Color = hsbToRgb(hsb[0], hsb[1], hsbFraction3[2] - 0.31);
            var stopColor = hsbToRgb(hsb[0], hsb[1], hsbStop[2] - 0.31);

            var xF = 1;
            var yF = 1;
            var wF = width - 2;
            var hF = height - 2;
            var rF = rB - 1;
            var lcdForeground = lcdCtx.createLinearGradient(0, yF, 0, yF + hF);
            lcdForeground.addColorStop(0, 'rgb(' + startColor[0] + ', ' + startColor[1] + ', ' + startColor[2] + ')');
            lcdForeground.addColorStop(0.03, 'rgb(' + fraction1Color[0] + ',' + fraction1Color[1] + ',' + fraction1Color[2] + ')');
            lcdForeground.addColorStop(0.49, 'rgb(' + fraction2Color[0] + ',' + fraction2Color[1] + ',' + fraction2Color[2] + ')');
            lcdForeground.addColorStop(0.5, 'rgb(' + fraction3Color[0] + ',' + fraction3Color[1] + ',' + fraction3Color[2] + ')');
            lcdForeground.addColorStop(1, 'rgb(' + stopColor[0] + ',' + stopColor[1] + ',' + stopColor[2] + ')');
            lcdCtx.fillStyle = lcdForeground;

            roundedRectangle(lcdCtx, xF, yF, wF, hF, rF);

            lcdCtx.fill();
            lcdCtx.restore();

            return lcdSectionBuffer;
        };

        var createSectionForegroundColor = function (sectionColor) {
            var rgbSection = getColorValues(sectionColor);
            var hsbSection = rgbToHsb(rgbSection[0], rgbSection[1], rgbSection[2]);
            var sectionForegroundRgb = hsbToRgb(hsbSection[0], 0.57, 0.83);
            return 'rgb(' + sectionForegroundRgb[0] + ', ' + sectionForegroundRgb[1] + ', ' + sectionForegroundRgb[2] + ')';
        };

        var animate = function () {
            if (scrolling) {
                if (scrollX > imageWidth) {
                    scrollX = -textWidth;
                }
                scrollX += 2;
                scrollTimer = setTimeout(animate, 50);
            } else {
                scrollX = 0;
            }
            if (!repainting) {
                repainting = true;
                requestAnimFrame(self.repaint);
            }
        };

        // **************   Initialization  ********************
        var init = function () {
            var sectionIndex;
            initialized = true;

            // Create lcd background if selected in background buffer (backgroundBuffer)
            lcdBuffer = createLcdBackgroundImage(width, height, lcdColor);

            if (null !== section && 0 < section.length) {
                for (sectionIndex = 0 ; sectionIndex < section.length ; sectionIndex++) {
                    sectionBuffer[sectionIndex] = createLcdSectionImage(width, height, section[sectionIndex].color, lcdColor);
                    sectionForegroundColor[sectionIndex] = createSectionForegroundColor(section[sectionIndex].color);
                }
            }

        };

        // **************   Public methods  ********************
        this.setValue = function (newValue) {
            if (value !== newValue) {
                value = newValue;
                this.repaint();
            }
            return this;
        };

        this.setLcdColor = function (newLcdColor) {
            lcdColor = newLcdColor;
            init();
            this.repaint();
            return this;
        };

        this.setSection = function (newSection) {
            section = newSection;
            init({background: true, foreground: true});
            this.repaint();
            return this;
        };

        this.setScrolling = function (scroll) {
            if (scroll) {
                if (scrolling) {
                    return;
                } else {
                    scrolling = scroll;
                    animate();
                }
            } else { //disable scrolling
                scrolling = scroll;
            }
            return this;
        };

        this.repaint = function () {
            if (!initialized) {
                init();
            }

            //mainCtx.save();
            mainCtx.clearRect(0, 0, mainCtx.canvas.width, mainCtx.canvas.height);

            var lcdBackgroundBuffer = lcdBuffer;
            var lcdTextColor = lcdColor.textColor;
            var sectionIndex;
            // Draw sections
            if (null !== section && 0 < section.length) {
                for (sectionIndex = 0 ; sectionIndex < section.length ; sectionIndex++) {
                    if (value >= section[sectionIndex].start && value <= section[sectionIndex].stop) {
                        lcdBackgroundBuffer = sectionBuffer[sectionIndex];
                        lcdTextColor = sectionForegroundColor[sectionIndex];
                        break;
                    }
                }
            }

            // Draw lcd background
            mainCtx.drawImage(lcdBackgroundBuffer, 0, 0);

            // Draw lcd text
            drawLcdText(value, lcdTextColor);

            repainting = false;
        };

        // Visualize the component
        this.repaint();

        return this;
    };

    var displayMulti = function (canvas, parameters) {
        parameters = parameters || {};
        var width = (undefined === parameters.width ? 0 : parameters.width),
            height = (undefined === parameters.height ? 0 : parameters.height),
            lcdColor = (undefined === parameters.lcdColor ? steelseries.LcdColor.STANDARD : parameters.lcdColor),
            lcdDecimals = (undefined === parameters.lcdDecimals ? 2 : parameters.lcdDecimals),
            headerString = (undefined === parameters.headerString ? '' : parameters.headerString),
            headerStringVisible = (undefined === parameters.headerStringVisible ? false : parameters.headerStringVisible),
            detailString = (undefined === parameters.detailString ? '' : parameters.detailString),
            detailStringVisible = (undefined === parameters.detailStringVisible ? false : parameters.detailStringVisible),
            linkAltValue = (undefined === parameters.linkAltValue ? true : parameters.linkAltValue),
            unitString = (undefined === parameters.unitString ? '' : parameters.unitString),
            unitStringVisible = (undefined === parameters.unitStringVisible ? false : parameters.unitStringVisible),
            digitalFont = (undefined === parameters.digitalFont ? false : parameters.digitalFont),
            valuesNumeric = (undefined === parameters.valuesNumeric ? true : parameters.valuesNumeric),
            value = (undefined === parameters.value ? 0 : parameters.value),
            altValue = (undefined === parameters.altValue ? 0 : parameters.altValue);

        // Get the canvas context and clear it
        var mainCtx = getCanvasContext(canvas);
        // Has a size been specified?
        if (width === 0) {
            width = mainCtx.canvas.width;
        }
        if (height === 0) {
            height = mainCtx.canvas.height;
        }

        // Set the size - also clears the canvas
        mainCtx.canvas.width = width;
        mainCtx.canvas.height = height;

        var imageWidth = width;
        var imageHeight = height;

        var stdFont = Math.floor(imageHeight / 1.875) + 'px ' + stdFontName;
        var lcdFont = Math.floor(imageHeight / 1.875) + 'px ' + lcdFontName;
        var stdAltFont = Math.floor(imageHeight / 3.5) + 'px ' + stdFontName;
        var lcdAltFont = Math.floor(imageHeight / 3.5) + 'px ' + lcdFontName;

        var initialized = false;

        // **************   Buffer creation  ********************
        // Buffer for the lcd
        var lcdBuffer;

        // **************   Image creation  ********************
        var drawLcdText = function (value) {
            mainCtx.save();
            mainCtx.textAlign = 'right';
            mainCtx.textBaseline = 'middle';
            mainCtx.strokeStyle = lcdColor.textColor;
            mainCtx.fillStyle = lcdColor.textColor;

            if (lcdColor === steelseries.LcdColor.STANDARD || lcdColor === steelseries.LcdColor.STANDARD_GREEN) {
                mainCtx.shadowColor = 'gray';
                mainCtx.shadowOffsetX = imageHeight * 0.025;
                mainCtx.shadowOffsetY = imageHeight * 0.025;
                mainCtx.shadowBlur = imageHeight * 0.05;
            }

            if (valuesNumeric) {
                // Numeric value
                if (headerStringVisible) {
                    mainCtx.font = Math.floor(imageHeight / 3) + 'px ' + stdFontName;
                } else {
                    mainCtx.font = Math.floor(imageHeight / 2.5) + 'px ' + stdFontName;
                }
                var unitWidth = 0;
                if (unitStringVisible) {
                    if (headerStringVisible) {
                        mainCtx.font = Math.floor(imageHeight / 3) + 'px ' + stdFontName;
                        unitWidth = mainCtx.measureText(unitString).width;
                    } else {
                        mainCtx.font = Math.floor(imageHeight / 2.5) + 'px ' + stdFontName;
                        unitWidth = mainCtx.measureText(unitString).width;
                    }
                }
                mainCtx.font = digitalFont ? lcdFont : stdFont;
                var valueText = value.toFixed(lcdDecimals);
                if (headerStringVisible) {
                    mainCtx.fillText(valueText, imageWidth - unitWidth - 4, imageHeight * 0.5);
                } else {
                    mainCtx.fillText(valueText, imageWidth - unitWidth - 4, imageHeight * 0.38);
                }

                if (unitStringVisible) {
                    mainCtx.font = Math.floor(imageHeight / 3) + 'px ' + stdFontName;
                    mainCtx.fillText(unitString, imageWidth - 2, imageHeight * 0.55);
                }

                var altValueText = altValue.toFixed(lcdDecimals);
                if (detailStringVisible) {
                    altValueText = detailString + altValueText;
                }
                if (digitalFont) {
                    mainCtx.font = lcdAltFont;
                } else {
                    if (headerStringVisible) {
                        mainCtx.font = Math.floor(imageHeight / 5) + 'px ' + stdFontName;
                    } else {
                        mainCtx.font = stdAltFont;
                    }
                }
                mainCtx.textAlign = 'center';
                if (headerStringVisible) {
                    mainCtx.fillText(altValueText, imageWidth / 2, imageHeight * 0.83);
                    mainCtx.fillText(headerString, imageWidth / 2, imageHeight * 0.16);
                } else {
                    mainCtx.fillText(altValueText, imageWidth / 2, imageHeight * 0.8);
                }
            } else {
                if (headerStringVisible) {
                    // Text value
                    mainCtx.font = Math.floor(imageHeight / 3.5) + 'px ' + stdFontName;
                    mainCtx.fillText(value, imageWidth - 2, imageHeight * 0.48);

                    //mainCtx.font = stdAltFont;
                    mainCtx.font = Math.floor(imageHeight / 5) + 'px ' + stdFontName;
                    mainCtx.textAlign = 'center';
                    mainCtx.fillText(altValue, imageWidth / 2, imageHeight * 0.83);
                    mainCtx.fillText(headerString, imageWidth / 2, imageHeight * 0.17);
                } else {
                    // Text value
                    mainCtx.font = Math.floor(imageHeight / 2.5) + 'px ' + stdFontName;
                    mainCtx.fillText(value, imageWidth - 2, imageHeight * 0.38);

                    mainCtx.font = stdAltFont;
                    mainCtx.textAlign = 'center';
                    mainCtx.fillText(altValue, imageWidth / 2, imageHeight * 0.8);
                }
            }
            mainCtx.restore();
        };

        // **************   Initialization  ********************
        var init = function () {
            initialized = true;

            // Create lcd background if selected in background buffer (backgroundBuffer)
            lcdBuffer = createLcdBackgroundImage(width, height, lcdColor);
        };

        // **************   Public methods  ********************
        this.setValue = function (newValue) {
            if (value !== newValue || altValue !== newValue) {
                if (linkAltValue) {
                    altValue = value;
                }
                value = newValue;
                this.repaint();
            }
            return this;
        };

        this.setAltValue = function (altValue) {
            if (altValue !== altValue) {
                altValue = altValue;
                this.repaint();
            }
            return this;
        };

        this.setLcdColor = function (newLcdColor) {
            lcdColor = newLcdColor;
            init();
            this.repaint();
            return this;
        };

        this.repaint = function () {
            if (!initialized) {
                init();
            }

            //mainCtx.save();
            mainCtx.clearRect(0, 0, mainCtx.canvas.width, mainCtx.canvas.height);

            // Draw lcd background
            mainCtx.drawImage(lcdBuffer, 0, 0);

            // Draw lcd text
            drawLcdText(value);
        };

        // Visualize the component
        this.repaint();

        return this;
    };

    var level = function (canvas, parameters) {
        parameters = parameters || {};
        var size = (undefined === parameters.size ? 0 : parameters.size),
            decimalsVisible = (undefined === parameters.decimalsVisible ? false : parameters.decimalsVisible),
            textOrientationFixed = (undefined === parameters.textOrientationFixed ? false : parameters.textOrientationFixed),
            frameDesign = (undefined === parameters.frameDesign ? steelseries.FrameDesign.METAL : parameters.frameDesign),
            frameVisible = (undefined === parameters.frameVisible ? true : parameters.frameVisible),
            backgroundColor = (undefined === parameters.backgroundColor ? steelseries.BackgroundColor.DARK_GRAY : parameters.backgroundColor),
            backgroundVisible = (undefined === parameters.backgroundVisible ? true : parameters.backgroundVisible),
            pointerColor = (undefined === parameters.pointerColor ? steelseries.ColorDef.RED : parameters.pointerColor),
            foregroundType = (undefined === parameters.foregroundType ? steelseries.ForegroundType.TYPE1 : parameters.foregroundType),
            foregroundVisible = (undefined === parameters.foregroundVisible ? true : parameters.foregroundVisible),
            rotateFace = (undefined === parameters.rotateFace ? false : parameters.rotateFace);

        // Get the canvas context and clear it
        var mainCtx = getCanvasContext(canvas);
        // Has a size been specified?
        if (size === 0) {
            size = Math.min(mainCtx.canvas.width, mainCtx.canvas.height);
        }

        // Set the size - also clears the canvas
        mainCtx.canvas.width = size;
        mainCtx.canvas.height = size;

        var tween;
        var repainting = false;

        var value = 0;
        var stepValue = 0;
        var visibleValue = 0;
        var angleStep = TWO_PI / 360;
        var angle = this.value;
        var decimals = decimalsVisible ? 1 : 0;

        var imageWidth = size;
        var imageHeight = size;

        var centerX = imageWidth / 2;
        var centerY = imageHeight / 2;

        var initialized = false;

        // **************   Buffer creation  ********************
        // Buffer for all static background painting code
        var backgroundBuffer = createBuffer(size, size);
        var backgroundContext = backgroundBuffer.getContext('2d');

        // Buffer for pointer image painting code
        var pointerBuffer = createBuffer(size, size);
        var pointerContext = pointerBuffer.getContext('2d');

        // Buffer for step pointer image painting code
        var stepPointerBuffer = createBuffer(size, size);
        var stepPointerContext = stepPointerBuffer.getContext('2d');

        // Buffer for static foreground painting code
        var foregroundBuffer = createBuffer(size, size);
        var foregroundContext = foregroundBuffer.getContext('2d');

        // **************   Image creation  ********************
        var drawTickmarksImage = function (ctx) {
            var stdFont, smlFont, i;

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.save();
            ctx.strokeStyle = backgroundColor.labelColor.getRgbaColor();
            ctx.fillStyle = backgroundColor.labelColor.getRgbaColor();
            ctx.translate(centerX, centerY);

            for (i = 0; 360 > i; i++) {
                ctx.strokeStyle = backgroundColor.labelColor.getRgbaColor();
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(imageWidth * 0.38, 0);
                ctx.lineTo(imageWidth * 0.37, 0);
                ctx.closePath();
                ctx.stroke();

                if (0 === i % 5) {
                    ctx.strokeStyle = backgroundColor.labelColor.getRgbaColor();
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(imageWidth * 0.38, 0);
                    ctx.lineTo(imageWidth * 0.36, 0);
                    ctx.closePath();
                    ctx.stroke();
                }

                if (0 === i % 45) {
                    ctx.strokeStyle = backgroundColor.labelColor.getRgbaColor();
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(imageWidth * 0.38, 0);
                    ctx.lineTo(imageWidth * 0.34, 0);
                    ctx.closePath();
                    ctx.stroke();
                }

                // Draw the labels
                if (300 < imageWidth) {
                    stdFont = '14px ' + stdFont;
                    smlFont = '12px '  + stdFont;
                }
                if (300 >= imageWidth) {
                    stdFont = '12px '  + stdFont;
                    smlFont = '10px '  + stdFont;
                }
                if (200 >= imageWidth) {
                    stdFont = '10px '  + stdFont;
                    smlFont = '8px '  + stdFont;
                }
                if (100 >= imageWidth) {
                    stdFont = '8px '  + stdFont;
                    smlFont = '6px '  + stdFont;
                }
                ctx.save();
                switch (i) {
                case 0:
                    ctx.translate(imageWidth * 0.31, 0);
                    ctx.rotate((i * RAD_FACTOR) + HALF_PI);
                    ctx.font = stdFont;
                    ctx.fillText('0\u00B0', 0, 0, imageWidth);
                    ctx.rotate(-(i * RAD_FACTOR) + HALF_PI);
                    ctx.translate(-imageWidth * 0.31, 0);

                    ctx.translate(imageWidth * 0.41, 0);
                    ctx.rotate((i * RAD_FACTOR) - HALF_PI);
                    ctx.font = smlFont;
                    ctx.fillText('0%', 0, 0, imageWidth);
                    break;
                case 45:
                    ctx.translate(imageWidth * 0.31, 0);
                    ctx.rotate((i * RAD_FACTOR) + 0.25 * PI);
                    ctx.font = stdFont;
                    ctx.fillText('45\u00B0', 0, 0, imageWidth);
                    ctx.rotate(-(i * RAD_FACTOR) + 0.25 * PI);
                    ctx.translate(-imageWidth * 0.31, 0);

                    ctx.translate(imageWidth * 0.31, imageWidth * 0.085);
                    ctx.rotate((i * RAD_FACTOR) - 0.25 * PI);
                    ctx.font = smlFont;
                    ctx.fillText('100%', 0, 0, imageWidth);
                    break;
                case 90:
                    ctx.translate(imageWidth * 0.31, 0);
                    ctx.rotate((i * RAD_FACTOR));
                    ctx.font = stdFont;
                    ctx.fillText('90\u00B0', 0, 0, imageWidth);
                    ctx.rotate(-(i * RAD_FACTOR));
                    ctx.translate(-imageWidth * 0.31, 0);

                    ctx.translate(imageWidth * 0.21, 0);
                    ctx.rotate((i * RAD_FACTOR));
                    ctx.font = smlFont;
                    ctx.fillText('\u221E', 0, 0, imageWidth);
                    break;
                case 135:
                    ctx.translate(imageWidth * 0.31, 0);
                    ctx.rotate((i * RAD_FACTOR) - 0.25 * PI);
                    ctx.font = stdFont;
                    ctx.fillText('45\u00B0', 0, 0, imageWidth);
                    ctx.rotate(-(i * RAD_FACTOR) - 0.25 * PI);
                    ctx.translate(-imageWidth * 0.31, 0);

                    ctx.translate(imageWidth * 0.31, -imageWidth * 0.085);
                    ctx.rotate((i * RAD_FACTOR) + 0.25 * PI);
                    ctx.font = smlFont;
                    ctx.fillText('100%', 0, 0, imageWidth);
                    break;
                case 180:
                    ctx.translate(imageWidth * 0.31, 0);
                    ctx.rotate((i * RAD_FACTOR) - HALF_PI);
                    ctx.font = stdFont;
                    ctx.fillText('0\u00B0', 0, 0, imageWidth);
                    ctx.rotate(-(i * RAD_FACTOR) - HALF_PI);
                    ctx.translate(-imageWidth * 0.31, 0);

                    ctx.translate(imageWidth * 0.41, 0);
                    ctx.rotate((i * RAD_FACTOR) + HALF_PI);
                    ctx.font = smlFont;
                    ctx.fillText('0%', 0, 0, imageWidth);
                    ctx.translate(-imageWidth * 0.41, 0);
                    break;
                case 225:
                    ctx.translate(imageWidth * 0.31, 0);
                    ctx.rotate((i * RAD_FACTOR) - 0.75 * PI);
                    ctx.font = stdFont;
                    ctx.fillText('45\u00B0', 0, 0, imageWidth);
                    ctx.rotate(-(i * RAD_FACTOR) - 0.75 * PI);
                    ctx.translate(-imageWidth * 0.31, 0);

                    ctx.translate(imageWidth * 0.31, imageWidth * 0.085);
                    ctx.rotate((i * RAD_FACTOR) + 0.75 * PI);
                    ctx.font = smlFont;
                    ctx.fillText('100%', 0, 0, imageWidth);
                    break;
                case 270:
                    ctx.translate(imageWidth * 0.31, 0);
                    ctx.rotate((i * RAD_FACTOR) - PI);
                    ctx.font = stdFont;
                    ctx.fillText('90\u00B0', 0, 0, imageWidth);
                    ctx.rotate(-(i * RAD_FACTOR) - PI);
                    ctx.translate(-imageWidth * 0.31, 0);

                    ctx.translate(imageWidth * 0.21, 0);
                    ctx.rotate((i * RAD_FACTOR) - PI);
                    ctx.font = smlFont;
                    ctx.fillText('\u221E', 0, 0, imageWidth);
                    break;
                case 315:
                    ctx.translate(imageWidth * 0.31, 0);
                    ctx.rotate((i * RAD_FACTOR) - 1.25 * PI);
                    ctx.font = stdFont;
                    ctx.fillText('45\u00B0', 0, 0, imageWidth);
                    ctx.rotate(-(i * RAD_FACTOR) - 1.25 * PI);
                    ctx.translate(-imageWidth * 0.31, 0);

                    ctx.translate(imageWidth * 0.31, -imageWidth * 0.085);
                    ctx.rotate((i * RAD_FACTOR) + 1.25 * PI);
                    ctx.font = smlFont;
                    ctx.fillText('100%', 0, 0, imageWidth);
                    break;
                }
                ctx.restore();

                ctx.rotate(angleStep);
            }
            ctx.translate(-centerX, -centerY);
            ctx.restore();
        };

        var drawMarkerImage = function (ctx) {
            ctx.save();

            ctx.strokeStyle = backgroundColor.labelColor.getRgbaColor();
            ctx.fillStyle = backgroundColor.labelColor.getRgbaColor();

            // FRAMELEFT
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(imageWidth * 0.200934, imageHeight * 0.434579);
            ctx.lineTo(imageWidth * 0.163551, imageHeight * 0.434579);
            ctx.lineTo(imageWidth * 0.163551, imageHeight * 0.560747);
            ctx.lineTo(imageWidth * 0.200934, imageHeight * 0.560747);
            ctx.lineWidth = 1;
            ctx.lineCap = 'square';
            ctx.lineJoin = 'miter';
            ctx.stroke();

            // TRIANGLELEFT
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(imageWidth * 0.163551, imageHeight * 0.471962);
            ctx.lineTo(imageWidth * 0.205607, imageHeight * 0.5);
            ctx.lineTo(imageWidth * 0.163551, imageHeight * 0.523364);
            ctx.lineTo(imageWidth * 0.163551, imageHeight * 0.471962);
            ctx.closePath();
            ctx.fill();

            // FRAMERIGHT
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(imageWidth * 0.799065, imageHeight * 0.434579);
            ctx.lineTo(imageWidth * 0.836448, imageHeight * 0.434579);
            ctx.lineTo(imageWidth * 0.836448, imageHeight * 0.560747);
            ctx.lineTo(imageWidth * 0.799065, imageHeight * 0.560747);
            ctx.lineWidth = 1;
            ctx.lineCap = 'square';
            ctx.lineJoin = 'miter';
            ctx.stroke();

            // TRIANGLERIGHT
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(imageWidth * 0.836448, imageHeight * 0.471962);
            ctx.lineTo(imageWidth * 0.794392, imageHeight * 0.5);
            ctx.lineTo(imageWidth * 0.836448, imageHeight * 0.523364);
            ctx.lineTo(imageWidth * 0.836448, imageHeight * 0.471962);
            ctx.closePath();
            ctx.fill();

            ctx.restore();
        };

        var drawPointerImage = function (ctx) {
            ctx.save();

            // POINTER_LEVEL
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(imageWidth * 0.523364, imageHeight * 0.350467);
            ctx.lineTo(imageWidth * 0.5, imageHeight * 0.130841);
            ctx.lineTo(imageWidth * 0.476635, imageHeight * 0.350467);
            ctx.bezierCurveTo(imageWidth * 0.476635, imageHeight * 0.350467, imageWidth * 0.490654, imageHeight * 0.345794, imageWidth * 0.5, imageHeight * 0.345794);
            ctx.bezierCurveTo(imageWidth * 0.509345, imageHeight * 0.345794, imageWidth * 0.523364, imageHeight * 0.350467, imageWidth * 0.523364, imageHeight * 0.350467);
            ctx.closePath();
            var POINTER_LEVEL_GRADIENT = ctx.createLinearGradient(0, 0.154205 * imageHeight, 0, 0.350466 * imageHeight);
            var tmpDarkColor = pointerColor.dark;
            var tmpLightColor = pointerColor.light;
            tmpDarkColor.setAlpha(0.70588);
            tmpLightColor.setAlpha(0.70588);
            POINTER_LEVEL_GRADIENT.addColorStop(0, tmpDarkColor.getRgbaColor());
            POINTER_LEVEL_GRADIENT.addColorStop(0.3, tmpLightColor.getRgbaColor());
            POINTER_LEVEL_GRADIENT.addColorStop(0.59, tmpLightColor.getRgbaColor());
            POINTER_LEVEL_GRADIENT.addColorStop(1, tmpDarkColor.getRgbaColor());
            ctx.fillStyle = POINTER_LEVEL_GRADIENT;
            var strokeColor_POINTER_LEVEL = pointerColor.light.getRgbaColor();
            ctx.lineWidth = 1;
            ctx.lineCap = 'square';
            ctx.lineJoin = 'miter';
            ctx.strokeStyle = strokeColor_POINTER_LEVEL;
            ctx.fill();
            ctx.stroke();

            tmpDarkColor.setAlpha(1);
            tmpLightColor.setAlpha(1);

            ctx.restore();
        };

        var drawStepPointerImage = function (ctx) {
            ctx.save();

            var tmpDarkColor = pointerColor.dark;
            var tmpLightColor = pointerColor.light;
            tmpDarkColor.setAlpha(0.70588);
            tmpLightColor.setAlpha(0.70588);

            // POINTER_LEVEL_LEFT
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(imageWidth * 0.285046, imageHeight * 0.514018);
            ctx.lineTo(imageWidth * 0.210280, imageHeight * 0.5);
            ctx.lineTo(imageWidth * 0.285046, imageHeight * 0.481308);
            ctx.bezierCurveTo(imageWidth * 0.285046, imageHeight * 0.481308, imageWidth * 0.280373, imageHeight * 0.490654, imageWidth * 0.280373, imageHeight * 0.495327);
            ctx.bezierCurveTo(imageWidth * 0.280373, imageHeight * 0.504672, imageWidth * 0.285046, imageHeight * 0.514018, imageWidth * 0.285046, imageHeight * 0.514018);
            ctx.closePath();
            var POINTER_LEVEL_LEFT_GRADIENT = ctx.createLinearGradient(0.224299 * imageWidth, 0, 0.289719 * imageWidth, 0);
            POINTER_LEVEL_LEFT_GRADIENT.addColorStop(0, tmpDarkColor.getRgbaColor());
            POINTER_LEVEL_LEFT_GRADIENT.addColorStop(0.3, tmpLightColor.getRgbaColor());
            POINTER_LEVEL_LEFT_GRADIENT.addColorStop(0.59, tmpLightColor.getRgbaColor());
            POINTER_LEVEL_LEFT_GRADIENT.addColorStop(1, tmpDarkColor.getRgbaColor());
            ctx.fillStyle = POINTER_LEVEL_LEFT_GRADIENT;
            var strokeColor_POINTER_LEVEL_LEFT = pointerColor.light.getRgbaColor();
            ctx.lineWidth = 1;
            ctx.lineCap = 'square';
            ctx.lineJoin = 'miter';
            ctx.strokeStyle = strokeColor_POINTER_LEVEL_LEFT;
            ctx.fill();
            ctx.stroke();

            // POINTER_LEVEL_RIGHT
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(imageWidth * 0.714953, imageHeight * 0.514018);
            ctx.lineTo(imageWidth * 0.789719, imageHeight * 0.5);
            ctx.lineTo(imageWidth * 0.714953, imageHeight * 0.481308);
            ctx.bezierCurveTo(imageWidth * 0.714953, imageHeight * 0.481308, imageWidth * 0.719626, imageHeight * 0.490654, imageWidth * 0.719626, imageHeight * 0.495327);
            ctx.bezierCurveTo(imageWidth * 0.719626, imageHeight * 0.504672, imageWidth * 0.714953, imageHeight * 0.514018, imageWidth * 0.714953, imageHeight * 0.514018);
            ctx.closePath();
            var POINTER_LEVEL_RIGHT_GRADIENT = ctx.createLinearGradient(0.775700 * imageWidth, 0, 0.71028 * imageWidth, 0);
            POINTER_LEVEL_RIGHT_GRADIENT.addColorStop(0, tmpDarkColor.getRgbaColor());
            POINTER_LEVEL_RIGHT_GRADIENT.addColorStop(0.3, tmpLightColor.getRgbaColor());
            POINTER_LEVEL_RIGHT_GRADIENT.addColorStop(0.59, tmpLightColor.getRgbaColor());
            POINTER_LEVEL_RIGHT_GRADIENT.addColorStop(1, tmpDarkColor.getRgbaColor());
            ctx.fillStyle = POINTER_LEVEL_RIGHT_GRADIENT;
            var strokeColor_POINTER_LEVEL_RIGHT = pointerColor.light.getRgbaColor();
            ctx.lineWidth = 1;
            ctx.lineCap = 'square';
            ctx.lineJoin = 'miter';
            ctx.strokeStyle = strokeColor_POINTER_LEVEL_RIGHT;
            ctx.fill();
            ctx.stroke();

            tmpDarkColor.setAlpha(1);
            tmpLightColor.setAlpha(1);

            ctx.restore();
        };

        // **************   Initialization  ********************
        // Draw all static painting code to background
        var init = function () {
            initialized = true;

            if (frameVisible) {
                drawRadialFrameImage(backgroundContext, frameDesign, centerX, centerY, imageWidth, imageHeight);
            }

            if (backgroundVisible) {
                drawRadialBackgroundImage(backgroundContext, backgroundColor, centerX, centerY, imageWidth, imageHeight);
                drawTickmarksImage(backgroundContext);
            }

            drawMarkerImage(pointerContext);

            drawPointerImage(pointerContext);

            drawStepPointerImage(stepPointerContext);

            if (foregroundVisible) {
                drawRadialForegroundImage(foregroundContext, foregroundType, imageWidth, imageHeight, false);
            }
        };

        var resetBuffers = function () {
            backgroundBuffer.width = size;
            backgroundBuffer.height = size;
            backgroundContext = backgroundBuffer.getContext('2d');

            // Buffer for pointer image painting code
            pointerBuffer.width = size;
            pointerBuffer.height = size;
            pointerContext = pointerBuffer.getContext('2d');

            // Buffer for step pointer image painting code
            stepPointerBuffer.width = size;
            stepPointerBuffer.height = size;
            stepPointerContext = stepPointerBuffer.getContext('2d');

            // Buffer for static foreground painting code
            foregroundBuffer.width = size;
            foregroundBuffer.height = size;
            foregroundContext = foregroundBuffer.getContext('2d');
        };

        //************************************ Public methods **************************************
        this.setValue = function (newValue) {
            var targetValue;
            newValue = parseFloat(newValue);
            targetValue = 0 > newValue ? (360 + newValue) : newValue;
            targetValue = 359.9 < newValue ? (newValue - 360) : newValue;

            if (value !== targetValue) {
                value = targetValue;
                stepValue = 2 * ((Math.abs(value) * 10) % 10);
                if (10 < stepValue) {
                    stepValue -= 20;
                }

                if (0 === value) {
                    visibleValue = 90;
                }

                if (0 < value && 90 >= value) {
                    visibleValue = (90 - value);
                }

                if (90 < value && 180 >= value) {
                    visibleValue = (value - 90);
                }

                if (180 < value && 270 >= value) {
                    visibleValue = (270 - value);
                }

                if (270 < value && 360 >= value) {
                    visibleValue = (value - 270);
                }

                if (0 > value && value >= -90) {
                    visibleValue = (90 - Math.abs(value));
                }

                if (value < -90 && value >= -180) {
                    visibleValue = Math.abs(value) - 90;
                }

                if (value < -180 && value >= -270) {
                    visibleValue = 270 - Math.abs(value);
                }

                if (value < -270 && value >= -360) {
                    visibleValue = Math.abs(value) - 270;
                }

                this.repaint();
            }
            return this;
        };

        this.getValue = function () {
            return value;
        };

        this.setValueAnimated = function (newValue, callback) {
            newValue = parseFloat(newValue);
            if (360 - newValue + value < newValue - value) {
                newValue = 360 - newValue;
            }
            if (value !== newValue) {
                if (undefined !== tween && tween.isPlaying) {
                    tween.stop();
                }

                //tween = new Tween(new Object(),'',Tween.elasticEaseOut,this.value,targetValue, 1);
                tween = new Tween({}, '', Tween.regularEaseInOut, value, newValue, 1);
                //tween = new Tween(new Object(), '', Tween.strongEaseInOut, this.value, targetValue, 1);

                var gauge = this;

                tween.onMotionChanged = function (event) {
                    value = event.target._pos;
                    stepValue = 2 * ((Math.abs(value) * 10) % 10);
                    if (10 < stepValue) {
                        stepValue -= 20;
                    }

                    if (0 === value) {
                        visibleValue = 90;
                    }

                    if (0 < value && 90 >= value) {
                        visibleValue = (90 - value);
                    }

                    if (90 < value && 180 >= value) {
                        visibleValue = (value - 90);
                    }

                    if (180 < value && 270 >= value) {
                        visibleValue = (270 - value);
                    }

                    if (270 < value && 360 >= value) {
                        visibleValue = (value - 270);
                    }

                    if (0 > value && value >= -90) {
                        visibleValue = (90 - Math.abs(value));
                    }

                    if (value < -90 && value >= -180) {
                        visibleValue = Math.abs(value) - 90;
                    }

                    if (value < -180 && value >= -270) {
                        visibleValue = 270 - Math.abs(value);
                    }

                    if (value < -270 && value >= -360) {
                        visibleValue = Math.abs(value) - 270;
                    }

                    if (!repainting) {
                        repainting = true;
                        requestAnimFrame(gauge.repaint);
                    }
                };

                // do we have a callback function to process?
                if (callback && typeof(callback) === "function") {
                    tween.onMotionFinished = callback;
                }

                tween.start();
            }
            return this;
        };

        this.setFrameDesign = function (newFrameDesign) {
            resetBuffers();
            frameDesign = newFrameDesign;
            init();
            this.repaint();
            return this;
        };

        this.setBackgroundColor = function (newBackgroundColor) {
            resetBuffers();
            backgroundColor = newBackgroundColor;
            init();
            this.repaint();
            return this;
        };

        this.setForegroundType = function (newForegroundType) {
            resetBuffers();
            foregroundType = newForegroundType;
            init();
            this.repaint();
            return this;
        };

        this.setPointerColor = function (newPointerColor) {
            resetBuffers();
            pointerColor = newPointerColor;
            init();
            this.repaint();
            return this;
        };

        this.repaint = function () {
            if (!initialized) {
                init();
            }

            mainCtx.save();
            mainCtx.clearRect(0, 0, mainCtx.canvas.width, mainCtx.canvas.height);

            angle = HALF_PI + value * angleStep - HALF_PI;
            if (rotateFace) {
                mainCtx.translate(centerX, centerY);
                mainCtx.rotate(-angle);
                mainCtx.translate(-centerX, -centerY);
            }
            // Draw buffered image to visible canvas
            if (frameVisible || backgroundVisible) {
                mainCtx.drawImage(backgroundBuffer, 0, 0);
            }

            mainCtx.save();
            // Define rotation center
            mainCtx.translate(centerX, centerY);
            mainCtx.rotate(angle);

            // Draw pointer
            mainCtx.translate(-centerX, -centerY);
            mainCtx.drawImage(pointerBuffer, 0, 0);

            mainCtx.fillStyle = backgroundColor.labelColor.getRgbaColor();
            mainCtx.textAlign = 'center';
            mainCtx.textBaseline = 'middle';

            if (textOrientationFixed) {
                mainCtx.restore();
                if (decimalsVisible) {
                    mainCtx.font = imageWidth * 0.1 + 'px ' + stdFontName;
                } else {
                    mainCtx.font = imageWidth * 0.15 + 'px ' + stdFontName;
                }
                mainCtx.fillText(visibleValue.toFixed(decimals) + '\u00B0', centerX, centerY, imageWidth * 0.35);
            } else {
                if (decimalsVisible) {
                    mainCtx.font = imageWidth * 0.15 + 'px ' + stdFontName;
                } else {
                    mainCtx.font = imageWidth * 0.2 + 'px ' + stdFontName;
                }
                mainCtx.fillText(visibleValue.toFixed(decimals) + '\u00B0', centerX, centerY, imageWidth * 0.35);
                mainCtx.restore();
            }

            mainCtx.translate(centerX, centerY);
            mainCtx.rotate(angle + stepValue * RAD_FACTOR);
            mainCtx.translate(-centerX, -centerY);
            mainCtx.drawImage(stepPointerBuffer, 0, 0);
            mainCtx.restore();

            // Draw foreground
            if (foregroundVisible) {
                mainCtx.drawImage(foregroundBuffer, 0, 0);
            }

            mainCtx.restore();

            repainting = false;
        };

        // Visualize the component
        this.repaint();

        return this;
    };

    var compass = function (canvas, parameters) {
        parameters = parameters || {};
        var size = (undefined === parameters.size ? 0 : parameters.size),
            frameDesign = (undefined === parameters.frameDesign ? steelseries.FrameDesign.METAL : parameters.frameDesign),
            frameVisible = (undefined === parameters.frameVisible ? true : parameters.frameVisible),
            backgroundColor = (undefined === parameters.backgroundColor ? steelseries.BackgroundColor.DARK_GRAY : parameters.backgroundColor),
            backgroundVisible = (undefined === parameters.backgroundVisible ? true : parameters.backgroundVisible),
            pointerType = (undefined === parameters.pointerType ? steelseries.PointerType.TYPE2 : parameters.pointerType),
            pointerColor = (undefined === parameters.pointerColor ? steelseries.ColorDef.RED : parameters.pointerColor),
            knobType = (undefined === parameters.knobType ? steelseries.KnobType.STANDARD_KNOB : parameters.knobType),
            knobStyle = (undefined === parameters.knobStyle ? steelseries.KnobStyle.SILVER : parameters.knobStyle),
            foregroundType = (undefined === parameters.foregroundType ? steelseries.ForegroundType.TYPE1 : parameters.foregroundType),
            foregroundVisible = (undefined === parameters.foregroundVisible ? true : parameters.foregroundVisible),
            pointSymbols = (undefined === parameters.pointSymbols ? ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'] : parameters.pointSymbols),
            pointSymbolsVisible = (undefined === parameters.pointSymbolsVisible ? true : parameters.pointSymbolsVisible),
            customLayer = (undefined === parameters.customLayer ? null : parameters.customLayer),
            degreeScale = (undefined === parameters.degreeScale ? false : parameters.degreeScale),
            roseVisible = (undefined === parameters.roseVisible ? true : parameters.roseVisible),
            rotateFace = (undefined === parameters.rotateFace ? false : parameters.rotateFace);

        var tween;
        var repainting = false;
        var value = 0;
        var angleStep = RAD_FACTOR;
        var angle = this.value;

        // Get the canvas context and clear it
        var mainCtx = getCanvasContext(canvas);
        // Has a size been specified?
        if (size === 0) {
            size = Math.min(mainCtx.canvas.width, mainCtx.canvas.height);
        }

        // Set the size - also clears the canvas
        mainCtx.canvas.width = size;
        mainCtx.canvas.height = size;

        var imageWidth = size;
        var imageHeight = size;

        var centerX = imageWidth / 2;
        var centerY = imageHeight / 2;

        var shadowOffset = imageWidth * 0.006;

        var initialized = false;

        // **************   Buffer creation  ********************
        // Buffer for all static background painting code
        var backgroundBuffer = createBuffer(size, size);
        var backgroundContext = backgroundBuffer.getContext('2d');

        // Buffer for symbol/rose painting code
        var roseBuffer = createBuffer(size, size);
        var roseContext = roseBuffer.getContext('2d');

        // Buffer for pointer image painting code
        var pointerBuffer = createBuffer(size, size);
        var pointerContext = pointerBuffer.getContext('2d');

        // Buffer for static foreground painting code
        var foregroundBuffer = createBuffer(size, size);
        var foregroundContext = foregroundBuffer.getContext('2d');

        // **************   Image creation  ********************
        var drawTickmarksImage = function (ctx) {
            var val;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            var stdFont, smlFont, i;

            ctx.save();
            ctx.strokeStyle = backgroundColor.labelColor.getRgbaColor();
            ctx.fillStyle = backgroundColor.labelColor.getRgbaColor();
            ctx.translate(centerX, centerY);

            if (!degreeScale) {

                stdFont = 0.12 * imageWidth + 'px serif';
                smlFont = 0.06 * imageWidth + 'px serif';

                for (i = 0; 360 > i; i += 2.5) {

                    if (0 === i % 5) {
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(imageWidth * 0.38, 0);
                        ctx.lineTo(imageWidth * 0.36, 0);
                        ctx.closePath();
                        ctx.stroke();
                    }

                    // Draw the labels
                    ctx.save();
                    switch (i) {
                    case 0:
                        ctx.translate(imageWidth * 0.35, 0);
                        ctx.rotate(HALF_PI);
                        ctx.font = stdFont;
                        ctx.fillText(pointSymbols[2], 0, 0, imageWidth);
                        ctx.translate(-imageWidth * 0.35, 0);
                        break;
                    case 45:
                        ctx.translate(imageWidth * 0.29, 0);
                        ctx.rotate(HALF_PI);
                        ctx.font = smlFont;
                        ctx.fillText(pointSymbols[3], 0, 0, imageWidth);
                        ctx.translate(-imageWidth * 0.29, 0);
                        break;
                    case 90:
                        ctx.translate(imageWidth * 0.35, 0);
                        ctx.rotate(HALF_PI);
                        ctx.font = stdFont;
                        ctx.fillText(pointSymbols[4], 0, 0, imageWidth);
                        ctx.translate(-imageWidth * 0.35, 0);
                        break;
                    case 135:
                        ctx.translate(imageWidth * 0.29, 0);
                        ctx.rotate(HALF_PI);
                        ctx.font = smlFont;
                        ctx.fillText(pointSymbols[5], 0, 0, imageWidth);
                        ctx.translate(-imageWidth * 0.29, 0);
                        break;
                    case 180:
                        ctx.translate(imageWidth * 0.35, 0);
                        ctx.rotate(HALF_PI);
                        ctx.font = stdFont;
                        ctx.fillText(pointSymbols[6], 0, 0, imageWidth);
                        ctx.translate(-imageWidth * 0.35, 0);
                        break;
                    case 225:
                        ctx.translate(imageWidth * 0.29, 0);
                        ctx.rotate(HALF_PI);
                        ctx.font = smlFont;
                        ctx.fillText(pointSymbols[7], 0, 0, imageWidth);
                        ctx.translate(-imageWidth * 0.29, 0);
                        break;
                    case 270:
                        ctx.translate(imageWidth * 0.35, 0);
                        ctx.rotate(HALF_PI);
                        ctx.font = stdFont;
                        ctx.fillText(pointSymbols[0], 0, 0, imageWidth);
                        ctx.translate(-imageWidth * 0.35, 0);
                        break;
                    case 315:
                        ctx.translate(imageWidth * 0.29, 0);
                        ctx.rotate(HALF_PI);
                        ctx.font = smlFont;
                        ctx.fillText(pointSymbols[1], 0, 0, imageWidth);
                        ctx.translate(-imageWidth * 0.29, 0);
                        break;
                    }
                    ctx.restore();

                    if (roseVisible && (0 === i || 22.5 === i || 45 === i || 67.5 === i || 90 === i || 112.5 === i || 135 === i || 157.5 === i || 180 === i || 202.5 === i || 225 === i || 247.5 === i || 270 === i || 292.5 === i || 315 === i || 337.5 === i || 360 === i)) {
                        // ROSE_LINE
                        ctx.save();
                        ctx.beginPath();
                        // indent the 16 half quadrant lines a bit for visual effect
                        if (i % 45) {
                            ctx.moveTo(imageWidth * 0.29, 0);
                        } else {
                            ctx.moveTo(imageWidth * 0.38, 0);
                        }
                        ctx.lineTo(imageWidth * 0.1, 0);
                        ctx.closePath();
                        ctx.restore();
                        ctx.lineWidth = 1;
                        ctx.strokeStyle = backgroundColor.symbolColor.getRgbaColor();
                        ctx.stroke();
                    }
                    ctx.rotate(angleStep * 2.5);
                }
            } else {
                stdFont = 0.08 * imageWidth + 'px serif';
                smlFont = imageWidth * 0.033 + 'px serif';

                ctx.rotate(angleStep * 10);

                for (i = 10; 360 >= i; i += 10) {
                    // Draw the labels
                    ctx.save();
                    if (pointSymbolsVisible) {
                        switch (i) {
                        case 360:
                            ctx.translate(imageWidth * 0.35, 0);
                            ctx.rotate(HALF_PI);
                            ctx.font = stdFont;
                            ctx.fillText(pointSymbols[2], 0, 0, imageWidth);
                            ctx.translate(-imageWidth * 0.35, 0);
                            break;
                        case 90:
                            ctx.translate(imageWidth * 0.35, 0);
                            ctx.rotate(HALF_PI);
                            ctx.font = stdFont;
                            ctx.fillText(pointSymbols[4], 0, 0, imageWidth);
                            ctx.translate(-imageWidth * 0.35, 0);
                            break;
                        case 180:
                            ctx.translate(imageWidth * 0.35, 0);
                            ctx.rotate(HALF_PI);
                            ctx.font = stdFont;
                            ctx.fillText(pointSymbols[6], 0, 0, imageWidth);
                            ctx.translate(-imageWidth * 0.35, 0);
                            break;
                        case 270:
                            ctx.translate(imageWidth * 0.35, 0);
                            ctx.rotate(HALF_PI);
                            ctx.font = stdFont;
                            ctx.fillText(pointSymbols[0], 0, 0, imageWidth);
                            ctx.translate(-imageWidth * 0.35, 0);
                            break;
                        default:
                            val = (i + 90) % 360;
                            ctx.translate(imageWidth * 0.37, 0);
                            ctx.rotate(HALF_PI);
                            ctx.font = smlFont;
                            ctx.fillText(('0'.substring(val >= 100) + val), 0, 0, imageWidth);
                            ctx.translate(-imageWidth * 0.37, 0);
                        }
                    } else {
                        val = (i + 90) % 360;
                        ctx.translate(imageWidth * 0.37, 0);
                        ctx.rotate(HALF_PI);
                        ctx.font = smlFont;
                        ctx.fillText(('0'.substring(val >= 100) + val), 0, 0, imageWidth);
                        ctx.translate(-imageWidth * 0.37, 0);
                    }
                    ctx.restore();
                    ctx.rotate(angleStep * 10);
                }

            }
            ctx.translate(-centerX, -centerY);
            ctx.restore();
        };

        var drawPointerImage = function (ctx) {
            ctx.save();

            switch (pointerType.type) {
            case 'type2':
                // NORTHPOINTER
                ctx.beginPath();
                ctx.moveTo(imageWidth * 0.532710, imageHeight * 0.453271);
                ctx.bezierCurveTo(imageWidth * 0.532710, imageHeight * 0.453271, imageWidth * 0.5, imageHeight * 0.149532, imageWidth * 0.5, imageHeight * 0.149532);
                ctx.bezierCurveTo(imageWidth * 0.5, imageHeight * 0.149532, imageWidth * 0.467289, imageHeight * 0.453271, imageWidth * 0.467289, imageHeight * 0.453271);
                ctx.bezierCurveTo(imageWidth * 0.453271, imageHeight * 0.462616, imageWidth * 0.443925, imageHeight * 0.481308, imageWidth * 0.443925, imageHeight * 0.5);
                ctx.bezierCurveTo(imageWidth * 0.443925, imageHeight * 0.5, imageWidth * 0.556074, imageHeight * 0.5, imageWidth * 0.556074, imageHeight * 0.5);
                ctx.bezierCurveTo(imageWidth * 0.556074, imageHeight * 0.481308, imageWidth * 0.546728, imageHeight * 0.462616, imageWidth * 0.532710, imageHeight * 0.453271);
                ctx.closePath();
                var NORTHPOINTER2_GRADIENT = ctx.createLinearGradient(0.471962 * imageWidth, 0, 0.528036 * imageWidth, 0);
                NORTHPOINTER2_GRADIENT.addColorStop(0, pointerColor.light.getRgbaColor());
                NORTHPOINTER2_GRADIENT.addColorStop(0.46, pointerColor.light.getRgbaColor());
                NORTHPOINTER2_GRADIENT.addColorStop(0.47, pointerColor.medium.getRgbaColor());
                NORTHPOINTER2_GRADIENT.addColorStop(1, pointerColor.medium.getRgbaColor());
                ctx.fillStyle = NORTHPOINTER2_GRADIENT;
                ctx.strokeStyle = pointerColor.dark.getRgbaColor();
                ctx.lineWidth = 1;
                ctx.lineCap = 'square';
                ctx.lineJoin = 'miter';
                ctx.fill();
                ctx.stroke();

                // SOUTHPOINTER
                ctx.beginPath();
                ctx.moveTo(imageWidth * 0.467289, imageHeight * 0.546728);
                ctx.bezierCurveTo(imageWidth * 0.467289, imageHeight * 0.546728, imageWidth * 0.5, imageHeight * 0.850467, imageWidth * 0.5, imageHeight * 0.850467);
                ctx.bezierCurveTo(imageWidth * 0.5, imageHeight * 0.850467, imageWidth * 0.532710, imageHeight * 0.546728, imageWidth * 0.532710, imageHeight * 0.546728);
                ctx.bezierCurveTo(imageWidth * 0.546728, imageHeight * 0.537383, imageWidth * 0.556074, imageHeight * 0.518691, imageWidth * 0.556074, imageHeight * 0.5);
                ctx.bezierCurveTo(imageWidth * 0.556074, imageHeight * 0.5, imageWidth * 0.443925, imageHeight * 0.5, imageWidth * 0.443925, imageHeight * 0.5);
                ctx.bezierCurveTo(imageWidth * 0.443925, imageHeight * 0.518691, imageWidth * 0.453271, imageHeight * 0.537383, imageWidth * 0.467289, imageHeight * 0.546728);
                ctx.closePath();
                var SOUTHPOINTER2_GRADIENT = ctx.createLinearGradient(0.471962 * imageWidth, 0, 0.528036 * imageWidth, 0);
                SOUTHPOINTER2_GRADIENT.addColorStop(0, '#e3e5e8');
                SOUTHPOINTER2_GRADIENT.addColorStop(0.48, '#e3e5e8');
                SOUTHPOINTER2_GRADIENT.addColorStop(0.48, '#abb1b8');
                SOUTHPOINTER2_GRADIENT.addColorStop(1, '#abb1b8');
                ctx.fillStyle = SOUTHPOINTER2_GRADIENT;
                var strokeColor_SOUTHPOINTER2 = '#abb1b8';
                ctx.strokeStyle = strokeColor_SOUTHPOINTER2;
                ctx.lineWidth = 1;
                ctx.lineCap = 'square';
                ctx.lineJoin = 'miter';
                ctx.fill();
                ctx.stroke();
                break;

            case 'type3':
                // NORTHPOINTER
                ctx.beginPath();
                ctx.moveTo(imageWidth * 0.5, imageHeight * 0.149532);
                ctx.bezierCurveTo(imageWidth * 0.5, imageHeight * 0.149532, imageWidth * 0.443925, imageHeight * 0.490654, imageWidth * 0.443925, imageHeight * 0.5);
                ctx.bezierCurveTo(imageWidth * 0.443925, imageHeight * 0.532710, imageWidth * 0.467289, imageHeight * 0.556074, imageWidth * 0.5, imageHeight * 0.556074);
                ctx.bezierCurveTo(imageWidth * 0.532710, imageHeight * 0.556074, imageWidth * 0.556074, imageHeight * 0.532710, imageWidth * 0.556074, imageHeight * 0.5);
                ctx.bezierCurveTo(imageWidth * 0.556074, imageHeight * 0.490654, imageWidth * 0.5, imageHeight * 0.149532, imageWidth * 0.5, imageHeight * 0.149532);
                ctx.closePath();
                var NORTHPOINTER3_GRADIENT = ctx.createLinearGradient(0.471962 * imageWidth, 0, 0.528036 * imageWidth, 0);
                NORTHPOINTER3_GRADIENT.addColorStop(0, pointerColor.light.getRgbaColor());
                NORTHPOINTER3_GRADIENT.addColorStop(0.46, pointerColor.light.getRgbaColor());
                NORTHPOINTER3_GRADIENT.addColorStop(0.47, pointerColor.medium.getRgbaColor());
                NORTHPOINTER3_GRADIENT.addColorStop(1, pointerColor.medium.getRgbaColor());
                ctx.fillStyle = NORTHPOINTER3_GRADIENT;
                ctx.strokeStyle = pointerColor.dark.getRgbaColor();
                ctx.lineWidth = 1;
                ctx.lineCap = 'square';
                ctx.lineJoin = 'miter';
                ctx.fill();
                ctx.stroke();
                break;

            case 'type1:':
            /* falls through */
            default:
                // NORTHPOINTER
                ctx.beginPath();
                ctx.moveTo(imageWidth * 0.5, imageHeight * 0.495327);
                ctx.lineTo(imageWidth * 0.528037, imageHeight * 0.495327);
                ctx.lineTo(imageWidth * 0.5, imageHeight * 0.149532);
                ctx.lineTo(imageWidth * 0.471962, imageHeight * 0.495327);
                ctx.lineTo(imageWidth * 0.5, imageHeight * 0.495327);
                ctx.closePath();
                var NORTHPOINTER1_GRADIENT = ctx.createLinearGradient(0.471962 * imageWidth, 0, 0.528036 * imageWidth, 0);
                NORTHPOINTER1_GRADIENT.addColorStop(0, pointerColor.light.getRgbaColor());
                NORTHPOINTER1_GRADIENT.addColorStop(0.46, pointerColor.light.getRgbaColor());
                NORTHPOINTER1_GRADIENT.addColorStop(0.47, pointerColor.medium.getRgbaColor());
                NORTHPOINTER1_GRADIENT.addColorStop(1, pointerColor.medium.getRgbaColor());
                ctx.fillStyle = NORTHPOINTER1_GRADIENT;
                ctx.strokeStyle = pointerColor.dark.getRgbaColor();
                ctx.lineWidth = 1;
                ctx.lineCap = 'square';
                ctx.lineJoin = 'miter';
                ctx.fill();
                ctx.stroke();

                // SOUTHPOINTER
                ctx.beginPath();
                ctx.moveTo(imageWidth * 0.5, imageHeight * 0.504672);
                ctx.lineTo(imageWidth * 0.471962, imageHeight * 0.504672);
                ctx.lineTo(imageWidth * 0.5, imageHeight * 0.850467);
                ctx.lineTo(imageWidth * 0.528037, imageHeight * 0.504672);
                ctx.lineTo(imageWidth * 0.5, imageHeight * 0.504672);
                ctx.closePath();
                var SOUTHPOINTER1_GRADIENT = ctx.createLinearGradient(0.471962 * imageWidth, 0, 0.528036 * imageWidth, 0);
                SOUTHPOINTER1_GRADIENT.addColorStop(0, '#e3e5e8');
                SOUTHPOINTER1_GRADIENT.addColorStop(0.48, '#e3e5e8');
                SOUTHPOINTER1_GRADIENT.addColorStop(0.480099, '#abb1b8');
                SOUTHPOINTER1_GRADIENT.addColorStop(1, '#abb1b8');
                ctx.fillStyle = SOUTHPOINTER1_GRADIENT;
                var strokeColor_SOUTHPOINTER = '#abb1b8';
                ctx.strokeStyle = strokeColor_SOUTHPOINTER;
                ctx.lineWidth = 1;
                ctx.lineCap = 'square';
                ctx.lineJoin = 'miter';
                ctx.fill();
                ctx.stroke();
                break;
            }
            ctx.restore();
        };

        // **************   Initialization  ********************
        // Draw all static painting code to background
        var init = function () {
            initialized = true;

            if (frameVisible) {
                drawRadialFrameImage(backgroundContext, frameDesign, centerX, centerY, imageWidth, imageHeight);
            }

            if (backgroundVisible) {
                drawRadialBackgroundImage(backgroundContext, backgroundColor, centerX, centerY, imageWidth, imageHeight);
                drawRadialCustomImage(backgroundContext, customLayer, centerX, centerY, imageWidth, imageHeight);

                if (roseVisible) {
                    drawRoseImage(roseContext, centerX, centerY, imageWidth, imageHeight, backgroundColor);
                }

                drawTickmarksImage(roseContext);
            }

            drawPointerImage(pointerContext, false);

            if (foregroundVisible) {
                drawRadialForegroundImage(foregroundContext, foregroundType, imageWidth, imageHeight, true, knobType, knobStyle);
            }
        };

        var resetBuffers = function () {
            // Buffer for all static background painting code
            backgroundBuffer.width = size;
            backgroundBuffer.height = size;
            backgroundContext = backgroundBuffer.getContext('2d');

            // Buffer for symbols/rose painting code
            roseBuffer.width = size;
            roseBuffer.height = size;
            roseContext = roseBuffer.getContext('2d');

            // Buffer for pointer image painting code
            pointerBuffer.width = size;
            pointerBuffer.height = size;
            pointerContext = pointerBuffer.getContext('2d');

            // Buffer for static foreground painting code
            foregroundBuffer.width = size;
            foregroundBuffer.height = size;
            foregroundContext = foregroundBuffer.getContext('2d');
        };

        //************************************ Public methods **************************************
        this.setValue = function (newValue) {
            newValue = parseFloat(newValue) % 360;
            if (value !== newValue) {
                value = newValue;
                this.repaint();
            }
            return this;
        };

        this.getValue = function () {
            return value;
        };

        this.setValueAnimated = function (newValue, callback) {
            var targetValue = newValue % 360;
            var gauge = this;
            var diff;
            if (value !== targetValue) {
                if (undefined !==  tween && tween.isPlaying) {
                    tween.stop();
                }

                diff = getShortestAngle(value, targetValue);
                if (rotateFace) {
                    tween = new Tween({}, '', Tween.regularEaseInOut, value, value + diff, 2);
                } else {
                    tween = new Tween({}, '', Tween.elasticEaseOut, value, value + diff, 2);
                }
                tween.onMotionChanged = function (event) {
                    value = event.target._pos % 360;
                    if (!repainting) {
                        repainting = true;
                        requestAnimFrame(gauge.repaint);
                    }
                };

                // do we have a callback function to process?
                if (callback && typeof(callback) === "function") {
                    tween.onMotionFinished = callback;
                }

                tween.start();
            }
            return this;
        };

        this.setFrameDesign = function (newFrameDesign) {
            resetBuffers();
            frameDesign = newFrameDesign;
            init();
            this.repaint();
            return this;
        };

        this.setBackgroundColor = function (newBackgroundColor) {
            resetBuffers();
            backgroundColor = newBackgroundColor;
            init();
            this.repaint();
            return this;
        };

        this.setForegroundType = function (newForegroundType) {
            resetBuffers();
            foregroundType = newForegroundType;
            init();
            this.repaint();
            return this;
        };

        this.setPointerColor = function (newPointerColor) {
            resetBuffers();
            pointerColor = newPointerColor;
            init();
            this.repaint();
            return this;
        };

        this.setPointerType = function (newPointerType) {
            resetBuffers();
            pointerType = newPointerType;
            init();
            this.repaint();
            return this;
        };

        this.setPointSymbols = function (newPointSymbols) {
            resetBuffers();
            pointSymbols = newPointSymbols;
            init();
            this.repaint();
            return this;
        };

        this.repaint = function () {
            if (!initialized) {
                init();
            }

            mainCtx.save();
            mainCtx.clearRect(0, 0, mainCtx.canvas.width, mainCtx.canvas.height);
            // Define rotation center
            angle = HALF_PI + value * angleStep - HALF_PI;

            if (backgroundVisible || frameVisible) {
                mainCtx.drawImage(backgroundBuffer, 0, 0);
            }

            if (rotateFace) {
                mainCtx.save();
                mainCtx.translate(centerX, centerY);
                mainCtx.rotate(-angle);
                mainCtx.translate(-centerX, -centerY);
                if (backgroundVisible) {
                    mainCtx.drawImage(roseBuffer, 0, 0);
                }
                mainCtx.restore();
            } else {
                if (backgroundVisible) {
                    mainCtx.drawImage(roseBuffer, 0, 0);
                }
                mainCtx.translate(centerX, centerY);
                mainCtx.rotate(angle);
                mainCtx.translate(-centerX, -centerY);
            }
            // Set the pointer shadow params
            mainCtx.shadowColor = 'rgba(0, 0, 0, 0.8)';
            mainCtx.shadowOffsetX = mainCtx.shadowOffsetY = shadowOffset;
            mainCtx.shadowBlur = shadowOffset * 2;
            // Draw the pointer
            mainCtx.drawImage(pointerBuffer, 0, 0);
            // Undo the translations & shadow settings
            mainCtx.restore();

            if (foregroundVisible) {
                mainCtx.drawImage(foregroundBuffer, 0, 0);
            }

            repainting = false;
        };

        // Visualize the component
        this.repaint();

        return this;
    };

    var windDirection = function (canvas, parameters) {
        parameters = parameters || {};
        var size = (undefined === parameters.size ? 0 : parameters.size),
            frameDesign = (undefined === parameters.frameDesign ? steelseries.FrameDesign.METAL : parameters.frameDesign),
            frameVisible = (undefined === parameters.frameVisible ? true : parameters.frameVisible),
            backgroundColor = (undefined === parameters.backgroundColor ? steelseries.BackgroundColor.DARK_GRAY : parameters.backgroundColor),
            backgroundVisible = (undefined === parameters.backgroundVisible ? true : parameters.backgroundVisible),
            pointerTypeLatest = (undefined === parameters.pointerTypeLatest ? steelseries.PointerType.TYPE1 : parameters.pointerTypeLatest),
            pointerTypeAverage = (undefined === parameters.pointerTypeAverage ? steelseries.PointerType.TYPE8 : parameters.pointerTypeAverage),
            pointerColor = (undefined === parameters.pointerColor ? steelseries.ColorDef.RED : parameters.pointerColor),
            pointerColorAverage = (undefined === parameters.pointerColorAverage ? steelseries.ColorDef.BLUE : parameters.pointerColorAverage),
            knobType = (undefined === parameters.knobType ? steelseries.KnobType.STANDARD_KNOB : parameters.knobType),
            knobStyle = (undefined === parameters.knobStyle ? steelseries.KnobStyle.SILVER : parameters.knobStyle),
            foregroundType = (undefined === parameters.foregroundType ? steelseries.ForegroundType.TYPE1 : parameters.foregroundType),
            foregroundVisible = (undefined === parameters.foregroundVisible ? true : parameters.foregroundVisible),
            pointSymbols = (undefined === parameters.pointSymbols ? ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'] : parameters.pointSymbols),
            pointSymbolsVisible = (undefined === parameters.pointSymbolsVisible ? true : parameters.pointSymbolsVisible),
            customLayer = (undefined === parameters.customLayer ? null : parameters.customLayer),
            degreeScale = (undefined === parameters.degreeScale ? true : parameters.degreeScale),
            degreeScaleHalf = (undefined === parameters.degreeScaleHalf ? false : parameters.degreeScaleHalf),
            roseVisible = (undefined === parameters.roseVisible ? false : parameters.roseVisible),
            lcdColor = (undefined === parameters.lcdColor ? steelseries.LcdColor.STANDARD : parameters.lcdColor),
            lcdVisible = (undefined === parameters.lcdVisible ? true : parameters.lcdVisible),
            digitalFont = (undefined === parameters.digitalFont ? false : parameters.digitalFont),
            section = (undefined === parameters.section ? null : parameters.section),
            area = (undefined === parameters.area ? null : parameters.area),
            lcdTitleStrings = (undefined === parameters.lcdTitleStrings ? ['Latest', 'Average'] : parameters.lcdTitleStrings),
            titleString = (undefined === parameters.titleString ? '' : parameters.titleString),
            useColorLabels = (undefined === parameters.useColorLabels ? false : parameters.useColorLabels),
            fullScaleDeflectionTime = (undefined === parameters.fullScaleDeflectionTime ? 2.5 : parameters.fullScaleDeflectionTime);

        var tweenLatest;
        var tweenAverage;
        var valueLatest = 0;
        var valueAverage = 0;
        var angleStep = RAD_FACTOR;
        var angleLatest = this.valueLatest;
        var angleAverage = this.valueAverage;
        var rotationOffset = -HALF_PI;
        var angleRange = TWO_PI;
        var range = 360;
        var repainting = false;

        // Get the canvas context and clear it
        var mainCtx = getCanvasContext(canvas);
        // Has a size been specified?
        if (size === 0) {
            size = Math.min(mainCtx.canvas.width, mainCtx.canvas.height);
        }

        // Set the size - also clears the canvas
        mainCtx.canvas.width = size;
        mainCtx.canvas.height = size;

        var imageWidth = size;
        var imageHeight = size;

        var centerX = imageWidth / 2;
        var centerY = imageHeight / 2;

        var lcdFontHeight = Math.floor(imageWidth / 10);
        var stdFont = lcdFontHeight + 'px ' + stdFontName;
        var lcdFont = lcdFontHeight + 'px ' + lcdFontName;
        var lcdWidth = imageWidth * 0.3;
        var lcdHeight = imageHeight * 0.12;
        var lcdPosX = (imageWidth - lcdWidth) / 2;
        var lcdPosY1 = imageHeight * 0.32;
        var lcdPosY2 = imageHeight * 0.565;

        var initialized = false;

        // **************   Buffer creation  ********************
        // Buffer for all static background painting code
        var backgroundBuffer = createBuffer(size, size);
        var backgroundContext = backgroundBuffer.getContext('2d');

        // Buffer for LCD displays
        var lcdBuffer;

        // Buffer for latest pointer images painting code
        var pointerBufferLatest = createBuffer(size, size);
        var pointerContextLatest = pointerBufferLatest.getContext('2d');

        // Buffer for average pointer image
        var pointerBufferAverage = createBuffer(size, size);
        var pointerContextAverage = pointerBufferAverage.getContext('2d');

        // Buffer for static foreground painting code
        var foregroundBuffer = createBuffer(size, size);
        var foregroundContext = foregroundBuffer.getContext('2d');

        // **************   Image creation  ********************
        var drawLcdText = function (value, bLatest) {
            mainCtx.save();
            mainCtx.textAlign = 'center';
            mainCtx.strokeStyle = lcdColor.textColor;
            mainCtx.fillStyle = lcdColor.textColor;

            //convert value from -180,180 range into 0-360 range
            while (value < -180) {
                value += 360;
            }
            if (!degreeScaleHalf && value < 0) {
                value += 360;
            }

            if (degreeScaleHalf && value > 180) {
                value = -(360 - value);
            }

            if (value >= 0) {
                value = '00' + Math.round(value);
                value = value.substring(value.length, value.length - 3);
            } else {
                value = '00' + Math.abs(Math.round(value));
                value = '-' + value.substring(value.length, value.length - 3);
            }

            if (lcdColor === steelseries.LcdColor.STANDARD || lcdColor === steelseries.LcdColor.STANDARD_GREEN) {
                mainCtx.shadowColor = 'gray';
                mainCtx.shadowOffsetX = imageWidth * 0.007;
                mainCtx.shadowOffsetY = imageWidth * 0.007;
                mainCtx.shadowBlur = imageWidth * 0.007;
            }
            mainCtx.font = (digitalFont ? lcdFont : stdFont);
            mainCtx.fillText(value + '\u00B0', imageWidth / 2 + lcdWidth * 0.05, (bLatest ? lcdPosY1 : lcdPosY2) + lcdHeight * 0.5 + lcdFontHeight * 0.38, lcdWidth * 0.9);

            mainCtx.restore();
        };

        var drawAreaSectionImage = function (ctx, start, stop, color, filled) {

            ctx.save();
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.lineWidth = imageWidth * 0.035;
            var startAngle = (angleRange / range * start);
            var stopAngle = startAngle + (stop - start) / (range / angleRange);
            ctx.translate(centerX, centerY);
            ctx.rotate(rotationOffset);
            ctx.beginPath();
            if (filled) {
                ctx.moveTo(0, 0);
                ctx.arc(0, 0, imageWidth * 0.365 - ctx.lineWidth / 2, startAngle, stopAngle, false);
            } else {
                ctx.arc(0, 0, imageWidth * 0.365, startAngle, stopAngle, false);
            }
            if (filled) {
                ctx.moveTo(0, 0);
                ctx.fill();
            } else {
                ctx.stroke();
            }

            ctx.translate(-centerX, -centerY);
            ctx.restore();
        };

        var drawTickmarksImage = function (ctx) {
            var OUTER_POINT = imageWidth * 0.38,
                MAJOR_INNER_POINT = imageWidth * 0.35,
                //MED_INNER_POINT = imageWidth * 0.355,
                MINOR_INNER_POINT = imageWidth * 0.36,
                TEXT_WIDTH = imageWidth * 0.1,
                TEXT_TRANSLATE_X = imageWidth * 0.31,
                CARDINAL_TRANSLATE_X = imageWidth * 0.36,
                stdFont, smlFont,
                i, val, to;

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            ctx.save();
            ctx.strokeStyle = backgroundColor.labelColor.getRgbaColor();
            ctx.fillStyle = backgroundColor.labelColor.getRgbaColor();
            ctx.translate(centerX, centerY);

            if (!degreeScale) {

                stdFont = 0.12 * imageWidth + 'px serif';
                smlFont = 0.06 * imageWidth + 'px serif';

                //var angleStep = RAD_FACTOR;
                ctx.lineWidth = 1;
                ctx.strokeStyle = backgroundColor.symbolColor.getRgbaColor();

                for (i = 0; 360 > i; i += 2.5) {

                    if (0 === i % 5) {
                        ctx.beginPath();
                        ctx.moveTo(imageWidth * 0.38, 0);
                        ctx.lineTo(imageWidth * 0.36, 0);
                        ctx.closePath();
                        ctx.stroke();
                    }

                    // Draw the labels
                    ctx.save();
                    switch (i) {
                    case 0: //E
                        ctx.translate(imageWidth * 0.35, 0);
                        ctx.rotate(HALF_PI);
                        ctx.font = stdFont;
                        ctx.fillText(pointSymbols[2], 0, 0);
                        ctx.translate(-imageWidth * 0.35, 0);
                        break;
                    case 45: //SE
                        ctx.translate(imageWidth * 0.29, 0);
                        ctx.rotate(HALF_PI);
                        ctx.font = smlFont;
                        ctx.fillText(pointSymbols[3], 0, 0);
                        ctx.translate(-imageWidth * 0.29, 0);
                        break;
                    case 90: //S
                        ctx.translate(imageWidth * 0.35, 0);
                        ctx.rotate(HALF_PI);
                        ctx.font = stdFont;
                        ctx.fillText(pointSymbols[4], 0, 0);
                        ctx.translate(-imageWidth * 0.35, 0);
                        break;
                    case 135: //SW
                        ctx.translate(imageWidth * 0.29, 0);
                        ctx.rotate(HALF_PI);
                        ctx.font = smlFont;
                        ctx.fillText(pointSymbols[5], 0, 0);
                        ctx.translate(-imageWidth * 0.29, 0);
                        break;
                    case 180: //W
                        ctx.translate(imageWidth * 0.35, 0);
                        ctx.rotate(HALF_PI);
                        ctx.font = stdFont;
                        ctx.fillText(pointSymbols[6], 0, 0);
                        ctx.translate(-imageWidth * 0.35, 0);
                        break;
                    case 225: //NW
                        ctx.translate(imageWidth * 0.29, 0);
                        ctx.rotate(HALF_PI);
                        ctx.font = smlFont;
                        ctx.fillText(pointSymbols[7], 0, 0);
                        ctx.translate(-imageWidth * 0.29, 0);
                        break;
                    case 270: //N
                        ctx.translate(imageWidth * 0.35, 0);
                        ctx.rotate(HALF_PI);
                        ctx.font = stdFont;
                        ctx.fillText(pointSymbols[0], 0, 0);
                        ctx.translate(-imageWidth * 0.35, 0);
                        break;
                    case 315: //NE
                        ctx.translate(imageWidth * 0.29, 0);
                        ctx.rotate(HALF_PI);
                        ctx.font = smlFont;
                        ctx.fillText(pointSymbols[1], 0, 0);
                        ctx.translate(-imageWidth * 0.29, 0);
                        break;
                    }
                    ctx.restore();

                    if (roseVisible && (0 === i || 22.5 === i || 45 === i || 67.5 === i || 90 === i || 112.5 === i || 135 === i || 157.5 === i || 180 === i || 202.5 === i || 225 === i || 247.5 === i || 270 === i || 292.5 === i || 315 === i || 337.5 === i || 360 === i)) {
                        // ROSE_LINE
                        ctx.save();
                        ctx.beginPath();
                        // indent the 16 half quadrant lines a bit for visual effect
                        if (i % 45) {
                            ctx.moveTo(imageWidth * 0.29, 0);
                        } else {
                            ctx.moveTo(imageWidth * 0.38, 0);
                        }
                        ctx.lineTo(imageWidth * 0.1, 0);
                        ctx.closePath();
                        ctx.restore();
                        ctx.stroke();
                    }
                    ctx.rotate(angleStep * 2.5);
                }
            } else {
                stdFont = Math.floor(0.1 * imageWidth) + 'px serif bold';
                smlFont = Math.floor(imageWidth * 0.04) + 'px ' + stdFontName;

                ctx.rotate(angleStep * 5);
                for (i = 5; 360 >= i; i += 5) {
                    // Draw the labels
                    ctx.save();
                    if (pointSymbolsVisible) {

                        switch (i) {
                        case 360:
                            ctx.translate(CARDINAL_TRANSLATE_X, 0);
                            ctx.rotate(HALF_PI);
                            ctx.font = stdFont;
                            ctx.fillText(pointSymbols[2], 0, 0, TEXT_WIDTH);
                            ctx.translate(-CARDINAL_TRANSLATE_X, 0);
                            break;
                        case 90:
                            ctx.translate(CARDINAL_TRANSLATE_X, 0);
                            ctx.rotate(HALF_PI);
                            ctx.font = stdFont;
                            ctx.fillText(pointSymbols[4], 0, 0, TEXT_WIDTH);
                            ctx.translate(-CARDINAL_TRANSLATE_X, 0);
                            break;
                        case 180:
                            ctx.translate(CARDINAL_TRANSLATE_X, 0);
                            ctx.rotate(HALF_PI);
                            ctx.font = stdFont;
                            ctx.fillText(pointSymbols[6], 0, 0, TEXT_WIDTH);
                            ctx.translate(-CARDINAL_TRANSLATE_X, 0);
                            break;
                        case 270:
                            ctx.translate(CARDINAL_TRANSLATE_X, 0);
                            ctx.rotate(HALF_PI);
                            ctx.font = stdFont;
                            ctx.fillText(pointSymbols[0], 0, 0, TEXT_WIDTH);
                            ctx.translate(-CARDINAL_TRANSLATE_X, 0);
                            break;

                        case 5:
                        case 85:
                        case 95:
                        case 175:
                        case 185:
                        case 265:
                        case 275:
                        case 355:
                            //leave room for ordinal labels
                            break;

                        default:
                            if ((i + 90) % 20) {
                                ctx.lineWidth = ((i + 90) % 5) ? 1.5 : 1;
                                ctx.beginPath();
                                ctx.moveTo(OUTER_POINT, 0);
                                to = (i + 90) % 10 ? MINOR_INNER_POINT : MAJOR_INNER_POINT;
                                ctx.lineTo(to, 0);
                                ctx.closePath();
                                ctx.stroke();
                            } else {
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                ctx.moveTo(OUTER_POINT, 0);
                                ctx.lineTo(MAJOR_INNER_POINT, 0);
                                ctx.closePath();
                                ctx.stroke();
                                val = (i + 90) % 360;
                                ctx.translate(TEXT_TRANSLATE_X, 0);
                                ctx.rotate(HALF_PI);
                                ctx.font = smlFont;
                                ctx.fillText(('0'.substring(val >= 100) + val), 0, 0, TEXT_WIDTH);
                                ctx.translate(-TEXT_TRANSLATE_X, 0);
                            }
                        }
                    } else {

                        if ((i + 90) % 20) {
                            ctx.lineWidth = ((i + 90) % 5) ? 1.5 : 1;
                            ctx.beginPath();
                            ctx.moveTo(OUTER_POINT, 0);
                            to = (i + 90) % 10 ? MINOR_INNER_POINT : MAJOR_INNER_POINT;
                            ctx.lineTo(to, 0);
                            ctx.closePath();
                            ctx.stroke();
                        } else {
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(OUTER_POINT, 0);
                            ctx.lineTo(MAJOR_INNER_POINT, 0);
                            ctx.closePath();
                            ctx.stroke();
                            val = (i + 90) % 360;
                            if (degreeScaleHalf) {
                                //invert 180-360
                                if (val > 180) {
                                    val = -(360 - val);
                                }
                            }
                            ctx.translate(TEXT_TRANSLATE_X, 0);
                            ctx.rotate(HALF_PI);
                            ctx.font = smlFont;
                            ctx.fillText(val, 0, 0, TEXT_WIDTH);
                            ctx.translate(-TEXT_TRANSLATE_X, 0);
                        }
                    }
                    ctx.restore();
                    ctx.rotate(angleStep * 5);
                }

            }
            ctx.translate(-centerX, -centerY);
            ctx.restore();
        };

        var drawLcdTitles = function (ctx) {
            if (lcdTitleStrings.length > 0) {
                ctx.save();
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = (useColorLabels ? pointerColor.medium.getRgbaColor() : backgroundColor.labelColor.getRgbaColor());
                ctx.font = 0.040 * imageWidth + 'px ' + stdFontName;
                ctx.fillText(lcdTitleStrings[0], imageWidth / 2, imageHeight * 0.29, imageWidth * 0.3);
                ctx.fillStyle = (useColorLabels ? pointerColorAverage.medium.getRgbaColor() : backgroundColor.labelColor.getRgbaColor());
                ctx.fillText(lcdTitleStrings[1], imageWidth / 2, imageHeight * 0.71, imageWidth * 0.3);
                if (titleString.length > 0) {
                    ctx.fillStyle = backgroundColor.labelColor.getRgbaColor();
                    ctx.font = 0.0467 * imageWidth + 'px ' + stdFontName;
                    ctx.fillText(titleString, imageWidth / 2, imageHeight * 0.5, imageWidth * 0.3);
                }
            }
        };

        // **************   Initialization  ********************
        // Draw all static painting code to background

        var init = function (parameters) {
            parameters = parameters || {};
            var drawBackground = (undefined === parameters.background ? false : parameters.background);
            var drawPointer = (undefined === parameters.pointer ? false : parameters.pointer);
            var drawForeground = (undefined === parameters.foreground ? false : parameters.foreground);

            initialized = true;

            if (drawBackground && frameVisible) {
                drawRadialFrameImage(backgroundContext, frameDesign, centerX, centerY, imageWidth, imageHeight);
            }

            if (drawBackground && backgroundVisible) {
                // Create background in background buffer (backgroundBuffer)
                drawRadialBackgroundImage(backgroundContext, backgroundColor, centerX, centerY, imageWidth, imageHeight);

                // Create custom layer in background buffer (backgroundBuffer)
                drawRadialCustomImage(backgroundContext, customLayer, centerX, centerY, imageWidth, imageHeight);

                // Create section in background buffer (backgroundBuffer)
                if (null !== section && 0 < section.length) {
                    var sectionIndex = section.length;
                    do {
                        sectionIndex--;
                        drawAreaSectionImage(backgroundContext, section[sectionIndex].start, section[sectionIndex].stop, section[sectionIndex].color, false);
                    }
                    while (0 < sectionIndex);
                }

                // Create area in background buffer (backgroundBuffer)
                if (null !== area && 0 < area.length) {
                    var areaIndex = area.length;
                    do {
                        areaIndex--;
                        drawAreaSectionImage(backgroundContext, area[areaIndex].start, area[areaIndex].stop, area[areaIndex].color, true);
                    }
                    while (0 < areaIndex);
                }

                drawTickmarksImage(backgroundContext);
            }

            if (drawBackground && roseVisible) {
                drawRoseImage(backgroundContext, centerX, centerY, imageWidth, imageHeight, backgroundColor);
            }

            // Create lcd background if selected in background buffer (backgroundBuffer)
            if (drawBackground && lcdVisible) {
                lcdBuffer = createLcdBackgroundImage(lcdWidth, lcdHeight, lcdColor);
                backgroundContext.drawImage(lcdBuffer, lcdPosX, lcdPosY1);
                backgroundContext.drawImage(lcdBuffer, lcdPosX, lcdPosY2);
                // Create title in background buffer (backgroundBuffer)
                drawLcdTitles(backgroundContext);
            }

            if (drawPointer) {
                drawPointerImage(pointerContextAverage, imageWidth, pointerTypeAverage, pointerColorAverage, backgroundColor.labelColor);
                drawPointerImage(pointerContextLatest, imageWidth, pointerTypeLatest, pointerColor, backgroundColor.labelColor);
            }

            if (drawForeground && foregroundVisible) {
                var knobVisible = (pointerTypeLatest.type === 'type15' || pointerTypeLatest.type === 'type16' ? false : true);
                drawRadialForegroundImage(foregroundContext, foregroundType, imageWidth, imageHeight, knobVisible, knobType, knobStyle);
            }
        };

        var resetBuffers = function (buffers) {
            buffers = buffers || {};
            var resetBackground = (undefined === buffers.background ? false : buffers.background);
            var resetPointer = (undefined === buffers.pointer ? false : buffers.pointer);
            var resetForeground = (undefined === buffers.foreground ? false : buffers.foreground);

            // Buffer for all static background painting code
            if (resetBackground) {
                backgroundBuffer.width = size;
                backgroundBuffer.height = size;
                backgroundContext = backgroundBuffer.getContext('2d');
            }
            // Buffers for pointer image painting code
            if (resetPointer) {
                pointerBufferLatest.width = size;
                pointerBufferLatest.height = size;
                pointerContextLatest = pointerBufferLatest.getContext('2d');

                pointerBufferAverage.width = size;
                pointerBufferAverage.height = size;
                pointerContextAverage = pointerBufferAverage.getContext('2d');
            }
            // Buffer for static foreground painting code
            if (resetForeground) {
                foregroundBuffer.width = size;
                foregroundBuffer.height = size;
                foregroundContext = foregroundBuffer.getContext('2d');
            }
        };

        //************************************ Public methods **************************************
        this.setValueLatest = function (newValue) {
            // Actually need to handle 0-360 rather than 0-359
            // 1-360 are used for directions
            // 0 is used as a special case to indicate 'calm'
            newValue = parseFloat(newValue);
            newValue = newValue === 360 ? 360 : newValue % 360;
            if (valueLatest !== newValue) {
                valueLatest = newValue;
                this.repaint();
            }
            return this;
        };

        this.getValueLatest = function () {
            return valueLatest;
        };

        this.setValueAverage = function (newValue) {
            // Actually need to handle 0-360 rather than 0-359
            // 1-360 are used for directions
            // 0 is used as a special case to indicate 'calm'
            newValue = parseFloat(newValue);
            newValue = newValue === 360 ? 360 : newValue % 360;
            if (valueAverage !== newValue) {
                valueAverage = newValue;
                this.repaint();
            }
            return this;
        };

        this.getValueAverage = function () {
            return valueAverage;
        };

        this.setValueAnimatedLatest = function (newValue, callback) {
            var targetValue,
                gauge = this,
                diff,
                time;
            // Actually need to handle 0-360 rather than 0-359
            // 1-360 are used for directions
            // 0 is used as a special case to indicate 'calm'
            newValue = parseFloat(newValue);
            targetValue = (newValue === 360 ? 360 : newValue % 360);

            if (valueLatest !== targetValue) {
                if (undefined !== tweenLatest && tweenLatest.isPlaying) {
                    tweenLatest.stop();
                }

                diff = getShortestAngle(valueLatest, targetValue);

                if (diff !== 0) { // 360 - 0 is a diff of zero
                    time = fullScaleDeflectionTime * Math.abs(diff) / 180;
                    time = Math.max(time, fullScaleDeflectionTime / 5);
                    tweenLatest = new Tween({}, '', Tween.regularEaseInOut, valueLatest, valueLatest + diff, time);
                    tweenLatest.onMotionChanged = function (event) {
                        valueLatest = event.target._pos === 360 ? 360 : event.target._pos % 360;
                        if (!repainting) {
                            repainting = true;
                            requestAnimFrame(gauge.repaint);
                        }
                    };

                    tweenLatest.onMotionFinished = function (event) {
                        valueLatest = event.target._pos === 360 ? 360 : event.target._pos % 360;
                        if (!repainting) {
                            repainting = true;
                            requestAnimFrame(gauge.repaint);
                        }
                        // do we have a callback function to process?
                        if (callback && typeof(callback) === "function") {
                            callback();
                        }
                    };

                    tweenLatest.start();
                } else {
                    // target different from current, but diff is zero (0 -> 360 for instance), so just repaint
                    valueLatest = targetValue;
                    if (!repainting) {
                        repainting = true;
                        requestAnimFrame(gauge.repaint);
                    }
                }
            }
            return this;
        };

        this.setValueAnimatedAverage = function (newValue, callback) {
            var targetValue,
                gauge = this,
                diff, time;
            // Actually need to handle 0-360 rather than 0-359
            // 1-360 are used for directions
            // 0 is used as a special case to indicate 'calm'
            newValue = parseFloat(newValue);
            targetValue = (newValue === 360 ? 360 : newValue % 360);
            if (valueAverage !== newValue) {
                if (undefined !== tweenAverage && tweenAverage.isPlaying) {
                    tweenAverage.stop();
                }

                diff = getShortestAngle(valueAverage, targetValue);
                if (diff !== 0) { // 360 - 0 is a diff of zero
                    time = fullScaleDeflectionTime * Math.abs(diff) / 180;
                    time = Math.max(time, fullScaleDeflectionTime / 5);
                    tweenAverage = new Tween({}, '', Tween.regularEaseInOut, valueAverage, valueAverage + diff, time);
                    tweenAverage.onMotionChanged = function (event) {
                        valueAverage = event.target._pos === 360 ? 360 : event.target._pos % 360;
                        if (!repainting) {
                            repainting = true;
                            requestAnimFrame(gauge.repaint);
                        }
                    };

                    tweenAverage.onMotionFinished = function (event) {
                        valueLatest = event.target._pos === 360 ? 360 : event.target._pos % 360;
                        if (!repainting) {
                            repainting = true;
                            requestAnimFrame(gauge.repaint);
                        }
                        // do we have a callback function to process?
                        if (callback && typeof(callback) === "function") {
                            callback();
                        }
                    };
                    
                    tweenAverage.start();
                } else {
                    // target different from current, but diff is zero (0 -> 360 for instance), so just repaint
                    valueAverage = targetValue;
                    if (!repainting) {
                        repainting = true;
                        requestAnimFrame(gauge.repaint);
                    }
                }
            }
            return this;
        };

        this.setArea = function (areaVal) {
            area = areaVal;
            resetBuffers({background: true});
            init({background: true});
            this.repaint();
            return this;
        };

        this.setSection = function (areaSec) {
            section = areaSec;
            resetBuffers({background: true});
            init({background: true});
            this.repaint();
            return this;
        };

        this.setFrameDesign = function (newFrameDesign) {
            frameDesign = newFrameDesign;
            resetBuffers({background: true});
            init({background: true});
            this.repaint();
            return this;
        };

        this.setBackgroundColor = function (newBackgroundColor) {
            backgroundColor = newBackgroundColor;
            resetBuffers({background: true});
            init({background: true});
            this.repaint();
            return this;
        };

        this.setForegroundType = function (newForegroundType) {
            resetBuffers({foreground: true});
            foregroundType = newForegroundType;
            init({foreground: true});
            this.repaint();
            return this;
        };

        this.setPointerColor = function (newPointerColor) {
            resetBuffers({pointer: true});
            pointerColor = newPointerColor;
            init({pointer: true});
            this.repaint();
            return this;
        };

        this.setPointerColorAverage = function (newPointerColor) {
            resetBuffers({pointer: true});
            pointerColorAverage = newPointerColor;
            init({pointer: true});
            this.repaint();
            return this;
        };

        this.setPointerType = function (newPointerType) {
            pointerTypeLatest = newPointerType;
            resetBuffers({pointer: true,
                          foreground: true
                         });
            init({pointer: true,
                  foreground: true
                  });
            this.repaint();
            return this;
        };

        this.setPointerTypeAverage = function (newPointerType) {
            pointerTypeAverage = newPointerType;
            resetBuffers({pointer: true,
                          foreground: true
                         });
            init({pointer: true,
                  foreground: true
                  });
            this.repaint();
            return this;
        };

        this.setPointSymbols = function (newPointSymbols) {
            pointSymbols = newPointSymbols;
            resetBuffers({background: true});
            init({background: true});
            this.repaint();
            return this;
        };

        this.setLcdColor = function (newLcdColor) {
            lcdColor = newLcdColor;
            resetBuffers({background: true});
            init({background: true});
            this.repaint();
            return this;
        };

        this.setLcdTitleStrings = function (titles) {
            lcdTitleStrings = titles;
            resetBuffers({background: true});
            init({background: true});
            this.repaint();
            return this;
        };

        this.repaint = function () {
            if (!initialized) {
                init({frame: true,
                      background: true,
                      led: true,
                      pointer: true,
                      foreground: true});
            }

            mainCtx.clearRect(0, 0, mainCtx.canvas.width, mainCtx.canvas.height);

            if (frameVisible || backgroundVisible) {
                mainCtx.drawImage(backgroundBuffer, 0, 0);
            }

            // Draw lcd display
            if (lcdVisible) {
                drawLcdText(valueLatest, true);
                drawLcdText(valueAverage, false);
            }

            // Define rotation angle
            angleAverage = valueAverage * angleStep;

            // we have to draw to a rotated temporary image area so we can translate in
            // absolute x, y values when drawing to main context
            var shadowOffset = imageWidth * 0.006;

            // Define rotation center
            mainCtx.save();
            mainCtx.translate(centerX, centerY);
            mainCtx.rotate(angleAverage);
            mainCtx.translate(-centerX, -centerY);
            // Set the pointer shadow params
            mainCtx.shadowColor = 'rgba(0, 0, 0, 0.8)';
            mainCtx.shadowOffsetX = mainCtx.shadowOffsetY = shadowOffset;
            mainCtx.shadowBlur = shadowOffset * 2;
            // Draw the pointer
            mainCtx.drawImage(pointerBufferAverage, 0, 0);
            // Define rotation angle difference for average pointer
            angleLatest = valueLatest * angleStep  - angleAverage;
            mainCtx.translate(centerX, centerY);
            mainCtx.rotate(angleLatest);
            mainCtx.translate(-centerX, -centerY);
            mainCtx.drawImage(pointerBufferLatest, 0, 0);
            mainCtx.restore();

            if (foregroundVisible) {
                mainCtx.drawImage(foregroundBuffer, 0, 0);
            }

            repainting = false;
        };

        // Visualize the component
        this.repaint();

        return this;
    };

    var horizon = function (canvas, parameters) {
        parameters = parameters || {};
        var size = (undefined === parameters.size ? 0 : parameters.size),
            frameDesign = (undefined === parameters.frameDesign ? steelseries.FrameDesign.METAL : parameters.frameDesign),
            frameVisible = (undefined === parameters.frameVisible ? true : parameters.frameVisible),
            foregroundType = (undefined === parameters.foregroundType ? steelseries.ForegroundType.TYPE1 : parameters.foregroundType),
            foregroundVisible = (undefined === parameters.foregroundVisible ? true : parameters.foregroundVisible),
            pointerColor = (undefined === parameters.pointerColor ? steelseries.ColorDef.WHITE : parameters.pointerColor);

        var tweenRoll;
        var tweenPitch;
        var repainting = false;
        var roll = 0;
        var pitch = 0;
        var pitchPixel = (PI * size) / 360;
        var pitchOffset = 0;
        var upsidedown = false;

        // Get the canvas context and clear it
        var mainCtx = getCanvasContext(canvas);
        // Has a size been specified?
        if (size === 0) {
            size = Math.min(mainCtx.canvas.width, mainCtx.canvas.height);
        }

        // Set the size - also clears the canvas
        mainCtx.canvas.width = size;
        mainCtx.canvas.height = size;

        var imageWidth = size;
        var imageHeight = size;

        var centerX = imageWidth / 2;
        var centerY = imageHeight / 2;

        var initialized = false;

        // **************   Buffer creation  ********************
        // Buffer for all static background painting code
        var backgroundBuffer = createBuffer(size, size);
        var backgroundContext = backgroundBuffer.getContext('2d');

        // Buffer for pointer image painting code
        var valueBuffer = createBuffer(size, size * PI);
        var valueContext = valueBuffer.getContext('2d');

        // Buffer for indicator painting code
        var indicatorBuffer = createBuffer(size * 0.037383, size * 0.056074);
        var indicatorContext = indicatorBuffer.getContext('2d');

        // Buffer for static foreground painting code
        var foregroundBuffer = createBuffer(size, size);
        var foregroundContext = foregroundBuffer.getContext('2d');

        // **************   Image creation  ********************
        var drawHorizonBackgroundImage = function (ctx) {
            ctx.save();

            var imgWidth = size;
            var imgHeight = size * PI;
            var y;

            // HORIZON
            ctx.beginPath();
            ctx.rect(0, 0, imgWidth, imgHeight);
            ctx.closePath();
            var HORIZON_GRADIENT = ctx.createLinearGradient(0, 0, 0, imgHeight);
            HORIZON_GRADIENT.addColorStop(0, '#7fd5f0');
            HORIZON_GRADIENT.addColorStop(0.5, '#7fd5f0');
            HORIZON_GRADIENT.addColorStop(0.5, '#3c4439');
            HORIZON_GRADIENT.addColorStop(1, '#3c4439');
            ctx.fillStyle = HORIZON_GRADIENT;
            ctx.fill();

            ctx.lineWidth = 1;
            var stepSizeY = imgHeight / 360 * 5;
            var stepTen = false;
            var step = 10;

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            var fontSize = imgWidth * 0.04;
            ctx.font = fontSize + 'px ' + stdFontName;
            ctx.fillStyle = '#37596e';
            for (y = imgHeight / 2 - stepSizeY; y > 0; y -= stepSizeY) {
                if (step <= 90) {
                    if (stepTen) {
                        ctx.fillText(step, (imgWidth - (imgWidth * 0.2)) / 2 - 8, y, imgWidth * 0.375);
                        ctx.fillText(step, imgWidth - (imgWidth - (imgWidth * 0.2)) / 2 + 8, y, imgWidth * 0.375);
                        ctx.beginPath();
                        ctx.moveTo((imgWidth - (imgWidth * 0.2)) / 2, y);
                        ctx.lineTo(imgWidth - (imgWidth - (imgWidth * 0.2)) / 2, y);
                        ctx.closePath();
                        step += 10;
                    } else {
                        ctx.beginPath();
                        ctx.moveTo((imgWidth - (imgWidth * 0.1)) / 2, y);
                        ctx.lineTo(imgWidth - (imgWidth - (imgWidth * 0.1)) / 2, y);
                        ctx.closePath();
                    }
                    ctx.stroke();
                }
                stepTen ^= true;
            }
            stepTen = false;
            step = 10;
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(0, imgHeight / 2);
            ctx.lineTo(imgWidth, imgHeight / 2);
            ctx.closePath();
            ctx.stroke();
            ctx.fillStyle = '#FFFFFF';
            ctx.lineWidth = 1;
            for (y = imgHeight / 2 + stepSizeY; y <= imgHeight; y += stepSizeY) {
                if (step <= 90) {
                    if (stepTen) {
                        ctx.fillText(-step, (imgWidth - (imgWidth * 0.2)) / 2 - 8, y, imgWidth * 0.375);
                        ctx.fillText(-step, imgWidth - (imgWidth - (imgWidth * 0.2)) / 2 + 8, y, imgWidth * 0.375);
                        ctx.beginPath();
                        ctx.moveTo((imgWidth - (imgWidth * 0.2)) / 2, y);
                        ctx.lineTo(imgWidth - (imgWidth - (imgWidth * 0.2)) / 2, y);
                        ctx.closePath();
                        step += 10;
                    } else {
                        ctx.beginPath();
                        ctx.moveTo((imgWidth - (imgWidth * 0.1)) / 2, y);
                        ctx.lineTo(imgWidth - (imgWidth - (imgWidth * 0.1)) / 2, y);
                        ctx.closePath();
                    }
                    ctx.stroke();
                }
                stepTen ^= true;
            }

            ctx.restore();
        };

        var drawHorizonForegroundImage = function (ctx) {
            ctx.save();

            ctx.fillStyle = pointerColor.light.getRgbaColor();

            // CENTERINDICATOR
            ctx.beginPath();
            ctx.moveTo(imageWidth * 0.476635, imageHeight * 0.5);
            ctx.bezierCurveTo(imageWidth * 0.476635, imageHeight * 0.514018, imageWidth * 0.485981, imageHeight * 0.523364, imageWidth * 0.5, imageHeight * 0.523364);
            ctx.bezierCurveTo(imageWidth * 0.514018, imageHeight * 0.523364, imageWidth * 0.523364, imageHeight * 0.514018, imageWidth * 0.523364, imageHeight * 0.5);
            ctx.bezierCurveTo(imageWidth * 0.523364, imageHeight * 0.485981, imageWidth * 0.514018, imageHeight * 0.476635, imageWidth * 0.5, imageHeight * 0.476635);
            ctx.bezierCurveTo(imageWidth * 0.485981, imageHeight * 0.476635, imageWidth * 0.476635, imageHeight * 0.485981, imageWidth * 0.476635, imageHeight * 0.5);
            ctx.closePath();
            ctx.moveTo(imageWidth * 0.415887, imageHeight * 0.504672);
            ctx.lineTo(imageWidth * 0.415887, imageHeight * 0.495327);
            ctx.bezierCurveTo(imageWidth * 0.415887, imageHeight * 0.495327, imageWidth * 0.467289, imageHeight * 0.495327, imageWidth * 0.467289, imageHeight * 0.495327);
            ctx.bezierCurveTo(imageWidth * 0.471962, imageHeight * 0.481308, imageWidth * 0.481308, imageHeight * 0.471962, imageWidth * 0.495327, imageHeight * 0.467289);
            ctx.bezierCurveTo(imageWidth * 0.495327, imageHeight * 0.467289, imageWidth * 0.495327, imageHeight * 0.415887, imageWidth * 0.495327, imageHeight * 0.415887);
            ctx.lineTo(imageWidth * 0.504672, imageHeight * 0.415887);
            ctx.bezierCurveTo(imageWidth * 0.504672, imageHeight * 0.415887, imageWidth * 0.504672, imageHeight * 0.467289, imageWidth * 0.504672, imageHeight * 0.467289);
            ctx.bezierCurveTo(imageWidth * 0.518691, imageHeight * 0.471962, imageWidth * 0.528037, imageHeight * 0.481308, imageWidth * 0.532710, imageHeight * 0.495327);
            ctx.bezierCurveTo(imageWidth * 0.532710, imageHeight * 0.495327, imageWidth * 0.584112, imageHeight * 0.495327, imageWidth * 0.584112, imageHeight * 0.495327);
            ctx.lineTo(imageWidth * 0.584112, imageHeight * 0.504672);
            ctx.bezierCurveTo(imageWidth * 0.584112, imageHeight * 0.504672, imageWidth * 0.532710, imageHeight * 0.504672, imageWidth * 0.532710, imageHeight * 0.504672);
            ctx.bezierCurveTo(imageWidth * 0.528037, imageHeight * 0.518691, imageWidth * 0.518691, imageHeight * 0.532710, imageWidth * 0.5, imageHeight * 0.532710);
            ctx.bezierCurveTo(imageWidth * 0.481308, imageHeight * 0.532710, imageWidth * 0.471962, imageHeight * 0.518691, imageWidth * 0.467289, imageHeight * 0.504672);
            ctx.bezierCurveTo(imageWidth * 0.467289, imageHeight * 0.504672, imageWidth * 0.415887, imageHeight * 0.504672, imageWidth * 0.415887, imageHeight * 0.504672);
            ctx.closePath();
            ctx.fill();

            // Tickmarks
            var step = 5;
            var stepRad = 5 * RAD_FACTOR;
            ctx.translate(centerX, centerY);
            ctx.rotate(-HALF_PI);
            ctx.translate(-centerX, -centerY);
            var angle;
            for (angle = -90; angle <= 90; angle += step) {
                if (angle % 45 === 0 || angle === 0) {
                    ctx.strokeStyle = pointerColor.medium.getRgbaColor();
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(imageWidth * 0.5, imageHeight * 0.088785);
                    ctx.lineTo(imageWidth * 0.5, imageHeight * 0.113);
                    ctx.closePath();
                    ctx.stroke();
                } else if (angle % 15 === 0) {
                    ctx.strokeStyle = '#FFFFFF';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(imageWidth * 0.5, imageHeight * 0.088785);
                    ctx.lineTo(imageWidth * 0.5, imageHeight * 0.103785);
                    ctx.closePath();
                    ctx.stroke();
                } else {
                    ctx.strokeStyle = '#FFFFFF';
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(imageWidth * 0.5, imageHeight * 0.088785);
                    ctx.lineTo(imageWidth * 0.5, imageHeight * 0.093785);
                    ctx.closePath();
                    ctx.stroke();
                }
                ctx.translate(centerX, centerY);
                ctx.rotate(stepRad, centerX, centerY);
                ctx.translate(-centerX, -centerY);
            }

            ctx.restore();
        };

        var drawIndicatorImage = function (ctx) {
            ctx.save();

            var imgWidth = imageWidth * 0.037383;
            var imgHeight = imageHeight * 0.056074;

            ctx.beginPath();
            ctx.moveTo(imgWidth * 0.5, 0);
            ctx.lineTo(0, imgHeight);
            ctx.lineTo(imgWidth, imgHeight);
            ctx.closePath();

            ctx.fillStyle = pointerColor.light.getRgbaColor();
            ctx.fill();
            ctx.strokeStyle = pointerColor.medium.getRgbaColor();
            ctx.stroke();

            ctx.restore();
        };

        // **************   Initialization  ********************
        // Draw all static painting code to background
        var init = function () {
            initialized = true;

            if (frameVisible) {
                drawRadialFrameImage(backgroundContext, frameDesign, centerX, centerY, imageWidth, imageHeight);
            }

            drawHorizonBackgroundImage(valueContext);

            drawIndicatorImage(indicatorContext);

            drawHorizonForegroundImage(foregroundContext);

            if (foregroundVisible) {
                drawRadialForegroundImage(foregroundContext, foregroundType, imageWidth, imageHeight, true, knobType, knobStyle, gaugeType);
            }
        };

        var resetBuffers = function () {
            // Buffer for all static background painting code
            backgroundBuffer.width = size;
            backgroundBuffer.height = size;
            backgroundContext = backgroundBuffer.getContext('2d');

            // Buffer for pointer image painting code
            valueBuffer.width = size;
            valueBuffer.height = size * PI;
            valueContext = valueBuffer.getContext('2d');

            // Buffer for the indicator
            indicatorBuffer.width = size * 0.037383;
            indicatorBuffer.height = size * 0.056074;
            indicatorContext = indicatorBuffer.getContext('2d');

            // Buffer for static foreground painting code
            foregroundBuffer.width = size;
            foregroundBuffer.height = size;
            foregroundContext = foregroundBuffer.getContext('2d');
        };

        //************************************ Public methods **************************************
        this.setRoll = function (newRoll) {
            newRoll = parseFloat(newRoll) % 360;
            if (roll !== newRoll) {
                roll = newRoll;
                this.repaint();
            }
            return this;
        };

        this.getRoll = function () {
            return roll;
        };

        this.setRollAnimated = function (newRoll, callback) {
            var gauge = this;
            newRoll = parseFloat(newRoll) % 360;
            if (roll !== newRoll) {

                if (undefined !== tweenRoll && tweenRoll.isPlaying) {
                    tweenRoll.stop();
                }

                tweenRoll = new Tween({}, '', Tween.regularEaseInOut, roll, newRoll, 1);

                tweenRoll.onMotionChanged = function (event) {
                    roll = event.target._pos;
                    if (!repainting) {
                        repainting = true;
                        requestAnimFrame(gauge.repaint);
                    }
                };

                // do we have a callback function to process?
                if (callback && typeof(callback) === "function") {
                    tweenRoll.onMotionFinished = callback;
                }

                tweenRoll.start();
            }
            return this;
        };

        this.setPitch = function (newPitch) {
            // constrain to range -180..180
            // normal range -90..90 and -180..-90/90..180 indicate inverted
            newPitch = ((parseFloat(newPitch) + 180 - pitchOffset) % 360) - 180;
            //pitch = -(newPitch + pitchOffset) % 180;
            if (pitch !== newPitch) {
                pitch = newPitch;
                if (pitch > 90) {
                    pitch = 90 - (pitch - 90);
                    if (!upsidedown) {
                        this.setRoll(roll - 180);
                    }
                    upsidedown = true;
                } else if (pitch < -90) {
                    pitch = -90 + (-90 - pitch);
                    if (!upsidedown) {
                        this.setRoll(roll + 180);
                    }
                    upsidedown = true;
                } else {
                    upsidedown = false;
                }
                this.repaint();
            }
            return this;
        };

        this.getPitch = function () {
            return pitch;
        };

        this.setPitchAnimated = function (newPitch, callback) {
            var gauge = this;
            newPitch = parseFloat(newPitch);
            // perform all range checking in setPitch()
            if (pitch !== newPitch) {
                if (undefined !== tweenPitch && tweenPitch.isPlaying) {
                    tweenPitch.stop();
                }
                tweenPitch = new Tween({}, '', Tween.regularEaseInOut, pitch, newPitch, 1);
                tweenPitch.onMotionChanged = function (event) {
                    pitch = event.target._pos;
                    if (pitch > 90) {
                        pitch = 90 - (pitch - 90);
                        if (!upsidedown) {
                            this.setRoll(roll - 180);
                        }
                        upsidedown = true;
                    } else if (pitch < -90) {
                        pitch = -90 + (-90 - pitch);
                        if (!upsidedown) {
                            this.setRoll(roll + 180);
                        }
                        upsidedown = true;
                    } else {
                        upsidedown = false;
                    }
                    if (!repainting) {
                        repainting = true;
                        requestAnimFrame(gauge.repaint);
                    }
                    gauge.setPitch(event.target._pos);
                };

                // do we have a callback function to process?
                if (callback && typeof(callback) === "function") {
                    tweenPitch.onMotionFinished = callback;
                }

                tweenPitch.start();
            }
            return this;
        };

        this.setPitchOffset = function (newPitchOffset) {
            pitchOffset = parseFloat(newPitchOffset);
            this.repaint();
            return this;
        };

        this.setFrameDesign = function (newFrameDesign) {
            resetBuffers();
            frameDesign = newFrameDesign;
            init();
            this.repaint();
            return this;
        };

        this.setForegroundType = function (newForegroundType) {
            resetBuffers();
            foregroundType = newForegroundType;
            init();
            this.repaint();
            return this;
        };

        this.repaint = function () {
            if (!initialized) {
                init();
            }

            mainCtx.save();
            mainCtx.clearRect(0, 0, mainCtx.canvas.width, mainCtx.canvas.height);

            mainCtx.drawImage(backgroundBuffer, 0, 0);

            mainCtx.save();

            // Set the clipping area
            mainCtx.beginPath();
            mainCtx.arc(centerX, centerY, imageWidth * 0.831775 / 2, 0, TWO_PI, true);
            mainCtx.closePath();
            mainCtx.clip();

            // Rotate around roll
            mainCtx.translate(centerX, centerY);
            mainCtx.rotate(-(roll * RAD_FACTOR));
            mainCtx.translate(-centerX, 0);
            // Translate about dive
            mainCtx.translate(0, (pitch * pitchPixel));

            // Draw horizon
            mainCtx.drawImage(valueBuffer, 0, -valueBuffer.height / 2);

            // Draw the scale and angle indicator
            mainCtx.translate(0, -(pitch * pitchPixel) - centerY);
            mainCtx.drawImage(indicatorBuffer, (imageWidth * 0.5 - indicatorBuffer.width / 2), (imageWidth * 0.107476));
            mainCtx.restore();

            mainCtx.drawImage(foregroundBuffer, 0, 0);

            mainCtx.restore();
        };

        // Visualize the component
        this.repaint();

        return this;
    };

    var led = function (canvas, parameters) {
        parameters = parameters || {};
        var size = (undefined === parameters.size ? 0 : parameters.size),
            ledColor = (undefined === parameters.ledColor ? steelseries.LedColor.RED_LED : parameters.ledColor);

        var ledBlinking = false;
        var ledTimerId = 0;

        // Get the canvas context and clear it
        var mainCtx = getCanvasContext(canvas);
        // Has a size been specified?
        if (size === 0) {
            size = Math.min(mainCtx.canvas.width, mainCtx.canvas.height);
        }

        // Set the size - also clears the canvas
        mainCtx.canvas.width = size;
        mainCtx.canvas.height = size;

        var initialized = false;

        // Buffer for led on painting code
        var ledBufferOn = doc.createElement('canvas');
        ledBufferOn.width = size;
        ledBufferOn.height = size;
        var ledContextOn = ledBufferOn.getContext('2d');

        // Buffer for led off painting code
        var ledBufferOff = doc.createElement('canvas');
        ledBufferOff.width = size;
        ledBufferOff.height = size;
        var ledContextOff = ledBufferOff.getContext('2d');

        // Buffer for current led painting code
        var ledBuffer = ledBufferOff;

        var init = function () {
            initialized = true;

            // Draw LED ON in ledBuffer_ON
            ledContextOn.clearRect(0, 0, ledContextOn.canvas.width, ledContextOn.canvas.height);
            ledContextOn.drawImage(createLedImage(size, 1, ledColor), 0, 0);

            // Draw LED ON in ledBuffer_OFF
            ledContextOff.clearRect(0, 0, ledContextOff.canvas.width, ledContextOff.canvas.height);
            ledContextOff.drawImage(createLedImage(size, 0, ledColor), 0, 0);
        };

        this.toggleLed = function () {
            if (ledBuffer === ledBufferOn) {
                ledBuffer = ledBufferOff;
            } else {
                ledBuffer = ledBufferOn;
            }
            repaint();
            return this;
        };

        this.setLedColor = function (newColor) {
            ledColor = newColor;
            initialized = false;
            repaint();
            return this;
        };

        this.setLedOnOff = function (on) {
            if (!!on) {
                ledBuffer = ledBufferOn;
            } else {
                ledBuffer = ledBufferOff;
            }
            repaint();
            return this;
        };

        this.blink = function (blink) {
            if (!!blink) {
                if (!ledBlinking) {
                    ledTimerId = setInterval(this.toggleLed, 1000);
                    ledBlinking = true;
                }
            } else {
                if (ledBlinking) {
                    clearInterval(ledTimerId);
                    ledBlinking = false;
                    ledBuffer = ledBufferOff;
                }
            }
            return this;
        };

        var repaint = function () {
            if (!initialized) {
                init();
            }

            mainCtx.save();
            mainCtx.clearRect(0, 0, mainCtx.canvas.width, mainCtx.canvas.height);

            mainCtx.drawImage(ledBuffer, 0, 0);

            mainCtx.restore();
        };

        repaint();

        return this;
    };

    var clock = function (canvas, parameters) {
        parameters = parameters || {};
        var size = (undefined === parameters.size ? 0 : parameters.size),
            frameDesign = (undefined === parameters.frameDesign ? steelseries.FrameDesign.METAL : parameters.frameDesign),
            frameVisible = (undefined === parameters.frameVisible ? true : parameters.frameVisible),
            pointerType = (undefined === parameters.pointerType ? steelseries.PointerType.TYPE1 : parameters.pointerType),
            pointerColor = (undefined === parameters.pointerColor ? (pointerType === steelseries.PointerType.TYPE1 ? steelseries.ColorDef.GRAY : steelseries.ColorDef.BLACK) : parameters.pointerColor),
            backgroundColor = (undefined === parameters.backgroundColor ? (pointerType === steelseries.PointerType.TYPE1 ? steelseries.BackgroundColor.ANTHRACITE : steelseries.BackgroundColor.LIGHT_GRAY) : parameters.backgroundColor),
            backgroundVisible = (undefined === parameters.backgroundVisible ? true : parameters.backgroundVisible),
            foregroundType = (undefined === parameters.foregroundType ? steelseries.ForegroundType.TYPE1 : parameters.foregroundType),
            foregroundVisible = (undefined === parameters.foregroundVisible ? true : parameters.foregroundVisible),
            customLayer = (undefined === parameters.customLayer ? null : parameters.customLayer),
            isAutomatic = (undefined === parameters.isAutomatic ? true : parameters.isAutomatic),
            hour = (undefined === parameters.hour ? 11 : parameters.hour),
            minute = (undefined === parameters.minute ? 5 : parameters.minute),
            second = (undefined === parameters.second ? 0 : parameters.second),
            secondMovesContinuous = (undefined === parameters.secondMovesContinuous ? false : parameters.secondMovesContinuous),
            timeZoneOffsetHour = (undefined === parameters.timeZoneOffsetHour ? 0 : parameters.timeZoneOffsetHour),
            timeZoneOffsetMinute = (undefined === parameters.timeZoneOffsetMinute ? 0 : parameters.timeZoneOffsetMinute),
            secondPointerVisible = (undefined === parameters.secondPointerVisible ? true : parameters.secondPointerVisible);

        // GaugeType specific private variables
        var objDate = new Date();
        var minutePointerAngle;
        var hourPointerAngle;
        var secondPointerAngle;
        var tickTimer;
        var tickInterval = (secondMovesContinuous ? 100 : 1000);
        tickInterval = (secondPointerVisible ? tickInterval : 100);

        var self = this;

        // Constants
        var ANGLE_STEP = 6;

        // Get the canvas context and clear it
        var mainCtx = getCanvasContext(canvas);
        // Has a size been specified?
        if (size === 0) {
            size = Math.min(mainCtx.canvas.width, mainCtx.canvas.height);
        }

        // Set the size - also clears the canvas
        mainCtx.canvas.width = size;
        mainCtx.canvas.height = size;

        var imageWidth = size;
        var imageHeight = size;

        var centerX = imageWidth / 2;
        var centerY = imageHeight / 2;

        var initialized = false;

        // Buffer for the frame
        var frameBuffer = createBuffer(size, size);
        var frameContext = frameBuffer.getContext('2d');

        // Buffer for static background painting code
        var backgroundBuffer = createBuffer(size, size);
        var backgroundContext = backgroundBuffer.getContext('2d');

        // Buffer for hour pointer image painting code
        var hourBuffer = createBuffer(size, size);
        var hourContext = hourBuffer.getContext('2d');

        // Buffer for minute pointer image painting code
        var minuteBuffer = createBuffer(size, size);
        var minuteContext = minuteBuffer.getContext('2d');

        // Buffer for second pointer image painting code
        var secondBuffer = createBuffer(size, size);
        var secondContext = secondBuffer.getContext('2d');

        // Buffer for static foreground painting code
        var foregroundBuffer = createBuffer(size, size);
        var foregroundContext = foregroundBuffer.getContext('2d');

        var drawTickmarksImage = function (ctx, ptrType) {
            var tickAngle;
            var SMALL_TICK_HEIGHT;
            var BIG_TICK_HEIGHT;
            var OUTER_POINT, INNER_POINT;
            OUTER_POINT = imageWidth * 0.405;
            ctx.save();
            ctx.translate(centerX, centerY);

            switch (ptrType.type) {
            case 'type1':
                // Draw minutes tickmarks
                SMALL_TICK_HEIGHT = imageWidth * 0.074766;
                INNER_POINT = OUTER_POINT - SMALL_TICK_HEIGHT;
                ctx.strokeStyle = backgroundColor.labelColor.getRgbaColor();
                ctx.lineWidth = imageWidth * 0.014018;

                for (tickAngle = 0; tickAngle < 360; tickAngle += 30) {
                    ctx.beginPath();
                    ctx.moveTo(OUTER_POINT, 0);
                    ctx.lineTo(INNER_POINT, 0);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.rotate(30 * RAD_FACTOR);
                }

                // Draw hours tickmarks
                BIG_TICK_HEIGHT = imageWidth * 0.126168;
                INNER_POINT = OUTER_POINT - BIG_TICK_HEIGHT;
                ctx.lineWidth = imageWidth * 0.032710;

                for (tickAngle = 0; tickAngle < 360; tickAngle += 90) {
                    ctx.beginPath();
                    ctx.moveTo(OUTER_POINT, 0);
                    ctx.lineTo(INNER_POINT, 0);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.rotate(90 * RAD_FACTOR);
                }
                break;

            case 'type2':
            /* falls through */
            default:
                // Draw minutes tickmarks
                SMALL_TICK_HEIGHT = imageWidth * 0.037383;
                INNER_POINT = OUTER_POINT - SMALL_TICK_HEIGHT;
                ctx.strokeStyle = backgroundColor.labelColor.getRgbaColor();
                ctx.lineWidth = imageWidth * 0.009345;

                for (tickAngle = 0; tickAngle < 360; tickAngle += 6) {
                    ctx.beginPath();
                    ctx.moveTo(OUTER_POINT, 0);
                    ctx.lineTo(INNER_POINT, 0);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.rotate(6 * RAD_FACTOR);
                }

                // Draw hours tickmarks
                BIG_TICK_HEIGHT = imageWidth * 0.084112;
                INNER_POINT = OUTER_POINT - BIG_TICK_HEIGHT;
                ctx.lineWidth = imageWidth * 0.028037;

                for (tickAngle = 0; tickAngle < 360; tickAngle += 30) {
                    ctx.beginPath();
                    ctx.moveTo(OUTER_POINT, 0);
                    ctx.lineTo(INNER_POINT, 0);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.rotate(30 * RAD_FACTOR);
                }
                break;
            }
            ctx.translate(-centerX, -centerY);
            ctx.restore();
        };

        var drawHourPointer = function (ctx, ptrType) {
            ctx.save();
            var grad;

            switch (ptrType.type) {
            case 'type2':
                ctx.beginPath();
                ctx.lineWidth = imageWidth * 0.046728;
                ctx.moveTo(centerX, imageWidth * 0.289719);
                ctx.lineTo(centerX, imageWidth * 0.289719 + imageWidth * 0.224299);
                ctx.strokeStyle = pointerColor.medium.getRgbaColor();
                ctx.closePath();
                ctx.stroke();
                break;

            case 'type1':
            /* falls through */
            default:
                ctx.beginPath();
                ctx.moveTo(imageWidth * 0.471962, imageHeight * 0.560747);
                ctx.lineTo(imageWidth * 0.471962, imageHeight * 0.214953);
                ctx.lineTo(imageWidth * 0.5, imageHeight * 0.182242);
                ctx.lineTo(imageWidth * 0.528037, imageHeight * 0.214953);
                ctx.lineTo(imageWidth * 0.528037, imageHeight * 0.560747);
                ctx.lineTo(imageWidth * 0.471962, imageHeight * 0.560747);
                ctx.closePath();
                grad = ctx.createLinearGradient(imageWidth * 0.471962, imageHeight * 0.560747, imageWidth * 0.528037, imageHeight * 0.214953);
                grad.addColorStop(1, pointerColor.veryLight.getRgbaColor());
                grad.addColorStop(0, pointerColor.light.getRgbaColor());
                ctx.fillStyle = grad;
                ctx.strokeStyle = pointerColor.light.getRgbaColor();
                ctx.fill();
                ctx.stroke();
                break;
            }
            ctx.restore();
        };

        var drawMinutePointer = function (ctx, ptrType) {
            ctx.save();
            var grad;

            switch (ptrType.type) {
            case 'type2':
                ctx.beginPath();
                ctx.lineWidth = imageWidth * 0.032710;
                ctx.moveTo(centerX, imageWidth * 0.116822);
                ctx.lineTo(centerX, imageWidth * 0.116822 + imageWidth * 0.387850);
                ctx.strokeStyle = pointerColor.medium.getRgbaColor();
                ctx.closePath();
                ctx.stroke();
                break;

            case 'type1':
            /* falls through */
            default:
                ctx.beginPath();
                ctx.moveTo(imageWidth * 0.518691, imageHeight * 0.574766);
                ctx.lineTo(imageWidth * 0.523364, imageHeight * 0.135514);
                ctx.lineTo(imageWidth * 0.5, imageHeight * 0.107476);
                ctx.lineTo(imageWidth * 0.476635, imageHeight * 0.140186);
                ctx.lineTo(imageWidth * 0.476635, imageHeight * 0.574766);
                ctx.lineTo(imageWidth * 0.518691, imageHeight * 0.574766);
                ctx.closePath();
                grad = ctx.createLinearGradient(imageWidth * 0.518691, imageHeight * 0.574766, imageWidth * 0.476635, imageHeight * 0.140186);
                grad.addColorStop(1, pointerColor.veryLight.getRgbaColor());
                grad.addColorStop(0, pointerColor.light.getRgbaColor());
                ctx.fillStyle = grad;
                ctx.strokeStyle = pointerColor.light.getRgbaColor();
                ctx.fill();
                ctx.stroke();
                break;
            }
            ctx.restore();
        };

        var drawSecondPointer = function (ctx, ptrType) {
            ctx.save();
            var grad;

            switch (ptrType.type) {
            case 'type2':
                // top rectangle
                ctx.lineWidth = imageWidth * 0.009345;
                ctx.beginPath();
                ctx.moveTo(centerX, imageWidth * 0.098130);
                ctx.lineTo(centerX, imageWidth * 0.098130 + imageWidth * 0.126168);
                ctx.closePath();
                ctx.stroke();
                // bottom rectangle
                ctx.lineWidth = imageWidth * 0.018691;
                ctx.beginPath();
                ctx.moveTo(centerX, imageWidth * 0.308411);
                ctx.lineTo(centerX, imageWidth * 0.308411 + imageWidth * 0.191588);
                ctx.closePath();
                ctx.stroke();
                // circle
                ctx.lineWidth = imageWidth * 0.016;
                ctx.beginPath();
                ctx.arc(centerX, imageWidth * 0.26, imageWidth * 0.085 / 2, 0, TWO_PI);
                ctx.closePath();
                ctx.stroke();
                break;

            case 'type1':
            /* falls through */
            default:
                ctx.beginPath();
                ctx.moveTo(imageWidth * 0.509345, imageHeight * 0.116822);
                ctx.lineTo(imageWidth * 0.509345, imageHeight * 0.574766);
                ctx.lineTo(imageWidth * 0.490654, imageHeight * 0.574766);
                ctx.lineTo(imageWidth * 0.490654, imageHeight * 0.116822);
                ctx.lineTo(imageWidth * 0.509345, imageHeight * 0.116822);
                ctx.closePath();
                grad = ctx.createLinearGradient(imageWidth * 0.509345, imageHeight * 0.116822, imageWidth * 0.490654, imageHeight * 0.574766);
                grad.addColorStop(0, steelseries.ColorDef.RED.light.getRgbaColor());
                grad.addColorStop(0.47, steelseries.ColorDef.RED.medium.getRgbaColor());
                grad.addColorStop(1, steelseries.ColorDef.RED.dark.getRgbaColor());
                ctx.fillStyle = grad;
                ctx.strokeStyle = steelseries.ColorDef.RED.dark.getRgbaColor();
                ctx.fill();
                ctx.stroke();
                break;
            }
            ctx.restore();
        };

        var drawKnob = function (ctx) {
            var grad;

            // draw the knob
            ctx.beginPath();
            ctx.arc(centerX, centerY, imageWidth * 0.045, 0, TWO_PI);
            ctx.closePath();
            grad = ctx.createLinearGradient(centerX - imageWidth * 0.045 / 2, centerY - imageWidth * 0.045 / 2, centerX + imageWidth * 0.045 / 2, centerY + imageWidth * 0.045 / 2);
            grad.addColorStop(0, '#eef0f2');
            grad.addColorStop(1, '#65696d');
            ctx.fillStyle = grad;
            ctx.fill();
        };

        var drawTopKnob = function (ctx, ptrType) {
            var grad;

            ctx.save();

            switch (ptrType.type) {
            case 'type2':
                // draw knob
                ctx.fillStyle = '#000000';
                ctx.beginPath();
                ctx.arc(centerX, centerY, imageWidth * 0.088785 / 2, 0, TWO_PI);
                ctx.closePath();
                ctx.fill();
                break;

            case 'type1':
            /* falls through */
            default:
                // draw knob
                grad = ctx.createLinearGradient(centerX - imageWidth * 0.027 / 2, centerY - imageWidth * 0.027 / 2, centerX + imageWidth * 0.027 / 2, centerY + imageWidth * 0.027 / 2);
                grad.addColorStop(0, '#f3f4f7');
                grad.addColorStop(0.11, '#f3f5f7');
                grad.addColorStop(0.12, '#f1f3f5');
                grad.addColorStop(0.2, '#c0c5cb');
                grad.addColorStop(0.2, '#bec3c9');
                grad.addColorStop(1, '#bec3c9');
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(centerX, centerY, imageWidth * 0.027, 0, TWO_PI);
                ctx.closePath();
                ctx.fill();
                break;
            }

            ctx.restore();
        };

        var calculateAngles = function (hour, minute, second) {
            secondPointerAngle = second * ANGLE_STEP * RAD_FACTOR;
            minutePointerAngle = minute * ANGLE_STEP * RAD_FACTOR;
            hourPointerAngle = (hour + minute / 60) * ANGLE_STEP * 5 * RAD_FACTOR;
        };

        var tickTock = function () {
            if (isAutomatic) {
                objDate = new Date();
            } else {
                objDate.setHours(hour);
                objDate.setMinutes(minute);
                objDate.setSeconds(second);
            }
            // Seconds
            second = objDate.getSeconds() + (secondMovesContinuous ? objDate.getMilliseconds() / 1000 : 0);

            // Hours
            if (timeZoneOffsetHour !== 0 && timeZoneOffsetMinute !== 0) {
                hour = objDate.getUTCHours() + timeZoneOffsetHour;
            } else {
                hour = objDate.getHours();
            }
            hour = hour % 12;

            // Minutes
            if (timeZoneOffsetHour !== 0 && timeZoneOffsetMinute !== 0) {
                minute = objDate.getUTCMinutes() + timeZoneOffsetMinute;
            } else {
                minute = objDate.getMinutes();
            }
            if (minute > 60) {
                minute -= 60;
                hour++;
            }
            if (minute < 0) {
                minute += 60;
                hour--;
            }
            hour = hour % 12;
            // Calculate angles from current hour and minute values
            calculateAngles(hour, minute, second);

            if (isAutomatic) {
                tickTimer = setTimeout(tickTock, tickInterval);
            }

            self.repaint();
        };

        // **************   Initialization  ********************
        // Draw all static painting code to background
        var init = function (parameters) {
            parameters = parameters || {};
            var drawFrame = (undefined === parameters.frame ? false : parameters.frame);
            var drawBackground = (undefined === parameters.background ? false : parameters.background);
            var drawPointers = (undefined === parameters.pointers ? false : parameters.pointers);
            var drawForeground = (undefined === parameters.foreground ? false : parameters.foreground);

            initialized = true;

            if (drawFrame && frameVisible) {
                drawRadialFrameImage(frameContext, frameDesign, centerX, centerY, imageWidth, imageHeight);
            }

            if (drawBackground && backgroundVisible) {
                // Create background in background buffer (backgroundBuffer)
                drawRadialBackgroundImage(backgroundContext, backgroundColor, centerX, centerY, imageWidth, imageHeight);

                // Create custom layer in background buffer (backgroundBuffer)
                drawRadialCustomImage(backgroundContext, customLayer, centerX, centerY, imageWidth, imageHeight);

                drawTickmarksImage(backgroundContext, pointerType);
            }

            if (drawPointers) {
                drawHourPointer(hourContext, pointerType);
                drawMinutePointer(minuteContext, pointerType);
                drawSecondPointer(secondContext, pointerType);
            }

            if (drawForeground && foregroundVisible) {
                drawTopKnob(foregroundContext, pointerType);
                drawRadialForegroundImage(foregroundContext, foregroundType, imageWidth, imageHeight, false);
            }
        };

        var resetBuffers = function (buffers) {
            buffers = buffers || {};
            var resetFrame = (undefined === buffers.frame ? false : buffers.frame);
            var resetBackground = (undefined === buffers.background ? false : buffers.background);
            var resetPointers = (undefined === buffers.pointers ? false : buffers.pointers);
            var resetForeground = (undefined === buffers.foreground ? false : buffers.foreground);

            if (resetFrame) {
                frameBuffer.width = size;
                frameBuffer.height = size;
                frameContext = frameBuffer.getContext('2d');
            }

            if (resetBackground) {
                backgroundBuffer.width = size;
                backgroundBuffer.height = size;
                backgroundContext = backgroundBuffer.getContext('2d');
            }

            if (resetPointers) {
                hourBuffer.width = size;
                hourBuffer.height = size;
                hourContext = hourBuffer.getContext('2d');

                minuteBuffer.width = size;
                minuteBuffer.height = size;
                minuteContext = minuteBuffer.getContext('2d');

                secondBuffer.width = size;
                secondBuffer.height = size;
                secondContext = secondBuffer.getContext('2d');
            }

            if (resetForeground) {
                foregroundBuffer.width = size;
                foregroundBuffer.height = size;
                foregroundContext = foregroundBuffer.getContext('2d');
            }
        };

        //************************************ Public methods **************************************
        this.getAutomatic = function () {
            return isAutomatic;
        };

        this.setAutomatic = function (newValue) {
            newValue = !!newValue;
            if (isAutomatic && !newValue) {
                // stop the clock!
                clearTimeout(tickTimer);
                isAutomatic = newValue;
            } else if (!isAutomatic && newValue) {
                // start the clock
                isAutomatic = newValue;
                tickTock();
            }
            return this;
        };

        this.getHour = function () {
            return hour;
        };

        this.setHour = function (newValue) {
            newValue = parseInt(newValue, 10) % 12;
            if (hour !== newValue) {
                hour = newValue;
                calculateAngles(hour, minute, second);
                this.repaint();
            }
            return this;
        };

        this.getMinute = function () {
            return minute;
        };

        this.setMinute = function (newValue) {
            newValue = parseInt(newValue, 10) % 60;
            if (minute !== newValue) {
                minute = newValue;
                calculateAngles(hour, minute, second);
                this.repaint();
            }
            return this;
        };

        this.getSecond = function () {
            return second;
        };

        this.setSecond = function (newValue) {
            second = parseInt(newValue, 10) % 60;
            if (second !== newValue) {
                second = newValue;
                calculateAngles(hour, minute, second);
                this.repaint();
            }
            return this;
        };

        this.getTimeZoneOffsetHour = function () {
            return timeZoneOffsetHour;
        };

        this.setTimeZoneOffsetHour = function (newValue) {
            timeZoneOffsetHour = parseInt(newValue, 10);
            this.repaint();
            return this;
        };

        this.getTimeZoneOffsetMinute = function () {
            return timeZoneOffsetMinute;
        };

        this.setTimeZoneOffsetMinute = function (newValue) {
            timeZoneOffsetMinute = parseInt(newValue, 10);
            this.repaint();
            return this;
        };

        this.getSecondPointerVisible = function () {
            return secondPointerVisible;
        };

        this.setSecondPointerVisible = function (newValue) {
            secondPointerVisible = !!newValue;
            this.repaint();
            return this;
        };

        this.getSecondMovesContinuous = function () {
            return secondMovesContinuous;
        };

        this.setSecondMovesContinuous = function (newValue) {
            secondMovesContinuous = !!newValue;
            tickInterval = (secondMovesContinuous ? 100 : 1000);
            tickInterval = (secondPointerVisible ? tickInterval : 100);
            return this;
        };

        this.setFrameDesign = function (newFrameDesign) {
            resetBuffers({frame: true});
            frameDesign = newFrameDesign;
            init({frame: true});
            this.repaint();
            return this;
        };

        this.setBackgroundColor = function (newBackgroundColor) {
            resetBuffers({ frame: true,
                           background: true });
            backgroundColor = newBackgroundColor;
            init({ frame: true,
                   background: true });
            this.repaint();
            return this;
        };

        this.setForegroundType = function (newForegroundType) {
            resetBuffers({foreground: true});
            foregroundType = newForegroundType;
            init({foreground: true});
            this.repaint();
            return this;
        };

        this.setPointerType = function (newPointerType) {
            resetBuffers({ background: true,
                           foreground: true,
                           pointers: true });
            pointerType = newPointerType;
            if (pointerType.type === 'type1') {
                pointerColor = steelseries.ColorDef.GRAY;
                backgroundColor = steelseries.BackgroundColor.ANTHRACITE;
            } else {
                pointerColor = steelseries.ColorDef.BLACK;
                backgroundColor = steelseries.BackgroundColor.LIGHT_GRAY;
            }
            init({ background: true,
                   foreground: true,
                   pointers: true });
            this.repaint();
            return this;
        };

        this.setPointerColor = function (newPointerColor) {
            resetBuffers({pointers: true});
            pointerColor = newPointerColor;
            init({pointers: true});
            this.repaint();
            return this;
        };

        this.repaint = function () {
            if (!initialized) {
                init({frame: true,
                      background: true,
                      pointers: true,
                      foreground: true});
            }

            //mainCtx.save();
            mainCtx.clearRect(0, 0, mainCtx.canvas.width, mainCtx.canvas.height);

            // Draw frame
            if (frameVisible) {
                mainCtx.drawImage(frameBuffer, 0, 0);
            }

            // Draw buffered image to visible canvas
            if (backgroundVisible) {
                mainCtx.drawImage(backgroundBuffer, 0, 0);
            }

            // have to draw to a rotated temporary image area so we can translate in
            // absolute x, y values when drawing to main context
            var shadowOffset = imageWidth * 0.006;

            // draw hour pointer
            // Define rotation center
            mainCtx.save();
            mainCtx.translate(centerX, centerY);
            mainCtx.rotate(hourPointerAngle);
            mainCtx.translate(-centerX, -centerY);
            // Set the pointer shadow params
            mainCtx.shadowColor = 'rgba(0, 0, 0, 0.8)';
            mainCtx.shadowOffsetX = mainCtx.shadowOffsetY = shadowOffset;
            mainCtx.shadowBlur = shadowOffset * 2;
            // Draw the pointer
            mainCtx.drawImage(hourBuffer, 0, 0);

            // draw minute pointer
            // Define rotation center
            mainCtx.translate(centerX, centerY);
            mainCtx.rotate(minutePointerAngle - hourPointerAngle);
            mainCtx.translate(-centerX, -centerY);
            mainCtx.drawImage(minuteBuffer, 0, 0);
            mainCtx.restore();

            if (pointerType.type === 'type1') {
                drawKnob(mainCtx);
            }

            if (secondPointerVisible) {
                // draw second pointer
                // Define rotation center
                mainCtx.save();
                mainCtx.translate(centerX, centerY);
                mainCtx.rotate(secondPointerAngle);
                mainCtx.translate(-centerX, -centerY);
                // Set the pointer shadow params
                mainCtx.shadowColor = 'rgba(0, 0, 0, 0.8)';
                mainCtx.shadowOffsetX = mainCtx.shadowOffsetY = shadowOffset;
                mainCtx.shadowBlur = shadowOffset * 2;
                // Draw the pointer
                mainCtx.drawImage(secondBuffer, 0, 0);
                mainCtx.restore();
            }

            // Draw foreground
            if (foregroundVisible) {
                mainCtx.drawImage(foregroundBuffer, 0, 0);
            }
        };

        // Visualize the component
        tickTock();

        return this;
    };

    var battery = function (canvas, parameters) {
        parameters = parameters || {};
        var size = (undefined === parameters.size ? 0 : parameters.size),
            value = (undefined === parameters.value ? 50 : parameters.value);

        // Get the canvas context and clear it
        var mainCtx = getCanvasContext(canvas);

        // Has a size been specified?
        if (size === 0) {
            size = mainCtx.canvas.width;
        }

        var imageWidth = size;
        var imageHeight = Math.ceil(size * 0.45);

        // Set the size - also clears the canvas
        mainCtx.canvas.width = imageWidth;
        mainCtx.canvas.height = imageHeight;

        var createBatteryImage = function (ctx, imageWidth, imageHeight, value) {
            var grad;

            // Background
            ctx.beginPath();
            ctx.moveTo(imageWidth * 0.025, imageHeight * 0.055555);
            ctx.lineTo(imageWidth * 0.9, imageHeight * 0.055555);
            ctx.lineTo(imageWidth * 0.9, imageHeight * 0.944444);
            ctx.lineTo(imageWidth * 0.025, imageHeight * 0.944444);
            ctx.lineTo(imageWidth * 0.025, imageHeight * 0.055555);
            ctx.closePath();
            //
            ctx.beginPath();
            ctx.moveTo(imageWidth * 0.925, 0);
            ctx.lineTo(0, 0);
            ctx.lineTo(0, imageHeight);
            ctx.lineTo(imageWidth * 0.925, imageHeight);
            ctx.lineTo(imageWidth * 0.925, imageHeight * 0.722222);
            ctx.bezierCurveTo(imageWidth * 0.925, imageHeight * 0.722222, imageWidth * 0.975, imageHeight * 0.722222, imageWidth * 0.975, imageHeight * 0.722222);
            ctx.bezierCurveTo(imageWidth, imageHeight * 0.722222, imageWidth, imageHeight * 0.666666, imageWidth, imageHeight * 0.666666);
            ctx.bezierCurveTo(imageWidth, imageHeight * 0.666666, imageWidth, imageHeight * 0.333333, imageWidth, imageHeight * 0.333333);
            ctx.bezierCurveTo(imageWidth, imageHeight * 0.333333, imageWidth, imageHeight * 0.277777, imageWidth * 0.975, imageHeight * 0.277777);
            ctx.bezierCurveTo(imageWidth * 0.975, imageHeight * 0.277777, imageWidth * 0.925, imageHeight * 0.277777, imageWidth * 0.925, imageHeight * 0.277777);
            ctx.lineTo(imageWidth * 0.925, 0);
            ctx.closePath();
            //
            grad = ctx.createLinearGradient(0, 0, 0, imageHeight);
            grad.addColorStop(0, '#ffffff');
            grad.addColorStop(1, '#7e7e7e');
            ctx.fillStyle = grad;
            ctx.fill();

            // Main
            ctx.beginPath();
            var end = Math.max(imageWidth * 0.875 * (value / 100), Math.ceil(imageWidth * 0.01));
            ctx.rect(imageWidth * 0.025, imageWidth * 0.025, end, imageHeight * 0.888888);
            ctx.closePath();
            var BORDER_FRACTIONS = [0, 0.4, 1];
            var BORDER_COLORS = [new RgbaColor(177, 25, 2, 1),   // 0xB11902
                                 new RgbaColor(219, 167, 21, 1), // 0xDBA715
                                 new RgbaColor(121, 162, 75, 1)  // 0x79A24B
                                ];
            var border = new GradientWrapper(0, 100, BORDER_FRACTIONS, BORDER_COLORS);
            ctx.fillStyle = border.getColorAt(value / 100).getRgbColor();
            ctx.fill();
            ctx.beginPath();
            end = Math.max(end - imageWidth * 0.05, 0);
            ctx.rect(imageWidth * 0.05, imageWidth * 0.05, end, imageHeight * 0.777777);
            ctx.closePath();
            var LIQUID_COLORS_DARK = [new RgbaColor(198, 39, 5, 1),   // 0xC62705
                                      new RgbaColor(228, 189, 32, 1), // 0xE4BD20
                                      new RgbaColor(163, 216, 102, 1) // 0xA3D866
                                    ];

            var LIQUID_COLORS_LIGHT = [new RgbaColor(246, 121, 48, 1),   // 0xF67930
                                       new RgbaColor(246, 244, 157, 1),  // 0xF6F49D
                                       new RgbaColor(223, 233, 86, 1)    // 0xDFE956
                                      ];
            var LIQUID_GRADIENT_FRACTIONS = [0, 0.4, 1];
            var liquidDark = new GradientWrapper(0, 100, LIQUID_GRADIENT_FRACTIONS, LIQUID_COLORS_DARK);
            var liquidLight = new GradientWrapper(0, 100, LIQUID_GRADIENT_FRACTIONS, LIQUID_COLORS_LIGHT);
            grad = ctx.createLinearGradient(imageWidth * 0.05, 0, imageWidth * 0.875, 0);
            grad.addColorStop(0, liquidDark.getColorAt(value / 100).getRgbColor());
            grad.addColorStop(0.5, liquidLight.getColorAt(value / 100).getRgbColor());
            grad.addColorStop(1, liquidDark.getColorAt(value / 100).getRgbColor());
            ctx.fillStyle = grad;
            ctx.fill();

            // Foreground
            ctx.beginPath();
            ctx.rect(imageWidth * 0.025, imageWidth * 0.025, imageWidth * 0.875, imageHeight * 0.444444);
            ctx.closePath();
            grad = ctx.createLinearGradient(imageWidth * 0.025, imageWidth * 0.025, imageWidth * 0.875, imageHeight * 0.444444);
            grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
            grad.addColorStop(1, 'rgba(255, 255, 255, 0.8)');
            ctx.fillStyle = grad;
            ctx.fill();
        };

        // **************   Public methods  ********************
        this.setValue = function (newValue) {
            newValue = (newValue < 0 ? 0 : (newValue > 100 ? 100 : newValue));
            if (value !== newValue) {
                value = newValue;
                this.repaint();
            }
            return this;
        };

        this.getValue = function () {
            return value;
        };

        this.repaint = function () {
            mainCtx.clearRect(0, 0, mainCtx.canvas.width, mainCtx.canvas.height);
            createBatteryImage(mainCtx, imageWidth, imageHeight, value);
        };

        // Visualize the component
        this.repaint();

        return this;
    };

    var stopwatch = function (canvas, parameters) {
        parameters = parameters || {};
        var size = (undefined === parameters.size ? 0 : parameters.size),
            frameDesign = (undefined === parameters.frameDesign ? steelseries.FrameDesign.METAL : parameters.frameDesign),
            frameVisible = (undefined === parameters.frameVisible ? true : parameters.frameVisible),
            pointerColor = (undefined === parameters.pointerColor ? steelseries.ColorDef.BLACK : parameters.pointerColor),
            backgroundColor = (undefined === parameters.backgroundColor ? steelseries.BackgroundColor.LIGHT_GRAY : parameters.backgroundColor),
            backgroundVisible = (undefined === parameters.backgroundVisible ? true : parameters.backgroundVisible),
            foregroundType = (undefined === parameters.foregroundType ? steelseries.ForegroundType.TYPE1 : parameters.foregroundType),
            foregroundVisible = (undefined === parameters.foregroundVisible ? true : parameters.foregroundVisible),
            customLayer = (undefined === parameters.customLayer ? null : parameters.customLayer),

            minutePointerAngle = 0,
            secondPointerAngle = 0,
            tickTimer,
            ANGLE_STEP = 6,
            self = this,

            start = 0,
            currentMilliSeconds = 0,
            minutes = 0,
            seconds = 0,
            milliSeconds = 0,
            running = false,
            lap = false,
            // Get the canvas context
            mainCtx = getCanvasContext(canvas),

            imageWidth, imageHeight,
            centerX, centerY,

            smallPointerSize, smallPointerX_Offset, smallPointerY_Offset,

            initialized = false,

            // Buffer for the frame
            frameBuffer, frameContext,

            // Buffer for static background painting code
            backgroundBuffer, backgroundContext,

            // Buffer for small pointer image painting code
            smallPointerBuffer, smallPointerContext,

            // Buffer for large pointer image painting code
            largePointerBuffer, largePointerContext,

            // Buffer for static foreground painting code
            foregroundBuffer, foregroundContext,

            drawTickmarksImage = function (ctx, width, range, text_scale, text_dist_factor, x_offset, y_offset) {
                var STD_FONT_SIZE = text_scale * width,
                    STD_FONT = STD_FONT_SIZE + 'px ' + stdFontName,
                    TEXT_WIDTH = width * 0.15,
                    THIN_STROKE = 0.5,
                    MEDIUM_STROKE = 1,
                    THICK_STROKE = 1.5,
                    TEXT_DISTANCE = text_dist_factor * width,
                    MIN_LENGTH = Math.round(0.025 * width),
                    MED_LENGTH = Math.round(0.035 * width),
                    MAX_LENGTH = Math.round(0.045 * width),
                    TEXT_COLOR = backgroundColor.labelColor.getRgbaColor(),
                    TICK_COLOR = backgroundColor.labelColor.getRgbaColor(),
                    CENTER = width / 2,
                    // Create the ticks itself
                    RADIUS = width * 0.4,
                    innerPoint, outerPoint, textPoint,
                    counter = 0,
                    numberCounter = 0,
                    tickCounter = 0,
                    valueCounter, // value for the tickmarks
                    sinValue = 0,
                    cosValue = 0,
                    alpha, // angle for the tickmarks
                    ALPHA_START = -PI,
                    ANGLE_STEPSIZE = TWO_PI / (range);

                ctx.width = ctx.height = width;
                ctx.save();
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.font = STD_FONT;

                for (alpha = ALPHA_START, valueCounter = 0; valueCounter <= range + 1; alpha -= ANGLE_STEPSIZE * 0.1, valueCounter += 0.1) {
                    ctx.lineWidth = THIN_STROKE;
                    sinValue = Math.sin(alpha);
                    cosValue = Math.cos(alpha);

                    // tickmark every 2 units
                    if (counter % 2 === 0) {
                        //ctx.lineWidth = THIN_STROKE;
                        innerPoint = [CENTER + (RADIUS - MIN_LENGTH) * sinValue + x_offset, CENTER + (RADIUS - MIN_LENGTH) * cosValue + y_offset];
                        outerPoint = [CENTER + RADIUS * sinValue + x_offset, CENTER + RADIUS * cosValue + y_offset];
                        // Draw ticks
                        ctx.strokeStyle = TICK_COLOR;
                        ctx.beginPath();
                        ctx.moveTo(innerPoint[0], innerPoint[1]);
                        ctx.lineTo(outerPoint[0], outerPoint[1]);
                        ctx.closePath();
                        ctx.stroke();
                    }

                    // Different tickmark every 10 units
                    if (counter === 10 || counter === 0) {
                        ctx.fillStyle = TEXT_COLOR;
                        ctx.lineWidth = MEDIUM_STROKE;
                        outerPoint = [CENTER + RADIUS * sinValue + x_offset, CENTER + RADIUS * cosValue + y_offset];
                        textPoint  = [CENTER + (RADIUS - TEXT_DISTANCE) * sinValue + x_offset, CENTER + (RADIUS - TEXT_DISTANCE) * cosValue + y_offset];

                        // Draw text
                        if (numberCounter === 5) {
                            if (valueCounter !== range) {
                                if (Math.round(valueCounter) !== 60) {
                                    ctx.fillText(Math.round(valueCounter), textPoint[0], textPoint[1], TEXT_WIDTH);
                                }
                            }
                            ctx.lineWidth = THICK_STROKE;
                            innerPoint = [CENTER + (RADIUS - MAX_LENGTH) * sinValue + x_offset, CENTER + (RADIUS - MAX_LENGTH) * cosValue + y_offset];
                            numberCounter = 0;
                        } else {
                            ctx.lineWidth = MEDIUM_STROKE;
                            innerPoint = [CENTER + (RADIUS - MED_LENGTH) * sinValue + x_offset, CENTER + (RADIUS - MED_LENGTH) * cosValue + y_offset];
                        }

                        // Draw ticks
                        ctx.strokeStyle = TICK_COLOR;
                        ctx.beginPath();
                        ctx.moveTo(innerPoint[0], innerPoint[1]);
                        ctx.lineTo(outerPoint[0], outerPoint[1]);
                        ctx.closePath();
                        ctx.stroke();

                        counter = 0;
                        tickCounter++;
                        numberCounter++;
                    }
                    counter++;
                }
                ctx.restore();
            },

            drawLargePointer = function (ctx) {
                var grad, radius;

                ctx.save();
                ctx.beginPath();
                ctx.moveTo(imageWidth * 0.509345, imageWidth * 0.457943);
                ctx.lineTo(imageWidth * 0.5, imageWidth * 0.102803);
                ctx.lineTo(imageWidth * 0.490654, imageWidth * 0.457943);
                ctx.bezierCurveTo(imageWidth * 0.490654, imageWidth * 0.457943, imageWidth * 0.490654, imageWidth * 0.457943, imageWidth * 0.490654, imageWidth * 0.457943);
                ctx.bezierCurveTo(imageWidth * 0.471962, imageWidth * 0.462616, imageWidth * 0.457943, imageWidth * 0.481308, imageWidth * 0.457943, imageWidth * 0.5);
                ctx.bezierCurveTo(imageWidth * 0.457943, imageWidth * 0.518691, imageWidth * 0.471962, imageWidth * 0.537383, imageWidth * 0.490654, imageWidth * 0.542056);
                ctx.bezierCurveTo(imageWidth * 0.490654, imageWidth * 0.542056, imageWidth * 0.490654, imageWidth * 0.542056, imageWidth * 0.490654, imageWidth * 0.542056);
                ctx.lineTo(imageWidth * 0.490654, imageWidth * 0.621495);
                ctx.lineTo(imageWidth * 0.509345, imageWidth * 0.621495);
                ctx.lineTo(imageWidth * 0.509345, imageWidth * 0.542056);
                ctx.bezierCurveTo(imageWidth * 0.509345, imageWidth * 0.542056, imageWidth * 0.509345, imageWidth * 0.542056, imageWidth * 0.509345, imageWidth * 0.542056);
                ctx.bezierCurveTo(imageWidth * 0.528037, imageWidth * 0.537383, imageWidth * 0.542056, imageWidth * 0.518691, imageWidth * 0.542056, imageWidth * 0.5);
                ctx.bezierCurveTo(imageWidth * 0.542056, imageWidth * 0.481308, imageWidth * 0.528037, imageWidth * 0.462616, imageWidth * 0.509345, imageWidth * 0.457943);
                ctx.bezierCurveTo(imageWidth * 0.509345, imageWidth * 0.457943, imageWidth * 0.509345, imageWidth * 0.457943, imageWidth * 0.509345, imageWidth * 0.457943);
                ctx.closePath();
                grad = ctx.createLinearGradient(0, 0, 0, imageWidth * 0.621495);
                grad.addColorStop(0, pointerColor.medium.getRgbaColor());
                grad.addColorStop(0.388888, pointerColor.medium.getRgbaColor());
                grad.addColorStop(0.5, pointerColor.light.getRgbaColor());
                grad.addColorStop(0.611111, pointerColor.medium.getRgbaColor());
                grad.addColorStop(1, pointerColor.medium.getRgbaColor());
                ctx.fillStyle = grad;
                ctx.strokeStyle = pointerColor.dark.getRgbaColor();
                ctx.fill();
                ctx.stroke();
                // Draw the rings
                ctx.beginPath();
                radius = imageWidth * 0.065420 / 2;
                ctx.arc(centerX, centerY, radius, 0, TWO_PI);
                grad = ctx.createLinearGradient(centerX - radius, centerX + radius, 0, centerX + radius);
                grad.addColorStop(0, '#e6b35c');
                grad.addColorStop(0.01, '#e6b35c');
                grad.addColorStop(0.99, '#c48200');
                grad.addColorStop(1, '#c48200');
                ctx.fillStyle = grad;
                ctx.closePath();
                ctx.fill();
                ctx.beginPath();
                radius = imageWidth * 0.046728 / 2;
                ctx.arc(centerX, centerY, radius, 0, TWO_PI);
                grad = ctx.createRadialGradient(centerX, centerX, 0, centerX, centerX, radius);
                grad.addColorStop(0, '#c5c5c5');
                grad.addColorStop(0.19, '#c5c5c5');
                grad.addColorStop(0.22, '#000000');
                grad.addColorStop(0.8, '#000000');
                grad.addColorStop(0.99, '#707070');
                grad.addColorStop(1, '#707070');
                ctx.fillStyle = grad;
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            },

            drawSmallPointer = function (ctx) {
                var grad, radius;

                ctx.save();
                ctx.beginPath();
                ctx.moveTo(imageWidth * 0.476635, imageWidth * 0.313084);
                ctx.bezierCurveTo(imageWidth * 0.476635, imageWidth * 0.322429, imageWidth * 0.485981, imageWidth * 0.331775, imageWidth * 0.495327, imageWidth * 0.336448);
                ctx.bezierCurveTo(imageWidth * 0.495327, imageWidth * 0.336448, imageWidth * 0.495327, imageWidth * 0.350467, imageWidth * 0.495327, imageWidth * 0.350467);
                ctx.lineTo(imageWidth * 0.504672, imageWidth * 0.350467);
                ctx.bezierCurveTo(imageWidth * 0.504672, imageWidth * 0.350467, imageWidth * 0.504672, imageWidth * 0.336448, imageWidth * 0.504672, imageWidth * 0.336448);
                ctx.bezierCurveTo(imageWidth * 0.514018, imageWidth * 0.331775, imageWidth * 0.523364, imageWidth * 0.322429, imageWidth * 0.523364, imageWidth * 0.313084);
                ctx.bezierCurveTo(imageWidth * 0.523364, imageWidth * 0.303738, imageWidth * 0.514018, imageWidth * 0.294392, imageWidth * 0.504672, imageWidth * 0.289719);
                ctx.bezierCurveTo(imageWidth * 0.504672, imageWidth * 0.289719, imageWidth * 0.5, imageWidth * 0.200934, imageWidth * 0.5, imageWidth * 0.200934);
                ctx.bezierCurveTo(imageWidth * 0.5, imageWidth * 0.200934, imageWidth * 0.495327, imageWidth * 0.289719, imageWidth * 0.495327, imageWidth * 0.289719);
                ctx.bezierCurveTo(imageWidth * 0.485981, imageWidth * 0.294392, imageWidth * 0.476635, imageWidth * 0.303738, imageWidth * 0.476635, imageWidth * 0.313084);
                ctx.closePath();
                grad = ctx.createLinearGradient(0, 0, imageWidth, 0);
                grad.addColorStop(0, pointerColor.medium.getRgbaColor());
                grad.addColorStop(0.388888, pointerColor.medium.getRgbaColor());
                grad.addColorStop(0.5, pointerColor.light.getRgbaColor());
                grad.addColorStop(0.611111, pointerColor.medium.getRgbaColor());
                grad.addColorStop(1, pointerColor.medium.getRgbaColor());
                ctx.fillStyle = grad;
                ctx.strokeStyle = pointerColor.dark.getRgbaColor();
                ctx.fill();
                ctx.stroke();
                // Draw the rings
                ctx.beginPath();
                radius = imageWidth * 0.037383 / 2;
                ctx.arc(centerX, smallPointerY_Offset + smallPointerSize / 2, radius, 0, TWO_PI);
                ctx.fillStyle = '#C48200';
                ctx.closePath();
                ctx.fill();
                ctx.beginPath();
                radius = imageWidth * 0.028037 / 2;
                ctx.arc(centerX, smallPointerY_Offset + smallPointerSize / 2, radius, 0, TWO_PI);
                ctx.fillStyle = '#999999';
                ctx.closePath();
                ctx.fill();
                ctx.beginPath();
                radius = imageWidth * 0.018691 / 2;
                ctx.arc(centerX, smallPointerY_Offset + smallPointerSize / 2, radius, 0, TWO_PI);
                ctx.fillStyle = '#000000';
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            },

            calculateAngles = function () {
                currentMilliSeconds = new Date().getTime() - start;
                secondPointerAngle = (currentMilliSeconds * ANGLE_STEP / 1000);
                minutePointerAngle = (secondPointerAngle % 10800) / 30;

                minutes = (currentMilliSeconds / 60000) % 30;
                seconds = (currentMilliSeconds / 1000) % 60;
                milliSeconds = (currentMilliSeconds) % 1000;
            },

            init = function (parameters) {
                parameters = parameters || {};
                var drawFrame = (undefined === parameters.frame ? false : parameters.frame),
                    drawBackground = (undefined === parameters.background ? false : parameters.background),
                    drawPointers = (undefined === parameters.pointers ? false : parameters.pointers),
                    drawForeground = (undefined === parameters.foreground ? false : parameters.foreground);

                initialized = true;

                if (drawFrame && frameVisible) {
                    drawRadialFrameImage(frameContext, frameDesign, centerX, centerY, imageWidth, imageHeight);
                }

                if (drawBackground && backgroundVisible) {
                    // Create background in background buffer (backgroundBuffer)
                    drawRadialBackgroundImage(backgroundContext, backgroundColor, centerX, centerY, imageWidth, imageHeight);

                    // Create custom layer in background buffer (backgroundBuffer)
                    drawRadialCustomImage(backgroundContext, customLayer, centerX, centerY, imageWidth, imageHeight);

                    drawTickmarksImage(backgroundContext, imageWidth, 60, 0.075, 0.1, 0, 0);
                    drawTickmarksImage(backgroundContext, smallPointerSize, 30, 0.095, 0.13, smallPointerX_Offset, smallPointerY_Offset);
                }
                if (drawPointers) {
                    drawLargePointer(largePointerContext);
                    drawSmallPointer(smallPointerContext);
                }

                if (drawForeground && foregroundVisible) {
                    drawRadialForegroundImage(foregroundContext, foregroundType, imageWidth, imageHeight, false);
                }
            },

            resetBuffers = function (buffers) {
                buffers = buffers || {};
                var resetFrame = (undefined === buffers.frame ? false : buffers.frame),
                    resetBackground = (undefined === buffers.background ? false : buffers.background),
                    resetPointers = (undefined === buffers.pointers ? false : buffers.pointers),
                    resetForeground = (undefined === buffers.foreground ? false : buffers.foreground);

                if (resetFrame) {
                    frameBuffer.width = size;
                    frameBuffer.height = size;
                    frameContext = frameBuffer.getContext('2d');
                }

                if (resetBackground) {
                    backgroundBuffer.width = size;
                    backgroundBuffer.height = size;
                    backgroundContext = backgroundBuffer.getContext('2d');
                }

                if (resetPointers) {
                    smallPointerBuffer.width = size;
                    smallPointerBuffer.height = size;
                    smallPointerContext = smallPointerBuffer.getContext('2d');

                    largePointerBuffer.width = size;
                    largePointerBuffer.height = size;
                    largePointerContext = largePointerBuffer.getContext('2d');
                }

                if (resetForeground) {
                    foregroundBuffer.width = size;
                    foregroundBuffer.height = size;
                    foregroundContext = foregroundBuffer.getContext('2d');
                }
            },

            tickTock = function () {
                if (!lap) {
                    calculateAngles();
                    self.repaint();
                }
                if (running) {
                    tickTimer = setTimeout(tickTock, 200);
                }

            };

        //************************************ Public methods **************************************
        // Returns true if the stopwatch is running
        this.isRunning = function () {
            return running;
        };

        // Starts the stopwatch
        this.start = function () {
            if (!running) {
                running = true;
                start = new Date().getTime() - currentMilliSeconds;
                tickTock();
            }
            return this;
        };

        // Stops the stopwatch
        this.stop = function () {
            if (running) {
                running = false;
                clearTimeout(tickTimer);
                //calculateAngles();
            }
            if (lap) {
                lap = false;
                calculateAngles();
                this.repaint();
            }
            return this;
        };

        // Resets the stopwatch
        this.reset = function () {
            if (running) {
                running = false;
                lap = false;
                clearTimeout(tickTimer);
            }
            start = new Date().getTime();
            calculateAngles();
            this.repaint();
            return this;
        };

        // Laptimer, stop/restart stopwatch
        this.lap = function () {
            if (running && !lap) {
                lap = true;
            } else if (lap) {
                lap = false;
            }
            return this;
        };

        this.getMeasuredTime = function () {
            return (minutes + ':' + seconds + ':' + milliSeconds);
        };

        this.setFrameDesign = function (newFrameDesign) {
            resetBuffers({frame: true});
            frameDesign = newFrameDesign;
            init({frame: true});
            this.repaint();
            return this;
        };

        this.setBackgroundColor = function (newBackgroundColor) {
            resetBuffers({ background: true });
            backgroundColor = newBackgroundColor;
            init({ background: true });
            this.repaint();
            return this;
        };

        this.setForegroundType = function (newForegroundType) {
            resetBuffers({foreground: true});
            foregroundType = newForegroundType;
            init({foreground: true});
            this.repaint();
            return this;
        };

        this.setPointerColor = function (newPointerColor) {
            resetBuffers({pointers: true});
            pointerColor = newPointerColor;
            init({pointers: true});
            this.repaint();
            return this;
        };

        this.repaint = function () {
            if (!initialized) {
                init({frame: true,
                      background: true,
                      pointers: true,
                      foreground: true});
            }

            mainCtx.clearRect(0, 0, imageWidth, imageHeight);

            // Draw frame
            if (frameVisible) {
                mainCtx.drawImage(frameBuffer, 0, 0);
            }

            // Draw buffered image to visible canvas
            if (backgroundVisible) {
                mainCtx.drawImage(backgroundBuffer, 0, 0);
            }

            // have to draw to a rotated temporary image area so we can translate in
            // absolute x, y values when drawing to main context
            var shadowOffset = imageWidth * 0.006;

            var rotationAngle = (minutePointerAngle + (2 * Math.sin(minutePointerAngle * RAD_FACTOR))) * RAD_FACTOR;
            var secRotationAngle = (secondPointerAngle + (2 * Math.sin(secondPointerAngle * RAD_FACTOR))) * RAD_FACTOR;

            // Draw the minute pointer
            // Define rotation center
            mainCtx.save();
            mainCtx.translate(centerX, smallPointerY_Offset + smallPointerSize / 2);
            mainCtx.rotate(rotationAngle);
            mainCtx.translate(-centerX, -(smallPointerY_Offset + smallPointerSize / 2));
            // Set the pointer shadow params
            mainCtx.shadowColor = 'rgba(0, 0, 0, 0.8)';
            mainCtx.shadowOffsetX = mainCtx.shadowOffsetY = shadowOffset / 2;
            mainCtx.shadowBlur = shadowOffset;
            // Draw the pointer
            mainCtx.drawImage(smallPointerBuffer, 0, 0);
            mainCtx.restore();

            // Draw the second pointer
            // Define rotation center
            mainCtx.save();
            mainCtx.translate(centerX, centerY);
            mainCtx.rotate(secRotationAngle);
            mainCtx.translate(-centerX, -centerY);
            // Set the pointer shadow params
            mainCtx.shadowColor = 'rgba(0, 0, 0, 0.8)';
            mainCtx.shadowOffsetX = mainCtx.shadowOffsetY = shadowOffset / 2;
            mainCtx.shadowBlur = shadowOffset;
            // Draw the pointer
            mainCtx.drawImage(largePointerBuffer, 0, 0);
            // Undo the translations & shadow settings
            mainCtx.restore();

            // Draw the foreground
            if (foregroundVisible) {
                mainCtx.drawImage(foregroundBuffer, 0, 0);
            }
        };

        // Has a size been specified?
        size = (size === 0 ? Math.min(mainCtx.canvas.width, mainCtx.canvas.height) : size);

        // Set the size - also clears it
        mainCtx.canvas.width = size;
        mainCtx.canvas.height = size;

        imageWidth = size;
        imageHeight = size;

        centerX = imageWidth / 2;
        centerY = imageHeight / 2;

        smallPointerSize = 0.285 * imageWidth;
        smallPointerX_Offset = centerX - smallPointerSize / 2;
        smallPointerY_Offset = 0.17 * imageWidth;

        // Buffer for the frame
        frameBuffer = createBuffer(size, size);
        frameContext = frameBuffer.getContext('2d');

        // Buffer for static background painting code
        backgroundBuffer = createBuffer(size, size);
        backgroundContext = backgroundBuffer.getContext('2d');

        // Buffer for small pointer image painting code
        smallPointerBuffer = createBuffer(size, size);
        smallPointerContext = smallPointerBuffer.getContext('2d');

        // Buffer for large pointer image painting code
        largePointerBuffer = createBuffer(size, size);
        largePointerContext = largePointerBuffer.getContext('2d');

        // Buffer for static foreground painting code
        foregroundBuffer = createBuffer(size, size);
        foregroundContext = foregroundBuffer.getContext('2d');

        // Visualize the component
        start = new Date().getTime();
        tickTock();

        return this;
    };

    var altimeter = function (canvas, parameters) {
        parameters = parameters || {};
            // parameters
        var size = (undefined === parameters.size ? 0 : parameters.size),
            frameDesign = (undefined === parameters.frameDesign ? steelseries.FrameDesign.METAL : parameters.frameDesign),
            frameVisible = (undefined === parameters.frameVisible ? true : parameters.frameVisible),
            backgroundColor = (undefined === parameters.backgroundColor ? steelseries.BackgroundColor.DARK_GRAY : parameters.backgroundColor),
            backgroundVisible = (undefined === parameters.backgroundVisible ? true : parameters.backgroundVisible),
            knobType = (undefined === parameters.knobType ? steelseries.KnobType.METAL_KNOB : parameters.knobType),
            knobStyle = (undefined === parameters.knobStyle ? steelseries.KnobStyle.BLACK : parameters.knobStyle),
            lcdColor = (undefined === parameters.lcdColor ? steelseries.LcdColor.BLACK : parameters.lcdColor),
            lcdVisible = (undefined === parameters.lcdVisible ? true : parameters.lcdVisible),
            digitalFont = (undefined === parameters.digitalFont ? false : parameters.digitalFont),
            foregroundType = (undefined === parameters.foregroundType ? steelseries.ForegroundType.TYPE1 : parameters.foregroundType),
            foregroundVisible = (undefined === parameters.foregroundVisible ? true : parameters.foregroundVisible),
            customLayer = (undefined === parameters.customLayer ? null : parameters.customLayer),
            //
            minValue = 0, maxValue = 10, value = minValue,
            value100 = 0, value1000 = 0, value10000 = 0,
            angleStep100ft, angleStep1000ft, angleStep10000ft,
            tickLabelPeriod = 1, // Draw value at every 10th tickmark
            tween,
            repainting = false,
            imageWidth, imageHeight,
            centerX, centerY,
            stdFont,
            mainCtx = getCanvasContext(canvas),  // Get the canvas context
            // Constants
            TICKMARK_OFFSET = PI,
            //
            initialized = false,
            // **************   Buffer creation  ********************
            // Buffer for the frame
            frameBuffer = createBuffer(size, size),
            frameContext = frameBuffer.getContext('2d'),
            // Buffer for the background
            backgroundBuffer = createBuffer(size, size),
            backgroundContext = backgroundBuffer.getContext('2d'),

            lcdBuffer,

            // Buffer for 10000ft pointer image painting code
            pointer10000Buffer = createBuffer(size, size),
            pointer10000Context = pointer10000Buffer.getContext('2d'),

            // Buffer for 1000ft pointer image painting code
            pointer1000Buffer = createBuffer(size, size),
            pointer1000Context = pointer1000Buffer.getContext('2d'),

            // Buffer for 100ft pointer image painting code
            pointer100Buffer = createBuffer(size, size),
            pointer100Context = pointer100Buffer.getContext('2d'),

            // Buffer for static foreground painting code
            foregroundBuffer = createBuffer(size, size),
            foregroundContext = foregroundBuffer.getContext('2d');
            // End of variables

        // Get the canvas context and clear it
        mainCtx.save();
        // Has a size been specified?
        size = (size === 0 ? Math.min(mainCtx.canvas.width, mainCtx.canvas.height) : size);

        // Set the size
        mainCtx.canvas.width = size;
        mainCtx.canvas.height = size;

        imageWidth = size;
        imageHeight = size;

        centerX = imageWidth / 2;
        centerY = imageHeight / 2;

        stdFont = Math.floor(imageWidth * 0.09) + 'px ' + stdFontName;

        // **************   Image creation  ********************
        var drawLcdText = function (value) {
            mainCtx.save();
            mainCtx.textAlign = 'right';
            mainCtx.textBaseline = 'middle';
            mainCtx.strokeStyle = lcdColor.textColor;
            mainCtx.fillStyle = lcdColor.textColor;

            if (lcdColor === steelseries.LcdColor.STANDARD || lcdColor === steelseries.LcdColor.STANDARD_GREEN) {
                mainCtx.shadowColor = 'gray';
                mainCtx.shadowOffsetX = imageWidth * 0.007;
                mainCtx.shadowOffsetY = imageWidth * 0.007;
                mainCtx.shadowBlur = imageWidth * 0.009;
            }
            if (digitalFont) {
                mainCtx.font = Math.floor(imageWidth * 0.075) + 'px ' + lcdFontName;
            } else {
                mainCtx.font = Math.floor(imageWidth * 0.075) + 'px ' + stdFontName;
            }
            mainCtx.fillText(Math.round(value), (imageWidth + (imageWidth * 0.4)) / 2 - 4, imageWidth * 0.607, imageWidth * 0.4);
            mainCtx.restore();
        };

        var drawTickmarksImage = function (ctx, freeAreaAngle, offset, minVal, maxVal, angleStep) {
            var MEDIUM_STROKE = Math.max(imageWidth * 0.012, 2),
                THIN_STROKE = Math.max(imageWidth * 0.007, 1.5),
                TEXT_DISTANCE = imageWidth * 0.13,
                MED_LENGTH = imageWidth * 0.05,
                MAX_LENGTH = imageWidth * 0.07,
                RADIUS = imageWidth * 0.4,
                counter = 0,
                tickCounter = 0,
                sinValue = 0,
                cosValue = 0,
                alpha,          // angle for tickmarks
                valueCounter,   // value for tickmarks
                ALPHA_START = -offset - (freeAreaAngle / 2);

            ctx.save();
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = stdFont;
            ctx.strokeStyle = backgroundColor.labelColor.getRgbaColor();
            ctx.fillStyle = backgroundColor.labelColor.getRgbaColor();

            for (alpha = ALPHA_START, valueCounter = 0; valueCounter <= 10; alpha -= angleStep * 0.1, valueCounter += 0.1) {
                sinValue = Math.sin(alpha);
                cosValue = Math.cos(alpha);

                // tickmark every 2 units
                if (counter % 2 === 0) {
                    ctx.lineWidth = THIN_STROKE;
                    // Draw ticks
                    ctx.beginPath();
                    ctx.moveTo(centerX + (RADIUS - MED_LENGTH) * sinValue, centerY + (RADIUS - MED_LENGTH) * cosValue);
                    ctx.lineTo(centerX + RADIUS * sinValue, centerY + RADIUS * cosValue);
                    ctx.closePath();
                    ctx.stroke();
                }

                // Different tickmark every 10 units
                if (counter === 10 || counter === 0) {
                    ctx.lineWidth = MEDIUM_STROKE;

                    // if gauge is full circle, avoid painting maxValue over minValue
                    if (freeAreaAngle === 0) {
                        if (Math.round(valueCounter) !== maxValue) {
                            ctx.fillText(Math.round(valueCounter).toString(), centerX + (RADIUS - TEXT_DISTANCE) * sinValue, centerY + (RADIUS - TEXT_DISTANCE) * cosValue);
                        }
                    }
                    counter = 0;
                    tickCounter++;

                    // Draw ticks
                    ctx.beginPath();
                    ctx.moveTo(centerX + (RADIUS - MAX_LENGTH) * sinValue, centerY + (RADIUS - MAX_LENGTH) * cosValue);
                    ctx.lineTo(centerX + RADIUS * sinValue, centerY + RADIUS * cosValue);
                    ctx.closePath();
                    ctx.stroke();
                }
                counter++;
            }
            ctx.restore();
        };

        var draw100ftPointer = function (ctx, shadow) {
            var grad;

            if (shadow) {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
            } else {
                grad = ctx.createLinearGradient(0, imageHeight * 0.168224, 0, imageHeight * 0.626168);
                grad.addColorStop(0, '#ffffff');
                grad.addColorStop(0.31, '#ffffff');
                grad.addColorStop(0.3101, '#ffffff');
                grad.addColorStop(0.32, '#202020');
                grad.addColorStop(1, '#202020');
                ctx.fillStyle = grad;
            }

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(imageWidth * 0.518691, imageHeight * 0.471962);
            ctx.bezierCurveTo(imageWidth * 0.514018, imageHeight * 0.471962, imageWidth * 0.509345, imageHeight * 0.467289, imageWidth * 0.509345, imageHeight * 0.467289);
            ctx.lineTo(imageWidth * 0.509345, imageHeight * 0.200934);
            ctx.lineTo(imageWidth * 0.5, imageHeight * 0.168224);
            ctx.lineTo(imageWidth * 0.490654, imageHeight * 0.200934);
            ctx.lineTo(imageWidth * 0.490654, imageHeight * 0.467289);
            ctx.bezierCurveTo(imageWidth * 0.490654, imageHeight * 0.467289, imageWidth * 0.481308, imageHeight * 0.471962, imageWidth * 0.481308, imageHeight * 0.471962);
            ctx.bezierCurveTo(imageWidth * 0.471962, imageHeight * 0.481308, imageWidth * 0.467289, imageHeight * 0.490654, imageWidth * 0.467289, imageHeight * 0.5);
            ctx.bezierCurveTo(imageWidth * 0.467289, imageHeight * 0.514018, imageWidth * 0.476635, imageHeight * 0.528037, imageWidth * 0.490654, imageHeight * 0.532710);
            ctx.bezierCurveTo(imageWidth * 0.490654, imageHeight * 0.532710, imageWidth * 0.490654, imageHeight * 0.579439, imageWidth * 0.490654, imageHeight * 0.588785);
            ctx.bezierCurveTo(imageWidth * 0.485981, imageHeight * 0.593457, imageWidth * 0.481308, imageHeight * 0.598130, imageWidth * 0.481308, imageHeight * 0.607476);
            ctx.bezierCurveTo(imageWidth * 0.481308, imageHeight * 0.616822, imageWidth * 0.490654, imageHeight * 0.626168, imageWidth * 0.5, imageHeight * 0.626168);
            ctx.bezierCurveTo(imageWidth * 0.509345, imageHeight * 0.626168, imageWidth * 0.518691, imageHeight * 0.616822, imageWidth * 0.518691, imageHeight * 0.607476);
            ctx.bezierCurveTo(imageWidth * 0.518691, imageHeight * 0.598130, imageWidth * 0.514018, imageHeight * 0.593457, imageWidth * 0.504672, imageHeight * 0.588785);
            ctx.bezierCurveTo(imageWidth * 0.504672, imageHeight * 0.579439, imageWidth * 0.504672, imageHeight * 0.532710, imageWidth * 0.509345, imageHeight * 0.532710);
            ctx.bezierCurveTo(imageWidth * 0.523364, imageHeight * 0.528037, imageWidth * 0.532710, imageHeight * 0.514018, imageWidth * 0.532710, imageHeight * 0.5);
            ctx.bezierCurveTo(imageWidth * 0.532710, imageHeight * 0.490654, imageWidth * 0.528037, imageHeight * 0.481308, imageWidth * 0.518691, imageHeight * 0.471962);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        };

        var draw1000ftPointer = function (ctx) {
            var grad;

            grad = ctx.createLinearGradient(0, imageHeight * 0.401869, 0, imageHeight * 0.616822);
            grad.addColorStop(0, '#ffffff');
            grad.addColorStop(0.51, '#ffffff');
            grad.addColorStop(0.52, '#ffffff');
            grad.addColorStop(0.5201, '#202020');
            grad.addColorStop(0.53, '#202020');
            grad.addColorStop(1, '#202020');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.moveTo(imageWidth * 0.518691, imageHeight * 0.471962);
            ctx.bezierCurveTo(imageWidth * 0.514018, imageHeight * 0.462616, imageWidth * 0.528037, imageHeight * 0.401869, imageWidth * 0.528037, imageHeight * 0.401869);
            ctx.lineTo(imageWidth * 0.5, imageHeight * 0.331775);
            ctx.lineTo(imageWidth * 0.471962, imageHeight * 0.401869);
            ctx.bezierCurveTo(imageWidth * 0.471962, imageHeight * 0.401869, imageWidth * 0.485981, imageHeight * 0.462616, imageWidth * 0.481308, imageHeight * 0.471962);
            ctx.bezierCurveTo(imageWidth * 0.471962, imageHeight * 0.481308, imageWidth * 0.467289, imageHeight * 0.490654, imageWidth * 0.467289, imageHeight * 0.5);
            ctx.bezierCurveTo(imageWidth * 0.467289, imageHeight * 0.514018, imageWidth * 0.476635, imageHeight * 0.528037, imageWidth * 0.490654, imageHeight * 0.532710);
            ctx.bezierCurveTo(imageWidth * 0.490654, imageHeight * 0.532710, imageWidth * 0.462616, imageHeight * 0.574766, imageWidth * 0.462616, imageHeight * 0.593457);
            ctx.bezierCurveTo(imageWidth * 0.467289, imageHeight * 0.616822, imageWidth * 0.5, imageHeight * 0.612149, imageWidth * 0.5, imageHeight * 0.612149);
            ctx.bezierCurveTo(imageWidth * 0.5, imageHeight * 0.612149, imageWidth * 0.532710, imageHeight * 0.616822, imageWidth * 0.537383, imageHeight * 0.593457);
            ctx.bezierCurveTo(imageWidth * 0.537383, imageHeight * 0.574766, imageWidth * 0.509345, imageHeight * 0.532710, imageWidth * 0.509345, imageHeight * 0.532710);
            ctx.bezierCurveTo(imageWidth * 0.523364, imageHeight * 0.528037, imageWidth * 0.532710, imageHeight * 0.514018, imageWidth * 0.532710, imageHeight * 0.5);
            ctx.bezierCurveTo(imageWidth * 0.532710, imageHeight * 0.490654, imageWidth * 0.528037, imageHeight * 0.481308, imageWidth * 0.518691, imageHeight * 0.471962);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        };

        var draw10000ftPointer = function (ctx) {
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.moveTo(imageWidth * 0.518691, imageHeight * 0.471962);
            ctx.bezierCurveTo(imageWidth * 0.514018, imageHeight * 0.471962, imageWidth * 0.514018, imageHeight * 0.467289, imageWidth * 0.514018, imageHeight * 0.467289);
            ctx.lineTo(imageWidth * 0.514018, imageHeight * 0.317757);
            ctx.lineTo(imageWidth * 0.504672, imageHeight * 0.303738);
            ctx.lineTo(imageWidth * 0.504672, imageHeight * 0.182242);
            ctx.lineTo(imageWidth * 0.532710, imageHeight * 0.116822);
            ctx.lineTo(imageWidth * 0.462616, imageHeight * 0.116822);
            ctx.lineTo(imageWidth * 0.495327, imageHeight * 0.182242);
            ctx.lineTo(imageWidth * 0.495327, imageHeight * 0.299065);
            ctx.lineTo(imageWidth * 0.485981, imageHeight * 0.317757);
            ctx.lineTo(imageWidth * 0.485981, imageHeight * 0.467289);
            ctx.bezierCurveTo(imageWidth * 0.485981, imageHeight * 0.467289, imageWidth * 0.485981, imageHeight * 0.471962, imageWidth * 0.481308, imageHeight * 0.471962);
            ctx.bezierCurveTo(imageWidth * 0.471962, imageHeight * 0.481308, imageWidth * 0.467289, imageHeight * 0.490654, imageWidth * 0.467289, imageHeight * 0.5);
            ctx.bezierCurveTo(imageWidth * 0.467289, imageHeight * 0.518691, imageWidth * 0.481308, imageHeight * 0.532710, imageWidth * 0.5, imageHeight * 0.532710);
            ctx.bezierCurveTo(imageWidth * 0.518691, imageHeight * 0.532710, imageWidth * 0.532710, imageHeight * 0.518691, imageWidth * 0.532710, imageHeight * 0.5);
            ctx.bezierCurveTo(imageWidth * 0.532710, imageHeight * 0.490654, imageWidth * 0.528037, imageHeight * 0.481308, imageWidth * 0.518691, imageHeight * 0.471962);
            ctx.closePath();
            ctx.fill();
        };

        function calcAngleStep() {
            angleStep100ft = (TWO_PI) / (maxValue - minValue);
            angleStep1000ft = angleStep100ft / 10;
            angleStep10000ft = angleStep1000ft / 10;
        }

        function calcValues() {
            value100 = (value % 1000) / 100;
            value1000 = (value % 10000) / 100;
            value10000 = (value % 100000) / 100;
        }

        // **************   Initialization  ********************
        // Draw all static painting code to background
        var init = function (parameters) {
            parameters = parameters || {};
            // Parameters
            var drawFrame = (undefined === parameters.frame ? false : parameters.frame),
                drawBackground = (undefined === parameters.background ? false : parameters.background),
                drawPointers = (undefined === parameters.pointers ? false : parameters.pointers),
                drawForeground = (undefined === parameters.foreground ? false : parameters.foreground);

            initialized = true;

            calcAngleStep();

            // Create frame in frame buffer (backgroundBuffer)
            if (drawFrame && frameVisible) {
                drawRadialFrameImage(frameContext, frameDesign, centerX, centerY, imageWidth, imageHeight);
            }

            if (drawBackground && backgroundVisible) {
                // Create background in background buffer (backgroundBuffer)
                drawRadialBackgroundImage(backgroundContext, backgroundColor, centerX, centerY, imageWidth, imageHeight);

                // Create custom layer in background buffer (backgroundBuffer)
                drawRadialCustomImage(backgroundContext, customLayer, centerX, centerY, imageWidth, imageHeight);

                // Create tickmarks in background buffer (backgroundBuffer)
                drawTickmarksImage(backgroundContext, 0, TICKMARK_OFFSET, 0, 10, angleStep100ft, tickLabelPeriod, 0, true, true, null);
            }

            // Create lcd background if selected in background buffer (backgroundBuffer)
            if (drawBackground && lcdVisible) {
                lcdBuffer = createLcdBackgroundImage(imageWidth * 0.4, imageHeight * 0.09, lcdColor);
                backgroundContext.drawImage(lcdBuffer, (imageWidth - (imageWidth * 0.4)) / 2, imageHeight * 0.56);
            }

            if (drawPointers) {
                // Create 100ft pointer in buffer
                draw100ftPointer(pointer100Context, false);
                // Create 1000ft pointer in buffer
                draw1000ftPointer(pointer1000Context, false);
                // Create 10000ft pointer in buffer
                draw10000ftPointer(pointer10000Context, false);
            }

            if (drawForeground && foregroundVisible) {
                drawRadialForegroundImage(foregroundContext, foregroundType, imageWidth, imageHeight, true, knobType, knobStyle);
            }
        };

        var resetBuffers = function (buffers) {
            buffers = buffers || {};
            var resetFrame = (undefined === buffers.frame ? false : buffers.frame),
                resetBackground = (undefined === buffers.background ? false : buffers.background),
                resetPointers = (undefined === buffers.pointers ? false : buffers.pointers),
                resetForeground = (undefined === buffers.foreground ? false : buffers.foreground);

            if (resetFrame) {
                frameBuffer.width = size;
                frameBuffer.height = size;
                frameContext = frameBuffer.getContext('2d');
            }

            if (resetBackground) {
                backgroundBuffer.width = size;
                backgroundBuffer.height = size;
                backgroundContext = backgroundBuffer.getContext('2d');
            }

            if (resetPointers) {
                pointer100Buffer.width = size;
                pointer100Buffer.height = size;
                pointer100Context = pointer100Buffer.getContext('2d');

                pointer1000Buffer.width = size;
                pointer1000Buffer.height = size;
                pointer1000Context = pointer1000Buffer.getContext('2d');

                pointer10000Buffer.width = size;
                pointer10000Buffer.height = size;
                pointer10000Context = pointer10000Buffer.getContext('2d');
            }

            if (resetForeground) {
                foregroundBuffer.width = size;
                foregroundBuffer.height = size;
                foregroundContext = foregroundBuffer.getContext('2d');
            }
        };

        //************************************ Public methods **************************************
        this.setValue = function (newValue) {
            value = parseFloat(newValue);
            this.repaint();
        };

        this.getValue = function () {
            return value;
        };

        this.setValueAnimated = function (newValue, callback) {
            newValue = parseFloat(newValue);
            var targetValue = (newValue < minValue ? minValue : newValue),
                gauge = this,
                time;

            if (value !== targetValue) {
                if (undefined !==  tween && tween.isPlaying) {
                    tween.stop();
                }
                // Allow 5 secs per 10,000ft
                time = Math.max(Math.abs(value - targetValue) / 10000 * 5, 1);
                tween = new Tween({}, '', Tween.regularEaseInOut, value, targetValue, time);
                //tween = new Tween(new Object(), '', Tween.strongEaseInOut, value, targetValue, 1);
                tween.onMotionChanged = function (event) {
                        value = event.target._pos;
                        if (!repainting) {
                            repainting = true;
                            requestAnimFrame(gauge.repaint);
                        }
                    };

                // do we have a callback function to process?
                if (callback && typeof(callback) === "function") {
                    tween.onMotionFinished = callback;
                }

                tween.start();
            }
            return this;
        };

        this.setFrameDesign = function (newFrameDesign) {
            resetBuffers({frame: true});
            frameDesign = newFrameDesign;
            init({frame: true});
            this.repaint();
            return this;
        };

        this.setBackgroundColor = function (newBackgroundColor) {
            resetBuffers({background: true,
                          pointer: true       // type2 & 13 depend on background
                });
            backgroundColor = newBackgroundColor;
            init({background: true,   // type2 & 13 depend on background
                  pointer: true
                });
            this.repaint();
            return this;
        };

        this.setForegroundType = function (newForegroundType) {
            resetBuffers({foreground: true});
            foregroundType = newForegroundType;
            init({foreground: true});
            this.repaint();
            return this;
        };

        this.setLcdColor = function (newLcdColor) {
            lcdColor = newLcdColor;
            resetBuffers({background: true});
            init({background: true});
            this.repaint();
            return this;
        };

        this.repaint = function () {
            if (!initialized) {
                init({frame: true,
                      background: true,
                      led: true,
                      pointers: true,
                      foreground: true});
            }

            //mainCtx.save();
            mainCtx.clearRect(0, 0, mainCtx.canvas.width, mainCtx.canvas.height);

            // Draw frame
            if (frameVisible) {
                mainCtx.drawImage(frameBuffer, 0, 0);
            }

            // Draw buffered image to visible canvas
            mainCtx.drawImage(backgroundBuffer, 0, 0);

            // Draw lcd display
            if (lcdVisible) {
                drawLcdText(value);
            }

            // re-calculate the spearate pointer values
            calcValues();

            var shadowOffset = imageWidth * 0.006 * 0.5;

            mainCtx.save();
            //Draw 10000ft pointer
            // Define rotation center
            mainCtx.translate(centerX, centerY);
            mainCtx.rotate((value10000 - minValue) * angleStep10000ft);
            mainCtx.translate(-centerX, -centerY);
            // Set the pointer shadow params
            mainCtx.shadowColor = 'rgba(0, 0, 0, 0.8)';
            mainCtx.shadowOffsetX = mainCtx.shadowOffsetY = shadowOffset;
            mainCtx.shadowBlur = shadowOffset * 2;
            // Draw the pointer
            mainCtx.drawImage(pointer10000Buffer, 0, 0);

            shadowOffset = imageWidth * 0.006 * 0.75;
            mainCtx.shadowOffsetX = mainCtx.shadowOffsetY = shadowOffset;

            //Draw 1000ft pointer
            mainCtx.translate(centerX, centerY);
            mainCtx.rotate((value1000 - minValue) * angleStep1000ft - (value10000 - minValue) * angleStep10000ft);
            mainCtx.translate(-centerX, -centerY);
            mainCtx.drawImage(pointer1000Buffer, 0, 0);

            shadowOffset = imageWidth * 0.006;
            mainCtx.shadowOffsetX = mainCtx.shadowOffsetY = shadowOffset;

            //Draw 100ft pointer
            mainCtx.translate(centerX, centerY);
            mainCtx.rotate((value100 - minValue) * angleStep100ft - (value1000 - minValue) * angleStep1000ft);
            mainCtx.translate(-centerX, -centerY);
            mainCtx.drawImage(pointer100Buffer, 0, 0);
            mainCtx.restore();

            //Draw the foregound
            if (foregroundVisible) {
                mainCtx.drawImage(foregroundBuffer, 0, 0);
            }

            repainting = false;
        };

        // Visualize the component
        this.repaint();

        return this;
    };

    var trafficlight = function (canvas, parameters) {
        parameters = parameters || {};
        var width = (undefined === parameters.width ? 0 : parameters.width),
            height = (undefined === parameters.height ? 0 : parameters.height),
            //
            mainCtx = getCanvasContext(canvas),
            prefHeight, imageWidth, imageHeight,
            redOn = false,
            yellowOn = false,
            greenOn = false,
            initialized = false,
            housingBuffer = doc.createElement('canvas'),
            housingCtx = housingBuffer.getContext('2d'),
            lightGreenBuffer = doc.createElement('canvas'),
            lightGreenCtx = lightGreenBuffer.getContext('2d'),
            greenOnBuffer = doc.createElement('canvas'),
            greenOnCtx = greenOnBuffer.getContext('2d'),
            greenOffBuffer = doc.createElement('canvas'),
            greenOffCtx = greenOffBuffer.getContext('2d'),
            lightYellowBuffer = doc.createElement('canvas'),
            lightYellowCtx = lightYellowBuffer.getContext('2d'),
            yellowOnBuffer = doc.createElement('canvas'),
            yellowOnCtx = yellowOnBuffer.getContext('2d'),
            yellowOffBuffer = doc.createElement('canvas'),
            yellowOffCtx = yellowOffBuffer.getContext('2d'),
            lightRedBuffer = doc.createElement('canvas'),
            lightRedCtx = lightRedBuffer.getContext('2d'),
            redOnBuffer = doc.createElement('canvas'),
            redOnCtx = redOnBuffer.getContext('2d'),
            redOffBuffer = doc.createElement('canvas'),
            redOffCtx = redOffBuffer.getContext('2d');
            // End of variables

        // Has a size been specified?
        if (width === 0) {
            width = mainCtx.canvas.width;
        }
        if (height === 0) {
            height = mainCtx.canvas.height;
        }

        // Set the size - also clears the canvas
        mainCtx.canvas.width = width;
        mainCtx.canvas.height = height;

        prefHeight = width < (height * 0.352517) ? (width * 2.836734) : height;
        imageWidth = prefHeight * 0.352517;
        imageHeight = prefHeight;

        housingBuffer.width = imageWidth;
        housingBuffer.height = imageHeight;

        lightGreenBuffer.width = imageWidth;
        lightGreenBuffer.height = imageHeight;

        greenOnBuffer.width = imageWidth;
        greenOnBuffer.height = imageHeight;

        greenOffBuffer.width = imageWidth;
        greenOffBuffer.height = imageHeight;

        lightYellowBuffer.width = imageWidth;
        lightYellowBuffer.height = imageHeight;

        yellowOnBuffer.width = imageWidth;
        yellowOnBuffer.height = imageHeight;

        yellowOffBuffer.width = imageWidth;
        yellowOffBuffer.height = imageHeight;

        lightRedBuffer.width = imageWidth;
        lightRedBuffer.height = imageHeight;

        redOnBuffer.width = imageWidth;
        redOnBuffer.height = imageHeight;

        redOffBuffer.width = imageWidth;
        redOffBuffer.height = imageHeight;

        var drawHousing = function (ctx) {
            var housingFill, housingFrontFill;

            ctx.save();

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(0.107142 * imageWidth, 0);
            ctx.lineTo(imageWidth - 0.107142 * imageWidth, 0);
            ctx.quadraticCurveTo(imageWidth, 0, imageWidth, 0.107142 * imageWidth);
            ctx.lineTo(imageWidth, imageHeight - 0.107142 * imageWidth);
            ctx.quadraticCurveTo(imageWidth, imageHeight, imageWidth - 0.107142 * imageWidth, imageHeight);
            ctx.lineTo(0.107142 * imageWidth, imageHeight);
            ctx.quadraticCurveTo(0, imageHeight, 0, imageHeight - 0.107142 * imageWidth);
            ctx.lineTo(0, 0.107142 * imageWidth);
            ctx.quadraticCurveTo(0, 0, 0.107142 * imageWidth, imageHeight);
            ctx.closePath();
            housingFill = ctx.createLinearGradient(0.040816 * imageWidth, 0.007194 * imageHeight, 0.952101 * imageWidth, 0.995882 * imageHeight);
            housingFill.addColorStop(0, 'rgb(152, 152, 154)');
            housingFill.addColorStop(0.01, 'rgb(152, 152, 154)');
            housingFill.addColorStop(0.09, '#333333');
            housingFill.addColorStop(0.24, 'rgb(152, 152, 154)');
            housingFill.addColorStop(0.55, 'rgb(31, 31, 31)');
            housingFill.addColorStop(0.78, '#363636');
            housingFill.addColorStop(0.98, '#000000');
            housingFill.addColorStop(1, '#000000');
            ctx.fillStyle = housingFill;
            ctx.fill();
            ctx.restore();

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(0.030612 * imageWidth + 0.084183 * imageWidth, 0.010791 * imageHeight);
            ctx.lineTo(0.030612 * imageWidth + 0.938775 * imageWidth - 0.084183 * imageWidth, 0.010791 * imageHeight);
            ctx.quadraticCurveTo(0.030612 * imageWidth + 0.938775 * imageWidth, 0.010791 * imageHeight, 0.030612 * imageWidth + 0.938775 * imageWidth, 0.010791 * imageHeight + 0.084183 * imageWidth);
            ctx.lineTo(0.030612 * imageWidth + 0.938775 * imageWidth, 0.010791 * imageHeight + 0.978417 * imageHeight - 0.084183 * imageWidth);
            ctx.quadraticCurveTo(0.030612 * imageWidth + 0.938775 * imageWidth, 0.010791 * imageHeight + 0.978417 * imageHeight, 0.030612 * imageWidth + 0.938775 * imageWidth - 0.084183 * imageWidth, 0.010791 * imageHeight + 0.978417 * imageHeight);
            ctx.lineTo(0.030612 * imageWidth + 0.084183 * imageWidth, 0.010791 * imageHeight + 0.978417 * imageHeight);
            ctx.quadraticCurveTo(0.030612 * imageWidth, 0.010791 * imageHeight + 0.978417 * imageHeight, 0.030612 * imageWidth, 0.010791 * imageHeight + 0.978417 * imageHeight - 0.084183 * imageWidth);
            ctx.lineTo(0.030612 * imageWidth, 0.010791 * imageHeight + 0.084183 * imageWidth);
            ctx.quadraticCurveTo(0.030612 * imageWidth, 0.010791 * imageHeight, 0.030612 * imageWidth + 0.084183 * imageWidth, 0.010791 * imageHeight);
            ctx.closePath();
            housingFrontFill = ctx.createLinearGradient(-0.132653 * imageWidth, -0.053956 * imageHeight, 2.061408 * imageWidth, 0.667293 * imageHeight);
            housingFrontFill.addColorStop(0, '#000000');
            housingFrontFill.addColorStop(0.01, '#000000');
            housingFrontFill.addColorStop(0.16, '#373735');
            housingFrontFill.addColorStop(0.31, '#000000');
            housingFrontFill.addColorStop(0.44, '#303030');
            housingFrontFill.addColorStop(0.65, '#000000');
            housingFrontFill.addColorStop(0.87, '#363636');
            housingFrontFill.addColorStop(0.98, '#000000');
            housingFrontFill.addColorStop(1, '#000000');
            ctx.fillStyle = housingFrontFill;
            ctx.fill();
            ctx.restore();

            ctx.restore();
        };

        var drawLightGreen = function (ctx) {
            var lightGreenFrameFill, lightGreenInnerFill, lightGreenEffectFill, lightGreenInnerShadowFill;

            ctx.save();

            ctx.save();
            ctx.scale(1, 1);
            ctx.beginPath();
            ctx.arc(0.5 * imageWidth, 0.805755 * imageHeight, 0.397959 * imageWidth, 0, TWO_PI, false);
            lightGreenFrameFill = ctx.createLinearGradient(0, 0.665467 * imageHeight, 0, 0.946043 * imageHeight);
            lightGreenFrameFill.addColorStop(0, '#ffffff');
            lightGreenFrameFill.addColorStop(0.05, 'rgb(204, 204, 204)');
            lightGreenFrameFill.addColorStop(0.1, 'rgb(153, 153, 153)');
            lightGreenFrameFill.addColorStop(0.17, '#666666');
            lightGreenFrameFill.addColorStop(0.27, '#333333');
            lightGreenFrameFill.addColorStop(1, '#010101');
            ctx.fillStyle = lightGreenFrameFill;
            ctx.fill();
            ctx.restore();

            ctx.save();
            ctx.scale(1.083333, 1);
            ctx.beginPath();
            ctx.arc(0.461538 * imageWidth, 0.816546 * imageHeight, 0.367346 * imageWidth, 0, TWO_PI, false);
            lightGreenInnerFill = ctx.createLinearGradient(0, 0.687050 * imageHeight, 0, 0.946043 * imageHeight);
            lightGreenInnerFill.addColorStop(0, '#000000');
            lightGreenInnerFill.addColorStop(0.35, '#040404');
            lightGreenInnerFill.addColorStop(0.66, '#000000');
            lightGreenInnerFill.addColorStop(1, '#010101');
            ctx.fillStyle = lightGreenInnerFill;
            ctx.fill();
            ctx.restore();

            ctx.save();
            ctx.scale(1, 1);
            ctx.beginPath();
            ctx.arc(0.5 * imageWidth, 0.809352 * imageHeight, 0.357142 * imageWidth, 0, TWO_PI, false);
            lightGreenEffectFill = ctx.createRadialGradient(0.5 * imageWidth, 0.809352 * imageHeight, 0, 0.5 * imageWidth, 0.809352 * imageHeight, 0.362244 * imageWidth);
            lightGreenEffectFill.addColorStop(0, '#000000');
            lightGreenEffectFill.addColorStop(0.88, '#000000');
            lightGreenEffectFill.addColorStop(0.95, 'rgb(94, 94, 94)');
            lightGreenEffectFill.addColorStop(1, '#010101');
            ctx.fillStyle = lightGreenEffectFill;
            ctx.fill();
            ctx.restore();

            ctx.save();
            ctx.scale(1, 1);
            ctx.beginPath();
            ctx.arc(0.5 * imageWidth, 0.809352 * imageHeight, 0.357142 * imageWidth, 0, TWO_PI, false);
            lightGreenInnerShadowFill = ctx.createLinearGradient(0, 0.687050 * imageHeight, 0, 0.917266 * imageHeight);
            lightGreenInnerShadowFill.addColorStop(0, '#000000');
            lightGreenInnerShadowFill.addColorStop(1, 'rgba(1, 1, 1, 0)');
            ctx.fillStyle = lightGreenInnerShadowFill;
            ctx.fill();
            ctx.restore();
            ctx.restore();
        };

        var drawGreenOn = function (ctx) {
            var greenOnFill, greenOnGlowFill;

            ctx.save();

            ctx.save();
            ctx.scale(1, 1);
            ctx.beginPath();
            ctx.arc(0.5 * imageWidth, 0.809352 * imageHeight, 0.326530 * imageWidth, 0, TWO_PI, false);
            greenOnFill = ctx.createRadialGradient(0.5 * imageWidth, 0.809352 * imageHeight, 0, 0.5 * imageWidth, 0.809352 * imageHeight, 0.326530 * imageWidth);
            greenOnFill.addColorStop(0, 'rgb(85, 185, 123)');
            greenOnFill.addColorStop(1, 'rgb(0, 31, 0)');
            ctx.fillStyle = greenOnFill;
            ctx.fill();
            ctx.restore();

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(0, 0.812949 * imageHeight);
            ctx.bezierCurveTo(0, 0.910071 * imageHeight, 0.224489 * imageWidth, 0.989208 * imageHeight, 0.5 * imageWidth, 0.989208 * imageHeight);
            ctx.bezierCurveTo(0.775510 * imageWidth, 0.989208 * imageHeight, imageWidth, 0.910071 * imageHeight, imageWidth, 0.809352 * imageHeight);
            ctx.bezierCurveTo(0.908163 * imageWidth, 0.751798 * imageHeight, 0.704081 * imageWidth, 0.687050 * imageHeight, 0.5 * imageWidth, 0.687050 * imageHeight);
            ctx.bezierCurveTo(0.285714 * imageWidth, 0.687050 * imageHeight, 0.081632 * imageWidth, 0.751798 * imageHeight, 0, 0.812949 * imageHeight);
            ctx.closePath();
            greenOnGlowFill = ctx.createRadialGradient(0.5 * imageWidth, 0.809352 * imageHeight, 0, 0.5 * imageWidth, 0.809352 * imageHeight, 0.515306 * imageWidth);
            greenOnGlowFill.addColorStop(0, 'rgb(65, 187, 126)');
            greenOnGlowFill.addColorStop(1, 'rgba(4, 37, 8, 0)');
            ctx.fillStyle = greenOnGlowFill;
            ctx.fill();
            ctx.restore();
            ctx.restore();
        };

        var drawGreenOff = function (ctx) {
            var greenOffFill, greenOffInnerShadowFill;

            ctx.save();

            ctx.save();
            ctx.scale(1, 1);
            ctx.beginPath();
            ctx.arc(0.5 * imageWidth, 0.809352 * imageHeight, 0.326530 * imageWidth, 0, TWO_PI, false);
            greenOffFill = ctx.createRadialGradient(0.5 * imageWidth, 0.809352 * imageHeight, 0, 0.5 * imageWidth, 0.809352 * imageHeight, 0.326530 * imageWidth);
            greenOffFill.addColorStop(0, 'rgba(0, 255, 0, 0.25)');
            greenOffFill.addColorStop(1, 'rgba(0, 255, 0, 0.05)');
            ctx.fillStyle = greenOffFill;
            ctx.fill();
            ctx.restore();

            ctx.save();
            ctx.scale(1, 1);
            ctx.beginPath();
            ctx.arc(0.5 * imageWidth, 0.809352 * imageHeight, 0.326530 * imageWidth, 0, TWO_PI, false);
            greenOffInnerShadowFill = ctx.createRadialGradient(0.5 * imageWidth, 0.809352 * imageHeight, 0, 0.5 * imageWidth, 0.809352 * imageHeight, 0.326530 * imageWidth);
            greenOffInnerShadowFill.addColorStop(0, 'rgba(1, 1, 1, 0)');
            greenOffInnerShadowFill.addColorStop(0.55, 'rgba(0, 0, 0, 0)');
            greenOffInnerShadowFill.addColorStop(0.5501, 'rgba(0, 0, 0, 0)');
            greenOffInnerShadowFill.addColorStop(0.78, 'rgba(0, 0, 0, 0.12)');
            greenOffInnerShadowFill.addColorStop(0.79, 'rgba(0, 0, 0, 0.12)');
            greenOffInnerShadowFill.addColorStop(1, 'rgba(0, 0, 0, 0.5)');
            ctx.fillStyle = greenOffInnerShadowFill;
            ctx.fill();
            ctx.restore();

            ctx.fillStyle = ctx.createPattern(hatchBuffer, 'repeat');
            ctx.fill();

            ctx.restore();
        };

        var drawLightYellow = function (ctx) {
            var lightYellowFrameFill, lightYellowInnerFill, lightYellowEffectFill, lightYellowInnerShadowFill;

            ctx.save();

            ctx.save();
            ctx.scale(1, 1);
            ctx.beginPath();
            ctx.arc(0.5 * imageWidth, 0.496402 * imageHeight, 0.397959 * imageWidth, 0, TWO_PI, false);
            lightYellowFrameFill = ctx.createLinearGradient(0, 0.356115 * imageHeight, 0, 0.636690 * imageHeight);
            lightYellowFrameFill.addColorStop(0, '#ffffff');
            lightYellowFrameFill.addColorStop(0.05, 'rgb(204, 204, 204)');
            lightYellowFrameFill.addColorStop(0.1, 'rgb(153, 153, 153)');
            lightYellowFrameFill.addColorStop(0.17, '#666666');
            lightYellowFrameFill.addColorStop(0.27, '#333333');
            lightYellowFrameFill.addColorStop(1, '#010101');
            ctx.fillStyle = lightYellowFrameFill;
            ctx.fill();
            ctx.restore();

            ctx.save();
            ctx.scale(1.083333, 1);
            ctx.beginPath();
            ctx.arc(0.461538 * imageWidth, 0.507194 * imageHeight, 0.367346 * imageWidth, 0, TWO_PI, false);
            lightYellowInnerFill = ctx.createLinearGradient(0, 0.377697 * imageHeight, 0, 0.636690 * imageHeight);
            lightYellowInnerFill.addColorStop(0, '#000000');
            lightYellowInnerFill.addColorStop(0.35, '#040404');
            lightYellowInnerFill.addColorStop(0.66, '#000000');
            lightYellowInnerFill.addColorStop(1, '#010101');
            ctx.fillStyle = lightYellowInnerFill;
            ctx.fill();
            ctx.restore();

            ctx.save();
            ctx.scale(1, 1);
            ctx.beginPath();
            ctx.arc(0.5 * imageWidth, 0.5 * imageHeight, 0.357142 * imageWidth, 0, TWO_PI, false);
            lightYellowEffectFill = ctx.createRadialGradient(0.5 * imageWidth, 0.5 * imageHeight, 0, 0.5 * imageWidth, 0.5 * imageHeight, 0.362244 * imageWidth);
            lightYellowEffectFill.addColorStop(0, '#000000');
            lightYellowEffectFill.addColorStop(0.88, '#000000');
            lightYellowEffectFill.addColorStop(0.95, '#5e5e5e');
            lightYellowEffectFill.addColorStop(1, '#010101');
            ctx.fillStyle = lightYellowEffectFill;
            ctx.fill();
            ctx.restore();

            //lIGHT_YELLOW_4_E_INNER_SHADOW_3_4
            ctx.save();
            ctx.scale(1, 1);
            ctx.beginPath();
            ctx.arc(0.5 * imageWidth, 0.5 * imageHeight, 0.357142 * imageWidth, 0, TWO_PI, false);
            lightYellowInnerShadowFill = ctx.createLinearGradient(0, 0.377697 * imageHeight, 0, 0.607913 * imageHeight);
            lightYellowInnerShadowFill.addColorStop(0, '#000000');
            lightYellowInnerShadowFill.addColorStop(1, 'rgba(1, 1, 1, 0)');
            ctx.fillStyle = lightYellowInnerShadowFill;
            ctx.fill();
            ctx.restore();
            ctx.restore();
        };

        var drawYellowOn = function (ctx) {
            var yellowOnFill, yellowOnGlowFill;

            ctx.save();

            ctx.save();
            ctx.scale(1, 1);
            ctx.beginPath();
            ctx.arc(0.5 * imageWidth, 0.5 * imageHeight, 0.326530 * imageWidth, 0, TWO_PI, false);
            yellowOnFill = ctx.createRadialGradient(0.5 * imageWidth, 0.5 * imageHeight, 0, 0.5 * imageWidth, 0.5 * imageHeight, 0.326530 * imageWidth);
            yellowOnFill.addColorStop(0, '#fed434');
            yellowOnFill.addColorStop(1, '#82330c');
            ctx.fillStyle = yellowOnFill;
            ctx.fill();
            ctx.restore();

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(0, 0.503597 * imageHeight);
            ctx.bezierCurveTo(0, 0.600719 * imageHeight, 0.224489 * imageWidth, 0.679856 * imageHeight, 0.5 * imageWidth, 0.679856 * imageHeight);
            ctx.bezierCurveTo(0.775510 * imageWidth, 0.679856 * imageHeight, imageWidth, 0.600719 * imageHeight, imageWidth, 0.5 * imageHeight);
            ctx.bezierCurveTo(0.908163 * imageWidth, 0.442446 * imageHeight, 0.704081 * imageWidth, 0.377697 * imageHeight, 0.5 * imageWidth, 0.377697 * imageHeight);
            ctx.bezierCurveTo(0.285714 * imageWidth, 0.377697 * imageHeight, 0.081632 * imageWidth, 0.442446 * imageHeight, 0, 0.503597 * imageHeight);
            ctx.closePath();
            yellowOnGlowFill = ctx.createRadialGradient(0.5 * imageWidth, 0.5 * imageHeight, 0, 0.5 * imageWidth, 0.5 * imageHeight, 0.515306 * imageWidth);
            yellowOnGlowFill.addColorStop(0, '#fed434');
            yellowOnGlowFill.addColorStop(1, 'rgba(130, 51, 12, 0)');
            ctx.fillStyle = yellowOnGlowFill;
            ctx.fill();
            ctx.restore();
            ctx.restore();
        };

        var drawYellowOff = function (ctx) {
            var yellowOffFill, yellowOffInnerShadowFill;

            ctx.save();

            ctx.save();
            ctx.scale(1, 1);
            ctx.beginPath();
            ctx.arc(0.5 * imageWidth, 0.5 * imageHeight, 0.326530 * imageWidth, 0, TWO_PI, false);
            yellowOffFill = ctx.createRadialGradient(0.5 * imageWidth, 0.5 * imageHeight, 0, 0.5 * imageWidth, 0.5 * imageHeight, 0.326530 * imageWidth);
            yellowOffFill.addColorStop(0, 'rgba(255, 255, 0, 0.25)');
            yellowOffFill.addColorStop(1, 'rgba(255, 255, 0, 0.05)');
            ctx.fillStyle = yellowOffFill;
            ctx.fill();
            ctx.restore();

            ctx.save();
            ctx.scale(1, 1);
            ctx.beginPath();
            ctx.arc(0.5 * imageWidth, 0.5 * imageHeight, 0.326530 * imageWidth, 0, TWO_PI, false);
            yellowOffInnerShadowFill = ctx.createRadialGradient(0.5 * imageWidth, 0.5 * imageHeight, 0, 0.5 * imageWidth, 0.5 * imageHeight, 0.326530 * imageWidth);
            yellowOffInnerShadowFill.addColorStop(0, 'rgba(1, 1, 1, 0)');
            yellowOffInnerShadowFill.addColorStop(0.55, 'rgba(0, 0, 0, 0)');
            yellowOffInnerShadowFill.addColorStop(0.5501, 'rgba(0, 0, 0, 0)');
            yellowOffInnerShadowFill.addColorStop(0.78, 'rgba(0, 0, 0, 0.12)');
            yellowOffInnerShadowFill.addColorStop(0.79, 'rgba(0, 0, 0, 0.13)');
            yellowOffInnerShadowFill.addColorStop(1, 'rgba(0, 0, 0, 0.5)');
            ctx.fillStyle = yellowOffInnerShadowFill;
            ctx.fill();
            ctx.restore();

            ctx.fillStyle = ctx.createPattern(hatchBuffer, 'repeat');
            ctx.fill();

            ctx.restore();
        };

        var drawLightRed = function (ctx) {
            var lightRedFrameFill, lightRedInnerFill, lightRedEffectFill, lightRedInnerShadowFill;

            ctx.save();

            //lIGHT_RED_7_E_FRAME_0_1
            ctx.save();
            ctx.scale(1, 1);
            ctx.beginPath();
            ctx.arc(0.5 * imageWidth, 0.187050 * imageHeight, 0.397959 * imageWidth, 0, TWO_PI, false);
            lightRedFrameFill = ctx.createLinearGradient((0.5 * imageWidth), (0.046762 * imageHeight), ((0.500000) * imageWidth), ((0.327338) * imageHeight));
            lightRedFrameFill.addColorStop(0, '#ffffff');
            lightRedFrameFill.addColorStop(0.05, '#cccccc');
            lightRedFrameFill.addColorStop(0.1, '#999999');
            lightRedFrameFill.addColorStop(0.17, '#666666');
            lightRedFrameFill.addColorStop(0.27, '#333333');
            lightRedFrameFill.addColorStop(1, '#010101');
            ctx.fillStyle = lightRedFrameFill;
            ctx.fill();
            ctx.restore();

            //lIGHT_RED_7_E_INNER_CLIP_1_2
            ctx.save();
            ctx.scale(1.083333, 1);
            ctx.beginPath();
            ctx.arc(0.461538 * imageWidth, 0.197841 * imageHeight, 0.367346 * imageWidth, 0, TWO_PI, false);
            lightRedInnerFill = ctx.createLinearGradient((0.5 * imageWidth), (0.068345 * imageHeight), ((0.500000) * imageWidth), ((0.327338) * imageHeight));
            lightRedInnerFill.addColorStop(0, '#000000');
            lightRedInnerFill.addColorStop(0.35, '#040404');
            lightRedInnerFill.addColorStop(0.66, '#000000');
            lightRedInnerFill.addColorStop(1, '#010101');
            ctx.fillStyle = lightRedInnerFill;
            ctx.fill();
            ctx.restore();

            //lIGHT_RED_7_E_LIGHT_EFFECT_2_3
            ctx.save();
            ctx.scale(1, 1);
            ctx.beginPath();
            ctx.arc(0.5 * imageWidth, 0.190647 * imageHeight, 0.357142 * imageWidth, 0, TWO_PI, false);
            lightRedEffectFill = ctx.createRadialGradient((0.5) * imageWidth, ((0.190647) * imageHeight), 0, ((0.5) * imageWidth), ((0.190647) * imageHeight), 0.362244 * imageWidth);
            lightRedEffectFill.addColorStop(0, '#000000');
            lightRedEffectFill.addColorStop(0.88, '#000000');
            lightRedEffectFill.addColorStop(0.95, '#5e5e5e');
            lightRedEffectFill.addColorStop(1, '#010101');
            ctx.fillStyle = lightRedEffectFill;
            ctx.fill();
            ctx.restore();

            //lIGHT_RED_7_E_INNER_SHADOW_3_4
            ctx.save();
            ctx.scale(1, 1);
            ctx.beginPath();
            ctx.arc(0.5 * imageWidth, 0.190647 * imageHeight, 0.357142 * imageWidth, 0, TWO_PI, false);
            lightRedInnerShadowFill = ctx.createLinearGradient((0.5 * imageWidth), (0.068345 * imageHeight), ((0.500000) * imageWidth), ((0.298561) * imageHeight));
            lightRedInnerShadowFill.addColorStop(0, '#000000');
            lightRedInnerShadowFill.addColorStop(1, 'rgba(1, 1, 1, 0)');
            ctx.fillStyle = lightRedInnerShadowFill;
            ctx.fill();
            ctx.restore();
            ctx.restore();
        };

        var drawRedOn = function (ctx) {
            var redOnFill, redOnGlowFill;

            ctx.save();

            ctx.save();
            ctx.scale(1, 1);
            ctx.beginPath();
            ctx.arc(0.5 * imageWidth, 0.190647 * imageHeight, 0.326530 * imageWidth, 0, TWO_PI, false);
            redOnFill = ctx.createRadialGradient(0.5 * imageWidth, 0.190647 * imageHeight, 0, 0.5 * imageWidth, 0.190647 * imageHeight, 0.326530 * imageWidth);
            redOnFill.addColorStop(0, '#ff0000');
            redOnFill.addColorStop(1, '#410004');
            ctx.fillStyle = redOnFill;
            ctx.fill();
            ctx.restore();

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(0, 0.194244 * imageHeight);
            ctx.bezierCurveTo(0, 0.291366 * imageHeight, 0.224489 * imageWidth, 0.370503 * imageHeight, 0.5 * imageWidth, 0.370503 * imageHeight);
            ctx.bezierCurveTo(0.775510 * imageWidth, 0.370503 * imageHeight, imageWidth, 0.291366 * imageHeight, imageWidth, 0.190647 * imageHeight);
            ctx.bezierCurveTo(0.908163 * imageWidth, 0.133093 * imageHeight, 0.704081 * imageWidth, 0.068345 * imageHeight, 0.5 * imageWidth, 0.068345 * imageHeight);
            ctx.bezierCurveTo(0.285714 * imageWidth, 0.068345 * imageHeight, 0.081632 * imageWidth, 0.133093 * imageHeight, 0, 0.194244 * imageHeight);
            ctx.closePath();
            redOnGlowFill = ctx.createRadialGradient(0.5 * imageWidth, 0.190647 * imageHeight, 0, 0.5 * imageWidth, 0.190647 * imageHeight, 0.515306 * imageWidth);
            redOnGlowFill.addColorStop(0, '#ff0000');
            redOnGlowFill.addColorStop(1, 'rgba(118, 5, 1, 0)');
            ctx.fillStyle = redOnGlowFill;
            ctx.fill();
            ctx.restore();

            ctx.restore();
        };

        var drawRedOff = function (ctx) {
            var redOffFill, redOffInnerShadowFill;

            ctx.save();

            ctx.save();
            ctx.scale(1, 1);
            ctx.beginPath();
            ctx.arc(0.5 * imageWidth, 0.190647 * imageHeight, 0.326530 * imageWidth, 0, TWO_PI, false);
            redOffFill = ctx.createRadialGradient(0.5 * imageWidth, 0.190647 * imageHeight, 0, 0.5 * imageWidth, 0.190647 * imageHeight, 0.326530 * imageWidth);
            redOffFill.addColorStop(0, 'rgba(255, 0, 0, 0.25)');
            redOffFill.addColorStop(1, 'rgba(255, 0, 0, 0.05)');
            ctx.fillStyle = redOffFill;
            ctx.fill();
            ctx.restore();

            ctx.save();
            ctx.scale(1, 1);
            ctx.beginPath();
            ctx.arc(0.5 * imageWidth, 0.190647 * imageHeight, 0.326530 * imageWidth, 0, TWO_PI, false);
            redOffInnerShadowFill = ctx.createRadialGradient(0.5 * imageWidth, 0.190647 * imageHeight, 0, 0.5 * imageWidth, 0.190647 * imageHeight, 0.326530 * imageWidth);
            redOffInnerShadowFill.addColorStop(0, 'rgba(1, 1, 1, 0)');
            redOffInnerShadowFill.addColorStop(0.55, 'rgba(0, 0, 0, 0)');
            redOffInnerShadowFill.addColorStop(0.5501, 'rgba(0, 0, 0, 0)');
            redOffInnerShadowFill.addColorStop(0.78, 'rgba(0, 0, 0, 0.12)');
            redOffInnerShadowFill.addColorStop(0.79, 'rgba(0, 0, 0, 0.13)');
            redOffInnerShadowFill.addColorStop(1, 'rgba(0, 0, 0, 0.5)');
            ctx.fillStyle = redOffInnerShadowFill;
            ctx.fill();
            ctx.restore();

            ctx.fillStyle = ctx.createPattern(hatchBuffer, 'repeat');
            ctx.fill();

            ctx.restore();
        };

        function drawToBuffer(width, height, drawFunction) {
            var buffer = doc.createElement('canvas');
            buffer.width = width;
            buffer.height = height;
            drawFunction(buffer.getContext('2d'));
            return buffer;
        }

        var hatchBuffer = drawToBuffer(2, 2, function (ctx) {
            ctx.save();
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.beginPath();
            ctx.lineTo(0, 0, 1, 0);
            ctx.lineTo(0, 1, 0, 1);
            ctx.stroke();
            ctx.restore();
        });

        var init = function () {
            initialized = true;

            drawHousing(housingCtx);
            drawLightGreen(lightGreenCtx);
            drawGreenOn(greenOnCtx);
            drawGreenOff(greenOffCtx);
            drawLightYellow(lightYellowCtx);
            drawYellowOn(yellowOnCtx);
            drawYellowOff(yellowOffCtx);
            drawLightRed(lightRedCtx);
            drawRedOn(redOnCtx);
            drawRedOff(redOffCtx);
        };

        // **************   P U B L I C   M E T H O D S   ********************************
        this.setRedOn = function (on) {
            redOn = !!on;
            this.repaint();
        };

        this.isRedOn = function () {
            return redOn;
        };

        this.setYellowOn = function (on) {
            yellowOn = !!on;
            this.repaint();
        };

        this.isYellowOn = function () {
            return yellowOn;
        };

        this.setGreenOn = function (on) {
            greenOn = !!on;
            this.repaint();
        };

        this.isGreenOn = function () {
            return greenOn;
        };

        this.repaint = function () {
            if (!initialized) {
                init();
            }

            mainCtx.save();
            mainCtx.clearRect(0, 0, mainCtx.canvas.width, mainCtx.canvas.height);

            // housing
            mainCtx.drawImage(housingBuffer, 0, 0);

            // Green light
            mainCtx.drawImage(lightGreenBuffer, 0, 0);

            if (greenOn) {
                mainCtx.drawImage(greenOnBuffer, 0, 0);
            }

            mainCtx.drawImage(greenOffBuffer, 0, 0);

            // Yellow light
            mainCtx.drawImage(lightYellowBuffer, 0, 0);

            if (yellowOn) {
                mainCtx.drawImage(yellowOnBuffer, 0, 0);
            }

            mainCtx.drawImage(yellowOffBuffer, 0, 0);

            // Red light
            mainCtx.drawImage(lightRedBuffer, 0, 0);

            if (redOn) {
                mainCtx.drawImage(redOnBuffer, 0, 0);
            }

            mainCtx.drawImage(redOffBuffer, 0, 0);
            mainCtx.restore();
        };

        // Visualize the component
        this.repaint();

        return this;
    };

    var lightbulb = function (canvas, parameters) {
        parameters = parameters || {};
        var mainCtx,
            // parameters
            width = (undefined === parameters.width ? 0 : parameters.width),
            height = (undefined === parameters.height ? 0 : parameters.height),
            glowColor = (undefined === parameters.glowColor ? '#ffff00' : parameters.glowColor),
            //
            size, imageWidth, imageHeight,
            initialized = false,
            lightOn = false,
            alpha = 1,
            offBuffer = doc.createElement('canvas'),
            offCtx = offBuffer.getContext('2d'),
            onBuffer = doc.createElement('canvas'),
            onCtx = onBuffer.getContext('2d'),
            bulbBuffer = doc.createElement('canvas'),
            bulbCtx = bulbBuffer.getContext('2d');
            // End of variables

        // Get the canvas context and clear it
        mainCtx = document.getElementById(canvas).getContext('2d');

        // Has a size been specified?
        if (width === 0) {
            width = mainCtx.canvas.width;
        }
        if (height === 0) {
            height = mainCtx.canvas.height;
        }

        // Get the size
        mainCtx.canvas.width = width;
        mainCtx.canvas.height = height;
        size = width < height ? width : height;
        imageWidth = size;
        imageHeight = size;

        function drawToBuffer(width, height, drawFunction) {
            var buffer = doc.createElement('canvas');
            buffer.width = width;
            buffer.height = height;
            drawFunction(buffer.getContext('2d'));
            return buffer;
        }

        var getColorValues = function (color) {
            var colorData,
                lookupBuffer = drawToBuffer(1, 1, function (ctx) {
                    ctx.fillStyle = color;
                    ctx.beginPath();
                    ctx.rect(0, 0, 1, 1);
                    ctx.fill();
                });

            colorData = lookupBuffer.getContext('2d').getImageData(0, 0, 2, 2).data;
            return [colorData[0], colorData[1], colorData[2]];
        };

        offBuffer.width = imageWidth;
        offBuffer.height = imageHeight;

        onBuffer.width = imageWidth;
        onBuffer.height = imageHeight;

        bulbBuffer.width = imageWidth;
        bulbBuffer.height = imageHeight;

        var drawOff = function (ctx) {
            var glassOffFill;

            ctx.save();

            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(0.289473 * imageWidth, 0.438596 * imageHeight);
            ctx.bezierCurveTo(0.289473 * imageWidth, 0.561403 * imageHeight, 0.385964 * imageWidth, 0.605263 * imageHeight, 0.385964 * imageWidth, 0.745614 * imageHeight);
            ctx.bezierCurveTo(0.385964 * imageWidth, 0.745614 * imageHeight, 0.587719 * imageWidth, 0.745614 * imageHeight, 0.587719 * imageWidth, 0.745614 * imageHeight);
            ctx.bezierCurveTo(0.587719 * imageWidth, 0.605263 * imageHeight, 0.692982 * imageWidth, 0.561403 * imageHeight, 0.692982 * imageWidth, 0.438596 * imageHeight);
            ctx.bezierCurveTo(0.692982 * imageWidth, 0.324561 * imageHeight, 0.605263 * imageWidth, 0.228070 * imageHeight, 0.5 * imageWidth, 0.228070 * imageHeight);
            ctx.bezierCurveTo(0.385964 * imageWidth, 0.228070 * imageHeight, 0.289473 * imageWidth, 0.324561 * imageHeight, 0.289473 * imageWidth, 0.438596 * imageHeight);
            ctx.closePath();
            glassOffFill = ctx.createLinearGradient(0, 0.289473 * imageHeight, 0, 0.701754 * imageHeight);
            glassOffFill.addColorStop(0, '#eeeeee');
            glassOffFill.addColorStop(0.99, '#999999');
            glassOffFill.addColorStop(1, '#999999');
            ctx.fillStyle = glassOffFill;
            ctx.fill();
            ctx.lineCap = 'butt';
            ctx.lineJoin = 'round';
            ctx.lineWidth = 0.008771 * imageWidth;
            ctx.strokeStyle = '#cccccc';
            ctx.stroke();
            ctx.restore();
            ctx.restore();
        };

        var drawOn = function (ctx) {
            var glassOnFill,
                data = getColorValues(glowColor),
                red = data[0],
                green = data[1],
                blue = data[2],
                hsl = rgbToHsl(red, green, blue);

            ctx.save();
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(0.289473 * imageWidth, 0.438596 * imageHeight);
            ctx.bezierCurveTo(0.289473 * imageWidth, 0.561403 * imageHeight, 0.385964 * imageWidth, 0.605263 * imageHeight, 0.385964 * imageWidth, 0.745614 * imageHeight);
            ctx.bezierCurveTo(0.385964 * imageWidth, 0.745614 * imageHeight, 0.587719 * imageWidth, 0.745614 * imageHeight, 0.587719 * imageWidth, 0.745614 * imageHeight);
            ctx.bezierCurveTo(0.587719 * imageWidth, 0.605263 * imageHeight, 0.692982 * imageWidth, 0.561403 * imageHeight, 0.692982 * imageWidth, 0.438596 * imageHeight);
            ctx.bezierCurveTo(0.692982 * imageWidth, 0.324561 * imageHeight, 0.605263 * imageWidth, 0.228070 * imageHeight, 0.5 * imageWidth, 0.228070 * imageHeight);
            ctx.bezierCurveTo(0.385964 * imageWidth, 0.228070 * imageHeight, 0.289473 * imageWidth, 0.324561 * imageHeight, 0.289473 * imageWidth, 0.438596 * imageHeight);
            ctx.closePath();

            glassOnFill = ctx.createLinearGradient(0, 0.289473 * imageHeight, 0, 0.701754 * imageHeight);

            if (red === green && green === blue) {
                glassOnFill.addColorStop(0, 'hsl(0, 60%, 0%)');
                glassOnFill.addColorStop(1, 'hsl(0, 40%, 0%)');
            } else {
                glassOnFill.addColorStop(0, 'hsl(' + hsl[0] * 255 + ', ' + hsl[1] * 100 + '%, 70%)');
                glassOnFill.addColorStop(1, 'hsl(' + hsl[0] * 255 + ', ' + hsl[1] * 100 + '%, 80%)');
            }
            ctx.fillStyle = glassOnFill;

            // sets shadow properties
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 30;
            ctx.shadowColor = glowColor;

            ctx.fill();

            ctx.lineCap = 'butt';
            ctx.lineJoin = 'round';
            ctx.lineWidth = 0.008771 * imageWidth;
            ctx.strokeStyle = 'rgba(' + red + ', ' + green + ', ' + blue + ', 0.4)';
            ctx.stroke();

            ctx.restore();

            ctx.restore();
        };

        var drawBulb = function (ctx) {
            var highlight, winding, winding1, contactPlate;

            ctx.save();

            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(0.350877 * imageWidth, 0.333333 * imageHeight);
            ctx.bezierCurveTo(0.350877 * imageWidth, 0.280701 * imageHeight, 0.412280 * imageWidth, 0.236842 * imageHeight, 0.5 * imageWidth, 0.236842 * imageHeight);
            ctx.bezierCurveTo(0.578947 * imageWidth, 0.236842 * imageHeight, 0.640350 * imageWidth, 0.280701 * imageHeight, 0.640350 * imageWidth, 0.333333 * imageHeight);
            ctx.bezierCurveTo(0.640350 * imageWidth, 0.385964 * imageHeight, 0.578947 * imageWidth, 0.429824 * imageHeight, 0.5 * imageWidth, 0.429824 * imageHeight);
            ctx.bezierCurveTo(0.412280 * imageWidth, 0.429824 * imageHeight, 0.350877 * imageWidth, 0.385964 * imageHeight, 0.350877 * imageWidth, 0.333333 * imageHeight);
            ctx.closePath();
            highlight = ctx.createLinearGradient(0, 0.245614 * imageHeight, 0, 0.429824 * imageHeight);
            highlight.addColorStop(0, '#ffffff');
            highlight.addColorStop(0.99, 'rgba(255, 255, 255, 0)');
            highlight.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = highlight;
            ctx.fill();
            ctx.restore();

            //winding
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(0.377192 * imageWidth, 0.745614 * imageHeight);
            ctx.bezierCurveTo(0.377192 * imageWidth, 0.745614 * imageHeight, 0.429824 * imageWidth, 0.728070 * imageHeight, 0.491228 * imageWidth, 0.728070 * imageHeight);
            ctx.bezierCurveTo(0.561403 * imageWidth, 0.728070 * imageHeight, 0.605263 * imageWidth, 0.736842 * imageHeight, 0.605263 * imageWidth, 0.736842 * imageHeight);
            ctx.lineTo(0.605263 * imageWidth, 0.763157 * imageHeight);
            ctx.lineTo(0.596491 * imageWidth, 0.780701 * imageHeight);
            ctx.lineTo(0.605263 * imageWidth, 0.798245 * imageHeight);
            ctx.lineTo(0.596491 * imageWidth, 0.815789 * imageHeight);
            ctx.lineTo(0.605263 * imageWidth, 0.833333 * imageHeight);
            ctx.lineTo(0.596491 * imageWidth, 0.850877 * imageHeight);
            ctx.lineTo(0.605263 * imageWidth, 0.868421 * imageHeight);
            ctx.lineTo(0.596491 * imageWidth, 0.885964 * imageHeight);
            ctx.lineTo(0.605263 * imageWidth, 0.894736 * imageHeight);
            ctx.bezierCurveTo(0.605263 * imageWidth, 0.894736 * imageHeight, 0.570175 * imageWidth, 0.956140 * imageHeight, 0.535087 * imageWidth, 0.991228 * imageHeight);
            ctx.bezierCurveTo(0.526315 * imageWidth, 0.991228 * imageHeight, 0.517543 * imageWidth, imageHeight, 0.5 * imageWidth, imageHeight);
            ctx.bezierCurveTo(0.482456 * imageWidth, imageHeight, 0.473684 * imageWidth, imageHeight, 0.464912 * imageWidth, 0.991228 * imageHeight);
            ctx.bezierCurveTo(0.421052 * imageWidth, 0.947368 * imageHeight, 0.394736 * imageWidth, 0.903508 * imageHeight, 0.394736 * imageWidth, 0.903508 * imageHeight);
            ctx.lineTo(0.394736 * imageWidth, 0.894736 * imageHeight);
            ctx.lineTo(0.385964 * imageWidth, 0.885964 * imageHeight);
            ctx.lineTo(0.394736 * imageWidth, 0.868421 * imageHeight);
            ctx.lineTo(0.385964 * imageWidth, 0.850877 * imageHeight);
            ctx.lineTo(0.394736 * imageWidth, 0.833333 * imageHeight);
            ctx.lineTo(0.385964 * imageWidth, 0.815789 * imageHeight);
            ctx.lineTo(0.394736 * imageWidth, 0.798245 * imageHeight);
            ctx.lineTo(0.377192 * imageWidth, 0.789473 * imageHeight);
            ctx.lineTo(0.394736 * imageWidth, 0.771929 * imageHeight);
            ctx.lineTo(0.377192 * imageWidth, 0.763157 * imageHeight);
            ctx.lineTo(0.377192 * imageWidth, 0.745614 * imageHeight);
            ctx.closePath();
            winding = ctx.createLinearGradient(0.473684 * imageWidth, 0.728070 * imageHeight, 0.484702 * imageWidth, 0.938307 * imageHeight);
            winding.addColorStop(0, '#333333');
            winding.addColorStop(0.04, '#d9dad6');
            winding.addColorStop(0.19, '#e4e5e0');
            winding.addColorStop(0.24, '#979996');
            winding.addColorStop(0.31, '#fbffff');
            winding.addColorStop(0.4, '#818584');
            winding.addColorStop(0.48, '#f5f7f4');
            winding.addColorStop(0.56, '#959794');
            winding.addColorStop(0.64, '#f2f2f0');
            winding.addColorStop(0.7, '#828783');
            winding.addColorStop(0.78, '#fcfcfc');
            winding.addColorStop(1, '#666666');
            ctx.fillStyle = winding;
            ctx.fill();
            ctx.restore();

            // winding
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(0.377192 * imageWidth, 0.745614 * imageHeight);
            ctx.bezierCurveTo(0.377192 * imageWidth, 0.745614 * imageHeight, 0.429824 * imageWidth, 0.728070 * imageHeight, 0.491228 * imageWidth, 0.728070 * imageHeight);
            ctx.bezierCurveTo(0.561403 * imageWidth, 0.728070 * imageHeight, 0.605263 * imageWidth, 0.736842 * imageHeight, 0.605263 * imageWidth, 0.736842 * imageHeight);
            ctx.lineTo(0.605263 * imageWidth, 0.763157 * imageHeight);
            ctx.lineTo(0.596491 * imageWidth, 0.780701 * imageHeight);
            ctx.lineTo(0.605263 * imageWidth, 0.798245 * imageHeight);
            ctx.lineTo(0.596491 * imageWidth, 0.815789 * imageHeight);
            ctx.lineTo(0.605263 * imageWidth, 0.833333 * imageHeight);
            ctx.lineTo(0.596491 * imageWidth, 0.850877 * imageHeight);
            ctx.lineTo(0.605263 * imageWidth, 0.868421 * imageHeight);
            ctx.lineTo(0.596491 * imageWidth, 0.885964 * imageHeight);
            ctx.lineTo(0.605263 * imageWidth, 0.894736 * imageHeight);
            ctx.bezierCurveTo(0.605263 * imageWidth, 0.894736 * imageHeight, 0.570175 * imageWidth, 0.956140 * imageHeight, 0.535087 * imageWidth, 0.991228 * imageHeight);
            ctx.bezierCurveTo(0.526315 * imageWidth, 0.991228 * imageHeight, 0.517543 * imageWidth, imageHeight, 0.5 * imageWidth, imageHeight);
            ctx.bezierCurveTo(0.482456 * imageWidth, imageHeight, 0.473684 * imageWidth, imageHeight, 0.464912 * imageWidth, 0.991228 * imageHeight);
            ctx.bezierCurveTo(0.421052 * imageWidth, 0.947368 * imageHeight, 0.394736 * imageWidth, 0.903508 * imageHeight, 0.394736 * imageWidth, 0.903508 * imageHeight);
            ctx.lineTo(0.394736 * imageWidth, 0.894736 * imageHeight);
            ctx.lineTo(0.385964 * imageWidth, 0.885964 * imageHeight);
            ctx.lineTo(0.394736 * imageWidth, 0.868421 * imageHeight);
            ctx.lineTo(0.385964 * imageWidth, 0.850877 * imageHeight);
            ctx.lineTo(0.394736 * imageWidth, 0.833333 * imageHeight);
            ctx.lineTo(0.385964 * imageWidth, 0.815789 * imageHeight);
            ctx.lineTo(0.394736 * imageWidth, 0.798245 * imageHeight);
            ctx.lineTo(0.377192 * imageWidth, 0.789473 * imageHeight);
            ctx.lineTo(0.394736 * imageWidth, 0.771929 * imageHeight);
            ctx.lineTo(0.377192 * imageWidth, 0.763157 * imageHeight);
            ctx.lineTo(0.377192 * imageWidth, 0.745614 * imageHeight);
            ctx.closePath();
            winding1 = ctx.createLinearGradient(0.377192 * imageWidth, 0.789473 * imageHeight, 0.605263 * imageWidth, 0.789473 * imageHeight);
            winding1.addColorStop(0, 'rgba(0, 0, 0, 0.4)');
            winding1.addColorStop(0.15, 'rgba(0, 0, 0, 0.32)');
            winding1.addColorStop(0.85, 'rgba(0, 0, 0, 0.33)');
            winding1.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
            ctx.fillStyle = winding1;
            ctx.fill();
            ctx.restore();

            // contact plate
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(0.421052 * imageWidth, 0.947368 * imageHeight);
            ctx.bezierCurveTo(0.438596 * imageWidth, 0.956140 * imageHeight, 0.447368 * imageWidth, 0.973684 * imageHeight, 0.464912 * imageWidth, 0.991228 * imageHeight);
            ctx.bezierCurveTo(0.473684 * imageWidth, imageHeight, 0.482456 * imageWidth, imageHeight, 0.5 * imageWidth, imageHeight);
            ctx.bezierCurveTo(0.517543 * imageWidth, imageHeight, 0.526315 * imageWidth, 0.991228 * imageHeight, 0.535087 * imageWidth, 0.991228 * imageHeight);
            ctx.bezierCurveTo(0.543859 * imageWidth, 0.982456 * imageHeight, 0.561403 * imageWidth, 0.956140 * imageHeight, 0.578947 * imageWidth, 0.947368 * imageHeight);
            ctx.bezierCurveTo(0.552631 * imageWidth, 0.938596 * imageHeight, 0.526315 * imageWidth, 0.938596 * imageHeight, 0.5 * imageWidth, 0.938596 * imageHeight);
            ctx.bezierCurveTo(0.473684 * imageWidth, 0.938596 * imageHeight, 0.447368 * imageWidth, 0.938596 * imageHeight, 0.421052 * imageWidth, 0.947368 * imageHeight);
            ctx.closePath();
            contactPlate = ctx.createLinearGradient(0, 0.938596 * imageHeight, 0, imageHeight);
            contactPlate.addColorStop(0, '#050a06');
            contactPlate.addColorStop(0.61, '#070602');
            contactPlate.addColorStop(0.71, '#999288');
            contactPlate.addColorStop(0.83, '#010101');
            contactPlate.addColorStop(1, '#000000');
            ctx.fillStyle = contactPlate;
            ctx.fill();
            ctx.restore();
            ctx.restore();
        };

        var clearCanvas = function (ctx) {
            // Store the current transformation matrix
            ctx.save();

            // Use the identity matrix while clearing the canvas
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            // Restore the transform
            ctx.restore();
        };

        var init = function () {
            initialized = true;
            drawOff(offCtx);
            drawOn(onCtx);
            drawBulb(bulbCtx);
        };

        // **************   P U B L I C   M E T H O D S   ********************************
        this.setOn = function (on) {
            lightOn = !!on;
            this.repaint();
            return this;
        };

        this.isOn = function () {
            return lightOn;
        };

        this.setAlpha = function (a) {
            alpha = a;
            this.repaint();
            return this;
        };

        this.getAlpha = function () {
            return alpha;
        };

        this.setGlowColor = function (color) {
            glowColor = color;
            init();
            this.repaint();
            return this;
        };

        this.getGlowColor = function () {
            return glowColor;
        };

        // Component visualization
        this.repaint = function () {
            if (!initialized) {
                init();
            }

            clearCanvas(mainCtx);

            mainCtx.save();

            mainCtx.drawImage(offBuffer, 0, 0);

            mainCtx.globalAlpha = alpha;
            if (lightOn) {
                mainCtx.drawImage(onBuffer, 0, 0);
            }
            mainCtx.globalAlpha = 1;
            mainCtx.drawImage(bulbBuffer, 0, 0);
            mainCtx.restore();
        };

        this.repaint();

        return this;
    };

    var odometer = function (canvas, parameters) {
        parameters = parameters || {};

        // parameters
        var _context = (undefined === parameters._context ? null : parameters._context),  // If component used internally by steelseries
            height = (undefined === parameters.height ? 0 : parameters.height),
            digits = (undefined === parameters.digits ? 6 : parameters.digits),
            decimals = (undefined === parameters.decimals ? 1 : parameters.decimals),
            decimalBackColor = (undefined === parameters.decimalBackColor ? '#F0F0F0' : parameters.decimalBackColor),
            decimalForeColor = (undefined === parameters.decimalForeColor ? '#F01010' : parameters.decimalForeColor),
            font = (undefined === parameters.font ? 'sans-serif' : parameters.font),
            value = (undefined === parameters.value ? 0 : parameters.value),
            valueBackColor = (undefined === parameters.valueBackColor ? '#050505' : parameters.valueBackColor),
            valueForeColor = (undefined === parameters.valueForeColor ? '#F8F8F8' : parameters.valueForeColor),
            wobbleFactor = (undefined === parameters.wobbleFactor ? 0.07 : parameters.wobbleFactor),
            //
            initialized = false,
            tween, ctx,
            repainting = false,
            digitHeight, digitWidth, stdFont,
            width, columnHeight, verticalSpace, zeroOffset,
            wobble = [],
            //buffers
            backgroundBuffer, backgroundContext,
            foregroundBuffer, foregroundContext,
            digitBuffer, digitContext,
            decimalBuffer, decimalContext;
            // End of variables

        // Get the canvas context and clear it
        if (_context) {
            ctx = _context;
        } else {
            ctx = getCanvasContext(canvas);
        }

        // Has a height been specified?
        if (height === 0) {
            height = ctx.canvas.height;
        }

        // Cannot display negative values yet
        if (value < 0) {
            value = 0;
        }

        digitHeight = Math.floor(height * 0.85);
        stdFont = '600 ' + digitHeight + 'px ' + font;

        digitWidth = Math.floor(height * 0.68);
        width = digitWidth * (digits + decimals);
        columnHeight = digitHeight * 11;
        verticalSpace = columnHeight / 12;
        zeroOffset = verticalSpace * 0.81;

        // Resize and clear the main context
        ctx.canvas.width = width;
        ctx.canvas.height = height;

        // Create buffers
        backgroundBuffer = createBuffer(width, height);
        backgroundContext = backgroundBuffer.getContext('2d');

        foregroundBuffer = createBuffer(width, height);
        foregroundContext = foregroundBuffer.getContext('2d');

        digitBuffer = createBuffer(digitWidth, columnHeight * 1.1);
        digitContext = digitBuffer.getContext('2d');

        decimalBuffer = createBuffer(digitWidth, columnHeight * 1.1);
        decimalContext = decimalBuffer.getContext('2d');

        function init() {
            var grad, i;

            initialized = true;

            // Create the foreground
            foregroundContext.rect(0, 0, width, height);
            grad = foregroundContext.createLinearGradient(0, 0, 0, height);
            grad.addColorStop(0, 'rgba(0, 0, 0, 1)');
            grad.addColorStop(0.1, 'rgba(0, 0, 0, 0.4)');
            grad.addColorStop(0.33, 'rgba(255, 255, 255, 0.45)');
            grad.addColorStop(0.46, 'rgba(255, 255, 255, 0)');
            grad.addColorStop(0.9, 'rgba(0, 0, 0, 0.4)');
            grad.addColorStop(1, 'rgba(0, 0, 0, 1)');
            foregroundContext.fillStyle = grad;
            foregroundContext.fill();

            // Create a digit column
            // background
            digitContext.rect(0, 0, digitWidth, columnHeight * 1.1);
            digitContext.fillStyle = valueBackColor;
            digitContext.fill();
            // edges
            digitContext.strokeStyle = '#f0f0f0';
            digitContext.lineWidth = '1px'; //height * 0.1 + 'px';
            digitContext.moveTo(0, 0);
            digitContext.lineTo(0, columnHeight * 1.1);
            digitContext.stroke();
            digitContext.strokeStyle = '#202020';
            digitContext.moveTo(digitWidth, 0);
            digitContext.lineTo(digitWidth, columnHeight * 1.1);
            digitContext.stroke();
            // numerals
            digitContext.textAlign = 'center';
            digitContext.textBaseline = 'middle';
            digitContext.font = stdFont;
            digitContext.fillStyle = valueForeColor;
            // put the digits 901234567890 vertically into the buffer
            for (i = 9; i < 21; i++) {
                digitContext.fillText(i % 10, digitWidth * 0.5, verticalSpace * (i - 9) + verticalSpace / 2);
            }

            // Create a decimal column
            if (decimals > 0) {
                // background
                decimalContext.rect(0, 0, digitWidth, columnHeight * 1.1);
                decimalContext.fillStyle = decimalBackColor;
                decimalContext.fill();
                // edges
                decimalContext.strokeStyle = '#f0f0f0';
                decimalContext.lineWidth = '1px'; //height * 0.1 + 'px';
                decimalContext.moveTo(0, 0);
                decimalContext.lineTo(0, columnHeight * 1.1);
                decimalContext.stroke();
                decimalContext.strokeStyle = '#202020';
                decimalContext.moveTo(digitWidth, 0);
                decimalContext.lineTo(digitWidth, columnHeight * 1.1);
                decimalContext.stroke();
                // numerals
                decimalContext.textAlign = 'center';
                decimalContext.textBaseline = 'middle';
                decimalContext.font = stdFont;
                decimalContext.fillStyle = decimalForeColor;
                // put the digits 901234567890 vertically into the buffer
                for (i = 9; i < 21; i++) {
                    decimalContext.fillText(i % 10, digitWidth * 0.5, verticalSpace * (i - 9) + verticalSpace / 2);
                }
            }
            // wobble factors
            for (i = 0; i < (digits + decimals); i++) {
                wobble[i] = Math.random() * wobbleFactor * height - wobbleFactor * height / 2;
            }

        }

        function drawDigits() {
            var pos = 1,
            val = value, i, num, numb, frac, prevNum;

            // do not use Math.pow() - rounding errors!
            for (i = 0; i < decimals; i++) {
                val *= 10;
            }

            numb = Math.floor(val);
            frac = val - numb;
            numb = String(numb);
            prevNum = 9;

            for (i = 0; i < decimals + digits; i++) {
                num = +numb.substring(numb.length - i - 1, numb.length - i) || 0;
                if (prevNum !== 9) {
                    frac = 0;
                }
                if (i < decimals) {
                    backgroundContext.drawImage(decimalBuffer, width - digitWidth * pos, -(verticalSpace * (num + frac) + zeroOffset + wobble[i]));
                } else {
                    backgroundContext.drawImage(digitBuffer, width - digitWidth * pos, -(verticalSpace * (num + frac) + zeroOffset + wobble[i]));
                }
                pos++;
                prevNum = num;
            }
        }

        this.setValueAnimated = function (newVal, callback) {
            var gauge = this;
            newVal = parseFloat(newVal);

            if (newVal < 0) {
                newVal = 0;
            }
            if (value !== newVal) {
                if (undefined !== tween && tween.isPlaying) {
                    tween.stop();
                }

                tween = new Tween({}, '', Tween.strongEaseOut, value, newVal, 2);
                tween.onMotionChanged = function (event) {
                    value = event.target._pos;
                    if (!repainting) {
                        repainting = true;
                        requestAnimFrame(gauge.repaint);
                    }
                };

                // do we have a callback function to process?
                if (callback && typeof(callback) === "function") {
                    tween.onMotionFinished = callback;
                }

                tween.start();
            }
            this.repaint();
            return this;
        };

        this.setValue = function (newVal) {
            value = parseFloat(newVal);
            if (value < 0) {
                value = 0;
            }
            this.repaint();
            return this;
        };

        this.getValue = function () {
            return value;
        };

        this.repaint = function () {
            if (!initialized) {
                init();
            }

            // draw digits
            drawDigits();

            // draw the foreground
            backgroundContext.drawImage(foregroundBuffer, 0, 0);

            // paint back to the main context
            ctx.drawImage(backgroundBuffer, 0, 0);

            repainting = false;
        };

        this.repaint();
    };

    //************************************  I M A G E   -   F U N C T I O N S  *****************************************

    var drawRoseImage = function (ctx, centerX, centerY, imageWidth, imageHeight, backgroundColor) {
        var fill = true,
            i, grad,
            symbolColor = backgroundColor.symbolColor.getRgbaColor();

        ctx.save();
        ctx.lineWidth = 1;
        ctx.fillStyle = symbolColor;
        ctx.strokeStyle = symbolColor;
        ctx.translate(centerX, centerY);
        // broken ring
        for (i = 0; i < 360; i += 15) {
            fill = !fill;

            ctx.beginPath();
            ctx.arc(0, 0, imageWidth * 0.26, i * RAD_FACTOR, (i + 15) * RAD_FACTOR, false);
            ctx.arc(0, 0, imageWidth * 0.23, (i + 15) * RAD_FACTOR, i * RAD_FACTOR, true);
            ctx.closePath();
            if (fill) {
                ctx.fill();
            }
            ctx.stroke();
        }

        ctx.translate(-centerX, -centerY);

/*
        // PATH1_2
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(imageWidth * 0.560747, imageHeight * 0.584112);
        ctx.lineTo(imageWidth * 0.640186, imageHeight * 0.644859);
        ctx.lineTo(imageWidth * 0.584112, imageHeight * 0.560747);
        ctx.lineTo(imageWidth * 0.560747, imageHeight * 0.584112);
        ctx.closePath();
        ctx.fillStyle = fillColorPath;
        ctx.fill();
        ctx.stroke();

        // PATH2_2
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(imageWidth * 0.411214, imageHeight * 0.560747);
        ctx.lineTo(imageWidth * 0.355140, imageHeight * 0.644859);
        ctx.lineTo(imageWidth * 0.439252, imageHeight * 0.588785);
        ctx.lineTo(imageWidth * 0.411214, imageHeight * 0.560747);
        ctx.closePath();
        ctx.fillStyle = fillColorPath;
        ctx.fill();
        ctx.stroke();

        // PATH3_2
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(imageWidth * 0.584112, imageHeight * 0.443925);
        ctx.lineTo(imageWidth * 0.640186, imageHeight * 0.359813);
        ctx.lineTo(imageWidth * 0.560747, imageHeight * 0.420560);
        ctx.lineTo(imageWidth * 0.584112, imageHeight * 0.443925);
        ctx.closePath();
        ctx.fillStyle = fillColorPath;
        ctx.fill();
        ctx.stroke();

        // PATH4_2
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(imageWidth * 0.439252, imageHeight * 0.415887);
        ctx.lineTo(imageWidth * 0.355140, imageHeight * 0.359813);
        ctx.lineTo(imageWidth * 0.415887, imageHeight * 0.439252);
        ctx.lineTo(imageWidth * 0.439252, imageHeight * 0.415887);
        ctx.closePath();
        ctx.fillStyle = fillColorPath;
        ctx.fill();
        ctx.stroke();

        // PATH5_2
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(imageWidth * 0.523364, imageHeight * 0.397196);
        ctx.lineTo(imageWidth * 0.5, imageHeight * 0.196261);
        ctx.lineTo(imageWidth * 0.471962, imageHeight * 0.397196);
        ctx.lineTo(imageWidth * 0.523364, imageHeight * 0.397196);
        ctx.closePath();
        var PATH5_2_GRADIENT = ctx.createLinearGradient(0.476635 * imageWidth, 0, 0.518691 * imageWidth, 0);
        PATH5_2_GRADIENT.addColorStop(0, 'rgb(222, 223, 218)');
        PATH5_2_GRADIENT.addColorStop(0.48, 'rgb(222, 223, 218)');
        PATH5_2_GRADIENT.addColorStop(0.49, backgroundColor.symbolColor.getRgbaColor());
        PATH5_2_GRADIENT.addColorStop(1, backgroundColor.symbolColor.getRgbaColor());
        ctx.fillStyle = PATH5_2_GRADIENT;
        ctx.fill();
        ctx.stroke();

        // PATH6_2
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(imageWidth * 0.471962, imageHeight * 0.607476);
        ctx.lineTo(imageWidth * 0.5, imageHeight * 0.813084);
        ctx.lineTo(imageWidth * 0.523364, imageHeight * 0.607476);
        ctx.lineTo(imageWidth * 0.471962, imageHeight * 0.607476);
        ctx.closePath();
        var PATH6_2_GRADIENT = ctx.createLinearGradient(0.518691 * imageWidth, 0, (0.518691 + -0.037383) * imageWidth, 0);
        PATH6_2_GRADIENT.addColorStop(0, 'rgb(222, 223, 218)');
        PATH6_2_GRADIENT.addColorStop(0.56, 'rgb(222, 223, 218)');
        PATH6_2_GRADIENT.addColorStop(0.5601, backgroundColor.symbolColor.getRgbaColor());
        PATH6_2_GRADIENT.addColorStop(1, backgroundColor.symbolColor.getRgbaColor());
        ctx.fillStyle = PATH6_2_GRADIENT;
        ctx.lineWidth = 1;
        ctx.lineCap = 'square';
        ctx.lineJoin = 'miter';
        ctx.strokeStyle = backgroundColor.symbolColor.getRgbaColor();
        ctx.fill();
        ctx.stroke();

        // PATH7_2
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(imageWidth * 0.602803, imageHeight * 0.528037);
        ctx.lineTo(imageWidth * 0.803738, imageHeight * 0.5);
        ctx.lineTo(imageWidth * 0.602803, imageHeight * 0.476635);
        ctx.lineTo(imageWidth * 0.602803, imageHeight * 0.528037);
        ctx.closePath();
        var PATH7_2_GRADIENT = ctx.createLinearGradient(0, 0.485981 * imageHeight, 0, 0.514018 * imageHeight);
        PATH7_2_GRADIENT.addColorStop(0, 'rgb(222, 223, 218)');
        PATH7_2_GRADIENT.addColorStop(0.48, 'rgb(222, 223, 218)');
        PATH7_2_GRADIENT.addColorStop(0.49, backgroundColor.symbolColor.getRgbaColor());
        PATH7_2_GRADIENT.addColorStop(1, backgroundColor.symbolColor.getRgbaColor());
        ctx.fillStyle = PATH7_2_GRADIENT;
        ctx.fill();
        ctx.stroke();

        // PATH8_2
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(imageWidth * 0.392523, imageHeight * 0.476635);
        ctx.lineTo(imageWidth * 0.191588, imageHeight * 0.5);
        ctx.lineTo(imageWidth * 0.392523, imageHeight * 0.528037);
        ctx.lineTo(imageWidth * 0.392523, imageHeight * 0.476635);
        ctx.closePath();
        var PATH8_2_GRADIENT = ctx.createLinearGradient(0, 0.528037 * imageHeight, 0, 0.485981 * imageHeight);
        PATH8_2_GRADIENT.addColorStop(0, 'rgb(222, 223, 218)');
        PATH8_2_GRADIENT.addColorStop(0.52, 'rgb(222, 223, 218)');
        PATH8_2_GRADIENT.addColorStop(0.53, backgroundColor.symbolColor.getRgbaColor());
        PATH8_2_GRADIENT.addColorStop(1, backgroundColor.symbolColor.getRgbaColor());
        ctx.fillStyle = PATH8_2_GRADIENT;
        ctx.fill();
        ctx.stroke();

        // PATH9_2
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(imageWidth * 0.406542, imageHeight * 0.504672);
        ctx.bezierCurveTo(imageWidth * 0.406542, imageHeight * 0.453271, imageWidth * 0.448598, imageHeight * 0.411214, imageWidth * 0.5, imageHeight * 0.411214);
        ctx.bezierCurveTo(imageWidth * 0.546728, imageHeight * 0.411214, imageWidth * 0.588785, imageHeight * 0.453271, imageWidth * 0.588785, imageHeight * 0.504672);
        ctx.bezierCurveTo(imageWidth * 0.588785, imageHeight * 0.551401, imageWidth * 0.546728, imageHeight * 0.593457, imageWidth * 0.5, imageHeight * 0.593457);
        ctx.bezierCurveTo(imageWidth * 0.448598, imageHeight * 0.593457, imageWidth * 0.406542, imageHeight * 0.551401, imageWidth * 0.406542, imageHeight * 0.504672);
        ctx.closePath();
        ctx.moveTo(imageWidth * 0.387850, imageHeight * 0.504672);
        ctx.bezierCurveTo(imageWidth * 0.387850, imageHeight * 0.560747, imageWidth * 0.439252, imageHeight * 0.612149, imageWidth * 0.5, imageHeight * 0.612149);
        ctx.bezierCurveTo(imageWidth * 0.556074, imageHeight * 0.612149, imageWidth * 0.607476, imageHeight * 0.560747, imageWidth * 0.607476, imageHeight * 0.504672);
        ctx.bezierCurveTo(imageWidth * 0.607476, imageHeight * 0.443925, imageWidth * 0.556074, imageHeight * 0.392523, imageWidth * 0.5, imageHeight * 0.392523);
        ctx.bezierCurveTo(imageWidth * 0.439252, imageHeight * 0.392523, imageWidth * 0.387850, imageHeight * 0.443925, imageWidth * 0.387850, imageHeight * 0.504672);
        ctx.closePath();
        ctx.fillStyle = fillColorPath;
        ctx.lineWidth = 1;
        ctx.lineCap = 'square';
        ctx.lineJoin = 'miter';
        ctx.strokeStyle = backgroundColor.symbolColor.getRgbaColor();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
*/
        // Replacement code, not quite the same but much smaller!

        for (i = 0; 360 >= i; i += 90) {
            // Small pointers
            ctx.beginPath();
            ctx.moveTo(imageWidth * 0.560747, imageHeight * 0.584112);
            ctx.lineTo(imageWidth * 0.640186, imageHeight * 0.644859);
            ctx.lineTo(imageWidth * 0.584112, imageHeight * 0.560747);
            ctx.lineTo(imageWidth * 0.560747, imageHeight * 0.584112);
            ctx.closePath();
            ctx.fillStyle = symbolColor;
            ctx.fill();
            ctx.stroke();
            // Large pointers
            ctx.beginPath();
            ctx.moveTo(imageWidth * 0.523364, imageHeight * 0.397196);
            ctx.lineTo(imageWidth * 0.5, imageHeight * 0.196261);
            ctx.lineTo(imageWidth * 0.471962, imageHeight * 0.397196);
            ctx.lineTo(imageWidth * 0.523364, imageHeight * 0.397196);
            ctx.closePath();
            grad = ctx.createLinearGradient(0.476635 * imageWidth, 0, 0.518691 * imageWidth, 0);
            grad.addColorStop(0, 'rgb(222, 223, 218)');
            grad.addColorStop(0.48, 'rgb(222, 223, 218)');
            grad.addColorStop(0.49, symbolColor);
            grad.addColorStop(1, symbolColor);
            ctx.fillStyle = grad;
            ctx.fill();
            ctx.stroke();
            ctx.translate(centerX, centerY);
            ctx.rotate(i * RAD_FACTOR);
            ctx.translate(-centerX, -centerY);
        }

        // Central ring
        ctx.beginPath();
        ctx.translate(centerX, centerY);
        ctx.arc(0, 0, imageWidth * 0.1, 0, TWO_PI, false);
        ctx.lineWidth = imageWidth * 0.022;
        ctx.stroke();
        ctx.translate(-centerX, -centerY);

        ctx.restore();

    };

    var drawPointerImage = function (ctx, size, ptrType, ptrColor, lblColor) {
        var ptrBuffer, ptrCtx,
            grad, radius,
            cacheKey = size.toString() + ptrType.type + ptrColor.light.getHexColor() + ptrColor.medium.getHexColor();

        // check if we have already created and cached this buffer, if not create it
        if (!drawPointerImage.cache[cacheKey]) {
            // create a pointer buffer
            ptrBuffer = createBuffer(size, size);
            ptrCtx = ptrBuffer.getContext('2d');

            switch (ptrType.type) {
            case 'type2':
                grad = ptrCtx.createLinearGradient(0, size * 0.471962, 0, size * 0.130841);
                grad.addColorStop(0, lblColor.getRgbaColor());
                grad.addColorStop(0.36, lblColor.getRgbaColor());
                grad.addColorStop(0.361, ptrColor.light.getRgbaColor());
                grad.addColorStop(1, ptrColor.light.getRgbaColor());
                ptrCtx.fillStyle = grad;
                ptrCtx.beginPath();
                ptrCtx.moveTo(size * 0.518691, size * 0.471962);
                ptrCtx.lineTo(size * 0.509345, size * 0.462616);
                ptrCtx.lineTo(size * 0.509345, size * 0.341121);
                ptrCtx.lineTo(size * 0.504672, size * 0.130841);
                ptrCtx.lineTo(size * 0.495327, size * 0.130841);
                ptrCtx.lineTo(size * 0.490654, size * 0.341121);
                ptrCtx.lineTo(size * 0.490654, size * 0.462616);
                ptrCtx.lineTo(size * 0.481308, size * 0.471962);
                ptrCtx.closePath();
                ptrCtx.fill();
                break;

            case 'type3':
                ptrCtx.beginPath();
                ptrCtx.rect(size * 0.495327, size * 0.130841, size * 0.009345, size * 0.373831);
                ptrCtx.closePath();
                ptrCtx.fillStyle = ptrColor.light.getRgbaColor();
                ptrCtx.fill();
                break;

            case 'type4':
                grad = ptrCtx.createLinearGradient(0.467289 * size, 0, 0.528036 * size, 0);
                grad.addColorStop(0, ptrColor.dark.getRgbaColor());
                grad.addColorStop(0.51, ptrColor.dark.getRgbaColor());
                grad.addColorStop(0.52, ptrColor.light.getRgbaColor());
                grad.addColorStop(1, ptrColor.light.getRgbaColor());
                ptrCtx.fillStyle = grad;
                ptrCtx.beginPath();
                ptrCtx.moveTo(size * 0.5, size * 0.126168);
                ptrCtx.lineTo(size * 0.514018, size * 0.135514);
                ptrCtx.lineTo(size * 0.532710, size * 0.5);
                ptrCtx.lineTo(size * 0.523364, size * 0.602803);
                ptrCtx.lineTo(size * 0.476635, size * 0.602803);
                ptrCtx.lineTo(size * 0.467289, size * 0.5);
                ptrCtx.lineTo(size * 0.485981, size * 0.135514);
                ptrCtx.lineTo(size * 0.5, size * 0.126168);
                ptrCtx.closePath();
                ptrCtx.fill();
                break;

            case 'type5':
                grad = ptrCtx.createLinearGradient(0.471962 * size, 0, 0.528036 * size, 0);
                grad.addColorStop(0, ptrColor.light.getRgbaColor());
                grad.addColorStop(0.5, ptrColor.light.getRgbaColor());
                grad.addColorStop(0.5, ptrColor.medium.getRgbaColor());
                grad.addColorStop(1, ptrColor.medium.getRgbaColor());
                ptrCtx.fillStyle = grad;
                ptrCtx.beginPath();
                ptrCtx.moveTo(size * 0.5, size * 0.495327);
                ptrCtx.lineTo(size * 0.528037, size * 0.495327);
                ptrCtx.lineTo(size * 0.5, size * 0.149532);
                ptrCtx.lineTo(size * 0.471962, size * 0.495327);
                ptrCtx.lineTo(size * 0.5, size * 0.495327);
                ptrCtx.closePath();
                ptrCtx.fill();

                ptrCtx.lineWidth = 1;
                ptrCtx.lineCap = 'square';
                ptrCtx.lineJoin = 'miter';
                ptrCtx.strokeStyle = ptrColor.dark.getRgbaColor();
                ptrCtx.stroke();
                break;

            case 'type6':
                ptrCtx.fillStyle = ptrColor.medium.getRgbaColor();
                ptrCtx.beginPath();
                ptrCtx.moveTo(size * 0.481308, size * 0.485981);
                ptrCtx.lineTo(size * 0.481308, size * 0.392523);
                ptrCtx.lineTo(size * 0.485981, size * 0.317757);
                ptrCtx.lineTo(size * 0.495327, size * 0.130841);
                ptrCtx.lineTo(size * 0.504672, size * 0.130841);
                ptrCtx.lineTo(size * 0.514018, size * 0.317757);
                ptrCtx.lineTo(size * 0.518691, size * 0.387850);
                ptrCtx.lineTo(size * 0.518691, size * 0.485981);
                ptrCtx.lineTo(size * 0.504672, size * 0.485981);
                ptrCtx.lineTo(size * 0.504672, size * 0.387850);
                ptrCtx.lineTo(size * 0.5, size * 0.317757);
                ptrCtx.lineTo(size * 0.495327, size * 0.392523);
                ptrCtx.lineTo(size * 0.495327, size * 0.485981);
                ptrCtx.lineTo(size * 0.481308, size * 0.485981);
                ptrCtx.closePath();
                ptrCtx.fill();
                break;

            case 'type7':
                grad = ptrCtx.createLinearGradient(0.481308 * size, 0, 0.518691 * size, 0);
                grad.addColorStop(0, ptrColor.dark.getRgbaColor());
                grad.addColorStop(1, ptrColor.medium.getRgbaColor());
                ptrCtx.fillStyle = grad;
                ptrCtx.beginPath();
                ptrCtx.moveTo(size * 0.490654, size * 0.130841);
                ptrCtx.lineTo(size * 0.481308, size * 0.5);
                ptrCtx.lineTo(size * 0.518691, size * 0.5);
                ptrCtx.lineTo(size * 0.504672, size * 0.130841);
                ptrCtx.lineTo(size * 0.490654, size * 0.130841);
                ptrCtx.closePath();
                ptrCtx.fill();
                break;

            case 'type8':
                grad = ptrCtx.createLinearGradient(0.471962 * size, 0, 0.528036 * size, 0);
                grad.addColorStop(0, ptrColor.light.getRgbaColor());
                grad.addColorStop(0.5, ptrColor.light.getRgbaColor());
                grad.addColorStop(0.5, ptrColor.medium.getRgbaColor());
                grad.addColorStop(1, ptrColor.medium.getRgbaColor());
                ptrCtx.fillStyle = grad;
                ptrCtx.strokeStyle = ptrColor.dark.getRgbaColor();
                ptrCtx.beginPath();
                ptrCtx.moveTo(size * 0.5, size * 0.532710);
                ptrCtx.lineTo(size * 0.532710, size * 0.5);
                ptrCtx.bezierCurveTo(size * 0.532710, size * 0.5, size * 0.509345, size * 0.457943, size * 0.5, size * 0.149532);
                ptrCtx.bezierCurveTo(size * 0.490654, size * 0.457943, size * 0.467289, size * 0.5, size * 0.467289, size * 0.5);
                ptrCtx.lineTo(size * 0.5, size * 0.532710);
                ptrCtx.closePath();
                ptrCtx.fill();
                ptrCtx.stroke();
                break;

            case 'type9':
                grad = ptrCtx.createLinearGradient(0.471962 * size, 0, 0.528036 * size, 0);
                grad.addColorStop(0, 'rgb(50, 50, 50)');
                grad.addColorStop(0.5, '#666666');
                grad.addColorStop(1, 'rgb(50, 50, 50)');
                ptrCtx.fillStyle = grad;
                ptrCtx.strokeStyle = '#2E2E2E';
                ptrCtx.beginPath();
                ptrCtx.moveTo(size * 0.495327, size * 0.233644);
                ptrCtx.lineTo(size * 0.504672, size * 0.233644);
                ptrCtx.lineTo(size * 0.514018, size * 0.439252);
                ptrCtx.lineTo(size * 0.485981, size * 0.439252);
                ptrCtx.lineTo(size * 0.495327, size * 0.233644);
                ptrCtx.closePath();
                ptrCtx.moveTo(size * 0.490654, size * 0.130841);
                ptrCtx.lineTo(size * 0.471962, size * 0.471962);
                ptrCtx.lineTo(size * 0.471962, size * 0.528037);
                ptrCtx.bezierCurveTo(size * 0.471962, size * 0.528037, size * 0.476635, size * 0.602803, size * 0.476635, size * 0.602803);
                ptrCtx.bezierCurveTo(size * 0.476635, size * 0.607476, size * 0.481308, size * 0.607476, size * 0.5, size * 0.607476);
                ptrCtx.bezierCurveTo(size * 0.518691, size * 0.607476, size * 0.523364, size * 0.607476, size * 0.523364, size * 0.602803);
                ptrCtx.bezierCurveTo(size * 0.523364, size * 0.602803, size * 0.528037, size * 0.528037, size * 0.528037, size * 0.528037);
                ptrCtx.lineTo(size * 0.528037, size * 0.471962);
                ptrCtx.lineTo(size * 0.509345, size * 0.130841);
                ptrCtx.lineTo(size * 0.490654, size * 0.130841);
                ptrCtx.closePath();
                ptrCtx.fill();

                ptrCtx.beginPath();
                ptrCtx.moveTo(size * 0.495327, size * 0.219626);
                ptrCtx.lineTo(size * 0.504672, size * 0.219626);
                ptrCtx.lineTo(size * 0.504672, size * 0.135514);
                ptrCtx.lineTo(size * 0.495327, size * 0.135514);
                ptrCtx.lineTo(size * 0.495327, size * 0.219626);
                ptrCtx.closePath();

                ptrCtx.fillStyle = ptrColor.medium.getRgbaColor();
                ptrCtx.fill();
                break;

            case 'type10':
                // POINTER_TYPE10
                ptrCtx.beginPath();
                ptrCtx.moveTo(size * 0.5, size * 0.149532);
                ptrCtx.bezierCurveTo(size * 0.5, size * 0.149532, size * 0.443925, size * 0.490654, size * 0.443925, size * 0.5);
                ptrCtx.bezierCurveTo(size * 0.443925, size * 0.532710, size * 0.467289, size * 0.556074, size * 0.5, size * 0.556074);
                ptrCtx.bezierCurveTo(size * 0.532710, size * 0.556074, size * 0.556074, size * 0.532710, size * 0.556074, size * 0.5);
                ptrCtx.bezierCurveTo(size * 0.556074, size * 0.490654, size * 0.5, size * 0.149532, size * 0.5, size * 0.149532);
                ptrCtx.closePath();
                grad = ptrCtx.createLinearGradient(0.471962 * size, 0, 0.528036 * size, 0);
                grad.addColorStop(0, ptrColor.light.getRgbaColor());
                grad.addColorStop(0.5, ptrColor.light.getRgbaColor());
                grad.addColorStop(0.5, ptrColor.medium.getRgbaColor());
                grad.addColorStop(1, ptrColor.medium.getRgbaColor());
                ptrCtx.fillStyle = grad;
                ptrCtx.strokeStyle = ptrColor.medium.getRgbaColor();
                ptrCtx.lineWidth = 1;
                ptrCtx.lineCap = 'square';
                ptrCtx.lineJoin = 'miter';
                ptrCtx.fill();
                ptrCtx.stroke();
                break;

            case 'type11':
                // POINTER_TYPE11
                ptrCtx.beginPath();
                ptrCtx.moveTo(0.5 * size, 0.168224 * size);
                ptrCtx.lineTo(0.485981 * size, 0.5 * size);
                ptrCtx.bezierCurveTo(0.485981 * size, 0.5 * size, 0.481308 * size, 0.584112 * size, 0.5 * size, 0.584112 * size);
                ptrCtx.bezierCurveTo(0.514018 * size, 0.584112 * size, 0.509345 * size, 0.5 * size, 0.509345 * size, 0.5 * size);
                ptrCtx.lineTo(0.5 * size, 0.168224 * size);
                ptrCtx.closePath();
                grad = ptrCtx.createLinearGradient(0, 0.168224 * size, 0, 0.584112 * size);
                grad.addColorStop(0, ptrColor.medium.getRgbaColor());
                grad.addColorStop(1, ptrColor.dark.getRgbaColor());
                ptrCtx.fillStyle = grad;
                ptrCtx.strokeStyle = ptrColor.dark.getRgbaColor();
                ptrCtx.fill();
                ptrCtx.stroke();
                break;

            case 'type12':
                // POINTER_TYPE12
                ptrCtx.beginPath();
                ptrCtx.moveTo(0.5 * size, 0.168224 * size);
                ptrCtx.lineTo(0.485981 * size, 0.5 * size);
                ptrCtx.lineTo(0.5 * size, 0.504672 * size);
                ptrCtx.lineTo(0.509345 * size, 0.5 * size);
                ptrCtx.lineTo(0.5 * size, 0.168224 * size);
                ptrCtx.closePath();
                grad = ptrCtx.createLinearGradient(0, 0.168224 * size, 0, 0.504672 * size);
                grad.addColorStop(0, ptrColor.medium.getRgbaColor());
                grad.addColorStop(1, ptrColor.dark.getRgbaColor());
                ptrCtx.fillStyle = grad;
                ptrCtx.strokeStyle = ptrColor.dark.getRgbaColor();
                ptrCtx.fill();
                ptrCtx.stroke();
                break;

            case 'type13':
                // POINTER_TYPE13
            case 'type14':
                // POINTER_TYPE14 (same shape as 13)
                ptrCtx.beginPath();
                ptrCtx.moveTo(0.485981 * size, 0.168224 * size);
                ptrCtx.lineTo(0.5 * size, 0.130841 * size);
                ptrCtx.lineTo(0.509345 * size, 0.168224 * size);
                ptrCtx.lineTo(0.509345 * size, 0.509345 * size);
                ptrCtx.lineTo(0.485981 * size, 0.509345 * size);
                ptrCtx.lineTo(0.485981 * size, 0.168224 * size);
                ptrCtx.closePath();
                if (ptrType.type === 'type13') {
                    // TYPE13
                    grad = ptrCtx.createLinearGradient(0, 0.5 * size, 0, 0.130841 * size);
                    grad.addColorStop(0, lblColor.getRgbaColor());
                    grad.addColorStop(0.85, lblColor.getRgbaColor());
                    grad.addColorStop(0.85, ptrColor.medium.getRgbaColor());
                    grad.addColorStop(1, ptrColor.medium.getRgbaColor());
                    ptrCtx.fillStyle = grad;
                } else {
                    // TYPE14
                    grad = ptrCtx.createLinearGradient(0.485981 * size, 0, 0.509345 * size, 0);
                    grad.addColorStop(0, ptrColor.veryDark.getRgbaColor());
                    grad.addColorStop(0.5, ptrColor.light.getRgbaColor());
                    grad.addColorStop(1, ptrColor.veryDark.getRgbaColor());
                    ptrCtx.fillStyle = grad;
                }
                ptrCtx.fill();
                break;

            case 'type15':
                // POINTER TYPE15 - Classic with crescent
            case 'type16':
                // POINTER TYPE16 - Classic without crescent
                ptrCtx.beginPath();
                ptrCtx.moveTo(size * 0.509345, size * 0.457943);
                ptrCtx.lineTo(size * 0.5015, size * 0.13);
                ptrCtx.lineTo(size * 0.4985, size * 0.13);
                ptrCtx.lineTo(size * 0.490654, size * 0.457943);
                ptrCtx.bezierCurveTo(size * 0.490654, size * 0.457943, size * 0.490654, size * 0.457943, size * 0.490654, size * 0.457943);
                ptrCtx.bezierCurveTo(size * 0.471962, size * 0.462616, size * 0.457943, size * 0.481308, size * 0.457943, size * 0.5);
                ptrCtx.bezierCurveTo(size * 0.457943, size * 0.518691, size * 0.471962, size * 0.537383, size * 0.490654, size * 0.542056);
                ptrCtx.bezierCurveTo(size * 0.490654, size * 0.542056, size * 0.490654, size * 0.542056, size * 0.490654, size * 0.542056);
                if (ptrType.type === 'type15') {
                    ptrCtx.lineTo(size * 0.490654, size * 0.57);
                    ptrCtx.bezierCurveTo(size * 0.46, size * 0.58, size * 0.46, size * 0.62, size * 0.490654, size * 0.63);
                    ptrCtx.bezierCurveTo(size * 0.47, size * 0.62, size * 0.48, size * 0.59, size * 0.5, size * 0.59);
                    ptrCtx.bezierCurveTo(size * 0.53, size * 0.59, size * 0.52, size * 0.62, size * 0.509345, size * 0.63);
                    ptrCtx.bezierCurveTo(size * 0.54, size * 0.62, size * 0.54, size * 0.58, size * 0.509345, size * 0.57);
                    ptrCtx.lineTo(size * 0.509345, size * 0.57);
                } else {
                    ptrCtx.lineTo(size * 0.490654, size * 0.621495);
                    ptrCtx.lineTo(size * 0.509345, size * 0.621495);
                }
                ptrCtx.lineTo(size * 0.509345, size * 0.542056);
                ptrCtx.bezierCurveTo(size * 0.509345, size * 0.542056, size * 0.509345, size * 0.542056, size * 0.509345, size * 0.542056);
                ptrCtx.bezierCurveTo(size * 0.528037, size * 0.537383, size * 0.542056, size * 0.518691, size * 0.542056, size * 0.5);
                ptrCtx.bezierCurveTo(size * 0.542056, size * 0.481308, size * 0.528037, size * 0.462616, size * 0.509345, size * 0.457943);
                ptrCtx.bezierCurveTo(size * 0.509345, size * 0.457943, size * 0.509345, size * 0.457943, size * 0.509345, size * 0.457943);
                ptrCtx.closePath();
                if (ptrType.type === 'type15') {
                    grad = ptrCtx.createLinearGradient(0, 0, 0, size * 0.63);
                } else {
                    grad = ptrCtx.createLinearGradient(0, 0, 0, size * 0.621495);
                }
                grad.addColorStop(0, ptrColor.medium.getRgbaColor());
                grad.addColorStop(0.388888, ptrColor.medium.getRgbaColor());
                grad.addColorStop(0.5, ptrColor.light.getRgbaColor());
                grad.addColorStop(0.611111, ptrColor.medium.getRgbaColor());
                grad.addColorStop(1, ptrColor.medium.getRgbaColor());
                ptrCtx.fillStyle = grad;
                ptrCtx.strokeStyle = ptrColor.dark.getRgbaColor();
                ptrCtx.fill();
                ptrCtx.stroke();
                // Draw the rings
                ptrCtx.beginPath();
                radius = size * 0.065420 / 2;
                ptrCtx.arc(size * 0.5, size * 0.5, radius, 0, TWO_PI);
                grad = ptrCtx.createLinearGradient(size * 0.5 - radius, size * 0.5 + radius, 0, size * 0.5 + radius);
                grad.addColorStop(0, '#e6b35c');
                grad.addColorStop(0.01, '#e6b35c');
                grad.addColorStop(0.99, '#c48200');
                grad.addColorStop(1, '#c48200');
                ptrCtx.fillStyle = grad;
                ptrCtx.closePath();
                ptrCtx.fill();
                ptrCtx.beginPath();
                radius = size * 0.046728 / 2;
                ptrCtx.arc(size * 0.5, size * 0.5, radius, 0, TWO_PI);
                grad = ptrCtx.createRadialGradient(size * 0.5, size * 0.5, 0, size * 0.5, size * 0.5, radius);
                grad.addColorStop(0, '#c5c5c5');
                grad.addColorStop(0.19, '#c5c5c5');
                grad.addColorStop(0.22, '#000000');
                grad.addColorStop(0.8, '#000000');
                grad.addColorStop(0.99, '#707070');
                grad.addColorStop(1, '#707070');
                ptrCtx.fillStyle = grad;
                ptrCtx.closePath();
                ptrCtx.fill();
                break;

            case 'type1':
            /* falls through */
            default:
                grad = ptrCtx.createLinearGradient(0, size * 0.471962, 0, size * 0.130841);
                grad.addColorStop(0, ptrColor.veryDark.getRgbaColor());
                grad.addColorStop(0.3, ptrColor.medium.getRgbaColor());
                grad.addColorStop(0.59, ptrColor.medium.getRgbaColor());
                grad.addColorStop(1, ptrColor.veryDark.getRgbaColor());
                ptrCtx.fillStyle = grad;
                ptrCtx.beginPath();
                ptrCtx.moveTo(size * 0.518691, size * 0.471962);
                ptrCtx.bezierCurveTo(size * 0.514018, size * 0.457943, size * 0.509345, size * 0.415887, size * 0.509345, size * 0.401869);
                ptrCtx.bezierCurveTo(size * 0.504672, size * 0.383177, size * 0.5, size * 0.130841, size * 0.5, size * 0.130841);
                ptrCtx.bezierCurveTo(size * 0.5, size * 0.130841, size * 0.490654, size * 0.383177, size * 0.490654, size * 0.397196);
                ptrCtx.bezierCurveTo(size * 0.490654, size * 0.415887, size * 0.485981, size * 0.457943, size * 0.481308, size * 0.471962);
                ptrCtx.bezierCurveTo(size * 0.471962, size * 0.481308, size * 0.467289, size * 0.490654, size * 0.467289, size * 0.5);
                ptrCtx.bezierCurveTo(size * 0.467289, size * 0.518691, size * 0.481308, size * 0.532710, size * 0.5, size * 0.532710);
                ptrCtx.bezierCurveTo(size * 0.518691, size * 0.532710, size * 0.532710, size * 0.518691, size * 0.532710, size * 0.5);
                ptrCtx.bezierCurveTo(size * 0.532710, size * 0.490654, size * 0.528037, size * 0.481308, size * 0.518691, size * 0.471962);
                ptrCtx.closePath();
                ptrCtx.fill();
                break;
            }
            // cache buffer
            drawPointerImage.cache[cacheKey] = ptrBuffer;
        }
        ctx.drawImage(drawPointerImage.cache[cacheKey], 0, 0);
        return this;
    };
    drawPointerImage.cache = {};

    var drawRadialFrameImage = function (ctx, frameDesign, centerX, centerY, imageWidth, imageHeight) {
        var radFBuffer, radFCtx,
            grad, outerX, innerX, fractions, colors,
            cacheKey = imageWidth.toString() + imageHeight + frameDesign.design;

        // check if we have already created and cached this buffer, if not create it
        if (!drawRadialFrameImage.cache[cacheKey]) {
            // Setup buffer
            radFBuffer = createBuffer(imageWidth, imageHeight);
            radFCtx = radFBuffer.getContext('2d');

            // outer gray frame
            radFCtx.fillStyle = '#848484';
            radFCtx.strokeStyle = 'rgba(132, 132, 132, 0.5)';
            radFCtx.beginPath();
            radFCtx.arc(centerX, centerY, imageWidth / 2, 0, TWO_PI, true);
            radFCtx.closePath();
            radFCtx.fill();
            radFCtx.stroke();

            radFCtx.beginPath();
            radFCtx.arc(centerX, centerY, imageWidth * 0.990654 / 2, 0, TWO_PI, true);
            radFCtx.closePath();

            // main gradient frame
            switch (frameDesign.design) {
            case 'metal':
                grad = radFCtx.createLinearGradient(0, imageWidth * 0.004672, 0, imageHeight * 0.990654);
                grad.addColorStop(0, '#fefefe');
                grad.addColorStop(0.07, 'rgb(210, 210, 210)');
                grad.addColorStop(0.12, 'rgb(179, 179, 179)');
                grad.addColorStop(1, 'rgb(213, 213, 213)');
                radFCtx.fillStyle = grad;
                radFCtx.fill();
                break;

            case 'brass':
                grad = radFCtx.createLinearGradient(0, imageWidth * 0.004672, 0, imageHeight * 0.990654);
                grad.addColorStop(0, 'rgb(249, 243, 155)');
                grad.addColorStop(0.05, 'rgb(246, 226, 101)');
                grad.addColorStop(0.10, 'rgb(240, 225, 132)');
                grad.addColorStop(0.50, 'rgb(90, 57, 22)');
                grad.addColorStop(0.90, 'rgb(249, 237, 139)');
                grad.addColorStop(0.95, 'rgb(243, 226, 108)');
                grad.addColorStop(1, 'rgb(202, 182, 113)');
                radFCtx.fillStyle = grad;
                radFCtx.fill();
                break;

            case 'steel':
                grad = radFCtx.createLinearGradient(0, imageWidth * 0.004672, 0, imageHeight * 0.990654);
                grad.addColorStop(0, 'rgb(231, 237, 237)');
                grad.addColorStop(0.05, 'rgb(189, 199, 198)');
                grad.addColorStop(0.10, 'rgb(192, 201, 200)');
                grad.addColorStop(0.50, 'rgb(23, 31, 33)');
                grad.addColorStop(0.90, 'rgb(196, 205, 204)');
                grad.addColorStop(0.95, 'rgb(194, 204, 203)');
                grad.addColorStop(1, 'rgb(189, 201, 199)');
                radFCtx.fillStyle = grad;
                radFCtx.fill();
                break;

            case 'gold':
                grad = radFCtx.createLinearGradient(0, imageWidth * 0.004672, 0, imageHeight * 0.990654);
                grad.addColorStop(0, 'rgb(255, 255, 207)');
                grad.addColorStop(0.15, 'rgb(255, 237, 96)');
                grad.addColorStop(0.22, 'rgb(254, 199, 57)');
                grad.addColorStop(0.3, 'rgb(255, 249, 203)');
                grad.addColorStop(0.38, 'rgb(255, 199, 64)');
                grad.addColorStop(0.44, 'rgb(252, 194, 60)');
                grad.addColorStop(0.51, 'rgb(255, 204, 59)');
                grad.addColorStop(0.6, 'rgb(213, 134, 29)');
                grad.addColorStop(0.68, 'rgb(255, 201, 56)');
                grad.addColorStop(0.75, 'rgb(212, 135, 29)');
                grad.addColorStop(1, 'rgb(247, 238, 101)');
                radFCtx.fillStyle = grad;
                radFCtx.fill();
                break;

            case 'anthracite':
                grad = radFCtx.createLinearGradient(0, 0.004672 * imageHeight, 0, 0.995326 * imageHeight);
                grad.addColorStop(0, 'rgb(118, 117, 135)');
                grad.addColorStop(0.06, 'rgb(74, 74, 82)');
                grad.addColorStop(0.12, 'rgb(50, 50, 54)');
                grad.addColorStop(1, 'rgb(79, 79, 87)');
                radFCtx.fillStyle = grad;
                radFCtx.fill();
                break;

            case 'tiltedGray':
                grad = radFCtx.createLinearGradient(0.233644 * imageWidth, 0.084112 * imageHeight, 0.81258 * imageWidth, 0.910919 * imageHeight);
                grad.addColorStop(0, '#ffffff');
                grad.addColorStop(0.07, 'rgb(210, 210, 210)');
                grad.addColorStop(0.16, 'rgb(179, 179, 179)');
                grad.addColorStop(0.33, '#ffffff');
                grad.addColorStop(0.55, '#c5c5c5');
                grad.addColorStop(0.79, '#ffffff');
                grad.addColorStop(1, '#666666');
                radFCtx.fillStyle = grad;
                radFCtx.fill();
                break;

            case 'tiltedBlack':
                grad = radFCtx.createLinearGradient(0.228971 * imageWidth, 0.079439 * imageHeight, 0.802547 * imageWidth, 0.898591 * imageHeight);
                grad.addColorStop(0, '#666666');
                grad.addColorStop(0.21, '#000000');
                grad.addColorStop(0.47, '#666666');
                grad.addColorStop(0.99, '#000000');
                grad.addColorStop(1, '#000000');
                radFCtx.fillStyle = grad;
                radFCtx.fill();
                break;

            case 'glossyMetal':
                grad = radFCtx.createRadialGradient(0.5 * imageWidth, 0.5 * imageHeight, 0, 0.5 * imageWidth, 0.5 * imageWidth, 0.5 * imageWidth);
                grad.addColorStop(0, 'rgb(207, 207, 207)');
                grad.addColorStop(0.96, 'rgb(205, 204, 205)');
                grad.addColorStop(1, 'rgb(244, 244, 244)');
                radFCtx.fillStyle = grad;
                radFCtx.fill();
                radFCtx.beginPath();
                radFCtx.arc(0.5 * imageWidth, 0.5 * imageHeight, 0.973962 * imageWidth / 2, 0, TWO_PI);
                radFCtx.closePath();
                grad = radFCtx.createLinearGradient(0, imageHeight - 0.971962 * imageHeight, 0, 0.971962 * imageHeight);
                grad.addColorStop(0, 'rgb(249, 249, 249)');
                grad.addColorStop(0.23, 'rgb(200, 195, 191)');
                grad.addColorStop(0.36, '#ffffff');
                grad.addColorStop(0.59, 'rgb(29, 29, 29)');
                grad.addColorStop(0.76, 'rgb(200, 194, 192)');
                grad.addColorStop(1, 'rgb(209, 209, 209)');
                radFCtx.fillStyle = grad;
                radFCtx.fill();

                radFCtx.beginPath();
                radFCtx.arc(0.5 * imageWidth, 0.5 * imageHeight, 0.869158 * imageWidth / 2, 0, TWO_PI);
                radFCtx.closePath();
                radFCtx.fillStyle = '#f6f6f6';
                radFCtx.fill();

                radFCtx.beginPath();
                radFCtx.arc(0.5 * imageWidth, 0.5 * imageHeight, 0.85 * imageWidth / 2, 0, TWO_PI);
                radFCtx.closePath();
                radFCtx.fillStyle = '#333333';
                radFCtx.fill();
                break;

            case 'blackMetal':
                fractions = [0,
                             0.125,
                             0.347222,
                             0.5,
                             0.680555,
                             0.875,
                             1];

                colors = [ new RgbaColor(254, 254, 254, 1),
                           new RgbaColor(0, 0, 0, 1),
                           new RgbaColor(153, 153, 153, 1),
                           new RgbaColor(0, 0, 0, 1),
                           new RgbaColor(153, 153, 153, 1),
                           new RgbaColor(0, 0, 0, 1),
                           new RgbaColor(254, 254, 254, 1)];

                radFCtx.save();
                radFCtx.arc(centerX, centerY, imageWidth * 0.990654 / 2, 0, TWO_PI, true);
                radFCtx.clip();
                outerX = imageWidth * 0.495327;
                innerX = imageWidth * 0.420560;
                grad = new ConicalGradient(fractions, colors);
                grad.fillCircle(radFCtx, centerX, centerY, innerX, outerX);
                // fade outer edge
                radFCtx.strokeStyle = '#848484';
                radFCtx.strokeStyle = 'rgba(132, 132, 132, 0.8)';
                radFCtx.beginPath();
                radFCtx.lineWidth = imageWidth / 90;
                radFCtx.arc(centerX, centerY, imageWidth / 2, 0, TWO_PI, true);
                radFCtx.closePath();
                radFCtx.stroke();
                radFCtx.restore();
                break;

            case 'shinyMetal':
                fractions = [0,
                             0.125,
                             0.25,
                             0.347222,
                             0.5,
                             0.652777,
                             0.75,
                             0.875,
                             1];

                colors = [ new RgbaColor(254, 254, 254, 1),
                           new RgbaColor(210, 210, 210, 1),
                           new RgbaColor(179, 179, 179, 1),
                           new RgbaColor(238, 238, 238, 1),
                           new RgbaColor(160, 160, 160, 1),
                           new RgbaColor(238, 238, 238, 1),
                           new RgbaColor(179, 179, 179, 1),
                           new RgbaColor(210, 210, 210, 1),
                           new RgbaColor(254, 254, 254, 1)];

                radFCtx.save();
                radFCtx.arc(centerX, centerY, imageWidth * 0.990654 / 2, 0, TWO_PI, true);
                radFCtx.clip();
                outerX = imageWidth * 0.495327;
                innerX = imageWidth * 0.420560;
                grad = new ConicalGradient(fractions, colors);
                grad.fillCircle(radFCtx, centerX, centerY, innerX, outerX);
                // fade outer edge
                radFCtx.strokeStyle = '#848484';
                radFCtx.strokeStyle = 'rgba(132, 132, 132, 0.8)';
                radFCtx.beginPath();
                radFCtx.lineWidth = imageWidth / 90;
                radFCtx.arc(centerX, centerY, imageWidth / 2, 0, TWO_PI, true);
                radFCtx.closePath();
                radFCtx.stroke();
                radFCtx.restore();
                break;

            case 'chrome':
                fractions = [0,
                             0.09,
                             0.12,
                             0.16,
                             0.25,
                             0.29,
                             0.33,
                             0.38,
                             0.48,
                             0.52,
                             0.63,
                             0.68,
                             0.8,
                             0.83,
                             0.87,
                             0.97,
                             1];

                colors = [ new RgbaColor(255, 255, 255, 1),
                           new RgbaColor(255, 255, 255, 1),
                           new RgbaColor(136, 136, 138, 1),
                           new RgbaColor(164, 185, 190, 1),
                           new RgbaColor(158, 179, 182, 1),
                           new RgbaColor(112, 112, 112, 1),
                           new RgbaColor(221, 227, 227, 1),
                           new RgbaColor(155, 176, 179, 1),
                           new RgbaColor(156, 176, 177, 1),
                           new RgbaColor(254, 255, 255, 1),
                           new RgbaColor(255, 255, 255, 1),
                           new RgbaColor(156, 180, 180, 1),
                           new RgbaColor(198, 209, 211, 1),
                           new RgbaColor(246, 248, 247, 1),
                           new RgbaColor(204, 216, 216, 1),
                           new RgbaColor(164, 188, 190, 1),
                           new RgbaColor(255, 255, 255, 1)];

                radFCtx.save();
                radFCtx.arc(centerX, centerY, imageWidth * 0.990654 / 2, 0, TWO_PI, true);
                radFCtx.clip();
                outerX = imageWidth * 0.495327;
                innerX = imageWidth * 0.420560;
                grad = new ConicalGradient(fractions, colors);
                grad.fillCircle(radFCtx, centerX, centerY, innerX, outerX);
                // fade outer edge
                radFCtx.strokeStyle = '#848484';
                radFCtx.strokeStyle = 'rgba(132, 132, 132, 0.8)';
                radFCtx.beginPath();
                radFCtx.lineWidth = imageWidth / 90;
                radFCtx.arc(centerX, centerY, imageWidth / 2, 0, TWO_PI, true);
                radFCtx.closePath();
                radFCtx.stroke();
                radFCtx.restore();

                break;
            }

            // inner bright frame
            radFCtx.fillStyle = 'rgb(191, 191, 191)';
            radFCtx.beginPath();
            radFCtx.arc(centerX, centerY, imageWidth * 0.841121 / 2, 0, TWO_PI, true);
            radFCtx.closePath();
            radFCtx.fill();

            // clip out center so it is transparent if the background is not visible
            radFCtx.globalCompositeOperation = 'destination-out';
            // Background ellipse
            radFCtx.beginPath();
            radFCtx.arc(centerX, centerY, imageWidth * 0.83 / 2, 0, TWO_PI, true);
            radFCtx.closePath();
            radFCtx.fill();

            // cache the buffer
            drawRadialFrameImage.cache[cacheKey] = radFBuffer;
        }
        ctx.drawImage(drawRadialFrameImage.cache[cacheKey], 0, 0);
        return this;
    };
    drawRadialFrameImage.cache = {};

    var drawLinearFrameImage = function (ctx, frameDesign, imageWidth, imageHeight, vertical) {
        var frameWidth,
            linFBuffer, linFCtx,
            OUTER_FRAME_CORNER_RADIUS,
            FRAME_MAIN_CORNER_RADIUS,
            SUBTRACT_CORNER_RADIUS,
            grad,
            fractions = [],
            colors = [],
            cacheKey = imageWidth.toString() + imageHeight + frameDesign.design + vertical;

        // check if we have already created and cached this buffer, if not create it
        if (!drawLinearFrameImage.cache[cacheKey]) {
            frameWidth = Math.sqrt(imageWidth * imageWidth + imageHeight * imageHeight) * 0.04;
            frameWidth = Math.min(frameWidth, (vertical ? imageWidth : imageHeight) * 0.1);

            // Setup buffer
            linFBuffer = createBuffer(imageWidth, imageHeight);
            linFCtx = linFBuffer.getContext('2d');

            // Calculate corner radii
            if (vertical) {
                OUTER_FRAME_CORNER_RADIUS = imageWidth * 0.05;
                FRAME_MAIN_CORNER_RADIUS = OUTER_FRAME_CORNER_RADIUS - 1;
                SUBTRACT_CORNER_RADIUS = imageWidth * 0.028571;
            } else {
                OUTER_FRAME_CORNER_RADIUS = imageHeight * 0.05;
                FRAME_MAIN_CORNER_RADIUS = OUTER_FRAME_CORNER_RADIUS - 1;
                SUBTRACT_CORNER_RADIUS = imageHeight * 0.028571;
            }

            roundedRectangle(linFCtx, 0, 0, imageWidth, imageHeight, OUTER_FRAME_CORNER_RADIUS);
            linFCtx.fillStyle = '#838383';
            linFCtx.fill();

            roundedRectangle(linFCtx, 1, 1, imageWidth - 2, imageHeight - 2, FRAME_MAIN_CORNER_RADIUS);

            // main gradient frame
            switch (frameDesign.design) {
            case 'metal':
                grad = linFCtx.createLinearGradient(0, imageWidth * 0.004672, 0, imageHeight * 0.990654);
                grad.addColorStop(0, '#fefefe');
                grad.addColorStop(0.07, 'rgb(210, 210, 210)');
                grad.addColorStop(0.12, 'rgb(179, 179, 179)');
                grad.addColorStop(1, 'rgb(213, 213, 213)');
                linFCtx.fillStyle = grad;
                linFCtx.fill();
                break;

            case 'brass':
                grad = linFCtx.createLinearGradient(0, imageWidth * 0.004672, 0, imageHeight * 0.990654);
                grad.addColorStop(0, 'rgb(249, 243, 155)');
                grad.addColorStop(0.05, 'rgb(246, 226, 101)');
                grad.addColorStop(0.10, 'rgb(240, 225, 132)');
                grad.addColorStop(0.50, 'rgb(90, 57, 22)');
                grad.addColorStop(0.90, 'rgb(249, 237, 139)');
                grad.addColorStop(0.95, 'rgb(243, 226, 108)');
                grad.addColorStop(1, 'rgb(202, 182, 113)');
                linFCtx.fillStyle = grad;
                linFCtx.fill();
                break;

            case 'steel':
                grad = linFCtx.createLinearGradient(0, imageWidth * 0.004672, 0, imageHeight * 0.990654);
                grad.addColorStop(0, 'rgb(231, 237, 237)');
                grad.addColorStop(0.05, 'rgb(189, 199, 198)');
                grad.addColorStop(0.10, 'rgb(192, 201, 200)');
                grad.addColorStop(0.50, 'rgb(23, 31, 33)');
                grad.addColorStop(0.90, 'rgb(196, 205, 204)');
                grad.addColorStop(0.95, 'rgb(194, 204, 203)');
                grad.addColorStop(1, 'rgb(189, 201, 199)');
                linFCtx.fillStyle = grad;
                linFCtx.fill();
                break;

            case 'gold':
                grad = linFCtx.createLinearGradient(0, imageWidth * 0.004672, 0, imageHeight * 0.990654);
                grad.addColorStop(0, 'rgb(255, 255, 207)');
                grad.addColorStop(0.15, 'rgb(255, 237, 96)');
                grad.addColorStop(0.22, 'rgb(254, 199, 57)');
                grad.addColorStop(0.3, 'rgb(255, 249, 203)');
                grad.addColorStop(0.38, 'rgb(255, 199, 64)');
                grad.addColorStop(0.44, 'rgb(252, 194, 60)');
                grad.addColorStop(0.51, 'rgb(255, 204, 59)');
                grad.addColorStop(0.6, 'rgb(213, 134, 29)');
                grad.addColorStop(0.68, 'rgb(255, 201, 56)');
                grad.addColorStop(0.75, 'rgb(212, 135, 29)');
                grad.addColorStop(1, 'rgb(247, 238, 101)');
                linFCtx.fillStyle = grad;
                linFCtx.fill();
                break;

            case 'anthracite':
                grad = linFCtx.createLinearGradient(0, 0.004672 * imageHeight, 0, 0.995326 * imageHeight);
                grad.addColorStop(0, 'rgb(118, 117, 135)');
                grad.addColorStop(0.06, 'rgb(74, 74, 82)');
                grad.addColorStop(0.12, 'rgb(50, 50, 54)');
                grad.addColorStop(1, 'rgb(79, 79, 87)');
                linFCtx.fillStyle = grad;
                linFCtx.fill();
                break;

            case 'tiltedGray':
                grad = linFCtx.createLinearGradient(0.233644 * imageWidth, 0.084112 * imageHeight, 0.81258 * imageWidth, 0.910919 * imageHeight);
                grad.addColorStop(0, '#ffffff');
                grad.addColorStop(0.07, 'rgb(210, 210, 210)');
                grad.addColorStop(0.16, 'rgb(179, 179, 179)');
                grad.addColorStop(0.33, '#ffffff');
                grad.addColorStop(0.55, '#c5c5c5');
                grad.addColorStop(0.79, '#ffffff');
                grad.addColorStop(1, '#666666');
                linFCtx.fillStyle = grad;
                linFCtx.fill();
                break;

            case 'tiltedBlack':
                grad = linFCtx.createLinearGradient(0.228971 * imageWidth, 0.079439 * imageHeight, 0.802547 * imageWidth, 0.898591 * imageHeight);
                grad.addColorStop(0, '#666666');
                grad.addColorStop(0.21, '#000000');
                grad.addColorStop(0.47, '#666666');
                grad.addColorStop(0.99, '#000000');
                grad.addColorStop(1, '#000000');
                linFCtx.fillStyle = grad;
                linFCtx.fill();
                break;

            case 'glossyMetal':
                // The smaller side is important for the contour gradient
    // Java version uses a contour gradient for the outer frame rim
    // but this is only 1 pixel wide, so a plain color fill is essentially
    // the same.
    /*
                var frameMainFractions4 = [
                                            0,
                                            (imageWidth >= imageHeight ? 32 / imageHeight : 32 / imageWidth) * 0.04,
                                            1
                                            ];
                var frameMainColors4 = [
                                        new RgbaColor(244, 244, 244, 1),
                                        new RgbaColor(207, 207, 207, 1),
                                        new RgbaColor(207, 207, 207, 1)
                                        ];
                var frameMainGradient4 = new contourGradient(linFCtx, 0, 0, imageWidth,  imageHeight, frameMainFractions4, frameMainColors4);
                // Outer frame rim
                roundedRectangle(linFCtx, 1, 1, imageWidth-2, imageHeight-2, OUTER_FRAME_CORNER_RADIUS);
                linFCtx.clip();
                frameMainGradient4.paintContext();
    */
                // Outer frame rim
    //                roundedRectangle(linFCtx, 1, 1, imageWidth-2, imageHeight-2, OUTER_FRAME_CORNER_RADIUS);
    //                linFCtx.clip();
    //                linFCtx.fillStyle = '#cfcfcf';
    //                linFCtx.fill();

                // Main frame
    //                roundedRectangle(linFCtx, 2, 2, imageWidth - 4, imageHeight - 4, FRAME_MAIN_CORNER_RADIUS);
    //                linFCtx.clip();
                roundedRectangle(linFCtx, 1, 1, imageWidth - 2, imageHeight - 2, OUTER_FRAME_CORNER_RADIUS);
                linFCtx.clip();
                grad = linFCtx.createLinearGradient(0, 1, 0, imageHeight - 2);
    // The fractions from the Java version of linear gauge
    /*
                grad.addColorStop(0, 'rgb(249, 249, 249)');
                grad.addColorStop(0.1, 'rgb(200, 195, 191)');
                grad.addColorStop(0.26, '#ffffff');
                grad.addColorStop(0.73, 'rgb(29, 29, 29)');
                grad.addColorStop(1, 'rgb(209, 209, 209)');
    */
    // Modified fractions from the radial gauge - looks better imho
                grad.addColorStop(0, 'rgb(249, 249, 249)');
                grad.addColorStop(0.2, 'rgb(200, 195, 191)');
                grad.addColorStop(0.3, '#ffffff');
                grad.addColorStop(0.6, 'rgb(29, 29, 29)');
                grad.addColorStop(0.8, 'rgb(200, 194, 192)');
                grad.addColorStop(1, 'rgb(209, 209, 209)');
                linFCtx.fillStyle = grad;
                linFCtx.fill();

                // Inner frame bright
                roundedRectangle(linFCtx, frameWidth - 2, frameWidth - 2, imageWidth - (frameWidth - 2) * 2, imageHeight - (frameWidth - 2) * 2, SUBTRACT_CORNER_RADIUS);
                linFCtx.clip();
                linFCtx.fillStyle = '#f6f6f6';
                linFCtx.fill();

                // Inner frame dark
                roundedRectangle(linFCtx, frameWidth - 1, frameWidth - 1, imageWidth - (frameWidth - 1) * 2, imageHeight - (frameWidth - 1) * 2, SUBTRACT_CORNER_RADIUS);
                linFCtx.clip();
                linFCtx.fillStyle = '#333333';
                linFCtx.fill();
                break;

            case 'blackMetal':
                fractions = [0,
                             0.125,
                             0.347222,
                             0.5,
                             0.680555,
                             0.875,
                             1];

                colors = [ new RgbaColor('#FFFFFF'),
                           new RgbaColor('#000000'),
                           new RgbaColor('#999999'),
                           new RgbaColor('#000000'),
                           new RgbaColor('#999999'),
                           new RgbaColor('#000000'),
                           new RgbaColor('#FFFFFF')];
                // Set the clip
                linFCtx.beginPath();
                roundedRectangle(linFCtx, 1, 1, imageWidth - 2, imageHeight - 2, OUTER_FRAME_CORNER_RADIUS);
                linFCtx.closePath();
                linFCtx.clip();
                grad = new ConicalGradient(fractions, colors);
                grad.fillRect(linFCtx, imageWidth / 2, imageHeight / 2, imageWidth, imageHeight, frameWidth, frameWidth);
                break;

            case 'shinyMetal':
                fractions = [0,
                             0.125,
                             0.25,
                             0.347222,
                             0.5,
                             0.652777,
                             0.75,
                             0.875,
                             1];

                colors = [ new RgbaColor('#FFFFFF'),
                           new RgbaColor('#D2D2D2'),
                           new RgbaColor('#B3B3B3'),
                           new RgbaColor('#EEEEEE'),
                           new RgbaColor('#A0A0A0'),
                           new RgbaColor('#EEEEEE'),
                           new RgbaColor('#B3B3B3'),
                           new RgbaColor('#D2D2D2'),
                           new RgbaColor('#FFFFFF')];
                // Set the clip
                linFCtx.beginPath();
                roundedRectangle(linFCtx, 1, 1, imageWidth - 2, imageHeight - 2, OUTER_FRAME_CORNER_RADIUS);
                linFCtx.closePath();
                linFCtx.clip();
                grad = new ConicalGradient(fractions, colors);
                grad.fillRect(linFCtx, imageWidth / 2, imageHeight / 2, imageWidth, imageHeight, frameWidth, frameWidth);
                break;

            case 'chrome':
                fractions = [0,
                             0.09,
                             0.12,
                             0.16,
                             0.25,
                             0.29,
                             0.33,
                             0.38,
                             0.48,
                             0.52,
                             0.63,
                             0.68,
                             0.8,
                             0.83,
                             0.87,
                             0.97,
                             1];

                colors = [ new RgbaColor('#FFFFFF'),
                           new RgbaColor('#FFFFFF'),
                           new RgbaColor('#888890'),
                           new RgbaColor('#A4B9BE'),
                           new RgbaColor('#9EB3B6'),
                           new RgbaColor('#707070'),
                           new RgbaColor('#DDE3E3'),
                           new RgbaColor('#9BB0B3'),
                           new RgbaColor('#9CB0B1'),
                           new RgbaColor('#FEFFFF'),
                           new RgbaColor('#FFFFFF'),
                           new RgbaColor('#9CB4B4'),
                           new RgbaColor('#C6D1D3'),
                           new RgbaColor('#F6F8F7'),
                           new RgbaColor('#CCD8D8'),
                           new RgbaColor('#A4BCBE'),
                           new RgbaColor('#FFFFFF')];
                // Set the clip
                linFCtx.beginPath();
                roundedRectangle(linFCtx, 1, 1, imageWidth - 2, imageHeight - 2, OUTER_FRAME_CORNER_RADIUS);
                linFCtx.closePath();
                linFCtx.clip();
                grad = new ConicalGradient(fractions, colors);
                grad.fillRect(linFCtx, imageWidth / 2, imageHeight / 2, imageWidth, imageHeight, frameWidth, frameWidth);
                break;
            }

            roundedRectangle(linFCtx, frameWidth - 1, frameWidth - 1, imageWidth - (frameWidth - 1) * 2, imageHeight - (frameWidth - 1) * 2, SUBTRACT_CORNER_RADIUS - 1);
            linFCtx.fillStyle = 'rgb(192, 192, 192)';

            // clip out the center of the frame for transparent backgrounds
            linFCtx.globalCompositeOperation = 'destination-out';
            roundedRectangle(linFCtx, frameWidth, frameWidth, imageWidth - frameWidth * 2, imageHeight - frameWidth * 2, 4);
            linFCtx.fill();

            // cache the buffer
            drawLinearFrameImage.cache[cacheKey] = linFBuffer;
        }
        ctx.drawImage(drawLinearFrameImage.cache[cacheKey], 0, 0);
        return this;
    };
    drawLinearFrameImage.cache = {};

    var drawRadialBackgroundImage = function (ctx, backgroundColor, centerX, centerY, imageWidth, imageHeight) {
        var radBBuffer, radBCtx,
            grad, fractions, colors,
            backgroundOffsetX = imageWidth * 0.831775 / 2,
            mono, textureColor, texture,
            radius, turnRadius, stepSize,
            end, i,
            cacheKey = imageWidth.toString() + imageHeight + backgroundColor.name;

        // check if we have already created and cached this buffer, if not create it
        if (!drawRadialBackgroundImage.cache[cacheKey]) {
            // Setup buffer
            radBBuffer = createBuffer(imageWidth, imageHeight);
            radBCtx = radBBuffer.getContext('2d');

            // Background ellipse
            radBCtx.beginPath();
            radBCtx.arc(centerX, centerY, backgroundOffsetX, 0, TWO_PI, true);
            radBCtx.closePath();

            // If the backgroundColor is a texture fill it with the texture instead of the gradient
            if (backgroundColor.name === 'CARBON' || backgroundColor.name === 'PUNCHED_SHEET' ||
                backgroundColor.name === 'BRUSHED_METAL' || backgroundColor.name === 'BRUSHED_STAINLESS') {

                if (backgroundColor.name === 'CARBON') {
                    radBCtx.fillStyle = radBCtx.createPattern(carbonBuffer, 'repeat');
                    radBCtx.fill();
                }

                if (backgroundColor.name === 'PUNCHED_SHEET') {
                    radBCtx.fillStyle = radBCtx.createPattern(punchedSheetBuffer, 'repeat');
                    radBCtx.fill();
                }

                // Add another inner shadow to make the look more realistic
                grad = radBCtx.createLinearGradient(backgroundOffsetX, 0, imageWidth - backgroundOffsetX, 0);
                grad.addColorStop(0, 'rgba(0, 0, 0, 0.25)');
                grad.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
                grad.addColorStop(1, 'rgba(0, 0, 0, 0.25)');
                radBCtx.fillStyle = grad;
                radBCtx.beginPath();
                radBCtx.arc(centerX, centerY, backgroundOffsetX, 0, TWO_PI, true);
                radBCtx.closePath();
                radBCtx.fill();

                if (backgroundColor.name === 'BRUSHED_METAL' || backgroundColor.name === 'BRUSHED_STAINLESS') {
                    mono = (backgroundColor.name === 'BRUSHED_METAL' ? true : false);
                    textureColor = parseInt(backgroundColor.gradientStop.getHexColor().substr(-6), 16);
                    texture = brushedMetalTexture(textureColor, 5, 0.1, mono, 0.5);
                    radBCtx.fillStyle = radBCtx.createPattern(texture.fill(0, 0, imageWidth, imageHeight), 'no-repeat');
                    radBCtx.fill();
                }
            } else if (backgroundColor.name === 'STAINLESS' || backgroundColor.name === 'TURNED') {
                // Define the fractions of the conical gradient paint
                fractions = [0,
                             0.03,
                             0.10,
                             0.14,
                             0.24,
                             0.33,
                             0.38,
                             0.5,
                             0.62,
                             0.67,
                             0.76,
                             0.81,
                             0.85,
                             0.97,
                             1];

                // Define the colors of the conical gradient paint
                colors = [new RgbaColor('#FDFDFD'),
                          new RgbaColor('#FDFDFD'),
                          new RgbaColor('#B2B2B4'),
                          new RgbaColor('#ACACAE'),
                          new RgbaColor('#FDFDFD'),
                          new RgbaColor('#8E8E8E'),
                          new RgbaColor('#8E8E8E'),
                          new RgbaColor('#FDFDFD'),
                          new RgbaColor('#8E8E8E'),
                          new RgbaColor('#8E8E8E'),
                          new RgbaColor('#FDFDFD'),
                          new RgbaColor('#ACACAE'),
                          new RgbaColor('#B2B2B4'),
                          new RgbaColor('#FDFDFD'),
                          new RgbaColor('#FDFDFD')];

                grad = new ConicalGradient(fractions, colors);
                grad.fillCircle(radBCtx, centerX, centerY, 0, backgroundOffsetX);

                if (backgroundColor.name === 'TURNED') {
                    // Define the turning radius
                    radius = backgroundOffsetX;
                    turnRadius = radius * 0.55;
                    // Step size proporational to radius
                    stepSize = RAD_FACTOR * (500 / radius);
                    // Save before we start
                    radBCtx.save();
                    // restrict the turnings to the desired area
                    radBCtx.beginPath();
                    radBCtx.arc(centerX, centerY, radius, 0, TWO_PI);
                    radBCtx.closePath();
                    radBCtx.clip();
                    // set the style for the turnings
                    radBCtx.lineWidth = 0.5;
                    end = TWO_PI - stepSize * 0.3;
                    // Step the engine round'n'round
                    for (i = 0 ; i < end; i += stepSize) {
                        // draw a 'turn'
                        radBCtx.strokeStyle = 'rgba(240, 240, 255, 0.25)';
                        radBCtx.beginPath();
                        radBCtx.arc(centerX + turnRadius, centerY, turnRadius, 0, TWO_PI);
                        radBCtx.stroke();
                        // rotate the 'piece' a fraction to draw 'shadow'
                        radBCtx.translate(centerX, centerY);
                        radBCtx.rotate(stepSize * 0.3);
                        radBCtx.translate(-centerX, -centerY);
                        // draw a 'turn'
                        radBCtx.strokeStyle = 'rgba(25, 10, 10, 0.1)';
                        radBCtx.beginPath();
                        radBCtx.arc(centerX + turnRadius, centerY, turnRadius, 0, TWO_PI);
                        radBCtx.stroke();
                        // now rotate on to the next 'scribe' position minus the 'fraction'
                        radBCtx.translate(centerX, centerY);
                        radBCtx.rotate(stepSize - stepSize * 0.3);
                        radBCtx.translate(-centerX, -centerY);
                    }
                    // Restore canvas now we are done
                    radBCtx.restore();
                }
            } else {
                grad = radBCtx.createLinearGradient(0, imageWidth * 0.084112, 0, backgroundOffsetX * 2);
                grad.addColorStop(0, backgroundColor.gradientStart.getRgbaColor());
                grad.addColorStop(0.4, backgroundColor.gradientFraction.getRgbaColor());
                grad.addColorStop(1, backgroundColor.gradientStop.getRgbaColor());
                radBCtx.fillStyle = grad;
                radBCtx.fill();
            }
            // Inner shadow
            grad = radBCtx.createRadialGradient(centerX, centerY, 0, centerX, centerY, backgroundOffsetX);
            grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
            grad.addColorStop(0.7, 'rgba(0, 0, 0, 0)');
            grad.addColorStop(0.71, 'rgba(0, 0, 0, 0)');
            grad.addColorStop(0.86, 'rgba(0, 0, 0, 0.03)');
            grad.addColorStop(0.92, 'rgba(0, 0, 0, 0.07)');
            grad.addColorStop(0.97, 'rgba(0, 0, 0, 0.15)');
            grad.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
            radBCtx.fillStyle = grad;

            radBCtx.beginPath();
            radBCtx.arc(centerX, centerY, backgroundOffsetX, 0, TWO_PI, true);
            radBCtx.closePath();
            radBCtx.fill();

            // cache the buffer
            drawRadialBackgroundImage.cache[cacheKey] = radBBuffer;
        }
        ctx.drawImage(drawRadialBackgroundImage.cache[cacheKey], 0, 0);
        return this;
    };
    drawRadialBackgroundImage.cache = {};

    var drawRadialCustomImage = function (ctx, img, centerX, centerY, imageWidth, imageHeight) {
        var drawWidth = imageWidth * 0.831775,
            drawHeight = imageHeight * 0.831775,
            x = (imageWidth - drawWidth) / 2,
            y = (imageHeight - drawHeight) / 2;

        if (img !== null && img.height > 0 && img.width > 0) {
            ctx.save();
            // Set the clipping area
            ctx.beginPath();
            ctx.arc(centerX, centerY, imageWidth * 0.831775 / 2, 0, TWO_PI, true);
            ctx.clip();
            // Add the image
            ctx.drawImage(img, x, y, drawWidth, drawHeight);
            ctx.restore();
        }
        return this;
    };

    var drawLinearBackgroundImage = function (ctx, backgroundColor, imageWidth, imageHeight, vertical) {
        var i, end, grad, fractions, colors,
            frameWidth,
            linBBuffer, linBCtx, linBColor,
            radius,
            turnRadius, centerX, centerY, stepSize,
            mono, textureColor, texture,
            cacheKey = imageWidth.toString() + imageHeight + vertical + backgroundColor.name;

        // check if we have already created and cached this buffer, if not create it
        if (!drawLinearBackgroundImage.cache[cacheKey]) {
            frameWidth = Math.sqrt(imageWidth * imageWidth + imageHeight * imageHeight) * 0.04;
            frameWidth = Math.min(frameWidth, (vertical ? imageWidth : imageHeight) * 0.1);

            // Setup buffer
            linBBuffer = createBuffer(imageWidth, imageHeight);
            linBCtx = linBBuffer.getContext('2d');
            linBColor = backgroundColor;

            roundedRectangle(linBCtx, frameWidth, frameWidth, imageWidth - frameWidth * 2, imageHeight - frameWidth * 2, 4);

            // If the backgroundColor is a texture fill it with the texture instead of the gradient
            if (backgroundColor.name === 'CARBON' || backgroundColor.name === 'PUNCHED_SHEET' ||
                backgroundColor.name === 'STAINLESS' || backgroundColor.name === 'BRUSHED_METAL' ||
                backgroundColor.name === 'BRUSHED_STAINLESS' || backgroundColor.name === 'TURNED') {
                if (backgroundColor.name === 'CARBON') {
                    linBCtx.fillStyle = linBCtx.createPattern(carbonBuffer, 'repeat');
                    linBCtx.fill();
                }

                if (backgroundColor.name === 'PUNCHED_SHEET') {
                    linBCtx.fillStyle = linBCtx.createPattern(punchedSheetBuffer, 'repeat');
                    linBCtx.fill();
                }

                if (backgroundColor.name === 'STAINLESS' || backgroundColor.name === 'TURNED') {
                    // Define the fraction of the conical gradient paint
                    fractions = [0,
                                 0.03,
                                 0.10,
                                 0.14,
                                 0.24,
                                 0.33,
                                 0.38,
                                 0.5,
                                 0.62,
                                 0.67,
                                 0.76,
                                 0.81,
                                 0.85,
                                 0.97,
                                 1];

                    // Define the colors of the conical gradient paint
                    colors = [new RgbaColor('#FDFDFD'),
                              new RgbaColor('#FDFDFD'),
                              new RgbaColor('#B2B2B4'),
                              new RgbaColor('#ACACAE'),
                              new RgbaColor('#FDFDFD'),
                              new RgbaColor('#8E8E8E'),
                              new RgbaColor('#8E8E8E'),
                              new RgbaColor('#FDFDFD'),
                              new RgbaColor('#8E8E8E'),
                              new RgbaColor('#8E8E8E'),
                              new RgbaColor('#FDFDFD'),
                              new RgbaColor('#ACACAE'),
                              new RgbaColor('#B2B2B4'),
                              new RgbaColor('#FDFDFD'),
                              new RgbaColor('#FDFDFD')];
                    grad = new ConicalGradient(fractions, colors);
                    // Set a clip as we will be drawing outside the required area
                    roundedRectangle(linBCtx, frameWidth, frameWidth, imageWidth - frameWidth * 2, imageHeight - frameWidth * 2, 4);
                    linBCtx.clip();
                    grad.fillRect(linBCtx, imageWidth / 2, imageHeight / 2, imageWidth - frameWidth * 2, imageHeight - frameWidth * 2, imageWidth / 2, imageHeight / 2);
                    // Add an additional inner shadow to fade out brightness at the top
                    grad = linBCtx.createLinearGradient(0, frameWidth, 0, imageHeight - frameWidth * 2);
                    grad.addColorStop(0, 'rgba(0, 0, 0, 0.25)');
                    grad.addColorStop(0.1, 'rgba(0, 0, 0, 0.05)');
                    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
                    linBCtx.fillStyle = grad;
                    roundedRectangle(linBCtx, frameWidth, frameWidth, imageWidth - frameWidth * 2, imageHeight - frameWidth * 2, 4);
                    linBCtx.fill();
                    linBCtx.restore();

                    if (backgroundColor.name === 'TURNED') {
                        // Define the turning radius
                        radius = Math.sqrt((imageWidth - frameWidth * 2) * (imageWidth - frameWidth * 2) + (imageHeight - frameWidth * 2) * (imageHeight - frameWidth * 2)) / 2;
                        turnRadius = radius * 0.55;
                        centerX = imageWidth / 2;
                        centerY = imageHeight / 2;
                        // Step size proporational to radius
                        stepSize = TWO_PI / 360 * (400 / radius);

                        // Save before we start
                        linBCtx.save();

                        // Set a clip as we will be drawing outside the required area
                        linBCtx.beginPath();
                        roundedRectangle(linBCtx, frameWidth, frameWidth, imageWidth - frameWidth * 2, imageHeight - frameWidth * 2, 4);
                        linBCtx.clip();

                        // set the style for the turnings
                        linBCtx.lineWidth = 0.5;
                        end = TWO_PI - stepSize * 0.3;
                        // Step the engine round'n'round
                        for (i = 0; i < end; i += stepSize) {
                            // draw a 'turn'
                            linBCtx.strokeStyle = 'rgba(240, 240, 255, 0.25)';
                            linBCtx.beginPath();
                            linBCtx.arc(centerX + turnRadius, centerY, turnRadius, 0, TWO_PI);
                            linBCtx.stroke();
                            // rotate the 'piece'
                            linBCtx.translate(centerX, centerY);
                            linBCtx.rotate(stepSize * 0.3);
                            linBCtx.translate(-centerX, -centerY);
                            // draw a 'turn'
                            linBCtx.strokeStyle = 'rgba(25, 10, 10, 0.1)';
                            linBCtx.beginPath();
                            linBCtx.arc(centerX + turnRadius, centerY, turnRadius, 0, TWO_PI);
                            linBCtx.stroke();
                            linBCtx.translate(centerX, centerY);
                            linBCtx.rotate(-stepSize * 0.3);
                            linBCtx.translate(-centerX, -centerY);

                            // rotate the 'piece'
                            linBCtx.translate(centerX, centerY);
                            linBCtx.rotate(stepSize);
                            linBCtx.translate(-centerX, -centerY);
                        }
                        // Restore canvas now we are done
                        linBCtx.restore();
                    }
                }
                // Add an additional inner shadow to make the look more realistic
                grad = linBCtx.createLinearGradient(frameWidth, frameWidth, imageWidth - frameWidth * 2, imageHeight - frameWidth * 2);
                grad.addColorStop(0, 'rgba(0, 0, 0, 0.25)');
                grad.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
                grad.addColorStop(1, 'rgba(0, 0, 0, 0.25)');
                linBCtx.fillStyle = grad;
                roundedRectangle(linBCtx, frameWidth, frameWidth, imageWidth - frameWidth * 2, imageHeight - frameWidth * 2, 4);
                linBCtx.fill();

                if (backgroundColor.name === 'BRUSHED_METAL' || backgroundColor.name === 'BRUSHED_STAINLESS') {
                    mono = (backgroundColor.name === 'BRUSHED_METAL' ? true : false);
                    textureColor = parseInt(backgroundColor.gradientStop.getHexColor().substr(-6), 16);
                    texture = brushedMetalTexture(textureColor, 5, 0.1, mono, 0.5);
                    linBCtx.fillStyle = linBCtx.createPattern(texture.fill(0, 0, imageWidth, imageHeight), 'no-repeat');
                    linBCtx.fill();
                }
            } else {
                grad = linBCtx.createLinearGradient(0, frameWidth, 0, imageHeight - frameWidth * 2);
                grad.addColorStop(0, backgroundColor.gradientStart.getRgbaColor());
                grad.addColorStop(0.4, backgroundColor.gradientFraction.getRgbaColor());
                grad.addColorStop(1, backgroundColor.gradientStop.getRgbaColor());
                linBCtx.fillStyle = grad;
                linBCtx.fill();
            }
            // Add a simple inner shadow
            colors = [ 'rgba(0, 0, 0, 0.3)',
                       'rgba(0, 0, 0, 0.15)',
                       'rgba(0, 0, 0, 0.07)',
                       'rgba(0, 0, 0, 0.03)',
                       'rgba(0, 0, 0, 0)',
                       'rgba(0, 0, 0, 0)',
                       'rgba(0, 0, 0, 0)'
                     ];

            for (i = 0 ; i < 7 ; i++) {
                roundedRectangle(linBCtx, frameWidth + i, frameWidth + i, imageWidth - frameWidth * 2 - (2 * i), imageHeight - frameWidth * 2 - (2 * i), 4);
                linBCtx.strokeStyle = colors[i];
                linBCtx.stroke();
            }
            // cache the buffer
            drawLinearBackgroundImage.cache[cacheKey] = linBBuffer;
        }
        ctx.drawImage(drawLinearBackgroundImage.cache[cacheKey], 0, 0);
        return this;
    };
    drawLinearBackgroundImage.cache = {};

    var drawRadialForegroundImage = function (ctx, foregroundType, imageWidth, imageHeight, withCenterKnob, knob, style, gaugeType, orientation) {
        var radFgBuffer, radFgCtx,
            knobSize = Math.ceil(imageHeight * 0.084112),
            knobX = imageWidth * 0.5 - knobSize / 2,
            knobY = imageHeight * 0.5 - knobSize / 2,
            shadowOffset = imageWidth * 0.008,
            gradHighlight, gradHighlight2,
            cacheKey = foregroundType.type + imageWidth + imageHeight + withCenterKnob + (knob !== undefined ? knob.type : '-') +
                       (style !== undefined ? style.style : '-') + (orientation !== undefined ? orientation.type : '-');

        // check if we have already created and cached this buffer, if so return it and exit
        if (!drawRadialForegroundImage.cache[cacheKey]) {
            // Setup buffer
            radFgBuffer = createBuffer(imageWidth, imageHeight);
            radFgCtx = radFgBuffer.getContext('2d');

            // center post
            if (withCenterKnob) {
                // Set the pointer shadow params
                radFgCtx.shadowColor = 'rgba(0, 0, 0, 0.8)';
                radFgCtx.shadowOffsetX = radFgCtx.shadowOffsetY = shadowOffset;
                radFgCtx.shadowBlur = shadowOffset * 2;

                if (gaugeType === steelseries.GaugeType.TYPE5) {
                    if (steelseries.Orientation.WEST === orientation) {
                        knobX = imageWidth * 0.733644 - knobSize / 2;
                        radFgCtx.drawImage(createKnobImage(knobSize, knob, style), knobX, knobY);
                    } else if (steelseries.Orientation.EAST === orientation) {
                        knobX = imageWidth * (1 - 0.733644) - knobSize / 2;
                        radFgCtx.drawImage(createKnobImage(knobSize, knob, style), knobX, knobY);
                    } else {
                        knobY = imageHeight * 0.733644 - knobSize / 2;
                        radFgCtx.drawImage(createKnobImage(knobSize, knob, style), knobX, imageHeight * 0.6857);
                    }
                } else {
                    radFgCtx.drawImage(createKnobImage(knobSize, knob, style), knobX, knobY);
                }
                // Undo shadow drawing
                radFgCtx.shadowOffsetX = radFgCtx.shadowOffsetY = 0;
                radFgCtx.shadowBlur = 0;
            }

            // highlight
            switch (foregroundType.type) {
            case 'type2':
                radFgCtx.beginPath();
                radFgCtx.moveTo(imageWidth * 0.135514, imageHeight * 0.696261);
                radFgCtx.bezierCurveTo(imageWidth * 0.214953, imageHeight * 0.588785, imageWidth * 0.317757, imageHeight * 0.5, imageWidth * 0.462616, imageHeight * 0.425233);
                radFgCtx.bezierCurveTo(imageWidth * 0.612149, imageHeight * 0.345794, imageWidth * 0.733644, imageHeight * 0.317757, imageWidth * 0.873831, imageHeight * 0.322429);
                radFgCtx.bezierCurveTo(imageWidth * 0.766355, imageHeight * 0.112149, imageWidth * 0.528037, imageHeight * 0.023364, imageWidth * 0.313084, imageHeight * 0.130841);
                radFgCtx.bezierCurveTo(imageWidth * 0.098130, imageHeight * 0.238317, imageWidth * 0.028037, imageHeight * 0.485981, imageWidth * 0.135514, imageHeight * 0.696261);
                radFgCtx.closePath();
                gradHighlight = radFgCtx.createLinearGradient(0.313084 * imageWidth, 0.135514 * imageHeight, 0.495528 * imageWidth, 0.493582 * imageHeight);
                gradHighlight.addColorStop(0, 'rgba(255, 255, 255, 0.275)');
                gradHighlight.addColorStop(1, 'rgba(255, 255, 255, 0.015)');
                break;

            case 'type3':
                radFgCtx.beginPath();
                radFgCtx.moveTo(imageWidth * 0.084112, imageHeight * 0.509345);
                radFgCtx.bezierCurveTo(imageWidth * 0.210280, imageHeight * 0.556074, imageWidth * 0.462616, imageHeight * 0.560747, imageWidth * 0.5, imageHeight * 0.560747);
                radFgCtx.bezierCurveTo(imageWidth * 0.537383, imageHeight * 0.560747, imageWidth * 0.794392, imageHeight * 0.560747, imageWidth * 0.915887, imageHeight * 0.509345);
                radFgCtx.bezierCurveTo(imageWidth * 0.915887, imageHeight * 0.275700, imageWidth * 0.738317, imageHeight * 0.084112, imageWidth * 0.5, imageHeight * 0.084112);
                radFgCtx.bezierCurveTo(imageWidth * 0.261682, imageHeight * 0.084112, imageWidth * 0.084112, imageHeight * 0.275700, imageWidth * 0.084112, imageHeight * 0.509345);
                radFgCtx.closePath();
                gradHighlight = radFgCtx.createLinearGradient(0, 0.093457 * imageHeight, 0, 0.556073 * imageHeight);
                gradHighlight.addColorStop(0, 'rgba(255, 255, 255, 0.275)');
                gradHighlight.addColorStop(1, 'rgba(255, 255, 255, 0.015)');
                break;

            case 'type4':
                radFgCtx.beginPath();
                radFgCtx.moveTo(imageWidth * 0.677570, imageHeight * 0.242990);
                radFgCtx.bezierCurveTo(imageWidth * 0.771028, imageHeight * 0.308411, imageWidth * 0.822429, imageHeight * 0.411214, imageWidth * 0.813084, imageHeight * 0.528037);
                radFgCtx.bezierCurveTo(imageWidth * 0.799065, imageHeight * 0.654205, imageWidth * 0.719626, imageHeight * 0.757009, imageWidth * 0.593457, imageHeight * 0.799065);
                radFgCtx.bezierCurveTo(imageWidth * 0.485981, imageHeight * 0.831775, imageWidth * 0.369158, imageHeight * 0.808411, imageWidth * 0.285046, imageHeight * 0.728971);
                radFgCtx.bezierCurveTo(imageWidth * 0.275700, imageHeight * 0.719626, imageWidth * 0.252336, imageHeight * 0.714953, imageWidth * 0.233644, imageHeight * 0.728971);
                radFgCtx.bezierCurveTo(imageWidth * 0.214953, imageHeight * 0.747663, imageWidth * 0.219626, imageHeight * 0.771028, imageWidth * 0.228971, imageHeight * 0.775700);
                radFgCtx.bezierCurveTo(imageWidth * 0.331775, imageHeight * 0.878504, imageWidth * 0.476635, imageHeight * 0.915887, imageWidth * 0.616822, imageHeight * 0.869158);
                radFgCtx.bezierCurveTo(imageWidth * 0.771028, imageHeight * 0.822429, imageWidth * 0.873831, imageHeight * 0.691588, imageWidth * 0.887850, imageHeight * 0.532710);
                radFgCtx.bezierCurveTo(imageWidth * 0.897196, imageHeight * 0.387850, imageWidth * 0.836448, imageHeight * 0.257009, imageWidth * 0.719626, imageHeight * 0.182242);
                radFgCtx.bezierCurveTo(imageWidth * 0.705607, imageHeight * 0.172897, imageWidth * 0.682242, imageHeight * 0.163551, imageWidth * 0.663551, imageHeight * 0.186915);
                radFgCtx.bezierCurveTo(imageWidth * 0.654205, imageHeight * 0.205607, imageWidth * 0.668224, imageHeight * 0.238317, imageWidth * 0.677570, imageHeight * 0.242990);
                radFgCtx.closePath();
                gradHighlight = radFgCtx.createRadialGradient((0.5) * imageWidth, ((0.5) * imageHeight), 0, ((0.5) * imageWidth), ((0.5) * imageHeight), 0.387850 * imageWidth);
                gradHighlight.addColorStop(0, 'rgba(255, 255, 255, 0)');
                gradHighlight.addColorStop(0.82, 'rgba(255, 255, 255, 0)');
                gradHighlight.addColorStop(0.83, 'rgba(255, 255, 255, 0)');
                gradHighlight.addColorStop(1, 'rgba(255, 255, 255, 0.15)');

                radFgCtx.beginPath();
                radFgCtx.moveTo(imageWidth * 0.261682, imageHeight * 0.224299);
                radFgCtx.bezierCurveTo(imageWidth * 0.285046, imageHeight * 0.238317, imageWidth * 0.252336, imageHeight * 0.285046, imageWidth * 0.242990, imageHeight * 0.317757);
                radFgCtx.bezierCurveTo(imageWidth * 0.242990, imageHeight * 0.350467, imageWidth * 0.271028, imageHeight * 0.383177, imageWidth * 0.271028, imageHeight * 0.397196);
                radFgCtx.bezierCurveTo(imageWidth * 0.275700, imageHeight * 0.415887, imageWidth * 0.261682, imageHeight * 0.457943, imageWidth * 0.238317, imageHeight * 0.509345);
                radFgCtx.bezierCurveTo(imageWidth * 0.224299, imageHeight * 0.542056, imageWidth * 0.177570, imageHeight * 0.612149, imageWidth * 0.158878, imageHeight * 0.612149);
                radFgCtx.bezierCurveTo(imageWidth * 0.144859, imageHeight * 0.612149, imageWidth * 0.088785, imageHeight * 0.546728, imageWidth * 0.130841, imageHeight * 0.369158);
                radFgCtx.bezierCurveTo(imageWidth * 0.140186, imageHeight * 0.336448, imageWidth * 0.214953, imageHeight * 0.200934, imageWidth * 0.261682, imageHeight * 0.224299);
                radFgCtx.closePath();
                gradHighlight2 = radFgCtx.createLinearGradient(0.130841 * imageWidth, 0.369158 * imageHeight, 0.273839 * imageWidth, 0.412877 * imageHeight);
                gradHighlight2.addColorStop(0, 'rgba(255, 255, 255, 0.275)');
                gradHighlight2.addColorStop(1, 'rgba(255, 255, 255, 0.015)');
                radFgCtx.fillStyle = gradHighlight2;
                radFgCtx.fill();
                break;

            case 'type5':
                radFgCtx.beginPath();
                radFgCtx.moveTo(imageWidth * 0.084112, imageHeight * 0.5);
                radFgCtx.bezierCurveTo(imageWidth * 0.084112, imageHeight * 0.271028, imageWidth * 0.271028, imageHeight * 0.084112, imageWidth * 0.5, imageHeight * 0.084112);
                radFgCtx.bezierCurveTo(imageWidth * 0.700934, imageHeight * 0.084112, imageWidth * 0.864485, imageHeight * 0.224299, imageWidth * 0.906542, imageHeight * 0.411214);
                radFgCtx.bezierCurveTo(imageWidth * 0.911214, imageHeight * 0.439252, imageWidth * 0.911214, imageHeight * 0.518691, imageWidth * 0.845794, imageHeight * 0.537383);
                radFgCtx.bezierCurveTo(imageWidth * 0.794392, imageHeight * 0.546728, imageWidth * 0.551401, imageHeight * 0.411214, imageWidth * 0.392523, imageHeight * 0.457943);
                radFgCtx.bezierCurveTo(imageWidth * 0.168224, imageHeight * 0.509345, imageWidth * 0.135514, imageHeight * 0.775700, imageWidth * 0.093457, imageHeight * 0.593457);
                radFgCtx.bezierCurveTo(imageWidth * 0.088785, imageHeight * 0.560747, imageWidth * 0.084112, imageHeight * 0.532710, imageWidth * 0.084112, imageHeight * 0.5);
                radFgCtx.closePath();
                gradHighlight = radFgCtx.createLinearGradient(0, 0.084112 * imageHeight, 0, 0.644859 * imageHeight);
                gradHighlight.addColorStop(0, 'rgba(255, 255, 255, 0.275)');
                gradHighlight.addColorStop(1, 'rgba(255, 255, 255, 0.015)');
                break;

            case 'type1':
            /* falls through */
            default:
                radFgCtx.beginPath();
                radFgCtx.moveTo(imageWidth * 0.084112, imageHeight * 0.509345);
                radFgCtx.bezierCurveTo(imageWidth * 0.205607, imageHeight * 0.448598, imageWidth * 0.336448, imageHeight * 0.415887, imageWidth * 0.5, imageHeight * 0.415887);
                radFgCtx.bezierCurveTo(imageWidth * 0.672897, imageHeight * 0.415887, imageWidth * 0.789719, imageHeight * 0.443925, imageWidth * 0.915887, imageHeight * 0.509345);
                radFgCtx.bezierCurveTo(imageWidth * 0.915887, imageHeight * 0.275700, imageWidth * 0.738317, imageHeight * 0.084112, imageWidth * 0.5, imageHeight * 0.084112);
                radFgCtx.bezierCurveTo(imageWidth * 0.261682, imageHeight * 0.084112, imageWidth * 0.084112, imageHeight * 0.275700, imageWidth * 0.084112, imageHeight * 0.509345);
                radFgCtx.closePath();
                gradHighlight = radFgCtx.createLinearGradient(0, 0.088785 * imageHeight, 0, 0.490654 * imageHeight);
                gradHighlight.addColorStop(0, 'rgba(255, 255, 255, 0.275)');
                gradHighlight.addColorStop(1, 'rgba(255, 255, 255, 0.015)');
                break;
            }
            radFgCtx.fillStyle = gradHighlight;
            radFgCtx.fill();

            // cache the buffer
            drawRadialForegroundImage.cache[cacheKey] = radFgBuffer;
        }
        ctx.drawImage(drawRadialForegroundImage.cache[cacheKey], 0, 0);
        return this;
    };
    drawRadialForegroundImage.cache = {};

    var drawLinearForegroundImage = function (ctx, imageWidth, imageHeight, vertical) {
        var linFgBuffer, linFgCtx,
            foregroundGradient,
            frameWidth, fgOffset, fgOffset2,
            cacheKey = imageWidth.toString() + imageHeight + vertical;

        // check if we have already created and cached this buffer, if not create it
        if (!drawLinearForegroundImage.cache[cacheKey]) {
            // Setup buffer
            linFgBuffer = createBuffer(imageWidth, imageHeight);
            linFgCtx = linFgBuffer.getContext('2d');

            frameWidth = Math.sqrt(imageWidth * imageWidth + imageHeight * imageHeight) * 0.04;
            frameWidth = Math.min(frameWidth, (vertical ? imageWidth : imageHeight) * 0.1);
            fgOffset = frameWidth * 1.3;
            fgOffset2 = fgOffset * 1.33;

            linFgCtx.beginPath();
            linFgCtx.moveTo(fgOffset, imageHeight - fgOffset);
            linFgCtx.lineTo(imageWidth - fgOffset, imageHeight - fgOffset);
            linFgCtx.bezierCurveTo(imageWidth - fgOffset, imageHeight - fgOffset, imageWidth - fgOffset2, imageHeight * 0.7, imageWidth - fgOffset2, imageHeight * 0.5);
            linFgCtx.bezierCurveTo(imageWidth - fgOffset2, fgOffset2, imageWidth - fgOffset, fgOffset, imageWidth - frameWidth, fgOffset);
            linFgCtx.lineTo(fgOffset, fgOffset);
            linFgCtx.bezierCurveTo(fgOffset, fgOffset, fgOffset2, imageHeight * 0.285714, fgOffset2, imageHeight * 0.5);
            linFgCtx.bezierCurveTo(fgOffset2, imageHeight * 0.7, fgOffset, imageHeight - fgOffset, frameWidth, imageHeight - fgOffset);
            linFgCtx.closePath();

            foregroundGradient = linFgCtx.createLinearGradient(0, (imageHeight - frameWidth), 0, frameWidth);
            foregroundGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
            foregroundGradient.addColorStop(0.06, 'rgba(255, 255, 255, 0)');
            foregroundGradient.addColorStop(0.07, 'rgba(255, 255, 255, 0)');
            foregroundGradient.addColorStop(0.12, 'rgba(255, 255, 255, 0)');
            foregroundGradient.addColorStop(0.17, 'rgba(255, 255, 255, 0.013546)');
            foregroundGradient.addColorStop(0.1701, 'rgba(255, 255, 255, 0)');
            foregroundGradient.addColorStop(0.79, 'rgba(255, 255, 255, 0)');
            foregroundGradient.addColorStop(0.8, 'rgba(255, 255, 255, 0)');
            foregroundGradient.addColorStop(0.84, 'rgba(255, 255, 255, 0.082217)');
            foregroundGradient.addColorStop(0.93, 'rgba(255, 255, 255, 0.288702)');
            foregroundGradient.addColorStop(0.94, 'rgba(255, 255, 255, 0.298039)');
            foregroundGradient.addColorStop(0.96, 'rgba(255, 255, 255, 0.119213)');
            foregroundGradient.addColorStop(0.97, 'rgba(255, 255, 255, 0)');
            foregroundGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            linFgCtx.fillStyle = foregroundGradient;
            linFgCtx.fill();

            // cache the buffer
            drawLinearForegroundImage.cache[cacheKey] = linFgBuffer;
        }
        ctx.drawImage(drawLinearForegroundImage.cache[cacheKey], 0, 0);
        return this;
    };
    drawLinearForegroundImage.cache = {};

    var createKnobImage = function (size, knob, style) {
        var knobBuffer, knobCtx,
            maxPostCenterX = size / 2,
            maxPostCenterY = size / 2,
            grad,
            cacheKey = size.toString() + knob.type + style.style;

        // check if we have already created and cached this buffer, if not create it
        if (!createKnobImage.cache[cacheKey]) {
            knobBuffer = createBuffer(size * 1.18889, size * 1.18889);
            knobCtx = knobBuffer.getContext('2d');

            switch (knob.type) {
            case 'metalKnob':
                // METALKNOB_FRAME
                knobCtx.beginPath();
                knobCtx.moveTo(0, size * 0.5);
                knobCtx.bezierCurveTo(0, size * 0.222222, size * 0.222222, 0, size * 0.5, 0);
                knobCtx.bezierCurveTo(size * 0.777777, 0, size, size * 0.222222, size, size * 0.5);
                knobCtx.bezierCurveTo(size, size * 0.777777, size * 0.777777, size, size * 0.5, size);
                knobCtx.bezierCurveTo(size * 0.222222, size, 0, size * 0.777777, 0, size * 0.5);
                knobCtx.closePath();
                grad = knobCtx.createLinearGradient(0, 0, 0, size);
                grad.addColorStop(0, 'rgb(92, 95, 101)');
                grad.addColorStop(0.47, 'rgb(46, 49, 53)');
                grad.addColorStop(1, 'rgb(22, 23, 26)');
                knobCtx.fillStyle = grad;
                knobCtx.fill();

                // METALKNOB_MAIN
                knobCtx.beginPath();
                knobCtx.moveTo(size * 0.055555, size * 0.5);
                knobCtx.bezierCurveTo(size * 0.055555, size * 0.277777, size * 0.277777, size * 0.055555, size * 0.5, size * 0.055555);
                knobCtx.bezierCurveTo(size * 0.722222, size * 0.055555, size * 0.944444, size * 0.277777, size * 0.944444, size * 0.5);
                knobCtx.bezierCurveTo(size * 0.944444, size * 0.722222, size * 0.722222, size * 0.944444, size * 0.5, size * 0.944444);
                knobCtx.bezierCurveTo(size * 0.277777, size * 0.944444, size * 0.055555, size * 0.722222, size * 0.055555, size * 0.5);
                knobCtx.closePath();
                grad = knobCtx.createLinearGradient(0, 0.055555 * size, 0, 0.944443 * size);
                switch (style.style) {
                case 'black':
                    grad.addColorStop(0, 'rgb(43, 42, 47)');
                    grad.addColorStop(1, 'rgb(26, 27, 32)');
                    break;

                case 'brass':
                    grad.addColorStop(0, 'rgb(150, 110, 54)');
                    grad.addColorStop(1, 'rgb(124, 95, 61)');
                    break;

                case 'silver':
                /* falls through */
                default:
                    grad.addColorStop(0, 'rgb(204, 204, 204)');
                    grad.addColorStop(1, 'rgb(87, 92, 98)');
                    break;
                }
                knobCtx.fillStyle = grad;
                knobCtx.fill();

                // METALKNOB_LOWERHL
                knobCtx.beginPath();
                knobCtx.moveTo(size * 0.777777, size * 0.833333);
                knobCtx.bezierCurveTo(size * 0.722222, size * 0.722222, size * 0.611111, size * 0.666666, size * 0.5, size * 0.666666);
                knobCtx.bezierCurveTo(size * 0.388888, size * 0.666666, size * 0.277777, size * 0.722222, size * 0.222222, size * 0.833333);
                knobCtx.bezierCurveTo(size * 0.277777, size * 0.888888, size * 0.388888, size * 0.944444, size * 0.5, size * 0.944444);
                knobCtx.bezierCurveTo(size * 0.611111, size * 0.944444, size * 0.722222, size * 0.888888, size * 0.777777, size * 0.833333);
                knobCtx.closePath();
                grad = knobCtx.createRadialGradient((0.555555) * size, ((0.944444) * size), 0, ((0.555555) * size), ((0.944444) * size), 0.388888 * size);
                grad.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
                grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
                knobCtx.fillStyle = grad;
                knobCtx.fill();

                // METALKNOB_UPPERHL
                knobCtx.beginPath();
                knobCtx.moveTo(size * 0.944444, size * 0.277777);
                knobCtx.bezierCurveTo(size * 0.833333, size * 0.111111, size * 0.666666, 0, size * 0.5, 0);
                knobCtx.bezierCurveTo(size * 0.333333, 0, size * 0.166666, size * 0.111111, size * 0.055555, size * 0.277777);
                knobCtx.bezierCurveTo(size * 0.166666, size * 0.333333, size * 0.333333, size * 0.388888, size * 0.5, size * 0.388888);
                knobCtx.bezierCurveTo(size * 0.666666, size * 0.388888, size * 0.833333, size * 0.333333, size * 0.944444, size * 0.277777);
                knobCtx.closePath();
                grad = knobCtx.createRadialGradient(0.5 * size, 0, 0, ((0.5) * size), 0, 0.583333 * size);
                grad.addColorStop(0, 'rgba(255, 255, 255, 0.749019)');
                grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
                knobCtx.fillStyle = grad;
                knobCtx.fill();

                // METALKNOB_INNERFRAME
                knobCtx.beginPath();
                knobCtx.moveTo(size * 0.277777, size * 0.555555);
                knobCtx.bezierCurveTo(size * 0.277777, size * 0.388888, size * 0.388888, size * 0.277777, size * 0.5, size * 0.277777);
                knobCtx.bezierCurveTo(size * 0.611111, size * 0.277777, size * 0.777777, size * 0.388888, size * 0.777777, size * 0.555555);
                knobCtx.bezierCurveTo(size * 0.777777, size * 0.666666, size * 0.611111, size * 0.777777, size * 0.5, size * 0.777777);
                knobCtx.bezierCurveTo(size * 0.388888, size * 0.777777, size * 0.277777, size * 0.666666, size * 0.277777, size * 0.555555);
                knobCtx.closePath();
                grad = knobCtx.createLinearGradient(0, 0.277777 * size, 0, 0.722221 * size);
                grad.addColorStop(0, '#000000');
                grad.addColorStop(1, 'rgb(204, 204, 204)');
                knobCtx.fillStyle = grad;
                knobCtx.fill();

                // METALKNOB_INNERBACKGROUND
                knobCtx.beginPath();
                knobCtx.moveTo(size * 0.333333, size * 0.555555);
                knobCtx.bezierCurveTo(size * 0.333333, size * 0.444444, size * 0.388888, size * 0.333333, size * 0.5, size * 0.333333);
                knobCtx.bezierCurveTo(size * 0.611111, size * 0.333333, size * 0.722222, size * 0.444444, size * 0.722222, size * 0.555555);
                knobCtx.bezierCurveTo(size * 0.722222, size * 0.611111, size * 0.611111, size * 0.722222, size * 0.5, size * 0.722222);
                knobCtx.bezierCurveTo(size * 0.388888, size * 0.722222, size * 0.333333, size * 0.611111, size * 0.333333, size * 0.555555);
                knobCtx.closePath();
                grad = knobCtx.createLinearGradient(0, 0.333333 * size, 0, 0.666666 * size);
                grad.addColorStop(0, 'rgb(10, 9, 1)');
                grad.addColorStop(1, 'rgb(42, 41, 37)');
                knobCtx.fillStyle = grad;
                knobCtx.fill();
                break;

            case 'standardKnob':
                grad = knobCtx.createLinearGradient(0, 0, 0, size);
                grad.addColorStop(0, 'rgb(180, 180, 180)');
                grad.addColorStop(0.46, 'rgb(63, 63, 63)');
                grad.addColorStop(1, 'rgb(40, 40, 40)');
                knobCtx.fillStyle = grad;
                knobCtx.beginPath();
                knobCtx.arc(maxPostCenterX, maxPostCenterY, size / 2, 0, TWO_PI, true);
                knobCtx.closePath();
                knobCtx.fill();
                grad = knobCtx.createLinearGradient(0, size - size * 0.77, 0, size - size * 0.77 + size * 0.77);
                switch (style.style) {
                case 'black':
                    grad.addColorStop(0, 'rgb(191, 191, 191)');
                    grad.addColorStop(0.5, 'rgb(45, 44, 49)');
                    grad.addColorStop(1, 'rgb(125, 126, 128)');
                    break;

                case 'brass':
                    grad.addColorStop(0, 'rgb(223, 208, 174)');
                    grad.addColorStop(0.5, 'rgb(123, 95, 63)');
                    grad.addColorStop(1, 'rgb(207, 190, 157)');
                    break;

                case 'silver':
                /* falls through */
                default:
                    grad.addColorStop(0, 'rgb(215, 215, 215)');
                    grad.addColorStop(0.5, 'rgb(116, 116, 116)');
                    grad.addColorStop(1, 'rgb(215, 215, 215)');
                    break;
                }
                knobCtx.fillStyle = grad;
                knobCtx.beginPath();
                knobCtx.arc(maxPostCenterX, maxPostCenterY, size * 0.77 / 2, 0, TWO_PI, true);
                knobCtx.closePath();
                knobCtx.fill();

                grad = knobCtx.createRadialGradient(maxPostCenterX, maxPostCenterY, 0, maxPostCenterX, maxPostCenterY, size * 0.77 / 2);
                grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
                grad.addColorStop(0.75, 'rgba(0, 0, 0, 0)');
                grad.addColorStop(0.76, 'rgba(0, 0, 0, 0.01)');
                grad.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
                knobCtx.fillStyle = grad;
                knobCtx.beginPath();
                knobCtx.arc(maxPostCenterX, maxPostCenterY, size * 0.77 / 2, 0, TWO_PI, true);
                knobCtx.closePath();
                knobCtx.fill();
                break;
            }

            // cache the buffer
            createKnobImage.cache[cacheKey] = knobBuffer;
        }
        return createKnobImage.cache[cacheKey];
    };
    createKnobImage.cache = {};

    var createLedImage = function (size, state, ledColor) {
        var ledBuffer, ledCtx,
            ledCenterX = size / 2,
            ledCenterY = size / 2,
            grad,
            cacheKey = size.toString() + state + ledColor.outerColor_ON;

        // check if we have already created and cached this buffer, if not create it
        if (!createLedImage.cache[cacheKey]) {
            ledBuffer = createBuffer(size, size);
            ledCtx = ledBuffer.getContext('2d');

            switch (state) {
            case 0: // LED OFF
                // OFF Gradient
                grad = ledCtx.createRadialGradient(ledCenterX, ledCenterY, 0, ledCenterX, ledCenterY, size * 0.5 / 2);
                grad.addColorStop(0, ledColor.innerColor1_OFF);
                grad.addColorStop(0.2, ledColor.innerColor2_OFF);
                grad.addColorStop(1, ledColor.outerColor_OFF);
                ledCtx.fillStyle = grad;

                ledCtx.beginPath();
                ledCtx.arc(ledCenterX, ledCenterY, size * 0.5 / 2, 0, TWO_PI, true);
                ledCtx.closePath();
                ledCtx.fill();

                // InnerShadow
                grad = ledCtx.createRadialGradient(ledCenterX, ledCenterY, 0, ledCenterX, ledCenterY, size * 0.5 / 2);
                grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
                grad.addColorStop(0.8, 'rgba(0, 0, 0, 0)');
                grad.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
                ledCtx.fillStyle = grad;

                ledCtx.beginPath();
                ledCtx.arc(ledCenterX, ledCenterY, size * 0.5 / 2, 0, TWO_PI, true);
                ledCtx.closePath();
                ledCtx.fill();

                // LightReflex
                grad = ledCtx.createLinearGradient(0, 0.35 * size, 0, 0.35 * size + 0.15 * size);
                grad.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
                grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
                ledCtx.fillStyle = grad;

                ledCtx.beginPath();
                ledCtx.arc(ledCenterX, 0.35 * size + 0.2 * size / 2, size * 0.2, 0, TWO_PI, true);
                ledCtx.closePath();
                ledCtx.fill();
                break;

            case 1: // LED ON
                // ON Gradient
                grad = ledCtx.createRadialGradient(ledCenterX, ledCenterY, 0, ledCenterX, ledCenterY, size * 0.5 / 2);
                grad.addColorStop(0, ledColor.innerColor1_ON);
                grad.addColorStop(0.2, ledColor.innerColor2_ON);
                grad.addColorStop(1, ledColor.outerColor_ON);
                ledCtx.fillStyle = grad;

                ledCtx.beginPath();
                ledCtx.arc(ledCenterX, ledCenterY, size * 0.5 / 2, 0, TWO_PI, true);
                ledCtx.closePath();
                ledCtx.fill();

                // InnerShadow
                grad = ledCtx.createRadialGradient(ledCenterX, ledCenterY, 0, ledCenterX, ledCenterY, size * 0.5 / 2);
                grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
                grad.addColorStop(0.8, 'rgba(0, 0, 0, 0)');
                grad.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
                ledCtx.fillStyle = grad;

                ledCtx.beginPath();
                ledCtx.arc(ledCenterX, ledCenterY, size * 0.5 / 2, 0, TWO_PI, true);
                ledCtx.closePath();
                ledCtx.fill();

                // LightReflex
                grad = ledCtx.createLinearGradient(0, 0.35 * size, 0, 0.35 * size + 0.15 * size);
                grad.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
                grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
                ledCtx.fillStyle = grad;

                ledCtx.beginPath();
                ledCtx.arc(ledCenterX, 0.35 * size + 0.2 * size / 2, size * 0.2, 0, TWO_PI, true);
                ledCtx.closePath();
                ledCtx.fill();

                // Corona
                grad = ledCtx.createRadialGradient(ledCenterX, ledCenterY, 0, ledCenterX, ledCenterY, size / 2);
                grad.addColorStop(0, setAlpha(ledColor.coronaColor, 0).color);
                grad.addColorStop(0.6, setAlpha(ledColor.coronaColor, 0.4).color);
                grad.addColorStop(0.7, setAlpha(ledColor.coronaColor, 0.25).color);
                grad.addColorStop(0.8, setAlpha(ledColor.coronaColor, 0.15).color);
                grad.addColorStop(0.85, setAlpha(ledColor.coronaColor, 0.05).color);
                grad.addColorStop(1, setAlpha(ledColor.coronaColor, 0).color);
                ledCtx.fillStyle = grad;

                ledCtx.beginPath();
                ledCtx.arc(ledCenterX, ledCenterY, size / 2, 0, TWO_PI, true);
                ledCtx.closePath();
                ledCtx.fill();
                break;
            }
            // cache the buffer
            createLedImage.cache[cacheKey] = ledBuffer;
        }
        return createLedImage.cache[cacheKey];
    };
    createLedImage.cache = {};

    var createLcdBackgroundImage = function (width, height, lcdColor) {
        var lcdBuffer, lcdCtx,
            xB = 0,
            yB = 0,
            wB = width,
            hB = height,
            rB = Math.min(width, height) * 0.095,
            grad,
            xF = 1,
            yF = 1,
            wF = width - 2,
            hF = height - 2,
            rF = rB - 1,
            cacheKey = width.toString() + height + JSON.stringify(lcdColor);

        // check if we have already created and cached this buffer, if not create it
        if (!createLcdBackgroundImage.cache[cacheKey]) {
            lcdBuffer = createBuffer(width, height);
            lcdCtx = lcdBuffer.getContext('2d');
            // background
            grad = lcdCtx.createLinearGradient(0, yB, 0, yB + hB);
            grad.addColorStop(0, '#4c4c4c');
            grad.addColorStop(0.08, '#666666');
            grad.addColorStop(0.92, '#666666');
            grad.addColorStop(1, '#e6e6e6');
            lcdCtx.fillStyle = grad;
            roundedRectangle(lcdCtx, xB, yB, wB, hB, rB);
            lcdCtx.fill();

            // foreground
            grad = lcdCtx.createLinearGradient(0, yF, 0, yF + hF);
            grad.addColorStop(0, lcdColor.gradientStartColor);
            grad.addColorStop(0.03, lcdColor.gradientFraction1Color);
            grad.addColorStop(0.49, lcdColor.gradientFraction2Color);
            grad.addColorStop(0.5, lcdColor.gradientFraction3Color);
            grad.addColorStop(1, lcdColor.gradientStopColor);
            lcdCtx.fillStyle = grad;
            roundedRectangle(lcdCtx, xF, yF, wF, hF, rF);
            lcdCtx.fill();
            // cache the buffer
            createLcdBackgroundImage.cache[cacheKey] = lcdBuffer;
        }
        return createLcdBackgroundImage.cache[cacheKey];
    };
    createLcdBackgroundImage.cache = {};

    var createMeasuredValueImage = function (size, indicatorColor, radial, vertical) {
        var indicatorBuffer, indicatorCtx,
            cacheKey = size.toString() + indicatorColor + radial + vertical;

        // check if we have already created and cached this buffer, if so return it and exit
        if (!createMeasuredValueImage.cache[cacheKey]) {
            indicatorBuffer = doc.createElement('canvas');
            indicatorCtx = indicatorBuffer.getContext('2d');
            indicatorBuffer.width = size;
            indicatorBuffer.height = size;
            indicatorCtx.fillStyle = indicatorColor;
            if (radial) {
                indicatorCtx.beginPath();
                indicatorCtx.moveTo(size * 0.5, size);
                indicatorCtx.lineTo(0, 0);
                indicatorCtx.lineTo(size, 0);
                indicatorCtx.closePath();
                indicatorCtx.fill();
            } else {
                if (vertical) {
                    indicatorCtx.beginPath();
                    indicatorCtx.moveTo(size, size * 0.5);
                    indicatorCtx.lineTo(0, 0);
                    indicatorCtx.lineTo(0, size);
                    indicatorCtx.closePath();
                    indicatorCtx.fill();
                } else {
                    indicatorCtx.beginPath();
                    indicatorCtx.moveTo(size * 0.5, 0);
                    indicatorCtx.lineTo(size, size);
                    indicatorCtx.lineTo(0, size);
                    indicatorCtx.closePath();
                    indicatorCtx.fill();
                }
            }
            // cache the buffer
            createMeasuredValueImage.cache[cacheKey] = indicatorBuffer;
        }
        return createMeasuredValueImage.cache[cacheKey];
    };
    createMeasuredValueImage.cache = {};

    var createTrendIndicator = function (width, onSection, colors) {
        var height = width * 2,
            trendBuffer, trendCtx,
            fill,
            cacheKey = onSection.state + width + JSON.stringify(colors),

            drawUpArrow = function () {
                // draw up arrow (red)
                var ledColor = colors[0];

                if (onSection.state === 'up') {
                    fill = trendCtx.createRadialGradient(0.5 * width, 0.2 * height, 0, 0.5 * width, 0.2 * height, 0.5 * width);
                    fill.addColorStop(0, ledColor.innerColor1_ON);
                    fill.addColorStop(0.2, ledColor.innerColor2_ON);
                    fill.addColorStop(1, ledColor.outerColor_ON);
                } else {
                    fill = trendCtx.createLinearGradient(0, 0, 0, 0.5 * height);
                    fill.addColorStop(0, '#323232');
                    fill.addColorStop(1, '#5c5c5c');
                }
                trendCtx.fillStyle = fill;
                trendCtx.beginPath();
                trendCtx.moveTo(0.5 * width, 0);
                trendCtx.lineTo(width, 0.2 * height);
                trendCtx.lineTo(0.752 * width, 0.2 * height);
                trendCtx.lineTo(0.752 * width, 0.37 * height);
                trendCtx.lineTo(0.252 * width, 0.37 * height);
                trendCtx.lineTo(0.252 * width, 0.2 * height);
                trendCtx.lineTo(0, 0.2 * height);
                trendCtx.closePath();
                trendCtx.fill();
                if (onSection.state !== 'up') {
                    // Inner shadow
                    trendCtx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
                    trendCtx.beginPath();
                    trendCtx.moveTo(0, 0.2 * height);
                    trendCtx.lineTo(0.5 * width, 0);
                    trendCtx.lineTo(width, 0.2 * height);
                    trendCtx.moveTo(0.252 * width, 0.2 * height);
                    trendCtx.lineTo(0.252 * width, 0.37 * height);
                    trendCtx.stroke();
                    // Inner highlight
                    trendCtx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                    trendCtx.beginPath();
                    trendCtx.moveTo(0.252 * width, 0.37 * height);
                    trendCtx.lineTo(0.752 * width, 0.37 * height);
                    trendCtx.lineTo(0.752 * width, 0.2 * height);
                    trendCtx.lineTo(width, 0.2 * height);
                    trendCtx.stroke();
                } else {
                    // draw halo
                    fill = trendCtx.createRadialGradient(0.5 * width, 0.2 * height, 0, 0.5 * width, 0.2 * height, 0.7 * width);
                    fill.addColorStop(0, setAlpha(ledColor.coronaColor, 0).color);
                    fill.addColorStop(0.5, setAlpha(ledColor.coronaColor, 0.3).color);
                    fill.addColorStop(0.7, setAlpha(ledColor.coronaColor, 0.2).color);
                    fill.addColorStop(0.8, setAlpha(ledColor.coronaColor, 0.1).color);
                    fill.addColorStop(0.85, setAlpha(ledColor.coronaColor, 0.05).color);
                    fill.addColorStop(1, setAlpha(ledColor.coronaColor, 0).color);
                    trendCtx.fillStyle = fill;

                    trendCtx.beginPath();
                    trendCtx.arc(0.5 * width, 0.2 * height, 0.7 * width, 0, TWO_PI, true);
                    trendCtx.closePath();
                    trendCtx.fill();
                }
            },

            drawEquals = function () {
                // draw equal symbol
                var ledColor = colors[1];

                trendCtx.beginPath();
                if (onSection.state === 'steady') {
                    fill = ledColor.outerColor_ON;
                    trendCtx.fillStyle = fill;
                    trendCtx.rect(0.128 * width, 0.41 * height, 0.744 * width, 0.074 * height);
                    trendCtx.rect(0.128 * width, 0.516 * height, 0.744 * width, 0.074 * height);
                    trendCtx.closePath();
                    trendCtx.fill();
                } else {
                    fill = trendCtx.createLinearGradient(0, 0.41 * height, 0, 0.41 * height + 0.074 * height);
                    fill.addColorStop(0, '#323232');
                    fill.addColorStop(1, '#5c5c5c');
                    trendCtx.fillStyle = fill;
                    trendCtx.rect(0.128 * width, 0.41 * height, 0.744 * width, 0.074 * height);
                    trendCtx.closePath();
                    trendCtx.fill();
                    fill = trendCtx.createLinearGradient(0, 0.516 * height, 0, 0.516 * height + 0.074 * height);
                    fill.addColorStop(0, '#323232');
                    fill.addColorStop(1, '#5c5c5c');
                    trendCtx.fillStyle = fill;
                    trendCtx.rect(0.128 * width, 0.516 * height, 0.744 * width, 0.074 * height);
                    trendCtx.closePath();
                    trendCtx.fill();
                }
                if (onSection.state !== 'steady') {
                    // inner shadow
                    trendCtx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
                    trendCtx.beginPath();
                    trendCtx.moveTo(0.128 * width, 0.41 * height + 0.074 * height);
                    trendCtx.lineTo(0.128 * width, 0.41 * height);
                    trendCtx.lineTo(0.128 * width + 0.744 * width, 0.41 * height);
                    trendCtx.stroke();
                    trendCtx.beginPath();
                    trendCtx.moveTo(0.128 * width, 0.516 * height + 0.074 * height);
                    trendCtx.lineTo(0.128 * width, 0.516 * height);
                    trendCtx.lineTo(0.128 * width + 0.744 * width, 0.516 * height);
                    trendCtx.stroke();
                    // inner highlight
                    trendCtx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                    trendCtx.beginPath();
                    trendCtx.moveTo(0.128 * width + 0.744 * width, 0.41 * height);
                    trendCtx.lineTo(0.128 * width + 0.744 * width, 0.41 * height + 0.074 * height);
                    trendCtx.lineTo(0.128 * width, 0.41 * height + 0.074 * height);
                    trendCtx.stroke();
                    trendCtx.beginPath();
                    trendCtx.moveTo(0.128 * width + 0.744 * width, 0.516 * height);
                    trendCtx.lineTo(0.128 * width + 0.744 * width, 0.516 * height + 0.074 * height);
                    trendCtx.lineTo(0.128 * width, 0.516 * height + 0.074 * height);
                    trendCtx.stroke();
                } else {
                    // draw halo
                    fill = trendCtx.createRadialGradient(0.5 * width, 0.5 * height, 0, 0.5 * width, 0.5 * height, 0.7 * width);
                    fill.addColorStop(0, setAlpha(ledColor.coronaColor, 0).color);
                    fill.addColorStop(0.5, setAlpha(ledColor.coronaColor, 0.3).color);
                    fill.addColorStop(0.7, setAlpha(ledColor.coronaColor, 0.2).color);
                    fill.addColorStop(0.8, setAlpha(ledColor.coronaColor, 0.1).color);
                    fill.addColorStop(0.85, setAlpha(ledColor.coronaColor, 0.05).color);
                    fill.addColorStop(1, setAlpha(ledColor.coronaColor, 0).color);
                    trendCtx.fillStyle = fill;
                    trendCtx.beginPath();
                    trendCtx.arc(0.5 * width, 0.5 * height, 0.7 * width, 0, TWO_PI, true);
                    trendCtx.closePath();
                    trendCtx.fill();
                }
            },

            drawDownArrow = function () {
                // draw down arrow
                var ledColor = colors[2];
                if (onSection.state === 'down') {
                    fill = trendCtx.createRadialGradient(0.5 * width, 0.8 * height, 0, 0.5 * width, 0.8 * height, 0.5 * width);
                    fill.addColorStop(0, ledColor.innerColor1_ON);
                    fill.addColorStop(0.2, ledColor.innerColor2_ON);
                    fill.addColorStop(1, ledColor.outerColor_ON);
                } else {
                    fill = trendCtx.createLinearGradient(0, 0.63 * height, 0, height);
                    fill.addColorStop(0, '#323232');
                    fill.addColorStop(1, '#5c5c5c');
                }
                trendCtx.beginPath();
                trendCtx.fillStyle = fill;
                trendCtx.moveTo(0.5 * width, height);
                trendCtx.lineTo(width, 0.8 * height);
                trendCtx.lineTo(0.725 * width, 0.8 * height);
                trendCtx.lineTo(0.725 * width, 0.63 * height);
                trendCtx.lineTo(0.252 * width, 0.63 * height);
                trendCtx.lineTo(0.252 * width, 0.8 * height);
                trendCtx.lineTo(0, 0.8 * height);
                trendCtx.closePath();
                trendCtx.fill();
                if (onSection.state !== 'down') {
                    // Inner shadow
                    trendCtx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
                    trendCtx.beginPath();
                    trendCtx.moveTo(0, 0.8 * height);
                    trendCtx.lineTo(0.252 * width, 0.8 * height);
                    trendCtx.moveTo(0.252 * width, 0.63 * height);
                    trendCtx.lineTo(0.752 * width, 0.63 * height);
                    trendCtx.stroke();
                    trendCtx.beginPath();
                    trendCtx.moveTo(0.752 * width, 0.8 * height);
                    trendCtx.lineTo(width, 0.8 * height);
                    trendCtx.stroke();
                    // Inner highlight
                    trendCtx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                    trendCtx.beginPath();
                    trendCtx.moveTo(0, 0.8 * height);
                    trendCtx.lineTo(0.5 * width, height);
                    trendCtx.lineTo(width, 0.8 * height);
                    trendCtx.stroke();
                    trendCtx.beginPath();
                    trendCtx.moveTo(0.752 * width, 0.8 * height);
                    trendCtx.lineTo(0.752 * width, 0.63 * height);
                    trendCtx.stroke();
                } else {
                    // draw halo
                    fill = trendCtx.createRadialGradient(0.5 * width, 0.8 * height, 0, 0.5 * width, 0.8 * height, 0.7 * width);
                    fill.addColorStop(0, setAlpha(ledColor.coronaColor, 0).color);
                    fill.addColorStop(0.5, setAlpha(ledColor.coronaColor, 0.3).color);
                    fill.addColorStop(0.7, setAlpha(ledColor.coronaColor, 0.2).color);
                    fill.addColorStop(0.8, setAlpha(ledColor.coronaColor, 0.1).color);
                    fill.addColorStop(0.85, setAlpha(ledColor.coronaColor, 0.05).color);
                    fill.addColorStop(1, setAlpha(ledColor.coronaColor, 0).color);
                    trendCtx.fillStyle = fill;
                    trendCtx.beginPath();
                    trendCtx.arc(0.5 * width, 0.8 * height, 0.7 * width, 0, TWO_PI, true);
                    trendCtx.closePath();
                    trendCtx.fill();
                }
            };

        // Check if we have already cached this indicator, if not create it
        if (!createTrendIndicator.cache[cacheKey]) {
            // create oversized buffer for the glow
            trendBuffer = createBuffer(width * 2, width * 4);
            trendCtx = trendBuffer.getContext('2d');
            trendCtx.translate(width * 0.5, width * 0.5);
            // Must draw the active section last so the 'glow' is on top
            switch (onSection.state) {
            case 'up':
                drawDownArrow();
                drawEquals();
                drawUpArrow();
                break;
            case 'steady':
                drawDownArrow();
                drawUpArrow();
                drawEquals();
                break;
            case 'down':
            /* falls through */
            default:
                drawUpArrow();
                drawEquals();
                drawDownArrow();
                break;
            }
            // cache the buffer
            createTrendIndicator.cache[cacheKey] = trendBuffer;
        }
        return createTrendIndicator.cache[cacheKey];
    };
    createTrendIndicator.cache = {};

    var drawTitleImage = function (ctx, imageWidth, imageHeight, titleString, unitString, backgroundColor, vertical, radial, altPos, gaugeType) {
        gaugeType = (undefined === gaugeType ? gaugeType = steelseries.GaugeType.TYPE1 : gaugeType);
        ctx.save();
        ctx.textAlign = (radial ? 'center' : 'left');
        ctx.textBaseline = 'middle';
        ctx.strokeStyle = backgroundColor.labelColor.getRgbaColor();
        ctx.fillStyle = backgroundColor.labelColor.getRgbaColor();

        if (radial) {
            ctx.font = 0.046728 * imageWidth + 'px ' + stdFontName;
            ctx.fillText(titleString, imageWidth / 2, imageHeight * 0.3, imageWidth * 0.3);
            ctx.fillText(unitString, imageWidth / 2, imageHeight * 0.38, imageWidth * 0.3);
        } else {
            // linear
            if (vertical) {
                ctx.font = 0.1 * imageWidth + 'px ' + stdFontName;
                ctx.save();
                ctx.translate(0.671428 * imageWidth, 0.1375 * imageHeight);
                ctx.rotate(1.570796);
                ctx.fillText(titleString, 0, 0);
                ctx.translate(-0.671428 * imageWidth, -0.1375 * imageHeight);
                ctx.restore();
                ctx.font = 0.071428 * imageWidth + 'px ' + stdFontName;
                if (altPos) {
                    // LCD visible
                    if (gaugeType.type === 'type2') {
                        ctx.textAlign = 'right';
                        ctx.fillText(unitString, 0.36 * imageWidth, imageHeight * 0.79, imageWidth * 0.25);
                    } else {
                        ctx.fillText(unitString, 0.63 * imageWidth, imageHeight * 0.85, imageWidth * 0.2);
                    }
                } else {
                    // LCD hidden
                    ctx.textAlign = 'center';
                    if (gaugeType.type === 'type2') {
                        ctx.fillText(unitString, imageWidth / 2, imageHeight * 0.92, imageWidth * 0.2);
                    } else {
                        ctx.fillText(unitString, imageWidth / 2, imageHeight * 0.89, imageWidth * 0.2);
                    }
                }
            } else { //linear horizontal
                ctx.font = 0.035 * imageWidth + 'px ' + stdFontName;
                ctx.fillText(titleString, imageWidth * 0.15, imageHeight * 0.25, imageWidth * 0.3);
                ctx.font = 0.025 * imageWidth + 'px ' + stdFontName;
                ctx.fillText(unitString, imageWidth * 0.0625, imageHeight * 0.7, imageWidth * 0.07);
            }
        }
        ctx.restore();
    };

    //*****************************************   T E X T U R E S   ****************************************************
    var carbonBuffer = drawToBuffer(12, 12, function (ctx) {
            var imageWidth = ctx.canvas.width,
                imageHeight = ctx.canvas.height,
                offsetX = 0,
                offsetY = 0,
                grad;

            ctx.save();

            // RULB
            ctx.save();
            ctx.beginPath();
            ctx.rect(0, 0, imageWidth * 0.5, imageHeight * 0.5);
            ctx.closePath();
            ctx.restore();

            grad = ctx.createLinearGradient(0, offsetY * imageHeight, 0, 0.5 * imageHeight + offsetY * imageHeight);
            grad.addColorStop(0, 'rgb(35, 35, 35)');
            grad.addColorStop(1, 'rgb(23, 23, 23)');
            ctx.fillStyle = grad;
            ctx.fill();

            // RULF
            ctx.save();
            ctx.beginPath();
            ctx.rect(imageWidth * 0.083333, 0, imageWidth * 0.333333, imageHeight * 0.416666);
            ctx.closePath();
            ctx.restore();
            offsetX = 0.083333;
            offsetY = 0;
            grad = ctx.createLinearGradient(0, offsetY * imageHeight, 0, 0.416666 * imageHeight + offsetY * imageHeight);
            grad.addColorStop(0, 'rgb(38, 38, 38)');
            grad.addColorStop(1, 'rgb(30, 30, 30)');
            ctx.fillStyle = grad;
            ctx.fill();

            // RLRB
            ctx.save();
            ctx.beginPath();
            ctx.rect(imageWidth * 0.5, imageHeight * 0.5, imageWidth * 0.5, imageHeight * 0.5);
            ctx.closePath();
            ctx.restore();
            offsetX = 0.5;
            offsetY = 0.5;
            grad = ctx.createLinearGradient(0, offsetY * imageHeight, 0, 0.5 * imageHeight + offsetY * imageHeight);
            grad.addColorStop(0, 'rgb(35, 35, 35)');
            grad.addColorStop(1, 'rgb(23, 23, 23)');
            ctx.fillStyle = grad;
            ctx.fill();

            // RLRF
            ctx.save();
            ctx.beginPath();
            ctx.rect(imageWidth * 0.583333, imageHeight * 0.5, imageWidth * 0.333333, imageHeight * 0.416666);
            ctx.closePath();
            ctx.restore();
            offsetX = 0.583333;
            offsetY = 0.5;
            grad = ctx.createLinearGradient(0, offsetY * imageHeight, 0, 0.416666 * imageHeight + offsetY * imageHeight);
            grad.addColorStop(0, 'rgb(38, 38, 38)');
            grad.addColorStop(1, 'rgb(30, 30, 30)');
            ctx.fillStyle = grad;
            ctx.fill();

            // RURB
            ctx.save();
            ctx.beginPath();
            ctx.rect(imageWidth * 0.5, 0, imageWidth * 0.5, imageHeight * 0.5);
            ctx.closePath();
            ctx.restore();
            offsetX = 0.5;
            offsetY = 0;
            grad = ctx.createLinearGradient(0, offsetY * imageHeight, 0, 0.5 * imageHeight + offsetY * imageHeight);
            grad.addColorStop(0, '#303030');
            grad.addColorStop(1, 'rgb(40, 40, 40)');
            ctx.fillStyle = grad;
            ctx.fill();

            // RURF
            ctx.save();
            ctx.beginPath();
            ctx.rect(imageWidth * 0.583333, imageHeight * 0.083333, imageWidth * 0.333333, imageHeight * 0.416666);
            ctx.closePath();
            ctx.restore();
            offsetX = 0.583333;
            offsetY = 0.083333;
            grad = ctx.createLinearGradient(0, offsetY * imageHeight, 0, 0.416666 * imageHeight + offsetY * imageHeight);
            grad.addColorStop(0, 'rgb(53, 53, 53)');
            grad.addColorStop(1, 'rgb(45, 45, 45)');
            ctx.fillStyle = grad;
            ctx.fill();

            // RLLB
            ctx.save();
            ctx.beginPath();
            ctx.rect(0, imageHeight * 0.5, imageWidth * 0.5, imageHeight * 0.5);
            ctx.closePath();
            ctx.restore();
            offsetX = 0;
            offsetY = 0.5;
            grad = ctx.createLinearGradient(0, offsetY * imageHeight, 0, 0.5 * imageHeight + offsetY * imageHeight);
            grad.addColorStop(0, '#303030');
            grad.addColorStop(1, '#282828');
            ctx.fillStyle = grad;
            ctx.fill();

            // RLLF
            ctx.save();
            ctx.beginPath();
            ctx.rect(imageWidth * 0.083333, imageHeight * 0.583333, imageWidth * 0.333333, imageHeight * 0.416666);
            ctx.closePath();
            ctx.restore();
            offsetX = 0.083333;
            offsetY = 0.583333;
            grad = ctx.createLinearGradient(0, offsetY * imageHeight, 0, 0.416666 * imageHeight + offsetY * imageHeight);
            grad.addColorStop(0, '#353535');
            grad.addColorStop(1, '#2d2d2d');
            ctx.fillStyle = grad;
            ctx.fill();

            ctx.restore();
        });

    var punchedSheetBuffer = drawToBuffer(15, 15, function (ctx) {
        var imageWidth = ctx.canvas.width,
            imageHeight = ctx.canvas.height,
            grad;

        ctx.save();

        // BACK
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, imageWidth, imageHeight);
        ctx.closePath();
        ctx.restore();
        ctx.fillStyle = '#1D2123';
        ctx.fill();

        // ULB
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, imageHeight * 0.266666);
        ctx.bezierCurveTo(0, imageHeight * 0.4, imageWidth * 0.066666, imageHeight * 0.466666, imageWidth * 0.2, imageHeight * 0.466666);
        ctx.bezierCurveTo(imageWidth * 0.333333, imageHeight * 0.466666, imageWidth * 0.4, imageHeight * 0.4, imageWidth * 0.4, imageHeight * 0.266666);
        ctx.bezierCurveTo(imageWidth * 0.4, imageHeight * 0.133333, imageWidth * 0.333333, imageHeight * 0.066666, imageWidth * 0.2, imageHeight * 0.066666);
        ctx.bezierCurveTo(imageWidth * 0.066666, imageHeight * 0.066666, 0, imageHeight * 0.133333, 0, imageHeight * 0.266666);
        ctx.closePath();
        grad = ctx.createLinearGradient(0, 0.066666 * imageHeight, 0, 0.466666 * imageHeight);
        grad.addColorStop(0, '#000000');
        grad.addColorStop(1, '#444444');
        ctx.fillStyle = grad;
        ctx.fill();

        // ULF
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, imageHeight * 0.2);
        ctx.bezierCurveTo(0, imageHeight * 0.333333, imageWidth * 0.066666, imageHeight * 0.4, imageWidth * 0.2, imageHeight * 0.4);
        ctx.bezierCurveTo(imageWidth * 0.333333, imageHeight * 0.4, imageWidth * 0.4, imageHeight * 0.333333, imageWidth * 0.4, imageHeight * 0.2);
        ctx.bezierCurveTo(imageWidth * 0.4, imageHeight * 0.066666, imageWidth * 0.333333, 0, imageWidth * 0.2, 0);
        ctx.bezierCurveTo(imageWidth * 0.066666, 0, 0, imageHeight * 0.066666, 0, imageHeight * 0.2);
        ctx.closePath();
        ctx.fillStyle = '#050506';
        ctx.fill();

        // LRB
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(imageWidth * 0.466666, imageHeight * 0.733333);
        ctx.bezierCurveTo(imageWidth * 0.466666, imageHeight * 0.866666, imageWidth * 0.533333, imageHeight * 0.933333, imageWidth * 0.666666, imageHeight * 0.933333);
        ctx.bezierCurveTo(imageWidth * 0.8, imageHeight * 0.933333, imageWidth * 0.866666, imageHeight * 0.866666, imageWidth * 0.866666, imageHeight * 0.733333);
        ctx.bezierCurveTo(imageWidth * 0.866666, imageHeight * 0.6, imageWidth * 0.8, imageHeight * 0.533333, imageWidth * 0.666666, imageHeight * 0.533333);
        ctx.bezierCurveTo(imageWidth * 0.533333, imageHeight * 0.533333, imageWidth * 0.466666, imageHeight * 0.6, imageWidth * 0.466666, imageHeight * 0.733333);
        ctx.closePath();
        grad = ctx.createLinearGradient(0, 0.533333 * imageHeight, 0, 0.933333 * imageHeight);
        grad.addColorStop(0, '#000000');
        grad.addColorStop(1, '#444444');
        ctx.fillStyle = grad;
        ctx.fill();

        // LRF
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(imageWidth * 0.466666, imageHeight * 0.666666);
        ctx.bezierCurveTo(imageWidth * 0.466666, imageHeight * 0.8, imageWidth * 0.533333, imageHeight * 0.866666, imageWidth * 0.666666, imageHeight * 0.866666);
        ctx.bezierCurveTo(imageWidth * 0.8, imageHeight * 0.866666, imageWidth * 0.866666, imageHeight * 0.8, imageWidth * 0.866666, imageHeight * 0.666666);
        ctx.bezierCurveTo(imageWidth * 0.866666, imageHeight * 0.533333, imageWidth * 0.8, imageHeight * 0.466666, imageWidth * 0.666666, imageHeight * 0.466666);
        ctx.bezierCurveTo(imageWidth * 0.533333, imageHeight * 0.466666, imageWidth * 0.466666, imageHeight * 0.533333, imageWidth * 0.466666, imageHeight * 0.666666);
        ctx.closePath();
        ctx.fillStyle = '#050506';
        ctx.fill();

        ctx.restore();
    });

    var brushedMetalTexture = function (color, radius, amount, monochrome, shine) {

        this.fill = function (startX, startY, endX, endY) {
            var i, x, y,                        // loop counters
                sinArr,
                width, height,
                outCanvas, outCanvasContext,    // output canvas
                inPixels, outPixels,            // pixel arrays
                //alpha = color & 0xff000000;
                alpha = 255,
                red = (color >> 16) & 0xff,
                green = (color >> 8) & 0xff,
                blue = color & 0xff,
                n = 0,
                variation = 255 * amount,
                totR, totG, totB,
                indx, tr, tg, tb, f;

            startX = Math.floor(startX);
            startY = Math.floor(startY);
            endX = Math.ceil(endX);
            endY = Math.ceil(endY);

            width = endX - startX;
            height = endY - startY;

            // Create output canvas
            outCanvas = createBuffer(width, height);
            outCanvasContext = outCanvas.getContext('2d');

            // Create pixel arrays
            inPixels = outCanvasContext.createImageData(width, height);
            outPixels = outCanvasContext.createImageData(width, height);

            // Precreate sin() values
            if (shine !== 0) {
                sinArr = [];
                for (i = 0; i < width; i++) {
                    sinArr[i] = (255 * shine * Math.sin(i / width * PI)) | 0;
                }
            }

            for (y = 0; y < height; y++) {
                // The pixel array is addressed as 4 elements per pixel [r,g,b,a]
                if (radius !== 0) {
                    totR = totG = totB = 0;
                }
                for (x = 0; x < width; x ++) {
                    indx = (y * width * 4) + (x * 4);
                    tr = red;
                    tg = green;
                    tb = blue;
                    if (shine !== 0) {
                        f = sinArr[x];
                        tr += f;
                        tg += f;
                        tb += f;
                    }

                    if (monochrome) {
                        n = ((2 * Math.random() - 1) * variation) | 0;
                        inPixels.data[indx]   = clamp(tr + n);
                        inPixels.data[indx + 1] = clamp(tg + n);
                        inPixels.data[indx + 2] = clamp(tb + n);
                        inPixels.data[indx + 3] = alpha;
                    } else {
                        inPixels.data[indx]   = random(tr, variation);
                        inPixels.data[indx + 1] = random(tg, variation);
                        inPixels.data[indx + 2] = random(tb, variation);
                        inPixels.data[indx + 3] = alpha;
                    }
                }
            }

            if (radius > 0) {
                horizontalBlur(inPixels, outPixels, width, height, radius, alpha);
                outCanvasContext.putImageData(outPixels, startX, startY);
            } else {
                outCanvasContext.putImageData(inPixels, startX, startY);
            }
            return outCanvas;
        };

        function random(x, vari) {
            x += ((2 * Math.random() - 1) * vari) | 0;
            return (x < 0 ? 0 : (x > 255 ? 255 : x));
        }

        function clamp(C) {
            return (C < 0 ? 0 : (C > 255 ? 255 : C));
        }

        function horizontalBlur(inPix, outPix, width, height, radius, alpha) {
            var x, y,       // loop counters
                i, mul, indx,
                totR, totG, totB;

            if (radius >= width) {
                radius = width - 1;
            }
            mul = 1 / (radius * 2 + 1);
            indx = 0;
            for (y = 0; y < height; y++) {
                totR = totG = totB = 0;
                for (x = 0; x < radius ; x++) {
                    i = (indx + x) * 4;
                    totR += inPix.data[i];
                    totG += inPix.data[i + 1];
                    totB += inPix.data[i + 2];
                }
                for (x = 0; x < width; x++) {
                    if (x > radius) {
                        i = (indx - radius - 1) * 4;
                        totR -= inPix.data[i];
                        totG -= inPix.data[i + 1];
                        totB -= inPix.data[i + 2];
                    }
                    if (x + radius < width) {
                        i = (indx + radius) * 4;
                        totR += inPix.data[i];
                        totG += inPix.data[i + 1];
                        totB += inPix.data[i + 2];
                    }
                    i = indx * 4;
                    outPix.data[i] = (totR * mul) | 0;
                    outPix.data[i + 1] = (totG * mul) | 0;
                    outPix.data[i + 2] = (totB * mul) | 0;
                    outPix.data[i + 3] = alpha;
                    indx++;
                }
            }
        }

        return this;
    };

    //********************************************   T O O L S   *******************************************************
    var RgbaColor = function (r, g, b, a) {
        var red, green, blue, alpha;

        if (arguments.length === 1) {
            // hexadecimal input #112233
            b = parseInt(r.substr(5, 2), 16);
            g = parseInt(r.substr(3, 2), 16);
            r = parseInt(r.substr(1, 2), 16);
            a = 1;
        } else if (arguments.length === 3) {
            a = 1;
        }

        function validateColors() {
            red = range(r, 255);
            green = range(g, 255);
            blue = range(b, 255);
            alpha = range(a, 1);
        }

        validateColors();

        this.getRed = function () {
            return red;
        };

        this.setRed = function (r) {
            red = range(r, 255);
        };

        this.getGreen = function () {
            return green;
        };

        this.setGreen = function (g) {
            green = range(g, 255);
        };

        this.getBlue = function () {
            return blue;
        };

        this.setBlue = function (b) {
            blue = range(b, 255);
        };

        this.getAlpha = function () {
            return alpha;
        };

        this.setAlpha = function (a) {
            alpha = range(a, 1);
        };

        this.getRgbaColor = function () {
            return 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + alpha + ')';
        };

        this.getRgbColor = function () {
            return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
        };

        this.getHexColor = function () {
            return '#' + red.toString(16) + green.toString(16) + blue.toString(16);
        };
    };

    var ConicalGradient = function (fractions, colors) {
        var limit = fractions.length - 1,
            i;

        // Pre-multipy fractions array into range -PI to PI
        for (i = 0; i <= limit; i++) {
            fractions[i] = TWO_PI * fractions[i] - PI;
        }

        this.fillCircle = function (ctx, centerX, centerY, innerX, outerX) {
            var angle,
                radius = Math.ceil(outerX),
                diameter = radius * 2,
                pixels, alpha,
                x, y, dx, dy, dy2, distance,
                indx, pixColor,
                buffer, bufferCtx;

// Original Version using rotated lines
/*
            ctx.save();
            ctx.lineWidth = 1.5;
            ctx.translate(centerX, centerY);
            ctx.rotate(rotationOffset);
            ctx.translate(-centerX, -centerY);
            for (i = 0, size = fractions.length - 1; i < size; i++) {
                startAngle = TWO_PI * fractions[i];
                stopAngle = TWO_PI * fractions[i + 1];
                range = stopAngle - startAngle;
                startColor = colors[i];
                stopColor = colors[i + 1];
                for (angle = startAngle; angle < stopAngle; angle += angleStep) {
                    ctx.beginPath();
                    ctx.fillStyle = getColorFromFraction(startColor, stopColor, range, (angle - startAngle)).getRgbaColor();
                    ctx.strokeStyle = ctx.fillStyle;
                    if (innerX > 0) {
                        ctx.arc(centerX, centerY, innerX, angle + angleStep, angle, true);
                    } else {
                        ctx.moveTo(centerX, centerY);
                    }
                    ctx.arc(centerX, centerY, outerX, angle, angle + angleStep);
                    ctx.fill();
                    ctx.stroke();
                }
            }
*/
// End - Original Version

            // Create pixel array
            pixels = ctx.createImageData(diameter, diameter);
            alpha = 255;

            for (y = 0; y < diameter; y++) {
                dy = radius - y;
                dy2 = dy * dy;
                for (x = 0; x < diameter; x++) {
                    dx = x - radius;
                    distance = Math.sqrt((dx * dx) + dy2);
                    if (distance <= radius && distance >= innerX) { // pixels are transparent by default, so only paint the ones we need
                        angle = Math.atan2(dx, dy);
                        for (i = 0; i < limit; i++) {
                            if (angle >= fractions[i] && angle < fractions[i + 1]) {
                                pixColor = getColorFromFraction(colors[i], colors[i + 1], fractions[i + 1] - fractions[i], angle - fractions[i], true);
                            }
                        }
                        // The pixel array is addressed as 4 elements per pixel [r,g,b,a]
                        indx = ((diameter - y) * diameter * 4) + (x * 4);  // plot is 180 rotated from orginal method, so apply a simple invert (diameter - y)
                        pixels.data[indx]     = pixColor[0];
                        pixels.data[indx + 1] = pixColor[1];
                        pixels.data[indx + 2] = pixColor[2];
                        pixels.data[indx + 3] = alpha;
                    }
                }
            }

            // Create a new buffer to apply the raw data so we can rotate it
            buffer = createBuffer(diameter, diameter);
            bufferCtx = buffer.getContext('2d');
            bufferCtx.putImageData(pixels, 0, 0);
            // Apply the image buffer
            ctx.drawImage(buffer, centerX - radius, centerY - radius);
        };

        this.fillRect = function (ctx, centerX, centerY, width, height, thicknessX, thicknessY) {
            var angle,
                width2,
                height2,
                pixels, alpha,
                x, y, dx, dy,
                indx,
                pixColor,
                buffer, bufferCtx;

            width = Math.ceil(width);
            height = Math.ceil(height);
            width2 = width / 2;
            height2 = height / 2;
            thicknessX = Math.ceil(thicknessX);
            thicknessY = Math.ceil(thicknessY);

            // Create pixel array
            pixels = ctx.createImageData(width, height);
            alpha = 255;

            for (y = 0; y < height; y++) {
                dy = height2 - y;
                for (x = 0; x < width; x++) {
                    if (y > thicknessY && y < height - thicknessY) {
                        // we are in the range where we only draw the sides
                        if (x > thicknessX && x < width - thicknessX) {
                            // we are in the empty 'middle', jump to the next edge
                            x = width - thicknessX;
                        }
                    }
                    dx = x - width2;
                    angle = Math.atan2(dx, dy);
                    for (i = 0; i < limit; i++) {
                        if (angle >= fractions[i] && angle < fractions[i + 1]) {
                            pixColor = getColorFromFraction(colors[i], colors[i + 1], fractions[i + 1] - fractions[i], angle - fractions[i], true);
                        }
                    }
                    // The pixel array is addressed as 4 elements per pixel [r,g,b,a]
                    indx = ((height - y) * width * 4) + (x * 4); // plot is 180 rotated from orginal method, so apply a simple invert (height - y)
                    pixels.data[indx]     = pixColor[0];
                    pixels.data[indx + 1] = pixColor[0];
                    pixels.data[indx + 2] = pixColor[0];
                    pixels.data[indx + 3] = alpha;
                }
            }
            // Create a new buffer to apply the raw data so we can clip it when drawing to canvas
            buffer = createBuffer(width, height);
            bufferCtx = buffer.getContext('2d');
            bufferCtx.putImageData(pixels, 0, 0);

            // draw the buffer back to the canvas
            ctx.drawImage(buffer, centerX - width2, centerY - height2);
        };

    };

    var GradientWrapper = function (start, end, fractions, colors) {

        this.getColorAt = function (fraction) {
            var lowerLimit = 0,
                lowerIndex = 0,
                upperLimit = 1,
                upperIndex = 1,
                i,
                interpolationFraction;

            fraction = (fraction < 0 ? 0 : (fraction > 1 ? 1 : fraction));

            for (i = 0; i < fractions.length; i++) {
                if (fractions[i] < fraction && lowerLimit < fractions[i]) {
                    lowerLimit = fractions[i];
                    lowerIndex = i;
                }
                if (fractions[i] === fraction) {
                    return colors[i];
                }
                if (fractions[i] > fraction && upperLimit >= fractions[i]) {
                    upperLimit = fractions[i];
                    upperIndex = i;
                }
            }
            interpolationFraction = (fraction - lowerLimit) / (upperLimit - lowerLimit);
            return getColorFromFraction(colors[lowerIndex], colors[upperIndex], 1, interpolationFraction);
        };

        this.getStart = function () {
            return start;
        };

        this.getEnd = function () {
            return end;
        };
    };

    function setAlpha(hex, alpha) {
        var hexColor = ('#' === hex.charAt(0)) ? hex.substring(1, 7) : hex,
            red = parseInt((hexColor).substring(0, 2), 16),
            green = parseInt((hexColor).substring(2, 4), 16),
            blue = parseInt((hexColor).substring(4, 6), 16);

        this.color = 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')';

        return this;
    }

    function getColorFromFraction(sourceColor, destinationColor, range, fraction, returnRawData) {
        var INT_TO_FLOAT = 1 / 255,
            sourceRed = sourceColor.getRed(),
            sourceGreen = sourceColor.getGreen(),
            sourceBlue = sourceColor.getBlue(),
            sourceAlpha = sourceColor.getAlpha(),

            deltaRed = destinationColor.getRed() - sourceRed,
            deltaGreen = destinationColor.getGreen() - sourceGreen,
            deltaBlue = destinationColor.getBlue() - sourceBlue,
            deltaAlpha = destinationColor.getAlpha() * INT_TO_FLOAT - sourceAlpha * INT_TO_FLOAT,

            fractionRed = deltaRed / range * fraction,
            fractionGreen = deltaGreen / range * fraction,
            fractionBlue = deltaBlue / range * fraction,
            fractionAlpha = deltaAlpha / range * fraction;

        returnRawData = returnRawData || false;
        if (returnRawData) {
            return [(sourceRed + fractionRed).toFixed(0), (sourceGreen + fractionGreen).toFixed(0), (sourceBlue + fractionBlue).toFixed(0), sourceAlpha + fractionAlpha];
        } else {
            return new RgbaColor((sourceRed + fractionRed).toFixed(0), (sourceGreen + fractionGreen).toFixed(0), (sourceBlue + fractionBlue).toFixed(0), sourceAlpha + fractionAlpha);
        }
    }

    function section(start, stop, color) {
        return {start : start,
                stop : stop,
                color : color};
    }

    Math.log10 = function (value) {
        return (Math.log(value) / Math.LN10);
    };

    function calcNiceNumber(range, round) {
        var exponent = Math.floor(Math.log10(range)),   // exponent of range
            fraction = range / Math.pow(10, exponent),  // fractional part of range
            niceFraction;                               // nice, rounded fraction

        if (round) {
            if (1.5 > fraction) {
                niceFraction = 1;
            } else if (3 > fraction) {
                niceFraction = 2;
            } else if (7 > fraction) {
                niceFraction = 5;
            } else {
                niceFraction = 10;
            }
        } else {
            if (1 >= fraction) {
                niceFraction = 1;
            } else if (2 >= fraction) {
                niceFraction = 2;
            } else if (5 >= fraction) {
                niceFraction = 5;
            } else {
                niceFraction = 10;
            }
        }
        return niceFraction * Math.pow(10, exponent);
    }

    function roundedRectangle(ctx, x, y, w, h, radius) {
        var r = x + w,
            b = y + h;
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(r - radius, y);
        ctx.quadraticCurveTo(r, y, r, y + radius);
        ctx.lineTo(r, y + h - radius);
        ctx.quadraticCurveTo(r, b, r - radius, b);
        ctx.lineTo(x + radius, b);
        ctx.quadraticCurveTo(x, b, x, b - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.stroke();
    }

    function createBuffer(width, height) {
        var buffer = doc.createElement('canvas');
        buffer.width = width;
        buffer.height = height;
        return buffer;
    }

    function drawToBuffer(width, height, drawFunction) {
        var buffer = doc.createElement('canvas');
        buffer.width = width;
        buffer.height = height;
        drawFunction(buffer.getContext('2d'));
        return buffer;
    }

    function getColorValues(color) {
        var colorData,
            lookupBuffer = drawToBuffer(1, 1, function (ctx) {
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.rect(0, 0, 1, 1);
                ctx.fill();
            });
        colorData = lookupBuffer.getContext('2d').getImageData(0, 0, 2, 2).data;

        /*
        for (var i = 0; i < data.length; i += 4) {
            var red = data[i];       // red
            var green = data[i + 1]; // green
            var blue = data[i + 2];  // blue
            //var alpha = data[i + 3]; // alpha
            console.log(red + ', ' + green + ', ' + blue);
        }
        */

        return [colorData[0], colorData[1], colorData[2], colorData[3]];
    }

    function customColorDef(color) {
        var VERY_DARK,
            DARK,
            LIGHT,
            LIGHTER,
            VERY_LIGHT,
            values = getColorValues(color),
            rgbaCol = new RgbaColor(values[0], values[1], values[2], values[3]);

        VERY_DARK = darker(rgbaCol, 0.32);
        DARK = darker(rgbaCol, 0.62);
        LIGHT = lighter(rgbaCol, 0.84);
        LIGHTER = lighter(rgbaCol, 0.94);
        VERY_LIGHT = lighter(rgbaCol, 1);

        return new ColorDef(VERY_DARK, DARK, rgbaCol, LIGHT, LIGHTER, VERY_LIGHT);
    }

    function rgbToHsl(red, green, blue) {
        var min, max, hue, saturation, lightness, delta;

        red /= 255;
        green /= 255;
        blue /= 255;

        max = Math.max(red, green, blue);
        min = Math.min(red, green, blue);
        lightness = (max + min) / 2;

        if (max === min) {
            hue = saturation = 0; // achromatic
        } else {
            delta = max - min;
            saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
            switch (max) {
            case red:
                hue = (green - blue) / delta + (green < blue ? 6 : 0);
                break;
            case green:
                hue = (blue - red) / delta + 2;
                break;
            case blue:
                hue = (red - green) / delta + 4;
                break;
            }
            hue /= 6;
        }
        return [hue, saturation, lightness];
    }

/* These functions are not currently used
    function hslToRgb(hue, saturation, lightness) {
        var red, green, blue, p, q;

        function hue2rgb(p, q, t) {
            if (t < 0) {
                t += 1;
            }
            if (t > 1) {
                t -= 1;
            }
            if (t < 1 / 6) {
                return p + (q - p) * 6 * t;
            }
            if (t < 1 / 2) {
                return q;
            }
            if (t < 2 / 3) {
                return p + (q - p) * (2 / 3 - t) * 6;
            }
            return p;
        }

        if (saturation === 0) {
            red = green = blue = lightness; // achromatic
        } else {
            q = (lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation);
            p = 2 * lightness - q;
            red = hue2rgb(p, q, hue + 1 / 3);
            green = hue2rgb(p, q, hue);
            blue = hue2rgb(p, q, hue - 1 / 3);
        }

        return [Math.floor(red * 255), Math.floor(green * 255), Math.floor(blue * 255)];
    }

    function hsbToHsl(hue, saturation, brightness) {
        var lightness = (brightness - saturation) / 2;
        lightness = range(lightness, 1);
        return [hue, saturation, lightness];
    }

    function hslToHsb(hue, saturation, lightness) {
        var brightness = (lightness * 2) + saturation;
        return [hue, saturation, brightness];
    }
*/

    function hsbToRgb(hue, saturation, brightness) {
        var r, g, b,
            i = Math.floor(hue * 6),
            f = hue * 6 - i,
            p = brightness * (1 - saturation),
            q = brightness * (1 - f * saturation),
            t = brightness * (1 - (1 - f) * saturation);

        switch (i % 6) {
        case 0:
            r = brightness;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = brightness;
            b = p;
            break;
        case 2:
            r = p;
            g = brightness;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = brightness;
            break;
        case 4:
            r = t;
            g = p;
            b = brightness;
            break;
        case 5:
            r = brightness;
            g = p;
            b = q;
            break;
        }

        return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
    }

    function rgbToHsb(r, g, b) {
        var min, max, hue, saturation, brightness, delta;

        r = r / 255;
        g = g / 255;
        b = b / 255;
        max = Math.max(r, g, b);
        min = Math.min(r, g, b);
        brightness = max;
        delta = max - min;
        saturation = max === 0 ? 0 : delta / max;

        if (max === min) {
            hue = 0; // achromatic
        } else {
            switch (max) {
            case r:
                hue = (g - b) / delta + (g < b ? 6 : 0);
                break;
            case g:
                hue = (b - r) / delta + 2;
                break;
            case b:
                hue = (r - g) / delta + 4;
                break;
            }
            hue /= 6;
        }
        return [hue, saturation, brightness];
    }

    function range(value, limit) {
        return (value < 0 ? 0 : (value > limit ? limit : value));
    }

    function darker(color, fraction) {
        var red = Math.floor(color.getRed() * (1 - fraction)),
            green = Math.floor(color.getGreen() * (1 - fraction)),
            blue = Math.floor(color.getBlue() * (1 - fraction));

        red = range(red, 255);
        green = range(green, 255);
        blue = range(blue, 255);

        return new RgbaColor(red, green, blue, color.getAlpha());
    }

    function lighter(color, fraction) {
        var red = Math.round(color.getRed() * (1 + fraction)),
            green = Math.round(color.getGreen() * (1 + fraction)),
            blue = Math.round(color.getBlue() * (1 + fraction));

        red = range(red, 255);
        green = range(green, 255);
        blue = range(blue, 255);

        return new RgbaColor(red, green, blue, color.getAlpha());
    }

    function wrap(value, lower, upper) {
        var distance, times;
        if (upper <= lower) {
            throw 'Rotary bounds are of negative or zero size';
        }

        distance = upper - lower;
        times = Math.floor((value - lower) / distance);

        return value - (times * distance);
    }

    function getShortestAngle(from, to) {
        return wrap((to - from), -180, 180);
    }

    // shim layer
    var requestAnimFrame = (function () {
        return  window.requestAnimationFrame   ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function (callback) {
                window.setTimeout(callback, 1000 / 16);
            };
    }());

    function getCanvasContext(elementOrId) {
        var element = (typeof elementOrId === 'string' || elementOrId instanceof String) ?
            doc.getElementById(elementOrId) : elementOrId;
        return element.getContext('2d');
    }

/*
    function blur(ctx, width, height, radius) {
    // This function is too CPU expensive
    // leave disabled for now :(

        // Cheap'n'cheerful blur filter, just applies horizontal and vertical blurs
        // Only works for square canvas's at present

        var j, x, y,      // loop counters
            i,
            end,
            totR, totG, totB, totA,
            // Create a temporary buffer
            tempBuffer = createBuffer(width, height),
            tempCtx = tempBuffer.getContext('2d'),
            // pixel data
            inPix, outPix,
            mul,
            indx;

        ctx.save();

        for (j = 0; j < 2; j++) {
            // Get access to the pixel data
            inPix = ctx.getImageData(0, 0, (j === 0 ? width : height), (j === 0 ? height : width));
            outPix = ctx.createImageData((j === 0 ? width : height), (j === 0 ? height : width));

            if (j === 0) { // Horizontal blur
                if (radius >= width) {
                    radius = width - 1;
                }
            } else { // Vertical blur
                if (radius >= height) {
                    radius = height - 1;
                }
            }
            mul = 1 / (radius * 2 + 1);
            indx = 0;
            for (y = 0, end = (j === 0 ? height : width); y < end; y++) {
                totR = totG = totB = totA = 0;
                for (x = 0; x < radius ; x++) {
                    i = (indx + x) * 4;
                    totR += inPix.data[i];
                    totG += inPix.data[i + 1];
                    totB += inPix.data[i + 2];
                    totA += inPix.data[i + 3];
                }
                for (x = 0; x < (j === 0 ? width : height); x++) {
                    if (x > radius) {
                        i = (indx - radius - 1) * 4;
                        totR -= inPix.data[i];
                        totG -= inPix.data[i + 1];
                        totB -= inPix.data[i + 2];
                        totA -= inPix.data[i + 3];
                    }
                    if (x + radius < width) {
                        i = (indx + radius) * 4;
                        totR += inPix.data[i];
                        totG += inPix.data[i + 1];
                        totB += inPix.data[i + 2];
                        totA += inPix.data[i + 3];
                    }
                    i = indx * 4;
                    outPix.data[i] = (totR * mul) | 0;
                    outPix.data[i + 1] = (totG * mul) | 0;
                    outPix.data[i + 2] = (totB * mul) | 0;
                    outPix.data[i + 3] = (totA * mul) | 0;
                    indx++;
                }
            }
            // Write the output pixel data back to the temp buffer
            tempCtx.clearRect(0, 0, width, height);
            tempCtx.putImageData(outPix, 0, 0);
            if (j === 0) {
                // Clear the input canvas
                ctx.clearRect(0, 0, width, height);
                // Rotate image by 90 degrees
                ctx.translate(width / 2, height / 2);
                ctx.rotate(HALF_PI);
                ctx.translate(-width / 2, -height / 2);
                // Write the buffer back
                ctx.drawImage(tempBuffer, 0, 0);
            }
        }
        ctx.translate(width / 2, height / 2);
        ctx.rotate(-PI);
        ctx.translate(-width / 2, -height / 2);
        // Clear the input canvas
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(tempBuffer, 0, 0);
        ctx.restore();

    }
*/
    //****************************************   C O N S T A N T S   ***************************************************
    var BackgroundColorDef;
    (function () {
        BackgroundColorDef = function (gradientStart, gradientFraction, gradientStop, labelColor, symbolColor, name) {
            this.gradientStart = gradientStart;
            this.gradientFraction = gradientFraction;
            this.gradientStop = gradientStop;
            this.labelColor = labelColor;
            this.symbolColor = symbolColor;
            this.name = name;
        };
    }());

    var LcdColorDef;
    (function () {
        LcdColorDef = function (gradientStartColor, gradientFraction1Color, gradientFraction2Color, gradientFraction3Color, gradientStopColor, textColor) {
            this.gradientStartColor = gradientStartColor;
            this.gradientFraction1Color = gradientFraction1Color;
            this.gradientFraction2Color = gradientFraction2Color;
            this.gradientFraction3Color = gradientFraction3Color;
            this.gradientStopColor = gradientStopColor;
            this.textColor = textColor;
        };
    }());

    var ColorDef;
    (function () {
        ColorDef = function (veryDark, dark, medium, light, lighter, veryLight) {
            this.veryDark = veryDark;
            this.dark = dark;
            this.medium = medium;
            this.light = light;
            this.lighter = lighter;
            this.veryLight = veryLight;
        };
    }());

    var LedColorDef;
    (function () {
        LedColorDef = function (innerColor1_ON, innerColor2_ON, outerColor_ON, coronaColor, innerColor1_OFF, innerColor2_OFF, outerColor_OFF) {
            this.innerColor1_ON = innerColor1_ON;
            this.innerColor2_ON = innerColor2_ON;
            this.outerColor_ON = outerColor_ON;
            this.coronaColor = coronaColor;
            this.innerColor1_OFF = innerColor1_OFF;
            this.innerColor2_OFF = innerColor2_OFF;
            this.outerColor_OFF = outerColor_OFF;
        };
    }());

    var GaugeTypeDef;
    (function () {
        GaugeTypeDef = function (type) {
            this.type = type;
        };
    }());

    var OrientationDef;
    (function () {
        OrientationDef = function (type) {
            this.type = type;
        };
    }());

    var KnobTypeDef;
    (function () {
        KnobTypeDef = function (type) {
            this.type = type;
        };
    }());

    var KnobStyleDef;
    (function () {
        KnobStyleDef = function (style) {
            this.style = style;
        };
    }());

    var FrameDesignDef;
    (function () {
        FrameDesignDef = function (design) {
            this.design = design;
        };
    }());

    var PointerTypeDef;
    (function () {
        PointerTypeDef = function (type) {
            this.type = type;
        };
    }());

    var ForegroundTypeDef;
    (function () {
        ForegroundTypeDef = function (type) {
            this.type = type;
        };
    }());

    var LabelNumberFormatDef;
    (function () {
        LabelNumberFormatDef = function (format) {
            this.format = format;
        };
    }());

    var TickLabelOrientationDef;
    (function () {
        TickLabelOrientationDef = function (type) {
            this.type = type;
        };
    }());

    var TrendStateDef;
    (function () {
        TrendStateDef = function (state) {
            this.state = state;
        };
    }());

    //*************************   I m p l e m e n t a t i o n s   o f   d e f i n i t i o n s   ************************
    var backgroundColor = {
        DARK_GRAY: new BackgroundColorDef(new RgbaColor(0, 0, 0, 1), new RgbaColor(51, 51, 51, 1), new RgbaColor(153, 153, 153, 1), new RgbaColor(255, 255, 255, 1), new RgbaColor(180, 180, 180, 1), 'DARK_GRAY'),
        SATIN_GRAY: new BackgroundColorDef(new RgbaColor(45, 57, 57, 1), new RgbaColor(45, 57, 57, 1), new RgbaColor(45, 57, 57, 1), new RgbaColor(167, 184, 180, 1), new RgbaColor(137, 154, 150, 1), 'SATIN_GRAY'),
        LIGHT_GRAY: new BackgroundColorDef(new RgbaColor(130, 130, 130, 1), new RgbaColor(181, 181, 181, 1), new RgbaColor(253, 253, 253, 1), new RgbaColor(0, 0, 0, 1), new RgbaColor(80, 80, 80, 1), 'LIGHT_GRAY'),
        WHITE: new BackgroundColorDef(new RgbaColor(255, 255, 255, 1), new RgbaColor(255, 255, 255, 1), new RgbaColor(255, 255, 255, 1), new RgbaColor(0, 0, 0, 1), new RgbaColor(80, 80, 80, 1), 'WHITE'),
        BLACK: new BackgroundColorDef(new RgbaColor(0, 0, 0, 1), new RgbaColor(0, 0, 0, 1), new RgbaColor(0, 0, 0, 1), new RgbaColor(255, 255, 255, 1), new RgbaColor(150, 150, 150, 1), 'BLACK'),
        BEIGE: new BackgroundColorDef(new RgbaColor(178, 172, 150, 1), new RgbaColor(204, 205, 184, 1), new RgbaColor(231, 231, 214, 1), new RgbaColor(0, 0, 0, 1), new RgbaColor(80, 80, 80, 1), 'BEIGE'),
        BROWN: new BackgroundColorDef(new RgbaColor(245, 225, 193, 1), new RgbaColor(245, 225, 193, 1), new RgbaColor(255, 250, 240, 1), new RgbaColor(109, 73, 47, 1), new RgbaColor(89, 53, 27, 1), 'BROWN'),
        RED: new BackgroundColorDef(new RgbaColor(198, 93, 95, 1), new RgbaColor(212, 132, 134, 1), new RgbaColor(242, 218, 218, 1), new RgbaColor(0, 0, 0, 1), new RgbaColor(90, 0, 0, 1), 'RED'),
        GREEN: new BackgroundColorDef(new RgbaColor(65, 120, 40, 1), new RgbaColor(129, 171, 95, 1), new RgbaColor(218, 237, 202, 1), new RgbaColor(0, 0, 0, 1), new RgbaColor(0, 90, 0, 1), 'GREEN'),
        BLUE: new BackgroundColorDef(new RgbaColor(45, 83, 122, 1), new RgbaColor(115, 144, 170, 1), new RgbaColor(227, 234, 238, 1), new RgbaColor(0, 0, 0, 1), new RgbaColor(0, 0, 90, 1), 'BLUE'),
        ANTHRACITE: new BackgroundColorDef(new RgbaColor(50, 50, 54, 1), new RgbaColor(47, 47, 51, 1), new RgbaColor(69, 69, 74, 1), new RgbaColor(250, 250, 250, 1), new RgbaColor(180, 180, 180, 1), 'ANTHRACITE'),
        MUD: new BackgroundColorDef(new RgbaColor(80, 86, 82, 1), new RgbaColor(70, 76, 72, 1), new RgbaColor(57, 62, 58, 1), new RgbaColor(255, 255, 240, 1), new RgbaColor(225, 225, 210, 1), 'MUD'),
        PUNCHED_SHEET: new BackgroundColorDef(new RgbaColor(50, 50, 54, 1), new RgbaColor(47, 47, 51, 1), new RgbaColor(69, 69, 74, 1), new RgbaColor(255, 255, 255, 1), new RgbaColor(180, 180, 180, 1), 'PUNCHED_SHEET'),
        CARBON: new BackgroundColorDef(new RgbaColor(50, 50, 54, 1), new RgbaColor(47, 47, 51, 1), new RgbaColor(69, 69, 74, 1), new RgbaColor(255, 255, 255, 1), new RgbaColor(180, 180, 180, 1), 'CARBON'),
        STAINLESS: new BackgroundColorDef(new RgbaColor(130, 130, 130, 1), new RgbaColor(181, 181, 181, 1), new RgbaColor(253, 253, 253, 1), new RgbaColor(0, 0, 0, 1), new RgbaColor(80, 80, 80, 1), 'STAINLESS'),
        BRUSHED_METAL: new BackgroundColorDef(new RgbaColor(50, 50, 54, 1), new RgbaColor(47, 47, 51, 1), new RgbaColor(69, 69, 74, 1), new RgbaColor(0, 0, 0, 1), new RgbaColor(80, 80, 80, 1), 'BRUSHED_METAL'),
        BRUSHED_STAINLESS: new BackgroundColorDef(new RgbaColor(50, 50, 54, 1), new RgbaColor(47, 47, 51, 1), new RgbaColor(110, 110, 112, 1), new RgbaColor(0, 0, 0, 1), new RgbaColor(80, 80, 80, 1), 'BRUSHED_STAINLESS'),
        TURNED: new BackgroundColorDef(new RgbaColor(130, 130, 130, 1), new RgbaColor(181, 181, 181, 1), new RgbaColor(253, 253, 253, 1), new RgbaColor(0, 0, 0, 1), new RgbaColor(80, 80, 80, 1), 'TURNED')
    };

    var lcdColor = {
        BEIGE: new LcdColorDef('#c8c8b1', 'rgb(241, 237, 207)', 'rgb(234, 230, 194)', 'rgb(225, 220, 183)', 'rgb(237, 232, 191)', '#000000'),
        BLUE: new LcdColorDef('#ffffff', 'rgb(231, 246, 255)', 'rgb(170, 224, 255)', 'rgb(136, 212, 255)', 'rgb(192, 232, 255)', '#124564'),
        ORANGE: new LcdColorDef('#ffffff', 'rgb(255, 245, 225)', 'rgb(255, 217, 147)', 'rgb(255, 201, 104)', 'rgb(255, 227, 173)', '#503700'),
        RED: new LcdColorDef('#ffffff', 'rgb(255, 225, 225)', 'rgb(253, 152, 152)', 'rgb(252, 114, 115)', 'rgb(254, 178, 178)', '#4f0c0e'),
        YELLOW: new LcdColorDef('#ffffff', 'rgb(245, 255, 186)', 'rgb(210, 255, 0)', 'rgb(158, 205, 0)', 'rgb(210, 255, 0)', '#405300'),
        WHITE: new LcdColorDef('#ffffff', '#ffffff', 'rgb(241, 246, 242)', 'rgb(229, 239, 244)', '#ffffff', '#000000'),
        GRAY: new LcdColorDef('#414141', 'rgb(117, 117, 117)', 'rgb(87, 87, 87)', '#414141', 'rgb(81, 81, 81)', '#ffffff'),
        BLACK: new LcdColorDef('#414141', '#666666', '#333333', '#000000', '#333333', '#cccccc'),
        GREEN: new LcdColorDef('rgb(33, 67, 67)', 'rgb(33, 67, 67)', 'rgb(29, 58, 58)', 'rgb(28, 57, 57)', 'rgb(23, 46, 46)', 'rgba(0, 185, 165, 255)'),
        BLUE2: new LcdColorDef('rgb(0, 68, 103)', 'rgb(8, 109, 165)', 'rgb(0, 72, 117)', 'rgb(0, 72, 117)', 'rgb(0, 68, 103)', 'rgb(111, 182, 228)'),
        BLUE_BLACK: new LcdColorDef('rgb(22, 125, 212)', 'rgb(3, 162, 254)', 'rgb(3, 162, 254)', 'rgb(3, 162, 254)', 'rgb(11, 172, 244)', '#000000'),
        BLUE_DARKBLUE: new LcdColorDef('rgb(18, 33, 88)', 'rgb(18, 33, 88)', 'rgb(19, 30, 90)', 'rgb(17, 31, 94)', 'rgb(21, 25, 90)', 'rgb(23, 99, 221)'),
        BLUE_GRAY: new LcdColorDef('rgb(135, 174, 255)', 'rgb(101, 159, 255)', 'rgb(44, 93, 255)', 'rgb(27, 65, 254)', 'rgb(12, 50, 255)', '#b2b4ed'),
        STANDARD: new LcdColorDef('rgb(131, 133, 119)', 'rgb(176, 183, 167)', 'rgb(165, 174, 153)', 'rgb(166, 175, 156)', 'rgb(175, 184, 165)', 'rgb(35, 42, 52)'),
        STANDARD_GREEN: new LcdColorDef('#ffffff', 'rgb(219, 230, 220)', 'rgb(179, 194, 178)', 'rgb(153, 176, 151)', 'rgb(114, 138, 109)', '#080C06'),
        BLUE_BLUE: new LcdColorDef('rgb(100, 168, 253)', 'rgb(100, 168, 253)', 'rgb(95, 160, 250)', 'rgb(80, 144, 252)', 'rgb(74, 134, 255)', '#002cbb'),
        RED_DARKRED: new LcdColorDef('rgb(72, 36, 50)', 'rgb(185, 111, 110)', 'rgb(148, 66, 72)', 'rgb(83, 19, 20)', 'rgb(7, 6, 14)', '#FE8B92'),
        DARKBLUE: new LcdColorDef('rgb(14, 24, 31)', 'rgb(46, 105, 144)', 'rgb(19, 64, 96)', 'rgb(6, 20, 29)', 'rgb(8, 9, 10)', '#3DB3FF'),
        LILA: new LcdColorDef('rgb(175, 164, 255)', 'rgb(188, 168, 253)', 'rgb(176, 159, 255)', 'rgb(174, 147, 252)', 'rgb(168, 136, 233)', '#076148'),
        BLACKRED: new LcdColorDef('rgb(8, 12, 11)', 'rgb(10, 11, 13)', 'rgb(11, 10, 15)', 'rgb(7, 13, 9)', 'rgb(9, 13, 14)', '#B50026'),
        DARKGREEN: new LcdColorDef('rgb(25, 85, 0)', 'rgb(47, 154, 0)', 'rgb(30, 101, 0)', 'rgb(30, 101, 0)', 'rgb(25, 85, 0)', '#233123'),
        AMBER: new LcdColorDef('rgb(182, 71, 0)', 'rgb(236, 155, 25)', 'rgb(212, 93, 5)', 'rgb(212, 93, 5)', 'rgb(182, 71, 0)', '#593A0A'),
        LIGHTBLUE: new LcdColorDef('rgb(125, 146, 184)', 'rgb(197, 212, 231)', 'rgb(138, 155, 194)', 'rgb(138, 155, 194)', 'rgb(125, 146, 184)', '#090051'),
        SECTIONS: new LcdColorDef('#b2b2b2', '#ffffff', '#c4c4c4', '#c4c4c4', '#b2b2b2', '#000000')
    };

    var color = {
        RED: new ColorDef(new RgbaColor(82, 0, 0, 1), new RgbaColor(158, 0, 19, 1), new RgbaColor(213, 0, 25, 1), new RgbaColor(240, 82, 88, 1), new RgbaColor(255, 171, 173, 1), new RgbaColor(255, 217, 218, 1)),
        GREEN: new ColorDef(new RgbaColor(8, 54, 4, 1), new RgbaColor(0, 107, 14, 1), new RgbaColor(15, 148, 0, 1), new RgbaColor(121, 186, 37, 1), new RgbaColor(190, 231, 141, 1), new RgbaColor(234, 247, 218, 1)),
        BLUE: new ColorDef(new RgbaColor(0, 11, 68, 1), new RgbaColor(0, 73, 135, 1), new RgbaColor(0, 108, 201, 1), new RgbaColor(0, 141, 242, 1), new RgbaColor(122, 200, 255, 1), new RgbaColor(204, 236, 255, 1)),
        ORANGE: new ColorDef(new RgbaColor(118, 83, 30, 1), new RgbaColor(215, 67, 0, 1), new RgbaColor(240, 117, 0, 1), new RgbaColor(255, 166, 0, 1), new RgbaColor(255, 255, 128, 1), new RgbaColor(255, 247, 194, 1)),
        YELLOW: new ColorDef(new RgbaColor(41, 41, 0, 1), new RgbaColor(102, 102, 0, 1), new RgbaColor(177, 165, 0, 1), new RgbaColor(255, 242, 0, 1), new RgbaColor(255, 250, 153, 1), new RgbaColor(255, 252, 204, 1)),
        CYAN: new ColorDef(new RgbaColor(15, 109, 109, 1), new RgbaColor(0, 109, 144, 1), new RgbaColor(0, 144, 191, 1), new RgbaColor(0, 174, 239, 1), new RgbaColor(153, 223, 249, 1), new RgbaColor(204, 239, 252, 1)),
        MAGENTA: new ColorDef(new RgbaColor(98, 0, 114, 1), new RgbaColor(128, 24, 72, 1), new RgbaColor(191, 36, 107, 1), new RgbaColor(255, 48, 143, 1), new RgbaColor(255, 172, 210, 1), new RgbaColor(255, 214, 23, 1)),
        WHITE: new ColorDef(new RgbaColor(210, 210, 210, 1), new RgbaColor(220, 220, 220, 1), new RgbaColor(235, 235, 235, 1), new RgbaColor(255, 255, 255, 1), new RgbaColor(255, 255, 255, 1), new RgbaColor(255, 255, 255, 1)),
        GRAY: new ColorDef(new RgbaColor(25, 25, 25, 1), new RgbaColor(51, 51, 51, 1), new RgbaColor(76, 76, 76, 1), new RgbaColor(128, 128, 128, 1), new RgbaColor(204, 204, 204, 1), new RgbaColor(243, 243, 243, 1)),
        BLACK: new ColorDef(new RgbaColor(0, 0, 0, 1), new RgbaColor(5, 5, 5, 1), new RgbaColor(10, 10, 10, 1), new RgbaColor(15, 15, 15, 1), new RgbaColor(20, 20, 20, 1), new RgbaColor(25, 25, 25, 1)),
        RAITH: new ColorDef(new RgbaColor(0, 32, 65, 1), new RgbaColor(0, 65, 125, 1), new RgbaColor(0, 106, 172, 1), new RgbaColor(130, 180, 214, 1), new RgbaColor(148, 203, 242, 1), new RgbaColor(191, 229, 255, 1)),
        GREEN_LCD: new ColorDef(new RgbaColor(0, 55, 45, 1), new RgbaColor(15, 109, 93, 1), new RgbaColor(0, 185, 165, 1), new RgbaColor(48, 255, 204, 1), new RgbaColor(153, 255, 227, 1), new RgbaColor(204, 255, 241, 1)),
        JUG_GREEN: new ColorDef(new RgbaColor(0, 56, 0, 1), new RgbaColor(32, 69, 36, 1), new RgbaColor(50, 161, 0, 1), new RgbaColor(129, 206, 0, 1), new RgbaColor(190, 231, 141, 1), new RgbaColor(234, 247, 218, 1))
    };

    var ledColor = {
        RED_LED: new LedColorDef('#FF9A89', '#FF9A89', '#FF3300', '#FF8D70', '#7E1C00', '#7E1C00', '#641B00'),
        GREEN_LED: new LedColorDef('#9AFF89', '#9AFF89', '#59FF2A', '#A5FF00', '#1C7E00', '#1C7E00', '#1B6400'),
        BLUE_LED: new LedColorDef('#899AFF', '#899AFF', '#0033FF', '#708DFF', '#001C7E', '#001C7E', '#001B64'),
        ORANGE_LED: new LedColorDef('#FEA23F', '#FEA23F', '#FD6C00', '#FD6C00', '#592800', '#592800', '#421F00'),
        YELLOW_LED: new LedColorDef('#FFFF62', '#FFFF62', '#FFFF00', '#FFFF00', '#6B6D00', '#6B6D00', '#515300'),
        CYAN_LED: new LedColorDef('#00FFFF', '#00FFFF', '#1BC3C3', '#00FFFF', '#083B3B', '#083B3B', '#052727'),
        MAGENTA_LED: new LedColorDef('#D300FF', '#D300FF', '#8600CB', '#C300FF', '#38004B', '#38004B', '#280035')
    };

    var gaugeType = {
        TYPE1: new GaugeTypeDef('type1'),
        TYPE2: new GaugeTypeDef('type2'),
        TYPE3: new GaugeTypeDef('type3'),
        TYPE4: new GaugeTypeDef('type4'),
        TYPE5: new GaugeTypeDef('type5')
    };

    var orientation = {
        NORTH: new OrientationDef('north'),
        SOUTH: new OrientationDef('south'),
        EAST: new OrientationDef('east'),
        WEST: new OrientationDef('west')
    };

    var knobType = {
        STANDARD_KNOB: new KnobTypeDef('standardKnob'),
        METAL_KNOB: new KnobTypeDef('metalKnob')
    };

    var knobStyle = {
        BLACK: new KnobStyleDef('black'),
        BRASS: new KnobStyleDef('brass'),
        SILVER: new KnobStyleDef('silver')
    };

    var frameDesign = {
        BLACK_METAL: new FrameDesignDef('blackMetal'),
        METAL: new FrameDesignDef('metal'),
        SHINY_METAL: new FrameDesignDef('shinyMetal'),
        BRASS: new FrameDesignDef('brass'),
        STEEL: new FrameDesignDef('steel'),
        CHROME: new FrameDesignDef('chrome'),
        GOLD: new FrameDesignDef('gold'),
        ANTHRACITE: new FrameDesignDef('anthracite'),
        TILTED_GRAY: new FrameDesignDef('tiltedGray'),
        TILTED_BLACK: new FrameDesignDef('tiltedBlack'),
        GLOSSY_METAL: new FrameDesignDef('glossyMetal')
    };

    var pointerType = {
        TYPE1: new PointerTypeDef('type1'),
        TYPE2: new PointerTypeDef('type2'),
        TYPE3: new PointerTypeDef('type3'),
        TYPE4: new PointerTypeDef('type4'),
        TYPE5: new PointerTypeDef('type5'),
        TYPE6: new PointerTypeDef('type6'),
        TYPE7: new PointerTypeDef('type7'),
        TYPE8: new PointerTypeDef('type8'),
        TYPE9: new PointerTypeDef('type9'),
        TYPE10: new PointerTypeDef('type10'),
        TYPE11: new PointerTypeDef('type11'),
        TYPE12: new PointerTypeDef('type12'),
        TYPE13: new PointerTypeDef('type13'),
        TYPE14: new PointerTypeDef('type14'),
        TYPE15: new PointerTypeDef('type15'),
        TYPE16: new PointerTypeDef('type16')
    };

    var foregroundType = {
        TYPE1: new ForegroundTypeDef('type1'),
        TYPE2: new ForegroundTypeDef('type2'),
        TYPE3: new ForegroundTypeDef('type3'),
        TYPE4: new ForegroundTypeDef('type4'),
        TYPE5: new ForegroundTypeDef('type5')
    };

    var labelNumberFormat = {
        STANDARD: new LabelNumberFormatDef('standard'),
        FRACTIONAL: new LabelNumberFormatDef('fractional'),
        SCIENTIFIC: new LabelNumberFormatDef('scientific')
    };

    var tickLabelOrientation = {
        NORMAL: new TickLabelOrientationDef('normal'),
        HORIZONTAL: new TickLabelOrientationDef('horizontal'),
        TANGENT: new TickLabelOrientationDef('tangent')
    };

    var trendState = {
        UP: new TrendStateDef('up'),
        STEADY: new TrendStateDef('steady'),
        DOWN: new TrendStateDef('down'),
        OFF: new TrendStateDef('off')
    };

    //**********************************   E X P O R T   F U N C T I O N S   *******************************************
    return {
        // Components EXTERNAL : INTERNAL
        Radial : radial,
        RadialBargraph : radialBargraph,
        RadialVertical : radialVertical,
        Linear: linear,
        LinearBargraph: linearBargraph,
        DisplaySingle: displaySingle,
        DisplayMulti: displayMulti,
        Level : level,
        Compass : compass,
        WindDirection : windDirection,
        Horizon : horizon,
        Led : led,
        Clock : clock,
        Battery : battery,
        StopWatch : stopwatch,
        Altimeter : altimeter,
        TrafficLight: trafficlight,
        LightBulb: lightbulb,
        Odometer: odometer,

        // Images
        drawFrame : drawRadialFrameImage,
        drawBackground : drawRadialBackgroundImage,
        drawForeground : drawRadialForegroundImage,

        // Tools
        rgbaColor :  RgbaColor,
        ConicalGradient : ConicalGradient,
        setAlpha : setAlpha,
        getColorFromFraction : getColorFromFraction,
        gradientWrapper : GradientWrapper,

        // Constants
        BackgroundColor : backgroundColor,
        LcdColor : lcdColor,
        ColorDef : color,
        LedColor : ledColor,
        GaugeType : gaugeType,
        Orientation: orientation,
        FrameDesign : frameDesign,
        PointerType : pointerType,
        ForegroundType : foregroundType,
        KnobType : knobType,
        KnobStyle: knobStyle,
        LabelNumberFormat: labelNumberFormat,
        TickLabelOrientation: tickLabelOrientation,
        TrendState: trendState,

        // Other
        Section : section
    };
}());

}).call(this,require("IrXUsu"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/lib/steelseries.js","/lib")
},{"IrXUsu":8,"buffer":5}],5:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = Buffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192

/**
 * If `Buffer._useTypedArrays`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (compatible down to IE6)
 */
Buffer._useTypedArrays = (function () {
  // Detect if browser supports Typed Arrays. Supported browsers are IE 10+, Firefox 4+,
  // Chrome 7+, Safari 5.1+, Opera 11.6+, iOS 4.2+. If the browser does not support adding
  // properties to `Uint8Array` instances, then that's the same as no `Uint8Array` support
  // because we need to be able to add all the node Buffer API methods. This is an issue
  // in Firefox 4-29. Now fixed: https://bugzilla.mozilla.org/show_bug.cgi?id=695438
  try {
    var buf = new ArrayBuffer(0)
    var arr = new Uint8Array(buf)
    arr.foo = function () { return 42 }
    return 42 === arr.foo() &&
        typeof arr.subarray === 'function' // Chrome 9-10 lack `subarray`
  } catch (e) {
    return false
  }
})()

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (subject, encoding, noZero) {
  if (!(this instanceof Buffer))
    return new Buffer(subject, encoding, noZero)

  var type = typeof subject

  // Workaround: node's base64 implementation allows for non-padded strings
  // while base64-js does not.
  if (encoding === 'base64' && type === 'string') {
    subject = stringtrim(subject)
    while (subject.length % 4 !== 0) {
      subject = subject + '='
    }
  }

  // Find the length
  var length
  if (type === 'number')
    length = coerce(subject)
  else if (type === 'string')
    length = Buffer.byteLength(subject, encoding)
  else if (type === 'object')
    length = coerce(subject.length) // assume that object is array-like
  else
    throw new Error('First argument needs to be a number, array or string.')

  var buf
  if (Buffer._useTypedArrays) {
    // Preferred: Return an augmented `Uint8Array` instance for best performance
    buf = Buffer._augment(new Uint8Array(length))
  } else {
    // Fallback: Return THIS instance of Buffer (created by `new`)
    buf = this
    buf.length = length
    buf._isBuffer = true
  }

  var i
  if (Buffer._useTypedArrays && typeof subject.byteLength === 'number') {
    // Speed optimization -- use set if we're copying from a typed array
    buf._set(subject)
  } else if (isArrayish(subject)) {
    // Treat array-ish objects as a byte array
    for (i = 0; i < length; i++) {
      if (Buffer.isBuffer(subject))
        buf[i] = subject.readUInt8(i)
      else
        buf[i] = subject[i]
    }
  } else if (type === 'string') {
    buf.write(subject, 0, encoding)
  } else if (type === 'number' && !Buffer._useTypedArrays && !noZero) {
    for (i = 0; i < length; i++) {
      buf[i] = 0
    }
  }

  return buf
}

// STATIC METHODS
// ==============

Buffer.isEncoding = function (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.isBuffer = function (b) {
  return !!(b !== null && b !== undefined && b._isBuffer)
}

Buffer.byteLength = function (str, encoding) {
  var ret
  str = str + ''
  switch (encoding || 'utf8') {
    case 'hex':
      ret = str.length / 2
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8ToBytes(str).length
      break
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length
      break
    case 'base64':
      ret = base64ToBytes(str).length
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.concat = function (list, totalLength) {
  assert(isArray(list), 'Usage: Buffer.concat(list, [totalLength])\n' +
      'list should be an Array.')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (typeof totalLength !== 'number') {
    totalLength = 0
    for (i = 0; i < list.length; i++) {
      totalLength += list[i].length
    }
  }

  var buf = new Buffer(totalLength)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

// BUFFER INSTANCE METHODS
// =======================

function _hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  assert(strLen % 2 === 0, 'Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16)
    assert(!isNaN(byte), 'Invalid hex string')
    buf[offset + i] = byte
  }
  Buffer._charsWritten = i * 2
  return i
}

function _utf8Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf8ToBytes(string), buf, offset, length)
  return charsWritten
}

function _asciiWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(asciiToBytes(string), buf, offset, length)
  return charsWritten
}

function _binaryWrite (buf, string, offset, length) {
  return _asciiWrite(buf, string, offset, length)
}

function _base64Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(base64ToBytes(string), buf, offset, length)
  return charsWritten
}

function _utf16leWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf16leToBytes(string), buf, offset, length)
  return charsWritten
}

Buffer.prototype.write = function (string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length
      length = undefined
    }
  } else {  // legacy
    var swap = encoding
    encoding = offset
    offset = length
    length = swap
  }

  offset = Number(offset) || 0
  var remaining = this.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase()

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexWrite(this, string, offset, length)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Write(this, string, offset, length)
      break
    case 'ascii':
      ret = _asciiWrite(this, string, offset, length)
      break
    case 'binary':
      ret = _binaryWrite(this, string, offset, length)
      break
    case 'base64':
      ret = _base64Write(this, string, offset, length)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leWrite(this, string, offset, length)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toString = function (encoding, start, end) {
  var self = this

  encoding = String(encoding || 'utf8').toLowerCase()
  start = Number(start) || 0
  end = (end !== undefined)
    ? Number(end)
    : end = self.length

  // Fastpath empty strings
  if (end === start)
    return ''

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexSlice(self, start, end)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Slice(self, start, end)
      break
    case 'ascii':
      ret = _asciiSlice(self, start, end)
      break
    case 'binary':
      ret = _binarySlice(self, start, end)
      break
    case 'base64':
      ret = _base64Slice(self, start, end)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leSlice(self, start, end)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function (target, target_start, start, end) {
  var source = this

  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (!target_start) target_start = 0

  // Copy 0 bytes; we're done
  if (end === start) return
  if (target.length === 0 || source.length === 0) return

  // Fatal error conditions
  assert(end >= start, 'sourceEnd < sourceStart')
  assert(target_start >= 0 && target_start < target.length,
      'targetStart out of bounds')
  assert(start >= 0 && start < source.length, 'sourceStart out of bounds')
  assert(end >= 0 && end <= source.length, 'sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length)
    end = this.length
  if (target.length - target_start < end - start)
    end = target.length - target_start + start

  var len = end - start

  if (len < 100 || !Buffer._useTypedArrays) {
    for (var i = 0; i < len; i++)
      target[i + target_start] = this[i + start]
  } else {
    target._set(this.subarray(start, start + len), target_start)
  }
}

function _base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function _utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function _asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++)
    ret += String.fromCharCode(buf[i])
  return ret
}

function _binarySlice (buf, start, end) {
  return _asciiSlice(buf, start, end)
}

function _hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function _utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i+1] * 256)
  }
  return res
}

Buffer.prototype.slice = function (start, end) {
  var len = this.length
  start = clamp(start, len, 0)
  end = clamp(end, len, len)

  if (Buffer._useTypedArrays) {
    return Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    var newBuf = new Buffer(sliceLen, undefined, true)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
    return newBuf
  }
}

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

Buffer.prototype.readUInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  return this[offset]
}

function _readUInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    val = buf[offset]
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
  } else {
    val = buf[offset] << 8
    if (offset + 1 < len)
      val |= buf[offset + 1]
  }
  return val
}

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
  return _readUInt16(this, offset, true, noAssert)
}

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
  return _readUInt16(this, offset, false, noAssert)
}

function _readUInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    if (offset + 2 < len)
      val = buf[offset + 2] << 16
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
    val |= buf[offset]
    if (offset + 3 < len)
      val = val + (buf[offset + 3] << 24 >>> 0)
  } else {
    if (offset + 1 < len)
      val = buf[offset + 1] << 16
    if (offset + 2 < len)
      val |= buf[offset + 2] << 8
    if (offset + 3 < len)
      val |= buf[offset + 3]
    val = val + (buf[offset] << 24 >>> 0)
  }
  return val
}

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
  return _readUInt32(this, offset, true, noAssert)
}

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
  return _readUInt32(this, offset, false, noAssert)
}

Buffer.prototype.readInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null,
        'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  var neg = this[offset] & 0x80
  if (neg)
    return (0xff - this[offset] + 1) * -1
  else
    return this[offset]
}

function _readInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt16(buf, offset, littleEndian, true)
  var neg = val & 0x8000
  if (neg)
    return (0xffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt16LE = function (offset, noAssert) {
  return _readInt16(this, offset, true, noAssert)
}

Buffer.prototype.readInt16BE = function (offset, noAssert) {
  return _readInt16(this, offset, false, noAssert)
}

function _readInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt32(buf, offset, littleEndian, true)
  var neg = val & 0x80000000
  if (neg)
    return (0xffffffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt32LE = function (offset, noAssert) {
  return _readInt32(this, offset, true, noAssert)
}

Buffer.prototype.readInt32BE = function (offset, noAssert) {
  return _readInt32(this, offset, false, noAssert)
}

function _readFloat (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 23, 4)
}

Buffer.prototype.readFloatLE = function (offset, noAssert) {
  return _readFloat(this, offset, true, noAssert)
}

Buffer.prototype.readFloatBE = function (offset, noAssert) {
  return _readFloat(this, offset, false, noAssert)
}

function _readDouble (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 7 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 52, 8)
}

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
  return _readDouble(this, offset, true, noAssert)
}

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
  return _readDouble(this, offset, false, noAssert)
}

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'trying to write beyond buffer length')
    verifuint(value, 0xff)
  }

  if (offset >= this.length) return

  this[offset] = value
}

function _writeUInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 2); i < j; i++) {
    buf[offset + i] =
        (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
            (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, false, noAssert)
}

function _writeUInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffffffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 4); i < j; i++) {
    buf[offset + i] =
        (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, false, noAssert)
}

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7f, -0x80)
  }

  if (offset >= this.length)
    return

  if (value >= 0)
    this.writeUInt8(value, offset, noAssert)
  else
    this.writeUInt8(0xff + value + 1, offset, noAssert)
}

function _writeInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fff, -0x8000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt16(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt16(buf, 0xffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, false, noAssert)
}

function _writeInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fffffff, -0x80000000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt32(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt32(buf, 0xffffffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, false, noAssert)
}

function _writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 23, 4)
}

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, false, noAssert)
}

function _writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 7 < buf.length,
        'Trying to write beyond buffer length')
    verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 52, 8)
}

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, false, noAssert)
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (typeof value === 'string') {
    value = value.charCodeAt(0)
  }

  assert(typeof value === 'number' && !isNaN(value), 'value is not a number')
  assert(end >= start, 'end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  assert(start >= 0 && start < this.length, 'start out of bounds')
  assert(end >= 0 && end <= this.length, 'end out of bounds')

  for (var i = start; i < end; i++) {
    this[i] = value
  }
}

Buffer.prototype.inspect = function () {
  var out = []
  var len = this.length
  for (var i = 0; i < len; i++) {
    out[i] = toHex(this[i])
    if (i === exports.INSPECT_MAX_BYTES) {
      out[i + 1] = '...'
      break
    }
  }
  return '<Buffer ' + out.join(' ') + '>'
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer._useTypedArrays) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1)
        buf[i] = this[i]
      return buf.buffer
    }
  } else {
    throw new Error('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function (arr) {
  arr._isBuffer = true

  // save reference to original Uint8Array get/set methods before overwriting
  arr._get = arr.get
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

// slice(start, end)
function clamp (index, len, defaultValue) {
  if (typeof index !== 'number') return defaultValue
  index = ~~index;  // Coerce to integer.
  if (index >= len) return len
  if (index >= 0) return index
  index += len
  if (index >= 0) return index
  return 0
}

function coerce (length) {
  // Coerce length to a number (possibly NaN), round up
  // in case it's fractional (e.g. 123.456) then do a
  // double negate to coerce a NaN to 0. Easy, right?
  length = ~~Math.ceil(+length)
  return length < 0 ? 0 : length
}

function isArray (subject) {
  return (Array.isArray || function (subject) {
    return Object.prototype.toString.call(subject) === '[object Array]'
  })(subject)
}

function isArrayish (subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
      subject && typeof subject === 'object' &&
      typeof subject.length === 'number'
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    var b = str.charCodeAt(i)
    if (b <= 0x7F)
      byteArray.push(str.charCodeAt(i))
    else {
      var start = i
      if (b >= 0xD800 && b <= 0xDFFF) i++
      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
      for (var j = 0; j < h.length; j++)
        byteArray.push(parseInt(h[j], 16))
    }
  }
  return byteArray
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(str)
}

function blitBuffer (src, dst, offset, length) {
  var pos
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length))
      break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

/*
 * We have to make sure that the value is a valid integer. This means that it
 * is non-negative. It has no fractional component and that it does not
 * exceed the maximum allowed value.
 */
function verifuint (value, max) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value >= 0, 'specified a negative value for writing an unsigned value')
  assert(value <= max, 'value is larger than maximum value for type')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifsint (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifIEEE754 (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
}

function assert (test, message) {
  if (!test) throw new Error(message || 'Failed assertion')
}

}).call(this,require("IrXUsu"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/index.js","/node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer")
},{"IrXUsu":8,"base64-js":6,"buffer":5,"ieee754":7}],6:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS)
			return 62 // '+'
		if (code === SLASH)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	exports.toByteArray = b64ToByteArray
	exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

}).call(this,require("IrXUsu"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/base64-js/lib/b64.js","/node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/base64-js/lib")
},{"IrXUsu":8,"buffer":5}],7:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
exports.read = function(buffer, offset, isLE, mLen, nBytes) {
  var e, m,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      nBits = -7,
      i = isLE ? (nBytes - 1) : 0,
      d = isLE ? -1 : 1,
      s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity);
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
      i = isLE ? 0 : (nBytes - 1),
      d = isLE ? 1 : -1,
      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);

  buffer[offset + i - d] |= s * 128;
};

}).call(this,require("IrXUsu"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/ieee754/index.js","/node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/ieee754")
},{"IrXUsu":8,"buffer":5}],8:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

}).call(this,require("IrXUsu"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/browserify/node_modules/process/browser.js","/node_modules/gulp-browserify/node_modules/browserify/node_modules/process")
},{"IrXUsu":8,"buffer":5}]},{},[2])