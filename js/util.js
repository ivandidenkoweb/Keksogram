(function () {
    var ESC_KEYCODE = 27;
    var ENTER_KEYCODE = 13;

    window.util = {
        isEscEvent: function (evt, action) {
            if (evt.keyCode === ESC_KEYCODE) {
                action();
            }
        },
        isEnterEvent: function (evt, action) {
            if (evt.keyCode === ENTER_KEYCODE) {
                action();
            }
        },
        getRandomNumber: function (min, max) {
            return Math.ceil(Math.random() * (max - min) + min);
        },
        shuffle: function (arr){
            var j, temp;
            for(var i = arr.length - 1; i > 0; i--){
                j = Math.floor(Math.random()*(i + 1));
                temp = arr[j];
                arr[j] = arr[i];
                arr[i] = temp;
            }
            return arr;
        }
    };
})();