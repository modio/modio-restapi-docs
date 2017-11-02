---
title: mod.io API v1
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - javascript--nodejs: Node.JS
  - ruby: Ruby
  - python: Python
  - java: Java
toc_footers:
  - '<a href="https://mod.io/about">Find out more about mod.io</a>'
includes: []
search: true
highlight_theme: darkula
headingLevel: '2'
---

# Getting Started

## mod.io API v1

Welcome to the official `v1` API documentation for [mod.io](https://mod.io). Please ensure you read all of the _Getting Started_ content as it covers most steps to ensure you can accurately and efficiently consume our REST API. 

__Current version:__ `v1`

__Base path:__ [https://api.mod.io/v1](https://api.mod.io/v1)

## How It Works

Compatible with all builds of your game, mod.io operates silently in the background (without requiring your users to install another client), to give you complete control over your modding ecosystem.

![mod.io Overview](https://static.mod.io/v1/images/home/sdk.png).

## Implementation

You have 3 options to get connected to the mod.io API which you can use interchangeably depending on your needs. Here's the breakdown of each option.

Option | Usage | Suited for | Docs
---------- | ---------- | ---------- | ---------
__API__ | For connecting directly to the mod.io REST API | Web apps that need a JSON REST API, or game developers that like a challenge and want control over their implementation. | 
__SDK__ | Drop our [open source C++ SDK](https://github.com/DBolical/modioSDK) into your game to call mod.io functionality. | Developers that want a SDK that abstracts the uploading, downloading and unzip flows behind easy to use function calls. | [Here](https://sdk.mod.io/)
__Tools/Plugins__ | Use tools and plugins created by the community to make implementation in various engines easy. | Game developers that want a pre-built modding solution for their engine of choice. | [Available per tool](http://10.1.5.7:4567/#)

Here is a brief list of the main things to know about our API, as explained in more detail in the following sections.

- All requests to the API __must__ be made over HTTPS (SSL).
- All API responses are in `application/json` format.
- API keys are restricted to read-only `GET` requests.
- OAuth 2 access tokens are required for `POST`, `PUT` and `DELETE` requests.
- Binary data `POST` requests must use `Content-Type: multipart/form-data` header.
- Non-binary `POST`, `PUT` and `DELETE` requests must use `Content-Type: application/x-www-form-urlencoded` header.
- Non-binary data can optionally be supplied in `application/json` using the `input_json` parameter. 
- Rate limiting is implemented with varying limits depending on the resource type.

## Authentication

Authentication to the mod.io can be done via 3 different ways:

- Request an [API key (Read Access Only)](https://mod.io/apikey/widget)
- Manually create an [OAuth 2 Access Token (Read + Write Access)](https://mod.io/oauth/widget)
- Use of our [Email Authentication Flow](https://docs.mod.io/#email-authentication-flow) 

Which method of authentication can depend on which way you intend on consuming the mod.io API.

Authentication Type | In | HTTP Methods | Abilities
---------- | ---------- | ---------- | ---------- 
API Key | Query | `GET` | Email authentication flow + read-only abilities via `GET` request.
Access Token (OAuth 2) | Header | `GET`, `POST`, `PUT`, `DELETE` | Read, create, update, delete.

### API Key Authentication

#### Generating your API key

To access the API, authentication is required. All users and games get a [private API key](https://mod.io/apikey/widget). It is quick and easy to use in your apps but limited to read-only GET requests, due to the limited security it offers.

[Generate your private API key](https://mod.io/apikey/widget)

### Email Authentication Flow

To perform writes, you will need to authenticate your users via OAuth 2. To make this frictionless in-game, we use an email verification system, similar to what Slack and others pioneered. It works by users supplying their email, which we send a time-limited 5 digit security code too. They exchange this code in-game, for an [OAuth 2 access token](https://mod.io/oauth/widget) you can save to authenticate future requests. The benefit of this approach is it avoids complex website redirects and doesn't require your users to complete a slow registration flow.

![mod.io Email Authentication Flow](https://static.mod.io/v1/images/home/email.png)

```shell
// Example POST requesting security code

curl -X POST https://api.mod.io/oauth/emailrequest \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'api_key=0d0ba6756d032246f1299f8c01abc424'	\
  -d 'email=john.snow@westeros.com'
```

```json
// Authentication Code Request Response

{
	"code": 200,
	"message": "Enter the 5-digit security code sent to your e-mail address (john.snow@westeros.com)"
}
```

### Step 1: Requesting a security code

Firstly you must request a `security_code` from the authentication server by supplying an email which will then return a short-lived security code to the supplied e-mail address. It is therefore required that to receive a `security_code` that you have access to the specified email account. 
`POST /oauth/emailrequest`

Parameter | Value
---------- | ----------  
`api_key` | Your API key generated from 'API' tab within your game profile.
`email` | A valid and secure e-mail address you have access to. 

### Step 2: Exchanging security code for access token

After successfully requesting a `security_code` with a valid e-mail address you have access to you will then receive an e-mail from mod.io containing your unique 5-character `security_code` which you then exchange in a second request for your `access_token`. There are a few important things to know when using the e-mail authentication flow:

```shell
// Example POST requesting access token

curl -X POST https://api.mod.io/oauth/emailexchange \
  -H 'Content-Type: application/x-www-form-urlencoded' \	
  -d 'api_key=0d0ba6756d032246f1299f8c01abc424' \
  -d 'security_code=3EW50'
```

```json
// Access Token Request Response (access token truncated for brevity)

{
	"code": 200,
	"access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0......"
}
```

- An `api_key` is required for both steps of the authentication process.
- The _same_ `api_key` must be used for both steps.
- The generated `security_code` is short-lived and will expire after 15 minutes.
- Once exchanged for an access token, the security code is invalid.

If you do not exchange your `security_code` for an `access_token` within 15 minutes of generation, you will need to begin the flow again to receive another code.
`POST /oauth/emailexchange`

Parameter | Value
---------- | ----------  
`api_key` | Your API key generated from 'API' tab within your game profile.
`security_code` | Unique 5-digit code sent to the e-mail address supplied in the previous request. 

### Step 3: Use access token to access resources.

See [Making Requests](https://docs.mod.io/#making-requests) section.

### Scopes (OAuth 2)

mod.io allows you to specify what type of permissions you want each access token to have, this is done by the use of scopes. See below for a full list of scopes available, you must include at least one scope when generating a new token.

Scope | Abilities
---------- | ----------
`read` | When authenticated with a token that *only* contains the `read` scope you will only be able to read data via `GET` requests. 
`write` | When authenticated with a token that contains the `write` scope you are able to add, edit and remove resources. _Default for e-mail verification flow._

You can combine scopes to generate a combination that suits the permissions you want to be applied to the specified token.

## Making Requests

Requests to the mod.io API __must__ be over HTTPS (Port 443), any requests made over HTTP will return a `400 Bad Request` response.

### Using an API Key

```
curl -X get https://api.mod.io/v1/games?api_key=xxxxxxxxxxxxxxxx
``` 

To authenticate to the API using your key using your unique 32-character key simply append the `api_key=xxxxxxxxxxxxxxxx` parameter to the end of your request. Remember that using an API key means requests are in read-only mode, and that if you want to create, update or delete resources then authentication via OAuth 2 is required which you can (set up with your api key)[https://docs.mod.io/#authentication].

### Using an Access Token

To Authenticate to the API using an OAuth 2 access token you must include the HTTP header `Authorization` in your request with the value `Bearer your-token-here`. Verification via Access Tokens allows much greater powers in consuming the API including creating new content, as well as updating and deleting resources that you have access to. 

```shell
// Example POST request with no binary files

curl -X post https://api.mod.io/v1/games/1/mods/1/tags \
  -H 'Authorization: Bearer your-token-here' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'tags[]=Unity' \
  -d 'tags[]=FPS'
```

### Request Content-Type

For supplying data in requests, mod.io follows this rule across the API:

- If you are making a request that includes a file, your request `Content-Type` header __must__ be `multipart/form-data`, otherwise, it should be `application/x-www-form-urlencoded`. 

```shell
// Example POST request with binary file

curl -X post https://api.mod.io/v1/games/1/mods \
  -H 'Authorization: Bearer your-token-here' \
  -H 'Content-Type: multipart/form-data' \ 
  -F 'logo=@path/to/image.jpg' \
  -F 'name=Rogue Knight Clear Skies' \
  -F 'homepage=http://www.clearsies-rk.com/' \
  -F 'summary=It rains in Rogue Knight an awful lot, want sunshine all the time? Yeah you do.'
```

Body Contains | Method | Content-Type
---------- | ------- | -------
Binary Files | `POST` | `multipart/form-data`
Non-Binary Data | `POST`, `PUT`, `DELETE` | `application/x-www-form-urlencoded`
Nothing | `GET` | No `Content-Type` required.

If the endpoint you are making a request to expects a file it will expect the correct `Content-Type` as mentioned. Supplying an incorrect `Content-Type` header will return a `415 Unsupported Media Type` response.

### JSON Request Data

```shell
// Example json-encoded POST request 

curl -X post https://api.mod.io/v1/games/1/team \
  -H 'Authorization: Bearer your-token-here' \
  -H 'Content-Type: application/x-www-form-urlencoded' \  
  -d 'input_json={
		"member":"1",
		"level":"8",
		"position":"King in the North"
	  }'
```

For `POST` & `PUT` requests that do _not submit files_ you have the option to either supply your data as usual HTTP `POST` parameters or as a single json object by supplying the parameter `input_json` which contains a _UTF-8 encoded_ JSON object with all required data. Regardless, whether you use JSON or not the `Content-Type` of your request still needs to be `application/x-www-form-urlencoded` with the data provided in the body of the request.

__NOTE:__ If you supply identical key-value pairs as a request parameter and also as a parameter of your JSON object, the JSON object __will take priority__ as only one can exist.

### Response Content-Type

Responses will __always__ be returned as `application/json`.

## Errors

```json
// Error object

"error": {
	"code": 403,
	"message": "You do not have the required permissions to access this resource."
}
```

If an error occurs, mod.io returns an error object with the HTTP `code` and `message` to describe what error occurred and generally what needs to be done to avoid the error reoccurring. It's important to note that if you encounter errors that are not server errors, that is `500+` codes - you should __not__ continue to send requests to the endpoint and instead review the error message.

When it comes to validating request inputs for creating a resource or supplying a query parameter for filtering, an optional field object called `errors` can be supplied inside the `error` object which contains a list of your invalid inputs. A reminder that the nested `errors` object is only supplied with `422 Unprocessable Entity` responses. Be sure to review the [Response Codes](https://docs.mod.io/#response-codes) to be aware of the HTTP codes that the mod.io API returns.

```json
// Error object with input errors

"error": {
	"code": 422,
	"message": "Validation Failed. Please see below to fix invalid input.",
	"errors": {
		"member":"The member must be an integer.",
		"name":"The name may not be greater than 50 characters."
	}
}

```

Remember that [Rate Limiting](https://docs.mod.io/#rate-limiting) applies whether an error is returned or not so to avoid needlessly exceeding your daily quota be sure to always investigate error messages.

## Response Codes

Here is a list of the most common HTTP response codes you will see while using the API.

Response Code | Meaning
---------- | -------
`200` | OK -- Your request was successful.
`201` | Created -- Resource created, inspect Location header for newly created resource URL.
`204` | No Content -- Request was successful and there was no data to be returned.
`400` | Bad request -- Server cannot process the request due to malformed syntax or invalid request message framing.
`401` | Unauthorized -- Your API key/access token is incorrect.
`403` | Forbidden -- You do not have permission to perform the requested action.
`404` | Not Found -- The resource requested could not be found.
`405` | Method Not Allowed -- The method of your request is incorrect.
`406` | Not Acceptable -- You supplied or requested an incorrect Content-Type.
`410` | Gone -- The requested resource is no longer available.
`422` | Unprocessable Entity -- The request was well formed but unable to be followed due to semantic errors.
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
	"virustotal": "No threats detected.",
	"changelog": "v1.0 - First release of Rogue Knight!",
	"download": "https://mod.io/mods/file/2/c489a0354111a4dx6640d47f0cdcb294"
}
```

The way in which mod.io formats responses is entirely dependant on whether the requesting endpoint is returning a single item or a collection of items.

### Single item Responses

For single items, mod.io returns a __single json object__ which contains the requested resource. There is no nesting for single responses.

### Browse Responses

Browse responses, that is, endpoints that return more than one result return a json object which contains a data array and a metadata fields:

- `data` - contains all data returned from the request.
- metadata fields - contains all cursor metadata to help you paginate through the API.

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
			"virustotal": null,
			"changelog": "v1.0 --- First Release --- Added main mod.",
			"download": "https://mod.io/mods/file/2/c489a0354111a4d76640d47f0cdcb294"
		},
		{
			...
		},
	],
	"cursor_id": 30,
    "prev_id": null,
    "next_id": null,
    "result_count": 100,
}  
```

## Cursors and Offsets

When requesting data from endpoints that contain more than one object, there are two parameters that you can supply that will allow you to page through results with ease, they are `_cursor` and `_offset`. There are two important differences in how each parameter works, depending on what you are aiming to retrieve you would choose to use one or the other.

### Cursor

```
v1/games/2/mods/2/files?_cursor=600
```

When using a cursor, you are able to specify where you want to _start_ looking for results by the value of the `id` column. Let's assume you want to get all files on mod.io that contain an id larger than 600. You could use the following:

- `?_cursor=600` - Only returns fields that have a larger `id` than 600, that is we want to start looking from the specified number onwards. 

### Prev (Cursors only)

When using cursors you can optionally choose to provide the `_prev` parameter which is meant to be the previous cursor you used. Let's assume you that you just used the above search filter and you wish to keep track of your previous `_cursor` value whilst using a new value which will be shown in the meta object. You would apply it like so:

```
v1/games/2/mods/2/files?_cursor=400&_prev=600
```

- `?_cursor=400&_prev=600` - Move the cursor to all records with a larger `id` than 400, but save that our previous cursor location was 400.

Note that the `_prev` parameter is arbitrary  information for your own implementations and does not affect the outcome of the query other than the value being appended to the meta object shown below.

### Offset

```
v1/games?_offset=30
```

While a cursor starts from the value of the `id` column, the `_offset` will simply skip over the specified amount of results, regardless of what data they contain. This works the same way offset in an SQL query. Let's now assume you want to get all mods from mod.io but ignore the first 30 results.

- `?_offset=30` - Will retrieve all results after ignoring the first 30.

As cursors and offsets are mutually exclusive, you should choose one or the other - if you do supply both the __cursor__ will take priority.

### Combining a cursor/offset with a limit

```
v1/games/2/mods/2/files?_cursor=5&_prev=5&_limit=10
```

Once you are up and running using either cursors or an offset you can then combine it with other filter functions such `_limit` & `_sort` to build powerful queries to enable you to be as precise or lenient as you want. 

### Cursor metadata

Appended to each request with more than one result is the cursor metadata, that will always appear regardless of you utilize a cursor/offset or not. This is what each value means:

```json
// Metadata example
"cursor_id": 50,
"prev_id": 25,
"next_id": 76,
"result_count": 25,
```

Parameter | Value
---------- | ----------  
`cursor_id` | The current `_cursor` value.
`prev_id` | The previous `_cursor` value as manually inserted by you, _null_ by default.
`next_id` | The next position to move the `_cursor` to based on the current request.
`count_id` | The amount of results returned in the current request.

## Filtering

mod.io has powerful filtering available to assist you in making requests to the API. Every field of the every request can be used as a filter and the following functions are available when querying the API. It is important to understand that when using filters in your request, the filters you specify will __only be applied to the bottom-level columns__. That is, if the response object contains a nested object with the same column name, ie. `id` - the filtering will apply to the bottom level object, and not any nested objects.

### Functions

### _sort (Sort)

```
v1/games?_sort=id
```

Sort by a column, and ascending or descending order.

- `?_sort=id` - Sort `id` in ascending order

- `?_sort=-id` - Sort `id` in descending order

### _limit (Limit)

```
v1/games?_limit=5
```

Limit the number of results for a request.

 - `?_limit=5` - Limit the request to 5 individual results. 

### _q (Full text search)

```
v1/games/1?_q=The Lord Of The Rings
```

Full-text search is a lenient search filter that _is only available_ if the endpoint you are querying contains a `name` column. Wildcards should _not_ be applied to this filter as they are ignored.

- `?_q=The Lord of the Rings` - This will return every result where the `name` column contains any of the following words: 'The', 'Lord', 'of', 'the', 'Rings'.

### -lk (Like)

```
v1/games?name-lk=texture
```

```
v1/games?name-lk=*texture
```

```
v1/games?name-lk=texture*
```

Where the string supplied matches the preceding column value. This is the equivalent to SQL's `LIKE`. Consider using wildcard's `*` for the best chance of results as described below.

- `?name-lk=texture` - Get all results where only _texture_ occurs in the `name` column.

### -not-lk (Not Like)

```
v1/games?name-not-lk=dungeon
```

Where the string supplied does not match the preceding column value. This is the equivalent to SQL's `NOT LIKE`.

- `?name-not-lk=dungeon` - Get all results where _texture_ does not occur in the `name` column.

### -lk & -not-lk Wildcards

```
v1/games?name-lk=The Witcher*
```

```
v1/games?name-lk=*Asset Pack
```

The above -lk examples will only return results for an exact match, which may make it hard to get results depending on the complexity of your query. In that event, it's recommended you utilize the -lk wildcard value `*`. This is the equivalent to SQL's `%`.

- `?name-lk=The Witcher*` - Get all results where _The Witcher_ is succeeded by any value. This means the query would return results for 'The Witcher', 'The Witcher 2' and 'The Witcher 3'. 

- `?name-lk=*Asset Pack` - Get all results where _Asset Pack_ is proceeded by any value. This means the query would return results for 'Armor Asset Pack', 'Weapon Asset Pack' and 'HD Asset Pack'. 
 
### -in (In)

```
v1/games?id-in=3,11,16,29
```

Where the supplied list of values appears in the preceding column value. This is the equivalent to SQL's `IN`.

- `?id-in=3,11,16,29` - Get all results where the `id` column value is 3, 11, 16 and 29.

### -not-in (Not In)

```
v1/games?modfile-not-in=8,13,22
```

Where the supplied list of values *does not* in the preceding column value. This is the equivalent to SQL's `NOT IN`

- `?modfile-not-in=8,13,22` - Get all results where `id` column *does not* equal 8, 18 and 22.

### -min (Min)

```
v1/games?game-min=20
```

Where the preceding column value is greater than or equal to the value specified.

- `?game-min=20` - Get all results where the `game` column is greater than or equal to 20.

### -max (Max)

```
v1/games?game-max=40
```

Where the preceding column value is smaller than or equal to the value specified.

- `?game-max=40` - Get all results where the `game` smaller than or equal to 40.  

### -st (Smaller Than)

```
v1/games?modfile-st=200
```

Where the preceding column value is smaller than the value specified.

- `?modfile-st=200` - Get all results where the `modfile` column is smaller than 200.

### -gt (Greater Than)

```
v1/games?modfile-gt=600
```

Where the preceding column value is greater than the value specified.

- `?modfile-gt=600` - Get all results where the `modfile` column is greater than 600.

### -not (Not Equal To)

```
v1/games?price-not=19.99
```

Where the preceding column value does not equal the value specified.

- `?price-not=19.99` - Where the `price` column does not equal 19.99.

## Rate Limiting

mod.io implements rate limiting to prevent users from abusing the service however we do offer the ability of higher rate limits as they required. Exceeding your rate limit will result in requests receiving a `429 Too Many Requests` response until your time is reset time occurs. 

It is *highly recommended* that you architect your app to check for the `X-RateLimit` headers below and the `429` HTTP response code to ensure you are not making too many requests or continuing to make requests consistently after a `429` code is repeatedly returned. Users who continue to send requests despite a `429` response could potentially have their access tokens revoked. The following limits are implemented by default:

### API key Rate Limiting

```
Example HTTP Header Response
---------------------
HTTP/1.1 200 OK
...
...
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
```

- All API keys by default are limited to __100,000 requests per day__.

### OAuth2 Rate Limiting

- Tokens linked to a game - __1,000,000 requests per day__.
- Tokens linked to a mod - __150,000 requests per day__. 

### Headers

mod.io returns the following headers in each request to inform you of your remaining requests and time until reset.

 - `X-RateLimit-Limit` - Number of requests you can make from the supplied API key/access token per hour.
 - `X-RateLimit-Remaining` - Number of minutes until your rate limit resets (see above for frequently allowed).

If you want feel the above rate limit is not enough for your app, please [contact us](mailto:support@mod.io?subject=mod.io%20API%20Rate%20Limiting) to discuss your scenario and potentially increasing your rate limit. 

## Contact

If you spot any errors within the mod.io documentation, have feedback on how we can potentially make it easier to follow or simply want get in touch for another reason please feel free to reach out to us at [support@mod.io](mailto:support@mod.io?subject=mod.io%20API). Any critical issues will be promptly addressed.
# Games

## Browse Games

> Code samples

```shell
# You can also use wget
curl -X GET https://api.mod.io/v1/games?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mod.io/v1/games?api_key=YourApiKey HTTP/1.1
Host: api.mod.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/games',
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

fetch('https://api.mod.io/v1/games?api_key=YourApiKey',
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

result = RestClient.get 'https://api.mod.io/v1/games',
  params: {
  'api_key' => 'string'
}, headers: headers


p JSON.parse(result)
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.mod.io/v1/games', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games?api_key=YourApiKey");
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
`GET /games`

Browse Games on mod.io. Successful request will return an array of [Game Objects](https://docs.mod.io/#browse-games-2). To make your requests as specific to your needs as possible it's highly recommended reading over our [filtering documentation](https://docs.mod.io/#filtering) if it will help you with consuming this endpoint.
     
     Filter|Type|Description
     ---|---|---
     id|integer(int32)|Unique id of the game.
     member|integer(int32)|Unique id of the member who has ownership of the game.
     datereg|integer(int32)|Unix timestamp of date registered.
     dateup|integer(int32)|Unix timestamp of date updated.
     presentation|integer(int32)|Choose which presentation style you want to use for your game on the mod.io website <br><br>*Field options*<br>__0__ =  Grid View: Displays mods in a grid (visual but less informative, default setting) <br>__1__ = Table View: Displays mods in a table (easier to browse)
     community|integer(int32)|Choose what rights community members have with the game <br><br>*Field Options*<br>__0__ = Discussion board disabled, community cannot share guides and news<br>__1__ = Discussion Board enabled only<br>__2__ = Community can only share guides and news<br>__3__ = Discussion Board enabled and community can share news and guides
     submission|integer(int32)|Choose what submission process you want modders to follow <br><br>*Field Options*<br>__0__ = Control the upload process. ou will have to build an upload system either in-game or via a standalone app, which enables developers to submit mods to the tags you have configured. Because you control the flow, you can pre-validate and compile mods, to ensure they will work in your game. In the long run this option will save you time as you can accept more submissions, but it requires more setup to get running and isn't as open as the above option. NOTE: mod profiles can still be created online, but uploads will have to occur via the tools you supply.<br><br>__1__ = Enable mod uploads from anywhere. Allow developers to upload mods via the website and API, and pick the tags their mod is built for. No validation will be done on the files submitted, it will be the responsibility of your game and apps built to process the mods installation based on the tags selected and determine if the mod is valid and works. For example a mod might be uploaded to the 'map' tag. When a user subscribes to this mod, your game will need to verify it contains a map file and install it where maps are located. If this fails, your game or the community will have to flag the mod as 'incompatible' to remove it from the listing.
     curation|integer(int32)|Choose the curation process for the game<br><br>*Field Options*<br>__0__ = Mods are immediately available to play, without any intervention or work from your team.<br>__1__ = Screen only mods the author wants to sell, before they are available to purchase via the API.<br>__2__ = All mods must be accepted by someone on your team. This option is useful for games that have a small number of mods and want to control the experience, or you need to set the parameters attached to a mod (i.e. a weapon may require the rate of fire, power level, clip size etc). It can also be used for complex mods, which you may need to build into your game or distribute as DLC.
     revenue|integer(int32)|Choose the revenue-share mod creators receive as a percentage. ie. 20 = 20%
     api|integer(int32)|Choose what permissions you want to enable via the mod.io API<br><br>*Field Options*<br>__0__ = Third parties cannot access your mods API and mods cannot be downloaded directly without API validation.<br>__1__ = Allow 3rd parties to access your mods API (recommended, an open API will encourage a healthy ecosystem of tools and apps) but mods cannot be downloaded directly<br>__2__ = Allow mods to be downloaded directly but 3rd parties cannot access your mods API.<br>__3__ = Allow third parties to access your mods API and allow mods to be downloaded directly without api validation.
     ugcname|string|Singular word that describes the user-generated content type.
     icon|string|Filename of the icon image, extension included.
     logo|string|Filename of the logo image, extension included.
     header|string|Filename of the header image, extension included.
     homepage|string|Official homepage of the game.
     name|string|The name of the game.
     nameid|string|The unique SEO friendly URL for the game.
     summary|string|Summary for the game.
     instructions|string|Instructions on the process to upload mods.


> Example responses

```json
{
  "data": [
    {
      "id": 2,
      "member": {
        "id": 1,
        "nameid": "xant",
        "username": "XanT",
        "avatar": {
          "filename": "masterchief.jpg",
          "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
        },
        "timezone": "Australia/Brisbane",
        "language": "en",
        "url": "https://mod.io/members/xant"
      },
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
        "filename": "IMG_20170409_222419.jpg",
        "full": "https://media.mod.io/images/mods/1/1/2/icon.png",
        "thumb_320x180": "https://media.mod.io/cache/images/mods/1/1/2/thumb_320x180/icon.png"
      },
      "logo": {
        "filename": "IMG_20170409_222419.jpg",
        "full": "https://media.mod.io/images/mods/1/1/2/IMG_20170409_222419.jpg",
        "thumb_320x180": "https://media.mod.io/cache/images/mods/1/1/2/thumb_320x180/IMG_20170409_222419.jpg",
        "thumb_640x360": "https://media.mod.io/cache/images/mods/1/1/2/thumb_640x360/IMG_20170409_222419.jpg",
        "thumb_1280x720": "https://media.mod.io/cache/images/mods/1/1/2/thumb_1280x720/IMG_20170409_222419.jpg"
      },
      "header": {
        "filename": "gameheader.png",
        "full": "https://media.mod.io/images/games/1/1/2/gameheader.png"
      },
      "homepage": "https://www.rogue-knight-game.com/",
      "name": "Rogue Knight",
      "nameid": "rogue-knight",
      "summary": "Rogue Knight is a brand new 2D pixel platformer.",
      "instructions": "Instructions here on how to develop for your game.",
      "url": "https://rogue-knight.mod.io",
      "cats": [
        {
          "name": "Engines",
          "type": "checkboxes",
          "tags": [
            "Unity"
          ],
          "adminonly": 0
        }
      ]
    },
    {
        ...
    }
  ],
  "cursor_id": 60,
  "prev_id": 30,
  "next_id": 160,
  "result_count": 100
}
```
<h3 id="Browse-Games-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[Browse_Games](#schemabrowse_games)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>


## View Game

> Code samples

```shell
# You can also use wget
curl -X GET https://api.mod.io/v1/games/{game-id}?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mod.io/v1/games/{game-id}?api_key=YourApiKey HTTP/1.1
Host: api.mod.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/games/{game-id}',
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

fetch('https://api.mod.io/v1/games/{game-id}?api_key=YourApiKey',
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

result = RestClient.get 'https://api.mod.io/v1/games/{game-id}',
  params: {
  'api_key' => 'string'
}, headers: headers


p JSON.parse(result)
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.mod.io/v1/games/{game-id}', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}?api_key=YourApiKey");
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
`GET /games/{game-id}`

View a single game on mod.io. Successful request will return a single [Game Object](https://docs.mod.io/#game-object).


> Example responses

```json
{
  "id": 2,
  "member": {
    "id": 1,
    "nameid": "xant",
    "username": "XanT",
    "avatar": {
      "filename": "masterchief.jpg",
      "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
    },
    "timezone": "Australia/Brisbane",
    "language": "en",
    "url": "https://mod.io/members/xant"
  },
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
    "filename": "IMG_20170409_222419.jpg",
    "full": "https://media.mod.io/images/mods/1/1/2/icon.png",
    "thumb_320x180": "https://media.mod.io/cache/images/mods/1/1/2/thumb_320x180/icon.png"
  },
  "logo": {
    "filename": "IMG_20170409_222419.jpg",
    "full": "https://media.mod.io/images/mods/1/1/2/IMG_20170409_222419.jpg",
    "thumb_320x180": "https://media.mod.io/cache/images/mods/1/1/2/thumb_320x180/IMG_20170409_222419.jpg",
    "thumb_640x360": "https://media.mod.io/cache/images/mods/1/1/2/thumb_640x360/IMG_20170409_222419.jpg",
    "thumb_1280x720": "https://media.mod.io/cache/images/mods/1/1/2/thumb_1280x720/IMG_20170409_222419.jpg"
  },
  "header": {
    "filename": "gameheader.png",
    "full": "https://media.mod.io/images/games/1/1/2/gameheader.png"
  },
  "homepage": "https://www.rogue-knight-game.com/",
  "name": "Rogue Knight",
  "nameid": "rogue-knight",
  "summary": "Rogue Knight is a brand new 2D pixel platformer.",
  "instructions": "Instructions here on how to develop for your game.",
  "url": "https://rogue-knight.mod.io",
  "cats": [
    {
      "name": "Engines",
      "type": "checkboxes",
      "tags": [
        "Unity"
      ],
      "adminonly": 0
    }
  ]
}
```
<h3 id="View-Game-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Request successful|[Game_Object](#schemagame_object)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>


## Edit Game

> Code samples

```shell
# You can also use wget
curl -X PUT https://api.mod.io/v1/games/{game-id} \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
PUT https://api.mod.io/v1/games/{game-id} HTTP/1.1
Host: api.mod.io

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
  url: 'https://api.mod.io/v1/games/{game-id}',
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

fetch('https://api.mod.io/v1/games/{game-id}',
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

result = RestClient.put 'https://api.mod.io/v1/games/{game-id}',
  params: {
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

r = requests.put('https://api.mod.io/v1/games/{game-id}', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}");
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
`PUT /games/{game-id}`

Update details for a game. If you want to update the `icon`, `logo` or `header` fields you need to use the [Add Game Media](https://docs.mod.io/#add-game-media) endpoint.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     presentation|integer(int32)||Choose which presentation style you want to use for your game on the mod.io website <br><br>*Field options*<br>__0__ =  Grid View: Displays mods in a grid (visual but less informative, default setting) <br>__1__ = Table View: Displays mods ina  table (easier to browse)
     community|integer(int32)||Choose what rights community members have with the game <br><br>*Field Options*<br>__0__ = Discussion board disabled, community cannot share guides and news<br>__1__ = Discussion Board enabled only<br>__2__ = Community can only share guides and news<br>__3__ = Discussion Board enabled and community can share news and guides
     submission|integer(int32)||Choose what submission process you want modders to follow <br><br>*Field Options*<br>__0__ = Control the upload process. ou will have to build an upload system either in-game or via a standalone app, which enables developers to submit mods to the tags you have configured. Because you control the flow, you can pre-validate and compile mods, to ensure they will work in your game. In the long run this option will save you time as you can accept more submissions, but it requires more setup to get running and isn't as open as the above option. NOTE: mod profiles can still be created online, but uploads will have to occur via the tools you supply.<br><br>__1__ = Enable mod uploads from anywhere. Allow developers to upload mods via the website and API, and pick the tags their mod is built for. No validation will be done on the files submitted, it will be the responsibility of your game and apps built to process the mods installation based on the tags selected and determine if the mod is valid and works. For example a mod might be uploaded to the 'map' tag. When a user subscribes to this mod, your game will need to verify it contains a map file and install it where maps are located. If this fails, your game or the community will have to flag the mod as 'incompatible' to remove it from the listing.
     curation|integer(int32)||Choose the curation process for the game<br><br>*Field Options*<br>__0__ = Mods are immediately available to play, without any intervention or work from your team.<br>__1__ = Screen only mods the author wants to sell, before they are available to purchase via the API.<br>__2__ = All mods must be accepted by someone on your team. This option is useful for games that have a small number of mods and want to control the experience, or you need to set the parameters attached to a mod (i.e. a weapon may require the rate of fire, power level, clip size etc). It can also be used for complex mods, which you may need to build into your game or distribute as DLC.
     api|integer(int32)||Choose what permissions you want to enable via the mod.io API<br><br>*Field Options*<br>__0__ = Third parties cannot access your mods API and mods cannot be downloaded directly without API validation.<br>__1__ = Allow 3rd parties to access your mods API (recommended, an open API will encourage a healthy ecosystem of tools and apps) but mods cannot be downloaded directly<br>__2__ = Allow mods to be downloaded directly but 3rd parties cannot access your mods API.<br>__3__ = Allow third parties to access your mods API and allow mods to be downloaded directly without api validation.
     ugcname|string||Singular word to best describe your games user-generated content.
     homepage|string||Official homepage for your game, if you do not fill this out it will default to your mod.io profile. Must be a valid URL.
     name|string||The name of your game. Highly recommended to not change this unless absolutely required.
     nameid|string||The unique SEO friendly URL for your game. Cannot exceed 80 characters.
     summary|string||Summary for your game, giving a brief overview of what it's about - cannot exceed 250 characters.
     instructions|string||Instructions and links creators should follow to upload mods. Keep it short and explain details like are mods submitted in-game or via tools you have created.


> Example responses

```json
{
  "code": "200",
  "message": "You have successfully updated to the specified game profile."
}
```
<h3 id="Edit-Game-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Update successful|[updateGame](#schemaupdategame)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>


## Add Game Media

> Code samples

```shell
# You can also use wget
curl -X POST https://api.mod.io/v1/games/{game-id}/media \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: multipart/form-data' \
  -H 'Accept: application/json'

```

```http
POST https://api.mod.io/v1/games/{game-id}/media HTTP/1.1
Host: api.mod.io

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
  url: 'https://api.mod.io/v1/games/{game-id}/media',
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

fetch('https://api.mod.io/v1/games/{game-id}/media',
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

result = RestClient.post 'https://api.mod.io/v1/games/{game-id}/media',
  params: {
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

r = requests.post('https://api.mod.io/v1/games/{game-id}/media', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/media");
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
`POST /games/{game-id}/media`

Upload new media to a game. Any request you make to this endpoint *should* contain a binary file for one of the following fields below.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     logo|file||Image file which will represent your new mod logo. Must be gif, jpg, jpeg or png format and cannot exceed 8MB in filesize. Dimensions must be at least 640x360 and is highly recommended that you supply a high resolution image in 16 / 9 resolution. mod.io will use this image to make three thumbnails for the dimensions 320x180, 640x360 and 1280x720.
     icon|file||Binary image file which will represent your new game icon. Must be minimum 64x64px dimensions and gif, jpg, jpeg or png format and cannot exceed 1MB in filesize.
     header|file||Binary image file which will represent your new game header. Must be gif, jpg, jpeg or png format and cannot exceed 256KB in filesize.


> Example responses

```json
{
  "code": "200",
  "message": "You have successfully added new media to the specified game profile."
}
```
<h3 id="Add-Game-Media-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Media Successfully uploaded|[updateMediaGame](#schemaupdatemediagame)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>


## Browse Game Activity

> Code samples

```shell
# You can also use wget
curl -X GET https://api.mod.io/v1/games/{game-id}/activity?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mod.io/v1/games/{game-id}/activity?api_key=YourApiKey HTTP/1.1
Host: api.mod.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/games/{game-id}/activity',
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

fetch('https://api.mod.io/v1/games/{game-id}/activity?api_key=YourApiKey',
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

result = RestClient.get 'https://api.mod.io/v1/games/{game-id}/activity',
  params: {
  'api_key' => 'string'
}, headers: headers


p JSON.parse(result)
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.mod.io/v1/games/{game-id}/activity', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/activity?api_key=YourApiKey");
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
`GET /games/{game-id}/activity`

View activity for a game, showing changes made to the resource. Successful request will return an array of [Game activity objects](https://docs.mod.io/#browse-game-activity-2). To make your requests as specific to your needs as possible it's highly recommended reading over our [filtering documentation](https://docs.mod.io/#filtering) if it will help you with consuming this endpoint.
     
     Filter|Type|Description
     ---|---|---
     id|integer(int32)|Unique id of the activity object.
     member|integer(int32)|Unique id of member who performed the action.
     dateup|integer(int32)|Unix timestamp of date updated.
     event|string|Type of change that occurred. Note that in the event of GAME_DELETE, this endpoint will be inaccessible as the game profile would be closed, however if restored it would show the event in the activity history.<br><br>*Field Options*<br>__GAME_UPDATE__ - Update event<br>__GAME_DELETE__ - Delete event


> Example responses

```json
{
  "data": [
    {
      "id": 13,
      "member": {
        "id": 1,
        "nameid": "xant",
        "username": "XanT",
        "avatar": {
          "filename": "masterchief.jpg",
          "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
        },
        "timezone": "Australia/Brisbane",
        "language": "en",
        "url": "https://mod.io/members/xant"
      },
      "dateup": 1499846132,
      "event": "GAME_UPDATE",
      "changes": {
        "summary": {
          "before": "https://www.roguehdpack.com/",
          "after": "https://rogue-knight.mod.io/rogue-hd-pack"
        }
      }
    }
  ]
}
```
<h3 id="Browse-Game-Activity-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[Browse_Game_Activity](#schemabrowse_game_activity)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>


## Browse Game Team Members

> Code samples

```shell
# You can also use wget
curl -X GET https://api.mod.io/v1/games/{game-id}/team?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mod.io/v1/games/{game-id}/team?api_key=YourApiKey HTTP/1.1
Host: api.mod.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/games/{game-id}/team',
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

fetch('https://api.mod.io/v1/games/{game-id}/team?api_key=YourApiKey',
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

result = RestClient.get 'https://api.mod.io/v1/games/{game-id}/team',
  params: {
  'api_key' => 'string'
}, headers: headers


p JSON.parse(result)
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.mod.io/v1/games/{game-id}/team', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/team?api_key=YourApiKey");
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
`GET /games/{game-id}/team`

View all members that are part of a game team. Successful request will return an array of [Access objects](https://docs.mod.io/#browse-team).


> Example responses

```json
{
  "cursor_id": 60,
  "prev_id": 30,
  "next_id": 160,
  "result_count": 100,
  "data": [
    {
      "id": 457,
      "member": {
        "id": 1,
        "nameid": "xant",
        "username": "XanT",
        "avatar": {
          "filename": "masterchief.jpg",
          "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
        },
        "timezone": "Australia/Brisbane",
        "language": "en",
        "url": "https://mod.io/members/xant"
      },
      "username": "Megalodon",
      "level": 8,
      "date": 1492058857,
      "position": "Supreme Overlord"
    }
  ]
}
```
<h3 id="Browse-Game-Team-Members-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Request|[Browse_Team](#schemabrowse_team)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>


## Add Game Team Member

> Code samples

```shell
# You can also use wget
curl -X POST https://api.mod.io/v1/games/{game-id}/team \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
POST https://api.mod.io/v1/games/{game-id}/team HTTP/1.1
Host: api.mod.io

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
  url: 'https://api.mod.io/v1/games/{game-id}/team',
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

fetch('https://api.mod.io/v1/games/{game-id}/team',
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

result = RestClient.post 'https://api.mod.io/v1/games/{game-id}/team',
  params: {
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

r = requests.post('https://api.mod.io/v1/games/{game-id}/team', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/team");
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
`POST /games/{game-id}/team`

Add a member to a game team.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     member|integer|true|The unique id of the member you are adding to the team.
     level|integer|true|The level of permissions you want to give to the user.<br><br>*Fields Options:*<br>__1__ = Moderator (can moderate content submitted)<br>__4__ = Financials (read only access to the control panel to view financial reports)<br>__8__ = Administrator (full access, including editing the profile and team)
     position|string|true|The title you wish to apply to the member within your team.


> Example responses

```json
{
  "code": "201",
  "message": "You have successfully added a member to the specified team."
}
```
<h3 id="Add-Game-Team-Member-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created|[addTeam](#schemaaddteam)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>


## Update Game Team Member

> Code samples

```shell
# You can also use wget
curl -X PUT https://api.mod.io/v1/games/{game-id}/team/{access-id} \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
PUT https://api.mod.io/v1/games/{game-id}/team/{access-id} HTTP/1.1
Host: api.mod.io

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
  url: 'https://api.mod.io/v1/games/{game-id}/team/{access-id}',
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

fetch('https://api.mod.io/v1/games/{game-id}/team/{access-id}',
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

result = RestClient.put 'https://api.mod.io/v1/games/{game-id}/team/{access-id}',
  params: {
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

r = requests.put('https://api.mod.io/v1/games/{game-id}/team/{access-id}', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/team/{access-id}");
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
`PUT /games/{game-id}/team/{access-id}`

Update the details of a member who is currently a part of the specified game team.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     level|integer||The level of permissions you want to give to the user.<br><br>*Fields Options:*<br>__1__ = Moderator (can moderate content submitted)<br>__4__ = Financials (read only access to the control panel to view financial reports)<br>__8__ = Administrator (full access, including editing the profile and team)
     position|string||The title you wish to apply to the member within your team.


> Example responses

```json
{
  "code": "201",
  "message": "You have successfully updated the specified team members details."
}
```
<h3 id="Update-Game-Team-Member-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[updateTeam](#schemaupdateteam)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>


## Delete Game Team Member

> Code samples

```shell
# You can also use wget
curl -X DELETE https://api.mod.io/v1/games/{game-id}/team/{access-id} \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
DELETE https://api.mod.io/v1/games/{game-id}/team/{access-id} HTTP/1.1
Host: api.mod.io

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
  url: 'https://api.mod.io/v1/games/{game-id}/team/{access-id}',
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

fetch('https://api.mod.io/v1/games/{game-id}/team/{access-id}',
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

result = RestClient.delete 'https://api.mod.io/v1/games/{game-id}/team/{access-id}',
  params: {
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

r = requests.delete('https://api.mod.io/v1/games/{game-id}/team/{access-id}', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/team/{access-id}");
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
`DELETE /games/{game-id}/team/{access-id}`

Remove a member from a game team. This will revoke their access rights if they are not the original creator of the resource.


> Example responses

```json
 "204 No Content" 
```
<h3 id="Delete-Game-Team-Member-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|No Content|[204](#schema204)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>


# Mods

## Browse Mods

> Code samples

```shell
# You can also use wget
curl -X GET https://api.mod.io/v1/games/{game-id}/mods?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mod.io/v1/games/{game-id}/mods?api_key=YourApiKey HTTP/1.1
Host: api.mod.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/games/{game-id}/mods',
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

fetch('https://api.mod.io/v1/games/{game-id}/mods?api_key=YourApiKey',
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

result = RestClient.get 'https://api.mod.io/v1/games/{game-id}/mods',
  params: {
  'api_key' => 'string'
}, headers: headers


p JSON.parse(result)
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.mod.io/v1/games/{game-id}/mods', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods?api_key=YourApiKey");
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
`GET /games/{game-id}/mods`

Browse mods on mod.io. Successful request will return an array of [Mod Objects](https://docs.mod.io/#browse-mods-2). To make your requests as specific to your needs as possible it's highly recommended reading over our [filtering documentation](https://docs.mod.io/#filtering) if it will help you with consuming this endpoint.
     
     Filter|Type|Description
     ---|---|---
     id|integer(int32)|Unique id of the mod.
     game|integer(int32)|Unique id of the parent game.
     member|integer(int32)|Unique id of the member who has ownership of the game.
     datereg|integer(int32)|Unix timestamp of date registered.
     dateup|integer(int32)|Unix timestamp of date updated.
     logo|string|The filename of the logo.
     homepage|string|Official homepage of the mod.
     name|string|Name of the mod.
     nameid|string|The unique SEO friendly URL for your game.
     summary|string|Summary of the mod.
     description|string|An extension of the summary. HTML Supported.
     metadata|string|Comma-separated list of metadata words.
     modfile|integer(int32)|Unique id of the [Modfile Object](https://docs.mod.io/#modfile-object) marked as current release.
     price|double|Numeric representation of the price.
     tags|string|Comma-separated values representing the tags you want to filter the results by. Only tags that are supported by the parent game can be applied. To determine what tags are eligible, see the tags values within __cats__ field on the parent [Game Object](https://docs.mod.io/#game-object).
     status|string| _OAuth 2 only_. The status of the mod (only recognised by game admins), _default is 'auth'_.<br><br>*Fields Options:*<br>__unauth__ = Only return un-authorized mods.<br>__auth__ = Only return authorized mods _(default)_.<br>__ban__ = Only return banned mods.<br>__archive__ = Only return archived content (out of date builds).<br>__delete__ = Only return deleted mods.


> Example responses

```json
{
  "data": [
    {
      "id": 2,
      "game": 2,
      "member": {
        "id": 1,
        "nameid": "xant",
        "username": "XanT",
        "avatar": {
          "filename": "masterchief.jpg",
          "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
        },
        "timezone": "Australia/Brisbane",
        "language": "en",
        "url": "https://mod.io/members/xant"
      },
      "price": 9.99,
      "datereg": 1492564103,
      "dateup": 1499841487,
      "logo": {
        "filename": "IMG_20170409_222419.jpg",
        "full": "https://media.mod.io/images/mods/1/1/2/IMG_20170409_222419.jpg",
        "thumb_320x180": "https://media.mod.io/cache/images/mods/1/1/2/thumb_320x180/IMG_20170409_222419.jpg",
        "thumb_640x360": "https://media.mod.io/cache/images/mods/1/1/2/thumb_640x360/IMG_20170409_222419.jpg",
        "thumb_1280x720": "https://media.mod.io/cache/images/mods/1/1/2/thumb_1280x720/IMG_20170409_222419.jpg"
      },
      "homepage": "https://www.rogue-hdpack.com/",
      "name": "Rogue Knight HD Pack",
      "nameid": "rogue-knight-hd-pack",
      "summary": "It's time to bask in the glory of beautiful 4k textures!",
      "description": "<h2>About</h2><p>Rogue HD Pack does exactly what you thi...",
      "metadata": "rogue,hd,high-res,4k,hd textures",
      "url": "https://rogue-knight.mod.io/rogue-knight-hd-pack",
      "modfile": {
        "id": 2,
        "mod": 2,
        "member": {
          "id": 1,
          "nameid": "xant",
          "username": "XanT",
          "avatar": {
            "filename": "masterchief.jpg",
            "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
          },
          "timezone": "Australia/Brisbane",
          "language": "en",
          "url": "https://mod.io/members/xant"
        },
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
        "download": "https://mod.io/mods/file/2/c489a0354111a4d76640d47f0cdcb294"
      },
      "media": {
        "youtube": [
          "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        ],
        "sketchfab": [
          "https://sketchfab.com/models/ef40b2d300334d009984c8865b2db1c8"
        ],
        "images": [
          {
            "full": "https://media.mod.io/images/mods/1/1/2/IMG_20170409_222419.jpg",
            "thumbnail": "https://media.mod.io/cache/images/mods/1/1/2/thumb_1020x2000/IMG_20170409_222419.jpg",
            "filename": "IMG_20170409_222419.jpg"
          }
        ]
      },
      "tags": [
        null
      ],
      "ratings": {
        "total": 1230,
        "positive": 1047,
        "negative": 183,
        "weighted": 87.38,
        "percentage": 91,
        "text": "Very Positive"
      }
    },
    {
        ...
    }
  ],
  "cursor_id": 60,
  "prev_id": 30,
  "next_id": 160,
  "result_count": 100
}
```
<h3 id="Browse-Mods-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Request|[Browse_Mods](#schemabrowse_mods)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>


## View Mod

> Code samples

```shell
# You can also use wget
curl -X GET https://api.mod.io/v1/games/{game-id}/mods/{mod-id}?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mod.io/v1/games/{game-id}/mods/{mod-id}?api_key=YourApiKey HTTP/1.1
Host: api.mod.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}',
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

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}?api_key=YourApiKey',
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

result = RestClient.get 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}',
  params: {
  'api_key' => 'string'
}, headers: headers


p JSON.parse(result)
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods/{mod-id}?api_key=YourApiKey");
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
`GET /games/{game-id}/mods/{mod-id}`

View a single mod on mod.io. Successful request will return a single [Mod Object](https://docs.mod.io/#mod-object).


> Example responses

```json
{
  "id": 2,
  "game": 2,
  "member": {
    "id": 1,
    "nameid": "xant",
    "username": "XanT",
    "avatar": {
      "filename": "masterchief.jpg",
      "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
    },
    "timezone": "Australia/Brisbane",
    "language": "en",
    "url": "https://mod.io/members/xant"
  },
  "price": 9.99,
  "datereg": 1492564103,
  "dateup": 1499841487,
  "logo": {
    "filename": "IMG_20170409_222419.jpg",
    "full": "https://media.mod.io/images/mods/1/1/2/IMG_20170409_222419.jpg",
    "thumb_320x180": "https://media.mod.io/cache/images/mods/1/1/2/thumb_320x180/IMG_20170409_222419.jpg",
    "thumb_640x360": "https://media.mod.io/cache/images/mods/1/1/2/thumb_640x360/IMG_20170409_222419.jpg",
    "thumb_1280x720": "https://media.mod.io/cache/images/mods/1/1/2/thumb_1280x720/IMG_20170409_222419.jpg"
  },
  "homepage": "https://www.rogue-hdpack.com/",
  "name": "Rogue Knight HD Pack",
  "nameid": "rogue-knight-hd-pack",
  "summary": "It's time to bask in the glory of beautiful 4k textures!",
  "description": "<h2>About</h2><p>Rogue HD Pack does exactly what you thi...",
  "metadata": "rogue,hd,high-res,4k,hd textures",
  "url": "https://rogue-knight.mod.io/rogue-knight-hd-pack",
  "modfile": {
    "id": 2,
    "mod": 2,
    "member": {
      "id": 1,
      "nameid": "xant",
      "username": "XanT",
      "avatar": {
        "filename": "masterchief.jpg",
        "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
      },
      "timezone": "Australia/Brisbane",
      "language": "en",
      "url": "https://mod.io/members/xant"
    },
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
    "download": "https://mod.io/mods/file/2/c489a0354111a4d76640d47f0cdcb294"
  },
  "media": {
    "youtube": [
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    ],
    "sketchfab": [
      "https://sketchfab.com/models/ef40b2d300334d009984c8865b2db1c8"
    ],
    "images": [
      {
        "full": "https://media.mod.io/images/mods/1/1/2/IMG_20170409_222419.jpg",
        "thumbnail": "https://media.mod.io/cache/images/mods/1/1/2/thumb_1020x2000/IMG_20170409_222419.jpg",
        "filename": "IMG_20170409_222419.jpg"
      }
    ]
  },
  "tags": [
    null
  ],
  "ratings": {
    "total": 1230,
    "positive": 1047,
    "negative": 183,
    "weighted": 87.38,
    "percentage": 91,
    "text": "Very Positive"
  }
}
```
<h3 id="View-Mod-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Request|[Mod_Object](#schemamod_object)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>


## Add Mod

> Code samples

```shell
# You can also use wget
curl -X POST https://api.mod.io/v1/games/{game-id}/mods \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: multipart/form-data' \
  -H 'Accept: application/json'

```

```http
POST https://api.mod.io/v1/games/{game-id}/mods HTTP/1.1
Host: api.mod.io

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
  url: 'https://api.mod.io/v1/games/{game-id}/mods',
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

fetch('https://api.mod.io/v1/games/{game-id}/mods',
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

result = RestClient.post 'https://api.mod.io/v1/games/{game-id}/mods',
  params: {
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

r = requests.post('https://api.mod.io/v1/games/{game-id}/mods', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods");
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
`POST /games/{game-id}/mods`

Publish a mod on mod.io. Successful request will return the newly created [Mod Object](https://docs.mod.io/#mod-object).
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     logo|file|true|Image file which will represent your new mod logo. Must be gif, jpg, jpeg or png format and cannot exceed 8MB in filesize. Dimensions must be at least 640x360 and is highly recommended that you supply a high resolution image in 16 / 9 resolution. mod.io will use this image to make three thumbnails for the dimensions 320x180, 640x360 and 1280x720.
     name|string|true|Name of your mod. Your default mod URL will contain the name so be sure to choose the most appropriate title. Example: Stellaris Shader Mod will become the URL stellaris-shader-mod.
     homepage|string|true|Official homepage for your mod, if you do not fill this out it will default to your mod.io profile. Must be a valid URL.
     summary|string|true|Summary for your mod, giving a brief overview of what it's about - cannot exceed 250 characters.
     price|double||Numeric only representation of the price if you intend to charge for your mod. Example: 19.99, 10.00.
     stock|integer(int32)||Artificially limit the amount of times the mod can be purchased.
     description|string||An extension of your summary. Include all information relevant to your mod including sections such as 'About', 'Features', 'Install Instructions', 'FAQ', etc. HTML supported and encouraged.
     metadata|string||Comma-separated list of metadata strings that are relevant to your mod.
     nameid|string||The unique SEO friendly URL for your game. Cannot exceed 80 characters.
     modfile|integer(int32)||Unique id of the [Modfile Object](https://docs.mod.io/#modfile-object) to be labelled as the current release.
     tags|array||An array of strings that represent what the mod has been tagged as, only tags that are supported by the parent game can be applied. To determine what tags are eligible, see the __cats__ tags on the connected game.


> Example responses

```json
{
  "id": 2,
  "game": 2,
  "member": {
    "id": 1,
    "nameid": "xant",
    "username": "XanT",
    "avatar": {
      "filename": "masterchief.jpg",
      "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
    },
    "timezone": "Australia/Brisbane",
    "language": "en",
    "url": "https://mod.io/members/xant"
  },
  "price": 9.99,
  "datereg": 1492564103,
  "dateup": 1499841487,
  "logo": {
    "filename": "IMG_20170409_222419.jpg",
    "full": "https://media.mod.io/images/mods/1/1/2/IMG_20170409_222419.jpg",
    "thumb_320x180": "https://media.mod.io/cache/images/mods/1/1/2/thumb_320x180/IMG_20170409_222419.jpg",
    "thumb_640x360": "https://media.mod.io/cache/images/mods/1/1/2/thumb_640x360/IMG_20170409_222419.jpg",
    "thumb_1280x720": "https://media.mod.io/cache/images/mods/1/1/2/thumb_1280x720/IMG_20170409_222419.jpg"
  },
  "homepage": "https://www.rogue-hdpack.com/",
  "name": "Rogue Knight HD Pack",
  "nameid": "rogue-knight-hd-pack",
  "summary": "It's time to bask in the glory of beautiful 4k textures!",
  "description": "<h2>About</h2><p>Rogue HD Pack does exactly what you thi...",
  "metadata": "rogue,hd,high-res,4k,hd textures",
  "url": "https://rogue-knight.mod.io/rogue-knight-hd-pack",
  "modfile": {
    "id": 2,
    "mod": 2,
    "member": {
      "id": 1,
      "nameid": "xant",
      "username": "XanT",
      "avatar": {
        "filename": "masterchief.jpg",
        "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
      },
      "timezone": "Australia/Brisbane",
      "language": "en",
      "url": "https://mod.io/members/xant"
    },
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
    "download": "https://mod.io/mods/file/2/c489a0354111a4d76640d47f0cdcb294"
  },
  "media": {
    "youtube": [
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    ],
    "sketchfab": [
      "https://sketchfab.com/models/ef40b2d300334d009984c8865b2db1c8"
    ],
    "images": [
      {
        "full": "https://media.mod.io/images/mods/1/1/2/IMG_20170409_222419.jpg",
        "thumbnail": "https://media.mod.io/cache/images/mods/1/1/2/thumb_1020x2000/IMG_20170409_222419.jpg",
        "filename": "IMG_20170409_222419.jpg"
      }
    ]
  },
  "tags": [
    null
  ],
  "ratings": {
    "total": 1230,
    "positive": 1047,
    "negative": 183,
    "weighted": 87.38,
    "percentage": 91,
    "text": "Very Positive"
  }
}
```
<h3 id="Add-Mod-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Resource Created|[Mod_Object](#schemamod_object)

### Response Headers

Status|Header|Type|Format|Description
---|---|---|---|---|
201|Location|string||URL to newly created resource

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>


## Edit Mod

> Code samples

```shell
# You can also use wget
curl -X PUT https://api.mod.io/v1/games/{game-id}/mods/{mod-id} \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
PUT https://api.mod.io/v1/games/{game-id}/mods/{mod-id} HTTP/1.1
Host: api.mod.io

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
  url: 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}',
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

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}',
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

result = RestClient.put 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}',
  params: {
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

r = requests.put('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods/{mod-id}");
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
`PUT /games/{game-id}/mods/{mod-id}`

Edit details for a mod. If you wanting to update the media attached to this game, including the `logo` field - you need to use the [Add Mod Media](https://docs.mod.io/#add-mod-media) endpoint.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     name|string||Name of your mod. Your default mod URL will contain the name so be sure to choose the most appropriate title. Example: Stellaris Shader Mod will become the URL stellaris-shader-mod.
     homepage|string||Official homepage for your mod, if you do not fill this out it will default to your mod.io profile. Must be a valid URL.
     summary|string||Summary for your mod, giving a brief overview of what it's about - cannot exceed 250 characters.
     price|double||Numeric only representation of the price if you intend to charge for your mod. Example: 19.99, 10.00.
     stock|integer(int32)||Artificially limit the amount of times the mod can be purchased.
     description|string||An extension of your summary. Include all information relevant to your mod including sections such as 'About', 'Features', 'Install Instructions', 'FAQ', etc. HTML supported and encouraged.
     metadata|string||Comma-separated list of metadata strings that are relevant to your mod.
     nameid|string||The unique SEO friendly URL for your game. Cannot exceed 80 characters.
     modfile|integer(int32)||Unique id of the [Modfile Object](https://docs.mod.io/#modfile-object) to be labelled as the current release.


> Example responses

```json
{
  "code": "200",
  "message": "You have successfully updated the specified mod profile."
}
```
<h3 id="Edit-Mod-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Update Successful|[updateMod](#schemaupdatemod)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>


## Delete Mod

> Code samples

```shell
# You can also use wget
curl -X DELETE https://api.mod.io/v1/games/{game-id}/mods/{mod-id} \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
DELETE https://api.mod.io/v1/games/{game-id}/mods/{mod-id} HTTP/1.1
Host: api.mod.io

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
  url: 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}',
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

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}',
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

result = RestClient.delete 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}',
  params: {
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

r = requests.delete('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods/{mod-id}");
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
`DELETE /games/{game-id}/mods/{mod-id}`

Delete a mod profile which will if successful will return `204 No Content`. Note this will close the mod profile which means it cannot be viewed or retrieved via API requests but will still exist in-case you choose to restore it at a later date. If you believe a mod should be permanently removed please [contact us](mailto:support@mod.io).


> Example responses

```json
 "204 No Content" 
```
<h3 id="Delete-Mod-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|No Content|[204](#schema204)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>


## Add Mod Media

> Code samples

```shell
# You can also use wget
curl -X POST https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/media \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: multipart/form-data' \
  -H 'Accept: application/json'

```

```http
POST https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/media HTTP/1.1
Host: api.mod.io

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
  url: 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/media',
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

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/media',
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

result = RestClient.post 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/media',
  params: {
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

r = requests.post('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/media', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/media");
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
`POST /games/{game-id}/mods/{mod-id}/media`

This endpoint is very flexible and will process any images posted to the endpoint regardless of their body name providing it is a valid image. The request `Content-Type` header __must__ be `multipart/form-data` to submit image files.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     logo|file||Image file which will represent your new mod logo. Must be gif, jpg, jpeg or png format and cannot exceed 8MB in filesize. Dimensions must be at least 640x360 and is highly recommended that you supply a high resolution image in 16 / 9 resolution. mod.io will use this image to make three thumbnails for the dimensions 320x180, 640x360 and 1280x720.
     images|zip||Zip archive of images to upload. Only valid gif, jpg, jpeg or png binary images within the zip file will be processed. The filename __must be images.zip__ if you are submitting an archive of images as any other name will be ignored. Alternatively you can POST one or more binary file images to this endpoint as their original file types without any compression.
     youtube|array||Full Youtube link(s) you want to add - example 'https://www.youtube.com/watch?v=IGVZOLV9SPo'
     sketchfab|array||Full Sketchfab link(s) you want to add - example 'https://sketchfab.com/models/71f04e390ff54e5f8d9a51b4e1caab7e'


> Example responses

```json
{
  "code": "201",
  "message": "You have successfully added new media to the specified mod profile."
}
```
<h3 id="Add-Mod-Media-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Resource Created|[updateMediaMod](#schemaupdatemediamod)

### Response Headers

Status|Header|Type|Format|Description
---|---|---|---|---|
201|Location|string||URL to newly created resource

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>


## Delete Mod Media

> Code samples

```shell
# You can also use wget
curl -X DELETE https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/media \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
DELETE https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/media HTTP/1.1
Host: api.mod.io

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
  url: 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/media',
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

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/media',
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

result = RestClient.delete 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/media',
  params: {
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

r = requests.delete('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/media', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/media");
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
`DELETE /games/{game-id}/mods/{mod-id}/media`

Delete images, sketchfab or youtube links from a mod profile which if successful will return `204 No Content`. This endpoint allows you to delete images as well as YouTube & Sketchfab links.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     images|array||Filename's of the image(s) you want to delete - example 'gameplay2.jpg'.
     youtube|array||Full Youtube link(s) you want to delete - example 'https://www.youtube.com/watch?v=IGVZOLV9SPo'.
     sketchfab|array||Full Sketchfab link(s) you want to delete - example 'https://sketchfab.com/models/71f04e390ff54e5f8d9a51b4e1caab7e'.
     *     


> Example responses

```json
 "204 No Content" 
```
<h3 id="Delete-Mod-Media-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|No Content|[204](#schema204)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>


## Browse Mod Activity

> Code samples

```shell
# You can also use wget
curl -X GET https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/activity?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/activity?api_key=YourApiKey HTTP/1.1
Host: api.mod.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/activity',
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

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/activity?api_key=YourApiKey',
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

result = RestClient.get 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/activity',
  params: {
  'api_key' => 'string'
}, headers: headers


p JSON.parse(result)
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/activity', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/activity?api_key=YourApiKey");
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
`GET /games/{game-id}/mods/{mod-id}/activity`

View activity for a mod, showing changes made to the resource. Successful request will return an array of [Mod Activity Objects](https://docs.mod.io/#browse-mod-activity-2). To make your requests as specific to your needs as possible it's highly recommended reading over our [filtering documentation](https://docs.mod.io/#filtering) if it will help you with consuming this endpoint.
     
     Filter|Type|Description
     ---|---|---
     id|integer(int32)|Unique id of the activity object.
     member|integer(int32)|Unique id of the member who performed the action.
     dateup|integer(int32)|Unix timestamp of date updated.
     event|string|Type of change that occurred. Note that in the event of MOD_DELETE, this endpoint will be inaccessible as the mod profile would be closed, however if restored it would show the event in the activity history.<br><br>*Field Options*<br>__MOD_UPDATE__ - Update event<br>__MOD_DELETE__ - Delete event


> Example responses

```json
{
  "data": [
    {
      "id": 13,
      "member": {
        "id": 1,
        "nameid": "xant",
        "username": "XanT",
        "avatar": {
          "filename": "masterchief.jpg",
          "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
        },
        "timezone": "Australia/Brisbane",
        "language": "en",
        "url": "https://mod.io/members/xant"
      },
      "dateup": 1499846132,
      "event": "MOD_UPDATE",
      "changes": {
        "summary": {
          "before": "https://www.roguehdpack.com/",
          "after": "https://rogue-knight.mod.io/rogue-hd-pack"
        }
      }
    }
  ]
}
```
<h3 id="Browse-Mod-Activity-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Request|[Browse_Mod_Activity](#schemabrowse_mod_activity)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>


## Browse Mod Files

> Code samples

```shell
# You can also use wget
curl -X GET https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/files?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/files?api_key=YourApiKey HTTP/1.1
Host: api.mod.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/files',
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

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/files?api_key=YourApiKey',
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

result = RestClient.get 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/files',
  params: {
  'api_key' => 'string'
}, headers: headers


p JSON.parse(result)
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/files', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/files?api_key=YourApiKey");
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
`GET /games/{game-id}/mods/{mod-id}/files`

Browse files on mod.io that are published for the corresponding mod. Successful request will return an [array of Modfile Objects](https://docs.mod.io/#browse-mod-files-2). To make your requests as specific to your needs as possible it's highly recommended reading over our [filtering documentation](https://docs.mod.io/#filtering) if it will help you with consuming this endpoint.
     
     Filter|Type|Description
     ---|---|---
     id|integer(int32)|Unique id of the file.
     mod|integer(int32)|Unique id of the mod.
     member|integer(int32)|Unique id of the member who published the file.
     date|integer(int32)|Unix timestamp of date added.
     datevirus|integer(int32)|Date it was last virus checked.
     virusstatus|integer(int32)|Current file scan status of the file. For newly added files that have yet to be scanned this field could change frequently until a scan is complete.<br>*Field Options*<br><br>__0__ = Not scanned<br>__1__ = Scan complete<br>__2__ = In progress<br>__3__ = Too large to scan<br>__4__ = File not found<br>__5__ = Error Scanning
     viruspositive|integer(int32)|Virus status of file<br>*Field Options*<br>__0__ = No threats detected<br>__1__ = Flagged as malicious
     filesize|integer(int32)|Filesize of file in bytes.
     filehash|string|MD5 hash of file.
     filename|string|Filename including extension.
     version|string|Version of file.
     virustotal|string|Virustotal report.
     changelog|string|The changelog for the file.
     download|string|File download URL.


> Example responses

```json
{
  "data": [
    {
      "id": 2,
      "mod": 2,
      "member": {
        "id": 1,
        "nameid": "xant",
        "username": "XanT",
        "avatar": {
          "filename": "masterchief.jpg",
          "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
        },
        "timezone": "Australia/Brisbane",
        "language": "en",
        "url": "https://mod.io/members/xant"
      },
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
      "download": "https://mod.io/mods/file/2/c489a0354111a4d76640d47f0cdcb294"
    },
    {
        ...
    }
  ],
  "cursor_id": 60,
  "prev_id": 30,
  "next_id": 160,
  "result_count": 100
}
```
<h3 id="Browse-Mod-Files-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Request|[Browse_Mod_Files](#schemabrowse_mod_files)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>


## Add Mod File

> Code samples

```shell
# You can also use wget
curl -X POST https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/files \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: multipart/form-data' \
  -H 'Accept: application/json'

```

```http
POST https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/files HTTP/1.1
Host: api.mod.io

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
  url: 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/files',
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

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/files',
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

result = RestClient.post 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/files',
  params: {
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

r = requests.post('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/files', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/files");
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
`POST /games/{game-id}/mods/{mod-id}/files`

Upload a file for the corresponding mod, upon success will return the newly created [Modfile Object](https://docs.mod.io/#modfile-object). Ensure that the release you are uploading is stable and free from any critical issues. Files are scanned upon upload, any users who upload malicious files will be have their accounts closed promptly. <br><br>*Note:* This endpoint does *not support* `input_json` even if you base64-encode your file method due to the already-large file sizes of some releases and base64-encoding inflating the filesize.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     filedata|file|true|The binary file for the release. For compatibility you should ZIP the base folder of your mod, or if it is a collection of files which live in a pre-existing game folder, you should ZIP those files. Your file must meet the following conditions:<br><br>- File must be __zipped__ and cannot exceed 10GB in filesize.<br>- Mods which span multiple game directories are not supported<br>- Mods which overwrite files are not supported
     version|string|true|Version of the file release.
     changelog|string|true|The changelog field you are updating. Updates for files are deliberately limited to the changelog field only, if you need to edit any other fields you should be uploading a new file and not editing an existing file.
     active|boolean||Label this upload as the current release, this will change the *modfile* field on the parent mod to the *id* field of this file after upload.
     filehash|string||MD5 of the submitted file. When supplied, MD5 will be compared against calculated MD5 of _filedata_ binary file and will return `422 Unprocessible Entity` if md5 mis-match is detected.


> Example responses

```json
{
  "id": 2,
  "mod": 2,
  "member": {
    "id": 1,
    "nameid": "xant",
    "username": "XanT",
    "avatar": {
      "filename": "masterchief.jpg",
      "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
    },
    "timezone": "Australia/Brisbane",
    "language": "en",
    "url": "https://mod.io/members/xant"
  },
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
  "download": "https://mod.io/mods/file/2/c489a0354111a4d76640d47f0cdcb294"
}
```
<h3 id="Add-Mod-File-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Resource Created|[Modfile_Object](#schemamodfile_object)

### Response Headers

Status|Header|Type|Format|Description
---|---|---|---|---|
201|Location|string||URL to newly created resource

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>


## View Mod File

> Code samples

```shell
# You can also use wget
curl -X GET https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id}?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id}?api_key=YourApiKey HTTP/1.1
Host: api.mod.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id}',
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

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id}?api_key=YourApiKey',
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

result = RestClient.get 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id}',
  params: {
  'api_key' => 'string'
}, headers: headers


p JSON.parse(result)
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id}', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id}?api_key=YourApiKey");
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
`GET /games/{game-id}/mods/{mod-id}/files/{file-id}`

Find a file on mod.io for the corresponding mod. Successful request will return a [single Modfile Object](--parse-docsurl/#modfile_object).


> Example responses

```json
{
  "id": 2,
  "mod": 2,
  "member": {
    "id": 1,
    "nameid": "xant",
    "username": "XanT",
    "avatar": {
      "filename": "masterchief.jpg",
      "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
    },
    "timezone": "Australia/Brisbane",
    "language": "en",
    "url": "https://mod.io/members/xant"
  },
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
  "download": "https://mod.io/mods/file/2/c489a0354111a4d76640d47f0cdcb294"
}
```
<h3 id="View-Mod-File-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Request|[Modfile_Object](#schemamodfile_object)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>


## Edit Mod File

> Code samples

```shell
# You can also use wget
curl -X PUT https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id} \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
PUT https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id} HTTP/1.1
Host: api.mod.io

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
  url: 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id}',
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

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id}',
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

result = RestClient.put 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id}',
  params: {
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

r = requests.put('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id}', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id}");
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
`PUT /games/{game-id}/mods/{mod-id}/files/{file-id}`

Update the details for a published file on mod.io. If you are wanting to update fields other than changelog, you should be creating a new file instead.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     changelog|string||The changelog field you are updating. Updates for files are deliberately limited to the *changelog* field and *active* fields only, if you need to edit any other fields you should be uploading a new file and not editing an existing file.
     active|boolean||Label this upload as the current release, this will change the *modfile* field on the parent mod to the *id* field of this file after upload.


> Example responses

```json
{
  "code": "200",
  "message": "You have successfully updated the specified file."
}
```
<h3 id="Edit-Mod-File-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Update Successful|[updateFile](#schemaupdatefile)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>


## Browse Mod Tags

> Code samples

```shell
# You can also use wget
curl -X GET https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/tags?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/tags?api_key=YourApiKey HTTP/1.1
Host: api.mod.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/tags',
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

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/tags?api_key=YourApiKey',
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

result = RestClient.get 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/tags',
  params: {
  'api_key' => 'string'
}, headers: headers


p JSON.parse(result)
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/tags', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/tags?api_key=YourApiKey");
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
`GET /games/{game-id}/mods/{mod-id}/tags`

Browse all tags for the corresponding mod, successful response will return an array of [Mod Tag Objects](https://docs.mod.io/#mod-tag-object). To make your requests as specific to your needs as possible it's highly recommended reading over our [filtering documentation](https://docs.mod.io/#filtering) if it will help you with consuming this endpoint.
     
     Filter|Type|Description
     ---|---|---
     game|integer(int32)|Unique id of the game.
     mod|integer(int32)|Unique id of the mod.
     date|integer(int32)|Unix timestamp of date added.
     member|integer(int32)|Unique id of the member who added the tag.
     tag|string|String representation of the tag. You can check the eligible tags on the parent game object to determine all possible values for this field.


> Example responses

```json
{
  "data": [
    {
      "game": 2,
      "mod": 2,
      "tag": "Unity",
      "date": 1499841487
    }
  ]
}
```
<h3 id="Browse-Mod-Tags-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Request|[Browse_Mod_Tags](#schemabrowse_mod_tags)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>


## Add Mod Tag

> Code samples

```shell
# You can also use wget
curl -X POST https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/tags \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
POST https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/tags HTTP/1.1
Host: api.mod.io

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
  url: 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/tags',
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

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/tags',
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

result = RestClient.post 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/tags',
  params: {
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

r = requests.post('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/tags', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/tags");
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
`POST /games/{game-id}/mods/{mod-id}/tags`

Add tags to a mod's profile. Note that you can only add what tags are allowed by the parent game. To determine what game tags are allowed view the `cats` (categories) column on the parent game object.
     
     For example if the parent game has the 'Engine' category available with 'Easy', 'Medium' and 'Hard' being options you can simply submit 'Easy' in the `tags` array in your request. You can populate the array with tags from different categories and they will automatically be sorted by mod.io.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     tags|array|true|The tags array containing at least one string representing a tag.


> Example responses

```json
{
  "code": "201",
  "message": "You have successfully added tags to the specified mod profile."
}
```
<h3 id="Add-Mod-Tag-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created|[addModTag](#schemaaddmodtag)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>


## Delete Mod Tag

> Code samples

```shell
# You can also use wget
curl -X DELETE https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/tags \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
DELETE https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/tags HTTP/1.1
Host: api.mod.io

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
  url: 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/tags',
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

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/tags',
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

result = RestClient.delete 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/tags',
  params: {
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

r = requests.delete('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/tags', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/tags");
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
`DELETE /games/{game-id}/mods/{mod-id}/tags`

Delete one or more tags for a mod profile. Deleting tags is identical to adding tags except the request method is `DELETE` instead of `POST`. To delete tags supply an array which contains one or more strings which are identical to the tags you want to remove.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     tags|array|true|The tags array containing at least one string representing a tag.


> Example responses

```json
 "204 No Content" 
```
<h3 id="Delete-Mod-Tag-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|No Content|[204](#schema204)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>


## Add Mod Rating

> Code samples

```shell
# You can also use wget
curl -X POST https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/ratings \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
POST https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/ratings HTTP/1.1
Host: api.mod.io

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
  url: 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/ratings',
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

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/ratings',
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

result = RestClient.post 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/ratings',
  params: {
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

r = requests.post('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/ratings', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/ratings");
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
`POST /games/{game-id}/mods/{mod-id}/ratings`

Submit a positive or negative rating for a mod, equivalent of thumps up and thumps down. You can only supply one rating for a mod, subsequent ratings will simply reverse your old ratings and apply your most recent rating.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     rating|integer(int32)|true|The value that determines what rating you submit for this mod.<br><br>*Field Options*<br>__1__ - Positive rating<br>__-1__ - Negative rating


> Example responses

```json
{
  "code": "201",
  "message": "You have successfully submitted a rating for the specified mod profile."
}
```
<h3 id="Add-Mod-Rating-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Resource created|[addRating](#schemaaddrating)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>


## Browse Mod Comments

> Code samples

```shell
# You can also use wget
curl -X GET https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/comments?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/comments?api_key=YourApiKey HTTP/1.1
Host: api.mod.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/comments',
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

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/comments?api_key=YourApiKey',
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

result = RestClient.get 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/comments',
  params: {
  'api_key' => 'string'
}, headers: headers


p JSON.parse(result)
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/comments', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/comments?api_key=YourApiKey");
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
`GET /games/{game-id}/mods/{mod-id}/comments`

Browse all comments for a mod. Successful request will return an array of [Comment Objects](https://docs.mod.io/#browse-comments). To make your requests as specific to your needs as possible it's highly recommended reading over our [filtering documentation](https://docs.mod.io/#filtering) if it will help you with consuming this endpoint.
     
     Filter|Type|Description
     ---|---|---
     id|integer|Unique id of the comment.
     mod|integer|Unique id of the mod.
     member|integer|Unique id of the member who published the comment.
     date|integer|Unix timestamp of date added.
     replyid|integer|Id of the parent comment this comment is replying to.
     replypos|string|Levels of nesting in comment chain.
     karma|integer|Karma received from comment.
     karmago|integer|Good karma received from comment.
     summary|string|The contents of the comment.


> Example responses

```json
{
  "data": [
    {
      "id": 2,
      "mod": 2,
      "member": {
        "id": 1,
        "nameid": "xant",
        "username": "XanT",
        "avatar": {
          "filename": "masterchief.jpg",
          "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
        },
        "timezone": "Australia/Brisbane",
        "language": "en",
        "url": "https://mod.io/members/xant"
      },
      "date": 1499841487,
      "replyid": 1499,
      "replypos": "01",
      "karma": 1,
      "karmago": 0,
      "summary": "This mod is kickass! Great work!"
    },
    {
        ...
    }
  ],
  "cursor_id": 60,
  "prev_id": 30,
  "next_id": 160,
  "result_count": 100
}
```
<h3 id="Browse-Mod-Comments-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[Browse_Comments](#schemabrowse_comments)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>


## View Mod Comment

> Code samples

```shell
# You can also use wget
curl -X GET https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}?api_key=YourApiKey HTTP/1.1
Host: api.mod.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}',
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

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}?api_key=YourApiKey',
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

result = RestClient.get 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}',
  params: {
  'api_key' => 'string'
}, headers: headers


p JSON.parse(result)
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}?api_key=YourApiKey");
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
`GET /games/{game-id}/mods/{mod-id}/comments/{comment-id}`

Find a comment by it's unique ID. Successful request will return a single [Comment Object](https://docs.mod.io/#comment-object).


> Example responses

```json
{
  "id": 2,
  "mod": 2,
  "member": {
    "id": 1,
    "nameid": "xant",
    "username": "XanT",
    "avatar": {
      "filename": "masterchief.jpg",
      "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
    },
    "timezone": "Australia/Brisbane",
    "language": "en",
    "url": "https://mod.io/members/xant"
  },
  "date": 1499841487,
  "replyid": 1499,
  "replypos": "01",
  "karma": 1,
  "karmago": 0,
  "summary": "This mod is kickass! Great work!"
}
```
<h3 id="View-Mod-Comment-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[Comment_Object](#schemacomment_object)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>


## Delete Mod Comment

> Code samples

```shell
# You can also use wget
curl -X DELETE https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id} \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
DELETE https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id} HTTP/1.1
Host: api.mod.io

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
  url: 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}',
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

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}',
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

result = RestClient.delete 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}',
  params: {
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

r = requests.delete('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}");
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
`DELETE /games/{game-id}/mods/{mod-id}/comments/{comment-id}`

Delete a comment from a mod profile.


> Example responses

```json
 "204 No Content" 
```
<h3 id="Delete-Mod-Comment-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|No Content|[204](#schema204)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>


## Browse Mod Team Members

> Code samples

```shell
# You can also use wget
curl -X GET https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team?api_key=YourApiKey HTTP/1.1
Host: api.mod.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team',
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

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team?api_key=YourApiKey',
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

result = RestClient.get 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team',
  params: {
  'api_key' => 'string'
}, headers: headers


p JSON.parse(result)
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team?api_key=YourApiKey");
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
`GET /games/{game-id}/mods/{mod-id}/team`

View all members that are part of a mod team. Successful request will return an array of [Access Objects](https://docs.mod.io/#browse-team). To make your requests as specific to your needs as possible it's highly recommended reading over our [filtering documentation](https://docs.mod.io/#filtering) if it will help you with consuming this endpoint.


> Example responses

```json
{
  "cursor_id": 60,
  "prev_id": 30,
  "next_id": 160,
  "result_count": 100,
  "data": [
    {
      "id": 457,
      "member": {
        "id": 1,
        "nameid": "xant",
        "username": "XanT",
        "avatar": {
          "filename": "masterchief.jpg",
          "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
        },
        "timezone": "Australia/Brisbane",
        "language": "en",
        "url": "https://mod.io/members/xant"
      },
      "username": "Megalodon",
      "level": 8,
      "date": 1492058857,
      "position": "Supreme Overlord"
    }
  ]
}
```
<h3 id="Browse-Mod-Team-Members-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Request|[Browse_Team](#schemabrowse_team)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>


## Add Mod Team Member

> Code samples

```shell
# You can also use wget
curl -X POST https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
POST https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team HTTP/1.1
Host: api.mod.io

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
  url: 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team',
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

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team',
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

result = RestClient.post 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team',
  params: {
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

r = requests.post('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team");
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
`POST /games/{game-id}/mods/{mod-id}/team`

Add a member to a mod team.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     member|integer|true|The unique id of the member you are adding to the team.
     level|integer|true|The level of permissions you want to give to the user.<br><br>*Fields Options:*<br>__1__ = Moderator (can moderate comments and content attached)<br>__4__ = Creator (can upload builds and edit all settings except supply and existing team members)<br>__8__ = Administrator (full access, including editing the supply and team)
     position|string|true|The title you wish to apply to the member within your team.


> Example responses

```json
{
  "code": "201",
  "message": "You have successfully added a member to the specified team."
}
```
<h3 id="Add-Mod-Team-Member-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created|[addTeam](#schemaaddteam)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>


## Update Mod Team Member

> Code samples

```shell
# You can also use wget
curl -X PUT https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team/{access-id} \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
PUT https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team/{access-id} HTTP/1.1
Host: api.mod.io

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
  url: 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team/{access-id}',
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

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team/{access-id}',
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

result = RestClient.put 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team/{access-id}',
  params: {
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

r = requests.put('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team/{access-id}', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team/{access-id}");
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
`PUT /games/{game-id}/mods/{mod-id}/team/{access-id}`

Update the details of a member who is currently a part of the specified mod team.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     level|integer||The level of permissions you want to give to the user.<br><br>*Fields Options:*<br>__1__ = Moderator (can moderate comments and content attached)<br>__4__ = Creator (can upload builds and edit all settings except supply and existing team members)<br>__8__ = Administrator (full access, including editing the supply and team)
     position|string||The title you wish to apply to the member within your team.


> Example responses

```json
{
  "code": "201",
  "message": "You have successfully updated the specified team members details."
}
```
<h3 id="Update-Mod-Team-Member-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[updateTeam](#schemaupdateteam)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>


## Delete Mod Team Member

> Code samples

```shell
# You can also use wget
curl -X DELETE https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team/{access-id} \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
DELETE https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team/{access-id} HTTP/1.1
Host: api.mod.io

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
  url: 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team/{access-id}',
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

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team/{access-id}',
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

result = RestClient.delete 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team/{access-id}',
  params: {
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

r = requests.delete('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team/{access-id}', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team/{access-id}");
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
`DELETE /games/{game-id}/mods/{mod-id}/team/{access-id}`

Remove a member from a mod team. This will revoke their access rights if they are not the original creator of the resource.


> Example responses

```json
 "204 No Content" 
```
<h3 id="Delete-Mod-Team-Member-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|No Content|[204](#schema204)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>


# Users

## Browse Users

> Code samples

```shell
# You can also use wget
curl -X GET https://api.mod.io/v1/users?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mod.io/v1/users?api_key=YourApiKey HTTP/1.1
Host: api.mod.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/users',
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

fetch('https://api.mod.io/v1/users?api_key=YourApiKey',
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

result = RestClient.get 'https://api.mod.io/v1/users',
  params: {
  'api_key' => 'string'
}, headers: headers


p JSON.parse(result)
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.mod.io/v1/users', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/users?api_key=YourApiKey");
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
`GET /users`

Browse users registered to mod.io. Successful request will return an __array of user objects__. To make your requests as specific to your needs as possible it's highly recommended reading over our [filtering documentation](https://docs.mod.io/#filtering) if it will help you with consuming this endpoint.
     
     Filter|Type|Description
     ---|---|---
     id|integer(int32)|Unique id of the user.
     nameid|string|SEO-friendly representation of the username. This is the same field that forms the URL link to their profile.
     username|string|Username of the member.
     permission|string|Status of the user account.<br><br>*Field Options*<br>__0__ = Unauthorized<br>__1__ = Authorized<br>__2__ = Banned<br>__3__ = Archived<br>__4__ = Deleted
     timezone|string|Timezone of the user, format is country/city.
     language|string|2-character representation of language.


> Example responses

```json
{
  "data": [
    {
      "id": 1,
      "nameid": "xant",
      "username": "XanT",
      "avatar": {
        "filename": "masterchief.jpg",
        "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
      },
      "timezone": "Australia/Brisbane",
      "language": "en",
      "url": "https://mod.io/members/xant"
    },
    {
        ...
    }
  ],
  "cursor_id": 60,
  "prev_id": 30,
  "next_id": 160,
  "result_count": 100
}
```
<h3 id="Browse-Users-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[Browse_Users](#schemabrowse_users)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>


## View User

> Code samples

```shell
# You can also use wget
curl -X GET https://api.mod.io/v1/users/{user-id}?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mod.io/v1/users/{user-id}?api_key=YourApiKey HTTP/1.1
Host: api.mod.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/users/{user-id}',
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

fetch('https://api.mod.io/v1/users/{user-id}?api_key=YourApiKey',
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

result = RestClient.get 'https://api.mod.io/v1/users/{user-id}',
  params: {
  'api_key' => 'string'
}, headers: headers


p JSON.parse(result)
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.mod.io/v1/users/{user-id}', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/users/{user-id}?api_key=YourApiKey");
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
`GET /users/{user-id}`

Find a user by their unique member id. Successful request will return a single __member object__.


> Example responses

```json
{
  "id": 1,
  "nameid": "xant",
  "username": "XanT",
  "avatar": {
    "filename": "masterchief.jpg",
    "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
  },
  "timezone": "Australia/Brisbane",
  "language": "en",
  "url": "https://mod.io/members/xant"
}
```
<h3 id="View-User-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[Member_Object](#schemamember_object)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>


## View Resource Ownership

> Code samples

```shell
# You can also use wget
curl -X POST https://api.mod.io/v1/general/ownership \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
POST https://api.mod.io/v1/general/ownership HTTP/1.1
Host: api.mod.io

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
  url: 'https://api.mod.io/v1/general/ownership',
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

fetch('https://api.mod.io/v1/general/ownership',
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

result = RestClient.post 'https://api.mod.io/v1/general/ownership',
  params: {
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

r = requests.post('https://api.mod.io/v1/general/ownership', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/general/ownership");
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
`POST /general/ownership`

Determine if a specified user has ownership rights to a resource.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     resource|string|true|The name of the resource type you are checking against a member - __must__ be one of the following values.<br><br>*Field options*<br>__games__<br>__mods__<br>__files__<br>__tags__<br>__users__.
     id|integer(int32)|true|Unique Id of the resource to check access rights for.
     member|integer(int32)|true|Unique Id of the member you are determining has access to the resource id.


> Example responses

```json
{
  "resource": "files",
  "id": 3,
  "ownership": true
}
```
<h3 id="View-Resource-Ownership-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Request|[Ownership_Object](#schemaownership_object)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>


## View Resource Price

> Code samples

```shell
# You can also use wget
curl -X POST https://api.mod.io/v1/general/price \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
POST https://api.mod.io/v1/general/price HTTP/1.1
Host: api.mod.io

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
  url: 'https://api.mod.io/v1/general/price',
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

fetch('https://api.mod.io/v1/general/price',
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

result = RestClient.post 'https://api.mod.io/v1/general/price',
  params: {
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

r = requests.post('https://api.mod.io/v1/general/price', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/general/price");
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
`POST /general/price`

View the price of a requested resource, if the requested resource is able to be sold. All prices returned are in __USD__.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     resource|string|true|The name of the resource type you are checking a price for - __must__ be one of the following values.<br><br>*Field options*<br>__games__<br>__mods__.
     id|integer(int32)|true|Unique Id of the resource that contains the price.


> Example responses

```json
{
  "resource": "files",
  "id": 3,
  "price": 19.99
}
```
<h3 id="View-Resource-Price-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[Price_Object](#schemaprice_object)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>


# Me

## View User Games

> Code samples

```shell
# You can also use wget
curl -X GET https://api.mod.io/v1/me/games \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Accept: application/json'

```

```http
GET https://api.mod.io/v1/me/games HTTP/1.1
Host: api.mod.io

Accept: application/json
Authorization: Bearer YourAccessToken


```

```javascript
var headers = {
  'Authorization':'Bearer YourAccessToken',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/me/games',
  method: 'get',

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
  'Accept':'application/json'

};

fetch('https://api.mod.io/v1/me/games',
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
  'Authorization' => 'Bearer YourAccessToken',
  'Accept' => 'application/json'
}

result = RestClient.get 'https://api.mod.io/v1/me/games',
  params: {
  }, headers: headers


p JSON.parse(result)
```

```python
import requests
headers = {
  'Authorization': 'Bearer YourAccessToken',
  'Accept': 'application/json'
}

r = requests.get('https://api.mod.io/v1/me/games', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/me/games");
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
`GET /me/games`

View all mod.io games that exist for the *authenticated user*.


> Example responses

```json
{
  "data": [
    {
      "id": 2,
      "member": {
        "id": 1,
        "nameid": "xant",
        "username": "XanT",
        "avatar": {
          "filename": "masterchief.jpg",
          "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
        },
        "timezone": "Australia/Brisbane",
        "language": "en",
        "url": "https://mod.io/members/xant"
      },
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
        "filename": "IMG_20170409_222419.jpg",
        "full": "https://media.mod.io/images/mods/1/1/2/icon.png",
        "thumb_320x180": "https://media.mod.io/cache/images/mods/1/1/2/thumb_320x180/icon.png"
      },
      "logo": {
        "filename": "IMG_20170409_222419.jpg",
        "full": "https://media.mod.io/images/mods/1/1/2/IMG_20170409_222419.jpg",
        "thumb_320x180": "https://media.mod.io/cache/images/mods/1/1/2/thumb_320x180/IMG_20170409_222419.jpg",
        "thumb_640x360": "https://media.mod.io/cache/images/mods/1/1/2/thumb_640x360/IMG_20170409_222419.jpg",
        "thumb_1280x720": "https://media.mod.io/cache/images/mods/1/1/2/thumb_1280x720/IMG_20170409_222419.jpg"
      },
      "header": {
        "filename": "gameheader.png",
        "full": "https://media.mod.io/images/games/1/1/2/gameheader.png"
      },
      "homepage": "https://www.rogue-knight-game.com/",
      "name": "Rogue Knight",
      "nameid": "rogue-knight",
      "summary": "Rogue Knight is a brand new 2D pixel platformer.",
      "instructions": "Instructions here on how to develop for your game.",
      "url": "https://rogue-knight.mod.io",
      "cats": [
        {
          "name": "Engines",
          "type": "checkboxes",
          "tags": [
            "Unity"
          ],
          "adminonly": 0
        }
      ]
    },
    {
        ...
    }
  ],
  "cursor_id": 60,
  "prev_id": 30,
  "next_id": 160,
  "result_count": 100
}
```
<h3 id="View-User-Games-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Request Successful|[Browse_Games](#schemabrowse_games)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: read )
</aside>


## View User Mods

> Code samples

```shell
# You can also use wget
curl -X GET https://api.mod.io/v1/me/mods \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Accept: application/json'

```

```http
GET https://api.mod.io/v1/me/mods HTTP/1.1
Host: api.mod.io

Accept: application/json
Authorization: Bearer YourAccessToken


```

```javascript
var headers = {
  'Authorization':'Bearer YourAccessToken',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/me/mods',
  method: 'get',

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
  'Accept':'application/json'

};

fetch('https://api.mod.io/v1/me/mods',
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
  'Authorization' => 'Bearer YourAccessToken',
  'Accept' => 'application/json'
}

result = RestClient.get 'https://api.mod.io/v1/me/mods',
  params: {
  }, headers: headers


p JSON.parse(result)
```

```python
import requests
headers = {
  'Authorization': 'Bearer YourAccessToken',
  'Accept': 'application/json'
}

r = requests.get('https://api.mod.io/v1/me/mods', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/me/mods");
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
`GET /me/mods`

View all mod.io mods that exist for the *authenticated user*.


> Example responses

```json
{
  "data": [
    {
      "id": 2,
      "game": 2,
      "member": {
        "id": 1,
        "nameid": "xant",
        "username": "XanT",
        "avatar": {
          "filename": "masterchief.jpg",
          "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
        },
        "timezone": "Australia/Brisbane",
        "language": "en",
        "url": "https://mod.io/members/xant"
      },
      "price": 9.99,
      "datereg": 1492564103,
      "dateup": 1499841487,
      "logo": {
        "filename": "IMG_20170409_222419.jpg",
        "full": "https://media.mod.io/images/mods/1/1/2/IMG_20170409_222419.jpg",
        "thumb_320x180": "https://media.mod.io/cache/images/mods/1/1/2/thumb_320x180/IMG_20170409_222419.jpg",
        "thumb_640x360": "https://media.mod.io/cache/images/mods/1/1/2/thumb_640x360/IMG_20170409_222419.jpg",
        "thumb_1280x720": "https://media.mod.io/cache/images/mods/1/1/2/thumb_1280x720/IMG_20170409_222419.jpg"
      },
      "homepage": "https://www.rogue-hdpack.com/",
      "name": "Rogue Knight HD Pack",
      "nameid": "rogue-knight-hd-pack",
      "summary": "It's time to bask in the glory of beautiful 4k textures!",
      "description": "<h2>About</h2><p>Rogue HD Pack does exactly what you thi...",
      "metadata": "rogue,hd,high-res,4k,hd textures",
      "url": "https://rogue-knight.mod.io/rogue-knight-hd-pack",
      "modfile": {
        "id": 2,
        "mod": 2,
        "member": {
          "id": 1,
          "nameid": "xant",
          "username": "XanT",
          "avatar": {
            "filename": "masterchief.jpg",
            "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
          },
          "timezone": "Australia/Brisbane",
          "language": "en",
          "url": "https://mod.io/members/xant"
        },
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
        "download": "https://mod.io/mods/file/2/c489a0354111a4d76640d47f0cdcb294"
      },
      "media": {
        "youtube": [
          "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        ],
        "sketchfab": [
          "https://sketchfab.com/models/ef40b2d300334d009984c8865b2db1c8"
        ],
        "images": [
          {
            "full": "https://media.mod.io/images/mods/1/1/2/IMG_20170409_222419.jpg",
            "thumbnail": "https://media.mod.io/cache/images/mods/1/1/2/thumb_1020x2000/IMG_20170409_222419.jpg",
            "filename": "IMG_20170409_222419.jpg"
          }
        ]
      },
      "tags": [
        null
      ],
      "ratings": {
        "total": 1230,
        "positive": 1047,
        "negative": 183,
        "weighted": 87.38,
        "percentage": 91,
        "text": "Very Positive"
      }
    },
    {
        ...
    }
  ],
  "cursor_id": 60,
  "prev_id": 30,
  "next_id": 160,
  "result_count": 100
}
```
<h3 id="View-User-Mods-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Request Successful|[Browse_Mods](#schemabrowse_mods)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: read )
</aside>


## View User Files

> Code samples

```shell
# You can also use wget
curl -X GET https://api.mod.io/v1/me/files \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Accept: application/json'

```

```http
GET https://api.mod.io/v1/me/files HTTP/1.1
Host: api.mod.io

Accept: application/json
Authorization: Bearer YourAccessToken


```

```javascript
var headers = {
  'Authorization':'Bearer YourAccessToken',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/me/files',
  method: 'get',

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
  'Accept':'application/json'

};

fetch('https://api.mod.io/v1/me/files',
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
  'Authorization' => 'Bearer YourAccessToken',
  'Accept' => 'application/json'
}

result = RestClient.get 'https://api.mod.io/v1/me/files',
  params: {
  }, headers: headers


p JSON.parse(result)
```

```python
import requests
headers = {
  'Authorization': 'Bearer YourAccessToken',
  'Accept': 'application/json'
}

r = requests.get('https://api.mod.io/v1/me/files', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/me/files");
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
`GET /me/files`

View all mod.io files that exist for the *authenticated user*.


> Example responses

```json
{
  "data": [
    {
      "id": 2,
      "mod": 2,
      "member": {
        "id": 1,
        "nameid": "xant",
        "username": "XanT",
        "avatar": {
          "filename": "masterchief.jpg",
          "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
        },
        "timezone": "Australia/Brisbane",
        "language": "en",
        "url": "https://mod.io/members/xant"
      },
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
      "download": "https://mod.io/mods/file/2/c489a0354111a4d76640d47f0cdcb294"
    },
    {
        ...
    }
  ],
  "cursor_id": 60,
  "prev_id": 30,
  "next_id": 160,
  "result_count": 100
}
```
<h3 id="View-User-Files-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Request Successful|[Browse_Mod_Files](#schemabrowse_mod_files)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: read )
</aside>


## View User Updates

> Code samples

```shell
# You can also use wget
curl -X GET https://api.mod.io/v1/me/updates \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Accept: application/json'

```

```http
GET https://api.mod.io/v1/me/updates HTTP/1.1
Host: api.mod.io

Accept: application/json
Authorization: Bearer YourAccessToken


```

```javascript
var headers = {
  'Authorization':'Bearer YourAccessToken',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/me/updates',
  method: 'get',

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
  'Accept':'application/json'

};

fetch('https://api.mod.io/v1/me/updates',
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
  'Authorization' => 'Bearer YourAccessToken',
  'Accept' => 'application/json'
}

result = RestClient.get 'https://api.mod.io/v1/me/updates',
  params: {
  }, headers: headers


p JSON.parse(result)
```

```python
import requests
headers = {
  'Authorization': 'Bearer YourAccessToken',
  'Accept': 'application/json'
}

r = requests.get('https://api.mod.io/v1/me/updates', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/me/updates");
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
`GET /me/updates`

View all mod.io updates that exist for the *authenticated user*.


> Example responses

```json
{
  "data": [
    {
      "id": 351,
      "resource": "games",
      "resourceid": 2,
      "type": 4,
      "date": 1492058857,
      "mention": 0
    }
  ]
}
```
<h3 id="View-User-Updates-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Request Successful|[Browse_Updates](#schemabrowse_updates)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: read )
</aside>


# Reports

## Submit Report

> Code samples

```shell
# You can also use wget
curl -X POST https://api.mod.io/v1/report \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
POST https://api.mod.io/v1/report HTTP/1.1
Host: api.mod.io

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
  url: 'https://api.mod.io/v1/report',
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

fetch('https://api.mod.io/v1/report',
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

result = RestClient.post 'https://api.mod.io/v1/report',
  params: {
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

r = requests.post('https://api.mod.io/v1/report', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/report");
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
`POST /report`

Submit a report for any resource on mod.io.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     resource|string|true|The name of the resource type you are submitting a report for __must__ be one of the following values.<br><br>*Field options*<br>__games__<br>__mods__<br>__files__<br>__tags__<br>__users__.
     id|integer(int32)|true|Unique Id of the resource item you are reporting.
     dmca|boolean|true|Is this a DMCA takedown request?
     name|string|true|Descriptive and informative title for your report.
     summary|string|true|Detailed description of your report, be as specific as possible on the reason you are submitting the report.


> Example responses

```json
{
  "code": "201",
  "message": "You have successfully submitted a report and it will be reviewed by the mod.io team."
}
```
<h3 id="Submit-Report-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Report Created|[addReport](#schemaaddreport)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>


# Subscribe

## Subscribe To Resource

> Code samples

```shell
# You can also use wget
curl -X POST https://api.mod.io/v1/{resource}/{resource-id}/subscribe \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
POST https://api.mod.io/v1/{resource}/{resource-id}/subscribe HTTP/1.1
Host: api.mod.io

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
  url: 'https://api.mod.io/v1/{resource}/{resource-id}/subscribe',
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

fetch('https://api.mod.io/v1/{resource}/{resource-id}/subscribe',
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

result = RestClient.post 'https://api.mod.io/v1/{resource}/{resource-id}/subscribe',
  params: {
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

r = requests.post('https://api.mod.io/v1/{resource}/{resource-id}/subscribe', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/{resource}/{resource-id}/subscribe");
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
`POST /{resource}/{resource-id}/subscribe`

Subscribe to a resource. Note for the parameter table below it is for __path__ parameters, this endpoint does not accept any parameters in the body of the request.,
     
     Path Parameter|Type|Required|Description
     ---|---|---|---|
     resource|string|true|The name of the resource you want to subscribe to - __must__ be one of the following values.<br><br>*Field options*<br>__games__<br>__mods__<br>__files__<br>__tags__<br>__users__
     id|integer(int32)|true|Unique Id of the resource you are subscribing to.


> Example responses

```json
{
  "code": "201",
  "message": "You have successfully subscribed to the specified resource."
}
```
<h3 id="Subscribe-To-Resource-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created|[addSubscribe](#schemaaddsubscribe)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>


## Un-Subscribe To Resource

> Code samples

```shell
# You can also use wget
curl -X DELETE https://api.mod.io/v1/{resource}/{resource-id}/subscribe \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
DELETE https://api.mod.io/v1/{resource}/{resource-id}/subscribe HTTP/1.1
Host: api.mod.io

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
  url: 'https://api.mod.io/v1/{resource}/{resource-id}/subscribe',
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

fetch('https://api.mod.io/v1/{resource}/{resource-id}/subscribe',
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

result = RestClient.delete 'https://api.mod.io/v1/{resource}/{resource-id}/subscribe',
  params: {
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

r = requests.delete('https://api.mod.io/v1/{resource}/{resource-id}/subscribe', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/{resource}/{resource-id}/subscribe");
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
`DELETE /{resource}/{resource-id}/subscribe`

Un-Subscribe to the requested resource.Note for the parameter table below it is for __path__ parameters, this endpoint does not accept any parameters in the body of the request.,
     
     Path Parameter|Type|Required|Description
     ---|---|---|---|
     resource|string|true|The name of the resource type you are un-subscribing to - __must__ be one of the following values.<br><br>*Field options*<br>__games__<br>__mods__<br>__files__<br>__tags__<br>__users__
     id|integer(int32)|true|Unique Id of the resource you want to un-subscribe to.


> Example responses

```json
 "204 No Content" 
```
<h3 id="Un-Subscribe-To-Resource-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|No Content|[204](#schema204)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>


# Schemas 
## Logo Object

 <a name="schemalogo_object"></a>

```json
{
  "filename": "IMG_20170409_222419.jpg",
  "full": "https://media.mod.io/images/mods/1/1/2/IMG_20170409_222419.jpg",
  "thumb_320x180": "https://media.mod.io/cache/images/mods/1/1/2/thumb_320x180/IMG_20170409_222419.jpg",
  "thumb_640x360": "https://media.mod.io/cache/images/mods/1/1/2/thumb_640x360/IMG_20170409_222419.jpg",
  "thumb_1280x720": "https://media.mod.io/cache/images/mods/1/1/2/thumb_1280x720/IMG_20170409_222419.jpg"
} 
```


### Properties

Name|Type|Description
---|---|---|---|
filename|string|Image filename, with file extension included.
full|string|URL to full-sized image.
thumb_320x180|string|URL to small thumbnail image.
thumb_640x360|string|URL to medium thumbnail image.
thumb_1280x720|string|URL to large thumbnail image.




## Icon Object

 <a name="schemaicon_object"></a>

```json
{
  "filename": "IMG_20170409_222419.jpg",
  "full": "https://media.mod.io/images/mods/1/1/2/icon.png",
  "thumb_320x180": "https://media.mod.io/cache/images/mods/1/1/2/thumb_320x180/icon.png"
} 
```


### Properties

Name|Type|Description
---|---|---|---|
filename|string|Image filename, with file extension included.
full|string|URL to full-sized image.
thumb_320x180|string|URL to small thumbnail image.




## Header Object

 <a name="schemaheader_object"></a>

```json
{
  "filename": "gameheader.png",
  "full": "https://media.mod.io/images/games/1/1/2/gameheader.png"
} 
```


### Properties

Name|Type|Description
---|---|---|---|
filename|string|Image filename, with file extension included.
full|string|URL to the full-sized header image.




## Avatar Object

 <a name="schemaavatar_object"></a>

```json
{
  "filename": "masterchief.jpg",
  "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
} 
```


### Properties

Name|Type|Description
---|---|---|---|
filename|string|Image filename, including file extension.
full|string|Full URL to the image.




## Browse Games

 <a name="schemabrowse_games"></a>

```json
{
  "data": [
    {
      "id": 2,
      "member": {
        "id": 1,
        "nameid": "xant",
        "username": "XanT",
        "avatar": {
          "filename": "masterchief.jpg",
          "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
        },
        "timezone": "Australia/Brisbane",
        "language": "en",
        "url": "https://mod.io/members/xant"
      },
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
        "filename": "IMG_20170409_222419.jpg",
        "full": "https://media.mod.io/images/mods/1/1/2/icon.png",
        "thumb_320x180": "https://media.mod.io/cache/images/mods/1/1/2/thumb_320x180/icon.png"
      },
      "logo": {
        "filename": "IMG_20170409_222419.jpg",
        "full": "https://media.mod.io/images/mods/1/1/2/IMG_20170409_222419.jpg",
        "thumb_320x180": "https://media.mod.io/cache/images/mods/1/1/2/thumb_320x180/IMG_20170409_222419.jpg",
        "thumb_640x360": "https://media.mod.io/cache/images/mods/1/1/2/thumb_640x360/IMG_20170409_222419.jpg",
        "thumb_1280x720": "https://media.mod.io/cache/images/mods/1/1/2/thumb_1280x720/IMG_20170409_222419.jpg"
      },
      "header": {
        "filename": "gameheader.png",
        "full": "https://media.mod.io/images/games/1/1/2/gameheader.png"
      },
      "homepage": "https://www.rogue-knight-game.com/",
      "name": "Rogue Knight",
      "nameid": "rogue-knight",
      "summary": "Rogue Knight is a brand new 2D pixel platformer.",
      "instructions": "Instructions here on how to develop for your game.",
      "url": "https://rogue-knight.mod.io",
      "cats": [
        {
          "name": "Engines",
          "type": "checkboxes",
          "tags": [
            "Unity"
          ],
          "adminonly": 0
        }
      ]
    },
    {
        ...
    }
  ],
  "cursor_id": 60,
  "prev_id": 30,
  "next_id": 160,
  "result_count": 100
} 
```


### Properties

Name|Type|Description
---|---|---|---|
cursor_id|integer(int32)|The current _cursor value.
prev_id|integer(int32)|The previous _cursor value as manually inserted by you, null by default.
next_id|integer(int32)|The next position to move the _cursor to, based on the current request.
result_count|integer(int32)|The amount of results returned in the current request.
data|[[Game_Object](#schemagame_object)]|Array containing game objects
» id|integer(int32)|Unique game id.
» member|[Member_Object](#schemamember_object)|Contains member data.
»» id|integer(int32)|Unique id of the user.
»» nameid|string|Unique nameid of user which forms end of their profile URL.
»» username|string|Non-unique username of the user.
»» avatar|[Avatar_Object](#schemaavatar_object)|Contains avatar data.
»»» filename|string|Image filename, including file extension.
»»» full|string|Full URL to the image.
»» timezone|string|The Timezone of the user, shown in {Country}/{City} format.
»» language|string|The users language preference, limited to two characters.
»» url|string|URL to the user profile.
» datereg|integer(int32)|Unix timestamp of date registered.
» dateup|integer(int32)|Unix timestamp of date updated.
» presentation|integer(int32)|Determines which presentation style you want to use for your game on the mod.io website <br><br>*Field options*<br>__0__ =  Grid View: Displays mods in a grid (visual but less informative, default setting) <br>__1__ = Table View: Displays mods in a table (easier to browse).
» community|integer(int32)|Determines the rights community members have with the game.<br><br>*Field Options*<br>__0__ = Discussion board disabled, community cannot share guides and news<br>__1__ = Discussion Board enabled only<br>__2__ = Community can only share guides and news<br>__3__ = Discussion Board enabled and community can share news and guides
» submission|integer(int32)|Determines the submission process you want modders to follow.<br><br>*Field Options*<br>__0__ = Control the upload process. ou will have to build an upload system either in-game or via a standalone app, which enables developers to submit mods to the tags you have configured. Because you control the flow, you can pre-validate and compile mods, to ensure they will work in your game. In the long run this option will save you time as you can accept more submissions, but it requires more setup to get running and isn't as open as the above option. NOTE: mod profiles can still be created online, but uploads will have to occur via the tools you supply.<br><br>__1__ = Enable mod uploads from anywhere. Allow developers to upload mods via the website and API, and pick the tags their mod is built for. No validation will be done on the files submitted, it will be the responsibility of your game and apps built to process the mods installation based on the tags selected and determine if the mod is valid and works. For example a mod might be uploaded to the 'map' tag. When a user subscribes to this mod, your game will need to verify it contains a map file and install it where maps are located. If this fails, your game or the community will have to flag the mod as 'incompatible' to remove it from the listing.
» curation|integer(int32)|Determines the curation process for the game.<br><br>*Field Options*<br>__0__ = Mods are immediately available to play, without any intervention or work from your team.<br>__1__ = Screen only mods the author wants to sell, before they are available to purchase via the API.<br>__2__ = All mods must be accepted by someone on your team. This option is useful for games that have a small number of mods and want to control the experience, or you need to set the parameters attached to a mod (i.e. a weapon may require the rate of fire, power level, clip size etc). It can also be used for complex mods, which you may need to build into your game or distribute as DLC.
» revenue|integer(int32)|Determines the revenue-share mod creators receive as a percentage. ie. 20 = 20%
» api|integer(int32)|Determines what permissions you want to enable via the mod.io API.<br><br>*Field Options*<br>__0__ = Third parties cannot access your mods API and mods cannot be downloaded directly without API validation.<br>__1__ = Allow 3rd parties to access your mods API (recommended, an open API will encourage a healthy ecosystem of tools and apps) but mods cannot be downloaded directly<br>__2__ = Allow mods to be downloaded directly but 3rd parties cannot access your mods API.<br>__3__ = Allow third parties to access your mods API and allow mods to be downloaded directly without api validation.
» ugcname|string|Singular string that best describes the type of user-generated content.
» icon|[Icon_Object](#schemaicon_object)|Contains icon data.
»» filename|string|Image filename, with file extension included.
»» full|string|URL to full-sized image.
»» thumb_320x180|string|URL to small thumbnail image.
» logo|[Logo_Object](#schemalogo_object)|Contains logo data.
»» filename|string|Image filename, with file extension included.
»» full|string|URL to full-sized image.
»» thumb_320x180|string|URL to small thumbnail image.
»» thumb_640x360|string|URL to medium thumbnail image.
»» thumb_1280x720|string|URL to large thumbnail image.
» header|[Header_Object](#schemaheader_object)|Contains header data.
»» filename|string|Image filename, with file extension included.
»» full|string|URL to the full-sized header image.
» homepage|string|Official game website URL.
» name|string|Title of the game.
» nameid|string|The unique SEO friendly URL of the game.
» summary|string|Brief summary of the game.
» instructions|string|Modding instructions for developers.
» url|string|website url for the game.
» cats|[[catsArray](#schemacatsarray)]|Contains categories data.
»» name|string|The name of the category.
»» type|string|Are tags selected via checkboxes or a single dropdown.
»» adminonly|integer(int32)|Is this an admin only tag? If so only admin's can see this category and it can be used for filtering.
»» tags|[string]|Eligible tags for this game.




## Browse Game Activity

<a name="schemabrowse_game_activity"></a>

```json
{
  "data": [
    {
      "id": 13,
      "member": {
        "id": 1,
        "nameid": "xant",
        "username": "XanT",
        "avatar": {
          "filename": "masterchief.jpg",
          "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
        },
        "timezone": "Australia/Brisbane",
        "language": "en",
        "url": "https://mod.io/members/xant"
      },
      "dateup": 1499846132,
      "event": "GAME_UPDATE",
      "changes": {
        "summary": {
          "before": "https://www.roguehdpack.com/",
          "after": "https://rogue-knight.mod.io/rogue-hd-pack"
        }
      }
    }
  ]
} 
```


### Properties

Name|Type|Description
---|---|---|---|
data|[[Game_Activity_Object](#schemagame_activity_object)]|Response array of items
» id|integer(int32)|Unique id of activity record.
» member|[Member_Object](#schemamember_object)|Contains member data.
»» id|integer(int32)|Unique id of the user.
»» nameid|string|Unique nameid of user which forms end of their profile URL.
»» username|string|Non-unique username of the user.
»» avatar|[Avatar_Object](#schemaavatar_object)|Contains avatar data.
»»» filename|string|Image filename, including file extension.
»»» full|string|Full URL to the image.
»» timezone|string|The Timezone of the user, shown in {Country}/{City} format.
»» language|string|The users language preference, limited to two characters.
»» url|string|URL to the user profile.
» dateup|string|Unix timestamp of when the record was last updated.
» event|string|Type of event the activity was. Ie. UPDATE or DELETE.
» changes|object|Contains changes data.
»» summary|object|Name of the field that changed, in this example its the 'summary' field.
»»» before|string|The value of the field before the event.
»»» after|string|The value of the field after the event.




## Browse Mods

 <a name="schemabrowse_mods"></a>

```json
{
  "data": [
    {
      "id": 2,
      "game": 2,
      "member": {
        "id": 1,
        "nameid": "xant",
        "username": "XanT",
        "avatar": {
          "filename": "masterchief.jpg",
          "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
        },
        "timezone": "Australia/Brisbane",
        "language": "en",
        "url": "https://mod.io/members/xant"
      },
      "price": 9.99,
      "datereg": 1492564103,
      "dateup": 1499841487,
      "logo": {
        "filename": "IMG_20170409_222419.jpg",
        "full": "https://media.mod.io/images/mods/1/1/2/IMG_20170409_222419.jpg",
        "thumb_320x180": "https://media.mod.io/cache/images/mods/1/1/2/thumb_320x180/IMG_20170409_222419.jpg",
        "thumb_640x360": "https://media.mod.io/cache/images/mods/1/1/2/thumb_640x360/IMG_20170409_222419.jpg",
        "thumb_1280x720": "https://media.mod.io/cache/images/mods/1/1/2/thumb_1280x720/IMG_20170409_222419.jpg"
      },
      "homepage": "https://www.rogue-hdpack.com/",
      "name": "Rogue Knight HD Pack",
      "nameid": "rogue-knight-hd-pack",
      "summary": "It's time to bask in the glory of beautiful 4k textures!",
      "description": "<h2>About</h2><p>Rogue HD Pack does exactly what you thi...",
      "metadata": "rogue,hd,high-res,4k,hd textures",
      "url": "https://rogue-knight.mod.io/rogue-knight-hd-pack",
      "modfile": {
        "id": 2,
        "mod": 2,
        "member": {
          "id": 1,
          "nameid": "xant",
          "username": "XanT",
          "avatar": {
            "filename": "masterchief.jpg",
            "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
          },
          "timezone": "Australia/Brisbane",
          "language": "en",
          "url": "https://mod.io/members/xant"
        },
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
        "download": "https://mod.io/mods/file/2/c489a0354111a4d76640d47f0cdcb294"
      },
      "media": {
        "youtube": [
          "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        ],
        "sketchfab": [
          "https://sketchfab.com/models/ef40b2d300334d009984c8865b2db1c8"
        ],
        "images": [
          {
            "full": "https://media.mod.io/images/mods/1/1/2/IMG_20170409_222419.jpg",
            "thumbnail": "https://media.mod.io/cache/images/mods/1/1/2/thumb_1020x2000/IMG_20170409_222419.jpg",
            "filename": "IMG_20170409_222419.jpg"
          }
        ]
      },
      "tags": [
        null
      ],
      "ratings": {
        "total": 1230,
        "positive": 1047,
        "negative": 183,
        "weighted": 87.38,
        "percentage": 91,
        "text": "Very Positive"
      }
    },
    {
        ...
    }
  ],
  "cursor_id": 60,
  "prev_id": 30,
  "next_id": 160,
  "result_count": 100
} 
```


### Properties

Name|Type|Description
---|---|---|---|
cursor_id|integer(int32)|The current _cursor value.
prev_id|integer(int32)|The previous _cursor value as manually inserted by you, null by default.
next_id|integer(int32)|The next position to move the _cursor to, based on the current request.
result_count|integer(int32)|The amount of results returned in the current request.
data|[[Mod_Object](#schemamod_object)]|Array containing mod objects
» id|integer(int32)|Unique mod id.
» game|integer(int32)|Unique game id.
» member|[Member_Object](#schemamember_object)|Contains member data.
»» id|integer(int32)|Unique id of the user.
»» nameid|string|Unique nameid of user which forms end of their profile URL.
»» username|string|Non-unique username of the user.
»» avatar|[Avatar_Object](#schemaavatar_object)|Contains avatar data.
»»» filename|string|Image filename, including file extension.
»»» full|string|Full URL to the image.
»» timezone|string|The Timezone of the user, shown in {Country}/{City} format.
»» language|string|The users language preference, limited to two characters.
»» url|string|URL to the user profile.
» price|float|Sale price if applicable, in USD.
» datereg|integer(int32)|Unix timestamp of date registered.
» dateup|integer(int32)|Unix timestamp of date last updated.
» logo|[Logo_Object](#schemalogo_object)|Contains logo data.
»» filename|string|Image filename, with file extension included.
»» full|string|URL to full-sized image.
»» thumb_320x180|string|URL to small thumbnail image.
»» thumb_640x360|string|URL to medium thumbnail image.
»» thumb_1280x720|string|URL to large thumbnail image.
» homepage|string|Mod homepage URL.
» name|string|Name of the mod.
» nameid|string|Unique SEO-friendly mod uri.
» summary|string|Brief summary of the mod.
» description|string|Description of the mod.
» metadata|string|Metadata for the mod.
» url|string|Official website url for the mod.
» modfile|[Modfile_Object](#schemamodfile_object)|Contains file data.
»» id|integer(int32)|Unique file id.
»» mod|integer(int32)|Unique mod id.
»» member|[Member_Object](#schemamember_object)|Contains member data.
»»» id|integer(int32)|Unique id of the user.
»»» nameid|string|Unique nameid of user which forms end of their profile URL.
»»» username|string|Non-unique username of the user.
»»» avatar|[Avatar_Object](#schemaavatar_object)|Contains avatar data.
»»»» filename|string|Image filename, including file extension.
»»»» full|string|Full URL to the image.
»»» timezone|string|The Timezone of the user, shown in {Country}/{City} format.
»»» language|string|The users language preference, limited to two characters.
»»» url|string|URL to the user profile.
»» date|integer(int32)|Unix timestamp of file upload time.
»» datevirus|integer(int32)|Unix timestamp of file virus scan.
»» virusstatus|integer(int32)|The status of the virus scan for the file.
»» viruspositive|integer(int32)|Has the file been positively flagged as a virus?
»» filesize|integer(int32)|Size of the file in bytes.
»» filehash|string|MD5 filehash
»» filename|string|Name of the file including file extension.
»» version|string|The release version this file represents.
»» virustotal|string|Text output from virustotal scan.
»» changelog|string|List of all changes in this file release.
»» download|string|Link to download the file from the mod.io CDN.
» media|object|Contains media data.
»» youtube|[string]|Contains YouTube data.
»» sketchfab|[string]|Contains Sketchfab data.
»» images|[Unknown]|Contains images data.
»»» full|string|URL to the full image.
»»» thumbnail|string|URL to the thumbnail image.
»»» filename|string|Image filename, with with extension included.
» ratings|[Rating_Object](#schemarating_object)|Contains ratings data.
»» total|integer(int32)|Total Ratings.
»» positive|integer(int32)|Positive Ratings.
»» negative|integer(int32)|Negative ratings.
»» weighted|float|Weighted Rating.
»» percentage|integer(int32)|Percentage.
»» text|string|Text representation of the rating total.
» tags|[Unknown]|No description




## Browse Mod Activity

<a name="schemabrowse_mod_activity"></a>

```json
{
  "data": [
    {
      "id": 13,
      "member": {
        "id": 1,
        "nameid": "xant",
        "username": "XanT",
        "avatar": {
          "filename": "masterchief.jpg",
          "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
        },
        "timezone": "Australia/Brisbane",
        "language": "en",
        "url": "https://mod.io/members/xant"
      },
      "dateup": 1499846132,
      "event": "MOD_UPDATE",
      "changes": {
        "summary": {
          "before": "https://www.roguehdpack.com/",
          "after": "https://rogue-knight.mod.io/rogue-hd-pack"
        }
      }
    }
  ]
} 
```


### Properties

Name|Type|Description
---|---|---|---|
data|[[Mod_Activity_Object](#schemamod_activity_object)]|Response array of items
» id|integer(int32)|Unique id of activity object.
» member|[Member_Object](#schemamember_object)|Contains member data.
»» id|integer(int32)|Unique id of the user.
»» nameid|string|Unique nameid of user which forms end of their profile URL.
»» username|string|Non-unique username of the user.
»» avatar|[Avatar_Object](#schemaavatar_object)|Contains avatar data.
»»» filename|string|Image filename, including file extension.
»»» full|string|Full URL to the image.
»» timezone|string|The Timezone of the user, shown in {Country}/{City} format.
»» language|string|The users language preference, limited to two characters.
»» url|string|URL to the user profile.
» dateup|integer(int32)|Unix timestamp of when the update occurred.
» event|string|The type of resource and action that occurred.
» changes|object|No description
»» summary|object|No description
»»» before|string|No description
»»» after|string|No description




## Browse Mod Files

<a name="schemabrowse_mod_files"></a>

```json
{
  "data": [
    {
      "id": 2,
      "mod": 2,
      "member": {
        "id": 1,
        "nameid": "xant",
        "username": "XanT",
        "avatar": {
          "filename": "masterchief.jpg",
          "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
        },
        "timezone": "Australia/Brisbane",
        "language": "en",
        "url": "https://mod.io/members/xant"
      },
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
      "download": "https://mod.io/mods/file/2/c489a0354111a4d76640d47f0cdcb294"
    },
    {
        ...
    }
  ],
  "cursor_id": 60,
  "prev_id": 30,
  "next_id": 160,
  "result_count": 100
} 
```


### Properties

Name|Type|Description
---|---|---|---|
cursor_id|integer(int32)|The current _cursor value.
prev_id|integer(int32)|The previous _cursor value as manually inserted by you, null by default.
next_id|integer(int32)|The next position to move the _cursor to, based on the current request.
result_count|integer(int32)|The amount of results returned in the current request.
data|[[Modfile_Object](#schemamodfile_object)]|Response array of items
» id|integer(int32)|Unique file id.
» mod|integer(int32)|Unique mod id.
» member|[Member_Object](#schemamember_object)|Contains member data.
»» id|integer(int32)|Unique id of the user.
»» nameid|string|Unique nameid of user which forms end of their profile URL.
»» username|string|Non-unique username of the user.
»» avatar|[Avatar_Object](#schemaavatar_object)|Contains avatar data.
»»» filename|string|Image filename, including file extension.
»»» full|string|Full URL to the image.
»» timezone|string|The Timezone of the user, shown in {Country}/{City} format.
»» language|string|The users language preference, limited to two characters.
»» url|string|URL to the user profile.
» date|integer(int32)|Unix timestamp of file upload time.
» datevirus|integer(int32)|Unix timestamp of file virus scan.
» virusstatus|integer(int32)|The status of the virus scan for the file.
» viruspositive|integer(int32)|Has the file been positively flagged as a virus?
» filesize|integer(int32)|Size of the file in bytes.
» filehash|string|MD5 filehash
» filename|string|Name of the file including file extension.
» version|string|The release version this file represents.
» virustotal|string|Text output from virustotal scan.
» changelog|string|List of all changes in this file release.
» download|string|Link to download the file from the mod.io CDN.




## Browse Mod Tags

<a name="schemabrowse_mod_tags"></a>

```json
{
  "data": [
    {
      "game": 2,
      "mod": 2,
      "tag": "Unity",
      "date": 1499841487
    }
  ]
} 
```


### Properties

Name|Type|Description
---|---|---|---|
data|[[Mod_Tag_Object](#schemamod_tag_object)]|No description
» game|integer(int32)|Unique game id.
» mod|integer(int32)|Unique mod id.
» tag|string|The contents of the tag.
» date|integer(int32)|Unix timestamp of when tag was applied.




## Browse Comments

 <a name="schemabrowse_comments"></a>

```json
{
  "data": [
    {
      "id": 2,
      "mod": 2,
      "member": {
        "id": 1,
        "nameid": "xant",
        "username": "XanT",
        "avatar": {
          "filename": "masterchief.jpg",
          "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
        },
        "timezone": "Australia/Brisbane",
        "language": "en",
        "url": "https://mod.io/members/xant"
      },
      "date": 1499841487,
      "replyid": 1499,
      "replypos": "01",
      "karma": 1,
      "karmago": 0,
      "summary": "This mod is kickass! Great work!"
    },
    {
        ...
    }
  ],
  "cursor_id": 60,
  "prev_id": 30,
  "next_id": 160,
  "result_count": 100
} 
```


### Properties

Name|Type|Description
---|---|---|---|
cursor_id|integer(int32)|The current _cursor value.
prev_id|integer(int32)|The previous _cursor value as manually inserted by you, null by default.
next_id|integer(int32)|The next position to move the _cursor to, based on the current request.
result_count|integer(int32)|The amount of results returned in the current request.
data|[[Comment_Object](#schemacomment_object)]|Array containing comment objects
» id|integer(int32)|Unique id of the comment.
» mod|integer(int32)|Unique id of the parent mod.
» member|[Member_Object](#schemamember_object)|Contains member data.
»» id|integer(int32)|Unique id of the user.
»» nameid|string|Unique nameid of user which forms end of their profile URL.
»» username|string|Non-unique username of the user.
»» avatar|[Avatar_Object](#schemaavatar_object)|Contains avatar data.
»»» filename|string|Image filename, including file extension.
»»» full|string|Full URL to the image.
»» timezone|string|The Timezone of the user, shown in {Country}/{City} format.
»» language|string|The users language preference, limited to two characters.
»» url|string|URL to the user profile.
» date|integer(int32)|Unix timestamp of when the comment was published.
» replyid|integer(int32)|Unique replyid used to submitting a nested reply to the published comment.
» replypos|string|Nesting position of the reply.
» karma|integer(int32)|The amount of karma the comment has received.
» karmago|integer(int32)|The amount of good karma the comment has received.
» summary|string|The contents of the comment.




## Browse Team

 <a name="schemabrowse_team"></a>

```json
{
  "cursor_id": 60,
  "prev_id": 30,
  "next_id": 160,
  "result_count": 100,
  "data": [
    {
      "id": 457,
      "member": {
        "id": 1,
        "nameid": "xant",
        "username": "XanT",
        "avatar": {
          "filename": "masterchief.jpg",
          "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
        },
        "timezone": "Australia/Brisbane",
        "language": "en",
        "url": "https://mod.io/members/xant"
      },
      "username": "Megalodon",
      "level": 8,
      "date": 1492058857,
      "position": "Supreme Overlord"
    }
  ]
} 
```


### Properties

Name|Type|Description
---|---|---|---|
cursor_id|integer(int32)|The current _cursor value.
prev_id|integer(int32)|The previous _cursor value as manually inserted by you, null by default.
next_id|integer(int32)|The next position to move the _cursor to, based on the current request.
result_count|integer(int32)|The amount of results returned in the current request.
data|[[Access_Object](#schemaaccess_object)]|No description
» id|integer(int32)|Unique access id.
» member|[Member_Object](#schemamember_object)|Contains member data.
»» id|integer(int32)|Unique id of the user.
»» nameid|string|Unique nameid of user which forms end of their profile URL.
»» username|string|Non-unique username of the user.
»» avatar|[Avatar_Object](#schemaavatar_object)|Contains avatar data.
»»» filename|string|Image filename, including file extension.
»»» full|string|Full URL to the image.
»» timezone|string|The Timezone of the user, shown in {Country}/{City} format.
»» language|string|The users language preference, limited to two characters.
»» url|string|URL to the user profile.
» username|string|Team member username.
» level|integer(int32)|The level of permissions the member has within the team. 0 = Guest, 1 = Member, 2 = Contributor, 4 = Manager, 8 = Leader.
» date|integer(int32)|Unix timestamp of date the member joined the team.
» position|string|Custom title, has no effect on any access rights.




## Browse Users

 <a name="schemabrowse_users"></a>

```json
{
  "data": [
    {
      "id": 1,
      "nameid": "xant",
      "username": "XanT",
      "avatar": {
        "filename": "masterchief.jpg",
        "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
      },
      "timezone": "Australia/Brisbane",
      "language": "en",
      "url": "https://mod.io/members/xant"
    },
    {
        ...
    }
  ],
  "cursor_id": 60,
  "prev_id": 30,
  "next_id": 160,
  "result_count": 100
} 
```


### Properties

Name|Type|Description
---|---|---|---|
cursor_id|integer(int32)|The current _cursor value.
prev_id|integer(int32)|The previous _cursor value as manually inserted by you, null by default.
next_id|integer(int32)|The next position to move the _cursor to, based on the current request.
result_count|integer(int32)|The amount of results returned in the current request.
data|[[Member_Object](#schemamember_object)]|Response array of items
» id|integer(int32)|Unique id of the user.
» nameid|string|Unique nameid of user which forms end of their profile URL.
» username|string|Non-unique username of the user.
» avatar|[Avatar_Object](#schemaavatar_object)|Contains avatar data.
»» filename|string|Image filename, including file extension.
»» full|string|Full URL to the image.
» timezone|string|The Timezone of the user, shown in {Country}/{City} format.
» language|string|The users language preference, limited to two characters.
» url|string|URL to the user profile.




## Browse Updates

 <a name="schemabrowse_updates"></a>

```json
{
  "data": [
    {
      "id": 351,
      "resource": "games",
      "resourceid": 2,
      "type": 4,
      "date": 1492058857,
      "mention": 0
    }
  ]
} 
```


### Properties

Name|Type|Description
---|---|---|---|
data|[[Update_Object](#schemaupdate_object)]|No description
» id|integer(int32)|Unique update id.
» resource|string|String representation of the update origin's resource type.
» resourceid|integer(int32)|Unique id of corresponding resource.
» type|integer(int32)|The type of update.<br>*Field Options*<br>__0__ = Guest<br>__1__ = Member<br>__2__ = Contributor<br>__4__ = Manager<br>__8__ = Leader
» date|integer(int32)|Unix timestamp of date the update was created.
» mention|integer(int32)|Is this update the result of a user @mentioning you.




## Access Object

 <a name="schemaaccess_object"></a>

```json
{
  "id": 457,
  "member": {
    "id": 1,
    "nameid": "xant",
    "username": "XanT",
    "avatar": {
      "filename": "masterchief.jpg",
      "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
    },
    "timezone": "Australia/Brisbane",
    "language": "en",
    "url": "https://mod.io/members/xant"
  },
  "username": "Megalodon",
  "level": 8,
  "date": 1492058857,
  "position": "Supreme Overlord"
} 
```


### Properties

Name|Type|Description
---|---|---|---|
id|integer(int32)|Unique access id.
member|[Member_Object](#schemamember_object)|Contains member data.
» id|integer(int32)|Unique id of the user.
» nameid|string|Unique nameid of user which forms end of their profile URL.
» username|string|Non-unique username of the user.
» avatar|[Avatar_Object](#schemaavatar_object)|Contains avatar data.
»» filename|string|Image filename, including file extension.
»» full|string|Full URL to the image.
» timezone|string|The Timezone of the user, shown in {Country}/{City} format.
» language|string|The users language preference, limited to two characters.
» url|string|URL to the user profile.
username|string|Team member username.
level|integer(int32)|The level of permissions the member has within the team. 0 = Guest, 1 = Member, 2 = Contributor, 4 = Manager, 8 = Leader.
date|integer(int32)|Unix timestamp of date the member joined the team.
position|string|Custom title, has no effect on any access rights.




## Game Activity Object

<a name="schemagame_activity_object"></a>

```json
{
  "id": 13,
  "member": {
    "id": 1,
    "nameid": "xant",
    "username": "XanT",
    "avatar": {
      "filename": "masterchief.jpg",
      "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
    },
    "timezone": "Australia/Brisbane",
    "language": "en",
    "url": "https://mod.io/members/xant"
  },
  "dateup": 1499846132,
  "event": "GAME_UPDATE",
  "changes": {
    "summary": {
      "before": "https://www.roguehdpack.com/",
      "after": "https://rogue-knight.mod.io/rogue-hd-pack"
    }
  }
} 
```


### Properties

Name|Type|Description
---|---|---|---|
id|integer(int32)|Unique id of activity record.
member|[Member_Object](#schemamember_object)|Contains member data.
» id|integer(int32)|Unique id of the user.
» nameid|string|Unique nameid of user which forms end of their profile URL.
» username|string|Non-unique username of the user.
» avatar|[Avatar_Object](#schemaavatar_object)|Contains avatar data.
»» filename|string|Image filename, including file extension.
»» full|string|Full URL to the image.
» timezone|string|The Timezone of the user, shown in {Country}/{City} format.
» language|string|The users language preference, limited to two characters.
» url|string|URL to the user profile.
dateup|string|Unix timestamp of when the record was last updated.
event|string|Type of event the activity was. Ie. UPDATE or DELETE.
changes|object|Contains changes data.
» summary|object|Name of the field that changed, in this example its the 'summary' field.
»» before|string|The value of the field before the event.
»» after|string|The value of the field after the event.




## Mod Activity Object

<a name="schemamod_activity_object"></a>

```json
{
  "id": 13,
  "member": {
    "id": 1,
    "nameid": "xant",
    "username": "XanT",
    "avatar": {
      "filename": "masterchief.jpg",
      "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
    },
    "timezone": "Australia/Brisbane",
    "language": "en",
    "url": "https://mod.io/members/xant"
  },
  "dateup": 1499846132,
  "event": "MOD_UPDATE",
  "changes": {
    "summary": {
      "before": "https://www.roguehdpack.com/",
      "after": "https://rogue-knight.mod.io/rogue-hd-pack"
    }
  }
} 
```


### Properties

Name|Type|Description
---|---|---|---|
id|integer(int32)|Unique id of activity object.
member|[Member_Object](#schemamember_object)|Contains member data.
» id|integer(int32)|Unique id of the user.
» nameid|string|Unique nameid of user which forms end of their profile URL.
» username|string|Non-unique username of the user.
» avatar|[Avatar_Object](#schemaavatar_object)|Contains avatar data.
»» filename|string|Image filename, including file extension.
»» full|string|Full URL to the image.
» timezone|string|The Timezone of the user, shown in {Country}/{City} format.
» language|string|The users language preference, limited to two characters.
» url|string|URL to the user profile.
dateup|integer(int32)|Unix timestamp of when the update occurred.
event|string|The type of resource and action that occurred.
changes|object|No description
» summary|object|No description
»» before|string|No description
»» after|string|No description




## Comment Object

 <a name="schemacomment_object"></a>

```json
{
  "id": 2,
  "mod": 2,
  "member": {
    "id": 1,
    "nameid": "xant",
    "username": "XanT",
    "avatar": {
      "filename": "masterchief.jpg",
      "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
    },
    "timezone": "Australia/Brisbane",
    "language": "en",
    "url": "https://mod.io/members/xant"
  },
  "date": 1499841487,
  "replyid": 1499,
  "replypos": "01",
  "karma": 1,
  "karmago": 0,
  "summary": "This mod is kickass! Great work!"
} 
```


### Properties

Name|Type|Description
---|---|---|---|
id|integer(int32)|Unique id of the comment.
mod|integer(int32)|Unique id of the parent mod.
member|[Member_Object](#schemamember_object)|Contains member data.
» id|integer(int32)|Unique id of the user.
» nameid|string|Unique nameid of user which forms end of their profile URL.
» username|string|Non-unique username of the user.
» avatar|[Avatar_Object](#schemaavatar_object)|Contains avatar data.
»» filename|string|Image filename, including file extension.
»» full|string|Full URL to the image.
» timezone|string|The Timezone of the user, shown in {Country}/{City} format.
» language|string|The users language preference, limited to two characters.
» url|string|URL to the user profile.
date|integer(int32)|Unix timestamp of when the comment was published.
replyid|integer(int32)|Unique replyid used to submitting a nested reply to the published comment.
replypos|string|Nesting position of the reply.
karma|integer(int32)|The amount of karma the comment has received.
karmago|integer(int32)|The amount of good karma the comment has received.
summary|string|The contents of the comment.




## Ownership Object

 <a name="schemaownership_object"></a>

```json
{
  "resource": "files",
  "id": 3,
  "ownership": true
} 
```


### Properties

Name|Type|Description
---|---|---|---|
resource|string|String representation of the resource.
id|integer(int32)|Unique id of resource
ownership|boolean|Does the specified member have ownership over the resource?




## Price Object

 <a name="schemaprice_object"></a>

```json
{
  "resource": "files",
  "id": 3,
  "price": 19.99
} 
```


### Properties

Name|Type|Description
---|---|---|---|
resource|string|String representation of the resource type.
id|integer(int32)|Unique id of the resource.
price|float|If applicable, the price of the resource displayed in USD.




## Modfile Object

 <a name="schemamodfile_object"></a>

```json
{
  "id": 2,
  "mod": 2,
  "member": {
    "id": 1,
    "nameid": "xant",
    "username": "XanT",
    "avatar": {
      "filename": "masterchief.jpg",
      "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
    },
    "timezone": "Australia/Brisbane",
    "language": "en",
    "url": "https://mod.io/members/xant"
  },
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
  "download": "https://mod.io/mods/file/2/c489a0354111a4d76640d47f0cdcb294"
} 
```


### Properties

Name|Type|Description
---|---|---|---|
id|integer(int32)|Unique file id.
mod|integer(int32)|Unique mod id.
member|[Member_Object](#schemamember_object)|Contains member data.
» id|integer(int32)|Unique id of the user.
» nameid|string|Unique nameid of user which forms end of their profile URL.
» username|string|Non-unique username of the user.
» avatar|[Avatar_Object](#schemaavatar_object)|Contains avatar data.
»» filename|string|Image filename, including file extension.
»» full|string|Full URL to the image.
» timezone|string|The Timezone of the user, shown in {Country}/{City} format.
» language|string|The users language preference, limited to two characters.
» url|string|URL to the user profile.
date|integer(int32)|Unix timestamp of file upload time.
datevirus|integer(int32)|Unix timestamp of file virus scan.
virusstatus|integer(int32)|The status of the virus scan for the file.
viruspositive|integer(int32)|Has the file been positively flagged as a virus?
filesize|integer(int32)|Size of the file in bytes.
filehash|string|MD5 filehash
filename|string|Name of the file including file extension.
version|string|The release version this file represents.
virustotal|string|Text output from virustotal scan.
changelog|string|List of all changes in this file release.
download|string|Link to download the file from the mod.io CDN.




## Mod Object

 <a name="schemamod_object"></a>

```json
{
  "id": 2,
  "game": 2,
  "member": {
    "id": 1,
    "nameid": "xant",
    "username": "XanT",
    "avatar": {
      "filename": "masterchief.jpg",
      "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
    },
    "timezone": "Australia/Brisbane",
    "language": "en",
    "url": "https://mod.io/members/xant"
  },
  "price": 9.99,
  "datereg": 1492564103,
  "dateup": 1499841487,
  "logo": {
    "filename": "IMG_20170409_222419.jpg",
    "full": "https://media.mod.io/images/mods/1/1/2/IMG_20170409_222419.jpg",
    "thumb_320x180": "https://media.mod.io/cache/images/mods/1/1/2/thumb_320x180/IMG_20170409_222419.jpg",
    "thumb_640x360": "https://media.mod.io/cache/images/mods/1/1/2/thumb_640x360/IMG_20170409_222419.jpg",
    "thumb_1280x720": "https://media.mod.io/cache/images/mods/1/1/2/thumb_1280x720/IMG_20170409_222419.jpg"
  },
  "homepage": "https://www.rogue-hdpack.com/",
  "name": "Rogue Knight HD Pack",
  "nameid": "rogue-knight-hd-pack",
  "summary": "It's time to bask in the glory of beautiful 4k textures!",
  "description": "<h2>About</h2><p>Rogue HD Pack does exactly what you thi...",
  "metadata": "rogue,hd,high-res,4k,hd textures",
  "url": "https://rogue-knight.mod.io/rogue-knight-hd-pack",
  "modfile": {
    "id": 2,
    "mod": 2,
    "member": {
      "id": 1,
      "nameid": "xant",
      "username": "XanT",
      "avatar": {
        "filename": "masterchief.jpg",
        "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
      },
      "timezone": "Australia/Brisbane",
      "language": "en",
      "url": "https://mod.io/members/xant"
    },
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
    "download": "https://mod.io/mods/file/2/c489a0354111a4d76640d47f0cdcb294"
  },
  "media": {
    "youtube": [
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    ],
    "sketchfab": [
      "https://sketchfab.com/models/ef40b2d300334d009984c8865b2db1c8"
    ],
    "images": [
      {
        "full": "https://media.mod.io/images/mods/1/1/2/IMG_20170409_222419.jpg",
        "thumbnail": "https://media.mod.io/cache/images/mods/1/1/2/thumb_1020x2000/IMG_20170409_222419.jpg",
        "filename": "IMG_20170409_222419.jpg"
      }
    ]
  },
  "tags": [
    null
  ],
  "ratings": {
    "total": 1230,
    "positive": 1047,
    "negative": 183,
    "weighted": 87.38,
    "percentage": 91,
    "text": "Very Positive"
  }
} 
```


### Properties

Name|Type|Description
---|---|---|---|
id|integer(int32)|Unique mod id.
game|integer(int32)|Unique game id.
member|[Member_Object](#schemamember_object)|Contains member data.
» id|integer(int32)|Unique id of the user.
» nameid|string|Unique nameid of user which forms end of their profile URL.
» username|string|Non-unique username of the user.
» avatar|[Avatar_Object](#schemaavatar_object)|Contains avatar data.
»» filename|string|Image filename, including file extension.
»» full|string|Full URL to the image.
» timezone|string|The Timezone of the user, shown in {Country}/{City} format.
» language|string|The users language preference, limited to two characters.
» url|string|URL to the user profile.
price|float|Sale price if applicable, in USD.
datereg|integer(int32)|Unix timestamp of date registered.
dateup|integer(int32)|Unix timestamp of date last updated.
logo|[Logo_Object](#schemalogo_object)|Contains logo data.
» filename|string|Image filename, with file extension included.
» full|string|URL to full-sized image.
» thumb_320x180|string|URL to small thumbnail image.
» thumb_640x360|string|URL to medium thumbnail image.
» thumb_1280x720|string|URL to large thumbnail image.
homepage|string|Mod homepage URL.
name|string|Name of the mod.
nameid|string|Unique SEO-friendly mod uri.
summary|string|Brief summary of the mod.
description|string|Description of the mod.
metadata|string|Metadata for the mod.
url|string|Official website url for the mod.
modfile|[Modfile_Object](#schemamodfile_object)|Contains file data.
» id|integer(int32)|Unique file id.
» mod|integer(int32)|Unique mod id.
» member|[Member_Object](#schemamember_object)|Contains member data.
»» id|integer(int32)|Unique id of the user.
»» nameid|string|Unique nameid of user which forms end of their profile URL.
»» username|string|Non-unique username of the user.
»» avatar|[Avatar_Object](#schemaavatar_object)|Contains avatar data.
»»» filename|string|Image filename, including file extension.
»»» full|string|Full URL to the image.
»» timezone|string|The Timezone of the user, shown in {Country}/{City} format.
»» language|string|The users language preference, limited to two characters.
»» url|string|URL to the user profile.
» date|integer(int32)|Unix timestamp of file upload time.
» datevirus|integer(int32)|Unix timestamp of file virus scan.
» virusstatus|integer(int32)|The status of the virus scan for the file.
» viruspositive|integer(int32)|Has the file been positively flagged as a virus?
» filesize|integer(int32)|Size of the file in bytes.
» filehash|string|MD5 filehash
» filename|string|Name of the file including file extension.
» version|string|The release version this file represents.
» virustotal|string|Text output from virustotal scan.
» changelog|string|List of all changes in this file release.
» download|string|Link to download the file from the mod.io CDN.
media|object|Contains media data.
» youtube|[string]|Contains YouTube data.
» sketchfab|[string]|Contains Sketchfab data.
» images|[Unknown]|Contains images data.
»» full|string|URL to the full image.
»» thumbnail|string|URL to the thumbnail image.
»» filename|string|Image filename, with with extension included.
ratings|[Rating_Object](#schemarating_object)|Contains ratings data.
» total|integer(int32)|Total Ratings.
» positive|integer(int32)|Positive Ratings.
» negative|integer(int32)|Negative ratings.
» weighted|float|Weighted Rating.
» percentage|integer(int32)|Percentage.
» text|string|Text representation of the rating total.
tags|[Unknown]|No description




## Mod Tag Object

<a name="schemamod_tag_object"></a>

```json
{
  "game": 2,
  "mod": 2,
  "tag": "Unity",
  "date": 1499841487
} 
```


### Properties

Name|Type|Description
---|---|---|---|
game|integer(int32)|Unique game id.
mod|integer(int32)|Unique mod id.
tag|string|The contents of the tag.
date|integer(int32)|Unix timestamp of when tag was applied.




## Game Object

 <a name="schemagame_object"></a>

```json
{
  "id": 2,
  "member": {
    "id": 1,
    "nameid": "xant",
    "username": "XanT",
    "avatar": {
      "filename": "masterchief.jpg",
      "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
    },
    "timezone": "Australia/Brisbane",
    "language": "en",
    "url": "https://mod.io/members/xant"
  },
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
    "filename": "IMG_20170409_222419.jpg",
    "full": "https://media.mod.io/images/mods/1/1/2/icon.png",
    "thumb_320x180": "https://media.mod.io/cache/images/mods/1/1/2/thumb_320x180/icon.png"
  },
  "logo": {
    "filename": "IMG_20170409_222419.jpg",
    "full": "https://media.mod.io/images/mods/1/1/2/IMG_20170409_222419.jpg",
    "thumb_320x180": "https://media.mod.io/cache/images/mods/1/1/2/thumb_320x180/IMG_20170409_222419.jpg",
    "thumb_640x360": "https://media.mod.io/cache/images/mods/1/1/2/thumb_640x360/IMG_20170409_222419.jpg",
    "thumb_1280x720": "https://media.mod.io/cache/images/mods/1/1/2/thumb_1280x720/IMG_20170409_222419.jpg"
  },
  "header": {
    "filename": "gameheader.png",
    "full": "https://media.mod.io/images/games/1/1/2/gameheader.png"
  },
  "homepage": "https://www.rogue-knight-game.com/",
  "name": "Rogue Knight",
  "nameid": "rogue-knight",
  "summary": "Rogue Knight is a brand new 2D pixel platformer.",
  "instructions": "Instructions here on how to develop for your game.",
  "url": "https://rogue-knight.mod.io",
  "cats": [
    {
      "name": "Engines",
      "type": "checkboxes",
      "tags": [
        "Unity"
      ],
      "adminonly": 0
    }
  ]
} 
```


### Properties

Name|Type|Description
---|---|---|---|
id|integer(int32)|Unique game id.
member|[Member_Object](#schemamember_object)|Contains member data.
» id|integer(int32)|Unique id of the user.
» nameid|string|Unique nameid of user which forms end of their profile URL.
» username|string|Non-unique username of the user.
» avatar|[Avatar_Object](#schemaavatar_object)|Contains avatar data.
»» filename|string|Image filename, including file extension.
»» full|string|Full URL to the image.
» timezone|string|The Timezone of the user, shown in {Country}/{City} format.
» language|string|The users language preference, limited to two characters.
» url|string|URL to the user profile.
datereg|integer(int32)|Unix timestamp of date registered.
dateup|integer(int32)|Unix timestamp of date updated.
presentation|integer(int32)|Determines which presentation style you want to use for your game on the mod.io website <br><br>*Field options*<br>__0__ =  Grid View: Displays mods in a grid (visual but less informative, default setting) <br>__1__ = Table View: Displays mods in a table (easier to browse).
community|integer(int32)|Determines the rights community members have with the game.<br><br>*Field Options*<br>__0__ = Discussion board disabled, community cannot share guides and news<br>__1__ = Discussion Board enabled only<br>__2__ = Community can only share guides and news<br>__3__ = Discussion Board enabled and community can share news and guides
submission|integer(int32)|Determines the submission process you want modders to follow.<br><br>*Field Options*<br>__0__ = Control the upload process. ou will have to build an upload system either in-game or via a standalone app, which enables developers to submit mods to the tags you have configured. Because you control the flow, you can pre-validate and compile mods, to ensure they will work in your game. In the long run this option will save you time as you can accept more submissions, but it requires more setup to get running and isn't as open as the above option. NOTE: mod profiles can still be created online, but uploads will have to occur via the tools you supply.<br><br>__1__ = Enable mod uploads from anywhere. Allow developers to upload mods via the website and API, and pick the tags their mod is built for. No validation will be done on the files submitted, it will be the responsibility of your game and apps built to process the mods installation based on the tags selected and determine if the mod is valid and works. For example a mod might be uploaded to the 'map' tag. When a user subscribes to this mod, your game will need to verify it contains a map file and install it where maps are located. If this fails, your game or the community will have to flag the mod as 'incompatible' to remove it from the listing.
curation|integer(int32)|Determines the curation process for the game.<br><br>*Field Options*<br>__0__ = Mods are immediately available to play, without any intervention or work from your team.<br>__1__ = Screen only mods the author wants to sell, before they are available to purchase via the API.<br>__2__ = All mods must be accepted by someone on your team. This option is useful for games that have a small number of mods and want to control the experience, or you need to set the parameters attached to a mod (i.e. a weapon may require the rate of fire, power level, clip size etc). It can also be used for complex mods, which you may need to build into your game or distribute as DLC.
revenue|integer(int32)|Determines the revenue-share mod creators receive as a percentage. ie. 20 = 20%
api|integer(int32)|Determines what permissions you want to enable via the mod.io API.<br><br>*Field Options*<br>__0__ = Third parties cannot access your mods API and mods cannot be downloaded directly without API validation.<br>__1__ = Allow 3rd parties to access your mods API (recommended, an open API will encourage a healthy ecosystem of tools and apps) but mods cannot be downloaded directly<br>__2__ = Allow mods to be downloaded directly but 3rd parties cannot access your mods API.<br>__3__ = Allow third parties to access your mods API and allow mods to be downloaded directly without api validation.
ugcname|string|Singular string that best describes the type of user-generated content.
icon|[Icon_Object](#schemaicon_object)|Contains icon data.
» filename|string|Image filename, with file extension included.
» full|string|URL to full-sized image.
» thumb_320x180|string|URL to small thumbnail image.
logo|[Logo_Object](#schemalogo_object)|Contains logo data.
» filename|string|Image filename, with file extension included.
» full|string|URL to full-sized image.
» thumb_320x180|string|URL to small thumbnail image.
» thumb_640x360|string|URL to medium thumbnail image.
» thumb_1280x720|string|URL to large thumbnail image.
header|[Header_Object](#schemaheader_object)|Contains header data.
» filename|string|Image filename, with file extension included.
» full|string|URL to the full-sized header image.
homepage|string|Official game website URL.
name|string|Title of the game.
nameid|string|The unique SEO friendly URL of the game.
summary|string|Brief summary of the game.
instructions|string|Modding instructions for developers.
url|string|website url for the game.
cats|[[catsArray](#schemacatsarray)]|Contains categories data.
» name|string|The name of the category.
» type|string|Are tags selected via checkboxes or a single dropdown.
» adminonly|integer(int32)|Is this an admin only tag? If so only admin's can see this category and it can be used for filtering.
» tags|[string]|Eligible tags for this game.




## Rating Object

 <a name="schemarating_object"></a>

```json
{
  "total": 1230,
  "positive": 1047,
  "negative": 183,
  "weighted": 87.38,
  "percentage": 91,
  "text": "Very Positive"
} 
```


### Properties

Name|Type|Description
---|---|---|---|
total|integer(int32)|Total Ratings.
positive|integer(int32)|Positive Ratings.
negative|integer(int32)|Negative ratings.
weighted|float|Weighted Rating.
percentage|integer(int32)|Percentage.
text|string|Text representation of the rating total.




## Update Object

 <a name="schemaupdate_object"></a>

```json
{
  "id": 351,
  "resource": "games",
  "resourceid": 2,
  "type": 4,
  "date": 1492058857,
  "mention": 0
} 
```


### Properties

Name|Type|Description
---|---|---|---|
id|integer(int32)|Unique update id.
resource|string|String representation of the update origin's resource type.
resourceid|integer(int32)|Unique id of corresponding resource.
type|integer(int32)|The type of update.<br>*Field Options*<br>__0__ = Guest<br>__1__ = Member<br>__2__ = Contributor<br>__4__ = Manager<br>__8__ = Leader
date|integer(int32)|Unix timestamp of date the update was created.
mention|integer(int32)|Is this update the result of a user @mentioning you.




## Member Object

 <a name="schemamember_object"></a>

```json
{
  "id": 1,
  "nameid": "xant",
  "username": "XanT",
  "avatar": {
    "filename": "masterchief.jpg",
    "full": "https://media.mod.io/images/members/1/1/1/masterchief.jpg"
  },
  "timezone": "Australia/Brisbane",
  "language": "en",
  "url": "https://mod.io/members/xant"
} 
```


### Properties

Name|Type|Description
---|---|---|---|
id|integer(int32)|Unique id of the user.
nameid|string|Unique nameid of user which forms end of their profile URL.
username|string|Non-unique username of the user.
avatar|[Avatar_Object](#schemaavatar_object)|Contains avatar data.
» filename|string|Image filename, including file extension.
» full|string|Full URL to the image.
timezone|string|The Timezone of the user, shown in {Country}/{City} format.
language|string|The users language preference, limited to two characters.
url|string|URL to the user profile.







