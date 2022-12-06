$(document).ready(function () {
  var API_URL = "http://localhost:8080/re3dragon/rest/";

  $("#resolve-btn").click(function () {
    let q = $("#resolve-inp").val();
    //console.log(q);
    if (q === "") {
      alert("no input");
    } else {
      let url = API_URL + "item?uri=" + q + "&format=html";
      window.open(url, "_blank").focus();
    }
  });

  $("#resolve-list-btn").click(function () {
    let q = $("#resolve-list-inp").val();
    //console.log(q);
    if (q === "") {
      alert("no input");
    } else {
      let url = API_URL + "items?ids=" + q + "&format=html";
      window.open(url, "_blank").focus();
    }
  });

  $("#search-btn-1").click(function () {
    let q = $("#search-inp").val();
    let repo = "gettyaat";
    //console.log(q);
    let url = API_URL + "search?q=" + q + "&repo=" + repo + "&format=html";
    window.open(url, "_blank").focus();
  });

  $("#search-btn-2").click(function () {
    let q = $("#search-inp").val();
    q = q.replace(" ", "%20");
    let repo = "wikidata";
    //console.log(q);
    let url = API_URL + "search?q=" + q + "&repo=" + repo + "&format=html";
    window.open(url, "_blank").focus();
  });

  $("#search-btn-3").click(function () {
    let q = $("#search-inp").val();
    let repo = "iconclass";
    //console.log(q);
    let url = API_URL + "search?q=" + q + "&repo=" + repo + "&format=html";
    window.open(url, "_blank").focus();
  });
  /*let dummy = (var) => {
    let result = null;
    return result;
  };*/
});
