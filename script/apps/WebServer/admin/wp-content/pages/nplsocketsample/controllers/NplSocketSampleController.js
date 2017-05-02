var m = angular.module('NplWebSocketSample_App', ['ui.bootstrap']);
m.component("customcomponent", {
    templateUrl: "/wp-content/pages/nplsocketsample/templates/NplSocketSampleTemplate.html",
    controller: function ($scope, $http, $log) {
        $scope.is_connected = false;
        $scope.index = 0;
        $scope.onConnect = function () {

            // Let us open a web socket
            var ws = new WebSocket("ws://localhost:8099/ajax/nplsocketsample?action=handshake");

            ws.onopen = function () {
                ws.send("Hello World");
                $scope.is_connected = true;
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
            $scope.ws = ws;
        }

        $scope.onSend = function () {
            if ($scope.ws && $scope.is_connected) {
                $scope.index++;
                $scope.ws.send("Hello World " + $scope.index);
            }
        }
    }

})

















