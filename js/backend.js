// Модуль для взаимодействия с сервером

(function () {
    var URL_POST = 'https://js.dump.academy/kekstagram';
    var URL_GET = 'https://js.dump.academy/kekstagram/data';

    window.backend = {
        load: function (onLoad, onError) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'json';

            xhr.addEventListener('load', function () {
                if (xhr.status === 200) {
                    onLoad(xhr.response);
                } else {
                    onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
                }
            });

            xhr.addEventListener('error', function () {
                onError('Произошла ошибка соединения');
            });

            xhr.addEventListener('timeout', function () {
                onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
            });

            xhr.timeout = 10000;

            xhr.open('GET', URL_GET);
            xhr.send();
        },
        save: function (data, onLoad, onError) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'json';

            xhr.addEventListener('load', function () {
                if (xhr.status === 200) {
                    onLoad(xhr.response);
                } else {
                    onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
                }
            });

            xhr.open('POST', URL_POST);
            xhr.send(data);
        }
    };
})();