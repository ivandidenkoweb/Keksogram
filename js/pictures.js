// модуль для отрисовки миниатюры;

(function () {
    var filters = document.querySelector('.filters');
    var popularInput = document.querySelector('#filter-popular');
    var discussedInput = document.querySelector('#filter-discussed');
    var newInput = document.querySelector('#filter-new');
    var pictures = null;
    var evtTarget = null;

    //  функция создания DOM-элемента на основе JS-объекта

    var createPicture = function (picture) {
        var similarPictureTemplate = document.querySelector('#picture-template')
            .content
            .querySelector('.picture');
        var pictureElement = similarPictureTemplate.cloneNode(true);

        pictureElement.querySelector('img').setAttribute('src', picture.url);
        pictureElement.querySelector('.picture-likes').textContent = picture.likes;
        pictureElement.querySelector('.picture-comments').textContent = picture.comments[window.util.getRandomNumber(0, picture.comments.length - 1)].message;

        pictureElement.addEventListener('click', function (evt) {
            window.showPicture(evt, picture);
        });

        return pictureElement;
    };

    // функция заполнения блока DOM-элементами на основе массива JS-объектов

    var renderPictures = function (pictures) {
        var similarListElement = document.querySelector('.pictures');
        similarListElement.innerHTML = '';
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < pictures.length; i++) {
            fragment.appendChild(createPicture(pictures[i]));
        }
        similarListElement.appendChild(fragment);
    };

    var updatePicture = function () {
        var fiteredPictures;
        if (evtTarget === discussedInput) {
            fiteredPictures = pictures.slice().sort(function (left, right) {
                return right.comments.length - left.comments.length;
            });
        } else if (evtTarget === newInput) {
            fiteredPictures = pictures.slice().filter(function (it, i, arr) {
                return arr.indexOf(it) === i;
            });
            fiteredPictures = window.util.shuffle(fiteredPictures).slice(0, 10);
        } else {
            fiteredPictures = pictures;
        }
        renderPictures(fiteredPictures);
    };

    var onLoad = function (data) {
        pictures = data;
        console.log(pictures);
        renderPictures(pictures);
        filters.classList.remove('hidden');
    };

    discussedInput.addEventListener('click', function (evt) {
        evtTarget = evt.target;
        window.debounce(updatePicture);
    });
    newInput.addEventListener('click', function (evt) {
        evtTarget = evt.target;
        window.debounce(updatePicture);
    });
    popularInput.addEventListener('click', function (evt) {
        evtTarget = evt.target;
        window.debounce(updatePicture);
    });

    window.onError = function (errorMessage) {
        var node = document.createElement('div');

        node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
        node.style.position = 'absolute';
        node.style.left = 0;
        node.style.right = 0;
        node.style.fontSize = '30px';

        node.textContent = errorMessage;
        document.body.insertAdjacentElement('afterbegin', node);
    };

    window.backend.load(onLoad, window.onError);
})();