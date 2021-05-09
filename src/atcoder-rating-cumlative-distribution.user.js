// ==UserScript==
// @name         AtCoder Rating Cumulative Distribution
// @namespace    http://aarsalmon.starfree.jp/
// @version      1.0.2
// @description  Rating分布を累積表示、累積パーセント表示します
// @author       AAAR_Salmon
// @match        https://atcoder.jp/users/*?graph=dist
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

	const canvasGraph = document.getElementById('ratingDistributionGraph');

	const dist = [...data];
	const cumDist = [...data];

	for (let i = cumDist.length - 1; i > 0; i--) {
		cumDist[i - 1] += cumDist[i];
	}

	const totalActiveUsers = cumDist[0];
	const percentCumDist = cumDist.map(v => Math.round(v / totalActiveUsers * 100 * 1000) / 1000);

	const parentNode = document.querySelector('[role="group"]').parentNode;

	const groupButton = document.createElement('div');
	groupButton.classList.add('btn-group', 'btn-group-sm');
	groupButton.setAttribute('role', 'group');

	const button = document.createElement('button');
	button.classList.add('btn', 'btn-default');
	button.setAttribute('type', 'button');

	const buttonNum = button.cloneNode(false);
	buttonNum.innerText = '#';
	const buttonCumNum = button.cloneNode(false);
	buttonCumNum.innerText = '累積#';
	const buttonCumPercent = button.cloneNode(false);
	buttonCumPercent.innerText = '累積%';

	function updateGraphFunction(data) {
		return () => {
			canvasGraph.width = 640;
			canvasGraph.height = 480;
			window.data = data;
			$(window).load();
		}
	}

	buttonNum.onclick = updateGraphFunction(dist);
	buttonCumNum.onclick = updateGraphFunction(cumDist);
	buttonCumPercent.onclick = updateGraphFunction(percentCumDist);

	[buttonNum, buttonCumNum, buttonCumPercent].forEach(btn => {
		groupButton.appendChild(btn)
	});
	parentNode.appendChild(groupButton);

})();
