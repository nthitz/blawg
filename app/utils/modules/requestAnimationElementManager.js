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
      $(window).scroll(this._scrollHandler);
    }


  }

  /** Mark elements that are in the viewport as active */
  _scrollHandler() {
    var top = (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0);
    var bottom = top + window.innerHeight;
    _.each(this.elementCallbacks, function(elementCallback) {
      var active = false
      var bbox = elementCallback.element.getBoundingClientRect();
      var inViewport =
        (bbox.top > 0 && bbox.top < window.innerHeight) ||
        (bbox.bottom > 0 && bbox.bottom < window.innerHeight)

      if(inViewport) {
        active = true;
      }
      elementCallback.active = active
    })
  }

  /** execute the animate callback for visible elements */
  animate() {
    requestAnimationFrame(this.animate);
    _.each(this.elementCallbacks, (element) => {
      if(element.active) {
        element.callback();
      }
    });
  }

  add(callback, element) {
    this.elementCallbacks.push({
      callback: callback,
      element: element,
      active: false
    });

    this._scrollHandler()
  }

}