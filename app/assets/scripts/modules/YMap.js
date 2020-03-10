class YMap {
    constructor () {
        this.init()
    }

    init () {
        ymaps.ready(function () {
            console.log('Helloooo from mapls')
            var myMap = new ymaps.Map('map', {
                    center: [55.767331568976665, 37.5242285],
                    zoom: 15,
                    controls: ['rulerControl', 'zoomControl']
                }, {
                    searchControlProvider: 'yandex#search'
                }),

                // Создаём макет содержимого.
                MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                    '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
                ),

                myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                    hintContent: 'Рольф Центр',
                    balloonContent: 'РОЛЬФ ЦЕНТР 2-й Магистральный тупик, 5А'
                }, {
                    // Опции.
                    // Необходимо указать данный тип макета.
                    iconLayout: 'default#image',
                    // Своё изображение иконки метки.
                    iconImageHref: 'img/map-icon.png',
                    // Размеры метки.
                    iconImageSize: [42, 42],
                    // Смещение левого верхнего угла иконки относительно
                    // её "ножки" (точки привязки).
                    iconImageOffset: [-5, -38]
                })

            myMap.geoObjects
                .add(myPlacemark)
                .add(myPlacemarkWithContent);
        });
    }
}

export default YMap
