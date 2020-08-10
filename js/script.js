    
        event_logo = "";
        $("#selecter").on("change", function() {
            v = this.value;
            if (v == "Радиация") {
                event_logo = "./icons/nuke.jpg";
                return event_logo
            } else if (v == "Наводнение") {
                event_logo = "./icons/water.jpg";
                return event_logo
            } else if (v == "Землетрясение") {
                event_logo = "./icons/earthq.jpg";
                return event_logo
            } else if (v == "Пожар") {
                event_logo = "./icons/fire.jpg";
                return event_logo
            }
        });
      
        // Функция ymaps.ready() будет вызвана, когда
        // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
        ymaps.ready(init);
        function init(){
        // Создание карты.
        var myMap = new ymaps.Map("map", {
        center: [66.25, 99.15],
        zoom: 3
                });
            
        //получаем координаты указателя при клике на карту
        ymaps.regions.load('RU').then(function (result) {
                
                    var regions = result.geoObjects; // ссылка на коллекцию GeoObjectCollection
                    regions.options.set('fillColor', '#6B7FDA')
                    regions.each(function (reg) {
                        reg.events.add('mouseenter',function(event){
                            reg.options.set('fillColor', '#ff001a')
                        });
                        
                        reg.events.add('mouseleave',function(event){
                            reg.options.set('fillColor', '#6B7FDA')
                        });
                        reg.events.add('contextmenu',function(event){
                            var coords = event.get('coords');
                            myMap.balloon.open(coords, "Содержимое балуна", {
                            // Опция: не показываем кнопку закрытия.
                            closeButton: false
                            
                            });
                            $('.side-menu').css('visibility', 'visible');
                            reg.options.set('fillColor', '#ff001a')
                        });
                        reg.events.add('click',function(e) {
                            var coords = e.get('coords');
                            console.log(coords);
                            var myPlacemark = new ymaps.Placemark([coords[0], coords[1]],{
                                hintContent: 'Происшествие'
                            }, {
                                iconLayout: 'default#image',
                                iconImageHref: event_logo,
                                iconImageSize: [32,32],
                                iconImageOffset: [-16, -16]
                            });
                            if (event_logo !== "") {
                                myMap.geoObjects.add(myPlacemark);
                            } else {
                                alert("Выберите событие для добавления на карту");
                            }
                        })
                    });
                
                    myMap.geoObjects.add(regions);
                    
                
                    });
            
       /* myMap.events.add('click', function(e) {
            var coords = e.get('coords');
            console.log(coords);
            var myPlacemark = new ymaps.Placemark([coords[0], coords[1]],{
                hintContent: 'Происшествие'
            }, {
                iconLayout: 'default#image',
                iconImageHref: event_logo,
                iconImageSize: [32,32],
                iconImageOffset: [-16, -16]
            });
            if (event_logo !== "") {
                myMap.geoObjects.add(myPlacemark);
            } else {
                alert("Выберите событие для добавления на карту");
            }
        });*/     
        
        $("#action").on("change", function() {
            v = this.value;
            if (v == "Отобразить границу России") {
             console.log("works");
            } else if (v == "Отобразить арктическую зону") {
                ymaps.borders.load('RU').then(function (geojson) {
                    var regions = ymaps.geoQuery(geojson);
                    regions.search('properties.iso3166 = "RU-ARK"').setOptions('fillColor', '#ff001a');
                    regions.search('properties.iso3166 = "RU-MUR"').setOptions('fillColor', '#ff001a');
                    regions.search('properties.iso3166 = "RU-NEN"').setOptions('fillColor', '#ff001a');
                    regions.search('properties.iso3166 = "RU-YAN"').setOptions('fillColor', '#ff001a');
                    regions.search('properties.iso3166 = "RU-KO"').setOptions('fillColor', '#ff001a');
                    regions.search('properties.iso3166 = "RU-CHU"').setOptions('fillColor', '#ff001a');
                    regions.addToMap(myMap);
                    
                    var myPolygon = new ymaps.Polygon([
                    // Указываем координаты вершин многоугольника.
                    // Координаты вершин внешнего контура.
                    // Рисуем (неточно) границы арктической зоны в краснояроском крае
                    [
                            [62.216395, 84.446709],
                            [67.049922, 106.554965],
                            [65.808387, 159.135681],
                            [68.276854, 162.453552],
                            [69.809962, 164.035584],
                            [70.089220, 163.309148],
                            [69.893282, 160.058533],
                            [70.393690, 160.695740],
                            [70.996995, 159.333435],
                            [71.231856, 156.235291],
                            [70.989834, 152.741638],
                            [72.143569, 150.236755],
                            [72.444466, 147.182556],
                            [72.954410, 140.920349],
                            [72.284604, 138.810974],
                            [71.741483, 137.646423],
                            [72.082792, 132.878357],
                            [73.537401, 128.571716],
                            [73.970971, 124.814392],
                            [74.031562, 123.144470],
                            [73.188069, 122.792908],
                            [73.188069, 122.792908],
                            [73.565529, 119.123677],
                            [73.843112, 113.652486],
                            [74.289679, 113.454732],
                            [74.484919, 113.905171],
                            [75.253645, 113.751363],
                            [75.923248, 114.160132],
                            [76.504584, 113.566870],
                            [76.783834, 112.292456],
                            [76.883965, 108.644995],
                            [77.497849, 108.139624],
                            [77.817308, 105.634741],
                            [77.742872, 103.129858],
                            [77.037695, 100.646948],
                            [77.257704, 96.691870],
                            [77.037695, 94.384741],
                            [76.571107, 93.527807],
                            [75.631623, 85.288061],
                            [73.190820, 72.148413],
                            [69.763862, 69.775366],
                            [65.635930, 71.533178]
                            //[],
                            //[],
                            //[],
                           // [],
                        
                        ]], {
                    
                    }, {
                    // Задаем опции геообъекта.
                    // Цвет заливки.
                    fillColor: '#ff001a',
                    // Ширина обводки.
                    strokeWidth: 1
                    });
                    
                    // Добавляем многоугольник на карту.
                    myMap.geoObjects.add(myPolygon);
                });
            }
        });
            
        }
        
        