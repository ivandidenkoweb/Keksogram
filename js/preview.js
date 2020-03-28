// Модуль для отрисовки увеличенного изображения

(function () {
    var galleryOverlay = document.querySelector('.gallery-overlay');
    var galleryOverlayClose = document.querySelector('.gallery-overlay-close');
    var galleryOverlayPreview = document.querySelector('.gallery-overlay-preview');
    var MAX_COMMENTS = 5;

    var closeGallery = function () {
        var checkSocial = document.querySelector('.gallery-overlay-social');
        galleryOverlay.classList.add('hidden');
        if (checkSocial) {
            checkSocial.remove();
        }
    };

    var escPress = function (evt) {
        window.util.isEscEvent(evt, closeGallery);
    };

    var enterPress = function (evt) {
        window.util.isEnterEvent(evt, closeGallery);
    };

    var addComments = function (arr, element, parentElem) {
        element.remove();
        for (var i = 0; i < arr.length; i++) {
            var copyElement = element.cloneNode(true);
            copyElement.querySelector('img').setAttribute('src', arr[i].avatar);
            copyElement.querySelector('.social-name').textContent = arr[i].name;
            copyElement.querySelector('.social-text').textContent = arr[i].message;
            if (i >= 5) {
                copyElement.style.display = 'none';
            }
            parentElem.appendChild(copyElement);
        }
    };

    var createPreview = function (picture) {
        var similarSocialTemplate = document.querySelector('#gallery-social-template')
            .content
            .querySelector('.gallery-overlay-social');
        var socialElement = similarSocialTemplate.cloneNode(true);
        var arrComments = picture.comments;
        var ulComments = socialElement.querySelector('ul');
        var liComment = socialElement.querySelector('li');
        var getAvatarSrc = function () {
            return 'img/avatar-' + window.util.getRandomNumber(1, 6) + '.svg';
        };

        galleryOverlay.querySelector('img').setAttribute('src', picture.url);
        galleryOverlay.querySelector('img').setAttribute('alt', picture.description);
        galleryOverlay.querySelector('.likes-count').textContent = picture.likes;
        galleryOverlay.querySelector('.comments-count').textContent = picture.comments.length + '';

        socialElement.querySelector('.social-header .social-picture').setAttribute('src', getAvatarSrc());
        socialElement.querySelector('.social-caption').textContent = picture.description;
        socialElement.querySelector('.social-footer .social-picture').setAttribute('src', getAvatarSrc());

        if (!arrComments.length) {
            ulComments.style.display = 'none';
        } else if (arrComments.length <= MAX_COMMENTS) {
            socialElement.querySelector('.social-comment-count').textContent = arrComments.length + ' из ' + arrComments.length;
            addComments(arrComments, liComment, ulComments);
        } else {
            socialElement.querySelector('.social-comment-count').textContent = MAX_COMMENTS + ' из ' + arrComments.length + 'комментариев';
            addComments(arrComments, liComment, ulComments);
        }
        galleryOverlayPreview.appendChild(socialElement);
    };

    window.showPicture = function (evt, picture) {
        evt.preventDefault();
        console.log(picture);
        createPreview(picture);
        galleryOverlay.classList.remove('hidden');
        galleryOverlayClose.addEventListener('click', closeGallery);
        galleryOverlayClose.addEventListener('keydown', enterPress);
        document.addEventListener('keydown', escPress);
    };
})();