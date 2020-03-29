// модуль для устранения "дребезга"

(function () {
    var DEBOUNCE_INTERVAL = 500;

    window.debounce = function(fun){
        var lastTimeout = null;
        if(lastTimeout){
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function(){
          fun();
        }, DEBOUNCE_INTERVAL);
      };

    // window.debounce = function (fun) {
    //     var lastTimeout = null;
    //     console.log('debounce work');

    //     return function () {
    //         var args = arguments;
    //         if (lastTimeout) {
    //             window.clearTimeout(lastTimeout);
    //         }
    //         lastTimeout = window.setTimeou(function () {
    //             fun.apply(null, args);
    //         }, DEBOUNCE_INTERVAL);
    //     };
    // };
})();