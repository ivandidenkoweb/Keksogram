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