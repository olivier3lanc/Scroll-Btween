---
title: Colors
description: Basic background colors tweens
layout: libdoc/page-split
category: Examples
order: 100
---

```html
<div    scroll-btween="foo" 
        data-background-color="rgb(|255 to 10|,|50 to 90|,|122 to 40|)">
    <h2>Scroll to see background change</h2>
</div>
<div    scroll-btween="bar"
        data-background="linear-gradient(|0 to 360|deg, rgba(|10 to 129|,94,|255 to 80|,1) 0%, rgba(252,|10 to 129|,|200 to 9|,1) 100%">
    <h2>Scroll to see background change</h2>
</div>
<style>
    /* DEMO PURPOSE ONLY */
    body { padding-bottom: 100vh }
    div { 
        height: 200vh;
    }
    h2 {
        position: sticky;
        top: 100px;
        left: 0px;
        width: 100%;
        text-align: center;
        color: white;
        font-family: monospace;
        padding-top: 100px;
    }
    #scroll-btween-debugbar { display: none; }
</style>
```
{: .playground .playground-pin}