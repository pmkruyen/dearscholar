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
|_css
  |_dearscholar.css       (general css settings)
  |_framework7-icons.css* (Framework7 icons)
|_fonts*        (folder contains Framework7 fonts)
|_img           (DearScholar icons, all icons are derived from, and licenced by Icons8, https://icons8.com/)
|_lib
  |_framework7* (folder contains all Framework7 files by Vladimir Kharlampidi and his team)
|_js
  |_jquery-3.4.1.min.js*  (jquery functions)
  |_moments.js*           (functions used to render and display measurement dates in the measurement schedule)
  |_push.js*              (functions used to fire push functions, limited capabilities yet)
  |_dearscholar.js        (all javascript functions)
|_about.html        (app page containing credits)
|_index.html        (app page containing the login screen, panel with links, all pop-up windows)
|_manual.html       (app page containing the manual for respondents)
|_messages.html     (app page containing the messages page)
|_module.html       (app page in which the survey pages and questions are rendered)
|_schedule.html     (app page in which the measurement schedule is rendered)
|_settings.html     (app page containing the settings for respondents)
|_survey.html       (app page containing the icons of, and links to the mandatory survey modules)
|_surveyadhoc.html  (app page containing the icons of, and links to the additional survey modules)
```
Files and folders that are market with an * consist of third-party code, and should not be modified.

# Push notifications
Currently, DearScholar uses Google's Firebase to get the push notifications working. To get this running, the google-service.json and googleService-Info.plist file should be added to the main folder and, besides the push.js file should be configured (marked with *** in push.js). Because of security issues, these files and configurations are excluded from this public repro. Contact the main author if you want to contribute to enhance the push notification capabilities of DearScholar.
