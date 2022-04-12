const scrollBtween = {
    defaults: {
        frameDurationinMs: 20, // Integer - Duration in ms between to animation states
        tweenerIntervalinMs: 300, // Integer - Smoothness of the change. Available only if Ola tweener is enabled, duration between to tweens
        enabled: true // boolean - Sets the status of animation interval
    },
    // Ola instance
    tween: {},
    tweenIndex: {},
    // Intersection
    // @el - object - The DOM object to detect
    // Returns float
    // value < 0 means the element is not visible yet
    // value between 0 and 1 means the element is currently visible into the viewport
    // 0 means the element starts into the vie wport
    // 1 means the element has just finished to run through the viewport
    // value > 1 means the element has past the viewport is not visible anymore
    getIntersection: function(el) {
        let response = -1;
        if (typeof el == 'object') {
            const detector_id = el.dataset.detector;
            if (detector_id !== undefined) {
                const el_detector = document.getElementById(detector_id);
                if (el_detector !== null) {
                    el = el_detector;
                }
            }
            if (typeof el.getBoundingClientRect == 'function') {
                const box = el.getBoundingClientRect();
                const el_offset_top = box.top + window.pageYOffset - document.documentElement.clientTop;
                const el_height = el.clientHeight;
                const window_scroll_top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
                const window_height = window.document.documentElement.clientHeight;
                response = (window_scroll_top + window_height - el_offset_top) / (window_height + el_height);
            }
        }
        return response;
    },
    // Set up the animations
    update: function() {
        // Scan for animations
        let elems_anims = document.querySelectorAll('[scroll-btween]');
        if (elems_anims !== null) {
            
            let ola_object = {};
            elems_anims.forEach(function(anim) {
                const anim_id = anim.getAttribute('scroll-btween');
                // Start populating custom index to quickly retrieve useful data on scroll binding function
                scrollBtween['tweenIndex'][anim_id] = [];
                Object.keys(anim.dataset).forEach(function(property, forEachIndex) {
                    const sourceExpression = anim.dataset[property].split('|');
                    let finalExpression = [];
                    let index = 0;
                    if (forEachIndex === 0) {
                        scrollBtween.tweenIndex[anim_id] = { transfer: {}, properties: []};
                    }
                    sourceExpression.forEach(function(partial) {
                        const fromToArray = partial.split(' to ');
                        if (fromToArray.length > 1) {
                            const fromValue = parseFloat(fromToArray[0]);
                            const toValue = parseFloat(fromToArray[1]);
                            const tween_id = anim_id + '_' + property + '_' + index.toString();

                            if (typeof Ola == 'function') {
                                ola_object[tween_id] = fromValue;
                            }

                            finalExpression.push(tween_id);
                            // Build the transfer function
                            scrollBtween.tweenIndex[anim_id]['transfer'][tween_id] = function(scroll_line) {
                                let response = 0
                                if (typeof scroll_line == 'number') {
                                    // Limits between 0 and 1
                                    if (scroll_line > 1) {
                                        scroll_line = 1;
                                    }
                                    if (scroll_line < 0) {
                                        scroll_line = 0;
                                    }
                                    // Keypoints case
                                    if (partial.indexOf(':') > 0) {
                                        // 0:0 to 70:0 to 100:150
                                        // console.log(anim_id);
                                        let xa = 0;
                                        let ya = fromValue;
                                        let xb = 1;
                                        let yb = 1;
                                        fromToArray.forEach(function(keypoint, keyPointIndex) {
                                            // If not last
                                            if (keyPointIndex < fromToArray.length - 1) {
                                                const positionCurrent = parseFloat(keypoint.split(':')[0]) / 100;
                                                const positionNext = parseFloat(fromToArray[keyPointIndex + 1].split(':')[0]) / 100;
                                                
                                                if (scroll_line >= positionCurrent && scroll_line <= positionNext) {
                                                    // console.log(positionCurrent, scroll_line, positionNext);
                                                    xa = positionCurrent;
                                                    ya = parseFloat(keypoint.split(':')[1]);
                                                    xb = positionNext;
                                                    yb = parseFloat(fromToArray[keyPointIndex + 1].split(':')[1]);
                                                }
                                            }
                                        });
                                        const coef = (yb - ya) / (xb - xa);
                                        const y0 = yb - coef * xb;
                                        response = coef * scroll_line + y0;
                                        // console.log(anim_id, response);
                                        // console.log('scroll_line:'+scroll_line, 'yb:'+yb, 'ya:'+ya, 'xb:'+xb, 'xa:'+xa, 'response:'+response);
                                    }
                                    // Basic fromValue/toValue case
                                    else {
                                        response = (toValue - fromValue) * scroll_line + fromValue;
                                    }
                                }
                                return response;
                            }

                            index++;
                        }
                        else {
                            finalExpression.push(partial);
                        }
                    });
                    scrollBtween.tweenIndex[anim_id]['properties'].push({
                        property: property,
                        expression: finalExpression
                    });
                });
            });
            // Include important style
            document.getElementsByTagName('head')[0].insertAdjacentHTML('beforeend', '<style>[scroll-btween] { transition: none !important; }</style>');
            // Init Ola tweener
            if (typeof Ola == 'function') {
                scrollBtween['tween'] = Ola(ola_object);
            }
            // Init window scroll listener only if tweener is enabled
            if (typeof Ola == 'function') {
                window.addEventListener('scroll', scrollBtween.updateTweenerValues, {passive: true});
                window.addEventListener('load', scrollBtween.updateTweenerValues);
            }
            requestAnimationFrame(scrollBtween.apply);
            // Old method
            // scrollBtween.interval = setInterval(scrollBtween.frame, scrollBtween.defaults.frameDurationinMs);
        }
    },
    // Update tweener values witht new values from scroll bindr nodes
    // @delay - int - optional - Duration in ms to tween
    updateTweenerValues: function(delay = scrollBtween.defaults.tweenerIntervalinMs) {
        if (typeof Ola == 'function') {
            for (const anim_id in scrollBtween.tweenIndex) {
                if (Object.hasOwnProperty.call(scrollBtween.tweenIndex, anim_id)) {
                    const node = document.querySelector('[scroll-btween="'+anim_id+'"]');
                    if (node !== null) {
                        // Get scroll line
                        const scroll_line = scrollBtween.getIntersection(node);
                        // Get the target value to reach
                        let ola_update_set = {};
                        for (const tween_id in scrollBtween['tweenIndex'][anim_id]['transfer']) {
                            if (Object.hasOwnProperty.call(scrollBtween['tweenIndex'][anim_id]['transfer'], tween_id)) {
                                ola_update_set[tween_id] = scrollBtween['tweenIndex'][anim_id]['transfer'][tween_id](scroll_line);
                            }
                        }
                        scrollBtween.tween.set(ola_update_set, delay);
                    }
                }
            }
        }
    },
    // Work to to on each animation interval
    apply: function() {
        for (const anim_id in scrollBtween.tweenIndex) {
            if (Object.hasOwnProperty.call(scrollBtween.tweenIndex, anim_id)) {
                const node = document.querySelector('[scroll-btween="'+anim_id+'"]');
                if (node !== null) {
                    let scroll_line = 0;
                    if (typeof Ola == 'undefined') {
                        scroll_line = scrollBtween.getIntersection(node);
                    }
                    if (typeof scrollBtween['tweenIndex'][anim_id]['properties'] == 'object') {
                        scrollBtween['tweenIndex'][anim_id]['properties'].forEach(function(data) {
                            let completeTweenedValueToApply = '';
                            data.expression.forEach(function(partialValue) {
                                if (typeof scrollBtween['tweenIndex'][anim_id]['transfer'][partialValue] == 'function') {
                                    if (typeof Ola == 'function') {
                                        completeTweenedValueToApply += scrollBtween.tween[partialValue].toString();
                                    } else {
                                        completeTweenedValueToApply += scrollBtween['tweenIndex'][anim_id]['transfer'][partialValue](scroll_line).toString();
                                    }
                                } else {
                                    completeTweenedValueToApply += partialValue;
                                }
                            });
                            // Apply the final style on the specifed node
                            node.style[data.property] = completeTweenedValueToApply;
                        });
                    }
                }
            }
        }
        if (scrollBtween.defaults.enabled) {
            requestAnimationFrame(scrollBtween.apply);
        }
    },
    // Method to apply on each animatiton interval
    frame: function() {
        if (scrollBtween.defaults.enabled) {
            scrollBtween.apply();
        }
    },
    // Start / Resume animation interval
    start: function() {
        scrollBtween.defaults.enabled = true;
        requestAnimationFrame(scrollBtween.apply);
    },
    // Stop / Pause animation interval
    stop: function() {
        scrollBtween.defaults.enabled = false;
    }
}
scrollBtween.update();
