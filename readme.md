[![status](https://joss.theoj.org/papers/1896b88f26b987b9c7a07035751afd7b/status.svg)](https://joss.theoj.org/papers/1896b88f26b987b9c7a07035751afd7b)

[![DOI](https://zenodo.org/badge/263641327.svg)](https://zenodo.org/badge/latestdoi/263641327)

[![Build Status](https://travis-ci.com/pmkruyen/dearscholar.svg?branch=master)](https://travis-ci.com/pmkruyen/dearscholar)

# Overview
Because collecting longitudinal data becomes more important in academic research nowadays and because limitations with available tools, DearScholar has been developed.

DearScholar allows researchers to easily and orderly collect rich and diverse qualitative and quantitative data over short and long periods of time to answer research questions about inter- and intra-individual changes, developments, and processes.

Developed as hybrid app in Cordova (using html, javascript, and css), DearScholar can be used to collect data on iOS devices (iPhones and iPads), Android devices, and--in the future--in web browsers too.

This page provides general information about the app, including an overview of current features. Background information, a summary of the current features, and current research projects can be found on the [project page](https://peterkruyen.net/dearscholar.html). 

The [Wiki section](https://github.com/pmkruyen/dearscholar/wiki) provides installation instructions, an overview of the settings and options, (automatic) testing options, and other details.

## Interested in using DearScholar in your academic research project? 
* In the latest version of <a href="https://github.com/pmkruyen/dearscholar/blob/master/Installation/dearscholar.php">dearscholar.php</a> (1.3) DearScholar was updated so that the app can redirect users to get and store questions from your own research server (based on a contribution by Michael Polman and Daniel Polman). Users are redirected on basis of the first five (fixed) characters of usernames (for now see the comments in the code of <a href="https://github.com/pmkruyen/dearscholar/blob/master/Installation/dear_config.php">dear_config.php</a> and the latest version of dearscholar.php to learn more about how this works). You can set up the necessary MySQL (or MariaDB) databases on your own server following the instructions in the <a href="https://github.com/pmkruyen/dearscholar/wiki/Install-Database">Wiki</a>, and contact the main author (peter.kruyen@ru.nl) to register your project to the app.
* Also contact the main author for credentials (username and password); download the app on the App Store or Google Play; take your time to test the app; send us feedback, and discuss with us how to implement DearScholar in your project. :rocket:

* For iOS devices (iPhones and iPads), download the app on [the App Store](https://apps.apple.com/us/app/dearscholar/id1577072187);
* For Android devices, download the app on [Google Play](https://play.google.com/store/apps/details?id=net.peterkruyen.dearscholar).
* Or scan this QR code to install DearScholar directly on your device: 

<a href='https://me-qr.com' border='0' style='cursor:pointer;display:block'><img src='https://cdn.me-qr.com/qr/60839292.png?v=1684584528' alt='QR code App Store and Google Play' width="200">
## Current research projects
DearScholar is used in the following projects:
* Diary study on public servants' creativity (2020 - 2021) by Glenn Houtgraaf MSc, dr. Peter M. Kruyen, and prof. dr. Sandra van Thiel.
* Diary study on creativity in local-care teams (2021 - 2022) by Liesbeth Faas MSc, dr. Peter M. Kruyen, and prof. dr. Sandra van Thiel.
* Diary study on nurses' work engagement (2022) by Renée Vermeulen MSc and Evelien van Leeuwen MSc.
* Diary study on the effects of political motivation and social context on consumption choices (2022) by dr. Daniel Polman, dr. Joana Wensing, and dr. Jose Lopez Rivas.

## Publications
* Houtgraaf, G. (in press). Public sector creativity: Triggers, practices and ideas for public sector innovations. _Public Management Review_, 
https://www.tandfonline.com/doi/full/10.1080/14719037.2022.2037015
* Houtgraaf, G., Kruyen, P.M., & Van Thiel. S. (in press). Public Servants’ Creativity: Salient Stimulators and Inhibitors A longitudinal qualitative digital diary study. _Public Management Review_, https://www.tandfonline.com/doi/full/10.1080/14719037.2022.2103175

## Interested in contributing to DearScholar?
Super cool. Head to the [Wiki section](https://github.com/pmkruyen/dearscholar/wiki) for the installation instructions, settings and options, (automatic) testing, and other details.  Clone the project, post issues, and commit updates :icecream:.

## Acknowledgement
DearScholar is developed within the context of the research program "The creative public servant: Observations, explanations and consequences" with project number 406.18.R8.028, financed by the Dutch Research Council (NWO). The author wants to express his gratitude to Prof. Dr. Sandra van Thiel for her encouragements; to Glenn Houtgraaf MSc, Liesbeth Faas MSc, the ICT Services (Radboud University, Nijmegen, the Netherlands), and both reviewers and the editor at the Journal of Open Source Software for their advice, testing, and feedback; and last, but not least, all (pilot) respondents for their effort and feedback during the developmental process.

## License
Copyright (c) 2022 P.M. Kruyen, Institute for Management Research, Radboud University, the Netherlands. This library is free software; you can redistribute it and/or modify it under the terms of the GNU Lesser General Public License (GPL3) as published by the Free Software Foundation. Radboud University, hereby disclaims all copyright interest in the program “DearScholar” (which offers an app to conduct longitudinal qualitative and quantitative diary, log 
and survey research) written by P.M. Kruyen. Commercial license available, please contact Radboud Innovation, Radboud University, the Netherlands. Radboud Innovation – Technology Transfer Office.

## Citation
Kruyen, P. M., (2020). DearScholar: A mobile application to conduct qualitative and quantitative diary research. _Journal of Open Source Software_, 5(55), 2506, https://doi.org/10.21105/joss.02506

# Current features
## Let respondents install DearScholar on their mobile device
1) A respondent has to download DearScholar from the App Store (iPhones and iPads) or Google Play (Android devices);
2) When opening DearScholar for the first time (left screenshot below), a respondent is asked to: 
    * allow push notifications; 
    * fill out the username and password that (s)he has received from the researcher; 
    * choose a 4-digit PIN if the device does not support Touch ID or Face Recognition; and 
    * agree to the informed consent form.
3) When everything goes well, DearScholar pulls the required survey tables and settings from the server, and the respondent is directed to the measurement schedule (homepage, right screenshot below).

<p align="center">
  <kbd><img src=https://github.com/pmkruyen/dearscholar/blob/master/screenshots/1.png width="350"/></kbd>
  <kbd><img src=https://github.com/pmkruyen/dearscholar/blob/master/screenshots/2.png width="350"/></kbd>
</p>

## Let respondents answer questions
When logging in to DearScholar, a respondent is directed to the measurement schedule (homepage) with all measurement occasions (dates). Future measurement occasions—measurement occasions beyond the current date—are locked and marked with a 'closed lock' icon. 

When a respondent clicks on a particular measurement occasion in the measurement schedule, (s)he is directed to a survey screen that displays all survey modules for that measurement date. Each module can be opened by clicking on the designated icon (see the screenshot below).

<p align="center">
  <kbd><img src=https://github.com/pmkruyen/dearscholar/blob/master/screenshots/3.png width="350"/></kbd>
</p>

DearScholar supports an unlimited number of survey modules, unlimited number of question pages in each module, a specification of which questions to appear on which page, simple branching and skipping logic, and different types of questions (binary questions, open questions, multiple-choice items, and rating sliders) to collect both quantitative and qualitative data (see the screenshots below for two examples). Researchers can make certain questions mandatory. Respondents can type their answers in the answer boxes... or--because DearScholar works with speech recognition--dictate their answers.

<p align="center">
  <kbd><img src=https://github.com/pmkruyen/dearscholar/blob/master/screenshots/4.png width="350"/></kbd>
  <kbd><img src=https://github.com/pmkruyen/dearscholar/blob/master/screenshots/5.png width="350"/></kbd>
</p>

When a respondent has completed a module (i.e., for that module, all questions have been answered and the data has been successfully uploaded to the server) the module icon turns green on the survey page. If all mandatory modules have been completed, the link to the measurement occasion turns grey and is marked with a 'sun' icon on the homepage.

DearScholar also includes links to additional, optional survey modules which can be found on the homepage's menu. Respondents can start these additional modules in between measurement occasions to report their thoughts once they occur (cf. event-sampling).

Respondents’ answers are not only stored on a server upon submission, but also saved in the DearScholar App. Respondents can access their previous answers by clicking on completed measurement modules, facilitating respondents to keep track of, and reread their own responses.

## Push notifications
DearScholar can be used with Google's Firebase to get the push notifications working *or* alternatively, a private push notification server can be used (using Node.JS for example). Contact the main author for advice on setting up such a server.

If you are interested in scheduling and randomizing user notifications, you may want to check out Daniel Polman's github page for <a href="https://github.com/DanielPolman/twilio-sms-schedule-php">setting up SMS notification schedule</a>.

## Additional features
DearScholar has the capacity to send short in-app messages to specific respondents. For example, respondents can be sent thank-you messages to show engagement, small encouragements when respondents have missed a measurement occasions, ask follow-up questions, or invited respondents to elaborate on particular answers over the phone or through email. These in-app messages are displayed on a separate message screen. An envelope icon appears in the app’s status bar when new messages have been sent. When respondents have read the message, the researcher is noted.
