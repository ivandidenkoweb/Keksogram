// модуль для отрисовки миниатюры;

(function () {
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

        var fragment = document.createDocumentFragment();
        for (var i = 0; i < pictures.length; i++) {
            fragment.appendChild(createPicture(pictures[i]));
        }
        similarListElement.appendChild(fragment);
    };

    var onLoad = function (pictures) {
        renderPictures(pictures);
    };

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