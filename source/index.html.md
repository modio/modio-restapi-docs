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
  - <a href="https://mod.io">Find out more about mod.io</a>
includes: []
search: true
highlight_theme: darkula
headingLevel: '2'
---

# Getting Started



## mod.io API v1

Welcome to the official documentation for [mod.io](https://mod.io), an API for developers to add mod support to their games. Using our [SDKs and plugins](#implementation) for popular and custom game engines, getting your creator community started and making the mods they create discoverable and installable via your in-game menu is straight forward, with full cross-platform support. If you are a game developer, you can manage your games and API access via your [mod.io content dashboard](https://mod.io/content). If you are a user creating tools and apps, you can request API access via your [mod.io account](https://mod.io/me/access).

__API path:__ [https://*.modapi.io/v1](https://*.modapi.io/v1) (see your API access dashboard)

__Current version:__ <select id="version_dropdown" onChange="changeVersion"><option value="" data-latest="true">v1 (latest)</option></select> 

<a href="changelog/"><span class="versionwrap">View Version Changelog</span></a>

## How It Works

Compatible with all builds of your game on all platforms and stores, mod.io is a clientless and standalone solution which gives you complete control over your modding ecosystem.

![mod.io Overview](images/sdk.png)

## Implementation

Once you have added your game to mod.io and got your [game ID and API key](https://mod.io/content), you can start integrating the mod.io REST API into your game, tools and sites. There are 3 options to get connected which you can use interchangeably depending on your needs. Here's the breakdown of each option.

Option | Usage | Suited for | Docs
---------- | ---------- | ---------- | ---------
__API__ | For connecting directly to the mod.io REST API. | Web apps that need a JSON REST API, or game developers that like a challenge and want control over their implementation. | You are reading them
__SDK__ | Drop our [open source C/C++ SDK](https://github.com/modio/modio-sdk) into your game to call mod.io functionality. | Developers that want a SDK that abstracts the uploading, downloading and unzip flows behind easy to use function calls. | [Here](https://docs.mod.io/cppsdkref/)
__Tools/Plugins__ | Use tools, plugins and wrappers created by the community to make implementation in various engines easy. | Game developers that want a pre-built modding solution for their engine (Unity, Unreal, GameMaker, Construct) of choice. | Available below

### Official Tools

Plugins and wrappers made or supported by the mod.io team

 | - | - | -
--- | --- | --- | ---
![Unity Plugin](images/tool-unity.png) | __Unity Plugin__<br />[SDK](https://github.com/modio/modio-unity)<br />[Getting Started](https://docs.mod.io/unityref/)<br />[Sample Project](https://github.com/modio/modio-unity-sample)<br /> | ![Unreal Plugin](images/tool-unreal.png) | __Unreal Plugin__<br />[SDK](https://github.com/modio/modio-ue)<br />[Getting Started](https://docs.mod.io/unrealref/)<br />[UE4 Sample Project](https://github.com/modio/modio-ue4-sample)<br />[UE5 Sample Project](https://github.com/modio/modio-ue5-sample)<br />
![GameMaker](images/tool-gm.png) | __GameMaker__<br />[SDK](https://github.com/YoYoGames/GMEXT-mod.io)<br />[Getting Started](https://github.com/YoYoGames/GMEXT-mod.io/wiki)<br /> | ![C/C++ SDK](images/tool-ccpp.png) | __C/C++ SDK__<br />[SDK](https://github.com/modio/modio-sdk)<br />[Getting Started](https://docs.mod.io/cppsdkref/)<br />
![Discord Bot](images/tool-discordbot.png) | __Discord Bot__<br />[Instructions](https://github.com/modio/modio-discord-bot)<br />[Invite](https://discordbot.mod.io)<br /> | 

### Community Tools

Plugins and wrappers made by our awesome community. Is there a tool out there that should be added to the list? [Get in touch!](mailto:developers@mod.io?subject=Publish Tool)

 | - | - | -
--- | --- | --- | ---
![Construct 2](images/tool-c2.png) | __Construct 2 Plugin__<br />[SDK](https://github.com/modio/modio-construct2)<br />[Getting Started](https://github.com/modio/modio-construct2)<br /> | ![Haxe Wrapper](images/tool-haxe.png) | __Haxe Wrapper__<br />[SDK](https://github.com/modio/modio-haxe)<br />[Getting Started](https://github.com/Turupawn/modioOpenFLExample#openfl-integration)<br />
![Modio.NET](images/tool-dotnet.png) | __Modio.NET__<br />[SDK](https://github.com/nickelc/modio.net)<br />[Getting Started](https://github.com/nickelc/modio.net)<br /> | ![Rust Wrapper](images/tool-rust.png) | __Rust Wrapper__<br />[SDK](https://crates.io/crates/modio)<br />[Getting Started](https://github.com/nickelc/modio-rs)<br />[Tutorials](https://github.com/nickelc/modio-rs/tree/master/examples)<br />
![Python Wrapper](images/tool-python.png) | __Python Wrapper__<br />[SDK](https://github.com/ClementJ18/mod.io)<br />[Getting Started](https://github.com/ClementJ18/mod.io/#example)<br />[Tutorials](https://github.com/ClementJ18/mod.io/tree/master/examples)<br /> | ![Command Lisp](images/tool-commonlisp.png) | __Common Lisp__<br />[Github](https://github.com/Shinmera/cl-modio)<br />[Getting Started](https://shinmera.github.io/cl-modio/)<br />
![Command Line Tool](images/tool-cmd.png) | __Command Line Tool__<br />[CMD](https://github.com/nickelc/modiom)<br />[Getting Started](https://github.com/nickelc/modiom)<br /> | ![GitHub Action Mod Uploader](images/tool-actions.png) | __GitHub Action Mod Uploader__<br />[GitHub](https://github.com/nickelc/upload-to-modio)<br />[Usage](https://github.com/nickelc/upload-to-modio#usage)<br />

Here is a brief list of the things to know about our API, as explained in more detail in the following sections.

- All requests to the API must be made over HTTPS (TLS).
- All API responses are in `application/json` format.
- Any POST request with a binary payload must supply the `Content-Type: multipart/form-data` header.
- Any non-binary POST, PUT and DELETE requests must supply the `Content-Type: application/x-www-form-urlencoded` header.
- Any non-binary payload can be supplied in JSON format using the `input_json` parameter. 

## Authentication

Authentication can be done via 5 ways:

- Use an [API key](https://mod.io/me/access) for **Read-only** access
- Use the [Email Authentication Flow](#email) for **Read and Write** access (it creates an OAuth 2 Access Token via **email**)
- Use the [Platform Authentication Flow](#steam) for **Read and Write** access (it creates an OAuth 2 Access Token automatically on popular platforms such as **Steam and Xbox**)
- Use the [OpenID Authentication Flow](#openid) for **Read and Write** access (it creates an OAuth 2 Access Token automatically using your identity provider for SSO)
- Manually create an [OAuth 2 Access Token](https://mod.io/me/access) for **Read and Write** access

All users and games are issued an API key which must be included when querying the API. It is quick and easy to use but limited to read-only GET requests, due to the limited security it offers. If you want players to be able to add, edit, rate and subscribe to content, you will need to use an authentication method that generates an OAuth 2 Access token. These [authentication methods](#authentication-2) are explained in detail here.

Authentication Type | In | HTTP Methods | Abilities | Purpose
---------- | ---------- | ---------- | ---------- | ---------- 
API Key | Query | GET | Read-only GET requests and authentication flows. | Browsing and downloading content. Retrieving access tokens on behalf of users.
Access Token (OAuth 2) | Header | GET, POST, PUT, DELETE | Read, create, update, delete. | View, add, edit and delete content the authenticated user has subscribed to or has permission to change.

You can use an OAuth 2.0 bearer token instead of an API key for GET endpoints (excluding [Authentication](#authentication-2) endpoints). But remember, if you provide both an Access Token (OAuth 2) and an API key in one request, the access token takes precedence and the API key is ignored. So, always ensure you use a valid access token and have the process in place to get a new token when the old one expires.

### Web Overlay Authentication

At the moment it is not possible to open the mod.io website in-game with the user pre-authenticated, however you can provide a hint by appending `?portal=PORTAL` to the end of the URL. What this tells mod.io, is that when the user attempts to perform an action that requires authentication, they will be prompted to login with their `PORTAL` account. For example if you want to take a mod creator to their mod webpage in-game on Steam, the URL would look something like: `https://mod.io/g/gamename/m/modname?portal=steam`. You can optionally add `&login=auto` as well to automatically start the login process. [Supported portals](#targeting-a-portal) can be found here.

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
curl -X get https://*.modapi.io/v1/games?api_key=xxxxxxxxxxxxxxxx
``` 

To authenticate using your unique 32-character API key, append the `api_key=xxxxxxxxxxxxxxxx` parameter to the end of your request. Remember that using an API key means requests are read-only, if you want to create, update or delete resources - authentication via OAuth 2 is required which you can [set up with your api key](#authentication).

### Using an Access Token

> Example POST request with no binary files

```shell
curl -X POST https://*.modapi.io/v1/games/1/mods/1/tags \
  -H 'Authorization: Bearer your-token-here' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'tags[]=Unity' \
  -d 'tags[]=FPS'
```

To authenticate using an OAuth 2 access token, you must include the HTTP header `Authorization` in your request with the value Bearer *your-token-here*. Verification via Access Token allows much greater power including creating, updating and deleting resources that you have access to. Also because OAuth 2 access tokens are tied to a user account, you can personalize the output by viewing content they are subscribed and connected to via the [me endpoint](#me) and by using relevant filters.

### Access Token Lifetime & Expiry

By default, all access token's are long-lived - meaning they are valid for a common year (not leap year) from the date of issue. You should architect your application to smoothly handle the event in which a token expires or is revoked by the user themselves or a mod.io admin, triggering a `401 Unauthorized` API response.

If you would like tokens issued through your game to have a shorter lifespan, you can do this by providing the `date_expires` parameter on any endpoint that returns an access token such as the [Email Exchange](#email) or [Authenticate via Steam](#steam) endpoints. If the parameter is not supplied, it will default to 1 year from the request date, if the supplied parameter value is above one year or below the current server time it will be ignored and the default value restored.

### Request Content-Type

If you are making a request that includes a file, your request `Content-Type` header __must__ be `multipart/form-data`, otherwise if the request contains data (but no files) it should be `application/x-www-form-urlencoded`, which is UTF-8 encoded. 

> Example POST request with binary file

```shell
curl -X POST https://*.modapi.io/v1/games/1/mods \
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

> Example json-encoded POST request

```shell
curl -X POST https://*.modapi.io/v1/games/1/mods/1/team \
  -H 'Authorization: Bearer your-token-here' \
  -H 'Content-Type: application/x-www-form-urlencoded' \  
  -d 'input_json={
		"email": "developers@mod.io",
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
`409` | Conflict -- The request could not be completed due to a competing request (duplicate POST requests).
`422` | Unprocessable Entity -- The request was well formed but unable to be followed due to semantic errors.
`429` | Too Many Requests -- You have made too [many requests](#rate-limiting), inspect headers for reset time.
`500` | Internal Server Error -- The server encountered a problem processing your request. Please try again. (rare)
`503` | Service Unavailable -- We're temporarily offline for maintenance. Please try again later. (rare)


## Errors

> Error object

```json
"error": {
	"code": 403,
	"error_ref": 15024,
	"message": "You do not have the required permissions to access this resource."
}
```

If an error occurs, mod.io returns an error object with the HTTP `code`, `error_ref` and `message` to describe what happened and when possible how to avoid repeating the error. It's important to know that if you encounter errors that are not server errors (`500`+ codes) - you should review the error message before continuing to send requests to the endpoint.

When requests contain invalid input data or query parameters (for filtering), an optional field object called `errors` can be supplied inside the `error` object, which contains a list of the invalid inputs. The nested `errors` object is only supplied with `422 Unprocessable Entity` responses. Be sure to review the [Response Codes](#response-codes) to be aware of the HTTP codes that the mod.io API returns.

> Error object with input errors

```json
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

> Example request with malformed api_key 

```shell
curl -X GET https://*.modapi.io/v1/games?api_key=malformed_key
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
`10000` | mod.io is currently experiencing an outage. (rare)
`10001` | Cross-origin request forbidden.
`10002` | mod.io failed to complete the request, please try again. (rare)
`10003` | API version supplied is invalid.
`11000` | api_key is missing from your request.
`11001` | api_key supplied is malformed.
`11002` | api_key supplied is invalid.
`11003` | Access token is missing the write scope to perform the request.
`11004` | Access token is missing the read scope to perform the request.
`11005` | Access token is expired, or has been revoked.
`11006` | Authenticated user account has been deleted.
`11007` | Authenticated user account has been banned by mod.io admins.
`11008` | You have been ratelimited globally for making too many requests. See [Rate Limiting](#rate-limiting).
`11009` | You have been ratelimited from calling this endpoint again, for making too many requests. See [Rate Limiting](#rate-limiting).
`13001` | The submitted binary file is corrupted.
`13002` | The submitted binary file is unreadable.
`13004` | You have used the `input_json` parameter with semantically incorrect JSON.
`13005` | The Content-Type header is missing from your request.
`13006` | The Content-Type header is not supported for this endpoint.
`13007` | You have requested a response format that is not supported (JSON only).
`13009` | The request contains validation errors for the data supplied. See the attached `errors` field within the [Error Object](#error-object) to determine which input failed.
`14000` | The requested resource does not exist.
`14001` | The requested game could not be found.
`14006` | The requested game has been deleted.
`15010` | The requested modfile could not be found.
`15022` | The requested mod could not be found.
`15023` | The requested mod has been deleted.
`15026` | The requested comment could not be found.
`17000` | The requested user could not be found.

## Response Formats

> Single object response

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
    "metadata_blob": "rogue,hd,high-res,4k,hd-textures",
    "download": {
      "binary_url": "https://*.modapi.io/v1/games/1/mods/1/files/1/download",
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

> Multiple objects response

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
    		"metadata_blob": "rogue,hd,high-res,4k,hd-textures",
    		"download": {
    		  "binary_url": "https://*.modapi.io/v1/games/1/mods/1/files/1/download/c489a0354111a4d76640d47f0cdcb294",
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

> Valid status & visibility filters

```
status=1
status-in=0,1
visible=1 
visible-in=0,1
```

> Game Admin Only status & visibility filters

```
status-not-in=1,2
status-gt=1
visible-not-in=1
visible-st=1
```

### Important Note When Filtering

Due to the requirement of certain `status` & `visible` values only being available to administrators. We have restricted the amount of [filters](#filtering) available for _non-game admins_ and thus for both of these fields _only_ direct matches __=__ and __-in__ are permitted. Attempting to apply game admin filters without the required permissions will result in a `403 Forbidden` [error response](#error-object).

## Pagination

When requesting data from endpoints that contain more than one object, you can supply an `_offset` and `_limit` to paginate through the results. Think of it as a page 1, 2, 3... system but you control the number of results per page, and the page to start from. Appended to each response will be the pagination metadata:

> Metadata example

```json
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

### or fields    (Filter grouping)

By default, multiple filters are combined using an "AND" operation. However, with or_fields, you can group filters together to be combined using an "OR" operation.

For example, if you want to find all mods that have been tagged with "Level" but also include mods made by the creator "UltimateModder", you can achieve this with the following query parameters:

```
v1/games/your-game/mods?tags=level&submitted_by_display_name=UltimateModder&or_fields[]=tags,submitted_by_display_name
```

This would be interpreted as "Fetch all mods where (tags in level **OR** submitted_by like UltimateModder)". Without the `or_fields` parameter, it would be treated as AND.

A few things to note:

* The `or_fields` parameter must be provided as an array.
* A maximum of 2 `or_fields` can be present in a query at any time.
* A maximum of 3 fields per `or_fields`.

### _q (Full text search)

```
v1/games?_q=Gravity Bounce
```

Full-text search is a lenient search filter that _is only available_ if the endpoint you are querying contains a `name` column. Wildcards should _not_ be applied to this filter as they are ignored.

- `?_q=Gravity Bounce` - This will return every result where the `name` column contains any of the following words: 'Gravity', 'Bounce'. 

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

> Example response (assuming a validation error occurred)

```json
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
`id` | Indonesian
`it` | Italian
`pl` | Polish
`pt` | Portuguese
`hu` | Hungarian
`ja` | Japanese
`ko` | Korean
`ru` | Russian
`es` | Spanish (Spain)
`es-419` | Spanish (Latin America)
`th` | Thai
`tr` | Turkish
`uk` | Ukrainian
`zh-CN` | Chinese (Simplified)
`zh-TW` | Chinese (Traditional)

> Example request updating specified fields with Polish translations.

```shell
curl -X POST https://*.modapi.io/v1/games/1/mods/1 \
	-H 'Authorization: Bearer your-token-here' \
	-H 'Content-Type: application/x-www-form-urlencoded' \
	-H 'Content-Language: pl' \
	-d 'name=Zaawansowany rozkwit Wiedźmina' \
	-d 'summary=Zobacz zaawansowany mod oświetlenia w Kaer Morhen w zupełnie nowym świetle' 
```

> Attempt to retrieve Polish translations within supported fields.

```shall
curl -X GET https://*.modapi.io/v1/games/1/mods/1 \
	-H 'Authorization: Bearer your-token-here' \
	-H 'Accept-Language: pl'
```

__NOTE__: Localization for mod.io is currently a work-in-progress and thus not all responses may be in the desired language.

> Response

```json
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

mod.io implements rate limiting to stop users abusing the service. Exceeding the rate limit will result in requests receiving a `429 Too Many Requests` response until the reset time is reached. 

It is _highly recommended_ you architect your app to check for the `429 Too Many Requests` HTTP response code, and ensure you do not continue to make requests until the duration specified in the `retry-after` header (in seconds) passes. Be aware we enforce global rate limits which will result in all requests being blocked (error ref **11008**). We also enforce per-endpoint rate limits which will only result in requests to that endpoint being blocked (error ref **11009**) until the duration specified in the `retry-after` header (in seconds) passes, allowing you to continue to call other endpoints. Users who continue to send requests despite a `429` response could potentially have their credentials revoked. The following limits are implemented by default:

### Global API key Rate Limiting

- API keys linked to a game have __unlimited requests__.
- API keys linked to a user have __60 requests per minute__.

### Global OAuth2 Rate Limiting

- User tokens are limited to __120 requests per minute__. 
- User token writes are limited to __60 requests per minute__. 

### Global IP Rate Limiting

- IPs are limited to __1000 requests per minute__. 
- IP writes are limited to __60 requests per minute__. 

### Per-Endpoint Rate Limiting

- Certain endpoints may override the defaults for security, spam or other reasons.
- When this (error ref **11009**) is encountered, its ok to continue requesting other endpoints, as the `retry-after` only applies to this endpoint.

### Headers
```
Example HTTP Header Response
---------------------
HTTP/2.0 429 Too Many Requests
...
...
retry-after: 57
```

> Example ratelimit JSON response

```json
{
	"error": {
		"code": 429,
		"error_ref": 11008,
		"message": "You have made too many requests in a short period of time, please wait and try again soon."
	}
}
```

If the rate limit is exceeded, the following header will be returned alongside the `429 Too Many Requests` HTTP response code.

 - `retry-after` - Number of seconds before you can attempt to make another request to API. __NOTE:__ If the `retry-after` value is 0, that means you have hit a rolling ratelimit. Rolling ratelimits don't block for a set timeframe once the limit is reached, instead they permit a certain number of requests within the timeframe (see [this explanation](https://developers.cloudflare.com/waf/rate-limiting-rules/parameters/#with-the-following-behavior)). If you encounter a 0, we recommend retrying the endpoint again after 60 seconds.

### Deprecation Notice

From November 20th, 2022 - the rate limit headers below will no longer be returned. If you have written a custom mod.io SDK or library, you should replace any usage of these headers with `retry-after`.

 - `X-RateLimit-Limit` - Number of requests you can make from the supplied API key/access token per minute.
 - `X-RateLimit-Remaining` - Number of requests remaining until requests are rejected.
 - `X-RateLimit-RetryAfter` - Amount of seconds until reset once you have been throttled (Only returned once rate limit exceeded).

From January 1st, 2024 - the error ref **11009** will be returned when a rate limit applies only to the endpoint being called. Error ref **11008** will continue to be returned in all other scenarios where the rate limit applies to all endpoints.

### Optimize your requests

You should always plan to minimize requests and cache API responses. It will make your app feel fluid and fast for your users. If your usage is excessive we shall reach out to discuss ways of optimizing, but our aim is to never restrict legitimate use of the API. We have set high limits that should cover 99% of use-cases, and are happy to [discuss your scenario](mailto:developers@mod.io?subject=API%20usage) if you require more.

## Testing

To help familiarize yourself with the mod.io API and to ensure your implementation is battle-hardened and operating as intended, you can [setup test games profiles](https://mod.io/g/add) on mod.io which will be available via [your content](https://mod.io/content). By default all game profiles are hidden and accessible only by users who you add to the games team, or invite using the preview system. This is until you set a game live, which will make it accessible for everyone.

Each game added will be assigned it's own `api_url`, `api_key` and `game_id`. When switching between game builds (i.e. production, test, staging) you will need to ensure each build is pointing to the right game profile on mod.io.

__Note:__ If your game is in stealth, we recommend using codenames and non-descriptive screenshots when uploading content. While your game won't be shown as long as it remains hidden, content connected to your game may appear in the profile of users who you have given permission to interact with it, including your own profile.

## Whitelabel

If you are a large studio or publisher and require a private, in-house, custom solution that accelerates your time to market with a best-in-class product, reach out to [developers@mod.io](mailto:developers@mod.io?subject=Whitelabel%20license) to discuss the licensing options available.

## Contact

If you spot any errors within the mod.io documentation, have feedback on how we can make it easier to follow or simply want to discuss how awesome mods are, feel free to reach out to [developers@mod.io](mailto:developers@mod.io?subject=API) or come join us in our [discord channel](https://discord.mod.io). We are here to help you grow and maximise the potential of mods in your game.

# Platforms

## Targeting a Platform

mod.io supports mods on all platforms. Games can enable per-platform mod file support in their dashboard, if they wish to control which platforms each mod and their corresponding files can be accessed on. Otherwise, all mods and their files will be available on all platforms the game supports. To make this system work, it's important the following headers are included in all API requests as explained below. If you have any questions about setting up cross-platform mod support in your game, please reach out to [developers@mod.io](mailto:developers@mod.io?subject=API).

When making API requests you should include the `X-Modio-Platform` header (with one of the values below), to tell mod.io what Platform the request is originating from. This header is __important__ because it enables mod.io to return data that is approved for the platform such as:

 - Supported mods and files
 - Supported tags the player can filter on
 - Localization of content for the platform
 - It also enables platform specific metrics

For example, passing the HTTP header `X-Modio-Platform: xboxseriesx` in your API request tells mod.io your player is on Xbox Series X.

Official mod.io [Plugins and SDKs](#implementation) will automatically supply this value for you providing you have specified the correct platform in the tools' settings. We __strongly recommend__ you supply this header in every request with the correct platform to enable mod.io to provide the best cross-platform experience for your players. Please see a list of supported platforms below:

Target Platform | Header Value
---------- | ----------  
Source | `source`
Windows | `windows`
Mac | `mac`
Linux | `linux`
Android | `android`
iOS | `ios`
Xbox One | `xboxone`
Xbox Series X | `xboxseriesx`
PlayStation 4 | `ps4`
PlayStation 5 | `ps5`
Switch | `switch`
Oculus | `oculus`

These are the only supported values and are case-insensitive, anything else will be ignored and default to `windows`. Have we missed a platform you are using? [Get in touch!](mailto:developers@mod.io?subject=Platform%20Support) 

## Targeting a Portal

When making API requests you should include the `X-Modio-Portal` header (with one of the values below), to tell mod.io what Portal (eg. Store or App) the request is originating from. This header is __important__ because it enables mod.io to fine-tune the experience, such as returning display names used by players on that portal (which can be a certification requirement).

For example, passing the HTTP header `X-Modio-Portal: epicgames` in your API request tells mod.io your player is coming via the Epic Games Store.

You can also instruct the mod.io website to authenticate the player using a portal from the list above (provided it is supported), as explained in [Web Overlay Authentication](#authentication). For example, if your game client has logged the player into mod.io on PlayStation using their PlayStation™Network account, and you want to open the mod.io website in-game with the player logged in using the same authentication method, you would add `?portal=psn` to the end of the URL: `https://mod.io/g/gamename?portal=psn`. You can optionally add `&login=auto` as well to automatically start the login process.

Target Portal | Header Value
---------- | ----------  
Apple | `apple`
Discord | `discord`
Epic Games Store | `epicgames`
Facebook | `facebook`
GOG | `gog`
Google | `google`
itch.io | `itchio`
Nintendo | `nintendo`
PlayStation™Network | `psn`
SSO | `sso`
Steam | `steam`
Xbox Live | `xboxlive`

These are the only supported values and are case-insensitive, anything else will be ignored. Have we missed a portal you are using? [Get in touch!](mailto:developers@mod.io?subject=Portal%20Support)
# Authentication
## Terms

> Example request

```shell
# You can also use wget
curl -X GET https://*.modapi.io/v1/authenticate/terms?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/authenticate/terms?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/authenticate/terms',
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

fetch('https://*.modapi.io/v1/authenticate/terms?api_key=YourApiKey',
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

r = requests.get('https://*.modapi.io/v1/authenticate/terms', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/authenticate/terms?api_key=YourApiKey");
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

`GET /authenticate/terms`

The purpose of this endpoint is to provide the text, links and buttons you can use to get a users agreement and consent prior to authenticating them in-game (your dialog should look similar to the example below). This text will be localized based on the `Accept-Language` header, into one of our [supported languages](#localization) (note: our full Terms of Use and Privacy Policy are currently in English-only). If you are authenticating using platform SSO, you must call this endpoint with the `X-Modio-Portal` [header set](#targeting-a-portal), so the text is localized to match the platforms requirements. A successful response will return a [Terms Object](#terms-object).

     __Example Dialog:__

     <aside class='consent'>This game uses mod.io to support user-generated content. By clicking 'I Agree' you agree to the mod.io Terms of Use and a mod.io account will be created for you (using your display name, avatar and ID). Please see the mod.io Privacy Policy on how mod.io processes your personal data.<br><br><div style='text-align:center'><span class='versionwrap cursor'> &nbsp; &nbsp; I Agree &nbsp; &nbsp; </span> <span class='versionwrap outline cursor'>No, Thanks</span><br><br>[Terms of Use](https://mod.io/terms/widget) - [Privacy Policy](https://mod.io/privacy/widget)<br></div></aside>

     __IMPORTANT:__ It is a requirement of the [Game Terms](https://mod.io/gameterms) with mod.io, and the platforms mod.io is used on, to ensure the user provides consent and has agreed to the latest mod.io [Terms of Use](https://mod.io/terms/widget) and [Privacy Policy](https://mod.io/privacy/widget). The users agreement must be collected prior to using a 3rd party authentication flow (including but not limited to Steam, PSN, Nintendo and Xbox Live). You only need to collect the users agreement once, and also each time these policies are updated.

     To make this easy to manage, all of the 3rd party authentication flows have a `terms_agreed` field which should be set to `false` by default. If the user has agreed to the latest policies, their authentication will proceed as normal, however if their agreement is required and `terms_agreed` is set to `false` an error `403 Forbidden (error_ref 11074)` will be returned. When you receive this error, you must collect the users agreement before resubmitting the authentication flow with `terms_agreed` set to `true`, which will be recorded.

     __NOTE:__ You must make sure the Terms of Use and Privacy Policy are correctly linked, or displayed inline using the [agreements endpoints](#agreements) to get the latest versions.

     If you wish to display the agreements in a web browser overlay, we recommend adding __/widget__ and __?no_links=true__ to the end of the agreement URLs, to remove the menus and external links, for example:

     - [https://mod.io/terms`/widget?no_links=true`](https://mod.io/terms/widget?no_links=true)<br>
     - [https://mod.io/privacy`/widget?no_links=true`](https://mod.io/privacy/widget?no_links=true)

     __NOTE:__ You can use your own text and process, but be aware that you are responsible for ensuring that the users agreement is properly collected and reported. Failure to do so correctly is a breach of the [mod.io Game Terms](https://mod.io/gameterms/widget). If your game does not authenticate users or only uses the email authentication flow, you do not need to implement this dialog, but you should link to the mod.io Terms of Use and Privacy Policy in your Privacy Policy/EULA.

> Example response

```json
{
  "plaintext": "This game uses mod.io to support user-generated content. By selecting "I Agree" you agree to the mod.io Terms of Use and a mod.io account will be created for you (using your display name, avatar and ID). Please see the mod.io Privacy Policy on how mod.io processes your personal data.",
  "html": "<p>This game uses <a href="https://mod.io">mod.io</a> to support user-generated content. By selecting "I Agree" you agree to the mod.io <a href="https://mod.io/terms">Terms of Use</a> and a mod.io account will be created for you (using your display name, avatar and ID). Please see the mod.io <a href="https://mod.io/privacy">Privacy Policy</a> on how mod.io processes your personal data.</p>",
  "buttons": {
    "agree": {
      "text": "I Agree"
    },
    "disagree": {
      "text": "No, Thanks"
    }
  },
  "links": {
    "website": {
      "text": "Website",
      "url": "https://mod.io",
      "required": false
    },
    "terms": {
      "text": "Terms of Use",
      "url": "https://mod.io/terms",
      "required": true
    },
    "privacy": {
      "text": "Privacy Policy",
      "url": "https://mod.io/privacy",
      "required": true
    },
    "manage": {
      "text": "Manage Account",
      "url": "https://mod.io/me/account",
      "required": false
    }
  }
}

```
<h3 id="Terms-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Terms Object](#schematerms_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>
</aside>


## Steam

> Example request

```shell
# You can also use wget
curl -X POST https://*.modapi.io/v1/external/steamauth?api_key=YourApiKey \
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  --data-urlencode 'appdata=NDNuZmhnaWdyaGdqOWc0M2o5eTM0aGc='

```

```http
POST https://*.modapi.io/v1/external/steamauth?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io
Content-Type: application/x-www-form-urlencoded
Accept: application/json

```

```javascript
var headers = {
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/external/steamauth',
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

fetch('https://*.modapi.io/v1/external/steamauth?api_key=YourApiKey',
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

r = requests.post('https://*.modapi.io/v1/external/steamauth', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/external/steamauth?api_key=YourApiKey");
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

Request an access token on behalf of a Steam user. To use this functionality you *must* add your games [encrypted app ticket key](https://partner.steamgames.com/apps/sdkauth) from Steamworks, to the [*Game Admin > Settings*](/platforms/steam/authentication/) page of your games profile on mod.io. A Successful request will return an [Access Token Object](#access-token-object).

    __HINT:__ If you want to overlay the mod.io site in-game on Steam, we recommend you add `?portal=steam` to the end of the URL you open which will prompt the user to login with Steam. See [Web Overlay Authentication](#web-overlay-authentication) for details.
    __NOTE__: Steam is the only authentication endpoint that requires their token to be base64 encoded. All other endpoints tokens should be provided as a UTF-8 character string.

     Parameter|Type|Required|Description
     ---|---|---|---|
     appdata|base64-encoded string|true|The Steam users [Encrypted App Ticket](https://partner.steamgames.com/doc/features/auth#encryptedapptickets) provided by the Steamworks SDK. <br><br>Parameter content *MUST* be the [*uint8 *rgubTicketEncrypted*](https://partner.steamgames.com/doc/api/SteamEncryptedAppTicket) returned after calling [ISteamUser::GetEncryptedAppTicket()](https://partner.steamgames.com/doc/api/ISteamUser#GetEncryptedAppTicket) within the Steamworks SDK, converted into a base64-encoded string.<br><br>__NOTE:__ Due to a base64-encoded string containing special characters, you must URL encode the string after it has been base64-encoded to ensure it is successfully sent to our servers otherwise you may encounter an `422 Unprocessable Entity` response. For example, [cURL](https://ec.haxx.se/http-post.html) will do this for you by using the `--data-urlencode` option.
     email|string||The users email address (optional but recommended to help users recover lost accounts). If supplied, and the respective user does not have an email registered for their account we will send a confirmation email to confirm they have ownership of the specified email.<br><br>__NOTE__: If the user already has an email on record with us, this parameter will be ignored. This parameter should also be urlencoded before the request is sent.
     date_expires|integer||Unix timestamp of date in which the returned token will expire. Value cannot be higher than the default value which is a common year (unix timestamp + 31536000 seconds). Using a token after it's expiry time has elapsed will result in a `401 Unauthorized` response.
     terms_agreed|boolean||This MUST be set to `false` unless you have collected the [users agreement](#terms) prior to calling this endpoint in which case it can be set to `true` and will be recorded.<br><br>__NOTE:__ If this is set to `false` and the user has not agreed to the latest mod.io Terms of Use and Privacy Policy, an error `403 Forbidden (error_ref 11074)` will be returned and you will need to collect the [users agreement](#terms) and retry with this value set to `true` to authenticate the user.

> Example response

```json
{
  "code": 200,
  "access_token": "eyJ0eXAiOiXKV1QibCJhbLciOiJeiUzI1.....",
  "date_expires": 1570673249
}

```
<h3 id="Steam-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Access Token Object](#schemaaccess_token_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|14001|The game associated with the supplied api_key is currently not available.|[Error Object](#schemaerror_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11018|The steam encrypted app ticket was invalid.|[Error Object](#schemaerror_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11032|mod.io was unable to verify the credentials against the external service provider.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11016|The api_key supplied in the request must be associated with a game.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11017|The api_key supplied in the request is for test environment purposes only and cannot be used for this functionality.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11019|The secret steam app ticket associated with this game has not been configured.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11074|The user has not agreed to the mod.io Terms of Use. Please see terms_agreed parameter description and the [Terms](#terms) endpoint for more information.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|17053|The user account associated with this email is locked. Please contact support for assistance.|[Error Object](#schemaerror_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>
</aside>
## Xbox Live

> Example request

```shell
# You can also use wget
curl -X POST https://*.modapi.io/v1/external/xboxauth?api_key=YourApiKey \
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'xbox_token=XBL3.0 x=9264027439329321064;eym72VygeZzTSUVRmNvw8v...'

```

```http
POST https://*.modapi.io/v1/external/xboxauth?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io
Content-Type: application/x-www-form-urlencoded
Accept: application/json

```

```javascript
var headers = {
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/external/xboxauth',
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

fetch('https://*.modapi.io/v1/external/xboxauth?api_key=YourApiKey',
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

r = requests.post('https://*.modapi.io/v1/external/xboxauth', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/external/xboxauth?api_key=YourApiKey");
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

Request an access token on behalf of an Xbox Live user. A Successful request will return an [Access Token Object](#access-token-object).

     __NOTE__: To use this endpoint you will need to setup some additional settings prior to being able to authenticate Xbox Live users. [Head here](/platforms/gdk/#authentication) for these instructions (**NOTE:** A [NDA is required](/platforms/console-sdks/) to be able to access).

     __HINT:__ If you want to overlay the mod.io site in-game on Xbox, we recommend you add `?portal=xboxlive` to the end of the URL you open which will prompt the user to login with Xbox Live. See [Web Overlay Authentication](#web-overlay-authentication) for details.

     Parameter|Type|Required|Description
     ---|---|---|---|
     xbox_token|string|true|The Xbox Live token returned from calling [GetTokenAndSignatureAsync("POST", "https://*.modapi.io")](https://docs.microsoft.com/en-us/dotnet/api/microsoft.xbox.services.system.xboxliveuser.gettokenandsignatureasync?view=xboxlive-dotnet-2017.11.20171204.01). <br><br>__NOTE:__ Due to the encrypted app ticket containing special characters, you must URL encode the string before sending the request to ensure it is successfully sent to our servers otherwise you may encounter an `422 Unprocessable Entity` response. For example, [cURL](https://ec.haxx.se/http-post.html) will do this for you by using the `--data-urlencode` option.
     email|string||The users email address (optional but recommended to help users recover lost accounts). If supplied, and the respective user does not have an email registered for their account we will send a confirmation email to confirm they have ownership of the specified email. This functionality is also available at a later time via the [Link an Email](#link-an-email) endpoint.<br><br>__NOTE__: If the user already has an email on record with us, this parameter will be ignored. This parameter should also be urlencoded before the request is sent.
     date_expires|integer||Unix timestamp of date in which the returned token will expire. Value cannot be higher than the default value which is a common year (unix timestamp + 31536000 seconds). Using a token after it's expiry time has elapsed will result in a `401 Unauthorized` response.
     terms_agreed|boolean||This MUST be set to `false` unless you have collected the [users agreement](#terms) prior to calling this endpoint in which case it can be set to `true` and will be recorded.<br><br>__NOTE:__ If this is set to `false` and the user has not agreed to the latest mod.io Terms of Use and Privacy Policy, an error `403 Forbidden (error_ref 11074)` will be returned and you will need to collect the [users agreement](#terms) and retry with this value set to `true` to authenticate the user.

> Example response

```json
{
  "code": 200,
  "access_token": "eyJ0eXAiOiXKV1QibCJhbLciOiJeiUzI1.....",
  "date_expires": 1570673249
}

```
<h3 id="Xbox-Live-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Access Token Object](#schemaaccess_token_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|14001|The game associated with the supplied api_key is currently not available.|[Error Object](#schemaerror_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11027|The Xbox Live token supplied in the request is invalid.|[Error Object](#schemaerror_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11029|The Xbox Live token supplied has expired.|[Error Object](#schemaerror_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11032|mod.io was unable to verify the credentials against the external service provider.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11016|The api_key supplied in the request must be associated with a game.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11017|The api_key supplied in the request is for test environment purposes only and cannot be used for this functionality.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11028|The user is not permitted to interact with UGC. This can be modified in the user's Xbox Live profile.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11030|Xbox Live users with 'Child' accounts are not permitted to use mod.io.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11074|The user has not agreed to the mod.io Terms of Use. Please see terms_agreed parameter description and the [Terms](#terms) endpoint for more information.|[Error Object](#schemaerror_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>
</aside>
## PlayStation™Network

> Example request

```shell
# You can also use wget
curl -X POST https://*.modapi.io/v1/external/psnauth?api_key=YourApiKey \
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'auth_code=MAXfj2TMqpHnaUMJdwCDbZUi2L3usnV7aw7xwHX2PEqT5hLkFF2VUyhlnCAMC0tQR3trpFQot0zvMMEtBzekilqeVD1Qm9nEcs9FljneaL3hCWPFSf6jjDSxOxOSytGD'

```

```http
POST https://*.modapi.io/v1/external/psnauth?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io
Content-Type: application/x-www-form-urlencoded
Accept: application/json

```

```javascript
var headers = {
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/external/psnauth',
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
  "auth_code": "MAXfj2TMqpHnaUMJdwCDbZUi2L3usnV7aw7xwHX2PEqT5hLkFF2VUyhlnCAMC0tQR3trpFQot0zvMMEtBzekilqeVD1Qm9nEcs9FljneaL3hCWPFSf6jjDSxOxOSytGD"
}';
const headers = {
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://*.modapi.io/v1/external/psnauth?api_key=YourApiKey',
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

r = requests.post('https://*.modapi.io/v1/external/psnauth', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/external/psnauth?api_key=YourApiKey");
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

`POST /external/psnauth`

Request an access token on behalf of a PlayStation Network (PSN) user. A Successful request will return an [Access Token Object](#access-token-object).

     __NOTE__: To use this endpoint you will need to setup some additional settings prior to being able to authenticate PlayStation users. [Head here](/platforms/playstation/#authentication) for these instructions (**NOTE:** A [NDA is required](/platforms/console-sdks/) to be able to access).

     __HINT:__ If you want to overlay the mod.io site in-game on PlayStation, we recommend you add `?portal=psn` to the end of the URL you open which will prompt the user to login with PlayStation Network. See [Web Overlay Authentication](#web-overlay-authentication) for details.

     "PlayStation" and "DualSense" are registered trademarks or trademarks of Sony Interactive Entertainment Inc.

     Parameter|Type|Required|Description
     ---|---|---|---|
     auth_code|string|true|The auth code returned from the PlayStation Network API.
     env|integer||The PlayStation Network environment you are targeting. If omitted, the request will default to targeting PlayStation Network's production environment.
     email|string||The users email address (optional but recommended to help users recover lost accounts). If supplied, and the respective user does not have an email registered for their account we will send a confirmation email to confirm they have ownership of the specified email.<br><br>__NOTE__: If the user already has an email on record with us, this parameter will be ignored. This parameter should also be urlencoded before the request is sent.
     date_expires|integer||Unix timestamp of date in which the returned token will expire. Value cannot be higher than the default value which is a common year (unix timestamp + 31536000 seconds). Using a token after it's expiry time has elapsed will result in a `401 Unauthorized` response.
     terms_agreed|boolean||This MUST be set to `false` unless you have collected the [users agreement](#terms) prior to calling this endpoint in which case it can be set to `true` and will be recorded.<br><br>__NOTE:__ If this is set to `false` and the user has not agreed to the latest mod.io Terms of Use and Privacy Policy, an error `403 Forbidden (error_ref 11074)` will be returned and you will need to collect the [users agreement](#terms) and retry with this value set to `true` to authenticate the user.

> Example response

```json
{
  "code": 200,
  "access_token": "eyJ0eXAiOiXKV1QibCJhbLciOiJeiUzI1.....",
  "date_expires": 1570673249
}

```
<h3 id="PlayStation™Network-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Access Token Object](#schemaaccess_token_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11074|The user has not agreed to the mod.io Terms of Use. Please see terms_agreed parameter description and the [Terms](#terms) endpoint for more information.|[Error Object](#schemaerror_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>
</aside>
## Nintendo Switch

> Example request

```shell
# You can also use wget
curl -X POST https://*.modapi.io/v1/external/switchauth?api_key=YourApiKey \
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'id_token=m72VygeZzTSUVRmNvw8v...'

```

```http
POST https://*.modapi.io/v1/external/switchauth?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io
Content-Type: application/x-www-form-urlencoded
Accept: application/json

```

```javascript
var headers = {
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/external/switchauth',
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

fetch('https://*.modapi.io/v1/external/switchauth?api_key=YourApiKey',
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

r = requests.post('https://*.modapi.io/v1/external/switchauth', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/external/switchauth?api_key=YourApiKey");
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

Request an access token on behalf of a Nintendo Switch user. A Successful request will return an [Access Token Object](#access-token-object).

   __NOTE__: To use this endpoint you will need to setup some additional settings prior to being able to authenticate Nintendo Switch users. [Head here](/platforms/switch/#authentication) for these instructions (**NOTE:** A [NDA is required](/platforms/console-sdks/) to be able to access).

   Parameter|Type|Required|Description
   ---|---|---|---|
   id_token|string|true|The NSA ID supplied by the Nintendo Switch SDK.
   email|string||The users email address. If supplied, and the respective user does not have an email registered for their account we will send a confirmation email to confirm they have ownership of the specified email.<br><br>__WARNING__: We __strongly recommend__ that you prompt your users in a friendly manner at least once to provide their email address to link their Nintendo Service account to mod.io. Failing to provide an email will in-effect generate an orphan account that will only be able to be accessed from the users' Switch device.
   date_expires|integer||Unix timestamp of date in which the returned token will expire. Value cannot be higher than the default value which is a common year (unix timestamp + 31536000 seconds). Using a token after it's expiry time has elapsed will result in a `401 Unauthorized` response.
   terms_agreed|boolean||This MUST be set to `false` unless you have collected the [users agreement](#terms) prior to calling this endpoint in which case it can be set to `true` and will be recorded.<br><br>__NOTE:__ If this is set to `false` and the user has not agreed to the latest mod.io Terms of Use and Privacy Policy, an error `403 Forbidden (error_ref 11074)` will be returned and you will need to collect the [users agreement](#terms) and retry with this value set to `true` to authenticate the user.

> Example response

```json
{
  "code": 200,
  "access_token": "eyJ0eXAiOiXKV1QibCJhbLciOiJeiUzI1.....",
  "date_expires": 1570673249
}

```
<h3 id="Nintendo-Switch-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Access Token Object](#schemaaccess_token_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11035|The NSA ID token was invalid/malformed.|[Error Object](#schemaerror_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11039|mod.io was unable to validate the credentials with Nintendo Servers.|[Error Object](#schemaerror_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11036|The NSA ID token is not valid yet.|[Error Object](#schemaerror_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11037|The NSA ID token has expired. You should request another token from the Switch SDK and ensure it is delivered to mod.io before it expires.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11040|The application ID for the Nintendo Switch title has not been configured, this can be setup in the 'Options' tab within your game profile.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11041|The application ID of the originating Switch title is not permitted to authenticate users. Please check the Switch application id submitted on your games' 'Options' tab and ensure it is the same application id of the Switch title making the authentication request.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11074|The user has not agreed to the mod.io Terms of Use. Please see terms_agreed parameter description and the [Terms](#terms) endpoint for more information.|[Error Object](#schemaerror_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>
</aside>
## Meta Quest

> Example request

```shell
# You can also use wget
curl -X POST https://*.modapi.io/v1/external/oculusauth?api_key=YourApiKey \
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'device=rift' \
  -d 'nonce=m72VygeZzTSUVRmNvw8v...' \
  -d 'user_id=1829770514091149' \
  -d 'access_token=OCAf5kD1SbVNE...'

```

```http
POST https://*.modapi.io/v1/external/oculusauth?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io
Content-Type: application/x-www-form-urlencoded
Accept: application/json

```

```javascript
var headers = {
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/external/oculusauth',
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

fetch('https://*.modapi.io/v1/external/oculusauth?api_key=YourApiKey',
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

r = requests.post('https://*.modapi.io/v1/external/oculusauth', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/external/oculusauth?api_key=YourApiKey");
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

Request an access token on behalf of an Meta Quest user. To use this functionality you *must* add your games [AppId and secret](https://dashboard.oculus.com/) from the Meta Quest Dashboard, to the *Game Admin > Settings* page of your games profile on mod.io. A Successful request will return an [Access Token Object](#access-token-object).

    Parameter|Type|Required|Description
    ---|---|---|---|
    device|string|true|The Meta Quest device being used for authentication.<br><br>Possible Options:<br>- _rift_<br>- _quest_
    nonce|string|true|The nonce provided by calling [ovr_User_GetUserProof()](https://developer.oculus.com/documentation/platform/latest/concepts/dg-ownership/) from the Meta Quest SDK. <br><br>__NOTE:__ Due to the `nonce` potentially containing special characters, you must URL encode the string before sending the request to ensure it is successfully sent to our servers otherwise you may encounter an `422 Unprocessable Entity` response. For example, [cURL](https://ec.haxx.se/http-post.html) will do this for you by using the `--data-urlencode` option.
    user_id|integer|true|The user's Meta Quest id providing by calling [ovr_GetLoggedInUserID()](https://developer.oculus.com/documentation/platform/latest/concepts/dg-ownership/) from the Meta Quest SDK.
    access_token|string|true|The user's access token, providing by calling [ovr_User_GetAccessToken()](https://developer.oculus.com/documentation/platform/latest/concepts/dg-ownership/) from the Meta Quest SDK. mod.io uses this access token on the first login only to obtain the user's alias and is not saved on our servers.
    email|string||The users email address. If supplied, and the respective user does not have an email registered for their account we will send a confirmation email to confirm they have ownership of the specified email.<br><br>__WARNING__: We __strongly recommend__ that you prompt your users in a friendly manner at least once to provide their email address to link their Meta Quest account. Due to how Meta Quest handles user IDs - if we are not supplied with an email for a user at least once we will __never__ be able to link that user with their existing account at a later date as Meta Quest IDs operate at the game-scope, not globally. Failing to provide an email will in-effect generate an orphan account that will only be able to be accessed from your title.
    date_expires|integer||Unix timestamp of date in which the returned token will expire. Value cannot be higher than the default value which is a common year (unix timestamp + 31536000 seconds). Using a token after it's expiry time has elapsed will result in a `401 Unauthorized` response.
    terms_agreed|boolean||This MUST be set to `false` unless you have collected the [users agreement](#terms) prior to calling this endpoint in which case it can be set to `true` and will be recorded.<br><br>__NOTE:__ If this is set to `false` and the user has not agreed to the latest mod.io Terms of Use and Privacy Policy, an error `403 Forbidden (error_ref 11074)` will be returned and you will need to collect the [users agreement](#terms) and retry with this value set to `true` to authenticate the user.

> Example response

```json
{
  "code": 200,
  "access_token": "eyJ0eXAiOiXKV1QibCJhbLciOiJeiUzI1.....",
  "date_expires": 1570673249
}

```
<h3 id="Meta-Quest-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Access Token Object](#schemaaccess_token_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|14001|The game associated with the supplied api_key is currently not available.|[Error Object](#schemaerror_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11032|mod.io was unable to verify the credentials against the external service provider.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11016|The api_key supplied in the request must be associated with a game.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11017|The api_key supplied in the request is for test environment purposes only and cannot be used for this functionality.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11024|The secret Oculus Rift app ticket associated with this game has not been configured.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11025|The secret Oculus Quest app ticket associated with this game has not been configured.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11074|The user has not agreed to the mod.io Terms of Use. Please see terms_agreed parameter description and the [Terms](#terms) endpoint for more information.|[Error Object](#schemaerror_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>
</aside>
## Epic Games

> Example request

```shell
# You can also use wget
curl -X POST https://*.modapi.io/v1/external/epicgamesauth?api_key=YourApiKey \
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'access_token=eym72VygeZzTSUVRmNvw8v...'

```

```http
POST https://*.modapi.io/v1/external/epicgamesauth?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io
Content-Type: application/x-www-form-urlencoded
Accept: application/json

```

```javascript
var headers = {
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/external/epicgamesauth',
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
  "access_token": "eym72VygeZzTSUVRmNvw8v..."
}';
const headers = {
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://*.modapi.io/v1/external/epicgamesauth?api_key=YourApiKey',
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

r = requests.post('https://*.modapi.io/v1/external/epicgamesauth', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/external/epicgamesauth?api_key=YourApiKey");
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

`POST /external/epicgamesauth`

Request an access token on behalf of an Epic Games user. Additional instructions for configuing your Epic Account Services Application to use this endpoint can be [found here](/platforms/epic/authentication/). A Successful request will return an [Access Token Object](#access-token-object).

    Parameter|Type|Required|Description
    ---|---|---|---|
    id_token|string|true|The ID Token [returned from the EOS SDK](https://dev.epicgames.com/docs/api-ref/functions/eos-auth-copy-id-token) when you authenticate a user to use mod.io.
    email|string||The users email address (optional but recommended to help users recover lost accounts). If supplied, and the respective user does not have an email registered for their account we will send a confirmation email to confirm they have ownership of the specified email.<br><br>__NOTE__: If the user already has an email on record with us, this parameter will be ignored. This parameter should also be urlencoded before the request is sent.
    date_expires|integer||Unix timestamp of date in which the returned token will expire. Value cannot be higher than the default value which is a week (unix timestamp + 604800 seconds). Using a token after it's expiry time has elapsed will result in a `401 Unauthorized` response.
    terms_agreed|boolean||This MUST be set to `false` unless you have collected the [users agreement](#terms) prior to calling this endpoint in which case it can be set to `true` and will be recorded.<br><br>__NOTE:__ If this is set to `false` and the user has not agreed to the latest mod.io Terms of Use and Privacy Policy, an error `403 Forbidden (error_ref 11074)` will be returned and you will need to collect the [users agreement](#terms) and retry with this value set to `true` to authenticate the user.

> Example response

```json
{
  "code": 200,
  "access_token": "eyJ0eXAiOiXKV1QibCJhbLciOiJeiUzI1.....",
  "date_expires": 1570673249
}

```
<h3 id="Epic-Games-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Access Token Object](#schemaaccess_token_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11044|The access token was invalid/malformed.|[Error Object](#schemaerror_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11048|mod.io was unable to validate the credentials with Epic Games.|[Error Object](#schemaerror_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11045|The Epic Games access token is not valid yet.|[Error Object](#schemaerror_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11046|The Epic Games access token has expired. You should request another token from the EOS SDK and ensure it is delivered to mod.io before it expires.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11074|The user has not agreed to the mod.io Terms of Use. Please see terms_agreed parameter description and the [Terms](#terms) endpoint for more information.|[Error Object](#schemaerror_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>
</aside>
## GOG Galaxy

> Example request

```shell
# You can also use wget
curl -X POST https://*.modapi.io/v1/external/galaxyauth?api_key=YourApiKey \
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  --data-urlencode 'appdata=GCL671bwZ/+zUeOWc0M'

```

```http
POST https://*.modapi.io/v1/external/galaxyauth?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io
Content-Type: application/x-www-form-urlencoded
Accept: application/json

```

```javascript
var headers = {
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/external/galaxyauth',
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

fetch('https://*.modapi.io/v1/external/galaxyauth?api_key=YourApiKey',
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

r = requests.post('https://*.modapi.io/v1/external/galaxyauth', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/external/galaxyauth?api_key=YourApiKey");
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

Request an access token on behalf of a GOG Galaxy user. To use this functionality you *must* add your games [encrypted app ticket key](https://docs.gog.com/sdk-encrypted-tickets/) from GOG Galaxy, to the [*Game Admin > Settings*](/platforms/gog/authentication/) page of your games profile on mod.io. A Successful request will return an [Access Token Object](#access-token-object).

    Parameter|Type|Required|Description
    ---|---|---|---|
    appdata|string|true|The GOG Galaxy users [Encrypted App Ticket](https://cdn.gog.com/open/galaxy/sdk/1.133.3/Documentation/classgalaxy_1_1api_1_1IUser.html#a352802aab7a6e71b1cd1b9b1adfd53d8) provided by the GOG Galaxy SDK. <br><br>Parameter content *MUST* be the encrypted string returned in the buffer after calling [IUser::GetEncryptedAppTicket()](https://cdn.gog.com/open/galaxy/sdk/1.133.3/Documentation/classgalaxy_1_1api_1_1IUser.html#a96af6792efc260e75daebedca2cf74c6) within the Galaxy SDK. Unlike the [Steam Authentication](#steam) endpoint, you do not need to encode the encrypted string as this is already done by the Galaxy SDK.<br><br>__NOTE:__ Due to the encrypted app ticket containing special characters, you must URL encode the string before sending the request to ensure it is successfully sent to our servers otherwise you may encounter an `422 Unprocessable Entity` response. For example, [cURL](https://ec.haxx.se/http-post.html) will do this for you by using the `--data-urlencode` option.
    email|string||The users email address. If supplied, and the respective user does not have an email registered for their account we will send a confirmation email to confirm they have ownership of the specified email.<br><br>__WARNING__: We __strongly recommend__ that you prompt your users in a friendly manner at least once to provide their email address to link their GOG Galaxy account to mod.io. Failing to provide an email will in-effect generate an orphan account that will only be able to be accessed from GOG Galaxy.
    date_expires|integer||Unix timestamp of date in which the returned token will expire. Value cannot be higher than the default value which is a common year (unix timestamp + 31536000 seconds). Using a token after it's expiry time has elapsed will result in a `401 Unauthorized` response.
    terms_agreed|boolean||This MUST be set to `false` unless you have collected the [users agreement](#terms) prior to calling this endpoint in which case it can be set to `true` and will be recorded.<br><br>__NOTE:__ If this is set to `false` and the user has not agreed to the latest mod.io Terms of Use and Privacy Policy, an error `403 Forbidden (error_ref 11074)` will be returned and you will need to collect the [users agreement](#terms) and retry with this value set to `true` to authenticate the user.

> Example response

```json
{
  "code": 200,
  "access_token": "eyJ0eXAiOiXKV1QibCJhbLciOiJeiUzI1.....",
  "date_expires": 1570673249
}

```
<h3 id="GOG-Galaxy-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Access Token Object](#schemaaccess_token_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|14001|The game associated with the supplied api_key is currently not available.|[Error Object](#schemaerror_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11021|The GOG Galaxy encrypted app ticket was invalid.|[Error Object](#schemaerror_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11032|mod.io was unable to verify the credentials against the external service provider.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11016|The api_key supplied in the request must be associated with a game.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11017|The api_key supplied in the request is for test environment purposes only and cannot be used for this functionality.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11022|The secret GOG Galaxy app ticket associated with this game has not been configured.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11074|The user has not agreed to the mod.io Terms of Use. Please see terms_agreed parameter description and the [Terms](#terms) endpoint for more information.|[Error Object](#schemaerror_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>
</aside>
## Apple

> Example request

```shell
# You can also use wget
curl -X POST https://*.modapi.io/v1/external/appleauth?api_key=YourApiKey \
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'id_token=eyJhbXciOiJIUzI1Lizs....'

```

```http
POST https://*.modapi.io/v1/external/appleauth?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io
Content-Type: application/x-www-form-urlencoded
Accept: application/json

```

```javascript
var headers = {
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/external/appleauth',
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
  "id_token": "eyJhbXciOiJIUzI1Lizs...."
}';
const headers = {
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://*.modapi.io/v1/external/appleauth?api_key=YourApiKey',
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

r = requests.post('https://*.modapi.io/v1/external/appleauth', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/external/appleauth?api_key=YourApiKey");
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

`POST /external/appleauth`

Request an access token on behalf of a 'Sign in with Apple' user. To use this functionality you *must* add your games Bundle ID from Apple, to the [*Game Admin > Settings*](/platforms/apple/authentication/) page of your games profile on mod.io. A Successful request will return an [Access Token Object](#access-token-object).

    Parameter|Type|Required|Description
    ---|---|---|---|
    id_token|string|true|The ID token returned to your iOS application upon using Sign in with Apple functionality.
    date_expires|integer||Unix timestamp of date in which the returned token will expire. Value cannot be higher than the default value which is a week (unix timestamp + 604800 seconds). Using a token after it's expiry time has elapsed will result in a `401 Unauthorized` response.
    terms_agreed|boolean||This MUST be set to `false` unless you have collected the [users agreement](#terms) prior to calling this endpoint in which case it can be set to `true` and will be recorded.<br><br>__NOTE:__ If this is set to `false` and the user has not agreed to the latest mod.io Terms of Use and Privacy Policy, an error `403 Forbidden (error_ref 11074)` will be returned and you will need to collect the [users agreement](#terms) and retry with this value set to `true` to authenticate the user.

> Example response

```json
{
  "code": 200,
  "access_token": "eyJ0eXAiOiXKV1QibCJhbLciOiJeiUzI1.....",
  "date_expires": 1570673249
}

```
<h3 id="Apple-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Access Token Object](#schemaaccess_token_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|14001|The game associated with the supplied api_key is currently not available.|[Error Object](#schemaerror_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11201|The Apple token supplied in the request is invalid.|[Error Object](#schemaerror_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11202|The Apple token supplied has expired.|[Error Object](#schemaerror_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11032|mod.io was unable to verify the credentials against the external service provider.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11016|The api_key supplied in the request must be associated with a game.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11017|The api_key supplied in the request is for test environment purposes only and cannot be used for this functionality.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11074|The user has not agreed to the mod.io Terms of Use. Please see terms_agreed parameter description and the [Terms](#terms) endpoint for more information.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11203|The Apple Bundle ID associated with this game has not been configured.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11205|The Apple Bundle ID associated with this game is invalid.|[Error Object](#schemaerror_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>
</aside>
## Google

> Example request

```shell
# You can also use wget
curl -X POST https://*.modapi.io/v1/external/googleauth?api_key=YourApiKey \
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'id_token=eyJhbXciOiJIUzI1Lizs....'

```

```http
POST https://*.modapi.io/v1/external/googleauth?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io
Content-Type: application/x-www-form-urlencoded
Accept: application/json

```

```javascript
var headers = {
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/external/googleauth',
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
  "id_token": "eyJhbXciOiJIUzI1Lizs...."
}';
const headers = {
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://*.modapi.io/v1/external/googleauth?api_key=YourApiKey',
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

r = requests.post('https://*.modapi.io/v1/external/googleauth', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/external/googleauth?api_key=YourApiKey");
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

`POST /external/googleauth`

Request an access token on behalf of a Google user. To use this functionality you *must* add your games Client ID, Secret and Redirect URI from Google, to the [*Game Admin > Settings*](/platforms/google/authentication/) page of your games profile on mod.io. A Successful request will return an [Access Token Object](#access-token-object).
     *
     __HINT:__ If you want to overlay the mod.io site in-game on Android, we recommend you add `?portal=google` to the end of the URL you open which will prompt the user to login with Google. See [Web Overlay Authentication](#web-overlay-authentication) for details.

     Parameter|Type|Required|Description
     ---|---|---|---|
     auth_code|string|required_if|The `auth_code` value [returned from Google](https://developers.google.com/identity/sign-in/android/offline-access) after you have authenticated a user in-app. This is required if an id_token is not provided.
     id_token|string|required_if|The `id_token` value [returned from Google](https://developers.google.com/identity/sign-in/web/backend-auth#calling-the-tokeninfo-endpoint) after you have authenticated a user via the Google OAuth2 flow. This is required if an auth_code is not provided.
     date_expires|integer||Unix timestamp of date in which the returned token will expire. Value cannot be higher than the default value which is a week (unix timestamp + 604800 seconds). Using a token after it's expiry time has elapsed will result in a `401 Unauthorized` response.
     terms_agreed|boolean||This MUST be set to `false` unless you have collected the [users agreement](#terms) prior to calling this endpoint in which case it can be set to `true` and will be recorded.<br><br>__NOTE:__ If this is set to `false` and the user has not agreed to the latest mod.io Terms of Use and Privacy Policy, an error `403 Forbidden (error_ref 11074)` will be returned and you will need to collect the [users agreement](#terms) and retry with this value set to `true` to authenticate the user.

> Example response

```json
{
  "code": 200,
  "access_token": "eyJ0eXAiOiXKV1QibCJhbLciOiJeiUzI1.....",
  "date_expires": 1570673249
}

```
<h3 id="Google-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Access Token Object](#schemaaccess_token_object)
400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|11053|Google authentication settings have not been configured. Please contact support for assistance.|[Error Object](#schemaerror_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11054|mod.io was unable to validate the credentials with Google's servers.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|17053|The user account associated with this email is locked. Please contact support for assistance.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11074|The user has not agreed to the mod.io Terms of Use. Please see terms_agreed parameter description and the [Terms](#terms) endpoint for more information.|[Error Object](#schemaerror_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>
</aside>
## Discord

> Example request

```shell
# You can also use wget
curl -X POST https://*.modapi.io/v1/external/discordauth?api_key=YourApiKey \
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'discord_token=eyJhbXciOiJIUzI1Lizs....'

```

```http
POST https://*.modapi.io/v1/external/discordauth?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io
Content-Type: application/x-www-form-urlencoded
Accept: application/json

```

```javascript
var headers = {
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/external/discordauth',
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

fetch('https://*.modapi.io/v1/external/discordauth?api_key=YourApiKey',
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

r = requests.post('https://*.modapi.io/v1/external/discordauth', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/external/discordauth?api_key=YourApiKey");
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

    __HINT:__ If you want to overlay the mod.io site in-game with Discord authentication, we recommend you add `?portal=discord` to the end of the URL you open which will prompt the user to login with Discord. See [Web Overlay Authentication](#web-overlay-authentication) for details.

    Parameter|Type|Required|Description
    ---|---|---|---|
    discord_token|string|true|The access token of the user provided by Discord.
    email|string||The users email address (optional but recommended to help users recover lost accounts). If supplied, and the respective user does not have an email registered for their account we will send a confirmation email to confirm they have ownership of the specified email.<br><br>__NOTE__: If the user already has an email on record with us, this parameter will be ignored. This parameter should also be urlencoded before the request is sent.
    date_expires|integer||Unix timestamp of date in which the returned token will expire. Value cannot be higher than the default value which is a week (unix timestamp + 604800 seconds). Using a token after it's expiry time has elapsed will result in a `401 Unauthorized` response.
    terms_agreed|boolean||This MUST be set to `false` unless you have collected the [users agreement](#terms) prior to calling this endpoint in which case it can be set to `true` and will be recorded.<br><br>__NOTE:__ If this is set to `false` and the user has not agreed to the latest mod.io Terms of Use and Privacy Policy, an error `403 Forbidden (error_ref 11074)` will be returned and you will need to collect the [users agreement](#terms) and retry with this value set to `true` to authenticate the user.

> Example response

```json
{
  "code": 200,
  "access_token": "eyJ0eXAiOiXKV1QibCJhbLciOiJeiUzI1.....",
  "date_expires": 1570673249
}

```
<h3 id="Discord-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Access Token Object](#schemaaccess_token_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|14001|The game associated with the supplied api_key is currently not available.|[Error Object](#schemaerror_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11032|mod.io was unable to verify the credentials against the external service provider.|[Error Object](#schemaerror_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11043|mod.io was unable to get account data from the Discord servers.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11016|The api_key supplied in the request must be associated with a game.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11017|The api_key supplied in the request is for test environment purposes only and cannot be used for this functionality.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11074|The user has not agreed to the mod.io Terms of Use. Please see terms_agreed parameter description and the [Terms](#terms) endpoint for more information.|[Error Object](#schemaerror_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>
</aside>
## OpenID

> Example request

```shell
# You can also use wget
curl -X POST https://*.modapi.io/v1/external/openidauth?api_key=YourApiKey \
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'id_token=eyJhbXciOiJIUzI1Lizs....' \
  -d 'monetization_account=false'

```

```http
POST https://*.modapi.io/v1/external/openidauth?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io
Content-Type: application/x-www-form-urlencoded
Accept: application/json

```

```javascript
var headers = {
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/external/openidauth',
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
  "id_token": "eyJhbXciOiJIUzI1Lizs....",
  "monetization_account": false
}';
const headers = {
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://*.modapi.io/v1/external/openidauth?api_key=YourApiKey',
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

r = requests.post('https://*.modapi.io/v1/external/openidauth', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/external/openidauth?api_key=YourApiKey");
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

`POST /external/openidauth`

Request an access token on behalf of an OpenID identity provider. To use this method of authentication, you must configure the OpenID config in your game's authentication admin page. A Successful request will return an [Access Token Object](#access-token-object).

     __NOTE:__ The ability to authenticate players using your identity provider is a premium feature. If you are interested in accessing premium features via your games dashboard, please [contact us](mailto:developers@mod.io?subject=OpenID SSO Request).

     Parameter|Type|Required|Description
     ---|---|---|---|
     id_token|string|true|The ID token issued by the configured identity provider.
     email|string||The users email address (optional but recommended to help users recover lost accounts). If supplied, and the respective user does not have an email registered for their account we will send a confirmation email to confirm they have ownership of the specified email.<br><br>__NOTE__: If the user already has an email on record with us, this parameter will be ignored. This parameter should also be urlencoded before the request is sent.
     date_expires|integer||Unix timestamp of date in which the returned token will expire. Value cannot be higher than the default value which is a week (unix timestamp + 604800 seconds). Using a token after it's expiry time has elapsed will result in a `401 Unauthorized` response.
     terms_agreed|boolean||This MUST be set to `false` unless you have collected the [users agreement](#terms) prior to calling this endpoint in which case it can be set to `true` and will be recorded.<br><br>__NOTE:__ If this is set to `false` and the user has not agreed to the latest mod.io Terms of Use and Privacy Policy, an error `403 Forbidden (error_ref 11074)` will be returned and you will need to collect the [users agreement](#terms) and retry with this value set to `true` to authenticate the user.
     monetization_account|boolean|false|Automatically setup this user for monetization.

> Example response

```json
{
  "code": 200,
  "access_token": "eyJ0eXAiOiXKV1QibCJhbLciOiJeiUzI1.....",
  "date_expires": 1570673249
}

```
<h3 id="OpenID-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Access Token Object](#schemaaccess_token_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|14001|The game associated with the supplied api_key is currently not available.|[Error Object](#schemaerror_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11032|mod.io was unable to verify the credentials against the external service provider.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11016|The api_key supplied in the request must be associated with a game.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11017|The api_key supplied in the request is for test environment purposes only and cannot be used for this functionality.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11074|The user has not agreed to the mod.io Terms of Use. Please see terms_agreed parameter description and the [Terms](#terms) endpoint for more information.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|17053|The user account associated with this email is locked. Please contact support for assistance.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11086|You must configure your OpenID config for your game in your game authentication settings before being able to authenticate users.|[Error Object](#schemaerror_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>
</aside>
## Email Exchange
__Step 1 of 2__

> Example request

```shell
# You can also use wget
curl -X POST https://*.modapi.io/v1/oauth/emailrequest?api_key=YourApiKey \
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'email=someperson@someservice.com'

```

```http
POST https://*.modapi.io/v1/oauth/emailrequest?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io
Content-Type: application/x-www-form-urlencoded
Accept: application/json

```

```javascript
var headers = {
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/oauth/emailrequest',
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
  "email": "someperson@someservice.com"
}';
const headers = {
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://*.modapi.io/v1/oauth/emailrequest?api_key=YourApiKey',
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

r = requests.post('https://*.modapi.io/v1/oauth/emailrequest', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/oauth/emailrequest?api_key=YourApiKey");
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

`POST /oauth/emailrequest`

Request a security code for a user, identified by their e-mail which can then be [exchanged](#email) for an access token. To use this functionality you *must* use your games api_key from your games profile on mod.io. A Successful request will return a [Message Object](#message-object).

    Parameter|Type|Required|Description
    ---|---|---|---|
    email|string|true|An email address the user can access to retrieve the security code. This parameter should also be urlencoded before the request is sent.

> Example response

```json
{
  "code": 201,
  "message": "Please enter the 5-digit security code sent to your email address (someperson@someservice.com)."
}

```
<h3 id="Email-(Request)-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Email Request Response](#schemaemail_request_response)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|11017|The supplied api_key cannot be used to generate access tokens. Please replace the supplied api_key with your game's api_key to enable full privileges.|[Error Object](#schemaerror_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>
</aside>

<br>
__Step 2 of 2__


> Example request

```shell
# You can also use wget
curl -X POST https://*.modapi.io/v1/oauth/emailexchange?api_key=YourApiKey \
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'security_code=P39TM'

```

```http
POST https://*.modapi.io/v1/oauth/emailexchange?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io
Content-Type: application/x-www-form-urlencoded
Accept: application/json

```

```javascript
var headers = {
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/oauth/emailexchange',
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
  "security_code": "P39TM"
}';
const headers = {
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://*.modapi.io/v1/oauth/emailexchange?api_key=YourApiKey',
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

r = requests.post('https://*.modapi.io/v1/oauth/emailexchange', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/oauth/emailexchange?api_key=YourApiKey");
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

`POST /oauth/emailexchange`

Exchange a security code issued from the [Email Request endpoint](#email) for an access token. To use this functionality you *must* use your games api_key from your games profile on mod.io and the same api_key must be used from the original request for a security code. A Successful request will return an [Access Token Object](#access-token-object).

    Parameter|Type|Required|Description
    ---|---|---|---|
    security_code|string|true|The alpha-numeric security code.
    date_expires|integer||Unix timestamp of date in which the returned token will expire. Value cannot be higher than the default value which is a common year (unix timestamp + 31536000 seconds). Using a token after it's expiry time has elapsed will result in a `401 Unauthorized` response.

> Example response

```json
{
  "code": 200,
  "access_token": "eyJ0eXAiOiXKV1QibCJhbLciOiJeiUzI1.....",
  "date_expires": 1570673249
}

```
<h3 id="Email-(Exchange)-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Access Token Object](#schemaaccess_token_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11013|Authorization failed. You must use the same api_key for both stages of the authentication process.|[Error Object](#schemaerror_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11012|Authorization failed, security code has expired. Please request a new code.|[Error Object](#schemaerror_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11011|Authorization failed. Security code has already been redeemed.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|17053|The user account associated with this email is locked. Please contact support for assistance.|[Error Object](#schemaerror_object)
401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|11014|Authorization failed. Invalid security code.|[Error Object](#schemaerror_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>
</aside>
## Logout

> Example request

```shell
# You can also use wget
curl -X POST https://*.modapi.io/v1/oauth/logout \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/json' \ 
  -H 'Accept: application/json'

```

```http
POST https://*.modapi.io/v1/oauth/logout HTTP/1.1
Host: *.modapi.io

Accept: application/json
Authorization: Bearer {access-token}
Content-Type: application/json

```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'application/json',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/oauth/logout',
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
  'Content-Type':'application/json',
  'Accept':'application/json'

};

fetch('https://*.modapi.io/v1/oauth/logout',
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
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('https://*.modapi.io/v1/oauth/logout', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/oauth/logout");
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

`POST /oauth/logout`

Log the user out by revoking their current access token. If this request successfully completes, you should remove any tokens/cookies/cached credentials linking to the now-revoked access token so the user is required to login again through your application. Successful request will return a [Message Object](#message-object).

> Example response

```json
{
  "code": 200,
  "success": true,
  "message": "You have successfully logged out of mod.io."
}

```
<h3 id="Logout-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Web Message Object](#schemaweb_message_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
# Games

## Get Games

> Example request

```shell
# You can also use wget
curl -X GET https://*.modapi.io/v1/games?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/games?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/games',
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

fetch('https://*.modapi.io/v1/games?api_key=YourApiKey',
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

r = requests.get('https://*.modapi.io/v1/games', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games?api_key=YourApiKey");
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
    name_id|string|Path for the game on mod.io. For example: https://mod.io/g/gamename
    summary|string|Summary of the games mod support.
    instructions_url|string|Link to a mod.io guide, modding wiki or a page where modders can learn how to make and submit mods.
    ugc_name|string|Word used to describe user-generated content (mods, items, addons etc).
    presentation_option|integer|Presentation style used on the mod.io website:<br><br>__0__ = Grid View: Displays mods in a grid<br>__1__ = Table View: Displays mods in a table
    submission_option|integer|Submission process modders must follow:<br><br>__0__ = Mod uploads must occur via the API using a tool created by the game developers<br>__1__ = Mod uploads can occur from anywhere, including the website and API
    curation_option|integer|Curation option enabled by this game to approve mods:<br><br>__0__ = No curation: Mods are immediately available to play<br>__1__ = Price change approval: Pricing changes for marketplace mods queued for acceptance<br>__2__ = Full curation: All mods must be accepted by someone to be listed
    dependency_option|integer|Dependency option for this game's mods:<br><br>__0__ = Disallow dependencies<br>__1__ = Allow dependencies, mods must opt in<br>__2__ = Allow dependencies, mods must opt out<br>__3__ = Allow dependencies with no restrictions
    community_options|integer|Community features enabled for this game:<br><br>__0__ = None<br>__1__ = Enable comments<br>__2__ = Enable guides<br>__4__ = Pin on homepage<br>__8__ = Show on homepage<br>__16__ = Show more on homepage<br>__32__ = Allow change status<br>__64__ = Enable Previews (Game must be hidden)<br>__128__ = Allow Preview Share-URL (Previews must be enabled)<br>__256__ = Allow negative ratings<br>__512__ = Allow mods to be edited via web<br>__?__ = Combine to find games with multiple options enabled (see [BITWISE fields](#bitwise-and-bitwise-and))
    monetization_options|integer|Monetization options enabled for this game:<br><br>__0__ = Access to monetization features disabled<br>__1__ = Access to monetization features enabled by mod.io<br>__2__ = Marketplace enabled<br>__4__ = Creator partner program enabled<br>__8__ = Quantity limited mods supported<br>__16__ = All mods must be quantity limited<br>__?__ = Combine to find games with multiple options enabled (see [BITWISE fields](#bitwise-and-bitwise-and))
    api_access_options|integer|Level of API access allowed by this game:<br><br>__0__ = None<br>__1__ = Allow 3rd parties to access this games API endpoints<br>__2__ = Allow mods to be downloaded directly (if disabled all download URLs will contain a frequently changing verification hash to stop unauthorized use)<br>__4__ = Requires a bearer token to be supplied when attempting the download to enforce authenticated downloads only<br>__8__ = Requires a bearer token to be supplied and for the user to own the file when attempting the download<br>__?__ = Combine to find games with multiple options enabled (see [BITWISE fields](#bitwise-and-bitwise-and))
    maturity_options|integer|Mature content setup for this game:<br><br>__0__ = Don't allow mature content in mods<br>__1__ = Allow mature content in mods<br>__2__ = This game is for mature audiences only

    Display|Type|Description
    ---|---|---
    show_hidden_tags|bool|show the hidden tags associated with the given game.

    Sort|Description
    ---|---
    popular|Sort results by popularity using [_sort filter](#filtering), value should be `popular` for descending or `-popular` for ascending results.<br><br>__NOTE:__ Popularity is calculated hourly and reset daily (results are ranked from 1 to X). You should sort this column in descending order `popular` to get the top ranked results.
    downloads|Sort results by total downloads using [_sort filter](#filtering), value should be `downloads` for descending or `-downloads` for ascending results.<br><br>__NOTE:__ You should sort this column in descending order `downloads` to get the top ranked results. This filter differs from popular by filtering on the amount of downloads the game has received overall, and not just in the last 24 hours.
    mods|Sort results by total mod count using [_sort filter](#filtering), value should be `mods` for descending or `-mods` for ascending results.

> Example response

```json
{
  "data": [
    {
      "id": 2,
      "status": 1,
      "submitted_by": null,
      "date_added": 1493702614,
      "date_updated": 1499410290,
      "date_live": 1499841403,
      "presentation_option": 0,
      "submission_option": 1,
      "dependency_option": 0,
      "curation_option": 0,
      "community_options": 3,
      "monetization_options": 0,
      "monetization_team": {
        "team_id": "1"
      },
      "revenue_options": 0,
      "max_stock": 8388607,
      "api_access_options": 3,
      "maturity_options": 0,
      "ugc_name": "mods",
      "token_name": "MIO",
      "icon": {
        "filename": "icon.png",
        "original": "https://assets.modcdn.io/images/placeholder/icon.png",
        "thumb_64x64": "https://assets.modcdn.io/images/placeholder/icon.png",
        "thumb_128x128": "https://assets.modcdn.io/images/placeholder/icon.png",
        "thumb_256x256": "https://assets.modcdn.io/images/placeholder/icon.png"
      },
      "logo": {
        "filename": "card.png",
        "original": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_640x360": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
      },
      "header": {
        "filename": "modio-logo-bluedark.png",
        "original": "https://assets.modcdn.io/images/branding/modio-logo-bluedark.png"
      },
      "name": "Rogue Knight",
      "name_id": "rogue-knight",
      "summary": "Rogue Knight is a brand new 2D pixel platformer that supports custom levels and characters.",
      "instructions": "Instructions on the process to upload mods.",
      "instructions_url": "https://www.rogue-knight-game.com/modding/getting-started",
      "profile_url": "https://mod.io/g/rogue-knight",
      "other_urls": [
        {
          "label": "Our Steam Page",
          "url": "https://www.steampowered.com/2348329042"
        }
      ],
      "tag_options": [
        {
          "name": "Theme",
          "name_localized": "string",
          "type": "checkboxes",
          "tags": [
            "Horror"
          ],
          "tags_localized": {
            "Horror": "Horreur"
          },
          "tag_count_map": {
            "Horror": 52
          },
          "hidden": false,
          "locked": false
        }
      ],
      "stats": {
        "game_id": 2,
        "mods_count_total": 13,
        "mods_downloads_today": 204,
        "mods_downloads_total": 27492,
        "mods_downloads_daily_average": 1230,
        "mods_subscribers_total": 16394,
        "date_expires": 1492564103
      },
      "theme": {
        "primary": "#44bfd5",
        "dark": "#2c2c3f",
        "light": "#ffffff",
        "success": "#68D391",
        "warning": "#d6af2e",
        "danger": "#ff000e"
      },
      "platforms": [
        {
          "platform": "ps5",
          "label": "PlayStation 5",
          "moderated": true,
          "locked": true
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
curl -X GET https://*.modapi.io/v1/games/{game-id}?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/games/{game-id}?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/games/{game-id}',
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

fetch('https://*.modapi.io/v1/games/{game-id}?api_key=YourApiKey',
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

r = requests.get('https://*.modapi.io/v1/games/{game-id}', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}?api_key=YourApiKey");
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

Get a game. Successful request will return a single [Game Object](#game-object). We recommended reading the [filtering documentation](#filtering) to return only the records you want.

    Filter|Type|Description
    ---|---|---
    show_hidden_tags|bool|show the hidden tags associated with the given game.

> Example response

```json
{
  "id": 2,
  "status": 1,
  "submitted_by": null,
  "date_added": 1493702614,
  "date_updated": 1499410290,
  "date_live": 1499841403,
  "presentation_option": 0,
  "submission_option": 1,
  "dependency_option": 0,
  "curation_option": 0,
  "community_options": 3,
  "monetization_options": 0,
  "monetization_team": {
    "team_id": "1"
  },
  "revenue_options": 0,
  "max_stock": 8388607,
  "api_access_options": 3,
  "maturity_options": 0,
  "ugc_name": "mods",
  "token_name": "MIO",
  "icon": {
    "filename": "icon.png",
    "original": "https://assets.modcdn.io/images/placeholder/icon.png",
    "thumb_64x64": "https://assets.modcdn.io/images/placeholder/icon.png",
    "thumb_128x128": "https://assets.modcdn.io/images/placeholder/icon.png",
    "thumb_256x256": "https://assets.modcdn.io/images/placeholder/icon.png"
  },
  "logo": {
    "filename": "card.png",
    "original": "https://assets.modcdn.io/images/placeholder/card.png",
    "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
    "thumb_640x360": "https://assets.modcdn.io/images/placeholder/card.png",
    "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
  },
  "header": {
    "filename": "modio-logo-bluedark.png",
    "original": "https://assets.modcdn.io/images/branding/modio-logo-bluedark.png"
  },
  "name": "Rogue Knight",
  "name_id": "rogue-knight",
  "summary": "Rogue Knight is a brand new 2D pixel platformer that supports custom levels and characters.",
  "instructions": "Instructions on the process to upload mods.",
  "instructions_url": "https://www.rogue-knight-game.com/modding/getting-started",
  "profile_url": "https://mod.io/g/rogue-knight",
  "other_urls": [
    {
      "label": "Our Steam Page",
      "url": "https://www.steampowered.com/2348329042"
    }
  ],
  "tag_options": [
    {
      "name": "Theme",
      "name_localized": "string",
      "type": "checkboxes",
      "tags": [
        "Horror"
      ],
      "tags_localized": {
        "Horror": "Horreur"
      },
      "tag_count_map": {
        "Horror": 52
      },
      "hidden": false,
      "locked": false
    }
  ],
  "stats": {
    "game_id": 2,
    "mods_count_total": 13,
    "mods_downloads_today": 204,
    "mods_downloads_total": 27492,
    "mods_downloads_daily_average": 1230,
    "mods_subscribers_total": 16394,
    "date_expires": 1492564103
  },
  "theme": {
    "primary": "#44bfd5",
    "dark": "#2c2c3f",
    "light": "#ffffff",
    "success": "#68D391",
    "warning": "#d6af2e",
    "danger": "#ff000e"
  },
  "platforms": [
    {
      "platform": "ps5",
      "label": "PlayStation 5",
      "moderated": true,
      "locked": true
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
# Guides

## Get Guides

> Example request

```shell
# You can also use wget
curl -X GET https://*.modapi.io/v1/games/{game-id}/guides?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/games/{game-id}/guides?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/games/{game-id}/guides',
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

fetch('https://*.modapi.io/v1/games/{game-id}/guides?api_key=YourApiKey',
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

r = requests.get('https://*.modapi.io/v1/games/{game-id}/guides', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/guides?api_key=YourApiKey");
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

`GET /games/{game-id}/guides`

Get all guides for a game. Successful request will return an array of [Guide Objects](#get-guides-2).

    Filter|Type|Description
    ---|---|---
    id|integer|Unique id of the guide.
    game_id|integer|Unique id of the parent game.
    status|integer|Status of the guide (only game admins can filter by this field, see [status and visibility](#status-amp-visibility) for details):<br><br>__0__ = Not accepted<br>__1__ = Accepted _(default)_
    submitted_by|integer|Unique id of the user who has ownership of the guide.
    submitted_by_display_name|string|The display name of the user who has ownership  author.
    date_added|integer|Unix timestamp of date guide was registered.
    date_updated|integer|Unix timestamp of date guide was updated.
    date_live|integer|Unix timestamp of date guide was set live.
    name_id|string|Path for the guide on mod.io. For example: https://mod.io/g/gamename/r/__guide-name-id-here__
    tags|string|Comma-separated values representing the tags you want to filter the results by. If you specify multiple tags, only guides which have all tags will be returned.

    Sort|Description
    ---|---
    popular|Sort results by popularity using [_sort filter](#filtering), value should be `popular` for descending or `-popular` for ascending results.<br><br>__NOTE:__ Popularity is calculated hourly and reset daily (results are ranked from 1 to X). You should sort this column in ascending order `-popular` to get the top ranked results.
    popular_overall|Sort results by 'Popular Overall' using [_sort filter](#filtering), value should be `popular_overall` for descending or `-popular_overall` for ascending results.<br><br>__NOTE:__ You should sort this column in ascending order `-popular_overall` to get the top ranked results. This filter differs from popular by filtering on the amount of visits it has received overall, and not just in the last 24 hours.

> Example response

```json
{
  "data": [
    {
      "id": 1209,
      "game_id": 3,
      "game_name": "My Awesome Game",
      "logo": {
        "filename": "card.png",
        "original": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_640x360": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
      },
      "user": {
        "id": 1,
        "name_id": "xant",
        "username": "XanT",
        "display_name_portal": null,
        "date_online": 1509922961,
        "date_joined": 1509922961,
        "avatar": {
          "filename": "avatar.png",
          "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
          "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
          "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
        },
        "timezone": "",
        "language": "",
        "profile_url": "https://mod.io/u/xant"
      },
      "date_added": 1509922961,
      "date_updated": 1509922961,
      "date_live": 1509922961,
      "status": 1,
      "url": "https://mod.io/g/rogue-knight/r/getting-started",
      "name": "Getting Started",
      "name_id": "getting-started",
      "summary": "Alright, so let's get started with modding on mod.io",
      "description": "<h1>Getting Started</h2><p>Download this suspiciou....",
      "tags": [
        {
          "name": "Instructions",
          "date_added": 1499841487,
          "count": 22
        }
      ],
      "stats": [
        {
          "guide_id": 2,
          "visits_total": 0,
          "comments_total": 0
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
<h3 id="Get-Guides-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Get Guides](#schemaget_guides)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>, <a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
## Get Guide

> Example request

```shell
# You can also use wget
curl -X GET https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}',
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

fetch('https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}?api_key=YourApiKey',
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

r = requests.get('https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}?api_key=YourApiKey");
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

`GET /games/{game-id}/guides/{guide-id}`

Get a guide. Successful request will return a single [Guide Object](#guide-object).

> Example response

```json
{
  "id": 1209,
  "game_id": 3,
  "game_name": "My Awesome Game",
  "logo": {
    "filename": "card.png",
    "original": "https://assets.modcdn.io/images/placeholder/card.png",
    "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
    "thumb_640x360": "https://assets.modcdn.io/images/placeholder/card.png",
    "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
  },
  "user": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "display_name_portal": null,
    "date_online": 1509922961,
    "date_joined": 1509922961,
    "avatar": {
      "filename": "avatar.png",
      "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
      "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
      "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
    },
    "timezone": "",
    "language": "",
    "profile_url": "https://mod.io/u/xant"
  },
  "date_added": 1509922961,
  "date_updated": 1509922961,
  "date_live": 1509922961,
  "status": 1,
  "url": "https://mod.io/g/rogue-knight/r/getting-started",
  "name": "Getting Started",
  "name_id": "getting-started",
  "summary": "Alright, so let's get started with modding on mod.io",
  "description": "<h1>Getting Started</h2><p>Download this suspiciou....",
  "tags": [
    {
      "name": "Instructions",
      "date_added": 1499841487,
      "count": 22
    }
  ],
  "stats": [
    {
      "guide_id": 2,
      "visits_total": 0,
      "comments_total": 0
    }
  ]
}

```
<h3 id="Get-Guide-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Guide Object](#schemaguide_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>, <a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
## Add Guide

> Example request

```shell
# You can also use wget
curl -X POST https://*.modapi.io/v1/games/{game-id}/guides \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: multipart/form-data' \ 
  -H 'Content-Type: multipart/form-data' \ 
  -H 'Accept: application/json' \
  -F 'name=Modding Guide for Rogue Knight' \
  -F 'summary=Short descriptive summary here' \
  -F 'description=<h2>Getting started with..' \
  -F 'logo=@/path/to/image.jpg' \
  -F 'date_live=1626667557'

```

```http
POST https://*.modapi.io/v1/games/{game-id}/guides HTTP/1.1
Host: *.modapi.io
Content-Type: multipart/form-data
Accept: application/json
Authorization: Bearer {access-token}
Content-Type: multipart/form-data

```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'multipart/form-data',
  'Content-Type':'multipart/form-data',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/games/{game-id}/guides',
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
  "name": "Modding Guide for Rogue Knight",
  "summary": "Short descriptive summary here",
  "description": "<h2>Getting started with..",
  "logo": "@/path/to/image.jpg",
  "date_live": 1626667557
}';
const headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'multipart/form-data',
  'Content-Type':'multipart/form-data',
  'Accept':'application/json'

};

fetch('https://*.modapi.io/v1/games/{game-id}/guides',
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
  'Content-Type': 'multipart/form-data',
  'Accept': 'application/json'
}

r = requests.post('https://*.modapi.io/v1/games/{game-id}/guides', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/guides");
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

`POST /games/{game-id}/guides`

Add a guide for a game. Successful request will return a single [Guide Object](#guide-object).

    Parameter|Type|Required|Description
    ---|---|---|---|
    logo|file|true|Image file which will represent your guides logo. Must be jpg, jpeg or png format and cannot exceed 8MB in filesize. Dimensions must be at least 512x288 and we recommended you supply a high resolution image with a 16 / 9 ratio. mod.io will use this image to make three thumbnails for the dimensions 320x180, 640x360 and 1280x720.
    name|string|true|Name of your guide.
    name_id|string||Path for the guide on mod.io. For example: https://mod.io/g/gamename/r/__guide-name-id-here__. If no `name_id` is specified the `name` will be used. For example: _'Stellaris Shader Guide'_ will become _'stellaris-shader-guide'_. Cannot exceed 50 characters.
    summary|string|true|Summary for your guide, giving a brief overview of what it's about. Cannot exceed 250 characters.
    description|string||Detailed description for your guide, which can include details such as 'About', 'Features', 'Install Instructions', 'FAQ', etc. HTML supported and encouraged.
    url|string||Official homepage for your guide. Must be a valid URL.
    tags[]|string||Tags to apply to the guide. Every tag to apply requires a separate field with tags[] as the key (eg. tags[]=tag1, tags[]=tag2).
    date_live|integer||Unix timestamp of when this guide should go live. To release the guide immediately provide the current time along with the `status` value of 1. If this field is not provided and the `status` is 0, the guide will not be released.

> Example response

```json
{
  "id": 1209,
  "game_id": 3,
  "game_name": "My Awesome Game",
  "logo": {
    "filename": "card.png",
    "original": "https://assets.modcdn.io/images/placeholder/card.png",
    "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
    "thumb_640x360": "https://assets.modcdn.io/images/placeholder/card.png",
    "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
  },
  "user": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "display_name_portal": null,
    "date_online": 1509922961,
    "date_joined": 1509922961,
    "avatar": {
      "filename": "avatar.png",
      "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
      "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
      "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
    },
    "timezone": "",
    "language": "",
    "profile_url": "https://mod.io/u/xant"
  },
  "date_added": 1509922961,
  "date_updated": 1509922961,
  "date_live": 1509922961,
  "status": 1,
  "url": "https://mod.io/g/rogue-knight/r/getting-started",
  "name": "Getting Started",
  "name_id": "getting-started",
  "summary": "Alright, so let's get started with modding on mod.io",
  "description": "<h1>Getting Started</h2><p>Download this suspiciou....",
  "tags": [
    {
      "name": "Instructions",
      "date_added": 1499841487,
      "count": 22
    }
  ],
  "stats": [
    {
      "guide_id": 2,
      "visits_total": 0,
      "comments_total": 0
    }
  ]
}

```
<h3 id="Add-Guide-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)||Created|[Guide Object](#schemaguide_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|14027|The authenticated user does not have permission to add guides to this game. Ensure the user is part of the game team before attempting the request again.|[Error Object](#schemaerror_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: web)
</aside>
## Edit Guide

> Example request

```shell
# You can also use wget
curl -X POST https://*.modapi.io/v1/games/{game-id}/guides/{guide-id} \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: multipart/form-data' \ 
  -H 'Content-Type: multipart/form-data' \ 
  -H 'Accept: application/json' \
  -F 'name=Modding Guide for Rogue Knight' \
  -F 'summary=Short descriptive summary here' \
  -F 'description=<h2>Getting started with..' \
  -F 'logo=@/path/to/image.jpg' \
  -F 'date_live=1626667557'

```

```http
POST https://*.modapi.io/v1/games/{game-id}/guides/{guide-id} HTTP/1.1
Host: *.modapi.io
Content-Type: multipart/form-data
Accept: application/json
Authorization: Bearer {access-token}
Content-Type: multipart/form-data

```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'multipart/form-data',
  'Content-Type':'multipart/form-data',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}',
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
  "name": "Modding Guide for Rogue Knight",
  "summary": "Short descriptive summary here",
  "description": "<h2>Getting started with..",
  "logo": "@/path/to/image.jpg",
  "date_live": 1626667557
}';
const headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'multipart/form-data',
  'Content-Type':'multipart/form-data',
  'Accept':'application/json'

};

fetch('https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}',
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
  'Content-Type': 'multipart/form-data',
  'Accept': 'application/json'
}

r = requests.post('https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}");
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

`POST /games/{game-id}/guides/{guide-id}`

Update an existing guide. Successful request will return the updated [Guide Object](#guide-object).

    Parameter|Type|Required|Description
    ---|---|---|---|
    status|integer||Status of the guide, see [status and visibility](#status-amp-visibility) for details):<br><br>__0__ = Not accepted<br>__1__ = Accepted (game admins only)<br>__3__ = Deleted (use the [delete guide](#delete-guide) endpoint to set this status)
    logo|file||Image file which will represent your guides logo. Must be jpg, jpeg or png format and cannot exceed 8MB in filesize. Dimensions must be at least 512x288 and we recommended you supply a high resolution image with a 16 / 9 ratio. mod.io will use this image to make three thumbnails for the dimensions 320x180, 640x360 and 1280x720.
    name|string||Name of your guide.
    name_id|string||Path for the guide on mod.io. For example: https://mod.io/g/gamename/r/__guide-name-id-here__. If no `name_id` is specified the `name` will be used. For example: _'Stellaris Shader Guide'_ will become _'stellaris-shader-guide'_. Cannot exceed 50 characters.
    summary|string||Summary for your guide, giving a brief overview of what it's about. Cannot exceed 250 characters.
    description|string||Detailed description for your guide, which can include details such as 'About', 'Features', 'Install Instructions', 'FAQ', etc. HTML supported and encouraged.
    url|string||Official homepage for your guide. Must be a valid URL.
    tags[]|string||Tags to apply to the guide. Every tag to apply requires a separate field with tags[] as the key (eg. tags[]=tag1, tags[]=tag2).<br><br>__NOTE:__ When editing a guide any tags you add or remove from the existing tags list will be added/removed, so if you do not wish to remove any tags you must re-submit all existing tags.
    date_live|integer||Unix timestamp of when this guide should go live. To release the guide immediately provide the current time along with the `status` 1. If this field is not provided and the `status` is 0, the guide will not be released.

> Example response

```json
{
  "id": 1209,
  "game_id": 3,
  "game_name": "My Awesome Game",
  "logo": {
    "filename": "card.png",
    "original": "https://assets.modcdn.io/images/placeholder/card.png",
    "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
    "thumb_640x360": "https://assets.modcdn.io/images/placeholder/card.png",
    "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
  },
  "user": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "display_name_portal": null,
    "date_online": 1509922961,
    "date_joined": 1509922961,
    "avatar": {
      "filename": "avatar.png",
      "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
      "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
      "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
    },
    "timezone": "",
    "language": "",
    "profile_url": "https://mod.io/u/xant"
  },
  "date_added": 1509922961,
  "date_updated": 1509922961,
  "date_live": 1509922961,
  "status": 1,
  "url": "https://mod.io/g/rogue-knight/r/getting-started",
  "name": "Getting Started",
  "name_id": "getting-started",
  "summary": "Alright, so let's get started with modding on mod.io",
  "description": "<h1>Getting Started</h2><p>Download this suspiciou....",
  "tags": [
    {
      "name": "Instructions",
      "date_added": 1499841487,
      "count": 22
    }
  ],
  "stats": [
    {
      "guide_id": 2,
      "visits_total": 0,
      "comments_total": 0
    }
  ]
}

```
<h3 id="Edit-Guide-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||OK|[Guide Object](#schemaguide_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|14036|The authenticated user does not have permission to edit guides to this game. Ensure the user is part of the game team before attempting the request again.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|14031|The guide status cannot be changed to accepted due to the request originating from a non-site admin whilst there is a DMCA report active against the guide.|[Error Object](#schemaerror_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: web)
</aside>
## Delete Guide

> Example request

```shell
# You can also use wget
curl -X DELETE https://*.modapi.io/v1/games/{game-id}/guides/{guide-id} \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json'

```

```http
DELETE https://*.modapi.io/v1/games/{game-id}/guides/{guide-id} HTTP/1.1
Host: *.modapi.io

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
  url: 'https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}',
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

fetch('https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}',
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

r = requests.delete('https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}");
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

`DELETE /games/{game-id}/guides/{guide-id}`

Delete a guide. Successful request will return `204 No Content`.

> Example response

```json
 204 No Content 

```
<h3 id="Delete-Guide-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)||Successful Request. No Body Returned.|None
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|14028|The authenticated user does not have permission to delete guides to this game. Ensure the user is part of the game team before attempting the request again.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|14031|The guide cannot be deleted due to the request originating from a non-site admin whilst there is a DMCA report active against the guide.|[Error Object](#schemaerror_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: web)
</aside>
## Get Guides Tags

> Example request

```shell
# You can also use wget
curl -X GET https://*.modapi.io/v1/games/{game-id}/guides/tags?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/games/{game-id}/guides/tags?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/games/{game-id}/guides/tags',
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

fetch('https://*.modapi.io/v1/games/{game-id}/guides/tags?api_key=YourApiKey',
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

r = requests.get('https://*.modapi.io/v1/games/{game-id}/guides/tags', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/guides/tags?api_key=YourApiKey");
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

`GET /games/{game-id}/guides/tags`

Get all guide tags for a game. Successful request will return an array of [Guide Tag Objects](#get-guide-tags).

> Example response

```json
{
  "data": [
    {
      "name": "Instructions",
      "date_added": 1499841487,
      "count": 22
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
<h3 id="Get-Guides-Tags-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Get Guide Tags](#schemaget_guide_tags)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>, <a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
# Mods

## Get Mods

> Example request

```shell
# You can also use wget
curl -X GET https://*.modapi.io/v1/games/{game-id}/mods?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/games/{game-id}/mods?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/games/{game-id}/mods',
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

fetch('https://*.modapi.io/v1/games/{game-id}/mods?api_key=YourApiKey',
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

r = requests.get('https://*.modapi.io/v1/games/{game-id}/mods', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods?api_key=YourApiKey");
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
    visible|integer|Visibility of the mod (only game admins can filter by this field, see [status and visibility](#status-amp-visibility) for details):<br><br>__0__ = Hidden<br>__1__ = Public _(default)_
    submitted_by|integer|Unique id of the user who has ownership of the mod.
    submitted_by_display_name|string|The display name of the mod author.
    date_added|integer|Unix timestamp of date mod was registered.
    date_updated|integer|Unix timestamp of date mod was updated.
    date_live|integer|Unix timestamp of date mod was set live.
    community_options|integer|Community features enabled for this mod:<br><br>__0__ = All the options below are disabled<br>__1__ = Enable comments<br>__64__ = Enable previews<br>__128__ = Enable preview URLs<br>__1024__ = Allow dependencies<br>__?__ = Add the options you want together, to enable multiple options (see [BITWISE fields](#bitwise-and-bitwise-and))
    maturity_option|integer|Maturity options set by the mod creator:<br><br>__0__ = None<br>__1__ = Alcohol<br>__2__ = Drugs<br>__4__ = Violence<br>__8__ = Explicit<br>__?__ = Combine to find mods with multiple options enabled (see [BITWISE fields](#bitwise-and-bitwise-and))
    monetization_options|integer|Monetization options enabled for this mod:<br><br>__0__ = Access to monetization features disabled<br>__1__ = Access to monetization features enabled by the game for this mod<br>__2__ = Marketplace enabled<br>__8__ = Quantity of this mod is limited<br>__?__ = Combine to find mods with multiple options enabled (see [BITWISE fields](#bitwise-and-bitwise-and))
    name|string|Name of the mod.
    name_id|string|Path for the mod on mod.io. For example: https://mod.io/g/gamename/m/__mod-name-id-here__
    modfile|integer|Unique id of the file that is the current active release (see [mod files](#files)).
    metadata_blob|string|Metadata that is designed to be handled by the game client and is recommended to not be exposed to content creators when submitting their mods. As an example, this may include properties as to how the item works, or other information you need to display. Metadata can also be stored as searchable [key value pairs](#metadata), and to individual [mod files](#get-modfiles).
    metadata_kvp|string|Colon-separated values representing the key-value pairs you want to filter the results by. If you supply more than one key-pair, separate the pairs by a comma. Will only filter by an exact key-pair match.
    tags|string|Comma-separated values representing the tags you want to filter the results by. If you specify multiple tags, only mods which have all tags will be returned, and only tags that are supported by the parent game can be applied. To determine what tags are eligible, see the tags values within `tag_options` column on the parent [Game Object](#game-object). If you want to ensure mods returned do not contain particular tag(s), you can use the `tags-not-in` filter either independently or alongside this filter.
    platform_status|string|If the parent game has enabled per-platform files, by default only mods with files which are approved and live for the [target platform](#targeting-a-platform) will be returned.<br><br>To QA mods with pending files, you can filter results by their current platform status, using `pending_only` or `live_and_pending`.<br><br>__NOTE:__ only game admins can filter by this field.
    revenue_type|integer|Finds all mods with or without a price. Defaults to free. <br><br>__0__ = Free<br>__1__ = Paid<br>__2__ = Free and Paid
    stock|integer|Finds all mods that are in/out of stock. <br><br>__0__ = Sold Out<br>__1__ = In Stock

    Sort|Description
    ---|---
    downloads|Sort results by most downloads using [_sort filter](#filtering) parameter, value should be `downloads` for descending or `-downloads` for ascending results.
    popular|Sort results by popularity using [_sort filter](#filtering), value should be `popular` for descending or `-popular` for ascending results.<br><br>__NOTE:__ Popularity is calculated hourly and reset daily (results are ranked from 1 to X). You should sort this column in ascending order `-popular` to get the top ranked results.
    rating|Sort results by weighted rating using [_sort filter](#filtering), value should be `rating` for descending or `-rating` for ascending results.
    subscribers|Sort results by most subscribers using [_sort filter](#filtering), value should be `subscribers` for descending or `-subscribers` for ascending results.

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
        "display_name_portal": null,
        "date_online": 1509922961,
        "date_joined": 1509922961,
        "avatar": {
          "filename": "avatar.png",
          "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
          "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
          "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
        },
        "timezone": "",
        "language": "",
        "profile_url": "https://mod.io/u/xant"
      },
      "date_added": 1492564103,
      "date_updated": 1499841487,
      "date_live": 1499841403,
      "maturity_option": 0,
      "community_options": 3,
      "monetization_options": 0,
      "stock": 0,
      "price": 0,
      "tax": 0,
      "logo": {
        "filename": "card.png",
        "original": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_640x360": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
      },
      "homepage_url": "https://www.rogue-hdpack.com/",
      "name": "Rogue Knight HD Pack",
      "name_id": "rogue-knight-hd-pack",
      "summary": "It's time to bask in the glory of beautiful 4k textures!",
      "description": "<p>Rogue HD Pack does exactly what you thi...",
      "description_plaintext": "Rogue HD Pack does exactly what you thi...",
      "metadata_blob": "rogue,hd,high-res,4k,hd textures",
      "profile_url": "https://mod.io/g/rogue-knight/m/rogue-knight-hd-pack",
      "media": {
        "youtube": [
          "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        ],
        "sketchfab": [
          "https://sketchfab.com/models/ef40b2d300334d009984c8865b2db1c8"
        ],
        "images": [
          {
            "filename": "card.png",
            "original": "https://assets.modcdn.io/images/placeholder/card.png",
            "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
            "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
          }
        ]
      },
      "modfile": {
        "id": 2,
        "mod_id": 2,
        "date_added": 1499841487,
        "date_updated": 1499841487,
        "date_scanned": 1499841487,
        "virus_status": 0,
        "virus_positive": 0,
        "virustotal_hash": "",
        "filesize": 15181,
        "filesize_uncompressed": 16384,
        "filehash": {
          "md5": "2d4a0e2d7273db6b0a94b0740a88ad0d"
        },
        "filename": "rogue-knight-v1.zip",
        "version": "1.3",
        "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
        "metadata_blob": "rogue,hd,high-res,4k,hd textures",
        "download": {
          "binary_url": "https://*.modapi.io/v1/games/1/mods/1/files/1/download/c489a0354111a4d76640d47f0cdcb294",
          "date_expires": 1579316848
        },
        "platforms": [
          {
            "platform": "windows",
            "status": 1
          }
        ]
      },
      "dependencies": false,
      "platforms": [
        {
          "platform": "windows",
          "modfile_live": 1
        }
      ],
      "metadata_kvp": [
        {
          "metakey": "pistol-dmg",
          "metavalue": "800"
        }
      ],
      "tags": [
        {
          "name": "Unity",
          "name_localized": "Unity",
          "date_added": 1499841487
        }
      ],
      "stats": {
        "mod_id": 2,
        "popularity_rank_position": 13,
        "popularity_rank_total_mods": 204,
        "downloads_today": 327,
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
<h3 id="endpoint-xplatform-notice">Cross-Platform Filtering</h3>

If the parent game has platform filtering enabled, this endpoint supports the [targeting a platform](#targeting-a-platform) request header to return mods that have been approved for the requested platform. If you are a member of the parent game team, please see the `platform_status` filter for this endpoint above on how you can retrieve pending mods.

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
curl -X GET https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}',
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

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}?api_key=YourApiKey',
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

r = requests.get('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}?api_key=YourApiKey");
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
    "display_name_portal": null,
    "date_online": 1509922961,
    "date_joined": 1509922961,
    "avatar": {
      "filename": "avatar.png",
      "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
      "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
      "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
    },
    "timezone": "",
    "language": "",
    "profile_url": "https://mod.io/u/xant"
  },
  "date_added": 1492564103,
  "date_updated": 1499841487,
  "date_live": 1499841403,
  "maturity_option": 0,
  "community_options": 3,
  "monetization_options": 0,
  "stock": 0,
  "price": 0,
  "tax": 0,
  "logo": {
    "filename": "card.png",
    "original": "https://assets.modcdn.io/images/placeholder/card.png",
    "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
    "thumb_640x360": "https://assets.modcdn.io/images/placeholder/card.png",
    "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
  },
  "homepage_url": "https://www.rogue-hdpack.com/",
  "name": "Rogue Knight HD Pack",
  "name_id": "rogue-knight-hd-pack",
  "summary": "It's time to bask in the glory of beautiful 4k textures!",
  "description": "<p>Rogue HD Pack does exactly what you thi...",
  "description_plaintext": "Rogue HD Pack does exactly what you thi...",
  "metadata_blob": "rogue,hd,high-res,4k,hd textures",
  "profile_url": "https://mod.io/g/rogue-knight/m/rogue-knight-hd-pack",
  "media": {
    "youtube": [
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    ],
    "sketchfab": [
      "https://sketchfab.com/models/ef40b2d300334d009984c8865b2db1c8"
    ],
    "images": [
      {
        "filename": "card.png",
        "original": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
      }
    ]
  },
  "modfile": {
    "id": 2,
    "mod_id": 2,
    "date_added": 1499841487,
    "date_updated": 1499841487,
    "date_scanned": 1499841487,
    "virus_status": 0,
    "virus_positive": 0,
    "virustotal_hash": "",
    "filesize": 15181,
    "filesize_uncompressed": 16384,
    "filehash": {
      "md5": "2d4a0e2d7273db6b0a94b0740a88ad0d"
    },
    "filename": "rogue-knight-v1.zip",
    "version": "1.3",
    "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
    "metadata_blob": "rogue,hd,high-res,4k,hd textures",
    "download": {
      "binary_url": "https://*.modapi.io/v1/games/1/mods/1/files/1/download/c489a0354111a4d76640d47f0cdcb294",
      "date_expires": 1579316848
    },
    "platforms": [
      {
        "platform": "windows",
        "status": 1
      }
    ]
  },
  "dependencies": false,
  "platforms": [
    {
      "platform": "windows",
      "modfile_live": 1
    }
  ],
  "metadata_kvp": [
    {
      "metakey": "pistol-dmg",
      "metavalue": "800"
    }
  ],
  "tags": [
    {
      "name": "Unity",
      "name_localized": "Unity",
      "date_added": 1499841487
    }
  ],
  "stats": {
    "mod_id": 2,
    "popularity_rank_position": 13,
    "popularity_rank_total_mods": 204,
    "downloads_today": 327,
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
<h3 id="endpoint-xplatform-notice">Cross-Platform Filtering</h3>

If the parent game has platform filtering enabled, this endpoint supports the [targeting a platform](#targeting-a-platform) request header to return the [modfile](#modfile-object) within the [Mod Object](#mod-object) for the requested platform. If the request targets a platform that is invalid, the `modfile` field will be an empty object `{}`.

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
curl -X POST https://*.modapi.io/v1/games/{game-id}/mods \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: multipart/form-data' \ 
  -H 'Accept: application/json' \
  -F 'name=Graphics Overhaul Mod' \
  -F 'name_id=graphics-overhaul-mod' \
  -F 'summary=Short descriptive summary here' \
  -F 'description=<h2>Getting started with..' \
  -F 'logo=@/path/to/image.jpg' \
  -F 'homepage_url=https://www.example.com' \
  -F 'metadata_blob={"version_sig":"YXJlbnQgeW91IGlucXVpc2l0dmU="}' \
  -F 'tags[]=easy'

```

```http
POST https://*.modapi.io/v1/games/{game-id}/mods HTTP/1.1
Host: *.modapi.io
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
  url: 'https://*.modapi.io/v1/games/{game-id}/mods',
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
  "name_id": "graphics-overhaul-mod",
  "summary": "Short descriptive summary here",
  "description": "<h2>Getting started with..",
  "logo": "@/path/to/image.jpg",
  "homepage_url": "https://www.example.com",
  "metadata_blob": "{\"version_sig\":\"YXJlbnQgeW91IGlucXVpc2l0dmU=\"}",
  "tags": "easy"
}';
const headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'multipart/form-data',
  'Accept':'application/json'

};

fetch('https://*.modapi.io/v1/games/{game-id}/mods',
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

r = requests.post('https://*.modapi.io/v1/games/{game-id}/mods', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods");
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

Add a mod. Successful request will return the newly created [Mod Object](#mod-object). All content published by users on [mod.io](https://mod.io) is subject to the [Terms of Use](https://mod.io/terms/widget). It is a requirement that you provide a link to [https://mod.io/terms](https://mod.io/terms) in any place where users are submitting content to mod.io.

    __NOTE:__ By default new mods are 'not accepted' and 'public'. They can only be 'accepted' and made available via the API once a [Mod File](#add-modfile) has been uploaded. [Media](#add-mod-media), [Metadata Key Value Pairs](#add-mod-kvp-metadata) and [Dependencies](#add-mod-dependencies) can also be added after a mod profile is created.

    Parameter|Type|Required|Description
    ---|---|---|---|
    logo|file|true|Image file which will represent your mods logo. Must be jpg, jpeg or png format and cannot exceed 8MB in filesize. Dimensions must be at least 512x288 and we recommended you supply a high resolution image with a 16 / 9 ratio. mod.io will use this image to make three thumbnails for the dimensions 320x180, 640x360 and 1280x720.
    name|string|true|Name of your mod.
    name_id|string||Path for the mod on mod.io. For example: https://mod.io/g/gamename/m/__mod-name-id-here__. If no `name_id` is specified the `name` will be used. For example: _'Stellaris Shader Mod'_ will become _'stellaris-shader-mod'_. Cannot exceed 50 characters.
    summary|string|true|Summary for your mod, giving a brief overview of what it's about. Cannot exceed 250 characters.
    visible|integer||Visibility of the mod (best if this field is controlled by mod admins, see [status and visibility](#status-amp-visibility) for details):<br><br>__0__ = Hidden<br>__1__ = Public _(default)_
    description|string||Detailed description for your mod, which can include details such as 'About', 'Features', 'Install Instructions', 'FAQ', etc. HTML supported and encouraged.
    homepage_url|string||Official homepage for your mod. Must be a valid URL.
    price|int||The price of the mod.<br><br>__NOTE:__ The value of this field will be ignored if the parent game's queue is enabled (see `curation_option` field in [Game Object](#game-object)).
    stock|integer||Maximum number of times this mod can be sold. <br><br>__NOTE:__ Limited mods can be enforced by the parent game. The value of this field is not used if the parent game's or mod's limited support is disabled (see `monetization_options` field in [Game Object](#game-object)).
    maturity_option|integer||Mature content found in this mod.<br><br>__NOTE:__ The value of this field will default to 0 unless the parent game allows you to flag mature content (see `maturity_options` field in [Game Object](#game-object)). <br><br>__0__ = None _(default)_<br>__1__ = Alcohol<br>__2__ = Drugs<br>__4__ = Violence<br>__8__ = Explicit<br>__?__ = Add the options you want together, to enable multiple options (see [BITWISE fields](#bitwise-and-bitwise-and))
    community_options|integer||Community features enabled for this mod:<br><br>__0__ = All the options below are disabled<br>__1__ = Enable comments<br>__64__ = Enable previews<br>__128__ = Enable preview URLs<br>__1024__ = Allow dependencies<br>__?__ = Add the options you want together, to enable multiple options (see [BITWISE fields](#bitwise-and-bitwise-and))
    metadata_blob|string||Metadata that is designed to be handled by the game client and is recommended to not be exposed to content creators when submitting their mods. As an example, this may include properties as to how the item works, or other information you need to display. Metadata can also be stored as searchable [key value pairs](#metadata), and to individual [mod files](#get-modfiles).
    tags[]|string||Tags to apply to the mod. Every tag to apply requires a separate field with tags[] as the key (e.g. tags[]=tag1, tags[]=tag2). Only the tags pre-defined by the parent game can be applied. To determine what tags are eligible, see the tags values within `tag_options` column on the parent [Game Object](#game-object).

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
    "display_name_portal": null,
    "date_online": 1509922961,
    "date_joined": 1509922961,
    "avatar": {
      "filename": "avatar.png",
      "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
      "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
      "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
    },
    "timezone": "",
    "language": "",
    "profile_url": "https://mod.io/u/xant"
  },
  "date_added": 1492564103,
  "date_updated": 1499841487,
  "date_live": 1499841403,
  "maturity_option": 0,
  "community_options": 3,
  "monetization_options": 0,
  "stock": 0,
  "price": 0,
  "tax": 0,
  "logo": {
    "filename": "card.png",
    "original": "https://assets.modcdn.io/images/placeholder/card.png",
    "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
    "thumb_640x360": "https://assets.modcdn.io/images/placeholder/card.png",
    "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
  },
  "homepage_url": "https://www.rogue-hdpack.com/",
  "name": "Rogue Knight HD Pack",
  "name_id": "rogue-knight-hd-pack",
  "summary": "It's time to bask in the glory of beautiful 4k textures!",
  "description": "<p>Rogue HD Pack does exactly what you thi...",
  "description_plaintext": "Rogue HD Pack does exactly what you thi...",
  "metadata_blob": "rogue,hd,high-res,4k,hd textures",
  "profile_url": "https://mod.io/g/rogue-knight/m/rogue-knight-hd-pack",
  "media": {
    "youtube": [
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    ],
    "sketchfab": [
      "https://sketchfab.com/models/ef40b2d300334d009984c8865b2db1c8"
    ],
    "images": [
      {
        "filename": "card.png",
        "original": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
      }
    ]
  },
  "modfile": {
    "id": 2,
    "mod_id": 2,
    "date_added": 1499841487,
    "date_updated": 1499841487,
    "date_scanned": 1499841487,
    "virus_status": 0,
    "virus_positive": 0,
    "virustotal_hash": "",
    "filesize": 15181,
    "filesize_uncompressed": 16384,
    "filehash": {
      "md5": "2d4a0e2d7273db6b0a94b0740a88ad0d"
    },
    "filename": "rogue-knight-v1.zip",
    "version": "1.3",
    "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
    "metadata_blob": "rogue,hd,high-res,4k,hd textures",
    "download": {
      "binary_url": "https://*.modapi.io/v1/games/1/mods/1/files/1/download/c489a0354111a4d76640d47f0cdcb294",
      "date_expires": 1579316848
    },
    "platforms": [
      {
        "platform": "windows",
        "status": 1
      }
    ]
  },
  "dependencies": false,
  "platforms": [
    {
      "platform": "windows",
      "modfile_live": 1
    }
  ],
  "metadata_kvp": [
    {
      "metakey": "pistol-dmg",
      "metavalue": "800"
    }
  ],
  "tags": [
    {
      "name": "Unity",
      "name_localized": "Unity",
      "date_added": 1499841487
    }
  ],
  "stats": {
    "mod_id": 2,
    "popularity_rank_position": 13,
    "popularity_rank_total_mods": 204,
    "downloads_today": 327,
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
422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|900011|Your marketplace amount is not within the minimum or maximum amount allowed.|[Error Object](#schemaerror_object)
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
curl -X POST https://*.modapi.io/v1/games/{game-id}/mods/{mod-id} \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: multipart/form-data' \ 
  -H 'Accept: application/json' \
  -F 'name=Graphics Overhaul Mod' \
  -F 'name_id=graphics-overhaul-mod' \
  -F 'summary=Short descriptive summary here' \
  -F 'description=<h2>Getting started with..' \
  -F 'logo=@/path/to/image.jpg' \
  -F 'homepage_url=https://www.example.com' \
  -F 'metadata_blob={"version_sig":"YXJlbnQgeW91IGlucXVpc2l0dmU="}' \
  -F 'tags[]=easy'

```

```http
POST https://*.modapi.io/v1/games/{game-id}/mods/{mod-id} HTTP/1.1
Host: *.modapi.io
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
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}',
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
  "name_id": "graphics-overhaul-mod",
  "summary": "Short descriptive summary here",
  "description": "<h2>Getting started with..",
  "logo": "@/path/to/image.jpg",
  "homepage_url": "https://www.example.com",
  "metadata_blob": "{\"version_sig\":\"YXJlbnQgeW91IGlucXVpc2l0dmU=\"}",
  "tags": "easy"
}';
const headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'multipart/form-data',
  'Accept':'application/json'

};

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}',
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

r = requests.post('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}");
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

`POST /games/{game-id}/mods/{mod-id}`

Edit details for a mod. If you want to update the `logo` or media associated with this mod, you need to use the [Add Mod Media](#add-mod-media) endpoint. The same applies to [Mod Files](#add-modfile), [Metadata Key Value Pairs](#add-mod-kvp-metadata) and [Dependencies](#add-mod-dependencies) which are all managed via other endpoints. Successful request will return the updated [Mod Object](#mod-object).

    Parameter|Type|Required|Description
    ---|---|---|---|
    logo|file|true|Image file which will represent your mods logo. Must be jpg, jpeg or png format and cannot exceed 8MB in filesize. Dimensions must be at least 512x288 and we recommended you supply a high resolution image with a 16 / 9 ratio. mod.io will use this image to make three thumbnails for the dimensions 320x180, 640x360 and 1280x720.
    status|integer||Status of a mod. The mod must have at least one uploaded `modfile` to be 'accepted' (best if this field is controlled by game admins, see [status and visibility](#status-amp-visibility) for details):<br><br>__0__ = Not accepted<br>__1__ = Accepted (game admins only)<br>__3__ = Deleted (use the [delete mod](#delete-mod) endpoint to set this status)
    visible|integer||Visibility of the mod (best if this field is controlled by mod admins, see [status and visibility](#status-amp-visibility) for details):<br><br>__0__ = Hidden<br>__1__ = Public
    name|string||Name of your mod. Cannot exceed 50 characters.
    name_id|string||Path for the mod on mod.io. For example: https://mod.io/g/gamename/m/__mod-name-id-here__. Cannot exceed 50 characters.
    summary|string||Summary for your mod, giving a brief overview of what it's about. Cannot exceed 250 characters.
    description|string||Detailed description for your mod, which can include details such as 'About', 'Features', 'Install Instructions', 'FAQ', etc. HTML supported and encouraged.
    homepage_url|string||Official homepage for your mod. Must be a valid URL.
    price|int||The price of the mod.<br><br>__NOTE:__ The value of this field will be ignored if the parent game's queue is enabled (see `curation_option` field in [Game Object](#game-object)).
    stock|integer||Maximum number of times this mod can be sold. <br><br>__NOTE:__ Limited mods can be enforced by the parent game. The value of this field is not used if the parent game's or mod's limited support is disabled (see `monetization_options` field in [Game Object](#game-object)).
    monetization_options|integer||Monetization options enabled for this mod:<br><br>__0__ = Access to monetization features disabled<br>__1__ = Access to monetization features enabled by the game for this mod<br>__2__ = Marketplace enabled<br>__8__ = Quantity of this mod is limited<br>__?__ = Add the options you want together, to enable multiple features (see [BITWISE fields](#bitwise-and-bitwise-and))
    maturity_option|integer||Mature content found in this mod.<br><br>__NOTE:__ The value of this field will default to 0 unless the parent game allows you to flag mature content (see `maturity_options` field in [Game Object](#game-object)). <br><br>__0__ = None set<br>__1__ = Alcohol<br>__2__ = Drugs<br>__4__ = Violence<br>__8__ = Explicit<br>__?__ = Add the options you want together, to enable multiple options (see [BITWISE fields](#bitwise-and-bitwise-and))
    community_options|integer||Community features enabled for this mod:<br><br>__0__ = All the options below are disabled<br>__1__ = Enable comments<br>__64__ = Enable previews<br>__128__ = Enable preview URLs<br>__1024__ = Allow dependencies<br>__?__ = Add the options you want together, to enable multiple options (see [BITWISE fields](#bitwise-and-bitwise-and))
    metadata_blob|string||Metadata that is designed to be handled by the game client and is recommended to not be exposed to content creators when submitting their mods. As an example, this may include properties as to how the item works, or other information you need to display. Metadata can also be stored as searchable [key value pairs](#metadata), and to individual [mod files](#get-modfiles).
    tags[]|string||When providing this attribute, if the input array contains tags, they will entirely replace any existing tags assigned to the mod. __If an empty array is passed, all currently assigned tags will be removed__. If `null` or omitted, no changes will be made to the assigned tags. To determine what tags are eligible, see the tags values within `tag_options` column on the parent [Game Object](#game-object).

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
    "display_name_portal": null,
    "date_online": 1509922961,
    "date_joined": 1509922961,
    "avatar": {
      "filename": "avatar.png",
      "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
      "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
      "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
    },
    "timezone": "",
    "language": "",
    "profile_url": "https://mod.io/u/xant"
  },
  "date_added": 1492564103,
  "date_updated": 1499841487,
  "date_live": 1499841403,
  "maturity_option": 0,
  "community_options": 3,
  "monetization_options": 0,
  "stock": 0,
  "price": 0,
  "tax": 0,
  "logo": {
    "filename": "card.png",
    "original": "https://assets.modcdn.io/images/placeholder/card.png",
    "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
    "thumb_640x360": "https://assets.modcdn.io/images/placeholder/card.png",
    "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
  },
  "homepage_url": "https://www.rogue-hdpack.com/",
  "name": "Rogue Knight HD Pack",
  "name_id": "rogue-knight-hd-pack",
  "summary": "It's time to bask in the glory of beautiful 4k textures!",
  "description": "<p>Rogue HD Pack does exactly what you thi...",
  "description_plaintext": "Rogue HD Pack does exactly what you thi...",
  "metadata_blob": "rogue,hd,high-res,4k,hd textures",
  "profile_url": "https://mod.io/g/rogue-knight/m/rogue-knight-hd-pack",
  "media": {
    "youtube": [
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    ],
    "sketchfab": [
      "https://sketchfab.com/models/ef40b2d300334d009984c8865b2db1c8"
    ],
    "images": [
      {
        "filename": "card.png",
        "original": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
      }
    ]
  },
  "modfile": {
    "id": 2,
    "mod_id": 2,
    "date_added": 1499841487,
    "date_updated": 1499841487,
    "date_scanned": 1499841487,
    "virus_status": 0,
    "virus_positive": 0,
    "virustotal_hash": "",
    "filesize": 15181,
    "filesize_uncompressed": 16384,
    "filehash": {
      "md5": "2d4a0e2d7273db6b0a94b0740a88ad0d"
    },
    "filename": "rogue-knight-v1.zip",
    "version": "1.3",
    "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
    "metadata_blob": "rogue,hd,high-res,4k,hd textures",
    "download": {
      "binary_url": "https://*.modapi.io/v1/games/1/mods/1/files/1/download/c489a0354111a4d76640d47f0cdcb294",
      "date_expires": 1579316848
    },
    "platforms": [
      {
        "platform": "windows",
        "status": 1
      }
    ]
  },
  "dependencies": false,
  "platforms": [
    {
      "platform": "windows",
      "modfile_live": 1
    }
  ],
  "metadata_kvp": [
    {
      "metakey": "pistol-dmg",
      "metavalue": "800"
    }
  ],
  "tags": [
    {
      "name": "Unity",
      "name_localized": "Unity",
      "date_added": 1499841487
    }
  ],
  "stats": {
    "mod_id": 2,
    "popularity_rank_position": 13,
    "popularity_rank_total_mods": 204,
    "downloads_today": 327,
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
422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|900011|Your marketplace amount is not within the minimum or maximum amount allowed.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15013|The authenticated user does not have permission to update this mod. Ensure the user is part of the mod team before attempting the request again.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15014|The authenticated user does not have permission to update the maturity options for this mod, this action is restricted to team managers & administrators only.|[Error Object](#schemaerror_object)
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
curl -X DELETE https://*.modapi.io/v1/games/{game-id}/mods/{mod-id} \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json'

```

```http
DELETE https://*.modapi.io/v1/games/{game-id}/mods/{mod-id} HTTP/1.1
Host: *.modapi.io

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
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}',
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

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}',
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

r = requests.delete('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}");
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

Delete a mod profile. Successful request will return `204 No Content` and fire a __MOD_UNAVAILABLE__ event.<br><br>__NOTE:__ This will close the mod profile which means it cannot be viewed or retrieved via API requests but will still exist in-case you choose to restore it at a later date. If you wish to permanently delete a mod you have access rights to, you must do it via the [mods profile page](https://mod.io/content) on the mod.io website.

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
curl -X GET https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files',
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

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files?api_key=YourApiKey',
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

r = requests.get('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files?api_key=YourApiKey");
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

Get all files that are published for the corresponding mod. Successful request will return an array of [Modfile Objects](#get-modfiles-2). We recommended reading the [filtering documentation](#filtering) to return only the records you want.

    __NOTE:__ If the [game](#edit-game) requires mod downloads to be initiated via the API, the `binary_url` returned will contain a verification hash. This hash must be supplied to get the modfile, and will expire after a certain period of time. Saving and reusing the `binary_url` won't work in this situation given it's dynamic nature.

    Filter|Type|Description
    ---|---|---
    id|integer|Unique id of the file.
    mod_id|integer|Unique id of the mod.
    date_added|integer|Unix timestamp of date file was added.
    date_scanned|integer|Unix timestamp of date file was virus scanned.
    virus_status|integer|Current virus scan status of the file. For newly added files that have yet to be scanned this field will change frequently until a scan is complete:<br><br>__0__ = Not scanned<br>__1__ = Scan complete<br>__2__ = In progress<br>__3__ = Too large to scan<br>__4__ = File not found<br>__5__ = Error Scanning
    virus_positive|integer|Was a virus detected:<br><br>__0__ = No threats detected<br>__1__ = Flagged as malicious<br>__2__ = Flagged as containing potentially harmful files (i.e. EXEs)
    filesize|integer|Size of the file in bytes.
    filehash|string|MD5 hash of the file.
    filename|string|Filename including extension.
    version|string|Release version this file represents.
    changelog|string|Changelog for the file.
    metadata_blob|string|Metadata that is designed to be handled by the game client and is recommended to not be exposed to content creators when submitting their modfiles. As an example, this may include properties such as what version of the game this file is compatible with.
    platform_status|string|If the parent game has enabled per-platform files, by default only files which are approved and live for the [target platform](#targeting-a-platform) will be returned.<br><br>To QA pending files, you can filter results by their current platform status, using `pending_only`, `approved_only`, `live_and_approved` or `live_and_pending`. With the exception of `approved_only` and `live_and_approved` which is available to everyone, all other values are restricted to game administrators.

> Example response

```json
{
  "data": [
    {
      "id": 2,
      "mod_id": 2,
      "date_added": 1499841487,
      "date_updated": 1499841487,
      "date_scanned": 1499841487,
      "virus_status": 0,
      "virus_positive": 0,
      "virustotal_hash": "",
      "filesize": 15181,
      "filesize_uncompressed": 16384,
      "filehash": {
        "md5": "2d4a0e2d7273db6b0a94b0740a88ad0d"
      },
      "filename": "rogue-knight-v1.zip",
      "version": "1.3",
      "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
      "metadata_blob": "rogue,hd,high-res,4k,hd textures",
      "download": {
        "binary_url": "https://*.modapi.io/v1/games/1/mods/1/files/1/download/c489a0354111a4d76640d47f0cdcb294",
        "date_expires": 1579316848
      },
      "platforms": [
        {
          "platform": "windows",
          "status": 1
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
<h3 id="endpoint-xplatform-notice">Cross-Platform Filtering</h3>

If the parent game has platform filtering enabled, this endpoint supports the [targeting a platform](#targeting-a-platform) request header to return the [modfiles](#modfile-object) that are approved for the requested platform.

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
curl -X GET https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id}?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id}?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id}',
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

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id}?api_key=YourApiKey',
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

r = requests.get('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id}', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id}?api_key=YourApiKey");
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
  "date_updated": 1499841487,
  "date_scanned": 1499841487,
  "virus_status": 0,
  "virus_positive": 0,
  "virustotal_hash": "",
  "filesize": 15181,
  "filesize_uncompressed": 16384,
  "filehash": {
    "md5": "2d4a0e2d7273db6b0a94b0740a88ad0d"
  },
  "filename": "rogue-knight-v1.zip",
  "version": "1.3",
  "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
  "metadata_blob": "rogue,hd,high-res,4k,hd textures",
  "download": {
    "binary_url": "https://*.modapi.io/v1/games/1/mods/1/files/1/download/c489a0354111a4d76640d47f0cdcb294",
    "date_expires": 1579316848
  },
  "platforms": [
    {
      "platform": "windows",
      "status": 1
    }
  ]
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
curl -X POST https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: multipart/form-data' \ 
  -H 'Accept: application/json' \
  -F 'filedata=@/path/to/modfile.zip' \
  -F 'version=1.2' \
  -F 'changelog=<p>Rogue Knights v1.2.0 Changelog</p></p>New Featu...' \
  -F 'metadata_blob=client_signature:9VbZccpR' \
  -F 'platforms[]=undefined'

```

```http
POST https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files HTTP/1.1
Host: *.modapi.io
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
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files',
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
  "metadata_blob": "client_signature:9VbZccpR",
  "platforms": [
    "string"
  ]
}';
const headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'multipart/form-data',
  'Accept':'application/json'

};

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files',
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

r = requests.post('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files");
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

Upload a file for the corresponding mod. Successful request will return the newly created [Modfile Object](#modfile-object). Ensure that the release you are uploading is stable and free from any critical issues. Files are scanned upon upload, any users who upload malicious files will have their accounts closed.

    __NOTE:__ This endpoint does *not support* `input_json` even if you base64-encode your file, due to the already-large file sizes of some releases and base64-encoding inflating the filesize.

    __NOTE:__ To upload files greater than 100MB, we recommend using the [Multipart Uploads](#create-multipart-upload-session) system. This endpoint supports files up to a max of 500MB in size.

    Parameter|Type|Required|Description
    ---|---|---|---|
    filedata|file||Required if the upload_id parameter is omitted. The binary file for the release. ZIP the base folder of your mod, or if it is a collection of files which live in a pre-existing game folder, you should ZIP those files. Your file must meet the following conditions:<br><br>- File must be __zipped__ and cannot exceed __500MB__ in filesize (see [Multipart Uploads](#create-multipart-upload-session) to upload larger files)<br>- Filename's cannot contain any of the following charcters: <code>\ / ? " < > &#124; : *</code><br>- Mods which span multiple game directories are not supported unless the game manages this<br>- Mods which overwrite files are not supported unless the game manages this
    upload_id|string||Required if the filedata parameter is omitted. The UUID of a completed [multipart upload session](#complete-multipart-upload-session).
    version|string||Version of the file release (recommended format 1.0.0 - MAJOR.MINOR.PATCH).
    changelog|string||Changelog of this release.
    active|boolean||_Default value is true._ Flag this upload as the current release, this will change the `modfile` field on the parent mod to the `id` of this file after upload.<br><br>__NOTE:__ If the _active_ parameter is _true_, a [__MODFILE_CHANGED__ event](#get-mod-events) will be fired, so game clients know there is an update available for this mod.
    filehash|string||MD5 of the submitted file. When supplied the MD5 will be compared against the uploaded files MD5. If they don't match a `422 Unprocessible Entity` error will be returned.
    metadata_blob|string||Metadata that is designed to be handled by the game client and is recommended to not be exposed to content creators when submitting their modfiles. As an example, this may include properties such as what version of the game this file is compatible with.
    platforms|array|If platform filtering enabled|An array containing one or more [platforms](#targeting-a-platform) this file is targeting. Valid values can be found under the [targeting a platform](#targeting-a-platform) section.

> Example response

```json
{
  "id": 2,
  "mod_id": 2,
  "date_added": 1499841487,
  "date_updated": 1499841487,
  "date_scanned": 1499841487,
  "virus_status": 0,
  "virus_positive": 0,
  "virustotal_hash": "",
  "filesize": 15181,
  "filesize_uncompressed": 16384,
  "filehash": {
    "md5": "2d4a0e2d7273db6b0a94b0740a88ad0d"
  },
  "filename": "rogue-knight-v1.zip",
  "version": "1.3",
  "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
  "metadata_blob": "rogue,hd,high-res,4k,hd textures",
  "download": {
    "binary_url": "https://*.modapi.io/v1/games/1/mods/1/files/1/download/c489a0354111a4d76640d47f0cdcb294",
    "date_expires": 1579316848
  },
  "platforms": [
    {
      "platform": "windows",
      "status": 1
    }
  ]
}

```
<h3 id="endpoint-xplatform-notice">Cross-Platform Filtering</h3>

Cross-platform submissions are supported on this endpoint. To target particular platforms, see the `platforms` body parameter above.

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
curl -X PUT https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id} \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json'

```

```http
PUT https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id} HTTP/1.1
Host: *.modapi.io

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
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id}',
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

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id}',
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

r = requests.put('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id}', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id}");
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
    metadata_blob|string||Metadata that is designed to be handled by the game client and is recommended to not be exposed to content creators when submitting their modfiles. As an example, this may include properties such as what version of the game this file is compatible with.

> Example response

```json
{
  "id": 2,
  "mod_id": 2,
  "date_added": 1499841487,
  "date_updated": 1499841487,
  "date_scanned": 1499841487,
  "virus_status": 0,
  "virus_positive": 0,
  "virustotal_hash": "",
  "filesize": 15181,
  "filesize_uncompressed": 16384,
  "filehash": {
    "md5": "2d4a0e2d7273db6b0a94b0740a88ad0d"
  },
  "filename": "rogue-knight-v1.zip",
  "version": "1.3",
  "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
  "metadata_blob": "rogue,hd,high-res,4k,hd textures",
  "download": {
    "binary_url": "https://*.modapi.io/v1/games/1/mods/1/files/1/download/c489a0354111a4d76640d47f0cdcb294",
    "date_expires": 1579316848
  },
  "platforms": [
    {
      "platform": "windows",
      "status": 1
    }
  ]
}

```
<h3 id="endpoint-xplatform-notice">Cross-Platform Filtering</h3>

Cross-platform submissions are supported on this endpoint. If the parent game supports cross-platform modfiles, and this modfile is approved, making a request with the active parameter will set the modfile live on all approved platforms.

<h3 id="Edit-Modfile-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Update Successful|[Modfile Object](#schemamodfile_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15007|The authenticated user does not have permission to update modfiles for the specified mod, ensure the user is a team manager or administrator.|[Error Object](#schemaerror_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
## Delete Modfile

> Example request

```shell
# You can also use wget
curl -X DELETE https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id} \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json'

```

```http
DELETE https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id} HTTP/1.1
Host: *.modapi.io

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
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id}',
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

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id}',
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

r = requests.delete('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id}', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id}");
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
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15009|The live modfile for a mod cannot be deleted.|[Error Object](#schemaerror_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
## Manage Platform Status

> Example request

```shell
# You can also use wget
curl -X POST https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id}/platforms \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json'

```

```http
POST https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id}/platforms HTTP/1.1
Host: *.modapi.io

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
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id}/platforms',
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

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id}/platforms',
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

r = requests.post('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id}/platforms', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/{file-id}/platforms");
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

`POST /games/{game-id}/mods/{mod-id}/files/{file-id}/platforms`

Manage the platform status of a particular modfile. This endpoint does not set any file live, instead it allows you to approve and deny new uploads. To set a file as the *live* file for the approved platforms after you have reviewed them, you must call the [Edit Modfile](#update-modfile) with the active flag enabled.

    __NOTE:__ This is ony applicable if the parent game has cross-platform moderation enabled. A successful request will return the updated [Modfile object](#modfile-object).

    Parameter|Type|Required|Description
    ---|---|---|---|
    approved|array||An array containing one or more [platform strings](#targeting-a-platform) that the specified modfile is approved for.
    denied|array||An array containing one or more [platform strings](#targeting-a-platform) that the specified modfile is denied for. <br><br>__NOTE:__ You cannot mark a live modfile as denied, if a modfile is live the only option to remove it is to set another [existing modfile](#edit-modfile) as the live modfile for that platform, or add a [new modfile](#add-modfile).

> Example response

```json
{
  "id": 2,
  "mod_id": 2,
  "date_added": 1499841487,
  "date_updated": 1499841487,
  "date_scanned": 1499841487,
  "virus_status": 0,
  "virus_positive": 0,
  "virustotal_hash": "",
  "filesize": 15181,
  "filesize_uncompressed": 16384,
  "filehash": {
    "md5": "2d4a0e2d7273db6b0a94b0740a88ad0d"
  },
  "filename": "rogue-knight-v1.zip",
  "version": "1.3",
  "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
  "metadata_blob": "rogue,hd,high-res,4k,hd textures",
  "download": {
    "binary_url": "https://*.modapi.io/v1/games/1/mods/1/files/1/download/c489a0354111a4d76640d47f0cdcb294",
    "date_expires": 1579316848
  },
  "platforms": [
    {
      "platform": "windows",
      "status": 1
    }
  ]
}

```
<h3 id="Manage-Platform-Status-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request.|[Modfile Object](#schemamodfile_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15007|The authenticated user does not have permission to edit the platforms for the specified modfile, ensure the user is a member of parent game team.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|14037|The parent game doesn't cross-platform modfile submissions.|[Error Object](#schemaerror_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
# Files (Multipart Uploads)

## Get Multipart Upload Parts

> Example request

```shell
# You can also use wget
curl -X GET https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/multipart?api_key=YourApiKey&upload_id=123e4567-e89b-12d3-a456-426614174000 \
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/multipart?api_key=YourApiKey&upload_id=123e4567-e89b-12d3-a456-426614174000 HTTP/1.1
Host: *.modapi.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/multipart',
  method: 'get',
  data: '?api_key=YourApiKey&upload_id=123e4567-e89b-12d3-a456-426614174000',
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

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/multipart?api_key=YourApiKey&upload_id=123e4567-e89b-12d3-a456-426614174000',
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

r = requests.get('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/multipart', params={
  'api_key': 'YourApiKey',  'upload_id': '123e4567-e89b-12d3-a456-426614174000'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/multipart?api_key=YourApiKey&upload_id=123e4567-e89b-12d3-a456-426614174000");
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

`GET /games/{game-id}/mods/{mod-id}/files/multipart`

Get all uploaded parts for a corresponding upload session. Successful request will return an array of [Multipart Upload Part Objects](#get-multipart-upload-parts-2). We recommended reading the [filtering documentation](#filtering) to return only the records you want.

    Query Parameters|Required|type|Description
    ---|---|---|---|
    upload_id|true|string|The `upload_id` of the existing upload session to fetch parts already uploaded.

> Example response

```json
{
  "data": [
    {
      "upload_id": "123e4567-e89b-12d3-a456-426614174000",
      "part_number": 1,
      "part_size": 52428800,
      "date_added": 1499846132
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
<h3 id="Get-Multipart-Upload-Parts-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Get Multipart Upload Parts](#schemaget_multipart_upload_parts)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>, <a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
## Add Multipart Upload Part

> Example request

```shell
# You can also use wget
curl -X PUT https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/multipart?upload_id=123e4567-e89b-12d3-a456-426614174000 \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Range: bytes 0-52428799/209715196' \ 
  -H 'Digest: sha-256=X48E9qOokqqrvdts8nOJRJN3OWDUoyWxBf7kbu9DBPE=' \ 
  -H 'Accept: application/json'

```

```http
PUT https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/multipart?upload_id=123e4567-e89b-12d3-a456-426614174000 HTTP/1.1
Host: *.modapi.io

Accept: application/json
Authorization: Bearer {access-token}
Content-Range: bytes 0-52428799/209715196
Digest: sha-256=X48E9qOokqqrvdts8nOJRJN3OWDUoyWxBf7kbu9DBPE=

```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Range':'bytes 0-52428799/209715196',
  'Digest':'sha-256=X48E9qOokqqrvdts8nOJRJN3OWDUoyWxBf7kbu9DBPE=',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/multipart',
  method: 'put',
  data: '?upload_id=123e4567-e89b-12d3-a456-426614174000',
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
  'Content-Range':'bytes 0-52428799/209715196',
  'Digest':'sha-256=X48E9qOokqqrvdts8nOJRJN3OWDUoyWxBf7kbu9DBPE=',
  'Accept':'application/json'

};

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/multipart?upload_id=123e4567-e89b-12d3-a456-426614174000',
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
  'Content-Range': 'bytes 0-52428799/209715196',
  'Digest': 'sha-256=X48E9qOokqqrvdts8nOJRJN3OWDUoyWxBf7kbu9DBPE=',
  'Accept': 'application/json'
}

r = requests.put('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/multipart', params={
  'upload_id': '123e4567-e89b-12d3-a456-426614174000'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/multipart?upload_id=123e4567-e89b-12d3-a456-426614174000");
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

`PUT /games/{game-id}/mods/{mod-id}/files/multipart`

Add a new multipart upload part to an [existing upload session](#create-multipart-upload-session). All parts must be exactly 50MB (Mebibyte) in size unless it is the final part which can be smaller. A successful request will return a single [Multipart Upload Part Object](#multipart-upload-object).

    __NOTE__: Unlike other POST endpoints on this service, the body of this request should contain no form parameters and instead be the data described in the byte range of the Content-Range header of the request.

    Query Parameters|Required|type|Description
    ---|---|---|---|
    upload_id|true|string|The `upload_id` of the existing upload session to upload the part for.

    Header Parameters|Required|Description
    ---|---|---|---|
    Content-Range|true|The [Content-Range](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Range) of the part you are sending, in bytes.
    Digest||Optional [Digest](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Digest) for part integrity checks once the part has been uploaded.

> Example response

```json
{
  "upload_id": "123e4567-e89b-12d3-a456-426614174000",
  "part_number": 1,
  "part_size": 52428800,
  "date_added": 1499846132
}

```
<h3 id="Add-Multipart-Upload-Part-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Multipart Upload Part Object](#schemamultipart_upload_part_object)
400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|29008|The `Content-Range` header is missing from your request.|[Error Object](#schemaerror_object)
400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|29009|The unit within the Content-Range header must be of type: bytes.|[Error Object](#schemaerror_object)
400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|29010|The Content-Range header must not include wild-carded values, as they are unsupported (an asterisk cannot be included).|[Error Object](#schemaerror_object)
400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|29011|The Content-Range header contains a non numeric value.|[Error Object](#schemaerror_object)
400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|29014|The Content-Range header contains an invalid range, ensure that the finishing byte is greater than the starting byte.|[Error Object](#schemaerror_object)
400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|29012|The Content-Range header does not match the required pattern.|[Error Object](#schemaerror_object)
400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|29013|The size of the part provided is either too big, or too small.|[Error Object](#schemaerror_object)
400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|29026|The finish byte of that range must be 1 byte less than the total file size specified.|[Error Object](#schemaerror_object)
400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|29005|The Digest header contains more than one value, please ensure only the digest for the content body is provided.|[Error Object](#schemaerror_object)
400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|29006|An algorithm indicated in the Digest header is unsupported, please use one of the following algorithms instead: SHA-256, CRC32C.|[Error Object](#schemaerror_object)
400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|29015|An uploaded part with the specified start - finish byte range has already been uploaded to that session. If this is in error, you may need to abort the upload session, and start again.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15012|The authenticated user has had upload privileges restricted by mod.io admins, this is typically due to spam.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15006|The authenticated user does not have permission to upload modfiles for the specified mod, ensure the user is a team manager or administrator.|[Error Object](#schemaerror_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
## Create Multipart Upload Session

> Example request

```shell
# You can also use wget
curl -X POST https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/multipart \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'filename=testfile.zip' \
  -d 'nonce=a93d389804ee0490f1903ab26500a66a695ce65fa7ecb074d79771857d074355'

```

```http
POST https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/multipart HTTP/1.1
Host: *.modapi.io
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
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/multipart',
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
  "filename": "testfile.zip",
  "nonce": "a93d389804ee0490f1903ab26500a66a695ce65fa7ecb074d79771857d074355"
}';
const headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/multipart',
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

r = requests.post('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/multipart', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/multipart");
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

`POST /games/{game-id}/mods/{mod-id}/files/multipart`

Create a new multipart upload session. A successful request will return a single [Multipart Upload Object](#multipart-upload-object).

    __NOTE:__ The multipart upload system is designed for uploading large files up to 20GB in size. If uploading files less than 100MB, we recommend using the [Add Modfile](#add-modfile) endpoint.

    Parameter|Type|Required|Description
    ---|---|---|---|
    filename|string|true|The filename of the file once all the parts have been [uploaded](#add-multipart-upload-part). The filename must include the `.zip` extension and cannot exceed 100 characters.
    nonce|string||An optional nonce to provide to prevent duplicate upload sessions from being created concurrently. Maximum of 64 characters.

> Example response

```json
{
  "upload_id": "123e4567-e89b-12d3-a456-426614174000",
  "status": 0
}

```
<h3 id="Create-Multipart-Upload-Session-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Multipart Upload Object](#schemamultipart_upload_object)
400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|29002|The nonce you provided was already associated with a completed upload session. If you wish to start a new upload you should regenerate the nonce parameter.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15012|The authenticated user has had upload privileges restricted by mod.io admins, this is typically due to spam.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15006|The authenticated user does not have permission to upload modfiles for the specified mod, ensure the user is a team manager or administrator.|[Error Object](#schemaerror_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
## Delete Multipart Upload Session

> Example request

```shell
# You can also use wget
curl -X DELETE https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/multipart?upload_id=123e4567-e89b-12d3-a456-426614174000 \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Accept: application/json'

```

```http
DELETE https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/multipart?upload_id=123e4567-e89b-12d3-a456-426614174000 HTTP/1.1
Host: *.modapi.io

Accept: application/json
Authorization: Bearer {access-token}

```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/multipart',
  method: 'delete',
  data: '?upload_id=123e4567-e89b-12d3-a456-426614174000',
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

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/multipart?upload_id=123e4567-e89b-12d3-a456-426614174000',
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
  'Accept': 'application/json'
}

r = requests.delete('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/multipart', params={
  'upload_id': '123e4567-e89b-12d3-a456-426614174000'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/multipart?upload_id=123e4567-e89b-12d3-a456-426614174000");
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

`DELETE /games/{game-id}/mods/{mod-id}/files/multipart`

Terminate an active multipart upload session, a successful request will return `204 No Content`.

> Example response

```json
 204 No Content 

```
<h3 id="Delete-Multipart-Upload-Session-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)||Successful Request. No Body Returned.|None
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15012|The authenticated user has had upload privileges restricted by mod.io admins, this is typically due to spam.|[Error Object](#schemaerror_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
## Get Multipart Upload Sessions

> Example request

```shell
# You can also use wget
curl -X GET https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/multipart/sessions?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/multipart/sessions?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/multipart/sessions',
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

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/multipart/sessions?api_key=YourApiKey',
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

r = requests.get('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/multipart/sessions', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/multipart/sessions?api_key=YourApiKey");
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

`GET /games/{game-id}/mods/{mod-id}/files/multipart/sessions`

Get all upload sessions belonging to the authenticated user for the corresponding mod. Successful request will return an array of [Multipart Upload Part Objects](#get-multipart-upload-sessions). We recommended reading the [filtering documentation](#filtering) to return only the records you want.

    Filter|Type|Description
    ---|---|---
    status|integer|Status of the upload session:<br><br>__0__ = Incomplete (default)<br>__1__ = Pending<br>__2__ = Processing<br>__3__ = Completed<br>__4__ = Cancelled

> Example response

```json
{
  "data": [
    {
      "upload_id": "123e4567-e89b-12d3-a456-426614174000",
      "status": 0
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
<h3 id="Get-Multipart-Upload-Sessions-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Get Multipart Upload Sessions](#schemaget_multipart_upload_sessions)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15012|The authenticated user has had upload privileges restricted by mod.io admins, this is typically due to spam.|[Error Object](#schemaerror_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>, <a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
## Complete Multipart Upload Session

> Example request

```shell
# You can also use wget
curl -X POST https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/multipart/complete?upload_id=123e4567-e89b-12d3-a456-426614174000 \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Accept: application/json'

```

```http
POST https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/multipart/complete?upload_id=123e4567-e89b-12d3-a456-426614174000 HTTP/1.1
Host: *.modapi.io

Accept: application/json
Authorization: Bearer {access-token}

```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/multipart/complete',
  method: 'post',
  data: '?upload_id=123e4567-e89b-12d3-a456-426614174000',
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

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/multipart/complete?upload_id=123e4567-e89b-12d3-a456-426614174000',
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
  'Accept': 'application/json'
}

r = requests.post('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/multipart/complete', params={
  'upload_id': '123e4567-e89b-12d3-a456-426614174000'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/files/multipart/complete?upload_id=123e4567-e89b-12d3-a456-426614174000");
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

`POST /games/{game-id}/mods/{mod-id}/files/multipart/complete`

Complete an active multipart upload session, this endpoint assumes that you have already uploaded
    all individual parts. A successful request will return a `200 OK` response code and return a single [Multipart Upload Object](#multipart-upload-object).

> Example response

```json
{
  "upload_id": "123e4567-e89b-12d3-a456-426614174000",
  "status": 0
}

```
<h3 id="Complete-Multipart-Upload-Session-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Multipart Upload Object](#schemamultipart_upload_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15012|The authenticated user has had upload privileges restricted by mod.io admins, this is typically due to spam.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15006|The authenticated user does not have permission to upload modfiles for the specified mod, ensure the user is a team manager or administrator.|[Error Object](#schemaerror_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
# Subscribe

## Subscribe To Mod

> Example request

```shell
# You can also use wget
curl -X POST https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/subscribe \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'include_dependencies=false'

```

```http
POST https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/subscribe HTTP/1.1
Host: *.modapi.io
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
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/subscribe',
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
  "include_dependencies": false
}';
const headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/subscribe',
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

r = requests.post('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/subscribe', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/subscribe");
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

    Parameter|Type|Required|Description
    ---|---|---|---|
    include_dependencies|boolean|false|If the mod has dependencies, providing this attribute with a value of `true` will result in dependant mods being subscribed to as well, recursively. You should only include this attribute when the [Mod Object](#mod-object) indicates that the mod has dependencies.

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
    "display_name_portal": null,
    "date_online": 1509922961,
    "date_joined": 1509922961,
    "avatar": {
      "filename": "avatar.png",
      "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
      "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
      "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
    },
    "timezone": "",
    "language": "",
    "profile_url": "https://mod.io/u/xant"
  },
  "date_added": 1492564103,
  "date_updated": 1499841487,
  "date_live": 1499841403,
  "maturity_option": 0,
  "community_options": 3,
  "monetization_options": 0,
  "stock": 0,
  "price": 0,
  "tax": 0,
  "logo": {
    "filename": "card.png",
    "original": "https://assets.modcdn.io/images/placeholder/card.png",
    "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
    "thumb_640x360": "https://assets.modcdn.io/images/placeholder/card.png",
    "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
  },
  "homepage_url": "https://www.rogue-hdpack.com/",
  "name": "Rogue Knight HD Pack",
  "name_id": "rogue-knight-hd-pack",
  "summary": "It's time to bask in the glory of beautiful 4k textures!",
  "description": "<p>Rogue HD Pack does exactly what you thi...",
  "description_plaintext": "Rogue HD Pack does exactly what you thi...",
  "metadata_blob": "rogue,hd,high-res,4k,hd textures",
  "profile_url": "https://mod.io/g/rogue-knight/m/rogue-knight-hd-pack",
  "media": {
    "youtube": [
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    ],
    "sketchfab": [
      "https://sketchfab.com/models/ef40b2d300334d009984c8865b2db1c8"
    ],
    "images": [
      {
        "filename": "card.png",
        "original": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
      }
    ]
  },
  "modfile": {
    "id": 2,
    "mod_id": 2,
    "date_added": 1499841487,
    "date_updated": 1499841487,
    "date_scanned": 1499841487,
    "virus_status": 0,
    "virus_positive": 0,
    "virustotal_hash": "",
    "filesize": 15181,
    "filesize_uncompressed": 16384,
    "filehash": {
      "md5": "2d4a0e2d7273db6b0a94b0740a88ad0d"
    },
    "filename": "rogue-knight-v1.zip",
    "version": "1.3",
    "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
    "metadata_blob": "rogue,hd,high-res,4k,hd textures",
    "download": {
      "binary_url": "https://*.modapi.io/v1/games/1/mods/1/files/1/download/c489a0354111a4d76640d47f0cdcb294",
      "date_expires": 1579316848
    },
    "platforms": [
      {
        "platform": "windows",
        "status": 1
      }
    ]
  },
  "dependencies": false,
  "platforms": [
    {
      "platform": "windows",
      "modfile_live": 1
    }
  ],
  "metadata_kvp": [
    {
      "metakey": "pistol-dmg",
      "metavalue": "800"
    }
  ],
  "tags": [
    {
      "name": "Unity",
      "name_localized": "Unity",
      "date_added": 1499841487
    }
  ],
  "stats": {
    "mod_id": 2,
    "popularity_rank_position": 13,
    "popularity_rank_total_mods": 204,
    "downloads_today": 327,
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
<h3 id=dQw4w9WgXcQ"
    ],
    "sketchfab": [
      "https://sketchfab.com/models/ef40b2d300334d009984c8865b2db1c8"
    ],
    "images": [
      {
        "filename": "card.png",
        "original": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
      }
    ]
  },
  "modfile": {
    "id": 2,
    "mod_id": 2,
    "date_added": 1499841487,
    "date_updated": 1499841487,
    "date_scanned": 1499841487,
    "virus_status": 0,
    "virus_positive": 0,
    "virustotal_hash": "",
    "filesize": 15181,
    "filesize_uncompressed": 16384,
    "filehash": {
      "md5": "2d4a0e2d7273db6b0a94b0740a88ad0d"
    },
    "filename": "rogue-knight-v1.zip",
    "version": "1.3",
    "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
    "metadata_blob": "rogue,hd,high-res,4k,hd textures",
    "download": {
      "binary_url": "https://*.modapi.io/v1/games/1/mods/1/files/1/download/c489a0354111a4d76640d47f0cdcb294",
      "date_expires": 1579316848
    },
    "platforms": [
      {
        "platform": "windows",
        "status": 1
      }
    ]
  },
  "dependencies": false,
  "platforms": [
    {
      "platform": "windows",
      "modfile_live": 1
    }
  ],
  "metadata_kvp": [
    {
      "metakey": "pistol-dmg",
      "metavalue": "800"
    }
  ],
  "tags": [
    {
      "name": "Unity",
      "name_localized": "Unity",
      "date_added": 1499841487
    }
  ],
  "stats": {
    "mod_id": 2,
    "popularity_rank_position": 13,
    "popularity_rank_total_mods": 204,
    "downloads_today": 327,
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

<h3 id="Subscribe-To-Mod-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Already Subscribed|[Mod Object](#schemamod_object)
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)||Subscription Successful|[Mod Object](#schemamod_object)
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
curl -X DELETE https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/subscribe \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json'

```

```http
DELETE https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/subscribe HTTP/1.1
Host: *.modapi.io

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
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/subscribe',
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

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/subscribe',
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

r = requests.delete('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/subscribe', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/subscribe");
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

## Get Guide Comments

> Example request

```shell
# You can also use wget
curl -X GET https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}/comments?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}/comments?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}/comments',
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

fetch('https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}/comments?api_key=YourApiKey',
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

r = requests.get('https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}/comments', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}/comments?api_key=YourApiKey");
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

`GET /games/{game-id}/guides/{guide-id}/comments`

Get all comments posted in the guides profile. Successful request will return an array of [Comment Objects](#get-guide-comments-2). We recommended reading the [filtering documentation](#filtering) to return only the records you want.

    Filter|Type|Description
    ---|---|---
    id|integer|Unique id of the comment.
    resource_id|integer|Unique id of the resource (guide).
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
      "game_id": 2,
      "mod_id": 2,
      "resource_id": 2,
      "user": {
        "id": 1,
        "name_id": "xant",
        "username": "XanT",
        "display_name_portal": null,
        "date_online": 1509922961,
        "date_joined": 1509922961,
        "avatar": {
          "filename": "avatar.png",
          "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
          "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
          "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
        },
        "timezone": "",
        "language": "",
        "profile_url": "https://mod.io/u/xant"
      },
      "date_added": 1499841487,
      "reply_id": 0,
      "thread_position": "01",
      "karma": 1,
      "karma_guest": 0,
      "content": "Hey <a href=\"https://mod.io/u/guest\">guest</a>, you should check out this mod!",
      "options": 0
    }
  ],
  "result_count": 1,
  "result_offset": 0,
  "result_limit": 100,
  "result_total": 1
}

```
<h3 id="Get-Guide-Comments-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||OK|[Get Guide Comments](#schemaget_guide_comments)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>, <a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
## Add Guide Comment

> Example request

```shell
# You can also use wget
curl -X POST https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}/comments \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'replyid=0' \
  -d 'content=Hey @XanT, you should check out this mod!'

```

```http
POST https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}/comments HTTP/1.1
Host: *.modapi.io
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
  url: 'https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}/comments',
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

fetch('https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}/comments',
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

r = requests.post('https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}/comments', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}/comments");
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

`POST /games/{game-id}/guides/{guide-id}/comments`

Add a comment for the corresponding guide. Successful request will return the newly created [Comment Object](#comment-object) and fire a __GUIDE_COMMENT_ADDED__ event.

    Parameter|Type|Required|Description
    ---|---|---|---|
    content|string|true|Contents of the comment. You can include @mentions to users, which will notify them that they have been tagged in this comment.<br><br>__Mention Markup__<br>- Format: `@<display-name>`<br>- Example: `Hey @XanT, you should check out this guide!`
    reply_id|integer||Id of the parent comment to reply to (can be 0 if the comment is not a reply and thus will not be nested). Default is 0.

> Example response

```json
{
  "id": 2,
  "game_id": 2,
  "mod_id": 2,
  "resource_id": 2,
  "user": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "display_name_portal": null,
    "date_online": 1509922961,
    "date_joined": 1509922961,
    "avatar": {
      "filename": "avatar.png",
      "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
      "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
      "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
    },
    "timezone": "",
    "language": "",
    "profile_url": "https://mod.io/u/xant"
  },
  "date_added": 1499841487,
  "reply_id": 0,
  "thread_position": "01",
  "karma": 1,
  "karma_guest": 0,
  "content": "Hey <a href=\"https://mod.io/u/guest\">guest</a>, you should check out this mod!",
  "options": 0
}

```
<h3 id="Add-Guide-Comment-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)||Resource Created|[Comment Object](#schemacomment_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|19042|The authenticated user does not have permission to submit comments on mod.io due to their access being revoked.|[Error Object](#schemaerror_object)
### Response Headers

Status|Header|Type|Format|Description
---|---|---|---|---|
201|Location|string||URL to newly created resource

<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
## Get Guide Comment

> Example request

```shell
# You can also use wget
curl -X GET https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}/comments/{comment-id}?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}/comments/{comment-id}?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}/comments/{comment-id}',
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

fetch('https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}/comments/{comment-id}?api_key=YourApiKey',
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

r = requests.get('https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}/comments/{comment-id}', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}/comments/{comment-id}?api_key=YourApiKey");
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

`GET /games/{game-id}/guides/{guide-id}/comments/{comment-id}`

Get a Guide Comment. Successful request will return a single [Comment Object](#comment-object).

> Example response

```json
{
  "id": 2,
  "game_id": 2,
  "mod_id": 2,
  "resource_id": 2,
  "user": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "display_name_portal": null,
    "date_online": 1509922961,
    "date_joined": 1509922961,
    "avatar": {
      "filename": "avatar.png",
      "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
      "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
      "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
    },
    "timezone": "",
    "language": "",
    "profile_url": "https://mod.io/u/xant"
  },
  "date_added": 1499841487,
  "reply_id": 0,
  "thread_position": "01",
  "karma": 1,
  "karma_guest": 0,
  "content": "Hey <a href=\"https://mod.io/u/guest\">guest</a>, you should check out this mod!",
  "options": 0
}

```
<h3 id="Get-Guide-Comment-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Comment Object](#schemacomment_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>, <a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
## Update Guide Comment

> Example request

```shell
# You can also use wget
curl -X PUT https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}/comments/{comment-id} \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json'
  -d 'content=Test comment'

```

```http
PUT https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}/comments/{comment-id} HTTP/1.1
Host: *.modapi.io
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
  url: 'https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}/comments/{comment-id}',
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

fetch('https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}/comments/{comment-id}',
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

r = requests.put('https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}/comments/{comment-id}', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}/comments/{comment-id}");
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

`PUT /games/{game-id}/guides/{guide-id}/comments/{comment-id}`

Update a comment for the corresponding guide. Successful request will return the updated [Comment Object](#comment-object).

    Parameter|Type|Required|Description
    ---|---|---|---|
    content|string|true|Updated contents of the comment.

> Example response

```json
{
  "id": 2,
  "game_id": 2,
  "mod_id": 2,
  "resource_id": 2,
  "user": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "display_name_portal": null,
    "date_online": 1509922961,
    "date_joined": 1509922961,
    "avatar": {
      "filename": "avatar.png",
      "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
      "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
      "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
    },
    "timezone": "",
    "language": "",
    "profile_url": "https://mod.io/u/xant"
  },
  "date_added": 1499841487,
  "reply_id": 0,
  "thread_position": "01",
  "karma": 1,
  "karma_guest": 0,
  "content": "Hey <a href=\"https://mod.io/u/guest\">guest</a>, you should check out this mod!",
  "options": 0
}

```
<h3 id="Update-Guide-Comment-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Update Successful|[Comment Object](#schemacomment_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
## Delete Guide Comment

> Example request

```shell
# You can also use wget
curl -X DELETE https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}/comments/{comment-id} \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json'

```

```http
DELETE https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}/comments/{comment-id} HTTP/1.1
Host: *.modapi.io

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
  url: 'https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}/comments/{comment-id}',
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

fetch('https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}/comments/{comment-id}',
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

r = requests.delete('https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}/comments/{comment-id}', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}/comments/{comment-id}");
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

`DELETE /games/{game-id}/guides/{guide-id}/comments/{comment-id}`

Delete a comment from a guide profile. Successful request will return `204 No Content`  and fire a __GUIDE_COMMENT_DELETED__ event.

> Example response

```json
 204 No Content 

```
<h3 id="Delete-Guide-Comment-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)||Successful Request. No Body Returned.|None
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|19027|The authenticated user does not have permission to delete comments for this guide, this action is restricted to game team managers & administrators only.|[Error Object](#schemaerror_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
## Add Guide Comment Karma

> Example request

```shell
# You can also use wget
curl -X POST https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}/comments/{comment-id}/karma \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'karma=1'

```

```http
POST https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}/comments/{comment-id}/karma HTTP/1.1
Host: *.modapi.io
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
  url: 'https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}/comments/{comment-id}/karma',
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
  "karma": "1"
}';
const headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}/comments/{comment-id}/karma',
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

r = requests.post('https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}/comments/{comment-id}/karma', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/guides/{guide-id}/comments/{comment-id}/karma");
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

`POST /games/{game-id}/guides/{guide-id}/comments/{comment-id}/karma`

Update the Karma rating in single increments or decrements for a corresponding guide comment. Successful request will return the updated [Comment Object](#comment-object).

    Parameter|Type|Required|Description
    ---|---|---|---|
    karma|integer|true|Either 1 or -1 for positive and negative increments

> Example response

```json
{
  "id": 2,
  "game_id": 2,
  "mod_id": 2,
  "resource_id": 2,
  "user": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "display_name_portal": null,
    "date_online": 1509922961,
    "date_joined": 1509922961,
    "avatar": {
      "filename": "avatar.png",
      "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
      "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
      "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
    },
    "timezone": "",
    "language": "",
    "profile_url": "https://mod.io/u/xant"
  },
  "date_added": 1499841487,
  "reply_id": 0,
  "thread_position": "01",
  "karma": 1,
  "karma_guest": 0,
  "content": "Hey <a href=\"https://mod.io/u/guest\">guest</a>, you should check out this mod!",
  "options": 0
}

```
<h3 id="Add-Guide-Comment-Karma-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Update Successful|[Comment Object](#schemacomment_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
## Get Mod Comments

> Example request

```shell
# You can also use wget
curl -X GET https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/comments?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/comments?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/comments',
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

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/comments?api_key=YourApiKey',
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

r = requests.get('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/comments', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/comments?api_key=YourApiKey");
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
    mod_id|integer|Unique id of the parent mod. This is now deprecated and will be removed in future API versions, please use resource_id instead.
    resource_id|integer|Unique id of the resource.
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
      "game_id": 2,
      "mod_id": 2,
      "resource_id": 2,
      "user": {
        "id": 1,
        "name_id": "xant",
        "username": "XanT",
        "display_name_portal": null,
        "date_online": 1509922961,
        "date_joined": 1509922961,
        "avatar": {
          "filename": "avatar.png",
          "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
          "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
          "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
        },
        "timezone": "",
        "language": "",
        "profile_url": "https://mod.io/u/xant"
      },
      "date_added": 1499841487,
      "reply_id": 0,
      "thread_position": "01",
      "karma": 1,
      "karma_guest": 0,
      "content": "Hey <a href=\"https://mod.io/u/guest\">guest</a>, you should check out this mod!",
      "options": 0
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
curl -X POST https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/comments \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'replyid=0' \
  -d 'content=Hey @XanT, you should check out this mod!'

```

```http
POST https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/comments HTTP/1.1
Host: *.modapi.io
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
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/comments',
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

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/comments',
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

r = requests.post('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/comments', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/comments");
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
  "game_id": 2,
  "mod_id": 2,
  "resource_id": 2,
  "user": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "display_name_portal": null,
    "date_online": 1509922961,
    "date_joined": 1509922961,
    "avatar": {
      "filename": "avatar.png",
      "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
      "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
      "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
    },
    "timezone": "",
    "language": "",
    "profile_url": "https://mod.io/u/xant"
  },
  "date_added": 1499841487,
  "reply_id": 0,
  "thread_position": "01",
  "karma": 1,
  "karma_guest": 0,
  "content": "Hey <a href=\"https://mod.io/u/guest\">guest</a>, you should check out this mod!",
  "options": 0
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
curl -X GET https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}',
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

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}?api_key=YourApiKey',
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

r = requests.get('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}?api_key=YourApiKey");
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
  "game_id": 2,
  "mod_id": 2,
  "resource_id": 2,
  "user": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "display_name_portal": null,
    "date_online": 1509922961,
    "date_joined": 1509922961,
    "avatar": {
      "filename": "avatar.png",
      "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
      "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
      "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
    },
    "timezone": "",
    "language": "",
    "profile_url": "https://mod.io/u/xant"
  },
  "date_added": 1499841487,
  "reply_id": 0,
  "thread_position": "01",
  "karma": 1,
  "karma_guest": 0,
  "content": "Hey <a href=\"https://mod.io/u/guest\">guest</a>, you should check out this mod!",
  "options": 0
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
curl -X PUT https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id} \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json'
  -d 'content=Test comment'

```

```http
PUT https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id} HTTP/1.1
Host: *.modapi.io
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
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}',
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

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}',
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

r = requests.put('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}");
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
  "game_id": 2,
  "mod_id": 2,
  "resource_id": 2,
  "user": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "display_name_portal": null,
    "date_online": 1509922961,
    "date_joined": 1509922961,
    "avatar": {
      "filename": "avatar.png",
      "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
      "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
      "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
    },
    "timezone": "",
    "language": "",
    "profile_url": "https://mod.io/u/xant"
  },
  "date_added": 1499841487,
  "reply_id": 0,
  "thread_position": "01",
  "karma": 1,
  "karma_guest": 0,
  "content": "Hey <a href=\"https://mod.io/u/guest\">guest</a>, you should check out this mod!",
  "options": 0
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
curl -X DELETE https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id} \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json'

```

```http
DELETE https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id} HTTP/1.1
Host: *.modapi.io

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
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}',
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

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}',
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

r = requests.delete('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}");
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
## Add Mod Comment Karma

> Example request

```shell
# You can also use wget
curl -X POST https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}/karma \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'karma=1'

```

```http
POST https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}/karma HTTP/1.1
Host: *.modapi.io
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
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}/karma',
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
  "karma": "1"
}';
const headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}/karma',
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

r = requests.post('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}/karma', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/comments/{comment-id}/karma");
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

`POST /games/{game-id}/mods/{mod-id}/comments/{comment-id}/karma`

Update the Karma rating in single increments or decrements for a corresponding mod comment. Successful request will return the updated [Comment Object](#comment-object).

    Parameter|Type|Required|Description
    ---|---|---|---|
    karma|integer|true|Either 1 or -1 for positive and negative increments

> Example response

```json
{
  "id": 2,
  "game_id": 2,
  "mod_id": 2,
  "resource_id": 2,
  "user": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "display_name_portal": null,
    "date_online": 1509922961,
    "date_joined": 1509922961,
    "avatar": {
      "filename": "avatar.png",
      "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
      "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
      "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
    },
    "timezone": "",
    "language": "",
    "profile_url": "https://mod.io/u/xant"
  },
  "date_added": 1499841487,
  "reply_id": 0,
  "thread_position": "01",
  "karma": 1,
  "karma_guest": 0,
  "content": "Hey <a href=\"https://mod.io/u/guest\">guest</a>, you should check out this mod!",
  "options": 0
}

```
<h3 id="Add-Mod-Comment-Karma-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Update Successful|[Comment Object](#schemacomment_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
# Media

## Add Game Media

> Example request

```shell
# You can also use wget
curl -X POST https://*.modapi.io/v1/games/{game-id}/media \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: multipart/form-data' \ 
  -H 'Accept: application/json' \
  -d 'redirect_uris[]=undefined'

```

```http
POST https://*.modapi.io/v1/games/{game-id}/media HTTP/1.1
Host: *.modapi.io
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
  url: 'https://*.modapi.io/v1/games/{game-id}/media',
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
  "redirect_uris": [
    "string"
  ]
}';
const headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'multipart/form-data',
  'Accept':'application/json'

};

fetch('https://*.modapi.io/v1/games/{game-id}/media',
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

r = requests.post('https://*.modapi.io/v1/games/{game-id}/media', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/media");
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

    __NOTE:__ You can also add media to [your game's profile](https://mod.io/content) on the mod.io website. This is the recommended approach.

    Parameter|Type|Required|Description
    ---|---|---|---|
    logo|file||Image file which will represent your games logo. Must be jpg, jpeg or png format and cannot exceed 8MB in filesize. Dimensions must be at least 640x360 and we recommended you supply a high resolution image with a 16 / 9 ratio. mod.io will use this logo to create three thumbnails with the dimensions of 320x180, 640x360 and 1280x720.
    icon|file||Image file which will represent your games icon. Must be jpg, jpeg or png format and cannot exceed 1MB in filesize. Dimensions must be at least 64x64 and a transparent png that works on a colorful background is recommended. mod.io will use this icon to create three thumbnails with the dimensions of 64x64, 128x128 and 256x256.
    header|file||Image file which will represent your games header. Must be jpg, jpeg or png format and cannot exceed 256KB in filesize. Dimensions of 400x100 and a light transparent png that works on a dark background is recommended.

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
curl -X POST https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/media \
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
POST https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/media HTTP/1.1
Host: *.modapi.io
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
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/media',
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

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/media',
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

r = requests.post('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/media', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/media");
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

    __NOTE:__ You can also add media to [your mod's profile](https://mod.io/content) on the mod.io website. This is the easiest way.

    Parameter|Type|Required|Description
    ---|---|---|---|
    logo|file||Image file which will represent your mods logo. Must be jpg, jpeg or png format and cannot exceed 8MB in filesize. Dimensions must be at least 512x288 and we recommended you supply a high resolution image with a 16 / 9 ratio. mod.io will use this logo to create three thumbnails with the dimensions of 320x180, 640x360 and 1280x720.
    images|zip||Zip archive of images to add to the mods gallery. Only valid jpg, jpeg and png images in the zip file will be processed. The filename __must be images.zip__ all other zips will be ignored. Alternatively you can POST one or more images to this endpoint and they will be detected and added to the mods gallery.
    youtube[]|string||Full Youtube link(s) you want to add. Every Youtube link to add requires a separate field with youtube[] as the key (eg. youtube[]=https://www.youtube.com/watch?v=IGVZOLV9SPo, youtube[]=https://www.youtube.com/watch?v=5nY6fjZ3EUc)
    sketchfab[]|string||Full Sketchfab link(s) you want to add. Every Sketchfab link to add requires a separate field with sketchfab[] as the key (eg. sketchfab[]=https://sketchfab.com/models/71f04e390ff54e5f8d9a51b4e1caab7e, sketchfab[]=https://sketchfab.com/models/5c85e649dd854cb58c2b9af081ebb0ff)

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
curl -X DELETE https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/media \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'images[]=filename.jpg' \
  -d 'youtube[]=https://www.youtube.com/watch?v=dQw4w9WgXcQ' \
  -d 'sketchfab[]=https://sketchfab.com/models/7793b895f27841f4930e6b71f75a8d74'

```

```http
DELETE https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/media HTTP/1.1
Host: *.modapi.io
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
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/media',
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

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/media',
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

r = requests.delete('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/media', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/media");
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

    __NOTE:__ You can also delete media from [your mod's profile](https://mod.io/content) on the mod.io website. This is the easiest way.

    Parameter|Type|Required|Description
    ---|---|---|---|
    images[]|string||Filename of the image(s) you want to delete. Every image to delete requires a separate field with images[] as the key (eg. images[]=filename1.jpg, images[]=filename2.jpg)
    youtube[]|string||Full Youtube link(s) you want to delete. Every Youtube link to delete requires a separate field with youtube[] as the key (eg. youtube[]=https://www.youtube.com/watch?v=IGVZOLV9SPo, youtube[]=https://www.youtube.com/watch?v=5nY6fjZ3EUc)
    sketchfab[]|string||Full Sketchfab link(s) you want to delete. Every Sketchfab link to delete requires a separate field with sketchfab[] as the key (eg. sketchfab[]=https://sketchfab.com/models/71f04e390ff54e5f8d9a51b4e1caab7e, sketchfab[]=https://sketchfab.com/models/5c85e649dd854cb58c2b9af081ebb0ff)

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
## Reorder Mod Media

> Example request

```shell
# You can also use wget
curl -X PUT https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/media/reorder \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json'
  -d 'images[]=filename.jpg' \
  -d 'youtube[]=https://www.youtube.com/watch?v=dQw4w9WgXcQ' \
  -d 'sketchfab[]=https://sketchfab.com/models/7793b895f27841f4930e6b71f75a8d74'

```

```http
PUT https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/media/reorder HTTP/1.1
Host: *.modapi.io
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
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/media/reorder',
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
  "images": "filename.jpg",
  "youtube": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "sketchfab": "https://sketchfab.com/models/7793b895f27841f4930e6b71f75a8d74"
}';
const headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/media/reorder',
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

r = requests.put('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/media/reorder', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/media/reorder");
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

`PUT /games/{game-id}/mods/{mod-id}/media/reorder`

Reorder images, sketchfab or youtube links from a mod profile. Successful request will return `204 No Content`.

    __NOTE:__ You can only reorder existing media, any differences in the media arrays will result in a `400 Bad Request` response.

    Parameter|Type|Required|Description
    ---|---|---|---|
    images[]|string||Filename of the image(s) you want to reorder. Every image to delete requires a separate field with images[] as the key (eg. images[]=filename1.jpg, images[]=filename2.jpg)
    youtube[]|string||Full Youtube link(s) you want to reorder. Every Youtube link to delete requires a separate field with youtube[] as the key (eg. youtube[]=https://www.youtube.com/watch?v=IGVZOLV9SPo, youtube[]=https://www.youtube.com/watch?v=5nY6fjZ3EUc)
    sketchfab[]|string||Full Sketchfab link(s) you want to reorder. Every Sketchfab link to delete requires a separate field with sketchfab[] as the key (eg. sketchfab[]=https://sketchfab.com/models/71f04e390ff54e5f8d9a51b4e1caab7e, sketchfab[]=https://sketchfab.com/models/5c85e649dd854cb58c2b9af081ebb0ff)

> Example response

```json
 204 No Content 

```
<h3 id="Reorder-Mod-Media-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)||Successful Request. No Body Returned.|None
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15036|The authenticated user does not have permission to delete media from this mod, this action is restricted to team managers & administrators only.|[Error Object](#schemaerror_object)
400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|15064|The request body contains media that does not exist on the mod, you can only reorder existing media.|[Error Object](#schemaerror_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
# Events

## Get Mods Events

> Example request

```shell
# You can also use wget
curl -X GET https://*.modapi.io/v1/games/{game-id}/mods/events?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/games/{game-id}/mods/events?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/events',
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

fetch('https://*.modapi.io/v1/games/{game-id}/mods/events?api_key=YourApiKey',
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

r = requests.get('https://*.modapi.io/v1/games/{game-id}/mods/events', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/events?api_key=YourApiKey");
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

Get all mods events for the corresponding game sorted by latest event first. Successful request will return an array of [Event Objects](#get-mod-events-2).

    __NOTE:__ We recommend you poll this endpoint to keep mods up-to-date. If polling this endpoint for updates you should store the `id` or `date_added` of the latest event, and on subsequent requests use that information [in the filter](#filtering), to return only newer events to process.

    Filter|Type|Description
    ---|---|---
    id|integer|Unique id of the event object.
    mod_id|integer|Unique id of the parent mod.
    user_id|integer|Unique id of the user who performed the action.
    date_added|integer|Unix timestamp of date mod event occurred.
    event_type|string|Type of change that occurred:<br><br>__MODFILE_CHANGED__ = Live file changed<br>__MOD_AVAILABLE__ = Mod is marked as accepted and public<br>__MOD_UNAVAILABLE__ = Mod is marked as not accepted, deleted or hidden<br>__MOD_EDITED__ = The mod was updated (triggered when any column value changes)<br>__MOD_DELETED__ = The mod has been permanently erased. This is an orphan record, looking up this id will return no data<br>__MOD_TEAM_CHANGED__ = A user has joined or left the mod team<br>__MOD_COMMENT_ADDED__ = A comment has been published for a mod<br>__MOD_COMMENT_DELETED__ = A comment has been deleted from a mod
    latest|boolean|_Default value is true_. Returns only the latest unique events, which is useful for checking if the live `modfile` has changed.
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
curl -X GET https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/events?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/events?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/events',
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

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/events?api_key=YourApiKey',
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

r = requests.get('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/events', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/events?api_key=YourApiKey");
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

## Get Game Tag Options

> Example request

```shell
# You can also use wget
curl -X GET https://*.modapi.io/v1/games/{game-id}/tags?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/games/{game-id}/tags?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/games/{game-id}/tags',
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

fetch('https://*.modapi.io/v1/games/{game-id}/tags?api_key=YourApiKey',
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

r = requests.get('https://*.modapi.io/v1/games/{game-id}/tags', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/tags?api_key=YourApiKey");
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
      "name_localization": {
        "en": "Difficulty",
        "de": "",
        "fr": ""
      },
      "type": "checkboxes",
      "tags": [
        "Horror"
      ],
      "tags_localization": [
        {
          "tag": "string",
          "translations": {
            "en": "",
            "de": "",
            "fr": ""
          }
        }
      ],
      "tag_count_map": {
        "Horror": 52
      },
      "hidden": false,
      "locked": false
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
## Get Mod Tags

> Example request

```shell
# You can also use wget
curl -X GET https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/tags?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/tags?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/tags',
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

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/tags?api_key=YourApiKey',
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

r = requests.get('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/tags', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/tags?api_key=YourApiKey");
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
      "name_localized": "Unity",
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
curl -X POST https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/tags \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'tags[]=easy'

```

```http
POST https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/tags HTTP/1.1
Host: *.modapi.io
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
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/tags',
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

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/tags',
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

r = requests.post('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/tags', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/tags");
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
    tags[]|string|true|Tags to apply to the mod. Every tag to apply requires a separate field with tags[] as the key (eg. tags[]=tag1, tags[]=tag2). Only the tags pre-defined by the parent game can be applied. To determine what tags are eligible, see the tags values within `tag_options` column on the parent [Game Object](#game-object).

> Example response

```json
{
  "code": 200,
  "message": "Your request was successful."
}

```
<h3 id="Add-Mod-Tags-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)||Created|[Message Object](#schemamessage_object)
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
curl -X DELETE https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/tags \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'tags[]=easy'

```

```http
DELETE https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/tags HTTP/1.1
Host: *.modapi.io
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
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/tags',
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

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/tags',
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

r = requests.delete('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/tags', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/tags");
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
    tags[]|string|true|Tags to delete from the mod's profile. Every tag to delete requires a separate field with tags[] as the key (eg. tags[]=tag1, tags[]=tag2).

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
# Ratings

## Add Mod Rating

> Example request

```shell
# You can also use wget
curl -X POST https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/ratings \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'rating=1'

```

```http
POST https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/ratings HTTP/1.1
Host: *.modapi.io
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
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/ratings',
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

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/ratings',
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

r = requests.post('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/ratings', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/ratings");
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
    rating|integer|true|The _authenticated users_ mod rating:<br><br>__1__ = Positive rating (thumbs up)<br>__-1__ = Negative rating (thumbs down)<br>__0__ = No rating (removes any previous submitted rating)

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
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)||Created|[Message Object](#message-object)
400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|15028|The authenticated user has already submitted a rating for this mod.|[Error Object](#schemaerror_object)
400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|15043|The authenticated user is trying to revert a rating that doesn't exist.|[Error Object](#schemaerror_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
# Stats

## Get Game Stats

> Example request

```shell
# You can also use wget
curl -X GET https://*.modapi.io/v1/games/{game-id}/stats?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/games/{game-id}/stats?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/games/{game-id}/stats',
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

fetch('https://*.modapi.io/v1/games/{game-id}/stats?api_key=YourApiKey',
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

r = requests.get('https://*.modapi.io/v1/games/{game-id}/stats', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/stats?api_key=YourApiKey");
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
## Get Mods Stats

> Example request

```shell
# You can also use wget
curl -X GET https://*.modapi.io/v1/games/{game-id}/mods/stats?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/games/{game-id}/mods/stats?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/stats',
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

fetch('https://*.modapi.io/v1/games/{game-id}/mods/stats?api_key=YourApiKey',
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

r = requests.get('https://*.modapi.io/v1/games/{game-id}/mods/stats', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/stats?api_key=YourApiKey");
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

Get all mod stats for mods of the corresponding game. Successful request will return an array of [Mod Stats Objects](#get-mod-stats).

    __NOTE:__ We highly recommend you apply filters to this endpoint to get only the results you need. For more information regarding filtering please see the [filtering](#filtering) section.

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
      "downloads_today": 327,
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
curl -X GET https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/stats?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/stats?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/stats',
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

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/stats?api_key=YourApiKey',
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

r = requests.get('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/stats', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/stats?api_key=YourApiKey");
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
  "downloads_today": 327,
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
# Metadata

## Get Mod KVP Metadata

> Example request

```shell
# You can also use wget
curl -X GET https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp',
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

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp?api_key=YourApiKey',
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

r = requests.get('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp?api_key=YourApiKey");
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
curl -X POST https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'metadata[]=pistol-dmg:88:400'

```

```http
POST https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp HTTP/1.1
Host: *.modapi.io
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
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp',
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

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp',
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

r = requests.post('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp");
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

Add metadata for this mod as searchable key value pairs. Metadata is useful to define how a mod works, or other information you need to display and manage the mod. Successful request will return [Message Object](#message-object).<br><br>For example: A mod might change gravity and the rate of fire of weapons, you could define these properties as key value pairs. We recommend the mod upload tool you create defines and submits metadata behind the scenes, because if these settings affect gameplay, invalid information may cause problems.

    __NOTE:__ Metadata can also be stored as `metadata_blob` in the [Mod Object](#mod-object).

    Parameter|Type|Required|Description
    ---|---|---|---|
    metadata[]|string|true|Key value pairs you want to add where the the key and value are separated by a colon ':'. Every pair to add requires a separate field with metadata[] as the key (eg. metadata[]=pistol-dmg:800, metadata[]=gravity:9.8).<br><br>__NOTE:__ If the string contains multiple colons the split will occur on the first matched, eg. sword-speed-power:100:10 will become key: `sword-speed-power`, value: `100:10`). The following restrictions apply to the supplied metadata:<br><br>- Keys support alphanumeric, '_' and '-' characters only.<br>- Keys can map to multiple values (1-to-many relationship).<br>- Keys and values cannot exceed 255 characters in length.<br>- Key value pairs are searchable by exact match only.

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
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15013|The authenticated user does not have permission to update this mod. Ensure the user is part of the mod team before attempting the request again.|[Error Object](#schemaerror_object)
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
curl -X DELETE https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'metadata[]=pistol-dmg:88:400'

```

```http
DELETE https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp HTTP/1.1
Host: *.modapi.io
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
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp',
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

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp',
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

r = requests.delete('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/metadatakvp");
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
     metadata[]|string|true|Key value pairs you want to delete where the the key and value are separated by a colon ':'. Every pair to delete requires a separate field with metadata[] as the key (eg. metadata[]=pistol-dmg:800, metadata[]=gravity:9.8).<br><br>__NOTE:__ If the string contains only the key and no colon ':', _all_ metadata with that key will be removed.

> Example response

```json
 204 No Content 

```
<h3 id="Delete-Mod-KVP-Metadata-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)||Successful Request. No Body Returned.|None
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15013|The authenticated user does not have permission to delete metadata from this mod, this action is restricted to team managers & administrators only.|[Error Object](#schemaerror_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
# Dependencies

## Get Mod Dependencies

> Example request

```shell
# You can also use wget
curl -X GET https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/dependencies?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/dependencies?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/dependencies',
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

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/dependencies?api_key=YourApiKey',
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

r = requests.get('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/dependencies', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/dependencies?api_key=YourApiKey");
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

    __NOTE:__ This endpoint returns all mod dependencies, irrespective of their status, visibility or platform support. If your game automatically installs dependencies, we recommend moderating the use of this feature strictly, to ensure creators are not selecting _soft_ dependencies to promote or credit other mods, and dependencies are checked for suitability prior to install.

    For example: the official mod.io plugins where dependency support is enabled, typically subscribe users to all dependencies, so the mods suitability and synchronization can be managed by the subscription process. Following a similar process is recommend, particularly if enabling `recursive` dependency fetching, given it can result in many mods being returned.

    __DEPRECATION WARNING__: By default, this endpoint does not return dependencies recursively. However, in a future version of the API, dependencies _will_ be shown recursively by default. We suggest that you remove any custom implementation you may have in order to retrieve dependencies recursively, and instead use the `?recursive=true` query parameter to fetch all dependencies in a single request.

    Filter|Type|Description
    ---|---|---
    recursive|boolean|Recommended. Include child dependencies in a recursive manner. A value of `true` will display dependencies up to a maximum depth of 5. A value of `false` will only display immediate dependencies.<br><br>Defaults to `false`.<br><br>__NOTE:__ This will be enabled by default in API v2.

> Example response

```json
{
  "data": [
    {}
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
curl -X POST https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/dependencies \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'dependencies[]=284'

```

```http
POST https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/dependencies HTTP/1.1
Host: *.modapi.io
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
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/dependencies',
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

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/dependencies',
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

r = requests.post('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/dependencies', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/dependencies");
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
    dependencies[]|integer|true|One or more mod IDs that this mod is dependent on. Every dependency to add requires a separate field with dependencies[] as the key (eg. dependencies[]=1, dependencies[]=2). Max of 5 dependencies per request.

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
curl -X DELETE https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/dependencies \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'dependencies[]=284'

```

```http
DELETE https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/dependencies HTTP/1.1
Host: *.modapi.io
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
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/dependencies',
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

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/dependencies',
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

r = requests.delete('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/dependencies', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/dependencies");
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
    dependencies[]|integer|true|One or more mod IDs you want to delete as a dependency. Every dependency to delete requires a separate field with dependencies[] as the key (eg. dependencies[]=1, dependencies[]=2).

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
## Get Mod Dependants

> Example request

```shell
# You can also use wget
curl -X GET https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/dependants?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/dependants?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/dependants',
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

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/dependants?api_key=YourApiKey',
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

r = requests.get('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/dependants', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/dependants?api_key=YourApiKey");
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

`GET /games/{game-id}/mods/{mod-id}/dependants`

Get all mods depending on the given mod. Successful request will return an array of [Mod Dependants Objects](#get-mod-dependants-2).

     __NOTE:__ This endpoint returns all mod dependents, irrespective of their status, visibility or platform support.

> Example response

```json
{
  "data": [
    {
      "mod_id": 231,
      "name": "Example Mod",
      "name_id": "rogue-knight-hd-pack",
      "status": 1,
      "visible": 1,
      "date_added": 1499841487,
      "date_updated": 1499841487,
      "logo": {
        "filename": "card.png",
        "original": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_640x360": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
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
<h3 id="Get-Mod-Dependants-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Get Mod Dependants](#schemaget_mod_dependants)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>, <a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
# Teams

## Get Mod Team Members

> Example request

```shell
# You can also use wget
curl -X GET https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/team?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/team?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/team',
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

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/team?api_key=YourApiKey',
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

r = requests.get('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/team', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/team?api_key=YourApiKey");
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
     username|string|Display name of the user.
     level|integer|Level of permission the user has:<br><br>__1__ = Moderator (can moderate comments and content attached)<br>__4__ = Manager (moderator access, including uploading builds and editing settings except supply and team members)<br>__8__ = Administrator (full access, including editing the supply and team)
     date_added|integer|Unix timestamp of the date the user was added to the team.
     pending|integer|Has the user accepted the team invite?<br><br>__0__ = Accepted<br>__1__ = Pending

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
        "display_name_portal": null,
        "date_online": 1509922961,
        "date_joined": 1509922961,
        "avatar": {
          "filename": "avatar.png",
          "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
          "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
          "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
        },
        "timezone": "",
        "language": "",
        "profile_url": "https://mod.io/u/xant"
      },
      "level": 8,
      "date_added": 1492058857,
      "position": "Turret Builder",
      "invite_pending": 1
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
# Reports

## Submit Report

> Example request

```shell
# You can also use wget
curl -X POST https://*.modapi.io/v1/report \
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
POST https://*.modapi.io/v1/report HTTP/1.1
Host: *.modapi.io
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
  url: 'https://*.modapi.io/v1/report',
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

fetch('https://*.modapi.io/v1/report',
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

r = requests.post('https://*.modapi.io/v1/report', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/report");
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

The purpose of this endpoint is enable users to report a resource (game, mod or user) on mod.io. Successful request will return [Message Object](#message-object).

    __IMPORTANT:__ It is a requirement of the [Game Terms](https://mod.io/gameterms) with mod.io, and the platforms mod.io is used on (including but not limited to Steam, PlayStation, Nintendo and Xbox), to ensure all displayed content is reportable by users. You can enable a resource to be reported (by implementing a dialog similar to the example below) or linking to the report page on mod.io.

    __Example Dialog:__

    <aside class='consent'>Report content that is not working, or violates the mod.io Terms of Use using the form below. If you’d like to report Copyright Infringement and are the Copyright holder, select "<a href='#' class='toggledmca'>DMCA</a>" as the report type.<br><br>Be aware all details provided will be shared with mod.io staff and the games moderators for review, and maybe shared with the content creator.<br><br><label>__Reason for reporting*__<br><select class='checkdmca' required><option value='' selected></option><option value='1'>DMCA</option><option value='2'>Not working</option><option value='3'>Rude content</option><option value='4'>Illegal content</option><option value='5'>Stolen content</option><option value='6'>False information</option><option value='7'>Other</option></select></label><br><br><label>__Email__<br>Optional, if you wish to be contacted if necessary regarding your report.<br><input type='email' class='text'></label><br><br><label class='dmca' style='display: none'>__Company or name whose IP is being infringed__<br><input type='text' class='text'><br><br></label><label>__Details of your report*__<br>To help process your report, include all relevant information and links.<br><textarea cols='80' rows='3' style='width: 100%' required></textarea></label><br><br><label class='dmca checkbox' style='display: none'><input type='checkbox'> I certify that I am the copyright owner or I am authorized to act on the copyright owner's behalf in this situation.<br><br></label><label class='dmca checkbox' style='display: none'><input type='checkbox'> I certify that all material in this claim is correct and not authorized by the copyright owner, its agent, or the law.<br><br></label><div style='text-align:center'><span class='versionwrap cursor'> &nbsp; &nbsp; Submit Report &nbsp; &nbsp; </span> <span class='versionwrap outline cursor'>Cancel</span><br><br>[Terms of Use](https://mod.io/terms/widget) - [Privacy Policy](https://mod.io/privacy/widget)<br></div></aside>

    __NOTE:__ If implementing your own report dialog, the Terms of Use and Privacy Policy must be correctly linked, or displayed inline using the [agreements endpoints](#agreements) to get the latest versions.

    If you wish to display the agreements in a web browser overlay, we recommend adding __/widget__ and __?no_links=true__ to the end of the agreement URLs, to remove the menus and external links, for example:

    - [https://mod.io/terms`/widget?no_links=true`](https://mod.io/terms/widget?no_links=true)<br>
    - [https://mod.io/privacy`/widget?no_links=true`](https://mod.io/privacy/widget?no_links=true)

    __NOTE:__ If you prefer to display the report page in a web browser overlay, and you know the resource you want to report, the best URL to use is: __https://mod.io/report/`resource`/`id`/widget__

    For example to report a mod with an ID of 1 the URL would be: [https://mod.io/report/`mods`/`1`/widget](https://mod.io/report/mods/1/widget). If you don't know the ID of the resource you wish to report, you can use the generic report URL: [https://mod.io/report/widget](https://mod.io/report)

    __NOTE:__ If you are a game owner or manager, you can [view all reports](https://mod.io/content) submitted for your game(s), and you are responsible for actioning reports. You can also configure in your game's control panel the number of reports required before content is automatically taken down for review.

    Read our [Terms of Use](https://mod.io/terms/widget) for information about what is/isn't acceptable.

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
<a href="#authentication">api_key</a>, <a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
# Agreements

## Get Current Agreement

> Example request

```shell
# You can also use wget
curl -X GET https://*.modapi.io/v1/agreements/types/{agreement-type-id}/current?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/agreements/types/{agreement-type-id}/current?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/agreements/types/{agreement-type-id}/current',
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

fetch('https://*.modapi.io/v1/agreements/types/{agreement-type-id}/current?api_key=YourApiKey',
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

r = requests.get('https://*.modapi.io/v1/agreements/types/{agreement-type-id}/current', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/agreements/types/{agreement-type-id}/current?api_key=YourApiKey");
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

`GET /agreements/types/{agreement-type-id}/current`

Get the current agreement (version) by type. Successful request will return a single [Agreement Version Object](#agreement-version-object).

     __Valid agreement types are:__

     __1__ = Terms of Use - [https://mod.io/terms](https://mod.io/terms)<br>
     __2__ = Privacy Policy - [https://mod.io/privacy](https://mod.io/privacy)<br>
     __3__ = Game Terms - [https://mod.io/gameterms](https://mod.io/gameterms)<br>
     __4__ = API Access Terms - [https://mod.io/apiterms](https://mod.io/apiterms)<br>
     __5__ = Monetization Terms - [https://mod.io/monetization](https://mod.io/monetization)<br>
     __6__ = Acceptable Use Policy - [https://mod.io/aup](https://mod.io/aup)<br>
     __7__ = Cookies Policy - [https://mod.io/cookies](https://mod.io/cookies)<br>
     __8__ = Refund Policy - [https://mod.io/refund](https://mod.io/refund)

     There are three ways you can display mod.io agreements. Pick which is easiest and most suitable for your implementation.

     __1. Linking to__ the applicable agreement using the URLs listed above.

     __2. Using this endpoint__ to fetch the applicable agreement and create a UI to display it inline.

     __3. Web browser overlay__ to display the applicable agreement inline. If doing this, we recommend prefixing the agreement URL path with `/legal` to remove all menus, and if wanting to remove all links add `?no_links=true` to the end of the URL. For example use:

     - [https://mod.io/legal/terms](https://mod.io/legal/terms) to remove menus<br>
     - [https://mod.io/legal/terms?no_links=true](https://mod.io/legal/terms?no_links=true) to remove menus and links

> Example response

```json
{
  "id": 1,
  "is_active": true,
  "is_latest": true,
  "type": 2,
  "user": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "display_name_portal": null,
    "date_online": 1509922961,
    "date_joined": 1509922961,
    "avatar": {
      "filename": "avatar.png",
      "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
      "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
      "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
    },
    "timezone": "",
    "language": "",
    "profile_url": "https://mod.io/u/xant"
  },
  "date_added": 1509922961,
  "date_updated": 1509922961,
  "date_live": 1509922961,
  "name": "Terms of Use",
  "changelog": "",
  "description": "Privacy Agreement - 20/11/2020.....",
  "adjacent_versions": "'previous': { 'id': 13, 'date_live': 1592381157 }, 'next': { 'id': 31, 'date_live': 1722400117 }"
}

```
<h3 id="Get-Current-Agreement-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Agreement Version Object](#schemaagreement_version_object)
404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|14000|Agreement could not be found.|[Error Object](#schemaerror_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>, <a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
## Get Agreement Version

> Example request

```shell
# You can also use wget
curl -X GET https://*.modapi.io/v1/agreements/versions/{agreement-version-id}?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/agreements/versions/{agreement-version-id}?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/agreements/versions/{agreement-version-id}',
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

fetch('https://*.modapi.io/v1/agreements/versions/{agreement-version-id}?api_key=YourApiKey',
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

r = requests.get('https://*.modapi.io/v1/agreements/versions/{agreement-version-id}', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/agreements/versions/{agreement-version-id}?api_key=YourApiKey");
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

`GET /agreements/versions/{agreement-version-id}`

Get the specified agreement version. Successful request will return an [Agreement Version Object](#agreement-version-object).

> Example response

```json
{
  "id": 1,
  "is_active": true,
  "is_latest": true,
  "type": 2,
  "user": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "display_name_portal": null,
    "date_online": 1509922961,
    "date_joined": 1509922961,
    "avatar": {
      "filename": "avatar.png",
      "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
      "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
      "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
    },
    "timezone": "",
    "language": "",
    "profile_url": "https://mod.io/u/xant"
  },
  "date_added": 1509922961,
  "date_updated": 1509922961,
  "date_live": 1509922961,
  "name": "Terms of Use",
  "changelog": "",
  "description": "Privacy Agreement - 20/11/2020.....",
  "adjacent_versions": "'previous': { 'id': 13, 'date_live': 1592381157 }, 'next': { 'id': 31, 'date_live': 1722400117 }"
}

```
<h3 id="Get-Agreement-Version-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Agreement Version Object](#schemaagreement_version_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|14019|Only administrators can view agreement templates.|[Error Object](#schemaerror_object)
404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|14000|Agreement could not be found.|[Error Object](#schemaerror_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">api_key</a>, <a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
# Users

## Mute a User

> Example request

```shell
# You can also use wget
curl -X POST https://*.modapi.io/v1/users/{user-id}/mute \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Accept: application/json'

```

```http
POST https://*.modapi.io/v1/users/{user-id}/mute HTTP/1.1
Host: *.modapi.io

Accept: application/json
Authorization: Bearer {access-token}

```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/users/{user-id}/mute',
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
  'Accept':'application/json'

};

fetch('https://*.modapi.io/v1/users/{user-id}/mute',
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
  'Accept': 'application/json'
}

r = requests.post('https://*.modapi.io/v1/users/{user-id}/mute', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/users/{user-id}/mute");
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

`POST /users/{user-id}/mute`

Mute a user. This will prevent mod.io from returning mods to you authored by the muted user. Successful request will return `204 No Content`.

> Example response

```json
 204 No Content 

```
<h3 id="Mute-a-User-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)||Successful Request. No Body Returned.|None
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|17039|You cannot mute yourself, you should potentially show restraint instead.|[Error Object](#schemaerror_object)
404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|17000|The user with the supplied id could not be found.|[Error Object](#schemaerror_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: web)
</aside>
## Unmute a User

> Example request

```shell
# You can also use wget
curl -X DELETE https://*.modapi.io/v1/users/{user-id}/mute \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Accept: application/json'

```

```http
DELETE https://*.modapi.io/v1/users/{user-id}/mute HTTP/1.1
Host: *.modapi.io

Accept: application/json
Authorization: Bearer {access-token}

```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/users/{user-id}/mute',
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
  'Accept':'application/json'

};

fetch('https://*.modapi.io/v1/users/{user-id}/mute',
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
  'Accept': 'application/json'
}

r = requests.delete('https://*.modapi.io/v1/users/{user-id}/mute', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/users/{user-id}/mute");
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

`DELETE /users/{user-id}/mute`

Unmute a previously muted user. This will re-enable mod.io to returning mods to you authored by the muted user. Successful request will return `204 No Content`.

> Example response

```json
 204 No Content 

```
<h3 id="Unmute-a-User-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)||Successful Request. No Body Returned.|None
404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|17000|The user with the supplied id could not be found.|[Error Object](#schemaerror_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: web)
</aside>
# Me

## Get Authenticated User

> Example request

```shell
# You can also use wget
curl -X GET https://*.modapi.io/v1/me \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/me HTTP/1.1
Host: *.modapi.io

Accept: application/json
Authorization: Bearer {access-token}

```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/me',
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

fetch('https://*.modapi.io/v1/me',
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

r = requests.get('https://*.modapi.io/v1/me', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/me");
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
  "display_name_portal": null,
  "date_online": 1509922961,
  "date_joined": 1509922961,
  "avatar": {
    "filename": "avatar.png",
    "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
    "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
    "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
  },
  "timezone": "",
  "language": "",
  "profile_url": "https://mod.io/u/xant"
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
## Get User Events

> Example request

```shell
# You can also use wget
curl -X GET https://*.modapi.io/v1/me/events?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/me/events?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/me/events',
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

fetch('https://*.modapi.io/v1/me/events?api_key=YourApiKey',
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

r = requests.get('https://*.modapi.io/v1/me/events', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/me/events?api_key=YourApiKey");
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

__Deprecated__: This endpoint is deprecated for in-game use and will be removed at a later date. As of March 31st 2024, events will only be returned for existing games for legacy reasons. Any new game should use the [Get User Subscriptions](#get-user-subscriptions) endpoint to fetch the latest mods subscribed to by the authenticated user as this endpoint will no longer return events for games created after that date. If you have any concerns please [reach out to us](https://support.mod.io).<br><br> Get events that have been fired specific to the user. Successful request will return an array of [Event Objects](#get-user-events-2). We recommended reading the [filtering documentation](#filtering) to return only the records you want.

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
## Get User Modfiles

> Example request

```shell
# You can also use wget
curl -X GET https://*.modapi.io/v1/me/files \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/me/files HTTP/1.1
Host: *.modapi.io

Accept: application/json
Authorization: Bearer {access-token}

```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/me/files',
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

fetch('https://*.modapi.io/v1/me/files',
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

r = requests.get('https://*.modapi.io/v1/me/files', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/me/files");
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

Get all modfiles the _authenticated user_ uploaded. Successful request will return an array of [Modfile Objects](#get-modfiles-2). We recommended reading the [filtering documentation](#filtering) to return only the records you want.

    __NOTE:__ If the [game](#edit-game) requires mod downloads to be initiated via the API, the `binary_url` returned will contain a verification hash. This hash must be supplied to get the modfile, and will expire after a certain period of time. Saving and reusing the `binary_url` won't work in this situation given it's dynamic nature.

    Filter|Type|Description
    ---|---|---
    id|integer|Unique id of the file.
    mod_id|integer|Unique id of the mod.
    date_added|integer|Unix timestamp of date file was added.
    date_scanned|integer|Unix timestamp of date file was virus scanned.
    virus_status|integer|Current virus scan status of the file. For newly added files that have yet to be scanned this field will change frequently until a scan is complete:<br><br>__0__ = Not scanned<br>__1__ = Scan complete<br>__2__ = In progress<br>__3__ = Too large to scan<br>__4__ = File not found<br>__5__ = Error Scanning
    virus_positive|integer|Was a virus detected:<br><br>__0__ = No threats detected<br>__1__ = Flagged as malicious<br>__2__ = Flagged as containing potentially harmful files (i.e. EXEs)
    filesize|integer|Size of the file in bytes.
    filehash|string|MD5 hash of the file.
    filename|string|Filename including extension.
    version|string|Release version this file represents.
    changelog|string|Changelog for the file.
    metadata_blob|string|Metadata that is designed to be handled by the game client. As an example, this may include properties as to how the item works, or other information you need to display. Metadata can also be stored as searchable [key value pairs](#metadata), and to individual [mod files](#get-modfiles).
    platform_status|string|If the parent game has enabled per-platform files, by default only files which are approved and live for the [target platform](#targeting-a-platform) will be returned.<br><br>To request pending files, you can filter results by their current platform status, using `pending_only`, `approved_only`, `live_and_approved` or `live_and_pending`.

> Example response

```json
{
  "data": [
    {
      "id": 2,
      "mod_id": 2,
      "date_added": 1499841487,
      "date_updated": 1499841487,
      "date_scanned": 1499841487,
      "virus_status": 0,
      "virus_positive": 0,
      "virustotal_hash": "",
      "filesize": 15181,
      "filesize_uncompressed": 16384,
      "filehash": {
        "md5": "2d4a0e2d7273db6b0a94b0740a88ad0d"
      },
      "filename": "rogue-knight-v1.zip",
      "version": "1.3",
      "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
      "metadata_blob": "rogue,hd,high-res,4k,hd textures",
      "download": {
        "binary_url": "https://*.modapi.io/v1/games/1/mods/1/files/1/download/c489a0354111a4d76640d47f0cdcb294",
        "date_expires": 1579316848
      },
      "platforms": [
        {
          "platform": "windows",
          "status": 1
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
<h3 id="Get-User-Modfiles-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Request Successful|[Get Modfiles](#schemaget_modfiles)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
## Get User Games

> Example request

```shell
# You can also use wget
curl -X GET https://*.modapi.io/v1/me/games \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/me/games HTTP/1.1
Host: *.modapi.io

Accept: application/json
Authorization: Bearer {access-token}

```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/me/games',
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

fetch('https://*.modapi.io/v1/me/games',
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

r = requests.get('https://*.modapi.io/v1/me/games', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/me/games");
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
    status|integer|Status of the game (only admins can filter by this field, see [status and visibility](#status-amp-visibility) for details):<br><br>__0__ = Not Accepted<br>__1__ = Accepted<br>__3__ = Deleted
    submitted_by|integer|Unique id of the user who has ownership of the game.
    date_added|integer|Unix timestamp of date game was registered.
    date_updated|integer|Unix timestamp of date game was updated.
    date_live|integer|Unix timestamp of date game was set live.
    name|string|Name of the game.
    name_id|string|Path for the game on mod.io. For example: https://mod.io/g/gamename
    summary|string|Summary of the games mod support.
    instructions_url|string|Link to a mod.io guide, modding wiki or a page where modders can learn how to make and submit mods.
    ugc_name|string|Word used to describe user-generated content (mods, items, addons etc).
    presentation_option|integer|Presentation style used on the mod.io website:<br><br>__0__ = Grid View: Displays mods in a grid<br>__1__ = Table View: Displays mods in a table
    submission_option|integer|Submission process modders must follow:<br><br>__0__ = Mod uploads must occur via the API using a tool created by the game developers<br>__1__ = Mod uploads can occur from anywhere, including the website and API
    curation_option|integer|Curation options enabled by this game to approve mods:<br><br>__0__ = No curation: Mods are immediately available to play<br>__1__ = Price change approval: Pricing changes for marketplace mods queued for acceptance<br>__2__ = Full curation: All mods must be accepted by someone to be listed
    dependency_option|integer|Dependency option for this game's mods:<br><br>__0__ = Disallow dependencies<br>__1__ = Allow dependencies, mods must opt in<br>__2__ = Allow dependencies, mods must opt out<br>__3__ = Allow dependencies with no restrictions
    community_options|integer|Community features enabled for this game:<br><br>__0__ = None<br>__1__ = Enable comments<br>__2__ = Enable guides<br>__4__ = Pin on homepage<br>__8__ = Show on homepage<br>__16__ = Show more on homepage<br>__32__ = Allow change status<br>__64__ = Enable Previews (Game must be hidden)<br>__128__ = Allow Preview Share-URL (Previews must be enabled)<br>__256__ = Allow negative ratings<br>__512__ = Allow mods to be edited via web<br>__?__ = Combine to find games with multiple options enabled (see [BITWISE fields](#bitwise-and-bitwise-and))
    monetization_options|integer|Monetization options enabled for this game:<br><br>__0__ = Access to monetization features disabled<br>__1__ = Access to monetization features enabled by mod.io<br>__2__ = Marketplace enabled<br>__4__ = Creator partner program enabled<br>__8__ = Quantity limited mods supported<br>__16__ = All mods must be quantity limited<br>__?__ = Combine to find games with multiple options enabled (see [BITWISE fields](#bitwise-and-bitwise-and))
    api_access_options|integer|Level of API access allowed by this game:<br><br>__0__ = None<br>__1__ = Allow 3rd parties to access this games API endpoints<br>__2__ = Allow mods to be downloaded directly (if disabled all download URLs will contain a frequently changing verification hash to stop unauthorized use)<br>__4__ = Requires a bearer token to be supplied when attempting the download to enforce authenticated downloads only<br>__8__ = Requires a bearer token to be supplied and for the user to own the file when attempting the download<br>__?__ = Combine to find games with multiple options enabled (see [BITWISE fields](#bitwise-and-bitwise-and))
    maturity_options|integer|Mature content setup for this game:<br><br>__0__ = Don't allow mature content in mods<br>__1__ = Allow mature content in mods<br>__2__ = This game is for mature audiences only

    Display|Type|Description
    ---|---|---
    show_hidden_tags|bool|show the hidden tags associated with the given game.

    Sort|Description
    ---|---
    popular|Sort results by popularity using [_sort filter](#filtering), value should be `popular` for descending or `-popular` for ascending results.<br><br>__NOTE:__ Popularity is calculated hourly and reset daily (results are ranked from 1 to X). You should sort this column in descending order `popular` to get the top ranked results.
    downloads|Sort results by total downloads using [_sort filter](#filtering), value should be `downloads` for descending or `-downloads` for ascending results.<br><br>__NOTE:__ You should sort this column in descending order `downloads` to get the top ranked results. This filter differs from popular by filtering on the amount of downloads the game has received overall, and not just in the last 24 hours.
    mods|Sort results by total mod count using [_sort filter](#filtering), value should be `mods` for descending or `-mods` for ascending results.

> Example response

```json
{
  "data": [
    {
      "id": 2,
      "status": 1,
      "submitted_by": null,
      "date_added": 1493702614,
      "date_updated": 1499410290,
      "date_live": 1499841403,
      "presentation_option": 0,
      "submission_option": 1,
      "dependency_option": 0,
      "curation_option": 0,
      "community_options": 3,
      "monetization_options": 0,
      "monetization_team": {
        "team_id": "1"
      },
      "revenue_options": 0,
      "max_stock": 8388607,
      "api_access_options": 3,
      "maturity_options": 0,
      "ugc_name": "mods",
      "token_name": "MIO",
      "icon": {
        "filename": "icon.png",
        "original": "https://assets.modcdn.io/images/placeholder/icon.png",
        "thumb_64x64": "https://assets.modcdn.io/images/placeholder/icon.png",
        "thumb_128x128": "https://assets.modcdn.io/images/placeholder/icon.png",
        "thumb_256x256": "https://assets.modcdn.io/images/placeholder/icon.png"
      },
      "logo": {
        "filename": "card.png",
        "original": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_640x360": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
      },
      "header": {
        "filename": "modio-logo-bluedark.png",
        "original": "https://assets.modcdn.io/images/branding/modio-logo-bluedark.png"
      },
      "name": "Rogue Knight",
      "name_id": "rogue-knight",
      "summary": "Rogue Knight is a brand new 2D pixel platformer that supports custom levels and characters.",
      "instructions": "Instructions on the process to upload mods.",
      "instructions_url": "https://www.rogue-knight-game.com/modding/getting-started",
      "profile_url": "https://mod.io/g/rogue-knight",
      "other_urls": [
        {
          "label": "Our Steam Page",
          "url": "https://www.steampowered.com/2348329042"
        }
      ],
      "tag_options": [
        {
          "name": "Theme",
          "name_localized": "string",
          "type": "checkboxes",
          "tags": [
            "Horror"
          ],
          "tags_localized": {
            "Horror": "Horreur"
          },
          "tag_count_map": {
            "Horror": 52
          },
          "hidden": false,
          "locked": false
        }
      ],
      "stats": {
        "game_id": 2,
        "mods_count_total": 13,
        "mods_downloads_today": 204,
        "mods_downloads_total": 27492,
        "mods_downloads_daily_average": 1230,
        "mods_subscribers_total": 16394,
        "date_expires": 1492564103
      },
      "theme": {
        "primary": "#44bfd5",
        "dark": "#2c2c3f",
        "light": "#ffffff",
        "success": "#68D391",
        "warning": "#d6af2e",
        "danger": "#ff000e"
      },
      "platforms": [
        {
          "platform": "ps5",
          "label": "PlayStation 5",
          "moderated": true,
          "locked": true
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
## Get User Subscriptions

> Example request

```shell
# You can also use wget
curl -X GET https://*.modapi.io/v1/me/subscribed \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/me/subscribed HTTP/1.1
Host: *.modapi.io

Accept: application/json
Authorization: Bearer {access-token}

```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/me/subscribed',
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

fetch('https://*.modapi.io/v1/me/subscribed',
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

r = requests.get('https://*.modapi.io/v1/me/subscribed', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/me/subscribed");
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
    status|integer|Status of the mod (only game admins can filter by this field, see [status and visibility](#status-amp-visibility) for details):<br><br>__0__ = Not accepted _(default)_<br>__1__ = Accepted _(default)_<br>__3__ = Deleted
    visible|integer|Visibility of the mod (only game admins can filter by this field, see [status and visibility](#status-amp-visibility) for details):<br><br>__0__ = Hidden _(default)_<br>__1__ = Public _(default)_
    submitted_by|integer|Unique id of the user who has ownership of the mod.
    date_added|integer|Unix timestamp of date mod was registered.
    date_updated|integer|Unix timestamp of date mod was updated.
    date_live|integer|Unix timestamp of date mod was set live.
    maturity_option|integer|Mature content found in this mod:<br><br>__0__ = None<br>__1__ = Alcohol<br>__2__ = Drugs<br>__4__ = Violence<br>__8__ = Explicit<br>__?__ = Combine to find mods with multiple options enabled (see [BITWISE fields](#bitwise-and-bitwise-and))
    monetization_options|integer|Monetization options enabled for this mod:<br><br>__0__ = Access to monetization features disabled<br>__1__ = Access to monetization features enabled by the game for this mod<br>__2__ = Marketplace enabled<br>__8__ = Quantity of this mod is limited<br>__?__ = Combine to find mods with multiple options enabled (see [BITWISE fields](#bitwise-and-bitwise-and))
    name|string|Name of the mod.
    name_id|string|Path for the mod on mod.io. For example: https://mod.io/g/gamename/m/__mod-name-id-here__
    modfile|integer|Unique id of the file that is the current active release (see [mod files](#files)).
    metadata_blob|string|Metadata that is designed to be handled by the game client and is recommended to not be exposed to content creators when submitting their mods.
    metadata_kvp|string|Colon-separated values representing the key-value pairs you want to filter the results by. If you supply more than one key-pair, separate the pairs by a comma. Will only filter by an exact key-pair match.
    tags|string|Comma-separated values representing the tags you want to filter the results by. If you specify multiple tags, only mods which have all tags will be returned, and only tags that are supported by the parent game can be applied. To determine what tags are eligible, see the tags values within `tag_options` column on the parent [Game Object](#game-object). If you want to ensure mods returned do not contain particular tag(s), you can use the `tags-not-in` filter either independently or alongside this filter.
    platform_status|string|If the parent game has enabled per-platform files, by default only mods with files which are approved and live for the [target platform](#targeting-a-platform) will be returned.<br><br>To QA mods with pending files, you can filter results by their current platform status, using `pending_only` or `live_and_pending`.<br><br>__NOTE:__ only game admins can filter by this field.

    Sort|Description
    ---|---
    downloads|Sort results by most downloads using [_sort filter](#filtering) parameter, value should be `downloads` for descending or `-downloads` for ascending results.
    popular|Sort results by popularity using [_sort filter](#filtering), value should be `popular` for descending or `-popular` for ascending results.<br><br>__NOTE:__ Popularity is calculated hourly and reset daily (results are ranked from 1 to X). You should sort this column in ascending order `-popular` to get the top ranked results.
    rating|Sort results by weighted rating using [_sort filter](#filtering), value should be `rating` for descending or `-rating` for ascending results.
    subscribers|Sort results by most subscribers using [_sort filter](#filtering), value should be `subscribers` for descending or `-subscribers` for ascending results.

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
        "display_name_portal": null,
        "date_online": 1509922961,
        "date_joined": 1509922961,
        "avatar": {
          "filename": "avatar.png",
          "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
          "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
          "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
        },
        "timezone": "",
        "language": "",
        "profile_url": "https://mod.io/u/xant"
      },
      "date_added": 1492564103,
      "date_updated": 1499841487,
      "date_live": 1499841403,
      "maturity_option": 0,
      "community_options": 3,
      "monetization_options": 0,
      "stock": 0,
      "price": 0,
      "tax": 0,
      "logo": {
        "filename": "card.png",
        "original": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_640x360": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
      },
      "homepage_url": "https://www.rogue-hdpack.com/",
      "name": "Rogue Knight HD Pack",
      "name_id": "rogue-knight-hd-pack",
      "summary": "It's time to bask in the glory of beautiful 4k textures!",
      "description": "<p>Rogue HD Pack does exactly what you thi...",
      "description_plaintext": "Rogue HD Pack does exactly what you thi...",
      "metadata_blob": "rogue,hd,high-res,4k,hd textures",
      "profile_url": "https://mod.io/g/rogue-knight/m/rogue-knight-hd-pack",
      "media": {
        "youtube": [
          "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        ],
        "sketchfab": [
          "https://sketchfab.com/models/ef40b2d300334d009984c8865b2db1c8"
        ],
        "images": [
          {
            "filename": "card.png",
            "original": "https://assets.modcdn.io/images/placeholder/card.png",
            "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
            "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
          }
        ]
      },
      "modfile": {
        "id": 2,
        "mod_id": 2,
        "date_added": 1499841487,
        "date_updated": 1499841487,
        "date_scanned": 1499841487,
        "virus_status": 0,
        "virus_positive": 0,
        "virustotal_hash": "",
        "filesize": 15181,
        "filesize_uncompressed": 16384,
        "filehash": {
          "md5": "2d4a0e2d7273db6b0a94b0740a88ad0d"
        },
        "filename": "rogue-knight-v1.zip",
        "version": "1.3",
        "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
        "metadata_blob": "rogue,hd,high-res,4k,hd textures",
        "download": {
          "binary_url": "https://*.modapi.io/v1/games/1/mods/1/files/1/download/c489a0354111a4d76640d47f0cdcb294",
          "date_expires": 1579316848
        },
        "platforms": [
          {
            "platform": "windows",
            "status": 1
          }
        ]
      },
      "dependencies": false,
      "platforms": [
        {
          "platform": "windows",
          "modfile_live": 1
        }
      ],
      "metadata_kvp": [
        {
          "metakey": "pistol-dmg",
          "metavalue": "800"
        }
      ],
      "tags": [
        {
          "name": "Unity",
          "name_localized": "Unity",
          "date_added": 1499841487
        }
      ],
      "stats": {
        "mod_id": 2,
        "popularity_rank_position": 13,
        "popularity_rank_total_mods": 204,
        "downloads_today": 327,
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
<h3 id="endpoint-xplatform-notice">Cross-Platform Filtering</h3>

If the parent game has platform filtering enabled, this endpoint supports the [targeting a platform](#targeting-a-platform) request header to return the [mods](#mod-object) that are approved for the requested platform. Note: To target a platform for this endpoint, you MUST also include the `game_id` filter for the game that has cross-platform filtering enabled.

<h3 id="Get-User-Subscriptions-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Request Successful|[Get Mods](#schemaget_mods)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
## Get User Mods

> Example request

```shell
# You can also use wget
curl -X GET https://*.modapi.io/v1/me/mods \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/me/mods HTTP/1.1
Host: *.modapi.io

Accept: application/json
Authorization: Bearer {access-token}

```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/me/mods',
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

fetch('https://*.modapi.io/v1/me/mods',
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

r = requests.get('https://*.modapi.io/v1/me/mods', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/me/mods");
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
    status|integer|Status of the mod:<br><br>__0__ = Not accepted _(default)_<br>__1__ = Accepted _(default)_<br>__3__ = Deleted _(default)_
    visible|integer|Visibility of the mod:<br><br>__0__ = Hidden _(default)_<br>__1__ = Public _(default)_
    submitted_by|integer|Unique id of the user who has ownership of the mod.
    date_added|integer|Unix timestamp of date mod was registered.
    date_updated|integer|Unix timestamp of date mod was updated.
    date_live|integer|Unix timestamp of date mod was set live.
    maturity_option|integer|Mature content found in this mod:<br><br>__0__ = None<br>__1__ = Alcohol<br>__2__ = Drugs<br>__4__ = Violence<br>__8__ = Explicit<br>__?__ = Combine to find mods with multiple options enabled (see [BITWISE fields](#bitwise-and-bitwise-and))
    monetization_options|integer|Monetization options enabled for this mod:<br><br>__0__ = Access to monetization features disabled<br>__1__ = Access to monetization features enabled by the game for this mod<br>__2__ = Marketplace enabled<br>__8__ = Quantity of this mod is limited<br>__?__ = Combine to find mods with multiple options enabled (see [BITWISE fields](#bitwise-and-bitwise-and))
    name|string|Name of the mod.
    name_id|string|Path for the mod on mod.io. For example: https://mod.io/g/gamename/m/__mod-name-id-here__
    modfile|integer|Unique id of the file that is the current active release (see [mod files](#files)).
    metadata_blob|string|Metadata that is designed to be handled by the game client and is recommended to not be exposed to content creators when submitting their mods.
    metadata_kvp|string|Colon-separated values representing the key-value pairs you want to filter the results by. If you supply more than one key-pair, separate the pairs by a comma. Will only filter by an exact key-pair match.
    tags|string|Comma-separated values representing the tags you want to filter the results by. If you specify multiple tags, only mods which have all tags will be returned, and only tags that are supported by the parent game can be applied. To determine what tags are eligible, see the tags values within `tag_options` column on the parent [Game Object](#game-object). If you want to ensure mods returned do not contain particular tag(s), you can use the `tags-not-in` filter either independently or alongside this filter.
    platform_status|string|Filter results by their current platform status, valid values are `pending_only` and `live_and_pending`.<br><br>__NOTE:__ that this parameter is only considered in the request if the parent game has enabled [cross-platform filtering](#targeting-a-platform).

    Sort|Description
    ---|---
    downloads|Sort results by most downloads using [_sort filter](#filtering) parameter, value should be `downloads` for descending or `-downloads` for ascending results.
    popular|Sort results by popularity using [_sort filter](#filtering), value should be `popular` for descending or `-popular` for ascending results.<br><br>__NOTE:__ Popularity is calculated hourly and reset daily (results are ranked from 1 to X). You should sort this column in ascending order `-popular` to get the top ranked results.
    rating|Sort results by weighted rating using [_sort filter](#filtering), value should be `rating` for descending or `-rating` for ascending results.
    subscribers|Sort results by most subscribers using [_sort filter](#filtering), value should be `subscribers` for descending or `-subscribers` for ascending results.

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
        "display_name_portal": null,
        "date_online": 1509922961,
        "date_joined": 1509922961,
        "avatar": {
          "filename": "avatar.png",
          "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
          "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
          "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
        },
        "timezone": "",
        "language": "",
        "profile_url": "https://mod.io/u/xant"
      },
      "date_added": 1492564103,
      "date_updated": 1499841487,
      "date_live": 1499841403,
      "maturity_option": 0,
      "community_options": 3,
      "monetization_options": 0,
      "stock": 0,
      "price": 0,
      "tax": 0,
      "logo": {
        "filename": "card.png",
        "original": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_640x360": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
      },
      "homepage_url": "https://www.rogue-hdpack.com/",
      "name": "Rogue Knight HD Pack",
      "name_id": "rogue-knight-hd-pack",
      "summary": "It's time to bask in the glory of beautiful 4k textures!",
      "description": "<p>Rogue HD Pack does exactly what you thi...",
      "description_plaintext": "Rogue HD Pack does exactly what you thi...",
      "metadata_blob": "rogue,hd,high-res,4k,hd textures",
      "profile_url": "https://mod.io/g/rogue-knight/m/rogue-knight-hd-pack",
      "media": {
        "youtube": [
          "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        ],
        "sketchfab": [
          "https://sketchfab.com/models/ef40b2d300334d009984c8865b2db1c8"
        ],
        "images": [
          {
            "filename": "card.png",
            "original": "https://assets.modcdn.io/images/placeholder/card.png",
            "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
            "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
          }
        ]
      },
      "modfile": {
        "id": 2,
        "mod_id": 2,
        "date_added": 1499841487,
        "date_updated": 1499841487,
        "date_scanned": 1499841487,
        "virus_status": 0,
        "virus_positive": 0,
        "virustotal_hash": "",
        "filesize": 15181,
        "filesize_uncompressed": 16384,
        "filehash": {
          "md5": "2d4a0e2d7273db6b0a94b0740a88ad0d"
        },
        "filename": "rogue-knight-v1.zip",
        "version": "1.3",
        "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
        "metadata_blob": "rogue,hd,high-res,4k,hd textures",
        "download": {
          "binary_url": "https://*.modapi.io/v1/games/1/mods/1/files/1/download/c489a0354111a4d76640d47f0cdcb294",
          "date_expires": 1579316848
        },
        "platforms": [
          {
            "platform": "windows",
            "status": 1
          }
        ]
      },
      "dependencies": false,
      "platforms": [
        {
          "platform": "windows",
          "modfile_live": 1
        }
      ],
      "metadata_kvp": [
        {
          "metakey": "pistol-dmg",
          "metavalue": "800"
        }
      ],
      "tags": [
        {
          "name": "Unity",
          "name_localized": "Unity",
          "date_added": 1499841487
        }
      ],
      "stats": {
        "mod_id": 2,
        "popularity_rank_position": 13,
        "popularity_rank_total_mods": 204,
        "downloads_today": 327,
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
## Get User Purchases

> Example request

```shell
# You can also use wget
curl -X GET https://*.modapi.io/v1/me/purchased?api_key=YourApiKey \
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/me/purchased?api_key=YourApiKey HTTP/1.1
Host: *.modapi.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/me/purchased',
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

fetch('https://*.modapi.io/v1/me/purchased?api_key=YourApiKey',
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

r = requests.get('https://*.modapi.io/v1/me/purchased', params={
  'api_key': 'YourApiKey'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/me/purchased?api_key=YourApiKey");
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

`GET /me/purchased`

Get all mod's the _authenticated user_ has purchased. Successful request will return an array of [Mod Objects](#get-mods-2). We recommended reading the [filtering documentation](#filtering) to return only the records you want.

    Filter|Type|Description
    ---|---|---
    id|integer|Unique id of the mod.
    game_id|integer|Unique id of the parent game.
    status|integer|Status of the mod (only game admins can filter by this field, see [status and visibility](#status-amp-visibility) for details):<br><br>__0__ = Not accepted _(default)_<br>__1__ = Accepted _(default)_<br>__3__ = Deleted
    visible|integer|Visibility of the mod (only game admins can filter by this field, see [status and visibility](#status-amp-visibility) for details):<br><br>__0__ = Hidden _(default)_<br>__1__ = Public _(default)_
    submitted_by|integer|Unique id of the user who has ownership of the mod.
    date_added|integer|Unix timestamp of date mod was registered.
    date_updated|integer|Unix timestamp of date mod was updated.
    date_live|integer|Unix timestamp of date mod was set live.
    maturity_option|integer|Mature content found in this mod:<br><br>__0__ = None<br>__1__ = Alcohol<br>__2__ = Drugs<br>__4__ = Violence<br>__8__ = Explicit<br>__?__ = Combine to find mods with multiple options enabled (see [BITWISE fields](#bitwise-and-bitwise-and))
    monetization_options|integer|Monetization options enabled for this mod:<br><br>__0__ = Access to monetization features disabled<br>__1__ = Access to monetization features enabled by the game for this mod<br>__2__ = Marketplace enabled<br>__8__ = Quantity of this mod is limited<br>__?__ = Combine to find mods with multiple options enabled (see [BITWISE fields](#bitwise-and-bitwise-and))
    name|string|Name of the mod.
    name_id|string|Path for the mod on mod.io. For example: https://mod.io/g/gamename/m/__mod-name-id-here__
    modfile|integer|Unique id of the file that is the current active release (see [mod files](#files)).
    metadata_blob|string|Metadata that is designed to be handled by the game client and is recommended to not be exposed to content creators when submitting their mods.
    metadata_kvp|string|Colon-separated values representing the key-value pairs you want to filter the results by. If you supply more than one key-pair, separate the pairs by a comma. Will only filter by an exact key-pair match.
    tags|string|Comma-separated values representing the tags you want to filter the results by. If you specify multiple tags, only mods which have all tags will be returned, and only tags that are supported by the parent game can be applied. To determine what tags are eligible, see the tags values within `tag_options` column on the parent [Game Object](#game-object). If you want to ensure mods returned do not contain particular tag(s), you can use the `tags-not-in` filter either independently or alongside this filter.
    platform_status|string|Filter results by their current platform status, valid values are `pending_only` and `live_and_pending` (only game admins can filter by this field, see [status and visibility](#status-amp-visibility) for details).<br><br>__NOTE:__ that this parameter is only considered in the request if the parent game has enabled [cross-platform filtering](#targeting-a-platform).
    platforms|string|Filter results by their current platform, accepts multiple platforms as comma-separated values (e.g. `ps4,switch`), valid values are `all`, `source`, `windows`, `mac`, `linux`, `android`, `ios`, `xboxone`, `xboxseriesx`, `ps4`, `ps5`, `switch`, `oculus` (only game admins can filter by this field, see [status and visibility](#status-amp-visibility) for details).<br><br>__NOTE:__ that this parameter will take precedence over the header from [cross-platform filtering](#targeting-a-platform).

    Sort|Description
    ---|---
    downloads|Sort results by most downloads using [_sort filter](#filtering) parameter, value should be `downloads` for descending or `-downloads` for ascending results.
    popular|Sort results by popularity using [_sort filter](#filtering), value should be `popular` for descending or `-popular` for ascending results.<br><br>__NOTE:__ Popularity is calculated hourly and reset daily (results are ranked from 1 to X). You should sort this column in ascending order `-popular` to get the top ranked results.
    rating|Sort results by weighted rating using [_sort filter](#filtering), value should be `rating` for descending or `-rating` for ascending results.
    subscribers|Sort results by most subscribers using [_sort filter](#filtering), value should be `subscribers` for descending or `-subscribers` for ascending results.

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
        "display_name_portal": null,
        "date_online": 1509922961,
        "date_joined": 1509922961,
        "avatar": {
          "filename": "avatar.png",
          "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
          "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
          "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
        },
        "timezone": "",
        "language": "",
        "profile_url": "https://mod.io/u/xant"
      },
      "date_added": 1492564103,
      "date_updated": 1499841487,
      "date_live": 1499841403,
      "maturity_option": 0,
      "community_options": 3,
      "monetization_options": 0,
      "stock": 0,
      "price": 0,
      "tax": 0,
      "logo": {
        "filename": "card.png",
        "original": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_640x360": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
      },
      "homepage_url": "https://www.rogue-hdpack.com/",
      "name": "Rogue Knight HD Pack",
      "name_id": "rogue-knight-hd-pack",
      "summary": "It's time to bask in the glory of beautiful 4k textures!",
      "description": "<p>Rogue HD Pack does exactly what you thi...",
      "description_plaintext": "Rogue HD Pack does exactly what you thi...",
      "metadata_blob": "rogue,hd,high-res,4k,hd textures",
      "profile_url": "https://mod.io/g/rogue-knight/m/rogue-knight-hd-pack",
      "media": {
        "youtube": [
          "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        ],
        "sketchfab": [
          "https://sketchfab.com/models/ef40b2d300334d009984c8865b2db1c8"
        ],
        "images": [
          {
            "filename": "card.png",
            "original": "https://assets.modcdn.io/images/placeholder/card.png",
            "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
            "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
          }
        ]
      },
      "modfile": {
        "id": 2,
        "mod_id": 2,
        "date_added": 1499841487,
        "date_updated": 1499841487,
        "date_scanned": 1499841487,
        "virus_status": 0,
        "virus_positive": 0,
        "virustotal_hash": "",
        "filesize": 15181,
        "filesize_uncompressed": 16384,
        "filehash": {
          "md5": "2d4a0e2d7273db6b0a94b0740a88ad0d"
        },
        "filename": "rogue-knight-v1.zip",
        "version": "1.3",
        "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
        "metadata_blob": "rogue,hd,high-res,4k,hd textures",
        "download": {
          "binary_url": "https://*.modapi.io/v1/games/1/mods/1/files/1/download/c489a0354111a4d76640d47f0cdcb294",
          "date_expires": 1579316848
        },
        "platforms": [
          {
            "platform": "windows",
            "status": 1
          }
        ]
      },
      "dependencies": false,
      "platforms": [
        {
          "platform": "windows",
          "modfile_live": 1
        }
      ],
      "metadata_kvp": [
        {
          "metakey": "pistol-dmg",
          "metavalue": "800"
        }
      ],
      "tags": [
        {
          "name": "Unity",
          "name_localized": "Unity",
          "date_added": 1499841487
        }
      ],
      "stats": {
        "mod_id": 2,
        "popularity_rank_position": 13,
        "popularity_rank_total_mods": 204,
        "downloads_today": 327,
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
<h3 id="endpoint-xplatform-notice">Cross-Platform Filtering</h3>

If the parent game has platform filtering enabled, this endpoint supports the [targeting a platform](#targeting-a-platform) request header to return the [mods](#mod-object) that are approved for the requested platform. Note: To target a platform for this endpoint, you MUST also include the `game_id` filter for the game that has cross-platform filtering enabled.

<h3 id="Get-User-Purchases-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Request Successful|[Get Mods](#schemaget_mods)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
## Get Users Muted

> Example request

```shell
# You can also use wget
curl -X GET https://*.modapi.io/v1/me/users/muted \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/me/users/muted HTTP/1.1
Host: *.modapi.io

Accept: application/json
Authorization: Bearer {access-token}

```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/me/users/muted',
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

fetch('https://*.modapi.io/v1/me/users/muted',
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

r = requests.get('https://*.modapi.io/v1/me/users/muted', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/me/users/muted");
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

`GET /me/users/muted`

Get all users muted by the _authenticated user_. Successful request will return an array of [User Objects](#user-object).

> Example response

```json
{
  "data": [
    {
      "id": 1,
      "name_id": "xant",
      "username": "XanT",
      "display_name_portal": null,
      "date_online": 1509922961,
      "date_joined": 1509922961,
      "avatar": {
        "filename": "avatar.png",
        "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
        "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
        "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
      },
      "timezone": "",
      "language": "",
      "profile_url": "https://mod.io/u/xant"
    },
    {
        ...
    }
  ],
  "result_count": 1,
  "result_offset": 0,
  "result_limit": 100,
  "result_total": 1
}

```
<h3 id="Get-Users-Muted-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Request Successful|[Get Muted Users](#schemaget_muted_users)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
## Get User Ratings

> Example request

```shell
# You can also use wget
curl -X GET https://*.modapi.io/v1/me/ratings \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/me/ratings HTTP/1.1
Host: *.modapi.io

Accept: application/json
Authorization: Bearer {access-token}

```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/me/ratings',
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

fetch('https://*.modapi.io/v1/me/ratings',
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

r = requests.get('https://*.modapi.io/v1/me/ratings', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/me/ratings");
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

Get all mod rating's submitted by the _authenticated user_. Successful request will return an array of [Rating Objects](#get-user-ratings-2).

    Filter|Type|Description
    ---|---|---
    game_id|integer|Unique id of the parent game.
    mod_id|integer|Unique id of the mod.
    rating|integer|Type of rating applied:<br><br>__-1__ = Negative Rating<br>__1__ = Positive Rating
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
## Get User Wallet

> Example request

```shell
# You can also use wget
curl -X GET https://*.modapi.io/v1/me/wallets?game_id=1 \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/me/wallets?game_id=1 HTTP/1.1
Host: *.modapi.io

Accept: application/json
Authorization: Bearer {access-token}

```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/me/wallets',
  method: 'get',
  data: '?game_id=1',
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

fetch('https://*.modapi.io/v1/me/wallets?game_id=1',
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

r = requests.get('https://*.modapi.io/v1/me/wallets', params={
  'game_id': '1'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/me/wallets?game_id=1");
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

`GET /me/wallets`

Get the _authenticated user_ wallets. Successful request will return a single [Wallet Object](#wallet-object).

    Filter|Type|Required|Description
    ---|---|---|---|
     game_id|integer|true*|Unique id of the parent game. _*Not required when g-url is used._

> Example response

```json
{
  "type": "string",
  "payment_method_id": "string",
  "game_id": "string",
  "currency": "string",
  "balance": 0,
  "deficit": 0,
  "monetization_status": 1
}

```
<h3 id="Get-User-Wallet-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Request Successful|[Wallet Object](#schemawallet_object)
404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|14001|The game associated with the supplied api_key is currently not available.|[Error Object](#schemaerror_object)
404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|900022|The game may not be setup for monetization as no active monetization team could be found.|[Error Object](#schemaerror_object)
422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|900008|A failure has occured when trying to find the user's wallet.|[Error Object](#schemaerror_object)
422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|900002|A failure has occured when trying to communicate with the monetization system.|[Error Object](#schemaerror_object)
422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|900007|Unable to create the account with monetization.|[Error Object](#schemaerror_object)
422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|17034|Users email must be verified before they can create the account with monetization.|[Error Object](#schemaerror_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: read)
</aside>
# General

## Get Resource Owner

> Example request

```shell
# You can also use wget
curl -X POST https://*.modapi.io/v1/general/ownership \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json'

```

```http
POST https://*.modapi.io/v1/general/ownership HTTP/1.1
Host: *.modapi.io

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
  url: 'https://*.modapi.io/v1/general/ownership',
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

fetch('https://*.modapi.io/v1/general/ownership',
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

r = requests.post('https://*.modapi.io/v1/general/ownership', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/general/ownership");
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
  "display_name_portal": null,
  "date_online": 1509922961,
  "date_joined": 1509922961,
  "avatar": {
    "filename": "avatar.png",
    "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
    "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
    "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
  },
  "timezone": "",
  "language": "",
  "profile_url": "https://mod.io/u/xant"
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
## Ping

> Example request

```shell
# You can also use wget
curl -X GET https://*.modapi.io/v1/ping \
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/ping HTTP/1.1
Host: *.modapi.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/ping',
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
  'Accept':'application/json'

};

fetch('https://*.modapi.io/v1/ping',
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

r = requests.get('https://*.modapi.io/v1/ping', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/ping");
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

`GET /ping`

Ping the mod.io API for purpose of a reachability check, successful request will return a 200 OK with a [Web Message Object](#web-message-object).

> Example response

```json
{
  "code": 200,
  "success": true,
  "message": "You have successfully logged out of mod.io."
}

```
<h3 id="Ping-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Request Successful|[Web Message Object](#schemaweb_message_object)
<aside class="success">
This operation does not require authentication
</aside>

# Monetization

## Get Game Token Packs

> Example request

```shell
# You can also use wget
curl -X GET https://*.modapi.io/v1/games/{game-id}/monetization/token-packs \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/games/{game-id}/monetization/token-packs HTTP/1.1
Host: *.modapi.io

Accept: application/json
Authorization: Bearer {access-token}

```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/games/{game-id}/monetization/token-packs',
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

fetch('https://*.modapi.io/v1/games/{game-id}/monetization/token-packs',
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

r = requests.get('https://*.modapi.io/v1/games/{game-id}/monetization/token-packs', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/monetization/token-packs");
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

`GET /games/{game-id}/monetization/token-packs`

Get all token packs for a game. Successful request will return a [Game Token Pack Object](#game-token-pack-object).

> Example response

```json
{
  "id": 1,
  "token_pack_id": 1,
  "price": 1000,
  "amount": 1000,
  "portal": "WEB",
  "sku": "SKU0001",
  "name": "Token Pack A",
  "description": "This pack contains 1000 tokens!",
  "date_added": 1492564103,
  "date_updated": 1492564103
}

```
<h3 id="Get-Game-Token-Packs-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Game Token Pack Successful|[Game Token Pack Object](#schemagame_token_pack_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
## Purchase A Mod

> Example request

```shell
# You can also use wget
curl -X POST https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/checkout \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'display_amount=undefined' \
  -d 'subscribe=false' \
  -d 'idempotent_key=undefined'

```

```http
POST https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/checkout HTTP/1.1
Host: *.modapi.io
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
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/checkout',
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
  "display_amount": 0,
  "subscribe": false,
  "idempotent_key": "string"
}';
const headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/checkout',
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

r = requests.post('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/checkout', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/checkout");
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

`POST /games/{game-id}/mods/{mod-id}/checkout`

Purchase a mod. A Successful request will return the newly created [Pay Object](#pay-object).

     Parameter|Type|Required|Description
     ---|---|---|---|
     display_amount|integer|true|The amount that was shown to the user for the purchase.
     idempotent_key|string|true|The use of the idempotency key is for if in the event of a connection error, you can confidently reattempt the request without the concern of inadvertently creating a duplicate purchase or executing the purchase twice. All idempotent keys last 24 hours.

> Example response

```json
{
  "transaction_id": 0,
  "gross_amount": 0,
  "net_amount": 0,
  "platform_fee": 0,
  "gateway_fee": 0,
  "transaction_type": "string",
  "meta": {},
  "purchase_date": 1626667557,
  "wallet_type": "string",
  "balance": 0,
  "deficit": 0,
  "payment_method_id": "string",
  "mod": {
    "id": 2,
    "game_id": 2,
    "status": 1,
    "visible": 1,
    "submitted_by": {
      "id": 1,
      "name_id": "xant",
      "username": "XanT",
      "display_name_portal": null,
      "date_online": 1509922961,
      "date_joined": 1509922961,
      "avatar": {
        "filename": "avatar.png",
        "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
        "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
        "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
      },
      "timezone": "",
      "language": "",
      "profile_url": "https://mod.io/u/xant"
    },
    "date_added": 1492564103,
    "date_updated": 1499841487,
    "date_live": 1499841403,
    "maturity_option": 0,
    "community_options": 3,
    "monetization_options": 0,
    "stock": 0,
    "price": 0,
    "tax": 0,
    "logo": {
      "filename": "card.png",
      "original": "https://assets.modcdn.io/images/placeholder/card.png",
      "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
      "thumb_640x360": "https://assets.modcdn.io/images/placeholder/card.png",
      "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
    },
    "homepage_url": "https://www.rogue-hdpack.com/",
    "name": "Rogue Knight HD Pack",
    "name_id": "rogue-knight-hd-pack",
    "summary": "It's time to bask in the glory of beautiful 4k textures!",
    "description": "<p>Rogue HD Pack does exactly what you thi...",
    "description_plaintext": "Rogue HD Pack does exactly what you thi...",
    "metadata_blob": "rogue,hd,high-res,4k,hd textures",
    "profile_url": "https://mod.io/g/rogue-knight/m/rogue-knight-hd-pack",
    "media": {
      "youtube": [
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      ],
      "sketchfab": [
        "https://sketchfab.com/models/ef40b2d300334d009984c8865b2db1c8"
      ],
      "images": [
        {
          "filename": "card.png",
          "original": "https://assets.modcdn.io/images/placeholder/card.png",
          "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
          "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
        }
      ]
    },
    "modfile": {
      "id": 2,
      "mod_id": 2,
      "date_added": 1499841487,
      "date_updated": 1499841487,
      "date_scanned": 1499841487,
      "virus_status": 0,
      "virus_positive": 0,
      "virustotal_hash": "",
      "filesize": 15181,
      "filesize_uncompressed": 16384,
      "filehash": {
        "md5": "2d4a0e2d7273db6b0a94b0740a88ad0d"
      },
      "filename": "rogue-knight-v1.zip",
      "version": "1.3",
      "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
      "metadata_blob": "rogue,hd,high-res,4k,hd textures",
      "download": {
        "binary_url": "https://*.modapi.io/v1/games/1/mods/1/files/1/download/c489a0354111a4d76640d47f0cdcb294",
        "date_expires": 1579316848
      },
      "platforms": [
        {
          "platform": "windows",
          "status": 1
        }
      ]
    },
    "dependencies": false,
    "platforms": [
      {
        "platform": "windows",
        "modfile_live": 1
      }
    ],
    "metadata_kvp": [
      {
        "metakey": "pistol-dmg",
        "metavalue": "800"
      }
    ],
    "tags": [
      {
        "name": "Unity",
        "name_localized": "Unity",
        "date_added": 1499841487
      }
    ],
    "stats": {
      "mod_id": 2,
      "popularity_rank_position": 13,
      "popularity_rank_total_mods": 204,
      "downloads_today": 327,
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
}

```
<h3 id="Purchase-A-Mod-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Pay Object](#schemapay_object)
400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|15004|The authenticated user is already subscribed to the mod.|[Error Object](#schemaerror_object)
402|[Payment Required](https://tools.ietf.org/html/rfc7231#section-6.5.2)|900030|The payment failed. Please try again later.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15011|The item has not been accepted and can not be purchased at this time.|[Error Object](#schemaerror_object)
404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|900022|The game may not be currently active for monetization.|[Error Object](#schemaerror_object)
422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|900035|The given display price does not match the price of the mod.|[Error Object](#schemaerror_object)
422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|900008|Unable to fetch the accounts' wallet. Please confirm the account has one|[Error Object](#schemaerror_object)
422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|900001|Unable to communicate with the monetization system. Please try again later.|[Error Object](#schemaerror_object)
422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|900034|The account already owns this item.|[Error Object](#schemaerror_object)
422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|900049|The account has insufficent funds to make this purchase.|[Error Object](#schemaerror_object)
422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|900002|A failure has occured when trying to authenticate with the monetization system.|[Error Object](#schemaerror_object)
422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|900007|The account has not been created with monetization.|[Error Object](#schemaerror_object)
422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|900000|An un expected error has occured. Please try again later.|[Error Object](#schemaerror_object)
422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|900061|The mod that was attempting to be purchased has sold out. Only applicable if the Game and Mod have enabled limited.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15023|The item has been deleted and can not be purchased at this time.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|900015|The account has been disabled from monetization.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|900012|The monetization is currently in maintance mode. Please try again later.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15020|This mod is missing a file and cannot be subscribed to.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15001|This mod is hidden and the user cannot be subscribed to it.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15000|This mod is currently under DMCA and the user cannot be subscribed to it.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|15000|This item cannot be purchased at this time due to a DMCA takedown request.|[Error Object](#schemaerror_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
## Get Mod Monetization Team

> Example request

```shell
# You can also use wget
curl -X GET https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/monetization/team \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Accept: application/json'

```

```http
GET https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/monetization/team HTTP/1.1
Host: *.modapi.io

Accept: application/json
Authorization: Bearer {access-token}

```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/monetization/team',
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

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/monetization/team',
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

r = requests.get('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/monetization/team', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/monetization/team");
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

`GET /games/{game-id}/mods/{mod-id}/monetization/team`

Get users in a monetization team. Successful request will return a [Monetization Team Accounts Object](#monetization-team-accounts-object).

> Example response

```json
{
  "id": 1,
  "name_id": "xant",
  "username": "XanT",
  "monetization_status": 0,
  "monetization_options": 0,
  "split": 0
}

```
<h3 id="Get-Mod-Monetization-Team-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Monetization Team Accounts Object](#schemamonetization_team_accounts_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|900023|You do not have the required permissions.|[Error Object](#schemaerror_object)
404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|900022|Monetization team could not be found.|[Error Object](#schemaerror_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
## Create Mod Monetization Team

> Example request

```shell
# You can also use wget
curl -X POST https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/monetization/team \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Accept: application/json'

```

```http
POST https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/monetization/team HTTP/1.1
Host: *.modapi.io

Accept: application/json
Authorization: Bearer {access-token}

```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/monetization/team',
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
  'Accept':'application/json'

};

fetch('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/monetization/team',
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
  'Accept': 'application/json'
}

r = requests.post('https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/monetization/team', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/games/{game-id}/mods/{mod-id}/monetization/team");
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

`POST /games/{game-id}/mods/{mod-id}/monetization/team`

Send a request to create a monetization team for a mod team. Successful request will return a [Monetization Team Accounts Object](#monetization-team-accounts-object).

     Parameter|Type|Required|Description
     ---|---|---|---|
     users|array|true|Array of users to add.
     users[__n__][id]|integer|true|Id of the user to add to the team.
     users[__n__][split]|integer|true|Split value for the given user.

> Example response

```json
{
  "id": 1,
  "name_id": "xant",
  "username": "XanT",
  "monetization_status": 0,
  "monetization_options": 0,
  "split": 0
}

```
<h3 id="Create-Mod-Monetization-Team-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Monetization Team Accounts Object](#schemamonetization_team_accounts_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|900023|Team members must belong to the current game or mod.|[Error Object](#schemaerror_object)
404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|900022|Monetization team could not be found.|[Error Object](#schemaerror_object)
422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|900024|Unable to process your data with the payment system.|[Error Object](#schemaerror_object)
422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|900003|Your account does not have the required creator wallets.|[Error Object](#schemaerror_object)
422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|900026|Your provided split share must total 100%.|[Error Object](#schemaerror_object)
422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|900029|You may only add up to 5 users to a team.|[Error Object](#schemaerror_object)
422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|900025|Unable to process your data with the payment system.|[Error Object](#schemaerror_object)
422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|900008|A failure has occured when trying to find the user's wallet.|[Error Object](#schemaerror_object)
403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|900023|Team members must be approved before they can be added to the current team.|[Error Object](#schemaerror_object)
404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|900003|Monetization team could not be found.|[Error Object](#schemaerror_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
# Service to Service

## Transaction Intent

> Example request

```shell
# You can also use wget
curl -X POST https://*.modapi.io/v1/s2s/transactions/intent \
  -H 'X-Modio-Delegation-Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \ 
  -H 'X-Modio-Idempotent-Key: d720901c-a8ed-42ff-9343-39d4a3e16b18' \ 
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/json' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'sku=undefined' \
  -d 'portal=undefined' \
  -d 'gateway_uuid=undefined'

```

```http
POST https://*.modapi.io/v1/s2s/transactions/intent HTTP/1.1
Host: *.modapi.io
Content-Type: application/x-www-form-urlencoded
Accept: application/json
X-Modio-Delegation-Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
X-Modio-Idempotent-Key: d720901c-a8ed-42ff-9343-39d4a3e16b18
Authorization: Bearer {access-token}
Content-Type: application/json

```

```javascript
var headers = {
  'X-Modio-Delegation-Token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  'X-Modio-Idempotent-Key':'d720901c-a8ed-42ff-9343-39d4a3e16b18',
  'Authorization':'Bearer {access-token}',
  'Content-Type':'application/json',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/s2s/transactions/intent',
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
  "sku": "string",
  "portal": "string",
  "gateway_uuid": "string"
}';
const headers = {
  'X-Modio-Delegation-Token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  'X-Modio-Idempotent-Key':'d720901c-a8ed-42ff-9343-39d4a3e16b18',
  'Authorization':'Bearer {access-token}',
  'Content-Type':'application/json',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://*.modapi.io/v1/s2s/transactions/intent',
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
  'X-Modio-Delegation-Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  'X-Modio-Idempotent-Key': 'd720901c-a8ed-42ff-9343-39d4a3e16b18',
  'Authorization': 'Bearer {access-token}',
  'Content-Type': 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded',
  'Accept': 'application/json'
}

r = requests.post('https://*.modapi.io/v1/s2s/transactions/intent', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/s2s/transactions/intent");
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

`POST /s2s/transactions/intent`

Create a service-to-service (S2S) transaction intent. This is for performing an external token transaction. You should generate the intent, consume the item on your server's backend before committing the transaction. A successful request will return a [S2S Pay Object](#s2s-pay-object) object. Requires scope of monetization on token.

    Parameter|Type|Required|Description
    ---|---|---|---|
    sku|string|true|The sku ID of the entitlement that will be converted into it's equivalent Virtual Token amount.
    portal|string|true|The portal the sku is tied to. Valid options are apple, google, xboxlive, psn and steam.
    gateway_uuid|string|false|An optional mapping alpha dash string that can be used to track this transaction. It is recommended to use the one from the processing platform if you have one available.

> Example response

```json
{
  "transaction_id": 0,
  "gross_amount": 0,
  "net_amount": 0,
  "platform_fee": 0,
  "gateway_fee": 0,
  "transaction_type": "string",
  "meta": {},
  "purchase_date": 1626667557
}

```
<h3 id="Transaction-Intent-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[S2S Pay Object](#schemas2s_pay_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
## Transaction Commit

> Example request

```shell
# You can also use wget
curl -X POST https://*.modapi.io/v1/s2s/transactions/commit \
  -H 'X-Modio-Idempotent-Key: d720901c-a8ed-42ff-9343-39d4a3e16b18' \ 
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/json' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'transaction_id=undefined' \
  -d 'clawback_uuid=undefined'

```

```http
POST https://*.modapi.io/v1/s2s/transactions/commit HTTP/1.1
Host: *.modapi.io
Content-Type: application/x-www-form-urlencoded
Accept: application/json
X-Modio-Idempotent-Key: d720901c-a8ed-42ff-9343-39d4a3e16b18
Authorization: Bearer {access-token}
Content-Type: application/json

```

```javascript
var headers = {
  'X-Modio-Idempotent-Key':'d720901c-a8ed-42ff-9343-39d4a3e16b18',
  'Authorization':'Bearer {access-token}',
  'Content-Type':'application/json',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/s2s/transactions/commit',
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
  "transaction_id": 0,
  "clawback_uuid": "string"
}';
const headers = {
  'X-Modio-Idempotent-Key':'d720901c-a8ed-42ff-9343-39d4a3e16b18',
  'Authorization':'Bearer {access-token}',
  'Content-Type':'application/json',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://*.modapi.io/v1/s2s/transactions/commit',
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
  'X-Modio-Idempotent-Key': 'd720901c-a8ed-42ff-9343-39d4a3e16b18',
  'Authorization': 'Bearer {access-token}',
  'Content-Type': 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded',
  'Accept': 'application/json'
}

r = requests.post('https://*.modapi.io/v1/s2s/transactions/commit', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/s2s/transactions/commit");
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

`POST /s2s/transactions/commit`

Create a service-to-service (S2S) transaction commit. This is for performing an external token transaction. This step finalizes the transaction and will issue tokens to the user associated to it. A successful request will return a [S2S Pay Object](#s2s-pay-object) object. Requires scope of monetization on token.

    Parameter|Type|Required|Description
    ---|---|---|---|
    transaction_id|integer|true|The ID of the transaction to complete.
    clawback_uuid|string|false|An optional mapping alpha dash string that can be used to group this transaction against other transactions.

> Example response

```json
{
  "transaction_id": 0,
  "gross_amount": 0,
  "net_amount": 0,
  "platform_fee": 0,
  "gateway_fee": 0,
  "transaction_type": "string",
  "meta": {},
  "purchase_date": 1626667557
}

```
<h3 id="Transaction-Commit-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[S2S Pay Object](#schemas2s_pay_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
## Transaction Clawback

> Example request

```shell
# You can also use wget
curl -X POST https://*.modapi.io/v1/s2s/transactions/clawback \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/json' \ 
  -H 'Content-Type: application/x-www-form-urlencoded' \ 
  -H 'Accept: application/json' \
  -d 'transaction_id=undefined' \
  -d 'gateway_uuid=undefined' \
  -d 'portal=undefined' \
  -d 'refund_reason=undefined' \
  -d 'clawback_uuid=undefined'

```

```http
POST https://*.modapi.io/v1/s2s/transactions/clawback HTTP/1.1
Host: *.modapi.io
Content-Type: application/x-www-form-urlencoded
Accept: application/json
Authorization: Bearer {access-token}
Content-Type: application/json

```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'application/json',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/s2s/transactions/clawback',
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
  "transaction_id": 0,
  "gateway_uuid": 0,
  "portal": "string",
  "refund_reason": "string",
  "clawback_uuid": "string"
}';
const headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'application/json',
  'Content-Type':'application/x-www-form-urlencoded',
  'Accept':'application/json'

};

fetch('https://*.modapi.io/v1/s2s/transactions/clawback',
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
  'Content-Type': 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded',
  'Accept': 'application/json'
}

r = requests.post('https://*.modapi.io/v1/s2s/transactions/clawback', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/s2s/transactions/clawback");
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

`POST /s2s/transactions/clawback`

Create a service-to-service (S2S) transaction clawback. This is for unwinding a token transaction. You may use the transaction_id or the gateway_uuid from the previous calls. A successful request will return a [Refund Object](#refund-object) object. Requires scope of monetization on token.

    Parameter|Type|Required|Description
    ---|---|---|---|
    transaction_id|integer|false|The id of the transaction to complete. Required if gateway_uuid is null.
    gateway_uuid|string|false|The alpha dash on the transaction. Required if transaction_id is null.
    portal|string|true|The portal the transaction is tied to. Valid options are apple, google, xboxlive, psn and steam.
    refund_reason|string|true|The reason for the refund.
    clawback_uuid|string|false|An optional mapping alpha dash string that can be used to group this transaction against other transactions. When a deficit clawback transaction occurs, this clawback id will be set on subsequent clawbacks.

> Example response

```json
{
  "transaction_id": 0,
  "gross_amount": 0,
  "net_amount": 0,
  "platform_fee": 0,
  "gateway_fee": 0,
  "tax": 0,
  "tax_type": "string",
  "transaction_type": "string",
  "meta": {},
  "purchase_date": null
}

```
<h3 id="Transaction-Clawback-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)||Successful Request|[Refund Object](#schemarefund_object)
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
</aside>
## Disconnect User

> Example request

```shell
# You can also use wget
curl -X DELETE https://*.modapi.io/v1/s2s/connections/{portal-id} \
  -H 'Authorization: Bearer {access-token}' \ 
  -H 'Content-Type: application/json' \ 
  -H 'Accept: application/json'

```

```http
DELETE https://*.modapi.io/v1/s2s/connections/{portal-id} HTTP/1.1
Host: *.modapi.io

Accept: application/json
Authorization: Bearer {access-token}
Content-Type: application/json

```

```javascript
var headers = {
  'Authorization':'Bearer {access-token}',
  'Content-Type':'application/json',
  'Accept':'application/json'

};

$.ajax({
  url: 'https://*.modapi.io/v1/s2s/connections/{portal-id}',
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
  'Content-Type':'application/json',
  'Accept':'application/json'

};

fetch('https://*.modapi.io/v1/s2s/connections/{portal-id}',
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
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.delete('https://*.modapi.io/v1/s2s/connections/{portal-id}', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("https://*.modapi.io/v1/s2s/connections/{portal-id}");
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

`DELETE /s2s/connections/{portal-id}`

Disconnect a mod.io user from a linked studio user. This will completely remove the SSO connection between the mod.io user and the external user.

> Example response

```json
 204 No Content 

```
<h3 id="Disconnect-User-responses">Responses</h3>

Status|Meaning|Error Ref|Description|Response Schema
---|---|----|---|---|
204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)||Successful or Unsuccessful Request. No Body Returned.|None
<aside class="auth-notice">
To perform this request, you must be authenticated via one of the following methods:
<a href="#authentication">OAuth 2</a> (Scopes: write)
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



## Agreement Version Object  

<a name="schemaagreement_version_object"></a>

```json
{
  "id": 1,
  "is_active": true,
  "is_latest": true,
  "type": 2,
  "user": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "display_name_portal": null,
    "date_online": 1509922961,
    "date_joined": 1509922961,
    "avatar": {
      "filename": "avatar.png",
      "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
      "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
      "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
    },
    "timezone": "",
    "language": "",
    "profile_url": "https://mod.io/u/xant"
  },
  "date_added": 1509922961,
  "date_updated": 1509922961,
  "date_live": 1509922961,
  "name": "Terms of Use",
  "changelog": "",
  "description": "Privacy Agreement - 20/11/2020.....",
  "adjacent_versions": "'previous': { 'id': 13, 'date_live': 1592381157 }, 'next': { 'id': 31, 'date_live': 1722400117 }"
} 
```

### Properties

Name|Type|Description
---|---|---|---|
id|integer|Unique id of the agreement.
is_active|boolean|Is the agreement currently active? (This can also be determined if date_live <= the current time).
is_latest|boolean|Is this the latest version of the agreement?
type|integer|The type of agreement. Can be one of the following:<br><br>__1__ = Terms<br>__2__ = Privacy<br>__3__ = Game<br>__4__ = API<br>__5__ = Monetization<br>__6__ = AUP<br>__7__ = Cookies<br>__8__ = Refund
user|[User Object](#schemauser_object)|No description
date_added|integer|Unix timestamp of the date the agreement was added.
date_updated|integer|Unix timestamp of the date the agreement was updated.
date_live|integer|Unix timestamp of the date the agreement was set live.
name|string|Name of the agreement.
changelog|string|Changelog for version of this agreement.
description|string|The contents of the agreement.
adjacent_versions|object|The previous and next versions of the agreement.



## Avatar Object

   <a name="schemaavatar_object"></a>

```json
{
  "filename": "avatar.png",
  "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
  "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
  "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
} 
```

### Properties

Name|Type|Description
---|---|---|---|
filename|string|Avatar filename including extension.
original|string|URL to the full-sized avatar.
thumb_50x50|string|URL to the small avatar thumbnail.
thumb_100x100|string|URL to the medium avatar thumbnail.



## Comment Object

   <a name="schemacomment_object"></a>

```json
{
  "id": 2,
  "game_id": 2,
  "mod_id": 2,
  "resource_id": 2,
  "user": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "display_name_portal": null,
    "date_online": 1509922961,
    "date_joined": 1509922961,
    "avatar": {
      "filename": "avatar.png",
      "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
      "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
      "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
    },
    "timezone": "",
    "language": "",
    "profile_url": "https://mod.io/u/xant"
  },
  "date_added": 1499841487,
  "reply_id": 0,
  "thread_position": "01",
  "karma": 1,
  "karma_guest": 0,
  "content": "Hey <a href=\"https://mod.io/u/guest\">guest</a>, you should check out this mod!",
  "options": 0
} 
```

### Properties

Name|Type|Description
---|---|---|---|
id|integer|Unique id of the comment.
game_id|integer|Unique game id (if applicable).
mod_id|integer|Deprecated: Please use resource_id instead, this will be removed in subsequent API version.
resource_id|integer|Unique id of the parent resource.
user|[User Object](#schemauser_object)|The user who published the comment.
date_added|integer|Unix timestamp of date the comment was posted.
reply_id|integer|Id of the parent comment this comment is replying to (can be 0 if the comment is not a reply).
thread_position|string|Levels of nesting in a comment thread. How it works:<br><br>- The first comment will have the position '01'.<br>- The second comment will have the position '02'.<br>- If someone responds to the second comment the position will be '02.01'.<br>- A maximum of 3 levels is supported.
karma|integer|Karma received for the comment (can be postive or negative).
karma_guest|integer|Deprecated: No longer used and will be removed in subsequent API version.
content|string|Contents of the comment.
options|integer|The options specified by the mod or guide team. Available options are:<br><br>__0__ = All of the options below are disabled<br>__1__ = Pinned comment<br>__2__ = Locked comment<br>__?__ = Add the options you want together, to enable multiple features (see [BITWISE fields](#bitwise-and-bitwise-and))



## Download Object

   <a name="schemadownload_object"></a>

```json
{
  "binary_url": "https://*.modapi.io/v1/games/1/mods/1/files/1/download/c489a0354111a4d76640d47f0cdcb294",
  "date_expires": 1579316848
} 
```

### Properties

Name|Type|Description
---|---|---|---|
binary_url|string|URL to download the file from the mod.io CDN.<br><br>__NOTE:__ If the [game](#edit-game) requires mod downloads to be initiated via the API, the `binary_url` returned will contain a verification hash. This hash must be supplied to get the modfile, and will expire after a certain period of time. Saving and reusing the `binary_url` won't work in this situation given it's dynamic nature.
date_expires|integer|Unix timestamp of when the `binary_url` will expire.



## Embeddable Mod Hub Configuration Object

<a name="schemaembeddable_mod_hub_configuration_object"></a>

```json
{
  "id": 1,
  "name": "string",
  "urls": [
    "string"
  ],
  "style": "string",
  "css": "string",
  "allow_subscribing": true,
  "allow_rating": true,
  "allow_reporting": true,
  "allow_downloading": true,
  "allow_commenting": true,
  "allow_filtering": true,
  "allow_searching": true,
  "allow_infinite_scroll": true,
  "allow_email_auth": true,
  "allow_sso_auth": true,
  "allow_steam_auth": true,
  "allow_PSN_auth": true,
  "allow_xbox_auth": true,
  "allow_egs_auth": true,
  "allow_discord_auth": true,
  "allow_google_auth": true,
  "show_collection": true,
  "show_comments": true,
  "show_guides": true,
  "show_user_avatars": true,
  "show_sort_tabs": true,
  "allow_links": true,
  "results_per_page": 0,
  "min_age": 0,
  "date_added": 0,
  "date_updated": 0,
  "company_name": "string",
  "agreement_urls": [
    {}
  ]
} 
```

### Properties

Name|Type|Description
---|---|---|---|
id|integer|Unique EMH id.
name|string|Name of the EMH version.
style|string|Pre-defined styling properties.
css|string|Custom styling properties.
allow_subscribing|boolean|Flag to allow subscribing.
allow_rating|boolean|Flag to allow rating.
allow_reporting|boolean|Flag to allow reporting.
allow_downloading|boolean|Flag to allow downloading.
allow_commenting|boolean|Flag to allow commenting.
allow_filtering|boolean|Flag to allow filtering.
allow_searching|boolean|Flag to allow searching.
allow_infinite_scroll|boolean|Flag to allow infinite scroll.
allow_email_auth|boolean|Flag to allow email authentication.
allow_sso_auth|boolean|Flag to allow SSO authentication.
allow_steam_auth|boolean|Flag to allow Steam authentication.
allow_PSN_auth|boolean|Flag to allow PSN authentication.
allow_xbox_auth|boolean|Flag to allow Xbox authentication.
allow_egs_auth|boolean|Flag to allow Epic Games Store authentication.
allow_discord_auth|boolean|Flag to allow Discord authentication.
allow_google_auth|boolean|Flag to allow Google authentication.
show_collection|boolean|Flag to allow mod management via collection.
show_comments|boolean|Flag to show comments.
show_guides|boolean|Flag to show guides.
show_user_avatars|boolean|Flag to show user avatars.
show_sort_tabs|boolean|Flag to show sort tabs.
allow_links|boolean|Flag to allow user submitted links.
results_per_page|integer|Number of results to show per page.
min_age|integer|Minimum age for EMH access.
date_added|integer|Timestamp indicating the date when the configuration was added.
date_updated|integer|Timestamp indicating the date when the configuration was last updated.
company_name|string|The company name used for EMH agreements.
urls|string[]|An array of URLs that may access this EMH configuration.
agreement_urls|object[]|The configured agreement names and urls used for the EMH.



## Entitlement Details Object  

<a name="schemaentitlement_details_object"></a>

```json
{
  "tokens_allocated": 1000
} 
```

### Properties

Name|Type|Description
---|---|---|---|
tokens_allocated|integer|The amount of virtual tokens (Mio's) allocated from the entitlement consumption.



## Entitlement Fulfillment Object  

<a name="schemaentitlement_fulfillment_object"></a>

```json
{
  "transaction_id": "124641934672",
  "transaction_state": 2,
  "sku_id": "MODIO0001",
  "entitlement_consumed": true,
  "entitlement_type": 0,
  "details": {
    "tokens_allocated": 1000
  }
} 
```

### Properties

Name|Type|Description
---|---|---|---|
transaction_id|string|The mod.io transaction ID for the entitlement transfer.
transaction_state|integer|The mod.io transaction state from converting the portal entitlements into mod.io assets / currency. Possible values:<br><br>__0__ = Failed<br>__1__ = Pending<br>__2__ = Fulfilled<br>__3__ = Consume Limit Exceeded
sku_id|string|The portal SKU ID associated with the transaction.
entitlement_consumed|bool|Has the entitlement been consumed in the 3rd-party portal?
entitlement_type|integer|The entitlement type, once consumed and the entitlement is transferred to mod.io. Possible values:<br><br>__0__ = Virtual Tokens
details|[Entitlement Details Object](#schemaentitlement_details_object)|Details associated with the transaction.



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



## Game EMH Object  

<a name="schemagame_emh_object"></a>

```json
{
  "id": 2,
  "status": 1,
  "community_options": 3,
  "ugc_name": "mods",
  "name": "Rogue Knight",
  "name_id": "rogue-knight",
  "tag_options": [
    {
      "name": "Theme",
      "name_localized": "string",
      "type": "checkboxes",
      "tags": [
        "Horror"
      ],
      "tags_localized": {
        "Horror": "Horreur"
      },
      "tag_count_map": {
        "Horror": 52
      },
      "hidden": false,
      "locked": false
    }
  ],
  "theme": {
    "primary": "#44bfd5",
    "dark": "#2c2c3f",
    "light": "#ffffff",
    "success": "#68D391",
    "warning": "#d6af2e",
    "danger": "#ff000e"
  },
  "platforms": [
    {
      "platform": "ps5",
      "label": "PlayStation 5",
      "moderated": true,
      "locked": true
    }
  ]
} 
```

### Properties

Name|Type|Description
---|---|---|---|
id|integer|Unique game id.
status|integer|Status of the game (see [status and visibility](#status-amp-visibility) for details):<br><br>__0__ = Not Accepted<br>__1__ = Accepted<br>__3__ = Deleted
community_options|integer|Community features enabled for this game:<br><br>__0__ = All of the options below are disabled<br>__1__ = Enable comments<br>__2__ = Enable guides<br>__4__ = Pin on homepage<br>__8__ = Show on homepage<br>__16__ = Show more on homepage<br>__32__ = Allow change status<br>__64__ = Enable Previews (Game must be hidden)<br>__128__ = Allow Preview Share-URL (Previews must be enabled)<br>__256__ = Allow negative ratings<br>__512__ = Allow mods to be edited via web<br>__?__ = Add the options you want together, to enable multiple features (see [BITWISE fields](#bitwise-and-bitwise-and))
ugc_name|string|Word used to describe user-generated content (mods, items, addons etc).
name|string|Name of the game.
name_id|string|Path for the game on mod.io. For example: https://mod.io/g/__rogue-knight__
theme|[Theme Object](#schematheme_object)|Theme color values for the game.
tag_options|[Game Tag Option Localized Object](#schemagame_tag_option_localized_object)[]|Groups of tags configured by the game developer, that mods can select. Hidden tags will only be returned if `show_hidden_tags` is set to `true`. Group names and tags will be localized into the specified `Accept-Language` header value if provided, for a list of supported languages see [Localization](#localization) (Note that if a localized variant of a tag is not available it will default to English).
platforms|[Game Platforms Object](#schemagame_platforms_object)[]|Platforms that are supported by this title.



## Game Monetization Team Object 

<a name="schemagame_monetization_team_object"></a>

```json
{
  "team_id": "1"
} 
```

### Properties

Name|Type|Description
---|---|---|---|
team_id|integer|The ID of the monetization team.



## Game Object

   <a name="schemagame_object"></a>

```json
{
  "id": 2,
  "status": 1,
  "submitted_by": null,
  "date_added": 1493702614,
  "date_updated": 1499410290,
  "date_live": 1499841403,
  "presentation_option": 0,
  "submission_option": 1,
  "dependency_option": 0,
  "curation_option": 0,
  "community_options": 3,
  "monetization_options": 0,
  "monetization_team": {
    "team_id": "1"
  },
  "revenue_options": 0,
  "max_stock": 8388607,
  "api_access_options": 3,
  "maturity_options": 0,
  "ugc_name": "mods",
  "token_name": "MIO",
  "icon": {
    "filename": "icon.png",
    "original": "https://assets.modcdn.io/images/placeholder/icon.png",
    "thumb_64x64": "https://assets.modcdn.io/images/placeholder/icon.png",
    "thumb_128x128": "https://assets.modcdn.io/images/placeholder/icon.png",
    "thumb_256x256": "https://assets.modcdn.io/images/placeholder/icon.png"
  },
  "logo": {
    "filename": "card.png",
    "original": "https://assets.modcdn.io/images/placeholder/card.png",
    "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
    "thumb_640x360": "https://assets.modcdn.io/images/placeholder/card.png",
    "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
  },
  "header": {
    "filename": "modio-logo-bluedark.png",
    "original": "https://assets.modcdn.io/images/branding/modio-logo-bluedark.png"
  },
  "name": "Rogue Knight",
  "name_id": "rogue-knight",
  "summary": "Rogue Knight is a brand new 2D pixel platformer that supports custom levels and characters.",
  "instructions": "Instructions on the process to upload mods.",
  "instructions_url": "https://www.rogue-knight-game.com/modding/getting-started",
  "profile_url": "https://mod.io/g/rogue-knight",
  "other_urls": [
    {
      "label": "Our Steam Page",
      "url": "https://www.steampowered.com/2348329042"
    }
  ],
  "tag_options": [
    {
      "name": "Theme",
      "name_localized": "string",
      "type": "checkboxes",
      "tags": [
        "Horror"
      ],
      "tags_localized": {
        "Horror": "Horreur"
      },
      "tag_count_map": {
        "Horror": 52
      },
      "hidden": false,
      "locked": false
    }
  ],
  "stats": {
    "game_id": 2,
    "mods_count_total": 13,
    "mods_downloads_today": 204,
    "mods_downloads_total": 27492,
    "mods_downloads_daily_average": 1230,
    "mods_subscribers_total": 16394,
    "date_expires": 1492564103
  },
  "theme": {
    "primary": "#44bfd5",
    "dark": "#2c2c3f",
    "light": "#ffffff",
    "success": "#68D391",
    "warning": "#d6af2e",
    "danger": "#ff000e"
  },
  "platforms": [
    {
      "platform": "ps5",
      "label": "PlayStation 5",
      "moderated": true,
      "locked": true
    }
  ]
} 
```

### Properties

Name|Type|Description
---|---|---|---|
id|integer|Unique game id.
status|integer|Status of the game (see [status and visibility](#status-amp-visibility) for details):<br><br>__0__ = Not Accepted<br>__1__ = Accepted<br>__3__ = Deleted
submitted_by|object|Deprecated: Value will always be an empty object, this will be removed in subsequent API version.
date_added|integer|Unix timestamp of date game was registered.
date_updated|integer|Unix timestamp of date game was updated.
date_live|integer|Unix timestamp of date game was set live.
presentation_option|integer|Presentation style used on the mod.io website:<br><br>__0__ = Grid View: Displays mods in a grid<br>__1__ = Table View: Displays mods in a table
submission_option|integer|Submission process modders must follow:<br><br>__0__ = Mod uploads must occur via the API using a tool created by the game developers<br>__1__ = Mod uploads can occur from anywhere, including the website and API
dependency_option|integer|Dependency option for this game's mods:<br><br>__0__ = Disallow dependencies<br>__1__ = Allow dependencies, mods must opt in<br>__2__ = Allow dependencies, mods must opt out<br>__3__ = Allow dependencies with no restrictions
curation_option|integer|Curation option enabled by this game to approve mods:<br><br>__0__ = No curation: Mods are immediately available to play<br>__1__ = Price change approval: Pricing changes for marketplace mods queued for acceptance<br>__2__ = Full curation: All mods must be accepted by someone to be listed
community_options|integer|Community features enabled for this game:<br><br>__0__ = All of the options below are disabled<br>__1__ = Enable comments<br>__2__ = Enable guides<br>__4__ = Pin on homepage<br>__8__ = Show on homepage<br>__16__ = Show more on homepage<br>__32__ = Allow change status<br>__64__ = Enable Previews (Game must be hidden)<br>__128__ = Allow Preview Share-URL (Previews must be enabled)<br>__256__ = Allow negative ratings<br>__512__ = Allow mods to be edited via web<br>__?__ = Add the options you want together, to enable multiple features (see [BITWISE fields](#bitwise-and-bitwise-and))
monetization_options|integer|Monetization options enabled for this game:<br><br>__0__ = Access to monetization features disabled<br>__1__ = Access to monetization features enabled by mod.io<br>__2__ = Marketplace enabled<br>__4__ = Creator partner program enabled<br>__8__ = Quantity limited mods supported<br>__?__ = Add the options you want together, to enable multiple features (see [BITWISE fields](#bitwise-and-bitwise-and))
monetization_team|[Game Monetization Team Object](#schemagame_monetization_team_object)|The monetization team for this resource. [Game Monetization Team Object](#game-monetization-team-object).
revenue_options|integer|Deprecated: Please use monetization_options instead, this will be removed in subsequent API version.
max_stock|integer|Max Stock for limited mods.
api_access_options|integer|Level of API access allowed by this game:<br><br>__0__ = All of the options below are disabled<br>__1__ = Allow 3rd parties to access this games API endpoints<br>__2__ = Allow mods to be downloaded directly (if disabled all download URLs will contain a frequently changing verification hash to stop unauthorized use)<br>__4__ = Checks authorization on mods to be downloaded directly (if enabled the consuming application must send the users bearer token)<br>__8__ = Checks ownership on mods to be downloaded directly (if enabled the consuming application must send the users bearer token)<br>__?__ = Add the options you want together, to enable multiple features (see [BITWISE fields](#bitwise-and-bitwise-and))
maturity_options|integer|Mature content setup for this game:<br><br>__0__ = Don't allow mature content in mods<br>__1__ = Allow mature content in mods<br>__2__ = This game is for mature audiences only
ugc_name|string|Word used to describe user-generated content (mods, items, addons etc).
token_name|string|Word used to describe the games token.
icon|[Icon Object](#schemaicon_object)|Contains media URL's to the icon for the game.
logo|[Logo Object](#schemalogo_object)|Contains media URL's to the logo for the game.
header|[Header Image Object](#schemaheader_image_object)|Contains media URL's to the preview header for the game.
name|string|Name of the game.
name_id|string|Path for the game on mod.io. For example: https://mod.io/g/__rogue-knight__
summary|string|Summary of the games mod support.
instructions|string|A guide about creating and uploading mods for this game to mod.io (applicable if submission_option = 0).
instructions_url|string|Link to a mod.io guide, your modding wiki or a page where modders can learn how to make and submit mods to your games profile.
profile_url|string|URL to the game.
stats|[Game Stats Object](#schemagame_stats_object)|Numerous aggregate stats for the game.
theme|[Theme Object](#schematheme_object)|Theme color values for the game.
other_urls|[Game OtherUrls Object](#schemagame_otherurls_object)[]|Creator defined URLs to share.
tag_options|[Game Tag Option Localized Object](#schemagame_tag_option_localized_object)[]|Groups of tags configured by the game developer, that mods can select. Hidden tags will only be returned if `show_hidden_tags` is set to `true`. Group names and tags will be localized into the specified `Accept-Language` header value if provided, for a list of supported languages see [Localization](#localization) (Note that if a localized variant of a tag is not available it will default to English).
platforms|[Game Platforms Object](#schemagame_platforms_object)[]|Platforms that are supported by this title.



## Game OtherUrls Object  

<a name="schemagame_otherurls_object"></a>

```json
{
  "label": "Our Steam Page",
  "url": "https://www.steampowered.com/2348329042"
} 
```

### Properties

Name|Type|Description
---|---|---|---|
label|string|Label of the link you are sharing.
url|string|The URL to be associated with the label.



## Game Platforms Object  

<a name="schemagame_platforms_object"></a>

```json
{
  "platform": "ps5",
  "label": "PlayStation 5",
  "moderated": true,
  "locked": true
} 
```

### Properties

Name|Type|Description
---|---|---|---|
platform|string|A [target platform](#targeting-a-platform).
label|string|A presentable label of the platform.
moderated|boolean|Is this platform moderated by game admins? If false, then user submissions for the platform will be available immediately providing the game has mod curation disabled.
locked|boolean|Are users able to upload files to this platform? By default, users are able to upload to all supported platforms, platforms set to `true` may only be used by game admins only.



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



## Game Tag Option Localized Object

<a name="schemagame_tag_option_localized_object"></a>

```json
{
  "name": "Theme",
  "name_localized": "string",
  "type": "checkboxes",
  "tags": [
    "Horror"
  ],
  "tags_localized": {
    "Horror": "Horreur"
  },
  "tag_count_map": {
    "Horror": 52
  },
  "hidden": false,
  "locked": false
} 
```

### Properties

Name|Type|Description
---|---|---|---|
name|string|Name of the tag group.
name_localized|string|No description
type|string|Can multiple tags be selected via 'checkboxes' or should only a single tag be selected via a 'dropdown'.
tags_localized|object|List of tag names and the localized variant of the tag.
tag_count_map|object|List of tag names and the count of mods with these tags.
hidden|boolean|Groups of tags flagged as 'hidden' are intended to be used for filtering (eg. game version), but should not be displayed to users. Hidden tags will only be returned if `show_hidden_tags` is set to `true`.
locked|boolean|Groups of tags flagged as 'locked' are editable only if the authenticated user is a team member of the parent game. Useful for games to tag special functionality, which users can see and filter on (eg. competition winners).
tags|string[]|Array of tags in this group.



## Game Tag Option Object 

<a name="schemagame_tag_option_object"></a>

```json
{
  "name": "Theme",
  "name_localization": {
    "en": "Difficulty",
    "de": "",
    "fr": ""
  },
  "type": "checkboxes",
  "tags": [
    "Horror"
  ],
  "tags_localization": [
    {
      "tag": "string",
      "translations": {
        "en": "",
        "de": "",
        "fr": ""
      }
    }
  ],
  "tag_count_map": {
    "Horror": 52
  },
  "hidden": false,
  "locked": false
} 
```

### Properties

Name|Type|Description
---|---|---|---|
name|string|Name of the tag group.
name_localization|object|No description
» en|string|No description
» de|string|Optional language translation.
» fr|string|Optional language translation.
type|string|Can multiple tags be selected via 'checkboxes' or should only a single tag be selected via a 'dropdown'.
tag_count_map|object|List of tag names and the count of mods with these tags.
hidden|boolean|Groups of tags flagged as 'hidden' are intended to be used for filtering (eg. game version), but should not be displayed to users. Hidden tags will only be returned if `show_hidden_tags` is set to `true`.
locked|boolean|Groups of tags flagged as 'locked' are editable only if the authenticated user is a team member of the parent game. Useful for games to tag special functionality, which users can see and filter on (eg. competition winners).
tags|string[]|Array of tags in this group.
tags_localization|object[]|No description
» tag|string|The tag.
» translations|object|No description
»» en|string|English translation of the tag.
»» de|string|German translation of the tag.
»» fr|string|French translation of the tag.



## Game Token Pack Object 

<a name="schemagame_token_pack_object"></a>

```json
{
  "id": 1,
  "token_pack_id": 1,
  "price": 1000,
  "amount": 1000,
  "portal": "WEB",
  "sku": "SKU0001",
  "name": "Token Pack A",
  "description": "This pack contains 1000 tokens!",
  "date_added": 1492564103,
  "date_updated": 1492564103
} 
```

### Properties

Name|Type|Description
---|---|---|---|
id|integer|The internal mod.io ID of the game token pack.
token_pack_id|integer|The ID of the token pack.
price|integer|The price of the token pack in USD.
amount|integer|The amount of tokens the pack contains.
portal|string|The portal of the token pack.
sku|string|The SKU ID of the token pack.
name|string|The name of the game token pack.
description|string|The description of the game token pack.
date_added|integer|Unix timestamp of the date the token pack was added to the game.
date_updated|integer|Unix timestamp of the date the game token pack was updated.



## Game User Preview Object 

<a name="schemagame_user_preview_object"></a>

```json
{
  "user": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "display_name_portal": null,
    "date_online": 1509922961,
    "date_joined": 1509922961,
    "avatar": {
      "filename": "avatar.png",
      "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
      "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
      "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
    },
    "timezone": "",
    "language": "",
    "profile_url": "https://mod.io/u/xant"
  },
  "user_from": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "display_name_portal": null,
    "date_online": 1509922961,
    "date_joined": 1509922961,
    "avatar": {
      "filename": "avatar.png",
      "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
      "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
      "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
    },
    "timezone": "",
    "language": "",
    "profile_url": "https://mod.io/u/xant"
  },
  "resource_url": "https://mod.io/g/@rogueknight/m/@some-mod",
  "date_added": 1499841487
} 
```

### Properties

Name|Type|Description
---|---|---|---|
user|[User Object](#schemauser_object)|The previewing user.
user_from|[User Object](#schemauser_object)|The user who invited the previewing user, if the previewer was added manually.
resource_url|string|The URL of the resource that the registrant should be redirect to upon success.
date_added|integer|Unix timestamp of the date the user was registered as a previewer.



## Get Entitlement Sync Status 

<a name="schemaget_entitlement_sync_status"></a>

```json
{
  "wallet": {
    "balance": 0
  },
  "data": [
    {
      "transaction_id": "124641934672",
      "transaction_state": 2,
      "sku_id": "MODIO0001",
      "entitlement_consumed": true,
      "entitlement_type": 0,
      "details": {
        "tokens_allocated": 1000
      }
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
wallet|[Wallet Balance Object](#schemawallet_balance_object)|A summary of wallet-related data, such as the updated wallet balance after any eligible entitlements have been sync'd. This value is returned for convenience, and will be `null` if no eligible entitlements were converted into mod.io Virtual Tokens. To reliably ascertain the users current balance, you should call the [Get User Wallet](#get-user-wallet) endpoint.
data|[Entitlement Fulfillment Object](#schemaentitlement_fulfillment_object)[]|Array containing entitlement fulfillment objects.
result_count|integer|Number of entitlements mod.io was able to retrieve in this request. This is not an indication the entitlement was consumed and the transaction successful. This value will cap out at 5.
result_offset|integer|Number of results skipped over. Always 0.
result_limit|integer|Maximum number of results returned in the request. Defaults to 100 (max) unless overridden by `_limit` filter.
result_total|integer|Number of entitlements mod.io was able to retrieve that can be associated with SKU's registered on mod.io. Due to the max limit of 5 entitlements consumed per request your application should check if `results_total > results_count` and if so, repeat the request to consume the next batch.



## Get Game Tag Options 

<a name="schemaget_game_tag_options"></a>

```json
{
  "data": [
    {
      "name": "Theme",
      "name_localization": {
        "en": "Difficulty",
        "de": "",
        "fr": ""
      },
      "type": "checkboxes",
      "tags": [
        "Horror"
      ],
      "tags_localization": [
        {
          "tag": "string",
          "translations": {
            "en": "",
            "de": "",
            "fr": ""
          }
        }
      ],
      "tag_count_map": {
        "Horror": 52
      },
      "hidden": false,
      "locked": false
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
      "submitted_by": null,
      "date_added": 1493702614,
      "date_updated": 1499410290,
      "date_live": 1499841403,
      "presentation_option": 0,
      "submission_option": 1,
      "dependency_option": 0,
      "curation_option": 0,
      "community_options": 3,
      "monetization_options": 0,
      "monetization_team": {
        "team_id": "1"
      },
      "revenue_options": 0,
      "max_stock": 8388607,
      "api_access_options": 3,
      "maturity_options": 0,
      "ugc_name": "mods",
      "token_name": "MIO",
      "icon": {
        "filename": "icon.png",
        "original": "https://assets.modcdn.io/images/placeholder/icon.png",
        "thumb_64x64": "https://assets.modcdn.io/images/placeholder/icon.png",
        "thumb_128x128": "https://assets.modcdn.io/images/placeholder/icon.png",
        "thumb_256x256": "https://assets.modcdn.io/images/placeholder/icon.png"
      },
      "logo": {
        "filename": "card.png",
        "original": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_640x360": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
      },
      "header": {
        "filename": "modio-logo-bluedark.png",
        "original": "https://assets.modcdn.io/images/branding/modio-logo-bluedark.png"
      },
      "name": "Rogue Knight",
      "name_id": "rogue-knight",
      "summary": "Rogue Knight is a brand new 2D pixel platformer that supports custom levels and characters.",
      "instructions": "Instructions on the process to upload mods.",
      "instructions_url": "https://www.rogue-knight-game.com/modding/getting-started",
      "profile_url": "https://mod.io/g/rogue-knight",
      "other_urls": [
        {
          "label": "Our Steam Page",
          "url": "https://www.steampowered.com/2348329042"
        }
      ],
      "tag_options": [
        {
          "name": "Theme",
          "name_localized": "string",
          "type": "checkboxes",
          "tags": [
            "Horror"
          ],
          "tags_localized": {
            "Horror": "Horreur"
          },
          "tag_count_map": {
            "Horror": 52
          },
          "hidden": false,
          "locked": false
        }
      ],
      "stats": {
        "game_id": 2,
        "mods_count_total": 13,
        "mods_downloads_today": 204,
        "mods_downloads_total": 27492,
        "mods_downloads_daily_average": 1230,
        "mods_subscribers_total": 16394,
        "date_expires": 1492564103
      },
      "theme": {
        "primary": "#44bfd5",
        "dark": "#2c2c3f",
        "light": "#ffffff",
        "success": "#68D391",
        "warning": "#d6af2e",
        "danger": "#ff000e"
      },
      "platforms": [
        {
          "platform": "ps5",
          "label": "PlayStation 5",
          "moderated": true,
          "locked": true
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
result_count|integer|Number of results returned in this request.
result_offset|integer|Number of results skipped over. Defaults to 0 unless overridden by `_offset` filter.
result_limit|integer|Maximum number of results returned in the request. Defaults to 100 (max) unless overridden by `_limit` filter.
result_total|integer|Total number of results found.



## Get Guide Comments  

<a name="schemaget_guide_comments"></a>

```json
{
  "data": [
    {
      "id": 2,
      "game_id": 2,
      "mod_id": 2,
      "resource_id": 2,
      "user": {
        "id": 1,
        "name_id": "xant",
        "username": "XanT",
        "display_name_portal": null,
        "date_online": 1509922961,
        "date_joined": 1509922961,
        "avatar": {
          "filename": "avatar.png",
          "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
          "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
          "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
        },
        "timezone": "",
        "language": "",
        "profile_url": "https://mod.io/u/xant"
      },
      "date_added": 1499841487,
      "reply_id": 0,
      "thread_position": "01",
      "karma": 1,
      "karma_guest": 0,
      "content": "Hey <a href=\"https://mod.io/u/guest\">guest</a>, you should check out this mod!",
      "options": 0
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
result_count|integer|Number of results returned in this request.
result_offset|integer|Number of results skipped over. Defaults to 0 unless overridden by `_offset` filter.
result_limit|integer|Maximum number of results returned in the request. Defaults to 100 (max) unless overridden by `_limit` filter.
result_total|integer|Total number of results found.



## Get Guide Tags  

<a name="schemaget_guide_tags"></a>

```json
{
  "data": [
    {
      "name": "Instructions",
      "date_added": 1499841487,
      "count": 22
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
data|[Guide Tag Object](#schemaguide_tag_object)[]|Array containing guide tag objects.
result_count|integer|Number of results returned in this request.
result_offset|integer|Number of results skipped over. Defaults to 0 unless overridden by `_offset` filter.
result_limit|integer|Maximum number of results returned in the request. Defaults to 100 (max) unless overridden by `_limit` filter.
result_total|integer|Total number of results found.



## Get Guides

   <a name="schemaget_guides"></a>

```json
{
  "data": [
    {
      "id": 1209,
      "game_id": 3,
      "game_name": "My Awesome Game",
      "logo": {
        "filename": "card.png",
        "original": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_640x360": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
      },
      "user": {
        "id": 1,
        "name_id": "xant",
        "username": "XanT",
        "display_name_portal": null,
        "date_online": 1509922961,
        "date_joined": 1509922961,
        "avatar": {
          "filename": "avatar.png",
          "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
          "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
          "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
        },
        "timezone": "",
        "language": "",
        "profile_url": "https://mod.io/u/xant"
      },
      "date_added": 1509922961,
      "date_updated": 1509922961,
      "date_live": 1509922961,
      "status": 1,
      "url": "https://mod.io/g/rogue-knight/r/getting-started",
      "name": "Getting Started",
      "name_id": "getting-started",
      "summary": "Alright, so let's get started with modding on mod.io",
      "description": "<h1>Getting Started</h2><p>Download this suspiciou....",
      "tags": [
        {
          "name": "Instructions",
          "date_added": 1499841487,
          "count": 22
        }
      ],
      "stats": [
        {
          "guide_id": 2,
          "visits_total": 0,
          "comments_total": 0
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
data|[Guide Object](#schemaguide_object)[]|Array containing guide objects.
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
      "game_id": 2,
      "mod_id": 2,
      "resource_id": 2,
      "user": {
        "id": 1,
        "name_id": "xant",
        "username": "XanT",
        "display_name_portal": null,
        "date_online": 1509922961,
        "date_joined": 1509922961,
        "avatar": {
          "filename": "avatar.png",
          "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
          "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
          "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
        },
        "timezone": "",
        "language": "",
        "profile_url": "https://mod.io/u/xant"
      },
      "date_added": 1499841487,
      "reply_id": 0,
      "thread_position": "01",
      "karma": 1,
      "karma_guest": 0,
      "content": "Hey <a href=\"https://mod.io/u/guest\">guest</a>, you should check out this mod!",
      "options": 0
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
result_count|integer|Number of results returned in this request.
result_offset|integer|Number of results skipped over. Defaults to 0 unless overridden by `_offset` filter.
result_limit|integer|Maximum number of results returned in the request. Defaults to 100 (max) unless overridden by `_limit` filter.
result_total|integer|Total number of results found.



## Get Mod Dependants  

<a name="schemaget_mod_dependants"></a>

```json
{
  "data": [
    {
      "mod_id": 231,
      "name": "Example Mod",
      "name_id": "rogue-knight-hd-pack",
      "status": 1,
      "visible": 1,
      "date_added": 1499841487,
      "date_updated": 1499841487,
      "logo": {
        "filename": "card.png",
        "original": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_640x360": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
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
data|[Mod Dependants Object](#schemamod_dependants_object)[]|Array containing mod depenants objects.
result_count|integer|Number of results returned in this request.
result_offset|integer|Number of results skipped over. Defaults to 0 unless overridden by `_offset` filter.
result_limit|integer|Maximum number of results returned in the request. Defaults to 100 (max) unless overridden by `_limit` filter.
result_total|integer|Total number of results found.



## Get Mod Dependencies  

<a name="schemaget_mod_dependencies"></a>

```json
{
  "data": [
    {}
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
      "downloads_today": 327,
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
      "name_localized": "Unity",
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
      "date_updated": 1499841487,
      "date_scanned": 1499841487,
      "virus_status": 0,
      "virus_positive": 0,
      "virustotal_hash": "",
      "filesize": 15181,
      "filesize_uncompressed": 16384,
      "filehash": {
        "md5": "2d4a0e2d7273db6b0a94b0740a88ad0d"
      },
      "filename": "rogue-knight-v1.zip",
      "version": "1.3",
      "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
      "metadata_blob": "rogue,hd,high-res,4k,hd textures",
      "download": {
        "binary_url": "https://*.modapi.io/v1/games/1/mods/1/files/1/download/c489a0354111a4d76640d47f0cdcb294",
        "date_expires": 1579316848
      },
      "platforms": [
        {
          "platform": "windows",
          "status": 1
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
data|[Modfile Object](#schemamodfile_object)[]|Array containing modfile objects.
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
        "display_name_portal": null,
        "date_online": 1509922961,
        "date_joined": 1509922961,
        "avatar": {
          "filename": "avatar.png",
          "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
          "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
          "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
        },
        "timezone": "",
        "language": "",
        "profile_url": "https://mod.io/u/xant"
      },
      "date_added": 1492564103,
      "date_updated": 1499841487,
      "date_live": 1499841403,
      "maturity_option": 0,
      "community_options": 3,
      "monetization_options": 0,
      "stock": 0,
      "price": 0,
      "tax": 0,
      "logo": {
        "filename": "card.png",
        "original": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_640x360": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
      },
      "homepage_url": "https://www.rogue-hdpack.com/",
      "name": "Rogue Knight HD Pack",
      "name_id": "rogue-knight-hd-pack",
      "summary": "It's time to bask in the glory of beautiful 4k textures!",
      "description": "<p>Rogue HD Pack does exactly what you thi...",
      "description_plaintext": "Rogue HD Pack does exactly what you thi...",
      "metadata_blob": "rogue,hd,high-res,4k,hd textures",
      "profile_url": "https://mod.io/g/rogue-knight/m/rogue-knight-hd-pack",
      "media": {
        "youtube": [
          "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        ],
        "sketchfab": [
          "https://sketchfab.com/models/ef40b2d300334d009984c8865b2db1c8"
        ],
        "images": [
          {
            "filename": "card.png",
            "original": "https://assets.modcdn.io/images/placeholder/card.png",
            "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
            "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
          }
        ]
      },
      "modfile": {
        "id": 2,
        "mod_id": 2,
        "date_added": 1499841487,
        "date_updated": 1499841487,
        "date_scanned": 1499841487,
        "virus_status": 0,
        "virus_positive": 0,
        "virustotal_hash": "",
        "filesize": 15181,
        "filesize_uncompressed": 16384,
        "filehash": {
          "md5": "2d4a0e2d7273db6b0a94b0740a88ad0d"
        },
        "filename": "rogue-knight-v1.zip",
        "version": "1.3",
        "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
        "metadata_blob": "rogue,hd,high-res,4k,hd textures",
        "download": {
          "binary_url": "https://*.modapi.io/v1/games/1/mods/1/files/1/download/c489a0354111a4d76640d47f0cdcb294",
          "date_expires": 1579316848
        },
        "platforms": [
          {
            "platform": "windows",
            "status": 1
          }
        ]
      },
      "dependencies": false,
      "platforms": [
        {
          "platform": "windows",
          "modfile_live": 1
        }
      ],
      "metadata_kvp": [
        {
          "metakey": "pistol-dmg",
          "metavalue": "800"
        }
      ],
      "tags": [
        {
          "name": "Unity",
          "name_localized": "Unity",
          "date_added": 1499841487
        }
      ],
      "stats": {
        "mod_id": 2,
        "popularity_rank_position": 13,
        "popularity_rank_total_mods": 204,
        "downloads_today": 327,
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
result_count|integer|Number of results returned in this request.
result_offset|integer|Number of results skipped over. Defaults to 0 unless overridden by `_offset` filter.
result_limit|integer|Maximum number of results returned in the request. Defaults to 100 (max) unless overridden by `_limit` filter.
result_total|integer|Total number of results found.



## Get Multipart Upload Parts 

<a name="schemaget_multipart_upload_parts"></a>

```json
{
  "data": [
    {
      "upload_id": "123e4567-e89b-12d3-a456-426614174000",
      "part_number": 1,
      "part_size": 52428800,
      "date_added": 1499846132
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
data|[Multipart Upload Part Object](#schemamultipart_upload_part_object)[]|Array containing Multipart Upload Part Objects.
result_count|integer|Number of results returned in this request.
result_offset|integer|Number of results skipped over. Defaults to 0 unless overridden by `_offset` filter.
result_limit|integer|Maximum number of results returned in the request. Defaults to 100(max) unless overridden by `_limit` filter.
result_total|integer|Total number of results found.



## Get Multipart Upload Sessions 

<a name="schemaget_multipart_upload_sessions"></a>

```json
{
  "data": [
    {
      "upload_id": "123e4567-e89b-12d3-a456-426614174000",
      "status": 0
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
data|[Multipart Upload Object](#schemamultipart_upload_object)[]|Array containing Multipart Upload Part Objects.
result_count|integer|Number of results returned in this request.
result_offset|integer|Number of results skipped over. Defaults to 0 unless overridden by `_offset` filter.
result_limit|integer|Maximum number of results returned in the request. Defaults to 100(max) unless overridden by `_limit` filter.
result_total|integer|Total number of results found.



## Get Muted Users  

<a name="schemaget_muted_users"></a>

```json
{
  "data": [
    {
      "id": 1,
      "name_id": "xant",
      "username": "XanT",
      "display_name_portal": null,
      "date_online": 1509922961,
      "date_joined": 1509922961,
      "avatar": {
        "filename": "avatar.png",
        "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
        "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
        "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
      },
      "timezone": "",
      "language": "",
      "profile_url": "https://mod.io/u/xant"
    },
    {
        ...
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
data|[User Object](#schemauser_object)[]|Array containing user objects.
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
        "display_name_portal": null,
        "date_online": 1509922961,
        "date_joined": 1509922961,
        "avatar": {
          "filename": "avatar.png",
          "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
          "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
          "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
        },
        "timezone": "",
        "language": "",
        "profile_url": "https://mod.io/u/xant"
      },
      "level": 8,
      "date_added": 1492058857,
      "position": "Turret Builder",
      "invite_pending": 1
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
data|array|Array containing user event objects.
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
data|array|Array containing rating objects.
result_count|integer|Number of results returned in this request.
result_offset|integer|Number of results skipped over. Defaults to 0 unless overridden by `_offset` filter.
result_limit|integer|Maximum number of results returned in the request. Defaults to 100 (max) unless overridden by `_limit` filter.
result_total|integer|Total number of results found.



## Guide Object

   <a name="schemaguide_object"></a>

```json
{
  "id": 1209,
  "game_id": 3,
  "game_name": "My Awesome Game",
  "logo": {
    "filename": "card.png",
    "original": "https://assets.modcdn.io/images/placeholder/card.png",
    "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
    "thumb_640x360": "https://assets.modcdn.io/images/placeholder/card.png",
    "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
  },
  "user": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "display_name_portal": null,
    "date_online": 1509922961,
    "date_joined": 1509922961,
    "avatar": {
      "filename": "avatar.png",
      "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
      "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
      "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
    },
    "timezone": "",
    "language": "",
    "profile_url": "https://mod.io/u/xant"
  },
  "date_added": 1509922961,
  "date_updated": 1509922961,
  "date_live": 1509922961,
  "status": 1,
  "url": "https://mod.io/g/rogue-knight/r/getting-started",
  "name": "Getting Started",
  "name_id": "getting-started",
  "summary": "Alright, so let's get started with modding on mod.io",
  "description": "<h1>Getting Started</h2><p>Download this suspiciou....",
  "tags": [
    {
      "name": "Instructions",
      "date_added": 1499841487,
      "count": 22
    }
  ],
  "stats": [
    {
      "guide_id": 2,
      "visits_total": 0,
      "comments_total": 0
    }
  ]
} 
```

### Properties

Name|Type|Description
---|---|---|---|
id|integer|Unique id of the guide.
game_id|integer|Unique id of the parent game.
game_name|string|Name of the parent game.
logo|[Logo Object](#schemalogo_object)|No description
user|[User Object](#schemauser_object)|No description
date_added|integer|Unix timestamp of the date the guide was made.
date_updated|integer|Unix timestamp of the date the guide was updated.
date_live|integer|Unix timestamp of the date the guide was set live.
status|integer|Status of the guide:<br><br>__0__ = Not Accepted<br>__1__ = Accepted<br>__3__ = Deleted
url|string|URL to the guide.
name|string|The name of the guide
name_id|string|Path for the guide on mod.io. For example: https://mod.io/g/rogue-knight/r/__getting-started__
summary|string|The summary of the guide
description|string|Detailed description of the guide (the contents) which allows HTML.
tags|[Guide Tag Object](#schemaguide_tag_object)[]|Contains guide tag data.
stats|[Guide Stats Object](#schemaguide_stats_object)[]|Contains stats data.



## Guide Stats Object  

<a name="schemaguide_stats_object"></a>

```json
{
  "guide_id": 2,
  "visits_total": 0,
  "comments_total": 0
} 
```

### Properties

Name|Type|Description
---|---|---|---|
guide_id|integer|Unique guide id.
visits_total|integer|Total number of visits for this guide
comments_total|integer|Total number of comments for this guide



## Guide Tag Object  

<a name="schemaguide_tag_object"></a>

```json
{
  "name": "Instructions",
  "date_added": 1499841487,
  "count": 22
} 
```

### Properties

Name|Type|Description
---|---|---|---|
name|string|Tag name.
date_added|integer|Unix timestamp of date tag was applied.
count|integer|The amount of times this tag has been applied to guides. This value will only be returned for the Get Guide Tags endpoint.



## Header Image Object  

<a name="schemaheader_image_object"></a>

```json
{
  "filename": "modio-logo-bluedark.png",
  "original": "https://assets.modcdn.io/images/branding/modio-logo-bluedark.png"
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
  "filename": "icon.png",
  "original": "https://assets.modcdn.io/images/placeholder/icon.png",
  "thumb_64x64": "https://assets.modcdn.io/images/placeholder/icon.png",
  "thumb_128x128": "https://assets.modcdn.io/images/placeholder/icon.png",
  "thumb_256x256": "https://assets.modcdn.io/images/placeholder/icon.png"
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
  "filename": "card.png",
  "original": "https://assets.modcdn.io/images/placeholder/card.png",
  "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
  "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
} 
```

### Properties

Name|Type|Description
---|---|---|---|
filename|string|Image filename including extension.
original|string|URL to the full-sized image.
thumb_320x180|string|URL to the image thumbnail.
thumb_1280x720|string|URL to the image thumbnail.



## Key-Value Pair Object  

<a name="schemakey-value_pair_object"></a>

```json
{
  "key": "retry-after",
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
  "filename": "card.png",
  "original": "https://assets.modcdn.io/images/placeholder/card.png",
  "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
  "thumb_640x360": "https://assets.modcdn.io/images/placeholder/card.png",
  "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
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



## Mod Dependants Object  

<a name="schemamod_dependants_object"></a>

```json
{
  "mod_id": 231,
  "name": "Example Mod",
  "name_id": "rogue-knight-hd-pack",
  "status": 1,
  "visible": 1,
  "date_added": 1499841487,
  "date_updated": 1499841487,
  "logo": {
    "filename": "card.png",
    "original": "https://assets.modcdn.io/images/placeholder/card.png",
    "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
    "thumb_640x360": "https://assets.modcdn.io/images/placeholder/card.png",
    "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
  }
} 
```

### Properties

Name|Type|Description
---|---|---|---|
mod_id|integer|Unique ID of the mod that serves as the dependency.
name|string|Name of the mod dependency.
name_id|string|Path for the mod on mod.io. For example: https://mod.io/g/rogue-knight/m/__rogue-knight-hd-pack__
status|integer|Status of the mod (see [status and visibility](#status-amp-visibility) for details):<br><br>__0__ = Not Accepted<br>__1__ = Accepted<br>__3__ = Deleted
visible|integer|Visibility of the mod (see [status and visibility](#status-amp-visibility) for details):<br><br>__0__ = Hidden<br>__1__ = Public
date_added|integer|Unix timestamp of date the dependency was added.
date_updated|integer|Unix timestamp of date mod was updated.
logo|[Logo Object](#schemalogo_object)|Contains media URL's to the logo for the mod.



## Mod Dependencies Object  

<a name="schemamod_dependencies_object"></a>

```json
{} 
```

### Properties

Name|Type|Description
---|---|---|---|
undefined|object|No description



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
      "filename": "card.png",
      "original": "https://assets.modcdn.io/images/placeholder/card.png",
      "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
      "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
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
    "display_name_portal": null,
    "date_online": 1509922961,
    "date_joined": 1509922961,
    "avatar": {
      "filename": "avatar.png",
      "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
      "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
      "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
    },
    "timezone": "",
    "language": "",
    "profile_url": "https://mod.io/u/xant"
  },
  "date_added": 1492564103,
  "date_updated": 1499841487,
  "date_live": 1499841403,
  "maturity_option": 0,
  "community_options": 3,
  "monetization_options": 0,
  "stock": 0,
  "price": 0,
  "tax": 0,
  "logo": {
    "filename": "card.png",
    "original": "https://assets.modcdn.io/images/placeholder/card.png",
    "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
    "thumb_640x360": "https://assets.modcdn.io/images/placeholder/card.png",
    "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
  },
  "homepage_url": "https://www.rogue-hdpack.com/",
  "name": "Rogue Knight HD Pack",
  "name_id": "rogue-knight-hd-pack",
  "summary": "It's time to bask in the glory of beautiful 4k textures!",
  "description": "<p>Rogue HD Pack does exactly what you thi...",
  "description_plaintext": "Rogue HD Pack does exactly what you thi...",
  "metadata_blob": "rogue,hd,high-res,4k,hd textures",
  "profile_url": "https://mod.io/g/rogue-knight/m/rogue-knight-hd-pack",
  "media": {
    "youtube": [
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    ],
    "sketchfab": [
      "https://sketchfab.com/models/ef40b2d300334d009984c8865b2db1c8"
    ],
    "images": [
      {
        "filename": "card.png",
        "original": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
        "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
      }
    ]
  },
  "modfile": {
    "id": 2,
    "mod_id": 2,
    "date_added": 1499841487,
    "date_updated": 1499841487,
    "date_scanned": 1499841487,
    "virus_status": 0,
    "virus_positive": 0,
    "virustotal_hash": "",
    "filesize": 15181,
    "filesize_uncompressed": 16384,
    "filehash": {
      "md5": "2d4a0e2d7273db6b0a94b0740a88ad0d"
    },
    "filename": "rogue-knight-v1.zip",
    "version": "1.3",
    "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
    "metadata_blob": "rogue,hd,high-res,4k,hd textures",
    "download": {
      "binary_url": "https://*.modapi.io/v1/games/1/mods/1/files/1/download/c489a0354111a4d76640d47f0cdcb294",
      "date_expires": 1579316848
    },
    "platforms": [
      {
        "platform": "windows",
        "status": 1
      }
    ]
  },
  "dependencies": false,
  "platforms": [
    {
      "platform": "windows",
      "modfile_live": 1
    }
  ],
  "metadata_kvp": [
    {
      "metakey": "pistol-dmg",
      "metavalue": "800"
    }
  ],
  "tags": [
    {
      "name": "Unity",
      "name_localized": "Unity",
      "date_added": 1499841487
    }
  ],
  "stats": {
    "mod_id": 2,
    "popularity_rank_position": 13,
    "popularity_rank_total_mods": 204,
    "downloads_today": 327,
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
submitted_by|[User Object](#schemauser_object)|The user who published the mod.
date_added|integer|Unix timestamp of date mod was registered.
date_updated|integer|Unix timestamp of date mod was updated.
date_live|integer|Unix timestamp of date mod was set live.
maturity_option|integer|Mature content found in this mod, this is only relevant if the parent game allows mods to be labelled as mature:<br><br>__0__ = None<br>__1__ = Alcohol<br>__2__ = Drugs<br>__4__ = Violence<br>__8__ = Explicit<br>__?__ = Add the options you want together, to enable multiple filters (see [BITWISE fields](#bitwise-and-bitwise-and))
community_options|integer|Community features enabled for this mod:<br><br>__0__ = All of the options below are disabled<br>__1__ = Enable comments<br>__64__ = Enable previews<br>__128__ = Enable preview URLs<br>__1024__ = Allow dependencies<br>__?__ = Add the options you want together, to enable multiple features (see [BITWISE fields](#bitwise-and-bitwise-and))
monetization_options|integer|Monetization features enabled for this mod:<br><br>__0__ = Access to monetization features disabled<br>__1__ = Access to monetization features enabled by the game for this mod<br>__2__ = Marketplace enabled<br>__8__ = Quantity of this mod is limited<br>__?__ = Add the options you want together, to enable multiple features (see [BITWISE fields](#bitwise-and-bitwise-and))
stock|integer|The stock of the mod. 0 is the default value, and is only used when the mod has limited quantity enabled.
price|integer|The price of the mod.
tax|integer|The tax of the mod.
logo|[Logo Object](#schemalogo_object)|Contains media URL's to the logo for the mod.
homepage_url|string|Official homepage of the mod.
name|string|Name of the mod.
name_id|string|Path for the mod on mod.io. For example: https://mod.io/g/rogue-knight/m/__rogue-knight-hd-pack__
summary|string|Summary of the mod.
description|string|Detailed description of the mod which allows HTML.
description_plaintext|string|`description` field converted into plaintext.
metadata_blob|string|Metadata that is designed to be handled by the game client and is recommended to not be exposed to content creators when submitting their mods. Metadata can also be stored as searchable [key value pairs](#metadata), and to individual [mod files](#get-modfiles).
profile_url|string|URL to the mod.
media|[Mod Media Object](#schemamod_media_object)|Contains YouTube & Sketchfab links, aswell as media URL's of images for the mod.
modfile|[Modfile Object](#schemamodfile_object)|The primary modfile for the mod.
dependencies|boolean|If the mod has any dependencies, this value will be set to `true`.
stats|[Mod Stats Object](#schemamod_stats_object)|Numerous aggregate stats for the mod.
platforms|[Mod Platforms Object](#schemamod_platforms_object)[]|Contains mod platform data.
metadata_kvp|[Metadata KVP Object](#schemametadata_kvp_object)[]|Contains key-value metadata.
tags|[Mod Tag Object](#schemamod_tag_object)[]|Contains mod tag data.



## Mod Platforms Object  

<a name="schemamod_platforms_object"></a>

```json
{
  "platform": "windows",
  "modfile_live": 1
} 
```

### Properties

Name|Type|Description
---|---|---|---|
platform|string|A [target platform](#targeting-a-platform).
modfile_live|integer|The unique id of the modfile that is currently live on the platform specified in the `platform` field.



## Mod Stats Object  

<a name="schemamod_stats_object"></a>

```json
{
  "mod_id": 2,
  "popularity_rank_position": 13,
  "popularity_rank_total_mods": 204,
  "downloads_today": 327,
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
downloads_today|integer|Number of total mod downloads. Count resets around 11:00 UTC+11 daily.
downloads_total|integer|Number of total mod downloads.
subscribers_total|integer|Number of total users who have subscribed to the mod.
ratings_total|integer|Number of times this mod has been rated.
ratings_positive|integer|Number of positive ratings.
ratings_negative|integer|Number of negative ratings.
ratings_percentage_positive|integer|Number of positive ratings, divided by the total ratings to determine it’s percentage score.
ratings_weighted_aggregate|float|Overall rating of this item calculated using the [Wilson score confidence interval](https://www.evanmiller.org/how-not-to-sort-by-average-rating.html). This column is good to sort on, as it will order items based on number of ratings and will place items with many positive ratings above those with a higher score but fewer ratings.
ratings_display_text|string|Textual representation of the rating in format:<br><br>- Overwhelmingly Positive<br>- Very Positive<br>- Positive<br>- Mostly Positive<br>- Mixed<br>- Negative<br>- Mostly Negative<br>- Very Negative<br>- Overwhelmingly Negative<br>- Unrated
date_expires|integer|Unix timestamp until this mods's statistics are considered stale.



## Mod Tag Object  

<a name="schemamod_tag_object"></a>

```json
{
  "name": "Unity",
  "name_localized": "Unity",
  "date_added": 1499841487
} 
```

### Properties

Name|Type|Description
---|---|---|---|
name|string|Tag name.
name_localized|string|The localized tag name influenced by the [Accept-Language](https://docs.mod.io/restapiref/#localization) header, defaults to English.
date_added|integer|**Deprecated:** Unix timestamp of date tag was applied.



## Mod User Preview Object 

<a name="schemamod_user_preview_object"></a>

```json
{
  "user": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "display_name_portal": null,
    "date_online": 1509922961,
    "date_joined": 1509922961,
    "avatar": {
      "filename": "avatar.png",
      "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
      "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
      "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
    },
    "timezone": "",
    "language": "",
    "profile_url": "https://mod.io/u/xant"
  },
  "user_from": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "display_name_portal": null,
    "date_online": 1509922961,
    "date_joined": 1509922961,
    "avatar": {
      "filename": "avatar.png",
      "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
      "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
      "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
    },
    "timezone": "",
    "language": "",
    "profile_url": "https://mod.io/u/xant"
  },
  "resource_url": "https://mod.io/g/@rogueknight/m/@some-mod",
  "subscribed": false,
  "date_added": 1499841487
} 
```

### Properties

Name|Type|Description
---|---|---|---|
user|[User Object](#schemauser_object)|The previewing user.
user_from|[User Object](#schemauser_object)|The user who invited the previewing user, if the previewer was added manually.
resource_url|string|The URL of the resource that the registrant should be redirect to upon success.
subscribed|boolean|If the user is also subscribed to the resource.
date_added|integer|Unix timestamp of the date the user was registered as a previewer.



## Modfile Object

   <a name="schemamodfile_object"></a>

```json
{
  "id": 2,
  "mod_id": 2,
  "date_added": 1499841487,
  "date_updated": 1499841487,
  "date_scanned": 1499841487,
  "virus_status": 0,
  "virus_positive": 0,
  "virustotal_hash": "",
  "filesize": 15181,
  "filesize_uncompressed": 16384,
  "filehash": {
    "md5": "2d4a0e2d7273db6b0a94b0740a88ad0d"
  },
  "filename": "rogue-knight-v1.zip",
  "version": "1.3",
  "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
  "metadata_blob": "rogue,hd,high-res,4k,hd textures",
  "download": {
    "binary_url": "https://*.modapi.io/v1/games/1/mods/1/files/1/download/c489a0354111a4d76640d47f0cdcb294",
    "date_expires": 1579316848
  },
  "platforms": [
    {
      "platform": "windows",
      "status": 1
    }
  ]
} 
```

### Properties

Name|Type|Description
---|---|---|---|
id|integer|Unique modfile id.
mod_id|integer|Unique mod id.
date_added|integer|Unix timestamp of date file was added.
date_updated|integer|Unix timestamp of date file was updated.
date_scanned|integer|Unix timestamp of date file was virus scanned.
virus_status|integer|Current virus scan status of the file. For newly added files that have yet to be scanned this field will change frequently until a scan is complete:<br><br>__0__ = Not scanned<br>__1__ = Scan complete<br>__2__ = In progress<br>__3__ = Too large to scan<br>__4__ = File not found<br>__5__ = Error Scanning
virus_positive|integer|Was a virus detected:<br><br>__0__ = No threats detected<br>__1__ = Flagged as malicious<br>__2__ = Flagged as containing potentially harmful files (i.e. EXEs)
virustotal_hash|string|Deprecated: No longer used and will be removed in subsequent API version.
filesize|integer|Size of the file in bytes.
filesize_uncompressed|integer|The uncompressed filesize of the zip archive.
filehash|[Filehash Object](#schemafilehash_object)|Contains a dictionary of filehashes for the contents of the download.
filename|string|Filename including extension.
version|string|Release version this file represents.
changelog|string|Changelog for the file.
metadata_blob|string|Metadata stored by the game developer for this file.
download|[Download Object](#schemadownload_object)|Contains download data for the modfile.
platforms|[Modfile Platform Object](#schemamodfile_platform_object)[]|Contains modfile platform data.



## Modfile Platform Object  

<a name="schemamodfile_platform_object"></a>

```json
{
  "platform": "windows",
  "status": 1
} 
```

### Properties

Name|Type|Description
---|---|---|---|
platform|string|A [target platform](#targeting-a-platform).
status|integer|The status of the modfile for the corresponding `platform`. Possible values:<br><br>__0__ = Pending<br>__1__ = Approved<br>__2__ = Denied<br>__3__ = Targetted



## Modfile Platform Supported Object 

<a name="schemamodfile_platform_supported_object"></a>

```json
{
  "targetted": [
    "string"
  ],
  "approved": [
    "string"
  ],
  "denied": [
    "string"
  ],
  "live": [
    "string"
  ],
  "pending": [
    "string"
  ]
} 
```

### Properties

Name|Type|Description
---|---|---|---|
targetted|string[]|Array of [valid platform strings](#targeting-a-platform) showing which platforms the  modfile has targeted for release.
approved|string[]|Array of [valid platform strings](#targeting-a-platform) showing which platforms the modfile has been approved for.
denied|string[]|Array of [valid platform strings](#targeting-a-platform) showing which platforms the modfile has been denied for.
live|string[]|Array of [valid platform strings](#targeting-a-platform) showing which platforms the modfile is currently marked as live on.
pending|string[]|Array of [valid platform strings](#targeting-a-platform) showing which platforms the modfile is currently marked as pending on.



## Monetization Team Accounts Object 

<a name="schemamonetization_team_accounts_object"></a>

```json
{
  "id": 1,
  "name_id": "xant",
  "username": "XanT",
  "monetization_status": 0,
  "monetization_options": 0,
  "split": 0
} 
```

### Properties

Name|Type|Description
---|---|---|---|
id|integer|Unique id of the user.
name_id|string|Path for the user on mod.io. For example: https://mod.io/u/__name-id-here__
username|string|Display name of the user.
monetization_status|integer|The monetization status of the user.
monetization_options|integer|The monetization options of the user.
split|integer|User monetization split.



## Multipart Upload Object  

<a name="schemamultipart_upload_object"></a>

```json
{
  "upload_id": "123e4567-e89b-12d3-a456-426614174000",
  "status": 0
} 
```

### Properties

Name|Type|Description
---|---|---|---|
upload_id|string|A universally unique identifier (UUID) that represents the upload session.
status|integer|The status of the upload session:<br><br>__0__ = Incomplete<br>__1__ = Pending<br>__2__ = Processing<br>__3__ = Complete<br>__4__ = Cancelled



## Multipart Upload Part Object 

<a name="schemamultipart_upload_part_object"></a>

```json
{
  "upload_id": "123e4567-e89b-12d3-a456-426614174000",
  "part_number": 1,
  "part_size": 52428800,
  "date_added": 1499846132
} 
```

### Properties

Name|Type|Description
---|---|---|---|
upload_id|string|A universally unique identifier (UUID) that represents the upload session.
part_number|integer|The part number this object represents.
part_size|integer|The size of this part in bytes.
date_added|integer|Unix timestamp of date the part was uploaded.



## Pay Object

   <a name="schemapay_object"></a>

```json
{
  "transaction_id": 0,
  "gross_amount": 0,
  "net_amount": 0,
  "platform_fee": 0,
  "gateway_fee": 0,
  "transaction_type": "string",
  "meta": {},
  "purchase_date": 1626667557,
  "wallet_type": "string",
  "balance": 0,
  "deficit": 0,
  "payment_method_id": "string",
  "mod": {
    "id": 2,
    "game_id": 2,
    "status": 1,
    "visible": 1,
    "submitted_by": {
      "id": 1,
      "name_id": "xant",
      "username": "XanT",
      "display_name_portal": null,
      "date_online": 1509922961,
      "date_joined": 1509922961,
      "avatar": {
        "filename": "avatar.png",
        "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
        "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
        "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
      },
      "timezone": "",
      "language": "",
      "profile_url": "https://mod.io/u/xant"
    },
    "date_added": 1492564103,
    "date_updated": 1499841487,
    "date_live": 1499841403,
    "maturity_option": 0,
    "community_options": 3,
    "monetization_options": 0,
    "stock": 0,
    "price": 0,
    "tax": 0,
    "logo": {
      "filename": "card.png",
      "original": "https://assets.modcdn.io/images/placeholder/card.png",
      "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
      "thumb_640x360": "https://assets.modcdn.io/images/placeholder/card.png",
      "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
    },
    "homepage_url": "https://www.rogue-hdpack.com/",
    "name": "Rogue Knight HD Pack",
    "name_id": "rogue-knight-hd-pack",
    "summary": "It's time to bask in the glory of beautiful 4k textures!",
    "description": "<p>Rogue HD Pack does exactly what you thi...",
    "description_plaintext": "Rogue HD Pack does exactly what you thi...",
    "metadata_blob": "rogue,hd,high-res,4k,hd textures",
    "profile_url": "https://mod.io/g/rogue-knight/m/rogue-knight-hd-pack",
    "media": {
      "youtube": [
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      ],
      "sketchfab": [
        "https://sketchfab.com/models/ef40b2d300334d009984c8865b2db1c8"
      ],
      "images": [
        {
          "filename": "card.png",
          "original": "https://assets.modcdn.io/images/placeholder/card.png",
          "thumb_320x180": "https://assets.modcdn.io/images/placeholder/card.png",
          "thumb_1280x720": "https://assets.modcdn.io/images/placeholder/card.png"
        }
      ]
    },
    "modfile": {
      "id": 2,
      "mod_id": 2,
      "date_added": 1499841487,
      "date_updated": 1499841487,
      "date_scanned": 1499841487,
      "virus_status": 0,
      "virus_positive": 0,
      "virustotal_hash": "",
      "filesize": 15181,
      "filesize_uncompressed": 16384,
      "filehash": {
        "md5": "2d4a0e2d7273db6b0a94b0740a88ad0d"
      },
      "filename": "rogue-knight-v1.zip",
      "version": "1.3",
      "changelog": "VERSION 1.3 -- Changes -- Fixed critical castle floor bug.",
      "metadata_blob": "rogue,hd,high-res,4k,hd textures",
      "download": {
        "binary_url": "https://*.modapi.io/v1/games/1/mods/1/files/1/download/c489a0354111a4d76640d47f0cdcb294",
        "date_expires": 1579316848
      },
      "platforms": [
        {
          "platform": "windows",
          "status": 1
        }
      ]
    },
    "dependencies": false,
    "platforms": [
      {
        "platform": "windows",
        "modfile_live": 1
      }
    ],
    "metadata_kvp": [
      {
        "metakey": "pistol-dmg",
        "metavalue": "800"
      }
    ],
    "tags": [
      {
        "name": "Unity",
        "name_localized": "Unity",
        "date_added": 1499841487
      }
    ],
    "stats": {
      "mod_id": 2,
      "popularity_rank_position": 13,
      "popularity_rank_total_mods": 204,
      "downloads_today": 327,
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
} 
```

### Properties

Name|Type|Description
---|---|---|---|
transaction_id|integer|The transaction id.
gross_amount|integer|The gross amount of the purchase in the lowest denomination of currency.
net_amount|integer|The net amount of the purchase in the lowest denomination of currency.
platform_fee|integer|The platform fee of the purchase in the lowest denomination of currency.
gateway_fee|integer|The gateway fee of the purchase in the lowest denomination of currency.
transaction_type|string|The state of the transaction that was processed. E.g. CANCELLED, CLEARED, FAILED, PAID, PENDING, REFUNDED.
meta|object|The metadata that was given in the transaction.
purchase_date|integer|The time of the purchase.
wallet_type|string|The type of wallet that was used for the purchase. E.g. STANDARD_MIO.
balance|integer|The balance of the wallet.
deficit|integer|The deficit of the wallet.
payment_method_id|string|The payment method id that was used.
mod|[Mod Object](#schemamod_object)|The mod that was purchased.



## Preview Object

   <a name="schemapreview_object"></a>

```json
{
  "resource_url": "https://mod.io/g/@rogueknight/m/@some-mod?preview=00000000000000000000000000000000",
  "date_added": 1499841487,
  "date_updated": 1499841487
} 
```

### Properties

Name|Type|Description
---|---|---|---|
resource_url|string|The sharable URL that resource admins can pass around.
date_added|integer|Unix timestamp of the date the hash was first generated.
date_updated|integer|Unix timestamp of the date the hash was regenerated.



## Proxy Transformer Object  

<a name="schemaproxy_transformer_object"></a>

```json
{
  "success": true
} 
```

### Properties

Name|Type|Description
---|---|---|---|
success|bool|Did the operation succeed?



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
rating|integer|Mod rating value:<br><br>__1__ = Positive Rating<br>__-1__ = Negative Rating
date_added|integer|Unix timestamp of date rating was submitted.



## Refund Object

   <a name="schemarefund_object"></a>

```json
{
  "transaction_id": 0,
  "gross_amount": 0,
  "net_amount": 0,
  "platform_fee": 0,
  "gateway_fee": 0,
  "tax": 0,
  "tax_type": "string",
  "transaction_type": "string",
  "meta": {},
  "purchase_date": null
} 
```

### Properties

Name|Type|Description
---|---|---|---|
transaction_id|integer|The transaction id.
gross_amount|integer|The gross amount of the purchase in the lowest denomination of currency.
net_amount|integer|The net amount of the purchase in the lowest denomination of currency.
platform_fee|integer|The platform fee of the purchase in the lowest denomination of currency.
gateway_fee|integer|The gateway fee of the purchase in the lowest denomination of currency.
tax|integer|The tax amount of the purchase in cents.
tax_type|string|The tax type.
transaction_type|string|The state of the transaction that was processed. E.g. CANCELLED, CLEARED, FAILED, PAID, PENDING, REFUNDED.
meta|object|The metadata that was given in the transaction.
purchase_date|timestamp|The time of the purchase.



## S2S Pay Object  

<a name="schemas2s_pay_object"></a>

```json
{
  "transaction_id": 0,
  "gross_amount": 0,
  "net_amount": 0,
  "platform_fee": 0,
  "gateway_fee": 0,
  "transaction_type": "string",
  "meta": {},
  "purchase_date": 1626667557
} 
```

### Properties

Name|Type|Description
---|---|---|---|
transaction_id|integer|The transaction id.
gross_amount|integer|The gross amount of the purchase in the lowest denomination of currency.
net_amount|integer|The net amount of the purchase in the lowest denomination of currency.
platform_fee|integer|The platform fee of the purchase in the lowest denomination of currency.
gateway_fee|integer|The gateway fee of the purchase in the lowest denomination of currency.
transaction_type|string|The state of the transaction that was processed. E.g. CANCELLED, CLEARED, FAILED, PAID, PENDING, REFUNDED.
meta|object|The metadata that was given in the transaction.
purchase_date|integer|The time of the purchase.



## Status Audit Log Object 

<a name="schemastatus_audit_log_object"></a>

```json
{
  "status_new": 1,
  "status_old": 0,
  "user": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "display_name_portal": null,
    "date_online": 1509922961,
    "date_joined": 1509922961,
    "avatar": {
      "filename": "avatar.png",
      "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
      "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
      "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
    },
    "timezone": "",
    "language": "",
    "profile_url": "https://mod.io/u/xant"
  },
  "date_added": 1492564103,
  "reason": ""
} 
```

### Properties

Name|Type|Description
---|---|---|---|
status_new|integer|The new status of the resource (see [status and visibility](#status-amp-visibility) for details):<br><br>__0__ = Not Accepted<br>__1__ = Accepted<br>__3__ = Deleted
status_old|integer|The old status of the resource (see [status and visibility](#status-amp-visibility) for details):<br><br>__0__ = Not Accepted<br>__1__ = Accepted<br>__3__ = Deleted
user|[User Object](#schemauser_object)|User Object of the user who triggered the state change.
date_added|integer|Unix timestamp of date the status change was triggered.
reason|string|Optional notes provided by the actionee, usually containing the reason why the status change was triggered.



## Team Member Object  

<a name="schemateam_member_object"></a>

```json
{
  "id": 457,
  "user": {
    "id": 1,
    "name_id": "xant",
    "username": "XanT",
    "display_name_portal": null,
    "date_online": 1509922961,
    "date_joined": 1509922961,
    "avatar": {
      "filename": "avatar.png",
      "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
      "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
      "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
    },
    "timezone": "",
    "language": "",
    "profile_url": "https://mod.io/u/xant"
  },
  "level": 8,
  "date_added": 1492058857,
  "position": "Turret Builder",
  "invite_pending": 1
} 
```

### Properties

Name|Type|Description
---|---|---|---|
id|integer|Unique team member id.
user|[User Object](#schemauser_object)|The user associated with this team access.
level|integer|Level of permission the user has:<br><br>__1__ = Moderator (can moderate comments and content attached)<br>__4__ = Manager (moderator access, including uploading builds and editing settings except supply and team members)<br>__8__ = Administrator (full access, including editing the supply and team)
date_added|integer|Unix timestamp of the date the user was added to the team.
position|string|Custom title given to the user in this team.
invite_pending|integer|If the team member invitation is still pending:<br><br>__0__ = Invitation Accepted<br>__1__ = Invitation Pending



## Terms Object

   <a name="schematerms_object"></a>

```json
{
  "plaintext": "This game uses mod.io to support user-generated content. By selecting "I Agree" you agree to the mod.io Terms of Use and a mod.io account will be created for you (using your display name, avatar and ID). Please see the mod.io Privacy Policy on how mod.io processes your personal data.",
  "html": "<p>This game uses <a href="https://mod.io">mod.io</a> to support user-generated content. By selecting "I Agree" you agree to the mod.io <a href="https://mod.io/terms">Terms of Use</a> and a mod.io account will be created for you (using your display name, avatar and ID). Please see the mod.io <a href="https://mod.io/privacy">Privacy Policy</a> on how mod.io processes your personal data.</p>",
  "buttons": {
    "agree": {
      "text": "I Agree"
    },
    "disagree": {
      "text": "No, Thanks"
    }
  },
  "links": {
    "website": {
      "text": "Website",
      "url": "https://mod.io",
      "required": false
    },
    "terms": {
      "text": "Terms of Use",
      "url": "https://mod.io/terms",
      "required": true
    },
    "privacy": {
      "text": "Privacy Policy",
      "url": "https://mod.io/privacy",
      "required": true
    },
    "manage": {
      "text": "Manage Account",
      "url": "https://mod.io/me/account",
      "required": false
    }
  }
} 
```

### Properties

Name|Type|Description
---|---|---|---|
plaintext|string|Terms text in plaintext formatting.
html|string|Terms text in HTML formatting.
buttons|object|Buttons to embed into the Terms.
» agree|object|I Agree Button.
»» text|string|Button text.
» disagree|object|Disagree Button.
»» text|string|Button text.
links|object|Links to embed into the Terms.
» website|object|Website link.
»» text|string|Text for the link.
»» url|string|Link to the mod.io website.
»» required|boolean|Is this link required.
» terms|object|Terms of Use link.
»» text|string|Text for the link.
»» url|string|Link to the mod.io Terms of Use.
»» required|boolean|Is this link required.
» privacy|object|Privacy Policy link.
»» text|string|Text for the link.
»» url|string|Link to the mod.io Privacy Policy.
»» required|boolean|Is this link required.
» manage|object|Manage User Account link.
»» text|string|Text for the link.
»» url|string|Link to the mod.io page to manage a User's Account.
»» required|boolean|Is this link required.



## Theme Object

   <a name="schematheme_object"></a>

```json
{
  "primary": "#44bfd5",
  "dark": "#2c2c3f",
  "light": "#ffffff",
  "success": "#68D391",
  "warning": "#d6af2e",
  "danger": "#ff000e"
} 
```

### Properties

Name|Type|Description
---|---|---|---|
primary|string|The primary hex color code.
dark|string|The dark hex color code.
light|string|The light hex color code.
success|string|The success hex color code.
warning|string|The warning hex color code.
danger|string|The danger hex color code.



## User Access Object  

<a name="schemauser_access_object"></a>

```json
{
  "resource_type": "games",
  "resource_id": 3026,
  "resource_name": "My Awesome Mod",
  "resource_name_id": "my-awesome-mod",
  "resource_url": ""
} 
```

### Properties

Name|Type|Description
---|---|---|---|
resource_type|string|Type of resource. Can be one of the following:<br><br>- _games_<br>- _mods_<br>-_guides_
resource_id|integer|Unique id of the resource.
resource_name|integer|The relative name of the resource.
resource_name_id|string|Path for the resource on mod.io.
resource_url|string|URL to the resource that was reported. If the resource has been permanently deleted, and thus you cannot access it anymore - this field will be null.



## User Delegation Token Object 

<a name="schemauser_delegation_token_object"></a>

```json
{
  "entity": "purchase_server",
  "token": "eyJ0eXAiOiXKV1QibCJhbLciOiJeiUzI1....."
} 
```

### Properties

Name|Type|Description
---|---|---|---|
entity|string|The entity the User Delegation Token was created for. Possible Values are `purchase_server`.
token|string|The user delegation token. This cannot be used to authenticate API requests and instead can only be used as request context for select S2S endpoints.



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
  "display_name_portal": null,
  "date_online": 1509922961,
  "date_joined": 1509922961,
  "avatar": {
    "filename": "avatar.png",
    "original": "https://assets.modcdn.io/images/placeholder/avatar.png",
    "thumb_50x50": "https://assets.modcdn.io/images/placeholder/avatar_50x50.png",
    "thumb_100x100": "https://assets.modcdn.io/images/placeholder/avatar_100x100.png"
  },
  "timezone": "",
  "language": "",
  "profile_url": "https://mod.io/u/xant"
} 
```

### Properties

Name|Type|Description
---|---|---|---|
id|integer|Unique id of the user.
name_id|string|Path for the user on mod.io. For example: https://mod.io/u/__name-id-here__
username|string|Display name of the user.
display_name_portal|string|The users' display name for the targeted portal. Value will be `null` if no valid `X-Modio-Portal` portal header value is provided. For more information see [Targeting a Portal](#targeting-a-portal).
date_online|integer|Unix timestamp of date the user was last online.
date_joined|integer|Unix timestamp of date the user joined.
avatar|[Avatar Object](#schemaavatar_object)|Contains media URL's to the users avatar.
timezone|string|Deprecated: No longer used and will be removed in subsequent API version.
language|string|Deprecated: No longer used and will be removed in subsequent API version. To [localize the API response](#localization) we recommend you set the `Accept-Language` header.
profile_url|string|URL to the users profile.



## Wallet Balance Object  

<a name="schemawallet_balance_object"></a>

```json
{
  "balance": 0
} 
```

### Properties

Name|Type|Description
---|---|---|---|
balance|integer|The balance of the wallet.



## Wallet Object

   <a name="schemawallet_object"></a>

```json
{
  "type": "string",
  "payment_method_id": "string",
  "game_id": "string",
  "currency": "string",
  "balance": 0,
  "deficit": 0,
  "monetization_status": 1
} 
```

### Properties

Name|Type|Description
---|---|---|---|
type|string|The type of the wallet.
payment_method_id|string|The payment_method_id of the wallet.
game_id|string|The game_id if it's a game wallet.
currency|string|The currency of the wallet.
balance|integer|The balance of the wallet.
deficit|integer|The deficit of the wallet.
monetization_status|integer|The status of a monetized user for the corresponding `status`. Possible values:<br><br>__0__ = Unregistered<br>__1__ = Pending<br>__2__ = Rejected<br>__4__ = Review<br>__8__ = Action<br>__16__ = Approved<br>__32__ = Member



## Web Message Object  

<a name="schemaweb_message_object"></a>

```json
{
  "code": 200,
  "success": true,
  "message": "You have successfully logged out of mod.io."
} 
```

### Properties

Name|Type|Description
---|---|---|---|
code|integer|HTTP response code.
success|boolean|Was the request completed successfully?
message|string|Optional message to display to the user.



