#FontAwesome Bootstrap Picker

Built-on top of masonry.js, this jQuery plugin runs into Bootstrap context and provides a way to browse all font-awesome 4 icons using masonry dynamic placement. FaPicker uses a json-parsed yml file called icons.yml which is located into Font Awesome official repository. That allows to provides all necessary metadata in order to improving user browinsg experience.

## Initialize
### In HTML

Add a class of `js-masonry` to your element. Options can be set in JSON in `data-masonry-options`.

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