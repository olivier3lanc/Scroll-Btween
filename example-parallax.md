---
title: Parallax
description: Add parallax on two image layers
layout: libdoc/page-split
category: Examples
order: 100
---
```html
<figure scroll-btween="foo" 
        data-detector="detector"
        data-background-size="cover, auto |100 to 110|%"
        data-background-position="calc(50% + |0 to 110|px) calc(50% - |0 to 90|px), center">
</figure>
<div id="detector"></div>
<style>
    body {
        margin: 0; 
        height: 100vh;
    }
    figure {
        position: fixed;
        width: 100%;
        aspect-ratio: 1.5;
        top: 0;
        left: 0;
        margin: 0;
        padding: 0;
        background-image: url('../../img/gyp-front-1000.webp'), url('../../img/gyp-back-1000.webp');
    }
    #detector {
        margin-top: 100vh;
    }
    #scroll-btween-debugbar { display: none; }
</style>
```
{: .playground .playground-pin title="Add parallax on two image layers"}