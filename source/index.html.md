---
title: mod.works API v1
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - javascript--nodejs: Node.JS
  - python: Python
  - ruby: Ruby
  - java: Java
toc_footers:
  - '<a href="https://mod.works/about">Find out more about mod.works</a>'
includes:
  - _modworks.md
search: true
highlight_theme: darkula
---

# mod.works API v1

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Welcome to the official mod.works API. You will find everything you need about connecting with modWORKS via the endpoints below.

Base URLs:

* <a href="https://api.mworks.com/v1/">https://api.mworks.com/v1/</a>

<a href="https://mod.works/terms">Terms of service</a>
Email: <a href="mailto:admin@mod.works">Support</a>
License: <a href="http://www.apache.org/licenses/LICENSE-2.0.html">Apache 2.0</a>

# Authentication


* API Key
    - Parameter Name: **api_key**, in: query. 





- oAuth2 authentication. 

    - Flow: undefined


|Scope|Scope Description|
|---|---|
|read|Read only, no resources can be modified.|
|write|Can add, edit or delete resources.|




# Mods

## Browse Files

> Code samples

```shell
# You can also use wget
curl -X get https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/files?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/files?api_key=YourApiKey HTTP/1.1
Host: api.mworks.com

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/files',
  method: 'get',
  data: '?api_key=YourApiKey',
  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

```javascript--nodejs
const request = require('node-fetch');

const headers = {
  'Accept':'application/json'

};

fetch('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/files?api_key=YourApiKey',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/files', params: {
  'api_key' => 'string'
}, headers: headers

p JSON.parse(result)
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/files', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/files?api_key=YourApiKey");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());
```

`GET games/{game-id}/mods/{mod-id}/files`

*Browse files*

Browse files that are published for the corresponding mod. Successful request will return an __array of file objects__.  <br /><br />`api_key: <your-api-key>` __or__ `Authorization: Bearer <your-access-token>` must be present.

### Responses

Status|Meaning|Description
---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Request

> Example responses

```json
{
  "data": [
    {
      "id": 2,
      "mod": 2,
      "member": 38,
      "date": 1499841487,
      "datevirus": 1499841487,
      "virusstatus": 0,
      "viruspositive": 0,
      "filesize": 15181,
      "filehash": "2d4a0e2d7273db6b0a94b0740a88ad0d",
      "filename": "rogue-knight-v1.zip",
      "version": "1.3",
      "virustotal": "No threats found.",
      "changelog": "VERSION 1.3 -- Changes -- Fixed critical bug where you can fall through the castle floor on level 3.",
      "download": "https://cdn.mworks.com/files/1/1/2/rogue-knight-v1.zip"
    }
  ]
}
```
<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>

## Add File

> Code samples

```shell
# You can also use wget
curl -X post https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/files \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: multipart/form-data' \
  -H 'Accept: application/json'

```

```http
POST https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/files HTTP/1.1
Host: api.mworks.com

Accept: application/json
Authorization: Bearer YourAccessToken
Content-Type: multipart/form-data

```

```javascript
var headers = {
  'Authorization':'Bearer YourAccessToken',
  'Content-Type':'multipart/form-data',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/files',
  method: 'post',

  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

```javascript--nodejs
const request = require('node-fetch');

const headers = {
  'Authorization':'Bearer YourAccessToken',
  'Content-Type':'multipart/form-data',
  'Accept':'application/json'

};

fetch('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/files',
{
  method: 'POST',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer YourAccessToken',
  'Content-Type' => 'multipart/form-data',
  'Accept' => 'application/json'
}

result = RestClient.post 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/files', params: {
  }, headers: headers

p JSON.parse(result)
```

```python
import requests
headers = {
  'Authorization': 'Bearer YourAccessToken',
  'Content-Type': 'multipart/form-data',
  'Accept': 'application/json'
}

r = requests.post('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/files', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/files");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());
```

`POST games/{game-id}/mods/{mod-id}/files`

*Add a file to a mod.*

Upload a file to a mod.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     filedata|file|true|The binary file for the release. File must be __zipped__ and cannot exceed 10GB in size.
     version|string|true|Version of the file release.
     changelog|string|true|The changelog field you are updating. Updates for files are deliberately limited to the changelog field only, if you need to edit any other fields you should be uploading a new file and not editing an existing file.
     active|boolean||Label this upload as the current release, this will change the *modfile* field on the parent mod to the *id* field of this file after upload.

### Responses

Status|Meaning|Description
---|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Resource Created

### Response Headers

Status|Header|Type|Format|Description
---|---|---|---|---|
201|Location|string||URL to newly created resource

> Example responses

```json
{
  "code": 201,
  "message": "You have successfully uploaded a new build to the specified repository."
}
```
<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>

## View

> Code samples

```shell
# You can also use wget
curl -X get https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}?api_key=YourApiKey HTTP/1.1
Host: api.mworks.com

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}',
  method: 'get',
  data: '?api_key=YourApiKey',
  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

```javascript--nodejs
const request = require('node-fetch');

const headers = {
  'Accept':'application/json'

};

fetch('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}?api_key=YourApiKey',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}', params: {
  'api_key' => 'string'
}, headers: headers

p JSON.parse(result)
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}?api_key=YourApiKey");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());
```

`GET games/{game-id}/mods/{mod-id}`

*View a single mod*

Successful request will return a single __mod object__.

### Responses

Status|Meaning|Description
---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Request

> Example responses

```json
{
  "id": 2,
  "game": 2,
  "member": 2,
  "datereg": 1492564103,
  "dateup": 1499841487,
  "logo": {
    "full": "https://media.mworks.com/images/mods/1/1/2/IMG_20170409_222419.jpg",
    "thumbnail": "https://media.mworks.com/cache/images/mods/1/1/2/thumb_1020x2000/IMG_20170409_222419.jpg",
    "filename": "IMG_20170409_222419.jpg"
  },
  "homepage": "https://www.rogue-hdpack.com/",
  "name": "Rogue Knight HD Pack",
  "nameid": "rogue-knight-hd-pack",
  "summary": "Tired of the old average Rogue Knight textures? It's time to bask in the glory of beautiful 4k textures!",
  "description": "<h2>About</h2><p>Rogue HD Pack does exactly what you thinks it does, makes your Rogue world more beautiful than ever.</p><h2>How to install</h2><p>Simply copy the files from the 'data' folder into your 'game/assets' folder overwriting any existing files and you are good to go!</p>",
  "metadata": "rogue,hd,high-res,4k,hd textures",
  "modfile": {
    "id": 2,
    "mod": 2,
    "member": 38,
    "date": 1499841487,
    "datevirus": 1499841487,
    "virusstatus": 0,
    "viruspositive": 0,
    "filesize": 15181,
    "filehash": "2d4a0e2d7273db6b0a94b0740a88ad0d",
    "filename": "rogue-knight-v1.zip",
    "version": "1.3",
    "virustotal": "No threats found.",
    "changelog": "VERSION 1.3 -- Changes -- Fixed critical bug where you can fall through the castle floor on level 3.",
    "download": "https://cdn.mworks.com/files/1/1/2/rogue-knight-v1.zip"
  },
  "media": {
    "youtube": [
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    ],
    "sketchfab": [
      "https://sketchfab.com/models/ef40b2d300334d009984c8865b2db1c8"
    ],
    "images": [
      {}
    ]
  },
  "tags": [
    {}
  ],
  "reviews": {
    "reviews": 583,
    "avgrating": 8.1
  }
}
```
<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>

## Edit File

> Code samples

```shell
# You can also use wget
curl -X put https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/files/{file-id} \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
PUT https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/files/{file-id} HTTP/1.1
Host: api.mworks.com

Accept: application/json
Authorization: Bearer YourAccessToken
Content-Type: application/x-www-form-urlencoded

```

```javascript
var headers = {
  'Authorization':'Bearer YourAccessToken',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/files/{file-id}',
  method: 'put',

  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

```javascript--nodejs
const request = require('node-fetch');

const headers = {
  'Authorization':'Bearer YourAccessToken',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/files/{file-id}',
{
  method: 'PUT',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer YourAccessToken',
  'Content-Type' => 'application/x-www-form-urlencoded',
  'Accept' => 'application/json'
}

result = RestClient.put 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/files/{file-id}', params: {
  }, headers: headers

p JSON.parse(result)
```

```python
import requests
headers = {
  'Authorization': 'Bearer YourAccessToken',
  'Content-Type': 'application/x-www-form-urlencoded',
  'Accept': 'application/json'
}

r = requests.put('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/files/{file-id}', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/files/{file-id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());
```

`PUT games/{game-id}/mods/{mod-id}/files/{file-id}`

*Update details for a file*

Update the details for a published file on mod.works. If you are wanting to update fields other than changelog, you should be creating a new file instead.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     changelog|string||The changelog field you are updating. Updates for files are deliberately limited to the *changelog* field and *active* fields only, if you need to edit any other fields you should be uploading a new file and not editing an existing file.
     active|boolean||Label this upload as the current release, this will change the *modfile* field on the parent mod to the *id* field of this file after upload.

### Responses

Status|Meaning|Description
---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Update Successful

> Example responses

```json
{
  "code": "200",
  "message": "You have successfully updated the specified file."
}
```
<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>

## Browse

> Code samples

```shell
# You can also use wget
curl -X get https://api.mworks.com/v1/games/{game-id}/mods?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mworks.com/v1/games/{game-id}/mods?api_key=YourApiKey HTTP/1.1
Host: api.mworks.com

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mworks.com/v1/games/{game-id}/mods',
  method: 'get',
  data: '?api_key=YourApiKey',
  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

```javascript--nodejs
const request = require('node-fetch');

const headers = {
  'Accept':'application/json'

};

fetch('https://api.mworks.com/v1/games/{game-id}/mods?api_key=YourApiKey',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get 'https://api.mworks.com/v1/games/{game-id}/mods', params: {
  'api_key' => 'string'
}, headers: headers

p JSON.parse(result)
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.mworks.com/v1/games/{game-id}/mods', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mworks.com/v1/games/{game-id}/mods?api_key=YourApiKey");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());
```

`GET games/{game-id}/mods`

*Browse Mods*

Successful request will return an __array of mod objects__. For details and examples on filtering results see our [filtering documentation](https://mod.works/docs#filtering).

### Responses

Status|Meaning|Description
---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Request

> Example responses

```json
{
  "data": [
    {
      "id": 2,
      "game": 2,
      "member": 2,
      "datereg": 1492564103,
      "dateup": 1499841487,
      "logo": {
        "full": "https://media.mworks.com/images/mods/1/1/2/IMG_20170409_222419.jpg",
        "thumbnail": "https://media.mworks.com/cache/images/mods/1/1/2/thumb_1020x2000/IMG_20170409_222419.jpg",
        "filename": "IMG_20170409_222419.jpg"
      },
      "homepage": "https://www.rogue-hdpack.com/",
      "name": "Rogue Knight HD Pack",
      "nameid": "rogue-knight-hd-pack",
      "summary": "Tired of the old average Rogue Knight textures? It's time to bask in the glory of beautiful 4k textures!",
      "description": "<h2>About</h2><p>Rogue HD Pack does exactly what you thinks it does, makes your Rogue world more beautiful than ever.</p><h2>How to install</h2><p>Simply copy the files from the 'data' folder into your 'game/assets' folder overwriting any existing files and you are good to go!</p>",
      "metadata": "rogue,hd,high-res,4k,hd textures",
      "modfile": {
        "id": 2,
        "mod": 2,
        "member": 38,
        "date": 1499841487,
        "datevirus": 1499841487,
        "virusstatus": 0,
        "viruspositive": 0,
        "filesize": 15181,
        "filehash": "2d4a0e2d7273db6b0a94b0740a88ad0d",
        "filename": "rogue-knight-v1.zip",
        "version": "1.3",
        "virustotal": "No threats found.",
        "changelog": "VERSION 1.3 -- Changes -- Fixed critical bug where you can fall through the castle floor on level 3.",
        "download": "https://cdn.mworks.com/files/1/1/2/rogue-knight-v1.zip"
      },
      "media": {
        "youtube": [
          "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        ],
        "sketchfab": [
          "https://sketchfab.com/models/ef40b2d300334d009984c8865b2db1c8"
        ],
        "images": [
          {}
        ]
      },
      "tags": [
        {}
      ],
      "reviews": {
        "reviews": 583,
        "avgrating": 8.1
      }
    }
  ]
}
```
<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>

## Add

> Code samples

```shell
# You can also use wget
curl -X post https://api.mworks.com/v1/games/{game-id}/mods \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: multipart/form-data' \
  -H 'Accept: application/json'

```

```http
POST https://api.mworks.com/v1/games/{game-id}/mods HTTP/1.1
Host: api.mworks.com

Accept: application/json
Authorization: Bearer YourAccessToken
Content-Type: multipart/form-data

```

```javascript
var headers = {
  'Authorization':'Bearer YourAccessToken',
  'Content-Type':'multipart/form-data',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mworks.com/v1/games/{game-id}/mods',
  method: 'post',

  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

```javascript--nodejs
const request = require('node-fetch');

const headers = {
  'Authorization':'Bearer YourAccessToken',
  'Content-Type':'multipart/form-data',
  'Accept':'application/json'

};

fetch('https://api.mworks.com/v1/games/{game-id}/mods',
{
  method: 'POST',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer YourAccessToken',
  'Content-Type' => 'multipart/form-data',
  'Accept' => 'application/json'
}

result = RestClient.post 'https://api.mworks.com/v1/games/{game-id}/mods', params: {
  }, headers: headers

p JSON.parse(result)
```

```python
import requests
headers = {
  'Authorization': 'Bearer YourAccessToken',
  'Content-Type': 'multipart/form-data',
  'Accept': 'application/json'
}

r = requests.post('https://api.mworks.com/v1/games/{game-id}/mods', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mworks.com/v1/games/{game-id}/mods");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());
```

`POST games/{game-id}/mods`

*Publish a mod on mod.works*

While some fields have been made optional for easier adding of mods to mod.works - please be as detailed as you can.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     logo|file|true|Image file which will represent your new mod logo. Must be gif, jpg, jpeg or png format and cannot exceed 8MB in size.Image file which will represent your new mod logo. Must be gif, jpg, jpeg or png format and cannot exceed 8MB in size.
     name|string|true|Name of your mod. Your default mod URL will contain the name so be sure to choose the most appropriate title. Example: Stellaris Shader Mod will become the URL stellaris-shader-mod.
     homepage|string|true|Official homepage for your mod, if you do not fill this out it will default to your mod.works profile. Must be a valid URL.
     summary|string|true|Summary for your mod, giving a brief overview of what it's about - cannot exceed 250 characters.
     price|double||Numeric only representation of the price if you intend to charge for your mod. Example: 19.99, 10.00.
     stock|integer||Artificially limit the amount of times the mod can be purchased.
     description|string||An extension of your summary. Include all information relevant to your mod including sections such as 'About', 'Features', 'Install Instructions', 'FAQ', etc. HTML supported and encouraged.
     metadata|string||Comma-separated list of metadata strings that are relevant to your mod.
     nameid|string||The unique SEO friendly URL for your game. Cannot exceed 80 characters
     modfile|integer||Unique id of the __file__ object to be labelled as the current release.

### Responses

Status|Meaning|Description
---|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Resource Created

### Response Headers

Status|Header|Type|Format|Description
---|---|---|---|---|
201|Location|string||URL to newly created resource

> Example responses

```json
{
  "code": "201",
  "message": "Your have successfully created your mod profile - You now must submit a file for your mod to be activated via making a POST request to the /files endpoint."
}
```
<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>

## Edit

> Code samples

```shell
# You can also use wget
curl -X put https://api.mworks.com/v1/games/{game-id}/mods/{mod-id} \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
PUT https://api.mworks.com/v1/games/{game-id}/mods/{mod-id} HTTP/1.1
Host: api.mworks.com

Accept: application/json
Authorization: Bearer YourAccessToken
Content-Type: application/x-www-form-urlencoded

```

```javascript
var headers = {
  'Authorization':'Bearer YourAccessToken',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}',
  method: 'put',

  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

```javascript--nodejs
const request = require('node-fetch');

const headers = {
  'Authorization':'Bearer YourAccessToken',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}',
{
  method: 'PUT',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer YourAccessToken',
  'Content-Type' => 'application/x-www-form-urlencoded',
  'Accept' => 'application/json'
}

result = RestClient.put 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}', params: {
  }, headers: headers

p JSON.parse(result)
```

```python
import requests
headers = {
  'Authorization': 'Bearer YourAccessToken',
  'Content-Type': 'application/x-www-form-urlencoded',
  'Accept': 'application/json'
}

r = requests.put('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());
```

`PUT games/{game-id}/mods/{mod-id}`

*Edit details for a mod*

If you are wanting to update the media attached to this game, you should use the Add Media endpoint.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     logo|file||Image file which will represent your new mod logo. Must be gif, jpg, jpeg or png format and cannot exceed 8MB in size.Image file which will represent your new mod logo. Must be gif, jpg, jpeg or png format and cannot exceed 8MB in size.
     name|string||Name of your mod. Your default mod URL will contain the name so be sure to choose the most appropriate title. Example: Stellaris Shader Mod will become the URL stellaris-shader-mod.
     homepage|string||Official homepage for your mod, if you do not fill this out it will default to your mod.works profile. Must be a valid URL.
     summary|string||Summary for your mod, giving a brief overview of what it's about - cannot exceed 250 characters.
     price|double||Numeric only representation of the price if you intend to charge for your mod. Example: 19.99, 10.00.
     stock|integer||Artificially limit the amount of times the mod can be purchased.
     description|string||An extension of your summary. Include all information relevant to your mod including sections such as 'About', 'Features', 'Install Instructions', 'FAQ', etc. HTML supported and encouraged.
     metadata|string||Comma-separated list of metadata strings that are relevant to your mod.
     nameid|string||The unique SEO friendly URL for your game. Cannot exceed 80 characters
     modfile|integer||Unique id of the __file__ object to be labelled as the current release.

### Responses

Status|Meaning|Description
---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Update Successful

> Example responses

```json
{
  "code": "200",
  "message": "You have successfully updated the specified mod profile."
}
```
<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>

## Add Media

> Code samples

```shell
# You can also use wget
curl -X post https://api.mworks.com/v1/games/{game-id}/mods/{mod-id} \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: multipart/form-data' \
  -H 'Accept: application/json'

```

```http
POST https://api.mworks.com/v1/games/{game-id}/mods/{mod-id} HTTP/1.1
Host: api.mworks.com

Accept: application/json
Authorization: Bearer YourAccessToken
Content-Type: multipart/form-data

```

```javascript
var headers = {
  'Authorization':'Bearer YourAccessToken',
  'Content-Type':'multipart/form-data',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}',
  method: 'post',

  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

```javascript--nodejs
const request = require('node-fetch');

const headers = {
  'Authorization':'Bearer YourAccessToken',
  'Content-Type':'multipart/form-data',
  'Accept':'application/json'

};

fetch('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}',
{
  method: 'POST',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer YourAccessToken',
  'Content-Type' => 'multipart/form-data',
  'Accept' => 'application/json'
}

result = RestClient.post 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}', params: {
  }, headers: headers

p JSON.parse(result)
```

```python
import requests
headers = {
  'Authorization': 'Bearer YourAccessToken',
  'Content-Type': 'multipart/form-data',
  'Accept': 'application/json'
}

r = requests.post('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());
```

`POST games/{game-id}/mods/{mod-id}`

*Add images, youtube or sketchfab links.*

This endpoint is very flexible and will process any images posted to the endpoint regardless of their body name providing it is a valid image. The request `Content-Type` __must__ be `multipart/form-data` to submit image files.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     images|zip||Zip archive of images to upload. Only valid gif, jpg, jpeg or png binary images within the zip file will be processed. The filename __must be images.zip__ if you are submitting an archive of images as any other name will be ignored. Alternatively you can POST one or more binary file images to this endpoint as their original filetypes without any compression.
     youtube|array||Full Youtube link(s) you want to add - example 'https://www.youtube.com/watch?v=IGVZOLV9SPo'
     sketchfab|array||Full Sketchfab link(s) you want to add - example 'https://sketchfab.com/models/71f04e390ff54e5f8d9a51b4e1caab7e'

### Responses

Status|Meaning|Description
---|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Resource Created

### Response Headers

Status|Header|Type|Format|Description
---|---|---|---|---|
201|Location|string||URL to newly created resource

> Example responses

```json
{
  "code": "201",
  "message": "You have successfully added new media to the specified mod profile."
}
```
<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>

## Delete

> Code samples

```shell
# You can also use wget
curl -X delete https://api.mworks.com/v1/games/{game-id}/mods/{mod-id} \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
DELETE https://api.mworks.com/v1/games/{game-id}/mods/{mod-id} HTTP/1.1
Host: api.mworks.com

Accept: application/json
Authorization: Bearer YourAccessToken
Content-Type: application/x-www-form-urlencoded

```

```javascript
var headers = {
  'Authorization':'Bearer YourAccessToken',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}',
  method: 'delete',

  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

```javascript--nodejs
const request = require('node-fetch');

const headers = {
  'Authorization':'Bearer YourAccessToken',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer YourAccessToken',
  'Content-Type' => 'application/x-www-form-urlencoded',
  'Accept' => 'application/json'
}

result = RestClient.delete 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}', params: {
  }, headers: headers

p JSON.parse(result)
```

```python
import requests
headers = {
  'Authorization': 'Bearer YourAccessToken',
  'Content-Type': 'application/x-www-form-urlencoded',
  'Accept': 'application/json'
}

r = requests.delete('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());
```

`DELETE games/{game-id}/mods/{mod-id}`

*Delete a mod profile.*

Delete a mod profile which will if successful will return `204 No Content`. Note this will close the mod profile which means it cannot be viewed or retrieved via API requests but will still exist in-case you choose to restore it at a later date. If you believe a mod should be permanently removed please [contact us](mailto:support@mod.works). <br /><br />Access Token **must** be present in `Authorization` header.

### Responses

Status|Meaning|Description
---|---|---|
204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|No Content

> Example responses

```json
"204 No Content"
```
<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>

## Delete Media

> Code samples

```shell
# You can also use wget
curl -X delete https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/media \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
DELETE https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/media HTTP/1.1
Host: api.mworks.com

Accept: application/json
Authorization: Bearer YourAccessToken
Content-Type: application/x-www-form-urlencoded

```

```javascript
var headers = {
  'Authorization':'Bearer YourAccessToken',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/media',
  method: 'delete',

  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

```javascript--nodejs
const request = require('node-fetch');

const headers = {
  'Authorization':'Bearer YourAccessToken',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/media',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer YourAccessToken',
  'Content-Type' => 'application/x-www-form-urlencoded',
  'Accept' => 'application/json'
}

result = RestClient.delete 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/media', params: {
  }, headers: headers

p JSON.parse(result)
```

```python
import requests
headers = {
  'Authorization': 'Bearer YourAccessToken',
  'Content-Type': 'application/x-www-form-urlencoded',
  'Accept': 'application/json'
}

r = requests.delete('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/media', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/media");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());
```

`DELETE games/{game-id}/mods/{mod-id}/media`

*Delete images, sketchfab or youtube links.*

Delete media from a mod profile which if successful will return `204 No Content`. This endpoint allows you to delete images as well as YouTube & Sketchfab links.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     images|array||Filenames of the image(s) you want to delete - example 'gameplay2.jpg'
     youtube|array||Full Youtube link(s) you want to delete - example 'https://www.youtube.com/watch?v=IGVZOLV9SPo'
     sketchfab|array||Full Sketchfab link(s) you want to delete - example 'https://sketchfab.com/models/71f04e390ff54e5f8d9a51b4e1caab7e'
     *     

### Responses

Status|Meaning|Description
---|---|---|
204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|No Content

> Example responses

```json
"204 No Content"
```
<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>

## Mod Activity

> Code samples

```shell
# You can also use wget
curl -X get https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/activity?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/activity?api_key=YourApiKey HTTP/1.1
Host: api.mworks.com

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/activity',
  method: 'get',
  data: '?api_key=YourApiKey',
  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

```javascript--nodejs
const request = require('node-fetch');

const headers = {
  'Accept':'application/json'

};

fetch('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/activity?api_key=YourApiKey',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/activity', params: {
  'api_key' => 'string'
}, headers: headers

p JSON.parse(result)
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/activity', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/activity?api_key=YourApiKey");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());
```

`GET games/{game-id}/mods/{mod-id}/activity`

*View activity for a mod, showing changes made to the resource.*

Successful request will return an __array of activity objects__. For details and examples on filtering results see our [filtering documentation](https://mod.works/docs#filtering).

### Responses

Status|Meaning|Description
---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Request

> Example responses

```json
{
  "data": [
    {
      "member": 31342,
      "username": "XanT",
      "dateup": 1499846132,
      "event": "MOD_UPDATE",
      "changes": {
        "summary": {
          "before": "https://www.roguehdpack.com/",
          "after": "https://rogue-knight.mod.works/rogue-hd-pack"
        }
      }
    }
  ]
}
```
<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>

# Games

## Browse

> Code samples

```shell
# You can also use wget
curl -X get https://api.mworks.com/v1/games?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mworks.com/v1/games?api_key=YourApiKey HTTP/1.1
Host: api.mworks.com

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mworks.com/v1/games',
  method: 'get',
  data: '?api_key=YourApiKey',
  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

```javascript--nodejs
const request = require('node-fetch');

const headers = {
  'Accept':'application/json'

};

fetch('https://api.mworks.com/v1/games?api_key=YourApiKey',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get 'https://api.mworks.com/v1/games', params: {
  'api_key' => 'string'
}, headers: headers

p JSON.parse(result)
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.mworks.com/v1/games', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mworks.com/v1/games?api_key=YourApiKey");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());
```

`GET games`

*Browse Games*

Successful request will return an __array of game objects__. For details and examples on filtering results see our [filtering documentation](https://mod.works/docs#filtering).

### Responses

Status|Meaning|Description
---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK

> Example responses

```json
{
  "data": [
    {
      "id": 2,
      "member": 31342,
      "datereg": 1493702614,
      "dateup": 1499410290,
      "presentation": 1,
      "community": 3,
      "submission": 0,
      "curation": 0,
      "revenue": 1500,
      "api": 3,
      "ugcname": "map",
      "icon": {
        "full": "https://media.mworks.com/images/games/1/1/2/icon.png",
        "thumbnail": "https://media.mworks.com/cache/images/mods/1/1/2/crop_320x180/icon.png",
        "filename": "icon.png"
      },
      "logo": {
        "full": "https://media.mworks.com/images/games/1/1/2/gamelogo.jpg",
        "thumbnail": "https://media.mworks.com/cache/images/mods/1/1/2/thumb_1020x2000/gamelogo.jpg",
        "filename": "gamelogo.jpg"
      },
      "header": {
        "full": "https://media.mworks.com/images/games/1/1/2/gameheader.png",
        "filename": "gameheader.png"
      },
      "homepage": "https://www.rogue-knight-game.com/",
      "name": "Rogue Knight",
      "nameid": "rogue-knight",
      "summary": "Rogue Knight is a brand new 2D pixel platformer.",
      "instructions": "Instructions here on how to develop for your game.",
      "tags": [
        {}
      ]
    }
  ]
}
```
<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>

## View

> Code samples

```shell
# You can also use wget
curl -X get https://api.mworks.com/v1/games/{game-id}?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mworks.com/v1/games/{game-id}?api_key=YourApiKey HTTP/1.1
Host: api.mworks.com

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mworks.com/v1/games/{game-id}',
  method: 'get',
  data: '?api_key=YourApiKey',
  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

```javascript--nodejs
const request = require('node-fetch');

const headers = {
  'Accept':'application/json'

};

fetch('https://api.mworks.com/v1/games/{game-id}?api_key=YourApiKey',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get 'https://api.mworks.com/v1/games/{game-id}', params: {
  'api_key' => 'string'
}, headers: headers

p JSON.parse(result)
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.mworks.com/v1/games/{game-id}', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mworks.com/v1/games/{game-id}?api_key=YourApiKey");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());
```

`GET games/{game-id}`

*View a single game*

Successful request will return a single __game object__.

### Responses

Status|Meaning|Description
---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Request successful

> Example responses

```json
{
  "id": 2,
  "member": 31342,
  "datereg": 1493702614,
  "dateup": 1499410290,
  "presentation": 1,
  "community": 3,
  "submission": 0,
  "curation": 0,
  "revenue": 1500,
  "api": 3,
  "ugcname": "map",
  "icon": {
    "full": "https://media.mworks.com/images/games/1/1/2/icon.png",
    "thumbnail": "https://media.mworks.com/cache/images/mods/1/1/2/crop_320x180/icon.png",
    "filename": "icon.png"
  },
  "logo": {
    "full": "https://media.mworks.com/images/games/1/1/2/gamelogo.jpg",
    "thumbnail": "https://media.mworks.com/cache/images/mods/1/1/2/thumb_1020x2000/gamelogo.jpg",
    "filename": "gamelogo.jpg"
  },
  "header": {
    "full": "https://media.mworks.com/images/games/1/1/2/gameheader.png",
    "filename": "gameheader.png"
  },
  "homepage": "https://www.rogue-knight-game.com/",
  "name": "Rogue Knight",
  "nameid": "rogue-knight",
  "summary": "Rogue Knight is a brand new 2D pixel platformer.",
  "instructions": "Instructions here on how to develop for your game.",
  "tags": [
    {}
  ]
}
```
<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>

## Edit

> Code samples

```shell
# You can also use wget
curl -X put https://api.mworks.com/v1/games/{game-id} \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
PUT https://api.mworks.com/v1/games/{game-id} HTTP/1.1
Host: api.mworks.com

Accept: application/json
Authorization: Bearer YourAccessToken
Content-Type: application/x-www-form-urlencoded

```

```javascript
var headers = {
  'Authorization':'Bearer YourAccessToken',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mworks.com/v1/games/{game-id}',
  method: 'put',

  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

```javascript--nodejs
const request = require('node-fetch');

const headers = {
  'Authorization':'Bearer YourAccessToken',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://api.mworks.com/v1/games/{game-id}',
{
  method: 'PUT',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer YourAccessToken',
  'Content-Type' => 'application/x-www-form-urlencoded',
  'Accept' => 'application/json'
}

result = RestClient.put 'https://api.mworks.com/v1/games/{game-id}', params: {
  }, headers: headers

p JSON.parse(result)
```

```python
import requests
headers = {
  'Authorization': 'Bearer YourAccessToken',
  'Content-Type': 'application/x-www-form-urlencoded',
  'Accept': 'application/json'
}

r = requests.put('https://api.mworks.com/v1/games/{game-id}', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mworks.com/v1/games/{game-id}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());
```

`PUT games/{game-id}`

*Update details for a game*

If you are wanting to update the media attached to this game, you should use the Add Media endpoint.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     presentation|integer||Choose which presentation style you want to use for your game on the mod.works website.
     community|integer||Choose what community can/cannot do with your game.
     submission|integer||Choose submission setting
     curation|integer||Choose curation setting
     api|integer||Choose how accessible your game is via the API
     ugcname|string||Singular word to best describe your games user-generated content
     homepage|string||Official homepage for your game, if you do not fill this out it will default to your mod.works profile. Must be a valid URL.
     name|string||The name of your game. Highly recommended to not change this unless absolutely required
     nameid|string||The unique SEO friendly URL for your game. Cannot exceed 80 characters
     summary|string||Summary for your game, giving a brief overview of what it's about - cannot exceed 250 characters
     instructions|string||Instructions on how modders can get started with modding your game. HTML supported and encouraged

### Responses

Status|Meaning|Description
---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Update successful

> Example responses

```json
{
  "code": "200",
  "message": "You have successfully updated to the specified game profile."
}
```
<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>

## Add Media

> Code samples

```shell
# You can also use wget
curl -X post https://api.mworks.com/v1/games/{game-id}/media \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: multipart/form-data' \
  -H 'Accept: application/json'

```

```http
POST https://api.mworks.com/v1/games/{game-id}/media HTTP/1.1
Host: api.mworks.com

Accept: application/json
Authorization: Bearer YourAccessToken
Content-Type: multipart/form-data

```

```javascript
var headers = {
  'Authorization':'Bearer YourAccessToken',
  'Content-Type':'multipart/form-data',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mworks.com/v1/games/{game-id}/media',
  method: 'post',

  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

```javascript--nodejs
const request = require('node-fetch');

const headers = {
  'Authorization':'Bearer YourAccessToken',
  'Content-Type':'multipart/form-data',
  'Accept':'application/json'

};

fetch('https://api.mworks.com/v1/games/{game-id}/media',
{
  method: 'POST',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer YourAccessToken',
  'Content-Type' => 'multipart/form-data',
  'Accept' => 'application/json'
}

result = RestClient.post 'https://api.mworks.com/v1/games/{game-id}/media', params: {
  }, headers: headers

p JSON.parse(result)
```

```python
import requests
headers = {
  'Authorization': 'Bearer YourAccessToken',
  'Content-Type': 'multipart/form-data',
  'Accept': 'application/json'
}

r = requests.post('https://api.mworks.com/v1/games/{game-id}/media', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mworks.com/v1/games/{game-id}/media");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());
```

`POST games/{game-id}/media`

*Upload new media to a game*

Update the media attached to a game.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     logo|file||Binary image file which will represent your new game logo. Must be gif, jpg, jpeg or png format and cannot exceed 8MB in size.
     icon|file||Binary image file which will represent your new game icon. Must be minimum 64x64px in size - gif, jpg, jpeg or png format and cannot exceed 1MB in size.
     header|file||Binary image file which will represent your new game header. Must be gif, jpg, jpeg or png format and cannot exceed 256KB in size.

### Responses

Status|Meaning|Description
---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Media Successfully uploaded

> Example responses

```json
{
  "code": "200",
  "message": "You have successfully added new media to the specified game profile."
}
```
<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>

## Game Activity

> Code samples

```shell
# You can also use wget
curl -X get https://api.mworks.com/v1/games/{game-id}/activity?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mworks.com/v1/games/{game-id}/activity?api_key=YourApiKey HTTP/1.1
Host: api.mworks.com

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mworks.com/v1/games/{game-id}/activity',
  method: 'get',
  data: '?api_key=YourApiKey',
  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

```javascript--nodejs
const request = require('node-fetch');

const headers = {
  'Accept':'application/json'

};

fetch('https://api.mworks.com/v1/games/{game-id}/activity?api_key=YourApiKey',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get 'https://api.mworks.com/v1/games/{game-id}/activity', params: {
  'api_key' => 'string'
}, headers: headers

p JSON.parse(result)
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.mworks.com/v1/games/{game-id}/activity', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mworks.com/v1/games/{game-id}/activity?api_key=YourApiKey");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());
```

`GET games/{game-id}/activity`

*View activity for a game, showing changes made to the resource.*

Successful request will return an __array of activity objects__.

### Responses

Status|Meaning|Description
---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response

> Example responses

```json
{
  "data": [
    {
      "member": 31342,
      "username": "XanT",
      "dateup": 1499846132,
      "event": "GAME_UPDATE",
      "changes": {
        "summary": {
          "before": "https://www.roguehdpack.com/",
          "after": "https://rogue-knight.mod.works/rogue-hd-pack"
        }
      }
    }
  ]
}
```
<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>



