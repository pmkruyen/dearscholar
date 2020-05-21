# DearScholar in details
In this second part of this text, DearScholar's current features and technical details are provided. Subsequently, the following aspects are discussed:
* Current features;
* Framework;
* Configuration and options;
* Guide for potential contributors and academic researchers;
* File structure of the app;
* Structure of dearscholar.js, the heart of the app.

## Current features
### Let respondents install DearScholar on their mobile device
1) A respondent has to download DearScholar from the App Store (iPhones and iPads) or Google Play (Android devices);
2) When opening DearScholar for the first time, a respondent is asked to: * allow push notifications; * fill out the username and password that (s)he received from the researcher; * choose a 4-digit PIN if the device does not support Touch ID or Face Recognition; and * agree to the informed consent form.
3) When everthing goes well, DearScholar sets up on respondent' device, and the respondent is directed to the measurement schedule page.

### Let respondents answer questions
When logging in to DearScholar, a respondent is directed to the home page that displays the measurement schedule with all measurement occasions (dates). Future measurement occasions—measurement occasions beyond the current date—are locked and marked with a 'closed lock' icon. 

When a respondent clicks on a particular measurement occasion on the home screen, (s)he is directed to a survey screen that displays all questionnaire modules for that measurement date. Currently, DearScholar supports up to four questionnaire modules (three mandatory modules and one optional module) for each measurement occasion. Each module can be opened by clicking on the designated icon.

Currently, DearScholar supports an unlimited number of question pages in each module, a specification of which questions to appear on which page, simple branching and skipping logic, and different types of questions (binary questions, open questions, multiple-choice items, and rating sliders) to collect both quantitative and qualitative data. 

If a module is completed-i.e., for that module, all questions have been answered and the data has been uploaded to the server—the module icon turns green. If all mandatory modules have been completed, on the home screen, the link to the measurement occasion turns grey and is marked with a 'sun' icon.

DearScholar also includes links to additional, optional questionnaire modules which can be found in the home screen’s menu. Respondents can start these additional modules in between measurement occasions to report their thoughts once they occur (cf. event-sampling).

Respondents’ answers are not only send to a server, but also saved in the DearScholar. Respondents can access their previous answers by clicking on completed measurement modules, facilitating respondents to keep track of, and reread their own responses.

### Push notifications
Currently, DearScholar uses Google's Firebase to get the push notifications working. 

### Additional features
DearScholar has the capacity to send short in-app messages to specific respondents. For example, respondents can be sent thank-you messages to show engagement, small encouragements when respondents have missed a measurement occasions, ask follow up questions, or invited respondents to elaborate on particular answers over the phone or through email. These in-app messages are displayed on a separate message screen. An envelope icon appears in the app’s status bar when new messages have been sent. When respondents have read the message, the researcher is noted.

## Framework
DearScholar has been built using [Apache Cordova / Phonegap](https://phonegap.com/), and [Framework7 (v5.4.1)] (https://framework7.io) by Vladimir Kharlampidi and his team. Next to several general Cordova plugins, DearScholar uses [fingerprint-aio](https://github.com/NiklasMerz/cordova-plugin-fingerprint-aio) to enable Touch ID and Face Recognition, [sqlite-evcore-extbuild-free](https://www.npmjs.com/package/cordova-sqlite-evcore-extbuild-free) to use sqlite tables, and [cordova-plugin-ionic-webview](https://github.com/ionic-team/cordova-plugin-ionic-webview) to replace UIWebView with WKWebView. 

## Configuration
To configure Dearscholar, ten tables need to be set up in a secured database (such as mysql) on a secured server. The tables include variables (in the columns) and specific settings or respondents' data (in the rows). In this section, these ten tables are described. 

### 1) authentication table
A table with the following columns, settings are stored for a single respondent on each row:

| Column name | Content | Options |
|:---------|:---------|:---------|
|id | Unique row ID||
|uname | Respondent's username||
|pwd | Respondent's hashed/encrypted password||
|project | Project name||
|setup | Check if the respondent agreed to the informed consent form (see pageStructure below) *and* DearScholar is set up correctly on the respondent's device. |Should be set to 0; *if* everthing goes well changes to 1.|
|q0_startdate | Date of the first measurement occasion| yyyy-mm-dd|
|q0_occasions| Number of measurement occasions|a discrete number > 0|
|q0_intervaltype| Type of measurement inteval|Currently, only weeks are supported (*w*), contact the main author to discuss the implementation of other options.|
|q0_interval| Time interval between measurement occasions |a discrete number > 0|

*Note*. If you change settings during a project, adapt the routing structure, reformulate questions, etc., for each respondent, the 'setup column' in this table should be reset to 0 in order to let DearScholar update on each device, which will happen when respondents login to (open) DearScholar.

### 2) pinStructure table
An *empty* table with the following columns:
| Column name | Content | Options |
|:---------|:---------|:---------|
|id | Unique row ID||
|uname | Respondent's username||
|pin | Respondent's hashed/encrypted 4-digit PIN||
|code | NULL||

On devices that do not support Touch ID of Face Recognition, respondents are asked to choose a 4-digit PIN code on first login to DearScholar, which should be entered at each login attempt. What happens in case respondents forget their PIN code? The preferred route is that they contact the project leader to ask to reset their PIN code. To do so, you change the 'code column' for that respondent to REVOKE. When the respondent tries to log in after you revoked the PIN code, (s)he is asked to choose a new 4-digit PIN code.

### 3) surveyStructure table
A table with the following columns and only a single row:
| Column name | Content | Options |
|:---------|:---------|:---------|
|consent | Content for the informed consent form||
|manual | Content for the manual included in the app ||
|moduleAname | Name of the first survey module||
|moduleBname | Name of the second survey module||
|moduleCname | Name of the third survey module||
|moduleDname | Name of the fouth survey module||

*Note*. Html markup language can be used, for example, to include headings, paragraphs, and bold fonts (i.e., in the informed consent form or manual). 

### 4) pageStructure table
A table with the following columns, each row represents a separate survey page in one of the four modules (*A*, *B*, *C*, or *D*):

| Column name | Content | Options |
|:---------|:---------|:---------|
|id | Unique row ID||
|module1 | ID of the module in which the page should be displayed| Either *A*, *B*, *C*, or *D*|
|classp | Set the first page in the module | Use *'tab tab-active'* for the first survey page in a module, for the other survey pages in the module use *'tab'*|
|idp | Unique survey page ID|  |
|header | Survey page header| Header to be displayed on the page |
|backbuttontid | Back button id| If *questionID=Value* is chosen, the *Value* of the back button is registered on click (e.g., to be used in case of binary questions), *works only if* 'backbuttononclick' below is correctly formatted.|
|backbuttontext | Text to be displayed on the back button|  |
|backbuttononclick | To be used for event listeners| Normally left empty, but if *click* is chosen, the value of back button is registered on click, *works only if* backbuttontid above is correctly formatted.|
|backbuttonhref | Link of the backbutton| If the backbutton is clicked, navigate to another page, for navigation to other pages in the module, use the format #idp (see the column idp)|
|nextbuttonid | Next button id| See backbuttontid|
|nextbuttontext | Text to be displayed on the next button|See backbuttontext|
|nextbuttononclick | To be used for event listeners|See backbuttononclick, *moreover* if *uploadtoServerA*, *uploadtoServerB*, *uploadtoServerC* or *uploadtoServerD* is used, the data is send to the server, and--on succes--the module is closed and marked as completed, should only be used on the last page in the module obviously.
|nextbuttonhref | Link of the backbutton|See backbuttonhref|

### 5) questiontable table
A table with the following columns, each row represents a separate survey question:

| Column name | Content | Options |
|:---------|:---------|:---------|
|id | Unique row ID| |
|module2 | ID of the module in which the question should be included|either *A*,*B*,*C*, or *D*|
|tab | ID of the survey page on which the question should be displayed |See idp of the pageStructure table.|
|idq | Unique page ID|  |
|type | Question type| On of the following *YN* (binary [Yes/No] question), *OQ* (Open Question), *MC* (Multiple Choice Question, currently supports only 5-point scales), or *SL* (Slider Question, currently supports only range sliders on a scale from 0 to 100).|
|question | Question text|  |
|footer | Optional question footer text |  |

*Note*. Html markup language can be used, for example, to include headings, paragraphs, and bold fonts (i.e., in the question text). 

### 6) messages table
This is an optional table to be used for sending in-app messages. A table with the following columns, each row to be used to specify a message for a specific respondent:

| Column name | Content | Options |
|:---------|:---------|:---------|
|id | Unique row ID| |
|uname | Respondent' username|
|timestamp | Date and time the message is written. |yyyy-mm-dd hh-mm-ss|
|message | Message content|  |
|seen | Check if the respondent has seen, that is 'clicked' the message. |Should be set to 0; *if* everthing goes well changes to 1.|

*Note*. Html markup language can be used, for example, to include headings, paragraphs, and bold fonts (i.e., in the message content).

### 7-10) four response tables
Lastly, four empty response tables (responseTableModuleA, responseTableModuleB, responseTableModuleC, responseTableModuleD)  in which respondents' data is stored, one table for each module. Each of these four tables has the following columns, each row represents a seperate response entry:

| Column name | Content | Options |
|:---------|:---------|:---------|
|id | Unique row ID||
|uname | Respondent' username ||
|timestamp | Date and time on which the respondent uploaded the answers ||
|surveydate | Date and time of the measurement occasion ||
|... | One seperate column for each question in which the data is stored ||

*Note*. Why store both "timestamp" and "surveydate"? Respondents are asked to fill out a question module on a specific measurement occasion or survey date (date and time) as displayed in the measurement schedule. To check if respondents indeed completed the question module on the required survey date (or somewhat later), the timestamp is useful.

## Guide for potential contributors and academic researchers
Scholars who want to use DearScholar in their research project are advised to contact the main author directly (p.m.kruyen@fm.ru.nl). Contributors and academic researchers who want to build their own version of DearScholar can follow the following four steps.

### Step 1: Install DearScholar on you own computer
To get the developer version of DearScholar running on you computer, the following steps can be taken:
1) download the files and folders in this app folder as specified below (under file structure);
2) install either the desktop app or command line interface of [Phonegap](https://phonegap.com/getstarted/);
3) compile DearScholar on your computer using Phonegap ... the app appears in your web browser; and 
4) you can start improving DearScholar.

### Step 2: Experiment with DearScholar on you own computer
To log in, populate the survey modules with question pages and questions, and store answers on a server:
1) set up your own (virtual private) server or get access to an existing one on your university;
2) set up a database (such as mysql) with the tables, columns, rows and cell content as specified above (under Configuration)
3) write the required php scripts to let the app communicate with the database on your server.

Generic php scripts that can be used with DearScholar will be included in this repro in the future. If you want to help developing these scripts, that is very much appreciated.

### Step 3: Experiment with DearScholar on your mobile device
In order experiment with DearScholar on iOS and Android devices, the app should be build (compiled):
1) pay fees to get an Apple Developer Account as well as an Android Developer Account;
2) master Apple's and Google's guides and obtain the required certificates and keys;
3) compile DearScholar using [Phonegap's online tools](https://build.phonegap.com/) using these certificates and keys.

### Step 4: Deploy your clone or derivate version of DearScholar
Obviously, after Step 3, you may want to submit your  modifified version of DearScholar to the App Store or Google Play Store. However, while DearScholar clones might be allowed on Google Play, submisions of clones run the risk of being rejected on the App Store due to Apple's policies. More importantly, combining our strengths to develop DearScholar further will be more productive for the research community and more fun! Thank you! 😃.

## File structure of the app
Researchers and (potential) contributors who want to know what happens under DearScholar's hood, can also browse [the app's files](https://github.com/pmkruyen/dearscholar/tree/master/app) outlined below.

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

### What about the push-notification files?
Currently, DearScholar uses Google's Firebase to get the push notifications working. To get this running, the google-service.json and googleService-Info.plist file should be added to the main folder and, besides the push.js file should be configured (marked with *** in push.js). Because of security issues, these files and configurations are excluded from this public repro. Contact the main author if you want to contribute to enhance the push notification capabilities of DearScholar.

## Structure of dearscholar.js, the heart of the app

2)
**3) navigation functions**
* when the respondent navigates to the homescreen (measurement schedule), render the measurement schedule;
* when the respondent opens the app for the first time, inject informed consent form;
* when the respondent navigates to the manual page, inject the manual.
4) **module functions**
* when a respondents opens a module, render the page structure, questions (items), and inject the answers *if* the answers have been filled out previously from the data stored in the sqlite tables.
5) **save functions**
* when a question is completed and a button is pushed, save the answer in DearScholar;
* when a module is completed for a particular surveydate, mark de module as completed; and
* when a module is completed for a particular surveydate, send the data to the server.
6) **message functions**
* when the respondent navigates to the homescreen (measurement schedule), check for new messages;
* when the respondent navigates to the messages page, populate the messages page; and 
* when a new message has been read by the respondent (i.e. is 'clicked' on), let the server know when a message has been seen by the respondent.

