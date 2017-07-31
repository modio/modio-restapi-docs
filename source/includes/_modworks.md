# Getting Started

## Overview

Welcome to the official `v1` API documentation for mod.works. Please ensure you read all all of the Getting Started content to ensure you can accurately and effeciently consume our REST API. Here is a brief list of the main things to know about our API, as explained in more detail in the following sections.

- All requests to the API __must__ be made over HTTPS.
- All API responses are in `application/json` format.
- Api-keys are restricted to read-only `GET` requests.
- OAuth2 access tokens are required for `POST`, `PUT` and `DELETE` requests.
- Binary data `POST` requests must use `Content-Type: multipart/form-data` header.
- Non-binary `POST`, `PUT` and `DELETE` requests must use `Content-Type: application/x-www-form-urlencoded` header.
- Non-binary data can optionally be supplied in `application/json` using the `input_json` parameter. 
- Rate limiting is implemented with varying limits depending on the resource type.

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

For `POST` & `PUT` requests that do __not submit files__ you have the option to either supply your data as usual HTTP `POST` parameters or as a single json object by supplying the parameter `input_json` which contains a url-encoded JSON object with all required data. Regardless of whether you use JSON or not the `Content-Type` of your request still needs to be `application/x-www-form-urlencoded` with the data provided in the body of the request.

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
