# Getting Started

## mod.io API v1

Welcome to the official `v1` API documentation for [mod.io](--parse_siteurl). Please ensure you read all of the _Getting Started_ content as it covers most steps to ensure you can accurately and efficiently consume our REST API. 

__Current version:__ `--parse_version`

__Base path:__ --parse_basepath

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

`POST oauth/emailrequest`

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

`POST oauth/emailexchange`

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
--parse_version/games/2/mods/2/files?_cursor=600
```

When using a cursor, you are able to specify where you want to _start_ looking for results by the value of the `id` column. Let's assume you want to get all files on mod.io that contain an id larger than 600. You could use the following:

- `?_cursor=600` - Only returns fields that have a larger `id` than 600, that is we want to start looking from the specified number onwards. 

### Prev (Cursors only)

When using cursors you can optionally choose to provide the `_prev` parameter which is meant to be the previous cursor you used. Let's assume you that you just used the above search filter and you wish to keep track of your previous `_cursor` value whilst using a new value which will be shown in the meta object. You would apply it like so:

```
--parse_version/games/2/mods/2/files?_cursor=400&_prev=600
```

- `?_cursor=400&_prev=600` - Move the cursor to all records with a larger `id` than 400, but save that our previous cursor location was 400.

Note that the `_prev` parameter is arbitrary  information for your own implementations and does not affect the outcome of the query other than the value being appended to the meta object shown below.

### Offset

```
--parse_version/games?_offset=30
```

While a cursor starts from the value of the `id` column, the `_offset` will simply skip over the specified amount of results, regardless of what data they contain. This works the same way offset in an SQL query. Let's now assume you want to get all mods from mod.io but ignore the first 30 results.

- `?_offset=30` - Will retrieve all results after ignoring the first 30.

As cursors and offsets are mutually exclusive, you should choose one or the other - if you do supply both the __cursor__ will take priority.

### Combining a cursor/offset with a limit

```
--parse_version/games/2/mods/2/files?_cursor=5&_prev=5&_limit=10
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
--parse_version/games?_sort=id
```

Sort by a column, and ascending or descending order.

- `?_sort=id` - Sort `id` in ascending order

- `?_sort=-id` - Sort `id` in descending order

### _limit (Limit)

```
--parse_version/games?_limit=5
```

Limit the number of results for a request.

 - `?_limit=5` - Limit the request to 5 individual results. 

### _q (Full text search)

```
--parse_version/games/1?_q=The Lord Of The Rings
```

Full-text search is a lenient search filter that _is only available_ if the endpoint you are querying contains a `name` column. Wildcards should _not_ be applied to this filter as they are ignored.

- `?_q=The Lord of the Rings` - This will return every result where the `name` column contains any of the following words: 'The', 'Lord', 'of', 'the', 'Rings'.

### -lk (Like)

```
--parse_version/games?name-lk=texture
```

```
--parse_version/games?name-lk=*texture
```

```
--parse_version/games?name-lk=texture*
```

Where the string supplied matches the preceding column value. This is the equivalent to SQL's `LIKE`. Consider using wildcard's `*` for the best chance of results as described below.

- `?name-lk=texture` - Get all results where only _texture_ occurs in the `name` column.

### -not-lk (Not Like)

```
--parse_version/games?name-not-lk=dungeon
```

Where the string supplied does not match the preceding column value. This is the equivalent to SQL's `NOT LIKE`.

- `?name-not-lk=dungeon` - Get all results where _texture_ does not occur in the `name` column.

### -lk & -not-lk Wildcards

```
--parse_version/games?name-lk=The Witcher*
```

```
--parse_version/games?name-lk=*Asset Pack
```

The above -lk examples will only return results for an exact match, which may make it hard to get results depending on the complexity of your query. In that event, it's recommended you utilize the -lk wildcard value `*`. This is the equivalent to SQL's `%`.

- `?name-lk=The Witcher*` - Get all results where _The Witcher_ is succeeded by any value. This means the query would return results for 'The Witcher', 'The Witcher 2' and 'The Witcher 3'. 

- `?name-lk=*Asset Pack` - Get all results where _Asset Pack_ is proceeded by any value. This means the query would return results for 'Armor Asset Pack', 'Weapon Asset Pack' and 'HD Asset Pack'. 
 
### -in (In)

```
--parse_version/games?id-in=3,11,16,29
```

Where the supplied list of values appears in the preceding column value. This is the equivalent to SQL's `IN`.

- `?id-in=3,11,16,29` - Get all results where the `id` column value is 3, 11, 16 and 29.

### -not-in (Not In)

```
--parse_version/games?modfile-not-in=8,13,22
```

Where the supplied list of values *does not* in the preceding column value. This is the equivalent to SQL's `NOT IN`

- `?modfile-not-in=8,13,22` - Get all results where `id` column *does not* equal 8, 18 and 22.

### -min (Min)

```
--parse_version/games?game-min=20
```

Where the preceding column value is greater than or equal to the value specified.

- `?game-min=20` - Get all results where the `game` column is greater than or equal to 20.

### -max (Max)

```
--parse_version/games?game-max=40
```

Where the preceding column value is smaller than or equal to the value specified.

- `?game-max=40` - Get all results where the `game` smaller than or equal to 40.  

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

### -not (Not Equal To)

```
--parse_version/games?price-not=19.99
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
