---
title: Text background clip
description: An example with large amount of text clipped with background.
layout: libdoc/page-split
category: Examples
order: 100
---
```html
<section id="wrapper-playground">
    <article id="element">
        <p  scroll-btween="test1" 
            data-text-indent="|0 to -200|px">the canopy is the aboveground portion of a plant croping or crop, formed by the collection of individual plant crowns.</p>
        <p  scroll-btween="test2" 
            data-text-indent="|-200 to 0|px">In forest ecology, canopy also refers to the upper layer or habitat zone, formed by mature tree crowns and including other biological organisms </p>
        <p  scroll-btween="test3" 
            data-text-indent="|0 to -200|px">Sometimes the term canopy is used to refer to the extent of the outer layer of leaves of an individual tree or group of trees.</p>
        <p  scroll-btween="test4" 
            data-text-indent="|-200 to 0|px">Shade trees normally have a dense canopy that blocks light from lower growing plants. </p>
        <p  scroll-btween="test5" 
            data-text-indent="|0 to -200|px">Early observations of canopies were made from the ground using binoculars or by examining fallen material</p>
        <p  scroll-btween="test6" 
            data-text-indent="|-200 to 0|px">Researchers would sometimes erroneously rely on extrapolation by using more reachable samples taken from the understory.</p>
        <p  scroll-btween="test1_2" 
            data-text-indent="|0 to -200|px">In some cases, they would use unconventional methods such as chairs suspended on vines or hot-air dirigibles, among others.
        </p>
        <p  scroll-btween="test2_2" 
            data-text-indent="|-200 to 0|px">Modern technology, including adapted mountaineering gear, has made canopy observation significantly easier and more accurate</p>
        <p  scroll-btween="test3_2" 
            data-text-indent="|0 to -200|px">Canopy structure is the organization or spatial arrangement of a plant canopy.</p>
        <p  scroll-btween="test4_2" 
            data-text-indent="|-200 to 0|px">The canopy is taller than the understory layer. The canopy holds 90% of the animals in the rainforest. </p>
        <p  scroll-btween="test5_2" 
            data-text-indent="|0 to -200|px">They cover vast distances and appear to be unbroken when observed from an airplane. </p>
        <p  scroll-btween="test6_2" 
            data-text-indent="|-200 to 0|px">However, despite overlapping tree branches, rainforest canopy trees rarely touch each other.</p>
    </article>
</section>
<style>
    body {
        margin: 0; padding:0;
    }
    #wrapper-playground {
        height: 500vh;
        background: black;
        padding-top: 50vh;
    }
    #element {
        width: 100%;
        height: 100vh;
        overflow: hidden;
        background: center / cover no-repeat url('../../img/canopy.webp');
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        font-size: 10vh;
        text-transform: uppercase;
        font-family: sans-serif;
        font-weight: bold;
        letter-spacing: -0.15em;
        line-height: 0.8em;
        text-align: center;
    }
    #element p {
        margin: 0;
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        white-space: nowrap;
        width: 100%;
    }
    #scroll-btween-debugbar { display: none; }
</style>
```
{: .playground .playground-pin}