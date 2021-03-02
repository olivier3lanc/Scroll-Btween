/**
* TOGGLES
* Just toggle show/hide the target element of any trigger element
* Trigger: Element that fires the show/hide
* Toggle: Element to show/hide
* A toggle can have several triggers
* A single trigger can trig several toggles
<button my-toggle="foo">show hide</button>
<div my-toggle-name="foo">
    Any content
</div>
*/
var myToggle = {
    /**
    * OPEN TARGET
    * METHOD
    * Open the specified toggle target and set 'active' to its trigger(s)
    * @param {name} - string - The toggle target name
    */
    open: function(name) {
        if (name !== undefined) {
            myToggle.handler(jQuery('[my-toggle="'+name+'"]'), false);
        }
    },
    /**
    * CLOSE TARGET
    * METHOD
    * Close the specified toggle target and remove 'active' to its trigger(s)
    * @param {name} - string - The toggle target name
    */
    close: function(name) {
        var jQ_targets = jQuery('[my-toggle-name="'+name+'"]');
        if (jQ_targets.length > 0) {
            jQ_targets.removeClass('active');
            jQuery('[my-toggle="'+name+'"]').removeClass('active');
        }
    },
    /**
    * HANDLER
    * METHOD
    * Actions when event is triggered
    * @object - jQuery trigger element object
    * @closeIfActive - boolean - To avoid toggle if target is already active. Has effect only on basic toggles
    */
    handler: function(object, closeIfActive = true) {
        // Get target name
        var name = object.attr('my-toggle');
        // Optional toggle group node jQ object
        var jQ_toggleGroupNode = object.closest('[my-toggle-group]').eq(0);
        // Toggle group case
        // Open all the children 'my-toggle-name' 
        // of the current toggle group 'my-toggle-group'
        if (name == 'my-toggle-group') {
            jQ_toggleGroupNode.find('[my-toggle]').removeClass('active');
            var jQ_targets = object.closest('[my-toggle-group]').find('[my-toggle-name]');
            if (jQ_targets.length > 0) {
                if (!object.hasClass('active')) {
                    jQ_targets.addClass('active');
                    object.addClass('active');
                }
            }
        }
        // Any other case
        else {
            // Check expandable option
            // NOT GENERIC ENOUGH
            // TO BE GENERIFIED
            var jQ_toggleExpandableNode = object.closest('[my-toggle-expandable]').eq(0);
            if (jQ_toggleExpandableNode.length > 0) {
                var jQ_expandables = jQuery('[my-toggle-expandable]');
                // Reset margin for all expandable nodes
                jQ_expandables.css('margin-bottom', '');
                if (object.hasClass('active')) {
                    object
                        .removeClass('active');
                    jQ_toggleExpandableNode
                        .find('[my-toggle-name]')
                        .removeClass('active');
                } else {
                    // Close toggles that are children of node with 'my-toggle-expandable'
                    jQ_expandables
                        .find('[my-toggle], [my-toggle-name]')
                        .removeClass('active');
                    // Get content height
                    var toggleContentHeight = jQ_toggleExpandableNode.find('[my-toggle-name="'+name+'"]').height();
                    // Get margins to set proper offset spacing
                    var marginBottom = jQ_toggleExpandableNode.css('margin-bottom');
                    var marginTop = jQ_toggleExpandableNode.css('margin-top');
                    var offset = parseInt(marginBottom) + parseInt(marginTop);
                    // Get the height my-toggle-expandable node
                    var toggleExpandableNodeHeight = jQ_toggleExpandableNode.height();
                    // Adjust padding bottom
                    jQ_toggleExpandableNode.css('margin-bottom', toggleContentHeight + 1.5*offset);
                    // Then open toggle
                    jQ_toggleExpandableNode
                        .find('[my-toggle-name="'+name+'"]')
                        .css('margin-top', toggleExpandableNodeHeight + offset);
                    jQ_toggleExpandableNode
                        .find('[my-toggle="'+name+'"], [my-toggle-name="'+name+'"]')
                        .addClass('active');
                }
            }
            // Toggle group option
            else if (jQ_toggleGroupNode.length > 0) {
                // If target is INSIDE the toggle group
                if (jQ_toggleGroupNode.find('[my-toggle-name="'+name+'"]').length > 0) {
                    // console.log('Target inside toggle group');
                    if (object.hasClass('active')) {
                        // If single active target into a toggle group, behave as default toggle
                        if (jQ_toggleGroupNode.find('[my-toggle-name]').length == 1) {
                            jQ_toggleGroupNode
                                .find('[my-toggle="'+name+'"], [my-toggle-name="'+name+'"]')
                                .removeClass('active');
                        }
                    } else {
                        jQ_toggleGroupNode
                            .find('[my-toggle], [my-toggle-name]')
                            .removeClass('active');
                        jQ_toggleGroupNode
                            .find('[my-toggle="'+name+'"], [my-toggle-name="'+name+'"]')
                            .addClass('active');
    
                        // If single target into a toggle group, behave as default toggle
                        // Set as closable on any click into the document
                        if (jQ_toggleGroupNode.find('[my-toggle-name]').length == 1 && myToggle.toBeClosed.indexOf(name) === -1) {
                            myToggle.toBeClosed.push(name);
                        }
                    }
                    // Reset margin for optional my-toggle-expandable
                    jQ_toggleGroupNode
                        .find('[my-toggle-expandable]')
                        .css('margin-bottom', '');
                } else {
                    // console.log('Target outside toggle group');
                    // Close only if closeIfActive == true
                    // For ex. to avoid close target if open method is used
                    if (object.hasClass('active') && closeIfActive) {
                        jQuery('[my-toggle="'+name+'"], [my-toggle-name="'+name+'"]').removeClass('active');
                    } else {
                        jQuery('[my-toggle="'+name+'"], [my-toggle-name="'+name+'"]').addClass('active');
                        // Set as closable on any click into the document
                        if (myToggle.toBeClosed.indexOf(name) === -1) {
                            myToggle.toBeClosed.push(name);
                        }
                    }
                }
            }
            // if no options detected
            else {
                // Close only if closeIfActive == true
                // For ex. to avoid close target if open method is used
                if (object.hasClass('active') && closeIfActive) {
                    jQuery('[my-toggle="'+name+'"], [my-toggle-name="'+name+'"]').removeClass('active');
                } else {
                    jQuery('[my-toggle="'+name+'"], [my-toggle-name="'+name+'"]').addClass('active');
                    // Set as closable on any click into the document
                    if (myToggle.toBeClosed.indexOf(name) === -1) {
                        myToggle.toBeClosed.push(name);
                    }
                }
            }
        }
    },
    /**
    * TOBECLOSED
    * Array of toggle names to close on next document click
    */
    toBeClosed: [],
    /**
    * UPDATE
    * METHOD
    * Refresh toggles status and listeners
    */
    update: function() {
        // On document click, close any basic opened toggles
        jQuery(document).on('click', function(e) {
            // Make jQuery object of the clicked element
            var jQ_el = jQuery(e.target);
            // Cases for close elligibility on document click, click element must:
            // Not be a [my-toggle] element
            // Not be contained into a [my-toggle] element
            // THEN
            // Be contained into an active toggle [my-toggle-name].active into a toggle group [my-toggle-group]
            // Not be contained into an active toggle [my-toggle-name].active 
            if (jQ_el.attr('my-toggle') === undefined && jQ_el.closest('[my-toggle]').length === 0) {
                if (jQ_el.closest('[my-toggle-name].active').closest('[my-toggle-group]').length === 1 || jQ_el.closest('[my-toggle-name].active').length === 0) {
                    // Close all elligible toggles to be closed 
                    myToggle.toBeClosed.forEach(function(name) {
                        myToggle.close(name);
                    });
                    // Reset the list to be closed
                    myToggle.toBeClosed = [];
                }
            }
        });
        // Automatically set triggers as 'active' 
        // if not into a toggle group with a my-toggle="my-toggle-group" (show all) case
        jQuery('[my-toggle-name]').each(function() {
            var name = jQuery(this).attr('my-toggle-name');
            var jQ_toggleGroup = jQuery(this).closest('[my-toggle-group]');
            if (jQ_toggleGroup.find('[my-toggle="my-toggle-group"]').length === 0) {
                if (jQuery(this).hasClass('active')) {
                    jQ_toggleGroup.find('[my-toggle="'+name+'"]').addClass('active');
                } else {
                    jQ_toggleGroup.find('[my-toggle="'+name+'"]').removeClass('active');
                }
            }
        });
        
        // Default behavior
        jQuery('[my-toggle]:not([my-toggle-options*="hover"]):not([my-toggle-options*="mouseenter"])').off('click').on('click', function(e) {
            e.preventDefault();
            myToggle.handler(jQuery(this));
        });
        // With 'hover' option, toggles open/close on mouseenter
        jQuery('[my-toggle][my-toggle-options*="hover"]')
            .off('mouseenter')
            .off('mouseleave')
            .off('touchstart')
            .on('mouseenter', function() {
                // myToggle.handler(jQuery(this));
                if (!jQuery(this).hasClass('active')) {
                    myToggle.handler(jQuery(this));
                }
            })
            .on('mouseleave', function() {
                // Get target name
                var name = jQuery(this).attr('my-toggle');
                myToggle.close(name);
            })
            .on('touchstart', function(e) {
                //e.preventDefault();
                if (!jQuery(this).hasClass('active')) {
                    myToggle.handler(jQuery(this));
                    // Get target name
                    var name = jQuery(this).attr('my-toggle');
                    // jQuery('[my-toggle-name="'+name+'"]').one('mouseleave', function(e){
                    //     myToggle.close(name);
                    // });
                    jQuery(this).one('touchstart', function(e){
                        myToggle.close(name);
                    });
                }
            });

        jQuery('[my-toggle][my-toggle-options*="mouseenter"]')
            // .off('click')
            .off('mouseenter')
            .off('touchstart')
            // .on('click', function(e) {
            //     e.preventDefault();
            //     if (jQuery(this).hasClass('active')) {
            //         // Get target name
            //         var name = jQuery(this).attr('my-toggle');
            //         myToggle.close(name);
            //     }
            // })
            .on('mouseenter', function(e) {
                //e.preventDefault();
                if (!jQuery(this).hasClass('active')) {
                    myToggle.handler(jQuery(this));
                    // Get target name
                    var name = jQuery(this).attr('my-toggle');
                    jQuery('[my-toggle-name="'+name+'"]')
                        .off('click')
                        .on('click', function(e){
                            //if(e.target != this) return; // only continue if the target itself has been clicked
                            if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
                                myToggle.close(name);
                            }
                        });
                    jQuery(this).one('click', function(e){
                        myToggle.close(name);
                    });
                }
            })
            .on('touchstart', function(e) {
                //e.preventDefault();
                if (!jQuery(this).hasClass('active')) {
                    myToggle.handler(jQuery(this));
                    // Get target name
                    var name = jQuery(this).attr('my-toggle');
                    jQuery('[my-toggle-name="'+name+'"]').on('mouseleave', function(e){
                        //if(e.target != this) return; // only continue if the target itself has been clicked
                        // if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
                        //     myToggle.close(name);
                        // }
                        myToggle.close(name);
                    });
                    jQuery(this).one('touchstart', function(e){
                        myToggle.close(name);
                    });
                }
            });
    }
}
myToggle.update();
// export { myTab };
