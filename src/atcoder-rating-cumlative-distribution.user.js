// ==UserScript==
// @name         AtCoder Rating Cumlative Distribution
// @namespace    http://aarsalmon.starfree.jp/
// @version      1.0.0
// @description  Rating分布を累積表示、累積パーセント表示します
// @author       AAAR_Salmon
// @match        https://atcoder.jp/users/*?graph=dist
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

	const distribution = [...data];
	const cumlativeDistribution = [...data];
	for (let i = cumlativeDistribution.length - 1; i > 0; i--) {
		cumlativeDistribution[i-1] += cumlativeDistribution[i];
	}
	const totalActiveUsers = cumlativeDistribution[0];
	const percentageCumlativeDistribution = cumlativeDistribution.map(v => Math.round(v / totalActiveUsers * 100 * 1000) / 1000);

	const parentNode = document.querySelector('[role="group"]').parentNode;

	const groupButton = document.createElement('div');
	groupButton.classList.add('btn-group', 'btn-group-sm');
	groupButton.setAttribute('role', 'group');

	const button = document.createElement('button');
	button.classList.add('btn', 'btn-default');
	button.setAttribute('type', 'button');
	const buttonNum = button.cloneNode(false);
	buttonNum.onclick = () => {
		data = distribution;
		$(window).load();
	};
	buttonNum.innerText = '#';
	const buttonCumNum = button.cloneNode(false);
	buttonCumNum.onclick = () => {
		data = cumlativeDistribution;
		$(window).load();
	};
	buttonCumNum.innerText = '累積#';
	const buttonCumPercent = button.cloneNode(false);
	buttonCumPercent.onclick = () => {
		data = percentageCumlativeDistribution;
		$(window).load();
	};
	buttonCumPercent.innerText = '累積%';

	[buttonNum, buttonCumNum, buttonCumPercent].forEach(btn => {
		groupButton.appendChild(btn)
	});
	parentNode.appendChild(groupButton);

})();
