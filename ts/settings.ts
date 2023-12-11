const settingsMenuOpenElement = document.getElementById('settings');
const menuElement = document.getElementById('menu');
const crossElement = document.getElementById('cross');

settingsMenuOpenElement?.addEventListener('click', () => menuElement?.classList.add('active'));
crossElement?.addEventListener('click', () => menuElement?.classList.remove('active'));
