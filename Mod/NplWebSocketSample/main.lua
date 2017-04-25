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

