# angularjs-image-view
Directive used to display images with special controls. Works responsively.

This is an angular directive used to display images with some nice attributes used to control display. It will be responsive to its container.

Currently images are lazy loaded. Example:

```
<div img-src="the-image.jpg" ratio="4:3" fade-in="2s"></div>
```

ratio - Control the ratio of the image to be displayed. Values like, "4:3", "16:9", "1:1".

fade-in - If present, will fade in the image using CSS3 transition effects.

Example:
http://gamecodemonkey.com/angular/image-view/