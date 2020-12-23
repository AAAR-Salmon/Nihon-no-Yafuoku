"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// ==UserScript==
// @name         AtCoder Rating Cumlative Distribution
// @namespace    http://aarsalmon.starfree.jp/
// @version      1.0.0
// @description  Rating分布を累積表示、累積パーセント表示します
// @author       AAAR_Salmon
// @match        https://atcoder.jp/users/*?graph=dist
// @grant        none
// ==/UserScript==
(function () {
  'use strict';

  var distribution = _toConsumableArray(data);

  var cumlativeDistribution = _toConsumableArray(data);

  for (var i = cumlativeDistribution.length - 1; i > 0; i--) {
    cumlativeDistribution[i - 1] += cumlativeDistribution[i];
  }

  var totalActiveUsers = cumlativeDistribution[0];
  var percentageCumlativeDistribution = cumlativeDistribution.map(function (v) {
    return Math.round(v / totalActiveUsers * 100 * 1000) / 1000;
  });
  var parentNode = document.querySelector('[role="group"]').parentNode;
  var groupButton = document.createElement('div');
  groupButton.classList.add('btn-group', 'btn-group-sm');
  groupButton.setAttribute('role', 'group');
  var button = document.createElement('button');
  button.classList.add('btn', 'btn-default');
  button.setAttribute('type', 'button');
  var buttonNum = button.cloneNode(false);

  buttonNum.onclick = function () {
    data = distribution;
    $(window).load();
  };

  buttonNum.innerText = '#';
  var buttonCumNum = button.cloneNode(false);

  buttonCumNum.onclick = function () {
    data = cumlativeDistribution;
    $(window).load();
  };

  buttonCumNum.innerText = '累積#';
  var buttonCumPercent = button.cloneNode(false);

  buttonCumPercent.onclick = function () {
    data = percentageCumlativeDistribution;
    $(window).load();
  };

  buttonCumPercent.innerText = '累積%';
  [buttonNum, buttonCumNum, buttonCumPercent].forEach(function (btn) {
    groupButton.appendChild(btn);
  });
  parentNode.appendChild(groupButton);
})();