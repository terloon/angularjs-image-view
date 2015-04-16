# angularjs-image-view
Directive used to display images with special controls. Works responsively.

This is an angular directive used to display images with some nice attributes used to control display. It will be responsive to its container. Also, the image will be centered to the container sizing to the given ratio.

Currently images are lazy loaded. Example:

```
<div img-src="the-image.jpg" ratio="4:3" fade-in="2" on-img-load="onLoad()"></div>
```

* **aspect-ratio** - Control the aspect-ratio of the image to be displayed. Values like, "4:3", "16:9", "1:1". If no ratio is given, it will be the size of the image.

* **fade-in** - If present, will fade in the image using CSS3 transition effects. This is used in the css to place the transition time. Valid values are floating point numbers.

* **on-img-load** - Can add function handler for when an image has finished loading.

An example can be seen at:
http://gamecodemonkey.com/angular/image-view/