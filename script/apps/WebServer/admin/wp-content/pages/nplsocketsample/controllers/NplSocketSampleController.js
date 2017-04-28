var m = angular.module('NplWebSocketSample_App', ['ui.bootstrap']);
m.component("customcomponent", {
    templateUrl: "/wp-content/pages/nplsocketsample/templates/NplSocketSampleTemplate.html",
    controller: function ($scope, $http, $log) {

        $scope.onConnect = function () {

            // Let us open a web socket
            var ws = new WebSocket("ws://localhost:8099/ajax/nplsocketsample?action=handshake");

            ws.onopen = function () {
                // Web Socket is connected, send data using send()
                ws.send("Message to send");
                console.log("Message is sent...");
            };

            ws.onmessage = function (evt) {
                var received_msg = evt.data;
                console.log("Message is received...");
            };

            ws.onclose = function () {
                // websocket is closed.
                console.log("Connection is closed...");
            };
            ws.onerror = function (e) {
                console.log("onerror:",e);
            };
        }
    }

})

















