// ==UserScript==
// @name         Steam Sale Queue Clicker
// @namespace    https://github.com/Xorboo/Steam-Sale-Queue-Clicker
// @author       Xorboo
// @version      1.0.0
// @description  Simple clicker for getting trading cards during steam sale. Stops after recieving all cards for the day
// @downloadURL  https://github.com/Xorboo/Steam-Sale-Queue-Clicker/blob/master/QueueClicker.user.js
// @updateURL    https://openuserjs.org/meta/Xorboo/Steam_Sale_Queue_Clicker.meta.js
// @license      MIT
// @noframes
// @match        http://store.steampowered.com/*
// @match        https://store.steampowered.com/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant        none
// ==/UserScript==
/* globals jQuery, $ */

(function() {
    'use strict';

    // 10ms delay so button will actually be clicked
    const executeWithDelay = function(func) {
        setTimeout(func, 10);
    }

    const checkButtons = function() {
        // Call "Begin exploring your queue
        const startQueueTextVisible = $('#discovery_queue_static');
        if (startQueueTextVisible.length && startQueueTextVisible.css('display') != 'none') {
            console.log('Starting queue');
            $('#discovery_queue_start_link').click();
        }

        // Call "Next in Queue" button
        const nextButton = $('.next_in_queue_content');
        if (nextButton.length) {
            console.log('Checking next game');
            executeWithDelay(() => { nextButton.click(); });
        }

        // Call "Start another queue" button if needed
        const queueHeader = $('.discovery_queue_winter_sale_cards_header .subtext');
        if (queueHeader.length) {
            console.log('Queue completed');

            // Only works for english localization
            //var regExp = new RegExp("You can get (\\d)+ more card(s)? today by continuing to browse your Discovery Queue\\.");

            const regExp = new RegExp('(\\d)+');
            if (regExp.test(queueHeader.html())) {
                console.log('Calling next queue to get another card');
                executeWithDelay(() => { $('#refresh_queue_btn').click() });
            }
            else {
                console.log('All cards recieved, stopping clicker');
            }
        }
    }

    executeWithDelay(checkButtons);
})();
