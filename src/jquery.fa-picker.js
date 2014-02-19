;
(function($, window, document, undefined) {


    //@target Target where to write the picked icon
    var pluginName = "faPicker",
        defaults = {
            target: "",
            iconsFile: "../src/jquery.fa-picker.json",
            template: "",
            containers: {icons:".fa-container", 
            			filters:".fa-filters-toolbar",
            			sorters:".fa-sorters-toolbar"}
        };

    function Plugin(element, options) {
        this.element = element;

        this.settings = $.extend({}, defaults, options, $(element).data());

        this._defaults = defaults;
        this._iconsList = [];
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
            var _self = this;
            // Do some kind of singleton to load json data once
            if (_self._iconsList.length == 0) {
                return $.getJSON(_self.settings.iconsFile).then(function(data) {
                    _self._iconsList = data.icons;
                    return _self._iconsList;
                });
            } else {
                deferred.resolve(_self._iconsList);
                return deferred.promise();
            }

        },
        bindListeners: function() {
            var _self = this;

            $(document).on("show.bs.modal", function(event) {
                _self.buildModalContent(event);
            });
            $(document).on("shown.bs.modal", function(event) {
                _self.buidlModalLayout(event);
            });
            // bind sort button click
			$(document).on( 'click', _self.settings.containers.sorters +" .btn-primary", function() {
			    var sortValue = $(this).attr('data-sort-value');
			    $(_self.settings.containers.icons).isotope({ sortBy: sortValue });
			});
        },
        bootstrapIt: function() {
            this.element.setAttribute("data-toggle", "modal");
            this.element.setAttribute("data-target", "#myModal");
        },
        buildModalContent: function(event) {
            var _self = this;

            if (event.relatedTarget === _self.element) { // Check wether the event is aimed to this element              
                if (_self._iconsList.length == 0) {
                    var $iconsContainer = $("<div class='fa-container'></div>")
                    _self.settings.container = $iconsContainer;
                    _self.getListIcons()
                        .done(function(listIcons) {
                            $.each(listIcons, function(index, icon) {

                                $iconsContainer.append("<div class='fa-item " + icon.categories.join(", ") 
                                	+ "'><a href='javascript:void(0)'><i class='fa fa-" 
                                	+ icon.id + " fa-2x'></i></a><h4 class='name'>"+icon.name+"</h4></div>");
                            });
                            $(event.target).find(".modal-body").html($iconsContainer);

                        });
                }

            }

        },
        buidlModalLayout: function() {
            var _self = this;
           $(_self.settings.containers.icons).isotope({
                // options
                itemSelector: '.fa-item',
                layoutMode: 'fitRows',
                getSortData: {
                    name: '.name'
                },
            });
        },






    };


    $.fn[pluginName] = function(options) {
        this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });

        return this;
    };

})(jQuery, window, document);
