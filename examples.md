---
title: Examples
description: Detailed usage examples of ScrollBtween with its code
#layout: styleguide/playground
#playground: true
---
## Basic

Here are basic examples of ScrollBtween usage.

```html
<div    class="basic"
        scroll-btween="bar" 
        data-background="linear-gradient(to right, #bfd255 0%, #8eb92a |1 to 96|%, yellowgreen |4 to 99|%, yellowgreen 100%)">
    Scroll and watch my background gradient change
</div>
<div    class="basic"
        scroll-btween="foo" 
        data-background-color="rgb(|255 to 10|,|50 to 90|,|122 to 40|)">
    Scroll and watch my background color change
</div>

<style>
    /* DEMO PURPOSE ONLY */
    .basic { height: 300vh; }
    #scroll-btween-debugbar { display: none; }
</style>
```
{: .playground}

## Star wars

Star wars end credits style.

```html
<style>
    #detector { height: 500vh; }
    #wrapper-playground { 
        perspective: 1000px;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        font-size: 36px;
    }
    [scroll-btween="text"] {
        transform-origin: top;
        padding: 3em;
    }
    h1 { font-size: 60px; }
    img { margin-right: 1em; float:left; }
</style>
<section id="wrapper-playground">
    <article    scroll-btween="text"
                scroll-btween-detector="detector"
                data-transform="rotateX(50deg) translateY(|30 to -150|%)">
        <h1>Delphis mote however to or whose coffined</h1>
        <p><a href="#earth"><img src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Rotating_earth_%28large%29.gif" alt="alt text"></a> Little to congealed sick his stalked. Sun flatterers soul had me a his. Blazon a massy his of gild and. Would passion een he care, and plain his clay in felt counsel, whateer to is made loved to done that, pleasure and a ive cared control dwelt sadness. All by to in time night. Yet who befell wassailers if he have nor lands, or be sea his so. Brow begun sighed sacred or this some of. To uncouth bliss his many where loathed the found and. Sighed parasites nor childe chaste once visit it childe the.</p>
        <p>A scene fountain of save known in, and long night and mine his. And parasites and consecrate say but, sore congealed from later his a to more superstition, and that few had drugged did nor the, any breast he sadness fondly weary, from by one ofttimes ye earth  flatterers, and flee in ear consecrate from left den. Might a childe was and did had thence or their, smile full and long his aisle than ever once, were nor lone tales wandered. Start with feeble girls are. And come shamed his spoiled his den worse ere, or his plain far this not me. That and drowsy his said, run given scarce the albions her not at sister ever, the and condemned of strange flatterers harold. Ear a from wins it any, wassailers said the flee are heart such. Most of had childe times would maidens not his deem, talethis harolds land suffice flow is he cared visit honeyed. Then yet begun superstition of the begun way still. And perchance since could or a revellers gild where himnot. In knew unto ah now mood bower that, not so he pride for there there tis the, nor that mine present yea, where dote not and favour which a mirthful, felt where within hope departed, seemed ere agen to could and would of, yet waste such men that lines he. Ever sun vast ancient not heavenly his. They his hall plain was me, childe one disporting forgot ive day a feels. Sight strange save since sister were tis ungodly. A aisle along known and holy, through and loved soul prose third this bower caught. Of left know he flow break to eros nor a. And my concubines pillared to pilgrimage weary long been given. Smile labyrinth he such not found, a long of before will for a this come. Harold minstrels if his sooth. Fall long he stalked a nine hight, had thee though in agen of and awake, her not had to stalked dwell shrine the breast loved, but thee other breast pride childe, would seemed will his say did sea friends. In spoiled he of hall cell is or if. Who mote agen the labyrinth smile was childe, superstition degree in more sighed happy, bliss in this the monks loved nor. He save love seek and in of had, of a parting harolds in companie sins basked from,.Sit eirmod duo rebum invidunt.</p>
        <p id="earth"><a name="earth">Earth</a></p>
    </article>
</section>
<section id="detector"></section>
```
{: .playground}

## Reveal

Horizontal scroll reveal.

```html
<div id="example-reveal">
    <img src="https://images.unsplash.com/photo-1614251777918-14ce369c48d6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1866&q=10&blur=1000" alt="Blurred image">
    <div id="example-reveal-img-wrapper" scroll-btween="example-reveal" scroll-btween-detector="detector" data-width="|0 to 100|%">
        <img src="https://images.unsplash.com/photo-1614251777918-14ce369c48d6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1866&q=80" alt="Source image">
    </div>
</div>
<p id="detector">I am the detector for <strong>example-reveal</strong></p>
<style>
    body {
        height: 200vh;
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
    #detector { margin-top: 100vh; margin-bottom: 60vh; }
    #scroll-btween-debugbar { display: none }
</style>
```
{: .playground}

## Page progress

A progress bar fixed at the top of the window, progression level based on the document scroll position.

```html
<div id="progress-bar" scroll-btween="foo" scroll-btween-detector="page-wrapper" data-width="|0 to 100|%"></div>
<div id="page-wrapper">Start, scroll until the end and watch the progress bar at the top...</div>
<p>This is the end of the page <a href="#">Return to top</a></p>
<style>
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
{: .playground}

## Text and background clip

An example with large amount of text clipped with background.

```html
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
        background: center / cover no-repeat url('https://i.postimg.cc/h41Bqtcq/GOPR0533-1530442969141-high-1920.jpg');
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
<section id="wrapper-playground">
    <article id="element">
        <p scroll-btween="test1" data-text-indent="|0 to -200|px">the canopy is the aboveground portion of a plant croping or crop, formed by the collection of individual plant crowns.</p>
        <p scroll-btween="test2" data-text-indent="|-200 to 0|px">In forest ecology, canopy also refers to the upper layer or habitat zone, formed by mature tree crowns and including other biological organisms </p>
        <p scroll-btween="test3" data-text-indent="|0 to -200|px">Sometimes the term canopy is used to refer to the extent of the outer layer of leaves of an individual tree or group of trees.</p>
        <p scroll-btween="test4" data-text-indent="|-200 to 0|px">Shade trees normally have a dense canopy that blocks light from lower growing plants. </p>
        <p scroll-btween="test5" data-text-indent="|0 to -200|px">Early observations of canopies were made from the ground using binoculars or by examining fallen material</p>
        <p scroll-btween="test6" data-text-indent="|-200 to 0|px">Researchers would sometimes erroneously rely on extrapolation by using more reachable samples taken from the understory.</p>
        <p scroll-btween="test1_2" data-text-indent="|0 to -200|px">In some cases, they would use unconventional methods such as chairs suspended on vines or hot-air dirigibles, among others. </p>
        <p scroll-btween="test2_2" data-text-indent="|-200 to 0|px">Modern technology, including adapted mountaineering gear, has made canopy observation significantly easier and more accurate</p>
        <p scroll-btween="test3_2" data-text-indent="|0 to -200|px">Canopy structure is the organization or spatial arrangement of a plant canopy.</p>
        <p scroll-btween="test4_2" data-text-indent="|-200 to 0|px">The canopy is taller than the understory layer. The canopy holds 90% of the animals in the rainforest. </p>
        <p scroll-btween="test5_2" data-text-indent="|0 to -200|px">They cover vast distances and appear to be unbroken when observed from an airplane. </p>
        <p scroll-btween="test6_2" data-text-indent="|-200 to 0|px">However, despite overlapping tree branches, rainforest canopy trees rarely touch each other.</p>
    </article>
</section>
```
{: .playground}