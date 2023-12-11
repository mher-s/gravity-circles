"use strict";
const settingsMenuOpenElement = document.getElementById('settings');
const menuElement = document.getElementById('menu');
const crossElement = document.getElementById('cross');
settingsMenuOpenElement === null || settingsMenuOpenElement === void 0 ? void 0 : settingsMenuOpenElement.addEventListener('click', () => menuElement === null || menuElement === void 0 ? void 0 : menuElement.classList.add('active'));
crossElement === null || crossElement === void 0 ? void 0 : crossElement.addEventListener('click', () => menuElement === null || menuElement === void 0 ? void 0 : menuElement.classList.remove('active'));
