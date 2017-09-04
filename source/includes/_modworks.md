# Getting Started

## mod.works API v1

Welcome to the official `v1` API documentation for [mod.works](--parse_siteurl). Please ensure you read all of the Getting Started content as it covers most steps to ensure you can accurately and effeciently consume our REST API. 

__Current version:__ `--parse_version`

__Base path:__ --parse_basepath

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

Authentication to the mod.works can be done via 3 different ways:

- Request an [api key (read access only)](https://mod.works/apikey/widget)
- Manually create an [OAuth 2 access token (read + write access)](https://mod.works/oauth/widget)
- Use the e-mail verification flow 

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

```
curl -X get https://api.mod.works/v1/games?api_key=xxxxxxxxxxxxxxxx
``` 

To authenticate to the API using your key using your unique 32-character key simply append the `api_key=xxxxxxxxxxxxxxxx` parameter to the end of your request. Remember that using an api key essentially means being in read-only mode, and that if you want to create, update or delete resources then an access token is required.

### Authentication Flows

mod.works offers two flows to authenticate to receive access tokens. The 'Email Authentication' flow as well as the more traditional OAuth 2 Client Credentials flow. 

### Email Authorization Flow

The email authorization flow allows you to securely authorize yourself, and if you are a game developer, all your players using only an e-mail address to allow gamers to effortlessly connect to mod.works as this is how authentication
is implemented under the hood with the official mod.works SDK. 

```shell
// Example POST requesting security code

curl -X POST https://api.mod.works/oauth/emailrequest
  -H 'Content-Type: application/x-www-form-urlencoded'
  -d 'api_key=0d0ba6756d032246f1299f8c01abc424'	
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

Firstly you must request a `security_code` from the authentication server by supplying an email which will then return a short-lived security code to the suyppliede-mail address. It is therefor required that to receive a `security_code` that you have access to the specified email account. 

`POST /oauth/emailrequest`

Parameter | Value
---------- | ----------  
`api_key` | Your api key generated from your games 'API' tab.
`email` | A valid e-mail address 

### Step 2: Exchanging security code for access token

After successfully requesting an `security_code` with a valid e-mail address you have access to you will then receive an e-mail from mod.works containing your unique 5-character `security_code` which you then exchange in a second request for your `access_token`. There are a few important things to know when using the e-mail authentication flow:

```shell
// Example POST requesting access token

curl -X POST https://api.mod.works/oauth/emailexchange
  -H 'Content-Type: application/x-www-form-urlencoded'	
  -d 'api_key=0d0ba6756d032246f1299f8c01abc424'
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
- The same `api_key` must be used for both steps.
- The generated `security_code` is short-lived and will expire after 15 minutes.
- Once exchanged for an access token, the security code is invalid.

If you do not exchange your `security_code` for an `access_token` within 15 minutes of generation, you will need to begin the flow again to receive another code.

`POST /oauth/emailexchange`

Parameter | Value
---------- | ----------  
`api_key` | Your api key generated from your games 'API' tab.
`security_code` | Unique 5-digit code sent to e-mail from previous request. 

### Step 3: Use access token to access resources.

See [Making Requests](https://docs.mod.works/#making-requests) section.

### Client Credentials Flow

### Creating a client

TODO

### Generating an access token

TODO

### Revoking an access token

TODO

### Authenticating with your access token

TODO

### Scopes

mod.works allows you to specify what type of permissions you want each access token to have, this is done by the use of scopes. See below for a full list of scopes available, you must include at least one scope when generating a new token.

Scope | Abilities
---------- | ----------
`read` | When authenticated with a token that *only* contains the `read` scope you will only be able to read data via `GET` requests. 
`write` | When authenticated with a token that contains the `write` scope you are able to add, edit and remove resources.

You can combine scopes to generate a combination that suits the permissions you want to be applied to the specified token.

## Making Requests

```shell
// Example POST request with no binary files

curl -X post https://api.mod.works/v1/games/1/mods/1/tags \
  -H 'Authorization: Bearer your-token-here' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'tags[]=Unity' \
  -d 'tags[]=FPS'
```

Requests to the mod.works API __must__ be over HTTPS (Port 443), any requests made over HTTP will return a `400 Bad Request` response.

### Request Content-Type

For supplying data in requests, mod.works follows this rule across the API:

- If you are making a request that includes a file, your request __must__ be `multipart/form-data`, otherwise your request should be `application/x-www-form-urlencoded`. 

```shell
// Example POST request with binary file

curl -X post https://api.mod.works/v1/games/1/mods \
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

If the endpoint you are making a request to expects a file it will expect the correct `Content-Type` as mentioned. Supplying an incorrect `Content-Type` header will return a `406 Not Acceptable`.

### JSON Request Data

```shell
// Example json-encoded POST request 

curl -X post https://api.mod.works/v1/games/1/team \
  -H 'Authorization: Bearer your-token-here' \
  -H 'Content-Type: application/x-www-form-urlencoded' \  
  -d 'input_json={
		"member":"1",
		"level":"8",
		"position":"King in the North"
	  }'
```

For `POST` & `PUT` requests that do __not submit files__ you have the option to either supply your data as usual HTTP `POST` parameters or as a single json object by supplying the parameter `input_json` which contains a __UTF-8 encoded__ JSON object with all required data. Regardless of whether you use JSON or not the `Content-Type` of your request still needs to be `application/x-www-form-urlencoded` with the data provided in the body of the request.

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

If an error occurs, mod.works returns an error object with the HTTP `code` and `message` to describe what error occured and generally what needs to be done to avoid the error re-occuring. It's important to note that if you encounter errors that are not server errors, that is `500+` codes - you should __not__ continue to send requests to the endpoint and instead review the error message.

When it comes to validating request inputs for creating a resource or supplying a query parameter for filtering, an optional field object called `errors` can be supplied inside the `error` object which contains a list of your invalid inputs. A reminder that the nested `errors` object is only supplied with `422 Unprocessable Entity`. Be sure to review the [Response Codes](https://docs.mod.works/#response-codes) to be aware of the HTTP codes the API returns.

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

Remember that [Rate Limiting](https://docs.mod.works/#rate-limiting) applies whether an error is returned or not so to avoid needlessly exceeding your daily quota be sure to always investigate error messages.

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
	"virustotal": "No threats detected.",
	"changelog": "v1.0 - First release of Rogue Knight!",
	"download": "https://mod.works/mods/file/2/c489a0354111a4d76640d47f0cdcb294"
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
			"download": "https://mod.works/mods/file/2/c489a0354111a4d76640d47f0cdcb294"
		},
		{
			...
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
        		"previous": "https://api.mod.works/v1/games/2/?_limit=30&page=2",
        		"next": "https://api.mod.works/v1/games/2/?_limit=30&page=4"
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
				"previous": "https://api.mod.works/v1/games/2/?_limit=30&page=2",
				"next": "https://api.mod.works/v1/games/2/?_limit=30&page=4"
			}
		}
	}
}
```

## Filtering

Mod.works has powerful filtering available in requests. Every field of every request can be used as a filter and the following functions are available when querying the API:

### Functions

### _fields (Fields)

```
--parse_version/games?_fields=id,datereg,ugcname,name
```

Specify which columns to return in a request.

- `?_fields=id,datereg,ugcname,name` - Only return the `id`, `datereg`, `ugcname` and `name` columns.

### _sort (Sort)

```
--parse_version/games?_sort=id
```

Sort by a column, and ascending or descending order.

- `?_sort=id` - Sort `id` in ascending order

- `?_sort=-id` - Sort `id` in descending order

### _limit (Limit)

```
--parse_version/games?_limit=5
```

Limit the amount of results for a request.

 - `?_limit=5` - Limit the request to 5 individual results. 

### _offset (Offset)

```
--parse_version/games?_offset=5
```

Exclude the first n amount of records.

- `?_offset=5` - Exclude the first 5 results of the request.

### _q (Full text search)

```
--parse_version/games/1?_q=The Lord Of The Rings
```

Full text search is a lenient search filter that _is only available_ if the endpoint you are querying contains a `name` column.

- `?_q=The Lord of the Rings` - This will return every result where the `name` column contains any of the following words: 'The', 'Lord', 'of', 'the', 'Rings'.

### -lk (Like)

```
--parse_version/games?name-lk=texture
```

Where the string supplied matches the preceeding column value. This is the equivalent to SQL's `LIKE`.

- `?name-lk=texture` - Get all results where **only** _texture_ occurs in the `name` column.

### -not-lk (Not Like)

```
--parse_version/games?name-not-lk=dungeon
```

Where the string supplied does not match the preceeding column value. This is the equivalent to SQL's `NOT LIKE`.

- `?name-not-lk=dungeon` - Get all results where _texture_ does not occur in the `name` column.

### -lk & -not-lk Wildcards

```
--parse_version/games?name-lk=The Witcher*
```

The above -lk examples will only return results on an exact match, which may make it hard to get results depending on the complexity of your query. In that event it's recommended you utilize the -lk wildcard value `*`. This is the equivalent to SQL's `%`.

- `?name-lk=The Witcher*` - Get all results where _The Witcher_ occurs at the start of the name. This means the query would return results for 'The Witcher', 'The Witcher 2' and 'The Witcher 3'. 
 
### -in (In)

```
--parse_version/games?id-in=3,11,16,29
```

Where the supplied list of values appears in the preceeding column value. This is the equivalent to SQL's `IN`.

- `?id-in=3,11,16,29` - Get all results where the `id` column value is 3, 11, 16 and 29.

### -not-in (Not In)

```
--parse_version/games?modfile-not-in=8,13,22
```

Where the supplied list of values *does not* in the preceeding column value. This is the equivalent to SQL's `NOT IN`

- `?modfile-not-in=8,13,22` - Get all results where `id` column *does not* equal 8, 18 and 22.

### -min (Min)

```
--parse_version/games?game-min=20
```

Where the preeceding column value is greater than or equal to the value specified.

- `?game-min=20` - Get all results where the `game` column is greater than or equal to 20.

### -max (Max)

```
--parse_version/games?game-max=40
```

Where the preeceding column value is smaller than or equal to the value specified.

- `?game-max=40` - Get all results where the `game` smaller than or equal to 40.  

### -st (Smaller Than)

```
--parse_version/games?modfile-st=200
```

Where the preceeding column value is smaller than the value specified.

- `?modfile-st=200` - Get all results where the `modfile` column is smaller than 200.

### -gt (Greater Than)

```
--parse_version/games?modfile-gt=600
```

Where the preceeding column value is greater than the value specified.

- `?modfile-gt=600` - Get all results where the `modfile` column is greater than 600.

### -not (Not Equal To)

```
--parse_version/games?price-not=19.99
```

Where the preceeding column value does not equal the value specified.

- `?price-not=19.99` - Where the `price` column does not equal 19.99.

## Rate Limiting

mod.works implements rate limiting to prevent users from abusing the service however we do offer the ability of higher rate limits as they required. Exceeding your rate limit will result in requests receiving a `429 Too Many Requests` response until your time is reset time occurs. 

It is *highly recommended* that you architect your app to check for the `X-RateLimit` headers below and the `429` HTTP response code to ensure you are not making too many requests, or continuing to make requests consistently after a `429` code is repeatedly returned. Users who continue to send requests despite a `429` response could potentially have their access tokens revoked. The following limits are implemented by default:

### Api key Rate Limiting

```
Example HTTP Header Response
---------------------
HTTP/1.1 200 OK
...
...
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
```

- All Api keys by default are limited to __100,000 requests per day__.

### OAuth2 Rate Limiting

- Tokens linked to a game - __1,000,000 requests per day__.
- Tokens linked to a mod - __150,000 requests per day__. 

### Headers

mod.works returns the following headers in each request to inform you of your remaining requests and time until reset.

 - `X-RateLimit-Limit` - Number of requests you can make from the supplied api-key/access token per hour.
 - `X-RateLimit-Remaining` - Number of minutes until your rate limit resets (see above for frequently allowed).

If you want feel the above rate limit is not enough for your app, please [contact us](mailto:support@mod.works?subject=mod.works%20API%20Rate%20Limiting) to discuss your scenario and potentially increasing your rate limit. 

## Contact

If you spot any errors within the mod.works documentation, have feedback on how we can potentially make it easier to follow or simply want get in touch for another reason please feel free to reach out to us at [support@mod.works](mailto:support@mod.works?subject=mod.works%20API). Any critical issues will be promptly addressed.
