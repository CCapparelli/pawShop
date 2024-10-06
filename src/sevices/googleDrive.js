class GoogleDrive {
    constructor(clientId, apiKey) {
        this.CLIENT_ID      = clientId;
        this.API_KEY        = apiKey;
        this.DISCOVERY_URL  = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
        this.AUTH_URL       = 'https://www.googleapis.com/auth/drive.file';
        this.UPLOAD_URL     = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id';
        this.tokenClient    = '';
        this.gapiInited     = false;
        this.gisInited      = false;
    }

    // Callback after api.js is loaded.
    gapiLoaded = () => gapi.load('client', initializeGapiClient);

    // Callback after the API client is loaded. Loads the discovery doc to initialize the API.
    async initializeGapiClient() {
        await gapi.client.init({
            apiKey: this.API_KEY,
            discoveryDocs: [this.DISCOVERY_URL],
        });
        gapiInited = true;
    }

    // Callback after Google Identity Services are loaded.
    gisLoaded() {
        tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: this.CLIENT_ID,
            scope: this.AUTH_URL,
            callback: '', // defined later
        });
        gisInited = true;
    }

    // Sign in the user upon button click.
    save(fileName, contents) {
        tokenClient.callback = async (resp) => {
            if (resp.error !== undefined) {
                throw (resp);
            }
            await uploadFile(fileName, contents);
        };

        if (gapi.client.getToken() === null) {
            // Prompt the user to select a Google Account and 
            // ask for consent to share their data when establishing a new session.
            tokenClient.requestAccessToken({ prompt: 'consent' });
        } else {
            // Skip display of account chooser and consent dialog for an existing session.
            tokenClient.requestAccessToken({ prompt: '' });
        }
    }

    // Sign out the user upon button click.
    signOut() {
        const token = gapi.client.getToken();
        if (token !== null) {
            google.accounts.oauth2.revoke(token.access_token);
            gapi.client.setToken('');
        }
    }

    // Upload file to Google Drive.
    async uploadFile(fileName, contents) {
        var file = new Blob([contents], { type: 'text/plain' });

        var metadata = {
            'name': fileName,                               // Filename at Google Drive
            'mimeType': 'text/plain',                       // mimeType at Google Drive
            // TODO [Optional]: Set the below credentials
            // Note: remove this parameter, if no target is needed
            //'parents': ['SET-GOOGLE-DRIVE-FOLDER-ID'],      // Folder ID at Google Drive which is optional
        };

        var form = new FormData();
        form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
        form.append('file', file);

        // Here gapi is used for retrieving the access token.
        var accessToken = gapi.auth.getToken().access_token;

        var xhr = new XMLHttpRequest();
        xhr.open('post', this.UPLOAD_URL);
        xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
        xhr.responseType = 'json';
        xhr.onload = () => {
            var fileId = xhr.response.id;
            var message = `File uploaded successfully. The Google Drive file id is ${fileId}`;
            alert(message);
        };
        xhr.send(form);
    }

    async downloadFile(fileId) {
        const url = `https://drive.google.com/uc?id=${fileId}`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // return response.text(); // or response.json() for JSON files 
                return response.json();  
            })
            .then(data => {
                console.log(data); 
                return data;
            })
            .catch(error => {
                console.error('Fetch error:', error);
            }
        );
    }
}