// Загрузка изображения и показ формы редактирования

(function () {
    var uploadFile = document.querySelector('#upload-file');
    var uploadOverlay = document.querySelector('.upload-overlay');
    var uploadFormCancel = document.querySelector('.upload-form-cancel');
    var uploadForm = document.querySelector('.upload-form');
    var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
    var preview = document.querySelector('.effect-image-preview');

    var openPopup = function () {
        uploadOverlay.classList.remove('hidden');
        document.addEventListener('keydown', onPopupEscPress);
    };

    var closeUploadOverlay = function () {
        uploadOverlay.classList.add('hidden');
        document.removeEventListener('keydown', onPopupEscPress);
        uploadForm.reset();
        window.resetSettings();
        window.cleanInputs(); 
    };

    window.onPopupEscPress = function (evt) {
        window.util.isEscEvent(evt, closeUploadOverlay);
    };

    uploadFormCancel.addEventListener('click', closeUploadOverlay);

    uploadFormCancel.addEventListener('keydown', function (evt) {
        window.util.isEnterEvent(evt, closeUploadOverlay);
    });

    uploadFile.addEventListener('change', function () {
        openPopup();

        var file = uploadFile.files[0];

        var fileName = file.name.toLowerCase();

        var matches = FILE_TYPES.some(function (it) {
            return fileName.endsWith(it);
        });

        if (matches) {
            var reader = new FileReader();

            reader.addEventListener('load', function () {
                preview.src = reader.result;
            });
            reader.readAsDataURL(file);
        }
    });

    var onLoad = function () {
        uploadOverlay.classList.add('hidden');
        window.resetSettings();
        window.cleanInputs();
    };

    uploadForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
        window.backend.save(new FormData(uploadForm), onLoad, window.onError);
    });
})();