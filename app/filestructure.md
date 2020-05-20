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
  |_moments.js*           (functions used to render and display measurement dates in the measurement schedule)
  |_push.js*              (functions used to fire push functions, limited capabilities yet)
  |_dearscholar.js        (all app functions)
```

Files that are market with an * consist of third-party software, and should not be modified.

# Push notifications
Currently, DearScholar uses Google's Firebase to get the push notifications working. To get this running, the google-service.json and googleService-Info.plist file should be added to the main folder and, besides the push.js file should be configured (marked with *** in push.js). Because of security issues, these files and configurations are excluded from this public repro. Contact the main author if you want to contribute to enhance the push notification capabilities of DearScholar.
