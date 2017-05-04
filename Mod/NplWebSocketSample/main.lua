--[[
Title: 
Author(s): leio
Date: 2017/4/25
Desc: 
use the lib:
------------------------------------------------------------
NPL.load("(gl)Mod/NplWebSocketSample/main.lua");
------------------------------------------------------------
]]



local CmdParser = commonlib.gettable("MyCompany.Aries.Game.CmdParser");	

local NplWebSocketSample = commonlib.inherit(commonlib.gettable("Mod.ModBase"),commonlib.gettable("Mod.NplWebSocketSample"));

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
        NPL.AddPublicFile("Mod/NplWebSocketSample/main_virtual_client.lua", 10);
        NPL.AddPublicFile("Mod/NplWebSocketSample/main.lua", 20);
        NplWebSocketSample.added = true;
    end
end
local function activate()
	commonlib.echo("==========msg");
	commonlib.echo(msg);

    if(msg and msg.nid)then
        local json = msg[1];
        local out={};
        if(NPL.FromJson(json, out)) then
	        commonlib.echo("==========out");
	        commonlib.echo(out);
        end
    end
end
NPL.this(activate)
