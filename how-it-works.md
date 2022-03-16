---
title: How it works?
description: Details about Scroll Btween
layout: libdoc/page
category: Getting started
---
The following playground shows the associated **intersection with its id which is the key value to sync CSS properties**. 
* `Below 0` the element is below the viewport. 
* `Between 0 and 1` the element is into the viewport. 
    * Just above zero, the **top** of the element has just entered the viewport. 
    * Around 0.5, the **middle** of the element is at the middle of the viewport. 
    * Just inferior to 1, the **bottom** of the element is about to leave the viewport.
* `Above 1` the element has been already scrolled into the viewport. 

```html
<h1 scroll-btween="foo" data-padding-left="|0 to 100|px">Foo</h1>
<style>
   /* DEMO PURPOSE ONLY */
    body { min-height: 300vh; }
    [scroll-btween="foo"] { 
        margin: 110vh 0;
        position: relative;
    }
    body::before, [scroll-btween="foo"]::before, [scroll-btween="foo"]::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        display: block;
        width: 100%;
        border-top: 1px dotted lightgrey;
    }
    [scroll-btween="foo"]::after {
        content: attr(style);
        font-size: x-small;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        top: 0;
        height: 100%;
        z-index: 1;
        border-bottom: 1px dotted lightgrey;
    }
    body::before {
        content: 'Middle of the screen';
        position: fixed;
        color: lightgrey;
        padding-left: 1em;
        border-top: 1px dashed lightgrey;
    }
</style>

```
{:.playground}