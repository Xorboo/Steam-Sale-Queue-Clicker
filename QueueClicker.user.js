// ==UserScript==
// @name         Steam Sale Queue Clicker
// @namespace    https://github.com/Xorboo/Steam-Sale-Queue-Clicker
// @author       Xorboo
// @version      0.1.2
// @description  Simple clicker for getting trading cards during steam sale. Stops after recieving all cards for the day
// @downloadURL  https://github.com/Xorboo/Steam-Sale-Queue-Clicker/blob/master/QueueClicker.user.js
// @updateURL    https://openuserjs.org/meta/Xorboo/Steam_Sale_Queue_Clicker.meta.js
// @license      MIT
// @noframes
// @match        http://store.steampowered.com/*
// @match        https://store.steampowered.com/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    // 1ms delay so button will actually be clicked
    function executeWithDelay(func) {
        setTimeout(func, 1);
    }

    // Call "Next in Queue" button
    var nextButton = $('.next_in_queue_content');
    if (nextButton.length) {
        console.log("Checking next game");
        executeWithDelay(function() {
            nextButton.click();
        });
    }

    // Call "Start another queue" button if needed
    var hintText = $(".discovery_queue_winter_sale_cards_header .subtext").html();
    if (hintText) {
        console.log("Queue completed.");

        var regExp = new RegExp("You can get (\\d)+ more card(s)? today by continuing to browse your Discovery Queue\\.");
        if (regExp.test(hintText)) {
            console.log("Calling next queue to get another card");
            executeWithDelay(function() {
                document.querySelector('#refresh_queue_btn').click();
            });
        }
        else {
            console.log("All cards recieved, stopping clicker");
        }
    }
})();
