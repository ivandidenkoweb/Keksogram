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

    renderPictures(window.pictures);
})();