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
};

function getPlayerDataForMap(mapKey)
{
	var playerData = server.GetUserReadOnlyData({
        PlayFabId: currentPlayerId,
        Keys: [mapKey, "nextID"]
    });

	return playerData;
}

// Copy all data from a specific user to another
handlers.copyUserIntoOtherUser = function(pArgs)
{
	var SenderID = pArgs.SenderID;
	var ReceiverID = pArgs.ReceiverID;
	
	var statistics = server.GetPlayerStatistics({
		PlayFabId: SenderID
	});
	
	server.UpdatePlayerStatistics(
	{
		PlayFabId: ReceiverID,
		Statistics: statistics.Statistics,
		ForceUpdate: true
	});
	
	var data = server.GetUserData({
		PlayFabId: SenderID
	});
	
	var newData = {};
	for (var propertyName in data.Data)
	{
		newData[propertyName] = data.Data[propertyName].Value;
	}
	
	server.UpdateUserData({
		PlayFabId: ReceiverID,
		Data: newData,
		Permission: "Public"
	});
	
	var readOnlyData = server.GetUserReadOnlyData({
		PlayFabId: SenderID
	});
	
	var newReadOnlyData = {};
	for (var readOnlyPropertyName in readOnlyData.Data)
	{
		newReadOnlyData[readOnlyPropertyName] = readOnlyData.Data[readOnlyPropertyName].Value;
	}
	
	server.UpdateUserReadOnlyData({
		PlayFabId: ReceiverID,
		Data: newReadOnlyData,
		Permission: "Public"
	});
}

function createEmptyMap()
{
	return {entitiesOnMap:new Array()};
}

handlers.startNewGame = function(args)
{
	var city = "{\"entitiesOnMap\":[{\"id\":2,\"gameDefinitionId\":\"townhall\",\"timestamp\":635985561401099000,\"currentNode\":\"\",\"coordonates\":{\"i\":17,\"j\":15}},{\"id\":5,\"gameDefinitionId\":\"prod_2\",\"timestamp\":636056633206144600,\"currentNode\":\"242617d2329ba\",\"coordonates\":{\"i\":26,\"j\":29}},{\"id\":9,\"gameDefinitionId\":\"rock_3\",\"timestamp\":635985564259871500,\"currentNode\":\"242665b4d27de\",\"coordonates\":{\"i\":7,\"j\":11}},{\"id\":15,\"gameDefinitionId\":\"tree_5\",\"timestamp\":635985564960166000,\"currentNode\":\"2426b8f8d6c25\",\"coordonates\":{\"i\":2,\"j\":2}},{\"id\":17,\"gameDefinitionId\":\"tree_4\",\"timestamp\":635985565159455600,\"currentNode\":\"2426b8f79f740\",\"coordonates\":{\"i\":8,\"j\":22}},{\"id\":18,\"gameDefinitionId\":\"tree_3\",\"timestamp\":635985566206005000,\"currentNode\":\"242664b758371\",\"coordonates\":{\"i\":18,\"j\":33}},{\"id\":19,\"gameDefinitionId\":\"rock_3\",\"timestamp\":635985566409301200,\"currentNode\":\"242665b4d27de\",\"coordonates\":{\"i\":1,\"j\":20}},{\"id\":20,\"gameDefinitionId\":\"rock_5\",\"timestamp\":635985566448452000,\"currentNode\":\"2426b9112d265\",\"coordonates\":{\"i\":15,\"j\":19}},{\"id\":21,\"gameDefinitionId\":\"tree_2\",\"timestamp\":635985566760665600,\"currentNode\":\"242664b60ab7d\",\"coordonates\":{\"i\":14,\"j\":33}},{\"id\":22,\"gameDefinitionId\":\"tree_5\",\"timestamp\":635985566905693200,\"currentNode\":\"2426b8f8d6c25\",\"coordonates\":{\"i\":28,\"j\":2}},{\"id\":24,\"gameDefinitionId\":\"tree_1\",\"timestamp\":635985567456351900,\"currentNode\":\"242664b48a772\",\"coordonates\":{\"i\":6,\"j\":2}},{\"id\":25,\"gameDefinitionId\":\"tree_2\",\"timestamp\":635985567782034700,\"currentNode\":\"242664b60ab7d\",\"coordonates\":{\"i\":16,\"j\":11}},{\"id\":26,\"gameDefinitionId\":\"tree_2\",\"timestamp\":635985567869389300,\"currentNode\":\"242664b60ab7d\",\"coordonates\":{\"i\":27,\"j\":14}},{\"id\":27,\"gameDefinitionId\":\"rock_5\",\"timestamp\":635985567951416800,\"currentNode\":\"2426b9112d265\",\"coordonates\":{\"i\":21,\"j\":10}},{\"id\":28,\"gameDefinitionId\":\"tree_1\",\"timestamp\":635985568091935200,\"currentNode\":\"242664b48a772\",\"coordonates\":{\"i\":2,\"j\":6}},{\"id\":29,\"gameDefinitionId\":\"tree_1\",\"timestamp\":635985568190068500,\"currentNode\":\"242664b48a772\",\"coordonates\":{\"i\":6,\"j\":6}},{\"id\":30,\"gameDefinitionId\":\"tree_4\",\"timestamp\":635985568317015700,\"currentNode\":\"2426b8f79f740\",\"coordonates\":{\"i\":2,\"j\":14}},{\"id\":31,\"gameDefinitionId\":\"tree_4\",\"timestamp\":635985568377054200,\"currentNode\":\"2426b8f79f740\",\"coordonates\":{\"i\":15,\"j\":2}},{\"id\":32,\"gameDefinitionId\":\"tree_5\",\"timestamp\":635985568683888300,\"currentNode\":\"2426b8f8d6c25\",\"coordonates\":{\"i\":11,\"j\":16}},{\"id\":34,\"gameDefinitionId\":\"tree_1\",\"timestamp\":635985569276853100,\"currentNode\":\"242664b48a772\",\"coordonates\":{\"i\":10,\"j\":2}},{\"id\":35,\"gameDefinitionId\":\"tree_1\",\"timestamp\":635985569379662200,\"currentNode\":\"242664b48a772\",\"coordonates\":{\"i\":2,\"j\":10}},{\"id\":36,\"gameDefinitionId\":\"tree_3\",\"timestamp\":635985569589264900,\"currentNode\":\"242664b758371\",\"coordonates\":{\"i\":14,\"j\":25}},{\"id\":37,\"gameDefinitionId\":\"tree_3\",\"timestamp\":635985569835115000,\"currentNode\":\"242664b758371\",\"coordonates\":{\"i\":10,\"j\":33}},{\"id\":38,\"gameDefinitionId\":\"tree_4\",\"timestamp\":635985570112991500,\"currentNode\":\"2426b8f79f740\",\"coordonates\":{\"i\":2,\"j\":33}},{\"id\":39,\"gameDefinitionId\":\"tree_3\",\"timestamp\":635985570169984400,\"currentNode\":\"242664b758371\",\"coordonates\":{\"i\":6,\"j\":33}},{\"id\":41,\"gameDefinitionId\":\"tree_3\",\"timestamp\":635985570879403800,\"currentNode\":\"242664b758371\",\"coordonates\":{\"i\":2,\"j\":29}},{\"id\":42,\"gameDefinitionId\":\"rock_3\",\"timestamp\":635985571319931500,\"currentNode\":\"242665b4d27de\",\"coordonates\":{\"i\":19,\"j\":4}},{\"id\":43,\"gameDefinitionId\":\"tree_4\",\"timestamp\":635985571522799000,\"currentNode\":\"2426b8f79f740\",\"coordonates\":{\"i\":26,\"j\":7}},{\"id\":44,\"gameDefinitionId\":\"rock_5\",\"timestamp\":635985572181946400,\"currentNode\":\"2426b9112d265\",\"coordonates\":{\"i\":11,\"j\":6}},{\"id\":45,\"gameDefinitionId\":\"rock_5\",\"timestamp\":635985572389375900,\"currentNode\":\"2426b9112d265\",\"coordonates\":{\"i\":7,\"j\":26}},{\"id\":47,\"gameDefinitionId\":\"prod_1\",\"timestamp\":636056633022440000,\"currentNode\":\"242617d2329ba\",\"coordonates\":{\"i\":21,\"j\":29}}]}";
	var def = "{\"entitiesOnMap\":[{\"id\":8,\"gameDefinitionId\":\"rock_1\",\"timestamp\":635985564219134000,\"currentNode\":\"242665b3c56c2\",\"coordonates\":{\"i\":1,\"j\":29}},{\"id\":10,\"gameDefinitionId\":\"rock_2\",\"timestamp\":635985564305398300,\"currentNode\":\"242665b464238\",\"coordonates\":{\"i\":1,\"j\":1}},{\"id\":12,\"gameDefinitionId\":\"rock_4\",\"timestamp\":635985564489110500,\"currentNode\":\"2426b910451a2\",\"coordonates\":{\"i\":2,\"j\":33}},{\"id\":14,\"gameDefinitionId\":\"rock_1\",\"timestamp\":635985564736515200,\"currentNode\":\"242665b3c56c2\",\"coordonates\":{\"i\":2,\"j\":5}},{\"id\":46,\"gameDefinitionId\":\"missile_launcher\",\"timestamp\":636056632787423200,\"currentNode\":\"242617d2329ba\",\"coordonates\":{\"i\":7,\"j\":8}}]}";
	var whale = "{\"entitiesOnMap\":[{\"id\":7,\"gameDefinitionId\":\"attack_whale\",\"timestamp\":635985564039079800,\"currentNode\":\"242617d2329ba\",\"coordonates\":{\"i\":2,\"j\":2}},{\"id\":45,\"gameDefinitionId\":\"attack_whale\",\"timestamp\":636047731128763100,\"currentNode\":\"242617d2329ba\",\"coordonates\":{\"i\":7,\"j\":2}}]}";
	var updateUserDataResult = server.UpdateUserReadOnlyData({
        PlayFabId: currentPlayerId,
        Data: {
			"nextID":"47",
			"cityMap": city,
			"defMap": def,
			"whaleMap": whale,
			"mineMap": JSON.stringify(createEmptyMap())
        },
		Permission:"Public"
    });

	updateUserDataResult = server.UpdateUserData({
		PlayFabId: currentPlayerId,
        Data: {
			"name":"$no_name",
			"missile_data":""
        },
		Permission:"Public"
	});


	updateUserDataResult = server.UpdateUserData({
		PlayFabId: currentPlayerId,
        Data: {
			"tuto":"true"
        },
		Permission:"Private"
	});
};

/*
** Notifications functions
** NotificationType {
	friendship = 1,
	fight = 2,
	local = 4
}
*/

// Return the notification stored and clear them on the server
handlers.getNotifications = function(pArgs)
{
	var request = server.GetUserReadOnlyData({
		PlayFabId : currentPlayerId,
		Keys : ["Notifications"]
	});
	
	var notifications;
	var notificationsToKeep = {};
	
	if (!("Notifications" in request.Data) || !(request.Data.Notifications.Value)) // Notifications doesn't exist
	{
		notifications = {};
	}
	else
	{
		notifications = JSON.parse(request.Data.Notifications.Value);
		if (notifications.hasOwnProperty("requests"))
			notificationsToKeep = { requests: notifications.requests.filter(function (req) { return (req.type == 1); } /*friendship*/) };
	}
	
	server.UpdateUserReadOnlyData(
	{
		PlayFabId: currentPlayerId,
        Data: {
            "Notifications": notificationsToKeep
        },
		Permission:"Public"
	});
	
	return notifications;
};

// Return the array corresponding to the field described by pFieldName from the Notifications PlayerData
function getFieldFromNotifications(pPlayFabId, pFieldName)
{
	var notifications = server.GetUserReadOnlyData({
		PlayFabId : pPlayFabId,
		Keys : ["Notifications"]
	});
	
	if (!("Notifications" in notifications.Data) || !(notifications.Data.Notifications.Value))
		return [];
	
	var fields = JSON.parse(notifications.Data.Notifications.Value);
	
	if (!(fields.hasOwnProperty(pFieldName)))
		return [];
	
	return fields[pFieldName];
}

// Update the corresponding array into Notifications PlayerData
// Create Notifications in player data if didn't exist
function updateFieldInNotifications(pPlayFabId, pFieldName, pValue)
{
	var request = server.GetUserReadOnlyData({
		PlayFabId : pPlayFabId,
		Keys : ["Notifications"]
	});
	var notifications;
	
	if (!("Notifications" in request.Data) || !(request.Data.Notifications.Value)) // Notifications doesn't exist
		notifications = {};
	else
		notifications = JSON.parse(request.Data.Notifications.Value);
	
	notifications[pFieldName] = pValue;
	server.UpdateUserReadOnlyData(
	{
		PlayFabId: pPlayFabId,
        Data: {
            "Notifications": JSON.stringify(notifications)
        },
		Permission:"Public"
	});
}

/*
** Fight Request Function
*/

handlers.sendFightRequest = function(pArgs)
{
	var friendID = pArgs.FriendPlayFabID;
	var msg = pArgs.Message;
	
	var requests = getFieldFromNotifications(friendID, "requests");
	var alreadyRequested = false;
	
	for (var i = 0; i < requests.length; i++)
	{
		if (requests[i].type == 2 && requests[i].args.PlayFabID == friendID)
		{
			requests[i].timestamp = Date.now(); // update the timestamp
			alreadyRequested = true;
		}
	}
	
	if (alreadyRequested === false) {
		var data = server.GetUserData({
			PlayFabId: currentPlayerId,
			Keys: ["name"]
		});
	
		var now = Date.now();
		
		requests.push({
			type : 2, //2 == fight, cf BaseNotificationManager.cs => NotificationType
			args : {"PlayFabID" : currentPlayerId, "Username" : data.Data.name.Value},
			timestamp : now
		});
	}
	
	updateFieldInNotifications(friendID, "requests", requests);
	
	var error = "";
	
	try {	
		server.SendPushNotification(
		{
			Recipient: friendID,
			Message: msg
		});
	} catch (err) {
		error = err;
	}
	return {Success:true,Error:JSON.stringify(error)};
};

/*
** Friends functions
*/
handlers.getFriendsStatistics = function(args)
{
	var playfabID = args.PlayFabId.split(",");
	var playerStatistics = [];
	for (var i = 0; i < playfabID.length; i++)
	{
		playerStatistics[i] = server.GetPlayerStatistics({
			PlayFabId: playfabID[i],
			StatisticNames: [
				"Xp",
				"Rank"
			]
		});
		var info = server.GetUserAccountInfo({PlayFabId : playfabID[i]});
		playerStatistics[i]["TitleDisplayName"] = info.UserInfo.TitleInfo.DisplayName;
	}
	return {playerStatistics};
};

handlers.removeFriend = function(args)
{
	var friendId = args.FriendPlayFabId;
	var succeed = true;

	try {
		server.RemoveFriend({PlayFabId : currentPlayerId, FriendPlayFabId : friendId});
		server.RemoveFriend({PlayFabId : friendId, FriendPlayFabId : currentPlayerId});
	}
	catch (err) {
		succeed = false;
	}

	return {hasBeenRemoved:succeed};
};

handlers.removeFriendRequest = function(args)
{
	var friendId = args.FriendPlayFabId;

	var result = removeFriendFromRequests(currentPlayerId, friendId);

	return {hasBeenRemoved:result};
};

handlers.addFriend = function(args)
{
	var playfabIDSender = currentPlayerId;
	var playfabIDReceiver = args.FriendPlayFabId;

	var friendshipAccepted = false;
	if (checkIfPlayerRequestedFriendship(playfabIDSender, playfabIDReceiver) === true)
	{
		try {
		server.AddFriend({PlayFabId : playfabIDSender, FriendPlayFabId : playfabIDReceiver});
		} catch(e) {}
		try {
		server.AddFriend({PlayFabId : playfabIDReceiver, FriendPlayFabId : playfabIDSender});
		} catch(e) {}

		removeFriendFromRequests(playfabIDSender, playfabIDReceiver);
		friendshipAccepted = true;
	}
	else {
		addFriendToRequest(playfabIDReceiver, playfabIDSender);
	}
	return {isNowFriend:friendshipAccepted};
};

function checkIfPlayerRequestedFriendship(pPlayerId, pPlayerIdToCheck)
{
	var requests = getFieldFromNotifications(pPlayerId, "requests");
	
	for (var i = 0; i < requests.length; i++)
	{
		if (requests[i].type == 1 && requests[i].args.PlayFabID == pPlayerIdToCheck)
			return true;
	}
	return false;
}

function addFriendToRequest(pFriendID, pPlayerID)
{
	var requests = getFieldFromNotifications(pFriendID, "requests");

	for (var i = 0; i < requests.length; i++)
	{
		if (requests[i].type == 1 && requests[i].args.PlayFabID == pPlayerID) // User already in friend request list
			return;
	}
	
	requests.push({
		type : 1, //1 == friendship, cf BaseNotificationManager.cs => NotificationType
		args : {"PlayFabID" : pPlayerID}
	});

	updateFieldInNotifications(pFriendID, "requests", requests);
}

function removeFriendFromRequests(pPlayerID, pFriendID)
{
	var requests = getFieldFromNotifications(pPlayerID, "requests");

	var found = false;
	for (var i = 0; i < requests.length; i++)
	{
		if (requests[i].type == 1 && requests[i].args.PlayFabID == pFriendID)
		{
			requests.splice(i, 1);
			found = true;
			break;
		}
	}
	if (found === true)
	{
		updateFieldInNotifications(pPlayerID, "requests", requests);
	}
	return found;
}

handlers.addCityBuilding = function(args)
{
	var entity = args;
	var playerData = getPlayerDataForMap("cityMap");

	var playerDataCityMap;
	if(playerData.Data["cityMap"] === undefined)
		playerDataCityMap = createEmptyMap();
	else
		playerDataCityMap = JSON.parse(playerData.Data["cityMap"].Value);

	playerDataCityMap.entitiesOnMap.push(entity);

	var nextID = parseInt(playerData.Data["nextID"].Value);
	nextID++;

	server.UpdateUserReadOnlyData({
        PlayFabId: currentPlayerId,
        Data: {
            "cityMap": JSON.stringify(playerDataCityMap),
			"nextID": nextID + ""
        },
		Permission:"Public"
    });
	return {idcheck:nextID};
};

handlers.removeCityBuilding =function(args)
{
	var entityID = args;
	var playerData = getPlayerDataForMap("cityMap");

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
		server.UpdateUserReadOnlyData({
			PlayFabId: currentPlayerId,
			Data: {
			    "cityMap": JSON.stringify(playerDataMap)
			},
			Permission:"Public"
		});
	}

	return {hasBeenRemoved:found};
};

handlers.addDefBuilding =function(args)
{
	var entity = args;
	var playerData = getPlayerDataForMap("defMap");

	var playerDataCityMap;
	if(playerData.Data["defMap"] === undefined)
		playerDataCityMap = createEmptyMap();
	else
		playerDataCityMap = JSON.parse(playerData.Data["defMap"].Value);

	playerDataCityMap.entitiesOnMap.push(entity);

	var nextID = parseInt(playerData.Data["nextID"].Value);
	nextID++;

	server.UpdateUserReadOnlyData({
        PlayFabId: currentPlayerId,
        Data: {
            "defMap": JSON.stringify(playerDataCityMap),
			"nextID": nextID + ""
        },
		Permission:"Public"
    });
	return {idcheck:nextID};
};

handlers.removeDefBuilding =function(args)
{
	var entityID = args;
	var playerData = getPlayerDataForMap("defMap");

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
		server.UpdateUserReadOnlyData({
			PlayFabId: currentPlayerId,
			Data: {
			    "defMap": JSON.stringify(playerDataMap)
			},
			Permission:"Public"
		});
	}

	return {hasBeenRemoved:found};
};

handlers.addWhaleBuilding =function(args)
{
	var entity = args;
	var playerData = getPlayerDataForMap("whaleMap");

	var playerDataCityMap;
	if(playerData.Data["whaleMap"] === undefined)
		playerDataCityMap = createEmptyMap();
	else
		playerDataCityMap = JSON.parse(playerData.Data["whaleMap"].Value);

	playerDataCityMap.entitiesOnMap.push(entity);

	var nextID = parseInt(playerData.Data["nextID"].Value);
	nextID++;

	server.UpdateUserReadOnlyData({
        PlayFabId: currentPlayerId,
        Data: {
            "whaleMap": JSON.stringify(playerDataCityMap),
			"nextID": nextID + ""
        },
		Permission:"Public"
    });
	return {idcheck:nextID};
};

handlers.removeWhaleBuilding =function(args)
{
	var entityID = args;
	var playerData = getPlayerDataForMap("whaleMap");

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
		server.UpdateUserReadOnlyData({
			PlayFabId: currentPlayerId,
			Data: {
			    "whaleMap": JSON.stringify(playerDataMap)
			},
			Permission:"Public"
		});
	}

	return {hasBeenRemoved:found};
};

handlers.addMineBuilding =function(args)
{
	var entity = args;
	var playerData = getPlayerDataForMap("mineMap");

	var playerDataCityMap;
	if(playerData.Data["mineMap"] === undefined)
		playerDataCityMap = createEmptyMap();
	else
		playerDataCityMap = JSON.parse(playerData.Data["mineMap"].Value);

	playerDataCityMap.entitiesOnMap.push(entity);

	var nextID = parseInt(playerData.Data["nextID"].Value);
	nextID++;

	server.UpdateUserReadOnlyData({
        PlayFabId: currentPlayerId,
        Data: {
            "mineMap": JSON.stringify(playerDataCityMap),
			"nextID": nextID + ""
        },
		Permission:"Public"
    });
	return {idcheck:nextID};
};

handlers.removeMineBuilding =function(args)
{
	var entityID = args;
	var playerData = getPlayerDataForMap("mineMap");

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
		server.UpdateUserReadOnlyData({
			PlayFabId: currentPlayerId,
			Data: {
			    "mineMap": JSON.stringify(playerDataMap)
			},
			Permission:"Public"
		});
	}

	return {hasBeenRemoved:found};
};

handlers.addMantaBuilding = function (args)
{
    var entity = args;
    var playerData = getPlayerDataForMap("mantaMap");

    var playerDataCityMap;
    if (playerData.Data["mantaMap"] === undefined)
        playerDataCityMap = createEmptyMap();
    else
        playerDataCityMap = JSON.parse(playerData.Data["mantaMap"].Value);

    playerDataCityMap.entitiesOnMap.push(entity);

    var nextID = parseInt(playerData.Data["nextID"].Value);
    nextID++;

    server.UpdateUserReadOnlyData({
        PlayFabId: currentPlayerId,
        Data: {
            "mantaMap": JSON.stringify(playerDataCityMap),
            "nextID": nextID + ""
        },
        Permission: "Public"
    });
    return { idcheck: nextID };
};

handlers.removeMantaBuilding = function (args)
{
    var entityID = args;
    var playerData = getPlayerDataForMap("mantaMap");

    var playerDataMap = JSON.parse(playerData.Data["mantaMap"].Value);

    var found = false;
    for (var i = playerDataMap.entitiesOnMap.length - 1 ; i >= 0; i--) {
        if (playerDataMap.entitiesOnMap[i].id == entityID.id) {
            playerDataMap.entitiesOnMap.splice(i, 1);
            found = true;
            break;
        }
    }
    if (found) {
        server.UpdateUserReadOnlyData({
            PlayFabId: currentPlayerId,
            Data: {
                "mantaMap": JSON.stringify(playerDataMap)
            },
            Permission: "Public"
        });
    }

    return { hasBeenRemoved: found };
};

handlers.changeStateEntity = function (args)
{
	return changeStateEntity(args);
};

function changeStateEntity(args)
{
	var mapKey = "cityMap";
	if (args.mapType == 1)//MapType.Defense)
		mapKey = "defMap";
	if (args.mapType == 2)//MapType.Whale)
		mapKey = "whaleMap";
	if (args.mapType == 3)//MapType.Mine)
		mapKey = "mineMap";
	if (args.mapType == 4)//MapType.Manta)
	    mapKey = "mantaMap";

	var playerData = getPlayerDataForMap(mapKey);

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
		server.UpdateUserReadOnlyData({
			PlayFabId: currentPlayerId,
			Data: data,
			Permission:"Public"
		});
		return true;
	}
	return false;
}

handlers.moveEntity = function(args)
{
	return moveEntity(args);
};

function moveEntity(args)
{
	var mapKey = "cityMap";
	if (args.mapType == 1)//MapType.Defense)
		mapKey = "defMap";
	if (args.mapType == 2)//MapType.Whale)
		mapKey = "whaleMap";
	if (args.mapType == 3)//MapType.Mine)
		mapKey = "mineMap";
	if (args.mapType == 4)//MapType.Manta)
	    mapKey = "mantaMap";

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
		server.UpdateUserReadOnlyData({
			PlayFabId: currentPlayerId,
			Data: data,
			Permission:"Public"
		});
		return true;
	}
	return false;
}
// player id = currentPlayerId

// Incoming Data's
// public Dictionary<string, string> UserDataCalls;
// public UpdateUserStatisticsRequest PlayerStatsCalls;
// public Dictionary<string, float> CurrencyChange;
// public Dictionary<string, List<object>> UserReadOnlyDataCalls;
handlers.UpdateUserMultipleData =function(args)
{
	// Update Player Stats
	var PlayerStatsCalls = args.PlayerStatsCalls;
	var result = server.UpdatePlayerStatistics({
		PlayFabId: currentPlayerId,
		Statistics: PlayerStatsCalls.Statistics
	});
	// Update UserData
	var UserDataCalls = args.UserDataCalls;
	if (Object.keys(UserDataCalls).length > 0)
	{
		result = server.UpdateUserData({
			PlayFabId: currentPlayerId,
			Data : UserDataCalls,
			Permission: "Public"
		});
	}

	// Update Currencies
	var CurrencyChange = args.CurrencyChange;
	if (Object.keys(CurrencyChange).length > 0)
	{
		for (var key in CurrencyChange) {
			var value = CurrencyChange[key];
			// key = currency
			// value = value to change
			if(value > 0)
			{
				result = server.AddUserVirtualCurrency({
					PlayFabId: currentPlayerId,
					VirtualCurrency: key,
					Amount: value
				});
			}
			else if (value < 0)
			{
				value *= -1;
				result = server.SubtractUserVirtualCurrency({
					PlayFabId: currentPlayerId,
					VirtualCurrency: key,
					Amount: value
				});
			}
		}
	}

	// Update UserReadOnlyData
	var UserReadOnlyDataCalls = args.UserReadOnlyDataCalls;
	if (Object.keys(UserReadOnlyDataCalls).length > 0)
	{
		for (var key in UserReadOnlyDataCalls) {

			if (key == "moveEntity" )
			{
				for (var paramKey in UserReadOnlyDataCalls[key]) {
					var paramValue = UserReadOnlyDataCalls[key][paramKey];
					result = moveEntity(paramValue);
				}
			}
			if (key == "changeStateEntity" )
			{
				for (var paramKey in UserReadOnlyDataCalls[key]) {
					var paramValue = UserReadOnlyDataCalls[key][paramKey];
					result = changeStateEntity(paramValue);
				}
			}
		}

	}

	return result;
};


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
};

// Triggered automatically when a player joins a Photon room
handlers.RoomJoined = function (args) {
    log.debug("Room Joined - Game: " + args.GameId + " PlayFabId: " + args.UserId);
};

// Triggered automatically when a player leaves a Photon room
handlers.RoomLeft = function (args) {
    log.debug("Room Left - Game: " + args.GameId + " PlayFabId: " + args.UserId);
};

// Triggered automatically when a Photon room closes
// Note: currentPlayerId is undefined in this function
handlers.RoomClosed = function (args) {
    log.debug("Room Closed - Game: " + args.GameId);
};

// Triggered automatically when a Photon room game property is updated.
// Note: currentPlayerId is undefined in this function
handlers.RoomPropertyUpdated = function (args) {
    log.debug("Room Property Updated - Game: " + args.GameId);
};

// Triggered by calling "OpRaiseEvent" on the Photon client. The "args.Data" property is
// set to the value of the "customEventContent" HashTable parameter, so you can use
// it to pass in arbitrary data.
handlers.RoomEventRaised = function (args) {
    var eventData = args.Data;
    log.debug("Event Raised - Game: " + args.GameId + " Event Type: " + eventData.eventType);
};

handlers.onFightOver = function (args) {
	if(args.opponentID === "")
		return 0;
	rewardPlayer(currentPlayerId, args.hasWon, args.isDefender);
	rewardPlayer(args.opponentID, !args.hasWon, !args.isDefender);
	return 1;
};

function getFightStat(playerId, stats)
{
	var playerStats = server.GetPlayerStatistics({
		PlayFabId: playerId,
		StatisticNames: stats
		});

	return playerStats;
}

function rewardPlayer(playerId, hasWon, isDefending)
{
	var stats = [
			"score",
			"win_streak",
			"total_win",
			"defeat_streak",
			"total_fight",
			"Rank",
			"best_rank"
		  ];

	var playerStats = getFightStat(playerId, stats);
	var score = 0;
	var winStreak =0; //playerStats.Statistics["win_streak"];
	var totalWin = 0;//playerStats.Statistics["total_win"];
	var defeatStreak = 0;//playerStats.Statistics["defeat_streak"];
	var totalFight = 0;//playerStats.Statistics["total_fight"];
	var rank = 0;//playerStats.Statistics["Rank"];
	var bestRank = 0;//playerStats.Statistics["best_rank"];
	for(var i=0; i<playerStats.Statistics.length; i++)
	{
		if(playerStats.Statistics[i].StatisticName == "score")
		{
			score =playerStats.Statistics[i].Value;
		}
		else if(playerStats.Statistics[i].StatisticName == "win_streak")
		{
			winStreak =playerStats.Statistics[i].Value;
		}
		else if(playerStats.Statistics[i].StatisticName == "defeat_streak")
		{
			defeatStreak =playerStats.Statistics[i].Value;
		}
		else if(playerStats.Statistics[i].StatisticName == "total_fight")
		{
			totalFight =playerStats.Statistics[i].Value;
		}
		else if(playerStats.Statistics[i].StatisticName == "total_win")
		{
			totalWin =playerStats.Statistics[i].Value;
		}
		else if(playerStats.Statistics[i].StatisticName == "Rank")
		{
			rank =playerStats.Statistics[i].Value;
		}
		else if(playerStats.Statistics[i].StatisticName == "best_rank")
		{
			bestRank =playerStats.Statistics[i].Value;
		}
	}
	totalFight+=1;

	if( hasWon )
	{
		totalWin+=1;
		winStreak+=1;
		defeatStreak=0;
		rank += 1; //cost was paid at the start of the fight if rank was > 11
		score+= 1000;
		if(winStreak >=5)
			score += 250;
	}
	else
	{
		winStreak=0;
		defeatStreak+=1;
		score += -250;
		rank -= rank>10?1:0;
		if(defeatStreak >=5)
			score += -250;
		if(score < 0 )
			score = 0;
	}

	if(bestRank < rank)
		bestRank = rank;

	var toUpdate = [
		{
		  StatisticName: "score",
		  Value: score
		},
		{
		  StatisticName: "win_streak",
		  Value: winStreak
		},
		{
		  StatisticName: "total_win",
		  Value: totalWin
		},
		{
		  StatisticName: "defeat_streak",
		  Value: defeatStreak
		},
		{
		  StatisticName: "Rank",
		  Value: rank
		},
		{
		  StatisticName: "total_fight",
		  Value: totalFight
		},
		{
		  StatisticName: "best_rank",
		  Value: bestRank
		}

	];

	server.UpdatePlayerStatistics(
	{
	  PlayFabId: playerId,
	  Statistics: toUpdate
	});
}