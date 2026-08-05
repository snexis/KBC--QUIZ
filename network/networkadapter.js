/**
 * KBC PREMIUM - Network & Edge Sync Adapter Module
 * Architecture: ES5 Compatible / Edge Data Sync / Autonomous RTP & Admin Override / Google Apps Script Integration
 */

(function () {
    'use strict';

    // Global Configuration
    // নোট: গুগল অ্যাপস স্ক্রিপ্ট ডিপ্লয় করার পর যে URLটি পাবেন, সেটি নিচের উদ্ধৃতি চিহ্নের ("") ভেতরে বসাবেন।
    var WEB_APP_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE"; 
    var SECRET_KEY = "MyKbcSecret2026"; // গুগল অ্যাপস স্ক্রিপ্টের সাথে মেলানো পাসকোড

    // Global Network State & Storage Keys
    var STORAGE_KEYS = {
        PLAYERS: 'kbc_players',
        GLOBAL_RTP: 'kbc_global_rtp',
        NETWORK_SYNC: 'kbc_network_sync_timestamp',
        PENDING_LOGS: 'kbc_pending_network_logs'
    };

    // Default RTP Configuration (Default: 80% / 0.8)
    var DEFAULT_RTP = 0.8;

    // Check if Secret Debug Mode is active in URL (e.g., yoursite.com/?debug=true)
    var IS_DEBUG_MODE = window.location.search.indexOf('debug=true') !== -1;

    // Initialize Network Adapter Module
    function initNetworkAdapter() {
        setupOnlineOfflineListeners();
        setupPopupUI();
        setupDebugBannerUI();
        initDefaultStorage();
        startDataSyncScheduler();
        if (IS_DEBUG_MODE) {
            showDebugLog("Network Adapter Debug Mode Active!");
        }
    }

    // Default Local Storage Setup
    function initDefaultStorage() {
        if (!localStorage.getItem(STORAGE_KEYS.PLAYERS)) {
            localStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify([]));
        }
        if (!localStorage.getItem(STORAGE_KEYS.GLOBAL_RTP)) {
            localStorage.setItem(STORAGE_KEYS.GLOBAL_RTP, JSON.stringify({ rtp: DEFAULT_RTP, updatedAt: Date.now() }));
        }
        if (!localStorage.getItem(STORAGE_KEYS.PENDING_LOGS)) {
            localStorage.setItem(STORAGE_KEYS.PENDING_LOGS, JSON.stringify([]));
        }
    }

    // Dynamic Online Warning UI Generation
    function setupPopupUI() {
        if (document.getElementById('kbc-net-modal')) return;

        var modalHtml = 
            '<div id="kbc-net-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(8px); z-index: 999999; justify-content: center; align-items: center; font-family: sans-serif;">' +
                '<div style="background: #1e293b; border: 2px solid #ef4444; border-radius: 16px; padding: 30px; width: 90%; max-width: 420px; text-align: center; box-shadow: 0 0 30px rgba(239, 68, 68, 0.4); color: #ffffff;">' +
                    '<div style="font-size: 48px; margin-bottom: 10px;">📡</div>' +
                    '<h2 style="color: #ef4444; margin: 0 0 10px 0; font-size: 22px; font-weight: bold;">Connection Lost!</h2>' +
                    '<p style="color: #cbd5e1; font-size: 14px; line-height: 1.5; margin-bottom: 20px;">' +
                        'Please check your internet connection. <br>' +
                        '<span style="color: #ffd700; font-size: 12px;">KBC Live Game Server Syncing Paused...</span>' +
                    '</p>' +
                    '<button id="kbc-net-retry-btn" onclick="window.KBCNetworkAdapter.checkConnectionManual()" style="background: linear-gradient(135deg, #ef4444, #b91c1c); color: #ffffff; border: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 14px; width: 100%; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);">' +
                        '🔄 Retry Connection' +
                    '</button>' +
                '</div>' +
            '</div>';

        var div = document.createElement('div');
        div.innerHTML = modalHtml;
        document.body.appendChild(div.firstChild);
    }

    // Setup Debug Toast Notification UI
    function setupDebugBannerUI() {
        if (document.getElementById('kbc-debug-box')) return;
        var debugDiv = document.createElement('div');
        debugDiv.id = 'kbc-debug-box';
        debugDiv.style.cssText = 'display: none; position: fixed; bottom: 10px; right: 10px; background: rgba(0,0,0,0.85); color: #00ffcc; border: 1px solid #00ffcc; padding: 10px 14px; border-radius: 8px; font-size: 12px; font-family: monospace; z-index: 9999999; max-width: 320px; word-wrap: break-word; box-shadow: 0 4px 10px rgba(0,0,0,0.5);';
        document.body.appendChild(debugDiv);
    }

    // Show Debug Log on Screen when ?debug=true
    function showDebugLog(msg) {
        if (!IS_DEBUG_MODE) return;
        var box = document.getElementById('kbc-debug-box');
        if (box) {
            box.style.display = 'block';
            box.innerText = '⚙️ [KBC Debug]: ' + msg;
            console.log('[KBC Network Log]:', msg);
        }
    }

    // Listen for Online and Offline Browser Events
    function setupOnlineOfflineListeners() {
        window.addEventListener('online', handleNetworkOnline);
        window.addEventListener('offline', handleNetworkOffline);

        // Initial check on page load
        if (!navigator.onLine) {
            handleNetworkOffline();
        }
    }

    function handleNetworkOffline() {
        var modal = document.getElementById('kbc-net-modal');
        if (modal) {
            modal.style.display = 'flex';
        }
        showDebugLog("App is Offline");
    }

    function handleNetworkOnline() {
        var modal = document.getElementById('kbc-net-modal');
        if (modal) {
            modal.style.display = 'none';
        }
        showDebugLog("App is Online. Attempting Sync...");
        syncPendingData();
    }

    // Core HTTP Request Handler to Google Apps Script Web App
    function sendHttpRequest(actionType, payloadData, callback) {
        if (!navigator.onLine) {
            showDebugLog("Cannot send HTTP request. Offline mode.");
            if (callback) callback({ status: "offline", message: "Internet connection offline" });
            return;
        }

        if (!WEB_APP_URL || WEB_APP_URL === "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE") {
            showDebugLog("Web App URL is not set in networkAdapter.js!");
            if (callback) callback({ status: "error", message: "Google Web App URL Missing" });
            return;
        }

        var requestData = {
            action: actionType,
            secretKey: SECRET_KEY
        };

        // Merge payload attributes
        for (var attrname in payloadData) {
            if (payloadData.hasOwnProperty(attrname)) {
                requestData[attrname] = payloadData[attrname];
            }
        }

        showDebugLog("Sending Action: " + actionType);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", WEB_APP_URL, true);
        xhr.setRequestHeader("Content-Type", "text/plain;charset=utf-8");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        var response = JSON.parse(xhr.responseText);
                        showDebugLog("Server Responded: " + response.status);
                        if (callback) callback(response);
                    } catch (e) {
                        showDebugLog("JSON Response Error: " + e.message);
                        if (callback) callback({ status: "error", message: "Invalid JSON server response" });
                    }
                } else {
                    showDebugLog("HTTP Error Code: " + xhr.status);
                    if (callback) callback({ status: "error", message: "Server connection failed HTTP " + xhr.status });
                }
            }
        };

        xhr.onerror = function () {
            showDebugLog("Network Error Occurred during request");
            if (callback) callback({ status: "error", message: "Network connection error" });
        };

        xhr.send(JSON.stringify(requestData));
    }

    // Timeset Data-Sync Scheduler Engine
    function startDataSyncScheduler() {
        setInterval(function () {
            if (navigator.onLine) {
                syncPendingData();
            }
        }, 10000); // Syncs every 10 seconds
    }

    // Sync Data with Edge Storage & Server
    function syncPendingData() {
        var now = Date.now();
        localStorage.setItem(STORAGE_KEYS.NETWORK_SYNC, now.toString());

        try {
            var pendingLogs = JSON.parse(localStorage.getItem(STORAGE_KEYS.PENDING_LOGS)) || [];
            if (pendingLogs.length > 0 && navigator.onLine) {
                var logToSync = pendingLogs[0];
                sendHttpRequest(logToSync.action, logToSync.data, function (res) {
                    if (res && res.status === 'success') {
                        pendingLogs.shift(); // Remove successfully sent log
                        localStorage.setItem(STORAGE_KEYS.PENDING_LOGS, JSON.stringify(pendingLogs));
                        showDebugLog("Synced 1 pending offline item.");
                    }
                });
            }
        } catch (e) {
            showDebugLog("Sync Error: " + e.message);
        }
    }

    // Manual Retry Button Action
    function checkConnectionManual() {
        if (navigator.onLine) {
            handleNetworkOnline();
        } else {
            var btn = document.getElementById('kbc-net-retry-btn');
            if (btn) {
                var originalText = btn.innerText;
                btn.innerText = 'Connecting...';
                setTimeout(function () {
                    btn.innerText = originalText;
                    if (!navigator.onLine) {
                        alert('সার্ভারে সাথে সংযোগ করা যাচ্ছে না! দয়া করে ইন্টারনেট কানেকশন চালু করুন।');
                    }
                }, 1500);
            }
        }
    }

    // Check if player is blocked by Admin
    function isPlayerBlocked(phone) {
        if (!phone) return false;
        try {
            var players = JSON.parse(localStorage.getItem(STORAGE_KEYS.PLAYERS)) || [];
            for (var i = 0; i < players.length; i++) {
                if (players[i].phone === phone || players[i].id === phone) {
                    return !!players[i].isBlocked || players[i].status === 'Blocked';
                }
            }
        } catch (e) {
            showDebugLog('Error checking player status: ' + e.message);
        }
        return false;
    }

    // Centralized Helper for Admin Dashboard Statistics (Supports Local + Live Network Data)
    function getAdminDashboardStats(callback) {
        // Fallback Local Storage Data First
        var localPlayers = [];
        try {
            localPlayers = JSON.parse(localStorage.getItem(STORAGE_KEYS.PLAYERS)) || [];
        } catch (e) {
            localPlayers = [];
        }

        var activeCount = 0;
        for (var i = 0; i < localPlayers.length; i++) {
            var p = localPlayers[i];
            var isBlocked = p.isBlocked || p.status === 'Blocked';
            if (!isBlocked) {
                activeCount++;
            }
        }

        var fallbackResult = {
            totalPlayers: localPlayers.length,
            activeSessions: activeCount,
            totalQuestions: 0
        };

        // If online and callback is provided, attempt live fetch from Google Sheets
        if (navigator.onLine && callback) {
            sendHttpRequest("GET_DASHBOARD", {}, function (res) {
                if (res && res.status === "success") {
                    callback({
                        totalPlayers: res.totalPlayers || fallbackResult.totalPlayers,
                        activeSessions: fallbackResult.activeSessions,
                        totalQuestions: res.totalQuestions || 0
                    });
                } else {
                    callback(fallbackResult);
                }
            });
        } else if (callback) {
            callback(fallbackResult);
        }

        return fallbackResult;
    }

    // Register Player Functionality
    function registerPlayer(userId, name, score, callback) {
        var playerData = {
            userId: userId,
            name: name,
            score: score || 0,
            date: new Date().toLocaleString()
        };

        // Save locally
        try {
            var players = JSON.parse(localStorage.getItem(STORAGE_KEYS.PLAYERS)) || [];
            players.push(playerData);
            localStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify(players));
        } catch (e) {
            showDebugLog("Local Storage Error on player register");
        }

        // Send to Server or add to pending queue
        if (navigator.onLine) {
            sendHttpRequest("REGISTER_PLAYER", playerData, function (res) {
                if (callback) callback(res);
            });
        } else {
            var pendingLogs = JSON.parse(localStorage.getItem(STORAGE_KEYS.PENDING_LOGS)) || [];
            pendingLogs.push({ action: "REGISTER_PLAYER", data: playerData });
            localStorage.setItem(STORAGE_KEYS.PENDING_LOGS, JSON.stringify(pendingLogs));
            if (callback) callback({ status: "queued", message: "Saved offline. Will sync when online." });
        }
    }

    // Global Public API Methods
    window.KBCNetworkAdapter = {
        init: initNetworkAdapter,
        checkConnectionManual: checkConnectionManual,
        isPlayerBlocked: isPlayerBlocked,
        getAdminStats: getAdminDashboardStats,
        registerPlayer: registerPlayer,
        sendHttpRequest: sendHttpRequest,
        getRTP: function () {
            try {
                var data = JSON.parse(localStorage.getItem(STORAGE_KEYS.GLOBAL_RTP));
                return data ? data.rtp : DEFAULT_RTP;
            } catch (e) {
                return DEFAULT_RTP;
            }
        },
        setRTP: function (rtpVal) {
            localStorage.setItem(STORAGE_KEYS.GLOBAL_RTP, JSON.stringify({
                rtp: parseFloat(rtpVal) || DEFAULT_RTP,
                updatedAt: Date.now()
            }));
        }
    };

    // Auto Run on Load
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initNetworkAdapter();
    } else {
        document.addEventListener('DOMContentLoaded', initNetworkAdapter);
    }

})();
