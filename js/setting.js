// Настройки изображения

(function () {
    var scaleParameter = {
        MIN: 25,
        MAX: 100,
        STEP: 25
      };
    var limitEffectValue = {
        MARVIN_MAX: 100,
        PHOBOS_MAX: 3,
        HEAT_MAX: 3,
        HEAT_MIN: 1,
        DEFAULT: 100
      };
    
    var buttonMinus = document.querySelector('.upload-resize-controls-button-dec');
    var buttonPlus = document.querySelector('.upload-resize-controls-button-inc');
    var inputValue = document.querySelector('.upload-resize-controls-value');
    var imagePreview = document.querySelector('.effect-image-preview');
    var levelPin = document.querySelector('.upload-effect-level-pin');
    var levelLine = document.querySelector('.upload-effect-level-line');
    var sliderOverlay = document.querySelector('.upload-effect-level');
    var levelValue = document.querySelector('.upload-effect-level-val');
    var effectInputs = document.querySelectorAll('input[name="effect"]');
    var effect = 'none';
    var level;
    var levelLineWidth = parseInt(getComputedStyle(sliderOverlay).width) - parseInt(getComputedStyle(levelLine).left) - parseInt(getComputedStyle(levelLine).right);
    
    // Масштаб
    
    var valueDec = function () {
        var value = parseInt(inputValue.value);
    
        if (value <= scaleParameter.MAX && value > scaleParameter.MIN) {
            inputValue.value = value - scaleParameter.STEP + '%';
            imagePreview.style.transform = 'scale(' + (parseInt(inputValue.value) / 100) + ')';
        }
    };
    
    var valueInc = function () {
        var value = parseInt(inputValue.value);
    
        if (value < scaleParameter.MAX && value >= scaleParameter.MIN) {
            inputValue.value = value + scaleParameter.STEP + '%';
            imagePreview.style.transform = 'scale(' + (parseInt(inputValue.value) / 100) + ')';
        }
    };
    
    buttonMinus.addEventListener('click', valueDec);
    buttonPlus.addEventListener('click', valueInc);
    
    // Наложение эффекта на изображение
    
    var reset = function () {
        levelPin.style.left = limitEffectValue.DEFAULT + '%';
        levelValue.style.width = limitEffectValue.DEFAULT + '%';
    };
    
    var changeStyle = function (effect) {
        if (effect === 'none') {
            imagePreview.style = '';
        } else if (effect === 'chrome') {
            imagePreview.style.filter = 'grayscale(' + level + ')';
        } else if (effect === 'sepia') {
            imagePreview.style.filter = 'sepia(' + level + ')';
        } else if (effect === 'marvin') {
            imagePreview.style.filter = 'invert(' + (level * limitEffectValue.MARVIN_MAX) + '%)';
        } else if (effect === 'phobos') {
            imagePreview.style.filter = 'blur(' + (level * limitEffectValue.PHOBOS_MAX).toFixed(1) + 'px)';
        } else if (effect === 'heat') {
            imagePreview.style.filter = 'brightness(' + (level * (limitEffectValue.HEAT_MAX - limitEffectValue.HEAT_MIN) + limitEffectValue.HEAT_MIN).toFixed(2) + ')';
        }
    };
    
    var onPinMouseDown = function (evt) {
        evt.preventDefault();
        var startCoordX = evt.clientX;
        var newLevelPinLeft;
        var onPinMouseMove = function (moveEvt) {
            moveEvt.preventDefault();
    
            var shiftX = startCoordX - moveEvt.clientX;
    
            startCoordX = moveEvt.clientX;
            newLevelPinLeft = levelPin.offsetLeft - shiftX;
    
            if ((newLevelPinLeft >= 0) && (newLevelPinLeft <= levelLineWidth)) {
                levelPin.style.left = newLevelPinLeft + 'px';
                level = (Math.round((limitEffectValue.DEFAULT * (newLevelPinLeft)) / levelLineWidth) / 100).toFixed(2);
                levelValue.style.width = level * 100 + '%';
                changeStyle(effect);
            }
        };
    
        var onPinMouseUp = function (upEvt) {
            upEvt.preventDefault();
    
            document.removeEventListener('mousemove', onPinMouseMove);
            document.removeEventListener('mouseup', onPinMouseUp);
        };
    
        document.addEventListener('mousemove', onPinMouseMove);
        document.addEventListener('mouseup', onPinMouseUp);
    
    };
    
    var definitionEffect = function (evt) {
        effect = evt.target.getAttribute('value');
        reset();
        if (effect === 'none') {
            sliderOverlay.classList.add('hidden');
        } else {
            sliderOverlay.classList.remove('hidden');
        }
        switch (effect) {
            case 'none':
                imagePreview.style.filter = '';
                break;
            case 'chrome':
                imagePreview.style.filter = 'grayscale(1)';
                break;
            case 'sepia':
                imagePreview.style.filter = 'sepia(1)';
                break;
            case 'marvin':
                imagePreview.style.filter = 'invert(100%)';
                break;
            case 'phobos':
                imagePreview.style.filter = 'blur(3px)';
                break;
            case 'heat':
                imagePreview.style.filter = 'brightness(3)';
                break;
        }
    };

    window.resetSettings = function () {
        reset();
        imagePreview.style.transform = 'scale(1)';
        effectInputs[0].checked = true;
        imagePreview.style = '';
        sliderOverlay.classList.add('hidden');
    };
    
    reset();
    sliderOverlay.classList.add('hidden');
    levelPin.addEventListener('mousedown', onPinMouseDown);
    
    for (var i = 0; i < effectInputs.length; i++) {
        effectInputs[i].addEventListener('change', definitionEffect);
    }
})();