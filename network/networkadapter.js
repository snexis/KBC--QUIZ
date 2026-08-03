/**
 * KBC PREMIUM - Network & Edge Sync Adapter Module
 * Architecture: ES5 Compatible / Edge Data Sync / Autonomous RTP & Admin Override
 */

(function () {
    'use strict';

    // Global Network State & Storage Keys
    var STORAGE_KEYS = {
        PLAYERS: 'kbc_players',
        GLOBAL_RTP: 'kbc_global_rtp',
        NETWORK_SYNC: 'kbc_network_sync_timestamp',
        PENDING_LOGS: 'kbc_pending_network_logs'
    };

    // Default RTP Configuration (Default: 80% / 0.8)
    var DEFAULT_RTP = 0.8;

    // Initialize Network Adapter Module
    function initNetworkAdapter() {
        setupOnlineOfflineListeners();
        setupPopupUI();
        initDefaultStorage();
        startDataSyncScheduler();
    }

    // Default Local Storage Setup
    function initDefaultStorage() {
        if (!localStorage.getItem(STORAGE_KEYS.PLAYERS)) {
            localStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify([]));
        }
        if (!localStorage.getItem(STORAGE_KEYS.GLOBAL_RTP)) {
            localStorage.setItem(STORAGE_KEYS.GLOBAL_RTP, JSON.stringify({ rtp: DEFAULT_RTP, updatedAt: Date.now() }));
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
    }

    function handleNetworkOnline() {
        var modal = document.getElementById('kbc-net-modal');
        if (modal) {
            modal.style.display = 'none';
        }
        syncPendingData();
    }

    // Timeset Data-Sync Scheduler Engine
    function startDataSyncScheduler() {
        setInterval(function () {
            if (navigator.onLine) {
                syncPendingData();
            }
        }, 10000); // Syncs every 10 seconds
    }

    // Sync Data with Edge Storage
    function syncPendingData() {
        var now = Date.now();
        localStorage.setItem(STORAGE_KEYS.NETWORK_SYNC, now.toString());
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
            console.error('Error checking player status:', e);
        }
        return false;
    }

    // Centralized Helper for Admin Dashboard Statistics
    function getAdminDashboardStats() {
        try {
            var players = JSON.parse(localStorage.getItem(STORAGE_KEYS.PLAYERS)) || [];
            var activeCount = 0;
            for (var i = 0; i < players.length; i++) {
                var p = players[i];
                var isBlocked = p.isBlocked || p.status === 'Blocked';
                if (!isBlocked) {
                    activeCount++;
                }
            }
            return {
                totalPlayers: players.length,
                activeSessions: activeCount
            };
        } catch (e) {
            return { totalPlayers: 0, activeSessions: 0 };
        }
    }

    // Global Public API Methods
    window.KBCNetworkAdapter = {
        init: initNetworkAdapter,
        checkConnectionManual: checkConnectionManual,
        isPlayerBlocked: isPlayerBlocked,
        getAdminStats: getAdminDashboardStats,
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
