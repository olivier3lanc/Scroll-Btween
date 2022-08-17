let styleGuide = {
    // Returns the specified CSS variable
    // @string - string - the specified CSS variable
    getCssVariable: function(string) {
        if (typeof string == 'string') {
            return getComputedStyle(document.documentElement).getPropertyValue(string);
        }
    },
    update: function() {
        // Get data from CSS
        let raw = getComputedStyle(document.body).content;
        let result = raw.substring(1, raw.length-1);
        result = result.replace(/\\/g, '');
        // console.log(result);
        // UI framework data is contained into:
        styleGuide.json = JSON.parse(result);
        console.log(styleGuide.json);
        // The CSS variable prefix
        const css_var_prefix = styleGuide.json['briks-css-variables-prefix'];
        // Init empty markup to populate
        let markup = '';
        //Homepage
        const el_homepage = document.querySelector('#homepage-content');
        if (el_homepage !== null) {
            // Global patterns
            styleGuide['json']['briks-globals'].forEach(function(data) {
                el_homepage.querySelectorAll('.'+data).forEach(function(el) {
                    el.innerText = styleGuide.getCssVariable('--'+data);
                });
            });
            // Main patterns
            // Colors
            if (el_homepage.querySelector('.patterns-briks-colors') !== null) {
                markup = '';
                styleGuide['json']['briks-colors'].forEach(function(data) {
                    markup += ''+
                    '<div class="u-relative u-h-thumb u-bg-damier-hard">'+
                        '<div class="u-absolute u-top-0 u-left-0 u-w-100 u-h-100" style="background-color: var(--'+css_var_prefix+'color-'+data+')"></div>'+
                        '<span class="c-position m-absolute m-top-left m-anchor-bottom-right u-bb-thin-dashed-alt u-br-thin-dashed-alt" style="width:10px; height:10px"></span>'+
                        '<span class="c-position m-absolute m-top-right m-anchor-bottom-left u-bb-thin-dashed-alt u-bl-thin-dashed-alt" style="width:10px; height:10px"></span>'+
                        '<span class="c-position m-absolute m-bottom-right u-bt-thin-dashed-alt u-bl-thin-dashed-alt" style="width:10px; height:10px"></span>'+
                        '<span class="c-position m-absolute m-bottom-left m-anchor-top-right u-bt-thin-dashed-alt u-br-thin-dashed-alt" style="width:10px; height:10px"></span>'+
                    '</div>'+
                    '<div class="u-mb-md">'+
                        styleGuide.markupGenerator({
                            id: 'color-name-'+data,
                            label: 'Name',
                            value: data
                        }, 'patternLine')+
                        styleGuide.markupGenerator({
                            id: 'color-value-'+data,
                            label: 'Value',
                            value: styleGuide.getCssVariable('--'+css_var_prefix+'color-'+data)
                        }, 'patternLine')+
                        styleGuide.markupGenerator({
                            id: 'color-variable-'+data,
                            label: 'CSS variable, fallback',
                            value: '<span class="u-c-hilight-alt">var</span><span class="u-c-primary-alt">(</span><span class="u-c-hilight">--'+css_var_prefix+'color-'+data+'</span><span class="u-c-primary-alt">, '+styleGuide.getCssVariable('--'+css_var_prefix+'color-'+data)+')</span>'
                        }, 'patternLine')+
                        styleGuide.markupGenerator({
                            id: 'color-scss-'+data,
                            label: 'SCSS usage',
                            value: '<span class="u-c-hilight-ultra">my-color</span><span class="u-c-primary-alt">(</span><span class="u-c-hilight">'+data+'</span><span class="u-c-primary-alt">)</span>'
                        }, 'patternLine')+
                    '</div>';
                });
                el_homepage.querySelector('.patterns-briks-colors').innerHTML = markup;
            }

            // Screen sizes
            if (el_homepage.querySelector('.patterns-briks-screen-sizes') !== null) {
                markup = ''+
                '<div class="u-mb-md"><div class="c-grid m-middle m-space-between u-ff-monospace u-relative u-mb-md"><div class="c-position m-absolute m-middle-left u-w-100 u-bt-thin-dashed-alt"></div>';
                styleGuide['json']['briks-screen-sizes'].forEach(function(data) {
                    const currentValue = styleGuide.getCssVariable('--'+css_var_prefix+'screen-size-'+data);
                    markup += ''+
                    '<div class="u-relative u-fs-xs u-bc-primary-max">> '+currentValue+' <</div>'+
                    '<div class="u-relative u-fs-xxs u-bc-primary-max u-pl-xs u-pr-xs c-text m-bold">'+data+'</div>';
                });
                markup += '</div>';
                markup += '<div class="">';
                styleGuide['json']['briks-screen-sizes'].forEach(function(data) {
                    markup += ''+
                    styleGuide.markupGenerator({
                        id: 'screen-size-name-'+data,
                        label: 'Name',
                        value: data
                    }, 'patternLine')+
                    styleGuide.markupGenerator({
                        id: 'screen-size-scss-'+data,
                        label: 'SCSS usage',
                        value: '<span class="u-c-hilight">@include</span> <span class="u-c-hilight-ultra">my-screen-size</span><span class="u-c-primary-alt">(</span><span class="u-c-hilight">'+data+'</span><span class="u-c-primary-alt">) { }</span>'
                    }, 'patternLine');
                });
                markup += '</div>';
                markup += '</div>';
                el_homepage.querySelector('.patterns-briks-screen-sizes').innerHTML = markup;
            }

            // Font families
            if (el_homepage.querySelector('.patterns-briks-font-families') !== null) {
                markup = '';
                styleGuide['json']['briks-fonts'].forEach(function(data) {
                    markup += ''+
                    '<div class="u-relative">'+
                        '<div class="u-p-sm u-relative" style="font-family: var(--'+css_var_prefix+'font-family-'+data+')" contenteditable="true" title="Edit me!">'+styleGuide.getCssVariable('--'+css_var_prefix+'font-family-'+data)+'</div>'+
                        '<span class="c-position m-absolute m-top-left m-anchor-bottom-right u-bb-thin-dashed-alt u-br-thin-dashed-alt" style="width:10px; height:10px"></span>'+
                        '<span class="c-position m-absolute m-top-right m-anchor-bottom-left u-bb-thin-dashed-alt u-bl-thin-dashed-alt" style="width:10px; height:10px"></span>'+
                        '<span class="c-position m-absolute m-bottom-right u-bt-thin-dashed-alt u-bl-thin-dashed-alt" style="width:10px; height:10px"></span>'+
                        '<span class="c-position m-absolute m-bottom-left m-anchor-top-right u-bt-thin-dashed-alt u-br-thin-dashed-alt" style="width:10px; height:10px"></span>'+
                    '</div>'+
                    '<div class="u-mb-lg">'+
                        styleGuide.markupGenerator({
                            id: 'font-family-name-'+data,
                            label: 'Name',
                            value: data
                        }, 'patternLine')+
                        styleGuide.markupGenerator({
                            id: 'font-family-value-'+data,
                            label: 'Value',
                            value: data
                        }, 'patternLine')+
                        styleGuide.markupGenerator({
                            id: 'font-family-variable-'+data,
                            label: 'CSS variable, fallback',
                            value: '<span class="u-c-hilight-alt">var</span><span class="u-c-primary-alt">(</span><span class="u-c-hilight">--'+css_var_prefix+'font-family-'+data+'</span><span class="u-c-primary-alt">, '+styleGuide.getCssVariable('--'+css_var_prefix+'font-family-'+data)+')</span>'
                        }, 'patternLine')+
                        styleGuide.markupGenerator({
                            id: 'font-family-scss-'+data,
                            label: 'SCSS usage',
                            value: '<span class="u-c-hilight-ultra">my-font-family</span><span class="u-c-primary-alt">(</span><span class="u-c-hilight">'+data+'</span><span class="u-c-primary-alt">)</span>'
                        }, 'patternLine')+
                    '</div>';
                
                });
                el_homepage.querySelector('.patterns-briks-font-families').innerHTML = markup;
            }

            // Font sizes
            if (el_homepage.querySelector('.patterns-briks-font-sizes') !== null) {
                markup = '';
                styleGuide['json']['briks-font-sizes'].forEach(function(data) {
                    markup += ''+
                    '<div class="u-relative">'+
                        '<div class="c-text m-bold u-p-sm u-lh-initial" style="font-size: var(--'+css_var_prefix+'font-size-'+data+')" contenteditable="true" title="Edit me!">Aa</div>'+
                        '<span class="c-position m-absolute m-top-left m-anchor-bottom-right u-bb-thin-dashed-alt u-br-thin-dashed-alt" style="width:10px; height:10px"></span>'+
                        '<span class="c-position m-absolute m-top-right m-anchor-bottom-left u-bb-thin-dashed-alt u-bl-thin-dashed-alt" style="width:10px; height:10px"></span>'+
                        '<span class="c-position m-absolute m-bottom-right u-bt-thin-dashed-alt u-bl-thin-dashed-alt" style="width:10px; height:10px"></span>'+
                        '<span class="c-position m-absolute m-bottom-left m-anchor-top-right u-bt-thin-dashed-alt u-br-thin-dashed-alt" style="width:10px; height:10px"></span>'+
                    '</div>'+
                    '<div class="u-mb-lg">'+
                        styleGuide.markupGenerator({
                            id: 'font-size-name-'+data,
                            label: 'Name',
                            value: data
                        }, 'patternLine')+
                        styleGuide.markupGenerator({
                            id: 'font-size-value-'+data,
                            label: 'Value',
                            value: styleGuide.getCssVariable('--'+css_var_prefix+'font-size-'+data)
                        }, 'patternLine')+
                        styleGuide.markupGenerator({
                            id: 'font-size-variable-'+data,
                            label: 'CSS variable, fallback',
                            value: '<span class="u-c-hilight-alt">var</span><span class="u-c-primary-alt">(</span><span class="u-c-hilight">--'+css_var_prefix+'font-size-'+data+'</span><span class="u-c-primary-alt">, '+styleGuide.getCssVariable('--'+css_var_prefix+'font-size-'+data)+')</span>'
                        }, 'patternLine')+
                        styleGuide.markupGenerator({
                            id: 'font-size-scss-'+data,
                            label: 'SCSS usage',
                            value: '<span class="u-c-hilight-ultra">my-font-size</span><span class="u-c-primary-alt">(</span><span class="u-c-hilight">'+data+'</span><span class="u-c-primary-alt">)</span>'
                        }, 'patternLine')+
                    '</div>';
                
                });
                el_homepage.querySelector('.patterns-briks-font-sizes').innerHTML = markup;
            }

            // Typography
            if (el_homepage.querySelector('.patterns-briks-typography') !== null) {
                markup = '';
                styleGuide['json']['briks-typography'].forEach(function(data) {
                    markup += ''+
                    '<div class="u-relative">'+
                        '<div class="u-p-sm u-lh-initial" style="font: var(--'+css_var_prefix+'typo-'+data+')">Lorem ipsum dolor</div>'+
                        '<span class="c-position m-absolute m-top-left m-anchor-bottom-right u-bb-thin-dashed-alt u-br-thin-dashed-alt" style="width:10px; height:10px"></span>'+
                        '<span class="c-position m-absolute m-top-right m-anchor-bottom-left u-bb-thin-dashed-alt u-bl-thin-dashed-alt" style="width:10px; height:10px"></span>'+
                        '<span class="c-position m-absolute m-bottom-right u-bt-thin-dashed-alt u-bl-thin-dashed-alt" style="width:10px; height:10px"></span>'+
                        '<span class="c-position m-absolute m-bottom-left m-anchor-top-right u-bt-thin-dashed-alt u-br-thin-dashed-alt" style="width:10px; height:10px"></span>'+
                    '</div>'+
                    '<div class="u-mb-lg">'+
                        styleGuide.markupGenerator({
                            id: 'typo-name-'+data,
                            label: 'Name',
                            value: data
                        }, 'patternLine')+
                        styleGuide.markupGenerator({
                            id: 'typo-value-'+data,
                            label: 'Value',
                            value: data
                        }, 'patternLine')+
                        styleGuide.markupGenerator({
                            id: 'typo-variable-'+data,
                            label: 'CSS variable, fallback',
                            value: '<span class="u-c-hilight-alt">var</span><span class="u-c-primary-alt">(</span><span class="u-c-hilight">--'+css_var_prefix+'typo-'+data+'</span><span class="u-c-primary-alt">, '+styleGuide.getCssVariable('--'+css_var_prefix+'typo-'+data)+')</span>'
                        }, 'patternLine')+
                        styleGuide.markupGenerator({
                            id: 'typo-scss-'+data,
                            label: 'SCSS usage',
                            value: '<span class="u-c-hilight-ultra">my-typography</span><span class="u-c-primary-alt">(</span><span class="u-c-hilight">'+data+'</span><span class="u-c-primary-alt">)</span>'
                        }, 'patternLine')+
                    '</div>';
                });
                el_homepage.querySelector('.patterns-briks-typography').innerHTML = markup;
            }

            // Spacings
            if (el_homepage.querySelector('.patterns-briks-spacings') !== null) {
                markup = '';
                styleGuide['json']['briks-spacings'].forEach(function(data) {
                    markup += ''+
                    '<div class="u-relative">'+
                        '<div class="c-text m-bold u-p-sm">'+
                            '<span>'+data+'</span><span class="u-c-primary-alt u-fs-xs u-ml-sm">'+styleGuide.getCssVariable('--'+css_var_prefix+'spacing-'+data)+'</span>'+
                            '<div class="u-relative u-bl-thin-solid-alt u-br-thin-solid-alt" style="width: var(--'+css_var_prefix+'spacing-'+data+'); height:20px;">'+
                                '<div class="c-position m-absolute m-middle-center m-anchor-middle-center u-bb-large-solid-hilight"style="width: var(--'+css_var_prefix+'spacing-'+data+')"></div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="u-mb-lg">'+
                        styleGuide.markupGenerator({
                            id: 'spacing-name-'+data,
                            label: 'Name',
                            value: data
                        }, 'patternLine')+
                        styleGuide.markupGenerator({
                            id: 'spacing-value-'+data,
                            label: 'Value',
                            value: styleGuide.getCssVariable('--'+css_var_prefix+'spacing-'+data)
                        }, 'patternLine')+
                        styleGuide.markupGenerator({
                            id: 'spacing-variable-'+data,
                            label: 'CSS variable, fallback',
                            value: '<span class="u-c-hilight-alt">var</span><span class="u-c-primary-alt">(</span><span class="u-c-hilight">--'+css_var_prefix+'spacing-'+data+'</span><span class="u-c-primary-alt">, '+styleGuide.getCssVariable('--'+css_var_prefix+'spacing-'+data)+')</span>'
                        }, 'patternLine')+
                        styleGuide.markupGenerator({
                            id: 'spacing-scss-'+data,
                            label: 'SCSS usage',
                            value: '<span class="u-c-hilight-ultra">my-spacing</span><span class="u-c-primary-alt">(</span><span class="u-c-hilight">'+data+'</span><span class="u-c-primary-alt">)</span>'
                        }, 'patternLine')+
                    '</div>';
                });
                el_homepage.querySelector('.patterns-briks-spacings').innerHTML = markup;
            }

            // Borders
            if (el_homepage.querySelector('.patterns-briks-borders') !== null) {
                markup = '';
                styleGuide['json']['briks-borders'].forEach(function(data) {
                    markup += ''+
                    '<div class="u-relative">'+
                        '<div class="c-grid u-relative">'+
                            '<div class="m-w-6 u-h-thumb u-bg-damier-hard u-relative"><div class="u-absolute u-top-0 u-left-0 u-w-100 u-h-100" style="background-color:rgba(0,0,0,0.9)"></div></div>'+
                            '<div class="m-w-6 u-h-thumb u-bg-damier-hard u-relative"><div class="u-absolute u-top-0 u-left-0 u-w-100 u-h-100" style="background-color:rgba(255,255,255,0.9)"></div></div>'+
                            '<div class="c-position m-absolute m-middle-center m-anchor-middle-center u-w-80" style="border-bottom: var(--'+css_var_prefix+'border-'+data+')"></div>'+
                        '</div>'+
                        '<span class="c-position m-absolute m-top-left m-anchor-bottom-right u-bb-thin-dashed-alt u-br-thin-dashed-alt" style="width:10px; height:10px"></span>'+
                        '<span class="c-position m-absolute m-top-right m-anchor-bottom-left u-bb-thin-dashed-alt u-bl-thin-dashed-alt" style="width:10px; height:10px"></span>'+
                        '<span class="c-position m-absolute m-bottom-right u-bt-thin-dashed-alt u-bl-thin-dashed-alt" style="width:10px; height:10px"></span>'+
                        '<span class="c-position m-absolute m-bottom-left m-anchor-top-right u-bt-thin-dashed-alt u-br-thin-dashed-alt" style="width:10px; height:10px"></span>'+
                    '</div>'+
                    '<div class="u-mb-lg">'+
                        styleGuide.markupGenerator({
                            id: 'border-name-'+data,
                            label: 'Name',
                            value: data
                        }, 'patternLine')+
                        styleGuide.markupGenerator({
                            id: 'border-value-'+data,
                            label: 'Value',
                            value: styleGuide.getCssVariable('--'+css_var_prefix+'border-'+data)
                        }, 'patternLine')+
                        styleGuide.markupGenerator({
                            id: 'border-variable-'+data,
                            label: 'CSS variable, fallback',
                            value: '<span class="u-c-hilight-alt">var</span><span class="u-c-primary-alt">(</span><span class="u-c-hilight">--'+css_var_prefix+'border-'+data+'</span><span class="u-c-primary-alt">, '+styleGuide.getCssVariable('--'+css_var_prefix+'border-'+data)+')</span>'
                        }, 'patternLine')+
                        styleGuide.markupGenerator({
                            id: 'border-scss-'+data,
                            label: 'SCSS usage',
                            value: '<span class="u-c-hilight-ultra">my-border</span><span class="u-c-primary-alt">(</span><span class="u-c-hilight">'+data+'</span><span class="u-c-primary-alt">)</span>'
                        }, 'patternLine')+
                    '</div>';
                });
                el_homepage.querySelector('.patterns-briks-borders').innerHTML = markup;
            }

            // Border radius
            if (el_homepage.querySelector('.patterns-briks-border-radius') !== null) {
                markup = '';
                styleGuide['json']['briks-border-radius'].forEach(function(data) {
                    markup += ''+
                    '<div class="u-relative u-pl-sm">'+
                        '<div class="c-grid m-ar-square">'+
                            '<div class="m-w-2 u-mr-xl u-relative">'+
                                '<div class="c-position m-absolute m-top-left u-w-100 u-h-100 u-bl-large-solid u-bt-large-solid" style="border-top-left-radius: var(--'+css_var_prefix+'border-radius-'+data+')"></div>'+
                                '<div class="c-position m-absolute m-top-left m-anchor-top-center u-h-100 u-bl-thin-dashed-alt"></div>'+
                                '<div class="c-position m-absolute m-top-left m-anchor-middle-left u-w-100 u-bt-thin-dashed-alt"></div>'+
                                '<div class="c-position m-absolute m-top-left m-anchor-bottom-right u-bb-thin-dashed-alt u-br-thin-dashed-alt" style="width:20px; height:20px"></div>'+
                            '</div>'+
                            '<div class="m-w-2 u-relative">'+
                                '<div class="c-position m-absolute m-top-left u-w-100 u-h-100 u-bl-thin-solid u-bt-thin-solid" style="border-top-left-radius: var(--'+css_var_prefix+'border-radius-'+data+')"></div>'+
                                '<div class="c-position m-absolute m-top-left m-anchor-top-center u-h-100 u-bl-thin-dashed-alt"></div>'+
                                '<div class="c-position m-absolute m-top-left m-anchor-middle-left u-w-100 u-bt-thin-dashed-alt"></div>'+
                                '<div class="c-position m-absolute m-top-left m-anchor-bottom-right u-bb-thin-dashed-alt u-br-thin-dashed-alt" style="width:20px; height:20px"></div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="u-mb-lg">'+
                        styleGuide.markupGenerator({
                            id: 'border-radius-name-'+data,
                            label: 'Name',
                            value: data
                        }, 'patternLine')+
                        styleGuide.markupGenerator({
                            id: 'border-radius-value-'+data,
                            label: 'Value',
                            value: styleGuide.getCssVariable('--'+css_var_prefix+'border-radius-'+data)
                        }, 'patternLine')+
                        styleGuide.markupGenerator({
                            id: 'border-radius-variable-'+data,
                            label: 'CSS variable, fallback',
                            value: '<span class="u-c-hilight-alt">var</span><span class="u-c-primary-alt">(</span><span class="u-c-hilight">--'+css_var_prefix+'border-radius-'+data+'</span><span class="u-c-primary-alt">, '+styleGuide.getCssVariable('--'+css_var_prefix+'border-radius-'+data)+')</span>'
                        }, 'patternLine')+
                        styleGuide.markupGenerator({
                            id: 'border-radius-scss-'+data,
                            label: 'SCSS usage',
                            value: '<span class="u-c-hilight-ultra">my-border-radius</span><span class="u-c-primary-alt">(</span><span class="u-c-hilight">'+data+'</span><span class="u-c-primary-alt">)</span>'
                        }, 'patternLine')+
                    '</div>';
                });
                el_homepage.querySelector('.patterns-briks-border-radius').innerHTML = markup;
            }

            // Shadows
            if (el_homepage.querySelector('.patterns-briks-shadows') !== null) {
                markup = '';
                styleGuide['json']['briks-shadows'].forEach(function(data) {
                    markup += ''+
                    '<div class="u-relative">'+
                        '<div class="c-grid m-ar-square m-space-around m-middle u-p-xl">'+
                            '<div class="m-w-4" style="box-shadow: var(--'+css_var_prefix+'shadow-'+data+')"></div>'+
                            '<div class="m-w-1" style="box-shadow: var(--'+css_var_prefix+'shadow-'+data+')"></div>'+
                            '<div style="width: 20px; box-shadow: var(--'+css_var_prefix+'shadow-'+data+')"></div>'+
                        '</div>'+
                        '<span class="c-position m-absolute m-top-left m-anchor-bottom-right u-bb-thin-dashed-alt u-br-thin-dashed-alt" style="width:10px; height:10px"></span>'+
                        '<span class="c-position m-absolute m-top-right m-anchor-bottom-left u-bb-thin-dashed-alt u-bl-thin-dashed-alt" style="width:10px; height:10px"></span>'+
                        '<span class="c-position m-absolute m-bottom-right u-bt-thin-dashed-alt u-bl-thin-dashed-alt" style="width:10px; height:10px"></span>'+
                        '<span class="c-position m-absolute m-bottom-left m-anchor-top-right u-bt-thin-dashed-alt u-br-thin-dashed-alt" style="width:10px; height:10px"></span>'+
                    '</div>'+
                    '<div class="u-mb-lg">'+
                        styleGuide.markupGenerator({
                            id: 'shadows-name-'+data,
                            label: 'Name',
                            value: data.name
                        }, 'patternLine')+
                        styleGuide.markupGenerator({
                            id: 'shadows-value-'+data,
                            label: 'Value',
                            value: styleGuide.getCssVariable('--'+css_var_prefix+'shadow-'+data)
                        }, 'patternLine')+
                        styleGuide.markupGenerator({
                            id: 'shadows-variable-'+data,
                            label: 'CSS variable, fallback',
                            value: '<span class="u-c-hilight-alt">var</span><span class="u-c-primary-alt">(</span><span class="u-c-hilight">--'+css_var_prefix+'shadow-'+data+'</span><span class="u-c-primary-alt">, '+styleGuide.getCssVariable('--'+css_var_prefix+'shadow-'+data)+')</span>'
                        }, 'patternLine')+
                        styleGuide.markupGenerator({
                            id: 'shadows-scss-'+data,
                            label: 'SCSS usage',
                            value: '<span class="u-c-hilight-ultra">my-shadow</span><span class="u-c-primary-alt">(</span><span class="u-c-hilight">'+data+'</span><span class="u-c-primary-alt">)</span>'
                        }, 'patternLine')+
                    '</div>';
                });
                el_homepage.querySelector('.patterns-briks-shadows').innerHTML = markup;
            }

            // Backgrounds
            if (el_homepage.querySelector('.patterns-briks-backgrounds') !== null) {
                markup = '';
                styleGuide['json']['briks-backgrounds'].forEach(function(data) {
                    markup += ''+
                    '<div class="u-relative">'+
                        '<div class="u-h-thumb" style="background: var(--'+css_var_prefix+'background-'+data+')"></div>'+
                        '<span class="c-position m-absolute m-top-left m-anchor-bottom-right u-bb-thin-dashed-alt u-br-thin-dashed-alt" style="width:10px; height:10px"></span>'+
                        '<span class="c-position m-absolute m-top-right m-anchor-bottom-left u-bb-thin-dashed-alt u-bl-thin-dashed-alt" style="width:10px; height:10px"></span>'+
                        '<span class="c-position m-absolute m-bottom-right u-bt-thin-dashed-alt u-bl-thin-dashed-alt" style="width:10px; height:10px"></span>'+
                        '<span class="c-position m-absolute m-bottom-left m-anchor-top-right u-bt-thin-dashed-alt u-br-thin-dashed-alt" style="width:10px; height:10px"></span>'+
                    '</div>'+
                    '<div class="u-mb-lg">'+
                        styleGuide.markupGenerator({
                            id: 'background-name-'+data,
                            label: 'Name',
                            value: data
                        }, 'patternLine')+
                        styleGuide.markupGenerator({
                            id: 'background-value-'+data.name,
                            label: 'Value',
                            value: styleGuide.getCssVariable('--'+css_var_prefix+'background-'+data)
                        }, 'patternLine')+
                        styleGuide.markupGenerator({
                            id: 'background-variable-'+data,
                            label: 'CSS variable, fallback',
                            value: '<span class="u-c-hilight-alt">var</span><span class="u-c-primary-alt">(</span><span class="u-c-hilight">--'+css_var_prefix+'background-'+data+'</span><span class="u-c-primary-alt">, '+styleGuide.getCssVariable('--'+css_var_prefix+'background-'+data)+')</span>'
                        }, 'patternLine')+
                        styleGuide.markupGenerator({
                            id: 'background-scss-'+data,
                            label: 'SCSS usage',
                            value: '<span class="u-c-hilight-ultra">my-background</span><span class="u-c-primary-alt">(</span><span class="u-c-hilight">'+data+'</span><span class="u-c-primary-alt">)</span>'
                        }, 'patternLine')+
                    '</div>';
                });
                el_homepage.querySelector('.patterns-briks-backgrounds').innerHTML = markup;
            }
        }
        // Utilities
        if (document.querySelector('#briks-utilities') !== null) {
            markup = '';
            let toc_markup = '';
            styleGuide['json']['briks-utilities'].forEach(function(data) {
                if (data.enabled == 'true') {
                    // Names and values
                    let markup_left = '';
                    let default_pattern_name = '';
                    Object.keys(data['names-and-values']).forEach(function(nv_data, index) {
                        let checked = '';
                        if (index == 0) {
                            checked = 'checked';
                            default_pattern_name = nv_data;
                        }
                        let current_unit = '';
                        // If the value string contains only a number, then add the default CSS unit
                        if (!isNaN(parseFloat(data['names-and-values'][nv_data]))) {
                            if (parseFloat(data['names-and-values'][nv_data]).toString().length == data['names-and-values'][nv_data].length) {
                                if (data.property != 'z-index' && data.property != 'order' && data.property != 'column-count' && data.property != 'flex' && data.property != 'opacity') {
                                    current_unit = styleGuide.getCssVariable('--'+css_var_prefix+'unit');
                                }
                            }
                        }
                        markup_left += styleGuide.markupGenerator({
                            classNames: 'c-form',
                            type: 'radio',
                            name: 'utilities-'+data.property+'-property',
                            id: 'utilities-'+data.property+'-property-'+index,
                            label: '<span class="u-w-100 u-lh-base"><span class="u-block">'+nv_data+'</span><span class="c-text m-ellipsis m-fs-xs u-block">'+data['names-and-values'][nv_data]+current_unit+'</span></span>',
                            value: styleGuide.getCssVariable('--'+css_var_prefix+'utilities-prefix')+data.prefix+nv_data,
                            attributes: [
                                {
                                    name: 'onchange',
                                    value: 'styleGuide.updateUtility(\''+data.property+'\')'
                                },
                                { 
                                    name: checked, 
                                    value: '' 
                                }
                            ]
                        }, 'simpleInput');
                    });

                    // Screen sizes checkboxes
                    let markup_right_1 = '';
                    let responsiveDisabledClasses = 'u-disabled';
                    if (data.responsive == 'true') {
                        responsiveDisabledClasses = '';
                        styleGuide['json']['briks-screen-sizes'].forEach(function(screen_size) {
                            markup_right_1 += styleGuide.markupGenerator({
                                classNames: 'c-form',
                                type: 'checkbox',
                                name: 'utilities-'+data.property+'-responsive',
                                id: 'utilities-'+data.property+'-responsive-'+screen_size,
                                label: screen_size,
                                value: screen_size,
                                attributes: [
                                    {
                                        name: 'onchange',
                                        value: 'styleGuide.updateUtility(\''+data.property+'\')'
                                    }
                                ]
                            }, 'simpleInput');
                        });
                    }

                    // Classes input display
                    let markup_right_2 = '';
                    markup_right_2 += styleGuide.markupGenerator({
                        classNames: 'c-form',
                        type: 'text',
                        name: 'utilities-'+data.property+'-classes',
                        id: 'utilities-'+data.property+'-classes',
                        label: '',
                        value: styleGuide.getCssVariable('--'+css_var_prefix+'utilities-prefix')+data.prefix+default_pattern_name,
                        attributes: [
                            {
                                name: 'class',
                                value: 'u-ff-monospace u-c-hilight'
                            },
                            {
                                name: 'readonly',
                                value: ''
                            }
                        ]
                    }, 'simpleInput');
                    // Copy classes button
                    markup_right_2 += '<button class="c-btn" onclick="styleGuide.copyToClipboard(\'#utilities-'+data.property+'-classes\');">Copy classes</button>';

                    // Shorthand attribute input display
                    let markup_right_3 = '';
                    if (data.responsive == 'true') {
                        markup_right_3 += styleGuide.markupGenerator({
                            classNames: 'c-form u-mt-sm '+responsiveDisabledClasses,
                            type: 'text',
                            name: 'utilities-'+data.property+'-shorthand',
                            id: 'utilities-'+data.property+'-shorthand',
                            label: '',
                            value: '',
                            attributes: [
                                {
                                    name: 'class',
                                    value: 'u-ff-monospace u-c-hilight-alt'
                                },
                                {
                                    name: 'readonly',
                                    value: ''
                                }
                            ]
                        }, 'simpleInput');
                        // Copy shorthand button
                        markup_right_3 += '<button class="c-btn" onclick="styleGuide.copyToClipboard(\'#utilities-'+data.property+'-shorthand\');">Copy shorthand</button>';
                    }

                    // Pseudo classes radio
                    let markup_right_4 = styleGuide.markupGenerator({
                        classNames: 'c-form',
                        type: 'radio',
                        name: 'utilities-'+data.property+'-pseudo-classes',
                        id: 'utilities-'+data.property+'-pseudo-class-unset',
                        label: 'unset',
                        value: '',
                        attributes: [
                            {
                                name: 'onchange',
                                value: 'styleGuide.updateUtility(\''+data.property+'\')'
                            },
                            {
                                name: 'checked',
                                value: ''
                            }
                        ]
                    }, 'simpleInput');
                    if (typeof data['pseudo-classes'] === 'object') {
                        // console.log(data['pseudo-classes']);
                        data['pseudo-classes'].forEach(function(pseudo_class) {
                            markup_right_4 += styleGuide.markupGenerator({
                                classNames: 'c-form',
                                type: 'radio',
                                name: 'utilities-'+data.property+'-pseudo-classes',
                                id: 'utilities-'+data.property+'-pseudo-class-'+pseudo_class,
                                label: pseudo_class,
                                value: ':'+pseudo_class,
                                attributes: [
                                    {
                                        name: 'onchange',
                                        value: 'styleGuide.updateUtility(\''+data.property+'\')'
                                    }
                                ]
                            }, 'simpleInput');
                        });
                    }

                    toc_markup += '<li><a href="#utility-'+data.property+'">'+data.property+'</a></li>';

                    markup += ''+
                    '<article class="c-grid u-mb-xl" id="utility-'+data.property+'">'+
                        '<h2 class="m-w-12 u-mb-sm">'+data.property+'</h2>'+
                        '<div class="m-w-6 u-pr-md" m-w-12="sm" u-pr-none="sm">'+
                            markup_left+
                        '</div>'+
                        '<div class="m-w-6" m-w-12="sm">'+
                            '<div class="c-position m-sticky m-top-0">'+
                                '<fieldset class="u-pl-sm u-pb-sm u-pr-none u-br-none u-bb-none u-bl-thin-dashed-alt u-bt-thin-dashed-alt u-ta-right">'+
                                    '<legend class="c-text m-bold u-w-100 u-fs-sm u-ta-left">Pseudo classes</legend>'+
                                    markup_right_4+
                                '</fieldset>'+
                                '<fieldset class="u-pl-sm u-pb-sm u-pr-none u-br-none u-bb-none u-bl-thin-dashed-alt u-bt-thin-dashed-alt '+responsiveDisabledClasses+'">'+
                                    '<legend class="c-text m-bold u-w-100 u-fs-sm">Responsive</legend>'+
                                    markup_right_1+
                                '</fieldset>'+
                                '<fieldset class="u-pl-sm u-pb-sm u-pr-none u-br-none u-bb-none u-bl-thin-dashed-alt u-bt-thin-dashed-alt u-ta-right">'+
                                    '<legend class="c-text m-bold u-w-100 u-fs-sm u-ta-left">Classes and attributes</legend>'+
                                    markup_right_2+
                                    markup_right_3+
                                '</fieldset>'+
                            '</div>'+
                        '</div>'+
                    '</article>';
                }
            });
            document.querySelector('#briks-utilities').innerHTML = '<ul id="markdown-toc">'+toc_markup+'</ul>'+markup;
        }
    },
    // UPDATE UTILITY
    // Update classes and shorthand utilities inputs ready to be copied
    // @property - string - the CSS property to update
    updateUtility: function(property) {
        if (typeof property == 'string') {
            const pattern_base = document.querySelector('input[name="utilities-'+property+'-property"]:checked').value;
            const pattern_pseudo_class = document.querySelector('input[name="utilities-'+property+'-pseudo-classes"]:checked').value;
            const el_responsive_checkboxes_array = document.querySelectorAll('input[name="utilities-'+property+'-responsive"]:checked');
            const el_classes_names = document.querySelector('#utilities-'+property+'-classes');
            const el_shorthand = document.querySelector('#utilities-'+property+'-shorthand');
            // console.log(pattern_base, pattern_pseudo_class);
            // #utilities-'+property+'-shorthand
            // Build classes
            let classes_names = '';
            let shorthand = pattern_base+pattern_pseudo_class+'="';
            const css_var_prefix = styleGuide['json']['briks-css-variables-prefix'];
            if (el_responsive_checkboxes_array.length > 0) {
                el_responsive_checkboxes_array.forEach(function(data, index) {
                    // Update classes names
                    if (index > 0) {
                        classes_names += ' ';
                    }
                    classes_names += pattern_base+pattern_pseudo_class+styleGuide.getCssVariable('--'+css_var_prefix+'responsive-prefix')+data.value;
                    // Update shorthand
                    shorthand += data.value;
                    if (index < el_responsive_checkboxes_array.length - 1) {
                        shorthand += ',';
                    }
                });
                shorthand += '"';
            } else {
                shorthand = '';
                classes_names = pattern_base+pattern_pseudo_class;
            }
            if (el_classes_names !== null) {
                el_classes_names.value = classes_names;
            }
            if (el_shorthand !== null) {
                el_shorthand.value = shorthand;
            }
        }
    },
    // MARKUP GENERATOR
    // Export HTML from pre defined templates
    // @content - object - Content to display
    // @templateName - string - Name of the template
    markupGenerator: function(content, templateName) {
        if (typeof content == 'object' && typeof templateName == 'string') {
            let templates = {
                patternLine: function() {
                    let id = '',
                        label = '',
                        value = '';
                    if (typeof content.id == 'string') {
                        id = content.id;
                    } else {
                        return '';
                    }
                    if (typeof content.label == 'string') {
                        label = content.label;
                    } else {
                        return '';
                    }
                    if (typeof content.value == 'string') {
                        value = content.value;
                    } else {
                        return '';
                    }
                    return ''+
                    '<ul class="c-grid m-space-between m-nowrap u-fs-sm u-b-thin-solid-edge">'+
                        '<li class="m-w-3 u-pl-sm u-pr-sm u-pt-xxs u-pb-xxs">'+label+'</li>'+
                        '<li class="m-grow m-w-1 u-ff-monospace u-pl-sm u-pr-sm u-pt-xxs u-pb-xxs u-ta-right c-text m-break-word" id="'+id+'">'+value+'</li>'+
                        '<li class="c-btn u-pl-sm u-pr-sm u-pt-xxs u-pb-xxs" title="Click to copy" onclick="styleGuide.copyToClipboard(\'#'+id+'\');">'+
                            '<span class="i-copy"></span>'+
                        '</li>'+
                    '</ul>';
                },
                simpleInput: function() {
                    let randomString = Array(7).fill('').map((v) => Math.random().toString(36).charAt(2)).join(''), // Random string
                        classNames = '',
                        type = 'radio',
                        name = 'name-'+randomString,
                        id = 'id-'+randomString,
                        label = 'value-'+randomString,
                        value = ''
                        attributes = '',
                        markup = '';
                    if (typeof content.classNames == 'string') {
                        classNames = content.classNames;
                    }
                    if (typeof content.type == 'string') {
                        type = content.type;
                    }
                    if (typeof content.name == 'string') {
                        name = content.name;
                    }
                    if (typeof content.id == 'string') {
                        id = content.id;
                    }
                    if (typeof content.label == 'string') {
                        label = content.label;
                    }
                    if (typeof content.value == 'string') {
                        value = content.value;
                    }
                    if (typeof content.attributes == 'object') {
                        content.attributes.forEach(function(attribute) {
                            if (typeof attribute.name == 'string' && typeof attribute.value == 'string') {
                                if (attribute.value == '') {
                                    attributes += attribute.name+' ';
                                } else {
                                    attributes += attribute.name+'="'+attribute.value+'" ';
                                }
                            }
                        });
                    }
                    markup += ''+
                    '<div class="'+classNames+'">'+
                        '<input type="'+type+'" name="'+name+'" id="'+id+'" value="'+value+'" '+attributes+'>'+
                        '<label for="'+id+'">'+label+'</label>'+
                    '</div>';
                    return markup;
                },
                illustrationColor: function() {
                    let value = '';
                    if (typeof content.value == 'string' && content.value.length > 0) {
                        value = content.value;
                    }
                    return '<div class="-pattern-square" style="box-shadow: -5px 10px 10px 0px rgba(0,0,0,0.2); position: absolute; width: 100%; height: 100%; "></div>'+
                    '<div style="position: absolute; width: 100%; height: 100%; background-color: '+value+';"></div>';
                },
                illustrationBorderRadius: function() {
                    let text = '',
                        style = 'border: 1px solid black; width: 100%; height: 60px; font-size: xx-small; line-height: initial; padding: 1em;';
                    if (typeof content.text == 'string' && content.text.length > 0) {
                        text = content.text;
                    }
                    if (typeof content.style == 'string' && content.style.length > 0) {
                        style += content.style;
                    }
                    return ''+
                    '<div style="'+style+'">'+
                        text+
                    '</div>';
                },
                illustrationBorder: function() {
                    let text = '',
                        style = 'border:1px dashed #888; width: 100%; height: 60px; position:relative; z-index: 1;';
                    if (typeof content.text == 'string' && content.text.length > 0) {
                        text = content.text;
                    }
                    if (typeof content.style == 'string' && content.style.length > 0) {
                        style += content.style;
                    }
                    return ''+
                    '<div class="u-relative u-pattern-square m-soft u-p-sm">'+
                        '<div style="'+style+'"></div>'+
                    '</div>';
                }
            }
            return templates[templateName](content);
        }
    },
    copyToClipboard: function(value) {
        if (typeof value == 'string') {
            // From https://stackoverflow.com/a/30905277
            // Create a "hidden" input
            var aux = document.createElement("input");
            // If it is an ID, use text of this element
            if (value.indexOf('#') === 0) {
                const id = value.split('#')[1];
                if (document.getElementById(id).tagName == 'INPUT') {
                    value = document.getElementById(id).value;
                } else {
                    value = document.getElementById(id).innerText;
                }
            }
            // Assign it the value of the specified element
            aux.setAttribute("value", value);
            // Append it to the body
            document.body.appendChild(aux);
            // Highlight its content
            aux.select();
            // Copy the highlighted text
            document.execCommand("copy");
            // Remove it from the body
            document.body.removeChild(aux);
            // Done
            alert('Code copied to clipboard:'+value);
        }
    }
}
styleGuide.update();