(function () {
  var version = parseInt(Math.random() * 10000);
  var webformKey =
    "78086ef38473f5838006c14d32e8b6e1a5f996b56b218abae742988676e72c87_" +
    version;
  var loaderHTML =
    '<div class="fs-webform-loader" style="margin:auto">  <style type="text/css">  .loader-box{    width:100%;    margin:auto;    margin-top:50px;    text-align:center;  }  .loader {      border-radius: 50%;      width: 20px;      height: 20px;      animation: spin 1s linear infinite;      border: 3px solid #12344D;      border-top: 3px solid #B3DFFF;      display:block;      margin: 25px auto;  }  @keyframes spin {      0% { transform: rotate(0deg); }      100% { transform: rotate(360deg); }  }  #loader-text{    vertical-align:middle;    text-align:center;    color: #333;    display: inline-block;    vertical-align: middle;    margin-top:-20px;    height:100%;  }  </style>  <div class="loader-box">    <div class="loader"></div>    <div id="loader-text">    </div>  </div></div>';
  var containerHTML =
    '<div id="fs-webform-container_' +
    webformKey +
    '" class="fs-webform-container fs_78086ef38473f5838006c14d32e8b6e1a5f996b56b218abae742988676e72c87" style="display:none;"></div>';
  var scriptTag =
    document.currentScript ||
    document.getElementById(
      "fs_78086ef38473f5838006c14d32e8b6e1a5f996b56b218abae742988676e72c87"
    ) ||
    document.getElementById("fswebforms") ||
    document.getElementById("formservjs");
  var docHook = scriptTag.parentElement;
  var content = document.createElement("div");
  scriptTag.id = webformKey;
  document.getElementById("script-container-enquiry").appendChild(content);
  content.innerHTML = loaderHTML + containerHTML;

  /// Latest URL Updated By [@Mrutyunjaya]
  var script = document.createElement("script");
  script.src =
    "https://ultraviolette-team.myfreshworks.com/crm/sales/web_forms/78086ef38473f5838006c14d32e8b6e1a5f996b56b218abae742988676e72c87/form.js";
  var webformContainer = document.getElementById(
    "fs-webform-container_" + webformKey
  );
  webformContainer.appendChild(script);
})();
