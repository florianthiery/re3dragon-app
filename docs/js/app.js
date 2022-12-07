$(document).ready(function () {
  var API_URL = "http://localhost:8080/re3dragon/rest/";

  $("#app-resultdiv-1").hide();
  $("#app-resultdiv-2").hide();
  $("#app-resultdiv-3").hide();

  $("#resolve-btn").click(function () {
    $("#app-resultdiv-1").hide();
    $("#app-resultdiv-2").hide();
    $("#app-resultdiv-3").hide();
    let q = $("#resolve-inp").val();
    //console.log(q);
    if (q === "") {
      alert("no input");
    } else {
      let url = API_URL + "item?uri=" + q;
      setTimeout(function () {
        $.ajax({
          type: "GET",
          async: false,
          url: url,
          error: function (jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
          },
          success: function (response) {
            console.log(response);
            setDataSingleItem(response);
          },
        });
      }, 10);
    }
  });

  $("#resolve-list-btn").click(function () {
    $("#app-resultdiv-1").hide();
    $("#app-resultdiv-2").hide();
    $("#app-resultdiv-3").hide();
    let q = $("#resolve-list-inp").val();
    //console.log(q);
    if (q === "") {
      alert("no input");
    } else {
      let url = API_URL + "items?ids=" + q;
      setTimeout(function () {
        $.ajax({
          type: "GET",
          async: false,
          url: url,
          error: function (jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
          },
          success: function (response) {
            console.log(response);
            setDataList(response);
          },
        });
      }, 10);
    }
  });

  $("#search-btn-1").click(function () {
    $("#app-resultdiv-1").hide();
    $("#app-resultdiv-2").hide();
    $("#app-resultdiv-3").hide();
    let q = $("#search-inp").val();
    let repo = "gettyaat";
    //console.log(q);
    let url = API_URL + "search?q=" + q + "&repo=" + repo;
    setTimeout(function () {
      $.ajax({
        type: "GET",
        async: false,
        url: url,
        error: function (jqXHR, textStatus, errorThrown) {
          console.error(errorThrown);
        },
        success: function (response) {
          console.log(response);
          setDataSearch(response);
        },
      });
    }, 10);
  });

  $("#search-btn-2").click(function () {
    $("#app-resultdiv-1").hide();
    $("#app-resultdiv-2").hide();
    $("#app-resultdiv-3").hide();
    let q = $("#search-inp").val();
    q = q.replace(" ", "%20");
    let repo = "wikidata";
    //console.log(q);
    let url = API_URL + "search?q=" + q + "&repo=" + repo;
    setTimeout(function () {
      $.ajax({
        type: "GET",
        async: false,
        url: url,
        error: function (jqXHR, textStatus, errorThrown) {
          console.error(errorThrown);
        },
        success: function (response) {
          console.log(response);
          setDataSearch(response);
        },
      });
    }, 10);
  });

  $("#search-btn-3").click(function () {
    $("#app-resultdiv-1").hide();
    $("#app-resultdiv-2").hide();
    $("#app-resultdiv-3").hide();
    let q = $("#search-inp").val();
    let repo = "iconclass";
    //console.log(q);
    let url = API_URL + "search?q=" + q + "&repo=" + repo;
    setTimeout(function () {
      $.ajax({
        type: "GET",
        async: false,
        url: url,
        error: function (jqXHR, textStatus, errorThrown) {
          console.error(errorThrown);
        },
        success: function (response) {
          console.log(response);
          setDataSearch(response);
        },
      });
    }, 10);
  });

  let setDataSingleItem = (data) => {
    $("#si-uri").empty();
    $("#si-type").empty();
    $("#si-preflabel").empty();
    $("#si-prefdesc").empty();
    $("#si-labels").empty();
    $("#si-descriptions").empty();
    $("#si-broader").empty();
    $("#si-narrower").empty();
    $("#si-dragonlair").empty();
    $("#si-uri").append(
      "<a class='link-white' href='" +
        data.uri.replace("(", "%28").replace(")", "%29") +
        "' target='_blank'>" +
        data.uri.replace("(", "%28").replace(")", "%29") +
        "</a>"
    );
    $("#si-type").append(
      "<a class='link-white' href='" +
        data.type +
        "' target='_blank'>" +
        data.type +
        "</a>"
    );
    for (let key in data.displayLabel) {
      if (data.displayLabel.hasOwnProperty(key)) {
        $("#si-preflabel").append(`${data.displayLabel[key]}@${key}`);
      }
    }
    for (let key in data.displayDesc) {
      if (data.displayDesc.hasOwnProperty(key)) {
        if (`${key}` !== "") {
          $("#si-prefdesc").append(`${data.displayDesc[key]}@${key}`);
        } else {
          $("#si-prefdesc").append("<i>none</i>");
        }
      }
    }
    if (!$.isEmptyObject(data.prefLabel)) {
      for (let key in data.prefLabel) {
        if (data.prefLabel.hasOwnProperty(key)) {
          $("#si-labels").append(`${data.prefLabel[key]}@${key}<br>`);
        }
      }
    } else {
      $("#si-labels").append("<i>none</i>");
    }
    if (!$.isEmptyObject(data.scopeNote)) {
      for (let key in data.scopeNote) {
        if (data.scopeNote.hasOwnProperty(key)) {
          $("#si-descriptions").append(`${data.scopeNote[key]}@${key}<br>`);
        }
      }
    } else {
      $("#si-descriptions").append("<i>none</i>");
    }
    if (data.broader.length > 0) {
      for (item in data.broader) {
        for (let key in data.broader[item].prefLabel) {
          if (data.broader[item].prefLabel.hasOwnProperty(key)) {
            let lang = `${key}`;
            let label = `${data.broader[item].prefLabel[key]}`;
            $("#si-broader").append(
              "<a class='link-white' href='" +
                data.broader[item].uri +
                "' target='_blank'>" +
                data.broader[item].uri +
                "</a> &rArr; " +
                label.replace("<", "&lt;").replace(">", "&gt;") +
                "@" +
                lang +
                "<br>"
            );
          }
        }
      }
    } else {
      $("#si-broader").append("<i>none</i>");
    }
    if (data.narrower.length > 0) {
      for (item in data.narrower) {
        for (let key in data.narrower[item].prefLabel) {
          if (data.narrower[item].prefLabel.hasOwnProperty(key)) {
            let lang = `${key}`;
            let label = `${data.narrower[item].prefLabel[key]}`;
            $("#si-narrower").append(
              "<a class='link-white' href='" +
                data.narrower[item].uri +
                "' target='_blank'>" +
                data.narrower[item].uri +
                "</a> &rArr; " +
                label.replace("<", "&lt;").replace(">", "&gt;") +
                "@" +
                lang +
                "<br>"
            );
          }
        }
      }
    } else {
      $("#si-narrower").append("<i>none</i>");
    }
    $("#si-dragonlair").append(
      "<a class='link-white' href='http://lod.datadragon.link/data/dragonlair/" +
        data.lair.id +
        "' target='_blank'>lair:" +
        data.lair.id +
        "</a>"
    );
    $("#app-resultdiv-2").show();
    $([document.documentElement, document.body]).animate(
      { scrollTop: $("#app-div-2").offset().top },
      100
    );
  };

  let setDataSearch = (data) => {
    $("#search-results").empty();
    for (item in data) {
      $("#search-results").append(
        '<h1>uri</h1><div id="uri"><a class="link-white" href=\'' +
          data[item].uri.replace("(", "%28").replace(")", "%29") +
          "' target='_blank'>" +
          data[item].uri.replace("(", "%28").replace(")", "%29") +
          "</a></div>"
      );
      $("#search-results").append(
        '<h1>type</h1><div id="type"><a class="link-white" href=\'' +
          data[item].type +
          "' target='_blank'>" +
          data[item].type +
          "</a></div>"
      );
      for (let key in data[item].displayLabel) {
        if (data[item].displayLabel.hasOwnProperty(key)) {
          let lang = `${key}`;
          let label = `${data[item].displayLabel[key]}`;
          $("#search-results").append(
            '<h1>display label</h1><div id="preflabel">' +
              label +
              "@" +
              lang +
              "</div>"
          );
        }
      }
      if (typeof data[item].similarity !== "undefined") {
        $("#search-results").append(
          '<h1>Similarity</h1><div id="similarity">Levenshtein Distance: ' +
            data[item].similarity.levenshtein +
            " | Jaro-Winkler Distance: " +
            data[item].similarity.jarowinkler +
            "</div>"
        );
      }
      for (let key in data[item].displayDesc) {
        if (data[item].displayDesc.hasOwnProperty(key)) {
          let lang = `${key}`;
          let label = `${data[item].displayDesc[key]}`;
          if (`${key}` !== "") {
            $("#search-results").append(
              '<h1>display description</h1><div id="prefdesc">' +
                label +
                "@" +
                lang +
                "</div>"
            );
          } else {
            $("#search-results").append(
              '<h1>display description</h1><div id="prefdesc"><i>none</i></div>'
            );
          }
        }
      }
      $("#search-results").append(
        '<h1>Dragon Lair</h1><div id="dragonlair"><a class="link-white" href=\'http://lod.datadragon.link/data/dragonlair/' +
          data[item].lair.id +
          "' target='_blank'>lair:" +
          data[item].lair.id +
          "</a></div>"
      );
      $("#search-results").append("<br><hr />");
    }
    $("#app-resultdiv-1").show();
    $([document.documentElement, document.body]).animate(
      { scrollTop: $("#app-div-1").offset().top },
      100
    );
  };

  let setDataList = (data) => {
    $("#list-results").empty();
    for (item in data) {
      $("#list-results").append(
        '<h1>uri</h1><div id="uri"><a class="link-white" href=\'' +
          data[item].uri.replace("(", "%28").replace(")", "%29") +
          "' target='_blank'>" +
          data[item].uri.replace("(", "%28").replace(")", "%29") +
          "</a></div>"
      );
      $("#list-results").append(
        '<h1>type</h1><div id="type"><a class="link-white" href=\'' +
          data[item].type +
          "' target='_blank'>" +
          data[item].type +
          "</a></div>"
      );
      for (let key in data[item].displayLabel) {
        if (data[item].displayLabel.hasOwnProperty(key)) {
          let lang = `${key}`;
          let label = `${data[item].displayLabel[key]}`;
          $("#list-results").append(
            '<h1>display label</h1><div id="preflabel">' +
              label +
              "@" +
              lang +
              "</div>"
          );
        }
      }
      if (typeof data[item].similarity !== "undefined") {
        $("#list-results").append(
          '<h1>Similarity</h1><div id="similarity">Levenshtein Distance: ' +
            data[item].similarity.levenshtein +
            " | Jaro-Winkler Distance: " +
            data[item].similarity.jarowinkler +
            "</div>"
        );
      }
      for (let key in data[item].displayDesc) {
        if (data[item].displayDesc.hasOwnProperty(key)) {
          let lang = `${key}`;
          let label = `${data[item].displayDesc[key]}`;
          if (`${key}` !== "") {
            $("#list-results").append(
              '<h1>display description</h1><div id="prefdesc">' +
                label +
                "@" +
                lang +
                "</div>"
            );
          } else {
            $("#list-results").append(
              '<h1>display description</h1><div id="prefdesc"><i>none</i></div>'
            );
          }
        }
      }
      $("#list-results").append(
        '<h1>Dragon Lair</h1><div id="dragonlair"><a class="link-white" href=\'http://lod.datadragon.link/data/dragonlair/' +
          data[item].lair.id +
          "' target='_blank'>lair:" +
          data[item].lair.id +
          "</a></div>"
      );
      $("#list-results").append("<br><hr />");
    }
    $("#app-resultdiv-3").show();
    $([document.documentElement, document.body]).animate(
      { scrollTop: $("#app-div-3").offset().top },
      100
    );
  };
});
