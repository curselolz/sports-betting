#!/bin/bash

# Next variables should be passed in command line
# ENV

# next variables should be set in .env.deploy file
# AWS_ACCESS_KEY_ID
# AWS_SECRET_ACCESS_KEY
# AWS_DEFAULT_REGION
# AWS_S3_BUCKET

# get current dir
ROOT_DIR="$(pwd)"
BUILD_DIR="$ROOT_DIR/build"

# set -a causes variables defined from now on to be automatically exported
set -a
# import configuration variables
source "$ROOT_DIR/.env.deploy"
set +a

# build project
npm run build

# go to build folder
cd "$BUILD_DIR"


echo "Checking $AWS_S3_BUCKET bucket existence..."

BUCKET_SEARCH_RESULTS="$(aws s3 ls s3://$AWS_S3_BUCKET 2>&1)"

echo "$BUCKET_SEARCH_RESULTS"
if [[ ("$BUCKET_SEARCH_RESULTS" != *"NoSuchBucket"*) ]]; then

    # upload to s3
    echo "Syncing files with bucket..."
    aws s3 sync --delete . "s3://$AWS_S3_BUCKET"

else
    echo "Skipping deploy... Done."
fi
