;
(function($, window, document, undefined) {
    //@target Target where to write the picked icon
    var pluginName = "faPicker",
        defaults = {
            target: "#faModal",
            iconsFile: "../src/jquery.fa-picker.json",
            template: "",
            containers: {icons:".fa-container", 
            			filters:".fa-filters-toolbar",
            			sorters:".fa-sorters-toolbar"}
        };

    function FaPicker(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options, $(element).data());
        this._defaults = defaults;
        this._iconsList = []; // private field for icons data storage
        this._name = pluginName;
        this.init();
    }

    FaPicker.prototype = {
        init: function() {
            this.bootstrapIt(); // bootstrap element on which fapicker has been activated
            this.bindListeners();
        },
        //Promise that provides json structured data of font awesome icons
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
        //Binding of all listeners used into fa-picker
        bindListeners: function() {
            var _self = this;

            $(document).on("show.bs.modal", function(event) {
                _self.buildModalContent(event);
            });
            $(document).on("shown.bs.modal", function(event) {
                _self.buidlModalLayout(event);
            });
            // bind sort button click
			$(document).on('click', _self.settings.containers.sorters +" .btn-primary", function() {
			    var sortValue = $(this).attr('data-sort-value');
			    $(_self.settings.containers.icons).isotope({ sortBy: sortValue });
			});
            // filter items on button click
            $(document).on( 'click',  _self.settings.containers.filters + ' a', function( event ) {
              var filterValue = $(this).attr('data-filter-value');
              $(_self.settings.containers.icons).isotope({ filter: filterValue });
            });
        },
        //If Bootstrap is enabled, put all mechanics on element on which fa-picker is activated
        bootstrapIt: function() {
            this.element.setAttribute("data-toggle", "modal");
            this.element.setAttribute("data-target", this.settings.target);
        },
        buildModalContent: function(event) {
            var _self = this;
            if (event.relatedTarget === _self.element) { // Check wether the event is aimed to this element              
                if (_self._iconsList.length == 0) {                   
                    _self.getListIcons()
                        .done(function(listIcons) {                            
                            $(event.target).find(".modal-body").html(_self.getHtmlIconsContainer(listIcons));  
                            var arrayFilters=  _self.extractFiltersFromListIcons();
                            $(event.target).find(".modal-body").prepend( _self.getHtmlFiltersToolbar(arrayFilters));                             
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
                    name: '[data-fa-name]'
                },
            });
        },

        getHtmlFiltersToolbar:function(filters){
          var  _self=this;
            var $toolbar= $("<div class='col-sm-3 "+_self.settings.containers.filters.substring(1)+"'><h4>Filtrer par: </h4></div>");            
            var $rowsContainer= $("<div class=\"list-group\"></div>");
            $.each(filters,function(index,filter){
                var rowHtml="<a data-filter-value=\"."+_self.getFilterHash(filter)+"\" href='javascript:void(0) 'class=\"list-group-item\">"
                            +""
                            +filter+"    </li>  </ul>";
                $rowsContainer.append(rowHtml);
            });
            $toolbar.append($rowsContainer);
            return $toolbar;
                        
        },
        getHtmlIconsContainer:function(listIcons){
            var _self=this;
            var $iconsContainer = $("<div class='col-sm-9'><div class='"+_self.settings.containers.icons.substring(1)+"'></div></div>");
            $.each(listIcons, function(index, icon) {
                var filterClasses="";
                $.each(icon.categories,function(index,category){
                    filterClasses += " "+_self.getFilterHash(category);
                });
                $iconsContainer.find(_self.settings.containers.icons).append("<div data-fa-name='"+icon.name+"' class='fa-item" + filterClasses 
                    + "'><a href='javascript:void(0)'><i class='fa fa-" 
                    + icon.id + " fa-2x'></i><span class='name'>"+icon.name+"</span></a></div>");
            });
            return $iconsContainer;
        },
        getHtmlSortersToolbar:function(sorters){

        },
        //Get all unique filters
        extractFiltersFromListIcons:function(){
            var arrayFilters=[];
            $.each(this._iconsList,function(index,item){
              $.merge(arrayFilters,item.categories);
            });           ;
            return $.unique($.unique($.unique($.unique(arrayFilters)))); // /!\ToDo still don't understand why I have to do stack all ugly recursive unique: awful

        },
        getFilterHash: function(filterStr){
            var hash = 0;
            if (filterStr.length == 0) return hash;
            for (i = 0; i < filterStr.length; i++) {
                char = filterStr.charCodeAt(i);
                hash = ((hash<<5)-hash)+char;
                hash = hash & hash; // Convert to 32bit integer
            }
            return hash;
        }

    };

    $.fn[pluginName] = function(options) {
        this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new FaPicker(this, options));
            }
        });
        return this;
    };

})(jQuery, window, document);
