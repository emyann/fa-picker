#FontAwesome Bootstrap Picker

This jQuery plugin runs into Bootstrap context and provides a way to browse all `font-awesome` 4 icons using `isotope` dynamic placement. FaPicker uses a json-parsed yml file called `icons.yml` which is located into Font Awesome official repository. That allows to provide all necessary metadata in order to improve user browsing experience.


##Demos
[Basic Example](http://emyann.github.io/fa-picker/)


## Initialize
### In HTML 

``` html
  <input type="text" id="myElement" name="TileIcon" data-dnp-widget="fapicker" title="Icon Title" placeholder="Ex: fa fa-envelope" value="">
```
### In JavaScript
Element Basis
``` js
  $("#myElement").faPicker();
```

Global instantiation
``` js
  $("[data-dnp-widget='fapicker']").faPicker();
```

## Todo

- [X] Build Grid Layout
- [ ] Medata Filters
- [X] Metadata Sorters
- [ ] Export selected icon data
- [ ] Events: broadcast chosen icon
