// Загрузка изображения и показ формы редактирования

(function () {
    var uploadFile = document.querySelector('#upload-file');
    var uploadOverlay = document.querySelector('.upload-overlay');
    var uploadFormCancel = document.querySelector('.upload-form-cancel');

    var openPopup = function () {
        uploadOverlay.classList.remove('hidden');
        document.addEventListener('keydown', onPopupEscPress);
    };

    var closeUploadOverlay = function () {
        uploadOverlay.classList.add('hidden');
        document.removeEventListener('keydown', onPopupEscPress);
    };

    window.onPopupEscPress = function (evt) {
        window.util.isEscEvent(evt, closeUploadOverlay);
    };

    uploadFile.addEventListener('change', openPopup);

    uploadFormCancel.addEventListener('click', closeUploadOverlay);

    uploadFormCancel.addEventListener('keydown', function (evt) {
        window.util.isEnterEvent(evt, closeUploadOverlay);
    });
})();