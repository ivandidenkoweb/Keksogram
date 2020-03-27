// Валидация

(function () {
    var uploadFormHashtags = document.querySelector('.upload-form-hashtags');
    var uploadFormDescription = document.querySelector('.upload-form-description');
    var HASHTAG_MAX_COUNT = 5;
    var HASHTAG_MAX_LENGTH = 20;
    var DESCRIPTION_MAX_LENGTH = 140;

    var validateHashtags = function (arr) {
        if (!uploadFormHashtags.value) {
            return '';
        }

        if (arr.length > HASHTAG_MAX_COUNT) {
            return 'Хэш-тегов должно быть не больше пяти.';
        }

        for (var i = 0; i < arr.length; ++i) {
            if (arr[i] === '#') {
                return 'Хэш-тег не может сщстоять из одной только решетки. Удалите лишний символ или дополните его.';
            } else if (arr[i].charAt(0) !== '#') {
                return 'Хэш-тег ' + arr[i] + ' должен начинаться с символа "#".';
            } else if (arr[i].slice(1).indexOf('#') !== -1) {
                return 'Хэш-теги ' + arr[i] + ' должны быть разделены пробелом.';
            } else if (arr[i].length > HASHTAG_MAX_LENGTH) {
                return 'Максимальная длина одного хэш-тега составляет 20 символов, включая символ "#". Сократите хэш-тег ' + arr[i] + '.';
            }
        }

        var arrayToLowerCase = function (arr) {
            var newArray = [];
            arr.forEach(function (element) {
                newArray.push(element.toLowerCase());
            });
            return newArray;
        };

        var removeDublicatesFromArray = function (arr) {
            return arr.filter(function (element, index, self) {
                return self.indexOf(element) === index;
            });
        };

        var arrLowerCase = arrayToLowerCase(arr);
        var uniqueArray = removeDublicatesFromArray(arrLowerCase);

        if (arr.length !== uniqueArray.length) {
            return 'Один и тот же хэш-тег не может быть использован дважды (теги не чувствительны к регистру).'; 
        }

        return '';
    };

    uploadFormHashtags.addEventListener('input', function () {
        var hashtags = uploadFormHashtags.value.replace(/\s+/g, ' ').trim();
        var hashtagsArr = hashtags.split(' ');

        uploadFormHashtags.setCustomValidity('');

        var errorMessage = validateHashtags(hashtagsArr);

        if (errorMessage !== '') {
            uploadFormHashtags.setCustomValidity(errorMessage);
        }
    });
    
    uploadFormDescription.addEventListener('input', function () {
        var descriptionArr = uploadFormDescription.value;

        uploadFormDescription.setCustomValidity('');

        if (descriptionArr.length > DESCRIPTION_MAX_LENGTH) {
            uploadFormDescription.setCustomValidity('Максимальная длина описания составляет 140 символов, включая символ пробелы. Сократите описание.');
        }
    });
})();