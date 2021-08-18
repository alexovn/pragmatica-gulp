/*
checkUserSystem create by Pragmatica;
Website: https://pragmatica.design/
---------------------------------------
Create by Vladislav Khudyakov
Telegram: @khudyakv
*/


(function () {
  "use strict";
  let agent = navigator.userAgent.toLowerCase();
  let html = document.getElementsByTagName("html")[0];
  let browser;
  let platform;
  let retina;
  let touch;


  function getBrowser() {
    if (agent.indexOf("msie") > -1) {
      // IE6~10
      return "ie" + agent.match(/msie (\d+)/)[1];
    } else if (agent.indexOf("trident") > -1) {
      // IE11
      return "ie11";
    } else if (agent.indexOf("edge") > -1) {
      // MS Edge
      return "edge";
    } else if (agent.indexOf("firefox") > -1) {
      // Mozilla Firefox
      return "firefox";
    } else if (agent.indexOf("opr") > -1) {
      // Opera
      return "opera";
    } else if (agent.indexOf("yabrowser") > -1) {
      // ЯндексБраузер
      return "yandex";
    } else if ((navigator.vendor.toLowerCase().indexOf("google") > -1) || (agent.indexOf('chrome') > -1)) {
      // Google Chrome
      return 'chrome';
    } else if (agent.indexOf("safari") > -1) {
      return "safari";
    }
    return "";
  }
  browser  =  getBrowser();

  function getOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

      if (/windows phone/i.test(userAgent)) {
          return "windows-phone";
      }

      if (/android/i.test(userAgent)) {
          return "android";
      }

      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
          return "ios";
      }

      if (agent.indexOf("win")!=-1) {
        return "windows"
      }

      if (agent.indexOf("mac")!=-1) {
        return "mac"
      }

      if (agent.indexOf("x11")!=-1) {
        return "unix"
      }

      if (agent.indexOf("linux")!=-1) {
        return "linux"
      }

      return "";
  }
  platform =  getOperatingSystem();


  function getHighResolutionScreen() {
    if(window.devicePixelRatio) {
      return window.devicePixelRatio > 1;
    }

    return "";
  }
  retina = getHighResolutionScreen() ? 'retina' : 'no-retina';

  function detectTouch() {
      return 'ontouchstart' in window || navigator.maxTouchPoints;
  }
  touch = detectTouch() ? 'touch' : 'no-touch';


  html.classList.add(platform);
  html.classList.add(browser);
  html.classList.add(retina);
  html.classList.add(touch);

})();
