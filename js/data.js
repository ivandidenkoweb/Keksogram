// Mодуль, который создаёт данные

(function () {
    //  Функция генерации случайных данных

    var getRandomData = function () {
        var pictures = [];
        var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
            'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
            'Моя бабушка случайно чихнула с фотоаппаратом в рукахи у неё получилась фотография лучше.',
            'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
            'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
        ];
        var descriptions = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят',
            'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
            'Вот это тачка!'
        ];

        var getRandomValue = function (arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        };

        for (var i = 0; i < 25; i++) {
            pictures.push({
                url: 'photos/' + window.util.getRandomNumber(1, 25) + '.jpg',
                likes: window.util.getRandomNumber(15, 200),
                comments: getRandomValue(comments),
                description: getRandomValue(descriptions)
            });

        }
        return pictures;
    };

    window.pictures = getRandomData();

})();