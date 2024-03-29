function toggleEnable(el1, b1, b2) {
  document.getElementById(el1).disabled = false;
  document.getElementById(b1).hidden = true;
  document.getElementById(b2).hidden = false;
}
function submitFunction(el1, b1, b2) {
  document.getElementById(el1).disabled = true;
  document.getElementById(b1).hidden = false;
  document.getElementById(b2).hidden = true;
}

// Achievement "Singleton": Revealing module pattern
Achievements = (function () {
  //Private object "array" stores all achievements
  var array = {},
    _localStorageKey,
    initialize = function (localStorageKey) {
      // Saves localStorage key internally
      _localStorageKey = localStorageKey;

      // Loads achievements from local storage if any
      if (window.localStorage)
        if (
          typeof window.localStorage[_localStorageKey] != "undefined" &&
          window.localStorage[_localStorageKey] != null &&
          window.localStorage[_localStorageKey] != ""
        )
          array = JSON.parse(window.localStorage[_localStorageKey]);
    },
    register = function (text, description, icon) {
      if (typeof text !== "string" || text === "") return;

      array[text] = { active: false };
      if (typeof description !== "undefined")
        array[text]["description"] = description;
      if (typeof icon !== "undefined") array[text]["icon"] = icon;

      // updateLocalStorage();
    },
    getCount = function () {
      var count = 0;
      for (var i in array) count++;
      return count;
    },
    getUnlockedCount = function () {
      var count = 0;
      for (var i in array) {
        if (array[i]["active"]) count++;
      }
      return count;
    },
    list = function () {
      // Locked achievements will be shown in a grey-ish color
      console.log("HERE///////////////", { array });
      var result = "";
      for (var i in array) {
        if (array[i]["active"])
          result +=
            '<div class="achievement"><span class="title">' +
            i +
            '</span><br /><span class="details">' +
            array[i]["description"] +
            "</span></div><br /><br />";
        else
          result +=
            '<div class="achievement locked"><span class="title">' +
            i +
            '</span><br /><span class="details">' +
            array[i]["description"] +
            "</span></div><br /><br />";
      }

      console.log("RESULT", result);

      return result;
    },
    show = function (text) {
      if (typeof text !== "string" || text === "") return;

      // If someone forget to register an achievement
      if (array[text] === "undefined") register(text);

      if (!array[text]["active"]) {
        if (typeof array[text].icon != "undefined" && array[text].icon != "")
          $("#achievement_box").css(
            "background-image",
            "url(" + array[text].icon + ")"
          );

        $("#status.achievement #text").html(text);
        $("#status.achievement").show();
        $("#status.achievement").css({ opacity: 0.0 });

        $("#status.achievement").animate({ opacity: 1.0, bottom: "8px" }, 750);

        setTimeout(function () {
          $("#status.achievement").animate(
            { opacity: 0.0, bottom: "-120px" },
            750,
            "linear",
            function () {
              $("#status.achievement").hide();
            }
          );
        }, 5000);

        array[text].active = true;
      }
      updateLocalStorage();
    };

  // localStorage.clear();

  updateLocalStorage = function () {
    console.log("UPDATE LOCALSTOREGE");
    if (window.localStorage)
      window.localStorage[_localStorageKey] = JSON.stringify(array);
  };

  return {
    initialize: initialize,
    getCount: getCount,
    getUnlockedCount: getUnlockedCount,
    list: list,
    register: register,
    show: show,
  };
})();
