// SIDEBAR
let sidebar = function() {
    jQuery('#sidebar').toggleClass('m-anchor-top-right--sm m-anchor-top-right--md');
    jQuery('#sidebar-overlay').toggleClass('m-anchor-top-right');
}
// TOC
let tocbar = function() {
    jQuery('#toc-container').toggleClass('m-anchor-top-left m-anchor-top-right');
    jQuery('#toc-overlay').toggleClass('m-anchor-top-left m-anchor-top-right m-top-left m-top-right');
}
// COPY TO CLIPBOARD
let copyToClipboard = function(value) {
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
// Auto scroll to hash anchor
jQuery(window).on('load', function() {
    if (document.location.hash != "") {
        var id = document.location.hash;
        console.log(jQuery(id).length);
        if (jQuery(id).length == 1) {
            var amountOfScroll = jQuery(id).offset().top;
            console.log(amountOfScroll);
            jQuery(window).scrollTop(amountOfScroll);
        }
    }
});
jQuery(document).ready(function() {
    myToggle.update();
    //Manage external links
    jQuery('main a[href^="http"], .sidebar-item a[href^="http"]').each(function(){
        // Only if link is not in .playground
        if (jQuery(this).closest('.playground').length == 0) {
            var link = jQuery(this).attr('href');
            //Check if it is an internal link (check if hostname is contained into the link string)
            if(link.indexOf(window.location.origin) != 0){
                jQuery(this)
                    .append('<span class="i-external-link u-ml-xxs"></span>')
                    // .append(' <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg> ')
                    .attr('target','_blank');
            }
        }
    });

    // RESPONSIVE TABLES
    document.querySelectorAll('main table').forEach(function(el_table) {
        el_table.querySelectorAll('th').forEach(function(el_th, index_th) {
            const nth_child = index_th + 1;
            const title = el_th.innerText;
            el_table.querySelectorAll('tbody tr td:nth-child('+nth_child+')').forEach(function(el_td) {
                el_td.setAttribute('data-title', title);
            });
        });
    });

    // CREATE TOC 
    var jQ_kramdownToc = jQuery('#markdown-toc').clone();
    if(jQ_kramdownToc.length > 0){
        // TOC generation
        const page_title = jQuery('main h1:first-child').eq(0).text();
        jQ_kramdownToc.children('li').addClass('u-bt-thin-dashed-alt');
        jQ_kramdownToc.find('ol,ul').addClass('u-ls-none u-m-none u-pl-xs');
        jQ_kramdownToc.find('a').addClass('c-btn m-translucid m-block-left m-xs c-text m-ff-lead m-reset');
        jQuery('#toc-container').html(
            '<div class="c-position m-absolute m-top-left m-anchor-top-left u-bc-primary-edge u-w-100vw u-h-100vh u-translucid u-z-10" u-none="md,xl" id="toc-overlay" onclick="tocbar();"></div>'+
            // '<button class="c-btn u-z-10 c-position m-fixed m-top-left m-anchor-top-right" u-none="md,xl" onclick="tocbar()">'+
            //     '<span class="i-list"></span>'+
            // '</button>'+
            '<nav id="toc" class="u-sticky u-top-0 u-mh-100vh u-o-auto u-z-10">'+
                '<ol class="u-ls-none u-m-none u-p-none">'+
                    '<li><a href="#" class="c-btn m-translucid m-block-left u-pl-sm">'+page_title+'</a></li>'+
                    jQ_kramdownToc.html()+
                '</ol>'+
            '</nav>'
        );
    }
});