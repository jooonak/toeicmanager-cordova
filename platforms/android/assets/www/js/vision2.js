

// document.getElementById("uploadFile").addEventListener("click", uploadFile);
//document.getElementById("downloadFile").addEventListener("click", downloadFile);

/*function downloadFile() {

    var fileTransfer = new FileTransfer();
    var uri = encodeURI("http://s14.postimg.org/i8qvaxyup/bitcoin1.jpg");
    var fileURL =  "///storage/emulated/0/DCIM/myFile";

    fileTransfer.download(
        uri, fileURL, function(entry) {
            console.log("download complete: " + entry.toURL());
        },

        function(error) {
            console.log("download error source " + error.source);
            console.log("download error target " + error.target);
            console.log("download error code" + error.code);
        },

        false, {
            headers: {
                "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
            }
        }
    );
}*/

function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
}

function uploadFile() {

    var fileURL = "img/camera.jpg"
    var uri = encodeURI("http://127.0.0.1:3000/");
    var options = new FileUploadOptions;

    options.fileKey = "file";
    options.fileName = fileURL.substr(fileURL.lastIndexOf('/')+1);
    console.log(fileURL.substr(fileURL.lastIndexOf('/')+1));
    options.mimeType = "text/plain";

    var headers = {'headerParam':'headerValue'};
    options.headers = headers;

    var ft = new FileTransfer();

    ft.upload(fileURL, uri, onSuccess, onError, options);

    function onSuccess(r) {
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
    }

    function onError(error) {
        alert("An error has occurred: Code = " + error.code);
        console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);
    }

}