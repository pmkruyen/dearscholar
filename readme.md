[![status](https://joss.theoj.org/papers/1896b88f26b987b9c7a07035751afd7b/status.svg)](https://joss.theoj.org/papers/1896b88f26b987b9c7a07035751afd7b)

# Overview
Because collecting longitudinal data becomes more important in academic research nowadays and because limitations with available tools, DearScholar has been developed.

DearScholar allows researchers to easily and orderly collect rich and diverse qualitative and quantitative data over short and long periods of time to answer research questions about inter- and intra-individual changes, developments, and processes.

Developed as hybrid app in Cordova/Phonegap (using html, javascript, and css), DearScholar can be used to collect data on iOS devices (iPhones and iPads), Android devices, and--in the future--in web browsers too.

The general project page with an overview of the features can be found [here](https://peterkruyen.net/dearscholar.html).

:running: *Note*. This developer branch contains the newest developer release offering more flexibility to researchers with regard to the survey modules (number of modules and type of modules). The developer release will be soon submitted to the App Store and Google Play.

## This document
The *first* section of this document provides general information about the app, the *second* section (**DearScholar in details**) provides the details for academic researchers who consider using DearScholar to collect data *and* potential contributors who want to help to improve DearScholar.

## Interested in using DearScholar in your academic research project? 
* Contact the main author (p.m.kruyen@fm.ru.nl) for credentials (username and password); download the app on the App Store or Google Play (see the links below); take your time to test the app; send us feedback, and discuss with us how to implement DearScholar in your project :rocket:.

* Currently, the offical deployed version of DearScholar stores research data on a secure server in the Netherlands only. If you want to use your own server, contact the main author to discuss how to make this possible.

## Interested in contributing to DearScholar?
Super cool. Please contact the main author to discuss issues and possibilities. DearScholar uses [BrowserStack](https://www.browserstack.com/) for (automatic) testing (sponsored open-source subscription).

## Your own version of DearScholar?
Obviously, as this is an open-source project, you are free to build your own derivative version (clone) of DearScholar. However, while DearScholar clones might be allowed on Google Play, submisions of clones run the risk of being rejected on the App Store due to Apple's policies. More importantly, combining our strengths to develop DearScholar further will be more productive for the research community and more fun! Thank you! :smiley:.

## Resources
### For end users (respondents) and researchers who want to explore DearScholar:
* For iOS devices (iPhones and iPads), download the app on [the App Store](https://apps.apple.com/us/app/dearscholar/id1483121589?ls=1);
* For Android devices, download the app on [Google Play](https://play.google.com/store/apps/details?id=net.peterkruyen.diary&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1).

### For researchers and potential contributers:
* Background information, an overview of the current features, and research projects can be found on the [projectpage](https://peterkruyen.net/dearscholar.html);
* Read the section **DearScholar in details** below;
* Browse the app folders (App [Android >= 9.0 and iOS] and Android26 [Android 8.0 and 8.5]), fork the project, and commit updates.

## Research projects
DearScholar is used in the following projects:
* Diary study on public servants' creativity (>50 respondents; February-December 2020) by Glenn Houtgraaf MSc, dr. Peter M. Kruyen, and prof. dr. Sandra van Thiel.
* Diary study on creativity in local-care teams (>150 respondents; September-December 2020) by Liesbeth Faas MSc, dr. Peter M. Kruyen, and prof. dr. Sandra van Thiel.

## Acknowledgement
DearScholar is developed within the context of the research programme "The creative public servant: Observations, explanations and consequences" with project number 406.18.R8.028, financed by the Dutch Research Council (NWO). The main author wants to express his graditute to Glenn Houtgraaf MSc, Liesbeth Faas MSc, and the ICT Services (Radboud University, Nijmegen) for their advice, testing, and feedback; prof. dr. Sandra van Thiel for her encouragements; and last, but not least, all (pilot) respondents for their effort and feedback during the developmental process.

## License
Copyright (c) 2020 P.M. Kruyen, Institute for Management Research, Radboud University, the Netherlands. This library is free software; you can redistribute it and/or modify it under the terms of the GNU Lesser General Public License (GPL3) as published by the Free Software Foundation. Radboud University, hereby disclaims all copyright interest in the program “DearScholar” (which offers an app to conduct longitudinal qualitative and quantitative diary, log 
and survey research) written by P.M. Kruyen. Commercial license available, please contact Radboud Innovation, Radboud University, the Netherlands. Radboud Innovation – Technology Transfer Office.

# DearScholar in details
In this second part of this text, DearScholar's current features and technical details are provided. Subsequently, the following aspects are discussed:
* Current features;
* Framework;
* Options and settings;
* Installation;
* Guide for potential contributors and academic researchers;
* File structure of the app;
* Structure of dearscholar.js, the heart of the app.

## Current features
### Let respondents install DearScholar on their mobile device
1) A respondent has to download DearScholar from the App Store (iPhones and iPads) or Google Play (Android devices);
2) When opening DearScholar for the first time (left screenshot below), a respondent is asked to: 
    * allow push notifications; 
    * fill out the username and password that (s)he has received from the researcher; 
    * choose a 4-digit PIN if the device does not support Touch ID or Face Recognition; and 
    * agree to the informed consent form.
3) When everthing goes well, DearScholar pulls the required survey tables and settings from the server, and the respondent is directed to the measurement schedule (homepage, right screenshot below).

<p align="center">
  <kbd><img src=https://github.com/pmkruyen/dearscholar/blob/master/screenshots/1.png width="350"/></kbd>
  <kbd><img src=https://github.com/pmkruyen/dearscholar/blob/master/screenshots/2.png width="350"/></kbd>
</p>

### Let respondents answer questions
When logging in to DearScholar, a respondent is directed to the the measurement schedule (homepage) with all measurement occasions (dates). Future measurement occasions—measurement occasions beyond the current date—are locked and marked with a 'closed lock' icon. 

When a respondent clicks on a particular measurement occasion in the measurement schedule, (s)he is directed to a survey screen that displays all survey modules for that measurement date. Each module can be opened by clicking on the designated icon (see the screenshot below).

<p align="center">
  <kbd><img src=https://github.com/pmkruyen/dearscholar/blob/master/screenshots/3.png width="350"/></kbd>
</p>

DearScholar supports an unlimited number of survey modules, unlimited number of question pages in each module, a specification of which questions to appear on which page, simple branching and skipping logic, and different types of questions (binary questions, open questions, multiple-choice items, and rating sliders) to collect both quantitative and qualitative data (see the screenshots below for two examples). Respondents can type their answers in the answer boxes... or--because DearScholar works with speech recognition--dictate their answers.

<p align="center">
  <kbd><img src=https://github.com/pmkruyen/dearscholar/blob/master/screenshots/4.png width="350"/></kbd>
  <kbd><img src=https://github.com/pmkruyen/dearscholar/blob/master/screenshots/5.png width="350"/></kbd>
</p>

When a respondent has completed a module (i.e., for that module, all questions have been answered and the data has been succesfully uploaded to the server) the module icon turns green on the survey page. If all mandatory modules have been completed, the link to the measurement occasion turns grey and is marked with a 'sun' icon on the homepage.

DearScholar also includes links to additional, optional survey modules which can be found on the homepage's menu. Respondents can start these additional modules in between measurement occasions to report their thoughts once they occur (cf. event-sampling).

Respondents’ answers are not only send to a server, but also saved in the DearScholar. Respondents can access their previous answers by clicking on completed measurement modules, facilitating respondents to keep track of, and reread their own responses.

### Push notifications
DearScholar can be used with Google's Firebase to get the push notifications working *or* alternatively, a private push notification server can be used (using Node.JS for example). Contact the main author for advice on setting up such a server.

### Additional features
DearScholar has the capacity to send short in-app messages to specific respondents. For example, respondents can be sent thank-you messages to show engagement, small encouragements when respondents have missed a measurement occasions, ask follow up questions, or invited respondents to elaborate on particular answers over the phone or through email. These in-app messages are displayed on a separate message screen. An envelope icon appears in the app’s status bar when new messages have been sent. When respondents have read the message, the researcher is noted.

## Framework
DearScholar has been built using [Apache Cordova / Phonegap](https://phonegap.com/), and [Framework7 (v5.4.1)](https://framework7.io) by Vladimir Kharlampidi and his team. Next to several general Cordova plugins, DearScholar uses [fingerprint-aio](https://github.com/NiklasMerz/cordova-plugin-fingerprint-aio) to enable Touch ID and Face Recognition, [sqlite-evcore-extbuild-free](https://www.npmjs.com/package/cordova-sqlite-evcore-extbuild-free) to use sqlite tables, and [cordova-plugin-ionic-webview](https://github.com/ionic-team/cordova-plugin-ionic-webview) to replace UIWebView with WKWebView. 

## Installation
Researchers and contributors who want to test, contribute, or want to build their own version of DearScholar can follow the following installation steps. It is my ambition to automate these steps. Meanwhile, performing the steps manually gives a good first impression about how DearScholar functions.

*This section is in progress*. 

### Step 1: Server setup
To use Dearscholar, an Apache webserver (version 2.4.29) needs to be set up that runs MySQL (5.7.30), PHP (version 7.4.6), and phpMyAdmin (version 5.0.2) as front panel for researchers. For production, you would run this webserver on a real webserver. For testing, a local [Docker](https://www.docker.com/) container can be used as testing environment on your own device (laptop, pc). 

In this manual, I describe the steps for setting up such a local Docker container based on the [Docker-LAMP](https://github.com/mattrayner/docker-lamp) image. The nice thing about this image is that it creates a persistent MySQL database folder (in ```/mysql``` ) and file folder (in ```/app```)  on your harddrive at first run. Hence, you  need to perform the following steps only once (i.e., you can start and stop the testing enviroment as many times as you like without losing data).

After installing [Docker](https://www.docker.com/products/docker-desktop) on your device, open the terminal (command line) and run the Docker container with:

   ```docker run -i -t -p "80:80" -v ${PWD}/app:/app -v ${PWD}/mysql:/var/lib/mysql mattrayner/lamp:latest-1804```
   
When everthing went well, a password is generated (being displayed in the terminal). Save this password for later use.

Open ```localhost/phpmyadmin``` in your browser, you can now access your phpMyAdmin panel with ```admin``` and the generated password. Note that, when you visit ```localhost```, an error message will be displayed, because the (```/app```) folder is empty. 

*Note*. The webserver used for the official deployed version of DearScholar has additional security measures implemented. These measures have yet to be included in this Docker image.
      
### Step 2: MySQL setup - part 1
After setting up the Apache webserver at least two databases need to be set up in MySQL: one database called ```respondents``` for managing the respondents and registering the device IDs (tokens) in order to send push notifications (i.e., the authentication and surveyStructure table) *and* a seperate database for each project (with all the other tables) to make it possible to run multiple research projects simultaneously using a single production environment. The tables include variables (in the columns) and specific settings or respondents' data (in the rows). The MySQL database initialisation code for the database, all tables, and the suggested user rights can be found in the [mysql](https://github.com/pmkruyen/dearscholar/blob/master/mysql) file. Details about these tables with all options are provided in the **Settings and options** section on this page.

To set up these databases in the local testing environment, get the ID of the launched Apache container in Step 1 by running ```docker ps``` in a new terminal window. Next, run the below command replacing CONTAINER_ID with the obtained ID:

   ```docker exec -it CONTAINER_ID bash -l```

You are now in the (virtual) terminal of the Apache webserver. In this terminal, run```mysql``` to open MySQL. Execute all lines of code from Part 1 of the ```mysql``` file to create the ```respondents``` database and a ```project``` database with all tables (except the response tables).

Refresh phpMyAdmin in your browser to check if the two databases and the (empty) tables are created. Exit MySQL by running ```exit;``` in the terminal. 

### Step 3: MySQL setup - part 2
Now it is time to populate both databases for a sample study. To do so, we first insert usernames, hashed passwords, and the project settings for five mock respondents in the authentication table (in the ```respondents``` database).

Open the file [samplestudy-part1.php](https://github.com/pmkruyen/dearscholar/blob/master/samplestudy-part1.php) in a text editor and ammend the ```$MyPassword``` variable using the MySQL admin password that was generated at first run of the Docker container.

In the (virtual) terminal of the Apache webserver, run```php -a``` to open the interactive mode of PHP and execute all lines of code from the amended ```samplestudy-part1.php``` code. Exit the interactive mode by running ```exit``` in the terminal. 

Refresh phpMyAdmin in your browser. When everthing went well, the authentication table is populated with the sample data.

*Note*. When generating (random) usernames and passwords yourself, avoid using question marks (?) and ampersands (&). For production, you can load usernames and passwords from a csv file, and hash those passwords, using the lines of code at the top of the samplestudy-part1.php code.

### Step 4 MySQL setup - part 3 and further
Next we create the response tables in the ```project``` database and set up the appropriate user rights for all tables to to individual researchers and the DearScholar app.

*To be continued*

## Options and settings
In the ```var/www/html``` folder of the server, ```dearscholar.php``` needs to be included to let DearScholar communicate with the server. This file can be found [here](https://github.com/pmkruyen/dearscholar/blob/master/dearscholar.php).

In MySQL, a series of tables need to be set up and the proper user rights needs to be given to individual researchers and the DearScholar app. The tables include variables (in the columns) and specific settings or respondents' data (in the rows). The MySQL database initialisation code for the database, all tables, and the suggested user rights can be found [here](https://github.com/pmkruyen/dearscholar/blob/master/mysql). Below, these tables with all options, if applicable, are described.

### 1) authentication table
A table with the following columns, settings are stored for a single respondent on each row:
| Column name | Content | Options |
|:---------|:---------|:---------|
|id | Unique row ID||
|uname | Respondent's username||
|pwd | Respondent's hashed/encrypted password||
|project | Project name||
|setup | Check if the respondent agreed to the informed consent form (see pageStructure below) *and* DearScholar is set up correctly on the respondent's device. |Should be set to 0; *if* everything goes well changes to 1.|
|q0_startdate | Date of the first measurement occasion| yyyy-mm-dd|
|q0_occasions| Number of measurement occasions|a discrete number > 0|
|q0_intervaltype| Type of measurement interval|Currently, only days (*d*) and weeks are supported (*w*), contact the main author to discuss the implementation of other options.|
|q0_interval| Time interval between measurement occasions |a discrete number > 0|

*Note*. If you change settings during a project, adapt the routing structure, reformulate questions, etc., for each respondent, the 'setup column' in this table should be reset to 0 in order to let DearScholar update on each device, which will happen when respondents log in to DearScholar.

### 2) registration table
An *empty* table with the following columns:
| Column name | Content | Options |
|:---------|:---------|:---------|
|id | Unique row ID||
|project | Project name||
|uname | Respondent's username||
|token | Respondent's device ID (token) as supplied by Apple or Android on device registration||

*Note*. This table is required to register the device IDs (tokens) in order to send push notifications, settings are stored for a single respondent on each row. Because of security issues, push notification files and configurations are excluded from this public repro. Contact the main author if you want to contribute to enhance the push notification capabilities of DearScholar.

### 3) pinStructure table
An *empty* table with the following columns:
| Column name | Content | Options |
|:---------|:---------|:---------|
|id | Unique row ID||
|uname | Respondent's username||
|pin | Respondent's hashed/encrypted 4-digit PIN||
|code | NULL||

On devices that do not support Touch ID of Face Recognition, respondents are asked to choose a 4-digit PIN code on first login to DearScholar, which should be entered at each login attempt. What happens in case respondents forget their PIN code? The preferred route is that they contact the project leader to ask to reset their PIN code. To do so, you change the 'code column' for that respondent to REVOKE. When the respondent tries to log in after you revoked the PIN code, (s)he is asked to choose a new 4-digit PIN code.

### 4) surveyStructure table
A table with the following columns and only a single row:
| Column name | Content | Options |
|:---------|:---------|:---------|
|consent | Content for the informed consent form||
|manual | Content for the manual included in the app ||

*Note*. Html markup language can be used, for example, to include headings, paragraphs, and bold fonts (i.e., in the informed consent form or manual). 

### 5) moduleStructure table
A table with the following columns:
| Column name | Content | Options |
|:---------|:---------|:---------|
|module0 | Module id|*A*, *B*, *C*, or *D*, ...|
|name | Name of the module to be displayed on the module page||
|page | Location of the module|*S* (module to be displayed on the regular survey page) or *A* (module to be displayed on the additional, optional *adhoc* survey page)|
|mandatory |Type of module|*1* (Mandatory module) or *0* (Optional module)|
|image | Module icon|e.g., *icons8-innovation-64.png*|
|imageleft | Location of the icon in % from the left|e.g., *25%*|
|imagetop | Location of the icon in % from the top|e.g., *45%*|

*Note*. A limited number of [icon images](https://github.com/pmkruyen/dearscholar/tree/master/App/www/img) are currently available. These icons are provided by [Icons8](https://icons8.com/), collection Cute Outline, Business. Icons are reduced to 70% of their original size.

### 6) pageStructure table
A table with the following columns, each row represents a separate survey page in one of the modules:

| Column name | Content | Options |
|:---------|:---------|:---------|
|id | Unique row ID||
|module1 | ID of the module in which the page should be displayed| Consult the module0 column in the moduleStructure table (i.e. *A*, *B*, *C*, or *D*, ...)|
|classp | Set the first page in the module | Use *'tab tab-active'* for the first survey page in a module, for the other survey pages in the module use *'tab'*|
|idp | Unique survey page ID|  |
|header | Survey page header| Header to be displayed on the page |
|backbuttontid | Back button id| If *questionID=Value* is chosen, the *Value* of the back button is registered on click (e.g., to be used in case of binary questions), *works only if* 'backbuttononclick' below is correctly formatted.|
|backbuttontext | Text to be displayed on the back button|  |
|backbuttononclick | To be used for event listeners| Normally left empty, but if *click* is chosen, the value of back button is registered on click, *works only if* backbuttontid above is correctly formatted.|
|backbuttonhref | Link of the backbutton| If the backbutton is clicked, navigate to another page, for navigation to other pages in the module, use the format #idp (see the column idp)|
|nextbuttonid | Next button id| See backbuttontid|
|nextbuttontext | Text to be displayed on the next button|See backbuttontext|
|nextbuttononclick | To be used for event listeners|See backbuttononclick, *moreover* if *upload* is used, the data is sent to the server, and--on success--the module is closed and marked as completed, should (only) be used on the last page in the module obviously.
|nextbuttonhref | Link of the backbutton|See backbuttonhref|

### 7) questionTable table
A table with the following columns, each row represents a separate survey question:

| Column name | Content | Options |
|:---------|:---------|:---------|
|id | Unique row ID| |
|module2 | ID of the module in which the question should be included|Consult the module0 column in the moduleStructure table (i.e. *A*, *B*, *C*, or *D*, ...)|
|tab | ID of the survey page on which the question should be displayed |See idp of the pageStructure table.|
|idq | Unique page ID|  |
|type | Question type| On of the following *YN* (binary [Yes/No] question), *OQ* (Open Question), *MC* (Multiple Choice Question, or *SL* (Slider Question, currently supports only range sliders on a continious scale from 0 to 100).|
|question | Question text|  |
|categories | For *MC*, A JSON-string containing values and labels for all answer categories |{"TD":"Totally disagree", "DI":"Disagree", "NE":"Neutral","AG":"Agree","TA":"Totally agree"}  |
|footer | Optional question footer text |  |

*Note*. Html markup language can be used, for example, to include headings, paragraphs, and bold fonts (i.e., in the question text). 

### 8) messages table
This is an optional table to be used for sending in-app messages. A table with the following columns, each row to be used to specify a message for a specific respondent:

| Column name | Content | Options |
|:---------|:---------|:---------|
|id | Unique row ID| |
|uname | Respondent' username|
|timestamp | Date and time the message is written. |yyyy-mm-dd hh-mm-ss|
|message | Message content|  |
|seen | Check if the respondent has seen, that is 'clicked' the message. |Should be set to 0; *if* the respondent has seen the message, changes to 1.|

*Note*. Html markup language can be used, for example, to include headings, paragraphs, and bold fonts (i.e., in the message content).

### 9-..) response tables
Lastly, a series of empty response tables in which respondents' data is stored, one table for each module. Each of these tables has the following columns, each row represents a separate response entry:

| Column name | Content | Options |
|:---------|:---------|:---------|
|id | Unique row ID||
|uname | Respondent' username ||
|timestamp | Date and time on which the respondent uploaded the answers ||
|surveydate | Date and time of the measurement occasion ||
|... | One seperate column for each question in which the data is stored ||

*Note*. Why store both "timestamp" and "surveydate"? Respondents are asked to fill out a question module on a specific measurement occasion or survey date (date and time) as displayed in the measurement schedule. To check if respondents indeed completed the question module on the required survey date (or somewhat later), the timestamp is useful.

## Guide for potential contributors and academic researchers
Scholars who want to use DearScholar in their research project are advised to contact the main author directly. Contributors and academic researchers who want to build their own version of DearScholar can follow the following four steps.

### Step 1: Install DearScholar on your own computer
To get the developer version of DearScholar running on your computer, the following steps can be taken:
1) download the app files and folders as specified below (under file structure);
2) install either the desktop app or command line interface of [Phonegap](https://phonegap.com/getstarted/);
3) compile DearScholar on your computer using Phonegap ... the app appears in your web browser; and 
4) you can start improving DearScholar.

### Step 2: Experiment with DearScholar on your own computer
To log in, populate the survey modules with question pages and questions, and store answers on a server:
1) set up your own Apache server or get access to an existing one on your university;
2) set up a database (such as mysql) with the tables, columns, rows and cell content as specified above (under Server configuration);
3) include ```dearscholar.php``` in the ```var/www/html``` folder of the server to let DearScholar communicate with the server. This file can be found [here](https://github.com/pmkruyen/dearscholar/blob/master/dearscholar.php).

#### Sample study
To set up a sample study, the following scripts can be used:
1) [samplestudy-part1.php](https://github.com/pmkruyen/dearscholar/blob/master/samplestudy-part1.php) to populate the authentication and surveyStructure table;
2) [samplestudy-part2.sql](https://github.com/pmkruyen/dearscholar/blob/master/samplestudy-part2.sql) to populate the pageStructure and questionTable table;

*Note*. When generating random usernames and passwords (in samplestudy-part1.php), avoid using question marks (?) and ampersands (&).

### Step 3: Experiment with DearScholar on Android
In order experiment with DearScholar on Android devices, the app should be build (compiled):
1) pay fees to get an Android Developer Account;
2) master Google's guides and obtain the required certificates and keys;
3) compile DearScholar using [Phonegap's online tools](https://build.phonegap.com/) using these certificates and keys.

### Step 4: Experiment with DearScholar on your iOS
In order experiment with DearScholar on iOS (iPhones or iPads), the app should be build (compiled). Unfortunately, Phonegap's online tools can only be used to compile test versions of your app, but no longer to build production versions as the required SDK version (>= 13) is not supported. Consequently, it is better to refrain from using Phonegap's online tools for building iOS versions of DearScholar as using other SDK versions result in unexpected behavior of DearScholar. 

In short, how it works: 
1) pay fees to get an Apple Developer Account;
2) master Apple's guides and obtain the required certificates and keys;
3) compile DearScholar locally on your own device using [Cordova](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html#requirements-and-support) using these certificates and keys. 

*Note*. For iOS, while the current version is ```ios@6.1.0```, DearScholar is built using ```ios@5.1.1``` because of issues with several plugins with newer versions of Cordova. Further details will follow, meanwhile if you have questions contact the main author.


### Step 5: Deploy your clone or derivate version of DearScholar
Obviously, after Step 3 and 4, you may want to submit your modified  version of DearScholar to the App Store or Google Play Store. However, while DearScholar clones might be allowed on Google Play, submissions of clones run the risk of being rejected on the App Store due to Apple's policies. More importantly, combining our strengths to develop DearScholar further will be more productive for the research community and more fun! Thank you! 😃.

## File structure of the app
Researchers and (potential) contributors who want to know what happens under DearScholar's hood, can also browse the app folders (App [Android >= 9.0 and iOS] and Android26 [Android 8.0 and 8.5]. These versions slightly deviate because of platform specific settings. Help in integrating these versions is welcome. 

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
Files and folders that are market with an * consist of third-party code, and should not be modified. The files containing the settings and functions to enable push notifications (```google-services.json``` and ```push.js```) are excluded from this public repro.

### res-folder
This folder contains the app's icons and splash screens needed for both Android and iOS.

### icon.png
A low-quality icon of the app for internal use only.

### What about the push-notification files?
Because of security issues, these files and configurations are excluded from this public repro. Contact the main author if you want to contribute to enhance the push notification capabilities of DearScholar.

## Structure of dearscholar.js, the heart of the app
1) **Framework7 functions**
* General app settings;
* Configurations for each app page (in particular router functions and event listeners that activate the functions described below). 
2) **general event listeners**
* General functions for the login screen and survey screens. For Android devices, set the 'back button' as 'back button'. 
3) **login functions**
* When a respondent does not interact with DearScholar within 5.5 minutes, log out (i.e., navigate to the login screen);
* When a respondent tries to log in with Touch ID, Face Recognition, or PIN code, check the respondent's credentials;
* When a respondent's device does not support Touch ID or Face Recognition, ask the respondent to choose a PIN code;
* When a respondent tries to log in for the first time, show the informed consent form, and only proceed to the homepage (measurement schedule) when the respondent accepts the informed consent form.  
4) **database functions**
* When a respondent logs in for the first time successfully, retrieve the four survey tables (i.e., surveyStructure, moduleStructure, pageStructure, and questionTable) from the server and set up these tables on the respondent's device using sqlite. Also, set up a table in which respondent's answers are stored and a table in which DearScholar registers when a mandatory module has been completed locally.
5) **navigation functions**
* When a respondent navigates to the homepage (measurement schedule), render the measurement schedule, and mark a measurement occassion as completed when all mandatory modules have been completed for that measurement occassion;
* When a respondent opens the app for the first time, show the informed consent form;
* When a respondent navigates to the manual page, inject the manual.
6) **survey functions**
* When a respondent navigates to the survey page, render the page layout (i.e. the module icons) and color icons *if* the answers have been filled out previously.
7) **module functions**
* When a respondent opens a module, render the page structure, questions (items), and inject the answers *if* the answers have been filled out previously from the data stored in the sqlite tables.
8) **save functions**
* When a question is completed and a button is pushed, save the answer in DearScholar;
* When a module is completed for a particular surveydate, mark de module as completed; and
* When a module is completed for a particular surveydate, send the data to the server.
9) **message functions**
* When a respondent navigates to the homepage (measurement schedule), check for new messages;
* When a respondent navigates to the messages page, populate the messages page; and 
* When a new message has been read by the respondent (i.e. is 'clicked' on), let the server know when a message has been seen by the respondent.
10) **miscellaneous functions**
* Functions to render the content of the consent page and the manual.

