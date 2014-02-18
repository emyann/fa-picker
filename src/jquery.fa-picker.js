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
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function() {
            this.bootstrapIt();
            this.bindListeners();
        },
        loadIcons: function() {
            return $.getJSON(this.settings.iconsFile).then(function(data) {
                return data;
            });

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
           		/*_self.loadIcons()
           			.done(function(data){
           				
           				$.each(data.icons,function(index,icon){
           					console.log($iconsContainer);
           					$iconsContainer.append("<div class='item'><i class='fa fa-"+icon.id+" fa-2x'></i></div>");
           				});
           			});*/
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
