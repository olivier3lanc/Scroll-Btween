---
title: Texts slides
description: Letter spacing and scale transitions effects
layout: libdoc/page-split
category: Examples
order: 100
---
```html
<article>
    <p>
        <span scroll-btween="w1" 
                data-detector="detector-w1" 
                data-opacity="|0:1 to 98:1 to 100:0|" 
                data-transform="scale(|0:1 to 98:1 to 100:2|)" 
                data-letter-spacing="|0:-0.05 to 100:0|em">Scroll</span>
        <span scroll-btween="w2" 
                data-detector="detector-w2" 
                data-opacity="|0:0 to 2:1 to 98:1 to 100:0|" 
                data-transform="scale(|0:0 to 2:1 to 98:1 to 100:2|)" 
                data-letter-spacing="|0:-0.1 to 100:0|em">down</span>
        <span scroll-btween="w3" 
                data-detector="detector-w3" 
                data-opacity="|0:0 to 2:1 to 98:1 to 100:0|" 
                data-transform="scale(|0:0 to 2:1 to 98:1 to 100:2|)" 
                data-letter-spacing="|0:-0.1 to 100:0|em">spacing</span>
        <span scroll-btween="w4" 
                data-detector="detector-w4" 
                data-opacity="|0:0 to 2:1 to 98:1 to 100:0|" 
                data-transform="scale(|0:0 to 2:1 to 98:1 to 100:2|)" 
                data-letter-spacing="|0:-0.1 to 100:0|em">effect</span>
        <span scroll-btween="w5" 
                data-detector="detector-w5" 
                data-opacity="|0:0 to 2:1 to 98:1 to 100:0|" 
                data-transform="scale(|0:0 to 2:1 to 98:1 to 100:2|)" 
                data-letter-spacing="|0:-0.1 to 100:0|em">on your</span>
        <span scroll-btween="w6" 
                data-detector="detector-w6" 
                data-opacity="|0:0 to 2:1 to 98:1 to 100:0|" 
                data-transform="scale(|0:0 to 2:1 to 98:1 to 100:2|)" 
                data-letter-spacing="|0:-0.1 to 100:0|em">screen</span>
    </p>
</article>
<div id="detector-w1" class="detector">&nbsp;</div>
<div id="detector-w2" class="detector">&nbsp;</div>
<div id="detector-w3" class="detector">&nbsp;</div>
<div id="detector-w4" class="detector">&nbsp;</div>
<div id="detector-w5" class="detector">&nbsp;</div>
<div id="detector-w6" class="detector">&nbsp;</div>
        
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
```
{: .playground .playground-pin}