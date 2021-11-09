---
title: Morphing
description: Morphing text
layout: libdoc/page-split
---
```html
<style>
    body {
        margin: 0; padding:0;
        background-color: black;
        color: white;
    }
    article {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    p {
        font-size: 20vmin;
        font-weight: bold;
        letter-spacing: -0.1em;
        margin: 0;
        text-align: center;
        white-space: nowrap;
        position: relative;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        height: 20vmin;
        line-height: 1em;
    }
    p > span {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        opacity: 0;
    }
    .detector { margin-top: 95vh; margin-bottom: 95vh; }
    #scroll-btween-debugbar { display: none; }
</style>
<article>
    <p>
        <span scroll-btween="w1" 
                scroll-btween-detector="detector-w1" 
                data-opacity="|0:1 to 98:1 to 100:0|" 
                data-letter-spacing="|0:-0.1 to 100:0|em">my</span>
        <span scroll-btween="w2" 
                scroll-btween-detector="detector-w2" 
                data-opacity="|0:0 to 2:1 to 98:1 to 100:0|" 
                data-letter-spacing="|0:-0.1 to 100:0|em">first</span>
        <span scroll-btween="w3" 
                scroll-btween-detector="detector-w3" 
                data-opacity="|0:0 to 2:1 to 98:1 to 100:0|" 
                data-letter-spacing="|0:-0.1 to 100:0|em">morphing</span>
        <span scroll-btween="w4" 
                scroll-btween-detector="detector-w4" 
                data-opacity="|0:0 to 2:1 to 98:1 to 100:0|" 
                data-letter-spacing="|0:-0.1 to 100:0|em">text</span>
        <span scroll-btween="w5" 
                scroll-btween-detector="detector-w5" 
                data-opacity="|0:0 to 2:1 to 98:1 to 100:0|" 
                data-letter-spacing="|0:-0.1 to 100:0|em">to</span>
        <span scroll-btween="w6" 
                scroll-btween-detector="detector-w6" 
                data-opacity="|0:0 to 2:1 to 98:1 to 100:0|" 
                data-letter-spacing="|0:-0.1 to 100:0|em">display</span>
    </p>
</article>
<div id="detector-w1" class="detector">&nbsp;</div>
<div id="detector-w2" class="detector">&nbsp;</div>
<div id="detector-w3" class="detector">&nbsp;</div>
<div id="detector-w4" class="detector">&nbsp;</div>
<div id="detector-w5" class="detector">&nbsp;</div>
<div id="detector-w6" class="detector">&nbsp;</div>
        
```
{: .playground}