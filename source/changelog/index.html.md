# API Versions

## v1 (latest version)
### Date Live: July 10, 2023, 6:16 am GMT

Initial API Release.

### <span class="versionwrap">[View v1 docs](/)</span>

# Changelog

## Oct 27, 2022

### Deprecating X-Ratelimit headers

- Beginning Nov 20th, 2022, all custom rate limit headers `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-RetryAfter` will no longer be returned. They will be replaced with `retry-after` when the [ratelimit is exceeded](/#rate-limiting).

# How We Version

### Latest API Version: <span class="versionwrap latest">v1</span> 

Our aim with mod.io is to offer developers the most powerful and flexible mod API available. This means continually evolving and improving based on your requirements and pushing changes when required. The majority of these changes will be non-breaking and deployed immediately, however there will be times when breaking changes are needed. To ensure your mod.io implementations are not affected by the changes, we have architectured a versioning system that aims to maintain backwards compatibility and allow you to upgrade your implementation at a time that suits.

### How We Handle Versioning

Upon first look, our implementation is consistent with many other REST API's, where you have a version specified in the URL and can change that value as required. The mod.io API follows this convention - however, we don't treat our versions as 'major' and instead __we release a new version each time breaking changes are made__. This allows us to release updates as frequently as is deemed required, with no impact on existing API consumers. Documentation is also preserved for past versions, so whilst we recommend you use the latest version of the API, we will always aim to support legacy versions.

### Versioning Format Convention

For the initial release of the API, __v1__ is a valid format and version. Future releases will continue to follow this convention, by incrementing the version number, i.e. __v[0-9]+__

### Version Examples

- `v1` - Initial version of our API.
- `v2` - The next major release of the API, that will require a migration to support the breaking changes made to the prior version.
- `v9` - The 9th release of the API, that will require a migration to support the breaking changes made to the prior version.

### Version Requests
```shell
Example cURL request
---------------------
curl -X GET https://*.modapi.io/v1/games?api_key=YourApiKey
```

When you make a request, setting the version of mod.io is a requirement as it forms
part of the URL required to make a successful request. 

### Handling invalid versions

When making requests to the API, you need to be sure you know what functionality is available to you
and what you can expect the API to do under every situation. With that said, and in the interest of
being as explicit as possible if you supply a version in the URL of your request that is _not_ listed
in the [changelog](#api-versions) below - a `404 Not Found` will be returned in the form of the [Error Object](/#error-object).

## What are breaking changes

The benefit of the approach we have taken to versioning, is it allows us to push breaking changes
and continually improve the API without impacting your application until you update. To clarify, for the mod.io API the following
are what constitutes as __breaking__ changes:

Non-Breaking (not covered in changelog) | Breaking Changes
---------- | ----------  
Adding new fields to an object | Modifying or removing a field in an object
Adding new events | Modifying or removing an endpoint's path
Adding new objects to a response | Modifying any HTTP code that could returned by a request
Adding new headers to a request/response | Modifying any HTTP error code that could returned by _any_ endpoint
Changing the ordering of items in a response | Modifying or removing any request/response header
  
Changes that _are_ non-breaking will continue to be delivered to you regardless of which API version you are using, and documentation for every version will continue to be updated to reflect these changes. Only breaking changes described above will fall under this versioning system.