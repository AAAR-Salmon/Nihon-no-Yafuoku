// ==UserScript==
// @name         Moodle Videoplayer Extention
// @namespace    http://aarsalmon.starfree.jp/
// @version      0.1
// @description  ブラウザの標準ビデオプレーヤーを拡張します(岡大Moodle専用)
// @author       You
// @match        https://moodle.el.okayama-u.ac.jp/*
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

	var style = document.createElement('style');
	style.textContent = `
		.mediaplugin_videojs > div {
			width: 100vh;
			max-width: 100% !important;
		}`;
	document.head.appendChild(style);

	document.querySelectorAll('video').forEach(v => {
		v.addEventListener('keydown', event => {
			event.preventDefault();
			const keyName = event.key;
			if (keyName === ' ') {
				if (v.paused) {
					v.play();
				} else {
					v.pause();
				}
			}
		});
	});
})();
