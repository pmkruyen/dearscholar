# Overview

## Config.xlm
This file is used by Phonegap/Cordova to compile the app correctly, and contains:
* meta-data about the app;
* general settings;
* settings for iOS;
* settings for Android;

## www-folder
This folder contains the source code of the app.
```bash
|_js
  |_jquery-3.4.1.min.js*  (enable jquery functions)
  |_moments.js*           (functions used to compute dates and times in the measurement schedule)
  |_push.js*              (functions used to to enable push functions, limited capabilities yet in the open source version)
  |_dearscholar.js        (functions used to do let the app work)
```

Files that are market with an * consist of third-party software, and should not be modified.
