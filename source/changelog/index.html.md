# Getting Started

### Latest API Version: <span class="versionwrap latest">v1</span> 

Our aim with mod.io is to offer developers the most powerful and flexible mod API available. This means continually evolving and improving based on your requirements and pushing changes when required. The majority of these changes will be non-breaking and deployed immediately, however there will be times when breaking changes are needed. To ensure your mod.io implementations are not affected by the changes, we have architectured a versioning system that maintains backwards compatibility and allows you to upgrade your implementation when it suits. Read on details.

### How We Handle Versioning

Upon first look, our implementation is consistent with many other REST API's, where you have a version specified in the URL and can change that value as required. The mod.io API follows this convention - however, we don't treat our versions as 'major' and instead __we release a new version each time breaking changes are made__. This allows us to release updates as frequently as is deemed required, with no impact on existing API consumers. Documentation is also preserved for past versions, so whilst we recommend you use the latest version of the API, we will always aim to support legacy versions.

### Versioning Format Convention

For the initial release of the API, __v1__ is a valid format and version.
However, for all future versions, the __v1__ format is _deprecated_ and the following format will be used to represent each mod.io API version.

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
curl -X GET https://api.mod.io/v1/games?api_key=YourApiKey
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

# API Versions

## v1 (Latest Version)
### Date Live: May 15, 2018, 12:00 am GMT

Initial API release.

### <span class="versionwrap"><a href="https://docs.mod.io">View v1 docs</a></span>