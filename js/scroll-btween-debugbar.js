// This file is for ScrollBtween playground demonstration purpose only
scrollBtween.debugbar = function() {
    const style = ''+
    '<style>'+
        '#scroll-btween-debugbar { position: fixed; top: 0; right: 0; background: #343b43; color: white; font-size: small; font-family: monospace; padding: 1em 0em 1em 1em; }'+
        '#scroll-btween-debugbar ul { display: flex; padding: 0em 1em 0em 0em; list-style: none; margin: 0; }'+
        '#scroll-btween-debugbar ul ul { flex-direction: column }'+
        '#scroll-btween-debugbar li { display: flex; justify-content: space-between; }'+
        '#scroll-btween-debugbar li > span:first-child { padding-right: 1em; }'+
        '#scroll-btween-debugbar li > span:last-child { white-space:nowrap; width: 7ch; overflow:hidden; text-overflow: ellipsis; }'+
    '</style>';
    document.querySelector('head').insertAdjacentHTML('beforeend', style);
    document.querySelector('body').insertAdjacentHTML('beforeend', '<div id="scroll-btween-debugbar"></div>');
    let el_debugbar = document.getElementById('scroll-btween-debugbar');
    if (el_debugbar !== null) {
        if (scrollBtween.debugbar === undefined) {
            scrollBtween.debugbar = {};
        }
        let els_to_debug = document.querySelectorAll('[scroll-btween]');
        let toDo = function() {
            if (typeof els_to_debug == 'object') {
                els_to_debug.forEach(function(el) {
                    const scrollline = scrollBtween.getIntersection(el);
                    const id = el.getAttribute('scroll-btween');
                    if (scrollBtween.debugbar[id] === undefined) {
                        scrollBtween.debugbar[id] = {
                            scrollline: scrollline
                        }
                    } else {
                        scrollBtween.debugbar[id]['scrollline'] = scrollline;
                    }
                });
                let markup = '<ul>';
                for (const id in scrollBtween.debugbar) {
                    if (Object.hasOwnProperty.call(scrollBtween.debugbar, id)) {
                        markup += '<li>'+
                            '<ul>'+
                                '<li><span>ID</span> <span>'+id+'</span></li>'+
                                '<li><span>Intersection</span> <span>'+scrollBtween.debugbar[id]['scrollline']+'</span></li>'+
                            '</ul>'+
                        '</li>';                        
                    }
                }
                markup += '</ul>';
                el_debugbar.innerHTML = markup;
            }
        }
        toDo();
        window.addEventListener('scroll', function() {
            toDo();
        });
    }
}
scrollBtween.debugbar();
