// https://github.com/jquery-boilerplate/jquery-boilerplate/blob/master/src/jquery.boilerplate.js
//
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
//
// undefined is used here as the undefined global variable in ECMAScript 3 is
// mutable (ie. it can be changed by someone else). undefined isn't really being
// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
// can no longer be modified.
//
// window and document are passed through as local variable rather than global
// as this (slightly) quickens the resolution process and can be more efficiently
// minified (especially when both are regularly referenced in your plugin).
;(function ( $, window, document, undefined ) {

	"use strict";

	// Create the defaults once
	var pluginName = "defaultPluginName",
		defaults = {
		propertyName: "value"
	};

	// Private functions can access the plugin
	function privateFunction(plugin) {
		console.log("plugin.settings.propertyName = ", plugin.settings.propertyName);
	}

	// The actual plugin constructor
	function Plugin ( element, options ) {
		this.element = element;
		// jQuery has an extend method which merges the contents of two or
		// more objects, storing the result in the first object. The first object
		// is generally empty as we don't want to alter the default options for
		// future instances of the plugin
		this.settings = $.extend( {}, defaults, options );
		this._name = pluginName;
		this.init();
	}

	// Avoid Plugin.prototype conflicts
	$.extend(Plugin.prototype, {
		init: function () {
			// Place initialization logic here
			// You already have access to the DOM element and
			// the options via the instance, e.g. this.element
			// and this.settings
			console.log("xD");

			// Calling a private function that dont have access to "this",
			// you need to pass the plugin
			privateFunction(this);

			// Calling a function that has access to "this"
			this.yourOtherFunction();
		},
		yourOtherFunction: function () {
			// some logic
		},
		publicFunction: function () {
			console.log("public function with propertyName = ", this.settings.propertyName);
		}
	});

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[ pluginName ] = function ( options ) {
		return this.each(function() {
			if ( !$.data( this, "plugin_" + pluginName ) ) {
				$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
			}
		});
	};

})( jQuery, window, document );

// Usage examples:
//
// All divs on page:
// $('div').defaultPluginName();
//
// Each plugin with different options:
// $('.element1').defaultPluginName({propertyName: "value1"});
// $('.element2').defaultPluginName({propertyName: "value2"});
//
// Using methods and changing state:
// var plugin1 = $('.element1').data('plugin_defaultPluginName');
// plugin1.publicFunction();
