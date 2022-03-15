---
title: Image reveal
description: View blurred version of an image and reveal source image on scroll
layout: libdoc/page-split
category: Examples
order: 100
---
```html
<div id="example-reveal">
    <img    src="{{'img/image-reveal-blurred.webp'|absolute_url}}"
            alt="Blurred image">
    <div    id="example-reveal-img-wrapper" 
            scroll-btween="example-reveal" 
            data-detector="detector" 
            data-width="|0 to 100|%">
        <img    src="{{'img/image-reveal.webp'|absolute_url}}" 
                alt="Source image">
    </div>
</div>
<p id="detector">I am the detector for <strong>#example-reveal</strong></p>
<style>
    body {
        height: 200vh;
        font-family: monospace;
    }
    #example-reveal {
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
    }
    img {
        width: 100%;
        height: auto;
    }
    #example-reveal-img-wrapper {
        position: absolute;
        width: 0%;
        height: 100%;
        top: 0;
        left: 0;
        overflow: hidden;
    }
    #example-reveal-img-wrapper img {
        width: auto;
        height: 100%;
    }
    #detector { 
        margin-top: 100vh; 
        margin-bottom: 60vh;
        background-color: #FFF9;
        position: relative;
    }
    #scroll-btween-debugbar { display: none }
</style>
```
{: .playground .playground-pin}