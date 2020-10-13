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
			switch (keyName) {
				case ' ': //space
					if (v.paused) {
						v.play();
					} else {
						v.pause();
					}
					break;
				case 'ArrowRight':
					v.currentTime += 5;
					break;
				case 'ArrowLeft':
					v.currentTime -= 5;
					break;
				case 'ArrowUp':
					v.volume = v.volume >= 0.1 ? v.volume - 0.1 : 0;
					break;
				case 'ArrowDown':
					v.volume = v.volume <= 0.9 ? v.volume + 0.1 : 1;
					break;
				case '>':
					if (v.playbackRate < 3) {
						v.playbackRate += 0.25;
					}
					break;
				case '<':
					if (v.playbackRate > 0.25) {
						v.playbackRate -= 0.25;
					}
					break;
			}
		});
	});
})();
