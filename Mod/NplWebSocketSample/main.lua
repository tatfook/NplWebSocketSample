--[[
Title: 
Author(s): leio
Date: 2017/4/25
Desc: 
use the lib:
------------------------------------------------------------
NPL.load("(gl)Mod/NplWebSocketSample/main.lua");
local NplWebSocketSample = commonlib.gettable("Mod.NplWebSocketSample");
NplWebSocketSample.SendMsgToAll({
	received_msg = "Hello everyone!",
});
------------------------------------------------------------
]]

local CmdParser = commonlib.gettable("MyCompany.Aries.Game.CmdParser");	

local NplWebSocketSample = commonlib.inherit(commonlib.gettable("Mod.ModBase"),commonlib.gettable("Mod.NplWebSocketSample"));
NplWebSocketSample.users = {};
function NplWebSocketSample:ctor()
end

-- virtual function get mod name
function NplWebSocketSample:GetName()
	return "NplWebSocketSample"
end

-- virtual function get mod description 
function NplWebSocketSample:GetDesc()
	return "NplWebSocketSample is a plugin in paracraft"
end

function NplWebSocketSample:init()
	LOG.std(nil, "info", "NplWebSocketSample", "plugin initialized");
    NplWebSocketSample.AddPublicFile();
end

function NplWebSocketSample:OnLogin()
end
-- called when a new world is loaded. 

function NplWebSocketSample:OnWorldLoad()
end
-- called when a world is unloaded. 

function NplWebSocketSample:OnLeaveWorld()
end

function NplWebSocketSample:OnDestroy()
end

function NplWebSocketSample.AddPublicFile()
    if(not NplWebSocketSample.added)then
        NPL.AddPublicFile("Mod/NplWebSocketSample/main.lua", -20);
        NplWebSocketSample.added = true;
    end
end
function NplWebSocketSample.AddUser(nid)
    if(not nid)then return end
    NplWebSocketSample.users[nid] = nid;
end
function NplWebSocketSample.SendMsgToAll(msg)
    if(not msg)then return end
    local k,nid;
    for k,nid in pairs(NplWebSocketSample.users) do
        NplWebSocketSample.SendMsg(nid,msg)
    end
end
function NplWebSocketSample.SendMsg(nid,msg)
    local json_from = commonlib.Json.Encode(msg);
    NPL.activate(string.format("%s:websocket",nid),json_from);
end
local function activate()
    if(msg and msg.nid)then
        local json = msg[1];
		local len = string.len(json);
        local out={};
        if(NPL.FromJson(json, out)) then
            -- received msg from client
            local received_msg = out.msg;
            -- send msg to client
			NplWebSocketSample.SendMsg(msg.nid,{
				received_msg = received_msg,
				received_msg_len = string.len(received_msg),
				body_len = len,
			});
        end
    end
end
NPL.this(activate)
