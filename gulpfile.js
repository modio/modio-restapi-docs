/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable max-len */

const gulp = require('gulp');
const s3 = require('s3');

// Upload dist/app.sass to S3 bucket.
// command: gulp combine --bucket mybucket
gulp.task('upload', (done) => {
  const cmdArgs = process.argv;
  if (cmdArgs[3] === undefined || cmdArgs[3] !== '--bucket' || cmdArgs[4] === undefined) {
    console.log('You must supply the S3 bucket name: gulp upload --bucket mybucket. Aborting upload.');
    done();
  } else {
    const bucket = cmdArgs[4];
    const client = s3.createClient({
      s3Options: {
        region: 'us-west-1',
      }, 
    });

    const params = {
      localFile: `dist/${filename}`,
      s3Params: {
        Bucket: bucket,
        Key: `base/${filename}`,
        ACL: 'public-read',
      },
    };

    const uploader = client.uploadFile(params);

    uploader.on('error', (err) => {
      console.error(`Unable to upload ${filename}:`, err.stack);
    });
    uploader.on('progress', () => {
      console.log(`Upload progress of ${filename}:`, uploader.progressAmount, '/', uploader.progressTotal);
    }); 
    uploader.on('end', () => {
      console.log(`Finished uploading ${filename}`);
      done();
    });
  }
});
