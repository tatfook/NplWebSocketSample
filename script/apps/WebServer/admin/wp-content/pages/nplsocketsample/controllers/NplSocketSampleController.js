var m = angular.module('NplWebSocketSample_App', ['ui.bootstrap']);
m.component("customcomponent", {
    templateUrl: "/wp-content/pages/nplsocketsample/templates/NplSocketSampleTemplate.html",
    controller: function ($scope, $location) {
        $scope.is_connected = false;
        $scope.index = 0;
        var server_handle_id = 20;
        var user_id = getParameterByName("user_id");
        $scope.showLog = function (log) {
            document.getElementById("output").innerHTML = log;
        }
        $scope.sendMsg = function(msg){
            if ($scope.ws && $scope.is_connected) {
                var data = {
                    s_id: server_handle_id,
                    msg: [msg]
                }
                var s = JSON.stringify(data);
                $scope.ws.send(s);
                $scope.showLog("send msg:" + s);
            }
        }
        $scope.onConnect = function () {
            var ws = new WebSocket("ws://localhost:8099/ajax/nplsocketsample?action=handshake&user_id=" + user_id);
            ws.onopen = function () {
                $scope.is_connected = true;
                $scope.showLog("opened");
            };

            ws.onmessage = function (evt) {
                var received_msg = evt.data;
                console.log("Message is received:", received_msg);
            };

            ws.onclose = function () {
                $scope.showLog("closed");
                $scope.is_connected = false;
            };
            ws.onerror = function (e) {
                console.log("onerror:",e);
                $scope.showLog(e);
            };
            $scope.ws = ws;
        }

        $scope.onSend = function () {
            $scope.index = $scope.index + 1;
            $scope.sendMsg("Hello World " + $scope.index)
        }
        $scope.onDisconnect = function () {
            if ($scope.ws && $scope.is_connected) {
                $scope.ws.close();
            }
        }
    }

})

















