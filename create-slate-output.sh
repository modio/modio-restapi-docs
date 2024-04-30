#!/usr/bin/env bash
set -o errexit #abort if any command fails

environment=$1

# Rename build folder docusaurus_build_output which acts as the root folder for the static website
mkdir -p restapi_docs_platform_output

# Remove the CNAME file
rm -rf build/CNAME

# move folders into docusaurus_build_output folder and remove the -build suffix
mv build restapi_docs_platform_output/build

# Sync the build to the restapiref folder 
aws s3 sync restapi_docs_platform_output/build s3://restapi-docs-"$environment"/restapiref
