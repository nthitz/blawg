var _ = require('lodash');
var $ = require('jquery');

/** A rAF manager that ties animate callbacks to visible dom elements */
export default class requestAnimationElementManager {
  constructor() {

    this.animate = this.animate.bind(this);
    this._scrollHandler = this._scrollHandler.bind(this);

    this.elementCallbacks = [];

    // TODO figure about a better `window` detection
    if(typeof window !== 'undefined') {
      $(window).scroll(_.throttle(this._scrollHandler, 100));
    }


  }

  /** Mark elements that are in the viewport as active */
  _scrollHandler() {
    var top = (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0);
    var bottom = top + window.innerHeight;
    _.each(this.elementCallbacks, function(element) {
      var active = false
      var bbox = element.element.getBoundingClientRect();
      var inViewport =
        (bbox.top > 0 && bbox.top < window.innerHeight) ||
        (bbox.bottom > 0 && bbox.bottom < window.innerHeight)

      var now = Date.now();

      if(inViewport && ! element.active) {
        // if it's visible and was currently inactive
        element.active = true;
        // update the start time to be however much time it has animated so far before the current time.
        element.startTime = now - element.timeActive;
      } else if ( ! inViewport && element.active) {
        //if it's not in the viewport and was active
        element.active = false;
      }
    })
  }

  /** execute the animate callback for visible elements */
  animate() {
    var now = Date.now();
    requestAnimationFrame(this.animate);
    _.each(this.elementCallbacks, (element) => {
      if(element.active) {
        element.timeActive = now - element.startTime;
        element.callback(element.timeActive);
      }
    });
  }

  startAnimation() {
    requestAnimationFrame(this.animate);
  }

  add(callback, element) {
    this.elementCallbacks.push({
      callback: callback,
      element: element,
      active: false,
      timeActive: 0,
      startTime: null,
    });

    this._scrollHandler()
  }

}