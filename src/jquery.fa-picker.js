;
(function($, window, document, undefined) {

    // Create the defaults once
    //@target Target where to write the picked icon
    var pluginName = "faPicker",
        defaults = {
            target: "",
            iconsFile: "../src/jquery.fa-picker.json",
            template: "",
            container: ""
        };

    // The actual plugin constructor

    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._iconsList=[];
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function() {
            this.bootstrapIt(); // bootstrap element on which plugin has been activated
            this.bindListeners();
        },
        getListIcons: function() {
    		var deferred = new jQuery.Deferred();
        	var _self=this;
        	// Do some kind of singleton to load json data once
           	if(_self._iconsList.length == 0){
				return  $.getJSON(_self.settings.iconsFile).then(function(data) {  
					_self._iconsList = data.icons;           	
                	return _self._iconsList;
            	}); 
			}
			else{
				deferred.resolve(_self._iconsList);
				return deferred.promise();
			}

        },
        bindListeners: function() {
            var _self = this;
            $(document).on("show.bs.modal", function(event) {
                _self.buildModalContent(event);
            });
        },
        bootstrapIt: function() {
            this.element.setAttribute("data-toggle", "modal");
            this.element.setAttribute("data-target", "#myModal");
        },
        buildModalContent: function(event) {
            var _self = this;

            if (event.relatedTarget === _self.element) { // Check wether the event is aimed to this element
            	
               	var $iconsContainer= $(event.target).find(".modal-body").append("<div class='fa-container'></div>");
           		_self.getListIcons()
           			.done(function(listIcons){
           				console.log(listIcons.length);
           				$.each(listIcons,function(index,icon){
           					//console.log($iconsContainer);
           					//$iconsContainer.append("<div class='item'><i class='fa fa-"+icon.id+" fa-2x'></i></div>");
           				});
           			});
            }

        }

    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function(options) {
        this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });

        // chain jQuery functions
        return this;
    };

})(jQuery, window, document);
