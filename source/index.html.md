---
title: 'mod.io API v1'
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - javascript--nodejs: Node.JS
  - python: Python
  - java: Java
toc_footers:
  - >-
    <a href="https://mod.io/about">Find out more about
    mod.io</a>
includes: []
search: true
highlight_theme: darkula
headingLevel: '2'
---

# Getting Started

## mod.io API v1

Welcome to the official documentation for [mod.io](https://mod.io), an API for developers to add mod support to their games. We recommend you read our _Getting Started_ guide below to accurately and efficiently consume our REST API. 

__API path:__ [https://api.mod.io/v1](https://api.mod.io/v1)

__Current version:__ <select id="version_dropdown" onChange="changeVersion"><option value="" data-latest="true">v1 (latest)</option></select> 

<a href="/changelog"><span class="versionwrap">View Version Changelog</span></a>

## How It Works

Compatible with all builds of your game on all platforms and stores, mod.io is a clientless and standalone solution which gives you complete control over your modding ecosystem.

![mod.io Overview](https://static.mod.io/v1/images/home/sdk.png).

## Implementation

You have 3 options to get connected to the mod.io API which you can use interchangeably depending on your needs. Here's the breakdown of each option.

Option | Usage | Suited for | Docs
---------- | ---------- | ---------- | ---------
__API__ | For connecting directly to the mod.io REST API. | Web apps that need a JSON REST API, or game developers that like a challenge and want control over their implementation. | You are reading them
__SDK__ | Drop our [open source C/C++ SDK](https://sdk.mod.io) into your game to call mod.io functionality. | Developers that want a SDK that abstracts the uploading, downloading and unzip flows behind easy to use function calls. | [Here](https://sdk.mod.io)
__Tools/Plugins__ | Use tools, plugins and wrappers created by the community to make implementation in various engines easy. | Game developers that want a pre-built modding solution for their engine (Unity, Unreal, GameMaker, Construct) of choice. | Available below

Tools, plugins and wrappers made by the mod.io team and our awesome community | - | - | -
--- | --- | --- | ---
![Unity Plugin](images/tool-unity.png) | __Unity Plugin__<br />[SDK](https://github.com/modio/modio-unity)<br />[Getting Started](https://github.com/modio/modio-unity/wiki)<br /> | ![Unreal Plugin](images/tool-unreal.png) | __Unreal Plugin__<br />[SDK](https://github.com/modio/modio-ue4)<br />[Getting Started](https://github.com/modio/modio-ue4/wiki)<br />[Example](https://github.com/modio/modio-ue4-example)<br />
![C/C++ SDK](images/tool-ccpp.png) | __C/C++ SDK__<br />[SDK](https://github.com/modio/modio-sdk)<br />[Getting Started](https://github.com/modio/modio-sdk/wiki)<br />[Tutorials](https://github.com/modio/modio-sdk/tree/master/examples/code-samples)<br />  | ![Haxe Wrapper](images/tool-haxe.png) | __Haxe Wrapper__<br />[SDK](https://github.com/modio/modio-haxe)<br />[Getting Started](https://github.com/modio/modio-haxe)<br />[Tutorials](https://github.com/Turupawn/modioOpenFLExample#openfl-integration)<br />
![Rust Wrapper](images/tool-rust.png) | __Rust Wrapper__<br />[SDK](https://crates.io/crates/modio)<br />[Getting Started](https://github.com/nickelc/modio-rs)<br />[Tutorials](https://github.com/nickelc/modio-rs/tree/master/examples)<br /> | ![Python Wrapper](images/tool-python.png) | __Python Wrapper__<br />[SDK](https://github.com/ClementJ18/mod.io)<br />[Getting Started](https://github.com/ClementJ18/mod.io/#example)<br />[Tutorials](https://github.com/ClementJ18/mod.io/tree/master/examples)<br /> |<br />
![Construct 2](images/tool-c2.png) | __Construct 2 Plugin__<br />[SDK](https://github.com/modio/modio-construct2)<br />[Getting Started](https://github.com/modio/modio-construct2)<br /> | ![Command Line Tool](images/tool-cmd.png) | __Command Line Tool__<br />[CMD](https://github.com/nickelc/modiom)<br />[Getting Started](https://github.com/nickelc/modiom)<br />
![GameMaker Studio 2](images/tool-gm2.png) | __GameMaker Studio 2 Plugin__<br />[SDK](https://github.com/modio/modio-gamemaker2)<br />[Getting Started](https://github.com/modio/modio-gamemaker2)<br /> | ![Modio.NET](images/tool-dotnet.png) | __Modio.NET__<br />[SDK](https://github.com/nickelc/modio.net)<br />[Getting Started](https://github.com/nickelc/modio.net)<br />
![Discord Bot](images/tool-discordbot.png) | __Discord Bot__<br />[Instructions](https://github.com/modio/modio-discord-bot)<br />[Invite](https://discordbot.mod.io)<br /> | | 
Want a tool added to the list? [Contact us!](mailto:developers@mod.io?subject=Publish Tool)

Here is a brief list of the things to know about our API, as explained in more detail in the following sections.

- All requests to the API must be made over HTTPS (TLS).
- All API responses are in `application/json` format.
- Any POST request with a binary payload must supply the `Content-Type: multipart/form-data` header.
- Any non-binary POST, PUT and DELETE requests must supply the `Content-Type: application/x-www-form-urlencoded` header.
- Any non-binary payload can be supplied in JSON format using the `input_json` parameter. 

## Authentication

Authentication can be done via 4 ways:

- Request an [API key (Read Only Access)](https://mod.io/apikey/widget) - or get a [test environment](https://test.mod.io/apikey/widget) key
- Use the [Email Authentication Flow (Read + Write Access)](#authenticate-via-email) (to create an OAuth 2 Access Token via **email**)
- Use the [External App Tickets Flow (Read + Write Access)](#authenticate-via-steam) (to create an OAuth 2 Access Token automatically on popular platforms such as **Steam and GOG**)
- Manually create an [OAuth 2 Access Token (Read + Write Access)](https://mod.io/oauth/widget) - or create a [test environment](https://test.mod.io/oauth/widget) token

You can use these methods of authentication interchangeably, depending on the level of access you require.

Authentication Type | In | HTTP Methods | Abilities | Purpose
---------- | ---------- | ---------- | ---------- | ---------- 
API Key | Query | GET | Read-only GET requests and authentication flows. | Browsing and downloading content. Retrieving access tokens on behalf of users.
Access Token (OAuth 2) | Header | GET, POST, PUT, DELETE | Read, create, update, delete. | View, add, edit and delete content the authenticated user has subscribed to or has permission to change.

### API Key Authentication

To access the API authentication is required. All users and games get a private API key. It is quick and easy to use in your apps but limited to read-only GET requests, due to the limited security it offers. View your private API key(s) [on production](https://mod.io/apikey/widget) or on the [test environment](https://test.mod.io/apikey/widget).

### Web Overlay Authentication

At the moment it is not possible to open the mod.io website in-game with the user pre-authenticated, however you can provide a hint by appending `?ref=SERVICE` to the end of the URL. What this tells mod.io, is that when the user attempts to perform an action that requires authentication, they will be prompted to login with their `SERVICE` account. For example if you want to take a mod creator to their mod edit page in-game on Steam, the URL would look something like: `https://gamename.mod.io/modname/edit?ref=steam`. You can optionally add `&login=auto` as well to automatically start the login process. Services supported are **steam**, **xbox**, **itchio**, **facebook**, **google** and **email**. 

### Scopes (OAuth 2)

mod.io allows you to specify the permission each access token has (default is _read+write_), this is done by the use of scopes. See below for a full list of scopes available, you must include at least one scope when generating a new token.

Scope | Abilities
---------- | ----------
`read` | When authenticated with a token that *only* contains the `read` scope, you will only be able to read data via GET requests. 
`write` | When authenticated with a token that contains the `write` scope, you are able to add, edit and remove resources.
`read+write` | The above scopes combined. _Default for email and external ticket verification flow._

## Making Requests

Requests to the mod.io API are to be over HTTPS (Port 443), any requests made over HTTP will return a `400 Bad Request` response.

### Using an API Key

```
curl -X get https://api.mod.io/v1/games?api_key=xxxxxxxxxxxxxxxx
``` 

To authenticate using your unique 32-character API key, append the `api_key=xxxxxxxxxxxxxxxx` parameter to the end of your request. Remember that using an API key means requests are read-only, if you want to create, update or delete resources - authentication via OAuth 2 is required which you can [set up with your api key](#authentication).

### Using an Access Token

```shell
// Example POST request with no binary files

curl -X POST https://api.mod.io/v1/games/1/mods/1/tags \
  -H 'Authorization: Bearer your-token-here' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'tags[]=Unity' \
  -d 'tags[]=FPS'
```

To authenticate using an OAuth 2 access token, you must include the HTTP header `Authorization` in your request with the value Bearer *your-token-here*. Verification via Access Token allows much greater power including creating, updating and deleting resources that you have access to. Also because OAuth 2 access tokens are tied to a user account, you can personalize the output by viewing content they are subscribed and connected to via the [me endpoint](#me) and by using relevant filters.

### Access Token Lifetime & Expiry

By default, all access token's are long-lived - meaning they are valid for a common year (not leap year) from the date of issue. You should architect your application to smoothly handle the event in which a token expires or is revoked by the user themselves or a mod.io admin, triggering a `401 Unauthorized` API response.

If you would like tokens issued through your game to have a shorter lifespan, you can do this by providing the `date_expires` parameter on any endpoint that returns an access token such as the [Email Exchange](#authentication), [Authenticate via Steam](#authenticate-via-steam) and [Authenticate via GOG Galaxy](#authenticate-via-gog-galaxy) endpoints. If the parameter is not supplied, it will default to 1 year from the request date, if the supplied parameter value is above one year or below the current server time it will be ignored and the default value restored.

### Request Content-Type

If you are making a request that includes a file, your request `Content-Type` header __must__ be `multipart/form-data`, otherwise if the request contains data (but no files) it should be `application/x-www-form-urlencoded`, which is UTF-8 encoded. 

```shell
// Example POST request with binary file

curl -X POST https://api.mod.io/v1/games/1/mods \
  -H 'Authorization: Bearer your-token-here' \
  -H 'Content-Type: multipart/form-data' \ 
  -F 'logo=@path/to/image.jpg' \
  -F 'name=Rogue Knight Clear Skies' \
  -F 'homepage=http://www.clearsies-rk.com/' \
  -F 'summary=It rains in Rogue Knight an awful lot, want sunshine all the time? Yeah you do.'
```

Body Contains | Method | Content-Type
---------- | ------- | -------
Binary Files | POST | `multipart/form-data`
Non-Binary Data | POST, PUT, DELETE | `application/x-www-form-urlencoded`
Nothing | GET | No `Content-Type` required.

If the endpoint you are making a request to expects a file it will expect the correct `Content-Type` as mentioned. Supplying an incorrect `Content-Type` header will return a `415 Unsupported Media Type` response.

### JSON Request Data

```shell
// Example json-encoded POST request 

curl -X POST https://api.mod.io/v1/games/1/team \
  -H 'Authorization: Bearer your-token-here' \
  -H 'Content-Type: application/x-www-form-urlencoded' \  
  -d 'input_json={
		"member": "patrick@diabolical.com",
		"level": 8,
		"position": "King in the North"
	  }'
```

For POST & PUT requests that do _not submit files_ you have the option to supply your data as HTTP POST parameters, or as a _UTF-8 encoded_ JSON object inside the parameter `input_json` which contains all payload data. Regardless, whether you use JSON or not the `Content-Type` of your request still needs to be `application/x-www-form-urlencoded` with the data provided in the body of the request.

__NOTE:__ If you supply identical key-value pairs as a request parameter and also as a parameter in your JSON object, the JSON object will take priority.

### Response Content-Type

Responses will __always__ be returned in `application/json` format.

## Response Codes

Here is a list of the most common HTTP response codes you will see while using the API.

Response Code | Meaning
---------- | -------
`200` | OK -- Your request was successful.
`201` | Created -- Resource created, inspect Location header for newly created resource URL.
`204` | No Content -- Request was successful and there was no data to be returned.
`400` | Bad Request -- Server cannot process the request due to malformed syntax or invalid request message framing.
`401` | Unauthorized -- Your API key/access token is incorrect, revoked, or expired.
`403` | Forbidden -- You do not have permission to perform the requested action.
`404` | Not Found -- The requested resource could not be found.
`405` | Method Not Allowed -- The method of your request is incorrect.
`406` | Not Acceptable -- You supplied or requested an incorrect Content-Type.
`410` | Gone -- The requested resource is no longer available.
`422` | Unprocessable Entity -- The request was well formed but unable to be followed due to semantic errors.
`429` | Too Many Requests -- You have made too [many requests](#rate-limiting), inspect headers for reset time.
`500` | Internal Server Error -- The server encountered a problem processing your request. Please try again. (rare)
`503` | Service Unavailable -- We're temporarily offline for maintenance. Please try again later. (rare)


## Errors

```json
// Error object

"error": {
	"code": 403,
	"error_ref": "15024",
	"message": "You do not have the required permissions to access this resource."
}
```

If an error occurs, mod.io returns an error object with the HTTP `code`, `error_ref` and `message` to describe what happened and when possible how to avoid repeating the error. It's important to know that if you encounter errors that are not server errors (`500`+ codes) - you should review the error message before continuing to send requests to the endpoint.

When requests contain invalid input data or query parameters (for filtering), an optional field object called `errors` can be supplied inside the `error` object, which contains a list of the invalid inputs. The nested `errors` object is only supplied with `422 Unprocessable Entity` responses. Be sure to review the [Response Codes](#response-codes) to be aware of the HTTP codes that the mod.io API returns.

```json
// Error object with input errors

"error": {
	"code": 422,
	"error_ref": 13009,
	"message": "Validation Failed. Please see below to fix invalid input.",
	"errors": {
		"summary":"The mod summary cannot be more than 200 characters long.",
	}
}

```

Remember that [Rate Limiting](#rate-limiting) applies whether an error is returned or not, so to avoid exceeding your daily quota be sure to always investigate error messages - instead of continually retrying.

## Error Codes

Along with generic [HTTP response codes](#response-codes), we also provide mod.io specific error codes to help you better understand what has gone wrong with a request. Below is a list of the most common `error_ref` codes you could encounter when consuming the API, as well as the reason for the error occuring. For error codes specific to each endpoint, click the 'Show All Responses' dropdown on the specified endpoint documentation.

```shell
// Example request with malformed api_key 

curl -X GET https://api.mod.io/v1/games?api_key=malformed_key
```

```json
{
    "error": {
        "code": 401,
        "error_ref": 11001,
        "message": "We cannot complete your request due to a malformed/missing api_key in your request. Refer to documentation at https://docs.mod.io"
    }
}
```

Error Reference Code | Meaning
---------- | -------
`10003` | API version supplied is invalid.
`11000` | api_key is missing from your request.
`11001` | api_key supplied is malformed.
`11002` | api_key supplied is invalid.
`11003` | Access token is missing the write scope to perform the request.
`11004` | Access token is missing the read scope to perform the request.
`11005` | Access token is expired, or has been revoked.
`13005` | The Content-Type header is missing from your request.
`13006` | The Content-Type header is not supported for this endpoint.
`11006` | Authenticated user account has been deleted.
`11007` | Authenticated user account has been banned by mod.io admins.
`14001` | The requested game could not be found.
`14006` | The requested game has been deleted.
`15022` | The requested mod could not be found.
`15023` | The requested mod has been deleted.
`15010` | The requested modfile could not be found.
`15026` | The requested comment could not be found.
`21000` | The requested user could not be found.
`14000` | The requested resource does not exist.
`11008` | You have been ratelimited for making too many requests. See [Rate Limiting](#rate-limiting).
`13009` | The request contains validation errors for the data supplied. See the attached `errors` field within the [Error Object](#error-object) to determine which input failed.
`13007` | You have requested a response format that is not supported (JSON only).
`13001` | The submitted binary file is corrupted.
`13002` | The submitted binary file is unreadable.
`13004` | You have used the `input_json` parameter with semantically incorrect JSON.
`10001` | Cross-origin request forbidden.
`10002` | mod.io failed to complete the request, please try again. (rare)
`10000` | mod.io is currently experiencing an outage. (rare)

## Response Formats
```json
// Single object response

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
    "metadata_blob": "rogue,hd,high-res,4k,hd-textures",
    "download": {
      "binary_url": "https://mod.io/mods/file/1/",
      "date_expires": 1579316848
    }
}
```

The way in which mod.io formats responses is entirely dependant on whether the requesting endpoint is returning a single item or a collection of items.

### Single item Responses

For single items, mod.io returns a __single JSON object__ which contains the requested resource. There is no nesting for single responses.

### Multiple item Responses

Endpoints that return more than one result, return a __JSON object__ which contains a data array and metadata fields:

- `data` - contains all data returned from the request.
- metadata fields - contains [pagination metadata](#pagination) to help you paginate through the API.

```json
// Multiple objects response

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
    		"metadata_blob": "rogue,hd,high-res,4k,hd-textures",
    		"download": {
    		  "binary_url": "https://mod.io/mods/file/1/",
    		  "date_expires": 1579316848
    		}
		},
		{
			...
		},
	],
	"result_count": 100,
	"result_limit": 100,
	"result_offset": 0,
	"result_total": 127
}  
```

## Status & Visibility

To manage games and mods via the API we use the fields `status` and `visible`. The values of these fields determines what is returned in API requests, so it is important to understand who is authorized to view what content.

### Visible attribute states & privileges

Only mods use the `visible` attribute allowing mod admins to control their availability. Public is the _default value_:

Meaning | Value | Description | Modify Authorization | Filter Authorization
---------- | ------- | ---------- | ------- | ----------
Hidden | 0 | Resource is hidden and not returned when browsing.<br><br>If requested directly it will be returned provided the user is an admin or subscribed to the content. All resources are always returned via the [/me](#me) endpoints. | Game & Mod Admins | Game & Mod Admins
Public | 1 | Resource is visible and returned via all endpoints. | Game & Mod Admins | Everyone

### Status attribute states & privileges

Games and mods use the `status` attribute allowing game admins to control their availability. For mods this is important because it allows game admins to control which mods are available without changing the `visible` value set by the mod admin. Not accepted is the _default value_ until changed by a game admin, or if a file is added to a mods profile it will be moved to an accepted state (provided the game developer has elected _"not to curate"_ new mods):

Meaning | Value | Description | Modify Authorization | Filter Authorization
---------- | ------- | ------- | ------- | ----------
Not Accepted | 0 | Resource is not accepted and not returned when browsing.<br><br>Games will be returned if requested [directly](#get-game) provided the user is an admin or the `api_key` used belongs to the game.<br><br>Mods will be returned if requested [directly](#get-mod) provided the user is an admin or subscribed to the content. All resources are always returned via the [/me](#me) endpoints. | Game Admins Only | Game Admins Only
Accepted | 1 | Resource is accepted and returned via all endpoints. | Game Admins Only | Everyone
Deleted | 3 | Resource is deleted and only returned via the [/me](#me) endpoints. | Game Admins Only | Game Admins Only

### Game admin privileges

As a game admin, you can modify your games `status` to show or hide it from API requests. When a game is not accepted _you_ can still view it provided you are the games admin or using the games `api_key`. You can call [Get User Games endpoint](#get-user-games) to retrieve all games associated with the authenticated user regardless of their `status`.

By default mods connected to a game will not be returned if they are hidden or not accepted. As a game admin, you can modify a mods `status` and `visible` fields and filter by these values (to view content normal users cannot see). __We recommend__ you only change the `status` and let mod admins control the `visible` field.

### Mod admin privileges

As a mod admin, you can modify `visible` to show or hide your mod from API requests. You _cannot_ modify the `status` of your mod. When a mod is hidden _you_ can still view it provided you are the mods admin or subscribed to the mod. You can call [Get User Mods endpoint](#get-user-mods) to retrieve all mods associated with the authenticated user regardless of their `status` and `visible`.

```
// Valid status & visibility filters

status=1
status-in=0,1
visible=1 
visible-in=0,1

// Game Admin Only status & visibility filters

status-not-in=1,2
status-gt=1
visible-not-in=1
visible-st=1

```

### Important Note When Filtering

Due to the requirement of certain `status` & `visible` values only being available to administrators. We have restricted the amount of [filters](#filtering) available for _non-game admins_ and thus for both of these fields _only_ direct matches __=__ and __-in__ are permitted. Attempting to apply game admin filters without the required permissions will result in a `403 Forbidden` [error response](#error-object).

## Pagination

When requesting data from endpoints that contain more than one object, you can supply an `_offset` and `_limit` to paginate through the results. Think of it as a page 1, 2, 3... system but you control the number of results per page, and the page to start from. Appended to each response will be the pagination metadata:

```json
// Metadata example
"result_count": 100,
"result_limit": 100,
"result_offset": 0,
"result_total": 127
```

Parameter | Value
---------- | ----------  
`result_count` | Number of results returned in the current request.
`result_limit` | Maximum number of results returned. Defaults to _100_ unless overridden by `_limit`.
`result_offset` | Number of results skipped over. Defaults to _0_ unless overridden by `_offset`.
`result_total` | Total number of results found.

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

Use `_offset` to skip over the specified number of results, regardless of the data they contain. This works the same way offset does in a SQL query:

- `?_offset=30` - Will retrieve 100 results after ignoring the first 30 (31 - 130).

### Combining offset with a limit

```
v1/games?_offset=30&_limit=5
```

You can combine offset with a limit to build queries that return exactly the number of results you want:

- `?_offset=30&_limit=5` - Will retrieve 5 results after ignoring the first 30 (31 - 35).

If the `result_count` parameter matches the `result_limit` parameter (5 in this case) in the response, that means there are probably more results to get, so our next query might be:

 - `?_offset=35&_limit=5` - Will retrieve the next 5 results after ignoring the first 35 (36 - 40).

## Sorting

All endpoints are sorted by the `id` column in ascending order by default (oldest first). You can override this by including a `_sort` with the column you want to sort by in the request. You can sort on all columns __in the parent object only__. You cannot sort on columns in nested objects, so if a game contains a tags object you cannot sort on the `tag name` column, but you can sort by the games `name` since the games `name` resides in the parent object.

__NOTE:__ Some endpoints like [Get Mods](#get-mods) have special sort columns like `popular`, `downloads`, `rating` and `subscribers` which are documented alongside the filters.

### _sort (Sort)

```
v1/games?_sort=name
```

Sort by a column, in ascending or descending order.

- `?_sort=name` - Sort `name` in ascending order

- `?_sort=-name` - Sort `name` in descending order (by prepending a `-`)

## Filtering

mod.io has powerful filtering available to assist you when making requests to the API. You can filter on all columns __in the parent object only__. You cannot apply filters to columns in nested objects, so if a game contains a tags object you cannot filter by the `tag name` column, but you can filter by the games `name` since the games `name` resides in the parent object.

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

The simplest filter you can apply is `columnname` equals. This will return all rows which contain a column matching the value provided. 

- `?id=10` - Get all results where the `id` column value is _10_.

### -not (Not Equal To)

```
v1/games?curation-not=1
```

Where the preceding column value does not equal the value specified.

- `?curation-not=1` - Where the `curation` column does not equal 1.

### -lk (Like + Wildcards)

```
v1/games?name-lk=texture

v1/games?name-lk=texture*

v1/games?name-lk=*texture*
```

Where the string supplied matches the preceding column value. This is equivalent to SQL's `LIKE`. Wildcard's `*` can be used to find content that partially matches as described below.

- `?name-lk=texture` - Get all results where the `name` column value is 'texture'.
- `?name-lk=texture*` - Get all results where the `name` column value begins with 'texture'. This means the query would return results for 'texture', 'textures' and 'texture pack'
- `?name-lk=*texture*` - Get all results where the `name` column value contains 'texture'. This means the query would return results for 'texture', 'HD textures' and 'armor texture pack' 

### -not-lk (Not Like + Wildcards)

```
v1/games?name-not-lk=dungeon
```

Where the string supplied does not match the preceding column value. This is equivalent to SQL's `NOT LIKE`. Wildcard's `*` can be used as described above.

- `?name-not-lk=dungeon` - Get all results where the `name` column value is not 'dungeon'.

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

### -max (Smaller Than or Equal To)

```
v1/games?game-max=40
```

Where the preceding column value is smaller than or equal to the value specified.

- `?game-max=40` - Get all results where the `game` smaller than or equal to 40.  

### -min (Greater Than or Equal To)

```
v1/games?game-min=20
```

Where the preceding column value is greater than or equal to the value specified.

- `?game-min=20` - Get all results where the `game` column is greater than or equal to 20.

### -bitwise-and (Bitwise AND)

```
v1/games?maturity_option-bitwise-and=5
```

Some columns are stored as bits within an integer. Their value depends on the bits selected. For example, suppose a column has 4 options:

- 1 = Option A
- 2 = Option B
- 4 = Option C
- 8 = Option D

You can combine any of these options by adding them together which means there are (2 ^ 4 = 16 possible combinations). For example Option A (1) and Option C (4) would be (1 + 4 = 5), Option A (1), Option C (4) and Option D (8) would be (1 + 4 + 8 = 13), all Options together would be (1 + 2 + 4 + 8 = 15).

The number of combinations makes using _equals_, _in_ and other filters a little complex. To solve this we support Bitwise AND (&) which makes it easy to match a column which contains any of the options you want.

- `?maturity_option-bitwise-and=5` - Will match the `maturity_option` column values 1, 3, 4, 5, 6, 7, 9, 11, 12, 13, 14, 15 (since these values contain the bits 1, 4 or both).

## Localization

### Localized Responses

```
Example HTTP Header Request
---------------------
HTTP/2.0 200 OK
...
...
Accept-Language: de
```

```json
Example response (assuming a validation error occurred)

{
    "error": {
        "code": 422,
        "message": "Überprüfung fehlgeschlagen. Bitte lesen Sie unten, um ungültige Eingaben zu korrigieren:",
        "errors": {
            "name": "Name darf maximal 50 Zeichen haben."
        }
    }
}
```

The mod.io API provides localization for a collection of languages. To specify responses from the API to be in a particular language, simply provide the `Accept-Language` header with an [ISO 639 compliant](https://www.iso.org/iso-639-language-codes.html) language code. If a valid language code is not provided and the user is authenticated, the language they have selected in their profile will be used. All other requests will default to English (US). The list of supported codes includes:

Language Code | Language
---------- | ----------  
`en` | English (US) _default_
`bg` | Bulgarian
`fr` | French
`de` | German
`it` | Italian
`pl` | Polish
`pt` | Portuguese
`hu` | Hungarian
`ja` | Japanese
`ko` | Korean
`ru` | Russian
`es` | Spanish
`th` | Thai
`zh-CN` | Chinese (Simplified)
`zh-TW` | Chinese (Traditional)

```shell
// Example request updating specified fields with Polish translations. 

curl -X POST https://api.mod.io/v1/games/1/mods/1 \
	-H 'Authorization: Bearer your-token-here' \
	-H 'Content-Type: application/x-www-form-urlencoded' \
	-H 'Content-Language: pl' \
	-d 'name=Zaawansowany rozkwit Wiedźmina' \
	-d 'summary=Zobacz zaawansowany mod oświetlenia w Kaer Morhen w zupełnie nowym świetle' 

// Attempt to retrieve Polish translations within supported fields.

curl -X GET https://api.mod.io/v1/games/1/mods/1 \
	-H 'Authorization: Bearer your-token-here' \
	-H 'Accept-Language: pl'
```

__NOTE__: Localization for mod.io is currently a work-in-progress and thus not all responses may be in the desired language.

```json
// Response

{
	"id": 1,
	"game_id": 1,
	...
	"name": "Zaawansowany rozkwit Wiedźmina", 
	"summary": "Zobacz zaawansowany mod oświetlenia w Kaer Morhen w zupełnie nowym świetle"
}
```

### Localized Requests

Specific endpoints also allow you to submit fields in the supported languages above. To tell the API you are submitting
non-english content you must supply the `Content-Language` header in the request with a valid language code (see above). When you supply the `Content-Language` header in your request, you are explicitly indicating to the API that all eligible fields have been translated into the supplied language and if a user (or client) requests the respective language, the value for that supplied field will be returned.

A brief summary when dealing with localized requests and responses:

- English is still required as the default value when creating and updating a resource.
- If you don't supply a valid `Content-Language` header value, all input data will be assumed English.
- If you don't supply a valid `Accept-Language` header value, all response data will be in English.
- If you supply a valid `Accept-Language` header value, all response data will be in English unless translations exist in the requested language.
- Only fields that contain the <a href="#" class="tooltip-localization icon">localization icon</a> in the parameter section of the endpoint can be submitted in different languages.

## Rate Limiting

mod.io implements rate limiting to stop users abusing the service. Exceeding your rate limit will result in requests receiving a `429 Too Many Requests` response until your reset time is reached. 

It is _highly recommended_ you architect your app to check for the `X-RateLimit` headers below and the `429 Too Many Requests` HTTP response code to ensure you are not making too many requests, or continuing to make requests after a `429` code is repeatedly returned. Users who continue to send requests despite a `429` response could potentially have their credentials revoked. The following limits are implemented by default:

### API key Rate Limiting

```http
Example HTTP Header Response
---------------------
HTTP/1.1 200 OK
...
...
X-RateLimit-Limit: 120
X-RateLimit-Remaining: 87
```

- API keys linked to a user have __60 requests per minute__.
- API keys linked to a game have __unlimited requests__.

### OAuth2 Rate Limiting

- Users tokens are limited to __60 requests per minute__. 

### Headers

mod.io returns the following headers in each request to inform you of your limit & remaining requests until reset.

 - `X-RateLimit-Limit` - Number of requests you can make from the supplied API key/access token per minute.
 - `X-RateLimit-Remaining` - Number of requests remaining until requests are rejected.
 - `X-RateLimit-RetryAfter` - Amount of seconds until reset once you have been throttled (Only returned once rate limit exceeded).

### Optimize your requests

You should always plan to minimize requests and cache API responses. It will make your app feel fluid and fast for your users. If your usage is excessive we shall reach out to discuss ways of optimizing, but our aim is to never restrict legitimate use of the API. We have set high limits that should cover 99% of use-cases, and are happy to [discuss your scenario](mailto:developers@mod.io?subject=API%20usage) if you require more.

## Testing

To help familiarize yourself with the mod.io API and to ensure your implementation is battle-hardened and operating as intended, we have setup a test sandbox which is identical to the production environment. The test sandbox allows you to make requests to the API whilst your integration is a work in progress and the submitted data is not important. When you are ready to go live it's as easy as adding your game to the production environment, substituting the test API URL for the production API URL, and updating the `api_key` and `game_id` you are using to the values from your games profile on production. 

To begin using the test sandbox you will need to [register a test account](https://test.mod.io/members/register) and [add your game](https://test.mod.io/games/add). You will only see games you are a team member of and there is no connection between the data added to the test environment and production. We highly recommend you use the test environment when integrating as it allows you to keep your development private, and you can submit as much dummy data as you need to try the functionality required, without having to clean it up at the end.

__Test version:__ `v1`

__Test site:__ [https://test.mod.io](https://test.mod.io)

__Test API path:__ [https://api.test.mod.io/v1](https://api.test.mod.io/v1)

__NOTE__: We periodically reset the test environment to default - with the exception of user accounts so please do not rely on it to store important information. Any data you intend on persisting should be submitted to the production environment.

## Whitelabel

If you are a large studio or publisher and require a private, in-house, custom solution that accelerates your time to market with a best-in-class product, reach out to [developers@mod.io](mailto:developers@mod.io?subject=Whitelabel%20license) to discuss the licensing options available.

## Contact

If you spot any errors within the mod.io documentation, have feedback on how we can make it easier to follow or simply want to discuss how awesome mods are, feel free to reach out to [developers@mod.io](mailto:developers@mod.io?subject=API) or come join us in our [discord channel](https://discord.mod.io). We are here to help you grow and maximise the potential of mods in your game.
# Authentication
## Authenticate via Email

To perform writes, you will need to authenticate your users via OAuth 2. To make this frictionless in-game, we offer an email verification system, similar to what Slack and others pioneered. It works by users supplying their email, which we send a time-limited 5 digit security code too. They exchange this code in-game, for an [OAuth 2 access token](https://mod.io/oauth/widget) you can save to authenticate future requests. The benefit of this approach is it avoids complex website redirects, doesn't require your users to complete a slow registration flow, and eliminates the need to store usernames / passwords.

![mod.io Email Authentication Flow](https://static.mod.io/v1/images/home/email.png)

```shell
// Example POST requesting security code be sent to supplied email

curl -X POST https://api.mod.io/v1/oauth/emailrequest \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'api_key=0d0ba6756d032246f1299f8c01abc424'	\
  -d 'email=john.snow@westeros.com'
```

```json
// Authentication Code Request Response

{
	"code": 200,
	"message": "Enter the 5-digit security code sent to your email address (john.snow@westeros.com)"
}
```

**Step 1: Requesting a security code**

Request a `security_code` be sent to the email address of the user you wish to authenticate: 


`POST /oauth/emailrequest`

Parameter |Type | Required | Value
---------- | ---------- |---------- | ----------
api_key | string | true | Your API key generated from 'API' tab within your game profile.
email | string | true | A valid and secure email address your user has access to. 

**Step 2: Exchanging security code for access token**

After retrieving the 5-digit `security_code` sent to the email specified, you exchange it for an OAuth 2 `access_token`:

```shell
// Example POST requesting access token with security code

curl -X POST https://api.mod.io/v1/oauth/emailexchange \
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


`POST /oauth/emailexchange`

Parameter | Type | Required | Value
---------- | ---------- | ---------- | ----------  
api_key | string | true | Your API key generated from 'API' tab within your game profile.
security_code | string | true | Unique 5-digit code sent to the email address supplied in the previous request. 
date_expires | integer || Unix timestamp of date in which the returned token will expire. Value cannot be higher than the default value which is a common year (unix timestamp + 31536000 seconds). Using a token after it's expiry time has elapsed will result in a `401 Unauthorized` response.

There are a few important things to know when using the email authentication flow:
 
- An `api_key` is required for both steps of the authentication process.
- The _same_ `api_key` must be used for both steps.
- The generated `security_code` is short-lived and will expire after 15 minutes.
- Once exchanged for an `access_token`, the `security_code` is invalid.

If you do not exchange your `security_code` for an `access_token` within 15 minutes of generation, you will need to begin the flow again to receive another code.

**Step 3: Use access token to access resources**

See [Making Requests](#making-requests) section.

**HINT:** If you want to overlay the mod.io site in-game and you authenticate users via email, we recommend you add `?ref=email` to the end of the URL you open which will prompt the user to login via their email. See [Web Overlay Authentication](#web-overlay-authentication) for details.



## Authenticate via Steam

> Example request

```shell
# You can also use wget
curl -X POST https://api.mod.io/v1/external/steamauth?api_key=YourApiKey \
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  --data-urlencode 'appdata=NDNuZmhnaWdyaGdqOWc0M2o5eTM0aGc='

```

```http
POST https://api.mod.io/v1/external/steamauth?api_key=YourApiKey HTTP/1.1
Host: api.mod.io
Content-Type: application/x-www-form-urlencoded
Accept: application/json

```

```javascript
var headers = {
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/external/steamauth',
  method: 'post',
  data: '?api_key=YourApiKey',
  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

```javascript--nodejs
const request = require('node-fetch');
const inputBody = '{
  "appdata": "NDNuZmhnaWdyaGdqOWc0M2o5eTM0aGc="
}';
const headers = {
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://api.mod.io/v1/external/steamauth?api_key=YourApiKey',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```python
import requests
headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Accept': 'application/json'
}

r = requests.post('https://api.mod.io/v1/external/steamauth', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/external/steamauth?api_key=YourApiKey");
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

`POST /external/steamauth`

Request an access token on behalf of a Steam user. To use this functionality you *must* add your games [encrypted app ticket key](https://partner.steamgames.com/apps/sdkauth) from Steamworks, to the *Edit > Options* page of your games profile on mod.io. A Successful request will return an [Access Token Object](#access-token-object).<br/><br/>__HINT:__ If you want to overlay the mod.io site in-game on Steam, we recommend you add `?ref=steam` to the end of the URL you open which will prompt the user to login with Steam. See [Web Overlay Authentication](#web-overlay-authentication) for details.

     Parameter|Type|Required|Description
     ---|---|---|---|
     appdata|base64-encoded string|true|The Steam users [Encrypted App Ticket](https://partner.steamgames.com/doc/features/auth#encryptedapptickets) provided by the Steamworks SDK. <br><br>Parameter content *MUST* be the [*uint8 *rgubTicketEncrypted*](https://partner.steamgames.com/doc/api/SteamEncryptedAppTicket) returned after calling [ISteamUser::GetEncryptedAppTicket()](https://partner.steamgames.com/doc/api/ISteamUser#GetEncryptedAppTicket) within the Steamworks SDK, converted into a base64-encoded string.<br><br>__NOTE:__ Due to a base64-encoded string containing special characters, you must URL encode the string after it has been base64-encoded to ensure it is successfully sent to our servers otherwise you may encounter an `422 Unprocessable Entity` response. For example, [cURL](https://ec.haxx.se/http-post.html) will do this for you by using the `--data-urlencode` option.
     email|string||The users email address. If supplied, and the respective user does not have an email registered for their account we will send a confirmation email to confirm they have ownership of the specified email.<br><br>__NOTE__: If the user already has an email on record with us, this parameter will be ignored. This parameter should also be urlencoded before the request is sent.
     date_expires|integer||Unix timestamp of date in which the returned token will expire. Value cannot be higher than the default value which is a common year (unix timestamp + 31536000 seconds). Using a token after it's expiry time has elapsed will result in a `401 Unauthorized` response.


> Example response

```json
{
  "code": 200,
  "access_token": "eyJ0eXAiOiXKV1QibCJhbLciOiJeiUzI1.....",
  "date_expires": 1570673249
}

```
<h3 id="Authenticate-via-Steam-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Access Token Object](#schemaaccess_token_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|14001|The game associated with the supplied api_key is currently not available.|[Error Object](#schemaerror_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11018|The steam encrypted app ticket was invalid.|[Error Object](#schemaerror_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11032|mod.io was unable to verify the credentials against the external service provider.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11016|The api_key supplied in the request must be associated with a game.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11017|The api_key supplied in the request is for test environment purposes only and cannot be used for this functionality.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11019|The secret steam app ticket associated with this game has not been configured.|[Error Object](#schemaerror_object)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>
</aside>
## Authenticate via GOG Galaxy

> Example request

```shell
# You can also use wget
curl -X POST https://api.mod.io/v1/external/galaxyauth?api_key=YourApiKey \
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  --data-urlencode 'appdata=GCL671bwZ/+zUeOWc0M'

```

```http
POST https://api.mod.io/v1/external/galaxyauth?api_key=YourApiKey HTTP/1.1
Host: api.mod.io
Content-Type: application/x-www-form-urlencoded
Accept: application/json

```

```javascript
var headers = {
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/external/galaxyauth',
  method: 'post',
  data: '?api_key=YourApiKey',
  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

```javascript--nodejs
const request = require('node-fetch');
const inputBody = '{
  "appdata": "GCL671bwZ/+zUeOWc0M"
}';
const headers = {
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://api.mod.io/v1/external/galaxyauth?api_key=YourApiKey',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```python
import requests
headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Accept': 'application/json'
}

r = requests.post('https://api.mod.io/v1/external/galaxyauth', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/external/galaxyauth?api_key=YourApiKey");
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

`POST /external/galaxyauth`

Request an access token on behalf of a GOG Galaxy user. To use this functionality you *must* add your games [encrypted app ticket key](https://devportal.gog.com/welcome) from GOG Galaxy, to the *Edit > Options* page of your games profile on mod.io. A Successful request will return an [Access Token Object](#access-token-object).

     Parameter|Type|Required|Description
     ---|---|---|---|
     appdata|string|true|The GOG Galaxy users [Encrypted App Ticket](https://cdn.gog.com/open/galaxy/sdk/1.133.3/Documentation/classgalaxy_1_1api_1_1IUser.html#a352802aab7a6e71b1cd1b9b1adfd53d8) provided by the GOG Galaxy SDK. <br><br>Parameter content *MUST* be the encrypted string returned in the buffer after calling [IUser::GetEncryptedAppTicket()](https://cdn.gog.com/open/galaxy/sdk/1.133.3/Documentation/classgalaxy_1_1api_1_1IUser.html#a96af6792efc260e75daebedca2cf74c6) within the Galaxy SDK. Unlike the [Steam Authentication](#authenticate-via-steam) endpoint, you do not need to encode the encrypted string as this is already done by the Galaxy SDK.<br><br>__NOTE:__ Due to the encrypted app ticket containing special characters, you must URL encode the string before sending the request to ensure it is successfully sent to our servers otherwise you may encounter an `422 Unprocessable Entity` response. For example, [cURL](https://ec.haxx.se/http-post.html) will do this for you by using the `--data-urlencode` option.
     email|string||The users email address. If supplied, and the respective user does not have an email registered for their account we will send a confirmation email to confirm they have ownership of the specified email.<br><br>__NOTE__: If the user already has an email on record with us, this parameter will be ignored. This parameter should also be urlencoded before the request is sent.
        date_expires|integer||Unix timestamp of date in which the returned token will expire. Value cannot be higher than the default value which is a common year (unix timestamp + 31536000 seconds). Using a token after it's expiry time has elapsed will result in a `401 Unauthorized` response.


> Example response

```json
{
  "code": 200,
  "access_token": "eyJ0eXAiOiXKV1QibCJhbLciOiJeiUzI1.....",
  "date_expires": 1570673249
}

```
<h3 id="Authenticate-via-GOG-Galaxy-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Access Token Object](#schemaaccess_token_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|14001|The game associated with the supplied api_key is currently not available.|[Error Object](#schemaerror_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11021|The galaxy encrypted app ticket was invalid.|[Error Object](#schemaerror_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11032|mod.io was unable to verify the credentials against the external service provider.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11016|The api_key supplied in the request must be associated with a game.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11017|The api_key supplied in the request is for test environment purposes only and cannot be used for this functionality.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11022|The secret galaxy app ticket associated with this game has not been configured.|[Error Object](#schemaerror_object)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>
</aside>
## Authenticate via itch.io

> Example request

```shell
# You can also use wget
curl -X POST https://api.mod.io/v1/external/itchioauth?api_key=YourApiKey \
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'itchio_token=eyJhbXciOiJIUzI1Lizs....'

```

```http
POST https://api.mod.io/v1/external/itchioauth?api_key=YourApiKey HTTP/1.1
Host: api.mod.io
Content-Type: application/x-www-form-urlencoded
Accept: application/json

```

```javascript
var headers = {
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/external/itchioauth',
  method: 'post',
  data: '?api_key=YourApiKey',
  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

```javascript--nodejs
const request = require('node-fetch');
const inputBody = '{
  "itchio_token": "eyJhbXciOiJIUzI1Lizs...."
}';
const headers = {
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://api.mod.io/v1/external/itchioauth?api_key=YourApiKey',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```python
import requests
headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Accept': 'application/json'
}

r = requests.post('https://api.mod.io/v1/external/itchioauth', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/external/itchioauth?api_key=YourApiKey");
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

`POST /external/itchioauth`

Request an access token on behalf of an itch.io user via the itch.io desktop app. Due to the desktop application allowing multiple users to be logged in at once, if more than one user is logged in then the user at the top of that list on the itch.io login dialog will be the authenticating user. A Successful request will return an [Access Token Object](#access-token-object).<br/><br/>__HINT:__ If you want to overlay the mod.io site in-game on itch.io, we recommend you add `?ref=itchio` to the end of the URL you open which will prompt the user to login with itch.io. See [Web Overlay Authentication](#web-overlay-authentication) for details.

     Parameter|Type|Required|Description
     ---|---|---|---|
     itchio_token|string|true|The [JWT Token](https://itch.io/docs/itch/integrating/manifest-actions.html) provided by the itch.io desktop application to your game as the environment variable `ITCHIO_API_KEY`. You must setup your itch.io app manifest to include the [API scope](https://itch.io/docs/itch/integrating/manifest-actions.html) to force itch.io to set this variable.
     email|string||The users email address. If supplied, and the respective user does not have an email registered for their account we will send a confirmation email to confirm they have ownership of the specified email.<br><br>__NOTE__: If the user already has an email on record with us, this parameter will be ignored. This parameter should also be urlencoded before the request is sent.
     date_expires|integer||Unix timestamp of date in which the returned token will expire. Value cannot be higher than the default value which is a week (unix timestamp + 604800 seconds). Using a token after it's expiry time has elapsed will result in a `401 Unauthorized` response.


> Example response

```json
{
  "code": 200,
  "access_token": "eyJ0eXAiOiXKV1QibCJhbLciOiJeiUzI1.....",
  "date_expires": 1570673249
}

```
<h3 id="Authenticate-via-itch.io-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Access Token Object](#schemaaccess_token_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|14001|The game associated with the supplied api_key is currently not available.|[Error Object](#schemaerror_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11032|mod.io was unable to verify the credentials against the external service provider.|[Error Object](#schemaerror_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11031|mod.io was unable to get account data from itch.io servers.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11016|The api_key supplied in the request must be associated with a game.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11017|The api_key supplied in the request is for test environment purposes only and cannot be used for this functionality.|[Error Object](#schemaerror_object)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>
</aside>
## Authenticate via Oculus

> Example request

```shell
# You can also use wget
curl -X POST https://api.mod.io/v1/external/oculusauth?api_key=YourApiKey \
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'device=rift' \
  -d 'nonce=m72VygeZzTSUVRmNvw8v...' \
  -d 'user_id=1829770514091149' \
  -d 'access_token=OCAf5kD1SbVNE...'

```

```http
POST https://api.mod.io/v1/external/oculusauth?api_key=YourApiKey HTTP/1.1
Host: api.mod.io
Content-Type: application/x-www-form-urlencoded
Accept: application/json

```

```javascript
var headers = {
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/external/oculusauth',
  method: 'post',
  data: '?api_key=YourApiKey',
  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

```javascript--nodejs
const request = require('node-fetch');
const inputBody = '{
  "device": "rift",
  "nonce": "m72VygeZzTSUVRmNvw8v...",
  "user_id": "1829770514091149",
  "access_token": "OCAf5kD1SbVNE..."
}';
const headers = {
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://api.mod.io/v1/external/oculusauth?api_key=YourApiKey',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```python
import requests
headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Accept': 'application/json'
}

r = requests.post('https://api.mod.io/v1/external/oculusauth', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/external/oculusauth?api_key=YourApiKey");
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

`POST /external/oculusauth`

Request an access token on behalf of an Oculus user. To use this functionality you *must* add your games [AppId and secret](https://dashboard.oculus.com/) from the Oculus Dashboard, to the *Edit > Options* page of your games profile on mod.io. A Successful request will return an [Access Token Object](#access-token-object).

     Parameter|Type|Required|Description
     ---|---|---|---|
     device|string|true|The Oculus device being used for authentication.<br><br>Possible Options:<br>- _rift_<br>- _quest_
     nonce|string|true|The nonce provided by calling [ovr_User_GetUserProof()](https://developer.oculus.com/documentation/platform/latest/concepts/dg-ownership/) from the Oculus SDK. <br><br>__NOTE:__ Due to the `nonce` potentially containing special characters, you must URL encode the string before sending the request to ensure it is successfully sent to our servers otherwise you may encounter an `422 Unprocessable Entity` response. For example, [cURL](https://ec.haxx.se/http-post.html) will do this for you by using the `--data-urlencode` option.
     user_id|integer|true|The user's Oculus id providing by calling [ovr_GetLoggedInUserID()](https://developer.oculus.com/documentation/platform/latest/concepts/dg-ownership/) from the Oculus SDK.
     access_token|string|true|The user's access token, providing by calling [ovr_User_GetAccessToken()](https://developer.oculus.com/documentation/platform/latest/concepts/dg-ownership/) from the Oculus SDK. mod.io uses this access token on the first login only to obtain the user's alias and is not saved on our servers.
     email|string||The users email address. If supplied, and the respective user does not have an email registered for their account we will send a confirmation email to confirm they have ownership of the specified email.<br><br>__WARNING__: We __strongly recommend__ that you prompt your users in a friendly manner at least once to provide their email address to link their Oculus account. Due to how Oculus handles user id's - if we are not supplied with an email for a user at least once we will __never__ be able to link that user with their existing account at a later date as Oculus id's operate at the game-scope, not globally. Failing to provide an email will in-effect generate an orphan account that will only be able to be accessed from your title.
     date_expires|integer||Unix timestamp of date in which the returned token will expire. Value cannot be higher than the default value which is a common year (unix timestamp + 31536000 seconds). Using a token after it's expiry time has elapsed will result in a `401 Unauthorized` response.


> Example response

```json
{
  "code": 200,
  "access_token": "eyJ0eXAiOiXKV1QibCJhbLciOiJeiUzI1.....",
  "date_expires": 1570673249
}

```
<h3 id="Authenticate-via-Oculus-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Access Token Object](#schemaaccess_token_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|14001|The game associated with the supplied api_key is currently not available.|[Error Object](#schemaerror_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11032|mod.io was unable to verify the credentials against the external service provider.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11016|The api_key supplied in the request must be associated with a game.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11017|The api_key supplied in the request is for test environment purposes only and cannot be used for this functionality.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11024|The secret Oculus Rift app ticket associated with this game has not been configured.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11025|The secret Oculus Quest app ticket associated with this game has not been configured.|[Error Object](#schemaerror_object)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>
</aside>
## Authenticate via Xbox Live

> Example request

```shell
# You can also use wget
curl -X POST https://api.mod.io/v1/external/xboxauth?api_key=YourApiKey \
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'xbox_token=XBL3.0 x=9264027439329321064;eym72VygeZzTSUVRmNvw8v...'

```

```http
POST https://api.mod.io/v1/external/xboxauth?api_key=YourApiKey HTTP/1.1
Host: api.mod.io
Content-Type: application/x-www-form-urlencoded
Accept: application/json

```

```javascript
var headers = {
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/external/xboxauth',
  method: 'post',
  data: '?api_key=YourApiKey',
  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

```javascript--nodejs
const request = require('node-fetch');
const inputBody = '{
  "xbox_token": "XBL3.0 x=9264027439329321064;eym72VygeZzTSUVRmNvw8v..."
}';
const headers = {
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://api.mod.io/v1/external/xboxauth?api_key=YourApiKey',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```python
import requests
headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Accept': 'application/json'
}

r = requests.post('https://api.mod.io/v1/external/xboxauth', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/external/xboxauth?api_key=YourApiKey");
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

`POST /external/xboxauth`

Request an access token on behalf of an Xbox Live user. A Successful request will return an [Access Token Object](#access-token-object).<br><br>__NOTE__: To use this endpoint you will need to setup some additional settings prior to being able to authenticate Xbox Live users, for these instructions please [contact us](mailto:developers@mod.io).

     Parameter|Type|Required|Description
     ---|---|---|---|
     xbox_token|string|true|The Xbox Live token returned from calling [GetTokenAndSignatureAsync("POST", "https://api.mod.io")](https://docs.microsoft.com/en-us/dotnet/api/microsoft.xbox.services.system.xboxliveuser.gettokenandsignatureasync?view=xboxlive-dotnet-2017.11.20171204.01). <br><br>__NOTE:__ Due to the encrypted app ticket containing special characters, you must URL encode the string before sending the request to ensure it is successfully sent to our servers otherwise you may encounter an `422 Unprocessable Entity` response. For example, [cURL](https://ec.haxx.se/http-post.html) will do this for you by using the `--data-urlencode` option.
     email|string||The users email address. If supplied, and the respective user does not have an email registered for their account we will send a confirmation email to confirm they have ownership of the specified email. This functionality is also available at a later time via the [Link an Email](#link-an-email) endpoint.<br><br>__NOTE__: If the user already has an email on record with us, this parameter will be ignored. This parameter should also be urlencoded before the request is sent.
     date_expires|integer||Unix timestamp of date in which the returned token will expire. Value cannot be higher than the default value which is a common year (unix timestamp + 31536000 seconds). Using a token after it's expiry time has elapsed will result in a `401 Unauthorized` response.


> Example response

```json
{
  "code": 200,
  "access_token": "eyJ0eXAiOiXKV1QibCJhbLciOiJeiUzI1.....",
  "date_expires": 1570673249
}

```
<h3 id="Authenticate-via-Xbox-Live-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Access Token Object](#schemaaccess_token_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|14001|The game associated with the supplied api_key is currently not available.|[Error Object](#schemaerror_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11027|The Xbox token supplied in the request is invalid.|[Error Object](#schemaerror_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11029|The Xbox token supplied has expired.|[Error Object](#schemaerror_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11032|mod.io was unable to verify the credentials against the external service provider.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11016|The api_key supplied in the request must be associated with a game.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11017|The api_key supplied in the request is for test environment purposes only and cannot be used for this functionality.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11028|The user is not permitted to interact with UGC. This can be modified in the user's Xbox profile.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11030|Xbox live users with 'Child' accounts are not permitted to use mod.io. You must be 13 years or older to use mod.io.|[Error Object](#schemaerror_object)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>
</aside>
## Authenticate via Switch

> Example request

```shell
# You can also use wget
curl -X POST https://api.mod.io/v1/external/switchauth?api_key=YourApiKey \
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'id_token=m72VygeZzTSUVRmNvw8v...'

```

```http
POST https://api.mod.io/v1/external/switchauth?api_key=YourApiKey HTTP/1.1
Host: api.mod.io
Content-Type: application/x-www-form-urlencoded
Accept: application/json

```

```javascript
var headers = {
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/external/switchauth',
  method: 'post',
  data: '?api_key=YourApiKey',
  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

```javascript--nodejs
const request = require('node-fetch');
const inputBody = '{
  "id_token": "m72VygeZzTSUVRmNvw8v..."
}';
const headers = {
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://api.mod.io/v1/external/switchauth?api_key=YourApiKey',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```python
import requests
headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Accept': 'application/json'
}

r = requests.post('https://api.mod.io/v1/external/switchauth', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/external/switchauth?api_key=YourApiKey");
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

`POST /external/switchauth`

Request an access token on behalf of a Nintendo Switch user. A Successful request will return an [Access Token Object](#access-token-object).<br><br>__NOTE__: To use this endpoint you will need to setup some additional settings prior to being able to authenticate Nintendo Switch users, for these instructions please [contact us](mailto:developers@mod.io).

     Parameter|Type|Required|Description
     ---|---|---|---|
     id_token|string|true|The NSA ID supplied by the Nintendo Switch SDK.
     email|string||The users email address. If supplied, and the respective user does not have an email registered for their account we will send a confirmation email to confirm they have ownership of the specified email.<br><br>__WARNING__: We __strongly recommend__ that you prompt your users in a friendly manner at least once to provide their email address to link their Nintendo Service account to mod.io. Failing to provide an email will in-effect generate an orphan account that will only be able to be accessed from the users' Switch device.
     date_expires|integer||Unix timestamp of date in which the returned token will expire. Value cannot be higher than the default value which is a common year (unix timestamp + 31536000 seconds). Using a token after it's expiry time has elapsed will result in a `401 Unauthorized` response.


> Example response

```json
{
  "code": 200,
  "access_token": "eyJ0eXAiOiXKV1QibCJhbLciOiJeiUzI1.....",
  "date_expires": 1570673249
}

```
<h3 id="Authenticate-via-Switch-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Access Token Object](#schemaaccess_token_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11035|The NSA ID token was invalid/malformed.|[Error Object](#schemaerror_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11039|mod.io was unable to validate the credentials with Nintendo Servers.|[Error Object](#schemaerror_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11036|The NSA ID token is not valid yet.|[Error Object](#schemaerror_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11037|The NSA ID token has expired. You should request another token from the Switch SDK and ensure it is delivered to mod.io before it expires.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11040|The application ID for the Nintendo Switch title has not been configured, this can be setup in the 'Options' tab within your game profile.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11041|The application ID of the originating Switch title is not permitted to authenticate users. Please check the Switch application id submitted on your games' 'Options' tab and ensure it is the same application id of the Switch title making the authentication request.|[Error Object](#schemaerror_object)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>
</aside>
## Authenticate via Discord

> Example request

```shell
# You can also use wget
curl -X POST https://api.mod.io/v1/external/discordauth?api_key=YourApiKey \
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'discord_token=eyJhbXciOiJIUzI1Lizs....'

```

```http
POST https://api.mod.io/v1/external/discordauth?api_key=YourApiKey HTTP/1.1
Host: api.mod.io
Content-Type: application/x-www-form-urlencoded
Accept: application/json

```

```javascript
var headers = {
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/external/discordauth',
  method: 'post',
  data: '?api_key=YourApiKey',
  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

```javascript--nodejs
const request = require('node-fetch');
const inputBody = '{
  "discord_token": "eyJhbXciOiJIUzI1Lizs...."
}';
const headers = {
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://api.mod.io/v1/external/discordauth?api_key=YourApiKey',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```python
import requests
headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Accept': 'application/json'
}

r = requests.post('https://api.mod.io/v1/external/discordauth', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/external/discordauth?api_key=YourApiKey");
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

`POST /external/discordauth`

Request an access token on behalf of a Discord user. A Successful request will return an [Access Token Object](#access-token-object).

     Parameter|Type|Required|Description
     ---|---|---|---|
     discord_token|string|true|The access token of the user provided by Discord.
     email|string||The users email address. If supplied, and the respective user does not have an email registered for their account we will send a confirmation email to confirm they have ownership of the specified email.<br><br>__NOTE__: If the user already has an email on record with us, this parameter will be ignored. This parameter should also be urlencoded before the request is sent.
     date_expires|integer||Unix timestamp of date in which the returned token will expire. Value cannot be higher than the default value which is a week (unix timestamp + 604800 seconds). Using a token after it's expiry time has elapsed will result in a `401 Unauthorized` response.


> Example response

```json
{
  "code": 200,
  "access_token": "eyJ0eXAiOiXKV1QibCJhbLciOiJeiUzI1.....",
  "date_expires": 1570673249
}

```
<h3 id="Authenticate-via-Discord-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Access Token Object](#schemaaccess_token_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|14001|The game associated with the supplied api_key is currently not available.|[Error Object](#schemaerror_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11032|mod.io was unable to verify the credentials against the external service provider.|[Error Object](#schemaerror_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11043|mod.io was unable to get account data from the Discord servers.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11016|The api_key supplied in the request must be associated with a game.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11017|The api_key supplied in the request is for test environment purposes only and cannot be used for this functionality.|[Error Object](#schemaerror_object)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>
</aside>
# Games

## Get Games

> Example request

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

Get all games. Successful request will return an array of [Game Objects](#get-games-2). We recommended reading the [filtering documentation](#filtering) to return only the records you want.

    Filter|Type|Description
    ---|---|---
    id|integer|Unique id of the game.
    status|integer|Status of the game (only admins can filter by this field, see [status and visibility](#status-amp-visibility) for details):<br><br>__0__ = Not accepted<br>__1__ = Accepted _(default)_<br>__3__ = Deleted
    submitted_by|integer|Unique id of the user who has ownership of the game.
    date_added|integer|Unix timestamp of date game was registered.
    date_updated|integer|Unix timestamp of date game was updated.
    date_live|integer|Unix timestamp of date game was set live.
    name|string|Name of the game.
    name_id|string|Subdomain for the game on mod.io. For example: https://gamename.mod.io
    summary|string|Summary of the games mod support.
    instructions_url|string|Link to a mod.io guide, modding wiki or a page where modders can learn how to make and submit mods.
    ugc_name|string|Word used to describe user-generated content (mods, items, addons etc).
    presentation_option|integer|Presentation style used on the mod.io website:<br><br>__0__ =  Grid View: Displays mods in a grid<br>__1__ = Table View: Displays mods in a table
    submission_option|integer|Submission process modders must follow:<br><br>__0__ = Mod uploads must occur via the API using a tool created by the game developers<br>__1__ = Mod uploads can occur from anywhere, including the website and API
    curation_option|integer|Curation process used to approve mods:<br><br>__0__ = No curation: Mods are immediately available to play<br>__1__ = Paid curation: Mods are immediately available to play unless they choose to receive donations. These mods must be accepted to be listed<br>__2__ = Full curation: All mods must be accepted by someone to be listed
    community_options|integer|Community features enabled on the mod.io website:<br><br>__0__ = All of the options below are disabled<br>__1__ = Enable comments<br>__2__ = Enable guides<br>__4__ = Disable website _"subscribe to install"_ text<br>__?__ = Combine to find games with multiple options enabled (see [BITWISE fields](#bitwise-and-bitwise-and))
    revenue_options|integer|Revenue capabilities mods can enable:<br><br>__0__ = All of the options below are disabled<br>__1__ = Allow mods to be sold<br>__2__ = Allow mods to receive donations<br>__4__ = Allow mods to be traded<br>__8__ = Allow mods to control supply and scarcity<br>__?__ = Combine to find games with multiple options enabled (see [BITWISE fields](#bitwise-and-bitwise-and))
    api_access_options|integer|Level of API access allowed by this game:<br><br>__0__ = All of the options below are disabled<br>__1__ = Allow 3rd parties to access this games API endpoints<br>__2__ = Allow mods to be downloaded directly (if disabled all download URLs will contain a frequently changing verification hash to stop unauthorized use)<br>__?__ = Combine to find games with multiple options enabled (see [BITWISE fields](#bitwise-and-bitwise-and))
    maturity_options|integer|If the game allows developers to flag mods as containing mature content:<br><br>__0__ = Don't allow _(default)_<br>__1__ = Allow


> Example response

```json
{
  "data": [
    {
      "id": 2,
      "status": 1,
      "submitted_by": {
        "id": 1,
        "name_id": "xant",
        "username": "XanT",
        "date_online": 1509922961,
        "avatar": {
          "filename": "modio-color-dark.png",
          "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
          "thumb_50x50": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
          "thumb_100x100": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
        },
        "timezone": "",
        "language": "",
        "profile_url": "https://mod.io/members/xant"
      },
      "date_added": 1493702614,
      "date_updated": 1499410290,
      "date_live": 1499841403,
      "presentation_option": 1,
      "submission_option": 0,
      "curation_option": 0,
      "community_options": 3,
      "revenue_options": 1500,
      "api_access_options": 3,
      "maturity_options": 0,
      "ugc_name": "map",
      "icon": {
        "filename": "modio-color-dark.png",
        "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
        "thumb_64x64": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
        "thumb_128x128": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
        "thumb_256x256": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
      },
      "logo": {
        "filename": "modio-color-dark.png",
        "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
        "thumb_320x180": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
        "thumb_640x360": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
        "thumb_1280x720": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
      },
      "header": {
        "filename": "demo.png",
        "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
      },
      "name": "Rogue Knight",
      "name_id": "rogue-knight",
      "summary": "Rogue Knight is a brand new 2D pixel platformer that supports custom levels and characters.",
      "instructions": "Instructions on the process to upload mods.",
      "instructions_url": "https://www.rogue-knight-game.com/modding/getting-started",
      "profile_url": "https://rogue-knight.mod.io",
      "tag_options": [
        {
          "name": "Theme",
          "type": "checkboxes",
          "tags": [
            "Horror"
          ],
          "hidden": false
        }
      ]
    },
    {
        ...
    }
  ],
  "result_count": 70,
  "result_offset": 0,
  "result_limit": 100,
  "result_total": 70
}

```
<h3 id="Get-Games-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||OK|[Get Games](#schemaget_games)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>, <a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
## Get Game

> Example request

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


> Example response

```json
{
  "id": 2,
  "status": 1,
  "submitted_by": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "date_online": 1509922961,
    "avatar": {
      "filename": "modio-color-dark.png",
      "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
      "thumb_50x50": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
      "thumb_100x100": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
    },
    "timezone": "",
    "language": "",
    "profile_url": "https://mod.io/members/xant"
  },
  "date_added": 1493702614,
  "date_updated": 1499410290,
  "date_live": 1499841403,
  "presentation_option": 1,
  "submission_option": 0,
  "curation_option": 0,
  "community_options": 3,
  "revenue_options": 1500,
  "api_access_options": 3,
  "maturity_options": 0,
  "ugc_name": "map",
  "icon": {
    "filename": "modio-color-dark.png",
    "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
    "thumb_64x64": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
    "thumb_128x128": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
    "thumb_256x256": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
  },
  "logo": {
    "filename": "modio-color-dark.png",
    "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
    "thumb_320x180": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
    "thumb_640x360": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
    "thumb_1280x720": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
  },
  "header": {
    "filename": "demo.png",
    "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
  },
  "name": "Rogue Knight",
  "name_id": "rogue-knight",
  "summary": "Rogue Knight is a brand new 2D pixel platformer that supports custom levels and characters.",
  "instructions": "Instructions on the process to upload mods.",
  "instructions_url": "https://www.rogue-knight-game.com/modding/getting-started",
  "profile_url": "https://rogue-knight.mod.io",
  "tag_options": [
    {
      "name": "Theme",
      "type": "checkboxes",
      "tags": [
        "Horror"
      ],
      "hidden": false
    }
  ]
}

```
<h3 id="Get-Game-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Request successful|[Game Object](#schemagame_object)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>, <a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
## Edit Game

> Example request

```shell
# You can also use wget
curl -X PUT https://api.mod.io/v1/games/{game-id} \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json'

```

```http
PUT https://api.mod.io/v1/games/{game-id} HTTP/1.1
Host: api.mod.io

Accept: application/json
Authorization: Bearer {access-token}
Content-Type: application/x-www-form-urlencoded


```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
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
  'Authorization':'Bearer {access-token}',
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

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}',
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

    __NOTE:__ You can also edit [your games profile](https://mod.io/games) on the mod.io website. This is the recommended approach.

    Parameter|Type|Required|Description
    ---|---|---|---|
    status|integer||Status of a game. We recommend you never change this once you have accepted your game to be available via the API (see [status and visibility](#status-amp-visibility) for details):<br><br>__0__ = Not accepted<br>__1__ = Accepted
    name|string||Name of your game. Cannot exceed 80 characters.
    name_id|string||Subdomain for the game on mod.io. For example: https://gamename.mod.io. Highly recommended to not change this unless absolutely required. Cannot exceed 20 characters.
    summary|string||Explain your games mod support in 1 paragraph. Cannot exceed 250 characters.
    instructions|string||Instructions and links creators should follow to upload mods. Keep it short and explain details like are mods submitted in-game or via tools you have created.
    instructions_url|string||Link to a mod.io guide, your modding wiki or a page where modders can learn how to make and submit mods to your games profile.
    ugc_name|string||Word used to describe user-generated content (mods, items, addons etc).
    presentation_option|integer||Choose the presentation style you want on the mod.io website:<br><br>__0__ =  Grid View: Displays mods in a grid (visual but less informative, default setting) <br>__1__ = Table View: Displays mods in a table (easier to browse)
    submission_option|integer||Choose the submission process you want modders to follow:<br><br>__0__ = Mods must be uploaded using your tools (recommended): You will have to build an upload system either in-game or via a standalone tool, which enables creators to submit mods to the tags you have configured. Because you control the flow you can pre-validate and compile mods, to ensure they will work in your game and attach metadata about what settings the mod can change. In the long run this option will save you time as you can accept more submissions, but it requires more setup to get running and isn't as open as the above option. __NOTE:__ mod profiles can be edited online once created via your tools, but all uploads will have to occur via the API using tools you create.<br><br>__1__ = Mods can be uploaded using the website: Allow developers to upload mods via the website and API, and pick the tags their mod is built for. No validation will be done on the files submitted, it will be the responsibility of your game and apps to process the mods installation based on the tags selected and determine if the mod is valid and works. For example a mod might be uploaded with the 'map' tag. When a user subscribes to this mod, your game will need to verify it contains a map file and install it where maps are located. If this fails, your game or the community will have to flag the mod as 'incompatible' to remove it from the listing.
    curation_option|integer||Choose the curation process your team follows to approve mods:<br><br>__0__ = No curation (recommended): Mods are immediately available to play, without any intervention or work from your team.<br><br>__1__ = Paid curation: Screen only mods the creator wants to sell, before they are available to receive donations or be purchased via the API.<br><br>__2__ = Full curation: All mods must be accepted by someone on your team. This option is useful for games that have a small number of mods and want to control the experience, or you need to set the parameters attached to a mod (i.e. a weapon may require the rate of fire, power level, clip size etc). It can also be used for complex mods, which you may need to build into your game or distribute as DLC.
    community_options|integer||Choose the community features enabled on the mod.io website:<br><br>__0__ = All of the options below are disabled<br>__1__ = Enable comments<br>__2__ = Enable guides<br>__4__ = Disable website _"subscribe to install"_ text<br>__?__ = Add the options you want together, to enable multiple features (see [BITWISE fields](#bitwise-and-bitwise-and))
    revenue_options|integer||Choose the revenue capabilities mods can enable:<br><br>__0__ = All of the options below are disabled<br>__1__ = Allow mods to be sold<br>__2__ = Allow mods to receive donations<br>__4__ = Allow mods to be traded<br>__8__ = Allow mods to control supply and scarcity<br>__?__ = Add the options you want together, to enable multiple features (see [BITWISE fields](#bitwise-and-bitwise-and))
    api_access_options|integer||Choose the level of API access your game allows:<br><br>__0__ = All of the options below are disabled<br><br>__1__ = Allow 3rd parties to access this games API endpoints. We recommend you enable this feature, an open API will encourage a healthy ecosystem of tools and apps. If you do not enable this feature, your `/games/{games-id}` endpoints will return `403 Forbidden` unless you are a member of the games team or using the games `api_key`<br><br>__2__ = Allow mods to be downloaded directly (makes implementation easier for you, game servers and services because you can save, share and reuse download URLs). If disabled all download URLs will contain a frequently changing verification hash to stop unauthorized use<br><br>__?__ = Add the options you want together, to enable multiple features (see [BITWISE fields](#bitwise-and-bitwise-and))
    maturity_options|integer||Choose if you want to allow developers to select if they can flag their mods as containing mature content:<br><br>__0__ = Don't allow _(default)_<br>__1__ = Allow


> Example response

```json
{
  "id": 2,
  "status": 1,
  "submitted_by": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "date_online": 1509922961,
    "avatar": {
      "filename": "modio-color-dark.png",
      "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
      "thumb_50x50": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
      "thumb_100x100": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
    },
    "timezone": "",
    "language": "",
    "profile_url": "https://mod.io/members/xant"
  },
  "date_added": 1493702614,
  "date_updated": 1499410290,
  "date_live": 1499841403,
  "presentation_option": 1,
  "submission_option": 0,
  "curation_option": 0,
  "community_options": 3,
  "revenue_options": 1500,
  "api_access_options": 3,
  "maturity_options": 0,
  "ugc_name": "map",
  "icon": {
    "filename": "modio-color-dark.png",
    "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
    "thumb_64x64": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
    "thumb_128x128": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
    "thumb_256x256": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
  },
  "logo": {
    "filename": "modio-color-dark.png",
    "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
    "thumb_320x180": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
    "thumb_640x360": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
    "thumb_1280x720": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
  },
  "header": {
    "filename": "demo.png",
    "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
  },
  "name": "Rogue Knight",
  "name_id": "rogue-knight",
  "summary": "Rogue Knight is a brand new 2D pixel platformer that supports custom levels and characters.",
  "instructions": "Instructions on the process to upload mods.",
  "instructions_url": "https://www.rogue-knight-game.com/modding/getting-started",
  "profile_url": "https://rogue-knight.mod.io",
  "tag_options": [
    {
      "name": "Theme",
      "type": "checkboxes",
      "tags": [
        "Horror"
      ],
      "hidden": false
    }
  ]
}

```
<h3 id="Edit-Game-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Update successful|[Game Object](#schemagame_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|14002|The authenticated user does not have permission to update this game. Ensure the user is part of the mod team before attempting the request again.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|14003|The authenticated user does not have permission to update the status of this game. Ensure the user is part of the mod team before attempting the request again.|[Error Object](#schemaerror_object)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
# Mods

## Get Mods

> Example request

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

Get all mods for the corresponding game. Successful request will return an array of [Mod Objects](#get-mods-2). We recommended reading the [filtering documentation](#filtering) to return only the records you want.

    Filter|Type|Description
    ---|---|---
    id|integer|Unique id of the mod.
    game_id|integer|Unique id of the parent game.
    status|integer|Status of the mod (only game admins can filter by this field, see [status and visibility](#status-amp-visibility) for details):<br><br>__0__ = Not accepted<br>__1__ = Accepted _(default)_<br>__3__ = Deleted
    visible|integer|Visibility of the mod (only game admins can filter by this field, see [status and visibility](#status-amp-visibility) for details):<br><br>__0__ = Hidden<br>__1__ = Public
    submitted_by|integer|Unique id of the user who has ownership of the mod.
    date_added|integer|Unix timestamp of date mod was registered.
    date_updated|integer|Unix timestamp of date mod was updated.
    date_live|integer|Unix timestamp of date mod was set live.
    maturity_option|integer|Maturity option(s) set by the mod developer:<br><br>__0__ = None set _(default)_<br>__1__ = Alcohol<br>__2__ = Drugs<br>__4__ = Violence<br>__8__ = Explicit<br>__?__ = Add the options you want together, to enable multiple filters (see [BITWISE fields](#bitwise-and-bitwise-and))
    name|string|Name of the mod.
    name_id|string|URL-friendly name for the mod on mod.io. For example: https://gamename.mod.io/__mod-name-id-here__
    summary|string|Summary of the mod.
    description|string|Detailed description of the mod which allows HTML.
    homepage_url|string|Official homepage of the mod.
    modfile|integer|Unique id of the file that is the current active release (see [mod files](#files)).
    metadata_blob|string|Metadata stored by the game developer.
    metadata_kvp|string|Colon-separated values representing the key-value pairs you want to filter the results by. If you supply more than one key-pair, separate the pairs by a comma. Will only filter by an exact key-pair match.
    tags|string|Comma-separated values representing the tags you want to filter the results by. If you specify multiple tags, only mods which have all tags will be returned, and only tags that are supported by the parent game can be applied. To determine what tags are eligible, see the tags values within `tag_options` column on the parent [Game Object](#game-object). If you want to ensure mods returned do not contain particular tag(s), you can use the `tags-not-in` filter either independently or alongside this filter.
    downloads|string|Sort results by most downloads using [_sort filter](#filtering) parameter, value should be `downloads` for descending or `-downloads` for ascending results.
    popular|string|Sort results by popularity using [_sort filter](#filtering), value should be `popular` for descending or `-popular` for ascending results. __NOTE:__ Popularity is calculated hourly and reset daily (results are ranked from 1 to X). You should sort this column in ascending order `-popular` to get the top ranked results.
    rating|string|Sort results by weighted rating using [_sort filter](#filtering), value should be `rating` for descending or `-rating` for ascending results.
    subscribers|string|Sort results by most subscribers using [_sort filter](#filtering), value should be `subscribers` for descending or `-subscribers` for ascending results.


> Example response

```json
{
  "data": [
    {
      "id": 2,
      "game_id": 2,
      "status": 1,
      "visible": 1,
      "submitted_by": {
        "id": 1,
        "name_id": "xant",
        "username": "XanT",
        "date_online": 1509922961,
        "avatar": {
          "filename": "modio-color-dark.png",
          "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
          "thumb_50x50": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
          "thumb_100x100": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
        },
        "timezone": "",
        "language": "",
        "profile_url": "https://mod.io/members/xant"
      },
      "date_added": 1492564103,
      "date_updated": 1499841487,
      "date_live": 1499841403,
      "maturity_option": 0,
      "logo": {
        "filename": "modio-color-dark.png",
        "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
        "thumb_320x180": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
        "thumb_640x360": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
        "thumb_1280x720": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
      },
      "homepage_url": "https://www.rogue-hdpack.com/",
      "name": "Rogue Knight HD Pack",
      "name_id": "rogue-knight-hd-pack",
      "summary": "It's time to bask in the glory of beautiful 4k textures!",
      "description": "<p>Rogue HD Pack does exactly what you thi...",
      "description_plaintext": "Rogue HD Pack does exactly what you thi...",
      "metadata_blob": "rogue,hd,high-res,4k,hd textures",
      "profile_url": "https://rogue-knight.mod.io/rogue-knight-hd-pack",
      "media": {
        "youtube": [
          "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        ],
        "sketchfab": [
          "https://sketchfab.com/models/ef40b2d300334d009984c8865b2db1c8"
        ],
        "images": [
          {
            "filename": "modio-color-dark.png",
            "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
            "thumb_320x180": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
          }
        ]
      },
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
        "metadata_blob": "rogue,hd,high-res,4k,hd textures",
        "download": {
          "binary_url": "https://mod.io/mods/file/1/c489a0354111a4d76640d47f0cdcb294",
          "date_expires": 1579316848
        }
      },
      "metadata_kvp": [
        {
          "metakey": "pistol-dmg",
          "metavalue": "800"
        }
      ],
      "tags": [
        {
          "name": "Unity",
          "date_added": 1499841487
        }
      ],
      "stats": {
        "mod_id": 2,
        "popularity_rank_position": 13,
        "popularity_rank_total_mods": 204,
        "downloads_total": 27492,
        "subscribers_total": 16394,
        "ratings_total": 1230,
        "ratings_positive": 1047,
        "ratings_negative": 183,
        "ratings_percentage_positive": 91,
        "ratings_weighted_aggregate": 87.38,
        "ratings_display_text": "Very Positive",
        "date_expires": 1492564103
      }
    },
    {
        ...
    }
  ],
  "result_count": 70,
  "result_offset": 0,
  "result_limit": 100,
  "result_total": 70
}

```
<h3 id="Get-Mods-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Get Mods](#schemaget_mods)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15025|The authenticated user has applied an admin-only filter or value to the request, and is not an administrator for this game.|[Error Object](#schemaerror_object)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>, <a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
## Get Mod

> Example request

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


> Example response

```json
{
  "id": 2,
  "game_id": 2,
  "status": 1,
  "visible": 1,
  "submitted_by": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "date_online": 1509922961,
    "avatar": {
      "filename": "modio-color-dark.png",
      "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
      "thumb_50x50": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
      "thumb_100x100": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
    },
    "timezone": "",
    "language": "",
    "profile_url": "https://mod.io/members/xant"
  },
  "date_added": 1492564103,
  "date_updated": 1499841487,
  "date_live": 1499841403,
  "maturity_option": 0,
  "logo": {
    "filename": "modio-color-dark.png",
    "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
    "thumb_320x180": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
    "thumb_640x360": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
    "thumb_1280x720": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
  },
  "homepage_url": "https://www.rogue-hdpack.com/",
  "name": "Rogue Knight HD Pack",
  "name_id": "rogue-knight-hd-pack",
  "summary": "It's time to bask in the glory of beautiful 4k textures!",
  "description": "<p>Rogue HD Pack does exactly what you thi...",
  "description_plaintext": "Rogue HD Pack does exactly what you thi...",
  "metadata_blob": "rogue,hd,high-res,4k,hd textures",
  "profile_url": "https://rogue-knight.mod.io/rogue-knight-hd-pack",
  "media": {
    "youtube": [
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    ],
    "sketchfab": [
      "https://sketchfab.com/models/ef40b2d300334d009984c8865b2db1c8"
    ],
    "images": [
      {
        "filename": "modio-color-dark.png",
        "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
        "thumb_320x180": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
      }
    ]
  },
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
    "metadata_blob": "rogue,hd,high-res,4k,hd textures",
    "download": {
      "binary_url": "https://mod.io/mods/file/1/c489a0354111a4d76640d47f0cdcb294",
      "date_expires": 1579316848
    }
  },
  "metadata_kvp": [
    {
      "metakey": "pistol-dmg",
      "metavalue": "800"
    }
  ],
  "tags": [
    {
      "name": "Unity",
      "date_added": 1499841487
    }
  ],
  "stats": {
    "mod_id": 2,
    "popularity_rank_position": 13,
    "popularity_rank_total_mods": 204,
    "downloads_total": 27492,
    "subscribers_total": 16394,
    "ratings_total": 1230,
    "ratings_positive": 1047,
    "ratings_negative": 183,
    "ratings_percentage_positive": 91,
    "ratings_weighted_aggregate": 87.38,
    "ratings_display_text": "Very Positive",
    "date_expires": 1492564103
  }
}

```
<h3 id="Get-Mod-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Mod Object](#schemamod_object)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>, <a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
## Add Mod

> Example request

```shell
# You can also use wget
curl -X POST https://api.mod.io/v1/games/{game-id}/mods \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: multipart/form-data' \ 
  -H 'Accept: application/json' \
  -F 'name=Graphics Overhaul Mod' \
  -F 'summary=Short descriptive summary here' \
  -F 'logo=@/path/to/image.jpg'

```

```http
POST https://api.mod.io/v1/games/{game-id}/mods HTTP/1.1
Host: api.mod.io
Content-Type: multipart/form-data
Accept: application/json
Authorization: Bearer {access-token}


```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
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
const inputBody = '{
  "name": "Graphics Overhaul Mod",
  "summary": "Short descriptive summary here",
  "logo": "@/path/to/image.jpg"
}';
const headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'multipart/form-data',
  'Accept':'application/json'

};

fetch('https://api.mod.io/v1/games/{game-id}/mods',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}',
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

Add a mod. Successful request will return the newly created [Mod Object](#mod-object). All content published by users on [mod.io](https://mod.io) is subject to the [mod.io Terms of Use](https://mod.io/terms/widget). It is a requirement that you provide a link to [https://mod.io/terms](https://mod.io/terms) in any place where users are submitting content to mod.io.<br><br>__NOTE:__ By default new mods are 'not accepted' and 'public'. They can only be 'accepted' and made available via the API once a [Mod File](#add-modfile) has been uploaded. [Media](#add-mod-media), [Metadata Key Value Pairs](#add-mod-kvp-metadata) and [Dependencies](#add-mod-dependencies) can also be added after a mod profile is created.

    Parameter|Type|Required|Description
    ---|---|---|---|
    visible|integer||Visibility of the mod (best if this field is controlled by mod admins, see [status and visibility](#status-amp-visibility) for details):<br><br>__0__ = Hidden<br>__1__ = Public _(default)_
    logo|file|true|Image file which will represent your mods logo. Must be gif, jpg or png format and cannot exceed 8MB in filesize. Dimensions must be at least 512x288 and we recommended you supply a high resolution image with a 16 / 9 ratio. mod.io will use this image to make three thumbnails for the dimensions 320x180, 640x360 and 1280x720.
    name|string|true|Name of your mod.
    name_id|string||Path for the mod on mod.io. For example: https://gamename.mod.io/__mod-name-id-here__. If no `name_id` is specified the `name` will be used. For example: _'Stellaris Shader Mod'_ will become _'stellaris-shader-mod'_. Cannot exceed 80 characters.
    summary|string|true|Summary for your mod, giving a brief overview of what it's about. Cannot exceed 250 characters.
    description|string||Detailed description for your mod, which can include details such as 'About', 'Features', 'Install Instructions', 'FAQ', etc. HTML supported and encouraged.
    homepage_url|string||Official homepage for your mod. Must be a valid URL.
    stock|integer||Maximium number of subscribers for this mod. A value of 0 disables this limit.
    maturity_option|integer||Choose if this mod contains any of the following mature content. __NOTE:__ The value of this field will default to 0 unless the parent game allows you to flag mature content (see `maturity_options` field in [Game Object](#game-object)). <br><br>__0__ = None set _(default)_<br>__1__ = Alcohol<br>__2__ = Drugs<br>__4__ = Violence<br>__8__ = Explicit<br>__?__ = Add the options you want together, to enable multiple options (see [BITWISE fields](#bitwise-and-bitwise-and))
    metadata_blob|string||Metadata stored by the game developer which may include properties as to how the item works, or other information you need to display. Metadata can also be stored as searchable [key value pairs](#metadata), and to individual [mod files](#get-modfiles).
    tags|string[]||An array of strings that represent what the mod has been tagged as. Only tags that are supported by the parent game can be applied. To determine what tags are eligible, see the tags values within `tag_options` column on the parent [Game Object](#game-object). To 


> Example response

```json
{
  "id": 2,
  "game_id": 2,
  "status": 1,
  "visible": 1,
  "submitted_by": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "date_online": 1509922961,
    "avatar": {
      "filename": "modio-color-dark.png",
      "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
      "thumb_50x50": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
      "thumb_100x100": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
    },
    "timezone": "",
    "language": "",
    "profile_url": "https://mod.io/members/xant"
  },
  "date_added": 1492564103,
  "date_updated": 1499841487,
  "date_live": 1499841403,
  "maturity_option": 0,
  "logo": {
    "filename": "modio-color-dark.png",
    "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
    "thumb_320x180": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
    "thumb_640x360": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
    "thumb_1280x720": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
  },
  "homepage_url": "https://www.rogue-hdpack.com/",
  "name": "Rogue Knight HD Pack",
  "name_id": "rogue-knight-hd-pack",
  "summary": "It's time to bask in the glory of beautiful 4k textures!",
  "description": "<p>Rogue HD Pack does exactly what you thi...",
  "description_plaintext": "Rogue HD Pack does exactly what you thi...",
  "metadata_blob": "rogue,hd,high-res,4k,hd textures",
  "profile_url": "https://rogue-knight.mod.io/rogue-knight-hd-pack",
  "media": {
    "youtube": [
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    ],
    "sketchfab": [
      "https://sketchfab.com/models/ef40b2d300334d009984c8865b2db1c8"
    ],
    "images": [
      {
        "filename": "modio-color-dark.png",
        "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
        "thumb_320x180": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
      }
    ]
  },
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
    "metadata_blob": "rogue,hd,high-res,4k,hd textures",
    "download": {
      "binary_url": "https://mod.io/mods/file/1/c489a0354111a4d76640d47f0cdcb294",
      "date_expires": 1579316848
    }
  },
  "metadata_kvp": [
    {
      "metakey": "pistol-dmg",
      "metavalue": "800"
    }
  ],
  "tags": [
    {
      "name": "Unity",
      "date_added": 1499841487
    }
  ],
  "stats": {
    "mod_id": 2,
    "popularity_rank_position": 13,
    "popularity_rank_total_mods": 204,
    "downloads_total": 27492,
    "subscribers_total": 16394,
    "ratings_total": 1230,
    "ratings_positive": 1047,
    "ratings_negative": 183,
    "ratings_percentage_positive": 91,
    "ratings_weighted_aggregate": 87.38,
    "ratings_display_text": "Very Positive",
    "date_expires": 1492564103
  }
}

```
<h3 id="Add-Mod-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)||Resource Created|[Mod Object](#schemamod_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15012|The authenticated user has had upload privileges restricted by mod.io admins, this is typically due to spam.|[Error Object](#schemaerror_object)

### Response Headers

Status|Header|Type|Format|Description
---|---|---|---|---|
201|Location|string||URL to newly created resource

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
## Edit Mod

> Example request

```shell
# You can also use wget
curl -X PUT https://api.mod.io/v1/games/{game-id}/mods/{mod-id} \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json'

```

```http
PUT https://api.mod.io/v1/games/{game-id}/mods/{mod-id} HTTP/1.1
Host: api.mod.io

Accept: application/json
Authorization: Bearer {access-token}
Content-Type: application/x-www-form-urlencoded


```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
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
  'Authorization':'Bearer {access-token}',
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

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}',
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

Edit details for a mod. If you want to update the `logo` or media associated with this mod, you need to use the [Add Mod Media](#add-mod-media) endpoint. The same applies to [Mod Files](#add-modfile), [Metadata Key Value Pairs](#add-mod-kvp-metadata) and [Dependencies](#add-mod-dependencies) which are all managed via other endpoints. Successful request will return the updated [Mod Object](#mod-object).

    Parameter|Type|Required|Description
    ---|---|---|---|
    status|integer||Status of a mod. The mod must have at least one uploaded `modfile` to be 'accepted' (best if this field is controlled by game admins, see [status and visibility](#status-amp-visibility) for details):<br><br>__0__ = Not accepted<br>__1__ = Accepted (game admins only)<br>__3__ = Deleted (use the [delete mod](#delete-mod) endpoint to set this status)
    visible|integer||Visibility of the mod (best if this field is controlled by mod admins, see [status and visibility](#status-amp-visibility) for details):<br><br>__0__ = Hidden<br>__1__ = Public
    name|string||Name of your mod. Cannot exceed 80 characters.
    name_id|string||Path for the mod on mod.io. For example: https://gamename.mod.io/__mod-name-id-here__. Cannot exceed 80 characters.
    summary|string||Summary for your mod, giving a brief overview of what it's about. Cannot exceed 250 characters.
    description|string||Detailed description for your mod, which can include details such as 'About', 'Features', 'Install Instructions', 'FAQ', etc. HTML supported and encouraged.
    homepage_url|string||Official homepage for your mod. Must be a valid URL.
    stock|integer||Maximium number of subscribers for this mod. A value of 0 disables this limit.
    maturity_option|integer||Choose if this mod contains any of the following mature content. __NOTE:__ The value of this field will default to 0 unless the parent game allows you to flag mature content (see `maturity_options` field in [Game Object](#game-object)). <br><br>__0__ = None set _(default)_<br>__1__ = Alcohol<br>__2__ = Drugs<br>__4__ = Violence<br>__8__ = Explicit<br>__?__ = Add the options you want together, to enable multiple options (see [BITWISE fields](#bitwise-and-bitwise-and))
    metadata_blob|string||Metadata stored by the game developer which may include properties as to how the item works, or other information you need to display. Metadata can also be stored as searchable [key value pairs](#metadata), and to individual [mod files](#get-modfiles).


> Example response

```json
{
  "id": 2,
  "game_id": 2,
  "status": 1,
  "visible": 1,
  "submitted_by": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "date_online": 1509922961,
    "avatar": {
      "filename": "modio-color-dark.png",
      "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
      "thumb_50x50": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
      "thumb_100x100": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
    },
    "timezone": "",
    "language": "",
    "profile_url": "https://mod.io/members/xant"
  },
  "date_added": 1492564103,
  "date_updated": 1499841487,
  "date_live": 1499841403,
  "maturity_option": 0,
  "logo": {
    "filename": "modio-color-dark.png",
    "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
    "thumb_320x180": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
    "thumb_640x360": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
    "thumb_1280x720": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
  },
  "homepage_url": "https://www.rogue-hdpack.com/",
  "name": "Rogue Knight HD Pack",
  "name_id": "rogue-knight-hd-pack",
  "summary": "It's time to bask in the glory of beautiful 4k textures!",
  "description": "<p>Rogue HD Pack does exactly what you thi...",
  "description_plaintext": "Rogue HD Pack does exactly what you thi...",
  "metadata_blob": "rogue,hd,high-res,4k,hd textures",
  "profile_url": "https://rogue-knight.mod.io/rogue-knight-hd-pack",
  "media": {
    "youtube": [
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    ],
    "sketchfab": [
      "https://sketchfab.com/models/ef40b2d300334d009984c8865b2db1c8"
    ],
    "images": [
      {
        "filename": "modio-color-dark.png",
        "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
        "thumb_320x180": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
      }
    ]
  },
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
    "metadata_blob": "rogue,hd,high-res,4k,hd textures",
    "download": {
      "binary_url": "https://mod.io/mods/file/1/c489a0354111a4d76640d47f0cdcb294",
      "date_expires": 1579316848
    }
  },
  "metadata_kvp": [
    {
      "metakey": "pistol-dmg",
      "metavalue": "800"
    }
  ],
  "tags": [
    {
      "name": "Unity",
      "date_added": 1499841487
    }
  ],
  "stats": {
    "mod_id": 2,
    "popularity_rank_position": 13,
    "popularity_rank_total_mods": 204,
    "downloads_total": 27492,
    "subscribers_total": 16394,
    "ratings_total": 1230,
    "ratings_positive": 1047,
    "ratings_negative": 183,
    "ratings_percentage_positive": 91,
    "ratings_weighted_aggregate": 87.38,
    "ratings_display_text": "Very Positive",
    "date_expires": 1492564103
  }
}

```
<h3 id="Edit-Mod-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Update Successful|[Mod Object](#schemamod_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15013|The authenticated user does not have permission to update this mod. Ensure the user is part of the mod team before attempting the request again.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15033|The authenticated user does not have permission to update the metadata for this mod, this action is restricted to team managers & administrators only.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15014|The authenticated user does not have permission to update the maturityoptions for this mod, this action is restricted to team managers & administrators only.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15015|The authenticated user does not have permission to update the status for this mod, this action is restricted to team managers & administrators only.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15016|A mod cannot be set live without an associated modfile.|[Error Object](#schemaerror_object)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
## Delete Mod

> Example request

```shell
# You can also use wget
curl -X DELETE https://api.mod.io/v1/games/{game-id}/mods/{mod-id} \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json'

```

```http
DELETE https://api.mod.io/v1/games/{game-id}/mods/{mod-id} HTTP/1.1
Host: api.mod.io

Accept: application/json
Authorization: Bearer {access-token}
Content-Type: application/x-www-form-urlencoded


```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
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
  'Authorization':'Bearer {access-token}',
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

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}',
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

Delete a mod profile. Successful request will return `204 No Content` and fire a __MOD_UNAVAILABLE__ event.<br><br>__NOTE:__ This will close the mod profile which means it cannot be viewed or retrieved via API requests but will still exist in-case you choose to restore it at a later date. If you wish to permanently delete a mod you have access rights to, you must do it via the [mods profile page](https://mod.io/mods) on the mod.io website.


> Example response

```json
 204 No Content 

```
<h3 id="Delete-Mod-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)||Successful Request. No Body Returned.|None
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15019|The authenticated user does not have permission to delete this mod, this action is restricted to team managers & administrators only.|[Error Object](#schemaerror_object)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
# Files

## Get Modfiles

> Example request

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

Get all files that are published for the corresponding mod. Successful request will return an array of [Modfile Objects](#get-modfiles-2). We recommended reading the [filtering documentation](#filtering) to return only the records you want.<br><br>__NOTE:__ If the [game](#edit-game) requires mod downloads to be initiated via the API, the `binary_url` returned will contain a verification hash. This hash must be supplied to get the modfile, and will expire after a certain period of time. Saving and reusing the `binary_url` won't work in this situation given it's dynamic nature.

     Filter|Type|Description
     ---|---|---
     id|integer|Unique id of the file.
     mod_id|integer|Unique id of the mod.
     date_added|integer|Unix timestamp of date file was added.
     date_scanned|integer|Unix timestamp of date file was virus scanned.
     virus_status|integer|Current virus scan status of the file. For newly added files that have yet to be scanned this field will change frequently until a scan is complete:<br><br>__0__ = Not scanned<br>__1__ = Scan complete<br>__2__ = In progress<br>__3__ = Too large to scan<br>__4__ = File not found<br>__5__ = Error Scanning
     virus_positive|integer|Was a virus detected:<br><br>__0__ = No threats detected<br>__1__ = Flagged as malicious
     filesize|integer|Size of the file in bytes.
     filehash|string|MD5 hash of the file.
     filename|string|Filename including extension.
     version|string|Release version this file represents.
     changelog|string|Changelog for the file.
     metadata_blob|string|Metadata stored by the game developer for this file.


> Example response

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
      "metadata_blob": "rogue,hd,high-res,4k,hd textures",
      "download": {
        "binary_url": "https://mod.io/mods/file/1/c489a0354111a4d76640d47f0cdcb294",
        "date_expires": 1579316848
      }
    },
    {
        ...
    }
  ],
  "result_count": 70,
  "result_offset": 0,
  "result_limit": 100,
  "result_total": 70
}

```
<h3 id="Get-Modfiles-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Get Modfiles](#schemaget_modfiles)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>, <a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
## Get Modfile

> Example request

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

Get a file. Successful request will return a single [Modfile Object](#modfile-object).<br><br>__NOTE:__ If the [game](#edit-game) requires mod downloads to be initiated via the API, the `binary_url` returned will contain a verification hash. This hash must be supplied to get the modfile, and will expire after a certain period of time. Saving and reusing the `binary_url` won't work in this situation given it's dynamic nature.


> Example response

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
  "metadata_blob": "rogue,hd,high-res,4k,hd textures",
  "download": {
    "binary_url": "https://mod.io/mods/file/1/c489a0354111a4d76640d47f0cdcb294",
    "date_expires": 1579316848
  }
}

```
<h3 id="Get-Modfile-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Modfile Object](#schemamodfile_object)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>, <a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
## Add Modfile

> Example request

```shell
# You can also use wget
curl -X POST https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/files \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: multipart/form-data' \ 
  -H 'Accept: application/json' \
  -F 'filedata=@/path/to/modfile.zip' \
  -F 'version=1.2' \
  -F 'changelog=<p>Rogue Knights v1.2.0 Changelog</p></p>New Featu...' \
  -F 'metadata_blob=client_signature:9VbZccpR'

```

```http
POST https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/files HTTP/1.1
Host: api.mod.io
Content-Type: multipart/form-data
Accept: application/json
Authorization: Bearer {access-token}


```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
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
const inputBody = '{
  "filedata": "@/path/to/modfile.zip",
  "version": "1.2",
  "changelog": "<p>Rogue Knights v1.2.0 Changelog</p></p>New Featu...",
  "metadata_blob": "client_signature:9VbZccpR"
}';
const headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'multipart/form-data',
  'Accept':'application/json'

};

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/files',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}',
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

Upload a file for the corresponding mod. Successful request will return the newly created [Modfile Object](#modfile-object). Ensure that the release you are uploading is stable and free from any critical issues. Files are scanned upon upload, any users who upload malicious files will have their accounts closed. <br><br>__NOTE:__ This endpoint does *not support* `input_json` even if you base64-encode your file, due to the already-large file sizes of some releases and base64-encoding inflating the filesize.

     Parameter|Type|Required|Description
     ---|---|---|---|
     filedata|file|true|The binary file for the release. For compatibility you should ZIP the base folder of your mod, or if it is a collection of files which live in a pre-existing game folder, you should ZIP those files. Your file must meet the following conditions:<br><br>- File must be __zipped__ and cannot exceed 5GB in filesize<br>- Filename's cannot contain any of the following charcters: <code>\ / ? " < > &#124; : *</code><br>- Mods which span multiple game directories are not supported unless the game manages this<br>- Mods which overwrite files are not supported unless the game manages this
     version|string||Version of the file release (recommended format 1.0.0 - MAJOR.MINOR.PATCH).
     changelog|string||Changelog of this release.
     active|boolean||_Default value is true._ Flag this upload as the current release, this will change the `modfile` field on the parent mod to the `id` of this file after upload.<br><br>__NOTE:__ If the _active_ parameter is _true_, a [__MODFILE_CHANGED__ event](#get-mod-events) will be fired, so game clients know there is an update available for this mod.
     filehash|string||MD5 of the submitted file. When supplied the MD5 will be compared against the uploaded files MD5. If they don't match a `422 Unprocessible Entity` error will be returned.
     metadata_blob|string||Metadata stored by the game developer which may include properties such as what version of the game this file is compatible with.


> Example response

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
  "metadata_blob": "rogue,hd,high-res,4k,hd textures",
  "download": {
    "binary_url": "https://mod.io/mods/file/1/c489a0354111a4d76640d47f0cdcb294",
    "date_expires": 1579316848
  }
}

```
<h3 id="Add-Modfile-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)||Resource Created|[Modfile Object](#schemamodfile_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15006|The authenticated user does not have permission to upload modfiles for the specified mod, ensure the user is a team manager or administrator.|[Error Object](#schemaerror_object)
422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|13002|The payload passed in the request was unable to be validated/read by mod.io, please try again.|[Error Object](#schemaerror_object)

### Response Headers

Status|Header|Type|Format|Description
---|---|---|---|---|
201|Location|string||URL to newly created resource

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
## Edit Modfile

> Example request

```shell
# You can also use wget
curl -X PUT https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id} \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json'

```

```http
PUT https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id} HTTP/1.1
Host: api.mod.io

Accept: application/json
Authorization: Bearer {access-token}
Content-Type: application/x-www-form-urlencoded


```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
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
  'Authorization':'Bearer {access-token}',
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

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}',
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

Edit the details of a published file. If you want to update fields other than the `changelog`, `version` and `active` status, you should add a new file instead. Successful request will return updated [Modfile Object](#modfile-object).

     Parameter|Type|Required|Description
     ---|---|---|---|
     version|string||Version of the file release (recommended format 1.0.0 - MAJOR.MINOR.PATCH).
     changelog|string||Changelog of this release.
     active|boolean||Flag this upload as the current release.<br><br>__NOTE:__ If the _active_ parameter causes the parent mods `modfile` parameter to change, a [__MODFILE_CHANGED__ event](#get-mod-events) will be fired, so game clients know there is an update available for this mod.
     metadata_blob|string||Metadata stored by the game developer which may include properties such as what version of the game this file is compatible with.


> Example response

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
  "metadata_blob": "rogue,hd,high-res,4k,hd textures",
  "download": {
    "binary_url": "https://mod.io/mods/file/1/c489a0354111a4d76640d47f0cdcb294",
    "date_expires": 1579316848
  }
}

```
<h3 id="Edit-Modfile-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Update Successful|[Modfile Object](#schemamodfile_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15007|The authenticated user does not have permission to update modfiles for the specified mod, ensure the user is a team manager or administrator.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15033|The authenticated user does not have permission to update modfile metadata for the specified mod, ensure the user is a team manager or administrator.|[Error Object](#schemaerror_object)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
## Delete Modfile

> Example request

```shell
# You can also use wget
curl -X DELETE https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id} \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json'

```

```http
DELETE https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id} HTTP/1.1
Host: api.mod.io

Accept: application/json
Authorization: Bearer {access-token}
Content-Type: application/x-www-form-urlencoded


```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id}',
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
  'Authorization':'Bearer {access-token}',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id}',
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

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}',
  'Content-Type': 'application/x-www-form-urlencoded',
  'Accept': 'application/json'
}

r = requests.delete('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id}', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id}");
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

`DELETE /games/{game-id}/mods/{mod-id}/files/{file-id}`

Delete a modfile. Successful request will return `204 No Content`.<br><br>__NOTE:__ A modfile can never be removed if it is the current active release for the corresponding mod regardless of user permissions. Furthermore, this ability is only available if you are authenticated as the game administrator for this game _or_ are the original uploader of the modfile.


> Example response

```json
 204 No Content 

```
<h3 id="Delete-Modfile-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)||Successful Request. No Body Returned.|None
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15008|The authenticated user does not have permission to delete modfiles for the specified mod, ensure the user is a team manager or administrator.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15009|The active (primary) modfile for a mod cannot be deleted.|[Error Object](#schemaerror_object)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
# Subscribe

## Subscribe To Mod

> Example request

```shell
# You can also use wget
curl -X POST https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/subscribe \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json'

```

```http
POST https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/subscribe HTTP/1.1
Host: api.mod.io

Accept: application/json
Authorization: Bearer {access-token}
Content-Type: application/x-www-form-urlencoded


```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
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
  'Authorization':'Bearer {access-token}',
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

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}',
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

Subscribe the _authenticated user_ to a corresponding mod. No body parameters are required for this action. Successful request will return the [Mod Object](#mod-object) of the newly subscribed mod.<br><br>__NOTE:__ Users can subscribe to mods via mod.io, we recommend you poll or call the [Get User Events](#get-user-events) endpoint when needed, to keep a users mods collection up to date.


> Example response

```json
{
  "id": 2,
  "game_id": 2,
  "status": 1,
  "visible": 1,
  "submitted_by": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "date_online": 1509922961,
    "avatar": {
      "filename": "modio-color-dark.png",
      "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
      "thumb_50x50": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
      "thumb_100x100": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
    },
    "timezone": "",
    "language": "",
    "profile_url": "https://mod.io/members/xant"
  },
  "date_added": 1492564103,
  "date_updated": 1499841487,
  "date_live": 1499841403,
  "maturity_option": 0,
  "logo": {
    "filename": "modio-color-dark.png",
    "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
    "thumb_320x180": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
    "thumb_640x360": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
    "thumb_1280x720": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
  },
  "homepage_url": "https://www.rogue-hdpack.com/",
  "name": "Rogue Knight HD Pack",
  "name_id": "rogue-knight-hd-pack",
  "summary": "It's time to bask in the glory of beautiful 4k textures!",
  "description": "<p>Rogue HD Pack does exactly what you thi...",
  "description_plaintext": "Rogue HD Pack does exactly what you thi...",
  "metadata_blob": "rogue,hd,high-res,4k,hd textures",
  "profile_url": "https://rogue-knight.mod.io/rogue-knight-hd-pack",
  "media": {
    "youtube": [
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    ],
    "sketchfab": [
      "https://sketchfab.com/models/ef40b2d300334d009984c8865b2db1c8"
    ],
    "images": [
      {
        "filename": "modio-color-dark.png",
        "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
        "thumb_320x180": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
      }
    ]
  },
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
    "metadata_blob": "rogue,hd,high-res,4k,hd textures",
    "download": {
      "binary_url": "https://mod.io/mods/file/1/c489a0354111a4d76640d47f0cdcb294",
      "date_expires": 1579316848
    }
  },
  "metadata_kvp": [
    {
      "metakey": "pistol-dmg",
      "metavalue": "800"
    }
  ],
  "tags": [
    {
      "name": "Unity",
      "date_added": 1499841487
    }
  ],
  "stats": {
    "mod_id": 2,
    "popularity_rank_position": 13,
    "popularity_rank_total_mods": 204,
    "downloads_total": 27492,
    "subscribers_total": 16394,
    "ratings_total": 1230,
    "ratings_positive": 1047,
    "ratings_negative": 183,
    "ratings_percentage_positive": 91,
    "ratings_weighted_aggregate": 87.38,
    "ratings_display_text": "Very Positive",
    "date_expires": 1492564103
  }
}

```
<h3 id="Subscribe-To-Mod-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)||Subscription Successful|[Mod Object](#schemamod_object)
400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|15004|The authenticated user is already subscribed to the mod.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15000|The requested mod cannot be subscribed to at this time due to a DMCA takedown request.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15001|The requested mod cannot be subscribed to due to being marked as 'hidden'.|[Error Object](#schemaerror_object)

### Response Headers

Status|Header|Type|Format|Description
---|---|---|---|---|
201|Location|string||URL to newly created resource

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
## Unsubscribe From Mod

> Example request

```shell
# You can also use wget
curl -X DELETE https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/subscribe \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json'

```

```http
DELETE https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/subscribe HTTP/1.1
Host: api.mod.io

Accept: application/json
Authorization: Bearer {access-token}
Content-Type: application/x-www-form-urlencoded


```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
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
  'Authorization':'Bearer {access-token}',
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

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}',
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

Unsubscribe the _authenticated user_ from the corresponding mod. No body parameters are required for this action. Successful request will return `204 No Content`.<br><br>__NOTE:__ Users can unsubscribe from mods via mod.io, we recommend you poll or call the [Get Mod Events](#get-mod-events) endpoint when needed, to keep a users mods collection up to date.


> Example response

```json
 204 No Content 

```
<h3 id="Unsubscribe-From-Mod-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)||Successful Request. No Body Returned.|None
400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|15005|The requested user is not currently subscribed to the requested mod.|[Error Object](#schemaerror_object)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
# Comments

## Get Mod Comments

> Example request

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

Get all comments posted in the mods profile. Successful request will return an array of [Comment Objects](#get-mod-comments-2). We recommended reading the [filtering documentation](#filtering) to return only the records you want.

     Filter|Type|Description
     ---|---|---
     id|integer|Unique id of the comment.
     mod_id|integer|Unique id of the mod.
     submitted_by|integer|Unique id of the user who posted the comment.
     date_added|integer|Unix timestamp of date comment was posted.
     reply_id|integer|Id of the parent comment this comment is replying to (can be 0 if the comment is not a reply).
     thread_position|string|Levels of nesting in a comment thread. You should order by this field, to maintain comment grouping. How it works:<br><br>- The first comment will have the position '01'.<br>- The second comment will have the position '02'.<br>- If someone responds to the second comment the position will be '02.01'.<br>- A maximum of 3 levels is supported.
     karma|integer|Karma received for the comment (can be positive or negative).
     content|string|Contents of the comment.


> Example response

```json
{
  "data": [
    {
      "id": 2,
      "mod_id": 2,
      "user": {
        "id": 1,
        "name_id": "xant",
        "username": "XanT",
        "date_online": 1509922961,
        "avatar": {
          "filename": "modio-color-dark.png",
          "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
          "thumb_50x50": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
          "thumb_100x100": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
        },
        "timezone": "",
        "language": "",
        "profile_url": "https://mod.io/members/xant"
      },
      "date_added": 1499841487,
      "reply_id": 0,
      "thread_position": "01",
      "karma": 1,
      "karma_guest": 0,
      "content": "Hey <a href=\"https://mod.io/members/XanT\">XanT</a>, you should check out this mod!"
    }
  ],
  "result_count": 1,
  "result_offset": 0,
  "result_limit": 100,
  "result_total": 1
}

```
<h3 id="Get-Mod-Comments-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||OK|[Get Mod Comments](#schemaget_mod_comments)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>, <a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
## Add Mod Comment

> Example request

```shell
# You can also use wget
curl -X POST https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/comments \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'replyid=0' \
  -d 'content=Hey @XanT, you should check out this mod!'

```

```http
POST https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/comments HTTP/1.1
Host: api.mod.io
Content-Type: application/x-www-form-urlencoded
Accept: application/json
Authorization: Bearer {access-token}


```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/comments',
  method: 'post',

  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

```javascript--nodejs
const request = require('node-fetch');
const inputBody = '{
  "replyid": 0,
  "content": "Hey @XanT, you should check out this mod!"
}';
const headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/comments',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}',
  'Content-Type': 'application/x-www-form-urlencoded',
  'Accept': 'application/json'
}

r = requests.post('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/comments', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/comments");
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

`POST /games/{game-id}/mods/{mod-id}/comments`

Add a comment for the corresponding mod. Successful request will return the newly created [Comment Object](#comment-object) and fire a __MOD_COMMENT_ADDED__ event.

     Parameter|Type|Required|Description
     ---|---|---|---|
     content|string|true|Contents of the comment. You can include @mentions to users, which will notify them that they have been tagged in this comment.<br><br>__Mention Markup__<br>- Format: `@<display-name>`<br>- Example: `Hey @XanT, you should check out this mod!`
     reply_id|integer||Id of the parent comment to reply to (can be 0 if the comment is not a reply and thus will not be nested). Default is 0.


> Example response

```json
{
  "id": 2,
  "mod_id": 2,
  "user": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "date_online": 1509922961,
    "avatar": {
      "filename": "modio-color-dark.png",
      "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
      "thumb_50x50": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
      "thumb_100x100": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
    },
    "timezone": "",
    "language": "",
    "profile_url": "https://mod.io/members/xant"
  },
  "date_added": 1499841487,
  "reply_id": 0,
  "thread_position": "01",
  "karma": 1,
  "karma_guest": 0,
  "content": "Hey <a href=\"https://mod.io/members/XanT\">XanT</a>, you should check out this mod!"
}

```
<h3 id="Add-Mod-Comment-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)||Resource Created|[Comment Object](#schemacomment_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15042|The authenticated user does not have permission to submit comments on mod.io due to their access being revoked.|[Error Object](#schemaerror_object)

### Response Headers

Status|Header|Type|Format|Description
---|---|---|---|---|
201|Location|string||URL to newly created resource

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
## Get Mod Comment

> Example request

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

Get a Mod Comment. Successful request will return a single [Comment Object](#comment-object).


> Example response

```json
{
  "id": 2,
  "mod_id": 2,
  "user": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "date_online": 1509922961,
    "avatar": {
      "filename": "modio-color-dark.png",
      "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
      "thumb_50x50": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
      "thumb_100x100": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
    },
    "timezone": "",
    "language": "",
    "profile_url": "https://mod.io/members/xant"
  },
  "date_added": 1499841487,
  "reply_id": 0,
  "thread_position": "01",
  "karma": 1,
  "karma_guest": 0,
  "content": "Hey <a href=\"https://mod.io/members/XanT\">XanT</a>, you should check out this mod!"
}

```
<h3 id="Get-Mod-Comment-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Comment Object](#schemacomment_object)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>, <a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
## Update Mod Comment

> Example request

```shell
# You can also use wget
curl -X PUT https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id} \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json'
  -d 'content=Test comment'

```

```http
PUT https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id} HTTP/1.1
Host: api.mod.io
Content-Type: application/x-www-form-urlencoded
Accept: application/json
Authorization: Bearer {access-token}


```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}',
  method: 'put',

  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

```javascript--nodejs
const request = require('node-fetch');
const inputBody = '{
  "content": "Test comment"
}';
const headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}',
  'Content-Type': 'application/x-www-form-urlencoded',
  'Accept': 'application/json'
}

r = requests.put('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}");
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

`PUT /games/{game-id}/mods/{mod-id}/comments/{comment-id}`

Update a comment for the corresponding mod. Successful request will return the updated [Comment Object](#comment-object).

     Parameter|Type|Required|Description
     ---|---|---|---|
     content|string|true|Updated contents of the comment.


> Example response

```json
{
  "id": 2,
  "mod_id": 2,
  "user": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "date_online": 1509922961,
    "avatar": {
      "filename": "modio-color-dark.png",
      "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
      "thumb_50x50": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
      "thumb_100x100": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
    },
    "timezone": "",
    "language": "",
    "profile_url": "https://mod.io/members/xant"
  },
  "date_added": 1499841487,
  "reply_id": 0,
  "thread_position": "01",
  "karma": 1,
  "karma_guest": 0,
  "content": "Hey <a href=\"https://mod.io/members/XanT\">XanT</a>, you should check out this mod!"
}

```
<h3 id="Update-Mod-Comment-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Update Successful|[Comment Object](#schemacomment_object)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
## Delete Mod Comment

> Example request

```shell
# You can also use wget
curl -X DELETE https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id} \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json'

```

```http
DELETE https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id} HTTP/1.1
Host: api.mod.io

Accept: application/json
Authorization: Bearer {access-token}
Content-Type: application/x-www-form-urlencoded


```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
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
  'Authorization':'Bearer {access-token}',
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

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}',
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

Delete a comment from a mod profile. Successful request will return `204 No Content`  and fire a __MOD_COMMENT_DELETED__ event.


> Example response

```json
 204 No Content 

```
<h3 id="Delete-Mod-Comment-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)||Successful Request. No Body Returned.|None
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15027|The authenticated user does not have permission to delete comments for this mod, this action is restricted to team managers & administrators only.|[Error Object](#schemaerror_object)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
# Media

## Add Game Media

> Example request

```shell
# You can also use wget
curl -X POST https://api.mod.io/v1/games/{game-id}/media \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: multipart/form-data' \ 
  -H 'Accept: application/json' \
  -F 'logo=@/path/to/logo.jpg' \
  -F 'icon=@/path/to/icon.jpg' \
  -F 'header=@/path/to/header.jpg'

```

```http
POST https://api.mod.io/v1/games/{game-id}/media HTTP/1.1
Host: api.mod.io
Content-Type: multipart/form-data
Accept: application/json
Authorization: Bearer {access-token}


```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
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
const inputBody = '{
  "logo": "@/path/to/logo.jpg",
  "icon": "@/path/to/icon.jpg",
  "header": "@/path/to/header.jpg"
}';
const headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'multipart/form-data',
  'Accept':'application/json'

};

fetch('https://api.mod.io/v1/games/{game-id}/media',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}',
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

Upload new media to a game. The request `Content-Type` header __must__ be `multipart/form-data` to submit image files. Any request you make to this endpoint *should* contain a binary file for each of the fields you want to update below. Successful request will return [Message Object](#message-object).

    __NOTE:__ You can also add media to [your games profile](https://mod.io/games) on the mod.io website. This is the recommended approach.

    Parameter|Type|Required|Description
    ---|---|---|---|
    logo|file||Image file which will represent your games logo. Must be gif, jpg or png format and cannot exceed 8MB in filesize. Dimensions must be at least 640x360 and we recommended you supply a high resolution image with a 16 / 9 ratio. mod.io will use this logo to create three thumbnails with the dimensions of 320x180, 640x360 and 1280x720.
    icon|file||Image file which will represent your games icon. Must be gif, jpg or png format and cannot exceed 1MB in filesize. Dimensions must be at least 64x64 and a transparent png that works on a colorful background is recommended. mod.io will use this icon to create three thumbnails with the dimensions of 64x64, 128x128 and 256x256.
    header|file||Image file which will represent your games header. Must be gif, jpg or png format and cannot exceed 256KB in filesize. Dimensions of 400x100 and a light transparent png that works on a dark background is recommended.


> Example response

```json
{
  "code": 200,
  "message": "You have successfully added new media to the specified game profile."
}

```
<h3 id="Add-Game-Media-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Media Successfully uploaded|[Message Object](#message-object)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
## Add Mod Media

> Example request

```shell
# You can also use wget
curl -X POST https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/media \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: multipart/form-data' \ 
  -H 'Accept: application/json' \
  -F 'logo=@/path/to/logo.jpg' \
  -F 'images=@/path/to/image-collection.zip' \
  -F 'image1=@/path/to/image1.jpg' \
  -F 'image2=@/path/to/image2.jpg' \
  -F 'youtube[]=https://www.youtube.com/watch?v=dQw4w9WgXcQ' \
  -F 'sketchfab[]=https://sketchfab.com/models/7793b895f27841f4930e6b71f75a8d74'

```

```http
POST https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/media HTTP/1.1
Host: api.mod.io
Content-Type: multipart/form-data
Accept: application/json
Authorization: Bearer {access-token}


```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
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
const inputBody = '{
  "logo": "@/path/to/logo.jpg",
  "images": "@/path/to/image-collection.zip",
  "image1": "@/path/to/image1.jpg",
  "image2": "@/path/to/image2.jpg",
  "youtube": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "sketchfab": "https://sketchfab.com/models/7793b895f27841f4930e6b71f75a8d74"
}';
const headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'multipart/form-data',
  'Accept':'application/json'

};

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/media',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}',
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

This endpoint is very flexible and will add any images posted to the mods gallery regardless of their body name providing they are a valid image. The request `Content-Type` header __must__ be `multipart/form-data` to submit image files. Successful request will return a [Message Object](#message-object).

    __NOTE:__ You can also add media to [your mods profile](https://mod.io/mods) on the mod.io website. This is the easiest way.

    Parameter|Type|Required|Description
    ---|---|---|---|
    logo|file||Image file which will represent your mods logo. Must be gif, jpg or png format and cannot exceed 8MB in filesize. Dimensions must be at least 512x288 and we recommended you supply a high resolution image with a 16 / 9 ratio. mod.io will use this logo to create three thumbnails with the dimensions of 320x180, 640x360 and 1280x720.
    images|zip||Zip archive of images to add to the mods gallery. Only valid gif, jpg and png images in the zip file will be processed. The filename __must be images.zip__ all other zips will be ignored. Alternatively you can POST one or more images to this endpoint and they will be detected and added to the mods gallery.
    youtube|string[]||Full Youtube link(s) you want to add - example 'https://www.youtube.com/watch?v=IGVZOLV9SPo'
    sketchfab|string[]||Full Sketchfab link(s) you want to add - example 'https://sketchfab.com/models/71f04e390ff54e5f8d9a51b4e1caab7e'


> Example response

```json
{
  "code": 201,
  "message": "You have successfully added new media to the specified mod."
}

```
<h3 id="Add-Mod-Media-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)||Resource Created|[Message Object](#message-object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15035|The authenticated user does not have permission to add media for this mod, this action is restricted to team managers & administrators only.|[Error Object](#schemaerror_object)

### Response Headers

Status|Header|Type|Format|Description
---|---|---|---|---|
201|Location|string||URL to newly created resource

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
## Delete Mod Media

> Example request

```shell
# You can also use wget
curl -X DELETE https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/media \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'images[]=filename.jpg' \
  -d 'youtube[]=https://www.youtube.com/watch?v=dQw4w9WgXcQ' \
  -d 'sketchfab[]=https://sketchfab.com/models/7793b895f27841f4930e6b71f75a8d74'

```

```http
DELETE https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/media HTTP/1.1
Host: api.mod.io
Content-Type: application/x-www-form-urlencoded
Accept: application/json
Authorization: Bearer {access-token}


```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
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
const inputBody = '{
  "images": "filename.jpg",
  "youtube": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "sketchfab": "https://sketchfab.com/models/7793b895f27841f4930e6b71f75a8d74"
}';
const headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/media',
{
  method: 'DELETE',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}',
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

Delete images, sketchfab or youtube links from a mod profile. Successful request will return `204 No Content`.

    __NOTE:__ You can also delete media from [your mods profile](https://mod.io/mods) on the mod.io website. This is the easiest way.

    Parameter|Type|Required|Description
    ---|---|---|---|
    images|string[]||Filename's of the image(s) you want to delete - example 'gameplay2.jpg'.
    youtube|string[]||Full Youtube link(s) you want to delete - example 'https://www.youtube.com/watch?v=IGVZOLV9SPo'.
    sketchfab|string[]||Full Sketchfab link(s) you want to delete - example 'https://sketchfab.com/models/71f04e390ff54e5f8d9a51b4e1caab7e'.


> Example response

```json
 204 No Content 

```
<h3 id="Delete-Mod-Media-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)||Successful Request. No Body Returned.|None
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15036|The authenticated user does not have permission to delete media from this mod, this action is restricted to team managers & administrators only.|[Error Object](#schemaerror_object)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
# Events

## Get Mods Events

> Example request

```shell
# You can also use wget
curl -X GET https://api.mod.io/v1/games/{game-id}/mods/events?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mod.io/v1/games/{game-id}/mods/events?api_key=YourApiKey HTTP/1.1
Host: api.mod.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/games/{game-id}/mods/events',
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

fetch('https://api.mod.io/v1/games/{game-id}/mods/events?api_key=YourApiKey',
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

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.mod.io/v1/games/{game-id}/mods/events', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods/events?api_key=YourApiKey");
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

`GET /games/{game-id}/mods/events`

Get all mods events for the corresponding game sorted by latest event first. Successful request will return an array of [Event Objects](#get-mod-events-2).<br><br>__NOTE:__ We recommend you poll this endpoint to keep mods up-to-date. If polling this endpoint for updates you should store the `id` or `date_added` of the latest event, and on subsequent requests use that information [in the filter](#filtering), to return only newer events to process.

    Filter|Type|Description
    ---|---|---
    id|integer|Unique id of the event object.
    mod_id|integer|Unique id of the parent mod.
    user_id|integer|Unique id of the user who performed the action.
    date_added|integer|Unix timestamp of date mod event occurred.
    event_type|string|Type of change that occurred:<br><br>__MODFILE_CHANGED__ = Primary file changed<br>__MOD_AVAILABLE__ = Mod is marked as accepted and public<br>__MOD_UNAVAILABLE__ = Mod is marked as not accepted, deleted or hidden<br>__MOD_EDITED__ = The mod was updated (triggered when any column value changes)<br>__MOD_DELETED__ = The mod has been permanently erased. This is an orphan record, looking up this id will return no data<br>__MOD_TEAM_CHANGED__ = A user has joined or left the mod team<br>__MOD_COMMENT_ADDED__ = A comment has been published for a mod<br>__MOD_COMMENT_DELETED__ = A comment has been deleted from a mod
    latest|boolean|_Default value is true_. Returns only the latest unique events, which is useful for checking if the primary `modfile` has changed.
    subscribed|boolean|_Default value is false_. Returns only events connected to mods the __authenticated user__ is subscribed to, which is useful for keeping the users mods up-to-date.


> Example response

```json
{
  "data": [
    {
      "id": 13,
      "mod_id": 13,
      "user_id": 13,
      "date_added": 1499846132,
      "event_type": "MODFILE_CHANGED"
    },
    {
        ...
    }
  ],
  "result_count": 70,
  "result_offset": 0,
  "result_limit": 100,
  "result_total": 70
}

```
<h3 id="Get-Mods-Events-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Get Mod Events](#schemaget_mod_events)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>, <a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
## Get Mod Events

> Example request

```shell
# You can also use wget
curl -X GET https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/events?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/events?api_key=YourApiKey HTTP/1.1
Host: api.mod.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/events',
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

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/events?api_key=YourApiKey',
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

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/events', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/events?api_key=YourApiKey");
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

`GET /games/{game-id}/mods/{mod-id}/events`

Get the event log for a mod, showing changes made sorted by latest event first. Successful request will return an array of [Event Objects](#get-mod-events-2). We recommended reading the [filtering documentation](#filtering) to return only the records you want.


> Example response

```json
{
  "data": [
    {
      "id": 13,
      "mod_id": 13,
      "user_id": 13,
      "date_added": 1499846132,
      "event_type": "MODFILE_CHANGED"
    },
    {
        ...
    }
  ],
  "result_count": 70,
  "result_offset": 0,
  "result_limit": 100,
  "result_total": 70
}

```
<h3 id="Get-Mod-Events-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Get Mod Events](#schemaget_mod_events)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>, <a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
# Tags

## Get Mod Tags

> Example request

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
    date_added|integer|Unix timestamp of date tag was added.
    tag|string|String representation of the tag. You can check the eligible tags on the parent game object to determine all possible values for this field.


> Example response

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
  "result_count": 70,
  "result_offset": 0,
  "result_limit": 100,
  "result_total": 70
}

```
<h3 id="Get-Mod-Tags-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Get Mod Tags](#schemaget_mod_tags)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>, <a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
## Add Mod Tags

> Example request

```shell
# You can also use wget
curl -X POST https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/tags \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'tags[]=easy'

```

```http
POST https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/tags HTTP/1.1
Host: api.mod.io
Content-Type: application/x-www-form-urlencoded
Accept: application/json
Authorization: Bearer {access-token}


```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
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
const inputBody = '{
  "tags": "easy"
}';
const headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/tags',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}',
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

Add tags to a mod's profile. You can only add tags allowed by the parent game, which are listed in the `tag_option` column in the [Game's Object](#game-object). Successful request will return [Message Object](#message-object).

    Parameter|Type|Required|Description
    ---|---|---|---|
    tags|string[]|true|An array of tags to add. For example: If the parent game has a 'Theme' tag group with 'Fantasy', 'Sci-fi', 'Western' and 'Realistic' as the options, you could add 'Fantasy' and 'Sci-fi' to the `tags` array in your request. Provided the tags are valid you can add any number.


> Example response

```json
{
  "code": 201,
  "message": "You have successfully added tags to the specified mod."
}

```
<h3 id="Add-Mod-Tags-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)||Created|[addModTag](#schemaaddmodtag)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15037|The authenticated user does not have permission to submit tags for the specified mod. Ensure the user is part of the mod team before attempting the request again.|[Error Object](#schemaerror_object)

### Response Headers

Status|Header|Type|Format|Description
---|---|---|---|---|
201|Location|string||URL to newly created resource

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
## Delete Mod Tags

> Example request

```shell
# You can also use wget
curl -X DELETE https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/tags \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'tags[]=easy'

```

```http
DELETE https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/tags HTTP/1.1
Host: api.mod.io
Content-Type: application/x-www-form-urlencoded
Accept: application/json
Authorization: Bearer {access-token}


```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
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
const inputBody = '{
  "tags": "easy"
}';
const headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/tags',
{
  method: 'DELETE',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}',
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

Delete tags from a mod's profile. Deleting tags is identical to adding tags except the request method is `DELETE` instead of `POST`. Successful request will return `204 No Content`.

    Parameter|Type|Required|Description
    ---|---|---|---|
    tags|string[]|true|An array of tags to delete.


> Example response

```json
 204 No Content 

```
<h3 id="Delete-Mod-Tags-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)||Successful Request. No Body Returned.|None
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15038|The authenticated user does not have permission to delete tags for the specified mod. Ensure the user is part of the mod team before attempting the request again.|[Error Object](#schemaerror_object)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
## Get Game Tag Options

> Example request

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

Get all tags for the corresponding game, that can be applied to any of its mods. Hidden tag groups will only be returned if the authenticated user is a team member of the parent game with either `Manager` or `Administrator` status. Successful request will return an array of [Game Tag Option Objects](#game-tag-option-object).


> Example response

```json
{
  "data": [
    {
      "name": "Theme",
      "type": "checkboxes",
      "tags": [
        "Horror"
      ],
      "hidden": false
    },
    {
        ...
    }
  ],
  "result_count": 70,
  "result_offset": 0,
  "result_limit": 100,
  "result_total": 70
}

```
<h3 id="Get-Game-Tag-Options-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Get Game Tag Options](#schemaget_game_tag_options)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>, <a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
## Add Game Tag Option

> Example request

```shell
# You can also use wget
curl -X POST https://api.mod.io/v1/games/{game-id}/tags \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'name=Difficulty' \
  -d 'type=dropdown' \
  -d 'hidden=false' \
  -d 'tags[]=easy&tags[]=medium&tags=hard'

```

```http
POST https://api.mod.io/v1/games/{game-id}/tags HTTP/1.1
Host: api.mod.io
Content-Type: application/x-www-form-urlencoded
Accept: application/json
Authorization: Bearer {access-token}


```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
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
const inputBody = '{
  "name": "Difficulty",
  "type": "dropdown",
  "hidden": "false",
  "tags": "easy&tags[]=medium&tags=hard"
}';
const headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://api.mod.io/v1/games/{game-id}/tags',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}',
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

Add tags which mods can apply to their profiles. Successful request will return [Message Object](#message-object).

    Tagging is a critical feature that powers the searching and filtering of mods for your game, as well as allowing you to control how mods are installed and played. For example you might enforce mods to be a particular type (map, model, script, save, effects, blueprint), which dictates how you install it. You may use tags to specify what the mod replaces (building, prop, car, boat, character). Or perhaps the tags describe the theme of the mod (fun, scenic, realism). The implementation is up to you, but the more detail you support the better filtering and searching becomes. If you need to store more advanced information, you can also use [Metadata Key Value Pairs](#metadata).

    __NOTE:__ You can also manage tags by editing [your games profile](https://mod.io/games) on the mod.io website. This is the recommended approach.

    Parameter|Type|Required|Description
    ---|---|---|---|
    name|string|true|Name of the tag group, for example you may want to have 'Difficulty' as the name with 'Easy', 'Medium' and 'Hard' as the tag values.<br><br>__NOTE:__ If the tag name already exists, its parameters will be overwritten and new tags will be added to the group (an edit). There is a separate endpoint to [delete tags](#delete-game-tag-option).
    type|string|true|Determines whether you allow users to only select one tag (dropdown) or multiple tags (checkbox):<br><br>- _dropdown_ = Mods can select only one tag from this group, dropdown menu shown on site profile.<br>- _checkboxes_ = Mods can select multiple tags from this group, checkboxes shown on site profile.
    hidden|boolean||This group of tags should be hidden from users and mod developers. Useful for games to tag special functionality, to filter on and use behind the scenes. You can also use [Metadata Key Value Pairs](#metadata) for more arbitrary data.
    tags|string[]|true|Array of tags mod creators can choose to apply to their profiles.


> Example response

```json
{
  "code": 201,
  "message": "You have successfully added categories/tags to the specified game."
}

```
<h3 id="Add-Game-Tag-Option-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)||Created|[Message Object](#message-object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|14012|The authenticated user does not have permission to submit tags for the specified game. Ensure the user is part of the game team before attempting the request again.|[Error Object](#schemaerror_object)

### Response Headers

Status|Header|Type|Format|Description
---|---|---|---|---|
201|Location|string||URL to newly created resource

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
## Delete Game Tag Option

> Example request

```shell
# You can also use wget
curl -X DELETE https://api.mod.io/v1/games/{game-id}/tags \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'name=Difficulty' \
  -d 'tags[]=easy'

```

```http
DELETE https://api.mod.io/v1/games/{game-id}/tags HTTP/1.1
Host: api.mod.io
Content-Type: application/x-www-form-urlencoded
Accept: application/json
Authorization: Bearer {access-token}


```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
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
const inputBody = '{
  "name": "Difficulty",
  "tags": "easy"
}';
const headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://api.mod.io/v1/games/{game-id}/tags',
{
  method: 'DELETE',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}',
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

Delete an entire group of tags or individual tags. Successful request will return `204 No Content`.

    __NOTE:__ You can also manage tags by editing [your games profile](https://mod.io/games) on the mod.io website. This is the recommended approach.

    Parameter|Type|Required|Description
    ---|---|---|---|
    name|string|true|Name of the tag group that you want to delete tags from.
    tags|string[]|true|Array of strings representing the tag options to delete. An empty array will delete the entire group. For example:<br><br>Assume you have a group of tags titled 'Difficulty' and you want to remove the tag option 'Hard' from it. The `name` parameter would have the value 'Difficulty', and the `tags` array would have one value 'Hard'.


> Example response

```json
 204 No Content 

```
<h3 id="Delete-Game-Tag-Option-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)||Successful Request. No Body Returned.|None
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|14013|The authenticated user does not have permission to delete tags for the specified game. Ensure the user is part of the game team before attempting the request again.|[Error Object](#schemaerror_object)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
# Ratings

## Add Mod Rating

> Example request

```shell
# You can also use wget
curl -X POST https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/ratings \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'rating=1'

```

```http
POST https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/ratings HTTP/1.1
Host: api.mod.io
Content-Type: application/x-www-form-urlencoded
Accept: application/json
Authorization: Bearer {access-token}


```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
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
const inputBody = '{
  "rating": "1"
}';
const headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/ratings',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}',
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

Submit a positive or negative rating for a mod. Each user can supply only one rating for a mod, subsequent ratings will override the old value. Successful request will return [Message Object](#message-object).

     __NOTE:__ You can order mods by their rating, and view their rating in the [Mod Object](#mod-object).

     Parameter|Type|Required|Description
     ---|---|---|---|
     rating|integer|true|The _authenticated users_ mod rating:<br><br>__1__ = Positive rating (thumbs up)<br>__-1__ = Negative rating (thumbs down)


> Example response

```json
{
  "code": 201,
  "message": "You have successfully submitted a rating for the specified mod."
}

```
<h3 id="Add-Mod-Rating-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)||Resource created|[Message Object](#message-object)
400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|15028|The authenticated user has already submitted a rating for this mod.|[Error Object](#schemaerror_object)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
# Stats

## Get Mods Stats

> Example request

```shell
# You can also use wget
curl -X GET https://api.mod.io/v1/games/{game-id}/mods/stats?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mod.io/v1/games/{game-id}/mods/stats?api_key=YourApiKey HTTP/1.1
Host: api.mod.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/games/{game-id}/mods/stats',
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

fetch('https://api.mod.io/v1/games/{game-id}/mods/stats?api_key=YourApiKey',
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

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.mod.io/v1/games/{game-id}/mods/stats', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods/stats?api_key=YourApiKey");
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

`GET /games/{game-id}/mods/stats`

Get all mod stats for mods of the corresponding game. Successful request will return an array of [Mod Stats Objects](#get-mod-stats).<br><br>__NOTE:__ We highly recommend you apply filters to this endpoint to get only the results you need. For more information regarding filtering please see the [filtering](#filtering) section.

    Filter|Type|Description
    ---|---|---
    mod_id|integer|Unique id of the mod.
    popularity_rank_position|integer|Current ranking by popularity for the corresponding mod.
    popularity_rank_total_mods|integer|Global mod count in which `popularity_rank_position` is compared against.
    downloads_total|integer|A sum of all modfile downloads for the corresponding mod.
    subscribers_total|integer|A sum of all current subscribers for the corresponding mod.
    ratings_positive|integer|Amount of positive ratings.
    ratings_negative|integer|Amount of negative ratings.


> Example response

```json
{
  "data": [
    {
      "mod_id": 2,
      "popularity_rank_position": 13,
      "popularity_rank_total_mods": 204,
      "downloads_total": 27492,
      "subscribers_total": 16394,
      "ratings_total": 1230,
      "ratings_positive": 1047,
      "ratings_negative": 183,
      "ratings_percentage_positive": 91,
      "ratings_weighted_aggregate": 87.38,
      "ratings_display_text": "Very Positive",
      "date_expires": 1492564103
    },
    {
        ...
    }
  ],
  "result_count": 70,
  "result_offset": 0,
  "result_limit": 100,
  "result_total": 70
}

```
<h3 id="Get-Mods-Stats-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Get Mod Stats](#schemaget_mod_stats)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>, <a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
## Get Mod Stats

> Example request

```shell
# You can also use wget
curl -X GET https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/stats?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/stats?api_key=YourApiKey HTTP/1.1
Host: api.mod.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/stats',
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

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/stats?api_key=YourApiKey',
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

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/stats', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/stats?api_key=YourApiKey");
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

`GET /games/{game-id}/mods/{mod-id}/stats`

Get mod stats for the corresponding mod. Successful request will return a single [Mod Stats Object](#mod-stats-object).


> Example response

```json
{
  "mod_id": 2,
  "popularity_rank_position": 13,
  "popularity_rank_total_mods": 204,
  "downloads_total": 27492,
  "subscribers_total": 16394,
  "ratings_total": 1230,
  "ratings_positive": 1047,
  "ratings_negative": 183,
  "ratings_percentage_positive": 91,
  "ratings_weighted_aggregate": 87.38,
  "ratings_display_text": "Very Positive",
  "date_expires": 1492564103
}

```
<h3 id="Get-Mod-Stats-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Mod Stats Object](#schemamod_stats_object)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>, <a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
## Get Game Stats

> Example request

```shell
# You can also use wget
curl -X GET https://api.mod.io/v1/games/{game-id}/stats?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mod.io/v1/games/{game-id}/stats?api_key=YourApiKey HTTP/1.1
Host: api.mod.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/games/{game-id}/stats',
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

fetch('https://api.mod.io/v1/games/{game-id}/stats?api_key=YourApiKey',
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

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.mod.io/v1/games/{game-id}/stats', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/games/{game-id}/stats?api_key=YourApiKey");
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

`GET /games/{game-id}/stats`

Get game stats for the corresponding game. Successful request will return a single [Game Stats Object](#game-stats-object).


> Example response

```json
{
  "game_id": 2,
  "mods_count_total": 13,
  "mods_downloads_today": 204,
  "mods_downloads_total": 27492,
  "mods_downloads_daily_average": 1230,
  "mods_subscribers_total": 16394,
  "date_expires": 1492564103
}

```
<h3 id="Get-Game-Stats-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Game Stats Object](#schemagame_stats_object)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>, <a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
# Metadata

## Get Mod KVP Metadata

> Example request

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

Get all metadata stored by the game developer for this mod as searchable key value pairs. Successful request will return an array of [Metadata KVP Objects](#get-mod-kvp-metadata-2).<br><br>__NOTE:__ Metadata can also be stored as `metadata_blob` in the [Mod Object](#mod-object).


> Example response

```json
{
  "data": [
    {
      "metakey": "pistol-dmg",
      "metavalue": "800"
    },
    {
        ...
    }
  ],
  "result_count": 70,
  "result_offset": 0,
  "result_limit": 100,
  "result_total": 70
}

```
<h3 id="Get-Mod-KVP-Metadata-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Get Mod KVP Metadata](#schemaget_mod_kvp_metadata)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>, <a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
## Add Mod KVP Metadata

> Example request

```shell
# You can also use wget
curl -X POST https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'metadata[]=pistol-dmg:88:400'

```

```http
POST https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp HTTP/1.1
Host: api.mod.io
Content-Type: application/x-www-form-urlencoded
Accept: application/json
Authorization: Bearer {access-token}


```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
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
const inputBody = '{
  "metadata": "pistol-dmg:88:400"
}';
const headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}',
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

Add metadata for this mod as searchable key value pairs. Metadata is useful to define how a mod works, or other information you need to display and manage the mod. Successful request will return [Message Object](#message-object).<br><br>For example: A mod might change gravity and the rate of fire of weapons, you could define these properties as key value pairs. We recommend the mod upload tool you create defines and submits metadata behind the scenes, because if these settings affect gameplay, invalid information may cause problems.<br><br>__NOTE:__ Metadata can also be stored as `metadata_blob` in the [Mod Object](#mod-object).

     Parameter|Type|Required|Description
     ---|---|---|---|
     metadata|string[]|true|Array containing one or more key value pairs where the the key and value are separated by a colon ':' (if the string contains multiple colons the split will occur on the first matched, i.e. pistol-dmg:800:400 will become key: `pistol-dmg`, value: `800:400`). The following restrictions apply to the supplied metadata:<br><br>- Keys support alphanumeric, '_' and '-' characters only.<br>- Keys can map to multiple values (1-to-many relationship).<br>- Keys and values cannot exceed 255 characters in length.<br>- Key value pairs are searchable by exact match only.


> Example response

```json
{
  "code": 201,
  "message": "You have successfully added new key-value metadata to the specified mod."
}

```
<h3 id="Add-Mod-KVP-Metadata-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)||Created|[Message Object](#message-object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15033|The authenticated user does not have permission to add metadata to this mod, this action is restricted to team managers & administrators only.|[Error Object](#schemaerror_object)

### Response Headers

Status|Header|Type|Format|Description
---|---|---|---|---|
201|Location|string||URL to newly created resource

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
## Delete Mod KVP Metadata

> Example request

```shell
# You can also use wget
curl -X DELETE https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'metadata[]=pistol-dmg:88:400'

```

```http
DELETE https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp HTTP/1.1
Host: api.mod.io
Content-Type: application/x-www-form-urlencoded
Accept: application/json
Authorization: Bearer {access-token}


```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
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
const inputBody = '{
  "metadata": "pistol-dmg:88:400"
}';
const headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp',
{
  method: 'DELETE',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}',
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

Delete key value pairs metadata defined for this mod. Successful request will return `204 No Content`.

     Parameter|Type|Required|Description
     ---|---|---|---|
     metadata|string[]|true|Array containing one or more key value pairs to delete where the the key and value are separated by a colon ':'. __NOTE:__ If an array value contains only the key and no colon ':', _all_ metadata with that key will be removed.


> Example response

```json
 204 No Content 

```
<h3 id="Delete-Mod-KVP-Metadata-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)||Successful Request. No Body Returned.|None
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15034|The authenticated user does not have permission to delete metadata from this mod, this action is restricted to team managers & administrators only.|[Error Object](#schemaerror_object)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
# Dependencies

## Get Mod Dependencies

> Example request

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

Get all dependencies the chosen mod has selected. This is useful if a mod requires other mods be installed for it to run. Successful request will return an array of [Mod Dependencies Objects](#get-mod-dependencies-2).

    __IMPORTANT:__ Because of the complexity of supporting nested dependencies, we recommend you treat dependencies as a recommendation for your players, and do not process dependencies automatically when installing a mod unless absolutely required. Successful request will return an array of [Mod Dependencies Objects](#mod-dependencies-object).

    __NOTE:__ Some modders might select _soft_ dependencies to promote or credit other mods. We advise against this but it is possible to do, and is one of the reasons why we recommend against processing nested dependencies automatically.


> Example response

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
  "result_count": 70,
  "result_offset": 0,
  "result_limit": 100,
  "result_total": 70
}

```
<h3 id="Get-Mod-Dependencies-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Get Mod Dependencies](#schemaget_mod_dependencies)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>, <a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
## Add Mod Dependencies

> Example request

```shell
# You can also use wget
curl -X POST https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/dependencies \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'dependencies[]=284'

```

```http
POST https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/dependencies HTTP/1.1
Host: api.mod.io
Content-Type: application/x-www-form-urlencoded
Accept: application/json
Authorization: Bearer {access-token}


```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
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
const inputBody = '{
  "dependencies": "284"
}';
const headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/dependencies',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}',
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

Add mod dependencies required by the corresponding mod. A dependency is a mod that should be installed for this mod to run. Successful request will return [Message Object](#message-object).

    Parameter|Type|Required|Description
    ---|---|---|---|
    dependencies|integer[]|true|Array containing one or more mod id's that this mod is dependent on. Max of 5 dependencies per request.


> Example response

```json
{
  "code": 201,
  "message": "You have successfully added new dependencies to the specified mod."
}

```
<h3 id="Add-Mod-Dependencies-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)||Created|[Message Object](#message-object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15031|The authenticated user does not have permission to add dependencies for this mod, this action is restricted to team managers & administrators only.|[Error Object](#schemaerror_object)

### Response Headers

Status|Header|Type|Format|Description
---|---|---|---|---|
201|Location|string||URL to newly created resource

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
## Delete Mod Dependencies

> Example request

```shell
# You can also use wget
curl -X DELETE https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/dependencies \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'dependencies[]=284'

```

```http
DELETE https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/dependencies HTTP/1.1
Host: api.mod.io
Content-Type: application/x-www-form-urlencoded
Accept: application/json
Authorization: Bearer {access-token}


```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
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
const inputBody = '{
  "dependencies": "284"
}';
const headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/dependencies',
{
  method: 'DELETE',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}',
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
    dependencies|integer[]|true|Array containing one or more mod id's that can be deleted as dependencies.


> Example response

```json
 204 No Content 

```
<h3 id="Delete-Mod-Dependencies-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)||Successful Request. No Body Returned.|None
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15032|The authenticated user does not have permission to delete dependencies for this mod, this action is restricted to team managers & administrators only.|[Error Object](#schemaerror_object)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
# Teams

## Get Mod Team Members

> Example request

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

Get all users that are part of a mod team. Successful request will return an array of [Team Member Objects](#team-member-object). We recommended reading the [filtering documentation](#filtering) to return only the records you want.

     Filter|Type|Required|Description
     ---|---|---|---|
     id|integer|Unique id of the team member record.
     user_id|integer|Unique id of the user.
     username|string|Username of the user.
     level|integer|Level of permission the user has:<br><br>__1__ = Moderator (can moderate comments and content attached)<br>__4__ = Manager (moderator access, including uploading builds and editing settings except supply and team members)<br>__8__ = Administrator (full access, including editing the supply and team)
     date_added|integer|Unix timestamp of the date the user was added to the team.
     position|string|Custom title given to the user in this team.


> Example response

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
          "filename": "modio-color-dark.png",
          "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
          "thumb_50x50": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
          "thumb_100x100": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
        },
        "timezone": "",
        "language": "",
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
  "result_count": 70,
  "result_offset": 0,
  "result_limit": 100,
  "result_total": 70
}

```
<h3 id="Get-Mod-Team-Members-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Get Team Members](#schemaget_team_members)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>, <a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
## Add Mod Team Member

> Example request

```shell
# You can also use wget
curl -X POST https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'email=walrus@example.com' \
  -d 'level=8' \
  -d 'position=Co-Founder'

```

```http
POST https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team HTTP/1.1
Host: api.mod.io
Content-Type: application/x-www-form-urlencoded
Accept: application/json
Authorization: Bearer {access-token}


```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
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
const inputBody = '{
  "email": "walrus@example.com",
  "level": "8",
  "position": "Co-Founder"
}';
const headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}',
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

Add a user to a mod team. Successful request will return [Message Object](#message-object) and fire a [__MOD_TEAM_CHANGED__ event](#get-mod-events).

     __NOTE:__ You can also add users to [your mods team](https://mod.io/mods) on the mod.io website. This is the recommended way.

     Parameter|Type|Required|Description
     ---|---|---|---|
     email|string|true|Email of the mod.io user you want to add to your team.
     level|integer|true|Level of permission the user will get:<br><br>__1__ = Moderator (can moderate comments and content attached)<br>__4__ = Manager (moderator access, including uploading builds and editing settings except supply and team members)<br>__8__ = Administrator (full access, including editing the supply and team)
     position|string||Title of the users position. For example: 'Team Leader', 'Artist'.


> Example response

```json
{
  "code": 201,
  "message": "You have successfully added a member to the specified team."
}

```
<h3 id="Add-Mod-Team-Member-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)||Created|[Message Object](#message-object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15039|The authenticated user does not have permission to add team members to this mod, this action is restricted to team leaders & administrator's only.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|21000|The specified user could not be found.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15020|You can't add yourself to a team twice, let's not be greedy now.|[Error Object](#schemaerror_object)
400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|15021|The specified user is already a member of the team.|[Error Object](#schemaerror_object)

### Response Headers

Status|Header|Type|Format|Description
---|---|---|---|---|
201|Location|string||URL to newly created resource

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
## Update Mod Team Member

> Example request

```shell
# You can also use wget
curl -X PUT https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team/{team-member-id} \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json'

```

```http
PUT https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team/{team-member-id} HTTP/1.1
Host: api.mod.io

Accept: application/json
Authorization: Bearer {access-token}
Content-Type: application/x-www-form-urlencoded


```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
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
  'Authorization':'Bearer {access-token}',
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

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}',
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

Update a mod team members details. Successful request will return a [Message Object](#message-object).

     __NOTE:__ You can also update [your mods team](https://mod.io/mods) users on the mod.io website. This is the recommended way.

     Parameter|Type|Required|Description
     ---|---|---|---|
     level|integer||Level of permission the user should have:<br><br>__1__ = Moderator (can moderate comments and content attached)<br>__4__ = Manager (moderator access, including uploading builds and editing settings except supply and team members)<br>__8__ = Administrator (full access, including editing the supply and team)
     position|string||Title of the users position. For example: 'Team Leader', 'Artist'.


> Example response

```json
{
  "code": 201,
  "message": "You have successfully updated the specified team members details."
}

```
<h3 id="Update-Mod-Team-Member-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||OK|[Message Object](#message-object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15039|The authenticated user does not have permission to update team members for this mod, this action is restricted to team leaders & administrator's only.|[Error Object](#schemaerror_object)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
## Delete Mod Team Member

> Example request

```shell
# You can also use wget
curl -X DELETE https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team/{team-member-id} \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json'

```

```http
DELETE https://api.mod.io/v1/games/{game-id}/mods/{mod-id}/team/{team-member-id} HTTP/1.1
Host: api.mod.io

Accept: application/json
Authorization: Bearer {access-token}
Content-Type: application/x-www-form-urlencoded


```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
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
  'Authorization':'Bearer {access-token}',
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

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}',
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

Delete a user from a mod team. This will revoke their access rights if they are not the original creator of the resource. Successful request will return `204 No Content` and fire a [__MOD_TEAM_CHANGED__ event](#get-mod-events).


> Example response

```json
 204 No Content 

```
<h3 id="Delete-Mod-Team-Member-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)||Successful Request. No Body Returned.|None
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15040|The authenticated user does not have permission to delete team members for this mod, this action is restricted to team leaders & administrator's only.|[Error Object](#schemaerror_object)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
# General

## Get Resource Owner

> Example request

```shell
# You can also use wget
curl -X POST https://api.mod.io/v1/general/ownership \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json'

```

```http
POST https://api.mod.io/v1/general/ownership HTTP/1.1
Host: api.mod.io

Accept: application/json
Authorization: Bearer {access-token}
Content-Type: application/x-www-form-urlencoded


```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
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
  'Authorization':'Bearer {access-token}',
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

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}',
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

Get the user that is the original _submitter_ of a resource. Successful request will return a single [User Object](#user-object).

     __NOTE:__ Mods and games can be managed by teams of users, for the most accurate information you should use the [Team endpoints](#teams).

     Parameter|Type|Required|Description
     ---|---|---|---|
     resource_type|string|true|Type of resource you are checking the ownership of. Must be one of the following values:<br><br>- _games_<br>- _mods_<br>- _files_
     resource_id|integer|true|Unique id of the resource you are checking the ownership of.


> Example response

```json
{
  "id": 1,
  "name_id": "xant",
  "username": "XanT",
  "date_online": 1509922961,
  "avatar": {
    "filename": "modio-color-dark.png",
    "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
    "thumb_50x50": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
    "thumb_100x100": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
  },
  "timezone": "",
  "language": "",
  "profile_url": "https://mod.io/members/xant"
}

```
<h3 id="Get-Resource-Owner-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[User Object](#schemauser_object)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
# Reports

## Submit Report

> Example request

```shell
# You can also use wget
curl -X POST https://api.mod.io/v1/report \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'resource=mods' \
  -d 'id=3853' \
  -d 'type=1' \
  -d 'name=Name of the user submitting the report' \
  -d 'contact=Contact details of the user submitting the report' \
  -d 'summary=Detailed explanation for report here'

```

```http
POST https://api.mod.io/v1/report HTTP/1.1
Host: api.mod.io
Content-Type: application/x-www-form-urlencoded
Accept: application/json
Authorization: Bearer {access-token}


```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
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
const inputBody = '{
  "resource": "mods",
  "id": "3853",
  "type": "1",
  "name": "Name of the user submitting the report",
  "contact": "Contact details of the user submitting the report",
  "summary": "Detailed explanation for report here"
}';
const headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://api.mod.io/v1/report',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}',
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

Report a resource on mod.io. You are responsible for content your users submit, so properly supporting the report endpoint or linking to the report page [https://mod.io/report/widget](https://mod.io/report) is important. Successful request will return [Message Object](#message-object).<br><br>__NOTE:__ If you want to link to our report page and you know the resource you want to report, the best URL to use is https://mod.io/report/`resource`/`id`/widget. For example to report a mod with an ID of 1 the URL would be: [https://mod.io/report/mods/1/widget](https://mod.io/report/mods/1/widget). <br><br>__NOTE:__ If you are a game owner or manager, you can [view all reports](https://mod.io/messages/reports) submitted for your game. You can also configure in your games control panel the number of reports required before content is automatically taken down for review.<br><br>__NOTE:__ Read our [terms of use](https://mod.io/terms/widget) for information about what is/isn't acceptable.

     Parameter|Type|Required|Description
     ---|---|---|---|
     resource|string|true|Type of resource you are reporting. Must be one of the following values:<br><br>- _games_<br>- _mods_<br>- _users_
     id|integer|true|Unique id of the resource you are reporting.
     type|integer|true|Type of report you are submitting. Must be one of the following values:<br><br>__0__ = Generic<br>__1__ = DMCA<br>__2__ = Not Working<br>__3__ = Rude Content<br>__4__ = Illegal Content<br>__5__ = Stolen Content<br>__6__ = False Information<br>__7__ = Other
     name|string||Name of the user submitting the report. Recommended for DMCA reports.
     contact|string||Contact details of the user submitting the report. Recommended for DMCA reports.
     summary|string|true|Detailed description of your report. Make sure you include all relevant information and links to help moderators investigate and respond appropriately.<br><br>Our [online reporting process](https://mod.io/report/widget) shows the information we collect and put into the `name`, `contact` and `summary` fields as appropiate. We recommend you implement a similar flow in-game.


> Example response

```json
{
  "code": 201,
  "message": "You have successfully submitted a report and it will be reviewed by the mod.io team as soon as possible."
}

```
<h3 id="Submit-Report-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)||Report Created|[Message Object](#message-object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15029|The authenticated user does not have permission to submit reports on mod.io due to their access being revoked.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15030|The specified resource is not able to be reported at this time, this is potentially due to the resource in question being removed.|[Error Object](#schemaerror_object)
404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|14000|The resource to be reported could not be found.|[Error Object](#schemaerror_object)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
# Batch

## Make Batch Request

> Example request

```shell
# You can also use wget
curl -X POST https://api.mod.io/v1/batch \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'batch[0][relative_url]=v1/games/11/mods' \
  -d 'batch[0][method]=GET' \
  -d 'batch[1][relative_url]=v1/me/subscribed?id-in=$[0].data[*].id' \
  -d 'batch[1][method]=GET' \
  -d 'batch[2][relative_url]=v1/me/ratings?id-in=$[0].data[*].id' \
  -d 'batch[2][method]=GET'

```

```http
POST https://api.mod.io/v1/batch HTTP/1.1
Host: api.mod.io
Content-Type: application/x-www-form-urlencoded
Accept: application/json
Authorization: Bearer {access-token}


```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/batch',
  method: 'post',

  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

```javascript--nodejs
const request = require('node-fetch');
const inputBody = '{
  "batch[0][relative_url]": "v1/games/11/mods",
  "batch[0][method]": "GET",
  "batch[1][relative_url]": "v1/me/subscribed?id-in=$[0].data[*].id",
  "batch[1][method]": "GET",
  "batch[2][relative_url]": "v1/me/ratings?id-in=$[0].data[*].id",
  "batch[2][method]": "GET"
}';
const headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://api.mod.io/v1/batch',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}',
  'Content-Type': 'application/x-www-form-urlencoded',
  'Accept': 'application/json'
}

r = requests.post('https://api.mod.io/v1/batch', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/batch");
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

`POST /batch`

Speed up your API calls, by batching them into a single HTTP request. This endpoint is convenient for repeated sequential API calls as it eliminates the HTTP overhead of each request. All encapsulated requests are processed in a synchronous manner which enables you to use the response data of a previous request as a parameter in the subsequent request which we call request dependencies (see below for more info). Successful request will return an array of [Batch Objects](#make-batch-request-2).

     __Batch Limitations__

     The following applies to all batch requests:

     - Who you authenticate as for the parent batch request, will be used for _all_ sub-requests.
     - Authorization headers passed into sub-requests are ignored.
     - You cannot make more than 20 requests within a batch.

     __Batch Dependencies__

     To reference response data of previous requests to act as a dependency, you simply need to reference the expected location of the data in the response with basic array syntax. Let's assume an example batch request below:

     __What do we want to do in this batch request?__

     Get a list of mods for a game, and determine if the authenticated user is subscribed to or has submitted any ratings for the returned results.

     __What will it require?__

     This will require three requests (see the example code on the right):  
     1. [GET /v1/games/{game-id}/mods](#get-mods)  
     2. [GET /v1/me/subscribed](#get-user-subscriptions)  
     3. [GET /v1/me/ratings](#get-user-ratings)  

    In total, we are making 3 requests in a synchronous manner, inside a single request. Based on the above example, we need to know how to get the `id` value of the [Mod Object](#mod-object) from Request #1 and provide it as a dependency to the subsequent requests.

    __How do we reference the mod id from request #1?__

     If we look at our first request we can see that the [Get Mods](#get-mods-2), upon success, returns an array called `data` which contains the retrieved [Mod Objects](#get-mods). Sometimes you may want to get all values of a certain column within the `data` array, like we will do now. This is how we would get all mod id's from the first request and pass them into the second request as what we call a 'Batch Dependency'.

    Here is what our second request will look like, after adding the dependency which uses our global `-in` filter.

    <span class="versionwrap">GET v1/me/subscribed?id-in=__$[0].data[*].id__</span>

     Let's breakdown the dependency format:

    __NOTE:__ Regarding the below format, everything in the response from the base of the request to `data:["body"]` is ignored.

     Placeholder|Purpose
     ---|---|
     `$`| Our custom prefix identifier for batch dependencies
     `[0]`| Response index, if we wanted a value from our first request, this value would be 0 to specify the first array.
     `<field>` | From here onwards is a 1:1 representation of the response in [ECMAScript sytax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_Accessors) with one important exception, the __body__ parameter for each request is ignored. Whilst the body parameter is in the  [Batch Object](#batch-object) responses, you do not need to reference it in regards to batch dependencies.

     Given the above format, let's build our dependency string for our request.

     Placeholder|Purpose
     ---|---|
     `$`| Obligatory prefix.
     `[0]`| We want results from Request #1, so it will be at index 0.
     `.data` | Our response in Request #1 will contain a data array.
     `[*]` | We want all the `id` values from all returned objects, so we specify we specify that with the `*` symbol
     `id` | Finally, the value we want is in the `id` column

     __Error Handling__

     Sometimes an error can happen during a request, if you are referencing a dependency from a previous request that errors out you will encounter issues. When we return each request body, we make no modifications to the response, it is identical to calling the endpoint on its own - so you can simply check the HTTP code returned as well as the body of each response for the [Error Object](#error-object) to see if an error was returned.

     With that in mind, if you do reference a dependency that does not exist - the body of the response depending upon it will return a `424 - Failed Dependency` [error](#error-object).

     __Note Regarding Pagination__

     For the parent request, pagination filters such as [_offset](#pagination) & [_limit](#pagination) are available however they only determine which results are returned once the batch request has finished, that is - every sub-request you submit will be proceeded regardless of these filters.

     Parameter|Type|Required|Description
     ---|---|---|---|
     batch[]|array|true|An array of request parameters which must contain the following fields:
     » relative_url|string|true|The endpoint, relative to the Base API path - i.e. /v1/me is valid, /me is not.
     » method|string|true|The HTTP method of the request.
     » body|array||The body of the request if submitting data.
     » headers[]|array||An array of optional headers, supplied as [Key-Value Pair objects](#key-value-pair-object).
     »» key|string|true|The name of the header.
     »» value|string|true| The value of the header.


> Example response

```json
{
  "data": [
    {
      "code": 200,
      "headers": [
        {
          "key": "X-RateLimit-Remaining",
          "value": "98"
        }
      ],
      "body": {
        "data": [
          {
            "id": 2,
            "game_id": 2,
            "status": 1,
            "visible": 1,
            "submitted_by": {
              "id": 1,
              "name_id": "xant",
              "username": "XanT",
              "date_online": 1509922961,
              "avatar": {
                "filename": "modio-color-dark.png",
                "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
                "thumb_50x50": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
                "thumb_100x100": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
              },
              "timezone": "",
              "language": "",
              "profile_url": "https://mod.io/members/xant"
            },
            "date_added": 1492564103,
            "date_updated": 1499841487,
            "date_live": 1499841403,
            "maturity_option": 0,
            "logo": {
              "filename": "modio-color-dark.png",
              "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
              "thumb_320x180": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
              "thumb_640x360": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
              "thumb_1280x720": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
            },
            "homepage_url": "https://www.rogue-hdpack.com/",
            "name": "Rogue Knight HD Pack",
            "name_id": "rogue-knight-hd-pack",
            "summary": "It's time to bask in the glory of beautiful 4k textures!",
            "description": "<p>Rogue HD Pack does exactly what you thi...",
            "description_plaintext": "Rogue HD Pack does exactly what you thi...",
            "metadata_blob": "rogue,hd,high-res,4k,hd textures",
            "profile_url": "https://rogue-knight.mod.io/rogue-knight-hd-pack",
            "media": {
              "youtube": [
                "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              ],
              "sketchfab": [
                "https://sketchfab.com/models/ef40b2d300334d009984c8865b2db1c8"
              ],
              "images": [
                {
                  "filename": "modio-color-dark.png",
                  "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
                  "thumb_320x180": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
                }
              ]
            },
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
              "metadata_blob": "rogue,hd,high-res,4k,hd textures",
              "download": {
                "binary_url": "https://mod.io/mods/file/1/c489a0354111a4d76640d47f0cdcb294",
                "date_expires": 1579316848
              }
            },
            "metadata_kvp": [
              {
                "metakey": "pistol-dmg",
                "metavalue": "800"
              }
            ],
            "tags": [
              {
                "name": "Unity",
                "date_added": 1499841487
              }
            ],
            "stats": {
              "mod_id": 2,
              "popularity_rank_position": 13,
              "popularity_rank_total_mods": 204,
              "downloads_total": 27492,
              "subscribers_total": 16394,
              "ratings_total": 1230,
              "ratings_positive": 1047,
              "ratings_negative": 183,
              "ratings_percentage_positive": 91,
              "ratings_weighted_aggregate": 87.38,
              "ratings_display_text": "Very Positive",
              "date_expires": 1492564103
            }
          }
        ]
      }
    },
    {
        ...
    }
  ],
  "result_count": 1,
  "result_offset": 0,
  "result_limit": 20,
  "result_total": 1
}

```
<h3 id="Make-Batch-Request-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Make Batch Request](#schemamake_batch_request)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
# Me

## Get Authenticated User

> Example request

```shell
# You can also use wget
curl -X GET https://api.mod.io/v1/me \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Accept: application/json'

```

```http
GET https://api.mod.io/v1/me HTTP/1.1
Host: api.mod.io

Accept: application/json
Authorization: Bearer {access-token}


```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
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
  'Authorization':'Bearer {access-token}',
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

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}',
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

Get the _authenticated user_ details. Successful request will return a single [User Object](#user-object).


> Example response

```json
{
  "id": 1,
  "name_id": "xant",
  "username": "XanT",
  "date_online": 1509922961,
  "avatar": {
    "filename": "modio-color-dark.png",
    "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
    "thumb_50x50": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
    "thumb_100x100": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
  },
  "timezone": "",
  "language": "",
  "profile_url": "https://mod.io/members/xant"
}

```
<h3 id="Get-Authenticated-User-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Request Successful|[User Object](#schemauser_object)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
## Get User Subscriptions

> Example request

```shell
# You can also use wget
curl -X GET https://api.mod.io/v1/me/subscribed \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Accept: application/json'

```

```http
GET https://api.mod.io/v1/me/subscribed HTTP/1.1
Host: api.mod.io

Accept: application/json
Authorization: Bearer {access-token}


```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
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
  'Authorization':'Bearer {access-token}',
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

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}',
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

Get all mod's the _authenticated user_ is subscribed to. Successful request will return an array of [Mod Objects](#get-mods-2). We recommended reading the [filtering documentation](#filtering) to return only the records you want.

    Filter|Type|Description
    ---|---|---
    id|integer|Unique id of the mod.
    game_id|integer|Unique id of the parent game.
    submitted_by|integer|Unique id of the user who has ownership of the mod.
    date_added|integer|Unix timestamp of date mod was registered.
    date_updated|integer|Unix timestamp of date mod was updated.
    date_live|integer|Unix timestamp of date mod was set live.
    name|string|Name of the mod.
    name_id|string|Path for the mod on mod.io. For example: https://gamename.mod.io/__mod-name-id-here__
    summary|string|Summary of the mod.
    description|string|Detailed description of the mod which allows HTML.
    homepage_url|string|Official homepage of the mod.
    metadata_blob|string|Metadata stored by the game developer.
    tags|string|Comma-separated values representing the tags you want to filter the results by. If you specify multiple tags, only mods which have all tags will be returned, and only tags that are supported by the parent game can be applied. To determine what tags are eligible, see the tags values within `tag_options` column on the parent [Game Object](#game-object). If you want to ensure mods returned do not contain particular tag(s), you can use the `tags-not-in` filter either independently or alongside this filter.
    downloads|string|Sort results by most downloads using [_sort filter](#filtering) parameter, value should be `downloads` for descending or `-downloads` for ascending results.
    popular|string|Sort results by popularity using [_sort filter](#filtering), value should be `popular` for descending or `-popular` for ascending results. __NOTE:__ Popularity is calculated hourly and reset daily (results are ranked from 1 to X). You should sort this column in ascending order `-popular` to get the top ranked results.
    rating|string|Sort results by weighted rating using [_sort filter](#filtering), value should be `rating` for descending or `-rating` for ascending results.
    subscribers|string|Sort results by most subscribers using [_sort filter](#filtering), value should be `subscribers` for descending or `-subscribers` for ascending results.


> Example response

```json
{
  "data": [
    {
      "id": 2,
      "game_id": 2,
      "status": 1,
      "visible": 1,
      "submitted_by": {
        "id": 1,
        "name_id": "xant",
        "username": "XanT",
        "date_online": 1509922961,
        "avatar": {
          "filename": "modio-color-dark.png",
          "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
          "thumb_50x50": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
          "thumb_100x100": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
        },
        "timezone": "",
        "language": "",
        "profile_url": "https://mod.io/members/xant"
      },
      "date_added": 1492564103,
      "date_updated": 1499841487,
      "date_live": 1499841403,
      "maturity_option": 0,
      "logo": {
        "filename": "modio-color-dark.png",
        "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
        "thumb_320x180": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
        "thumb_640x360": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
        "thumb_1280x720": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
      },
      "homepage_url": "https://www.rogue-hdpack.com/",
      "name": "Rogue Knight HD Pack",
      "name_id": "rogue-knight-hd-pack",
      "summary": "It's time to bask in the glory of beautiful 4k textures!",
      "description": "<p>Rogue HD Pack does exactly what you thi...",
      "description_plaintext": "Rogue HD Pack does exactly what you thi...",
      "metadata_blob": "rogue,hd,high-res,4k,hd textures",
      "profile_url": "https://rogue-knight.mod.io/rogue-knight-hd-pack",
      "media": {
        "youtube": [
          "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        ],
        "sketchfab": [
          "https://sketchfab.com/models/ef40b2d300334d009984c8865b2db1c8"
        ],
        "images": [
          {
            "filename": "modio-color-dark.png",
            "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
            "thumb_320x180": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
          }
        ]
      },
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
        "metadata_blob": "rogue,hd,high-res,4k,hd textures",
        "download": {
          "binary_url": "https://mod.io/mods/file/1/c489a0354111a4d76640d47f0cdcb294",
          "date_expires": 1579316848
        }
      },
      "metadata_kvp": [
        {
          "metakey": "pistol-dmg",
          "metavalue": "800"
        }
      ],
      "tags": [
        {
          "name": "Unity",
          "date_added": 1499841487
        }
      ],
      "stats": {
        "mod_id": 2,
        "popularity_rank_position": 13,
        "popularity_rank_total_mods": 204,
        "downloads_total": 27492,
        "subscribers_total": 16394,
        "ratings_total": 1230,
        "ratings_positive": 1047,
        "ratings_negative": 183,
        "ratings_percentage_positive": 91,
        "ratings_weighted_aggregate": 87.38,
        "ratings_display_text": "Very Positive",
        "date_expires": 1492564103
      }
    },
    {
        ...
    }
  ],
  "result_count": 70,
  "result_offset": 0,
  "result_limit": 100,
  "result_total": 70
}

```
<h3 id="Get-User-Subscriptions-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Request Successful|[Get Mods](#schemaget_mods)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
## Get User Events

> Example request

```shell
# You can also use wget
curl -X GET https://api.mod.io/v1/me/events?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://api.mod.io/v1/me/events?api_key=YourApiKey HTTP/1.1
Host: api.mod.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/me/events',
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

fetch('https://api.mod.io/v1/me/events?api_key=YourApiKey',
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

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.mod.io/v1/me/events', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/me/events?api_key=YourApiKey");
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

`GET /me/events`

Get events that have been fired specific to the user. Successful request will return an array of [Event Objects](#get-user-events-2). We recommended reading the [filtering documentation](#filtering) to return only the records you want.

    Filter|Type|Description
    ---|---|---
    id|integer|Unique id of the event object.
    game_id|integer|Unique id of the parent game.
    mod_id|integer|Unique id of the parent mod.
    user_id|integer|Unique id of the user who performed the action.
    date_added|integer|Unix timestamp of date mod was updated.
    event_type|string|Type of change that occurred:<br><br>__USER_TEAM_JOIN__ = User has joined a team.<br>__USER_TEAM_LEAVE__ = User has left a team.<br>__USER_SUBSCRIBE__ = User has subscribed to a mod.<br>__USER_UNSUBSCRIBE__ = User has un-subscribed from a mod.


> Example response

```json
{
  "data": [
    {
      "id": 13,
      "game_id": 7,
      "mod_id": 13,
      "user_id": 13,
      "date_added": 1499846132,
      "event_type": "USER_SUBSCRIBE"
    },
    {
        ...
    }
  ],
  "result_count": 70,
  "result_offset": 0,
  "result_limit": 100,
  "result_total": 70
}

```
<h3 id="Get-User-Events-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Get User Events](#schemaget_user_events)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>, <a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
## Get User Games

> Example request

```shell
# You can also use wget
curl -X GET https://api.mod.io/v1/me/games \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Accept: application/json'

```

```http
GET https://api.mod.io/v1/me/games HTTP/1.1
Host: api.mod.io

Accept: application/json
Authorization: Bearer {access-token}


```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
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
  'Authorization':'Bearer {access-token}',
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

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}',
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

Get all games the _authenticated user_ added or is a team member of. Successful request will return an array of [Game Objects](#get-games-2). We recommended reading the [filtering documentation](#filtering) to return only the records you want.

    Filter|Type|Description
    ---|---|---
    id|integer|Unique id of the game.
    status|integer|Status of the game (only admins can filter by this field, see [status and visibility](#status-amp-visibility) for details):<br><br>__0__ = Not accepted<br>__1__ = Accepted _(default)_<br>__3__ = Deleted
    submitted_by|integer|Unique id of the user who has ownership of the game.
    date_added|integer|Unix timestamp of date game was registered.
    date_updated|integer|Unix timestamp of date game was updated.
    date_live|integer|Unix timestamp of date game was set live.
    name|string|Name of the game.
    name_id|string|Subdomain for the game on mod.io. For example: https://__gamename__.mod.io
    summary|string|Summary of the games mod support.
    instructions_url|string|Link to a mod.io guide, modding wiki or a page where modders can learn how to make and submit mods.
    ugc_name|string|Word used to describe user-generated content (mods, items, addons etc).
    presentation_option|integer|Presentation style used on the mod.io website:<br><br>__0__ =  Grid View: Displays mods in a grid<br>__1__ = Table View: Displays mods in a table
    submission_option|integer|Submission process modders must follow:<br><br>__0__ = Mod uploads must occur via the API using a tool created by the game developers<br>__1__ = Mod uploads can occur from anywhere, including the website and API
    curation_option|integer|Curation process used to approve mods:<br><br>__0__ = No curation: Mods are immediately available to play<br>__1__ = Paid curation: Mods are immediately available to play unless they choose to receive donations. These mods must be accepted to be listed<br>__2__ = Full curation: All mods must be accepted by someone to be listed
    community_options|integer|Community features enabled on the mod.io website:<br><br>__0__ = All of the options below are disabled<br>__1__ = Enable comments<br>__2__ = Enable guides<br>__4__ = Disable website _"subscribe to install"_ text<br>__?__ = Combine to find games with multiple options enabled (see [BITWISE fields](#bitwise-and-bitwise-and))
    revenue_options|integer|Revenue capabilities mods can enable:<br><br>__0__ = All of the options below are disabled<br>__1__ = Allow mods to be sold<br>__2__ = Allow mods to receive donations<br>__4__ = Allow mods to be traded<br>__8__ = Allow mods to control supply and scarcity<br>__?__ = Combine to find games with multiple options enabled (see [BITWISE fields](#bitwise-and-bitwise-and))
    api_access_options|integer|Level of API access allowed by this game:<br><br>__0__ = All of the options below are disabled<br>__1__ = Allow 3rd parties to access this games API endpoints<br>__2__ = Allow mods to be downloaded directly (if disabled all download URLs will contain a frequently changing verification hash to stop unauthorized use)<br>__?__ = Combine to find games with multiple options enabled (see [BITWISE fields](#bitwise-and-bitwise-and))


> Example response

```json
{
  "data": [
    {
      "id": 2,
      "status": 1,
      "submitted_by": {
        "id": 1,
        "name_id": "xant",
        "username": "XanT",
        "date_online": 1509922961,
        "avatar": {
          "filename": "modio-color-dark.png",
          "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
          "thumb_50x50": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
          "thumb_100x100": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
        },
        "timezone": "",
        "language": "",
        "profile_url": "https://mod.io/members/xant"
      },
      "date_added": 1493702614,
      "date_updated": 1499410290,
      "date_live": 1499841403,
      "presentation_option": 1,
      "submission_option": 0,
      "curation_option": 0,
      "community_options": 3,
      "revenue_options": 1500,
      "api_access_options": 3,
      "maturity_options": 0,
      "ugc_name": "map",
      "icon": {
        "filename": "modio-color-dark.png",
        "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
        "thumb_64x64": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
        "thumb_128x128": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
        "thumb_256x256": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
      },
      "logo": {
        "filename": "modio-color-dark.png",
        "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
        "thumb_320x180": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
        "thumb_640x360": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
        "thumb_1280x720": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
      },
      "header": {
        "filename": "demo.png",
        "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
      },
      "name": "Rogue Knight",
      "name_id": "rogue-knight",
      "summary": "Rogue Knight is a brand new 2D pixel platformer that supports custom levels and characters.",
      "instructions": "Instructions on the process to upload mods.",
      "instructions_url": "https://www.rogue-knight-game.com/modding/getting-started",
      "profile_url": "https://rogue-knight.mod.io",
      "tag_options": [
        {
          "name": "Theme",
          "type": "checkboxes",
          "tags": [
            "Horror"
          ],
          "hidden": false
        }
      ]
    },
    {
        ...
    }
  ],
  "result_count": 70,
  "result_offset": 0,
  "result_limit": 100,
  "result_total": 70
}

```
<h3 id="Get-User-Games-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Request Successful|[Get Games](#schemaget_games)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
## Get User Mods

> Example request

```shell
# You can also use wget
curl -X GET https://api.mod.io/v1/me/mods \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Accept: application/json'

```

```http
GET https://api.mod.io/v1/me/mods HTTP/1.1
Host: api.mod.io

Accept: application/json
Authorization: Bearer {access-token}


```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
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
  'Authorization':'Bearer {access-token}',
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

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}',
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

Get all mods the _authenticated user_ added or is a team member of. Successful request will return an array of [Mod Objects](#get-mods-2). We recommended reading the [filtering documentation](#filtering) to return only the records you want.

    Filter|Type|Description
    ---|---|---
    id|integer|Unique id of the mod.
    game_id|integer|Unique id of the parent game.
    status|integer|Status of the mod (only game admins can filter by this field, see [status and visibility](#status-amp-visibility) for details):<br><br>__0__ = Not accepted<br>__1__ = Accepted _(default)_<br>__3__ = Deleted
    visible|integer|Visibility of the mod (only game admins can filter by this field, see [status and visibility](#status-amp-visibility) for details):<br><br>__0__ = Hidden<br>__1__ = Public
    submitted_by|integer|Unique id of the user who has ownership of the mod.
    date_added|integer|Unix timestamp of date mod was registered.
    date_updated|integer|Unix timestamp of date mod was updated.
    date_live|integer|Unix timestamp of date mod was set live.
    name|string|Name of the mod.
    name_id|string|Path for the mod on mod.io. For example: https://gamename.mod.io/__mod-name-id-here__
    summary|string|Summary of the mod.
    description|string|Detailed description of the mod which allows HTML.
    homepage_url|string|Official homepage of the mod.
    modfile|integer|Unique id of the file that is the current active release (see [mod files](#files)).
    metadata_blob|string|Metadata stored by the game developer.
    metadata_kvp|string|Colon-separated values representing the key-value pairs you want to filter the results by. If you supply more than one key-pair, separate the pairs by a comma. Will only filter by an exact key-pair match.
    tags|string|Comma-separated values representing the tags you want to filter the results by. If you specify multiple tags, only mods which have all tags will be returned, and only tags that are supported by the parent game can be applied. To determine what tags are eligible, see the tags values within `tag_options` column on the parent [Game Object](#game-object). If you want to ensure mods returned do not contain particular tag(s), you can use the `tags-not-in` filter either independently or alongside this filter.
    downloads|string|Sort results by most downloads using [_sort filter](#filtering) parameter, value should be `downloads` for descending or `-downloads` for ascending results.
    popular|string|Sort results by popularity using [_sort filter](#filtering), value should be `popular` for descending or `-popular` for ascending results. __NOTE:__ Popularity is calculated hourly and reset daily (results are ranked from 1 to X). You should sort this column in ascending order `-popular` to get the top ranked results.
    rating|string|Sort results by weighted rating using [_sort filter](#filtering), value should be `rating` for descending or `-rating` for ascending results.
    subscribers|string|Sort results by most subscribers using [_sort filter](#filtering), value should be `subscribers` for descending or `-subscribers` for ascending results.


> Example response

```json
{
  "data": [
    {
      "id": 2,
      "game_id": 2,
      "status": 1,
      "visible": 1,
      "submitted_by": {
        "id": 1,
        "name_id": "xant",
        "username": "XanT",
        "date_online": 1509922961,
        "avatar": {
          "filename": "modio-color-dark.png",
          "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
          "thumb_50x50": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
          "thumb_100x100": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
        },
        "timezone": "",
        "language": "",
        "profile_url": "https://mod.io/members/xant"
      },
      "date_added": 1492564103,
      "date_updated": 1499841487,
      "date_live": 1499841403,
      "maturity_option": 0,
      "logo": {
        "filename": "modio-color-dark.png",
        "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
        "thumb_320x180": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
        "thumb_640x360": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
        "thumb_1280x720": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
      },
      "homepage_url": "https://www.rogue-hdpack.com/",
      "name": "Rogue Knight HD Pack",
      "name_id": "rogue-knight-hd-pack",
      "summary": "It's time to bask in the glory of beautiful 4k textures!",
      "description": "<p>Rogue HD Pack does exactly what you thi...",
      "description_plaintext": "Rogue HD Pack does exactly what you thi...",
      "metadata_blob": "rogue,hd,high-res,4k,hd textures",
      "profile_url": "https://rogue-knight.mod.io/rogue-knight-hd-pack",
      "media": {
        "youtube": [
          "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        ],
        "sketchfab": [
          "https://sketchfab.com/models/ef40b2d300334d009984c8865b2db1c8"
        ],
        "images": [
          {
            "filename": "modio-color-dark.png",
            "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
            "thumb_320x180": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
          }
        ]
      },
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
        "metadata_blob": "rogue,hd,high-res,4k,hd textures",
        "download": {
          "binary_url": "https://mod.io/mods/file/1/c489a0354111a4d76640d47f0cdcb294",
          "date_expires": 1579316848
        }
      },
      "metadata_kvp": [
        {
          "metakey": "pistol-dmg",
          "metavalue": "800"
        }
      ],
      "tags": [
        {
          "name": "Unity",
          "date_added": 1499841487
        }
      ],
      "stats": {
        "mod_id": 2,
        "popularity_rank_position": 13,
        "popularity_rank_total_mods": 204,
        "downloads_total": 27492,
        "subscribers_total": 16394,
        "ratings_total": 1230,
        "ratings_positive": 1047,
        "ratings_negative": 183,
        "ratings_percentage_positive": 91,
        "ratings_weighted_aggregate": 87.38,
        "ratings_display_text": "Very Positive",
        "date_expires": 1492564103
      }
    },
    {
        ...
    }
  ],
  "result_count": 70,
  "result_offset": 0,
  "result_limit": 100,
  "result_total": 70
}

```
<h3 id="Get-User-Mods-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Request Successful|[Get Mods](#schemaget_mods)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
## Get User Modfiles

> Example request

```shell
# You can also use wget
curl -X GET https://api.mod.io/v1/me/files \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Accept: application/json'

```

```http
GET https://api.mod.io/v1/me/files HTTP/1.1
Host: api.mod.io

Accept: application/json
Authorization: Bearer {access-token}


```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
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
  'Authorization':'Bearer {access-token}',
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

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}',
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

Get all modfiles the _authenticated user_ uploaded. Successful request will return an array of [Modfile Objects](#get-modfiles-2). We recommended reading the [filtering documentation](#filtering) to return only the records you want.<br><br>__NOTE:__ If the [game](#edit-game) requires mod downloads to be initiated via the API, the `binary_url` returned will contain a verification hash. This hash must be supplied to get the modfile, and will expire after a certain period of time. Saving and reusing the `binary_url` won't work in this situation given it's dynamic nature.

    Filter|Type|Description
    ---|---|---
    id|integer|Unique id of the file.
    mod_id|integer|Unique id of the mod.
    date_added|integer|Unix timestamp of date file was added.
    date_scanned|integer|Unix timestamp of date file was virus scanned.
    virus_status|integer|Current virus scan status of the file. For newly added files that have yet to be scanned this field will change frequently until a scan is complete:<br><br>__0__ = Not scanned<br>__1__ = Scan complete<br>__2__ = In progress<br>__3__ = Too large to scan<br>__4__ = File not found<br>__5__ = Error Scanning
    virus_positive|integer|Was a virus detected:<br><br>__0__ = No threats detected<br>__1__ = Flagged as malicious
    filesize|integer|Size of the file in bytes.
    filehash|string|MD5 hash of the file.
    filename|string|Filename including extension.
    version|string|Release version this file represents.
    changelog|string|Changelog for the file.
    metadata_blob|string|Metadata stored by the game developer for this file.


> Example response

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
      "metadata_blob": "rogue,hd,high-res,4k,hd textures",
      "download": {
        "binary_url": "https://mod.io/mods/file/1/c489a0354111a4d76640d47f0cdcb294",
        "date_expires": 1579316848
      }
    },
    {
        ...
    }
  ],
  "result_count": 70,
  "result_offset": 0,
  "result_limit": 100,
  "result_total": 70
}

```
<h3 id="Get-User-Modfiles-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Request Successful|[Get Modfiles](#schemaget_modfiles)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
## Get User Ratings

> Example request

```shell
# You can also use wget
curl -X GET https://api.mod.io/v1/me/ratings \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Accept: application/json'

```

```http
GET https://api.mod.io/v1/me/ratings HTTP/1.1
Host: api.mod.io

Accept: application/json
Authorization: Bearer {access-token}


```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://api.mod.io/v1/me/ratings',
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
  'Authorization':'Bearer {access-token}',
  'Accept':'application/json'

};

fetch('https://api.mod.io/v1/me/ratings',
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

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}',
  'Accept': 'application/json'
}

r = requests.get('https://api.mod.io/v1/me/ratings', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://api.mod.io/v1/me/ratings");
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

`GET /me/ratings`

Get all mod rating's submitted by the _authenticated user_. Successful request will return an array of [Rating Objects](#get-user-ratings).

    Filter|Type|Description
    ---|---|---
    game_id|integer|Unique id of the parent game.
    mod_id|integer|Unique id of the mod.
    rating|integer|Type of rating applied.<br><br>__-1__ = Negative Rating<br>__1__ = Positive Rating
    date_added|integer|Unix timestamp of date rating was submitted.


> Example response

```json
{
  "data": [
    {
      "game_id": 2,
      "mod_id": 2,
      "rating": -1,
      "date_added": 1492564103
    },
    {
        ...
    }
  ],
  "result_count": 70,
  "result_offset": 0,
  "result_limit": 100,
  "result_total": 70
}

```
<h3 id="Get-User-Ratings-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Request Successful|[Get User Ratings](#schemaget_user_ratings)

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
# Response Schemas
## Access Token Object  

<a name="schemaaccess_token_object"></a>

```json
{
  "code": 200,
  "access_token": "eyJ0eXAiOiXKV1QibCJhbLciOiJeiUzI1.....",
  "date_expires": 1570673249
} 
```


### Properties

Name|Type|Description
---|---|---|---|
code|integer|HTTP Response Code.
access_token|string|The user's access token.
date_expires|integer|Unix timestamp of the date this token will expire. Default is one year from issue date. See [Access Token Lifetime & Expiry](#making-requests).




## Avatar Object

   <a name="schemaavatar_object"></a>

```json
{
  "filename": "modio-color-dark.png",
  "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
  "thumb_50x50": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
  "thumb_100x100": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
} 
```


### Properties

Name|Type|Description
---|---|---|---|
filename|string|Avatar filename including extension.
original|string|URL to the full-sized avatar.
thumb_50x50|string|URL to the small avatar thumbnail.
thumb_100x100|string|URL to the medium avatar thumbnail.




## Batch Body Object  

<a name="schemabatch_body_object"></a>

```json
{
  "data": [
    {
      "id": 2,
      "game_id": 2,
      "status": 1,
      "visible": 1,
      "submitted_by": {
        "id": 1,
        "name_id": "xant",
        "username": "XanT",
        "date_online": 1509922961,
        "avatar": {
          "filename": "modio-color-dark.png",
          "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
          "thumb_50x50": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
          "thumb_100x100": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
        },
        "timezone": "",
        "language": "",
        "profile_url": "https://mod.io/members/xant"
      },
      "date_added": 1492564103,
      "date_updated": 1499841487,
      "date_live": 1499841403,
      "maturity_option": 0,
      "logo": {
        "filename": "modio-color-dark.png",
        "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
        "thumb_320x180": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
        "thumb_640x360": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
        "thumb_1280x720": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
      },
      "homepage_url": "https://www.rogue-hdpack.com/",
      "name": "Rogue Knight HD Pack",
      "name_id": "rogue-knight-hd-pack",
      "summary": "It's time to bask in the glory of beautiful 4k textures!",
      "description": "<p>Rogue HD Pack does exactly what you thi...",
      "description_plaintext": "Rogue HD Pack does exactly what you thi...",
      "metadata_blob": "rogue,hd,high-res,4k,hd textures",
      "profile_url": "https://rogue-knight.mod.io/rogue-knight-hd-pack",
      "media": {
        "youtube": [
          "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        ],
        "sketchfab": [
          "https://sketchfab.com/models/ef40b2d300334d009984c8865b2db1c8"
        ],
        "images": [
          {
            "filename": "modio-color-dark.png",
            "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
            "thumb_320x180": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
          }
        ]
      },
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
        "metadata_blob": "rogue,hd,high-res,4k,hd textures",
        "download": {
          "binary_url": "https://mod.io/mods/file/1/c489a0354111a4d76640d47f0cdcb294",
          "date_expires": 1579316848
        }
      },
      "metadata_kvp": [
        {
          "metakey": "pistol-dmg",
          "metavalue": "800"
        }
      ],
      "tags": [
        {
          "name": "Unity",
          "date_added": 1499841487
        }
      ],
      "stats": {
        "mod_id": 2,
        "popularity_rank_position": 13,
        "popularity_rank_total_mods": 204,
        "downloads_total": 27492,
        "subscribers_total": 16394,
        "ratings_total": 1230,
        "ratings_positive": 1047,
        "ratings_negative": 183,
        "ratings_percentage_positive": 91,
        "ratings_weighted_aggregate": 87.38,
        "ratings_display_text": "Very Positive",
        "date_expires": 1492564103
      }
    }
  ]
} 
```


### Properties

Name|Type|Description
---|---|---|---|
data|[Mod Object](#schemamod_object)[]|Contains Mod Objects.
» id|integer|Unique mod id.
» game_id|integer|Unique game id.
» status|integer|Status of the mod (see [status and visibility](#status-amp-visibility) for details):<br><br>__0__ = Not Accepted<br>__1__ = Accepted<br>__3__ = Deleted
» visible|integer|Visibility of the mod (see [status and visibility](#status-amp-visibility) for details):<br><br>__0__ = Hidden<br>__1__ = Public
» submitted_by|[User Object](#schemauser_object)|Contains user data.
»» id|integer|Unique id of the user.
»» name_id|string|Path for the user on mod.io. For example: https://mod.io/members/__name-id-here__
»» username|string|Username of the user.
»» date_online|integer|Unix timestamp of date the user was last online.
»» avatar|[Avatar Object](#schemaavatar_object)|Contains avatar data.
»»» filename|string|Avatar filename including extension.
»»» original|string|URL to the full-sized avatar.
»»» thumb_50x50|string|URL to the small avatar thumbnail.
»»» thumb_100x100|string|URL to the medium avatar thumbnail.
»» timezone|string|This field is no longer used and will return an empty string.
»» language|string|This field is no longer used and will return an empty string. To [localize the API response](#localization) we recommend you set the `Accept-Language` header.
»» profile_url|string|URL to the user's mod.io profile.
» date_added|integer|Unix timestamp of date mod was registered.
» date_updated|integer|Unix timestamp of date mod was updated.
» date_live|integer|Unix timestamp of date mod was set live.
» maturity_option|integer|Maturity options flagged by the mod developer, this is only relevant if the parent game allows mods to be labelled as mature.<br><br>__0__ = None set _(default)_<br>__1__ = Alcohol<br>__2__ = Drugs<br>__4__ = Violence<br>__8__ = Explicit<br>__?__ = Add the options you want together, to enable multiple filters (see [BITWISE fields](#bitwise-and-bitwise-and))
» logo|[Logo Object](#schemalogo_object)|Contains logo data.
»» filename|string|Logo filename including extension.
»» original|string|URL to the full-sized logo.
»» thumb_320x180|string|URL to the small logo thumbnail.
»» thumb_640x360|string|URL to the medium logo thumbnail.
»» thumb_1280x720|string|URL to the large logo thumbnail.
» homepage_url|string|Official homepage of the mod.
» name|string|Name of the mod.
» name_id|string|Path for the mod on mod.io. For example: https://gamename.mod.io/__mod-name-id-here__
» summary|string|Summary of the mod.
» description|string|Detailed description of the mod which allows HTML.
» description_plaintext|string|`description` field converted into plaintext.
» metadata_blob|string|Metadata stored by the game developer. Metadata can also be stored as searchable [key value pairs](#metadata), and to individual [mod files](#get-modfiles).
» profile_url|string|URL to the mod's mod.io profile.
» media|[Mod Media Object](#schemamod_media_object)|Contains mod media data.
»» youtube|string[]|Array of YouTube links.
»» sketchfab|string[]|Array of SketchFab links.
»» images|[Image Object](#schemaimage_object)[]|Array of image objects (a gallery).
»»» filename|string|Image filename including extension.
»»» original|string|URL to the full-sized image.
»»» thumb_320x180|string|URL to the image thumbnail.
» modfile|[Modfile Object](#schemamodfile_object)|Contains modfile data.
»» id|integer|Unique modfile id.
»» mod_id|integer|Unique mod id.
»» date_added|integer|Unix timestamp of date file was added.
»» date_scanned|integer|Unix timestamp of date file was virus scanned.
»» virus_status|integer|Current virus scan status of the file. For newly added files that have yet to be scanned this field will change frequently until a scan is complete:<br><br>__0__ = Not scanned<br>__1__ = Scan complete<br>__2__ = In progress<br>__3__ = Too large to scan<br>__4__ = File not found<br>__5__ = Error Scanning
»» virus_positive|integer|Was a virus detected:<br><br>__0__ = No threats detected<br>__1__ = Flagged as malicious
»» virustotal_hash|string|VirusTotal proprietary hash to view the [scan results](https://www.virustotal.com).
»» filesize|integer|Size of the file in bytes.
»» filehash|[Filehash Object](#schemafilehash_object)|Contains filehash data.
»»» md5|string|MD5 hash of the file.
»» filename|string|Filename including extension.
»» version|string|Release version this file represents.
»» changelog|string|Changelog for the file.
»» metadata_blob|string|Metadata stored by the game developer for this file.
»» download|[Download Object](#schemadownload_object)|Contains download data.
»»» binary_url|string|URL to download the file from the mod.io CDN.<br><br>__NOTE:__ If the [game](#edit-game) requires mod downloads to be initiated via the API, the `binary_url` returned will contain a verification hash. This hash must be supplied to get the modfile, and will expire after a certain period of time. Saving and reusing the `binary_url` won't work in this situation given it's dynamic nature.
»»» date_expires|integer|Unix timestamp of when the `binary_url` will expire.
» stats|[Mod Stats Object](#schemamod_stats_object)|Contains stats data.
»» mod_id|integer|Unique mod id.
»» popularity_rank_position|integer|Current rank of the mod.
»» popularity_rank_total_mods|integer|Number of ranking spots the current rank is measured against.
»» downloads_total|integer|Number of total mod downloads.
»» subscribers_total|integer|Number of total users who have subscribed to the mod.
»» ratings_total|integer|Number of times this mod has been rated.
»» ratings_positive|integer|Number of positive ratings.
»» ratings_negative|integer|Number of negative ratings.
»» ratings_percentage_positive|integer|Number of positive ratings, divided by the total ratings to determine it’s percentage score.
»» ratings_weighted_aggregate|number|Overall rating of this item calculated using the [Wilson score confidence interval](https://www.evanmiller.org/how-not-to-sort-by-average-rating.html). This column is good to sort on, as it will order items based on number of ratings and will place items with many positive ratings above those with a higher score but fewer ratings.
»» ratings_display_text|string|Textual representation of the rating in format:<br><br>- Overwhelmingly Positive<br>- Very Positive<br>- Positive<br>- Mostly Positive<br>- Mixed<br>- Negative<br>- Mostly Negative<br>- Very Negative<br>- Overwhelmingly Negative<br>- Unrated
»» date_expires|integer|Unix timestamp until this mods's statistics are considered stale.
» metadata_kvp|[Metadata KVP Object](#schemametadata_kvp_object)[]|Contains key-value metadata.
»» metakey|string|The key of the key-value pair.
»» metavalue|string|The value of the key-value pair.
» tags|[Mod Tag Object](#schemamod_tag_object)[]|Contains mod tag data.
»» name|string|Tag name.
»» date_added|integer|Unix timestamp of date tag was applied.




## Batch Object

   <a name="schemabatch_object"></a>

```json
{
  "code": 200,
  "headers": [
    {
      "key": "X-RateLimit-Remaining",
      "value": "98"
    }
  ],
  "body": {
    "data": [
      {
        "id": 2,
        "game_id": 2,
        "status": 1,
        "visible": 1,
        "submitted_by": {
          "id": 1,
          "name_id": "xant",
          "username": "XanT",
          "date_online": 1509922961,
          "avatar": {
            "filename": "modio-color-dark.png",
            "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
            "thumb_50x50": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
            "thumb_100x100": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
          },
          "timezone": "",
          "language": "",
          "profile_url": "https://mod.io/members/xant"
        },
        "date_added": 1492564103,
        "date_updated": 1499841487,
        "date_live": 1499841403,
        "maturity_option": 0,
        "logo": {
          "filename": "modio-color-dark.png",
          "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
          "thumb_320x180": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
          "thumb_640x360": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
          "thumb_1280x720": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
        },
        "homepage_url": "https://www.rogue-hdpack.com/",
        "name": "Rogue Knight HD Pack",
        "name_id": "rogue-knight-hd-pack",
        "summary": "It's time to bask in the glory of beautiful 4k textures!",
        "description": "<p>Rogue HD Pack does exactly what you thi...",
        "description_plaintext": "Rogue HD Pack does exactly what you thi...",
        "metadata_blob": "rogue,hd,high-res,4k,hd textures",
        "profile_url": "https://rogue-knight.mod.io/rogue-knight-hd-pack",
        "media": {
          "youtube": [
            "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          ],
          "sketchfab": [
            "https://sketchfab.com/models/ef40b2d300334d009984c8865b2db1c8"
          ],
          "images": [
            {
              "filename": "modio-color-dark.png",
              "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
              "thumb_320x180": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
            }
          ]
        },
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
          "metadata_blob": "rogue,hd,high-res,4k,hd textures",
          "download": {
            "binary_url": "https://mod.io/mods/file/1/c489a0354111a4d76640d47f0cdcb294",
            "date_expires": 1579316848
          }
        },
        "metadata_kvp": [
          {
            "metakey": "pistol-dmg",
            "metavalue": "800"
          }
        ],
        "tags": [
          {
            "name": "Unity",
            "date_added": 1499841487
          }
        ],
        "stats": {
          "mod_id": 2,
          "popularity_rank_position": 13,
          "popularity_rank_total_mods": 204,
          "downloads_total": 27492,
          "subscribers_total": 16394,
          "ratings_total": 1230,
          "ratings_positive": 1047,
          "ratings_negative": 183,
          "ratings_percentage_positive": 91,
          "ratings_weighted_aggregate": 87.38,
          "ratings_display_text": "Very Positive",
          "date_expires": 1492564103
        }
      }
    ]
  }
} 
```


### Properties

Name|Type|Description
---|---|---|---|
code|integer|Response HTTP code.
body|[Batch Body Object](#schemabatch_body_object)|Contains batch request data.
» data|[Mod Object](#schemamod_object)[]|Contains Mod Objects.
»» id|integer|Unique mod id.
»» game_id|integer|Unique game id.
»» status|integer|Status of the mod (see [status and visibility](#status-amp-visibility) for details):<br><br>__0__ = Not Accepted<br>__1__ = Accepted<br>__3__ = Deleted
»» visible|integer|Visibility of the mod (see [status and visibility](#status-amp-visibility) for details):<br><br>__0__ = Hidden<br>__1__ = Public
»» submitted_by|[User Object](#schemauser_object)|Contains user data.
»»» id|integer|Unique id of the user.
»»» name_id|string|Path for the user on mod.io. For example: https://mod.io/members/__name-id-here__
»»» username|string|Username of the user.
»»» date_online|integer|Unix timestamp of date the user was last online.
»»» avatar|[Avatar Object](#schemaavatar_object)|Contains avatar data.
»»»» filename|string|Avatar filename including extension.
»»»» original|string|URL to the full-sized avatar.
»»»» thumb_50x50|string|URL to the small avatar thumbnail.
»»»» thumb_100x100|string|URL to the medium avatar thumbnail.
»»» timezone|string|This field is no longer used and will return an empty string.
»»» language|string|This field is no longer used and will return an empty string. To [localize the API response](#localization) we recommend you set the `Accept-Language` header.
»»» profile_url|string|URL to the user's mod.io profile.
»» date_added|integer|Unix timestamp of date mod was registered.
»» date_updated|integer|Unix timestamp of date mod was updated.
»» date_live|integer|Unix timestamp of date mod was set live.
»» maturity_option|integer|Maturity options flagged by the mod developer, this is only relevant if the parent game allows mods to be labelled as mature.<br><br>__0__ = None set _(default)_<br>__1__ = Alcohol<br>__2__ = Drugs<br>__4__ = Violence<br>__8__ = Explicit<br>__?__ = Add the options you want together, to enable multiple filters (see [BITWISE fields](#bitwise-and-bitwise-and))
»» logo|[Logo Object](#schemalogo_object)|Contains logo data.
»»» filename|string|Logo filename including extension.
»»» original|string|URL to the full-sized logo.
»»» thumb_320x180|string|URL to the small logo thumbnail.
»»» thumb_640x360|string|URL to the medium logo thumbnail.
»»» thumb_1280x720|string|URL to the large logo thumbnail.
»» homepage_url|string|Official homepage of the mod.
»» name|string|Name of the mod.
»» name_id|string|Path for the mod on mod.io. For example: https://gamename.mod.io/__mod-name-id-here__
»» summary|string|Summary of the mod.
»» description|string|Detailed description of the mod which allows HTML.
»» description_plaintext|string|`description` field converted into plaintext.
»» metadata_blob|string|Metadata stored by the game developer. Metadata can also be stored as searchable [key value pairs](#metadata), and to individual [mod files](#get-modfiles).
»» profile_url|string|URL to the mod's mod.io profile.
»» media|[Mod Media Object](#schemamod_media_object)|Contains mod media data.
»»» youtube|string[]|Array of YouTube links.
»»» sketchfab|string[]|Array of SketchFab links.
»»» images|[Image Object](#schemaimage_object)[]|Array of image objects (a gallery).
»»»» filename|string|Image filename including extension.
»»»» original|string|URL to the full-sized image.
»»»» thumb_320x180|string|URL to the image thumbnail.
»» modfile|[Modfile Object](#schemamodfile_object)|Contains modfile data.
»»» id|integer|Unique modfile id.
»»» mod_id|integer|Unique mod id.
»»» date_added|integer|Unix timestamp of date file was added.
»»» date_scanned|integer|Unix timestamp of date file was virus scanned.
»»» virus_status|integer|Current virus scan status of the file. For newly added files that have yet to be scanned this field will change frequently until a scan is complete:<br><br>__0__ = Not scanned<br>__1__ = Scan complete<br>__2__ = In progress<br>__3__ = Too large to scan<br>__4__ = File not found<br>__5__ = Error Scanning
»»» virus_positive|integer|Was a virus detected:<br><br>__0__ = No threats detected<br>__1__ = Flagged as malicious
»»» virustotal_hash|string|VirusTotal proprietary hash to view the [scan results](https://www.virustotal.com).
»»» filesize|integer|Size of the file in bytes.
»»» filehash|[Filehash Object](#schemafilehash_object)|Contains filehash data.
»»»» md5|string|MD5 hash of the file.
»»» filename|string|Filename including extension.
»»» version|string|Release version this file represents.
»»» changelog|string|Changelog for the file.
»»» metadata_blob|string|Metadata stored by the game developer for this file.
»»» download|[Download Object](#schemadownload_object)|Contains download data.
»»»» binary_url|string|URL to download the file from the mod.io CDN.<br><br>__NOTE:__ If the [game](#edit-game) requires mod downloads to be initiated via the API, the `binary_url` returned will contain a verification hash. This hash must be supplied to get the modfile, and will expire after a certain period of time. Saving and reusing the `binary_url` won't work in this situation given it's dynamic nature.
»»»» date_expires|integer|Unix timestamp of when the `binary_url` will expire.
»» stats|[Mod Stats Object](#schemamod_stats_object)|Contains stats data.
»»» mod_id|integer|Unique mod id.
»»» popularity_rank_position|integer|Current rank of the mod.
»»» popularity_rank_total_mods|integer|Number of ranking spots the current rank is measured against.
»»» downloads_total|integer|Number of total mod downloads.
»»» subscribers_total|integer|Number of total users who have subscribed to the mod.
»»» ratings_total|integer|Number of times this mod has been rated.
»»» ratings_positive|integer|Number of positive ratings.
»»» ratings_negative|integer|Number of negative ratings.
»»» ratings_percentage_positive|integer|Number of positive ratings, divided by the total ratings to determine it’s percentage score.
»»» ratings_weighted_aggregate|number|Overall rating of this item calculated using the [Wilson score confidence interval](https://www.evanmiller.org/how-not-to-sort-by-average-rating.html). This column is good to sort on, as it will order items based on number of ratings and will place items with many positive ratings above those with a higher score but fewer ratings.
»»» ratings_display_text|string|Textual representation of the rating in format:<br><br>- Overwhelmingly Positive<br>- Very Positive<br>- Positive<br>- Mostly Positive<br>- Mixed<br>- Negative<br>- Mostly Negative<br>- Very Negative<br>- Overwhelmingly Negative<br>- Unrated
»»» date_expires|integer|Unix timestamp until this mods's statistics are considered stale.
»» metadata_kvp|[Metadata KVP Object](#schemametadata_kvp_object)[]|Contains key-value metadata.
»»» metakey|string|The key of the key-value pair.
»»» metavalue|string|The value of the key-value pair.
»» tags|[Mod Tag Object](#schemamod_tag_object)[]|Contains mod tag data.
»»» name|string|Tag name.
»»» date_added|integer|Unix timestamp of date tag was applied.
headers|[[Key-Value Pair Object](#schemakey-value_pair_object)]|Contains key-value pairs.
» key|string|Key of the key-value pair.
» value|string|Value of the key-value pair. Will always be a string, even if numeric.




## Comment Object

   <a name="schemacomment_object"></a>

```json
{
  "id": 2,
  "mod_id": 2,
  "user": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "date_online": 1509922961,
    "avatar": {
      "filename": "modio-color-dark.png",
      "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
      "thumb_50x50": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
      "thumb_100x100": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
    },
    "timezone": "",
    "language": "",
    "profile_url": "https://mod.io/members/xant"
  },
  "date_added": 1499841487,
  "reply_id": 0,
  "thread_position": "01",
  "karma": 1,
  "karma_guest": 0,
  "content": "Hey <a href=\"https://mod.io/members/XanT\">XanT</a>, you should check out this mod!"
} 
```


### Properties

Name|Type|Description
---|---|---|---|
id|integer|Unique id of the comment.
mod_id|integer|Unique id of the parent mod.
user|[User Object](#schemauser_object)|Contains user data.
» id|integer|Unique id of the user.
» name_id|string|Path for the user on mod.io. For example: https://mod.io/members/__name-id-here__
» username|string|Username of the user.
» date_online|integer|Unix timestamp of date the user was last online.
» avatar|[Avatar Object](#schemaavatar_object)|Contains avatar data.
»» filename|string|Avatar filename including extension.
»» original|string|URL to the full-sized avatar.
»» thumb_50x50|string|URL to the small avatar thumbnail.
»» thumb_100x100|string|URL to the medium avatar thumbnail.
» timezone|string|This field is no longer used and will return an empty string.
» language|string|This field is no longer used and will return an empty string. To [localize the API response](#localization) we recommend you set the `Accept-Language` header.
» profile_url|string|URL to the user's mod.io profile.
date_added|integer|Unix timestamp of date the comment was posted.
reply_id|integer|Id of the parent comment this comment is replying to (can be 0 if the comment is not a reply).
thread_position|string|Levels of nesting in a comment thread. How it works:<br><br>- The first comment will have the position '01'.<br>- The second comment will have the position '02'.<br>- If someone responds to the second comment the position will be '02.01'.<br>- A maximum of 3 levels is supported.
karma|integer|Karma received for the comment (can be postive or negative).
karma_guest|integer|No longer used and will be removed in subsequent API version.
content|string|Contents of the comment.




## Download Object

   <a name="schemadownload_object"></a>

```json
{
  "binary_url": "https://mod.io/mods/file/1/c489a0354111a4d76640d47f0cdcb294",
  "date_expires": 1579316848
} 
```


### Properties

Name|Type|Description
---|---|---|---|
binary_url|string|URL to download the file from the mod.io CDN.<br><br>__NOTE:__ If the [game](#edit-game) requires mod downloads to be initiated via the API, the `binary_url` returned will contain a verification hash. This hash must be supplied to get the modfile, and will expire after a certain period of time. Saving and reusing the `binary_url` won't work in this situation given it's dynamic nature.
date_expires|integer|Unix timestamp of when the `binary_url` will expire.




## Error Object

   <a name="schemaerror_object"></a>

```json
{
  "error": {
    "code": 403,
    "error_ref": 10000,
    "message": "You do not have the required permissions to access this resource.",
    "errors": {}
  }
} 
```


### Properties

Name|Type|Description
---|---|---|---|
error|object|Contains error data.
» code|integer|The [HTTP code](#response-codes).
» error_ref|integer|The mod.io error code.
» message|string|The server response to your request. Responses will vary depending on the endpoint, but the object structure will persist.
» errors|object|Optional Validation errors object. This field is only supplied if the response is a validation error `422 Unprocessible Entity`. See [errors documentation](#errors) for more information.




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




## Game Object

   <a name="schemagame_object"></a>

```json
{
  "id": 2,
  "status": 1,
  "submitted_by": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "date_online": 1509922961,
    "avatar": {
      "filename": "modio-color-dark.png",
      "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
      "thumb_50x50": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
      "thumb_100x100": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
    },
    "timezone": "",
    "language": "",
    "profile_url": "https://mod.io/members/xant"
  },
  "date_added": 1493702614,
  "date_updated": 1499410290,
  "date_live": 1499841403,
  "presentation_option": 1,
  "submission_option": 0,
  "curation_option": 0,
  "community_options": 3,
  "revenue_options": 1500,
  "api_access_options": 3,
  "maturity_options": 0,
  "ugc_name": "map",
  "icon": {
    "filename": "modio-color-dark.png",
    "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
    "thumb_64x64": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
    "thumb_128x128": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
    "thumb_256x256": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
  },
  "logo": {
    "filename": "modio-color-dark.png",
    "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
    "thumb_320x180": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
    "thumb_640x360": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
    "thumb_1280x720": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
  },
  "header": {
    "filename": "demo.png",
    "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
  },
  "name": "Rogue Knight",
  "name_id": "rogue-knight",
  "summary": "Rogue Knight is a brand new 2D pixel platformer that supports custom levels and characters.",
  "instructions": "Instructions on the process to upload mods.",
  "instructions_url": "https://www.rogue-knight-game.com/modding/getting-started",
  "profile_url": "https://rogue-knight.mod.io",
  "tag_options": [
    {
      "name": "Theme",
      "type": "checkboxes",
      "tags": [
        "Horror"
      ],
      "hidden": false
    }
  ]
} 
```


### Properties

Name|Type|Description
---|---|---|---|
id|integer|Unique game id.
status|integer|Status of the game (see [status and visibility](#status-amp-visibility) for details):<br><br>__0__ = Not Accepted<br>__1__ = Accepted<br>__3__ = Deleted
submitted_by|[User Object](#schemauser_object)|Contains user data.
» id|integer|Unique id of the user.
» name_id|string|Path for the user on mod.io. For example: https://mod.io/members/__name-id-here__
» username|string|Username of the user.
» date_online|integer|Unix timestamp of date the user was last online.
» avatar|[Avatar Object](#schemaavatar_object)|Contains avatar data.
»» filename|string|Avatar filename including extension.
»» original|string|URL to the full-sized avatar.
»» thumb_50x50|string|URL to the small avatar thumbnail.
»» thumb_100x100|string|URL to the medium avatar thumbnail.
» timezone|string|This field is no longer used and will return an empty string.
» language|string|This field is no longer used and will return an empty string. To [localize the API response](#localization) we recommend you set the `Accept-Language` header.
» profile_url|string|URL to the user's mod.io profile.
date_added|integer|Unix timestamp of date game was registered.
date_updated|integer|Unix timestamp of date game was updated.
date_live|integer|Unix timestamp of date game was set live.
presentation_option|integer|Presentation style used on the mod.io website:<br><br>__0__ =  Grid View: Displays mods in a grid<br>__1__ = Table View: Displays mods in a table
submission_option|integer|Submission process modders must follow:<br><br>__0__ = Mod uploads must occur via the API using a tool created by the game developers<br>__1__ = Mod uploads can occur from anywhere, including the website and API
curation_option|integer|Curation process used to approve mods:<br><br>__0__ = No curation: Mods are immediately available to play<br>__1__ = Paid curation: Mods are immediately available to play unless they choose to receive donations. These mods must be accepted to be listed<br>__2__ = Full curation: All mods must be accepted by someone to be listed
community_options|integer|Community features enabled on the mod.io website:<br><br>__0__ = All of the options below are disabled<br>__1__ = Enable comments<br>__2__ = Enable guides<br>__4__ = Disable website _"subscribe to install"_ text<br>__?__ = Add the options you want together, to enable multiple features (see [BITWISE fields](#bitwise-and-bitwise-and))
revenue_options|integer|Revenue capabilities mods can enable:<br><br>__0__ = All of the options below are disabled<br>__1__ = Allow mods to be sold<br>__2__ = Allow mods to receive donations<br>__4__ = Allow mods to be traded<br>__8__ = Allow mods to control supply and scarcity<br>__?__ = Add the options you want together, to enable multiple features (see [BITWISE fields](#bitwise-and-bitwise-and))
api_access_options|integer|Level of API access allowed by this game:<br><br>__0__ = All of the options below are disabled<br>__1__ = Allow 3rd parties to access this games API endpoints<br>__2__ = Allow mods to be downloaded directly (if disabled all download URLs will contain a frequently changing verification hash to stop unauthorized use)<br>__?__ = Add the options you want together, to enable multiple features (see [BITWISE fields](#bitwise-and-bitwise-and))
maturity_options|integer|Switch to allow developers to select if they flag their mods as containing mature content:<br><br>__0__ = Don't allow _(default)_<br>__1__ = Allow
ugc_name|string|Word used to describe user-generated content (mods, items, addons etc).
icon|[Icon Object](#schemaicon_object)|Contains icon data.
» filename|string|Icon filename including extension.
» original|string|URL to the full-sized icon.
» thumb_64x64|string|URL to the small icon thumbnail.
» thumb_128x128|string|URL to the medium icon thumbnail.
» thumb_256x256|string|URL to the large icon thumbnail.
logo|[Logo Object](#schemalogo_object)|Contains logo data.
» filename|string|Logo filename including extension.
» original|string|URL to the full-sized logo.
» thumb_320x180|string|URL to the small logo thumbnail.
» thumb_640x360|string|URL to the medium logo thumbnail.
» thumb_1280x720|string|URL to the large logo thumbnail.
header|[Header Image Object](#schemaheader_image_object)|Contains header data.
» filename|string|Header image filename including extension.
» original|string|URL to the full-sized header image.
name|string|Name of the game.
name_id|string|Subdomain for the game on mod.io. For example: https://__gamename__.mod.io
summary|string|Summary of the games mod support.
instructions|string|A guide about creating and uploading mods for this game to mod.io (applicable if submission_option = 0).
instructions_url|string|Link to a mod.io guide, your modding wiki or a page where modders can learn how to make and submit mods to your games profile.
profile_url|string|URL to the game's mod.io page.
tag_options|[Game Tag Option Object](#schemagame_tag_option_object)[]|Groups of tags configured by the game developer, that mods can select.
» name|string|Name of the tag group.
» type|string|Can multiple tags be selected via 'checkboxes' or should only a single tag be selected via a 'dropdown'.
» hidden|boolean|Groups of tags flagged as 'admin only' should only be used for filtering, and should not be displayed to users. Groups that are hidden will only be returned in a response if the authenticated user in the request is a team member of the parent game with `Manager` or `Administrator` privileges.
» tags|string[]|Array of tags in this group.




## Game Stats Object  

<a name="schemagame_stats_object"></a>

```json
{
  "game_id": 2,
  "mods_count_total": 13,
  "mods_downloads_today": 204,
  "mods_downloads_total": 27492,
  "mods_downloads_daily_average": 1230,
  "mods_subscribers_total": 16394,
  "date_expires": 1492564103
} 
```


### Properties

Name|Type|Description
---|---|---|---|
game_id|integer|Unique game id.
mods_count_total|integer|Available mod count for the game.
mods_downloads_today|integer|Mods downloaded today for the game.
mods_downloads_total|integer|Total Mods downloaded for the game.
mods_downloads_daily_average|integer|Average mods downloaded on a daily basis.
mods_subscribers_total|integer|Number of total users who have subscribed to the mods for the game.
date_expires|integer|Unix timestamp until this game's statistics are considered stale.




## Game Tag Option Object 

<a name="schemagame_tag_option_object"></a>

```json
{
  "name": "Theme",
  "type": "checkboxes",
  "tags": [
    "Horror"
  ],
  "hidden": false
} 
```


### Properties

Name|Type|Description
---|---|---|---|
name|string|Name of the tag group.
type|string|Can multiple tags be selected via 'checkboxes' or should only a single tag be selected via a 'dropdown'.
hidden|boolean|Groups of tags flagged as 'admin only' should only be used for filtering, and should not be displayed to users. Groups that are hidden will only be returned in a response if the authenticated user in the request is a team member of the parent game with `Manager` or `Administrator` privileges.
tags|string[]|Array of tags in this group.




## Make Batch Request

   <a name="schemamake_batch_request"></a>

```json
{
  "data": [
    {
      "code": 200,
      "headers": [
        {
          "key": "X-RateLimit-Remaining",
          "value": "98"
        }
      ],
      "body": {
        "data": [
          {
            "id": 2,
            "game_id": 2,
            "status": 1,
            "visible": 1,
            "submitted_by": {
              "id": 1,
              "name_id": "xant",
              "username": "XanT",
              "date_online": 1509922961,
              "avatar": {
                "filename": "modio-color-dark.png",
                "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
                "thumb_50x50": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
                "thumb_100x100": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
              },
              "timezone": "",
              "language": "",
              "profile_url": "https://mod.io/members/xant"
            },
            "date_added": 1492564103,
            "date_updated": 1499841487,
            "date_live": 1499841403,
            "maturity_option": 0,
            "logo": {
              "filename": "modio-color-dark.png",
              "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
              "thumb_320x180": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
              "thumb_640x360": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
              "thumb_1280x720": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
            },
            "homepage_url": "https://www.rogue-hdpack.com/",
            "name": "Rogue Knight HD Pack",
            "name_id": "rogue-knight-hd-pack",
            "summary": "It's time to bask in the glory of beautiful 4k textures!",
            "description": "<p>Rogue HD Pack does exactly what you thi...",
            "description_plaintext": "Rogue HD Pack does exactly what you thi...",
            "metadata_blob": "rogue,hd,high-res,4k,hd textures",
            "profile_url": "https://rogue-knight.mod.io/rogue-knight-hd-pack",
            "media": {
              "youtube": [
                "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              ],
              "sketchfab": [
                "https://sketchfab.com/models/ef40b2d300334d009984c8865b2db1c8"
              ],
              "images": [
                {
                  "filename": "modio-color-dark.png",
                  "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
                  "thumb_320x180": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
                }
              ]
            },
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
              "metadata_blob": "rogue,hd,high-res,4k,hd textures",
              "download": {
                "binary_url": "https://mod.io/mods/file/1/c489a0354111a4d76640d47f0cdcb294",
                "date_expires": 1579316848
              }
            },
            "metadata_kvp": [
              {
                "metakey": "pistol-dmg",
                "metavalue": "800"
              }
            ],
            "tags": [
              {
                "name": "Unity",
                "date_added": 1499841487
              }
            ],
            "stats": {
              "mod_id": 2,
              "popularity_rank_position": 13,
              "popularity_rank_total_mods": 204,
              "downloads_total": 27492,
              "subscribers_total": 16394,
              "ratings_total": 1230,
              "ratings_positive": 1047,
              "ratings_negative": 183,
              "ratings_percentage_positive": 91,
              "ratings_weighted_aggregate": 87.38,
              "ratings_display_text": "Very Positive",
              "date_expires": 1492564103
            }
          }
        ]
      }
    },
    {
        ...
    }
  ],
  "result_count": 1,
  "result_offset": 0,
  "result_limit": 20,
  "result_total": 1
} 
```


### Properties

Name|Type|Description
---|---|---|---|
data|[Batch Object](#schemabatch_object)[]|Array containing any response object.
» code|integer|Response HTTP code.
» body|[Batch Body Object](#schemabatch_body_object)|Contains batch request data.
»» data|[Mod Object](#schemamod_object)[]|Contains Mod Objects.
»»» id|integer|Unique mod id.
»»» game_id|integer|Unique game id.
»»» status|integer|Status of the mod (see [status and visibility](#status-amp-visibility) for details):<br><br>__0__ = Not Accepted<br>__1__ = Accepted<br>__3__ = Deleted
»»» visible|integer|Visibility of the mod (see [status and visibility](#status-amp-visibility) for details):<br><br>__0__ = Hidden<br>__1__ = Public
»»» submitted_by|[User Object](#schemauser_object)|Contains user data.
»»»» id|integer|Unique id of the user.
»»»» name_id|string|Path for the user on mod.io. For example: https://mod.io/members/__name-id-here__
»»»» username|string|Username of the user.
»»»» date_online|integer|Unix timestamp of date the user was last online.
»»»» avatar|[Avatar Object](#schemaavatar_object)|Contains avatar data.
»»»»» filename|string|Avatar filename including extension.
»»»»» original|string|URL to the full-sized avatar.
»»»»» thumb_50x50|string|URL to the small avatar thumbnail.
»»»»» thumb_100x100|string|URL to the medium avatar thumbnail.
»»»» timezone|string|This field is no longer used and will return an empty string.
»»»» language|string|This field is no longer used and will return an empty string. To [localize the API response](#localization) we recommend you set the `Accept-Language` header.
»»»» profile_url|string|URL to the user's mod.io profile.
»»» date_added|integer|Unix timestamp of date mod was registered.
»»» date_updated|integer|Unix timestamp of date mod was updated.
»»» date_live|integer|Unix timestamp of date mod was set live.
»»» maturity_option|integer|Maturity options flagged by the mod developer, this is only relevant if the parent game allows mods to be labelled as mature.<br><br>__0__ = None set _(default)_<br>__1__ = Alcohol<br>__2__ = Drugs<br>__4__ = Violence<br>__8__ = Explicit<br>__?__ = Add the options you want together, to enable multiple filters (see [BITWISE fields](#bitwise-and-bitwise-and))
»»» logo|[Logo Object](#schemalogo_object)|Contains logo data.
»»»» filename|string|Logo filename including extension.
»»»» original|string|URL to the full-sized logo.
»»»» thumb_320x180|string|URL to the small logo thumbnail.
»»»» thumb_640x360|string|URL to the medium logo thumbnail.
»»»» thumb_1280x720|string|URL to the large logo thumbnail.
»»» homepage_url|string|Official homepage of the mod.
»»» name|string|Name of the mod.
»»» name_id|string|Path for the mod on mod.io. For example: https://gamename.mod.io/__mod-name-id-here__
»»» summary|string|Summary of the mod.
»»» description|string|Detailed description of the mod which allows HTML.
»»» description_plaintext|string|`description` field converted into plaintext.
»»» metadata_blob|string|Metadata stored by the game developer. Metadata can also be stored as searchable [key value pairs](#metadata), and to individual [mod files](#get-modfiles).
»»» profile_url|string|URL to the mod's mod.io profile.
»»» media|[Mod Media Object](#schemamod_media_object)|Contains mod media data.
»»»» youtube|string[]|Array of YouTube links.
»»»» sketchfab|string[]|Array of SketchFab links.
»»»» images|[Image Object](#schemaimage_object)[]|Array of image objects (a gallery).
»»»»» filename|string|Image filename including extension.
»»»»» original|string|URL to the full-sized image.
»»»»» thumb_320x180|string|URL to the image thumbnail.
»»» modfile|[Modfile Object](#schemamodfile_object)|Contains modfile data.
»»»» id|integer|Unique modfile id.
»»»» mod_id|integer|Unique mod id.
»»»» date_added|integer|Unix timestamp of date file was added.
»»»» date_scanned|integer|Unix timestamp of date file was virus scanned.
»»»» virus_status|integer|Current virus scan status of the file. For newly added files that have yet to be scanned this field will change frequently until a scan is complete:<br><br>__0__ = Not scanned<br>__1__ = Scan complete<br>__2__ = In progress<br>__3__ = Too large to scan<br>__4__ = File not found<br>__5__ = Error Scanning
»»»» virus_positive|integer|Was a virus detected:<br><br>__0__ = No threats detected<br>__1__ = Flagged as malicious
»»»» virustotal_hash|string|VirusTotal proprietary hash to view the [scan results](https://www.virustotal.com).
»»»» filesize|integer|Size of the file in bytes.
»»»» filehash|[Filehash Object](#schemafilehash_object)|Contains filehash data.
»»»»» md5|string|MD5 hash of the file.
»»»» filename|string|Filename including extension.
»»»» version|string|Release version this file represents.
»»»» changelog|string|Changelog for the file.
»»»» metadata_blob|string|Metadata stored by the game developer for this file.
»»»» download|[Download Object](#schemadownload_object)|Contains download data.
»»»»» binary_url|string|URL to download the file from the mod.io CDN.<br><br>__NOTE:__ If the [game](#edit-game) requires mod downloads to be initiated via the API, the `binary_url` returned will contain a verification hash. This hash must be supplied to get the modfile, and will expire after a certain period of time. Saving and reusing the `binary_url` won't work in this situation given it's dynamic nature.
»»»»» date_expires|integer|Unix timestamp of when the `binary_url` will expire.
»»» stats|[Mod Stats Object](#schemamod_stats_object)|Contains stats data.
»»»» mod_id|integer|Unique mod id.
»»»» popularity_rank_position|integer|Current rank of the mod.
»»»» popularity_rank_total_mods|integer|Number of ranking spots the current rank is measured against.
»»»» downloads_total|integer|Number of total mod downloads.
»»»» subscribers_total|integer|Number of total users who have subscribed to the mod.
»»»» ratings_total|integer|Number of times this mod has been rated.
»»»» ratings_positive|integer|Number of positive ratings.
»»»» ratings_negative|integer|Number of negative ratings.
»»»» ratings_percentage_positive|integer|Number of positive ratings, divided by the total ratings to determine it’s percentage score.
»»»» ratings_weighted_aggregate|number|Overall rating of this item calculated using the [Wilson score confidence interval](https://www.evanmiller.org/how-not-to-sort-by-average-rating.html). This column is good to sort on, as it will order items based on number of ratings and will place items with many positive ratings above those with a higher score but fewer ratings.
»»»» ratings_display_text|string|Textual representation of the rating in format:<br><br>- Overwhelmingly Positive<br>- Very Positive<br>- Positive<br>- Mostly Positive<br>- Mixed<br>- Negative<br>- Mostly Negative<br>- Very Negative<br>- Overwhelmingly Negative<br>- Unrated
»»»» date_expires|integer|Unix timestamp until this mods's statistics are considered stale.
»»» metadata_kvp|[Metadata KVP Object](#schemametadata_kvp_object)[]|Contains key-value metadata.
»»»» metakey|string|The key of the key-value pair.
»»»» metavalue|string|The value of the key-value pair.
»»» tags|[Mod Tag Object](#schemamod_tag_object)[]|Contains mod tag data.
»»»» name|string|Tag name.
»»»» date_added|integer|Unix timestamp of date tag was applied.
» headers|[[Key-Value Pair Object](#schemakey-value_pair_object)]|Contains key-value pairs.
»» key|string|Key of the key-value pair.
»» value|string|Value of the key-value pair. Will always be a string, even if numeric.
result_count|integer|Number of results returned in this request.
result_offset|integer|Number of results skipped over. Defaults to 0 unless overridden by `_offset` filter.
result_limit|integer|Maximum number of results returned in the request. Defaults to 20 (max) unless overridden by `_limit` filter.
result_total|integer|Total number of results found.




## Get Game Tag Options 

<a name="schemaget_game_tag_options"></a>

```json
{
  "data": [
    {
      "name": "Theme",
      "type": "checkboxes",
      "tags": [
        "Horror"
      ],
      "hidden": false
    },
    {
        ...
    }
  ],
  "result_count": 70,
  "result_offset": 0,
  "result_limit": 100,
  "result_total": 70
} 
```


### Properties

Name|Type|Description
---|---|---|---|
data|[Game Tag Option Object](#schemagame_tag_option_object)[]|Array containing game tag objects.
» name|string|Name of the tag group.
» type|string|Can multiple tags be selected via 'checkboxes' or should only a single tag be selected via a 'dropdown'.
» hidden|boolean|Groups of tags flagged as 'admin only' should only be used for filtering, and should not be displayed to users. Groups that are hidden will only be returned in a response if the authenticated user in the request is a team member of the parent game with `Manager` or `Administrator` privileges.
» tags|string[]|Array of tags in this group.
result_count|integer|Number of results returned in this request.
result_offset|integer|Number of results skipped over. Defaults to 0 unless overridden by `_offset` filter.
result_limit|integer|Maximum number of results returned in the request. Defaults to 100 (max) unless overridden by `_limit` filter.
result_total|integer|Total number of results found.




## Get Games

   <a name="schemaget_games"></a>

```json
{
  "data": [
    {
      "id": 2,
      "status": 1,
      "submitted_by": {
        "id": 1,
        "name_id": "xant",
        "username": "XanT",
        "date_online": 1509922961,
        "avatar": {
          "filename": "modio-color-dark.png",
          "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
          "thumb_50x50": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
          "thumb_100x100": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
        },
        "timezone": "",
        "language": "",
        "profile_url": "https://mod.io/members/xant"
      },
      "date_added": 1493702614,
      "date_updated": 1499410290,
      "date_live": 1499841403,
      "presentation_option": 1,
      "submission_option": 0,
      "curation_option": 0,
      "community_options": 3,
      "revenue_options": 1500,
      "api_access_options": 3,
      "maturity_options": 0,
      "ugc_name": "map",
      "icon": {
        "filename": "modio-color-dark.png",
        "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
        "thumb_64x64": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
        "thumb_128x128": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
        "thumb_256x256": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
      },
      "logo": {
        "filename": "modio-color-dark.png",
        "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
        "thumb_320x180": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
        "thumb_640x360": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
        "thumb_1280x720": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
      },
      "header": {
        "filename": "demo.png",
        "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
      },
      "name": "Rogue Knight",
      "name_id": "rogue-knight",
      "summary": "Rogue Knight is a brand new 2D pixel platformer that supports custom levels and characters.",
      "instructions": "Instructions on the process to upload mods.",
      "instructions_url": "https://www.rogue-knight-game.com/modding/getting-started",
      "profile_url": "https://rogue-knight.mod.io",
      "tag_options": [
        {
          "name": "Theme",
          "type": "checkboxes",
          "tags": [
            "Horror"
          ],
          "hidden": false
        }
      ]
    },
    {
        ...
    }
  ],
  "result_count": 70,
  "result_offset": 0,
  "result_limit": 100,
  "result_total": 70
} 
```


### Properties

Name|Type|Description
---|---|---|---|
data|[Game Object](#schemagame_object)[]|Array containing game objects.
» id|integer|Unique game id.
» status|integer|Status of the game (see [status and visibility](#status-amp-visibility) for details):<br><br>__0__ = Not Accepted<br>__1__ = Accepted<br>__3__ = Deleted
» submitted_by|[User Object](#schemauser_object)|Contains user data.
»» id|integer|Unique id of the user.
»» name_id|string|Path for the user on mod.io. For example: https://mod.io/members/__name-id-here__
»» username|string|Username of the user.
»» date_online|integer|Unix timestamp of date the user was last online.
»» avatar|[Avatar Object](#schemaavatar_object)|Contains avatar data.
»»» filename|string|Avatar filename including extension.
»»» original|string|URL to the full-sized avatar.
»»» thumb_50x50|string|URL to the small avatar thumbnail.
»»» thumb_100x100|string|URL to the medium avatar thumbnail.
»» timezone|string|This field is no longer used and will return an empty string.
»» language|string|This field is no longer used and will return an empty string. To [localize the API response](#localization) we recommend you set the `Accept-Language` header.
»» profile_url|string|URL to the user's mod.io profile.
» date_added|integer|Unix timestamp of date game was registered.
» date_updated|integer|Unix timestamp of date game was updated.
» date_live|integer|Unix timestamp of date game was set live.
» presentation_option|integer|Presentation style used on the mod.io website:<br><br>__0__ =  Grid View: Displays mods in a grid<br>__1__ = Table View: Displays mods in a table
» submission_option|integer|Submission process modders must follow:<br><br>__0__ = Mod uploads must occur via the API using a tool created by the game developers<br>__1__ = Mod uploads can occur from anywhere, including the website and API
» curation_option|integer|Curation process used to approve mods:<br><br>__0__ = No curation: Mods are immediately available to play<br>__1__ = Paid curation: Mods are immediately available to play unless they choose to receive donations. These mods must be accepted to be listed<br>__2__ = Full curation: All mods must be accepted by someone to be listed
» community_options|integer|Community features enabled on the mod.io website:<br><br>__0__ = All of the options below are disabled<br>__1__ = Enable comments<br>__2__ = Enable guides<br>__4__ = Disable website _"subscribe to install"_ text<br>__?__ = Add the options you want together, to enable multiple features (see [BITWISE fields](#bitwise-and-bitwise-and))
» revenue_options|integer|Revenue capabilities mods can enable:<br><br>__0__ = All of the options below are disabled<br>__1__ = Allow mods to be sold<br>__2__ = Allow mods to receive donations<br>__4__ = Allow mods to be traded<br>__8__ = Allow mods to control supply and scarcity<br>__?__ = Add the options you want together, to enable multiple features (see [BITWISE fields](#bitwise-and-bitwise-and))
» api_access_options|integer|Level of API access allowed by this game:<br><br>__0__ = All of the options below are disabled<br>__1__ = Allow 3rd parties to access this games API endpoints<br>__2__ = Allow mods to be downloaded directly (if disabled all download URLs will contain a frequently changing verification hash to stop unauthorized use)<br>__?__ = Add the options you want together, to enable multiple features (see [BITWISE fields](#bitwise-and-bitwise-and))
» maturity_options|integer|Switch to allow developers to select if they flag their mods as containing mature content:<br><br>__0__ = Don't allow _(default)_<br>__1__ = Allow
» ugc_name|string|Word used to describe user-generated content (mods, items, addons etc).
» icon|[Icon Object](#schemaicon_object)|Contains icon data.
»» filename|string|Icon filename including extension.
»» original|string|URL to the full-sized icon.
»» thumb_64x64|string|URL to the small icon thumbnail.
»» thumb_128x128|string|URL to the medium icon thumbnail.
»» thumb_256x256|string|URL to the large icon thumbnail.
» logo|[Logo Object](#schemalogo_object)|Contains logo data.
»» filename|string|Logo filename including extension.
»» original|string|URL to the full-sized logo.
»» thumb_320x180|string|URL to the small logo thumbnail.
»» thumb_640x360|string|URL to the medium logo thumbnail.
»» thumb_1280x720|string|URL to the large logo thumbnail.
» header|[Header Image Object](#schemaheader_image_object)|Contains header data.
»» filename|string|Header image filename including extension.
»» original|string|URL to the full-sized header image.
» name|string|Name of the game.
» name_id|string|Subdomain for the game on mod.io. For example: https://__gamename__.mod.io
» summary|string|Summary of the games mod support.
» instructions|string|A guide about creating and uploading mods for this game to mod.io (applicable if submission_option = 0).
» instructions_url|string|Link to a mod.io guide, your modding wiki or a page where modders can learn how to make and submit mods to your games profile.
» profile_url|string|URL to the game's mod.io page.
» tag_options|[Game Tag Option Object](#schemagame_tag_option_object)[]|Groups of tags configured by the game developer, that mods can select.
»» name|string|Name of the tag group.
»» type|string|Can multiple tags be selected via 'checkboxes' or should only a single tag be selected via a 'dropdown'.
»» hidden|boolean|Groups of tags flagged as 'admin only' should only be used for filtering, and should not be displayed to users. Groups that are hidden will only be returned in a response if the authenticated user in the request is a team member of the parent game with `Manager` or `Administrator` privileges.
»» tags|string[]|Array of tags in this group.
result_count|integer|Number of results returned in this request.
result_offset|integer|Number of results skipped over. Defaults to 0 unless overridden by `_offset` filter.
result_limit|integer|Maximum number of results returned in the request. Defaults to 100 (max) unless overridden by `_limit` filter.
result_total|integer|Total number of results found.




## Get Mod Comments  

<a name="schemaget_mod_comments"></a>

```json
{
  "data": [
    {
      "id": 2,
      "mod_id": 2,
      "user": {
        "id": 1,
        "name_id": "xant",
        "username": "XanT",
        "date_online": 1509922961,
        "avatar": {
          "filename": "modio-color-dark.png",
          "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
          "thumb_50x50": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
          "thumb_100x100": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
        },
        "timezone": "",
        "language": "",
        "profile_url": "https://mod.io/members/xant"
      },
      "date_added": 1499841487,
      "reply_id": 0,
      "thread_position": "01",
      "karma": 1,
      "karma_guest": 0,
      "content": "Hey <a href=\"https://mod.io/members/XanT\">XanT</a>, you should check out this mod!"
    }
  ],
  "result_count": 1,
  "result_offset": 0,
  "result_limit": 100,
  "result_total": 1
} 
```


### Properties

Name|Type|Description
---|---|---|---|
data|[Comment Object](#schemacomment_object)[]|Array containing comment objects.
» id|integer|Unique id of the comment.
» mod_id|integer|Unique id of the parent mod.
» user|[User Object](#schemauser_object)|Contains user data.
»» id|integer|Unique id of the user.
»» name_id|string|Path for the user on mod.io. For example: https://mod.io/members/__name-id-here__
»» username|string|Username of the user.
»» date_online|integer|Unix timestamp of date the user was last online.
»» avatar|[Avatar Object](#schemaavatar_object)|Contains avatar data.
»»» filename|string|Avatar filename including extension.
»»» original|string|URL to the full-sized avatar.
»»» thumb_50x50|string|URL to the small avatar thumbnail.
»»» thumb_100x100|string|URL to the medium avatar thumbnail.
»» timezone|string|This field is no longer used and will return an empty string.
»» language|string|This field is no longer used and will return an empty string. To [localize the API response](#localization) we recommend you set the `Accept-Language` header.
»» profile_url|string|URL to the user's mod.io profile.
» date_added|integer|Unix timestamp of date the comment was posted.
» reply_id|integer|Id of the parent comment this comment is replying to (can be 0 if the comment is not a reply).
» thread_position|string|Levels of nesting in a comment thread. How it works:<br><br>- The first comment will have the position '01'.<br>- The second comment will have the position '02'.<br>- If someone responds to the second comment the position will be '02.01'.<br>- A maximum of 3 levels is supported.
» karma|integer|Karma received for the comment (can be postive or negative).
» karma_guest|integer|No longer used and will be removed in subsequent API version.
» content|string|Contents of the comment.
result_count|integer|Number of results returned in this request.
result_offset|integer|Number of results skipped over. Defaults to 0 unless overridden by `_offset` filter.
result_limit|integer|Maximum number of results returned in the request. Defaults to 100 (max) unless overridden by `_limit` filter.
result_total|integer|Total number of results found.




## Get Mod Dependencies  

<a name="schemaget_mod_dependencies"></a>

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
  "result_count": 70,
  "result_offset": 0,
  "result_limit": 100,
  "result_total": 70
} 
```


### Properties

Name|Type|Description
---|---|---|---|
data|[Mod Dependencies Object](#schemamod_dependencies_object)[]|Array containing mod dependencies objects.
» mod_id|integer|Unique id of the mod that is the dependency.
» date_added|integer|Unix timestamp of date the dependency was added.
result_count|integer|Number of results returned in this request.
result_offset|integer|Number of results skipped over. Defaults to 0 unless overridden by `_offset` filter.
result_limit|integer|Maximum number of results returned in the request. Defaults to 100 (max) unless overridden by `_limit` filter.
result_total|integer|Total number of results found.




## Get Mod Events  

<a name="schemaget_mod_events"></a>

```json
{
  "data": [
    {
      "id": 13,
      "mod_id": 13,
      "user_id": 13,
      "date_added": 1499846132,
      "event_type": "MODFILE_CHANGED"
    },
    {
        ...
    }
  ],
  "result_count": 70,
  "result_offset": 0,
  "result_limit": 100,
  "result_total": 70
} 
```


### Properties

Name|Type|Description
---|---|---|---|
data|[Mod Event Object](#schemamod_event_object)[]|Array containing mod event objects.
» id|integer|Unique id of the event object.
» mod_id|integer|Unique id of the parent mod.
» user_id|integer|Unique id of the user who performed the action.
» date_added|integer|Unix timestamp of date the event occurred.
» event_type|string|Type of event that was triggered. List of possible events: <br><br>- MODFILE_CHANGED<br>- MOD_AVAILABLE<br>- MOD_UNAVAILABLE<br>- MOD_EDITED<br>- MOD_DELETED<br>- MOD_TEAM_CHANGED
result_count|integer|Number of results returned in this request.
result_offset|integer|Number of results skipped over. Defaults to 0 unless overridden by `_offset` filter.
result_limit|integer|Maximum number of results returned in the request. Defaults to 100 (max) unless overridden by `_limit` filter.
result_total|integer|Total number of results found.




## Get Mod KVP Metadata 

<a name="schemaget_mod_kvp_metadata"></a>

```json
{
  "data": [
    {
      "metakey": "pistol-dmg",
      "metavalue": "800"
    },
    {
        ...
    }
  ],
  "result_count": 70,
  "result_offset": 0,
  "result_limit": 100,
  "result_total": 70
} 
```


### Properties

Name|Type|Description
---|---|---|---|
data|[Metadata KVP Object](#schemametadata_kvp_object)[]|Array containing metadata kvp objects.
» metakey|string|The key of the key-value pair.
» metavalue|string|The value of the key-value pair.
result_count|integer|Number of results returned in this request.
result_offset|integer|Number of results skipped over. Defaults to 0 unless overridden by `_offset` filter.
result_limit|integer|Maximum number of results returned in the request. Defaults to 100 (max) unless overridden by `_limit` filter.
result_total|integer|Total number of results found.




## Get Mod Stats  

<a name="schemaget_mod_stats"></a>

```json
{
  "data": [
    {
      "mod_id": 2,
      "popularity_rank_position": 13,
      "popularity_rank_total_mods": 204,
      "downloads_total": 27492,
      "subscribers_total": 16394,
      "ratings_total": 1230,
      "ratings_positive": 1047,
      "ratings_negative": 183,
      "ratings_percentage_positive": 91,
      "ratings_weighted_aggregate": 87.38,
      "ratings_display_text": "Very Positive",
      "date_expires": 1492564103
    },
    {
        ...
    }
  ],
  "result_count": 70,
  "result_offset": 0,
  "result_limit": 100,
  "result_total": 70
} 
```


### Properties

Name|Type|Description
---|---|---|---|
data|[Mod Stats Object](#schemamod_stats_object)[]|Array containing stats objects.
» mod_id|integer|Unique mod id.
» popularity_rank_position|integer|Current rank of the mod.
» popularity_rank_total_mods|integer|Number of ranking spots the current rank is measured against.
» downloads_total|integer|Number of total mod downloads.
» subscribers_total|integer|Number of total users who have subscribed to the mod.
» ratings_total|integer|Number of times this mod has been rated.
» ratings_positive|integer|Number of positive ratings.
» ratings_negative|integer|Number of negative ratings.
» ratings_percentage_positive|integer|Number of positive ratings, divided by the total ratings to determine it’s percentage score.
» ratings_weighted_aggregate|number|Overall rating of this item calculated using the [Wilson score confidence interval](https://www.evanmiller.org/how-not-to-sort-by-average-rating.html). This column is good to sort on, as it will order items based on number of ratings and will place items with many positive ratings above those with a higher score but fewer ratings.
» ratings_display_text|string|Textual representation of the rating in format:<br><br>- Overwhelmingly Positive<br>- Very Positive<br>- Positive<br>- Mostly Positive<br>- Mixed<br>- Negative<br>- Mostly Negative<br>- Very Negative<br>- Overwhelmingly Negative<br>- Unrated
» date_expires|integer|Unix timestamp until this mods's statistics are considered stale.
result_count|integer|Number of results returned in this request.
result_offset|integer|Number of results skipped over. Defaults to 0 unless overridden by `_offset` filter.
result_limit|integer|Maximum number of results returned in the request. Defaults to 100 (max) unless overridden by `_limit` filter.
result_total|integer|Total number of results found.




## Get Mod Tags  

<a name="schemaget_mod_tags"></a>

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
  "result_count": 70,
  "result_offset": 0,
  "result_limit": 100,
  "result_total": 70
} 
```


### Properties

Name|Type|Description
---|---|---|---|
data|[Mod Tag Object](#schemamod_tag_object)[]|Array containing mod tag objects.
» name|string|Tag name.
» date_added|integer|Unix timestamp of date tag was applied.
result_count|integer|Number of results returned in this request.
result_offset|integer|Number of results skipped over. Defaults to 0 unless overridden by `_offset` filter.
result_limit|integer|Maximum number of results returned in the request. Defaults to 100 (max) unless overridden by `_limit` filter.
result_total|integer|Total number of results found.




## Get Modfiles

   <a name="schemaget_modfiles"></a>

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
      "metadata_blob": "rogue,hd,high-res,4k,hd textures",
      "download": {
        "binary_url": "https://mod.io/mods/file/1/c489a0354111a4d76640d47f0cdcb294",
        "date_expires": 1579316848
      }
    },
    {
        ...
    }
  ],
  "result_count": 70,
  "result_offset": 0,
  "result_limit": 100,
  "result_total": 70
} 
```


### Properties

Name|Type|Description
---|---|---|---|
data|[Modfile Object](#schemamodfile_object)[]|Array containing modfile objects.
» id|integer|Unique modfile id.
» mod_id|integer|Unique mod id.
» date_added|integer|Unix timestamp of date file was added.
» date_scanned|integer|Unix timestamp of date file was virus scanned.
» virus_status|integer|Current virus scan status of the file. For newly added files that have yet to be scanned this field will change frequently until a scan is complete:<br><br>__0__ = Not scanned<br>__1__ = Scan complete<br>__2__ = In progress<br>__3__ = Too large to scan<br>__4__ = File not found<br>__5__ = Error Scanning
» virus_positive|integer|Was a virus detected:<br><br>__0__ = No threats detected<br>__1__ = Flagged as malicious
» virustotal_hash|string|VirusTotal proprietary hash to view the [scan results](https://www.virustotal.com).
» filesize|integer|Size of the file in bytes.
» filehash|[Filehash Object](#schemafilehash_object)|Contains filehash data.
»» md5|string|MD5 hash of the file.
» filename|string|Filename including extension.
» version|string|Release version this file represents.
» changelog|string|Changelog for the file.
» metadata_blob|string|Metadata stored by the game developer for this file.
» download|[Download Object](#schemadownload_object)|Contains download data.
»» binary_url|string|URL to download the file from the mod.io CDN.<br><br>__NOTE:__ If the [game](#edit-game) requires mod downloads to be initiated via the API, the `binary_url` returned will contain a verification hash. This hash must be supplied to get the modfile, and will expire after a certain period of time. Saving and reusing the `binary_url` won't work in this situation given it's dynamic nature.
»» date_expires|integer|Unix timestamp of when the `binary_url` will expire.
result_count|integer|Number of results returned in this request.
result_offset|integer|Number of results skipped over. Defaults to 0 unless overridden by `_offset` filter.
result_limit|integer|Maximum number of results returned in the request. Defaults to 100 (max) unless overridden by `_limit` filter.
result_total|integer|Total number of results found.




## Get Mods

   <a name="schemaget_mods"></a>

```json
{
  "data": [
    {
      "id": 2,
      "game_id": 2,
      "status": 1,
      "visible": 1,
      "submitted_by": {
        "id": 1,
        "name_id": "xant",
        "username": "XanT",
        "date_online": 1509922961,
        "avatar": {
          "filename": "modio-color-dark.png",
          "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
          "thumb_50x50": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
          "thumb_100x100": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
        },
        "timezone": "",
        "language": "",
        "profile_url": "https://mod.io/members/xant"
      },
      "date_added": 1492564103,
      "date_updated": 1499841487,
      "date_live": 1499841403,
      "maturity_option": 0,
      "logo": {
        "filename": "modio-color-dark.png",
        "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
        "thumb_320x180": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
        "thumb_640x360": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
        "thumb_1280x720": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
      },
      "homepage_url": "https://www.rogue-hdpack.com/",
      "name": "Rogue Knight HD Pack",
      "name_id": "rogue-knight-hd-pack",
      "summary": "It's time to bask in the glory of beautiful 4k textures!",
      "description": "<p>Rogue HD Pack does exactly what you thi...",
      "description_plaintext": "Rogue HD Pack does exactly what you thi...",
      "metadata_blob": "rogue,hd,high-res,4k,hd textures",
      "profile_url": "https://rogue-knight.mod.io/rogue-knight-hd-pack",
      "media": {
        "youtube": [
          "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        ],
        "sketchfab": [
          "https://sketchfab.com/models/ef40b2d300334d009984c8865b2db1c8"
        ],
        "images": [
          {
            "filename": "modio-color-dark.png",
            "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
            "thumb_320x180": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
          }
        ]
      },
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
        "metadata_blob": "rogue,hd,high-res,4k,hd textures",
        "download": {
          "binary_url": "https://mod.io/mods/file/1/c489a0354111a4d76640d47f0cdcb294",
          "date_expires": 1579316848
        }
      },
      "metadata_kvp": [
        {
          "metakey": "pistol-dmg",
          "metavalue": "800"
        }
      ],
      "tags": [
        {
          "name": "Unity",
          "date_added": 1499841487
        }
      ],
      "stats": {
        "mod_id": 2,
        "popularity_rank_position": 13,
        "popularity_rank_total_mods": 204,
        "downloads_total": 27492,
        "subscribers_total": 16394,
        "ratings_total": 1230,
        "ratings_positive": 1047,
        "ratings_negative": 183,
        "ratings_percentage_positive": 91,
        "ratings_weighted_aggregate": 87.38,
        "ratings_display_text": "Very Positive",
        "date_expires": 1492564103
      }
    },
    {
        ...
    }
  ],
  "result_count": 70,
  "result_offset": 0,
  "result_limit": 100,
  "result_total": 70
} 
```


### Properties

Name|Type|Description
---|---|---|---|
data|[Mod Object](#schemamod_object)[]|Array containing mod objects.
» id|integer|Unique mod id.
» game_id|integer|Unique game id.
» status|integer|Status of the mod (see [status and visibility](#status-amp-visibility) for details):<br><br>__0__ = Not Accepted<br>__1__ = Accepted<br>__3__ = Deleted
» visible|integer|Visibility of the mod (see [status and visibility](#status-amp-visibility) for details):<br><br>__0__ = Hidden<br>__1__ = Public
» submitted_by|[User Object](#schemauser_object)|Contains user data.
»» id|integer|Unique id of the user.
»» name_id|string|Path for the user on mod.io. For example: https://mod.io/members/__name-id-here__
»» username|string|Username of the user.
»» date_online|integer|Unix timestamp of date the user was last online.
»» avatar|[Avatar Object](#schemaavatar_object)|Contains avatar data.
»»» filename|string|Avatar filename including extension.
»»» original|string|URL to the full-sized avatar.
»»» thumb_50x50|string|URL to the small avatar thumbnail.
»»» thumb_100x100|string|URL to the medium avatar thumbnail.
»» timezone|string|This field is no longer used and will return an empty string.
»» language|string|This field is no longer used and will return an empty string. To [localize the API response](#localization) we recommend you set the `Accept-Language` header.
»» profile_url|string|URL to the user's mod.io profile.
» date_added|integer|Unix timestamp of date mod was registered.
» date_updated|integer|Unix timestamp of date mod was updated.
» date_live|integer|Unix timestamp of date mod was set live.
» maturity_option|integer|Maturity options flagged by the mod developer, this is only relevant if the parent game allows mods to be labelled as mature.<br><br>__0__ = None set _(default)_<br>__1__ = Alcohol<br>__2__ = Drugs<br>__4__ = Violence<br>__8__ = Explicit<br>__?__ = Add the options you want together, to enable multiple filters (see [BITWISE fields](#bitwise-and-bitwise-and))
» logo|[Logo Object](#schemalogo_object)|Contains logo data.
»» filename|string|Logo filename including extension.
»» original|string|URL to the full-sized logo.
»» thumb_320x180|string|URL to the small logo thumbnail.
»» thumb_640x360|string|URL to the medium logo thumbnail.
»» thumb_1280x720|string|URL to the large logo thumbnail.
» homepage_url|string|Official homepage of the mod.
» name|string|Name of the mod.
» name_id|string|Path for the mod on mod.io. For example: https://gamename.mod.io/__mod-name-id-here__
» summary|string|Summary of the mod.
» description|string|Detailed description of the mod which allows HTML.
» description_plaintext|string|`description` field converted into plaintext.
» metadata_blob|string|Metadata stored by the game developer. Metadata can also be stored as searchable [key value pairs](#metadata), and to individual [mod files](#get-modfiles).
» profile_url|string|URL to the mod's mod.io profile.
» media|[Mod Media Object](#schemamod_media_object)|Contains mod media data.
»» youtube|string[]|Array of YouTube links.
»» sketchfab|string[]|Array of SketchFab links.
»» images|[Image Object](#schemaimage_object)[]|Array of image objects (a gallery).
»»» filename|string|Image filename including extension.
»»» original|string|URL to the full-sized image.
»»» thumb_320x180|string|URL to the image thumbnail.
» modfile|[Modfile Object](#schemamodfile_object)|Contains modfile data.
»» id|integer|Unique modfile id.
»» mod_id|integer|Unique mod id.
»» date_added|integer|Unix timestamp of date file was added.
»» date_scanned|integer|Unix timestamp of date file was virus scanned.
»» virus_status|integer|Current virus scan status of the file. For newly added files that have yet to be scanned this field will change frequently until a scan is complete:<br><br>__0__ = Not scanned<br>__1__ = Scan complete<br>__2__ = In progress<br>__3__ = Too large to scan<br>__4__ = File not found<br>__5__ = Error Scanning
»» virus_positive|integer|Was a virus detected:<br><br>__0__ = No threats detected<br>__1__ = Flagged as malicious
»» virustotal_hash|string|VirusTotal proprietary hash to view the [scan results](https://www.virustotal.com).
»» filesize|integer|Size of the file in bytes.
»» filehash|[Filehash Object](#schemafilehash_object)|Contains filehash data.
»»» md5|string|MD5 hash of the file.
»» filename|string|Filename including extension.
»» version|string|Release version this file represents.
»» changelog|string|Changelog for the file.
»» metadata_blob|string|Metadata stored by the game developer for this file.
»» download|[Download Object](#schemadownload_object)|Contains download data.
»»» binary_url|string|URL to download the file from the mod.io CDN.<br><br>__NOTE:__ If the [game](#edit-game) requires mod downloads to be initiated via the API, the `binary_url` returned will contain a verification hash. This hash must be supplied to get the modfile, and will expire after a certain period of time. Saving and reusing the `binary_url` won't work in this situation given it's dynamic nature.
»»» date_expires|integer|Unix timestamp of when the `binary_url` will expire.
» stats|[Mod Stats Object](#schemamod_stats_object)|Contains stats data.
»» mod_id|integer|Unique mod id.
»» popularity_rank_position|integer|Current rank of the mod.
»» popularity_rank_total_mods|integer|Number of ranking spots the current rank is measured against.
»» downloads_total|integer|Number of total mod downloads.
»» subscribers_total|integer|Number of total users who have subscribed to the mod.
»» ratings_total|integer|Number of times this mod has been rated.
»» ratings_positive|integer|Number of positive ratings.
»» ratings_negative|integer|Number of negative ratings.
»» ratings_percentage_positive|integer|Number of positive ratings, divided by the total ratings to determine it’s percentage score.
»» ratings_weighted_aggregate|number|Overall rating of this item calculated using the [Wilson score confidence interval](https://www.evanmiller.org/how-not-to-sort-by-average-rating.html). This column is good to sort on, as it will order items based on number of ratings and will place items with many positive ratings above those with a higher score but fewer ratings.
»» ratings_display_text|string|Textual representation of the rating in format:<br><br>- Overwhelmingly Positive<br>- Very Positive<br>- Positive<br>- Mostly Positive<br>- Mixed<br>- Negative<br>- Mostly Negative<br>- Very Negative<br>- Overwhelmingly Negative<br>- Unrated
»» date_expires|integer|Unix timestamp until this mods's statistics are considered stale.
» metadata_kvp|[Metadata KVP Object](#schemametadata_kvp_object)[]|Contains key-value metadata.
»» metakey|string|The key of the key-value pair.
»» metavalue|string|The value of the key-value pair.
» tags|[Mod Tag Object](#schemamod_tag_object)[]|Contains mod tag data.
»» name|string|Tag name.
»» date_added|integer|Unix timestamp of date tag was applied.
result_count|integer|Number of results returned in this request.
result_offset|integer|Number of results skipped over. Defaults to 0 unless overridden by `_offset` filter.
result_limit|integer|Maximum number of results returned in the request. Defaults to 100 (max) unless overridden by `_limit` filter.
result_total|integer|Total number of results found.




## Get Team Members  

<a name="schemaget_team_members"></a>

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
          "filename": "modio-color-dark.png",
          "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
          "thumb_50x50": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
          "thumb_100x100": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
        },
        "timezone": "",
        "language": "",
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
  "result_count": 70,
  "result_offset": 0,
  "result_limit": 100,
  "result_total": 70
} 
```


### Properties

Name|Type|Description
---|---|---|---|
data|[Team Member Object](#schemateam_member_object)[]|Array containing team member objects.
» id|integer|Unique team member id.
» user|[User Object](#schemauser_object)|Contains user data.
»» id|integer|Unique id of the user.
»» name_id|string|Path for the user on mod.io. For example: https://mod.io/members/__name-id-here__
»» username|string|Username of the user.
»» date_online|integer|Unix timestamp of date the user was last online.
»» avatar|[Avatar Object](#schemaavatar_object)|Contains avatar data.
»»» filename|string|Avatar filename including extension.
»»» original|string|URL to the full-sized avatar.
»»» thumb_50x50|string|URL to the small avatar thumbnail.
»»» thumb_100x100|string|URL to the medium avatar thumbnail.
»» timezone|string|This field is no longer used and will return an empty string.
»» language|string|This field is no longer used and will return an empty string. To [localize the API response](#localization) we recommend you set the `Accept-Language` header.
»» profile_url|string|URL to the user's mod.io profile.
» level|integer|Level of permission the user has:<br><br>__1__ = Moderator (can moderate comments and content attached)<br>__4__ = Manager (moderator access, including uploading builds and editing settings except supply and team members)<br>__8__ = Administrator (full access, including editing the supply and team)
» date_added|integer|Unix timestamp of the date the user was added to the team.
» position|string|Custom title given to the user in this team.
result_count|integer|Number of results returned in this request.
result_offset|integer|Number of results skipped over. Defaults to 0 unless overridden by `_offset` filter.
result_limit|integer|Maximum number of results returned in the request. Defaults to 100 (max) unless overridden by `_limit` filter.
result_total|integer|Total number of results found.




## Get User Events  

<a name="schemaget_user_events"></a>

```json
{
  "data": [
    {
      "id": 13,
      "game_id": 7,
      "mod_id": 13,
      "user_id": 13,
      "date_added": 1499846132,
      "event_type": "USER_SUBSCRIBE"
    },
    {
        ...
    }
  ],
  "result_count": 70,
  "result_offset": 0,
  "result_limit": 100,
  "result_total": 70
} 
```


### Properties

Name|Type|Description
---|---|---|---|
data|[User Event Object](#schemauser_event_object)[]|Array containing user event objects.
» id|integer|Unique id of the event object.
» game_id|integer|Unique id of the parent game.
» mod_id|integer|Unique id of the parent mod.
» user_id|integer|Unique id of the user who performed the action.
» date_added|integer|Unix timestamp of date the event occurred.
» event_type|string|Type of event that was triggered. List of possible events: <br><br>- USER_TEAM_JOIN<br>- USER_TEAM_LEAVE<br>- USER_SUBSCRIBE<br>- USER_UNSUBSCRIBE
result_count|integer|Number of results returned in this request.
result_offset|integer|Number of results skipped over. Defaults to 0 unless overridden by `_offset` filter.
result_limit|integer|Maximum number of results returned in the request. Defaults to 100 (max) unless overridden by `_limit` filter.
result_total|integer|Total number of results found.




## Get User Ratings  

<a name="schemaget_user_ratings"></a>

```json
{
  "data": [
    {
      "game_id": 2,
      "mod_id": 2,
      "rating": -1,
      "date_added": 1492564103
    },
    {
        ...
    }
  ],
  "result_count": 70,
  "result_offset": 0,
  "result_limit": 100,
  "result_total": 70
} 
```


### Properties

Name|Type|Description
---|---|---|---|
data|[Rating Object](#schemarating_object)[]|Array containing rating objects.
» game_id|integer|Unique game id.
» mod_id|integer|Unique mod id.
» rating|integer|Mod rating value.<br><br>__1__ = Positive Rating<br>__-1__ = Negative Rating
» date_added|integer|Unix timestamp of date rating was submitted.
result_count|integer|Number of results returned in this request.
result_offset|integer|Number of results skipped over. Defaults to 0 unless overridden by `_offset` filter.
result_limit|integer|Maximum number of results returned in the request. Defaults to 100 (max) unless overridden by `_limit` filter.
result_total|integer|Total number of results found.




## Header Image Object  

<a name="schemaheader_image_object"></a>

```json
{
  "filename": "demo.png",
  "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
} 
```


### Properties

Name|Type|Description
---|---|---|---|
filename|string|Header image filename including extension.
original|string|URL to the full-sized header image.




## Icon Object

   <a name="schemaicon_object"></a>

```json
{
  "filename": "modio-color-dark.png",
  "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
  "thumb_64x64": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
  "thumb_128x128": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
  "thumb_256x256": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
} 
```


### Properties

Name|Type|Description
---|---|---|---|
filename|string|Icon filename including extension.
original|string|URL to the full-sized icon.
thumb_64x64|string|URL to the small icon thumbnail.
thumb_128x128|string|URL to the medium icon thumbnail.
thumb_256x256|string|URL to the large icon thumbnail.




## Image Object

   <a name="schemaimage_object"></a>

```json
{
  "filename": "modio-color-dark.png",
  "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
  "thumb_320x180": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
} 
```


### Properties

Name|Type|Description
---|---|---|---|
filename|string|Image filename including extension.
original|string|URL to the full-sized image.
thumb_320x180|string|URL to the image thumbnail.




## Key-Value Pair Object  

<a name="schemakey-value_pair_object"></a>

```json
{
  "key": "X-RateLimit-Remaining",
  "value": "98"
} 
```


### Properties

Name|Type|Description
---|---|---|---|
key|string|Key of the key-value pair.
value|string|Value of the key-value pair. Will always be a string, even if numeric.




## Logo Object

   <a name="schemalogo_object"></a>

```json
{
  "filename": "modio-color-dark.png",
  "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
  "thumb_320x180": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
  "thumb_640x360": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
  "thumb_1280x720": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
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
code|integer|[HTTP status code](#response-codes) of response.
message|string|The server response to your request. Responses will vary depending on the endpoint, but the object structure will persist.




## Metadata KVP Object  

<a name="schemametadata_kvp_object"></a>

```json
{
  "metakey": "pistol-dmg",
  "metavalue": "800"
} 
```


### Properties

Name|Type|Description
---|---|---|---|
metakey|string|The key of the key-value pair.
metavalue|string|The value of the key-value pair.




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
mod_id|integer|Unique id of the mod that is the dependency.
date_added|integer|Unix timestamp of date the dependency was added.




## Mod Event Object  

<a name="schemamod_event_object"></a>

```json
{
  "id": 13,
  "mod_id": 13,
  "user_id": 13,
  "date_added": 1499846132,
  "event_type": "MODFILE_CHANGED"
} 
```


### Properties

Name|Type|Description
---|---|---|---|
id|integer|Unique id of the event object.
mod_id|integer|Unique id of the parent mod.
user_id|integer|Unique id of the user who performed the action.
date_added|integer|Unix timestamp of date the event occurred.
event_type|string|Type of event that was triggered. List of possible events: <br><br>- MODFILE_CHANGED<br>- MOD_AVAILABLE<br>- MOD_UNAVAILABLE<br>- MOD_EDITED<br>- MOD_DELETED<br>- MOD_TEAM_CHANGED




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
      "filename": "modio-color-dark.png",
      "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
      "thumb_320x180": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
    }
  ]
} 
```


### Properties

Name|Type|Description
---|---|---|---|
youtube|string[]|Array of YouTube links.
sketchfab|string[]|Array of SketchFab links.
images|[Image Object](#schemaimage_object)[]|Array of image objects (a gallery).
» filename|string|Image filename including extension.
» original|string|URL to the full-sized image.
» thumb_320x180|string|URL to the image thumbnail.




## Mod Object

   <a name="schemamod_object"></a>

```json
{
  "id": 2,
  "game_id": 2,
  "status": 1,
  "visible": 1,
  "submitted_by": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "date_online": 1509922961,
    "avatar": {
      "filename": "modio-color-dark.png",
      "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
      "thumb_50x50": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
      "thumb_100x100": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
    },
    "timezone": "",
    "language": "",
    "profile_url": "https://mod.io/members/xant"
  },
  "date_added": 1492564103,
  "date_updated": 1499841487,
  "date_live": 1499841403,
  "maturity_option": 0,
  "logo": {
    "filename": "modio-color-dark.png",
    "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
    "thumb_320x180": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
    "thumb_640x360": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
    "thumb_1280x720": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
  },
  "homepage_url": "https://www.rogue-hdpack.com/",
  "name": "Rogue Knight HD Pack",
  "name_id": "rogue-knight-hd-pack",
  "summary": "It's time to bask in the glory of beautiful 4k textures!",
  "description": "<p>Rogue HD Pack does exactly what you thi...",
  "description_plaintext": "Rogue HD Pack does exactly what you thi...",
  "metadata_blob": "rogue,hd,high-res,4k,hd textures",
  "profile_url": "https://rogue-knight.mod.io/rogue-knight-hd-pack",
  "media": {
    "youtube": [
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    ],
    "sketchfab": [
      "https://sketchfab.com/models/ef40b2d300334d009984c8865b2db1c8"
    ],
    "images": [
      {
        "filename": "modio-color-dark.png",
        "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
        "thumb_320x180": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
      }
    ]
  },
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
    "metadata_blob": "rogue,hd,high-res,4k,hd textures",
    "download": {
      "binary_url": "https://mod.io/mods/file/1/c489a0354111a4d76640d47f0cdcb294",
      "date_expires": 1579316848
    }
  },
  "metadata_kvp": [
    {
      "metakey": "pistol-dmg",
      "metavalue": "800"
    }
  ],
  "tags": [
    {
      "name": "Unity",
      "date_added": 1499841487
    }
  ],
  "stats": {
    "mod_id": 2,
    "popularity_rank_position": 13,
    "popularity_rank_total_mods": 204,
    "downloads_total": 27492,
    "subscribers_total": 16394,
    "ratings_total": 1230,
    "ratings_positive": 1047,
    "ratings_negative": 183,
    "ratings_percentage_positive": 91,
    "ratings_weighted_aggregate": 87.38,
    "ratings_display_text": "Very Positive",
    "date_expires": 1492564103
  }
} 
```


### Properties

Name|Type|Description
---|---|---|---|
id|integer|Unique mod id.
game_id|integer|Unique game id.
status|integer|Status of the mod (see [status and visibility](#status-amp-visibility) for details):<br><br>__0__ = Not Accepted<br>__1__ = Accepted<br>__3__ = Deleted
visible|integer|Visibility of the mod (see [status and visibility](#status-amp-visibility) for details):<br><br>__0__ = Hidden<br>__1__ = Public
submitted_by|[User Object](#schemauser_object)|Contains user data.
» id|integer|Unique id of the user.
» name_id|string|Path for the user on mod.io. For example: https://mod.io/members/__name-id-here__
» username|string|Username of the user.
» date_online|integer|Unix timestamp of date the user was last online.
» avatar|[Avatar Object](#schemaavatar_object)|Contains avatar data.
»» filename|string|Avatar filename including extension.
»» original|string|URL to the full-sized avatar.
»» thumb_50x50|string|URL to the small avatar thumbnail.
»» thumb_100x100|string|URL to the medium avatar thumbnail.
» timezone|string|This field is no longer used and will return an empty string.
» language|string|This field is no longer used and will return an empty string. To [localize the API response](#localization) we recommend you set the `Accept-Language` header.
» profile_url|string|URL to the user's mod.io profile.
date_added|integer|Unix timestamp of date mod was registered.
date_updated|integer|Unix timestamp of date mod was updated.
date_live|integer|Unix timestamp of date mod was set live.
maturity_option|integer|Maturity options flagged by the mod developer, this is only relevant if the parent game allows mods to be labelled as mature.<br><br>__0__ = None set _(default)_<br>__1__ = Alcohol<br>__2__ = Drugs<br>__4__ = Violence<br>__8__ = Explicit<br>__?__ = Add the options you want together, to enable multiple filters (see [BITWISE fields](#bitwise-and-bitwise-and))
logo|[Logo Object](#schemalogo_object)|Contains logo data.
» filename|string|Logo filename including extension.
» original|string|URL to the full-sized logo.
» thumb_320x180|string|URL to the small logo thumbnail.
» thumb_640x360|string|URL to the medium logo thumbnail.
» thumb_1280x720|string|URL to the large logo thumbnail.
homepage_url|string|Official homepage of the mod.
name|string|Name of the mod.
name_id|string|Path for the mod on mod.io. For example: https://gamename.mod.io/__mod-name-id-here__
summary|string|Summary of the mod.
description|string|Detailed description of the mod which allows HTML.
description_plaintext|string|`description` field converted into plaintext.
metadata_blob|string|Metadata stored by the game developer. Metadata can also be stored as searchable [key value pairs](#metadata), and to individual [mod files](#get-modfiles).
profile_url|string|URL to the mod's mod.io profile.
media|[Mod Media Object](#schemamod_media_object)|Contains mod media data.
» youtube|string[]|Array of YouTube links.
» sketchfab|string[]|Array of SketchFab links.
» images|[Image Object](#schemaimage_object)[]|Array of image objects (a gallery).
»» filename|string|Image filename including extension.
»» original|string|URL to the full-sized image.
»» thumb_320x180|string|URL to the image thumbnail.
modfile|[Modfile Object](#schemamodfile_object)|Contains modfile data.
» id|integer|Unique modfile id.
» mod_id|integer|Unique mod id.
» date_added|integer|Unix timestamp of date file was added.
» date_scanned|integer|Unix timestamp of date file was virus scanned.
» virus_status|integer|Current virus scan status of the file. For newly added files that have yet to be scanned this field will change frequently until a scan is complete:<br><br>__0__ = Not scanned<br>__1__ = Scan complete<br>__2__ = In progress<br>__3__ = Too large to scan<br>__4__ = File not found<br>__5__ = Error Scanning
» virus_positive|integer|Was a virus detected:<br><br>__0__ = No threats detected<br>__1__ = Flagged as malicious
» virustotal_hash|string|VirusTotal proprietary hash to view the [scan results](https://www.virustotal.com).
» filesize|integer|Size of the file in bytes.
» filehash|[Filehash Object](#schemafilehash_object)|Contains filehash data.
»» md5|string|MD5 hash of the file.
» filename|string|Filename including extension.
» version|string|Release version this file represents.
» changelog|string|Changelog for the file.
» metadata_blob|string|Metadata stored by the game developer for this file.
» download|[Download Object](#schemadownload_object)|Contains download data.
»» binary_url|string|URL to download the file from the mod.io CDN.<br><br>__NOTE:__ If the [game](#edit-game) requires mod downloads to be initiated via the API, the `binary_url` returned will contain a verification hash. This hash must be supplied to get the modfile, and will expire after a certain period of time. Saving and reusing the `binary_url` won't work in this situation given it's dynamic nature.
»» date_expires|integer|Unix timestamp of when the `binary_url` will expire.
stats|[Mod Stats Object](#schemamod_stats_object)|Contains stats data.
» mod_id|integer|Unique mod id.
» popularity_rank_position|integer|Current rank of the mod.
» popularity_rank_total_mods|integer|Number of ranking spots the current rank is measured against.
» downloads_total|integer|Number of total mod downloads.
» subscribers_total|integer|Number of total users who have subscribed to the mod.
» ratings_total|integer|Number of times this mod has been rated.
» ratings_positive|integer|Number of positive ratings.
» ratings_negative|integer|Number of negative ratings.
» ratings_percentage_positive|integer|Number of positive ratings, divided by the total ratings to determine it’s percentage score.
» ratings_weighted_aggregate|number|Overall rating of this item calculated using the [Wilson score confidence interval](https://www.evanmiller.org/how-not-to-sort-by-average-rating.html). This column is good to sort on, as it will order items based on number of ratings and will place items with many positive ratings above those with a higher score but fewer ratings.
» ratings_display_text|string|Textual representation of the rating in format:<br><br>- Overwhelmingly Positive<br>- Very Positive<br>- Positive<br>- Mostly Positive<br>- Mixed<br>- Negative<br>- Mostly Negative<br>- Very Negative<br>- Overwhelmingly Negative<br>- Unrated
» date_expires|integer|Unix timestamp until this mods's statistics are considered stale.
metadata_kvp|[Metadata KVP Object](#schemametadata_kvp_object)[]|Contains key-value metadata.
» metakey|string|The key of the key-value pair.
» metavalue|string|The value of the key-value pair.
tags|[Mod Tag Object](#schemamod_tag_object)[]|Contains mod tag data.
» name|string|Tag name.
» date_added|integer|Unix timestamp of date tag was applied.




## Mod Stats Object  

<a name="schemamod_stats_object"></a>

```json
{
  "mod_id": 2,
  "popularity_rank_position": 13,
  "popularity_rank_total_mods": 204,
  "downloads_total": 27492,
  "subscribers_total": 16394,
  "ratings_total": 1230,
  "ratings_positive": 1047,
  "ratings_negative": 183,
  "ratings_percentage_positive": 91,
  "ratings_weighted_aggregate": 87.38,
  "ratings_display_text": "Very Positive",
  "date_expires": 1492564103
} 
```


### Properties

Name|Type|Description
---|---|---|---|
mod_id|integer|Unique mod id.
popularity_rank_position|integer|Current rank of the mod.
popularity_rank_total_mods|integer|Number of ranking spots the current rank is measured against.
downloads_total|integer|Number of total mod downloads.
subscribers_total|integer|Number of total users who have subscribed to the mod.
ratings_total|integer|Number of times this mod has been rated.
ratings_positive|integer|Number of positive ratings.
ratings_negative|integer|Number of negative ratings.
ratings_percentage_positive|integer|Number of positive ratings, divided by the total ratings to determine it’s percentage score.
ratings_weighted_aggregate|number|Overall rating of this item calculated using the [Wilson score confidence interval](https://www.evanmiller.org/how-not-to-sort-by-average-rating.html). This column is good to sort on, as it will order items based on number of ratings and will place items with many positive ratings above those with a higher score but fewer ratings.
ratings_display_text|string|Textual representation of the rating in format:<br><br>- Overwhelmingly Positive<br>- Very Positive<br>- Positive<br>- Mostly Positive<br>- Mixed<br>- Negative<br>- Mostly Negative<br>- Very Negative<br>- Overwhelmingly Negative<br>- Unrated
date_expires|integer|Unix timestamp until this mods's statistics are considered stale.




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
date_added|integer|Unix timestamp of date tag was applied.




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
  "metadata_blob": "rogue,hd,high-res,4k,hd textures",
  "download": {
    "binary_url": "https://mod.io/mods/file/1/c489a0354111a4d76640d47f0cdcb294",
    "date_expires": 1579316848
  }
} 
```


### Properties

Name|Type|Description
---|---|---|---|
id|integer|Unique modfile id.
mod_id|integer|Unique mod id.
date_added|integer|Unix timestamp of date file was added.
date_scanned|integer|Unix timestamp of date file was virus scanned.
virus_status|integer|Current virus scan status of the file. For newly added files that have yet to be scanned this field will change frequently until a scan is complete:<br><br>__0__ = Not scanned<br>__1__ = Scan complete<br>__2__ = In progress<br>__3__ = Too large to scan<br>__4__ = File not found<br>__5__ = Error Scanning
virus_positive|integer|Was a virus detected:<br><br>__0__ = No threats detected<br>__1__ = Flagged as malicious
virustotal_hash|string|VirusTotal proprietary hash to view the [scan results](https://www.virustotal.com).
filesize|integer|Size of the file in bytes.
filehash|[Filehash Object](#schemafilehash_object)|Contains filehash data.
» md5|string|MD5 hash of the file.
filename|string|Filename including extension.
version|string|Release version this file represents.
changelog|string|Changelog for the file.
metadata_blob|string|Metadata stored by the game developer for this file.
download|[Download Object](#schemadownload_object)|Contains download data.
» binary_url|string|URL to download the file from the mod.io CDN.<br><br>__NOTE:__ If the [game](#edit-game) requires mod downloads to be initiated via the API, the `binary_url` returned will contain a verification hash. This hash must be supplied to get the modfile, and will expire after a certain period of time. Saving and reusing the `binary_url` won't work in this situation given it's dynamic nature.
» date_expires|integer|Unix timestamp of when the `binary_url` will expire.




## Rating Object

   <a name="schemarating_object"></a>

```json
{
  "game_id": 2,
  "mod_id": 2,
  "rating": -1,
  "date_added": 1492564103
} 
```


### Properties

Name|Type|Description
---|---|---|---|
game_id|integer|Unique game id.
mod_id|integer|Unique mod id.
rating|integer|Mod rating value.<br><br>__1__ = Positive Rating<br>__-1__ = Negative Rating
date_added|integer|Unix timestamp of date rating was submitted.




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
      "filename": "modio-color-dark.png",
      "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
      "thumb_50x50": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
      "thumb_100x100": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
    },
    "timezone": "",
    "language": "",
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
id|integer|Unique team member id.
user|[User Object](#schemauser_object)|Contains user data.
» id|integer|Unique id of the user.
» name_id|string|Path for the user on mod.io. For example: https://mod.io/members/__name-id-here__
» username|string|Username of the user.
» date_online|integer|Unix timestamp of date the user was last online.
» avatar|[Avatar Object](#schemaavatar_object)|Contains avatar data.
»» filename|string|Avatar filename including extension.
»» original|string|URL to the full-sized avatar.
»» thumb_50x50|string|URL to the small avatar thumbnail.
»» thumb_100x100|string|URL to the medium avatar thumbnail.
» timezone|string|This field is no longer used and will return an empty string.
» language|string|This field is no longer used and will return an empty string. To [localize the API response](#localization) we recommend you set the `Accept-Language` header.
» profile_url|string|URL to the user's mod.io profile.
level|integer|Level of permission the user has:<br><br>__1__ = Moderator (can moderate comments and content attached)<br>__4__ = Manager (moderator access, including uploading builds and editing settings except supply and team members)<br>__8__ = Administrator (full access, including editing the supply and team)
date_added|integer|Unix timestamp of the date the user was added to the team.
position|string|Custom title given to the user in this team.




## User Event Object  

<a name="schemauser_event_object"></a>

```json
{
  "id": 13,
  "game_id": 7,
  "mod_id": 13,
  "user_id": 13,
  "date_added": 1499846132,
  "event_type": "USER_SUBSCRIBE"
} 
```


### Properties

Name|Type|Description
---|---|---|---|
id|integer|Unique id of the event object.
game_id|integer|Unique id of the parent game.
mod_id|integer|Unique id of the parent mod.
user_id|integer|Unique id of the user who performed the action.
date_added|integer|Unix timestamp of date the event occurred.
event_type|string|Type of event that was triggered. List of possible events: <br><br>- USER_TEAM_JOIN<br>- USER_TEAM_LEAVE<br>- USER_SUBSCRIBE<br>- USER_UNSUBSCRIBE




## User Object

   <a name="schemauser_object"></a>

```json
{
  "id": 1,
  "name_id": "xant",
  "username": "XanT",
  "date_online": 1509922961,
  "avatar": {
    "filename": "modio-color-dark.png",
    "original": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
    "thumb_50x50": "https://static.mod.io/v1/images/branding/modio-color-dark.png",
    "thumb_100x100": "https://static.mod.io/v1/images/branding/modio-color-dark.png"
  },
  "timezone": "",
  "language": "",
  "profile_url": "https://mod.io/members/xant"
} 
```


### Properties

Name|Type|Description
---|---|---|---|
id|integer|Unique id of the user.
name_id|string|Path for the user on mod.io. For example: https://mod.io/members/__name-id-here__
username|string|Username of the user.
date_online|integer|Unix timestamp of date the user was last online.
avatar|[Avatar Object](#schemaavatar_object)|Contains avatar data.
» filename|string|Avatar filename including extension.
» original|string|URL to the full-sized avatar.
» thumb_50x50|string|URL to the small avatar thumbnail.
» thumb_100x100|string|URL to the medium avatar thumbnail.
timezone|string|This field is no longer used and will return an empty string.
language|string|This field is no longer used and will return an empty string. To [localize the API response](#localization) we recommend you set the `Accept-Language` header.
profile_url|string|URL to the user's mod.io profile.




