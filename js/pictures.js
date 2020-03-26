var getRandomNumber = function (min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
};

//  Функция генерации случайных данных

var getRandomData = function () {
    var pictures = [];
    var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
        'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
        'Моя бабушка случайно чихнула с фотоаппаратом в рукахи у неё получилась фотография лучше.',
        'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
        'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
    ];
    var descriptions = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят',
        'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
        'Вот это тачка!'
    ];

    var getRandomValue = function (arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    };

    for (var i = 0; i < 25; i++) {
        pictures.push({
            url: 'photos/' + getRandomNumber(1, 25) + '.jpg',
            likes: getRandomNumber(15, 200),
            comments: getRandomValue(comments),
            description: getRandomValue(descriptions)
        });

    }
    return pictures;
};

var pictures = getRandomData();

//  функция создания DOM-элемента на основе JS-объекта

var createPicture = function (picture) {
    var similarPictureTemplate = document.querySelector('#picture-template')
        .content
        .querySelector('.picture');
    var pictureElement = similarPictureTemplate.cloneNode(true);

    pictureElement.querySelector('img').setAttribute('src', picture.url);
    pictureElement.querySelector('.picture-likes').textContent = picture.likes;
    pictureElement.querySelector('.picture-comments').textContent = picture.comments;

    return pictureElement;
};

// функция заполнения блока DOM-элементами на основе массива JS-объектов

var renderPictures = function (pictures) {
    var similarListElement = document.querySelector('.pictures');

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pictures.length; i++) {
        fragment.appendChild(createPicture(pictures[i]));
    }
    similarListElement.appendChild(fragment);
};

renderPictures(pictures);

// функция, которая показывает первый элемент из сгенерированного вами массива

// var renderFirstPicture = function (pictures) {
//     var galleryOverlay = document.querySelector('.gallery-overlay');

//     galleryOverlay.classList.remove('hidden');
//     galleryOverlay.querySelector('img').setAttribute('src', pictures[0].url);
//     galleryOverlay.querySelector('.likes-count').textContent = pictures[0].likes;
//     galleryOverlay.querySelector('.comments-count').textContent = pictures[0].comments;

//     var socialComments = document.createElement('div');
//     socialComments.classList.add('social__comments');
//     galleryOverlay.appendChild(socialComments);

//     var socialComment = document.createElement('li');
//     socialComment.classList.add('social__comment');
//     socialComment.classList.add('social__comment--text');
//     socialComments.appendChild(socialComment);

//     var socialPicture = document.createElement('img');
//     socialPicture.classList.add('social__picture');
//     socialPicture.setAttribute('src', 'img/avatar-' + getRandomNumber(1, 6) + '.svg');
//     socialPicture.setAttribute('alt', 'Аватар комментатора фотографии');
//     socialPicture.setAttribute('width', '35');
//     socialPicture.setAttribute('height', '35');
//     socialComments.appendChild(socialPicture);

//     var socialText = document.createElement('p');
//     socialText.classList.add('social__text');
//     socialText.textContent = pictures[0].comments;
//     socialComments.appendChild(socialText);
// };

// renderFirstPicture(pictures);

// Настройки изображения

var ScaleParameter = {
    MIN: 25,
    MAX: 100,
    STEP: 25
  };
var LimitEffectValue = {
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

    if (value <= ScaleParameter.MAX && value > ScaleParameter.MIN) {
        inputValue.value = value - ScaleParameter.STEP + '%';
        imagePreview.style.transform = 'scale(' + (parseInt(inputValue.value) / 100) + ')';
    }
};

var valueInc = function () {
    var value = parseInt(inputValue.value);

    if (value < ScaleParameter.MAX && value >= ScaleParameter.MIN) {
        inputValue.value = value + ScaleParameter.STEP + '%';
        imagePreview.style.transform = 'scale(' + (parseInt(inputValue.value) / 100) + ')';
    }
};

buttonMinus.addEventListener('click', valueDec);
buttonPlus.addEventListener('click', valueInc);

// Наложение эффекта на изображение

var reset = function () {
    levelPin.style.left = LimitEffectValue.DEFAULT + '%';
    levelValue.style.width = LimitEffectValue.DEFAULT + '%';
};

var changeStyle = function (effect) {
    if (effect === 'none') {
        imagePreview.style.filter = '';
    } else if (effect === 'chrome') {
        imagePreview.style.filter = 'grayscale(' + level + ')';
    } else if (effect === 'sepia') {
        imagePreview.style.filter = 'sepia(' + level + ')';
    } else if (effect === 'marvin') {
        imagePreview.style.filter = 'invert(' + (level * LimitEffectValue.MARVIN_MAX) + '%)';
    } else if (effect === 'phobos') {
        imagePreview.style.filter = 'blur(' + (level * LimitEffectValue.PHOBOS_MAX).toFixed(1) + 'px)';
    } else if (effect === 'heat') {
        imagePreview.style.filter = 'brightness(' + (level * (LimitEffectValue.HEAT_MAX - LimitEffectValue.HEAT_MIN) + LimitEffectValue.HEAT_MIN).toFixed(2) + ')';
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
            level = (Math.round((LimitEffectValue.DEFAULT * (newLevelPinLeft)) / levelLineWidth) / 100).toFixed(2);
            levelValue.style.width = level * 100 + '%';
            changeStyle(effect);
            console.log(level);
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
    console.log(effect);
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

reset();
sliderOverlay.classList.add('hidden');
levelPin.addEventListener('mousedown', onPinMouseDown);

for (var i = 0; i < effectInputs.length; i++) {
    effectInputs[i].addEventListener('change', definitionEffect);
}

// Загрузка изображения и показ формы редактирования

var uploadFile = document.querySelector('#upload-file');
var uploadOverlay = document.querySelector('.upload-overlay');
var uploadFormCancel = document.querySelector('.upload-form-cancel');

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var openPopup = function () {
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
};

var closeUploadOverlay = function () {
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
        closeUploadOverlay();
    }
};

uploadFile.addEventListener('change', openPopup);

uploadFormCancel.addEventListener('click', closeUploadOverlay);

uploadFormCancel.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
        closeUploadOverlay();
    }
});

// Функционал формы редактирования



// Показ изображения в полноэкранном режиме

var smallPictures = document.querySelectorAll('.picture');
var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryOverlayClose = document.querySelector('.gallery-overlay-close');

var closeGallery = function () {
    galleryOverlay.classList.add('hidden');
};

var escPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
        closeGallery();
    }
};

var showPicture = function (evt) {
    evt.preventDefault();

    var target = evt.target;

    galleryOverlay.classList.remove('hidden');
    galleryOverlay.querySelector('img').setAttribute('src', target.getAttribute('src'));

    galleryOverlayClose.addEventListener('click', closeGallery);
    document.addEventListener('keydown', escPress);
};

for (var i = 0; i < smallPictures.length; i++) {
    smallPictures[i].addEventListener('click', showPicture);
}

// Валидация

var uploadFormHashtags = document.querySelector('.upload-form-hashtags');
var uploadFormSubmit = document.querySelector('.upload-form-submit');
var uploadFormDescription = document.querySelector('.upload-form-description');

uploadFormHashtags.addEventListener('focusin', function () {
    document.removeEventListener('keydown', onPopupEscPress);
});

uploadFormHashtags.addEventListener('focusout', function () {
    document.addEventListener('keydown', onPopupEscPress);
});

uploadFormDescription.addEventListener('focusin', function () {
    document.removeEventListener('keydown', onPopupEscPress);
});

uploadFormDescription.addEventListener('focusout', function () {
    document.addEventListener('keydown', onPopupEscPress);
});

var error = {
    isLong: function (hashtag, length) {
        if (length > 20) {
            return 'Хэштег ' + hashtag + ' имеет больше 20-ти символов';
        } else if (length > 140) {
            return 'Описание имеет больше 140-ка символов';
        }
    },
    isNoHaveSharp: function (hashtag) {
        return 'Хэштег ' + hashtag + ' не начинаеться с символа #';
    },
    isOnlySharp: function () {
        return 'Хэштег не может состоять из одной решетки';
    },
    isSame: function (hashtag1, hashtag2) {
        return 'Хэштэг ' + hashtag1 + ' и хэштег ' + hashtag2 + ' считаются одним и тем же тегом';
    },
    errorInclusion: function (element) {
        element.validity.customError = true;
    },
    errorShutdown: function (element) {
        element.setCustomValidity('');
    }
};

uploadFormSubmit.addEventListener('click', function () {

    var arr = uploadFormHashtags.value.split(' ');
    var description = uploadFormDescription.value;

    for (var i = 0; i < arr.length; i++) {
        if ((arr[0] === '') && (arr.length == 1)) {
            error.errorShutdown(uploadFormHashtags);
        } else if (arr[i] === '') {
            arr.splice(i, 1);
        } else if (arr[i][0] !== '#') {
            error.errorInclusion(uploadFormHashtags);
            error.isNoHaveSharp(arr[i]);
        } else if (arr[i].length > 20) {
            error.errorInclusion(uploadFormHashtags);
            error.isLong(arr[i], 20);
        } else if (arr[i] === '#') {
            error.errorInclusion(uploadFormHashtags);
            error.isOnlySharp();
        }
    }

    for (var j = 0; j < arr.length; j++) {
        if (arr[j].length > 0) {
            for (var k = j + 1; k < arr.length; k++) {
                if (arr[j].toLowerCase() === arr[k].toLowerCase()) {
                    error.errorInclusion(uploadFormHashtags);
                    error.isSame(arr[j], arr[k]);
                }
            }
        }
    }

    if (description.length > 140) {
        error.errorInclusion(uploadFormDescription);
        error.isLong(arr[i], 140);
    } else {
        error.errorShutdown(uploadFormDescription);
    }

});