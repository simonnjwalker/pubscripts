

function changeviewfilter(id, childtype, filterid) {
    if(id === null || id === "") {
        console.log('Cannot save ' + childtype +' item');
        return;
    }

    if(filterid === null || filterid === "") {
        return;
    }

    var filter = document.getElementById(filterid);
    var filterval = '';
    if(filter != null) {
        filterval = filter.value;
    }


        
    var XHR = new XMLHttpRequest();
    XHR.addEventListener('load', function(event) {
        // after the page grabs the partial view, plop this into the correct spot
        if(XHR.responseText != null) {
            var swapview = document.getElementById(childtype+ '-partial-' + id);
            if(swapview != null) {
                swapview.innerHTML = XHR.responseText;
            }
        }
    });
    // Define what happens in case of error
    XHR.addEventListener('error', function(event) {
        console.log('Could not retrieve viewfilter "' + childtype + '" with id "' + id + '"');
    });

  // Set up our request
  var location = window.location.protocol + '//'+ window.location.hostname;
  if(window.location.port != '') {
    location = location + ':' + window.location.port;
  }
  XHR.open('GET', location + '/subject/changeviewfilter' + childtype + '/' + id + '?viewfilter=' + encodeURIComponent(filterval));
  
  // Send our FormData object; HTTP headers are set automatically
  XHR.send();
}


function removechild(id,childtype) {
    // we need to grab the server-side partial view
    // (fuck rendering this manually)
    var option = "";

    // this is the event that will fire after the html is returned
    var XHR = new XMLHttpRequest();
    XHR.addEventListener('load', function(event) {
        // after the page grabs the partial view, plop this into the correct spot
        if(XHR.responseText != null) {
            if(XHR.responseText == 'true') {
                var deletion = document.getElementById(childtype + "[" + id + "]");
                if(deletion != null) {
                    deletion.parentNode.removeChild(deletion);

                    // clear the 'no items message'
                    var inputs = document.getElementsByTagName('input');
                    var exists = false;
                    for(var i=0;i<inputs.length;i++){
                        if(inputs[i].id.indexOf(childtype + "[")==0){
                            exists = true;
                        }
                    }

                    if(exists == false) {
                        var msg = document.getElementById("no-" + childtype + '-text');
                        if(msg != null) {
                            var itemplural = childtype + 's'; 
                            if(childtype == 'subres') {
                                itemplural = "subject resources";
                            }
                            else if(childtype == 'instance') {
                                itemplural = "subject instances";
                            }
                            else if(childtype == 'slo') {
                                itemplural = "SLOs";
                            }
                            msg.innerHTML = "There are no " + itemplural + ".  Click the plus button above to add a new one.";
                        }
                    }
                }
            }
        }
    });

    // Set up our request
    var location = window.location.protocol + '//'+ window.location.hostname;
    if(window.location.port != '') {
        location = location + ':' + window.location.port;
    }
    XHR.open('GET', location + '/subject/remove' + childtype + '/' + id);

    // Send our FormData object; HTTP headers are set automatically
    XHR.send();

}


function addchild(parentid,childtype,parenttype) {
    // we need to grab the server-side partial view
    // (fuck rendering this manually)
    var id = parentid;
    if(parenttype == null || parenttype == 'undefined'){
        parenttype = '';
    }
    //var hr = document.createElement("hr");
    //document.getElementById(parent).appendChild(hr); 

    // clear the 'no items message'
    var msg = document.getElementById('no-' + childtype + '-text');
    if(msg != null) {
        msg.innerHTML = "";
    }

    // document.getElementById(parent).appendChild(hr);

    // Grab all the assessment-info relating to this assesmsent (thanks, guids)
    // and then fire it at the server to save but also get the rendered html
    // After it comes back, add this html to the assessment part
    // This means that we are adding items to the database immediately obviously
    var XHR = new XMLHttpRequest();
    var FD  = new FormData();

    // this is the event that will fire after the html is returned
    XHR.addEventListener('load', function(event) {
        // after the page grabs the partial view, plop this into the correct spot
        var listref = childtype + '-list';
        if(parenttype != '') {
            listref = parenttype + '-' + id + '-' + listref;
        }
        var list = document.getElementById( listref );
        if(list != null) {
            
            list.insertAdjacentHTML('beforeend',XHR.responseText);
        }
    });

    // Set up our request
    var location = window.location.protocol + '//'+ window.location.hostname;
    if(window.location.port != '') {
        location = location + ':' + window.location.port;
    }
    XHR.open('GET', location + '/subject/add' + childtype +'/' + id);

    // Send our FormData object; HTTP headers are set automatically
    XHR.send(FD);

}

function savechild(id, childtype) {
    if(id === null || id === "") {
        console.log('Cannot save ' + childtype +' item');
        return;
    }

    var XHR = new XMLHttpRequest();
    var FD  = new FormData();
    var data = document.getElementsByClassName('form-control ' + id);
    var replace = childtype + '[' + id + '].';
    for(var i = 0;i<data.length;i++) {
        FD.append(data[i].id.replace(replace,''), data[i].value);
    }

    // Define what happens on successful data submission
    XHR.addEventListener('load', function(event) {
    
    // we only need to change the button
    // after the page grabs the partial view, plop this into the correct spot
    // let saveicon = document.getElementById('savebuttonicon ' + childtype + ' ' + id);
    // saveicon.setAttribute("class","glyphicon glyphicon-save");
    });

  // Define what happens in case of error
  XHR.addEventListener('error', function(event) {
    console.log('Could not save ' + childtype + 'id ' + id + "'");
    // let saveicon = document.getElementById('savebuttonicon ' + childtype + ' ' + id);
    // saveicon.setAttribute("class","glyphicon glyphicon-save");
    // saveicon.setAttribute("class","glyphicon glyphicon-exclamation-sign");
  });

  // Set up our request
  var location = window.location.protocol + '//'+ window.location.hostname;
  if(window.location.port != '') {
    location = location + ':' + window.location.port;
  }
  XHR.open('POST', location + '/subject/save' + childtype + '/' + id);

  // Send our FormData object; HTTP headers are set automatically
  XHR.send(FD);
}


function save() {
    let saveicon = document.getElementById('savebuttonicon');
    saveicon.setAttribute("class","glyphicon glyphicon-refresh");

    let data = document.getElementById("designform");
    var XHR = new XMLHttpRequest();
    var FD  = new FormData();
    var id = data["subjectid"].value;

    for(var i = 0;i<data.length;i++) {
        if(data[i].id === null || data[i].value === null || data[i].id ==="" || data[i].value ==="")
        {
            // skip
        }
        else
        {
            FD.append(data[i].id, data[i].value);
        }
    }

  // Push our data into our FormData object
  //for(var name in data) {
  //  FD.append(name, data[name]);
  //}

  // Define what happens on successful data submission
  XHR.addEventListener('load', function(event) {
    // after the page saves your data, it will try and load thie MS Word preview
    let err = "there was an error";
    let url  = '/subject/designsave/' + id;
    let saveicon = document.getElementById('savebuttonicon');
    saveicon.setAttribute("class","glyphicon glyphicon-save");
    //previewframe.setAttribute('src',url);  

  });

  // Define what happens in case of error
  XHR.addEventListener('error', function(event) {
    alert('Oops! Something went wrong.');
    let saveicon = document.getElementById('savebuttonicon');
    saveicon.setAttribute("class","glyphicon glyphicon-exclamation-sign");
  });

  // Set up our request
  var location = window.location.protocol + '//'+ window.location.hostname;
  if(window.location.port != '') {
    location = location + ':' + window.location.port;
  }
  XHR.open('POST', location + '/subject/designsave/' + id);

  // Send our FormData object; HTTP headers are set automatically
  XHR.send(FD);
}

function newguid() {
    var output = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
    return output;
}


function genhtml(stepid) {
    var url = '/step/genhtml/' + stepid;


    return output;
}


function updatefromcontext(){
    // get the current value in context and ask the server for it
   // debugger;

    let config = document.getElementById('config');
    let subjectid = document.getElementById('subjectid');
    let context = document.getElementById('context');
    let vm = {
        "subjectid":subjectid.value,
        "config":config.value,
        "context":context.value,
        "userid":"",
        "error":""
    };
    
      var XHR = new XMLHttpRequest();
      var FD  = new FormData();
     // var config = data.config;
    //  var id = data.subjectid;
    
      // Push our data into our FormData object
      for(var name in vm) {
        FD.append(name, vm[name]);
      }
    
      // Define what happens on successful data submission
      XHR.addEventListener('load', function(event) {
        // after retrieving data, set the control here
        let textbox = document.getElementById('config');
        textbox.value = this.responseText;
      });
    
      // Define what happens in case of error
      XHR.addEventListener('error', function(event) {
        alert('Oops! Something went wrong.');
      });
    
      // Set up our request
      var location = window.location.protocol + '//'+ window.location.hostname;
      if(window.location.port != '') {
        location = location + ':' + window.location.port;
      }
      XHR.open('POST', location + '/subject/fetchinstancesetup/');
    
      // Send our FormData object; HTTP headers are set automatically
      XHR.send(FD);
}
    
    
    
