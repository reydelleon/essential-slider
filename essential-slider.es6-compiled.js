/**
 * Essential-Slider
 *
 * @author      Reydel Leon Machado
 * @version     0.0.1
 * @license     MIT License
 */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function (window) {
    var minimalSlider;

    /**
     * An Object to hold an individual slider's data
     *
     * @param {NodeList} slider
     * @constructor
     */

    var Slider = (function () {
        _createClass(Slider, [{
            key: 'optionDefaults',
            get: function get() {
                return {
                    direction: 'right',
                    gutter: 1,
                    currentSlide: 0,
                    delay: 10,
                    duration: 1000, // One second by default
                    pauseTime: 4000,
                    auto: false,
                    easying: 'easyInOut'
                    //prevText: '&laquo',
                    //nextText: '&raquo'
                };
            }
        }]);

        /**
         *
         * @param {HTMLNode} sliderNode
         * @param options
         */

        function Slider(sliderNode, options) {
            _classCallCheck(this, Slider);

            this.node = sliderNode, this.controls = this.node.children[0], this.controlPrev = this.controls.children[0], this.controlNext = this.controls.children[1], this.viewport = sliderNode.children[1], this.ul = this.viewport.children[0], this.li = this.ul.children, this.liCount = this.li.length, this.options = Object.assign({}, this.optionDefaults, options);

            return this;
        }

        _createClass(Slider, [{
            key: 'init',
            value: function init() {
                var slidesContainerWidth,
                    slideWidth,
                    slidesContainerWidth = 100 * this.liCount + this.options.gutter * this.liCount,
                    slideWidth = Math.floor(100 / this.liCount) - this.options.gutter;

                this.ul.style.width = slidesContainerWidth + '%';

                for (var i = 0; i < this.li.length; i += 1) {
                    this.li[i].style.width = slideWidth + '%';
                    this.li[i].style.marginRight = 1 + '%';
                }

                // Bound the click events on the navigation controls to the appropriate actions
                this.controlNext.addEventListener('click', this.move.bind(this, 'right'));
                this.controlPrev.addEventListener('click', this.move.bind(this, 'left'));

                this.move(this.options.currentSlide);
            }
        }, {
            key: 'animate',

            /**
             * Generic animation function. It relies on two functions to operate: <tt>delta</tt> and <tt>step</tt>.
             * <tt>delta</tt> is charged with calculating in what stage is the animation at any given time, while
             * <tt>step</tt> is charged with executing the actual animation, one step at a time.
             *
             * @param {Object} options Contains the following properties: delay(optional), duration, {function}delta and
             * {function}step.
             */
            value: function animate(options) {
                var start = new Date(),
                    id;

                id = setInterval(function () {
                    var lapsedTime, progress, delta;

                    lapsedTime = new Date() - start;
                    progress = lapsedTime / options.duration;

                    progress = progress < 1 ? progress : 1; // To account for browser timer inconsistencies.

                    delta = options.delta(progress);
                    options.step(delta);

                    if (progress === 1) {
                        clearInterval(id);
                    }
                }, options.delay || this.options.delay);
            }
        }, {
            key: 'move',
            value: function move() {
                var _this = this;

                var direction = arguments.length <= 0 || arguments[0] === undefined ? this.options.direction : arguments[0];

                var index, effectiveGutter, target;
                if (direction === 'right') {
                    index = this.options.currentSlide < this.li.length - 1 ? this.options.currentSlide + 1 : 0;
                } else {
                    //Assume left
                    index = this.options.currentSlide > 0 ? this.options.currentSlide - 1 : this.li.length - 1;
                }

                effectiveGutter = index > 0 ? this.options.gutter : 0;
                target = 100 * index + effectiveGutter;

                this.animate({
                    duration: this.options.duration,
                    delta: function delta(progress) {
                        return progress;
                    },
                    step: function step(delta) {
                        _this.ul.style.left = '-' + target * delta + '%';
                    }
                });

                this.options.currentSlide = index;
            }

            //move(index) {
            //    index = index >= 0 ? index : this.li.length - 1;
            //    index = index <= this.li.length - 1 ? index : 0;
            //
            //    var effectiveGutter = index > 0 ? this.options.gutter : 0;
            //
            //    this.ul.style.left = '-' + (100 * index + effectiveGutter) + '%';
            //    this.options.currentSlide = index;
            //}

        }]);

        return Slider;
    })();

    /**
     * This is the library Object.
     *
     * @param {NodeList[]} nodeList
     * @constructor
     */
    function MinimalSlider(nodeList, options) {
        var sliders = [];

        // Set up the sliders
        nodeList.forEach(function (node, index, sliders) {
            var slider = new Slider(node, options);
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
    function init() {
        var selector = arguments.length <= 0 || arguments[0] === undefined ? 'minimal-slider' : arguments[0];
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var sliderEls = [],
            els = document.querySelectorAll(selector);

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
    if (typeof window.MinimalSlider === 'undefined') {
        window.MinimalSlider = minimalSlider;
    } else {
        console.log('Library already defined.');
    }
})(window);

//# sourceMappingURL=essential-slider.es6-compiled.js.map