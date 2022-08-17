// Playground - Auto iframe
let playground = {
    /**
    * DECODE HTML
    * Decodes HTML entities
    * @html - string - HTML entities to decode
    */  
    decodeHtml: function(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    },
    /**
    * IS IN VIEWPORT
    * Tells whether or not an DOM element is into the viewport 
    * @el - DOM element to parse
    */  
    isInViewport: function(el) {
        if (typeof el === 'object') {
            var jQ_el = jQuery(el),
                screenHeight = jQuery(window).height(),
                scrollTop = jQuery(window).scrollTop(),
                viewportTop = scrollTop,
                viewportBottom = scrollTop + screenHeight;
            // Top position of the element
            var positionTop = jQ_el.offset().top;
            // Bottom position of the element
            var positionBottom = positionTop + jQ_el.height();
            // If "into the viewport"
            if ((positionTop >= viewportTop && positionTop <= viewportBottom) || (positionBottom >= viewportTop && positionBottom <= viewportBottom)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    },
    // UPDATE
    // Method
    // @id - string - optional - id of the playground to process
    update: function(id) {
        // Default playground selector
        var mainSelector = '.playground';
        // If id argument is a string
        if (typeof(id) == 'string') {
            // If the string is a valid playground id
            if (jQuery(mainSelector+'#'+id).length == 1) {
                // Remove the instance
                jQuery('#'+id+'-instance').remove();
                // Set this id as new selector
                mainSelector = '#'+id;
            } 
            // Otherwise stop
            else {
                return;
            }
        } 
        // Otherwise remove any playgraound instance
        else {
            jQuery(mainSelector+'-instance').remove();
        }
        // Iterate each playgournd from selector
        jQuery(mainSelector).each(function(playgroundIndex) {
            var jQ_this = jQuery(this),
                playgroundId = jQ_this.attr('id'), // Playground id
                playgroundTitle = jQ_this.attr('title'); // Playground title (optional)
            if (playgroundId === undefined) {
                // If playground id is not set, apply one based on index
                playgroundId = 'playground-'+playgroundIndex;
                jQ_this.attr('id', playgroundId);
            }
            // Optional playground title
            if (playgroundTitle === undefined) {
                playgroundTitle = 'Playground';
            }
            // The HTML content of the current playground
            // var content = jQ_this.html();
            var content = jQ_this.find('code').html();
            // console.log(jQ_this.find('code').html());
            content = playground.decodeHtml(content);
            // Set up the final opbject that will be base64 and stringified
            var sentObject = {
                options: {
                    title: playgroundTitle
                    // padding: optionPadding,
                    // forcePattern: optionForcePattern,
                    // forceHardPattern: optionForceHardPattern,
                    // centered: optionCentered
                },
                content: content
            }
            // Stringify the object to send
            var stringifiedSentObject = JSON.stringify(sentObject);
            // Set to base64
            var sentObject64 = btoa(stringifiedSentObject);
            // Build the iframe HTML string
            var iframeStr = '<iframe id="'+playgroundId+'-iframe" data-src="'+site.url+site.baseurl+'/assets/libdoc/playground.html#'+sentObject64+'" class="playground-iframe not-rendered u-transition-none u-absolute u-h-100 u-b-none u-w-100"></iframe>';
            // Sets the href attribute on the open new tab button link
            // jQuery('[data-playground-new-tab="'+playgroundId+'"]').attr('href', site.url+site.baseurl+'/libdoc/playground.html#'+sentObject64);
            var iframeUrl = site.url+site.baseurl+'/assets/libdoc/playground.html#'+sentObject64;
            // Trim to remove unwanted white spaces
            var trimmed = content.replace(/ /g,'');
            var buf = [];
            for (var i = content.length-1; i >= 0; i--) {
                buf.unshift(['&#', content[i].charCodeAt(), ';'].join(''));
            }
            trimmed = buf.join('');
            if (document.getElementById('libdoc-page-split') !== null && playgroundIndex == 0) {
                // Remove header if playground expand
                if (window.location.href.indexOf('page-split.html#') > 0) {
                    jQuery('#libdoc-page-split-header').remove();
                }
                // Insert into dedicated container
                jQuery('#libdoc-page-split').html(
                    '<ul class="m-w-12 c-grid m-right u-bt-thin-dashed-alt u-br-thin-dashed-alt u-bc-primary-edge" m-nowrap="md,xl" data-playground-commands="'+playgroundId+'">'+
                        '<li class="u-p-sm u-bb-thin-dashed-alt c-text m-ff-headline u-bc-primary-edge" m-grow="md,xl" m-w-12="sm">'+playgroundTitle+'</li>'+
                        '<li class="c-grid m-nowrap m-order--1--sm">'+
                            '<a href="'+iframeUrl+'" class="c-btn u-p-sm u-bl-thin-dashed-alt u-bb-thin-dashed-alt" title="Open in a new tab" target="_blank" data-playground-new-tab="'+playgroundId+'">'+
                                '<span class="i-external-link u-fs-md"></span>'+
                            '</a>'+
                            '<button class="c-btn u-p-sm u-bl-thin-dashed-alt u-bb-thin-dashed-alt" title="Refresh this playground" onclick="document.getElementById(\''+playgroundId+'-iframe\').contentWindow.location.reload()">'+
                                '<span class="i-refresh u-fs-md"></span>'+
                            '</button>'+
                            // '<button class="c-btn u-p-sm u-bl-thin-dashed-alt u-bb-thin-dashed-alt maximize" title="Maximize playground" onclick="playground.expand(\''+playgroundId+'\')">'+
                            //     '<span class="i-maximize-2 u-fs-md"></span>'+
                            // '</button>'+
                            // '<button class="c-btn u-p-sm u-bl-thin-dashed-alt u-bb-thin-dashed-alt u-none minimize" title="Minimize playground" onclick="playground.expand(\''+playgroundId+'\')">'+
                            //     '<span class="i-minimize-2 u-fs-md"></span>'+
                            // '</button>'+
                            '<button class="c-btn u-p-sm u-bl-thin-dashed-alt u-bb-thin-dashed-alt" title="View settings of the playground" my-toggle="libdoc-modal" onclick="modalAjax(\'playground-settings\')">'+
                                '<span class="i-info u-fs-md"></span>'+
                            '</button>'+
                        '</li>'+
                    '</ul>'+
                    '<div class="m-grow m-w-12 playground-instance" u-h-50vh="sm" id="'+playgroundId+'-instance">'+
                        '<div class="u-relative u-transition-none u-br-thin-dashed-alt u-o-auto u-h-100 u-mw-100" id="'+playgroundId+'-wrapper">'+
                            iframeStr+
                            '<div class="playground-preview c-position m-absolute m-top-left u-w-100 u-h-100 u-bg-play u-cur-pointer" onclick="playground.loadIframe(\''+playgroundId+'-iframe\')"></div>'+
                        '</div>'+
                    '</div>'
                );
                if (jQ_this.hasClass('playground-pin')) {
                    jQuery('#libdoc-featured-code').after(
                        '<pre id="'+playgroundId+'-iframe-code" class="u-m-none">'+
                            '<code class="language-html">'+
                                trimmed+
                            '</code>'+
                        '</pre>'
                    );
                } else {
                    jQ_this.after(
                        '<pre id="'+playgroundId+'-iframe-code" class="u-m-none">'+
                            '<code class="language-html">'+
                                trimmed+
                            '</code>'+
                        '</pre>'
                    );
                }

            } else {
                // Insert HTML after hidden playground
                jQuery(this).after(
                    // '<code class="u-p-xxs u-fs-xxs u-bc-primary-edge u-lh-base u-bl-thin-dashed-alt u-bt-thin-dashed-alt u-br-thin-dashed-alt c-text m-nowrap u-c-primary-alt">'+
                    //     '<span class="i-code u-va-middle"></span> playground'+
                    // '</code>'+
                    '<ul class="c-grid m-nowrap u-bl-thin-dashed-alt u-bt-thin-dashed-alt u-br-thin-dashed-alt u-bc-primary-edge" data-playground-commands="'+playgroundId+'">'+
                        '<li class="m-grow u-p-sm u-bb-thin-dashed-alt c-text m-ff-headline u-bc-primary-edge">'+playgroundTitle+'</li>'+
                        '<li class="c-grid m-nowrap">'+
                            '<a href="'+iframeUrl+'" class="c-btn u-p-sm u-bl-thin-dashed-alt u-bb-thin-dashed-alt" title="Open in a new tab" target="_blank" data-playground-new-tab="'+playgroundId+'">'+
                                '<span class="i-external-link u-fs-md"></span>'+
                            '</a>'+
                            '<button class="c-btn u-p-sm u-bl-thin-dashed-alt u-bb-thin-dashed-alt" title="Refresh this playground" onclick="document.getElementById(\''+playgroundId+'-iframe\').contentWindow.location.reload()">'+
                                '<span class="i-refresh u-fs-md"></span>'+
                            '</button>'+
                            
                            // '<button class="c-btn u-p-sm u-bl-thin-dashed-alt u-bb-thin-dashed-alt maximize" title="Maximize playground" onclick="playground.expand(\''+playgroundId+'\')">'+
                            //     '<span class="i-maximize-2 u-fs-md"></span>'+
                            // '</button>'+
                            // '<button class="c-btn u-p-sm u-bl-thin-dashed-alt u-bb-thin-dashed-alt u-none minimize" title="Minimize playground" onclick="playground.expand(\''+playgroundId+'\')">'+
                            //     '<span class="i-minimize-2 u-fs-md"></span>'+
                            // '</button>'+
                            '<button class="c-btn u-p-sm u-bl-thin-dashed-alt u-bb-thin-dashed-alt" title="View settings of the playground" my-toggle="libdoc-modal" onclick="modalAjax(\'playground-settings\')">'+
                                '<span class="i-info u-fs-md"></span>'+
                            '</button>'+
                        '</li>'+
                    '</ul>'+
                    '<div class="playground-instance" id="'+playgroundId+'-instance">'+
                        '<div class="u-relative u-transition-none u-bl-thin-dashed-alt u-br-thin-dashed-alt u-o-auto u-resize-both u-mw-100" id="'+playgroundId+'-wrapper" style="min-height: '+window.site.playground.min_height+'">'+
                            iframeStr+
                            '<div class="playground-preview c-position m-absolute m-top-left u-w-100 u-h-100 u-bg-play u-cur-pointer" onclick="playground.loadIframe(\''+playgroundId+'-iframe\')"></div>'+
                        '</div>'+
                        '<pre id="'+playgroundId+'-iframe-code" class="u-m-none">'+
                            '<code class="language-html">'+
                                trimmed+
                            '</code>'+
                        '</pre>'+
                    '</div>'
                );
            }
        });
        // Code formatter
        if (typeof Prism !== undefined) {
            Prism.highlightAll();
        }
    },
    // true if lazy loading is started
    lazyLoadingInit: false,
    /**
    * LOAD IFRAME
    * Loads the specified playground iframe
    * @id - string - ID of the playground iframe to load
    */
    loadIframe: function(id) {
        if (typeof id === 'string') {
            let jQ_el = jQuery('#'+id);
            if (jQ_el.length === 1) {
                const iframeUrl = jQ_el.attr('data-src');
                let jQ_preview = jQ_el.closest('.playground-instance').find('.playground-preview');
                jQ_preview
                    .removeClass('u-bg-play')
                    .addClass('u-bg-loading');
                jQ_el
                    .on('load', function() {
                        jQ_preview.remove();
                    })
                    .attr('src', iframeUrl)
                    .removeClass('not-rendered');
            }
        }
    },
    /**
    * LAZY LOADING
    * Loads playground iframes into the viewport
    */  
    lazyLoading: function() {
        let pastScrollAmount = 0;
        // Run only is not alreadu started
        if (!playground.lazyLoadingInit) {
            let loadViewableIframeUrl = function() {
                const   currentScrollAmount = jQuery(window).scrollTop(),
                        sensitivity = Math.abs(pastScrollAmount - currentScrollAmount);
                pastScrollAmount = currentScrollAmount;
                // Load only if scroll speed if below a threshold to avoid bottleneck
                if (sensitivity < 100) {
                    jQuery('.playground-iframe.not-rendered').each(function() {
                        if (playground.isInViewport(jQuery(this)[0])) {
                            const id = jQuery(this).attr('id');
                            playground.loadIframe(id);
                        }
                    });
                }
            };
            loadViewableIframeUrl();
            jQuery(window).on('scroll', function() {
                loadViewableIframeUrl();
            });
            playground.lazyLoadingInit = true;
        } else {
            console.log('Playground lazy loading is already running');
            return false;
        }
    }
}
playground.update();
playground.lazyLoading();

