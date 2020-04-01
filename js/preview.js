// Модуль для отрисовки увеличенного изображения

(function () {
    var galleryOverlay = document.querySelector('.gallery-overlay');
    var galleryOverlayClose = document.querySelector('.gallery-overlay-close');
    var galleryOverlayPreview = document.querySelector('.gallery-overlay-preview');
    var MAX_COMMENTS = 5;

    // Функции закрытия окна превью

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

    // Функция создания превью

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

        var addComments = function (arr, element, parentElem) {
            element.remove();
            for (var i = 0; i < arr.length; i++) {
                var copyElement = element.cloneNode(true);
                copyElement.querySelector('img').setAttribute('src', arr[i].avatar);
                copyElement.querySelector('.social-name').textContent = arr[i].name;
                copyElement.querySelector('.social-text').textContent = arr[i].message;
                if (i >= MAX_COMMENTS) {
                    copyElement.classList.add('hidden');
                }
                parentElem.appendChild(copyElement);
            }
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

        var loadmoreBtn = document.querySelector('.social-loadmore');

        if (arrComments.length <= MAX_COMMENTS) {
            loadmoreBtn.classList.add('hidden');
            return;
        }

        // Обработка обновления комментариев

        loadmoreBtn.addEventListener('click', function () {
            var allComments = document.querySelectorAll('.social-comment');
            var hiddenComments = (Array.from(allComments)).filter(function (it) {
                return it.classList.contains('hidden');
            });
            var сount = (hiddenComments.length < MAX_COMMENTS) ? (hiddenComments.length) : (MAX_COMMENTS % hiddenComments.length);
            var updateComment = function (сount, comments) {
                for (var i = 0; i < сount; i++) {
                    comments[i].classList.remove('hidden');
                }
                var numOpenComments = allComments.length - hiddenComments.length + сount;
                socialElement.querySelector('.social-comment-count').textContent = numOpenComments + ' из ' + allComments.length + 'комментариев';
            };
            if (hiddenComments.length <= MAX_COMMENTS) {
                loadmoreBtn.classList.add('hidden');
            }
            updateComment(сount, hiddenComments);
        });
    };

    // Функция показа окна превью

    window.showPicture = function (evt, picture) {
        evt.preventDefault();
        createPreview(picture);

        galleryOverlay.classList.remove('hidden');
        galleryOverlayClose.addEventListener('click', closeGallery);
        galleryOverlayClose.addEventListener('keydown', enterPress);
        document.addEventListener('keydown', escPress);
    };
})();