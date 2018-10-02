# Intro

Latest API Version: <a href="#--parse_version-latest-version"><span class="versionwrap latest">--parse_version</span></a> 

The --parse_sitename API is always evolving and our team are frequently pushing non-breaking changes to the API, however out of necessity there will be times when we need to make breaking changes to our API. To ensure that your --parse_sitename implementations are not affected by new changes we have architectured our versioning system to be flexible and to allow you to upgrade your implementation when it suits you. Read on for specifics on how we version the API.

### How We Handle Versioning

Upon first look, our implementation is consistent with many other REST API's, where you have a version specified in the URL and you can change that value as required to swap between versions of the API. The --parse_sitename API follows the same convention of supplying the version in the URL of the request - however, we don't treat our versions as 'Major' versions and instead __we release a new version everytime breaking changes are made__. This allows us to release updates as frequently as is deemed required, with no impact on existing API consumers. Documentation is also preserved for every single version so whilst it's always great to be on the latest version of the API, we will always support legacy versions. 

### Versioning Format Convention

For the initial release of the API, __v1__ is a valid format and version. This is a similar convention to what you already know with other API's that include the requested API version in the URL. 

However, for all future versions, the __v1__ format is _deprecated_ and the following format 
will be consistently used to represent each new version that is published for the --parse_sitename API.    

### Format breakdown

Format: <span class="versionwrap">YYYYr{0-9}</span>
Example: <span class="versionwrap latest">2018r1</span>

- `YYYY` - The year of the version
- `r` - Always hard-coded as 'r', signifying the release number
- `0-9` - The release number which is incremented per release, relative to the year.
Whenever the year is changed, the release number begins at 1.

Important Reminder: The release number is __not__ a representation of the month of 
the year and always denotes the (n)th release of that year.

### Version Examples

- `v1` - First version of our API. This formatting is no longer used.
- `2018r1` - The 1st release of a breaking API change for 2018.
- `2019r7` - The 7th release of a breaking API change for 2019.

### Version Requests
```shell
Example cURL request
---------------------
curl -X GET --parse_apiurl/--parse_version/games \
	-d 'api_key: 0d0ba6756d032246f1299f8c01abc424'
```

When you make a request, setting the version of --parse_sitename is a requirement as it forms
part of the URL required to make a successful request. 

### Handling invalid versions

When making requests to the API, you need to be sure you know what functionality is available to you
and what you can expect the API to do under every situation. With that said, and in the interest of
being as explicit as possible if you supply a version in the URL of your request that is _not_ listed
in the [changelog](#api-versions) below - a `404 Not Found` will be returned in the form of the [Error Object](https://docs.mod.io/#error-object).

## What are incompatible changes

The benefit of this system is we can push backward-incompatible changes out of necessity
and your application is not affected. To clarify, for the --parse_sitename API the following
are what constitutes as __backwards-incompatible__ changes:

Backwards Compatible (not covered in changelog) | Backwards Incompatible (breaking)
---------- | ----------  
Adding a new field to an object | Modifying or removing a field in an object
Adding new objects to a response | Modifying any HTTP code that could returned by a request
Adding new headers to a request/response | Modifying any HTTP error code that could returned by _any_ endpoint
Adding new events | Modifying or removing an endpoint's path
Changing the ordering of items in a response  | Modifying or removing any request/response header
  
Changes that _are_ backward-compatible will continue to be delivered to you regardless of which API version you are using, and documentation for every version will continue to be updated to reflect these changes. Only breaking changes described above will fall under this
versioning system.

# API Versions