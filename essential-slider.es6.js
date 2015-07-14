/**
 * @module      simple-slider
 * @author      Reydel Leon Machado
 * @copyright   (c) 2015 Reydel Leon Machado
 * @license     MIT License
 */

((window) => {
    "use strict";

    var minimalSlider;

    /**
     * An Object to hold an individual slider's data
     *
     * @param {NodeList} slider
     * @constructor
     */
    class Slider {
        get optionDefaults() {
            return {
                gutter: 1,
                currentIndex: 0
            }
        }

        /**
         *
         * @param {HTMLNode} sliderNode
         * @param options
         */
        constructor(sliderNode, options) {
            this.node = sliderNode,
                    this.controls = this.node.children[0],
                    this.controlPrev = this.controls.children[0],
                    this.controlNext = this.controls.children[1],
                    this.viewport = sliderNode.children[1],
                    this.ul = this.viewport.children[0],
                    this.li = this.ul.children,
                    this.liCount = this.li.length,

                    this.options = Object.assign({}, this.optionDefaults, options);

            return this;
        }

        init() {
            var slidesContainerWidth,
                slideWidth,

                slidesContainerWidth = 100 * this.liCount + (this.options.gutter * this.liCount),
                slideWidth           = Math.floor(100 / this.liCount) - this.options.gutter;

            this.ul.style.width = slidesContainerWidth + '%';

            for (var i = 0; i < this.li.length; i += 1) {
                this.li[i].style.width = slideWidth + '%';
                this.li[i].style.marginRight = 1 + '%';
            }

            // Bound the click events on the navigation controls to the appropriate actions
            this.controlNext.addEventListener('click', this.next.bind(this));
            this.controlPrev.addEventListener('click', this.prev.bind(this));

            this.move(this.options.currentIndex);
        }

        move(index) {
            index = index >= 0 ? index : this.li.length - 1;
            index = index <= this.li.length - 1 ? index : 0;

            var effectiveGutter = index > 0 ? this.options.gutter : 0;

            this.ul.style.left = '-' + (100 * index + effectiveGutter) + '%';
            this.options.currentIndex = index;
        }

        next() {
            this.move(this.options.currentIndex + 1);
        }

        prev() {
            this.move(this.options.currentIndex - 1);
        }
    }

    /**
     * This is the library Object.
     *
     * @param {NodeList[]} nodeList
     * @constructor
     */
    function MinimalSlider(nodeList, options) {
        var sliders = [];

        // Set up the sliders
        nodeList.forEach((node, index, sliders) => {
            let slider = new Slider(node, options);
            sliders.push(slider);
            slider.init();
        });
    }

    /**
     * Initializes the sliders
     *
     * @param selector
     * @returns {MinimalSlider}
     */
    function init(selector = 'minimal-slider', options = {}) {
        var sliderEls = [],
            els       = document.querySelectorAll(selector);

        for (var i = 0; i < els.length; i += 1) {
            sliderEls.push(els[i]);
        }

        return new MinimalSlider(sliderEls, options);
    }

    /**
     * This is the Object that will be used to access the library methods.
     *
     * @type {Object}
     */
    minimalSlider = {
        init: init
    };

    //define globally if it doesn't already exist
    if (typeof(window.MinimalSlider) === 'undefined') {
        window.MinimalSlider = minimalSlider;
    }
    else {
        console.log("Library already defined.");
    }
})(window);
