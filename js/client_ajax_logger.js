function get_xhr(){
    if (typeof XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();  
    }
    var versions = [
        "MSXML2.XmlHttp.5.0",   
        "MSXML2.XmlHttp.4.0",  
        "MSXML2.XmlHttp.3.0",   
        "MSXML2.XmlHttp.2.0",  
        "Microsoft.XmlHttp"
    ];

    var xhr;
    for(var i = 0; i < versions.length; i++) {  
        try {  
            xhr = new ActiveXObject(versions[i]);  
            break;  
        } catch (e) {
        }  
    }
    return xhr;
};

var debug_ajax_logger = false;

var console = consoleProxy.getConsole({
  log: function () {
    if(arguments[0]!="output-sent")
      return processConsoleOutput(arguments, "log");
    else
      return arguments;
  },
  error: function () {
    return processConsoleOutput(arguments, "error");
  },
  info: function () {
    return processConsoleOutput(arguments, "info");
  },
  memory: function () {
    return processConsoleOutput(arguments, "memory");
  },
  profile: function () {
    return processConsoleOutput(arguments, "profile");
  },
});

function processConsoleOutput(arguments, type){
    output = {
      "message": arguments[0],
      "date": new Date(),
      "type": type,
      "agent": navigator.userAgent
    }
    var xhr = get_xhr();
    xhr.open("POST", "/log.php");
    if(debug_ajax_logger)
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4)
          console.log("output-sent");
      };
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(output))
    return arguments;
}

window.onerror = function (message, url, line_number) {
  console.error("Uncaught errror in: " + url + ":" + line_number + "\nDetails: " + message);
};