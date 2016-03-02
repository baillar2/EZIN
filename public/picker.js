angular.module('moduleOne')
  .factory('picker', ['$http',  function($http){
    // The Browser API key obtained from the Google Developers Console.
    // Replace with your own Browser API key, or your own key.
    var developerKey = 'AIzaSyCXgpDtz3VjnFDWXzSj45c9Z3cLvfjhTVA';

    // The Client ID obtained from the Google Developers Console. Replace with your own Client ID.
    var clientId = "509406725962-2bt4q7sn8d5u6qpl9ih4n6o3e88qg32s.apps.googleusercontent.com"

    // Replace with your own App ID. (Its the first number in your Client ID)
    var appId = "509406725962";

    // Scope to use to access user's Drive items.
    var scope = ['https://www.googleapis.com/auth/drive'];

    var pickerApiLoaded = false;
    var oauthToken;

    // Use the Google API Loader script to load the google.picker script.
    function loadPicker() {
      gapi.load('auth', {'callback': onAuthApiLoad});
      gapi.load('picker', {'callback': onPickerApiLoad});
    }

    function onAuthApiLoad() {
      window.gapi.auth.authorize(
          {
            'client_id': clientId,
            'scope': scope,
            'immediate': false
          },
          handleAuthResult);
    }

    function onPickerApiLoad() {
      pickerApiLoaded = true;
      createPicker();
    }

    function handleAuthResult(authResult) {
      if (authResult && !authResult.error) {
        oauthToken = authResult.access_token;
        createPicker();
      }
    }

    // Create and render a Picker object for searching images.
    function createPicker() {
      if (pickerApiLoaded && oauthToken) {
        var view = new google.picker.View(google.picker.ViewId.DOCS);
        view.setMimeTypes();
        var picker = new google.picker.PickerBuilder()
            .enableFeature(google.picker.Feature.NAV_HIDDEN)
            .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
            .setAppId(appId)
            .setOAuthToken(oauthToken)
            .addView(view)
            .addView(new google.picker.DocsUploadView())
            .setDeveloperKey(developerKey)
            .setCallback(pickerCallback)
            .build();
         picker.setVisible(true);
      }
    }

    // A simple callback implementation.
    function pickerCallback(data) {
      if (data.action == google.picker.Action.PICKED) {
          var fileId = data.docs[0].id;
          console.log(fileId)
          document.getElementById('googleFileId').value = fileId;
          var name = data.docs[0].name;
          var url = data.docs[0].url;
          var accessToken = gapi.auth.getToken().access_token;
          var request = new XMLHttpRequest();
          request.open('GET', 'https://www.googleapis.com/drive/v2/files/' + fileId);
          request.setRequestHeader('Authorization', 'Bearer ' + accessToken);
          request.addEventListener('load', function() {
              var item = JSON.parse(request.responseText);
              window.open(item.webContentLink,"_self"); //Download file in Client Side 
          });
          request.send();
      }
        var message = 'File ID of choosen file : ' + fileId;
        document.getElementById('result').innerHTML = message;
    }

    return {
      loadPicker : loadPicker
    }

  }])

    
  