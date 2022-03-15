---
title: Page progress
description: Progress bar level based on the document scroll position.
layout: libdoc/page-split
category: Examples
order: 100
---
```html
<div id="progress-bar" scroll-btween="foo" data-detector="page-wrapper" data-width="|0 to 100|%"></div>
<div id="page-wrapper">Start, scroll until the end and watch the progress bar at the top...</div>
<p>This is the end of the page <a href="#">Return to top</a></p>
<style>
    body {
        font-family: monospace;
    }
    #progress-bar { 
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background-color: yellowgreen;
    }
    #page-wrapper {
        height: 800vh;
        margin-top: 90vh;
        margin-bottom: 100vh;
    }
    #scroll-btween-debugbar { display: none }
</style>
```
{: .playground .playground-pin}