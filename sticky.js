(function() {
  angular
  .module("sticky", [])
  .directive("sticky", StickyDirective);

  StickyDirective.$inject = ['$window'];

  function StickyDirective($window) {
    return {
      link: function(scope, element, attrs) {

        var $win = angular.element($window);

        if (scope._stickyElements === undefined) {
          scope._stickyElements = [];

          $win.bind("scroll.sticky", function(e) {
            var pos = $win.scrollTop();
            for (var i=0; i<scope._stickyElements.length; i++) {

              var item = scope._stickyElements[i];

              if (attrs.stickyImmediate !== undefined) {
                if (!item.isStuck && post > 0) {
                  stickElement(item);
                }
                else if (item.isStuck && post <= 0) {
                  unStickElement(item);
                }
              }
              else {
                if (!item.isStuck && pos > item.start) {
                  stickElement(item);
                }
                else if (item.isStuck && pos < item.start) {
                  unStickElement(item);
                }
              }
            }
          });

          var recheckPositions = function() {
            for (var i=0; i<scope._stickyElements.length; i++) {
              var item = scope._stickyElements[i];
              if (!item.isStuck) {
                item.start = item.element.offset().top;
              } else if (item.placeholder) {
                item.start = item.placeholder.offset().top;
              }
            }
          };
          $win.bind("load", recheckPositions);
          $win.bind("resize", recheckPositions);
        }

        var item = {
          element: element,
          isStuck: false,
          placeholder: attrs.usePlaceholder !== undefined,
          start: element.offset().top
        };

        scope._stickyElements.push(item);

      }
    };
  }

  function stickElement() {
    item.element.addClass("stuck");
    item.isStuck = true;

    if (item.placeholder) {
      item.placeholder = angular.element("<div></div>")
          .css({height: item.element.outerHeight() + "px"})
          .insertBefore(item.element);
    }
  }

  function unStickElement(item) {
    item.element.removeClass("stuck");
    item.isStuck = false;

    if (item.placeholder) {
      item.placeholder.remove();
      item.placeholder = true;
    }
  }
})();
