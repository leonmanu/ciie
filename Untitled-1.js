//**///**//** */ */ */
var resultados = [];


  const fs = require("fs");
  const readline = require("readline");
  const { google } = require("googleapis"); 

  //var idFolder =  '1UTapDMpbXqAHS6F0RN7Yrh4u3g4voRui';
  ///////////////
  var folderId = "";
  // If modifying these scopes, delete token.json.
  const SCOPES = ["https://www.googleapis.com/auth/drive.metadata.readonly"];
  // The file token.json stores the user's access and refresh tokens, and is
  // created automatically when the authorization flow completes for the first
  // time.
  const TOKEN_PATH = "token.json";



  module.exports = function(id){
    var drive = google.drive({ version: "v3" });
  // Load client secrets from a local file.
  fs.readFile("credentials3.json", (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content), listFiles);
  });
  
  /**
   * Create an OAuth2 client with the given credentials, and then execute the
   * given callback function.
   * @param {Object} credentials The authorization client credentials.
   * @param {function} callback The callback to call with the authorized client.
   */
  function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );
  
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getAccessToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    });
  }
  
  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback for the authorized client.
   */
  function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });
    // console.log("Authorize this app by visiting this url:", authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question("Enter the code from that page here: ", (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error("Error retrieving access token", err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log("Token stored to", TOKEN_PATH);
        });
        callback(oAuth2Client);
      });
    });
  }
  
  /**
   * Lists the names and IDs of up to 10 files.
   * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
   */
  function listFiles(auth) {
    //resultados = [];
    drive = google.drive({ version: "v3", auth });
    listFilesFolder();
  }

  function listFilesFolder() {
    resultados = [];
    drive.files.list(
      {
        parents: "1Ru-Mfghj-XPV3pfZ0OnNqrg0HJl8Kdb1",
        fields: "nextPageToken, files(id, name)",
        q: "'"+id + "' in parents",
        folderId: folderId,
        orderBy: "name",
      },
      (err, res) => {
        var cursoDatos;
        //var orientacion = "";
        if (err) return console.log("The API returned an error: " + err);
        const files = res.data.files;
        if (files.length) {
          console.log("Files:");
          var i = 0;
          files.map((file) => {
            console.log(`${file.name}`);
            extensionSplit = file.name.toString().split(".");
            var extension = extensionSplit[1];
             
             //if (extencion[1].length <= 3)
             //console.log(`No es carpeta`);
            //  orientacion = cursoDatos[1].slice(0, 3);
            
            resultados.push({
              id: file.id,
              nombre: file.name,
              extension: extension
              //orientacion: orientacion,
            });
            console.log(`ID: ${resultados[i].id}) || NOMBRE: ${resultados[i].nombre}) || EXTENSION: ${resultados[i].extension})`);
          });
          
          //return resultados;
        } else {
          console.log("No files found."+ 1);
        }
      },
       console.log("curso prueba" + 2)      
    );
    console.log("curso prueba" + 3)
  }

  console.log("curso prueba" + 4)
  
  return resultados;
}
//module.exports.cursos = cursos;
// console.log("Resultado::::> " + listFiles());



///////////////////////////////////////// FUNCIONA OK

//**///**//** */ */ */
resultados = [];

const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const { resolve } = require("path");
const { rejects } = require("assert");

//var idFolder =  '1UTapDMpbXqAHS6F0RN7Yrh4u3g4voRui';
///////////////
var folderId = "";
// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/drive.metadata.readonly"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "token.json";


module.exports = files = id => {

  return new Promise((resolve, rejects) => {



    // Load client secrets from a local file.
    fs.readFile("credentials3.json", (err, content) => {
      if (err) return console.log("Error loading client secret file:", err);
      // Authorize a client with credentials, then call the Google Drive API.
      authorize(JSON.parse(content), listFiles);
    });

    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */
    function authorize(credentials, callback) {
      const { client_secret, client_id, redirect_uris } = credentials.installed;
      const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
      );

      // Check if we have previously stored a token.
      fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
      });
    }

    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback for the authorized client.
     */
    function getAccessToken(oAuth2Client, callback) {
      const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
      });
      // console.log("Authorize this app by visiting this url:", authUrl);
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.question("Enter the code from that page here: ", (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
          if (err) return console.error("Error retrieving access token", err);
          oAuth2Client.setCredentials(token);
          // Store the token to disk for later program executions
          fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) return console.error(err);
            console.log("Token stored to", TOKEN_PATH);
          });
          callback(oAuth2Client);
        });
      });
    }

    /**
     * Lists the names and IDs of up to 10 files.
     * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
     */


    function listFiles(auth) {
      resultados = [];
      const drive = google.drive({ version: "v3", auth });
      drive.files.list(
        {
          parents: "1Ru-Mfghj-XPV3pfZ0OnNqrg0HJl8Kdb1",
          fields: "nextPageToken, files(id, name, mimeType)",
          q: "'" + id + "' in parents",
          folderId: folderId,
          orderBy: "name",
        },
        (err, res) => {
          var cursoDatos;
          //var orientacion = "";
          if (err) return console.log("The API returned an error: " + err);
          const files = res.data.files;
          if (files.length) {
            console.log("Files:");
            var i = 0;
            files.map((file) => {
              //console.log(`Archivossssss ${file.mimeType}`);
              extensionSplit = file.name.toString().split(".");
              var extension = extensionSplit[1];
              //console.log(`otros file: (${extension})`);
              //if (extencion[1].length <= 3)
              //console.log(`No es carpeta`);
              //  orientacion = cursoDatos[1].slice(0, 3);
              resultados.push({
                id: file.id,
                nombre: file.name,
                extension: file.mimeType
                //orientacion: orientacion,
              });
              console.log(`ID: ${resultados[i].id}) || NOMBRE: ${resultados[i].nombre}) || EXTENSION: ${resultados[i].extension})`);
              i++;
            });
            console.log("curso prueba" + resultados[0].nombre);
            resolve(resultados);
          } else {
            console.log("No files found.");
          }
        }
      );

    }
  })


}
//module.exports.cursos = cursos;
// console.log("Resultado::::> " + listFiles());
