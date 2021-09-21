jQuery(document).ready(function() {
    jQuery('.libdoc-preview').on('click', function(e) {
        e.preventDefault();
        let url = jQuery(this).attr('href');
        jQuery('body')
            .append(
                '<figure class="c-grid m-nowrap m-column m-middle m-center u-o-auto u-m-none u-fixed u-top-0 u-left-0 u-w-100 u-h-100 u-cur-pointer u-z-100 u-bg-damier-white-soft u-p-lg" onclick="jQuery(this).remove();">'+
                    '<img src="'+url+'" class="u-mh-100 u-mw-100">'+
                    '<figcaption class="c-text u-c-primary-alt u-ff-monospace u-fs-xs u-pt-md">'+url+'</figcaption>'+
                    '</div'+
                '</figure>'
            );
    });
    jQuery('#libdoc-asset-search').on('change', function() {
        let textToSearch = jQuery(this).val();
        jQuery('.libdoc-asset:not(:contains("'+textToSearch+'"))').addClass('u-none');
        jQuery('.libdoc-asset:contains("'+textToSearch+'")').removeClass('u-none');
    });
});