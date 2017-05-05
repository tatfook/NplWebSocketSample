# NplWebSocketSample
A sample showing how to communicate npl server with the protocol of websocket.
### Clent request 
```js
// user 1
http://localhost:8099/nplsocketsample?user_id=user1

// user 2
http://localhost:8099/nplsocketsample?user_id=user2
```
### Server broadcast
```lua
NPL.load("(gl)Mod/NplWebSocketSample/main.lua");
local NplWebSocketSample = commonlib.gettable("Mod.NplWebSocketSample");
NplWebSocketSample.SendMsgToAll("Hello everyone!");
```
### Screenshot
![image](https://cloud.githubusercontent.com/assets/5885941/25740166/e926952e-31b7-11e7-9512-7b2eb22b8b27.png)
