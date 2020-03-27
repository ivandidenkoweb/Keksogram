// Модуль для отрисовки увеличенного изображения

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
//     socialPicture.setAttribute('src', 'img/avatar-' + window.util.getRandomNumber(1, 6) + '.svg');
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

// Показ изображения в полноэкранном режиме

(function () {
    var smallPictures = document.querySelectorAll('.picture');
    var galleryOverlay = document.querySelector('.gallery-overlay');
    var galleryOverlayClose = document.querySelector('.gallery-overlay-close');

    var closeGallery = function () {
        galleryOverlay.classList.add('hidden');
    };

    var escPress = function (evt) {
        window.util.isEscEvent(evt, closeGallery);
    };

    var enterPress = function (evt) {
        window.util.isEnterEvent(evt, closeGallery);
    };

    var showPicture = function (evt) {
        evt.preventDefault();

        var target = evt.target;

        galleryOverlay.classList.remove('hidden');
        galleryOverlay.querySelector('img').setAttribute('src', target.getAttribute('src'));

        galleryOverlayClose.addEventListener('click', closeGallery);
        galleryOverlayClose.addEventListener('keydown', enterPress);
        document.addEventListener('keydown', escPress);
    };

    for (var i = 0; i < smallPictures.length; i++) {
        smallPictures[i].addEventListener('click', showPicture);
    }
})();