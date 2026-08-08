var SECRET_KEY = "MyKbcSecret2026";

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    if (data.secretKey !== SECRET_KEY) {
      return jsonResponse({ status: "error", message: "Unauthorized Secret Key" });
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var action = data.action;

    if (action === "REGISTER_PLAYER") return registerPlayer(ss, data);
    if (action === "LOGIN_USER") return loginUser(ss, data);
    if (action === "GET_DASHBOARD") return getDashboard(ss);
    if (action === "GET_PLAYERS") return getPlayers(ss);
    if (action === "UPDATE_PLAYER_STATUS") return updatePlayerStatus(ss, data);
    if (action === "DELETE_PLAYER") return deletePlayer(ss, data);
    if (action === "UPDATE_TRIAL_DAYS") return updateTrialDays(ss, data);

    return jsonResponse({ status: "error", message: "Invalid action" });

  } catch (error) {
    return jsonResponse({ status: "error", message: error.toString() });
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Columns: A=UserID, B=Name, C=Phone, D=Password, E=Score, F=Date, G=Status, H=TrialDays, I=RegTimestamp
function getPlayersSheet(ss) {
  var sheet = ss.getSheetByName("Players");
  if (!sheet) {
    sheet = ss.insertSheet("Players");
    sheet.appendRow(["User ID", "Name", "Phone", "Password", "Score", "Date", "Status", "Trial Days", "Reg Timestamp"]);
  }
  return sheet;
}

// Registers a NEW player only. If the username already exists, returns an error
// (so the app can tell the player to pick a different username).
function registerPlayer(ss, data) {
  var sheet = getPlayersSheet(ss);
  var values = sheet.getDataRange().getValues();

  for (var i = 1; i < values.length; i++) {
    if (values[i][0] === data.userId) {
      return jsonResponse({ status: "error", message: "Username already exists" });
    }
  }

  sheet.appendRow([
    data.userId || "",
    data.name || "",
    data.phone || "",
    data.password || "",
    data.score || 0,
    data.date || new Date().toLocaleString(),
    "Active",
    data.trialDays || 5,
    data.regTimestamp || Date.now()
  ]);

  return jsonResponse({ status: "success", message: "Player registered successfully" });
}

// Verifies username + password against the Sheet. Works from ANY device,
// since the Sheet is the single shared source of truth.
function loginUser(ss, data) {
  var sheet = getPlayersSheet(ss);
  var values = sheet.getDataRange().getValues();

  for (var i = 1; i < values.length; i++) {
    if (values[i][0] === data.userId) {
      if (values[i][6] === "Blocked") {
        return jsonResponse({ status: "blocked", message: "This account has been blocked by admin" });
      }
      if (values[i][3] === data.password) {
        return jsonResponse({
          status: "success",
          player: {
            userId: values[i][0],
            name: values[i][1],
            phone: values[i][2],
            score: values[i][4],
            trialDays: values[i][7],
            regTimestamp: values[i][8]
          }
        });
      } else {
        return jsonResponse({ status: "error", message: "Wrong password" });
      }
    }
  }

  return jsonResponse({ status: "error", message: "User not found" });
}

function getDashboard(ss) {
  var pSheet = ss.getSheetByName("Players");
  var totalPlayers = pSheet ? Math.max(0, pSheet.getLastRow() - 1) : 0;

  var qSheet = ss.getSheetByName("Questions");
  var totalQuestions = qSheet ? Math.max(0, qSheet.getLastRow() - 1) : 0;

  return jsonResponse({ status: "success", totalPlayers: totalPlayers, totalQuestions: totalQuestions });
}

function getPlayers(ss) {
  var sheet = ss.getSheetByName("Players");
  if (!sheet || sheet.getLastRow() < 2) {
    return jsonResponse({ status: "success", players: [] });
  }
  var values = sheet.getDataRange().getValues();
  var players = [];
  for (var i = 1; i < values.length; i++) {
    players.push({
      userId: values[i][0],
      name: values[i][1],
      phone: values[i][2],
      score: values[i][4],
      date: values[i][5],
      status: values[i][6],
      trialDays: values[i][7]
    });
  }
  return jsonResponse({ status: "success", players: players });
}

function updatePlayerStatus(ss, data) {
  var sheet = ss.getSheetByName("Players");
  if (!sheet) return jsonResponse({ status: "error", message: "Players sheet not found" });
  var values = sheet.getDataRange().getValues();
  for (var i = 1; i < values.length; i++) {
    if (values[i][0] === data.userId) {
      sheet.getRange(i + 1, 7).setValue(data.status || "Active");
      return jsonResponse({ status: "success" });
    }
  }
  return jsonResponse({ status: "error", message: "Player not found" });
}

function deletePlayer(ss, data) {
  var sheet = ss.getSheetByName("Players");
  if (!sheet) return jsonResponse({ status: "error", message: "Players sheet not found" });
  var values = sheet.getDataRange().getValues();
  for (var i = 1; i < values.length; i++) {
    if (values[i][0] === data.userId) {
      sheet.deleteRow(i + 1);
      return jsonResponse({ status: "success" });
    }
  }
  return jsonResponse({ status: "error", message: "Player not found" });
}

// Admin: extend or set a specific player's trial days
function updateTrialDays(ss, data) {
  var sheet = ss.getSheetByName("Players");
  if (!sheet) return jsonResponse({ status: "error", message: "Players sheet not found" });
  var values = sheet.getDataRange().getValues();
  for (var i = 1; i < values.length; i++) {
    if (values[i][0] === data.userId) {
      sheet.getRange(i + 1, 8).setValue(data.trialDays || 5);
      return jsonResponse({ status: "success" });
    }
  }
  return jsonResponse({ status: "error", message: "Player not found" });
}
