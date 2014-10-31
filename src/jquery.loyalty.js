;(function ( $, window, document, undefined ) {

		var pluginName = 'loyalty',
				defaults = {
					antiflickercss: 'true', // Dynamically add css to prevent "flicker"
					delay: 30, // Minimum time (in minutes) between valid site views
					debug: 'false', // Set true to print debuggin info in the console
					runbefore: null, // Code to fire before Loyalty Render
					runafter: null // Code to fire after Loyalty Render
				};

		// The actual plugin constructor
		function Plugin ( element, options ) {
				this.element = element;
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		$.extend(Plugin.prototype, {
				init: function () {

					var runbefore = this.settings.runbefore;
					var runafter = this.settings.runafter;

					if(this.settings.antiflickercss === 'true'){
						$('head').append('<!-- Added by LOYALTYJS --><style type="text/css">*[data-loyalty]{display: none;}</style>');
						if(this.settings.debug === 'true'){
							console.log('Loyalty: Added anti-flicker css to HEAD tag.');
						}
					} else {
						if(this.settings.debug === 'true'){
							console.log('Loyalty: Did not add anti-flicker css to HEAD tag.');
						}
					}

					if(typeof runbefore === 'function'){
						if(this.settings.debug === 'true'){
							console.log('Loyalty: Running runbefore function.');
						}
						runbefore();
					}

					this.trackViews(this.settings.delay, function(){
						if(typeof runafter === 'function'){
							if(this.settings.debug === 'true'){
								console.log('Loyalty: Running runafter function.');
							}
							runafter();
						}
					});
				},

				trackViews: function(delay, callback){

					var compare = delay * 60000;

					if (Storage !== void(0)){

						var viewsCount = 0;

						if(localStorage.getItem('loyalty_views')){
							viewsCount = parseInt(localStorage.getItem('loyalty_views'));
						}

						var newViewsCount = viewsCount + 1;
						var now = new Date().getTime() / compare;

						if(localStorage.getItem('loyalty_timestamp')){
							
							var then = localStorage.getItem('loyalty_timestamp');

							if(this.settings.debug === 'true'){
								console.log('Loyalty: If ' + (now - then) + ' is > than ' + this.settings.delay + ' this will count as a new loyalty page view.');	
							}

							if((now - then) > this.settings.delay){
								this.bumpCount(newViewsCount, now);
							}
						
						} else {
							this.bumpCount(newViewsCount, now);
						}
					}

					this.domRender();

					if(typeof callback === 'function'){
						callback();
					}

				},

				bumpCount: function(value, time){
					
					if(this.settings.debug === 'true'){
						console.log('Loyalty: Counting as a new session');
					}

					localStorage.setItem('loyalty_views', value);
					localStorage.setItem('loyalty_timestamp', time);

					this.domRender();

				},

				domRender: function(){
					
					var viewsCount = 0;

					if(localStorage.getItem('loyalty_views')){
						viewsCount = parseInt(localStorage.getItem('loyalty_views'));
					}

					// Render counts
					$('*[data-loyalty-count]').each(function(){
						$(this).text(viewsCount);
					});

					// Render DOM Data Attribute
					$('html').attr('data-loyaltyViews', viewsCount);

					$('*[data-loyalty]').each(function(){
						$this = $(this);
						var min = $this.attr('data-loyalty-min');
						var max = $this.attr('data-loyalty-max');

						// Hide / show elements

						if((typeof min === 'undefined' && typeof max === 'undefined') || (min === '' && max === '')){
							
							var exact = parseInt($this.attr('data-loyalty'));
							
							if(viewsCount === exact){
								$this.show();
							} else {
								$this.hide();
							}

						} else {

							if(typeof min === 'undefined' || min === ''){
								min = 0;
							}

							if(typeof max === 'undefined' || max === ''){
								max = 99999999;
							}

							if(viewsCount >= min && viewsCount <= max){
								$this.show();
							} else {
								$this.hide();
							}

						}
						
					});
				}
		});

		$.fn[ pluginName ] = function ( options ) {
				this.each(function() {
						if ( !$.data( this, 'plugin_' + pluginName ) ) {
								$.data( this, 'plugin_' + pluginName, new Plugin( this, options ) );
						}
				});
				
				return this;
		};

})( jQuery, window, document );
