---
title: Usage
description: How to use Scroll Btween
layout: libdoc/page
category: Getting started
order: 12
---
* 
{:toc}

**The Scroll Btween syntax follows the CSS value inline syntax.** You can add as much tweens as you want. You can even add multiple tweens on the same CSS property. You can specify the tween to apply as follows:

## Global parameters

Adjustable global parameters accessible in `scoll-btween.js` 

| `scrollBtween.defaults.` | Type | Default | Description |
|:-|:-|:-|:-|
| `frameDurationinMs` | integer | 20 | Duration in ms between to animation states |
| `tweenerIntervalinMs` | integer | 300 | Smoothness of the change. Available only if Ola tweener is enabled, duration between to tweens |

```html
<!-- Syntax -->
<div    scroll-btween="[YOUR_UNIQUE_ID]"
        data-[CSS_PROPERTY]="|[X1] to [Y1]|...|[X2] to [Y2]|..."></div>
```

```html
<!-- Example 1 -->
<p scroll-btween="foo" data-left="|-50 to 50|%">A paragraph</p>
<!-- Example 2 -->
<p  scroll-btween="foo2" 
    data-transform="translateX(|-100 to 0|%) translateY(|50 to 0|%) scale(|1 to 2|)">Another paragraph</p>
<!-- Example 3 -->
<p  scroll-btween="foo3" 
    data-background-color="rgba(|34 to 255|, |255 to 128|, 50, |1 to 0.2|)" 
    data-padding="|2 to 3|em |1 to 3|em">Another paragraph</p>
```

* `scroll-btween="[YOUR_UNIQUE_ID]"` Declaration to assign CSS tweening on this node.
* `data-[CSS_PROPERTY]="|X to Y|"` Enter standard CSS value expression specifying numeric values to tween between pipes `|X to Y|`.
    * `data-[CSS_PROPERTY]` specifies the CSS property onto which applying the tween. For example `data-color` or `data-width` etc.
    * `X` is the start value when the element not visible into the viewport yet - [intersection](how-it-work.html) is below 0.
    * `[space]to[space]` is the operator to enter between X start value and Y end value.
    * `Y` is the end value when the element has passed the viewport - [intersection](how-it-work.html) is over 1.


```html
<p>Scroll down</p>
<!-- Single tween into a single CSS property -->
<div scroll-btween="basic-1" data-width="|30 to 100|%">
    <ul>
        <li>This div's width starts from 30% width and is tweened to 100% throughout the intersection between itself and screen</li>
        <li>The div element not yet into the viewport: Width is equal to 30%</li>
        <li>The div is into the viewport: Width is tweening between 30 and 100 proportionally to the element's position.</li>
        <li>The div element has passed viewport: Width is equal to 100%</li>
    </ul>
</div>

<!-- Multiple tweens in a single CSS property -->
<div scroll-btween="basic-2" data-padding="|100 to 10|px |30 to 80|px">
    <p>Throughout the intersection between this div and the screen:</p>
    <ul>
        <li>This div's padding top and bottom starts from 100px and is tweened to 10px</li>
        <li>This div's padding left and right starts from 30px and is tweened to 80px</li>
    </ul>
</div>

<!-- Multiple tweens in multiple CSS properties -->
<div scroll-btween="basic-3" data-transform="scale(|0.5 to 1|) skew(|-20 to 20|deg)" data-color="rgb(|50 to 100|,|200 to 100|,|255 to 0|)">
    <p>Throughout the intersection between this div and the screen:</p>
    <ul>
        <li>This div's transform scale starts from 0.5 and is tweened to 1</li>
        <li>This div's transform skew starts from -20deg and is tweened to 20deg</li>
        <li>This div's color property starts from rgb(50,200,255) and is tweened to rgb(100,100,0)</li>
    </ul>
</div>
<style>
    /* DEMO PURPOSE ONLY */
    body {
        padding-bottom: 100vh;
    }
    [scroll-btween] {
        margin-top: 100vh;
        background-color: #F3F3F3;
        transform-origin: left center;
    }
    #scroll-btween-debugbar { display: none; }
</style>
```
{:.playground}

## Detector

By default, scroll binded elements are their own detector: It means the [intersection](how-it-work.html) is computed in relation with this element itself. But **it possible to assign another DOM element as detector** for the intersection.

```html
<h2 scroll-btween="foo" data-detector="detector" data-background-color="rgb(|0 to 255|,|255 to 0|,0)">
    I am foo: Green until detector passes.<br>
    I fade to red when my detector passes the viewport.
</h2>
<p id="detector">I am the detector for <strong>foo</strong></p>
<style>
   /* DEMO PURPOSE ONLY */
    body { min-height: 300vh; }
    [scroll-btween="foo"] { position:fixed; top: 0; left: 0; }
    #detector { margin-top:110vh; margin-bottom: 20vh; background: #EEE }
</style>
```
{:.playground}

## Keyframes

As seen earlier, [intersection](how-it-works.html) is based on the position of the element - or its [detector](#Detector) - into the viewport. 
It is possible to split the transition into multiple parts using **keyframes** with the following syntax:

* `data-[CSS_PROPERTY]="|a:X to b:Y to c:Z to etc|"` A CSS property is set with keyframes.
* `a`, `b` and `c` are percentages of the element's position into the viewport.
* `a < b < c` keyframes always start from 0 and go to 100.
* `X` is the start value of the CSS property when [intersection](how-it-work.html) is equal (in percent) to `a`.
* `Y` is the intermediate value of the CSS property when [intersection](how-it-work.html) is equal (in percent) to `b`.
* `Z` is the intermediate value of the CSS property when [intersection](how-it-work.html) is equal (in percent) to `c`.
* etc


```html
<h2 scroll-btween="foo"
    data-padding-left="|0:0 to 50:150 to 100:150|px">
    I get 150px of padding left and sto growing when i reach the middle of the screen.
</h2>
<h2 scroll-btween="bar"
    data-padding-left="|0:0 to 40:0 to 60:150 to 100:150|px">
    I go from 0px to 150px of padding left when i roam between 40% and 60% of the screen.
</h2>
<style>
   /* DEMO PURPOSE ONLY */
    h2 { margin-top: 90vh; margin-bottom: 100vh }
</style>
```
{:.playground}

## Methods

Scroll Btween comes with the following methods.

* `scrollBtween.getIntersection(element)` Returns the intersection value of the specified element.
* `scrollBtween.update()` Start Scroll Btween or update instances if DOM has changed.
* `scrollBtween.stop()` Stops all tweens, disable all tweens.
* `scrollBtween.start()` Start all tweens.

