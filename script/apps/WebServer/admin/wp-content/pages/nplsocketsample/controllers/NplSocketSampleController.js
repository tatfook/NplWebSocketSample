var m = angular.module('NplWebSocketSample_App', ['ui.bootstrap']);
m.component("customcomponent", {
    templateUrl: "/wp-content/pages/nplsocketsample/templates/NplSocketSampleTemplate.html",
    controller: function ($scope, $http, $log) {
        $scope.is_connected = false;
        $scope.index = 0;
        var server_handle_id = 20;

        $scope.sendMsg = function(msg){
            if ($scope.ws && $scope.is_connected) {
                var data = {
                    s_id: server_handle_id,
                    msg: [msg]
                }
                var s = JSON.stringify(data);
                console.log("======sendMsg",s);
                $scope.ws.send(s);
            }
        }
        $scope.onConnect = function () {
            var ws = new WebSocket("ws://localhost:8099/ajax/nplsocketsample?action=handshake");
            ws.onopen = function () {
                console.log("==========onopen");
                $scope.is_connected = true;
            };

            ws.onmessage = function (evt) {
                var received_msg = evt.data;
                console.log("Message is received...");
            };

            ws.onclose = function () {
                // websocket is closed.
                console.log("Connection is closed...");
                $scope.is_connected = false;
            };
            ws.onerror = function (e) {
                console.log("onerror:",e);
            };
            $scope.ws = ws;
        }

        $scope.onSend = function () {
            $scope.index = $scope.index + 1;
            $scope.sendMsg("Hello World " + $scope.index)
        }
    }

})

















