# Getting Started

## --parse_sitename API --parse_version

Welcome to the official documentation for [--parse_sitename](--parse_siteurl), an API for developers to add mod support to their games. Using our [SDKs and plugins](#implementation) for popular and custom game engines, getting your creator community started and making the mods they create discoverable and installable via your in-game menu is straight forward, with full cross-platform support. If you are a game developer, you can manage your games and API access via your [--parse_sitename content dashboard](--parse_siteurl/content). If you are a user creating tools and apps, you can request API access via your [--parse_sitename account](--parse_siteurl/me/access).

__API path:__ [--parse_apiurl](--parse_apiurl) (see your API access dashboard)

__Current version:__ --parse_vdropdown 

<a href="changelog/"><span class="versionwrap">View Version Changelog</span></a>

## How It Works

Compatible with all builds of your game on all platforms and stores, --parse_sitename is a clientless and standalone solution which gives you complete control over your modding ecosystem.

![--parse_sitename Overview](images/sdk.png)

## Implementation

Once you have added your game to --parse_sitename and got your [game ID and API key](--parse_siteurl/content), you can start integrating the --parse_sitename REST API into your game, tools and sites. There are 3 options to get connected which you can use interchangeably depending on your needs. Here's the breakdown of each option.

Option | Usage | Suited for | Docs
---------- | ---------- | ---------- | ---------
__API__ | For connecting directly to the --parse_sitename REST API. | Web apps that need a JSON REST API, or game developers that like a challenge and want control over their implementation. | You are reading them
__SDK__ | Drop our [open source C/C++ SDK](https://github.com/modio/modio-sdk) into your game to call --parse_sitename functionality. | Developers that want a SDK that abstracts the uploading, downloading and unzip flows behind easy to use function calls. | [Here](--parse_docsurl/cppsdkref/)
__Tools/Plugins__ | Use tools, plugins and wrappers created by the community to make implementation in various engines easy. | Game developers that want a pre-built modding solution for their engine (Unity, Unreal, GameMaker, Construct) of choice. | Available below

### Official Tools

Plugins and wrappers made or supported by the --parse_sitename team

 | - | - | -
--- | --- | --- | ---
![Unity Plugin](images/tool-unity.png) | __Unity Plugin__<br />[SDK](https://github.com/modio/modio-unity)<br />[Getting Started](--parse_docsurl/unityref/)<br />[Sample Project](https://github.com/modio/modio-unity-sample)<br /> | ![Unreal Plugin](images/tool-unreal.png) | __Unreal Plugin__<br />[SDK](https://github.com/modio/modio-ue)<br />[Getting Started](--parse_docsurl/unrealref/)<br />[UE4 Sample Project](https://github.com/modio/modio-ue4-sample)<br />[UE5 Sample Project](https://github.com/modio/modio-ue5-sample)<br />
![GameMaker](images/tool-gm.png) | __GameMaker__<br />[SDK](https://github.com/YoYoGames/GMEXT-mod.io)<br />[Getting Started](https://github.com/YoYoGames/GMEXT-mod.io/wiki)<br /> | ![C/C++ SDK](images/tool-ccpp.png) | __C/C++ SDK__<br />[SDK](https://github.com/modio/modio-sdk)<br />[Getting Started](--parse_docsurl/cppsdkref/)<br />
![Discord Bot](images/tool-discordbot.png) | __Discord Bot__<br />[Instructions](https://github.com/modio/modio-discord-bot)<br />[Invite](--parse_discordboturl)<br /> | 

### Community Tools

Plugins and wrappers made by our awesome community. Is there a tool out there that should be added to the list? [Get in touch!](mailto:--parse_email?subject=Publish Tool)

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

- Use an [API key](--parse_siteurl/me/access) for **Read-only** access (get a [test environment](--parse_sitetesturl/me/access) API key here)
- Use the [Email Authentication Flow](#email) for **Read and Write** access (it creates an OAuth 2 Access Token via **email**)
- Use the [Platform Authentication Flow](#steam) for **Read and Write** access (it creates an OAuth 2 Access Token automatically on popular platforms such as **Steam and Xbox**)
- Use the [OpenID Authentication Flow](#openid) for **Read and Write** access (it creates an OAuth 2 Access Token automatically using your identity provider for SSO)
- Manually create an [OAuth 2 Access Token](--parse_siteurl/me/access) for **Read and Write** access (get a [test environment](--parse_sitetesturl/me/access) OAuth 2 token here)

All users and games are issued an API key which must be included when querying the API. It is quick and easy to use but limited to read-only GET requests, due to the limited security it offers. If you want players to be able to add, edit, rate and subscribe to content, you will need to use an authentication method that generates an OAuth 2 Access token. These [authentication methods](#authentication-2) are explained in detail here.

Authentication Type | In | HTTP Methods | Abilities | Purpose
---------- | ---------- | ---------- | ---------- | ---------- 
API Key | Query | GET | Read-only GET requests and authentication flows. | Browsing and downloading content. Retrieving access tokens on behalf of users.
Access Token (OAuth 2) | Header | GET, POST, PUT, DELETE | Read, create, update, delete. | View, add, edit and delete content the authenticated user has subscribed to or has permission to change.

You can use an OAuth 2.0 bearer token instead of an API key for GET endpoints (excluding [Authentication](#authentication-2) endpoints). But remember, if you provide both an Access Token (OAuth 2) and an API key in one request, the access token takes precedence and the API key is ignored. So, always ensure you use a valid access token and have the process in place to get a new token when the old one expires.

### Web Overlay Authentication

At the moment it is not possible to open the --parse_sitename website in-game with the user pre-authenticated, however you can provide a hint by appending `?portal=PORTAL` to the end of the URL. What this tells --parse_sitename, is that when the user attempts to perform an action that requires authentication, they will be prompted to login with their `PORTAL` account. For example if you want to take a mod creator to their mod webpage in-game on Steam, the URL would look something like: `--parse_gameurl/m/modname?portal=steam`. You can optionally add `&login=auto` as well to automatically start the login process. [Supported portals](#targeting-a-portal) can be found here.

### Scopes (OAuth 2)

--parse_sitename allows you to specify the permission each access token has (default is _read+write_), this is done by the use of scopes. See below for a full list of scopes available, you must include at least one scope when generating a new token.

Scope | Abilities
---------- | ----------
`read` | When authenticated with a token that *only* contains the `read` scope, you will only be able to read data via GET requests. 
`write` | When authenticated with a token that contains the `write` scope, you are able to add, edit and remove resources.
`read+write` | The above scopes combined. _Default for email and external ticket verification flow._

## Making Requests

Requests to the --parse_sitename API are to be over HTTPS (Port 443), any requests made over HTTP will return a `400 Bad Request` response.

### Using an API Key

```
curl -X get --parse_apiurl/games?api_key=xxxxxxxxxxxxxxxx
``` 

To authenticate using your unique 32-character API key, append the `api_key=xxxxxxxxxxxxxxxx` parameter to the end of your request. Remember that using an API key means requests are read-only, if you want to create, update or delete resources - authentication via OAuth 2 is required which you can [set up with your api key](#authentication).

### Using an Access Token

> Example POST request with no binary files

```shell
curl -X POST --parse_apiurl/games/1/mods/1/tags \
  -H 'Authorization: Bearer your-token-here' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'tags[]=Unity' \
  -d 'tags[]=FPS'
```

To authenticate using an OAuth 2 access token, you must include the HTTP header `Authorization` in your request with the value Bearer *your-token-here*. Verification via Access Token allows much greater power including creating, updating and deleting resources that you have access to. Also because OAuth 2 access tokens are tied to a user account, you can personalize the output by viewing content they are subscribed and connected to via the [me endpoint](#me) and by using relevant filters.

### Access Token Lifetime & Expiry

By default, all access token's are long-lived - meaning they are valid for a common year (not leap year) from the date of issue. You should architect your application to smoothly handle the event in which a token expires or is revoked by the user themselves or a --parse_sitename admin, triggering a `401 Unauthorized` API response.

If you would like tokens issued through your game to have a shorter lifespan, you can do this by providing the `date_expires` parameter on any endpoint that returns an access token such as the [Email Exchange](#email) or [Authenticate via Steam](#steam) endpoints. If the parameter is not supplied, it will default to 1 year from the request date, if the supplied parameter value is above one year or below the current server time it will be ignored and the default value restored.

### Request Content-Type

If you are making a request that includes a file, your request `Content-Type` header __must__ be `multipart/form-data`, otherwise if the request contains data (but no files) it should be `application/x-www-form-urlencoded`, which is UTF-8 encoded. 

> Example POST request with binary file

```shell
curl -X POST --parse_apiurl/games/1/mods \
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
curl -X POST --parse_apiurl/games/1/mods/1/team \
  -H 'Authorization: Bearer your-token-here' \
  -H 'Content-Type: application/x-www-form-urlencoded' \  
  -d 'input_json={
		"email": "--parse_email",
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
	"error_ref": --parse_errorref_MOD_NO_VIEW_PERMISSION,
	"message": "You do not have the required permissions to access this resource."
}
```

If an error occurs, --parse_sitename returns an error object with the HTTP `code`, `error_ref` and `message` to describe what happened and when possible how to avoid repeating the error. It's important to know that if you encounter errors that are not server errors (`500`+ codes) - you should review the error message before continuing to send requests to the endpoint.

When requests contain invalid input data or query parameters (for filtering), an optional field object called `errors` can be supplied inside the `error` object, which contains a list of the invalid inputs. The nested `errors` object is only supplied with `422 Unprocessable Entity` responses. Be sure to review the [Response Codes](#response-codes) to be aware of the HTTP codes that the --parse_sitename API returns.

> Error object with input errors

```json
"error": {
	"code": 422,
	"error_ref": --parse_errorref_VALIDATION_GENERIC,
	"message": "Validation Failed. Please see below to fix invalid input.",
	"errors": {
		"summary":"The mod summary cannot be more than 200 characters long.",
	}
}
```

Remember that [Rate Limiting](#rate-limiting) applies whether an error is returned or not, so to avoid exceeding your daily quota be sure to always investigate error messages - instead of continually retrying.

## Error Codes

Along with generic [HTTP response codes](#response-codes), we also provide --parse_sitename specific error codes to help you better understand what has gone wrong with a request. Below is a list of the most common `error_ref` codes you could encounter when consuming the API, as well as the reason for the error occuring. For error codes specific to each endpoint, click the 'Show All Responses' dropdown on the specified endpoint documentation.

> Example request with malformed api_key 

```shell
curl -X GET --parse_apiurl/games?api_key=malformed_key
```

```json
{
    "error": {
        "code": 401,
        "error_ref": --parse_errorref_API_KEY_MALFORMED,
        "message": "We cannot complete your request due to a malformed/missing api_key in your request. Refer to documentation at --parse_docsurl"
    }
}
```

Error Reference Code | Meaning
---------- | -------
`--parse_errorref_UNEXPECTED_SERVICE_OUTAGE` | --parse_sitename is currently experiencing an outage. (rare)
`--parse_errorref_CORS_GENERIC` | Cross-origin request forbidden.
`--parse_errorref_UNEXPECTED_OPERATION_FAILURE` | --parse_sitename failed to complete the request, please try again. (rare)
`--parse_errorref_API_VERSION_INVALID` | API version supplied is invalid.
`--parse_errorref_API_KEY_MISSING` | api_key is missing from your request.
`--parse_errorref_API_KEY_MALFORMED` | api_key supplied is malformed.
`--parse_errorref_API_KEY_INVALID` | api_key supplied is invalid.
`--parse_errorref_TOKEN_MISSING_SCOPE_WRITE` | Access token is missing the write scope to perform the request.
`--parse_errorref_TOKEN_MISSING_SCOPE_READ` | Access token is missing the read scope to perform the request.
`--parse_errorref_TOKEN_EXPIRED_OR_REVOKED` | Access token is expired, or has been revoked.
`--parse_errorref_USER_DELETED` | Authenticated user account has been deleted.
`--parse_errorref_USER_BANNED` | Authenticated user account has been banned by --parse_sitename admins.
`--parse_errorref_RATE_LIMITED_GLOBAL` | You have been ratelimited globally for making too many requests. See [Rate Limiting](#rate-limiting).
`--parse_errorref_RATE_LIMITED_ENDPOINT` | You have been ratelimited from calling this endpoint again, for making too many requests. See [Rate Limiting](#rate-limiting).
`--parse_errorref_FILE_CORRUPTED` | The submitted binary file is corrupted.
`--parse_errorref_FILE_UNREADABLE` | The submitted binary file is unreadable.
`--parse_errorref_JSON_MALFORMED` | You have used the `input_json` parameter with semantically incorrect JSON.
`--parse_errorref_MISSING_CONTENT_TYPE` | The Content-Type header is missing from your request.
`--parse_errorref_INCORRECT_CONTENT_TYPE` | The Content-Type header is not supported for this endpoint.
`--parse_errorref_JSON_RESPONSE_ONLY` | You have requested a response format that is not supported (JSON only).
`--parse_errorref_VALIDATION_GENERIC` | The request contains validation errors for the data supplied. See the attached `errors` field within the [Error Object](#error-object) to determine which input failed.
`--parse_errorref_RESOURCE_NOT_FOUND` | The requested resource does not exist.
`--parse_errorref_GAME_NOT_FOUND` | The requested game could not be found.
`--parse_errorref_GAME_DELETED` | The requested game has been deleted.
`--parse_errorref_MODFILE_NOT_FOUND` | The requested modfile could not be found.
`--parse_errorref_MOD_NOT_FOUND` | The requested mod could not be found.
`--parse_errorref_MOD_DELETED` | The requested mod has been deleted.
`--parse_errorref_COMMENT_NOT_FOUND` | The requested comment could not be found.
`--parse_errorref_USER_NOT_FOUND` | The requested user could not be found.

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
      "binary_url": "--parse_apiurl/games/1/mods/1/files/1/download",
      "date_expires": 1579316848
    }
}
```

The way in which --parse_sitename formats responses is entirely dependant on whether the requesting endpoint is returning a single item or a collection of items.

### Single item Responses

For single items, --parse_sitename returns a __single JSON object__ which contains the requested resource. There is no nesting for single responses.

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
    		  "binary_url": "--parse_apiurl/games/1/mods/1/files/1/download/c489a0354111a4d76640d47f0cdcb294",
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
Hidden | --parse_value_hidden | Resource is hidden and not returned when browsing.<br><br>If requested directly it will be returned provided the user is an admin or subscribed to the content. All resources are always returned via the [/me](#me) endpoints. | Game & Mod Admins | Game & Mod Admins
Public | --parse_value_public | Resource is visible and returned via all endpoints. | Game & Mod Admins | Everyone

### Status attribute states & privileges

Games and mods use the `status` attribute allowing game admins to control their availability. For mods this is important because it allows game admins to control which mods are available without changing the `visible` value set by the mod admin. Not accepted is the _default value_ until changed by a game admin, or if a file is added to a mods profile it will be moved to an accepted state (provided the game developer has elected _"not to curate"_ new mods):

Meaning | Value | Description | Modify Authorization | Filter Authorization
---------- | ------- | ------- | ------- | ----------
Not Accepted | --parse_value_notaccepted | Resource is not accepted and not returned when browsing.<br><br>Games will be returned if requested [directly](#get-game) provided the user is an admin or the `api_key` used belongs to the game.<br><br>Mods will be returned if requested [directly](#get-mod) provided the user is an admin or subscribed to the content. All resources are always returned via the [/me](#me) endpoints. | Game Admins Only | Game Admins Only
Accepted | --parse_value_accepted | Resource is accepted and returned via all endpoints. | Game Admins Only | Everyone
Deleted | --parse_value_deleted | Resource is deleted and only returned via the [/me](#me) endpoints. | Game Admins Only | Game Admins Only

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
--parse_version/games?_limit=5
```

Limit the number of results for a request. By default _100_ results are returned per request:

 - `?_limit=5` - Limit the request to 5 individual results. 

### _offset (Offset)

```
--parse_version/games?_offset=30
```

Use `_offset` to skip over the specified number of results, regardless of the data they contain. This works the same way offset does in a SQL query:

- `?_offset=30` - Will retrieve 100 results after ignoring the first 30 (31 - 130).

### Combining offset with a limit

```
--parse_version/games?_offset=30&_limit=5
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
--parse_version/games?_sort=name
```

Sort by a column, in ascending or descending order.

- `?_sort=name` - Sort `name` in ascending order

- `?_sort=-name` - Sort `name` in descending order (by prepending a `-`)

## Filtering

--parse_sitename has powerful filtering available to assist you when making requests to the API. You can filter on all columns __in the parent object only__. You cannot apply filters to columns in nested objects, so if a game contains a tags object you cannot filter by the `tag name` column, but you can filter by the games `name` since the games `name` resides in the parent object.

### or_fields (Filter grouping)

By default, multiple filters are combined using an "AND" operation. However, with or_fields, you can group filters together to be combined using an "OR" operation.

For example, if you want to find all mods that have been approved but also include mods from a particular user regardless of their state, you can achieve this with the following query parameters:

```
--parse_version/games/your-game/mods?status=1&submitted_by=123&or_fields[]=status,submitted_by
```

This would be interpreted as "Fetch all mods where status = 1 **OR** submitted_by = 123". Without the `or_fields` parameter, it would be treated as AND.

A few things to note:

* The `or_fields` parameter must be provided as an array.
* A maximum of --parse_maxorgroups `or_fields` can be present in a query at any time.
* A maximum of --parse_maxorfieldspergroup fields per `or_fields`.

### _q (Full text search)

```
--parse_version/games?_q=The Lord Of The Rings
```

Full-text search is a lenient search filter that _is only available_ if the endpoint you are querying contains a `name` column. Wildcards should _not_ be applied to this filter as they are ignored.

- `?_q=The Lord of the Rings` - This will return every result where the `name` column contains any of the following words: 'The', 'Lord', 'of', 'the', 'Rings'. 

### = (Equals)

```
--parse_version/games?id=10
```

The simplest filter you can apply is `columnname` equals. This will return all rows which contain a column matching the value provided. 

- `?id=10` - Get all results where the `id` column value is _10_.

### -not (Not Equal To)

```
--parse_version/games?curation-not=1
```

Where the preceding column value does not equal the value specified.

- `?curation-not=1` - Where the `curation` column does not equal 1.

### -lk (Like + Wildcards)

```
--parse_version/games?name-lk=texture

--parse_version/games?name-lk=texture*

--parse_version/games?name-lk=*texture*
```

Where the string supplied matches the preceding column value. This is equivalent to SQL's `LIKE`. Wildcard's `*` can be used to find content that partially matches as described below.

- `?name-lk=texture` - Get all results where the `name` column value is 'texture'.
- `?name-lk=texture*` - Get all results where the `name` column value begins with 'texture'. This means the query would return results for 'texture', 'textures' and 'texture pack'
- `?name-lk=*texture*` - Get all results where the `name` column value contains 'texture'. This means the query would return results for 'texture', 'HD textures' and 'armor texture pack' 

### -not-lk (Not Like + Wildcards)

```
--parse_version/games?name-not-lk=dungeon
```

Where the string supplied does not match the preceding column value. This is equivalent to SQL's `NOT LIKE`. Wildcard's `*` can be used as described above.

- `?name-not-lk=dungeon` - Get all results where the `name` column value is not 'dungeon'.

### -in (In)

```
--parse_version/games?id-in=3,11,16,29
```

Where the supplied list of values appears in the preceding column value. This is equivalent to SQL's `IN`.

- `?id-in=3,11,16,29` - Get all results where the `id` column value is 3, 11, 16 and 29.

### -not-in (Not In)

```
--parse_version/games?modfile-not-in=8,13,22
```

Where the supplied list of values *does not* equal the preceding column value. This is equivalent to SQL's `NOT IN`

- `?modfile-not-in=8,13,22` - Get all results where `id` column *does not* equal 8, 13 and 22.

### -max (Smaller Than or Equal To)

```
--parse_version/games?game-max=40
```

Where the preceding column value is smaller than or equal to the value specified.

- `?game-max=40` - Get all results where the `game` smaller than or equal to 40.  

### -min (Greater Than or Equal To)

```
--parse_version/games?game-min=20
```

Where the preceding column value is greater than or equal to the value specified.

- `?game-min=20` - Get all results where the `game` column is greater than or equal to 20.

### -bitwise-and (Bitwise AND)

```
--parse_version/games?maturity_option-bitwise-and=5
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

The --parse_sitename API provides localization for a collection of languages. To specify responses from the API to be in a particular language, simply provide the `Accept-Language` header with an [ISO 639 compliant](https://www.iso.org/iso-639-language-codes.html) language code. If a valid language code is not provided and the user is authenticated, the language they have selected in their profile will be used. All other requests will default to English (US). The list of supported codes includes:

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

> Example request updating specified fields with Polish translations.

```shell
curl -X POST --parse_apiurl/games/1/mods/1 \
	-H 'Authorization: Bearer your-token-here' \
	-H 'Content-Type: application/x-www-form-urlencoded' \
	-H 'Content-Language: pl' \
	-d 'name=Zaawansowany rozkwit Wiedźmina' \
	-d 'summary=Zobacz zaawansowany mod oświetlenia w Kaer Morhen w zupełnie nowym świetle' 
```

> Attempt to retrieve Polish translations within supported fields.

```shall
curl -X GET --parse_apiurl/games/1/mods/1 \
	-H 'Authorization: Bearer your-token-here' \
	-H 'Accept-Language: pl'
```

__NOTE__: Localization for --parse_sitename is currently a work-in-progress and thus not all responses may be in the desired language.

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

--parse_sitename implements rate limiting to stop users abusing the service. Exceeding the rate limit will result in requests receiving a `429 Too Many Requests` response until the reset time is reached. 

It is _highly recommended_ you architect your app to check for the `429 Too Many Requests` HTTP response code, and ensure you do not continue to make requests until the duration specified in the `retry-after` header (in seconds) passes. Be aware we enforce global rate limits which will result in all requests being blocked (error ref **--parse_errorref_RATE_LIMITED_GLOBAL**). We also enforce per-endpoint rate limits which will only result in requests to that endpoint being blocked (error ref **--parse_errorref_RATE_LIMITED_ENDPOINT**) until the duration specified in the `retry-after` header (in seconds) passes, allowing you to continue to call other endpoints. Users who continue to send requests despite a `429` response could potentially have their credentials revoked. The following limits are implemented by default:

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
- When this (error ref **--parse_errorref_RATE_LIMITED_ENDPOINT**) is encountered, its ok to continue requesting other endpoints, as the `retry-after` only applies to this endpoint.

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
		"error_ref": --parse_errorref_RATE_LIMITED_GLOBAL,
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

From January 1st, 2024 - the error ref **--parse_errorref_RATE_LIMITED_ENDPOINT** will be returned when a rate limit applies only to the endpoint being called. Error ref **--parse_errorref_RATE_LIMITED_GLOBAL** will continue to be returned in all other scenarios where the rate limit applies to all endpoints.

### Optimize your requests

You should always plan to minimize requests and cache API responses. It will make your app feel fluid and fast for your users. If your usage is excessive we shall reach out to discuss ways of optimizing, but our aim is to never restrict legitimate use of the API. We have set high limits that should cover 99% of use-cases, and are happy to [discuss your scenario](mailto:--parse_email?subject=API%20usage) if you require more.

## Testing

To help familiarize yourself with the --parse_sitename API and to ensure your implementation is battle-hardened and operating as intended, we have setup a test sandbox which is identical to the production environment. The test sandbox allows you to make requests to the API whilst your integration is a work in progress and the submitted data is not important. When you are ready to go live it's as easy as adding your game to the production environment, substituting the test API path for the production API path, and updating the `api_key` and `game_id` you are using to the values from your games profile on production. 

To begin using the test sandbox you will need to [register a test account](--parse_sitetesturl) and [add your game](--parse_sitetesturl/g/add). You will only see games you are a team member of and there is no connection between the data added to the test environment and production. We highly recommend you use the test environment when integrating as it allows you to keep your development private, and you can submit as much dummy data as you need to try the functionality required, without having to clean it up at the end.

__Test version:__ `--parse_version`

__Test site:__ [--parse_sitetesturl](--parse_sitetesturl)

__Test API path:__ [--parse_apitesturl](--parse_apitesturl)

__NOTE__: We periodically reset the test environment to default - with the exception of user accounts so please do not rely on it to store important information. Any data you intend on persisting should be submitted to the production environment.

## Whitelabel

If you are a large studio or publisher and require a private, in-house, custom solution that accelerates your time to market with a best-in-class product, reach out to [--parse_email](mailto:--parse_email?subject=Whitelabel%20license) to discuss the licensing options available.

## Contact

If you spot any errors within the --parse_sitename documentation, have feedback on how we can make it easier to follow or simply want to discuss how awesome mods are, feel free to reach out to [--parse_email](mailto:--parse_email?subject=API) or come join us in our [discord channel](--parse_discordurl). We are here to help you grow and maximise the potential of mods in your game.

# Platforms

## Targeting a Platform

--parse_sitename supports mods on all platforms. Games can enable per-platform mod file support in their dashboard, if they wish to control which platforms each mod and their corresponding files can be accessed on. Otherwise, all mods and their files will be available on all platforms the game supports. To make this system work, it's important the following headers are included in all API requests as explained below. If you have any questions about setting up cross-platform mod support in your game, please reach out to [--parse_email](mailto:--parse_email?subject=API).

When making API requests you should include the `X-Modio-Platform` header (with one of the values below), to tell --parse_sitename what Platform the request is originating from. This header is __important__ because it enables --parse_sitename to return data that is approved for the platform such as:

 - Supported mods and files
 - Supported tags the player can filter on
 - Localization of content for the platform
 - It also enables platform specific metrics

For example, passing the HTTP header `X-Modio-Platform: xboxseriesx` in your API request tells --parse_sitename your player is on Xbox Series X.

Official --parse_sitename [Plugins and SDKs](#implementation) will automatically supply this value for you providing you have specified the correct platform in the tools' settings. We __strongly recommend__ you supply this header in every request with the correct platform to enable --parse_sitename to provide the best cross-platform experience for your players. Please see a list of supported platforms below:

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

These are the only supported values and are case-insensitive, anything else will be ignored and default to `windows`. Have we missed a platform you are using? [Get in touch!](mailto:--parse_email?subject=Platform%20Support) 

## Targeting a Portal

When making API requests you should include the `X-Modio-Portal` header (with one of the values below), to tell --parse_sitename what Portal (eg. Store or App) the request is originating from. This header is __important__ because it enables --parse_sitename to fine-tune the experience, such as returning display names used by players on that portal (which can be a certification requirement).

For example, passing the HTTP header `X-Modio-Portal: epicgames` in your API request tells --parse_sitename your player is coming via the Epic Games Store.

You can also instruct the --parse_sitename website to authenticate the player using a portal from the list above (provided it is supported), as explained in [Web Overlay Authentication](#authentication). For example, if your game client has logged the player into --parse_sitename on PlayStation using their PlayStation™Network account, and you want to open the --parse_sitename website in-game with the player logged in using the same authentication method, you would add `?portal=psn` to the end of the URL: `--parse_gameurl?portal=psn`. You can optionally add `&login=auto` as well to automatically start the login process.

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

These are the only supported values and are case-insensitive, anything else will be ignored. Have we missed a portal you are using? [Get in touch!](mailto:--parse_email?subject=Portal%20Support)
