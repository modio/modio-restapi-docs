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
includes: []
search: true
highlight_theme: darkula
---

# Getting Started

## mod.works API v1

Welcome to the official `v1` API documentation for [mod.works](https://mworks.com). Please ensure you read all all of the Getting Started content to ensure you can accurately and effeciently consume our REST API. 

__Current version:__ `v1`

__Base path:__ [https://api.mworks.com/v1](https://api.mworks.com/v1)

## Overview

Here is a brief list of the main things to know about our API, as explained in more detail in the following sections.

- All requests to the API __must__ be made over HTTPS.
- All API responses are in `application/json` format.
- Api-keys are restricted to read-only `GET` requests.
- OAuth2 access tokens are required for `POST`, `PUT` and `DELETE` requests.
- Binary data `POST` requests must use `Content-Type: multipart/form-data` header.
- Non-binary `POST`, `PUT` and `DELETE` requests must use `Content-Type: application/x-www-form-urlencoded` header.
- Non-binary data can optionally be supplied in `application/json` using the `input_json` parameter. 
- Rate limiting is implemented with varying limits depending on the resource type.

## Authentication

Authentication to the mod.works API can be done via two ways:

- Api keys 
- Access Tokens (OAuth2)

Which method of authentication can depend on which way you intend on consuming the mod.works API.

Authentication Type | In | Methods | Abilities
---------- | ---------- | ---------- | ---------- 
Api Key | Query or Header | `GET` | Api keys are ideal if you only intend on making `GET` requests to read data, you cannot create new resources, modify or remove existing resources with an api key. 
Access Token | Header | `GET`, `POST`, `PUT`, `DELETE` | Access Tokens can do everything on the API. You can create, edit, update and delete resources. Additional scopes are also available to limit the specify the privileges for a particular token.

### Api Key Authentication

#### Generating your Api key

For game creators, you can simply create api keys for the respective game via the 'API' console on the mod.works portal via the following link:

_https://your-game-here.mod.works/edit/api_

#### Authenticating with your Api key

```shell
curl https://api.mod.works/v1/games?api_key=xxxxxxxxxxxxxxxx
``` 

To authenticate to the API using your key using your unique 32-character key simply append the `api_key=xxxxxxxxxxxxxxxx` parameter to the end of your request. Remember that using an api key essentially means being in read-only mode, and that if you want to create, update or delete resources then an access token is required.

### OAuth 2 Authentication

### Scopes

TODO

### Creating a client

TODO

### Generating an access token

TODO

### Revoking an access token

TODO

### Authenticating with your access token

TODO

## Making Requests

Requests to the mod.works API __must__ be over HTTPS (Port 443), any requests made over HTTP will return a `400 Bad Request` response.

### Request Content-Type

For supplying data in requests, mod.works follows this rule across the API:

- If you are making a request that includes a file, your request __must__ be `multipart/form-data`, otherwise your request should be `application/x-www-form-urlencoded`. 

Body Contains | Method | Content-Type
---------- | ------- | -------
Binary Files | `POST` | `multipart/form-data`
Non-Binary Data | `POST`, `PUT`, `DELETE` | `application/x-www-form-urlencoded`
Nothing | `GET` | No `Content-Type` required.

If the endpoint you are making a request to expects a file it will expect the correct `Content-Type` as mentioned. Supplying an incorrect `Content-Type` header will return a `406 Not Acceptable`.

#### Example submitting data (Key/token ommited for brevity)

`curl -XPUT -H 'Content-Type: application/x-www-form-urlencoded' https://api.mod.works/v1/games/1/mods/1 -d 'name=updated name'`

### JSON Request Data

For `POST` & `PUT` requests that do __not submit files__ you have the option to either supply your data as usual HTTP `POST` parameters or as a single json object by supplying the parameter `input_json` which contains a __UTF-8 encoded__ JSON object with all required data. Regardless of whether you use JSON or not the `Content-Type` of your request still needs to be `application/x-www-form-urlencoded` with the data provided in the body of the request.

#### Example submitting JSON data (Key/token ommitted for brevity)

`curl -XPUT -H 'Content-Type: application/x-www-form-urlencoded' https://api.mod.works/v1/games/1/mods/1 -d 'input_json={"name":"updated name"}`

__NOTE:__ If you supply identical key-value pairs as a request parameter and also as a parameter of your JSON object, the JSON object __will take priority__ as only one can exist.

### Response Content-Type

Responses will __always__ be returned as `application/json`.

## Response Codes

Here are a list of the most common HTTP response codes you will see while using the API.

Response Code | Meaning
---------- | -------
`200` | OK -- Your request was successful.
`201` | Created -- Resource created, inspect Location header for newly created resource URL.
`204` | No Content -- Request was successful and there was no data to be returned.
`400` | Bad request -- Server cannot process request due to malformed syntax or invalid request message framing.
`401` | Unauthorized -- Your api-key/access token is incorrect.
`403` | Forbidden -- You do now have permission to perform the requested action.
`404` | Not Found -- The resource requested could not be found.
`405` | Method Not Allowed -- The method of your request is incorrect.
`406` | Not Acceptable -- You supplied or requested an incorrect Content-Type.
`410` | Gone -- The requested resource is no longer available.
`429` | Too Many Requests -- You have made too many requests, inspect headers for reset time.
`500` | Internal Server Error -- We had a problem with our server. Try again later. (rare)
`503` | Service Unavailable -- We're temporarily offline for maintenance. Please try again later. (rare)

## Response Formats
```json
// Single 'view' response

{
	"id": 2,
	"mod": 0,
	"member": 31342,
	"date": 1492570177,
	"datevirus": 0,
	"virusstatus": 0,
	"viruspositive": 0,
	"filesize": 15181,
	"filehash": "2d4a0e2d7273db6b0a94b0740a88ad0d",
	"filename": "rogue-knight-v1.zip",
	"version": "1.0",
	"virustotal": null,
	"changelog": "v1.0 - First release of Rogue Knight!",
	"download": "https://cdn.mworks.com/files/1/1/2/rogue-knightv1.zip"
}
```

The way in which mod.works formats responses is entirely dependant on whether the request endpoint is returning a single item or a collection of items.

### Single item Responses

For single items, mod.works returns a __single json object__ which contains the requested resource. There is no nesting for single responses.

### Browse Responses

Browse responses a json object which contains a data array and a meta object:

- `data` - contains all data returned from the request.
- `meta` - contains metadata such as pagination information.

```json
// Browse response

{
	"data": [
		{
			"id": 2,
			"mod": 2,
			"member": 31342,
			"date": 1492570177,
			"datevirus": 1492570177,
			"virusstatus": 0,
			"viruspositive": 0,
			"filesize": 15181,
			"filehash": "2d4a0e2d7273db6b0a94b0740a88ad0d",
			"filename": "rogue-knightv1.zip",
			"version": "1.0",
			"virustotal": "",
			"changelog": "v1.0 --- First Release --- Added main mod.",
			"download": "https://cdn.mworks.com/files/1/1/2/rogue-knightv1.zip"
		},
		{
			"...":"..."
		},
	],
	"meta": {
    	"pagination": {
      		"total": 60,
      		"count": 30,
      		"per_page": 30,
      		"current_page": 1,
      		"total_pages": 48,
      		"links": {
        		"previous": "https://api.mworks.com/v1/games/2/?_limit=30&page=2",
        		"next": "https://api.mworks.com/v1/games/2/?_limit=30&page=4"
      		}
    	}
  	}
}  
```

### Browse Pagination

The meta object which contains pagination information is automatically appended on any request than contains more than one result.

```json
// Meta object example
{
	"meta": {
		"pagination": {
			"total": 60,
			"count": 30,
			"per_page": 30,
			"current_page": 1,
			"total_pages": 48,
			"links": {
				"previous": "https://api.mworks.com/v1/games/2/?_limit=30&page=2",
				"next": "https://api.mworks.com/v1/games/2/?_limit=30&page=4"
			}
		}
	}
}
```

## Filtering

Mod.works has powerful filtering available in requests. Every field of every request can be used as a filter and the following functions are available when querying the API:

### Functions

### _fields (Fields)

Specify which fields to return in a request.

- `?_fields=id,name` - Get all results, but only return the `id` and `name` columns.

### _sort (Sort)

Sort by a column, and ascending or descending order.

- `?_sort=id` - Sort `id` in ascending order

- `?_sort=-id` - Sort `id` in descending order

### _limit (Limit)

Limit the amount of results for a request.

 - `?_limit=5` - Limit the request to 5 individual results. 

### _offset (Offset)

Exclude the first n amount of records.

- `?_offset=5` - Exclude the first 5 results of the request.

### -lk (Like)

Where the string supplied matches the preceeding column value. This is the equivalent to SQL's `LIKE`.

- `?name-lk=texture` - Get all results where _texture_ occurs in the `name` column.

### -not-lk (Not Like)

Where the string supplied does not match the preceeding column value. This is the equivalent to SQL's `NOT LIKE`.

- `?name-not-lk=dungeon` - Get all results where _texture_ does not occur in the `name` column.
 
### -in (In)

Where the supplied list of values appears in the preceeding column value. This is the equivalent to SQL's `IN`.

- `?id-in=3,11,16,29` - Get all results where the `id` column value is 3, 11, 16 and 29.

### -not-in (Not In)

Where the supplied list of values *does not* in the preceeding column value. This is the equivalent to SQL's `NOT IN`

- `?modfile-not-in=8,13,22` - Get all results where `id` column *does not* equal 8, 18 and 22.

### -min (Min)

Where the preeceding column value is greater than or equal to the value specified.

- `?game-min=20` - Get all results where the `game` column is greater than or equal to 20.

### -max (Max)

Where the preeceding column value is smaller than or equal to the value specified.

- `?game-max=40` - Get all results where the `game` smaller than or equal to 40.  

### -st (Smaller Than)

Where the preceeding column value is smaller than the value specified.

- `?modfile-st=200` - Get all results where the `modfile` column is smaller than 200.

### -gt (Greater Than)

Where the preceeding column value is greater than the value specified.

- `?modfile-gt=600` - Get all results where the `modfile` column is greater than 600.

### -not (Not Equal To)

Where the preceeding column value does not equal the value specified.

- `?price-not=19.99` - Where the `price` column does not equal 19.99.

## Rate Limiting

mod.works implements rate limiting to prevent users from abusing the service however we do offer the ability of higher rate limits as they required. Exceeding your rate limit will result in requests receiving a `429 Too Many Requests` response until your time is reset time occurs. The following limits are implemented by default:

### Api key Rate Limiting

- All Api keys by default are limited to __100,000 requests per day__.

### OAuth2 Rate Limiting

- Tokens linked to a game - __1,000,000 requests per day__.
- Tokens linked to a mod - __150,000 requests per day__. 

### Headers

mod.works returns the following headers in each request to inform you of your remaining requests and time until reset.

 - `X-RateLimit-Limit` - Number of requests you can make from the supplied api-key/access token per hour.
 - `X-RateLimit-Remaining` - Number of minutes until your rate limit resets (see above for frequently allowed).

If you want feel the above rate limit is not enough for your app, please [contact us](mailto:support@mod.works) to discuss increasing your rate limit. 

## Contact

If you spot any errors within the mod.works documentation or need to get in touch regarding the use of our API please reach out to us at [support@mod.works](mailto:support@mod.works).
# Games

## Browse Games

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

Browse Games. Successful request will return an __array of game objects__. To make your requests as specific to your needs as possible it's highly recommended reading over our [filtering documentation](https://mod.works/docs#filtering) if it will help you with consuming this endpoint.

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

## View Game

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

View a single game. Successful request will return a single __game object__.

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

## Edit Game

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

Update details for a game. If you are wanting to update the media attached to this game, you should use the Add Media endpoint.
     
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

## Add Game Media

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

Upload new media to a game. Update the media attached to a game.
     
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

## Browse Game Activity

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

View activity for a game, showing changes made to the resource. Successful request will return an __array of activity objects__. To make your requests as specific to your needs as possible it's highly recommended reading over our [filtering documentation](https://mod.works/docs#filtering) if it will help you with consuming this endpoint.

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

## Browse Game Team Members

> Code samples

```shell
# You can also use wget
curl -X get https://api.mworks.com/v1/games/{game-id}/team?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mworks.com/v1/games/{game-id}/team?api_key=YourApiKey HTTP/1.1
Host: api.mworks.com

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mworks.com/v1/games/{game-id}/team',
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

fetch('https://api.mworks.com/v1/games/{game-id}/team?api_key=YourApiKey',
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

result = RestClient.get 'https://api.mworks.com/v1/games/{game-id}/team', params: {
  'api_key' => 'string'
}, headers: headers

p JSON.parse(result)
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.mworks.com/v1/games/{game-id}/team', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mworks.com/v1/games/{game-id}/team?api_key=YourApiKey");
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

`GET games/{game-id}/team`

View all members that are part of a game team. Successful request will return an __array of access objects__.

### Responses

Status|Meaning|Description
---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Request

> Example responses

```json
{
  "data": [
    {
      "id": 457,
      "member": 3103,
      "username": "Megalodon",
      "level": 8,
      "datejoined": 1492058857,
      "position": "Supreme Overlord"
    }
  ]
}
```
<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>

## Add Game Team Member

> Code samples

```shell
# You can also use wget
curl -X post https://api.mworks.com/v1/games/{game-id}/team \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
POST https://api.mworks.com/v1/games/{game-id}/team HTTP/1.1
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
  url: 'https://api.mworks.com/v1/games/{game-id}/team',
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
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://api.mworks.com/v1/games/{game-id}/team',
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
  'Content-Type' => 'application/x-www-form-urlencoded',
  'Accept' => 'application/json'
}

result = RestClient.post 'https://api.mworks.com/v1/games/{game-id}/team', params: {
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

r = requests.post('https://api.mworks.com/v1/games/{game-id}/team', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mworks.com/v1/games/{game-id}/team");
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

`POST games/{game-id}/team`

Add a member to a game team.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     member|integer|true|The unique id of the member you are adding to the team.
     level|integer|true|The level of permissions you want to give to the user. 0 = Guest, 1 = Member, 2 = Contributor, 4 = Manager, 8 = Leader.
     position|string|true|The title you wish to apply to the member within your team.

### Responses

Status|Meaning|Description
---|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created

> Example responses

```json
{
  "code": "201",
  "message": "You have successfully added a member to the specified team."
}
```
<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>

## Update Game Team Member

> Code samples

```shell
# You can also use wget
curl -X put https://api.mworks.com/v1/games/{game-id}/team/{access-id} \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
PUT https://api.mworks.com/v1/games/{game-id}/team/{access-id} HTTP/1.1
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
  url: 'https://api.mworks.com/v1/games/{game-id}/team/{access-id}',
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

fetch('https://api.mworks.com/v1/games/{game-id}/team/{access-id}',
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

result = RestClient.put 'https://api.mworks.com/v1/games/{game-id}/team/{access-id}', params: {
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

r = requests.put('https://api.mworks.com/v1/games/{game-id}/team/{access-id}', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mworks.com/v1/games/{game-id}/team/{access-id}");
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

`PUT games/{game-id}/team/{access-id}`

Update the details of a member who is currently a part of the specified game team.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     level|integer||The level of permissions you want to give to the user. 0 = Guest, 1 = Member, 2 = Contributor, 4 = Manager, 8 = Leader.
     position|string||The title you wish to apply to the member within your team.

### Responses

Status|Meaning|Description
---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK

> Example responses

```json
{
  "code": "201",
  "message": "You have successfully updated the specified team members details."
}
```
<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>

## Delete Game Team Member

> Code samples

```shell
# You can also use wget
curl -X delete https://api.mworks.com/v1/games/{game-id}/team/{access-id} \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
DELETE https://api.mworks.com/v1/games/{game-id}/team/{access-id} HTTP/1.1
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
  url: 'https://api.mworks.com/v1/games/{game-id}/team/{access-id}',
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

fetch('https://api.mworks.com/v1/games/{game-id}/team/{access-id}',
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

result = RestClient.delete 'https://api.mworks.com/v1/games/{game-id}/team/{access-id}', params: {
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

r = requests.delete('https://api.mworks.com/v1/games/{game-id}/team/{access-id}', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mworks.com/v1/games/{game-id}/team/{access-id}");
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

`DELETE games/{game-id}/team/{access-id}`

Remove a member from a game team. This will revoke their access rights if they are not the original creator of the resource.

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

# Mods

## Browse Mods

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

Browse mods. Successful request will return an __array of mod objects__. To make your requests as specific to your needs as possible it's highly recommended reading over our [filtering documentation](https://mod.works/docs#filtering) if it will help you with consuming this endpoint.

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
      "summary": "It's time to bask in the glory of beautiful 4k textures!",
      "description": "<h2>About</h2><p>Rogue HD Pack does exactly what you thi...",
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
        "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
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
      ]
    }
  ]
}
```
<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>

## Add Mod

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

Publish a mod on mod.works While some fields have been made optional for easier adding of mods to mod.works - please be as detailed as you can.
     
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
  "message": "Your have successfully created your mod profile - see documentation about adding your first file."
}
```
<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>

## View Mod

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

View a single mod. Successful request will return a single __mod object__.

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
  "summary": "It's time to bask in the glory of beautiful 4k textures!",
  "description": "<h2>About</h2><p>Rogue HD Pack does exactly what you thi...",
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
    "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
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
  ]
}
```
<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>

## Edit Mod

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

Edit details for a mod. If you are wanting to update the media attached to this game, you should use the Add Media endpoint.
     
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

## Delete Mod

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

## Add Mod Media

> Code samples

```shell
# You can also use wget
curl -X post https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/media \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: multipart/form-data' \
  -H 'Accept: application/json'

```

```http
POST https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/media HTTP/1.1
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
  url: 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/media',
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

fetch('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/media',
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

result = RestClient.post 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/media', params: {
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

r = requests.post('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/media', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/media");
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

`POST games/{game-id}/mods/{mod-id}/media`

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

## Delete Mod Media

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

Delete images, sketchfab or youtube links from a mod profile which if successful will return `204 No Content`. This endpoint allows you to delete images as well as YouTube & Sketchfab links.
     
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

## Browse Mod Activity

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

View activity for a mod, showing changes made to the resource. Successful request will return an __array of activity objects__. To make your requests as specific to your needs as possible it's highly recommended reading over our [filtering documentation](https://mod.works/docs#filtering) if it will help you with consuming this endpoint.

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

## Browse Mod Files

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

Browse files that are published for the corresponding mod. Successful request will return an __array of file objects__. To make your requests as specific to your needs as possible it's highly recommended reading over our [filtering documentation](https://mod.works/docs#filtering) if it will help you with consuming this endpoint.

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
      "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
      "download": "https://cdn.mworks.com/files/1/1/2/rogue-knight-v1.zip"
    }
  ]
}
```
<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>

## Add Mod File

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

## View Mod File

> Code samples

```shell
# You can also use wget
curl -X get https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/files/{file-id}?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/files/{file-id}?api_key=YourApiKey HTTP/1.1
Host: api.mworks.com

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/files/{file-id}',
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

fetch('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/files/{file-id}?api_key=YourApiKey',
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

result = RestClient.get 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/files/{file-id}', params: {
  'api_key' => 'string'
}, headers: headers

p JSON.parse(result)
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/files/{file-id}', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/files/{file-id}?api_key=YourApiKey");
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

`GET games/{game-id}/mods/{mod-id}/files/{file-id}`

Find a file for the corresponding mod. Successful request will return a __file object__.

### Responses

Status|Meaning|Description
---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Request

> Example responses

```json
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
  "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
  "download": "https://cdn.mworks.com/files/1/1/2/rogue-knight-v1.zip"
}
```
<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>

## Edit Mod File

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

## View Mod Tags

> Code samples

```shell
# You can also use wget
curl -X get https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/tags?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/tags?api_key=YourApiKey HTTP/1.1
Host: api.mworks.com

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/tags',
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

fetch('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/tags?api_key=YourApiKey',
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

result = RestClient.get 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/tags', params: {
  'api_key' => 'string'
}, headers: headers

p JSON.parse(result)
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/tags', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/tags?api_key=YourApiKey");
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

`GET games/{game-id}/mods/{mod-id}/tags`

View all tags for the specified mod, successful response will return an  __array of tag objects__. To make your requests as specific to your needs as possible it's highly recommended reading over our [filtering documentation](https://mod.works/docs#filtering) if it will help you with consuming this endpoint.

### Responses

Status|Meaning|Description
---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Request

> Example responses

```json
{
  "data": [
    {
      "game": 2,
      "mod": 2,
      "tag": "Unity",
      "member": 38,
      "date": 1499841487
    }
  ]
}
```
<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>

## Add Mod Tag

> Code samples

```shell
# You can also use wget
curl -X post https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/tags \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
POST https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/tags HTTP/1.1
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
  url: 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/tags',
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
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/tags',
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
  'Content-Type' => 'application/x-www-form-urlencoded',
  'Accept' => 'application/json'
}

result = RestClient.post 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/tags', params: {
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

r = requests.post('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/tags', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/tags");
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

`POST games/{game-id}/mods/{mod-id}/tags`

Add tags to a mod's profile. Note that you can only add what tags are allowed by the parent game. To determine what game tags are allowed view the `cats` (categories) column on the parent game object.
     
     For example if the parent game has the 'Engine' category available with 'Easy', 'Medium' and 'Hard' being options you can simply submit 'Easy' in the `tags` array in your request. You can populate the array with tags from different categories and they will automatically be sorted by mod.works.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     tags|array|true|The tags array containing at least one string representing a tag.

### Responses

Status|Meaning|Description
---|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created

> Example responses

```json
{
  "code": "201",
  "message": "You have successfully added tags to the specified mod profile."
}
```
<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>

## Delete Mod Tag

> Code samples

```shell
# You can also use wget
curl -X delete https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/tags \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
DELETE https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/tags HTTP/1.1
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
  url: 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/tags',
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

fetch('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/tags',
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

result = RestClient.delete 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/tags', params: {
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

r = requests.delete('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/tags', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/tags");
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

`DELETE games/{game-id}/mods/{mod-id}/tags`

Delete one or more tags for a mod profile. Deleting tags is identical to adding tags except the request method is `DELETE` instead of `POST`. To delete tags supply an array which contains one or more strings which are identical to the tags you want to remove.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     tags|array|true|The tags array containing at least one string representing a tag

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

## Browse Mod Comments

> Code samples

```shell
# You can also use wget
curl -X get https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/comments?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/comments?api_key=YourApiKey HTTP/1.1
Host: api.mworks.com

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/comments',
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

fetch('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/comments?api_key=YourApiKey',
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

result = RestClient.get 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/comments', params: {
  'api_key' => 'string'
}, headers: headers

p JSON.parse(result)
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/comments', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/comments?api_key=YourApiKey");
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

`GET games/{game-id}/mods/{mod-id}/comments`

Browse all comments for a mod. Successful request will return an __array of comment objects__. To make your requests as specific to your needs as possible it's highly recommended reading over our [filtering documentation](https://mod.works/docs#filtering) if it will help you with consuming this endpoint.

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
      "mod": 2,
      "member": 36,
      "date": 1499841487,
      "replyid": 1499841487,
      "replypos": "01",
      "karma": 1,
      "karmago": 0,
      "summary": "This mod is kickass! Great work!"
    }
  ]
}
```
<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>

## View Mod Comment

> Code samples

```shell
# You can also use wget
curl -X get https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}?api_key=YourApiKey HTTP/1.1
Host: api.mworks.com

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}',
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

fetch('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}?api_key=YourApiKey',
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

result = RestClient.get 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}', params: {
  'api_key' => 'string'
}, headers: headers

p JSON.parse(result)
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}?api_key=YourApiKey");
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

`GET games/{game-id}/mods/{mod-id}/comments/{comment-id}`

Find a comment by it's unique ID. Successful request will return a __comment object__.

### Responses

Status|Meaning|Description
---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK

> Example responses

```json
{
  "id": 2,
  "mod": 2,
  "member": 36,
  "date": 1499841487,
  "replyid": 1499841487,
  "replypos": "01",
  "karma": 1,
  "karmago": 0,
  "summary": "This mod is kickass! Great work!"
}
```
<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>

## Delete Mod Comment

> Code samples

```shell
# You can also use wget
curl -X delete https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id} \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
DELETE https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id} HTTP/1.1
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
  url: 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}',
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

fetch('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}',
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

result = RestClient.delete 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}', params: {
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

r = requests.delete('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}");
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

`DELETE games/{game-id}/mods/{mod-id}/comments/{comment-id}`

Delete a comment from a mod profile.

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

## Browse Mod Team Members

> Code samples

```shell
# You can also use wget
curl -X get https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/team?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/team?api_key=YourApiKey HTTP/1.1
Host: api.mworks.com

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/team',
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

fetch('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/team?api_key=YourApiKey',
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

result = RestClient.get 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/team', params: {
  'api_key' => 'string'
}, headers: headers

p JSON.parse(result)
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/team', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/team?api_key=YourApiKey");
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

`GET games/{game-id}/mods/{mod-id}/team`

View all members that are part of a mod team. Successful request will return an __array of access objects__. To make your requests as specific to your needs as possible it's highly recommended reading over our [filtering documentation](https://mod.works/docs#filtering) if it will help you with consuming this endpoint.

### Responses

Status|Meaning|Description
---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Request

> Example responses

```json
{
  "data": [
    {
      "id": 457,
      "member": 3103,
      "username": "Megalodon",
      "level": 8,
      "datejoined": 1492058857,
      "position": "Supreme Overlord"
    }
  ]
}
```
<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>

## Add Mod Team Member

> Code samples

```shell
# You can also use wget
curl -X post https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/team \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
POST https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/team HTTP/1.1
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
  url: 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/team',
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
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/team',
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
  'Content-Type' => 'application/x-www-form-urlencoded',
  'Accept' => 'application/json'
}

result = RestClient.post 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/team', params: {
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

r = requests.post('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/team', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/team");
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

`POST games/{game-id}/mods/{mod-id}/team`

Add a member to a mod team.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     member|integer|true|The unique id of the member you are adding to the team.
     level|integer|true|The level of permissions you want to give to the user. 0 = Guest, 1 = Member, 2 = Contributor, 4 = Manager, 8 = Leader.
     position|string|true|The title you wish to apply to the member within your team.

### Responses

Status|Meaning|Description
---|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created

> Example responses

```json
{
  "code": "201",
  "message": "You have successfully added a member to the specified team."
}
```
<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>

## Update Mod Team Member

> Code samples

```shell
# You can also use wget
curl -X put https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/team/{access-id} \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
PUT https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/team/{access-id} HTTP/1.1
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
  url: 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/team/{access-id}',
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

fetch('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/team/{access-id}',
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

result = RestClient.put 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/team/{access-id}', params: {
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

r = requests.put('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/team/{access-id}', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/team/{access-id}");
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

`PUT games/{game-id}/mods/{mod-id}/team/{access-id}`

Update the details of a member who is currently a part of the specified mod team.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     level|integer||The level of permissions you want to give to the user. 0 = Guest, 1 = Member, 2 = Contributor, 4 = Manager, 8 = Leader.
     position|string||The title you wish to apply to the member within your team.

### Responses

Status|Meaning|Description
---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK

> Example responses

```json
{
  "code": "201",
  "message": "You have successfully updated the specified team members details."
}
```
<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>

## Delete Mod Team Member

> Code samples

```shell
# You can also use wget
curl -X delete https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/team/{access-id} \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
DELETE https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/team/{access-id} HTTP/1.1
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
  url: 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/team/{access-id}',
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

fetch('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/team/{access-id}',
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

result = RestClient.delete 'https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/team/{access-id}', params: {
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

r = requests.delete('https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/team/{access-id}', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mworks.com/v1/games/{game-id}/mods/{mod-id}/team/{access-id}");
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

`DELETE games/{game-id}/mods/{mod-id}/team/{access-id}`

Remove a member from a mod team. This will revoke their access rights if they are not the original creator of the resource.

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

# Users

## Browse Users

> Code samples

```shell
# You can also use wget
curl -X get https://api.mworks.com/v1/users?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mworks.com/v1/users?api_key=YourApiKey HTTP/1.1
Host: api.mworks.com

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mworks.com/v1/users',
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

fetch('https://api.mworks.com/v1/users?api_key=YourApiKey',
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

result = RestClient.get 'https://api.mworks.com/v1/users', params: {
  'api_key' => 'string'
}, headers: headers

p JSON.parse(result)
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.mworks.com/v1/users', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mworks.com/v1/users?api_key=YourApiKey");
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

`GET users`

Browse users registered to mod.works. Successful request will return an __array of user objects__. To make your requests as specific to your needs as possible it's highly recommended reading over our [filtering documentation](https://mod.works/docs#filtering) if it will help you with consuming this endpoint.

### Responses

Status|Meaning|Description
---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK

> Example responses

```json
{
  "data": [
    {
      "id": 1,
      "nameid": "xant",
      "username": "XanT",
      "permission": 1,
      "avatar": {
        "full": "https://media.mworks.com/images/members/1/1/1/masterchief.jpg",
        "filename": "masterchief.jpg"
      },
      "timezone": "Australia/Brisbane",
      "language": "en"
    }
  ]
}
```
<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>

## View User

> Code samples

```shell
# You can also use wget
curl -X get https://api.mworks.com/v1/users/{user-id}?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mworks.com/v1/users/{user-id}?api_key=YourApiKey HTTP/1.1
Host: api.mworks.com

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mworks.com/v1/users/{user-id}',
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

fetch('https://api.mworks.com/v1/users/{user-id}?api_key=YourApiKey',
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

result = RestClient.get 'https://api.mworks.com/v1/users/{user-id}', params: {
  'api_key' => 'string'
}, headers: headers

p JSON.parse(result)
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.mworks.com/v1/users/{user-id}', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mworks.com/v1/users/{user-id}?api_key=YourApiKey");
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

`GET users/{user-id}`

Find a user by their unique member id. Successful request will return a single __user object__.

### Responses

Status|Meaning|Description
---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK

> Example responses

```json
{
  "id": 1,
  "nameid": "xant",
  "username": "XanT",
  "permission": 1,
  "avatar": {
    "full": "https://media.mworks.com/images/members/1/1/1/masterchief.jpg",
    "filename": "masterchief.jpg"
  },
  "timezone": "Australia/Brisbane",
  "language": "en"
}
```
<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>

## View Resource Ownership

> Code samples

```shell
# You can also use wget
curl -X post https://api.mworks.com/v1/general/ownership \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
POST https://api.mworks.com/v1/general/ownership HTTP/1.1
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
  url: 'https://api.mworks.com/v1/general/ownership',
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
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://api.mworks.com/v1/general/ownership',
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
  'Content-Type' => 'application/x-www-form-urlencoded',
  'Accept' => 'application/json'
}

result = RestClient.post 'https://api.mworks.com/v1/general/ownership', params: {
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

r = requests.post('https://api.mworks.com/v1/general/ownership', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mworks.com/v1/general/ownership");
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

`POST general/ownership`

Determine if a specified user has ownership rights to a resource.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     resource|string|true|The name of the resource type you are checking against a member - __must__ be one of the following strings: games, mods, files, news, guides, tags, users.
     id|integer|true|Unique Id of the resource to check access rights for.
     member|integer|true|Unique Id of the member you are determining has access to the resource id.

### Responses

Status|Meaning|Description
---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Request

> Example responses

```json
{
  "resource": "files",
  "id": 3,
  "ownership": true
}
```
<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>

## View Resource Price

> Code samples

```shell
# You can also use wget
curl -X post https://api.mworks.com/v1/general/price \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
POST https://api.mworks.com/v1/general/price HTTP/1.1
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
  url: 'https://api.mworks.com/v1/general/price',
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
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://api.mworks.com/v1/general/price',
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
  'Content-Type' => 'application/x-www-form-urlencoded',
  'Accept' => 'application/json'
}

result = RestClient.post 'https://api.mworks.com/v1/general/price', params: {
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

r = requests.post('https://api.mworks.com/v1/general/price', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mworks.com/v1/general/price");
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

`POST general/price`

View the price of a requested resource, if the requested resource is able to be sold. All prices returned are in __USD__.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     resource|string|true|The name of the resource type you are checking a price for - __must__ be one of the following strings: games, mods, files, news, guides, tags, users.
     id|integer|true|Unique Id of the resource that contains the price.

### Responses

Status|Meaning|Description
---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK

> Example responses

```json
{
  "resource": "files",
  "id": 3,
  "price": 19.99
}
```
<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>

# Subscribe

## Subscribe To Resource

> Code samples

```shell
# You can also use wget
curl -X post https://api.mworks.com/v1/{resource}/{resource-id}/subscribe \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
POST https://api.mworks.com/v1/{resource}/{resource-id}/subscribe HTTP/1.1
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
  url: 'https://api.mworks.com/v1/{resource}/{resource-id}/subscribe',
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
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://api.mworks.com/v1/{resource}/{resource-id}/subscribe',
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
  'Content-Type' => 'application/x-www-form-urlencoded',
  'Accept' => 'application/json'
}

result = RestClient.post 'https://api.mworks.com/v1/{resource}/{resource-id}/subscribe', params: {
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

r = requests.post('https://api.mworks.com/v1/{resource}/{resource-id}/subscribe', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mworks.com/v1/{resource}/{resource-id}/subscribe");
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

`POST {resource}/{resource-id}/subscribe`

Subscribe to a resource. Note for the parameter table below it is for __path__ parameters, this endpoint does not accept any parameters in the body of the request.,
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     resource|string|true|The name of the resource you want to subscribe to - __must__ be one of the following strings: games, mods, files, news, guides, tags, users.
     id|integer|true|Unique Id of the resource you are subscribing to.

### Responses

Status|Meaning|Description
---|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created

> Example responses

```json
{
  "code": "201",
  "message": "You have successfully subscribed to the specified resource."
}
```
<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>

## Un-Subscribe To Resource

> Code samples

```shell
# You can also use wget
curl -X delete https://api.mworks.com/v1/{resource}/{resource-id}/subscribe \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
DELETE https://api.mworks.com/v1/{resource}/{resource-id}/subscribe HTTP/1.1
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
  url: 'https://api.mworks.com/v1/{resource}/{resource-id}/subscribe',
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

fetch('https://api.mworks.com/v1/{resource}/{resource-id}/subscribe',
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

result = RestClient.delete 'https://api.mworks.com/v1/{resource}/{resource-id}/subscribe', params: {
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

r = requests.delete('https://api.mworks.com/v1/{resource}/{resource-id}/subscribe', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mworks.com/v1/{resource}/{resource-id}/subscribe");
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

`DELETE {resource}/{resource-id}/subscribe`

Un-Subscribe to the requested resource.Note for the parameter table below it is for __path__ parameters, this endpoint does not accept any parameters in the body of the request.,
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     resource|string|true|The name of the resource type you are un-subscribing to - __must__ be one of the following strings: games, mods, files, news, guides, tags, users.
     id|integer|true|Unique Id of the resource you want to un-subscribe to.

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

# Reports

## Submit Report

> Code samples

```shell
# You can also use wget
curl -X post https://api.mworks.com/v1/report \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
POST https://api.mworks.com/v1/report HTTP/1.1
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
  url: 'https://api.mworks.com/v1/report',
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
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://api.mworks.com/v1/report',
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
  'Content-Type' => 'application/x-www-form-urlencoded',
  'Accept' => 'application/json'
}

result = RestClient.post 'https://api.mworks.com/v1/report', params: {
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

r = requests.post('https://api.mworks.com/v1/report', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mworks.com/v1/report");
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

`POST report`

Submit a report for any resource on mod.works.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     resource|string|true|The name of the resource type you are submitting a report for __must__ be one of the following strings: games, mods, files, news, guides, tags, users.
     id|integer|true|Unique Id of the resource item you are reporting.
     dmca|boolean|true|Is this a DMCA takedown request?
     name|string|true|Descriptive and informative title for your report
     summary|string|true|Detailed description of your report, be as specific as possible on the reason you are submitting the report.

### Responses

Status|Meaning|Description
---|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Report Created

> Example responses

```json
{
  "code": "201",
  "message": "Your report submission has been successful and will be reviewed as soon as possible."
}
```
<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>



