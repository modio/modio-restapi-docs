---
title: 'mod.io API v1'
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

Welcome to the official documentation for [mod.io](https://mod.io), an API which makes it a joy to search, sort and share mods in-game. We recommend you read our _Getting Started_ guide to accurately and efficiently consume our REST API. 

__Current version:__ `v1`

__Base path:__ [https://api.mod.io/v1](https://api.mod.io/v1)

## How It Works

Compatible with all builds of your game, mod.io operates silently in the background (without requiring your users to install another client), to give you complete control over your modding ecosystem.

![mod.io Overview](https://static.mod.io/v1/images/home/sdk.png).

## Implementation

You have 3 options to get connected to the mod.io API which you can use interchangeably depending on your needs. Here's the breakdown of each option.

Option | Usage | Suited for | Docs
---------- | ---------- | ---------- | ---------
__API__ | For connecting directly to the mod.io REST API | Web apps that need a JSON REST API, or game developers that like a challenge and want control over their implementation. | You are reading them
__SDK__ | Drop our [open source C/C++ SDK](https://sdk.mod.io) into your game to call mod.io functionality. | Developers that want a SDK that abstracts the uploading, downloading and unzip flows behind easy to use function calls. | [Here](https://sdk.mod.io)
__Tools/Plugins__ | Use tools and plugins created by the community to make implementation in various engines easy. | Game developers that want a pre-built modding solution for their engine (Unity, Unreal) of choice. | [Available per tool](https://sdk.mod.io)

Here is a brief list of the things to know about our API, as explained in more detail in the following sections.

- All requests to the API __must__ be made over HTTPS (SSL).
- All API responses are in `application/json` format.
- API keys are restricted to read-only `GET` requests.
- OAuth 2 access tokens are required for `POST`, `PUT` and `DELETE` requests.
- Binary data `POST` requests must use `Content-Type: multipart/form-data` header.
- Non-binary `POST`, `PUT` and `DELETE` requests must use `Content-Type: application/x-www-form-urlencoded` header.
- Non-binary data can optionally be supplied in `application/json` using the `input_json` parameter. 
- Rate limiting can be implemented for excess usage to deter abuse and spam.

## Authentication

Authentication can be done via 3 ways:

- Request an [API key (Read Only Access)](https://mod.io/apikey/widget)
- Manually create an [OAuth 2 Access Token (Read + Write Access)](https://mod.io/oauth/widget)
- Use our [Email Authentication Flow](#email-authentication-flow) (to create an OAuth 2 Access Token with Read + Write Access) 

You can use these methods of authentication interchangably, depending on the level of access you require.

Authentication Type | In | HTTP Methods | Abilities | Purpose
---------- | ---------- | ---------- | ---------- | ---------- 
API Key | Query | `GET` | Read-only `GET` requests and email authentication flow. | Browsing and downloading content.
Access Token (OAuth 2) | Header | `GET`, `POST`, `PUT`, `DELETE` | Read, create, update, delete. | View, add, edit and delete content the authenticated user has subscribed to or has permission to change.

### API Key Authentication

To access the API authentication is required. All users and games get a [private API key](https://mod.io/apikey/widget). It is quick and easy to use in your apps but limited to read-only GET requests, due to the limited security it offers. View your [private API key(s)](https://mod.io/apikey/widget).

### Email Authentication Flow

To perform writes, you will need to authenticate your users via OAuth 2. To make this frictionless in-game, we use an email verification system, similar to what Slack and others pioneered. It works by users supplying their email, which we send a time-limited 5 digit security code too. They exchange this code in-game, for an [OAuth 2 access token](https://mod.io/oauth/widget) you can save to authenticate future requests. The benefit of this approach is it avoids complex website redirects and doesn't require your users to complete a slow registration flow.

![mod.io Email Authentication Flow](https://static.mod.io/v1/images/home/email.png)

```shell
// Example POST requesting security code be sent to supplied email

curl -X POST https://api.mod.io/v1/oauth/emailrequest \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'api_key=0d0ba6756d032246f1299f8c01abc424'	\
  -d 'email=john.snow@westeros.com'
```

```JSON
// Authentication Code Request Response

{
	"code": 200,
	"message": "Enter the 5-digit security code sent to your email address (john.snow@westeros.com)"
}
```

### Step 1: Requesting a security code

Request a `security_code` be sent to the email address of the user you wish to authenticate: 

`POST /oauth/emailrequest`

Parameter | Value
---------- | ----------  
`api_key` | Your API key generated from 'API' tab within your game profile.
`email` | A valid and secure email address your user has access to. 

### Step 2: Exchanging security code for access token

After retrieving the 5-digit `security_code` sent to the email specified, you exchange it for an OAuth 2 `access_token`:

```shell
// Example POST requesting access token

curl -X POST https://api.mod.io/v1/oauth/emailexchange \
  -H 'Content-Type: application/x-www-form-urlencoded' \	
  -d 'api_key=0d0ba6756d032246f1299f8c01abc424' \
  -d 'security_code=3EW50'
```

```JSON
// Access Token Request Response (access token truncated for brevity)

{
	"code": 200,
	"access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0......"
}
```

`POST /oauth/emailexchange`

Parameter | Value
---------- | ----------  
`api_key` | Your API key generated from 'API' tab within your game profile.
`security_code` | Unique 5-digit code sent to the email address supplied in the previous request. 

There are a few important things to know when using the email authentication flow:
 
- An `api_key` is required for both steps of the authentication process.
- The _same_ `api_key` must be used for both steps.
- The generated `security_code` is short-lived and will expire after 15 minutes.
- Once exchanged for an `access_token`, the `security_code` is invalid.

If you do not exchange your `security_code` for an `access_token` within 15 minutes of generation, you will need to begin the flow again to receive another code.

### Step 3: Use access token to access resources.

See [Making Requests](#making-requests) section.

### Scopes (OAuth 2)

mod.io allows you to specify the permission each access token has (default is read+write), this is done by the use of scopes. See below for a full list of scopes available, you must include at least one scope when generating a new token.

Scope | Abilities
---------- | ----------
`read` | When authenticated with a token that *only* contains the `read` scope, you will only be able to read data via `GET` requests. 
`write` | When authenticated with a token that contains the `write` scope, you are able to add, edit and remove resources.
`read+write` | The above scopes combined. _Default for email verification flow._

## Making Requests

Requests to the mod.io API __must__ be over HTTPS (Port 443), any requests made over HTTP will return a `400 Bad Request` response.

### Using an API Key

```
curl -X get https://api.mod.io/v1/games?api_key=xxxxxxxxxxxxxxxx
``` 

To authenticate using your unique 32-character API key, append the `api_key=xxxxxxxxxxxxxxxx` parameter to the end of your request. Remember that using an API key means requests are read-only, if you want to create, update or delete resources - authentication via OAuth 2 is required which you can [set up with your api key](#authentication).

### Using an Access Token

To authenticate using an OAuth 2 access token you must include the HTTP header `Authorization` in your request with the value `Bearer your-token-here`. Verification via Access Token allows much greater power including creating, updating and deleting resources that you have access to. Also because OAuth 2 access tokens are tied to a user account, you can personalize the output by viewing content they are subscribed and connected to via the [me endpoint](#me) and by using relevant filters.

```shell
// Example POST request with no binary files

curl -X post https://api.mod.io/v1/games/1/mods/1/tags \
  -H 'Authorization: Bearer your-token-here' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'tags[]=Unity' \
  -d 'tags[]=FPS'
```

### Request Content-Type

If you are making a request that includes a file, your request `Content-Type` header __must__ be `multipart/form-data`, otherwise if the request contains data (but no files) it should be `application/x-www-form-urlencoded`. 

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

For `POST` & `PUT` requests that do _not submit files_ you have the option to supply your data as HTTP `POST` parameters, or as an _UTF-8 encoded_ JSON object inside the parameter `input_json` which contains all required data. Regardless, whether you use JSON or not the `Content-Type` of your request still needs to be `application/x-www-form-urlencoded` with the data provided in the body of the request.

__NOTE:__ If you supply identical key-value pairs as a request parameter and also as a parameter in your JSON object, the JSON object __will take priority__ as only one can exist.

### Response Content-Type

Responses will __always__ be returned as `application/json`.

## Errors

```JSON
// Error object

"error": {
	"code": 403,
	"message": "You do not have the required permissions to access this resource."
}
```

If an error occurs, mod.io returns an error object with the HTTP `code` and `message` to describe what happened and when possible how to avoid repeating the error. It's important to know that if you encounter errors that are not server errors (`500+` codes) - you should review the error message before continuing to send requests to the endpoint.

When requests contain invalid input data or query parameters (for filtering), an optional field object called `errors` can be supplied inside the `error` object, which contains a list of the invalid inputs. The nested `errors` object is only supplied with `422 Unprocessable Entity` responses. Be sure to review the [Response Codes](#response-codes) to be aware of the HTTP codes that the mod.io API returns.

```JSON
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

Remember that [Rate Limiting](#rate-limiting) applies whether an error is returned or not, so to avoid exceeding your daily quota be sure to always investigate error messages - instead of continually retrying.

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
`429` | Too Many Requests -- You have made too [many requests](#rate-limiting), inspect headers for reset time.
`500` | Internal Server Error -- We had a problem with our server. Try again later. (rare)
`503` | Service Unavailable -- We're temporarily offline for maintenance. Please try again later. (rare)

## Response Formats
```JSON
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

For single items, mod.io returns a __single JSON object__ which contains the requested resource. There is no nesting for single responses.

### Multiple item Responses

Endpoints that return more than one result, return a __JSON object__ which contains a data array and metadata fields:

- `data` - contains all data returned from the request.
- metadata fields - contains [pagination metadata](#pagination) to help you paginate through the API.

```JSON
// Get response

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
    "result_count": 100,
}  
```

## Pagination

When requesting data from endpoints that contain more than one object, you can supply an `_offset` and `_limit` to paginate through the results with ease. Think of it as a page 1, 2, 3... system but you control the number of results per page, and the page to start from. Appended to each response will be the pagination metadata:

```JSON
// Metadata example
"result_count": 100,
"result_limit": 100,
"result_offset": 0
```

Parameter | Value
---------- | ----------  
`result_count` | Number of results returned in the current request.
`result_limit` | Maximum number of results returned. Defaults to _100_ unless overridden by `_limit`.
`result_offset` | Number of results skipped over. Defaults to _1_ unless overridden by `_offset`.

### _limit (Limit)

```
v1/games?_limit=5
```

Limit the number of results for a request. By default _100_ results are returned per request:

 - `?_limit=5` - Limit the request to 5 individual results. 

### _offset (Offset)

```
v1/games?_offset=30
```

Use `_offset` to skip over the specified number of results, regardless of what data they contain. This works the same way offset does in a SQL query:

- `?_offset=30` - Will retrieve 100 results after ignoring the first 30 (31 - 130).

### Combining offset with a limit

```
v1/games?_offset=30&_limit=5
```

You can combine offset with a limit to build queries that return exactly the number of results you want:

- `?_offset=30&_limit=5` - Will retrieve 5 results after ignoring the first 30 (31 - 35).

If the `result_count` matches the `result_limit` (5 in this case), that means there are probably more results to get, so our next query might be:

 - `?_offset=35&_limit=5` - Will retrieve the next 5 results after ignoring the first 35 (36 - 40).

## Sorting

All endpoints are sorted by the `id` column in ascending order by default. You can override this by including a `_sort` with the column you want to sort by in the request. You can sort on all __bottom-level columns__ only. You cannot sort on columns in nested objects, so if a game contains a user object with a username inside it, you cannot sort on the username column. Some endpoints like [get all mods](#get-all-mods) have special sort columns like `popular`, `downloads`, `rating` and `subscribers` which are documented alongside the filters.

### _sort (Sort)

```
v1/games?_sort=name
```

Sort by a column, in ascending or descending order.

- `?_sort=name` - Sort `name` in ascending order

- `?_sort=-name` - Sort `name` in descending order

## Filtering

mod.io has powerful filtering available to assist you when making requests to the API. You can filter on all __bottom-level columns__ only. You cannot apply filters to columns in nested objects, so if a game contains a user object with a username inside it, you cannot filter by the username column.

### _q (Full text search)

```
v1/games?_q=The Lord Of The Rings
```

Full-text search is a lenient search filter that _is only available_ if the endpoint you are querying contains a `name` column. Wildcards should _not_ be applied to this filter as they are ignored.

- `?_q=The Lord of the Rings` - This will return every result where the `name` column contains any of the following words: 'The', 'Lord', 'of', 'the', 'Rings'. 

### = (Equals)

```
v1/games?id=10
```

The simpliest filter you can apply is _columnname_ equals. This will return all rows which contain a column matching the value provided. 

- `?id=10` - Get all results where the `id` column value is _10_.

### -not (Not Equal To)

```
v1/games?price-not=19.99
```

Where the preceding column value does not equal the value specified.

- `?price-not=19.99` - Where the `price` column does not equal 19.99.

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

Where the string supplied matches the preceding column value. This is equivalent to SQL's `LIKE`. Consider using wildcard's `*` for the best chance of results as described below.

- `?name-lk=texture` - Get all results where the `name` column value is 'texture'.

### -not-lk (Not Like)

```
v1/games?name-not-lk=dungeon
```

Where the string supplied does not match the preceding column value. This is equivalent to SQL's `NOT LIKE`.

- `?name-not-lk=dungeon` - Get all results where the `name` column value is not 'dungeon'.

### -lk & -not-lk Wildcards

```
v1/games?name-lk=The Witcher*
```

```
v1/games?name-lk=*Asset Pack
```

You can utilize the -lk wildcard value `*` to match more records. This is equivalent to SQL's `%`.

- `?name-lk=The Witcher*` - Get all results where _The Witcher_ is succeeded by any value. This means the query would return results for 'The Witcher', 'The Witcher 2' and 'The Witcher 3'. 

- `?name-lk=*Asset Pack` - Get all results where _Asset Pack_ is proceeded by any value. This means the query would return results for 'Armor Asset Pack', 'Weapon Asset Pack' and 'HD Asset Pack'. 
 
### -in (In)

```
v1/games?id-in=3,11,16,29
```

Where the supplied list of values appears in the preceding column value. This is equivalent to SQL's `IN`.

- `?id-in=3,11,16,29` - Get all results where the `id` column value is 3, 11, 16 and 29.

### -not-in (Not In)

```
v1/games?modfile-not-in=8,13,22
```

Where the supplied list of values *does not* equal the preceding column value. This is equivalent to SQL's `NOT IN`

- `?modfile-not-in=8,13,22` - Get all results where `id` column *does not* equal 8, 13 and 22.

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

### -bitwise-and (Bitwise AND)

```
v1/games?api-bitwise-and=5
```

Some columns are stored as bits within an integer. Their value depends on the bits selected. For example, suppose a column has 4 options:

- 1 = Option A
- 2 = Option B
- 4 = Option C
- 8 = Option D

You can combine any of these options by adding them together which means there are (2 ^ 4 = 16 possible combinations). For example Option A (1) and Option C (4) would be (1 + 4 = 5), Option A (1), Option C (4) and Option D (8) would be (1 + 4 + 8 = 13), all Options together would be (1 + 2 + 4 + 8 = 15).

The number of combinations makes using _equals_, _in_ and other filters a little complex. To solve this we support Bitwise AND (&) which makes it easy to match a column which contains any of the Options you want.

- `?api-bitwise-and=5` - Where the `api` column value is 1, 3, 4, 5, 6, 7, 9, 11, 12, 13, 14, 15 (since these values contain the bits 1, 4 or both).

## Rate Limiting

mod.io implements rate limiting to stop users abusing the service. Exceeding your rate limit will result in requests receiving a `429 Too Many Requests` response until your reset time is reached. 

It is _highly recommended_ you architect your app to check for the `X-RateLimit` headers below and the `429` HTTP response code to ensure you are not making too many requests, or continuing to make requests after a `429` code is repeatedly returned. Users who continue to send requests despite a `429` response could potentially have their access tokens revoked. The following limits are implemented by default:

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

- API keys linked to a member have __unlimited requests__.
- API keys linked to a game have __unlimited requests__.

### OAuth2 Rate Limiting

- Users tokens are limited to __60 requests per minute__. 

### Headers

mod.io returns the following headers in each request to inform you of your remaining requests and time until reset.

 - `X-RateLimit-Limit` - Number of requests you can make from the supplied API key/access token per hour.
 - `X-RateLimit-Remaining` - Number of minutes until your rate limit resets.

### Optimize your requests

You should always plan to minimize requests and cache API responses. It will make your app feel fluid and fast for your users. If your usage is excessive we shall reach out to discuss ways of optimizing, but our aim is to never restrict legitimate use of the API. We have set high limits that should cover 99% of use-cases, and are happy to [discuss your scenario](mailto:developers@mod.io?subject=API%20usage) if you require more.

## Contact

If you spot any errors within the mod.io documentation, have feedback on how we can make it easier to follow or simply want to discuss how awesome mods are, feel free to reach out anytime to [developers@mod.io](mailto:developers@mod.io?subject=API). We are here to help you grow and maximise the potential of mods in your game.
# Games

## Get All Games

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

Get all games. Successful request will return an array of [Game Objects](#get-all-games-2). We recommended reading the [filtering documentation](#filtering) to return only the records you want.
     
     Filter|Type|Description
     ---|---|---
     id|integer(int32)|Unique id of the game.
     submitted_by|integer(int32)|Unique id of the user who has ownership of the game.
     date_added|integer(int32)|Unix timestamp of date registered.
     date_updated|integer(int32)|Unix timestamp of date updated.
     date_live|integer(int32)|Unix timestamp of date game was set live.
     presentation|integer(int32)|Presentation style used on the mod.io website:<br><br>__0__ =  Grid View: Displays mods in a grid<br>__1__ = Table View: Displays mods in a table
     submission|integer(int32)|Submission process modders must follow:<br><br>__0__ = Mod uploads must occur via a tool created by the game developers<br>__1__ = Mod uploads can occur from anywhere, including the website and API
     curation|integer(int32)|Curation process used to approve mods:<br><br>__0__ = No curation: Mods are immediately available to play<br>__1__ = Paid curation: Only mods which accept donations must be accepted<br>__2__ = Full curation: All mods must be accepted by someone to be listed
     community|integer(int32)|Community features enabled on the mod.io website:<br><br>__0__ = All of the options below are disabled<br>__1__ = Discussion board enabled<br>__2__ = Guides and news enabled<br>__?__ = Combine to find games with multiple options enabled (see [BITWISE filtering](#bitwise-and-bitwise-and))
     revenue|integer(int32)|Revenue capabilities mods can enable:<br><br>__0__ = All of the options below are disabled<br>__1__ = Allow mods to be sold<br>__2__ = Allow mods to receive donations<br>__4__ = Allow mods to be traded<br>__8__ = Allow mods to control supply and scarcity<br>__?__ = Combine to find games with multiple options enabled (see [BITWISE filtering](#bitwise-and-bitwise-and))
     api|integer(int32)|Level of API access allowed by this game:<br><br>__0__ = All of the options below are disabled<br>__1__ = This game allows 3rd parties to access the mods API<br>__2__ = This game allows mods to be downloaded directly without API validation<br>__?__ = Combine to find games with multiple options enabled (see [BITWISE filtering](#bitwise-and-bitwise-and))
     ugc_name|string|Word used to describe user-generated content (mods, items, addons etc).
     icon|string|Filename of the icon image, extension included.
     logo|string|Filename of the logo image, extension included.
     header|string|Filename of the header image, extension included.
     homepage|string|Official homepage of the game.
     name|string|Name of the game.
     name_id|string|Subdomain for the game on mod.io.
     summary|string|Summary of the game.
     instructions|string|A guide about creating and uploading mods for this game to mod.io (applicable if submission = 0).

> Example responses

```json
{
  "data": [
    {
      "id": 2,
      "submitted_by": {
        "id": 1,
        "name_id": "xant",
        "username": "XanT",
        "date_online": 1509922961,
        "avatar": {
          "filename": "modio-dark.png",
          "original": "https://media.mod.io/images/global/modio-dark.png"
        },
        "timezone": "America/Los_Angeles",
        "language": "en",
        "profile_url": "https://mod.io/members/xant"
      },
      "date_added": 1493702614,
      "date_updated": 1499410290,
      "date_live": 1499841403,
      "presentation": 1,
      "submission": 0,
      "curation": 0,
      "community": 3,
      "revenue": 1500,
      "api": 3,
      "ugc_name": "map",
      "icon": {
        "filename": "modio-dark.png",
        "original": "https://media.mod.io/images/global/modio-dark.png",
        "thumb_320x180": "https://media.mod.io/images/global/modio-dark.png"
      },
      "logo": {
        "filename": "modio-dark.png",
        "original": "https://media.mod.io/images/global/modio-dark.png",
        "thumb_320x180": "https://media.mod.io/images/global/modio-dark.png",
        "thumb_640x360": "https://media.mod.io/images/global/modio-dark.png",
        "thumb_1280x720": "https://media.mod.io/images/global/modio-dark.png"
      },
      "header": {
        "filename": "demo.png",
        "original": "https://media.mod.io/images/global/modio-dark.png"
      },
      "homepage": "https://www.rogue-knight-game.com/",
      "name": "Rogue Knight",
      "name_id": "rogue-knight",
      "summary": "Rogue Knight is a brand new 2D pixel platformer.",
      "instructions": "Instructions on the process to upload mods.",
      "profile_url": "https://rogue-knight.mod.io",
      "tag_options": [
        {
          "name": "Theme",
          "type": "checkboxes",
          "tags": [
            "Horror"
          ],
          "admin_only": 0
        }
      ]
    },
    {
        ...
    }
  ],
  "result_count": 100,
  "result_limit": 100,
  "result_offset": 0
}
```
<h3 id="Get-All-Games-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[Get All Games ](#schemaget_all_games)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>

## Get Game

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

Get a game. Successful request will return a single [Game Object](#game-object).

> Example responses

```json
{
  "id": 2,
  "submitted_by": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "date_online": 1509922961,
    "avatar": {
      "filename": "modio-dark.png",
      "original": "https://media.mod.io/images/global/modio-dark.png"
    },
    "timezone": "America/Los_Angeles",
    "language": "en",
    "profile_url": "https://mod.io/members/xant"
  },
  "date_added": 1493702614,
  "date_updated": 1499410290,
  "date_live": 1499841403,
  "presentation": 1,
  "submission": 0,
  "curation": 0,
  "community": 3,
  "revenue": 1500,
  "api": 3,
  "ugc_name": "map",
  "icon": {
    "filename": "modio-dark.png",
    "original": "https://media.mod.io/images/global/modio-dark.png",
    "thumb_320x180": "https://media.mod.io/images/global/modio-dark.png"
  },
  "logo": {
    "filename": "modio-dark.png",
    "original": "https://media.mod.io/images/global/modio-dark.png",
    "thumb_320x180": "https://media.mod.io/images/global/modio-dark.png",
    "thumb_640x360": "https://media.mod.io/images/global/modio-dark.png",
    "thumb_1280x720": "https://media.mod.io/images/global/modio-dark.png"
  },
  "header": {
    "filename": "demo.png",
    "original": "https://media.mod.io/images/global/modio-dark.png"
  },
  "homepage": "https://www.rogue-knight-game.com/",
  "name": "Rogue Knight",
  "name_id": "rogue-knight",
  "summary": "Rogue Knight is a brand new 2D pixel platformer.",
  "instructions": "Instructions on the process to upload mods.",
  "profile_url": "https://rogue-knight.mod.io",
  "tag_options": [
    {
      "name": "Theme",
      "type": "checkboxes",
      "tags": [
        "Horror"
      ],
      "admin_only": 0
    }
  ]
}
```
<h3 id="Get-Game-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Request successful|[Game Object  ](#schemagame_object)

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

Update details for a game. If you want to update the `icon`, `logo` or `header` fields you need to use the [Add Game Media](#add-game-media) endpoint. Successful request will return updated [Game Object](#game-object).
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     presentation|integer(int32)||Choose the presentation style you want on the mod.io website:<br><br>__0__ =  Grid View: Displays mods in a grid (visual but less informative, default setting) <br>__1__ = Table View: Displays mods in a table (easier to browse)
     submission|integer(int32)||Choose the submission process you want modders to follow:<br><br>__0__ = Control the mod upload process (recommended): You will have to build an upload system either in-game or via a standalone tool, which enables creators to submit mods to the tags you have configured. Because you control the flow you can prevalidate and compile mods, to ensure they will work in your game and attach metadata about what settings the mod can change. In the long run this option will save you time as you can accept more submissions, but it requires more setup to get running and isn't as open as the above option. *NOTE:* mod profiles can still be created online, but uploads will have to occur via the tools you supply.<br><br>__1__ = Enable mod uploads from anywhere: Allow developers to upload mods via the website and API, and pick the tags their mod is built for. No validation will be done on the files submitted, it will be the responsibility of your game and apps to process the mods installation based on the tags selected and determine if the mod is valid and works. For example an mod might be uploaded with the 'map' tag. When a user subscribes to this mod, your game will need to verify it contains a map file and install it where maps are located. If this fails, your game or the community will have to flag the mod as 'incompatible' to remove it from the listing.
     curation|integer(int32)||Choose the curation process your team follows to approve mods:<br><br>__0__ = No curation (recommended): Mods are immediately available to play, without any intervention or work from your team.<br><br>__1__ = Paid curation: Screen only mods the creator wants to sell, before they are available to purchase via the API.<br><br>__2__ = Full curation: All mods must be accepted by someone on your team. This option is useful for games that have a small number of mods and want to control the experience, or you need to set the parameters attached to a mod (i.e. a weapon may require the rate of fire, power level, clip size etc). It can also be used for complex mods, which you may need to build into your game or distribute as DLC.
     community|integer(int32)||Choose the community features enabled on the mod.io website:<br><br>__0__ = All of the options below are disabled<br>__1__ = Discussion board enabled<br>__2__ = Guides and news enabled<br>__?__ = Add the options you want together, to enable multiple features
     revenue|integer(int32)||Choose the revenue capabilities mods can enable:<br><br>__0__ = All of the options below are disabled<br>__1__ = Allow mods to be sold<br>__2__ = Allow mods to receive donations<br>__4__ = Allow mods to be traded (not subject to revenue share)<br>__8__ = Allow mods to control supply and scarcity<br>__?__ = Add the options you want together, to enable multiple features
     api|integer(int32)||Choose the level of API access your game allows:<br><br>__0__ = All of the options below are disabled<br>__1__ = Allow 3rd parties to access your mods API (recommended, an open API will encourage a healthy ecosystem of tools and apps)<br>__2__ = Allow mods to be downloaded directly, without requiring API validation (useful for anonymous game servers and services)<br>__?__ = Add the options you want together, to enable multiple features
     ugc_name|string||Word used to describe user-generated content (mods, items, addons etc).
     homepage|string||Official homepage for your game. Must be a valid URL.
     name|string||Name of your game. Cannot exceed 80 characters.
     name_id|string||Subdomain for the game on mod.io. Highly recommended to not change this unless absolutely required. Cannot exceed 20 characters.
     summary|string||Explain your games mod support in 1 paragraph. Cannot exceed 250 characters.
     instructions|string||Instructions and links creators should follow to upload mods. Keep it short and explain details like are mods submitted in-game or via tools you have created.

> Example responses

```json
{
  "id": 2,
  "submitted_by": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "date_online": 1509922961,
    "avatar": {
      "filename": "modio-dark.png",
      "original": "https://media.mod.io/images/global/modio-dark.png"
    },
    "timezone": "America/Los_Angeles",
    "language": "en",
    "profile_url": "https://mod.io/members/xant"
  },
  "date_added": 1493702614,
  "date_updated": 1499410290,
  "date_live": 1499841403,
  "presentation": 1,
  "submission": 0,
  "curation": 0,
  "community": 3,
  "revenue": 1500,
  "api": 3,
  "ugc_name": "map",
  "icon": {
    "filename": "modio-dark.png",
    "original": "https://media.mod.io/images/global/modio-dark.png",
    "thumb_320x180": "https://media.mod.io/images/global/modio-dark.png"
  },
  "logo": {
    "filename": "modio-dark.png",
    "original": "https://media.mod.io/images/global/modio-dark.png",
    "thumb_320x180": "https://media.mod.io/images/global/modio-dark.png",
    "thumb_640x360": "https://media.mod.io/images/global/modio-dark.png",
    "thumb_1280x720": "https://media.mod.io/images/global/modio-dark.png"
  },
  "header": {
    "filename": "demo.png",
    "original": "https://media.mod.io/images/global/modio-dark.png"
  },
  "homepage": "https://www.rogue-knight-game.com/",
  "name": "Rogue Knight",
  "name_id": "rogue-knight",
  "summary": "Rogue Knight is a brand new 2D pixel platformer.",
  "instructions": "Instructions on the process to upload mods.",
  "profile_url": "https://rogue-knight.mod.io",
  "tag_options": [
    {
      "name": "Theme",
      "type": "checkboxes",
      "tags": [
        "Horror"
      ],
      "admin_only": 0
    }
  ]
}
```
<h3 id="Edit-Game-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Update successful|[Game Object  ](#schemagame_object)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>

# Mods

## Get All Mods

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

Get all mods for the corresponding game. Successful request will return an array of [Mod Objects](#get-all-mods-2). We recommended reading the [filtering documentation](#filtering) to return only the records you want.
     
     Filter|Type|Description
     ---|---|---
     id|integer(int32)|Unique id of the mod.
     game_id|integer(int32)|Unique id of the parent game.
     submitted_by|integer(int32)|Unique id of the user who has ownership of the mod.
     date_added|integer(int32)|Unix timestamp of date registered.
     date_updated|integer(int32)|Unix timestamp of date updated.
     date_live|integer(int32)|Unix timestamp of date mod was set live.
     logo|string|Filename of the logo image, extension included.
     homepage|string|Official homepage of the mod.
     name|string|Name of the mod.
     name_id|string|URL path for the mod on mod.io.
     summary|string|Summary of the mod.
     description|string|Detailed description of the mod which allows HTML.
     metadata_blob|string|Metadata stored by the game developer.
     modfile|integer(int32)|Unique id of the [Modfile Object](#modfile-object) marked as current release.
     tags|string|Comma-separated values representing the tags you want to filter the results by. Only tags that are supported by the parent game can be applied. To determine what tags are eligible, see the tags values within 'Tag Option' column on the parent [Game Object](#game-object).
     status|string| Status of the mod (only recognised by game admins authenticated via _OAuth 2_):<br><br>__unauth__ = Only return un-authorized mods.<br>__auth__ = Only return authorized mods _(default)_.<br>__ban__ = Only return banned mods.<br>__archive__ = Only return archived mods (out of date / incompatible).<br>__delete__ = Only return deleted mods.
     downloads|string|Sort results by most downloads using [_sort filter](#filtering) parameter, value should be `downloads` for descending or `-downloads` for ascending results.
     popular|string|Sort results by popularity using [_sort filter](#filtering), value should be `popular` for descending or `-popular` for ascending results.
     ratings|string|Sort results by weighted rating using [_sort filter](#filtering), value should be `ratings` for descending or `-ratings` for ascending results.
     subscribers|string|Sort results by most subscribers using [_sort filter](#filtering), value should be `subscribers` for descending or `-subscribers` for ascending results.

> Example responses

```json
{
  "data": [
    {
      "id": 2,
      "game_id": 2,
      "submitted_by": {
        "id": 1,
        "name_id": "xant",
        "username": "XanT",
        "date_online": 1509922961,
        "avatar": {
          "filename": "modio-dark.png",
          "original": "https://media.mod.io/images/global/modio-dark.png"
        },
        "timezone": "America/Los_Angeles",
        "language": "en",
        "profile_url": "https://mod.io/members/xant"
      },
      "date_added": 1492564103,
      "date_updated": 1499841487,
      "date_live": 1499841403,
      "logo": {
        "filename": "modio-dark.png",
        "original": "https://media.mod.io/images/global/modio-dark.png",
        "thumb_320x180": "https://media.mod.io/images/global/modio-dark.png",
        "thumb_640x360": "https://media.mod.io/images/global/modio-dark.png",
        "thumb_1280x720": "https://media.mod.io/images/global/modio-dark.png"
      },
      "homepage": "https://www.rogue-hdpack.com/",
      "name": "Rogue Knight HD Pack",
      "name_id": "rogue-knight-hd-pack",
      "summary": "It's time to bask in the glory of beautiful 4k textures!",
      "description": "<h2>About</h2><p>Rogue HD Pack does exactly what you thi...",
      "metadata_blob": "rogue,hd,high-res,4k,hd textures",
      "profile_url": "https://rogue-knight.mod.io/rogue-knight-hd-pack",
      "modfile": {
        "id": 2,
        "mod_id": 2,
        "date_added": 1499841487,
        "date_scanned": 1499841487,
        "virus_status": 0,
        "virus_positive": 0,
        "virustotal_hash": "f9a7bf4a95ce20787337b685a79677cae2281b83c63ab0a25f091407741692af-1508147401",
        "filesize": 15181,
        "filehash": {
          "md5": "2d4a0e2d7273db6b0a94b0740a88ad0d"
        },
        "filename": "rogue-knight-v1.zip",
        "version": "1.3",
        "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
        "download_url": "https://mod.io/mods/file/1/c489a0354111a4d76640d47f0cdcb294"
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
            "filename": "modio-dark.png",
            "original": "https://media.mod.io/images/global/modio-dark.png",
            "thumb_320x180": "https://media.mod.io/images/global/modio-dark.png"
          }
        ]
      },
      "rating_summary": {
        "total_ratings": 1230,
        "positive_ratings": 1047,
        "negative_ratings": 183,
        "percentage_positive": 91,
        "weighted_aggregate": 87.38,
        "display_text": "Very Positive"
      },
      "tags": [
        {
          "name": "Unity",
          "date_added": 1499841487
        }
      ]
    },
    {
        ...
    }
  ],
  "result_count": 100,
  "result_limit": 100,
  "result_offset": 0
}
```
<h3 id="Get-All-Mods-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Request|[Get All Mods ](#schemaget_all_mods)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>

## Get Mod

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

Get a mod. Successful request will return a single [Mod Object](#mod-object).

> Example responses

```json
{
  "id": 2,
  "game_id": 2,
  "submitted_by": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "date_online": 1509922961,
    "avatar": {
      "filename": "modio-dark.png",
      "original": "https://media.mod.io/images/global/modio-dark.png"
    },
    "timezone": "America/Los_Angeles",
    "language": "en",
    "profile_url": "https://mod.io/members/xant"
  },
  "date_added": 1492564103,
  "date_updated": 1499841487,
  "date_live": 1499841403,
  "logo": {
    "filename": "modio-dark.png",
    "original": "https://media.mod.io/images/global/modio-dark.png",
    "thumb_320x180": "https://media.mod.io/images/global/modio-dark.png",
    "thumb_640x360": "https://media.mod.io/images/global/modio-dark.png",
    "thumb_1280x720": "https://media.mod.io/images/global/modio-dark.png"
  },
  "homepage": "https://www.rogue-hdpack.com/",
  "name": "Rogue Knight HD Pack",
  "name_id": "rogue-knight-hd-pack",
  "summary": "It's time to bask in the glory of beautiful 4k textures!",
  "description": "<h2>About</h2><p>Rogue HD Pack does exactly what you thi...",
  "metadata_blob": "rogue,hd,high-res,4k,hd textures",
  "profile_url": "https://rogue-knight.mod.io/rogue-knight-hd-pack",
  "modfile": {
    "id": 2,
    "mod_id": 2,
    "date_added": 1499841487,
    "date_scanned": 1499841487,
    "virus_status": 0,
    "virus_positive": 0,
    "virustotal_hash": "f9a7bf4a95ce20787337b685a79677cae2281b83c63ab0a25f091407741692af-1508147401",
    "filesize": 15181,
    "filehash": {
      "md5": "2d4a0e2d7273db6b0a94b0740a88ad0d"
    },
    "filename": "rogue-knight-v1.zip",
    "version": "1.3",
    "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
    "download_url": "https://mod.io/mods/file/1/c489a0354111a4d76640d47f0cdcb294"
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
        "filename": "modio-dark.png",
        "original": "https://media.mod.io/images/global/modio-dark.png",
        "thumb_320x180": "https://media.mod.io/images/global/modio-dark.png"
      }
    ]
  },
  "rating_summary": {
    "total_ratings": 1230,
    "positive_ratings": 1047,
    "negative_ratings": 183,
    "percentage_positive": 91,
    "weighted_aggregate": 87.38,
    "display_text": "Very Positive"
  },
  "tags": [
    {
      "name": "Unity",
      "date_added": 1499841487
    }
  ]
}
```
<h3 id="Get-Mod-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Request|[Mod Object  ](#schemamod_object)

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

Add a mod. Successful request will return the newly created [Mod Object](#mod-object).
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     logo|file|true|Image file which will represent your mods logo. Must be gif, jpg or png format and cannot exceed 8MB in filesize. Dimensions must be at least 640x360 and we recommended you supply a high resolution image with a 16 / 9 ratio. mod.io will use this image to make three thumbnails for the dimensions 320x180, 640x360 and 1280x720.
     name|string|true|Name of your mod. Your default mod URL will contain the name so be sure to choose the most appropriate title. For example: _'Stellaris Shader Mod'_ will become the URL _stellaris-shader-mod_.
     homepage|string|true|Official homepage for your mod. Must be a valid URL.
     summary|string|true|Summary for your mod, giving a brief overview of what it's about. Cannot exceed 250 characters.
     stock|integer(int32)||Artificially limit the amount of times the mod can be subscribed too.
     description|string||Detailed description for your mod, which can include details such as 'About', 'Features', 'Install Instructions', 'FAQ', etc. HTML supported and encouraged.
     metadata_blob|string||Metadata stored by the game developer. Metadata can also be stored as searchable [key value pairs](#metadata).
     name_id|string||URL path for the mod on mod.io. Cannot exceed 80 characters.
     modfile|integer(int32)||Unique id of the [Modfile Object](#modfile-object) to be labelled as the current release.
     tags|array||An array of strings that represent what the mod has been tagged as. Only tags that are supported by the parent game can be applied. To determine what tags are eligible, see the tags values within 'Tag Option' column on the parent [Game Object](#game-object).

> Example responses

```json
{
  "id": 2,
  "game_id": 2,
  "submitted_by": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "date_online": 1509922961,
    "avatar": {
      "filename": "modio-dark.png",
      "original": "https://media.mod.io/images/global/modio-dark.png"
    },
    "timezone": "America/Los_Angeles",
    "language": "en",
    "profile_url": "https://mod.io/members/xant"
  },
  "date_added": 1492564103,
  "date_updated": 1499841487,
  "date_live": 1499841403,
  "logo": {
    "filename": "modio-dark.png",
    "original": "https://media.mod.io/images/global/modio-dark.png",
    "thumb_320x180": "https://media.mod.io/images/global/modio-dark.png",
    "thumb_640x360": "https://media.mod.io/images/global/modio-dark.png",
    "thumb_1280x720": "https://media.mod.io/images/global/modio-dark.png"
  },
  "homepage": "https://www.rogue-hdpack.com/",
  "name": "Rogue Knight HD Pack",
  "name_id": "rogue-knight-hd-pack",
  "summary": "It's time to bask in the glory of beautiful 4k textures!",
  "description": "<h2>About</h2><p>Rogue HD Pack does exactly what you thi...",
  "metadata_blob": "rogue,hd,high-res,4k,hd textures",
  "profile_url": "https://rogue-knight.mod.io/rogue-knight-hd-pack",
  "modfile": {
    "id": 2,
    "mod_id": 2,
    "date_added": 1499841487,
    "date_scanned": 1499841487,
    "virus_status": 0,
    "virus_positive": 0,
    "virustotal_hash": "f9a7bf4a95ce20787337b685a79677cae2281b83c63ab0a25f091407741692af-1508147401",
    "filesize": 15181,
    "filehash": {
      "md5": "2d4a0e2d7273db6b0a94b0740a88ad0d"
    },
    "filename": "rogue-knight-v1.zip",
    "version": "1.3",
    "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
    "download_url": "https://mod.io/mods/file/1/c489a0354111a4d76640d47f0cdcb294"
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
        "filename": "modio-dark.png",
        "original": "https://media.mod.io/images/global/modio-dark.png",
        "thumb_320x180": "https://media.mod.io/images/global/modio-dark.png"
      }
    ]
  },
  "rating_summary": {
    "total_ratings": 1230,
    "positive_ratings": 1047,
    "negative_ratings": 183,
    "percentage_positive": 91,
    "weighted_aggregate": 87.38,
    "display_text": "Very Positive"
  },
  "tags": [
    {
      "name": "Unity",
      "date_added": 1499841487
    }
  ]
}
```
<h3 id="Add-Mod-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Resource Created|[Mod Object  ](#schemamod_object)

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

Edit details for a mod. If you wanting to update the media attached to this game, including the `logo` field - you need to use the [Add Mod Media](#add-mod-media) endpoint. Successful request will return the updated [Mod Object](#mod-object). If `modfile` parameter is successfully changed, a __MODFILE_UPDATE__ event will be fired.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     name|string||Name of your mod. Your default mod URL will contain the name so be sure to choose the most appropriate title. For example: _'Stellaris Shader Mod'_ will become the URL _stellaris-shader-mod_.
     homepage|string||Official homepage for your mod. Must be a valid URL.
     summary|string||Summary for your mod, giving a brief overview of what it's about. Cannot exceed 250 characters.
     stock|integer(int32)||Artificially limit the amount of times the mod can be subscribed too.
     description|string||Detailed description for your mod, which can include details such as 'About', 'Features', 'Install Instructions', 'FAQ', etc. HTML supported and encouraged.
     metadata_blob|string||Metadata stored by the game developer. Metadata can also be stored as searchable [key value pairs](#metadata).
     name_id|string||URL path for the mod on mod.io. Cannot exceed 80 characters.
     modfile|integer(int32)||Unique id of the [Modfile Object](#modfile-object) to be labelled as the current release.
     status|string||__Game Administrators Only__. Activate an un-authorized or deleted mod. The mod must have at least one uploaded build to be activated. Ideal for restoring mods that have been soft-deleted. For mod deletion, use the [Delete Mod](#delete-mod) endpoint. Using either of the fields supplied below will allow the mod to be returned in requests.<br><br>__auth__ = Authorize the mod<br>__archive__ = Label as out of date/not compatible

> Example responses

```json
{
  "id": 2,
  "game_id": 2,
  "submitted_by": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "date_online": 1509922961,
    "avatar": {
      "filename": "modio-dark.png",
      "original": "https://media.mod.io/images/global/modio-dark.png"
    },
    "timezone": "America/Los_Angeles",
    "language": "en",
    "profile_url": "https://mod.io/members/xant"
  },
  "date_added": 1492564103,
  "date_updated": 1499841487,
  "date_live": 1499841403,
  "logo": {
    "filename": "modio-dark.png",
    "original": "https://media.mod.io/images/global/modio-dark.png",
    "thumb_320x180": "https://media.mod.io/images/global/modio-dark.png",
    "thumb_640x360": "https://media.mod.io/images/global/modio-dark.png",
    "thumb_1280x720": "https://media.mod.io/images/global/modio-dark.png"
  },
  "homepage": "https://www.rogue-hdpack.com/",
  "name": "Rogue Knight HD Pack",
  "name_id": "rogue-knight-hd-pack",
  "summary": "It's time to bask in the glory of beautiful 4k textures!",
  "description": "<h2>About</h2><p>Rogue HD Pack does exactly what you thi...",
  "metadata_blob": "rogue,hd,high-res,4k,hd textures",
  "profile_url": "https://rogue-knight.mod.io/rogue-knight-hd-pack",
  "modfile": {
    "id": 2,
    "mod_id": 2,
    "date_added": 1499841487,
    "date_scanned": 1499841487,
    "virus_status": 0,
    "virus_positive": 0,
    "virustotal_hash": "f9a7bf4a95ce20787337b685a79677cae2281b83c63ab0a25f091407741692af-1508147401",
    "filesize": 15181,
    "filehash": {
      "md5": "2d4a0e2d7273db6b0a94b0740a88ad0d"
    },
    "filename": "rogue-knight-v1.zip",
    "version": "1.3",
    "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
    "download_url": "https://mod.io/mods/file/1/c489a0354111a4d76640d47f0cdcb294"
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
        "filename": "modio-dark.png",
        "original": "https://media.mod.io/images/global/modio-dark.png",
        "thumb_320x180": "https://media.mod.io/images/global/modio-dark.png"
      }
    ]
  },
  "rating_summary": {
    "total_ratings": 1230,
    "positive_ratings": 1047,
    "negative_ratings": 183,
    "percentage_positive": 91,
    "weighted_aggregate": 87.38,
    "display_text": "Very Positive"
  },
  "tags": [
    {
      "name": "Unity",
      "date_added": 1499841487
    }
  ]
}
```
<h3 id="Edit-Mod-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Update Successful|[Mod Object  ](#schemamod_object)

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

Delete a mod profile. Successful request will return `204 No Content` as well as fire a __MOD_VISIBILITY_CHANGE__ event. Note this will close the mod profile which means it cannot be viewed or retrieved via API requests but will still exist in-case you choose to restore it at a later date. If you believe a mod should be permanently removed please [contact us](mailto:support@mod.io).

> Example responses

```json
 204 No Content 
```
<h3 id="Delete-Mod-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|No Content|None

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>

# Files

## Get All Modfiles

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

Get all files that are published for the corresponding mod. Successful request will return an [array of Modfile Objects](#get-all-mod-files-2). We recommended reading the [filtering documentation](#filtering) to return only the records you want.
     
     Filter|Type|Description
     ---|---|---
     id|integer(int32)|Unique id of the file.
     mod_id|integer(int32)|Unique id of the mod.
     date_added|integer(int32)|Unix timestamp of date added.
     date_scanned|integer(int32)|Unix timestamp of date file was virus scanned.
     virus_status|integer(int32)|Current virus scan status of the file. For newly added files that have yet to be scanned this field will change frequently until a scan is complete:<br><br>__0__ = Not scanned<br>__1__ = Scan complete<br>__2__ = In progress<br>__3__ = Too large to scan<br>__4__ = File not found<br>__5__ = Error Scanning
     virus_positive|integer(int32)|Was a virus detected:<br><br>__0__ = No threats detected<br>__1__ = Flagged as malicious
     filesize|integer(int32)|Size of the file in bytes.
     filehash|string|MD5 hash of the file.
     filename|string|Filename including extension.
     version|string|Release version this file represents.
     virustotal_hash|string|VirusTotal proprietary hash.
     changelog|string|Changelog for the file.

> Example responses

```json
{
  "data": [
    {
      "id": 2,
      "mod_id": 2,
      "date_added": 1499841487,
      "date_scanned": 1499841487,
      "virus_status": 0,
      "virus_positive": 0,
      "virustotal_hash": "f9a7bf4a95ce20787337b685a79677cae2281b83c63ab0a25f091407741692af-1508147401",
      "filesize": 15181,
      "filehash": {
        "md5": "2d4a0e2d7273db6b0a94b0740a88ad0d"
      },
      "filename": "rogue-knight-v1.zip",
      "version": "1.3",
      "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
      "download_url": "https://mod.io/mods/file/1/c489a0354111a4d76640d47f0cdcb294"
    },
    {
        ...
    }
  ],
  "result_count": 100,
  "result_limit": 100,
  "result_offset": 0
}
```
<h3 id="Get-All-Modfiles-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Request|[Get All Modfiles ](#schemaget_all_modfiles)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>

## Get Modfile

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

Get a file. Successful request will return a [single Modfile Object](--parse-docsurl/#modfile_object).

> Example responses

```json
{
  "id": 2,
  "mod_id": 2,
  "date_added": 1499841487,
  "date_scanned": 1499841487,
  "virus_status": 0,
  "virus_positive": 0,
  "virustotal_hash": "f9a7bf4a95ce20787337b685a79677cae2281b83c63ab0a25f091407741692af-1508147401",
  "filesize": 15181,
  "filehash": {
    "md5": "2d4a0e2d7273db6b0a94b0740a88ad0d"
  },
  "filename": "rogue-knight-v1.zip",
  "version": "1.3",
  "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
  "download_url": "https://mod.io/mods/file/1/c489a0354111a4d76640d47f0cdcb294"
}
```
<h3 id="Get-Modfile-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Request|[Modfile Object  ](#schemamodfile_object)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>

## Add Modfile

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

Upload a file for the corresponding mod, upon success will return the newly created [Modfile Object](#modfile-object). Ensure that the release you are uploading is stable and free from any critical issues. Files are scanned upon upload, any users who upload malicious files will be have their accounts closed promptly. <br><br>__NOTE:__ This endpoint does *not support* `input_json` even if you base64-encode your file method due to the already-large file sizes of some releases and base64-encoding inflating the filesize.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     filedata|file|true|The binary file for the release. For compatibility you should ZIP the base folder of your mod, or if it is a collection of files which live in a pre-existing game folder, you should ZIP those files. Your file must meet the following conditions:<br><br>- File must be __zipped__ and cannot exceed 10GB in filesize<br>- Mods which span multiple game directories are not supported unless the game manages this<br>- Mods which overwrite files are not supported unless the game manages this
     version|string|true|Version of the file release.
     changelog|string|true|Changelog of this release.
     active|boolean||Label this upload as the current release, this will change the *modfile* field on the parent mod to the *id* field of this file after upload.
     filehash|string||MD5 of the submitted file. When supplied, MD5 will be compared against calculated MD5 of _filedata_ binary file and will return `422 Unprocessible Entity` if the MD5s don't match.

> Example responses

```json
{
  "id": 2,
  "mod_id": 2,
  "date_added": 1499841487,
  "date_scanned": 1499841487,
  "virus_status": 0,
  "virus_positive": 0,
  "virustotal_hash": "f9a7bf4a95ce20787337b685a79677cae2281b83c63ab0a25f091407741692af-1508147401",
  "filesize": 15181,
  "filehash": {
    "md5": "2d4a0e2d7273db6b0a94b0740a88ad0d"
  },
  "filename": "rogue-knight-v1.zip",
  "version": "1.3",
  "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
  "download_url": "https://mod.io/mods/file/1/c489a0354111a4d76640d47f0cdcb294"
}
```
<h3 id="Add-Modfile-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Resource Created|[Modfile Object  ](#schemamodfile_object)

### Response Headers

Status|Header|Type|Format|Description
---|---|---|---|---|
201|Location|string||URL to newly created resource

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>

## Edit Modfile

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

Edit the details of a published file. If you want to update fields other than the changelog and active status, you should add a new file instead. Successful request will return updated [Modfile Object](#modfile-object).
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     changelog|string||Changelog of this release.
     active|boolean||Label this upload as the current release, this will change the *modfile* field on the parent mod to the *id* field of this file after upload.

> Example responses

```json
{
  "id": 2,
  "mod_id": 2,
  "date_added": 1499841487,
  "date_scanned": 1499841487,
  "virus_status": 0,
  "virus_positive": 0,
  "virustotal_hash": "f9a7bf4a95ce20787337b685a79677cae2281b83c63ab0a25f091407741692af-1508147401",
  "filesize": 15181,
  "filehash": {
    "md5": "2d4a0e2d7273db6b0a94b0740a88ad0d"
  },
  "filename": "rogue-knight-v1.zip",
  "version": "1.3",
  "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
  "download_url": "https://mod.io/mods/file/1/c489a0354111a4d76640d47f0cdcb294"
}
```
<h3 id="Edit-Modfile-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Update Successful|[Modfile Object  ](#schemamodfile_object)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>

# Media

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

Upload new media to a game. Any request you make to this endpoint *should* contain a binary file for each of the fields you want to update below.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     logo|file||Image file which will represent your games logo. Must be gif, jpg or png format and cannot exceed 8MB in filesize. Dimensions must be at least 640x360 and we recommended you supply a high resolution image with a 16 / 9 ratio. mod.io will use this image to make three thumbnails for the dimensions 320x180, 640x360 and 1280x720.
     icon|file||Image file which will represent your games icon. Must be gif, jpg or png format and cannot exceed 1MB in filesize. Dimensions must be at least 64x64 and a transparent png that works on a colorful background is recommended.
     header|file||Image file which will represent your games header. Must be gif, jpg or png format and cannot exceed 256KB in filesize. Dimensions of 400x100 and a light transparent png that works on a dark background is recommended.

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
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Media Successfully uploaded|[Message Object](#message-object)

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

This endpoint is very flexible and will add any images posted to the mods gallery regardless of their body name providing they are a valid image. The request `Content-Type` header __must__ be `multipart/form-data` to submit image files.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     logo|file||Image file which will represent your mod logo. Must be gif, jpg or png format and cannot exceed 8MB in filesize. Dimensions must be at least 640x360 and we recommended you supply a high resolution image with a 16 / 9 ratio. mod.io will use this image to make three thumbnails for the dimensions 320x180, 640x360 and 1280x720.
     images|zip||Zip archive of images to upload. Only valid gif, jpg or png images in the zip file will be processed. The filename __must be images.zip__ all other zips will be ignored. Alternatively you can POST one or more images to this endpoint and they will be detected and added to the mods gallery.
     youtube|array||Full Youtube link(s) you want to add - example 'https://www.youtube.com/watch?v=IGVZOLV9SPo'
     sketchfab|array||Full Sketchfab link(s) you want to add - example 'https://sketchfab.com/models/71f04e390ff54e5f8d9a51b4e1caab7e'

> Example responses

```json
{
  "code": "201",
  "message": "You have successfully added new media to the specified mod."
}
```
<h3 id="Add-Mod-Media-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Resource Created|[Message Object](#message-object)

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
 204 No Content 
```
<h3 id="Delete-Mod-Media-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|No Content|None

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>

# Subscribe

## Subscribe To Mod

> Code samples

```shell
# You can also use wget
curl -X POST https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/subscribe \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
POST https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/subscribe HTTP/1.1
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
  url: 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/subscribe',
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

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/subscribe',
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

result = RestClient.post 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/subscribe',
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

r = requests.post('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/subscribe', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/subscribe");
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
`POST /games/{game-id}/mods/{mod-id}/subscribe`

Subscribe the _authenticated user_ to a corresponding mod. No body parameters are required for this action. Successful request will return the [Mod Object](#mod-object) of the newly subscribed mod.

> Example responses

```json
{
  "id": 2,
  "game_id": 2,
  "submitted_by": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "date_online": 1509922961,
    "avatar": {
      "filename": "modio-dark.png",
      "original": "https://media.mod.io/images/global/modio-dark.png"
    },
    "timezone": "America/Los_Angeles",
    "language": "en",
    "profile_url": "https://mod.io/members/xant"
  },
  "date_added": 1492564103,
  "date_updated": 1499841487,
  "date_live": 1499841403,
  "logo": {
    "filename": "modio-dark.png",
    "original": "https://media.mod.io/images/global/modio-dark.png",
    "thumb_320x180": "https://media.mod.io/images/global/modio-dark.png",
    "thumb_640x360": "https://media.mod.io/images/global/modio-dark.png",
    "thumb_1280x720": "https://media.mod.io/images/global/modio-dark.png"
  },
  "homepage": "https://www.rogue-hdpack.com/",
  "name": "Rogue Knight HD Pack",
  "name_id": "rogue-knight-hd-pack",
  "summary": "It's time to bask in the glory of beautiful 4k textures!",
  "description": "<h2>About</h2><p>Rogue HD Pack does exactly what you thi...",
  "metadata_blob": "rogue,hd,high-res,4k,hd textures",
  "profile_url": "https://rogue-knight.mod.io/rogue-knight-hd-pack",
  "modfile": {
    "id": 2,
    "mod_id": 2,
    "date_added": 1499841487,
    "date_scanned": 1499841487,
    "virus_status": 0,
    "virus_positive": 0,
    "virustotal_hash": "f9a7bf4a95ce20787337b685a79677cae2281b83c63ab0a25f091407741692af-1508147401",
    "filesize": 15181,
    "filehash": {
      "md5": "2d4a0e2d7273db6b0a94b0740a88ad0d"
    },
    "filename": "rogue-knight-v1.zip",
    "version": "1.3",
    "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
    "download_url": "https://mod.io/mods/file/1/c489a0354111a4d76640d47f0cdcb294"
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
        "filename": "modio-dark.png",
        "original": "https://media.mod.io/images/global/modio-dark.png",
        "thumb_320x180": "https://media.mod.io/images/global/modio-dark.png"
      }
    ]
  },
  "rating_summary": {
    "total_ratings": 1230,
    "positive_ratings": 1047,
    "negative_ratings": 183,
    "percentage_positive": 91,
    "weighted_aggregate": 87.38,
    "display_text": "Very Positive"
  },
  "tags": [
    {
      "name": "Unity",
      "date_added": 1499841487
    }
  ]
}
```
<h3 id="Subscribe-To-Mod-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Subscription Successful|[Mod Object  ](#schemamod_object)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>

## Unsubscribe To Mod

> Code samples

```shell
# You can also use wget
curl -X DELETE https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/subscribe \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
DELETE https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/subscribe HTTP/1.1
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
  url: 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/subscribe',
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

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/subscribe',
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

result = RestClient.delete 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/subscribe',
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

r = requests.delete('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/subscribe', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/subscribe");
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
`DELETE /games/{game-id}/mods/{mod-id}/subscribe`

Unsubscribe the _authenticated user_ from the corresponding mod. No body parameters are required for this action. Successful request will return `204 No Content`.

> Example responses

```json
 204 No Content 
```
<h3 id="Unsubscribe-To-Mod-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|No Content|None

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>

# Events

## Get Game Activity

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

Get activity log for a game, showing changes made to the resource. Successful request will return an array of [Game activity objects](#get-game-activity-2). We recommended reading the [filtering documentation](#filtering) to return only the records you want. This endpoint will return the latest activity first by default.
     
     Filter|Type|Description
     ---|---|---
     id|integer(int32)|Unique id of the activity object.
     game_id|integer(int32)|Unique id of the parent game.
     user_id|integer(int32)|Unique id of the user who performed the action.
     date_updated|integer(int32)|Unix timestamp of date updated.
     event|string|Type of change that occurred:<br><br>__GAME_UPDATE__ = Update event<br>__GAME_VISIBILITY_CHANGE__ = Game has been set to live, or hidden

> Example responses

```json
{
  "data": [
    {
      "id": 53,
      "game_id": 17,
      "user_id": 95,
      "date_added": 1499846132,
      "event": "GAME_UPDATE",
      "changes": [
        {
          "field": "homepage",
          "before": "https://www.roguehdpack.com/",
          "after": "https://rogue-knight.mod.io/rogue-hd-pack"
        }
      ]
    },
    {
        ...
    }
  ],
  "result_count": 100,
  "result_limit": 100,
  "result_offset": 0
}
```
<h3 id="Get-Game-Activity-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[Get Game Activity ](#schemaget_game_activity)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>

## Get Mod Activity

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

Get activity log for a mod, showing changes made to the resource. Successful request will return an array of [Mod Activity Objects](#get-mod-activity-2). We recommended reading the [filtering documentation](#filtering) to return only the records you want. This endpoint will return the latest activity first by default.
     
     Filter|Type|Description
     ---|---|---
     id|integer(int32)|Unique id of the activity object.
     mod_id|integer(int32)|Unique id of the parent mod.
     user_id|integer(int32)|Unique id of the user who performed the action.
     date_updated|integer(int32)|Unix timestamp of date updated.
     event|string|Type of change that occurred:<br><br>__MOD_UPDATE__ = Update event<br>__MODFILE_UPDATE__ = Primary file changed<br>__MOD_VISIBILITY_CHANGE__ = Mod has been set to live, or hidden<br>__MOD_LIVE__ = When the mod went public for the first time
     latest|boolean|_Default value is true_. Returns only the latest unique events for the mod, which is useful for checking if the primary `modfile` has changed.
     subscribed|boolean|_Default value is false_. Returns only the events connected to mod the __authenticated user__ is subscribed to, which is useful for keeping the users mods updated.

> Example responses

```json
{
  "data": [
    {
      "id": 13,
      "mod_id": 13,
      "user_id": 13,
      "date_added": 1499846132,
      "event": "MOD_UPDATE",
      "changes": [
        {
          "field": "homepage",
          "before": "https://www.roguehdpack.com/",
          "after": "https://rogue-knight.mod.io/rogue-hd-pack"
        }
      ]
    },
    {
        ...
    }
  ],
  "result_count": 100,
  "result_limit": 100,
  "result_offset": 0
}
```
<h3 id="Get-Mod-Activity-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Request|[Get Mod Activity ](#schemaget_mod_activity)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>

## Get All Mod Activity

> Code samples

```shell
# You can also use wget
curl -X GET https://api.mod.io/v1/games/{game-id}/mods/activity?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mod.io/v1/games/{game-id}/mods/activity?api_key=YourApiKey HTTP/1.1
Host: api.mod.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/games/{game-id}/mods/activity',
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

fetch('https://api.mod.io/v1/games/{game-id}/mods/activity?api_key=YourApiKey',
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

result = RestClient.get 'https://api.mod.io/v1/games/{game-id}/mods/activity',
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

r = requests.get('https://api.mod.io/v1/games/{game-id}/mods/activity', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods/activity?api_key=YourApiKey");
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
`GET /games/{game-id}/mods/activity`

Get all mod activity for the corresponding game. Successful request will return an array of [Mod Activity Objects](#get-mod-activity-2). This endpoint will return the latest activity first by default. We recommend you poll this endpoint to keep mods up-to-date. If polling this endpoint for updates you should store the `id` or `date_updated` of the latest activity, and on subsequest requests use that information [in the filter](#filtering), to return only new activity to process.
     
     Filter|Type|Description
     ---|---|---
     id|integer(int32)|Unique id of the activity object.
     mod_id|integer(int32)|Unique id of the parent mod.
     user_id|integer(int32)|Unique id of the user who performed the action.
     date_updated|integer(int32)|Unix timestamp of date updated.
     event|string|Type of change that occurred:<br><br>__MOD_UPDATE__ = Update event<br>__MODFILE_UPDATE__ = Primary file changed<br>__MOD_VISIBILITY_CHANGE__ = Mod has been set to live, or hidden<br>__MOD_LIVE__ = When the mod went public for the first time
     latest|boolean|_Default value is true_. Returns only the latest unique events, which is useful for checking if the primary `modfile` has changed.
     subscribed|boolean|_Default value is false_. Returns only events connected to mods the __authenticated user__ is subscribed to, which is useful for keeping the users mods up-to-date.

> Example responses

```json
{
  "data": [
    {
      "id": 13,
      "mod_id": 13,
      "user_id": 13,
      "date_added": 1499846132,
      "event": "MOD_UPDATE",
      "changes": [
        {
          "field": "homepage",
          "before": "https://www.roguehdpack.com/",
          "after": "https://rogue-knight.mod.io/rogue-hd-pack"
        }
      ]
    },
    {
        ...
    }
  ],
  "result_count": 100,
  "result_limit": 100,
  "result_offset": 0
}
```
<h3 id="Get-All-Mod-Activity-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Request|[Get Mod Activity ](#schemaget_mod_activity)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>

# Tags

## Get All Game Tag Options

> Code samples

```shell
# You can also use wget
curl -X GET https://api.mod.io/v1/games/{game-id}/tags?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mod.io/v1/games/{game-id}/tags?api_key=YourApiKey HTTP/1.1
Host: api.mod.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/games/{game-id}/tags',
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

fetch('https://api.mod.io/v1/games/{game-id}/tags?api_key=YourApiKey',
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

result = RestClient.get 'https://api.mod.io/v1/games/{game-id}/tags',
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

r = requests.get('https://api.mod.io/v1/games/{game-id}/tags', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/tags?api_key=YourApiKey");
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
`GET /games/{game-id}/tags`

Get all tags for the corresponding game, that can be applied to any of its mods. Successful request will return an array of [Game Tag Option Objects](#game-tag-option-object).

> Example responses

```json
{
  "data": [
    {
      "name": "Theme",
      "type": "checkboxes",
      "tags": [
        "Horror"
      ],
      "admin_only": 0
    },
    {
        ...
    }
  ],
  "result_count": 100,
  "result_limit": 100,
  "result_offset": 0
}
```
<h3 id="Get-All-Game-Tag-Options-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Request|[Get All Game Tag](#schemaget_all_game_tag_options)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>

## Add Game Tag Option

> Code samples

```shell
# You can also use wget
curl -X POST https://api.mod.io/v1/games/{game-id}/tags \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
POST https://api.mod.io/v1/games/{game-id}/tags HTTP/1.1
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
  url: 'https://api.mod.io/v1/games/{game-id}/tags',
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

fetch('https://api.mod.io/v1/games/{game-id}/tags',
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

result = RestClient.post 'https://api.mod.io/v1/games/{game-id}/tags',
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

r = requests.post('https://api.mod.io/v1/games/{game-id}/tags', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/tags");
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
`POST /games/{game-id}/tags`

Add tags which mods can apply to their profiles. For example: You may want to add a 'Difficulty' group with the tags 'Easy', 'Medium' or 'Hard' as the options to select from. To add this, your request would supply an parameter titled 'Difficulty' which is an array containing 3 values.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     categoryname*|array|true|Array of strings representing the tag options. The parameter name will be the _name of the tag group_, allowing you to add multiple groups each request.

> Example responses

```json
{
  "code": "201",
  "message": "You have successfully added categories/tags to the specified game."
}
```
<h3 id="Add-Game-Tag-Option-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created|[Message Object](#message-object)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>

## Delete Game Tag Option

> Code samples

```shell
# You can also use wget
curl -X DELETE https://api.mod.io/v1/games/{game-id}/tags \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
DELETE https://api.mod.io/v1/games/{game-id}/tags HTTP/1.1
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
  url: 'https://api.mod.io/v1/games/{game-id}/tags',
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

fetch('https://api.mod.io/v1/games/{game-id}/tags',
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

result = RestClient.delete 'https://api.mod.io/v1/games/{game-id}/tags',
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

r = requests.delete('https://api.mod.io/v1/games/{game-id}/tags', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/tags");
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
`DELETE /games/{game-id}/tags`

Delete an entire group of tags or individual tags. For example: Assume you have a group of tags titled 'Difficulty' and you want to remove the tag option 'Hard' from it, your request would contain a parameter called 'Difficulty' which is an array that contained _only_ the value 'Hard'. If you want to delete an entire group, you would supply an empty array.<br><br>The * denotes that the parameter name is determined by the user.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     categoryname*|array|true|Array of strings representing the tag options to delete. An empty array will delete the entire group. The parameter name is the name of the category you are deleting tag options from.

> Example responses

```json
 204 No Content 
```
<h3 id="Delete-Game-Tag-Option-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|No Content|None

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>

## Get All Mod Tags

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

Get all tags for the corresponding mod. Successful request will return an array of [Mod Tag Objects](#mod-tag-object). We recommended reading the [filtering documentation](#filtering) to return only the records you want.
     
     Filter|Type|Description
     ---|---|---
     date_added|integer(int32)|Unix timestamp of date added.
     tag|string|String representation of the tag. You can check the eligible tags on the parent game object to determine all possible values for this field.

> Example responses

```json
{
  "data": [
    {
      "name": "Unity",
      "date_added": 1499841487
    },
    {
        ...
    }
  ],
  "result_count": 100,
  "result_limit": 100,
  "result_offset": 0
}
```
<h3 id="Get-All-Mod-Tags-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Request|[Get All Mod Tags](#schemaget_all_mod_tags)

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

Add tags to a mod's profile. You can only add tags allowed by the parent game, which are listed in the `Tag Option` column in the parent game's object.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     tags|array|true|An array of tags to add. For example: If the parent game has a 'Theme' tag group with 'Fantasy', 'Sci-fi', 'Western' and 'Realistic' as the options, you could add 'Fantasy' and 'Sci-fi' to the `tags` array in your request. Provided the tags are valid you can add any number.

> Example responses

```json
{
  "code": "201",
  "message": "You have successfully added tags to the specified mod."
}
```
<h3 id="Add-Mod-Tag-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created|[Message Object](#message-object)

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

Delete tags from a mod's profile. Deleting tags is identical to adding tags except the request method is `DELETE` instead of `POST`. To delete tags supply an array of strings which are identical to the tags you want to remove.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     tags|array|true|An array of tags to delete.

> Example responses

```json
 204 No Content 
```
<h3 id="Delete-Mod-Tag-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|No Content|None

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>

# Ratings

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

Submit a positive or negative rating for a mod. Each user can supply only one rating for a mod, subsequent ratings will override the old value.
     
     __NOTE:__ You can order mods by their rating, and view their rating in the [Mod Object](#mod-object).
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     rating|integer(int32)|true|The __authenticated users__ mod rating:<br><br>__1__ = Positive rating (thumbs up)<br>__-1__ = Negative rating (thumbs down)

> Example responses

```json
{
  "code": "201",
  "message": "You have successfully submitted a rating for the specified mod."
}
```
<h3 id="Add-Mod-Rating-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Resource created|[Message Object](#message-object)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>

# Metadata

## Get All Mod KVP Metadata

> Code samples

```shell
# You can also use wget
curl -X GET https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp?api_key=YourApiKey HTTP/1.1
Host: api.mod.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp',
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

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp?api_key=YourApiKey',
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

result = RestClient.get 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp',
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

r = requests.get('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp?api_key=YourApiKey");
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
`GET /games/{game-id}/mods/{mod-id}/metadatakvp`

Get all metadata stored by the game developer for this mod as searchable key value pairs. Successful request will return an array of [Metadata KVP Objects](#get-all-mod-kvp). Metadata is useful to define how the mod works, or other information you need to display. For example: A mod might change gravity and the rate of fire of weapons, you could define these properties as key value pairs. Metadata can also be stored as `metadata_blob` in the [Mod Object](#mod-object).

> Example responses

```json
{
  "data": [
    {
      "key": "pistol-dmg",
      "value": 800
    },
    {
        ...
    }
  ],
  "result_count": 100,
  "result_limit": 100,
  "result_offset": 0
}
```
<h3 id="Get-All-Mod-KVP-Metadata-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Request|[Get All Mod KVP](#schemaget_all_mod_kvp_metadata)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>

## Add Mod KVP Metadata

> Code samples

```shell
# You can also use wget
curl -X POST https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
POST https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp HTTP/1.1
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
  url: 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp',
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

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp',
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

result = RestClient.post 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp',
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

r = requests.post('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp");
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
`POST /games/{game-id}/mods/{mod-id}/metadatakvp`

Add metadata for this mod as searchable key value pairs. Metadata is useful to define how the mod works, or other information you need to display. For example: A mod might change gravity and the rate of fire of weapons, you could define these properties as key value pairs. We recommend the mod upload tool you create defines and submits metadata behind the scenes, because if these settings affect gameplay, invalid information may cause problems in your game. Metadata can also be stored as `metadata_blob` in the [Mod Object](#mod-object).
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     metadata|array|true|Array containing one or more key value pairs where the the key and value are separated by a colon ':' (if the string contains multiple colons the split will occur on the first matched, i.e. pistol-dmg:800:400 will become key: pistol-dmg, value: 800:400). __NOTE:__<br><br>- Keys support alphanumeric, '_' and '-' characters only.<br>- Keys can map to multiple values (1-to-many relationship).<br>- Keys and values cannot exceed 255 characters in length.<br>- Key value pairs are searchable by exact match only.

> Example responses

```json
{
  "code": "201",
  "message": "You have successfully added new key-value metadata to the specified mod."
}
```
<h3 id="Add-Mod-KVP-Metadata-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created|[Message Object](#message-object)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>

## Delete Mod KVP Metadata

> Code samples

```shell
# You can also use wget
curl -X DELETE https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
DELETE https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp HTTP/1.1
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
  url: 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp',
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

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp',
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

result = RestClient.delete 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp',
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

r = requests.delete('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp");
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
`DELETE /games/{game-id}/mods/{mod-id}/metadatakvp`

Delete key value pairs metadata defined for this mod.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     metadata|array|true|Array containing one or more key value pairs to delete where the the key and value are separated by a colon ':'. __NOTE:__ If an array value contains only the key and no colon ':', _all_ metadata with that key will be removed.

> Example responses

```json
 204 No Content 
```
<h3 id="Delete-Mod-KVP-Metadata-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|No Content|None

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>

# Dependencies

## Get All Mod Dependencies

> Code samples

```shell
# You can also use wget
curl -X GET https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/dependencies?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/dependencies?api_key=YourApiKey HTTP/1.1
Host: api.mod.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/dependencies',
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

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/dependencies?api_key=YourApiKey',
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

result = RestClient.get 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/dependencies',
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

r = requests.get('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/dependencies', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/dependencies?api_key=YourApiKey");
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
`GET /games/{game-id}/mods/{mod-id}/dependencies`

Get all dependencies the chosen mod has selected. This is useful if a mod requires other mods be installed for it to run. Successful request will return an array of [Mod Dependencies Objects](--parse-docsurl/#mod-dependencies-object).
     
     __NOTE:__ Some developers might select _soft_ dependencies to promote or credit other mods. We advise against this but it is possible to do.

> Example responses

```json
{
  "data": [
    {
      "mod_id": 231,
      "date_added": 1499841487
    },
    {
        ...
    }
  ],
  "result_count": 100,
  "result_limit": 100,
  "result_offset": 0
}
```
<h3 id="Get-All-Mod-Dependencies-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Request|[Get All Mod Dependencies](#schemaget_all_mod_dependencies)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>

## Add Mod Dependencies

> Code samples

```shell
# You can also use wget
curl -X POST https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/dependencies \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
POST https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/dependencies HTTP/1.1
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
  url: 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/dependencies',
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

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/dependencies',
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

result = RestClient.post 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/dependencies',
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

r = requests.post('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/dependencies', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/dependencies");
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
`POST /games/{game-id}/mods/{mod-id}/dependencies`

Add mod dependencies required by the corresponding mod. A dependency is a mod that must be installed for this mod to run.
     
     __NOTE:__ Some developers might select _soft_ dependencies to promote or credit other mods. We advise against this but it is possible to do.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     dependencies|array|true|Array containing one or more mod id's that this mod is dependent on. Max of 5 dependencies per request.

> Example responses

```json
{
  "code": "201",
  "message": "You have successfully added new dependencies to the specified mod."
}
```
<h3 id="Add-Mod-Dependencies-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created|[Message Object](#message-object)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>

## Delete Mod Dependencies

> Code samples

```shell
# You can also use wget
curl -X DELETE https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/dependencies \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
DELETE https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/dependencies HTTP/1.1
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
  url: 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/dependencies',
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

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/dependencies',
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

result = RestClient.delete 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/dependencies',
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

r = requests.delete('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/dependencies', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/dependencies");
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
`DELETE /games/{game-id}/mods/{mod-id}/dependencies`

Delete mod dependencies the corresponding mod has selected. Successful request will return `204 No Content`.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     dependencies|array|true|Array containing one or more mod id's that can be deleted as dependencies.

> Example responses

```json
 204 No Content 
```
<h3 id="Delete-Mod-Dependencies-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|No Content|None

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>

# Teams

## Get All Game Team Members

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

Get all users that are part of a game team. Successful request will return an array of [Team Member Objects](#get-team). We recommended reading the [filtering documentation](#filtering) to return only the records you want.
     
     Filter|Type|Required|Description
     ---|---|---|---|
     id|integer(int32)|Unique id of the team member record.
     user_id|integer(int32)|Unique id of the user.
     username|string|Username of the user.
     level|integer(int32)|Level of permission the user has:<br><br>__1__ = Moderator (can moderate content submitted)<br>__4__ = Statistics (moderator access, including read only access to view reports)<br>__8__ = Administrator (full access, including editing the profile and team)
     date_added|integer(int32)|Unix timestamp of the date the user was added to the team.
     position|string|Custom title given to the user in this team.

> Example responses

```json
{
  "data": [
    {
      "id": 457,
      "user": {
        "id": 1,
        "name_id": "xant",
        "username": "XanT",
        "date_online": 1509922961,
        "avatar": {
          "filename": "modio-dark.png",
          "original": "https://media.mod.io/images/global/modio-dark.png"
        },
        "timezone": "America/Los_Angeles",
        "language": "en",
        "profile_url": "https://mod.io/members/xant"
      },
      "level": 8,
      "date_added": 1492058857,
      "position": "Supreme Overlord"
    },
    {
        ...
    }
  ],
  "result_count": 100,
  "result_limit": 100,
  "result_offset": 0
}
```
<h3 id="Get-All-Game-Team-Members-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Request|[Get Team  ](#schemaget_team)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>

## Get All Mod Team Members

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

Get all users that are part of a mod team. Successful request will return an array of [Team Member Objects](#get-team). We recommended reading the [filtering documentation](#filtering) to return only the records you want.
     
     Filter|Type|Required|Description
     ---|---|---|---|
     id|integer(int32)|Unique id of the team member record.
     user_id|integer(int32)|Unique id of the user.
     username|string|Username of the user.
     level|integer(int32)|Level of permission the user has:<br><br>__1__ = Moderator (can moderate comments and content attached)<br>__4__ = Creator (moderator access, including uploading builds and edit all settings except supply and team members)<br>__8__ = Administrator (full access, including editing the supply and team)
     date_added|integer(int32)|Unix timestamp of the date the user was added to the team.
     position|string|Custom title given to the user in this team.

> Example responses

```json
{
  "data": [
    {
      "id": 457,
      "user": {
        "id": 1,
        "name_id": "xant",
        "username": "XanT",
        "date_online": 1509922961,
        "avatar": {
          "filename": "modio-dark.png",
          "original": "https://media.mod.io/images/global/modio-dark.png"
        },
        "timezone": "America/Los_Angeles",
        "language": "en",
        "profile_url": "https://mod.io/members/xant"
      },
      "level": 8,
      "date_added": 1492058857,
      "position": "Supreme Overlord"
    },
    {
        ...
    }
  ],
  "result_count": 100,
  "result_limit": 100,
  "result_offset": 0
}
```
<h3 id="Get-All-Mod-Team-Members-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Request|[Get Team  ](#schemaget_team)

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

Add a user to a game team.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     user_id|integer(int32)|true|Unique id of the user you are adding to the team.
     level|integer(int32)|true|Level of permission the user will get:<br><br>__1__ = Moderator (can moderate content submitted)<br>__4__ = Statistics (moderator access, including read only access to view reports)<br>__8__ = Administrator (full access, including editing the profile and team)
     position|string|true|Title of the users position. For example: Team Leader, Artist.

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
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created|[Message Object](#message-object)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
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

Add a user to a mod team.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     user_id|integer(int32)|true|Unique id of the user you are adding to the team.
     level|integer(int32)|true|Level of permission the user will get:<br><br>__1__ = Moderator (can moderate comments and content attached)<br>__4__ = Creator (moderator access, including uploading builds and edit all settings except supply and team members)<br>__8__ = Administrator (full access, including editing the supply and team)
     position|string|true|Title of the users position. For example: Team Leader, Artist.

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
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created|[Message Object](#message-object)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>

## Update Game Team Member

> Code samples

```shell
# You can also use wget
curl -X PUT https://api.mod.io/v1/games/{game-id}/team/{team-member-id} \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
PUT https://api.mod.io/v1/games/{game-id}/team/{team-member-id} HTTP/1.1
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
  url: 'https://api.mod.io/v1/games/{game-id}/team/{team-member-id}',
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

fetch('https://api.mod.io/v1/games/{game-id}/team/{team-member-id}',
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

result = RestClient.put 'https://api.mod.io/v1/games/{game-id}/team/{team-member-id}',
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

r = requests.put('https://api.mod.io/v1/games/{game-id}/team/{team-member-id}', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/team/{team-member-id}");
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
`PUT /games/{game-id}/team/{team-member-id}`

Update a game team members details.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     level|integer(int32)||Level of permission the user should have:<br><br>__1__ = Moderator (can moderate content submitted)<br>__4__ = Statistics (moderator access, including read only access to view reports)<br>__8__ = Administrator (full access, including editing the profile and team)
     position|string||Title of the users position. For example: Team Leader, Artist.

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
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[Message Object](#message-object)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>

## Update Mod Team Member

> Code samples

```shell
# You can also use wget
curl -X PUT https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team/{team-member-id} \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
PUT https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team/{team-member-id} HTTP/1.1
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
  url: 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team/{team-member-id}',
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

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team/{team-member-id}',
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

result = RestClient.put 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team/{team-member-id}',
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

r = requests.put('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team/{team-member-id}', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team/{team-member-id}");
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
`PUT /games/{game-id}/mods/{mod-id}/team/{team-member-id}`

Update a mod team members details.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     level|integer(int32)||Level of permission the user should have:<br><br>__1__ = Moderator (can moderate comments and content attached)<br>__4__ = Creator (moderator access, including uploading builds and edit all settings except supply and team members)<br>__8__ = Administrator (full access, including editing the supply and team)
     position|string||Title of the users position. For example: Team Leader, Artist.

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
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[Message Object](#message-object)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>

## Delete Game Team Member

> Code samples

```shell
# You can also use wget
curl -X DELETE https://api.mod.io/v1/games/{game-id}/team/{team-member-id} \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
DELETE https://api.mod.io/v1/games/{game-id}/team/{team-member-id} HTTP/1.1
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
  url: 'https://api.mod.io/v1/games/{game-id}/team/{team-member-id}',
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

fetch('https://api.mod.io/v1/games/{game-id}/team/{team-member-id}',
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

result = RestClient.delete 'https://api.mod.io/v1/games/{game-id}/team/{team-member-id}',
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

r = requests.delete('https://api.mod.io/v1/games/{game-id}/team/{team-member-id}', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/team/{team-member-id}");
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
`DELETE /games/{game-id}/team/{team-member-id}`

Delete a user from a game team. This will revoke their access rights if they are not the original creator of the resource.

> Example responses

```json
 204 No Content 
```
<h3 id="Delete-Game-Team-Member-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|No Content|None

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>

## Delete Mod Team Member

> Code samples

```shell
# You can also use wget
curl -X DELETE https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team/{team-member-id} \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept: application/json'

```

```http
DELETE https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team/{team-member-id} HTTP/1.1
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
  url: 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team/{team-member-id}',
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

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team/{team-member-id}',
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

result = RestClient.delete 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team/{team-member-id}',
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

r = requests.delete('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team/{team-member-id}', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team/{team-member-id}");
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
`DELETE /games/{game-id}/mods/{mod-id}/team/{team-member-id}`

Delete a user from a mod team. This will revoke their access rights if they are not the original creator of the resource.

> Example responses

```json
 204 No Content 
```
<h3 id="Delete-Mod-Team-Member-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|No Content|None

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>

# Comments

## Get All Mod Comments

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

Get all comments posted in the mods profile. Successful request will return an array of [Comment Objects](#get-comments). We recommended reading the [filtering documentation](#filtering) to return only the records you want.
     
     Filter|Type|Description
     ---|---|---
     id|integer(int32)|Unique id of the comment.
     mod_id|integer(int32)|Unique id of the mod.
     submitted_by|integer(int32)|Unique id of the user who posted the comment.
     date_added|integer(int32)|Unix timestamp of date added.
     reply_id|integer(int32)|Id of the parent comment this comment is replying to (can be 0 if the comment is not a reply).
     reply_position|string|Levels of nesting in a comment thread. You should order by this field, to maintain comment grouping. How it works:<br><br>- The first comment will have the position '01'.<br>- The second comment will have the position '02'.<br>- If someone responds to the second comment the position will be '02.01'.<br>- A maximum of 3 levels is supported.  
     karma|integer(int32)|Karma received for the comment (can be postive or negative).
     karma_guest|integer(int32)|Karma received for guest comments (can be postive or negative).
     summary|string|Contents of the comment.

> Example responses

```json
{
  "data": [
    {
      "id": 2,
      "mod_id": 2,
      "submitted_by": {
        "id": 1,
        "name_id": "xant",
        "username": "XanT",
        "date_online": 1509922961,
        "avatar": {
          "filename": "modio-dark.png",
          "original": "https://media.mod.io/images/global/modio-dark.png"
        },
        "timezone": "America/Los_Angeles",
        "language": "en",
        "profile_url": "https://mod.io/members/xant"
      },
      "date_added": 1499841487,
      "reply_id": 1499,
      "reply_position": "01",
      "karma": 1,
      "karma_guest": 0,
      "content": "This mod is kickass! Great work!"
    },
    {
        ...
    }
  ],
  "result_count": 100,
  "result_limit": 100,
  "result_offset": 0
}
```
<h3 id="Get-All-Mod-Comments-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[Get All Mod Comments](#schemaget_all_mod_comments)

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
 204 No Content 
```
<h3 id="Delete-Mod-Comment-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|No Content|None

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>

# Users

## Get Resource Owner

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

Returns the [User Object](#user-object) of the user that is the original _submitter_ of the corresponding resource.
     
     __NOTE:__ Mods and games can be managed by teams of users, for the most accurate information you should use the [Team endpoints](#teams).
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     resource_type|string|true|Type of resource you are checking the ownership of. __Must__ be one of the following values:<br><br>__games__<br>__mods__<br>__files__<br>__tags__
     resource_id|integer(int32)|true|Unique id of the resource you are checking the ownership of.

> Example responses

```json
{
  "id": 1,
  "name_id": "xant",
  "username": "XanT",
  "date_online": 1509922961,
  "avatar": {
    "filename": "modio-dark.png",
    "original": "https://media.mod.io/images/global/modio-dark.png"
  },
  "timezone": "America/Los_Angeles",
  "language": "en",
  "profile_url": "https://mod.io/members/xant"
}
```
<h3 id="Get-Resource-Owner-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Request|[User Object  ](#schemauser_object)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>

## Get All Users

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

Get all users registered on mod.io. Successful request will return an array of [User Objects](#get-all-users-2). We recommended reading the [filtering documentation](#filtering) to return only the records you want.
     
     Filter|Type|Description
     ---|---|---
     id|integer(int32)|Unique id of the user.
     name_id|string|URL path for the user on mod.io. Usually a simplified version of their username.
     date_online|integer(int32)|Unix timestamp of date the user was last online.
     username|string|Username of the user.
     timezone|string|Timezone of the user, format is country/city.
     language|string|2-character representation of language.

> Example responses

```json
{
  "data": [
    {
      "id": 1,
      "name_id": "xant",
      "username": "XanT",
      "date_online": 1509922961,
      "avatar": {
        "filename": "modio-dark.png",
        "original": "https://media.mod.io/images/global/modio-dark.png"
      },
      "timezone": "America/Los_Angeles",
      "language": "en",
      "profile_url": "https://mod.io/members/xant"
    },
    {
        ...
    }
  ],
  "result_count": 100,
  "result_limit": 100,
  "result_offset": 0
}
```
<h3 id="Get-All-Users-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[Get All Users ](#schemaget_all_users)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
</aside>

## Get User

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

Get a user. Successful request will return a single [User Object](#user-object).

> Example responses

```json
{
  "id": 1,
  "name_id": "xant",
  "username": "XanT",
  "date_online": 1509922961,
  "avatar": {
    "filename": "modio-dark.png",
    "original": "https://media.mod.io/images/global/modio-dark.png"
  },
  "timezone": "America/Los_Angeles",
  "language": "en",
  "profile_url": "https://mod.io/members/xant"
}
```
<h3 id="Get-User-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[User Object  ](#schemauser_object)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
apiKey, oauth2 ( Scopes: read )
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

Submit a report for any resource on mod.io. You can also [submit a report online](https://mod.io/report/widget) and read our [terms of use](https://mod.io/terms/widget) for information about what is/isn't acceptable.
     
     Parameter|Type|Required|Description
     ---|---|---|---|
     resource|string|true|Type of resource you are reporting. Must be one of the following values:<br><br>__games__<br>__mods__<br>__files__<br>__tags__<br>__users__
     id|integer(int32)|true|Unique id of the resource you are reporting.
     dmca|boolean|true|Is this a DMCA takedown request?
     name|string|true|Informative title for your report.
     summary|string|true|Detailed description of your report. Make sure you include all relevant information and links to help moderators investigate and respond appropiately.

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
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Report Created|[Message Object](#message-object)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: write )
</aside>

# Me

## Get Authenticated User

> Code samples

```shell
# You can also use wget
curl -X GET https://api.mod.io/v1/me \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Accept: application/json'

```

```http
GET https://api.mod.io/v1/me HTTP/1.1
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
  url: 'https://api.mod.io/v1/me',
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

fetch('https://api.mod.io/v1/me',
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

result = RestClient.get 'https://api.mod.io/v1/me',
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

r = requests.get('https://api.mod.io/v1/me', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/me");
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
`GET /me`

Get the *authenticated user* details. Successful request will return a [User Object](#user-object).

> Example responses

```json
{
  "id": 1,
  "name_id": "xant",
  "username": "XanT",
  "date_online": 1509922961,
  "avatar": {
    "filename": "modio-dark.png",
    "original": "https://media.mod.io/images/global/modio-dark.png"
  },
  "timezone": "America/Los_Angeles",
  "language": "en",
  "profile_url": "https://mod.io/members/xant"
}
```
<h3 id="Get-Authenticated-User-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Request Successful|[User Object  ](#schemauser_object)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: read )
</aside>

## Get User Subscriptions

> Code samples

```shell
# You can also use wget
curl -X GET https://api.mod.io/v1/me/subscribed \
  -H 'Authorization: Bearer YourAccessToken' \
  -H 'Accept: application/json'

```

```http
GET https://api.mod.io/v1/me/subscribed HTTP/1.1
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
  url: 'https://api.mod.io/v1/me/subscribed',
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

fetch('https://api.mod.io/v1/me/subscribed',
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

result = RestClient.get 'https://api.mod.io/v1/me/subscribed',
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

r = requests.get('https://api.mod.io/v1/me/subscribed', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/me/subscribed");
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
`GET /me/subscribed`

Get all mod's the *authenticated user* is subscribed to. Successful request will return an array of [Mod Objects](#get-mods-2).
     
     Filter|Type|Description
     ---|---|---
     id|integer(int32)|Unique id of the mod.
     game_id|integer(int32)|Unique id of the parent game.
     submitted_by|integer(int32)|Unique id of the user who has ownership of the mod.
     date_added|integer(int32)|Unix timestamp of date mod was registered.
     date_updated|integer(int32)|Unix timestamp of date mod was updated.
     date_live|integer(int32)|Unix timestamp of date mod was set live.
     logo|string|Filename of the mods logo image, extension included.
     homepage|string|Official homepage of the mod.
     name|string|Name of the mod.
     name_id|string|URL path for the mod on mod.io.
     summary|string|Summary of the mod.
     description|string|Detailed description of the mod which allows HTML.
     metadata_blob|string|Metadata stored by the game developer.
     modfile|integer(int32)|Unique id of the [Modfile Object](#modfile-object) marked as current release.
     tags|string|Comma-separated values representing the tags you want to filter the results by. Only tags that are supported by the parent game can be applied. To determine what tags are eligible, see the tags values within 'Tag Option' column on the parent [Game Object](#game-object).
     status|string| Status of the mod (only recognised by game admins authenticated via _OAuth 2_):<br><br>__unauth__ = Only return un-authorized mods.<br>__auth__ = Only return authorized mods _(default)_.<br>__ban__ = Only return banned mods.<br>__archive__ = Only return archived mods (out of date / incompatible).<br>__delete__ = Only return deleted mods.
     downloads|string|Sort results by most downloads using [_sort filter](#filtering) parameter, value should be `downloads` for descending or `-downloads` for ascending results.
     popular|string|Sort results by popularity using [_sort filter](#filtering), value should be `popular` for descending or `-popular` for ascending results.
     ratings|string|Sort results by weighted rating using [_sort filter](#filtering), value should be `ratings` for descending or `-ratings` for ascending results.
     subscribers|string|Sort results by most subscribers using [_sort filter](#filtering), value should be `subscribers` for descending or `-subscribers` for ascending results.

> Example responses

```json
{
  "data": [
    {
      "id": 2,
      "game_id": 2,
      "submitted_by": {
        "id": 1,
        "name_id": "xant",
        "username": "XanT",
        "date_online": 1509922961,
        "avatar": {
          "filename": "modio-dark.png",
          "original": "https://media.mod.io/images/global/modio-dark.png"
        },
        "timezone": "America/Los_Angeles",
        "language": "en",
        "profile_url": "https://mod.io/members/xant"
      },
      "date_added": 1492564103,
      "date_updated": 1499841487,
      "date_live": 1499841403,
      "logo": {
        "filename": "modio-dark.png",
        "original": "https://media.mod.io/images/global/modio-dark.png",
        "thumb_320x180": "https://media.mod.io/images/global/modio-dark.png",
        "thumb_640x360": "https://media.mod.io/images/global/modio-dark.png",
        "thumb_1280x720": "https://media.mod.io/images/global/modio-dark.png"
      },
      "homepage": "https://www.rogue-hdpack.com/",
      "name": "Rogue Knight HD Pack",
      "name_id": "rogue-knight-hd-pack",
      "summary": "It's time to bask in the glory of beautiful 4k textures!",
      "description": "<h2>About</h2><p>Rogue HD Pack does exactly what you thi...",
      "metadata_blob": "rogue,hd,high-res,4k,hd textures",
      "profile_url": "https://rogue-knight.mod.io/rogue-knight-hd-pack",
      "modfile": {
        "id": 2,
        "mod_id": 2,
        "date_added": 1499841487,
        "date_scanned": 1499841487,
        "virus_status": 0,
        "virus_positive": 0,
        "virustotal_hash": "f9a7bf4a95ce20787337b685a79677cae2281b83c63ab0a25f091407741692af-1508147401",
        "filesize": 15181,
        "filehash": {
          "md5": "2d4a0e2d7273db6b0a94b0740a88ad0d"
        },
        "filename": "rogue-knight-v1.zip",
        "version": "1.3",
        "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
        "download_url": "https://mod.io/mods/file/1/c489a0354111a4d76640d47f0cdcb294"
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
            "filename": "modio-dark.png",
            "original": "https://media.mod.io/images/global/modio-dark.png",
            "thumb_320x180": "https://media.mod.io/images/global/modio-dark.png"
          }
        ]
      },
      "rating_summary": {
        "total_ratings": 1230,
        "positive_ratings": 1047,
        "negative_ratings": 183,
        "percentage_positive": 91,
        "weighted_aggregate": 87.38,
        "display_text": "Very Positive"
      },
      "tags": [
        {
          "name": "Unity",
          "date_added": 1499841487
        }
      ]
    },
    {
        ...
    }
  ],
  "result_count": 100,
  "result_limit": 100,
  "result_offset": 0
}
```
<h3 id="Get-User-Subscriptions-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Request Successful|[Get All Mods ](#schemaget_all_mods)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: read )
</aside>

## Get User Games

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

Get all games the *authenticated user* added or is a team member of. Successful request will return an array of [Game Objects](#get-games-2).

> Example responses

```json
{
  "data": [
    {
      "id": 2,
      "submitted_by": {
        "id": 1,
        "name_id": "xant",
        "username": "XanT",
        "date_online": 1509922961,
        "avatar": {
          "filename": "modio-dark.png",
          "original": "https://media.mod.io/images/global/modio-dark.png"
        },
        "timezone": "America/Los_Angeles",
        "language": "en",
        "profile_url": "https://mod.io/members/xant"
      },
      "date_added": 1493702614,
      "date_updated": 1499410290,
      "date_live": 1499841403,
      "presentation": 1,
      "submission": 0,
      "curation": 0,
      "community": 3,
      "revenue": 1500,
      "api": 3,
      "ugc_name": "map",
      "icon": {
        "filename": "modio-dark.png",
        "original": "https://media.mod.io/images/global/modio-dark.png",
        "thumb_320x180": "https://media.mod.io/images/global/modio-dark.png"
      },
      "logo": {
        "filename": "modio-dark.png",
        "original": "https://media.mod.io/images/global/modio-dark.png",
        "thumb_320x180": "https://media.mod.io/images/global/modio-dark.png",
        "thumb_640x360": "https://media.mod.io/images/global/modio-dark.png",
        "thumb_1280x720": "https://media.mod.io/images/global/modio-dark.png"
      },
      "header": {
        "filename": "demo.png",
        "original": "https://media.mod.io/images/global/modio-dark.png"
      },
      "homepage": "https://www.rogue-knight-game.com/",
      "name": "Rogue Knight",
      "name_id": "rogue-knight",
      "summary": "Rogue Knight is a brand new 2D pixel platformer.",
      "instructions": "Instructions on the process to upload mods.",
      "profile_url": "https://rogue-knight.mod.io",
      "tag_options": [
        {
          "name": "Theme",
          "type": "checkboxes",
          "tags": [
            "Horror"
          ],
          "admin_only": 0
        }
      ]
    },
    {
        ...
    }
  ],
  "result_count": 100,
  "result_limit": 100,
  "result_offset": 0
}
```
<h3 id="Get-User-Games-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Request Successful|[Get All Games ](#schemaget_all_games)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: read )
</aside>

## Get User Mods

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

Get all mods the *authenticated user* added or is a team member of. Successful request will return an array of [Mod Objects](#get-all-mods-2).

> Example responses

```json
{
  "data": [
    {
      "id": 2,
      "game_id": 2,
      "submitted_by": {
        "id": 1,
        "name_id": "xant",
        "username": "XanT",
        "date_online": 1509922961,
        "avatar": {
          "filename": "modio-dark.png",
          "original": "https://media.mod.io/images/global/modio-dark.png"
        },
        "timezone": "America/Los_Angeles",
        "language": "en",
        "profile_url": "https://mod.io/members/xant"
      },
      "date_added": 1492564103,
      "date_updated": 1499841487,
      "date_live": 1499841403,
      "logo": {
        "filename": "modio-dark.png",
        "original": "https://media.mod.io/images/global/modio-dark.png",
        "thumb_320x180": "https://media.mod.io/images/global/modio-dark.png",
        "thumb_640x360": "https://media.mod.io/images/global/modio-dark.png",
        "thumb_1280x720": "https://media.mod.io/images/global/modio-dark.png"
      },
      "homepage": "https://www.rogue-hdpack.com/",
      "name": "Rogue Knight HD Pack",
      "name_id": "rogue-knight-hd-pack",
      "summary": "It's time to bask in the glory of beautiful 4k textures!",
      "description": "<h2>About</h2><p>Rogue HD Pack does exactly what you thi...",
      "metadata_blob": "rogue,hd,high-res,4k,hd textures",
      "profile_url": "https://rogue-knight.mod.io/rogue-knight-hd-pack",
      "modfile": {
        "id": 2,
        "mod_id": 2,
        "date_added": 1499841487,
        "date_scanned": 1499841487,
        "virus_status": 0,
        "virus_positive": 0,
        "virustotal_hash": "f9a7bf4a95ce20787337b685a79677cae2281b83c63ab0a25f091407741692af-1508147401",
        "filesize": 15181,
        "filehash": {
          "md5": "2d4a0e2d7273db6b0a94b0740a88ad0d"
        },
        "filename": "rogue-knight-v1.zip",
        "version": "1.3",
        "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
        "download_url": "https://mod.io/mods/file/1/c489a0354111a4d76640d47f0cdcb294"
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
            "filename": "modio-dark.png",
            "original": "https://media.mod.io/images/global/modio-dark.png",
            "thumb_320x180": "https://media.mod.io/images/global/modio-dark.png"
          }
        ]
      },
      "rating_summary": {
        "total_ratings": 1230,
        "positive_ratings": 1047,
        "negative_ratings": 183,
        "percentage_positive": 91,
        "weighted_aggregate": 87.38,
        "display_text": "Very Positive"
      },
      "tags": [
        {
          "name": "Unity",
          "date_added": 1499841487
        }
      ]
    },
    {
        ...
    }
  ],
  "result_count": 100,
  "result_limit": 100,
  "result_offset": 0
}
```
<h3 id="Get-User-Mods-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Request Successful|[Get All Mods ](#schemaget_all_mods)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: read )
</aside>

## Get User Modfiles

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

Get all Modfiles the *authenticated user* uploaded. Successful request will return an array of [Modfile Objects](#get-all-mod-files-2).

> Example responses

```json
{
  "data": [
    {
      "id": 2,
      "mod_id": 2,
      "date_added": 1499841487,
      "date_scanned": 1499841487,
      "virus_status": 0,
      "virus_positive": 0,
      "virustotal_hash": "f9a7bf4a95ce20787337b685a79677cae2281b83c63ab0a25f091407741692af-1508147401",
      "filesize": 15181,
      "filehash": {
        "md5": "2d4a0e2d7273db6b0a94b0740a88ad0d"
      },
      "filename": "rogue-knight-v1.zip",
      "version": "1.3",
      "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
      "download_url": "https://mod.io/mods/file/1/c489a0354111a4d76640d47f0cdcb294"
    },
    {
        ...
    }
  ],
  "result_count": 100,
  "result_limit": 100,
  "result_offset": 0
}
```
<h3 id="Get-User-Modfiles-responses">Responses</h3>

Status|Meaning|Description|Response Schema
---|---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Request Successful|[Get All Modfiles ](#schemaget_all_modfiles)

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
oauth2 ( Scopes: read )
</aside>

# Response Schemas 
## Message Object

  <a name="schemamessage_object"></a>

```json
{
  "code": 200,
  "message": "Your request was successful."
} 
```

### Properties

Name|Type|Description
---|---|---|---|
code|integer(int32)|[HTTP status code](#response-codes) of response.
message|string|The server response to your request. Responses will vary depending on the endpoint, but the object structure will persist.



## Error Object

  <a name="schemaerror_object"></a>

```json
{
  "error": {
    "code": 403,
    "message": "You do not have the required permissions to access this resource.",
    "errors": {}
  }
} 
```

### Properties

Name|Type|Description
---|---|---|---|
error|object|Contains error data.
» code|integer(int32)|[HTTP code](#response-codes) of the error.
» message|string|The server response to your request. Responses will vary depending on the endpoint, but the object structure will persist.
» errors|object|Optional Validation errors object. This field is only supplied if the response is a validation error (`422 Unprocessible Entity`). See [errors documentation](#errors) for more information.



## Logo Object

  <a name="schemalogo_object"></a>

```json
{
  "filename": "modio-dark.png",
  "original": "https://media.mod.io/images/global/modio-dark.png",
  "thumb_320x180": "https://media.mod.io/images/global/modio-dark.png",
  "thumb_640x360": "https://media.mod.io/images/global/modio-dark.png",
  "thumb_1280x720": "https://media.mod.io/images/global/modio-dark.png"
} 
```

### Properties

Name|Type|Description
---|---|---|---|
filename|string|Logo filename including extension.
original|string|URL to the full-sized logo.
thumb_320x180|string|URL to the small logo thumbnail.
thumb_640x360|string|URL to the medium logo thumbnail.
thumb_1280x720|string|URL to the large logo thumbnail.



## Icon Object

  <a name="schemaicon_object"></a>

```json
{
  "filename": "modio-dark.png",
  "original": "https://media.mod.io/images/global/modio-dark.png",
  "thumb_320x180": "https://media.mod.io/images/global/modio-dark.png"
} 
```

### Properties

Name|Type|Description
---|---|---|---|
filename|string|Icon filename including extension.
original|string|URL to the full-sized icon.
thumb_320x180|string|URL to the icon thumbnail.



## Header Object

  <a name="schemaheader_object"></a>

```json
{
  "filename": "demo.png",
  "original": "https://media.mod.io/images/global/modio-dark.png"
} 
```

### Properties

Name|Type|Description
---|---|---|---|
filename|string|Header image filename including extension.
original|string|URL to the full-sized header image.



## Avatar Object

  <a name="schemaavatar_object"></a>

```json
{
  "filename": "modio-dark.png",
  "original": "https://media.mod.io/images/global/modio-dark.png"
} 
```

### Properties

Name|Type|Description
---|---|---|---|
filename|string|Avatar filename including extension.
original|string|URL to the full-sized avatar.



## Image Object

  <a name="schemaimage_object"></a>

```json
{
  "filename": "modio-dark.png",
  "original": "https://media.mod.io/images/global/modio-dark.png",
  "thumb_320x180": "https://media.mod.io/images/global/modio-dark.png"
} 
```

### Properties

Name|Type|Description
---|---|---|---|
filename|string|Image filename including extension.
original|string|URL to the full-sized image.
thumb_320x180|string|URL to the image thumbnail.



## Get All Mod Comments

<a name="schemaget_all_mod_comments"></a>

```json
{
  "data": [
    {
      "id": 2,
      "mod_id": 2,
      "submitted_by": {
        "id": 1,
        "name_id": "xant",
        "username": "XanT",
        "date_online": 1509922961,
        "avatar": {
          "filename": "modio-dark.png",
          "original": "https://media.mod.io/images/global/modio-dark.png"
        },
        "timezone": "America/Los_Angeles",
        "language": "en",
        "profile_url": "https://mod.io/members/xant"
      },
      "date_added": 1499841487,
      "reply_id": 1499,
      "reply_position": "01",
      "karma": 1,
      "karma_guest": 0,
      "content": "This mod is kickass! Great work!"
    },
    {
        ...
    }
  ],
  "result_count": 100,
  "result_limit": 100,
  "result_offset": 0
} 
```

### Properties

Name|Type|Description
---|---|---|---|
result_count|integer(int32)|Number of results returned in the data array.
result_limit|integer(int32)|Maximum number of results returned.
result_offset|integer(int32)|Number of results skipped over.
data|[Comment Object  ](#schemacomment_object)[]|Array containing comment objects.
» id|integer(int32)|Unique id of the comment.
» mod_id|integer(int32)|Unique id of the parent mod.
» submitted_by|[User Object  ](#schemauser_object)|Contains user data.
»» id|integer(int32)|Unique id of the user.
»» name_id|string|URL path for the user on mod.io. Usually a simplified version of their username.
»» username|string|Username of the user.
»» date_online|integer(int32)|Unix timestamp of date the user was last online.
»» avatar|[Avatar Object  ](#schemaavatar_object)|Contains avatar data.
»»» filename|string|Avatar filename including extension.
»»» original|string|URL to the full-sized avatar.
»» timezone|string|Timezone of the user, format is country/city.
»» language|string|2-character representation of users language preference.
»» profile_url|string|URL to the user's mod.io profile.
» date_added|integer(int32)|Unix timestamp of date the comment was posted.
» reply_id|integer(int32)|Id of the parent comment this comment is replying to (can be 0 if the comment is not a reply).
» reply_position|string|Levels of nesting in a comment thread. How it works:<br><br>- The first comment will have the position '01'.<br>- The second comment will have the position '02'.<br>- If someone responds to the second comment the position will be '02.01'.<br>- A maximum of 3 levels is supported.
» karma|integer(int32)|Karma received for the comment (can be postive or negative).
» karma_guest|integer(int32)|Karma received for guest comments (can be postive or negative).
» content|string|Contents of the comment.



## Get All Mod Dependencies

<a name="schemaget_all_mod_dependencies"></a>

```json
{
  "data": [
    {
      "mod_id": 231,
      "date_added": 1499841487
    },
    {
        ...
    }
  ],
  "result_count": 100,
  "result_limit": 100,
  "result_offset": 0
} 
```

### Properties

Name|Type|Description
---|---|---|---|
result_count|integer(int32)|Number of results returned in the data array.
result_limit|integer(int32)|Maximum number of results returned.
result_offset|integer(int32)|Number of results skipped over.
data|[Mod Dependencies Object ](#schemamod_dependencies_object)[]|Array containing mod dependencies objects.
» mod_id|integer(int32)|Unique id of the mod that is the dependency.
» date_added|integer(int32)|Unix timestamp of date the dependency was added.



## Get All Modfiles 

<a name="schemaget_all_modfiles"></a>

```json
{
  "data": [
    {
      "id": 2,
      "mod_id": 2,
      "date_added": 1499841487,
      "date_scanned": 1499841487,
      "virus_status": 0,
      "virus_positive": 0,
      "virustotal_hash": "f9a7bf4a95ce20787337b685a79677cae2281b83c63ab0a25f091407741692af-1508147401",
      "filesize": 15181,
      "filehash": {
        "md5": "2d4a0e2d7273db6b0a94b0740a88ad0d"
      },
      "filename": "rogue-knight-v1.zip",
      "version": "1.3",
      "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
      "download_url": "https://mod.io/mods/file/1/c489a0354111a4d76640d47f0cdcb294"
    },
    {
        ...
    }
  ],
  "result_count": 100,
  "result_limit": 100,
  "result_offset": 0
} 
```

### Properties

Name|Type|Description
---|---|---|---|
result_count|integer(int32)|Number of results returned in the data array.
result_limit|integer(int32)|Maximum number of results returned.
result_offset|integer(int32)|Number of results skipped over.
data|[Modfile Object  ](#schemamodfile_object)[]|Array containing modfile objects.
» id|integer(int32)|Unique modfile id.
» mod_id|integer(int32)|Unique mod id.
» date_added|integer(int32)|Unix timestamp of date added.
» date_scanned|integer(int32)|Unix timestamp of date file was virus scanned.
» virus_status|integer(int32)|Current virus scan status of the file. For newly added files that have yet to be scanned this field will change frequently until a scan is complete:<br><br>__0__ = Not scanned<br>__1__ = Scan complete<br>__2__ = In progress<br>__3__ = Too large to scan<br>__4__ = File not found<br>__5__ = Error Scanning
» virus_positive|integer(int32)|Was a virus detected:<br><br>__0__ = No threats detected<br>__1__ = Flagged as malicious
» virustotal_hash|string|VirusTotal proprietary hash to view the [scan results](https://www.virustotal.com).
» filesize|integer(int32)|Size of the file in bytes.
» filehash|[Filehash Object  ](#schemafilehash_object)|Contains filehash data.
»» md5|string|MD5 hash of the file.
» filename|string|Filename including extension.
» version|string|Release version this file represents.
» changelog|string|Changelog for the file.
» download_url|string|URL to download the file from the mod.io CDN.



## Get All Games 

<a name="schemaget_all_games"></a>

```json
{
  "data": [
    {
      "id": 2,
      "submitted_by": {
        "id": 1,
        "name_id": "xant",
        "username": "XanT",
        "date_online": 1509922961,
        "avatar": {
          "filename": "modio-dark.png",
          "original": "https://media.mod.io/images/global/modio-dark.png"
        },
        "timezone": "America/Los_Angeles",
        "language": "en",
        "profile_url": "https://mod.io/members/xant"
      },
      "date_added": 1493702614,
      "date_updated": 1499410290,
      "date_live": 1499841403,
      "presentation": 1,
      "submission": 0,
      "curation": 0,
      "community": 3,
      "revenue": 1500,
      "api": 3,
      "ugc_name": "map",
      "icon": {
        "filename": "modio-dark.png",
        "original": "https://media.mod.io/images/global/modio-dark.png",
        "thumb_320x180": "https://media.mod.io/images/global/modio-dark.png"
      },
      "logo": {
        "filename": "modio-dark.png",
        "original": "https://media.mod.io/images/global/modio-dark.png",
        "thumb_320x180": "https://media.mod.io/images/global/modio-dark.png",
        "thumb_640x360": "https://media.mod.io/images/global/modio-dark.png",
        "thumb_1280x720": "https://media.mod.io/images/global/modio-dark.png"
      },
      "header": {
        "filename": "demo.png",
        "original": "https://media.mod.io/images/global/modio-dark.png"
      },
      "homepage": "https://www.rogue-knight-game.com/",
      "name": "Rogue Knight",
      "name_id": "rogue-knight",
      "summary": "Rogue Knight is a brand new 2D pixel platformer.",
      "instructions": "Instructions on the process to upload mods.",
      "profile_url": "https://rogue-knight.mod.io",
      "tag_options": [
        {
          "name": "Theme",
          "type": "checkboxes",
          "tags": [
            "Horror"
          ],
          "admin_only": 0
        }
      ]
    },
    {
        ...
    }
  ],
  "result_count": 100,
  "result_limit": 100,
  "result_offset": 0
} 
```

### Properties

Name|Type|Description
---|---|---|---|
result_count|integer(int32)|Number of results returned in the data array.
result_limit|integer(int32)|Maximum number of results returned.
result_offset|integer(int32)|Number of results skipped over.
data|[Game Object  ](#schemagame_object)[]|Array containing game objects.
» id|integer(int32)|Unique game id.
» submitted_by|[User Object  ](#schemauser_object)|Contains user data.
»» id|integer(int32)|Unique id of the user.
»» name_id|string|URL path for the user on mod.io. Usually a simplified version of their username.
»» username|string|Username of the user.
»» date_online|integer(int32)|Unix timestamp of date the user was last online.
»» avatar|[Avatar Object  ](#schemaavatar_object)|Contains avatar data.
»»» filename|string|Avatar filename including extension.
»»» original|string|URL to the full-sized avatar.
»» timezone|string|Timezone of the user, format is country/city.
»» language|string|2-character representation of users language preference.
»» profile_url|string|URL to the user's mod.io profile.
» date_added|integer(int32)|Unix timestamp of date registered.
» date_updated|integer(int32)|Unix timestamp of date updated.
» date_live|integer(int32)|Unix timestamp of date game was set live.
» presentation|integer(int32)|Presentation style used on the mod.io website:<br><br>__0__ =  Grid View: Displays mods in a grid<br>__1__ = Table View: Displays mods in a table
» submission|integer(int32)|Submission process modders must follow:<br><br>__0__ = Mod uploads must occur via a tool created by the game developers<br>__1__ = Mod uploads can occur from anywhere, including the website and API
» curation|integer(int32)|Curation process used to approve mods:<br><br>__0__ = No curation: Mods are immediately available to play<br>__1__ = Paid curation: Only mods which accept donations must be accepted<br>__2__ = Full curation: All mods must be accepted by someone to be listed
» community|integer(int32)|Community features enabled on the mod.io website:<br><br>__0__ = All of the options below are disabled<br>__1__ = Discussion board enabled<br>__2__ = Guides and news enabled<br>__?__ = Combine to find games with multiple options enabled (see [BITWISE filtering](#bitwise-and-bitwise-and))
» revenue|integer(int32)|Revenue capabilities mods can enable:<br><br>__0__ = All of the options below are disabled<br>__1__ = Allow mods to be sold<br>__2__ = Allow mods to receive donations<br>__4__ = Allow mods to be traded<br>__8__ = Allow mods to control supply and scarcity<br>__?__ = Combine to find games with multiple options enabled (see [BITWISE filtering](#bitwise-and-bitwise-and))
» api|integer(int32)|Level of API access allowed by this game:<br><br>__0__ = All of the options below are disabled<br>__1__ = This game allows 3rd parties to access the mods API<br>__2__ = This game allows mods to be downloaded directly without API validation<br>__?__ = Combine to find games with multiple options enabled (see [BITWISE filtering](#bitwise-and-bitwise-and))
» ugc_name|string|Word used to describe user-generated content (mods, items, addons etc).
» icon|[Icon Object  ](#schemaicon_object)|Contains icon data.
»» filename|string|Icon filename including extension.
»» original|string|URL to the full-sized icon.
»» thumb_320x180|string|URL to the icon thumbnail.
» logo|[Logo Object  ](#schemalogo_object)|Contains logo data.
»» filename|string|Logo filename including extension.
»» original|string|URL to the full-sized logo.
»» thumb_320x180|string|URL to the small logo thumbnail.
»» thumb_640x360|string|URL to the medium logo thumbnail.
»» thumb_1280x720|string|URL to the large logo thumbnail.
» header|[Header Object  ](#schemaheader_object)|Contains header data.
»» filename|string|Header image filename including extension.
»» original|string|URL to the full-sized header image.
» homepage|string|Official homepage of the game.
» name|string|Name of the game.
» name_id|string|Subdomain for the game on mod.io.
» summary|string|Summary of the game.
» instructions|string|A guide about creating and uploading mods for this game to mod.io (applicable if submission = 0).
» profile_url|string|URL to the game's mod.io page.
» tag_options|[Game Tag Option Object](#schemagame_tag_option_object)[]|Groups of tags configured by the game developer, that mods can select.
»» name|string|Name of the tag group.
»» type|string|Can multiple tags be selected via 'checkboxes' or should only a single tag be selected via a 'dropdown'.
»» admin_only|integer(int32)|Groups of tags flagged as 'admin only' should only be used for filtering, and should not be displayed to users.
»» tags|string[]|Array of tags in this group.



## Get Game Activity 

<a name="schemaget_game_activity"></a>

```json
{
  "data": [
    {
      "id": 53,
      "game_id": 17,
      "user_id": 95,
      "date_added": 1499846132,
      "event": "GAME_UPDATE",
      "changes": [
        {
          "field": "homepage",
          "before": "https://www.roguehdpack.com/",
          "after": "https://rogue-knight.mod.io/rogue-hd-pack"
        }
      ]
    },
    {
        ...
    }
  ],
  "result_count": 100,
  "result_limit": 100,
  "result_offset": 0
} 
```

### Properties

Name|Type|Description
---|---|---|---|
result_count|integer(int32)|Number of results returned in the data array.
result_limit|integer(int32)|Maximum number of results returned.
result_offset|integer(int32)|Number of results skipped over.
data|[Game Activity Object ](#schemagame_activity_object)[]|Array containing game activity objects.
» id|integer(int32)|Unique id of the activity record.
» game_id|integer(int32)|Unique id of the parent game.
» user_id|integer(int32)|Unique id of the user who performed the action.
» date_added|string|Unix timestamp of date the event occured.
» event|string|Type of [event the activity](#get-game-activity) was 'GAME_UPDATE' or 'GAME_VISIBILITY_CHANGE'.
» changes|[Field Change Object ](#schemafield_change_object)[]|Contains an array of 'before and after' values of fields changed by the event.
»» field|string|Name of field that was changed.
»» before|string|Value of the field before the event.
»» after|string|Value of the field after the event.



## Get All Mod KVP

<a name="schemaget_all_mod_kvp_metadata"></a>

```json
{
  "data": [
    {
      "key": "pistol-dmg",
      "value": 800
    },
    {
        ...
    }
  ],
  "result_count": 100,
  "result_limit": 100,
  "result_offset": 0
} 
```

### Properties

Name|Type|Description
---|---|---|---|
result_count|integer(int32)|Number of results returned in the data array.
result_limit|integer(int32)|Maximum number of results returned.
result_offset|integer(int32)|Number of results skipped over.
data|[Metadata KVP Object ](#schemametadata_kvp_object)[]|Array containing metadata kvp objects.
» key|string|The key of the key-value pair.
» value|string|The value of the key-value pair.



## Get All Mods 

<a name="schemaget_all_mods"></a>

```json
{
  "data": [
    {
      "id": 2,
      "game_id": 2,
      "submitted_by": {
        "id": 1,
        "name_id": "xant",
        "username": "XanT",
        "date_online": 1509922961,
        "avatar": {
          "filename": "modio-dark.png",
          "original": "https://media.mod.io/images/global/modio-dark.png"
        },
        "timezone": "America/Los_Angeles",
        "language": "en",
        "profile_url": "https://mod.io/members/xant"
      },
      "date_added": 1492564103,
      "date_updated": 1499841487,
      "date_live": 1499841403,
      "logo": {
        "filename": "modio-dark.png",
        "original": "https://media.mod.io/images/global/modio-dark.png",
        "thumb_320x180": "https://media.mod.io/images/global/modio-dark.png",
        "thumb_640x360": "https://media.mod.io/images/global/modio-dark.png",
        "thumb_1280x720": "https://media.mod.io/images/global/modio-dark.png"
      },
      "homepage": "https://www.rogue-hdpack.com/",
      "name": "Rogue Knight HD Pack",
      "name_id": "rogue-knight-hd-pack",
      "summary": "It's time to bask in the glory of beautiful 4k textures!",
      "description": "<h2>About</h2><p>Rogue HD Pack does exactly what you thi...",
      "metadata_blob": "rogue,hd,high-res,4k,hd textures",
      "profile_url": "https://rogue-knight.mod.io/rogue-knight-hd-pack",
      "modfile": {
        "id": 2,
        "mod_id": 2,
        "date_added": 1499841487,
        "date_scanned": 1499841487,
        "virus_status": 0,
        "virus_positive": 0,
        "virustotal_hash": "f9a7bf4a95ce20787337b685a79677cae2281b83c63ab0a25f091407741692af-1508147401",
        "filesize": 15181,
        "filehash": {
          "md5": "2d4a0e2d7273db6b0a94b0740a88ad0d"
        },
        "filename": "rogue-knight-v1.zip",
        "version": "1.3",
        "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
        "download_url": "https://mod.io/mods/file/1/c489a0354111a4d76640d47f0cdcb294"
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
            "filename": "modio-dark.png",
            "original": "https://media.mod.io/images/global/modio-dark.png",
            "thumb_320x180": "https://media.mod.io/images/global/modio-dark.png"
          }
        ]
      },
      "rating_summary": {
        "total_ratings": 1230,
        "positive_ratings": 1047,
        "negative_ratings": 183,
        "percentage_positive": 91,
        "weighted_aggregate": 87.38,
        "display_text": "Very Positive"
      },
      "tags": [
        {
          "name": "Unity",
          "date_added": 1499841487
        }
      ]
    },
    {
        ...
    }
  ],
  "result_count": 100,
  "result_limit": 100,
  "result_offset": 0
} 
```

### Properties

Name|Type|Description
---|---|---|---|
result_count|integer(int32)|Number of results returned in the data array.
result_limit|integer(int32)|Maximum number of results returned.
result_offset|integer(int32)|Number of results skipped over.
data|[Mod Object  ](#schemamod_object)[]|Array containing mod objects.
» id|integer(int32)|Unique mod id.
» game_id|integer(int32)|Unique game id.
» submitted_by|[User Object  ](#schemauser_object)|Contains user data.
»» id|integer(int32)|Unique id of the user.
»» name_id|string|URL path for the user on mod.io. Usually a simplified version of their username.
»» username|string|Username of the user.
»» date_online|integer(int32)|Unix timestamp of date the user was last online.
»» avatar|[Avatar Object  ](#schemaavatar_object)|Contains avatar data.
»»» filename|string|Avatar filename including extension.
»»» original|string|URL to the full-sized avatar.
»» timezone|string|Timezone of the user, format is country/city.
»» language|string|2-character representation of users language preference.
»» profile_url|string|URL to the user's mod.io profile.
» date_added|integer(int32)|Unix timestamp of date registered.
» date_updated|integer(int32)|Unix timestamp of date last updated.
» date_live|integer(int32)|Unix timestamp of date mod was set live.
» logo|[Logo Object  ](#schemalogo_object)|Contains logo data.
»» filename|string|Logo filename including extension.
»» original|string|URL to the full-sized logo.
»» thumb_320x180|string|URL to the small logo thumbnail.
»» thumb_640x360|string|URL to the medium logo thumbnail.
»» thumb_1280x720|string|URL to the large logo thumbnail.
» homepage|string|Official homepage of the mod.
» name|string|Name of the mod.
» name_id|string|URL path for the mod on mod.io.
» summary|string|Summary of the mod.
» description|string|Detailed description of the mod which allows HTML.
» metadata_blob|string|Metadata stored by the game developer. Metadata can also be stored as searchable [key value pairs](#metadata).
» profile_url|string|URL to the mod's mod.io profile.
» modfile|[Modfile Object  ](#schemamodfile_object)|Contains modfile data.
»» id|integer(int32)|Unique modfile id.
»» mod_id|integer(int32)|Unique mod id.
»» date_added|integer(int32)|Unix timestamp of date added.
»» date_scanned|integer(int32)|Unix timestamp of date file was virus scanned.
»» virus_status|integer(int32)|Current virus scan status of the file. For newly added files that have yet to be scanned this field will change frequently until a scan is complete:<br><br>__0__ = Not scanned<br>__1__ = Scan complete<br>__2__ = In progress<br>__3__ = Too large to scan<br>__4__ = File not found<br>__5__ = Error Scanning
»» virus_positive|integer(int32)|Was a virus detected:<br><br>__0__ = No threats detected<br>__1__ = Flagged as malicious
»» virustotal_hash|string|VirusTotal proprietary hash to view the [scan results](https://www.virustotal.com).
»» filesize|integer(int32)|Size of the file in bytes.
»» filehash|[Filehash Object  ](#schemafilehash_object)|Contains filehash data.
»»» md5|string|MD5 hash of the file.
»» filename|string|Filename including extension.
»» version|string|Release version this file represents.
»» changelog|string|Changelog for the file.
»» download_url|string|URL to download the file from the mod.io CDN.
» media|[Mod Media Object ](#schemamod_media_object)|Contains mod media data.
»» youtube|string[]|Array of YouTube links.
»» sketchfab|string[]|Array of SketchFab links.
»» images|[Image Object  ](#schemaimage_object)[]|Array of image objects (a gallery).
»»» filename|string|Image filename including extension.
»»» original|string|URL to the full-sized image.
»»» thumb_320x180|string|URL to the image thumbnail.
» rating_summary|[Rating Summary Object ](#schemarating_summary_object)|Contains ratings summary.
»» total_ratings|integer(int32)|Number of times this item has been rated.
»» positive_ratings|integer(int32)|Number of positive ratings.
»» negative_ratings|integer(int32)|Number of negative ratings.
»» percentage_positive|integer(int32)|Number of positive ratings, divided by the total ratings to determine it’s percentage score.
»» weighted_aggregate|float|Overall rating of this item calculated using the [Wilson score confidence interval](http://www.evanmiller.org/how-not-to-sort-by-average-rating.html). This column is good to sort on, as it will order items based on number of ratings and will place items with many positive ratings above those with a higher score but fewer ratings.
»» display_text|string|Textual representation of the rating in format:<br><br>- Overwhelmingly Positive<br>- Very Positive<br>- Positive<br>- Mostly Positive<br>- Mixed<br>- Negative<br>- Mostly Negative<br>- Very Negative<br>- Overwhelmingly Negative
» tags|[Mod Tag Object ](#schemamod_tag_object)[]|Contains mod tag data.
»» name|string|Tag name.
»» date_added|integer(int32)|Unix timestamp of date tag was applied.



## Get Mod Activity 

<a name="schemaget_mod_activity"></a>

```json
{
  "data": [
    {
      "id": 13,
      "mod_id": 13,
      "user_id": 13,
      "date_added": 1499846132,
      "event": "MOD_UPDATE",
      "changes": [
        {
          "field": "homepage",
          "before": "https://www.roguehdpack.com/",
          "after": "https://rogue-knight.mod.io/rogue-hd-pack"
        }
      ]
    },
    {
        ...
    }
  ],
  "result_count": 100,
  "result_limit": 100,
  "result_offset": 0
} 
```

### Properties

Name|Type|Description
---|---|---|---|
result_count|integer(int32)|Number of results returned in the data array.
result_limit|integer(int32)|Maximum number of results returned.
result_offset|integer(int32)|Number of results skipped over.
data|[Mod Activity Object ](#schemamod_activity_object)[]|Array containing mod activity objects.
» id|integer(int32)|Unique id of the activity object.
» mod_id|integer(int32)|Unique id of the parent mod.
» user_id|integer(int32)|Unique id of the user who performed the action.
» date_added|integer(int32)|Unix timestamp of date the event occured.
» event|string|Type of [event the activity](#get-mod-activity) was 'MOD_UPDATE', 'MODFILE_UPDATE', 'MOD_VISIBILITY_CHANGE' or 'MOD_LIVE'.
» changes|[Field Change Object ](#schemafield_change_object)[]|Contains an array of 'before and after' values of fields changed by the event.
»» field|string|Name of field that was changed.
»» before|string|Value of the field before the event.
»» after|string|Value of the field after the event.



## Get All Game Tag

<a name="schemaget_all_game_tag_options"></a>

```json
{
  "data": [
    {
      "name": "Theme",
      "type": "checkboxes",
      "tags": [
        "Horror"
      ],
      "admin_only": 0
    },
    {
        ...
    }
  ],
  "result_count": 100,
  "result_limit": 100,
  "result_offset": 0
} 
```

### Properties

Name|Type|Description
---|---|---|---|
result_count|integer(int32)|Number of results returned in the data array.
result_limit|integer(int32)|Maximum number of results returned.
result_offset|integer(int32)|Number of results skipped over.
data|[Game Tag Option Object](#schemagame_tag_option_object)[]|Array containing game tag objects.
» name|string|Name of the tag group.
» type|string|Can multiple tags be selected via 'checkboxes' or should only a single tag be selected via a 'dropdown'.
» admin_only|integer(int32)|Groups of tags flagged as 'admin only' should only be used for filtering, and should not be displayed to users.
» tags|string[]|Array of tags in this group.



## Get All Mod Tags

<a name="schemaget_all_mod_tags"></a>

```json
{
  "data": [
    {
      "name": "Unity",
      "date_added": 1499841487
    },
    {
        ...
    }
  ],
  "result_count": 100,
  "result_limit": 100,
  "result_offset": 0
} 
```

### Properties

Name|Type|Description
---|---|---|---|
result_count|integer(int32)|Number of results returned in the data array.
result_limit|integer(int32)|Maximum number of results returned.
result_offset|integer(int32)|Number of results skipped over.
data|[Mod Tag Object ](#schemamod_tag_object)[]|Array containing mod tag objects.
» name|string|Tag name.
» date_added|integer(int32)|Unix timestamp of date tag was applied.



## Get Team

  <a name="schemaget_team"></a>

```json
{
  "data": [
    {
      "id": 457,
      "user": {
        "id": 1,
        "name_id": "xant",
        "username": "XanT",
        "date_online": 1509922961,
        "avatar": {
          "filename": "modio-dark.png",
          "original": "https://media.mod.io/images/global/modio-dark.png"
        },
        "timezone": "America/Los_Angeles",
        "language": "en",
        "profile_url": "https://mod.io/members/xant"
      },
      "level": 8,
      "date_added": 1492058857,
      "position": "Supreme Overlord"
    },
    {
        ...
    }
  ],
  "result_count": 100,
  "result_limit": 100,
  "result_offset": 0
} 
```

### Properties

Name|Type|Description
---|---|---|---|
result_count|integer(int32)|Number of results returned in the data array.
result_limit|integer(int32)|Maximum number of results returned.
result_offset|integer(int32)|Number of results skipped over.
data|[Team Member Object ](#schemateam_member_object)[]|Array containing team member objects.
» id|integer(int32)|Unique team member id.
» user|[User Object  ](#schemauser_object)|Contains user data.
»» id|integer(int32)|Unique id of the user.
»» name_id|string|URL path for the user on mod.io. Usually a simplified version of their username.
»» username|string|Username of the user.
»» date_online|integer(int32)|Unix timestamp of date the user was last online.
»» avatar|[Avatar Object  ](#schemaavatar_object)|Contains avatar data.
»»» filename|string|Avatar filename including extension.
»»» original|string|URL to the full-sized avatar.
»» timezone|string|Timezone of the user, format is country/city.
»» language|string|2-character representation of users language preference.
»» profile_url|string|URL to the user's mod.io profile.
» level|integer(int32)|Level of permission the user has:<br><br>__0__ = Guest<br>__1__ = Member<br>__2__ = Contributor<br>__4__ = Manager<br>__8__ = Leader
» date_added|integer(int32)|Unix timestamp of the date the user was added to the team.
» position|string|Custom title given to the user in this team.



## Get All Users 

<a name="schemaget_all_users"></a>

```json
{
  "data": [
    {
      "id": 1,
      "name_id": "xant",
      "username": "XanT",
      "date_online": 1509922961,
      "avatar": {
        "filename": "modio-dark.png",
        "original": "https://media.mod.io/images/global/modio-dark.png"
      },
      "timezone": "America/Los_Angeles",
      "language": "en",
      "profile_url": "https://mod.io/members/xant"
    },
    {
        ...
    }
  ],
  "result_count": 100,
  "result_limit": 100,
  "result_offset": 0
} 
```

### Properties

Name|Type|Description
---|---|---|---|
result_count|integer(int32)|Number of results returned in the data array.
result_limit|integer(int32)|Maximum number of results returned.
result_offset|integer(int32)|Number of results skipped over.
data|[User Object  ](#schemauser_object)[]|Array containing user objects.
» id|integer(int32)|Unique id of the user.
» name_id|string|URL path for the user on mod.io. Usually a simplified version of their username.
» username|string|Username of the user.
» date_online|integer(int32)|Unix timestamp of date the user was last online.
» avatar|[Avatar Object  ](#schemaavatar_object)|Contains avatar data.
»» filename|string|Avatar filename including extension.
»» original|string|URL to the full-sized avatar.
» timezone|string|Timezone of the user, format is country/city.
» language|string|2-character representation of users language preference.
» profile_url|string|URL to the user's mod.io profile.



## Game Activity Object 

<a name="schemagame_activity_object"></a>

```json
{
  "id": 53,
  "game_id": 17,
  "user_id": 95,
  "date_added": 1499846132,
  "event": "GAME_UPDATE",
  "changes": [
    {
      "field": "homepage",
      "before": "https://www.roguehdpack.com/",
      "after": "https://rogue-knight.mod.io/rogue-hd-pack"
    }
  ]
} 
```

### Properties

Name|Type|Description
---|---|---|---|
id|integer(int32)|Unique id of the activity record.
game_id|integer(int32)|Unique id of the parent game.
user_id|integer(int32)|Unique id of the user who performed the action.
date_added|string|Unix timestamp of date the event occured.
event|string|Type of [event the activity](#get-game-activity) was 'GAME_UPDATE' or 'GAME_VISIBILITY_CHANGE'.
changes|[Field Change Object ](#schemafield_change_object)[]|Contains an array of 'before and after' values of fields changed by the event.
» field|string|Name of field that was changed.
» before|string|Value of the field before the event.
» after|string|Value of the field after the event.



## Mod Activity Object 

<a name="schemamod_activity_object"></a>

```json
{
  "id": 13,
  "mod_id": 13,
  "user_id": 13,
  "date_added": 1499846132,
  "event": "MOD_UPDATE",
  "changes": [
    {
      "field": "homepage",
      "before": "https://www.roguehdpack.com/",
      "after": "https://rogue-knight.mod.io/rogue-hd-pack"
    }
  ]
} 
```

### Properties

Name|Type|Description
---|---|---|---|
id|integer(int32)|Unique id of the activity object.
mod_id|integer(int32)|Unique id of the parent mod.
user_id|integer(int32)|Unique id of the user who performed the action.
date_added|integer(int32)|Unix timestamp of date the event occured.
event|string|Type of [event the activity](#get-mod-activity) was 'MOD_UPDATE', 'MODFILE_UPDATE', 'MOD_VISIBILITY_CHANGE' or 'MOD_LIVE'.
changes|[Field Change Object ](#schemafield_change_object)[]|Contains an array of 'before and after' values of fields changed by the event.
» field|string|Name of field that was changed.
» before|string|Value of the field before the event.
» after|string|Value of the field after the event.



## Field Change Object 

<a name="schemafield_change_object"></a>

```json
{
  "field": "homepage",
  "before": "https://www.roguehdpack.com/",
  "after": "https://rogue-knight.mod.io/rogue-hd-pack"
} 
```

### Properties

Name|Type|Description
---|---|---|---|
field|string|Name of field that was changed.
before|string|Value of the field before the event.
after|string|Value of the field after the event.



## Comment Object

  <a name="schemacomment_object"></a>

```json
{
  "id": 2,
  "mod_id": 2,
  "submitted_by": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "date_online": 1509922961,
    "avatar": {
      "filename": "modio-dark.png",
      "original": "https://media.mod.io/images/global/modio-dark.png"
    },
    "timezone": "America/Los_Angeles",
    "language": "en",
    "profile_url": "https://mod.io/members/xant"
  },
  "date_added": 1499841487,
  "reply_id": 1499,
  "reply_position": "01",
  "karma": 1,
  "karma_guest": 0,
  "content": "This mod is kickass! Great work!"
} 
```

### Properties

Name|Type|Description
---|---|---|---|
id|integer(int32)|Unique id of the comment.
mod_id|integer(int32)|Unique id of the parent mod.
submitted_by|[User Object  ](#schemauser_object)|Contains user data.
» id|integer(int32)|Unique id of the user.
» name_id|string|URL path for the user on mod.io. Usually a simplified version of their username.
» username|string|Username of the user.
» date_online|integer(int32)|Unix timestamp of date the user was last online.
» avatar|[Avatar Object  ](#schemaavatar_object)|Contains avatar data.
»» filename|string|Avatar filename including extension.
»» original|string|URL to the full-sized avatar.
» timezone|string|Timezone of the user, format is country/city.
» language|string|2-character representation of users language preference.
» profile_url|string|URL to the user's mod.io profile.
date_added|integer(int32)|Unix timestamp of date the comment was posted.
reply_id|integer(int32)|Id of the parent comment this comment is replying to (can be 0 if the comment is not a reply).
reply_position|string|Levels of nesting in a comment thread. How it works:<br><br>- The first comment will have the position '01'.<br>- The second comment will have the position '02'.<br>- If someone responds to the second comment the position will be '02.01'.<br>- A maximum of 3 levels is supported.
karma|integer(int32)|Karma received for the comment (can be postive or negative).
karma_guest|integer(int32)|Karma received for guest comments (can be postive or negative).
content|string|Contents of the comment.



## Mod Dependencies Object 

<a name="schemamod_dependencies_object"></a>

```json
{
  "mod_id": 231,
  "date_added": 1499841487
} 
```

### Properties

Name|Type|Description
---|---|---|---|
mod_id|integer(int32)|Unique id of the mod that is the dependency.
date_added|integer(int32)|Unix timestamp of date the dependency was added.



## Modfile Object

  <a name="schemamodfile_object"></a>

```json
{
  "id": 2,
  "mod_id": 2,
  "date_added": 1499841487,
  "date_scanned": 1499841487,
  "virus_status": 0,
  "virus_positive": 0,
  "virustotal_hash": "f9a7bf4a95ce20787337b685a79677cae2281b83c63ab0a25f091407741692af-1508147401",
  "filesize": 15181,
  "filehash": {
    "md5": "2d4a0e2d7273db6b0a94b0740a88ad0d"
  },
  "filename": "rogue-knight-v1.zip",
  "version": "1.3",
  "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
  "download_url": "https://mod.io/mods/file/1/c489a0354111a4d76640d47f0cdcb294"
} 
```

### Properties

Name|Type|Description
---|---|---|---|
id|integer(int32)|Unique modfile id.
mod_id|integer(int32)|Unique mod id.
date_added|integer(int32)|Unix timestamp of date added.
date_scanned|integer(int32)|Unix timestamp of date file was virus scanned.
virus_status|integer(int32)|Current virus scan status of the file. For newly added files that have yet to be scanned this field will change frequently until a scan is complete:<br><br>__0__ = Not scanned<br>__1__ = Scan complete<br>__2__ = In progress<br>__3__ = Too large to scan<br>__4__ = File not found<br>__5__ = Error Scanning
virus_positive|integer(int32)|Was a virus detected:<br><br>__0__ = No threats detected<br>__1__ = Flagged as malicious
virustotal_hash|string|VirusTotal proprietary hash to view the [scan results](https://www.virustotal.com).
filesize|integer(int32)|Size of the file in bytes.
filehash|[Filehash Object  ](#schemafilehash_object)|Contains filehash data.
» md5|string|MD5 hash of the file.
filename|string|Filename including extension.
version|string|Release version this file represents.
changelog|string|Changelog for the file.
download_url|string|URL to download the file from the mod.io CDN.



## Filehash Object

  <a name="schemafilehash_object"></a>

```json
{
  "md5": "2d4a0e2d7273db6b0a94b0740a88ad0d"
} 
```

### Properties

Name|Type|Description
---|---|---|---|
md5|string|MD5 hash of the file.



## Mod Object

  <a name="schemamod_object"></a>

```json
{
  "id": 2,
  "game_id": 2,
  "submitted_by": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "date_online": 1509922961,
    "avatar": {
      "filename": "modio-dark.png",
      "original": "https://media.mod.io/images/global/modio-dark.png"
    },
    "timezone": "America/Los_Angeles",
    "language": "en",
    "profile_url": "https://mod.io/members/xant"
  },
  "date_added": 1492564103,
  "date_updated": 1499841487,
  "date_live": 1499841403,
  "logo": {
    "filename": "modio-dark.png",
    "original": "https://media.mod.io/images/global/modio-dark.png",
    "thumb_320x180": "https://media.mod.io/images/global/modio-dark.png",
    "thumb_640x360": "https://media.mod.io/images/global/modio-dark.png",
    "thumb_1280x720": "https://media.mod.io/images/global/modio-dark.png"
  },
  "homepage": "https://www.rogue-hdpack.com/",
  "name": "Rogue Knight HD Pack",
  "name_id": "rogue-knight-hd-pack",
  "summary": "It's time to bask in the glory of beautiful 4k textures!",
  "description": "<h2>About</h2><p>Rogue HD Pack does exactly what you thi...",
  "metadata_blob": "rogue,hd,high-res,4k,hd textures",
  "profile_url": "https://rogue-knight.mod.io/rogue-knight-hd-pack",
  "modfile": {
    "id": 2,
    "mod_id": 2,
    "date_added": 1499841487,
    "date_scanned": 1499841487,
    "virus_status": 0,
    "virus_positive": 0,
    "virustotal_hash": "f9a7bf4a95ce20787337b685a79677cae2281b83c63ab0a25f091407741692af-1508147401",
    "filesize": 15181,
    "filehash": {
      "md5": "2d4a0e2d7273db6b0a94b0740a88ad0d"
    },
    "filename": "rogue-knight-v1.zip",
    "version": "1.3",
    "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
    "download_url": "https://mod.io/mods/file/1/c489a0354111a4d76640d47f0cdcb294"
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
        "filename": "modio-dark.png",
        "original": "https://media.mod.io/images/global/modio-dark.png",
        "thumb_320x180": "https://media.mod.io/images/global/modio-dark.png"
      }
    ]
  },
  "rating_summary": {
    "total_ratings": 1230,
    "positive_ratings": 1047,
    "negative_ratings": 183,
    "percentage_positive": 91,
    "weighted_aggregate": 87.38,
    "display_text": "Very Positive"
  },
  "tags": [
    {
      "name": "Unity",
      "date_added": 1499841487
    }
  ]
} 
```

### Properties

Name|Type|Description
---|---|---|---|
id|integer(int32)|Unique mod id.
game_id|integer(int32)|Unique game id.
submitted_by|[User Object  ](#schemauser_object)|Contains user data.
» id|integer(int32)|Unique id of the user.
» name_id|string|URL path for the user on mod.io. Usually a simplified version of their username.
» username|string|Username of the user.
» date_online|integer(int32)|Unix timestamp of date the user was last online.
» avatar|[Avatar Object  ](#schemaavatar_object)|Contains avatar data.
»» filename|string|Avatar filename including extension.
»» original|string|URL to the full-sized avatar.
» timezone|string|Timezone of the user, format is country/city.
» language|string|2-character representation of users language preference.
» profile_url|string|URL to the user's mod.io profile.
date_added|integer(int32)|Unix timestamp of date registered.
date_updated|integer(int32)|Unix timestamp of date last updated.
date_live|integer(int32)|Unix timestamp of date mod was set live.
logo|[Logo Object  ](#schemalogo_object)|Contains logo data.
» filename|string|Logo filename including extension.
» original|string|URL to the full-sized logo.
» thumb_320x180|string|URL to the small logo thumbnail.
» thumb_640x360|string|URL to the medium logo thumbnail.
» thumb_1280x720|string|URL to the large logo thumbnail.
homepage|string|Official homepage of the mod.
name|string|Name of the mod.
name_id|string|URL path for the mod on mod.io.
summary|string|Summary of the mod.
description|string|Detailed description of the mod which allows HTML.
metadata_blob|string|Metadata stored by the game developer. Metadata can also be stored as searchable [key value pairs](#metadata).
profile_url|string|URL to the mod's mod.io profile.
modfile|[Modfile Object  ](#schemamodfile_object)|Contains modfile data.
» id|integer(int32)|Unique modfile id.
» mod_id|integer(int32)|Unique mod id.
» date_added|integer(int32)|Unix timestamp of date added.
» date_scanned|integer(int32)|Unix timestamp of date file was virus scanned.
» virus_status|integer(int32)|Current virus scan status of the file. For newly added files that have yet to be scanned this field will change frequently until a scan is complete:<br><br>__0__ = Not scanned<br>__1__ = Scan complete<br>__2__ = In progress<br>__3__ = Too large to scan<br>__4__ = File not found<br>__5__ = Error Scanning
» virus_positive|integer(int32)|Was a virus detected:<br><br>__0__ = No threats detected<br>__1__ = Flagged as malicious
» virustotal_hash|string|VirusTotal proprietary hash to view the [scan results](https://www.virustotal.com).
» filesize|integer(int32)|Size of the file in bytes.
» filehash|[Filehash Object  ](#schemafilehash_object)|Contains filehash data.
»» md5|string|MD5 hash of the file.
» filename|string|Filename including extension.
» version|string|Release version this file represents.
» changelog|string|Changelog for the file.
» download_url|string|URL to download the file from the mod.io CDN.
media|[Mod Media Object ](#schemamod_media_object)|Contains mod media data.
» youtube|string[]|Array of YouTube links.
» sketchfab|string[]|Array of SketchFab links.
» images|[Image Object  ](#schemaimage_object)[]|Array of image objects (a gallery).
»» filename|string|Image filename including extension.
»» original|string|URL to the full-sized image.
»» thumb_320x180|string|URL to the image thumbnail.
rating_summary|[Rating Summary Object ](#schemarating_summary_object)|Contains ratings summary.
» total_ratings|integer(int32)|Number of times this item has been rated.
» positive_ratings|integer(int32)|Number of positive ratings.
» negative_ratings|integer(int32)|Number of negative ratings.
» percentage_positive|integer(int32)|Number of positive ratings, divided by the total ratings to determine it’s percentage score.
» weighted_aggregate|float|Overall rating of this item calculated using the [Wilson score confidence interval](http://www.evanmiller.org/how-not-to-sort-by-average-rating.html). This column is good to sort on, as it will order items based on number of ratings and will place items with many positive ratings above those with a higher score but fewer ratings.
» display_text|string|Textual representation of the rating in format:<br><br>- Overwhelmingly Positive<br>- Very Positive<br>- Positive<br>- Mostly Positive<br>- Mixed<br>- Negative<br>- Mostly Negative<br>- Very Negative<br>- Overwhelmingly Negative
tags|[Mod Tag Object ](#schemamod_tag_object)[]|Contains mod tag data.
» name|string|Tag name.
» date_added|integer(int32)|Unix timestamp of date tag was applied.



## Mod Media Object 

<a name="schemamod_media_object"></a>

```json
{
  "youtube": [
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  ],
  "sketchfab": [
    "https://sketchfab.com/models/ef40b2d300334d009984c8865b2db1c8"
  ],
  "images": [
    {
      "filename": "modio-dark.png",
      "original": "https://media.mod.io/images/global/modio-dark.png",
      "thumb_320x180": "https://media.mod.io/images/global/modio-dark.png"
    }
  ]
} 
```

### Properties

Name|Type|Description
---|---|---|---|
youtube|string[]|Array of YouTube links.
sketchfab|string[]|Array of SketchFab links.
images|[Image Object  ](#schemaimage_object)[]|Array of image objects (a gallery).
» filename|string|Image filename including extension.
» original|string|URL to the full-sized image.
» thumb_320x180|string|URL to the image thumbnail.



## Mod Tag Object 

<a name="schemamod_tag_object"></a>

```json
{
  "name": "Unity",
  "date_added": 1499841487
} 
```

### Properties

Name|Type|Description
---|---|---|---|
name|string|Tag name.
date_added|integer(int32)|Unix timestamp of date tag was applied.



## Game Object

  <a name="schemagame_object"></a>

```json
{
  "id": 2,
  "submitted_by": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "date_online": 1509922961,
    "avatar": {
      "filename": "modio-dark.png",
      "original": "https://media.mod.io/images/global/modio-dark.png"
    },
    "timezone": "America/Los_Angeles",
    "language": "en",
    "profile_url": "https://mod.io/members/xant"
  },
  "date_added": 1493702614,
  "date_updated": 1499410290,
  "date_live": 1499841403,
  "presentation": 1,
  "submission": 0,
  "curation": 0,
  "community": 3,
  "revenue": 1500,
  "api": 3,
  "ugc_name": "map",
  "icon": {
    "filename": "modio-dark.png",
    "original": "https://media.mod.io/images/global/modio-dark.png",
    "thumb_320x180": "https://media.mod.io/images/global/modio-dark.png"
  },
  "logo": {
    "filename": "modio-dark.png",
    "original": "https://media.mod.io/images/global/modio-dark.png",
    "thumb_320x180": "https://media.mod.io/images/global/modio-dark.png",
    "thumb_640x360": "https://media.mod.io/images/global/modio-dark.png",
    "thumb_1280x720": "https://media.mod.io/images/global/modio-dark.png"
  },
  "header": {
    "filename": "demo.png",
    "original": "https://media.mod.io/images/global/modio-dark.png"
  },
  "homepage": "https://www.rogue-knight-game.com/",
  "name": "Rogue Knight",
  "name_id": "rogue-knight",
  "summary": "Rogue Knight is a brand new 2D pixel platformer.",
  "instructions": "Instructions on the process to upload mods.",
  "profile_url": "https://rogue-knight.mod.io",
  "tag_options": [
    {
      "name": "Theme",
      "type": "checkboxes",
      "tags": [
        "Horror"
      ],
      "admin_only": 0
    }
  ]
} 
```

### Properties

Name|Type|Description
---|---|---|---|
id|integer(int32)|Unique game id.
submitted_by|[User Object  ](#schemauser_object)|Contains user data.
» id|integer(int32)|Unique id of the user.
» name_id|string|URL path for the user on mod.io. Usually a simplified version of their username.
» username|string|Username of the user.
» date_online|integer(int32)|Unix timestamp of date the user was last online.
» avatar|[Avatar Object  ](#schemaavatar_object)|Contains avatar data.
»» filename|string|Avatar filename including extension.
»» original|string|URL to the full-sized avatar.
» timezone|string|Timezone of the user, format is country/city.
» language|string|2-character representation of users language preference.
» profile_url|string|URL to the user's mod.io profile.
date_added|integer(int32)|Unix timestamp of date registered.
date_updated|integer(int32)|Unix timestamp of date updated.
date_live|integer(int32)|Unix timestamp of date game was set live.
presentation|integer(int32)|Presentation style used on the mod.io website:<br><br>__0__ =  Grid View: Displays mods in a grid<br>__1__ = Table View: Displays mods in a table
submission|integer(int32)|Submission process modders must follow:<br><br>__0__ = Mod uploads must occur via a tool created by the game developers<br>__1__ = Mod uploads can occur from anywhere, including the website and API
curation|integer(int32)|Curation process used to approve mods:<br><br>__0__ = No curation: Mods are immediately available to play<br>__1__ = Paid curation: Only mods which accept donations must be accepted<br>__2__ = Full curation: All mods must be accepted by someone to be listed
community|integer(int32)|Community features enabled on the mod.io website:<br><br>__0__ = All of the options below are disabled<br>__1__ = Discussion board enabled<br>__2__ = Guides and news enabled<br>__?__ = Combine to find games with multiple options enabled (see [BITWISE filtering](#bitwise-and-bitwise-and))
revenue|integer(int32)|Revenue capabilities mods can enable:<br><br>__0__ = All of the options below are disabled<br>__1__ = Allow mods to be sold<br>__2__ = Allow mods to receive donations<br>__4__ = Allow mods to be traded<br>__8__ = Allow mods to control supply and scarcity<br>__?__ = Combine to find games with multiple options enabled (see [BITWISE filtering](#bitwise-and-bitwise-and))
api|integer(int32)|Level of API access allowed by this game:<br><br>__0__ = All of the options below are disabled<br>__1__ = This game allows 3rd parties to access the mods API<br>__2__ = This game allows mods to be downloaded directly without API validation<br>__?__ = Combine to find games with multiple options enabled (see [BITWISE filtering](#bitwise-and-bitwise-and))
ugc_name|string|Word used to describe user-generated content (mods, items, addons etc).
icon|[Icon Object  ](#schemaicon_object)|Contains icon data.
» filename|string|Icon filename including extension.
» original|string|URL to the full-sized icon.
» thumb_320x180|string|URL to the icon thumbnail.
logo|[Logo Object  ](#schemalogo_object)|Contains logo data.
» filename|string|Logo filename including extension.
» original|string|URL to the full-sized logo.
» thumb_320x180|string|URL to the small logo thumbnail.
» thumb_640x360|string|URL to the medium logo thumbnail.
» thumb_1280x720|string|URL to the large logo thumbnail.
header|[Header Object  ](#schemaheader_object)|Contains header data.
» filename|string|Header image filename including extension.
» original|string|URL to the full-sized header image.
homepage|string|Official homepage of the game.
name|string|Name of the game.
name_id|string|Subdomain for the game on mod.io.
summary|string|Summary of the game.
instructions|string|A guide about creating and uploading mods for this game to mod.io (applicable if submission = 0).
profile_url|string|URL to the game's mod.io page.
tag_options|[Game Tag Option Object](#schemagame_tag_option_object)[]|Groups of tags configured by the game developer, that mods can select.
» name|string|Name of the tag group.
» type|string|Can multiple tags be selected via 'checkboxes' or should only a single tag be selected via a 'dropdown'.
» admin_only|integer(int32)|Groups of tags flagged as 'admin only' should only be used for filtering, and should not be displayed to users.
» tags|string[]|Array of tags in this group.



## Game Tag Option Object

<a name="schemagame_tag_option_object"></a>

```json
{
  "name": "Theme",
  "type": "checkboxes",
  "tags": [
    "Horror"
  ],
  "admin_only": 0
} 
```

### Properties

Name|Type|Description
---|---|---|---|
name|string|Name of the tag group.
type|string|Can multiple tags be selected via 'checkboxes' or should only a single tag be selected via a 'dropdown'.
admin_only|integer(int32)|Groups of tags flagged as 'admin only' should only be used for filtering, and should not be displayed to users.
tags|string[]|Array of tags in this group.



## Metadata KVP Object 

<a name="schemametadata_kvp_object"></a>

```json
{
  "key": "pistol-dmg",
  "value": 800
} 
```

### Properties

Name|Type|Description
---|---|---|---|
key|string|The key of the key-value pair.
value|string|The value of the key-value pair.



## Rating Summary Object 

<a name="schemarating_summary_object"></a>

```json
{
  "total_ratings": 1230,
  "positive_ratings": 1047,
  "negative_ratings": 183,
  "percentage_positive": 91,
  "weighted_aggregate": 87.38,
  "display_text": "Very Positive"
} 
```

### Properties

Name|Type|Description
---|---|---|---|
total_ratings|integer(int32)|Number of times this item has been rated.
positive_ratings|integer(int32)|Number of positive ratings.
negative_ratings|integer(int32)|Number of negative ratings.
percentage_positive|integer(int32)|Number of positive ratings, divided by the total ratings to determine it’s percentage score.
weighted_aggregate|float|Overall rating of this item calculated using the [Wilson score confidence interval](http://www.evanmiller.org/how-not-to-sort-by-average-rating.html). This column is good to sort on, as it will order items based on number of ratings and will place items with many positive ratings above those with a higher score but fewer ratings.
display_text|string|Textual representation of the rating in format:<br><br>- Overwhelmingly Positive<br>- Very Positive<br>- Positive<br>- Mostly Positive<br>- Mixed<br>- Negative<br>- Mostly Negative<br>- Very Negative<br>- Overwhelmingly Negative



## Team Member Object 

<a name="schemateam_member_object"></a>

```json
{
  "id": 457,
  "user": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "date_online": 1509922961,
    "avatar": {
      "filename": "modio-dark.png",
      "original": "https://media.mod.io/images/global/modio-dark.png"
    },
    "timezone": "America/Los_Angeles",
    "language": "en",
    "profile_url": "https://mod.io/members/xant"
  },
  "level": 8,
  "date_added": 1492058857,
  "position": "Supreme Overlord"
} 
```

### Properties

Name|Type|Description
---|---|---|---|
id|integer(int32)|Unique team member id.
user|[User Object  ](#schemauser_object)|Contains user data.
» id|integer(int32)|Unique id of the user.
» name_id|string|URL path for the user on mod.io. Usually a simplified version of their username.
» username|string|Username of the user.
» date_online|integer(int32)|Unix timestamp of date the user was last online.
» avatar|[Avatar Object  ](#schemaavatar_object)|Contains avatar data.
»» filename|string|Avatar filename including extension.
»» original|string|URL to the full-sized avatar.
» timezone|string|Timezone of the user, format is country/city.
» language|string|2-character representation of users language preference.
» profile_url|string|URL to the user's mod.io profile.
level|integer(int32)|Level of permission the user has:<br><br>__0__ = Guest<br>__1__ = Member<br>__2__ = Contributor<br>__4__ = Manager<br>__8__ = Leader
date_added|integer(int32)|Unix timestamp of the date the user was added to the team.
position|string|Custom title given to the user in this team.



## User Object

  <a name="schemauser_object"></a>

```json
{
  "id": 1,
  "name_id": "xant",
  "username": "XanT",
  "date_online": 1509922961,
  "avatar": {
    "filename": "modio-dark.png",
    "original": "https://media.mod.io/images/global/modio-dark.png"
  },
  "timezone": "America/Los_Angeles",
  "language": "en",
  "profile_url": "https://mod.io/members/xant"
} 
```

### Properties

Name|Type|Description
---|---|---|---|
id|integer(int32)|Unique id of the user.
name_id|string|URL path for the user on mod.io. Usually a simplified version of their username.
username|string|Username of the user.
date_online|integer(int32)|Unix timestamp of date the user was last online.
avatar|[Avatar Object  ](#schemaavatar_object)|Contains avatar data.
» filename|string|Avatar filename including extension.
» original|string|URL to the full-sized avatar.
timezone|string|Timezone of the user, format is country/city.
language|string|2-character representation of users language preference.
profile_url|string|URL to the user's mod.io profile.





