---
layout: libdoc/page-split
permalink: index.html
unlisted: true
---

Scroll Btween was crafted to simply tween any CSS values on any DOM element in relation with its position into the viewport.

## Key Features

* **Native Javascript**
* **No dependencies**
* **Easy to use** see [usage](usage.html)
* **You can tween multiple CSS properties at the same time**
* **You can add multiple tweens on the same CSS property**

## Support

| Browser | Mobile | Desktop |
| :- | :-: | :-: |
| Chrome | ✅ | ✅ |
| Safari | ✅ | ✅ |
| Firefox | ✅  | ✅  |
| Opera | ✅ | ✅ |
| Chromium based browsers (Vivaldi, Brave, ...) | ✅ | ✅ |

Demo on parallax images

```html
<article class="wrapper-playground gyp1" scroll-btween="gyp-back" data-detector="detector" data-background-position="|70 to 30|% center">
    <header>
        <h1>Free like <span>a bird</span></h1>
        <p>Gypaetus barbatus</p>
    </header>
    <figure scroll-btween="gyp-front" data-detector="detector" data-left="|3 to -3|%" data-top="|0 to -20|%">
        <img src="../img/gyp-front-1000.webp" alt="Bearded vulture">
    </figure>
</article>
<div id="detector"></div>
<article class="wrapper-playground gyp2" scroll-btween="gyp-back2" data-background-position="|30 to 70|% center">
    <header>
        <h1>Bearded <span>vulture</span></h1>
        <p>Gypaetus barbatus</p>
    </header>
    <figure scroll-btween="gyp-front2" data-left="|0 to 13|%" data-top="|0 to -5|%">
        <img src="../img/gyp2-front-1000.webp" alt="Bearded vulture">
    </figure>
</article>
<style>
    body {
        margin: 0; padding:0; height: 400vh;
    }
    .wrapper-playground {
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        background-size: 120%;
        background-position: 40% center;
        background-repeat: no-repeat;
    }
    .wrapper-playground.gyp1 {
        background-image: url(../img/gyp-back-1000.webp);
    }
    .wrapper-playground.gyp2 {
        background-image: url(../img/gyp2-back-1000.webp);
    }
    .wrapper-playground::before {
        content: '';
        float: left;
        padding-bottom: 66.66%;
    }
    figure {
        display: flex;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        line-height: 0;
        margin: 0;
        padding: 0;
    }
    figure img {
        max-width: 100%;
        max-height: 100%;
        width: 100%;
        height: auto;
    }
    header {
        text-align: center;
        color: #FFFFFFc2;
    }
    header h1 {
        margin-top: 0;
        margin-bottom: 0;
        font-size: 13vw;
        font-family: sans-serif;
    }
    header h1 span {
        display: block;
        position: relative; /* Sets in front of the image */
        z-index: 1; /* Sets in front of the image */
    }
    header p {
        margin: 0;
        font-style: italic;
        font-size: 5vmin;
    }
    #detector { position: absolute; top: 100vh; }
    #scroll-btween-debugbar { display: none; }
</style>
```
{: .playground title="Demo - Parallax on images"}
