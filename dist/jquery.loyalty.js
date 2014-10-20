/*
 *  jQuery Boilerplate - v3.3.4
 *  A jump-start for jQuery plugins development.
 *  http://jqueryboilerplate.com
 *
 *  Made by Zeno Rocha
 *  Under MIT License
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = 'loyalty_js',
				defaults = {
					delay: 30
				};

		// The actual plugin constructor
		function Plugin ( element, options ) {
				this.element = element;
				// jQuery has an extend method which merges the contents of two or
				// more objects, storing the result in the first object. The first object
				// is generally empty as we don't want to alter the default options for
				// future instances of the plugin
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
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
						// you can add more functions like the one below and
						// call them like so: this.yourOtherFunction(this.element, this.settings).
						this.trackViews(this.settings.delay);
				},

				trackViews: function(delay){

					var compare = delay * 60000;

					if (Storage !== void(0)){

						var viewsCount = 0;

						if(localStorage.getItem('loyalty_views')){
							viewsCount = parseInt(localStorage.getItem('loyalty_views'));
						}

						var newViewsCount = viewsCount + 1;
						
						if(localStorage.getItem('loyalty_timestamp')){
							var now = new Date().getTime() / compare;
							var then = localStorage.getItem('loyalty_timestamp');

							if((now - then) > compare){
							Roots.common.bumpCount(newViewsCount, compare);
							}
						
						} else {
							Roots.common.bumpCount(newViewsCount, compare);
						}

						this.domRender();
					
					}
				},

				bumpCount: function(value, compare){
					console.log('LoyaltyJs: Counting as a new session');
					localStorage.setItem('loyalty_views', value);
					localStorage.setItem('loyalty_timestamp', new Date().getTime() / compare);
				},

				domRender: function(){
					// Render DOM Data Attribute
					$('html').attr('data-loyaltyViews', newViewsCount);
				}
		});

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
				this.each(function() {
						if ( !$.data( this, 'plugin_' + pluginName ) ) {
								$.data( this, 'plugin_' + pluginName, new Plugin( this, options ) );
						}
				});

				// chain jQuery functions
				return this;
		};

})( jQuery, window, document );
