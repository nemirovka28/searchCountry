import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/Material.css';
import '@pnotify/core/dist/Angeler.css';
import 'material-design-icons/iconfont/material-icons.css';
const PNotifyFontAwesome4 = require('@pnotify/font-awesome4');
import { alert, defaultModules } from '../../node_modules/@pnotify/core/dist/PNotify.js';
import { defaults } from '@pnotify/core';

const NOTIFICATION_DELAY = 2000;
defaultModules.set(PNotifyFontAwesome4, {});
export default function showError(catchedError) {
    alert({
    addClass: 'angeler-extended',
    text: `${catchedError}`,
    mode: 'dark',
    animation: 'fade',
    animateSpeed: 'normal',
    styling: 'material',
    icons: 'material',
    icon: true,
    shadow: true,
    delay: NOTIFICATION_DELAY,
  });
};
defaults.width = '300px';
defaults.type = 'notice';
