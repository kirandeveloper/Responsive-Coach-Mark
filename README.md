# Tour_Page
A Great Jquery plugin for describing other component in your page. Offer a great level of understanding about the complex component 
by providing information.
  
  * easy to use.
  * easy to  Configue.

## Dependencies
Jquery-UI

## Usuage

``` html
<!-- include the css -->
<link rel="stylesheet" href="~/coachMarks.css">

<!-- include the js -->
<script src="~/jquery-ui.js"> </script>
<script src="~/coachMark.js"> </script>
```

**Invoke**
``` javascript
$("DOM").coachMarks([options]);
```

## Options [Default]
``` javascript
{
	"isCoachMarksDisplay" :true,
	"closeOnEscape"	: true,
	"clickAnyWhereClose" : false,
	"coachMarksItems": [{ 
	   "domReference":".textboxDemo",
      "title":"Main Menu Items",
      "description":"Lorem ipsum dolor sit amet, qui cu hinc tincidunt. Vel gubergren liberavisse te.",
      "descPosition": "left",
      "seqOrder":"2"
	 }]
}
```
  * **isCoachMarkDisplay** : Boolean value to indicate wether plugin should be enabled or not. By default set to `true`
  * **closeOnEscape** : if set to true, tour plugin will be closed when you press `ESC` key in the keyboard else false. Default `true`
  * **clickAnyWhereClose** : Specify a boolean value to close when click outside the coach mark area, Default `false'
  * **coachMarksItem** : list of components to be described on that page
    - **domReference** : reference dom which is to be described
    - **title** : title for the dom to be described
    - **description** : description text goes here
    - **descPosition** : position of the coach marker, possible value are `left`, `right`, `top`, `bottom`
    - **seqOrder**: order in which the coach marks must be showed. by default set to `1`
          
## Example
```html
<div class="coachMarks"><a href="javascript:void(0)">Tour this Page</a></div>
<script>
var options  =  {
	"isCoachMarksDisplay" :true,
	"closeOnEscape"	: true,
	"clickAnyWhereClose" : false,
	"coachMarksItems": [
					{ "domReference":".textboxDemo",
	                "title":"Main Menu Items",
	                "description":"Lorem ipsum dolor sit amet, qui cu hinc tincidunt. Vel gubergren liberavisse te, pro ut invenire intellegam.",
	                "descPosition": "left",
	                "seqOrder":"2"
	                }, {
	                "domReference":".radioDemo",
	                "title":"Main Menu Items",
	                "description":"Lorem ipsum dolor sit amet, qui cu hinc tincidunt. Vel gubergren liberavisse te, pro ut invenire intellegam.",
	                "descPosition": "left",
	                "seqOrder":"1"
	                }, {
	                "domReference":".radioDemo1",
	                "title":"Main Menu Items",
	                "description":"Lorem ipsum dolor sit amet, qui cu hinc tincidunt. Vel gubergren liberavisse te, pro ut invenire intellegam.",
	                "descPosition": "left",
	                "seqOrder":"3"
	                }]
};
  $('.coachMarks').coachMarks(options);
</script>
```


## Author
Prasana k

## License
MIT
  
