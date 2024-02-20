/*const socket = new WebSocket('wss://lixqa.de:2319');
socket.addEventListener('open', function (event) {
    console.log("%cWebSocket: Connected! Listening...", "color:green;");
});

socket.addEventListener("error", function (event) {
  alert("Verbindeung zum Websocket verloren!");
})
*/

  
  $(window).on("load", function(e) {
      /*if(getApiStatus()) {
          console.log("%cAPI Status: Online", "color:green;");
      } else {
          console.log("%cAPI Status: Offline", "color:red;");
      }*/
  })

  function redirect(url) {
    window.location.href = url;
  }

  function openNewTab(url) {
    window.open(url);
  }

  function disableRightClick(){
    window.addEventListener('contextmenu', event => event.preventDefault());
  }

  function copyToClipboard(data) {
    textarea = document.createElement('textarea');
    textarea.value = data;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  };
  
  function pad(d) {
      return (d < 10) ? '0' + d.toString() : d.toString();
  }
  
  function setCookie(cname, cvalue, expires) {
      const d = new Date();
      d.setTime(d.getTime() + (expires));
      expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  }
  
  function getCurrentDate() {
    return new Date();
  }
  
  function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }
  
  function truncateString(str, n) {
      return (str.length > n) ? str.substr(0, n-1) + '&hellip;' : str;
  }
  
  function truncateStringWithNull(str, n, valueIfNull) {
    if(str == "") s = str = valueIfNull;
    return (str.length > n) ? str.substr(0, n-1) + '&hellip;' : str;
  }
  
  function replaceStringIfEmpty(str, strIfEmpty) {
    if(str == "") str = strIfEmpty;
    return str;
  }
  
  function getRelativeTimeDifference(date) {
      let today = Date.now();
      let response = 0;
      let preposition = "?";
  
      if(today > date) {
        preposition = "Vor";
        response = (today - date)/1000;
      }
  
      if(today < date) {
        preposition = "In";
        response = (date - today)/1000;
      }
  
      response = Math.abs(response);
  
      let ending = "Sekunde";
  
      if(response > 1) ending += "n";
      let roundCount = 0;
  
      if(response > 60 && roundCount == 0) {//aus sekunden werden minuten
          response = Math.round(response / 60);
          ending = "Minute";
          if(response > 1) ending += "n";
          roundCount = 1;
      }
      if(response > 60 && roundCount == 1) {//aus minuten werden stunden
          response = Math.round(response / 60);
          ending = "Stunde";
          if(response > 1) ending += "n";
          roundCount = 2;
      }
      if(response > 24 && roundCount == 2) { //aus stunden werden tage
          response = Math.round(response / 24);
          ending = "Tag";
          if(response > 1) ending += "en";
          roundCount = 3;
      }
      if(response > 30 && roundCount == 3) { //aus stunden werden tage
          response = Math.round(response / 24);
          ending = "Monat";
          if(response > 1) ending += "en";
          roundCount = 4;
      }
  
      return {preposition: preposition,
        amount: Math.round(response),
        ending: ending};
  }

  function formatNumber(number) {
    let internationalNumberFormat = new Intl.NumberFormat('de-DE');
    let formattedValue = internationalNumberFormat.format(number);
    return formattedValue;
  }

  class Random {
    static string(length = 10, chars = "abcdesfghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ") {
      var result = "";
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      return result;
    }

    static stringRandomLength(minLenght = 0, maxLenght = 10, chars = "abcdesfghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ") {
      return this.string(chars, this.number(minLenght, maxLenght));
    }

    static number(min = 0, max = 100) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /*static numbersWithDistance(amount = 10, min = 0, max = 100, distance = 10) {
      while(this.number(min, max) - die vorherige generation ist größer als distance)

      return array
    }*/
  }