///////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Welcome to your first Cloud Script revision. 
// The examples here provide a quick introduction to using Cloud Script and some
// ideas about how you might use it in your game.
//
// There are two approaches for invoking Cloud Script: calling handler functions directly 
// from the game client using the "RunCloudScript" API, or triggering Photon Webhooks associated with
// room events. Both approaches are demonstrated in this file. You can use one or the other, or both. 
//
// Feel free to use this as a starting point for your game server logic, or to replace it altogether. 
// If you have any questions or need advice on where to begin, 
// check out the resources at https://playfab.com/cloud-script or check our forums at
// https://support.playfab.com. For issues which are confidential (involving sensitive intellectual
// property, for example), please contact our Developer Success team directly at devrel@playfab.com.
//
// - The PlayFab Team
//
///////////////////////////////////////////////////////////////////////////////////////////////////////


// This is a Cloud Script handler function. It runs in the PlayFab cloud and 
// has full access to the PlayFab Game Server API 
// (https://api.playfab.com/Documentation/Server). You can invoke the function 
// from your game client by calling the "RunCloudScript" API 
// (https://api.playfab.com/Documentation/Client/method/RunCloudScript) and 
// specifying "helloWorld" for the "ActionId" field.
handlers.helloWorld = function (args) {

    // "currentPlayerId" is initialized to the PlayFab ID of the player logged-in on the game client. 
    // Cloud Script handles authenticating the player automatically.
    var message = "Hello !";

    // You can use the "log" object to write out debugging statements. The "log" object has
    // three functions corresponding to logging level: debug, info, and error.
    log.info(message);
	var now = Date.now();
    // Whatever value you return from a CloudScript handler function is passed back 
    // to the game client. It is set in the "Results" property of the object returned by the 
    // RunCloudScript API. Any log statments generated by the handler function are also included 
    // in the "ActionLog" field of the RunCloudScript result, so you can use them to assist in
    // debugging and error handling.
    return { messageValue: message, timestamp: now };
}

function getPlayerDataForMap(mapKey)
{
	var playerData = server.GetUserReadOnlyData({
        PlayFabId: currentPlayerId,
        Keys: [mapKey, "nextID"]
    });
	
	return playerData;
}


function createEmptyMap()
{
	return {entitiesOnMap:new Array()};
}

handlers.startNewGame = function(args)
{
	var city = "{\"entitiesOnMap\":[{\"id\":1,\"gameDefinitionId\":\"townhall\",\"timestamp\":0,\"currentNode\":\"\",\"coordonates\":{\"i\":18,\"j\":18},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":3,\"gameDefinitionId\":\"tree_1\",\"timestamp\":0,\"currentNode\":\"242664b48a772\",\"coordonates\":{\"i\":15,\"j\":29},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":4,\"gameDefinitionId\":\"tree_2\",\"timestamp\":0,\"currentNode\":\"242664b60ab7d\",\"coordonates\":{\"i\":1,\"j\":22},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":5,\"gameDefinitionId\":\"tree_3\",\"timestamp\":0,\"currentNode\":\"242664b758371\",\"coordonates\":{\"i\":1,\"j\":29},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":6,\"gameDefinitionId\":\"tree_1\",\"timestamp\":0,\"currentNode\":\"242664b48a772\",\"coordonates\":{\"i\":14,\"j\":26},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":7,\"gameDefinitionId\":\"tree_1\",\"timestamp\":0,\"currentNode\":\"242664b48a772\",\"coordonates\":{\"i\":12,\"j\":16},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":8,\"gameDefinitionId\":\"tree_1\",\"timestamp\":0,\"currentNode\":\"242664b48a772\",\"coordonates\":{\"i\":22,\"j\":29},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":9,\"gameDefinitionId\":\"tree_1\",\"timestamp\":0,\"currentNode\":\"242664b48a772\",\"coordonates\":{\"i\":29,\"j\":29},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":10,\"gameDefinitionId\":\"tree_1\",\"timestamp\":0,\"currentNode\":\"242664b48a772\",\"coordonates\":{\"i\":12,\"j\":13},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":11,\"gameDefinitionId\":\"tree_1\",\"timestamp\":0,\"currentNode\":\"242664b48a772\",\"coordonates\":{\"i\":12,\"j\":20},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":12,\"gameDefinitionId\":\"tree_1\",\"timestamp\":0,\"currentNode\":\"242664b48a772\",\"coordonates\":{\"i\":19,\"j\":11},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":13,\"gameDefinitionId\":\"tree_1\",\"timestamp\":0,\"currentNode\":\"242664b48a772\",\"coordonates\":{\"i\":26,\"j\":29},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":14,\"gameDefinitionId\":\"tree_1\",\"timestamp\":0,\"currentNode\":\"242664b48a772\",\"coordonates\":{\"i\":19,\"j\":29},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":15,\"gameDefinitionId\":\"tree_1\",\"timestamp\":0,\"currentNode\":\"242664b48a772\",\"coordonates\":{\"i\":17,\"j\":8},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":16,\"gameDefinitionId\":\"tree_1\",\"timestamp\":0,\"currentNode\":\"242664b48a772\",\"coordonates\":{\"i\":21,\"j\":8},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":17,\"gameDefinitionId\":\"tree_1\",\"timestamp\":0,\"currentNode\":\"242664b48a772\",\"coordonates\":{\"i\":25,\"j\":8},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":18,\"gameDefinitionId\":\"tree_1\",\"timestamp\":0,\"currentNode\":\"242664b48a772\",\"coordonates\":{\"i\":29,\"j\":8},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":19,\"gameDefinitionId\":\"tree_1\",\"timestamp\":0,\"currentNode\":\"242664b48a772\",\"coordonates\":{\"i\":27,\"j\":5},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":20,\"gameDefinitionId\":\"tree_2\",\"timestamp\":0,\"currentNode\":\"242664b60ab7d\",\"coordonates\":{\"i\":9,\"j\":18},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":21,\"gameDefinitionId\":\"tree_2\",\"timestamp\":0,\"currentNode\":\"242664b60ab7d\",\"coordonates\":{\"i\":8,\"j\":21},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":22,\"gameDefinitionId\":\"tree_2\",\"timestamp\":0,\"currentNode\":\"242664b60ab7d\",\"coordonates\":{\"i\":8,\"j\":15},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":23,\"gameDefinitionId\":\"tree_2\",\"timestamp\":0,\"currentNode\":\"242664b60ab7d\",\"coordonates\":{\"i\":9,\"j\":12},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":24,\"gameDefinitionId\":\"tree_2\",\"timestamp\":0,\"currentNode\":\"242664b60ab7d\",\"coordonates\":{\"i\":8,\"j\":25},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":25,\"gameDefinitionId\":\"tree_2\",\"timestamp\":0,\"currentNode\":\"242664b60ab7d\",\"coordonates\":{\"i\":12,\"j\":5},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":26,\"gameDefinitionId\":\"tree_2\",\"timestamp\":0,\"currentNode\":\"242664b60ab7d\",\"coordonates\":{\"i\":19,\"j\":4},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":27,\"gameDefinitionId\":\"tree_2\",\"timestamp\":0,\"currentNode\":\"242664b60ab7d\",\"coordonates\":{\"i\":20,\"j\":1},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":28,\"gameDefinitionId\":\"tree_2\",\"timestamp\":0,\"currentNode\":\"242664b60ab7d\",\"coordonates\":{\"i\":25,\"j\":2},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":29,\"gameDefinitionId\":\"tree_2\",\"timestamp\":0,\"currentNode\":\"242664b60ab7d\",\"coordonates\":{\"i\":28,\"j\":2},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":30,\"gameDefinitionId\":\"tree_2\",\"timestamp\":0,\"currentNode\":\"242664b60ab7d\",\"coordonates\":{\"i\":10,\"j\":28},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":31,\"gameDefinitionId\":\"tree_2\",\"timestamp\":0,\"currentNode\":\"242664b60ab7d\",\"coordonates\":{\"i\":16,\"j\":4},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":32,\"gameDefinitionId\":\"tree_2\",\"timestamp\":0,\"currentNode\":\"242664b60ab7d\",\"coordonates\":{\"i\":9,\"j\":8},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":33,\"gameDefinitionId\":\"tree_3\",\"timestamp\":0,\"currentNode\":\"242664b758371\",\"coordonates\":{\"i\":1,\"j\":10},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":34,\"gameDefinitionId\":\"tree_3\",\"timestamp\":0,\"currentNode\":\"242664b758371\",\"coordonates\":{\"i\":2,\"j\":7},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":35,\"gameDefinitionId\":\"tree_3\",\"timestamp\":0,\"currentNode\":\"242664b758371\",\"coordonates\":{\"i\":1,\"j\":13},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":36,\"gameDefinitionId\":\"tree_3\",\"timestamp\":0,\"currentNode\":\"242664b758371\",\"coordonates\":{\"i\":1,\"j\":16},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":37,\"gameDefinitionId\":\"tree_3\",\"timestamp\":0,\"currentNode\":\"242664b758371\",\"coordonates\":{\"i\":1,\"j\":19},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":38,\"gameDefinitionId\":\"tree_3\",\"timestamp\":0,\"currentNode\":\"242664b758371\",\"coordonates\":{\"i\":4,\"j\":28},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":39,\"gameDefinitionId\":\"tree_3\",\"timestamp\":0,\"currentNode\":\"242664b758371\",\"coordonates\":{\"i\":5,\"j\":5},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":40,\"gameDefinitionId\":\"tree_3\",\"timestamp\":0,\"currentNode\":\"242664b758371\",\"coordonates\":{\"i\":5,\"j\":2},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":41,\"gameDefinitionId\":\"tree_3\",\"timestamp\":0,\"currentNode\":\"242664b758371\",\"coordonates\":{\"i\":1,\"j\":4},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":42,\"gameDefinitionId\":\"tree_3\",\"timestamp\":0,\"currentNode\":\"242664b758371\",\"coordonates\":{\"i\":2,\"j\":1},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":43,\"gameDefinitionId\":\"tree_3\",\"timestamp\":0,\"currentNode\":\"242664b758371\",\"coordonates\":{\"i\":9,\"j\":1},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":44,\"gameDefinitionId\":\"tree_2\",\"timestamp\":0,\"currentNode\":\"242664b60ab7d\",\"coordonates\":{\"i\":12,\"j\":8},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":46,\"gameDefinitionId\":\"tree_3\",\"timestamp\":0,\"currentNode\":\"242664b758371\",\"coordonates\":{\"i\":4,\"j\":15},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":50,\"gameDefinitionId\":\"rock_3\",\"timestamp\":0,\"currentNode\":\"24266542083d0\",\"coordonates\":{\"i\":9,\"j\":5},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":51,\"gameDefinitionId\":\"rock_3\",\"timestamp\":0,\"currentNode\":\"24266542083d0\",\"coordonates\":{\"i\":13,\"j\":1},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":55,\"gameDefinitionId\":\"rock_3\",\"timestamp\":0,\"currentNode\":\"24266542083d0\",\"coordonates\":{\"i\":7,\"j\":28},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":56,\"gameDefinitionId\":\"rock_3\",\"timestamp\":0,\"currentNode\":\"24266542083d0\",\"coordonates\":{\"i\":5,\"j\":18},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":57,\"gameDefinitionId\":\"tree_3\",\"timestamp\":0,\"currentNode\":\"242664b758371\",\"coordonates\":{\"i\":5,\"j\":21},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":58,\"gameDefinitionId\":\"tree_3\",\"timestamp\":0,\"currentNode\":\"242664b758371\",\"coordonates\":{\"i\":4,\"j\":24},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":59,\"gameDefinitionId\":\"tree_2\",\"timestamp\":0,\"currentNode\":\"242664b60ab7d\",\"coordonates\":{\"i\":11,\"j\":23},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":60,\"gameDefinitionId\":\"tree_3\",\"timestamp\":0,\"currentNode\":\"242664b758371\",\"coordonates\":{\"i\":4,\"j\":12},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":61,\"gameDefinitionId\":\"tree_2\",\"timestamp\":0,\"currentNode\":\"242664b60ab7d\",\"coordonates\":{\"i\":5,\"j\":9},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":62,\"gameDefinitionId\":\"tree_2\",\"timestamp\":0,\"currentNode\":\"242664b60ab7d\",\"coordonates\":{\"i\":17,\"j\":1},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":63,\"gameDefinitionId\":\"tree_2\",\"timestamp\":0,\"currentNode\":\"242664b60ab7d\",\"coordonates\":{\"i\":22,\"j\":4},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":64,\"gameDefinitionId\":\"tree_1\",\"timestamp\":0,\"currentNode\":\"242664b48a772\",\"coordonates\":{\"i\":15,\"j\":11},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":65,\"gameDefinitionId\":\"prod_1\",\"timestamp\":635957275995343000,\"currentNode\":\"242617d2329ba\",\"coordonates\":{\"i\":22,\"j\":24},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":66,\"gameDefinitionId\":\"prod_2\",\"timestamp\":635957270114288100,\"currentNode\":\"242617d2329ba\",\"coordonates\":{\"i\":27,\"j\":20},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":70,\"gameDefinitionId\":\"missile_factory\",\"timestamp\":635957279124224300,\"currentNode\":\"242617d2329ba\",\"coordonates\":{\"i\":24,\"j\":14},\"currentQueue\":[],\"equippedMissileIds\":[]}]}";
	var def = "{\"entitiesOnMap\":[{\"id\":48,\"gameDefinitionId\":\"rock_2\",\"timestamp\":0,\"currentNode\":\"242665412202f\",\"coordonates\":{\"i\":1,\"j\":29},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":49,\"gameDefinitionId\":\"rock_1\",\"timestamp\":0,\"currentNode\":\"2426654013861\",\"coordonates\":{\"i\":1,\"j\":26},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":52,\"gameDefinitionId\":\"rock_2\",\"timestamp\":0,\"currentNode\":\"242665412202f\",\"coordonates\":{\"i\":1,\"j\":1},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":53,\"gameDefinitionId\":\"rock_2\",\"timestamp\":0,\"currentNode\":\"242665412202f\",\"coordonates\":{\"i\":2,\"j\":4},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":54,\"gameDefinitionId\":\"rock_1\",\"timestamp\":0,\"currentNode\":\"2426654013861\",\"coordonates\":{\"i\":1,\"j\":7},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":67,\"gameDefinitionId\":\"missile_launcher\",\"timestamp\":635957249524137500,\"currentNode\":\"242617d2329ba\",\"coordonates\":{\"i\":2,\"j\":23},\"currentQueue\":[],\"equippedMissileIds\":[]},{\"id\":69,\"gameDefinitionId\":\"missile_launcher\",\"timestamp\":635957264593878300,\"currentNode\":\"242617d2329ba\",\"coordonates\":{\"i\":2,\"j\":19},\"currentQueue\":[],\"equippedMissileIds\":[]}]}";
	var updateUserDataResult = server.UpdateUserReadOnlyData({
        PlayFabId: currentPlayerId,
        Data: {
			"nextID":"70",
			"tuto":"true",
			"cityMap": city,
		}
	});
	
	updateUserDataResult = server.UpdateUserReadOnlyData({
        PlayFabId: currentPlayerId,
        Data: {
			"defMap": def,
			"whaleMap": JSON.stringify(createEmptyMap()),
			"mineMap": JSON.stringify(createEmptyMap())
        },
		Permission:"Public"
    });
	
	updateUserDataResult = server.UpdateUserData({
		PlayFabId: currentPlayerId,
        Data: {
			"name":"$no_name",
			"missile_att":"",
			"missile_def":"",
			"missile_niv":""
        },
		Permission:"Public"
	});
}

handlers.getPlayerStatistics = function(args)
{
	var playfabID = args.playerID;
	var playerStatistics = server.GetPlayerStatistics({
		PlayFabId: playfabID
	});
	return {Stats:playerStatistics.UserStatistics};
}

handlers.addCityBuilding =function(args)
{
	var entity = args;
	var playerData = getPlayerDataForMap("cityMap")
	
	var playerDataCityMap;
	if(playerData.Data["cityMap"] == undefined)
		playerDataCityMap = createEmptyMap();
	else
		playerDataCityMap = JSON.parse(playerData.Data["cityMap"].Value);
	
	playerDataCityMap.entitiesOnMap.push(entity);
	
	var nextID = parseInt(playerData.Data["nextID"].Value);
	nextID++;
	
	var updateUserDataResult = server.UpdateUserReadOnlyData({
        PlayFabId: currentPlayerId,
        Data: {
            "cityMap": JSON.stringify(playerDataCityMap),
			"nextID": nextID + ""
        }
    });
	return {idcheck:nextID};
}

handlers.removeCityBuilding =function(args)
{
	var entityID = args;
	var playerData = getPlayerDataForMap("cityMap")
	
	var playerDataMap = JSON.parse(playerData.Data["cityMap"].Value);
	
	var found = false;
	for(var i = playerDataMap.entitiesOnMap.length -1 ; i>=0; i--)
	{
		if(playerDataMap.entitiesOnMap[i].id == entityID.id)
		{
			playerDataMap.entitiesOnMap.splice(i, 1);
			found = true;
			break;
		}
	}
	if(found)
	{
		var updateUserDataResult = server.UpdateUserReadOnlyData({
			PlayFabId: currentPlayerId,
			Data: {
			    "cityMap": JSON.stringify(playerDataMap)
			}
		});
	}
    
	return {hasBeenRemoved:found};
}
handlers.addDefBuilding =function(args)
{
	var entity = args;
	var playerData = getPlayerDataForMap("defMap")
	
	var playerDataCityMap;
	if(playerData.Data["defMap"] == undefined)
		playerDataCityMap = createEmptyMap();
	else
		playerDataCityMap = JSON.parse(playerData.Data["defMap"].Value);
	
	playerDataCityMap.entitiesOnMap.push(entity);
	
	var nextID = parseInt(playerData.Data["nextID"].Value); 
	nextID++;
	
	var updateUserDataResult = server.UpdateUserReadOnlyData({
        PlayFabId: currentPlayerId,
        Data: {
            "defMap": JSON.stringify(playerDataCityMap),
			"nextID": nextID + ""
        }
    });
	return {idcheck:nextID};
}
handlers.removeDefBuilding =function(args)
{
	var entityID = args;
	var playerData = getPlayerDataForMap("defMap")
	
	var playerDataMap = JSON.parse(playerData.Data["defMap"].Value);
	
	var found = false;
	for(var i = playerDataMap.entitiesOnMap.length -1 ; i>=0; i--)
	{
		if(playerDataMap.entitiesOnMap[i].id == entityID.id)
		{
			playerDataMap.entitiesOnMap.splice(i, 1);
			found = true;
			break;
		}
	}
	if(found)
	{
		var updateUserDataResult = server.UpdateUserReadOnlyData({
			PlayFabId: currentPlayerId,
			Data: {
			    "defMap": JSON.stringify(playerDataMap)
			}
		});
	}
    
	return {hasBeenRemoved:found};
}
handlers.addWhaleBuilding =function(args)
{
	var entity = args;
	var playerData = getPlayerDataForMap("whaleMap")
	
	var playerDataCityMap;
	if(playerData.Data["whaleMap"] == undefined)
		playerDataCityMap = createEmptyMap();
	else
		playerDataCityMap = JSON.parse(playerData.Data["whaleMap"].Value);
	
	playerDataCityMap.entitiesOnMap.push(entity);
	
	var nextID = parseInt(playerData.Data["nextID"].Value);
	nextID++;
	
	var updateUserDataResult = server.UpdateUserReadOnlyData({
        PlayFabId: currentPlayerId,
        Data: {
            "whaleMap": JSON.stringify(playerDataCityMap),
			"nextID": nextID + ""
        }
    });
	return {idcheck:nextID};
}
handlers.removeWellBuilding =function(args)
{
	var entityID = args;
	var playerData = getPlayerDataForMap("whaleMap")
	
	var playerDataMap = JSON.parse(playerData.Data["whaleMap"].Value);
	
	var found = false;
	for(var i = playerDataMap.entitiesOnMap.length -1 ; i>=0; i--)
	{
		if(playerDataMap.entitiesOnMap[i].id == entityID.id)
		{
			playerDataMap.entitiesOnMap.splice(i, 1);
			found = true;
			break;
		}
	}
	if(found)
	{
		var updateUserDataResult = server.UpdateUserReadOnlyData({
			PlayFabId: currentPlayerId,
			Data: {
			    "whaleMap": JSON.stringify(playerDataMap)
			}
		});
	}
    
	return {hasBeenRemoved:found};
}
handlers.addMineBuilding =function(args)
{
	var entity = args;
	var playerData = getPlayerDataForMap("mineMap")
	
	var playerDataCityMap;
	if(playerData.Data["mineMap"] == undefined)
		playerDataCityMap = createEmptyMap();
	else
		playerDataCityMap = JSON.parse(playerData.Data["mineMap"].Value);
	
	playerDataCityMap.entitiesOnMap.push(entity);
	
	var nextID = parseInt(playerData.Data["nextID"].Value);
	nextID++;
	
	var updateUserDataResult = server.UpdateUserReadOnlyData({
        PlayFabId: currentPlayerId,
        Data: {
            "mineMap": JSON.stringify(playerDataCityMap),
			"nextID": nextID + ""
        }
    });
	return {idcheck:nextID};
}
handlers.removeMineBuilding =function(args)
{
	var entityID = args;
	var playerData = getPlayerDataForMap("mineMap")
	
	var playerDataMap = JSON.parse(playerData.Data["mineMap"].Value);
	
	var found = false;
	for(var i = playerDataMap.entitiesOnMap.length -1 ; i>=0; i--)
	{
		if(playerDataMap.entitiesOnMap[i].id == entityID.id)
		{
			playerDataMap.entitiesOnMap.splice(i, 1);
			found = true;
			break;
		}
	}
	if(found)
	{
		var updateUserDataResult = server.UpdateUserReadOnlyData({
			PlayFabId: currentPlayerId,
			Data: {
			    "mineMap": JSON.stringify(playerDataMap)
			}
		});
	}
    
	return {hasBeenRemoved:found};
}
handlers.changeStateEntity =function(args)
{
	var mapKey = "cityMap";
	if (args.mapType == 1)//MapType.Defense)
		mapKey = "defMap";
	if (args.mapType == 2)//MapType.Whale)
		mapKey = "whaleMap";
	if (args.mapType == 3)//MapType.Mine)
		mapKey = "mineMap";
	
	var playerData = server.GetUserReadOnlyData({
        PlayFabId: currentPlayerId,
        Keys: [mapKey]
    });
	
	var isUpdateOk = false;
	var playerDataMap = JSON.parse(playerData.Data[mapKey].Value);
	for(var i=0; i<playerDataMap.entitiesOnMap.length; i++)
	{
		if(playerDataMap.entitiesOnMap[i].id == args.id)
		{
			playerDataMap.entitiesOnMap[i].currentNode = args.newStateNodeID;
			playerDataMap.entitiesOnMap[i].timestamp = args.timestamp;
			isUpdateOk = true;
			
			break;
		}
	}
	if(isUpdateOk)
	{
		var value = JSON.stringify(playerDataMap);
		var data = {};
		data[mapKey] = value;
		var updateUserDataResult = server.UpdateUserReadOnlyData({
			PlayFabId: currentPlayerId,
			Data: data
		});
		return true;
	}
	return false;
}

handlers.moveEntity =function(args)
{
	var mapKey = "cityMap";
	if (args.mapType == 1)//MapType.Defense)
		mapKey = "defMap";
	if (args.mapType == 2)//MapType.Whale)
		mapKey = "whaleMap";
	if (args.mapType == 3)//MapType.Mine)
		mapKey = "mineMap";
	
	var playerData = server.GetUserReadOnlyData({
        PlayFabId: currentPlayerId,
        Keys: [mapKey]
    });
	
	var isUpdateOk = false;
	var playerDataMap = JSON.parse(playerData.Data[mapKey].Value);
	for(var i=0; i<playerDataMap.entitiesOnMap.length; i++)
	{
		if(playerDataMap.entitiesOnMap[i].id == args.id)
		{
			playerDataMap.entitiesOnMap[i].coordonates = args.coordonates;
			isUpdateOk = true;
			break;
		}
	}
	
	if(isUpdateOk)
	{
		var value = JSON.stringify(playerDataMap);
		var data = {};
		data[mapKey] = value;
		var updateUserDataResult = server.UpdateUserReadOnlyData({
			PlayFabId: currentPlayerId,
			Data: data
		});
		return true;
	}
	return false;
}

// This is a function that the game client would call whenever a player completes
// a level. It updates a setting in the player's data that only game server
// code can write - it is read-only on the client - and it updates a player
// statistic that can be used for leaderboards. 
//
// A funtion like this could be extended to perform validation on the 
// level completion data to detect cheating. It could also do things like 
// award the player items from the game catalog based on their performance.
handlers.completedLevel = function (args) {

    // "args" is set to the value of the "Params" field of the object passed in to 
    // RunCloudScript from the client.  It contains whatever properties you want to pass 
    // into your Cloud Script function. In this case it contains information about 
    // the level a player has completed.
    var level = args.levelName;
    var monstersKilled = args.monstersKilled;

    // The "server" object has functions for each PlayFab server API 
    // (https://api.playfab.com/Documentation/Server). It is automatically 
    // authenticated as your title and handles all communication with 
    // the PlayFab API, so you don't have to write the code to make web requests. 
    var updateUserDataResult = server.UpdateUserInternalData({
        PlayFabId: currentPlayerId,
        Data: {
            lastLevelCompleted: level
        }
    });

    log.debug("Set lastLevelCompleted for player " + currentPlayerId + " to " + level);

    server.UpdateUserStatistics({
        PlayFabId: currentPlayerId,
        UserStatistics: {
            level_monster_kills: monstersKilled
        }
    });

    log.debug("Updated level_monster_kills stat for player " + currentPlayerId + " to " + monstersKilled);
}


// In addition to the Cloud Script handlers, you can define your own functions and call them from your handlers. 
// This makes it possible to share code between multiple handlers and to improve code organization.
handlers.updatePlayerMove = function (args) {
    var validMove = processPlayerMove(args);
    return { validMove: validMove };
}



// This is a helper function that verifies that the player's move wasn't made
// too quickly following their previous move, according to the rules of the game.
// If the move is valid, then it updates the player's statistics and profile data.
// This function is called from the "UpdatePlayerMove" handler above and also is 
// triggered by the "RoomEventRaised" Photon room event in the Webhook handler
// below. For this example, the script defines the cooldown period (playerMoveCooldownInSeconds)
// as 15 seconds. A recommended approach for values like this would be to create them in Title
// Data, so that they can be queries in the script with a call to
// https://api.playfab.com/Documentation/Server/method/GetTitleData. This would allow you to
// make adjustments to these values over time, without having to edit, test, and roll out an
// updated script.
function processPlayerMove(playerMove) {
    var now = Date.now();
    var playerMoveCooldownInSeconds = 15;

    var playerData = server.GetUserInternalData({
        PlayFabId: currentPlayerId,
        Keys: ["last_move_timestamp"]
    });

    var lastMoveTimestampSetting = playerData.Data["last_move_timestamp"];

    if (lastMoveTimestampSetting) {
        var lastMoveTime = Date.parse(lastMoveTimestampSetting.Value);
        var timeSinceLastMoveInSeconds = (now - lastMoveTime) / 1000;
        log.debug("lastMoveTime: " + lastMoveTime + " now: " + now + " timeSinceLastMoveInSeconds: " + timeSinceLastMoveInSeconds);

        if (timeSinceLastMoveInSeconds < playerMoveCooldownInSeconds) {
            log.error("Invalid move - time since last move: " + timeSinceLastMoveInSeconds + "s less than minimum of " + playerMoveCooldownInSeconds + "s.")
            return false;
        }
    }

    var playerStats = server.GetUserStatistics({
        PlayFabId: currentPlayerId
    }).UserStatistics;

    if (playerStats.movesMade)
        playerStats.movesMade += 1;
    else
        playerStats.movesMade = 1;

    server.UpdateUserStatistics({
        PlayFabId: currentPlayerId,
        UserStatistics: playerStats
    });

    server.UpdateUserInternalData({
        PlayFabId: currentPlayerId,
        Data: {
            last_move_timestamp: new Date(now).toUTCString()
        }
    });

    return true;
}

// Photon Webhooks Integration
//
// The following functions are examples of Photon Cloud Webhook handlers. 
// When you enable Photon integration in the Game Manager, your Photon applications 
// are automatically configured to authenticate players using their PlayFab accounts 
// and to fire events that trigger your CloudScript Webhook handlers, if defined. 
// This makes it easier than ever to incorporate server logic into your game.
//
//  For more information, see https://playfab.com/using-photon-playfab

// Triggered automatically when a Photon room is first created
handlers.RoomCreated = function (args) {
    log.debug("Room Created - Game: " + args.GameId + " MaxPlayers: " + args.CreateOptions.MaxPlayers);
}

// Triggered automatically when a player joins a Photon room
handlers.RoomJoined = function (args) {
    log.debug("Room Joined - Game: " + args.GameId + " PlayFabId: " + args.UserId);
}

// Triggered automatically when a player leaves a Photon room
handlers.RoomLeft = function (args) {
    log.debug("Room Left - Game: " + args.GameId + " PlayFabId: " + args.UserId);
}

// Triggered automatically when a Photon room closes
// Note: currentPlayerId is undefined in this function
handlers.RoomClosed = function (args) {
    log.debug("Room Closed - Game: " + args.GameId);
}

// Triggered automatically when a Photon room game property is updated.
// Note: currentPlayerId is undefined in this function
handlers.RoomPropertyUpdated = function (args) {
    log.debug("Room Property Updated - Game: " + args.GameId);
}

// Triggered by calling "OpRaiseEvent" on the Photon client. The "args.Data" property is 
// set to the value of the "customEventContent" HashTable parameter, so you can use
// it to pass in arbitrary data.
handlers.RoomEventRaised = function (args) {
    var eventData = args.Data;
    log.debug("Event Raised - Game: " + args.GameId + " Event Type: " + eventData.eventType);

    switch (eventData.eventType) {
        case "playerMove":
            processPlayerMove(eventData);
            break;

        default:
            break;
    }
}
