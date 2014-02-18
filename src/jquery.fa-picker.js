;(function ( $, window, document, undefined ) {		

		// Create the defaults once
		//@target Target where to write the picked icon
		var pluginName = "faPicker",
				defaults = {
				target: "",
				iconsFile:"../src/jquery.fa-picker.json",
				template:"",
				container:""
		};

		// The actual plugin constructor
		function Plugin ( element, options ) {
				this.element = element;
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		Plugin.prototype = {
				init: function () {
					this.bootstrapIt();
					this.bindListeners();
					this.loadIcons();
				},
				loadIcons: function () {
						return $.getJSON(this.settings.iconsFile).then(function(data){
							return data;
						});

				},
				bindListeners:function(){
				
				},
				bootstrapIt:function(){
					this.element.setAttribute("data-toggle","modal");
					this.element.setAttribute("data-target","#myModal");
				}
		};

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
				this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}
				});

				// chain jQuery functions
				return this;
		};

})( jQuery, window, document );
