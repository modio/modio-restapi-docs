# Getting Started

## --parse_sitename API --parse_version

Welcome to the official documentation for [--parse_sitename](--parse_siteurl), an API which makes it a joy to search, sort and share mods in-game. We recommend you read _Getting Started_ to accurately and efficiently consume our REST API. 

__Current version:__ `--parse_version`

__Base path:__ [--parse_apiurl](--parse_apiurl)

## How It Works

Compatible with all builds of your game, --parse_sitename operates silently in the background (without requiring your users to install another client), to give you complete control over your modding ecosystem.

![--parse_sitename Overview](https://static.mod.io/v1/images/home/sdk.png).

## Implementation

You have 3 options to get connected to the --parse_sitename API which you can use interchangeably depending on your needs. Here's the breakdown of each option.

Option | Usage | Suited for | Docs
---------- | ---------- | ---------- | ---------
__API__ | For connecting directly to the --parse_sitename REST API | Web apps that need a JSON REST API, or game developers that like a challenge and want control over their implementation. | You are reading them
__SDK__ | Drop our [open source C/C++ SDK](https://sdk.mod.io) into your game to call --parse_sitename functionality. | Developers that want a SDK that abstracts the uploading, downloading and unzip flows behind easy to use function calls. | [Here](https://sdk.mod.io)
__Tools/Plugins__ | Use tools and plugins created by the community to make implementation in various engines easy. | Game developers that want a pre-built modding solution for their engine (Unity, Unreal) of choice. | [Available per tool](https://apps.mod.io)

Here is a brief list of the main things to know about our API, as explained in more detail in the following sections.

- All requests to the API __must__ be made over HTTPS (SSL).
- All API responses are in `application/json` format.
- API keys are restricted to read-only `GET` requests.
- OAuth 2 access tokens are required for `POST`, `PUT` and `DELETE` requests.
- Binary data `POST` requests must use `Content-Type: multipart/form-data` header.
- Non-binary `POST`, `PUT` and `DELETE` requests must use `Content-Type: application/x-www-form-urlencoded` header.
- Non-binary data can optionally be supplied in `application/json` using the `input_json` parameter. 
- Rate limiting can be implemented for excess usage to deter abuse and spam.

## Authentication

Authentication with the --parse_sitename API can be done via 3 ways:

- Request an [API key (Read Access Only)](--parse_siteurl/apikey/widget)
- Manually create an [OAuth 2 Access Token (Read + Write Access)](--parse_siteurl/oauth/widget)
- Use our [Email Authentication Flow](#email-authentication-flow) (to create an OAuth 2 Access Token with Read + Write Access) 

You can use these methods of authentication interchangably, depending on the level of access you require to the --parse_sitename API.

Authentication Type | In | HTTP Methods | Abilities | Purpose
---------- | ---------- | ---------- | ---------- | ---------- 
API Key | Query | `GET` | Read-only `GET` requests and email authentication flow. | Browsing and downloading content.
Access Token (OAuth 2) | Header | `GET`, `POST`, `PUT`, `DELETE` | Read, create, update, delete. | View, add, edit and delete content the authenticated user has subscribed to or has permission to change.

### API Key Authentication

To access the API authentication is required. All users and games get a [private API key](--parse_siteurl/apikey/widget). It is quick and easy to use in your apps but limited to read-only GET requests, due to the limited security it offers.

[Get your private API key](--parse_siteurl/apikey/widget)

### Email Authentication Flow

To perform writes, you will need to authenticate your users via OAuth 2. To make this frictionless in-game, we use an email verification system, similar to what Slack and others pioneered. It works by users supplying their email, which we send a time-limited 5 digit security code too. They exchange this code in-game, for an [OAuth 2 access token](--parse_siteurl/oauth/widget) you can save to authenticate future requests. The benefit of this approach is it avoids complex website redirects and doesn't require your users to complete a slow registration flow.

![--parse_sitename Email Authentication Flow](https://static.mod.io/v1/images/home/email.png)

```shell
// Example POST requesting security code be sent to supplied email

curl -X POST --parse_apiurl/oauth/emailrequest \
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

```JSON
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

--parse_sitename allows you to specify the permission each access token has (default is read+write), this is done by the use of scopes. See below for a full list of scopes available, you must include at least one scope when generating a new token.

Scope | Abilities
---------- | ----------
`read` | When authenticated with a token that *only* contains the `read` scope you will only be able to read data via `GET` requests. 
`write` | When authenticated with a token that contains the `write` scope you are able to add, edit and remove resources.
`read+write` | The above scopes combined. _Default for email verification flow._

## Making Requests

Requests to the --parse_sitename API __must__ be over HTTPS (Port 443), any requests made over HTTP will return a `400 Bad Request` response.

### Using an API Key

```
curl -X get --parse_apiurl/games?api_key=xxxxxxxxxxxxxxxx
``` 

To authenticate using your unique 32-character API key simply append the `api_key=xxxxxxxxxxxxxxxx` parameter to the end of your request. Remember that using an API key means requests are in read-only mode, and that if you want to create, update or delete resources - authentication via OAuth 2 is required which you can [set up with your api key](#authentication).

### Using an Access Token

To authenticate using an OAuth 2 access token you must include the HTTP header `Authorization` in your request with the value `Bearer your-token-here`. Verification via Access Tokens allow much greater power including creating, updating and deleting resources that you have access to. Also because OAuth 2 access tokens are tied to a user account, you can personalize the output by viewing content they are subscribed and connected to.

```shell
// Example POST request with no binary files

curl -X post --parse_apiurl/games/1/mods/1/tags \
  -H 'Authorization: Bearer your-token-here' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'tags[]=Unity' \
  -d 'tags[]=FPS'
```

### Request Content-Type

If you are making a request that includes a file, your request `Content-Type` header __must__ be `multipart/form-data`, otherwise if the request contains data (but no files) it should be `application/x-www-form-urlencoded`. 

```shell
// Example POST request with binary file

curl -X post --parse_apiurl/games/1/mods \
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

curl -X post --parse_apiurl/games/1/team \
  -H 'Authorization: Bearer your-token-here' \
  -H 'Content-Type: application/x-www-form-urlencoded' \  
  -d 'input_json={
		"member":"1",
		"level":"8",
		"position":"King in the North"
	  }'
```

For `POST` & `PUT` requests that do _not submit files_ you have the option to supply your data as HTTP `POST` parameters, or as a _UTF-8 encoded_ JSON object inside the parameter `input_json` which contains all required data. Regardless, whether you use JSON or not the `Content-Type` of your request still needs to be `application/x-www-form-urlencoded` with the data provided in the body of the request.

__NOTE:__ If you supply identical key-value pairs as a request parameter and also as a parameter of your JSON object, the JSON object __will take priority__ as only one can exist.

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

If an error occurs, --parse_sitename returns an error object with the HTTP `code` and `message` to describe what happened and when possible how to avoid repeating the error. It's important to note that if you encounter errors that are not server errors (`500+` codes) - you should review the error message before continuing to send requests to the endpoint.

When requests contain invalid input data or query parameters (for filtering), an optional field object called `errors` can be supplied inside the `error` object, which contains a list of the invalid inputs. The nested `errors` object is only supplied with `422 Unprocessable Entity` responses. Be sure to review the [Response Codes](#response-codes) to be aware of the HTTP codes that the --parse_sitename API returns.

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
`429` | Too Many Requests -- You have made too many requests, inspect headers for reset time.
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
	"download": "--parse_siteurl/mods/file/2/c489a0354111a4dx6640d47f0cdcb294"
}
```

The way in which --parse_sitename formats responses is entirely dependant on whether the requesting endpoint is returning a single item or a collection of items.

### Single item Responses

For single items, --parse_sitename returns a __single JSON object__ which contains the requested resource. There is no nesting for single responses.

### Multiple item Responses

Endpoints that return more than one result, return a JSON object which contains a data array and metadata fields:

- `data` - contains all data returned from the request.
- metadata fields - contains all cursor metadata to help you paginate through the API.

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
			"download": "--parse_siteurl/mods/file/2/c489a0354111a4d76640d47f0cdcb294"
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

When requesting data from endpoints that contain more than one object, there are two parameters you can supply to paginate through the results with ease, they are `_cursor` and `_offset`. They work slightly differently, so pick the one which suits your use case best.

### Cursor

```
--parse_version/games/2/mods/2/files?_cursor=300
```

When using a cursor, you are able to specify where you want to _start_ looking for results by the value of the `id` column. Let's assume you want to get all files on --parse_sitename that contain an id larger than 300. You could use the following:

- `?_cursor=300` - Only return fields that have an `id` larger than 300. 

When using cursors you can optionally provide a `_prev` parameter, which is the previous cursor used. Let's assume you just used the above search filter and wish to keep track of your previous `_cursor` value. You would apply it like so:

```
--parse_version/games/2/mods/2/files?_cursor=400&_prev=300
```

- `?_cursor=400&_prev=300` - Move the cursor to all records with an `id` larger than 400, but remember our previous cursor location was 300.

__NOTE:__ The `_prev` parameter is arbitrary information and does not affect the outcome of the query, other than the value being appended to the metadata fields returned.

Cursors are the quickest and __recommended__ way to paginate, because they tell the database exactly where to start looking.

### Offset

```
--parse_version/games?_offset=30
```

While a cursor starts from the value of the `id` column, the `_offset` will simply skip over the specified number of results, regardless of what data they contain. This works the same way offset does in a SQL query. Let's assume you want to get all mods from --parse_sitename but ignore the first 30 results.

- `?_offset=30` - Will retrieve all results after ignoring the first 30.

As cursors and offsets are mutually exclusive, you should choose one or the other - if you supply both, the __cursor__ will take priority.

### Combining a cursor/offset with a limit

```
--parse_version/games/2/mods/2/files?_cursor=5&_prev=5&_limit=10
```

You can combine cursors and offsets with other filter functions such `_limit` & `_sort` to build powerful queries that enable you to be as precise or lenient as you want. 

### Cursor metadata

Appended to each request with more than one result is the cursor metadata, this will always appear regardless of if you utilize a cursor/offset or not. This is what each value means:

```JSON
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
`result_count` | The amount of results returned in the current request.

## Filtering

--parse_sitename has powerful filtering available to assist you when making requests to the API. Every field of every request can be used as a filter and the following functions are available when querying the API. It is important to understand that when using filters in your request, the filters you specify will __only be applied to the bottom-level columns__. That is, if the response object contains a nested object with the same column name, ie. `id` - filtering will apply only to the bottom level object, and not any nested objects.

### Functions

### _sort (Sort)

```
--parse_version/games?_sort=id
```

Sort by a column, in ascending or descending order.

- `?_sort=id` - Sort `id` in ascending order

- `?_sort=-id` - Sort `id` in descending order

__NOTE:__ All endpoints are automatically sorted by the `id` column in ascending order unless specifically mentioned otherwise. 

### _limit (Limit)

```
--parse_version/games?_limit=5
```

Limit the number of results for a request.

 - `?_limit=5` - Limit the request to 5 individual results. 

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

The simpliest filter you can apply is _columnname_ equals. This will return all rows which contain a column matching the value provided. 

- `?id=10` - Get all results where the `id` column value is _10_.

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

- `?name-not-lk=dungeon` - Get all results where only _dungeon_ doesn't occur in the `name` column.

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

Where the supplied list of values *does not* equal the preceding column value. This is the equivalent to SQL's `NOT IN`

- `?modfile-not-in=8,13,22` - Get all results where `id` column *does not* equal 8, 13 and 22.

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

### -bitwise-and (Bitwise AND)

```
--parse_version/games?api-bitwise-and=5
```

Some columns are stored as bits within an integer. Their value depends on the bits selected. For example, suppose a column has 4 options:

- 1 = Option A
- 2 = Option B
- 4 = Option C
- 8 = Option D

You can combine any of these options by adding them together which means there are (2 ^ 4 = 16 possible combinations). For example Option A (1) and Option C (4) would be (1 + 4 = 5), Option A (1), Option C (4) and Option D (8) would be (1 + 4 + 8 = 13), all Options together would be (1 + 2 + 4 + 8 = 15).

The number of combinations makes using _equals_, _in_ and other filters a little complex. To solve this we support Bitwise AND (&) which makes it easy to match a column which contains any of the Options you want.

- `?api-bitwise-and=5` - Where the `api` column value is 1, 3, 4, 5, 6, 7, 9, 11, 12, 13, 14, 15.

## Rate Limiting

--parse_sitename implements rate limiting to stop users abusing the service. Exceeding your rate limit will result in requests receiving a `429 Too Many Requests` response until your reset time is reached. 

It is *highly recommended* you architect your app to check for the `X-RateLimit` headers below and the `429` HTTP response code to ensure you are not making too many requests or continuing to make requests after a `429` code is repeatedly returned. Users who continue to send requests despite a `429` response could potentially have their access tokens revoked. The following limits are implemented by default:

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

- API keys linked to a member are limited to __100,000 requests per day__.
- API keys linked to a game have __unlimited requests__.

### OAuth2 Rate Limiting

- Users tokens are limited to __100,000 requests per day__. 

### Headers

--parse_sitename returns the following headers in each request to inform you of your remaining requests and time until reset.

 - `X-RateLimit-Limit` - Number of requests you can make from the supplied API key/access token per hour.
 - `X-RateLimit-Remaining` - Number of minutes until your rate limit resets.

### Optimize your requests

You should always plan to minimize requests and cache API responses. It will make your app feel fluid and fast for your users. If your usage is excessive we shall reach out to discuss ways of optimizing, but our aim is to never restrict legitimate use of the API. We have set high limits that should cover 99% of use-cases, and are happy to [discuss your scenario](mailto:developers@mod.io?subject=API%20usage) if you require more.

## Contact

If you spot any errors within the --parse_sitename documentation, have feedback on how we can make it easier to follow or simply want to discuss how awesome mods are, feel free to reach out anytime [developers@mod.io](mailto:developers@mod.io?subject=API). We are here to help you grow and maximise the potential of mods in your game.
