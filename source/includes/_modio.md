# Getting Started

## --parse_sitename API --parse_version

Welcome to the official documentation for [--parse_sitename](--parse_siteurl), an API for developers to add mod support to their games. We recommend you read our _Getting Started_ guide below to accurately and efficiently consume our REST API. 

__API path:__ [--parse_apiurl](--parse_apiurl)

__Current version:__ --parse_vdropdown 

<a href="/changelog"><span class="versionwrap">View Version Changelog</span></a>

## How It Works

Compatible with all builds of your game, --parse_sitename operates silently in the background (without requiring your users to install another client), to give you complete control over your modding ecosystem.

![--parse_sitename Overview](--parse_staticurl/v1/images/home/sdk.png).

## Implementation

You have 3 options to get connected to the --parse_sitename API which you can use interchangeably depending on your needs. Here's the breakdown of each option.

Option | Usage | Suited for | Docs
---------- | ---------- | ---------- | ---------
__API__ | For connecting directly to the --parse_sitename REST API | Web apps that need a JSON REST API, or game developers that like a challenge and want control over their implementation. | You are reading them
__SDK__ | Drop our [open source C/C++ SDK](--parse_sdkurl) into your game to call --parse_sitename functionality. | Developers that want a SDK that abstracts the uploading, downloading and unzip flows behind easy to use function calls. | [Here](--parse_sdkurl)
__Tools/Plugins__ | Use tools and plugins created by the community to make implementation in various engines easy. | Game developers that want a pre-built modding solution for their engine (Unity, Unreal) of choice. | [Available per tool](--parse_appsurl)

Tools and plugins made by the --parse_sitename team and our awesome community | - | - | -
--- | --- | --- | ---
![Unity Plugin](images/tool-unity.png) | __Unity Plugin__<br />[SDK](https://github.com/DBolical/modioUNITY)<br />[Getting Started](https://github.com/DBolical/modioUNITY/wiki)<br /> | ![C/C++ SDK](images/tool-ccpp.png) | __C/C++ SDK__<br />[SDK](https://github.com/DBolical/modioSDK)<br />[Getting Started](https://github.com/DBolical/modioSDK/wiki)<br />[Tutorials](https://github.com/DBolical/modioSDK/tree/master/examples/code-samples)<br /> 
![Haxe Wrapper](images/tool-haxe.png) | __Haxe Wrapper__<br />[SDK](https://apps.mod.io/haxe-wrapper)<br />[Getting Started](https://github.com/Turupawn/modioHaxe#getting-started)<br />[Tutorials](https://github.com/Turupawn/modioOpenFLExample#openfl-integration)<br /> | ![Rust Wrapper](images/tool-rust.png) | __Rust Wrapper__<br />[SDK](https://crates.io/crates/modio)<br />[Getting Started](https://github.com/nickelc/modio-rs)<br />[Tutorials](https://github.com/nickelc/modio-rs/tree/master/examples)<br />
![Python Wrapper](images/tool-python.png) | __Python Wrapper__<br />[SDK](https://github.com/ClementJ18/mod.io)<br />[Getting Started](https://github.com/ClementJ18/mod.io/#example)<br />[Tutorials](https://github.com/ClementJ18/mod.io/tree/master/examples)<br /> | 
Want a tool added to the list? [Contact us!](mailto:--parse_email?subject=Publish Tool)

Here is a brief list of the things to know about our API, as explained in more detail in the following sections.

- All requests to the API __must__ be made over HTTPS (TLS).
- All API responses are in `application/json` format.
- API keys are restricted to read-only `GET` requests.
- OAuth 2 access tokens are required for `POST`, `PUT` and `DELETE` requests.
- Binary data `POST` requests must use `Content-Type: multipart/form-data` header.
- Non-binary `POST`, `PUT` and `DELETE` requests must use `Content-Type: application/x-www-form-urlencoded` header.
- Non-binary data can optionally be supplied in `application/json` using the `input_json` parameter. 
- Rate limiting can be implemented for excess usage to deter abuse and spam.

## Authentication

Authentication can be done via 3 ways:

- Request an [API key (Read Only Access)](--parse_siteurl/apikey/widget)
- Manually create an [OAuth 2 Access Token (Read + Write Access)](--parse_siteurl/oauth/widget)
- Use our [Email Authentication Flow](#email-authentication-flow) (to create an OAuth 2 Access Token with Read + Write Access) 

You can use these methods of authentication interchangeably, depending on the level of access you require.

Authentication Type | In | HTTP Methods | Abilities | Purpose
---------- | ---------- | ---------- | ---------- | ---------- 
API Key | Query | `GET` | Read-only `GET` requests and email authentication flow. | Browsing and downloading content.
Access Token (OAuth 2) | Header | `GET`, `POST`, `PUT`, `DELETE` | Read, create, update, delete. | View, add, edit and delete content the authenticated user has subscribed to or has permission to change.

### API Key Authentication

To access the API authentication is required. All users and games get a [private API key](--parse_siteurl/apikey/widget). It is quick and easy to use in your apps but limited to read-only GET requests, due to the limited security it offers. View your [private API key(s)](--parse_siteurl/apikey/widget).

### Email Authentication Flow

To perform writes, you will need to authenticate your users via OAuth 2. To make this frictionless in-game, we use an email verification system, similar to what Slack and others pioneered. It works by users supplying their email, which we send a time-limited 5 digit security code too. They exchange this code in-game, for an [OAuth 2 access token](--parse_siteurl/oauth/widget) you can save to authenticate future requests. The benefit of this approach is it avoids complex website redirects and doesn't require your users to complete a slow registration flow.

![--parse_sitename Email Authentication Flow](--parse_staticurl/v1/images/home/email.png)

```shell
// Example POST requesting security code be sent to supplied email

curl -X POST --parse_apiurl/oauth/emailrequest \
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

### Step 1: Requesting a security code

Request a `security_code` be sent to the email address of the user you wish to authenticate: 


`POST oauth/emailrequest`

Parameter | Value
---------- | ----------  
`api_key` | Your API key generated from 'API' tab within your game profile.
`email` | A valid and secure email address your user has access to. 

### Step 2: Exchanging security code for access token

After retrieving the 5-digit `security_code` sent to the email specified, you exchange it for an OAuth 2 `access_token`:

```shell
// Example POST requesting access token

curl -X POST --parse_apiurl/oauth/emailexchange \
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


`POST oauth/emailexchange`

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

--parse_sitename allows you to specify the permission each access token has (default is _read+write_), this is done by the use of scopes. See below for a full list of scopes available, you must include at least one scope when generating a new token.

Scope | Abilities
---------- | ----------
`read` | When authenticated with a token that *only* contains the `read` scope, you will only be able to read data via `GET` requests. 
`write` | When authenticated with a token that contains the `write` scope, you are able to add, edit and remove resources.
`read+write` | The above scopes combined. _Default for email verification flow._

## Making Requests

Requests to the --parse_sitename API __must__ be over HTTPS (Port 443), any requests made over HTTP will return a `400 Bad Request` response.

### Using an API Key

```
curl -X get --parse_apiurl/games?api_key=xxxxxxxxxxxxxxxx
``` 

To authenticate using your unique 32-character API key, append the `api_key=xxxxxxxxxxxxxxxx` parameter to the end of your request. Remember that using an API key means requests are read-only, if you want to create, update or delete resources - authentication via OAuth 2 is required which you can [set up with your api key](#authentication).

### Using an Access Token

To authenticate using an OAuth 2 access token, you must include the HTTP header `Authorization` in your request with the value `Bearer your-token-here`. Verification via Access Token allows much greater power including creating, updating and deleting resources that you have access to. Also because OAuth 2 access tokens are tied to a user account, you can personalize the output by viewing content they are subscribed and connected to via the [me endpoint](#me) and by using relevant filters.

```shell
// Example POST request with no binary files

curl -X POST --parse_apiurl/games/1/mods/1/tags \
  -H 'Authorization: Bearer your-token-here' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'tags[]=Unity' \
  -d 'tags[]=FPS'
```

### Request Content-Type

If you are making a request that includes a file, your request `Content-Type` header __must__ be `multipart/form-data`, otherwise if the request contains data (but no files) it should be `application/x-www-form-urlencoded` with text encoded in `UTF-8` format. 

```shell
// Example POST request with binary file

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
Binary Files | `POST` | `multipart/form-data`
Non-Binary Data | `POST`, `PUT`, `DELETE` | `application/x-www-form-urlencoded`
Nothing | `GET` | No `Content-Type` required.

If the endpoint you are making a request to expects a file it will expect the correct `Content-Type` as mentioned. Supplying an incorrect `Content-Type` header will return a `415 Unsupported Media Type` response.

### JSON Request Data

```shell
// Example json-encoded POST request 

curl -X POST --parse_apiurl/games/1/team \
  -H 'Authorization: Bearer your-token-here' \
  -H 'Content-Type: application/x-www-form-urlencoded' \  
  -d 'input_json={
		"member":"patrick@diabolical.com",
		"level":"8",
		"position":"King in the North"
	  }'
```

For `POST` & `PUT` requests that do _not submit files_ you have the option to supply your data as HTTP `POST` parameters, or as a _UTF-8 encoded_ JSON object inside the parameter `input_json` which contains all required data. Regardless, whether you use JSON or not the `Content-Type` of your request still needs to be `application/x-www-form-urlencoded` with the data provided in the body of the request.

__NOTE:__ If you supply identical key-value pairs as a request parameter and also as a parameter in your JSON object, the JSON object __will take priority__ as only one can exist.

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

If an error occurs, --parse_sitename returns an error object with the HTTP `code` and `message` to describe what happened and when possible how to avoid repeating the error. It's important to know that if you encounter errors that are not server errors (`500+` codes) - you should review the error message before continuing to send requests to the endpoint.

When requests contain invalid input data or query parameters (for filtering), an optional field object called `errors` can be supplied inside the `error` object, which contains a list of the invalid inputs. The nested `errors` object is only supplied with `422 Unprocessable Entity` responses. Be sure to review the [Response Codes](#response-codes) to be aware of the HTTP codes that the --parse_sitename API returns.

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

The way in which --parse_sitename formats responses is entirely dependant on whether the requesting endpoint is returning a single item or a collection of items.

### Single item Responses

For single items, --parse_sitename returns a __single JSON object__ which contains the requested resource. There is no nesting for single responses.

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
Hidden | --parse_value_hidden | Resource is hidden and not returned when browsing.<br><br>If requested directly it will be returned provided the user is an admin or subscribed to the content. All resources are always returned via the [/me](#me) endpoints. | Game & Mod Admins | Game & Mod Admins
Public | --parse_value_public | Resource is visible and returned via all endpoints. | Game & Mod Admins | Everyone

### Status attribute states & privileges

Games and mods use the `status` attribute allowing game admins to control their availability. For mods this is important because it allows game admins to control which mods are available without changing the `visible` value set by the mod admin. Not accepted is the _default value_ until changed by a game admin, or if a file is added to a mods profile it will be moved to an accepted state (provided the game developer has elected _"not to curate"_ new mods):

Meaning | Value | Description | Modify Authorization | Filter Authorization
---------- | ------- | ------- | ------- | ----------
Not Accepted | --parse_value_notaccepted | Resource is not accepted and not returned when browsing.<br><br>Games will be returned if requested [directly](#get-game) provided the user is an admin or the `api_key` used belongs to the game.<br><br>Mods will be returned if requested [directly](#get-mod) provided the user is an admin or subscribed to the content. All resources are always returned via the [/me](#me) endpoints. | Game Admins Only | Game Admins Only
Accepted | --parse_value_accepted | Resource is accepted and returned via all endpoints. | Game Admins Only | Everyone
Archived | --parse_value_archived | Resource is accepted and returned via all endpoints (but flagged as out of date/incompatible). | Game Admins Only | Everyone
Deleted | --parse_value_deleted | Resource is deleted and only returned via the [/me](#me) endpoints. | Game Admins Only | Game Admins Only

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

Due to the requirement of certain `status` & `visible` values only being available to administrators. We have restricted the amount of [filters](#filtering) available for _non-game admins_ and thus for both of these fields _only_ direct matches `=` and `-in` are permitted. Attempting to apply game admin filters without the required permissions will result in a `403 Forbidden` [error response](#error-object).

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

All endpoints are sorted by the `id` column in ascending order by default. You can override this by including a `_sort` with the column you want to sort by in the request. You can sort on all columns __in the parent object only__. You cannot sort on columns in nested objects, so if a game contains a user you cannot sort on the `username` column, but you can sort by the games `name` since the column resides in the parent object.

__NOTE:__ Some endpoints like [Get All Mods](#get-all-mods) have special sort columns like `popular`, `downloads`, `rating` and `subscribers` which are documented alongside the filters.

### _sort (Sort)

```
--parse_version/games?_sort=name
```

Sort by a column, in ascending or descending order.

- `?_sort=name` - Sort `name` in ascending order

- `?_sort=-name` - Sort `name` in descending order (by prepending a `-`)

## Filtering

--parse_sitename has powerful filtering available to assist you when making requests to the API. You can filter on all columns __in the parent object only__. You cannot apply filters to columns in nested objects, so if a game contains a user object you cannot filter by the `username` column, but you can filter by the games `name` since the column resides in the parent object.

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

### -lk (Like)

```
--parse_version/games?name-lk=texture
```

Where the string supplied matches the preceding column value. This is equivalent to SQL's `LIKE`. Consider using wildcard's `*` for the best chance of results as described below.

- `?name-lk=texture` - Get all results where the `name` column value is 'texture'.

### -not-lk (Not Like)

```
--parse_version/games?name-not-lk=dungeon
```

Where the string supplied does not match the preceding column value. This is equivalent to SQL's `NOT LIKE`.

- `?name-not-lk=dungeon` - Get all results where the `name` column value is not 'dungeon'.

### -lk & -not-lk Wildcards

```
--parse_version/games?name-lk=The Witcher*
```

```
--parse_version/games?name-lk=*Asset Pack
```

You can utilize the -lk wildcard value `*` to match more records. This is equivalent to SQL's `%`.

- `?name-lk=The Witcher*` - Get all results where _The Witcher_ is succeeded by any value. This means the query would return results for 'The Witcher', 'The Witcher 2' and 'The Witcher 3'. 

- `?name-lk=*Asset Pack` - Get all results where _Asset Pack_ is proceeded by any value. This means the query would return results for 'Armor Asset Pack', 'Weapon Asset Pack' and 'HD Asset Pack'. 
 
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

### -st (Smaller Than)

```
--parse_version/games?modfile-st=200
```

Where the preceding column value is smaller than the value specified.

- `?modfile-st=200` - Get all results where the `modfile` column is smaller than 200.

### -gt (Greater Than)

```
--parse_version/games?modfile-gt=600
```

Where the preceding column value is greater than the value specified.

- `?modfile-gt=600` - Get all results where the `modfile` column is greater than 600.

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

The --parse_sitename API provides localization for a collection of languages. To specify responses from the API to be in a particular language, simply provide the `Accept-Language` header with an [ISO 639 compliant](https://www.iso.org/iso-639-language-codes.html) language code. If a valid language code is not provided and the user is authenticated, the language they have selected in [their profile](#user-object) will be used. All other requests will default to English (US). The list of supported codes includes:

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

__NOTE__: Localization for --parse_sitename is currently a work-in-progress and thus not all responses may be in the desired language.


## Rate Limiting

--parse_sitename implements rate limiting to stop users abusing the service. Exceeding your rate limit will result in requests receiving a `429 Too Many Requests` response until your reset time is reached. 

It is _highly recommended_ you architect your app to check for the `X-RateLimit` headers below and the `429` HTTP response code to ensure you are not making too many requests, or continuing to make requests after a `429` code is repeatedly returned. Users who continue to send requests despite a `429` response could potentially have their credentials revoked. The following limits are implemented by default:

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

- API keys linked to a member have __unlimited requests__.
- API keys linked to a game have __unlimited requests__.

### OAuth2 Rate Limiting

- Users tokens are limited to __120 requests per minute__. 

### Headers

--parse_sitename returns the following headers in each request to inform you of your limit & remaining requests until reset.

 - `X-RateLimit-Limit` - Number of requests you can make from the supplied API key/access token per minute.
 - `X-RateLimit-Remaining` - Number of requests remaining until requests are rejected.
 - `X-Ratelimit-RetryAfter` - Amount of seconds until reset once you have been throttled (Only returned once rate limit exceeded).

### Optimize your requests

You should always plan to minimize requests and cache API responses. It will make your app feel fluid and fast for your users. If your usage is excessive we shall reach out to discuss ways of optimizing, but our aim is to never restrict legitimate use of the API. We have set high limits that should cover 99% of use-cases, and are happy to [discuss your scenario](mailto:--parse_email?subject=API%20usage) if you require more.

## Testing

To help familiarize yourself with the --parse_sitename API and to ensure your implementation is battle-hardened and operating as intended, we have setup a test sandbox which is identical to the production environment. The test sandbox allows you to make requests to the API whilst your integration is a work in progress and the submitted data is not important. When you are ready to go live it's as easy as making sure your game's production profile and `api_key` is correct, and substituting the API test URL for the production URL. 

To begin using the test sandbox you will need to [register a test account](--parse_sitetesturl/members/register) and [add your game](--parse_sitetesturl/games/add). You will see only games you are a team member of and there is no connection between the data added to the test environment and production. We highly recommend you use the test environment when integrating as it allows you to keep your development private, and you can submit as much dummy data as you need to try the functionality required, without having to clean it up at the end.

__Test version:__ `--parse_version`

__Test site:__ [--parse_sitetesturl](--parse_sitetesturl)

__Test API path:__ [--parse_apitesturl](--parse_apitesturl)

__NOTE__: We periodically reset the test environment to default - with the exception of user accounts so please do not rely on it to store important information. Any data you intend on persisting should be submitted to the production environment.

## Whitelabel

If you are a large studio or publisher and require a private, in-house, custom solution that accelerates your time to market with a best-in-class product, reach out [--parse_email](mailto:--parse_email?subject=Whitelabel%20license) to discuss the licensing options available.

## Contact

If you spot any errors within the --parse_sitename documentation, have feedback on how we can make it easier to follow or simply want to discuss how awesome mods are, feel free to reach out anytime to [--parse_email](mailto:--parse_email?subject=API) or come join us in our [discord channel](https://discord.mod.io). We are here to help you grow and maximise the potential of mods in your game.
