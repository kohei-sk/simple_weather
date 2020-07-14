// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .
//= require jquery
//= require jquery_ujs

$(document).ready(function () {

    //座標取得
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(

            //座標取得成功
            function (position) {
                var data = position.coords;

                var lat = data.latitude;
                var lon = data.longitude;

                //地名取得
                var local_adress = `https://mreversegeocoder.gsi.go.jp/reverse-geocoder/LonLatToAddress?lat=${lat}&lon=${lon}`;
                $.ajax({
                        url: local_adress,
                        type: 'GET',
                        dataType: "json"
                    })
                    .done((data) => {
                        $('#local_adress span').prepend(data.results.lv01Nm);
                    })
                    .fail(() => {
                        alert('エラーが発生しました。再読込してください。')
                    })
                //END:地名取得

                //天気取得
                var api_key = 'f254e660e7d8b2aca7849073e9bc150e';
                var weather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&lang=ja&appid=${api_key}`;

                $.ajax({
                        url: weather,
                        type: 'GET',
                        dataType: "json"
                    })
                    .done((data) => {

                        var current_ico = data.current.weather[0].icon;
                        var current_ico = `<img src="http://openweathermap.org/img/wn/${current_ico}@2x.png">`
                        var current_desc = data.current.weather[0].description;
                        var current_temp = Math.round(data.current.temp);

                        $('#current_weather p.ico').prepend(current_ico);
                        $('#current_weather p.desc').prepend(current_desc);
                        $('#current_weather p.temp span').prepend(current_temp);

                        var today_ico = data.daily[0].weather[0].icon;
                        var today_ico = `<img src="http://openweathermap.org/img/wn/${today_ico}@2x.png">`
                        var today_desc = data.daily[0].weather[0].description;
                        var today_max_temp = Math.round(data.daily[0].temp.max);
                        var today_min_temp = Math.round(data.daily[0].temp.min);

                        $('#today_weather p.ico').prepend(today_ico);
                        $('#today_weather p.desc').prepend(today_desc);
                        $('#today_weather p.max_temp span').prepend(today_max_temp);
                        $('#today_weather p.min_temp span').prepend(today_min_temp);

                        var tomorrow_ico = data.daily[1].weather[0].icon;
                        var tomorrow_ico = `<img src="http://openweathermap.org/img/wn/${tomorrow_ico}@2x.png">`
                        var tomorrow_desc = data.daily[1].weather[0].description;
                        var tomorrow_max_temp = Math.round(data.daily[1].temp.max);
                        var tomorrow_min_temp = Math.round(data.daily[1].temp.min);

                        $('#tomorrow_weather p.ico').prepend(tomorrow_ico);
                        $('#tomorrow_weather p.desc').prepend(tomorrow_desc);
                        $('#tomorrow_weather p.max_temp span').prepend(tomorrow_max_temp);
                        $('#tomorrow_weather p.min_temp span').prepend(tomorrow_min_temp);

                    })
                    .fail(() => {
                        alert('エラーが発生しました。再読込してください。')
                    })
                //END:天気取得

            },
            //座標取得失敗
            function (error) {
                var errorInfo = [
                    "原因不明のエラーが発生しました…。",
                    "位置情報の取得が許可されませんでした…。",
                    "電波状況などで位置情報が取得できませんでした…。",
                    "位置情報の取得に時間がかかり過ぎてタイムアウトしました…。"
                ];

                var errorNo = error.code;
                var errorMessage = "[エラー番号: " + errorNo + "]\n" + errorInfo[errorNo];

                alert(errorMessage);
            }, {
                "enableHighAccuracy": false,
                "timeout": 8000,
                "maximumAge": 2000,
            }

        );
    } else {
        var errorMessage = "お使いの端末は、位置情報に対応していません。";
        alert(errorMessage);
    }

    $(document).ajaxStop(function () {
        $('#loader').fadeOut();
        $('header, section').fadeIn();
    });

});