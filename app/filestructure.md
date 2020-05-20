# Overview

## Setup
TBA

## Programming guide
These guides are for (potential) contributors and researchers who want to build their own version of DearScholar. Scholars who want to use DearScholar in their research project are advised to contact the main author directly (p.m.kruyen@fm.ru.nl)

### Step 1: Install DearScholar on you own computer
To get the developer version of DearScholar running on you computer, the following steps can be taken:
1) download the files and folders in this app folder as specified below (under file structure);
2) install either the desktop app or command line interface of [Phonegap](https://phonegap.com/getstarted/);
3) compile DearScholar on your computer using Phonegap ... the app appears in your web browser; and 
4) you can start improving DearScholar.

### Step 2: Experiment with DearScholar on you own computer
To log in, populate the survey modules with question pages and questions, and store answers on a server:
1) set up your own (virtual private) server or get access to an existing one on your university;
2) set up a database (such as mysql) with the tables, columns and cells as specified above (under setup)
3) write the required php scripts to let the app communicate with the database on your server.

Generic php scripts that can be used with DearScholar will be included in this repro in the future. If you want to help developing these scripts, that is very much appreciated.

### Step 3: Experiment with DearScholar on your mobile device
In order experiment with DearScholar on iOS and Android devices, the app should be build (compiled):
1) pay fees to get an Apple Developer Account as well as an Android Developer Account;
2) master Apple's and Google's guides and obtain the required certificates and keys;
3) compile DearScholar using [Phonegap's online tools](https://build.phonegap.com/) using these certificates and keys.

### Step 4: Deploy your clone or derivate version of DearScholar
Obviously, after Step 3, you may want to submit your  modifified version of DearScholar to the App Store or Google Play Store. However, while DearScholar clones might be allowed on Google Play, submisions of clones run the risk of being rejected on the App Store due to Apple's policies. More importantly, combining our strengths to develop DearScholar further will be more productive for the research community and more fun! Thank you! 😃.

## File structure
### config.xlm
This file is used by Phonegap/Cordova to compile the app correctly, and contains:
* meta-data about the app;
* general settings;
* settings for iOS;
* settings for Android;

### www-folder
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

### res-folder
This folder contains the app's icons and splash screens needed for both Android and iOS.

### icon.png
A low quality icon of the app for internal use only.

## Push notifications
Currently, DearScholar uses Google's Firebase to get the push notifications working. To get this running, the google-service.json and googleService-Info.plist file should be added to the main folder and, besides the push.js file should be configured (marked with *** in push.js). Because of security issues, these files and configurations are excluded from this public repro. Contact the main author if you want to contribute to enhance the push notification capabilities of DearScholar.
