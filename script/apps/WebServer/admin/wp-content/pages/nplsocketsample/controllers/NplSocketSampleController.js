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
        $scope.showLogReceived = function (log) {
            document.getElementById("output_received").innerHTML = log;
        }
        
        $scope.sendMsg = function(msg){
            if ($scope.ws && $scope.is_connected) {
                var input_length = msg.length;
                msg = JSON.stringify({ msg });
                $scope.ws.send(msg);
                $scope.showLog("send msg size:" + msg.length + " input_length:" + input_length);
            }
        }
        $scope.onConnect = function () {
            var ws = new WebSocket("ws://localhost:8099/ajax/nplsocketsample?action=handshake&user_id=" + user_id);
            ws.onopen = function () {
                $scope.is_connected = true;
                $scope.showLog("opened");
            };

            ws.onmessage = function (evt) {
                var msg = evt.data;
                msg = JSON.parse(msg);
                var received_msg = msg.received_msg;
                var received_msg_len = msg.received_msg_len;
                var body_len = msg.body_len;
                console.log("received msg:", received_msg);
                $scope.showLogReceived(" body_len:" + body_len + " received_msg_len:" + received_msg_len);
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
        $scope.onSendBigData = function () {
            $scope.index = $scope.index + 1;
            $scope.sendMsg($scope.getBigData());
        }
        $scope.getBigData = function () {
            var s = "{\"data\":{\"type\":\"offer\",\"sdp\":\"8888888abcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsaabcdefgabcdefdsgfdastgerwrttesafdsafewrefdsfdaafdsfetefdfdsafdasfdsa\"}}"
            return s;
        }
    }

})

















