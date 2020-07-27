var app = new Framework7({
// App root element
root: '#app',
// App Name
name: 'app',
// App id
id: 'net.peterkruyen.diary',
// Enable swipe panel
//panel: {
//swipe: 'left',
//},
// Add default routes
dialog: {
    title: 'DearScholar',
  },
navbar: {
    mdCenterTitle: true
  },
routes: [
    {
        path: '/',
        url: './index.html', 
            on:{ 
        pageBeforeIn: function(){
            app.navbar.hide('.navbar');
        },
        pageInit: function(){
            
            $$('#showPasswordIcon').html('')
            $$("#password").removeClass('passwordisempty');
            document.getElementById('password').type = 'password';
            
            $$('#password').on('keyup', function (e) {
                if(password.value.length==0)
                {
                    $$("#password").addClass('passwordisempty');
                    $$('#showPasswordIcon').html('eye')
                }
            })
            
            $$('#showPasswordButton').on('click', function (e) {
                var el = document.getElementsByClassName("passwordisempty");
                
                if (el.length==1){
                    if(document.getElementById('password').type == 'password') {
                        document.getElementById('password').type = 'text';
                        $$('#showPasswordIcon').html('eye_slash')
                    }      
                    else {
                        document.getElementById('password').type = 'password';
                        $$('#showPasswordIcon').html('eye')
                    }
                }
            })
                    
            Fingerprint.isAvailable(isAvailableSuccess, isAvailableError);

            function isAvailableSuccess(result) {
                document.getElementById("loginButton").innerHTML = "Log in met Touch ID of gezichtsherkenning";
                
                $$('#loginButton').on('click', function (e) {
                    loginTOUCH()          
                })
                
                }

            function isAvailableError(error) {
                document.getElementById("loginButton").innerHTML = "Log in met PIN";
                
                $$('#loginButton').on('click', function (e) {
                    loginPIN()
                })                
            }
        },
        pageAfterOut: function(){
            $$('#showPasswordIcon').html('')
            $$("#password").removeClass('passwordisempty');
            document.getElementById('password').type = 'password';
        }
        },
        },
        {
        name: 'schedule',
        path: '/schedule/',
        url: './schedule.html',
              on: {
        pageAfterIn: function (e, page) {
        },
        pageInit: function (e, page) {
            checkNewMessages();
            measurementDates();
            //Add event handler to the 'startSurveyButton' buttons to open the survey page.
                $$('.startSurveyButton').on('click', function (e) {
                     openSurveyPage("NO")
                });
            //Add event handler to the 'startSurveyButtonNo' buttons to show a warning
                $$('.startSurveyButtonNo').on('click', function (e) {
                    app.dialog.alert("Dit meetmoment ligt in de toekomst. Daarom kunt u deze vragenlijst niet invullen.","DearScholar");
                });
        },
        }
    },
    {
        name: 'survey',
        path: '/survey/',
        url: './survey.html',
            on: {
        pageAfterIn: function (e, page) {
                //Add event handler to the 'module' buttons to open the module page.
                $$('.module').on('click', function (event) {              routerModule(module=$$(this).attr("id"),adhoc='NO')
                });
        },
        pageInit: function (e, page) {
                // render the page with module icons
                renderSurveypage("S");
        },       
        }
    },
    {
        name: 'module',
        path: '/module/',
        url: './module.html',
            on: {
        pageInit: function (e, page) {
              emptytitle.innerHTML += title;
        },
        pageBeforeIn: function (e, page) {
            startModule(module, adhoc)
        },
        pageAfterIn: function (e, page) {
            //Add event handler to survey buttons.
                $$('.saveAnswers').on('click', function (e) {
                    saveAnswers();
                });
                $$('.upload').on('click', function (e) {
                    uploadToServer(module)
                });
                $$('.click').on('click', function (e) {
                    yesNoIDValue = $(this).attr('id').split('=');
                    
                    $("#"+yesNoIDValue[0]).val(yesNoIDValue[1]);
                    
                    DiaryDatabase.transaction(function (tx) {
                        tx.executeSql("UPDATE responseTable SET "+yesNoIDValue[0]+"=? WHERE surveydate=?", [yesNoIDValue[1],surveydate]);
                    });
                });
        },
        }
    },
    {
        name: 'surveyadhoc',
        path: '/surveyadhoc/',
        url: './surveyadhoc.html',
            on: {
        pageAfterIn: function (e, page) {
                //Add event handler to the 'module' buttons to open the module page.
                $$('.module').on('click', function (event) {              routerModule(module=$$(this).attr("id"),adhoc='YES')
                });
        },
        pageInit: function (e, page) {
                // render the page with module icons
                renderSurveypage("A");
        },
        }
    },
    {
        name: 'messages',
        path: '/messages/',
        url: './messages.html',
            on: {
        pageInit: function (e, page) {
             populateMessageboxrun(DiaryDatabase);
        },
        pageAfterIn: function (e, page) {
                $$('.unseen').on('click', function (e) {
                    $$(this).css('backgroundColor', 'darkgrey')
                    
                    var uname= window.localStorage.getItem('uname');
                    var pwd= window.localStorage.getItem('pwd');
                    var id = $$(this).attr("id");
                    
                    var dataString="uname="+uname+"&pwd="+pwd+"&id="+id+"&messagesCheck=true";
                    
                    $.ajax({
                        type:"POST",  
                        url:"https://peterkruyen.net/diary/dearscholar.php", data: dataString,
                        crossDomain: true,
                        cache: false, 
                        success:function(data){  
                        }
                    })
                });
        },
        }          
    },
    {
        name: 'manual',
        path: '/manual/',
        url: './manual.html',
            on: {
        pageBeforeIn: function (e, page) {
            startManual()
        }
        }
    },
    {
        name: 'settings',
        path: '/settings/',
        url: './settings.html',
        on: {
        pageAfterIn: function (e, page) {
        },
        pageInit: function (e, page) {
            // If settings are present, load these settings
            var q0_startdate = window.localStorage.getItem("q0_startdate");

            if (typeof q0_startdate !== 'undefined') {
                var q0_startdate = window.localStorage.getItem("q0_startdate");
                document.getElementById('q0_startdate').value = q0_startdate;
                var q0_occasions = window.localStorage.getItem("q0_occasions");
                document.getElementById('q0_occasions').value = q0_occasions;
                var q0_interval = window.localStorage.getItem("q0_interval");
                document.getElementById('q0_interval').value = q0_interval;
            }
            
           // This function is for future use.
           $$('.confirm-ok').on('click', function () {
            app.dialog.confirm("Als u op 'OK' klikt, reset u DearScholar. Doe dit alleen in overleg met de projectleider.", "DearScholar", 
                function () { 
                    setupDiary(DiaryDatabase);            
                },
                 function () { 
                     app.views.main.router.navigate('/schedule/');      
                }               
            );
         });
        },
      }
    },
    {
        name: 'about',
        path: '/about/',
        url: './about.html',
        on: {
        pageInit: function (e, page) {
                $$('#consentAboutButton').on('click', function (e) {
                    startConsentAbout()
                });
        }
        }
    },
],
// ... other parameters  
})
;
var $$ = Dom7;

var mainView = app.views.create('.view-main')

///////////////////////////////////////////////////////////////////////////////
// Style the login screen
document.addEventListener("deviceready", function(){
    
            if(device.platform == "iOS"||device.platform == "Android"|| device.platform == "android"){
    
            $$('#showPasswordIcon').html('')
            $$("#password").removeClass('passwordisempty');
            document.getElementById('password').type = 'password';
    
            // Enable the show password button when the password field is empty
            if ($('#password.input-with-value').length==0){
                $$("#password").addClass('passwordisempty');
                $$('#showPasswordIcon').html('eye')
            }
    
            $$('#password').on('keyup', function (e) {
                if(password.value.length==0)
                {
                    $$("#password").addClass('passwordisempty');
                    $$('#showPasswordIcon').html('eye')
                }
            })
    
            $$('#showPasswordButton').on('click', function (e) {
                var el = document.getElementsByClassName("passwordisempty");
                
                if (el.length==1){
                    if(document.getElementById('password').type == 'password') {
                        document.getElementById('password').type = 'text';
                        $$('#showPasswordIcon').html('eye_slash')
                    }      
                    else {
                        document.getElementById('password').type = 'password';
                        $$('#showPasswordIcon').html('eye')
                    }
                }
            })
    
            //Style the login page dependend on whether TouchID is (not) available    
            Fingerprint.isAvailable(isAvailableSuccess, isAvailableError);

            function isAvailableSuccess(result) {
                document.getElementById("loginButton").innerHTML = "Log in met Touch ID of gezichtsherkenning";
                //$("#fourthBlock" ).append("<id='TouchIDAvailableButUsePIN'><li><a href='#' class='item-link list-button' id='loginButton' >Log in met PIN</a></li>")
                
                //Add event handler to the login button
                $$('#loginButton').on('click', function (e) {
                    loginTOUCH()
                })
            }

            function isAvailableError(error) {
                document.getElementById("loginButton").innerHTML = "Log in met PIN"; 
                
                //Add event handler to the login button
                $$('#loginButton').on('click', function (e) {
                    loginPIN()
                })
            }
            
            }    
            
}, false);

///////////////////////////////////////////////////////////////////////////////
// Style the survey screen
// Hide buttons on keyboardshow.
window.addEventListener("keyboardWillShow", function(e) {
    //if(device.platform == "Android"|| device.platform == "android"){
        $(".bottomButtons").hide();
    //}
});

window.addEventListener("keyboardDidHide", function(e) {
    //if(device.platform == "Android"|| device.platform == "android"){
        $(".bottomButtons").show();
    //}
});

///////////////////////////////////////////////////////////////////////////////
///// Specific Android functions
//Attach functions to the bacbutton on Android devices.
document.addEventListener('backbutton', onBackKeyDown, false);

function onBackKeyDown() {
    if (($$('.panel-left').hasClass('panel-in')) || ($$('.panel-right').hasClass('panel-in'))) { // #leftpanel and #rightpanel are id of both panels.
        app.panel.close()
        return false;
    } else if ($$('.modal-in').length > 0) {
        app.popup.close()
        return false;
    } else if (app.views.main.router.url == '/schedule/') {
        app.dialog.confirm("Weet u zeker dat u DearScholar wilt afsluiten.","DearScholar", function() {
            navigator.app.exitApp();
        },
        function() {
        });
    } else if (app.views.main.router.url == '/') {
        app.dialog.confirm("Weet u zeker dat u DearScholar wilt afsluiten.","DearScholar", function() {
            navigator.app.exitApp();
        },
        function() {
        });
    }
    else {
        mainView.router.back();
    }
}

///////////////////////////////////////////////////////////////////////////////
// Login functions
// Timer functions to logout (return to index) after # time of inactivity.
var timeoutID;

function goInactive() {
     if(device.platform == "iOS"|| device.platform == "browser"){
        app.views.main.router.back('/',{force: true, ignoreCache: true, reload: true});
     };
     if(device.platform == "Android"|| device.platform == "android"){
       app.views.main.router.back('/',{ignoreCache: true, reload: true});
     };
     
     app.panel.close("left")
}

function startTimer() {
    // wait 5.5 minutes before calling goInactive
    timeoutID = window.setTimeout(goInactive, 330000);
}

$$(window).on('click keyup', function (e) {
    window.clearTimeout(timeoutID);
    startTimer();
});
    
//Add event handler to the username input field
$$('input[name = "username"]').on('keyup', function (event) {
    if (event.key === "Enter") {
        $$('input[name = "password"]').focus();
    }
});

//Login procedure if touchID is enabled
function loginTOUCH(){
   Fingerprint.show({
      description: "Plaats uw vinger op de thuisknop om de app te ontgrendelen"
    }, successCallback, errorCallback);
            function successCallback(){
                authentication()
    }
    function errorCallback(error){
        app.dialog.alert("U heeft TouchID geannuleerd. Probeer opnieuw of neem contact op met Peter Kruyen.","DearScholar");
    }
}

//Login procedure if no touchID is enabled, including run 'authentication()'
function loginPIN (){
    if(window.localStorage.getItem('pinset')=== null){
        app.popup.open(".choosepin")
        $$('input[name = "PIN1"]').focus();
    }
    
    if(window.localStorage.getItem('pinset')==="true"){
        app.dialog.prompt("Voer uw viercijferige PIN code in.", "DearScholar", function (pinEntered){
            checkPIN(pinEntered)
            app.dialog.close()
        })
        $$(".dialog").on('keyup', function (event) {
        if (event.key === "Enter") {
            checkPIN($$(".dialog-input").val())
            app.dialog.close()
            }
        });
    }  
}

//Add event handler to the first PIN input field
$$('input[name = "PIN1"]').on('keyup', function (event) {
    if (event.key === "Enter") {
        $$('input[name = "PIN2"]').focus();
    }
});

//Add event handler to the second PIN input field
$$('input[name = "PIN2"]').on('keyup', function (event) {
    if (event.key === "Enter") {
    if ($$('input[name = "PIN1"]').val()===$$('input[name = "PIN2"]').val()&&$$('input[name = "PIN1"]').val()!=""){
            storePIN($$('input[name = "PIN1"]').val())
    }
    if ($$('input[name = "PIN1"]').val()!==$$('input[name = "PIN2"]').val()||$$('input[name = "PIN1"]').val()===""){
        app.dialog.alert("De twee PIN codes zijn niet gelijk, probeer opnieuw.","DearScholar",function() {
        document.getElementById("PIN1").value = "";
        document.getElementById("PIN2").value = "";
        document.getElementById("PIN1").placeholder = "####";
        document.getElementById("PIN2").placeholder = "####";
        $$('input[name = "PIN1"]').focus();
    }); 
    }}
});


//Add event handler to the confirmPIN button
$$('#confirmPIN').on('click', function (e) {
    if ($$('input[name = "PIN1"]').val()===$$('input[name = "PIN2"]').val()&&$$('input[name = "PIN1"]').val()!=""){
            storePIN($$('input[name = "PIN1"]').val())
    }
    if ($$('input[name = "PIN1"]').val()!==$$('input[name = "PIN2"]').val()||$$('input[name = "PIN1"]').val()===""){
        app.dialog.alert("De twee PIN codes zijn niet gelijk, probeer opnieuw.","DearScholar", function() {
        document.getElementById("PIN1").value = "";
        document.getElementById("PIN2").value = "";
        document.getElementById("PIN1").placeholder = "####";
        document.getElementById("PIN2").placeholder = "####";
        $$('input[name = "PIN1"]').focus();
    });
}})

//Store the PIN value to the server
function storePIN(PIN){
    var uname = document.getElementById("username").value;
    var pwd = document.getElementById("password").value;

    
    var dataString="uname="+uname+"&pwd="+pwd+"&PIN="+PIN+"&insertPIN=yes";
    
        $.ajax({
                 type:"POST",  
                 url:"https://peterkruyen.net/diary/dearscholar.php", data: dataString,
                 crossDomain: true,
                 cache: false, 
                 success:function(data)  
                 {  
                
                 if(data=="success") {
                     window.localStorage.setItem('pinset', "true");
                     authentication()
                     app.popup.close(".choosepin")

                 }
                 
                 if(data!="success") {
                     app.dialog.alert("Er is iets mis gegaan met het opslaan van uw PIN code. Controleer uw gebruikersnaam en wachtwoord en probeer vervolgens opnieuw of neem contact op met Peter Kruyen.","DearScholar")
                     app.popup.close(".choosepin")
                 }

            }  
            });     

}

//Check the PIN value on the server
function checkPIN(PIN){
    var uname = document.getElementById("username").value;
    var pwd = document.getElementById("password").value;

    
    var dataString="uname="+uname+"&pwd="+pwd+"&PIN="+PIN+"&checkPIN=yes";
    
        $.ajax({
                 type:"POST",  
                 url:"https://peterkruyen.net/diary/dearscholar.php", data: dataString,
                 crossDomain: true,
                 cache: false, 
                 success:function(data)  
                 {  
                
                 if(data=="revoke") {
                     app.popup.open(".choosepin")
                 } 
                     
                 if(data=="success") {
                     authentication()
                 }
                 
                 if(data=="error") {
                     app.dialog.alert("Uw PIN code is onjuist. Probeer opnieuw of neem contact op met Peter Kruyen.","DearScholar")
                 }

            }  
            });     

}

// On login, check the login details of the respondent, and (re)register the device to receive push notifications
function authentication(){
   
    var uname = $$('.page input[name = "username"]').val();
    window.localStorage.setItem('uname', uname);
    var pwd = $$('.page input[name = "password"]').val();
    window.localStorage.setItem('pwd', pwd);

    var dataString="uname="+uname+"&pwd="+pwd+"&authentication=yes";
            
                $.ajax({
                 type:"POST",  
                 url:"https://peterkruyen.net/diary/dearscholar.php", data: dataString,
                 crossDomain: true,
                 cache: false, 
                 success:function(data)  
                 {  
                
                 if(data!="error") {
                         settings = JSON.parse(data);
                            
                            window.localStorage.setItem('project', settings[0].data.project);
                            window.localStorage.setItem('q0_startdate', settings[0].data.q0_startdate);
                            window.localStorage.setItem('q0_occasions', settings[0].data.q0_occasions);
                            window.localStorage.setItem('q0_intervaltype', settings[0].data.q0_intervaltype);
                            window.localStorage.setItem('q0_interval', settings[0].data.q0_interval);
                     
                            // (re)register the device to receive push notifications
                            var devicetoken=localStorage.getItem('registrationId');
 
                            var dataString="uname="+uname+"&pwd="+pwd+"&devicetoken="+devicetoken+"&updateregistration=yes";
            
                                $.ajax({
                                    type:"POST",  
                                    url:"https://peterkruyen.net/diary/dearscholar.php", data: dataString,
                                    crossDomain: true,
                                    cache: false, 
                                    success:function(data)  
                                    {  
                                    }  
                                });   
                     
                         if(settings[0].data.setup==0){
                            setupDiary(DiaryDatabase)
                         }
                     
                         if(settings[0].data.setup==1){
                            app.views.main.router.navigate('/schedule/');
                         }
                     
                 }
                 
                 if(data=="error") {app.dialog.alert("Uw inloggegevens zijn onjuist. Probeer opnieuw of neem contact op met Peter Kruyen.","DearScholar")}

            }  
            });     
   
}

//Add event handler to the reject consent link
$$('#rejectConsent').on('click', function (e) {
    app.popup.close(".consent")
})

//Add event handler to the accept consent link
$$('#acceptConsent').on('click', function (e) {
        app.preloader.show();
        
         var uname= window.localStorage.getItem('uname');
         var pwd= window.localStorage.getItem('pwd');
         var project = window.localStorage.getItem('project');
    
        var dataString="uname="+uname+"&pwd="+pwd+"&project="+project+"&injectedStructure=true";
                 
        $.ajax({
            type:"POST",  
            url:"https://peterkruyen.net/diary/dearscholar.php", data: dataString,
            crossDomain: true,
            cache: false, 
            success:function(data){  
                app.popup.close(".consent")
                app.views.main.router.navigate('/schedule/');
                app.preloader.hide();  
            }
        })   
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Database functions needed to setup the diary database and all tables
    // Wait for Phonegap to load
    var DiaryDatabase = null;

    document.addEventListener("deviceready", onDeviceReady, false);

    // Phonegap is ready
    function onDeviceReady() {
        if (window.cordova.platformId === 'browser') DiaryDatabase=openDatabase('DiaryTables','1.0','Database containing all diary data', 2 * 1024 * 1024);
        else DiaryDatabase = window.sqlitePlugin.openDatabase({name: 'DiaryDatabase.db', location: 'default',
        androidDatabaseProvider: 'system'}); 
    }

    // Setup the diary tables
    function setupDiary(DiaryDatabase){
        
         app.preloader.show();

         var uname= window.localStorage.getItem('uname');
         var pwd= window.localStorage.getItem('pwd');
         var project = window.localStorage.getItem('project');
    
         var dataString="uname="+uname+"&pwd="+pwd+"&project="+project+"&findvalues=true";
                 $.ajax({
                 type:"POST",  
                 url:"https://peterkruyen.net/diary/dearscholar.php", data: dataString,
                 crossDomain: true,
                 cache: false, 
                 success:function(data)  
                 {  
                    surveyStructure = JSON.parse(data).data0;
                    pageStructure = JSON.parse(data).data1;
                    questionTable = JSON.parse(data).data2;
                    moduleStructure = JSON.parse(data).data3;
                                          
                    DiaryDatabase.transaction(function (tx){
                        tx.executeSql('DROP TABLE IF EXISTS surveyStructure');
                        tx.executeSql('DROP TABLE IF EXISTS pageStructure');
                        tx.executeSql('DROP TABLE IF EXISTS questiontable');
                        tx.executeSql('DROP TABLE IF EXISTS moduleStructure');
                        
                        tx.executeSql('CREATE TABLE IF NOT EXISTS surveyInformation (surveydate)');
                        tx.executeSql('CREATE TABLE IF NOT EXISTS surveyStructure (consent, manual)');
                        tx.executeSql('CREATE TABLE IF NOT EXISTS moduleStructure (module0, name, page, mandatory, image, imageleft, imagetop)');
                        tx.executeSql('CREATE TABLE IF NOT EXISTS pageStructure (module1, classp, idp, header, backbuttontid, backbuttontext, backbuttononclick, backbuttonhref, nextbuttonid, nextbuttontext, nextbuttononclick,nextbuttonhref)');
                        tx.executeSql('CREATE TABLE IF NOT EXISTS questiontable (module2, tab, idq, type, question, categories, footer)');
                        tx.executeSql('CREATE TABLE IF NOT EXISTS responseTable (id, surveydate, timestamp)');
                        
                        DiaryDatabase.transaction(function(tx) {
                            var query = "INSERT INTO surveyStructure (consent, manual) VALUES (?, ?)";
                            tx.executeSql(query,[surveyStructure[0].data.consent,surveyStructure[0].data.manual])
                        }) 

                        listModuleIds =[]
                        for (var i = 0, len = moduleStructure.length; i < len; i++) {
                            addItemmoduleStructure(DiaryDatabase, 
                                                 moduleStructure[i].data.module0,
                                                 moduleStructure[i].data.name,
                                                 moduleStructure[i].data.page,
                                                 moduleStructure[i].data.mandatory,
                                                 
                                                moduleStructure[i].data.image,
                                                moduleStructure[i].data.imageleft,
                                                 moduleStructure[i].data.imagetop);
                            
                        listModuleIds.push(moduleStructure[i].data.module0);    
                        }  
                        
                        for (var i = 0, len = pageStructure.length; i < len; i++) {
                            addItemPageStructure(DiaryDatabase, 
                                                 pageStructure[i].data.module1,
                                                 pageStructure[i].data.classp,
                                                 pageStructure[i].data.idp,
                                                 pageStructure[i].data.header,
                                                 pageStructure[i].data.backbuttontid,
                                                 pageStructure[i].data.backbuttontext,
                                                 pageStructure[i].data.backbuttononclick,
                                                 pageStructure[i].data.backbuttonhref,
                                                 pageStructure[i].data.nextbuttonid,
                                                 pageStructure[i].data.nextbuttontext,
                                                 pageStructure[i].data.nextbuttononclick,
                                                 pageStructure[i].data.nextbuttonhref);
                        }
                    
                        listQuestionIds =[]
                        for (var i = 0, len = questionTable.length; i < len; i++) {
                            addItemQuestiontable(DiaryDatabase, 
                                                 questionTable[i].data.module2, 
                                                 questionTable[i].data.tab, 
                                                 questionTable[i].data.idq, 
                                                 questionTable[i].data.type, 
                                                 questionTable[i].data.question,
                                                 questionTable[i].data.categories,
                                                 questionTable[i].data.footer
                                                 );
                            listQuestionIds.push(questionTable[i].data.idq);
                        }
                    }, function(error) {
                        // show (no) error message
                    }, function() {
                        // function to insert new modules in the surveyInformation table
                        DiaryDatabase.transaction(function (tx) 
                        {
                        var query = "SELECT * FROM surveyInformation;"
            
                        tx.executeSql(query, [], function (tx, resultSet) {
                            if (resultSet.rows.length==0)
                            {
                                mlabels = "empty"   
                            };
                            if (resultSet.rows.length>0)
                            {
                                firstRow = resultSet.rows.item(0);
                                mlabels = Object.getOwnPropertyNames(firstRow);
                            }
                        }
                        ) 
                        }, 
                        function (error) {
                            // show (no) error message
                        },
                        function () {
                            
                        DiaryDatabase.transaction(function(tx) {
                             for (var i = 0; i < listModuleIds.length; i++) {
                                if(mlabels.includes(listModuleIds[i])==false){
                                    query = "ALTER TABLE surveyInformation ADD COLUMN "+listModuleIds[i]+" TEXT";
                                    tx.executeSql(query);
                                }
                                }
                        })} ) 
        
                        // function to insert new questions in the responseTable
                        DiaryDatabase.transaction(function (tx) 
                        {
                        var query = "SELECT * FROM responseTable;"
            
                        tx.executeSql(query, [], function (tx, resultSet) {
                            if (resultSet.rows.length==0)
                            {
                                qlabels = "empty"   
                            };
                            if (resultSet.rows.length>0)
                            {
                                firstRow = resultSet.rows.item(0);
                                qlabels = Object.getOwnPropertyNames(firstRow);
                            }
                        }
                        ) 
                        }, 
                        function (error) {
                            // show (no) error message
                        },
                        function () {
                            
                        DiaryDatabase.transaction(function(tx) {
                             for (var i = 0; i < listQuestionIds.length; i++) {
                                if(qlabels.includes(listQuestionIds[i])==false){
                                    query = "ALTER TABLE responseTable ADD COLUMN "+listQuestionIds[i]+" TEXT";
                                    tx.executeSql(query);
                                }
                                }
                        })   
                            app.preloader.hide();  
                            startConsent()    
                        })
                    }
                    ); 
                 }
              })    
    }

    // function to populate the moduleStructure database
    function addItemmoduleStructure(DiaryDatabase, module0, name, page, mandatory,image, imageleft, imagetop) {

        DiaryDatabase.transaction(function (tx) {

        var query = "INSERT INTO moduleStructure (module0, name, page, mandatory, image, imageleft, imagetop) VALUES (?,?,?,?,?,?,?)";

        tx.executeSql(query, [module0, name, page, mandatory, image, imageleft, imagetop], function(tx) {
        });
    });
    }

    // function to populate the pageStructure database
    function addItemPageStructure(DiaryDatabase, module1, classp, idp, header, backbuttontid, backbuttontext, backbuttononclick , backbuttonhref, nextbuttonid, nextbuttontext, nextbuttononclick,nextbuttonhref) {

        DiaryDatabase.transaction(function (tx) {

        var query = "INSERT INTO pageStructure (module1, classp, idp, header, backbuttontid, backbuttontext, backbuttononclick , backbuttonhref, nextbuttonid, nextbuttontext, nextbuttononclick,nextbuttonhref) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";

        tx.executeSql(query, [module1, classp, idp, header, backbuttontid, backbuttontext, backbuttononclick , backbuttonhref, nextbuttonid, nextbuttontext, nextbuttononclick,nextbuttonhref], function(tx) {
        });
    });
    }

    // function to populate the questiontable database
    function addItemQuestiontable(DiaryDatabase, module2, tab, idq, type, question, categories, footer) {

        DiaryDatabase.transaction(function (tx) {

        var query = "INSERT INTO questiontable (module2, tab, idq, type, question, categories, footer) VALUES (?,?,?,?,?,?,?)";

        tx.executeSql(query, [module2, tab, idq, type, question, categories, footer], function(tx) {
        });
    });
    }

// function to create the survey schedule
function measurementDates (startdate=window.localStorage.getItem("q0_startdate"), occassions = window.localStorage.getItem('q0_occasions'),intervaltype = window.localStorage.getItem("q0_intervaltype"), interval = window.localStorage.getItem("q0_interval")){
     
    var currentmoment =moment();
            
    for (i = 0; i < Number(occassions)*Number(interval); i = i + Number(interval)) {
        
        if (intervaltype=='d'){
            var measurementOccassion = moment(startdate).add(i, 'days');
        }
        
        if (intervaltype=='w'){
            var measurementOccassion = moment(startdate).add(i, 'weeks');
        }
           
        month = measurementOccassion.format('MMM');
        day = measurementOccassion.format('DD');
        year = measurementOccassion.format('YYYY');
        
        var child = document.createElement('div');
        
        var difMeasCur = measurementOccassion.diff(currentmoment, 'weeks');
        var surveydatetoday = day + month + year;

        if (difMeasCur<=0){
            child.innerHTML =
                '<div class="timeline-item" >' +
                    '<i class="f7-icons pictogram '+surveydatetoday+'">lock_open</i>'+
                    '<div class="timeline-item-date">' + day + ' ' + '<small>' + month + '</small></div>' +
                    '<div class="timeline-item-divider"></div>' +
                    '<div class="timeline-item-content">' +
                        '<a href="#" class="button button-big button-fill startSurveyButton" style="width: 200px;" id=' + day + month + year
                    +'>Start vragenlijst</a>' +
                '</div>'
        }
        
        if (difMeasCur>0){
            child.innerHTML =
                '<div class="timeline-item" >' +
                    '<i class="f7-icons pictogram">lock</i>'+
                    '<div class="timeline-item-date">' + day + ' ' + '<small>' + month + '</small></div>' +
                    '<div class="timeline-item-divider"></div>' +
                    '<div class="timeline-item-content">' +
                        '<a href="#" class="button button-big button-fill startSurveyButtonNo" style="width: 200px;" id=' + day + month + year
                    +'>Start vragenlijst</a>' +
                '</div>'
        }

        child = child.firstChild;
        document.getElementById('measurementSchedule').appendChild(child)
        
    }
    // change the text and icon if all mandatory modules are completed for a particular moment.
    checkAllModulesCompleted()
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Database functions for the survey

function checkAllModulesCompleted(){
DiaryDatabase.transaction(function (tx) {
                mandatory = []
            
                var query = "SELECT * FROM moduleStructure WHERE mandatory = ?"
            
                tx.executeSql(query, ["1"], function (tx, resultSet) {

                    for(var x = 0; x < resultSet.rows.length; x++) {
                        mandatory.push(resultSet.rows.item(x).module0)
                    }
                }   
                )},          
                function (error) {
                                 },
                function () {
                checkAllModulesCompleted2(mandatory)
                }
                );
} 

function checkAllModulesCompleted2(mandatory){
DiaryDatabase.transaction(function (tx) {
                completed = []
            
                var temp = [];
                for (var i = 0; i <= mandatory.length-1; i++) {
                    temp.push(mandatory[i]+"=? AND");
                }
                temp = temp.toString()
                temp = temp.replace(",",' ');
                temp = temp.slice(0, -4); 

                var query = "SELECT * FROM surveyInformation WHERE "+ temp

                var values = [];
                for (var i = 1; i <= mandatory.length; i++) {
                    values.push("Y");
                }
            
                tx.executeSql(query, values, function (tx, resultSet) {

                for(var x = 0; x < resultSet.rows.length; x++) {

                surveydatetoday = resultSet.rows.item(x).surveydate
                    $("."+surveydatetoday).html('sun_max')
                    $("#"+surveydatetoday).addClass("measurementcomplete");
                    $("#"+surveydatetoday).html('Bekijk antwoorden ');
               }
               });    
            }
        );
}

// function to go to the survey page, set the survey date

function openSurveyPage(adhoc)
{
  if (adhoc=="NO"){
    app.views.main.router.navigate('/survey/');

    surveydate = event.srcElement.id;

    $(document).on('page:init', function (e) {
        
        day = surveydate.slice(0,2);
        month = surveydate.slice(2,5);
        year = surveydate.slice(5,9);
        
        document.getElementById("date").innerHTML = day + ' ' + month + ' ' + year;
        
    })
  }
}

// functions to render the survey page (module pictograms, checked if completed).

function arraySearch(arr,val) {
    for (var i=0; i<arr.length; i++)
        if (arr[i] === val)                    
            return i;
    return false;
  }

function renderSurveypage(page) {
    if (page=='A'){
        surveydate = "99ADH9999";
    }
    
    moduleNames = []
    moduleCompleted = []
    
    DiaryDatabase.transaction(function (tx) {
                
    var query = "SELECT * FROM surveyInformation WHERE surveydate = ?"
            
    tx.executeSql(query, [surveydate], function (tx, resultSet2) {  
                       surveydateExists = resultSet2.rows.length;
                 })
        },
        function (error) {
                         },
        function () {
                    if(surveydateExists<1){
                        DiaryDatabase.transaction(function (tx) {

                        var query = "INSERT INTO surveyInformation (surveydate) VALUES (?)";

                        tx.executeSql(query, [surveydate], function(tx) {
                                                            });
                    });   
                    }
                    if(surveydateExists>0){
                        
                        DiaryDatabase.transaction(function (tx) 
                        {
                        var query = "SELECT * FROM surveyInformation;"
            
                        tx.executeSql(query, [], function (tx, resultSet) {
                        
                                firstRow = resultSet.rows.item(0);
                                mlabels = Object.getOwnPropertyNames(firstRow);
                            
                        }
                        ) 
                        })
                        
                        DiaryDatabase.transaction(function (tx) {  
                        for (var i = 1, len = mlabels.length; i < len; i++) {

                            var query = "SELECT "+mlabels[i]+" FROM surveyInformation WHERE surveydate = ?"
                            tx.executeSql(query, [surveydate], function (tx, resultSet3) {
                           
                                var answer = JSON.stringify((resultSet3.rows.item(0)));
                                answer = answer.split(":");
                                question = answer[0].replace('{"','');
                                question =question.replace('"','')
                                moduleNames.push(question)
                                answer = answer[1].replace('"}','');
                                answer = answer.replace('"','');
                                moduleCompleted.push(answer)
                                                               
                            })    

                        }

                        })
                    }
                    renderSurveypage2(page, moduleNames, moduleCompleted)
                    }
        );  
}
    

function renderSurveypage2(page,moduleNames,moduleCompleted) {            DiaryDatabase.transaction(function (tx) {
            
                var query = "SELECT * FROM moduleStructure WHERE page = ?"
            
                tx.executeSql(query, [page], function (tx, resultSet) {

                for(var x = 0; x < resultSet.rows.length; x++) {

                var data = {
                    module: resultSet.rows.item(x).module0,
                    name: resultSet.rows.item(x).name,
                    image: resultSet.rows.item(x).image,
                    imageleft: resultSet.rows.item(x).imageleft,
                    imagetop: resultSet.rows.item(x).imagetop
                }  
                
                if(moduleCompleted[arraySearch(moduleNames,data.module)]=="Y")
                    {data.image="c-"+data.image
                    }
            
               var emptypage = document.getElementById("emptypage")
               emptypage.innerHTML += renderModulePictograms(data);
               }
               },
                function (error) {
                                 },
                function () {
          
                   
                }
                );    
        }
    );
 }
                                      
function renderModulePictograms(data){
    return `
     <div class="module" id=${data.module} 
        style="position:absolute; 
            left:${data.imageleft};
            top:${data.imagetop};
            transform:translate(-50%,-50%)">
        <a><img src="img/${data.image}" title="" alt=""></a
     </div>`
}
                            
// function to route to module, but first fetch the module name.
function routerModule(module, adhoc){
    
    DiaryDatabase.transaction(function (tx) {
                var query = "SELECT name FROM moduleStructure WHERE module0 = ?"
                tx.executeSql(query,[module],function (tx, resultSet) {
                        title = resultSet.rows.item(0).name
                })
            },   
            function (error) {
                app.dialog.alert("Er is iets mis gegaan. Probeer opnieuw of neem contact op met Peter Kruyen.","DearScholar")
            },
            function () {
                app.views.main.router.navigate('/module/', {});
            })
}

// function to render module content and set the link to the back button.

function startModule(module, adhoc) {          
            
            if (adhoc=='YES'){
                $('.link').attr('href','/surveyadhoc/')
            }
                                               
            DiaryDatabase.transaction(function (tx) {
            
                var query = "SELECT * FROM pageStructure WHERE module1 = ?"
            
                tx.executeSql(query, [module], function (tx, resultSet) {

                for(var x = 0; x < resultSet.rows.length; x++) {

                var data = {
                    id: resultSet.rows.item(x).idp,
                    classp: resultSet.rows.item(x).classp,
                    header: resultSet.rows.item(x).header,
                    backbuttontid: resultSet.rows.item(x).backbuttontid,
                    backbuttontext: resultSet.rows.item(x).backbuttontext,
                    backbuttononclick: resultSet.rows.item(x).backbuttononclick,
                    backbuttonhref: resultSet.rows.item(x).backbuttonhref,
                    nextbuttonid: resultSet.rows.item(x).nextbuttonid,
                    nextbuttontext: resultSet.rows.item(x).nextbuttontext,
                    nextbuttononclick:resultSet.rows.item(x).nextbuttononclick,
                    nextbuttonhref:resultSet.rows.item(x).nextbuttonhref
                }           
                            
               var emptypage = document.getElementById("emptypagemodule")
               emptypage.innerHTML += pages(data);
               }
               },
                function (tx, error) {
                    
                });
                }, function (error) {
                    
                }, function () {
                    startQuestions(module);
                });
            
        }
                        

// layout function for the tabs; for Android bottom: 10%, for iOS, bottom: 5%
 function pages(data) {
    if (device.platform=="iOS"|| device.platform == "browser"){
    return `
        <div id="${data.id}" class=${data.classp}>
            <div class="block-header">${data.header}</div>
              <div class="block bottomButtons"; style="position: absolute; bottom: 5%; width: 100%">
                <div class="row">
                    <div class="col-33" style="text-align: center">
                        <button class="col button button-outline button-round button-large saveAnswers ${data.backbuttononclick}"  id=${data.backbuttontid}><a href=${data.backbuttonhref} class="tab-link">${data.backbuttontext}</a></button>
                    </div>
                    <div class="col-33"></div>
                    <div class="col-33" style="text-align: center">
                        <button class="col button button-outline button-round button-large saveAnswers ${data.nextbuttononclick}" id=${data.nextbuttonid}><a href=${data.nextbuttonhref} class="tab-link">${data.nextbuttontext}</a></button>
                    </div>
                </div>
            </div>`
    }
    if (device.platform=="Android"|| device.platform == "android"){
    return `
        <div id="${data.id}" class=${data.classp}>
            <div class="block-header">${data.header}</div>
              <div class="block bottomButtons"; style="position: absolute; bottom: 10%; width: 100%">
                <div class="row">
                    <div class="col-33" style="text-align: center">
                        <button class="col button button-outline button-round button-large saveAnswers ${data.backbuttononclick}"  id=${data.backbuttontid}><a href=${data.backbuttonhref} class="tab-link">${data.backbuttontext}</a></button>
                    </div>
                    <div class="col-33"></div>
                    <div class="col-33" style="text-align: center">
                        <button class="col button button-outline button-round button-large saveAnswers ${data.nextbuttononclick}" id=${data.nextbuttonid}><a href=${data.nextbuttonhref} class="tab-link">${data.nextbuttontext}</a></button>
                    </div>
                </div>
            </div>`
    } 
     
}

// layout function the questions
 function startQuestions(module){
      DiaryDatabase.transaction(function (tx) {
         // To prevent duplicates  
         if($('.block-strong').length<1){ 

         var query = "SELECT * FROM questiontable WHERE module2 = ?"
            
                tx.executeSql(query, [module], function (tx, resultSet) {
                    for(var x = 0; x < resultSet.rows.length; x++) {
                        
                        var data = {
                            tab: resultSet.rows.item(x).tab,
                            idq: resultSet.rows.item(x).idq,
                            question: resultSet.rows.item(x).question,
                            categories: resultSet.rows.item(x).categories,
                            footer: resultSet.rows.item(x).footer
                        }
                        
                        var emptytab = document.getElementById(resultSet.rows.item(x).tab)

                        if(resultSet.rows.item(x).type=="YN"){
                            emptytab.innerHTML += yesnoquestion(data);
                        }
                        if(resultSet.rows.item(x).type=="OQ"){
                            emptytab.innerHTML += openquestion(data);
                        }
                        if(resultSet.rows.item(x).type=="MC"){
                            emptytab.innerHTML += multiplechoicequestion(data);
                            multiplechoicequestionselect(data);
                        }
                        if(resultSet.rows.item(x).type=="SL"){
                            emptytab.innerHTML += sliderquestion(data);
                        }        
                        }
                })
        }                   
        },
        function (error) {
                         },
        function () {
          
                    //startAnswers if not adhoc
                    if (adhoc=="NO") {
                        startAnswers()
                    }
            
                    //initiate the sliders, if present
                    sliders = mainView.$el.find('.range-slider')
                    for (var i=0, len=sliders.length; i< len; i++){
                        var range = app.range.create({
	                       el: sliders[i],
	                    }); 
                    }
                    }
        );
 }
                                
    // layout function for yes-no questions
    function yesnoquestion(data){
        return `
            <form class="form-store-data" id=${data.tab}>
            <div class="block block-strong no-hairlines">
            <p><b>${data.question}</b></p>
            <input type="hidden" id=${data.idq} name=${data.idq} value="">
            <div class="block-footer">${data.footer}
            </div>      
            </div>
            </form>`
    }

    // layout function for open questions
    function openquestion(data) {
        return `
            <form class="form-store-data" id=${data.tab}>
            <div class="block block-strong no-hairlines">
            <b>${data.question}</b>
            <div class="block block-strong inset no-hairlines" style="border:1px solid black">
            <div class="item-inner">
            <div class="item-title item-label"></div>
            <div class="item-input-wrap">
            <textarea class="resizable textareas question" style="max-height: 150px; width:100%" name=${data.idq} id=${data.idq}
            placeholder=""></textarea>
            </div>
            </div>  
            </div>
            <div class="block-footer">${data.footer}</div>  
            </div>    
            </form>`   
    }

    // layout function for multiple choice questions
    function multiplechoicequestion(data){        
        return `
        <form class="form-store-data" id=${data.tab}> 
            <div class="block block-strong no-hairlines">
            <p><b>${data.question}</b></p>
            <div class="item-inner">
            <div class="item-title item-label"></div>
            <div class="item-input-wrap input-dropdown-wrap">
            <select class="question" style="width:100%" name=${data.idq} id=${data.idq} placeholder="">
                <option disabled selected value> -- Kies een antwoord -- </option>
            </select>
            </div>
            </div>
            <div class="block-footer">${data.footer}</div>  
            </div>
        </form>`
    }

    // layout function for the options in the multiple choice questions
    function multiplechoicequestionselect(data){ 
        select = document.getElementById(data.idq)
        
        optionValues = Object.getOwnPropertyNames(JSON.parse(data.categories))
        
        for (i = 0; i < optionValues.length; i++) {
            option = document.createElement("option")
            option.value =  optionValues[i]
            option.text = Object(JSON.parse(data.categories))[optionValues[i]]
            select.appendChild(option)
        }
    }

    // layout function for the slider questions
    function sliderquestion(data){
        return `
        <form class="form-store-data" id=${data.tab}> 
        <div class="block-header">${data.question}</div>
        <div class="list simple-list no-hairlines">
        <ul>
        <li>
            <div class="item-cell width-auto flex-shrink-0 align-self-stretch">
            <i><img src="img/dissatisfied.png" style="width:40px;height:40px;">
            </i>
            </div>
            <div class="item-cell flex-shrink-3">
            <div class="range-slider range-slider-init">
            <input class="question" name=${data.idq} id=${data.idq} type="range" min="0" max="100" step="1" value="50">
            </div>
            </div>
            <div class="item-cell width-auto flex-shrink-0 align-self-stretch">
            <i><img src="img/satisfied.png" style="width:40px;height:40px;"></i>
            </div>
        </li>
        </ul>
        </div>
        </form> `
    }


// function to populate the answer boxes if present (saved answers)
function startAnswers(){
    DiaryDatabase.transaction(function (tx) {
                
        var query = "SELECT * FROM responseTable WHERE surveydate = ?"
            
        tx.executeSql(query, [surveydate], function (tx, resultSet2) {  
                       surveydateExists = resultSet2.rows.length;
                     })
        },
        function (error) {
                         },
        function () {
                    if(surveydateExists<1){
                        DiaryDatabase.transaction(function (tx) {

                        var query = "INSERT INTO responseTable (surveydate) VALUES (?)";

                        tx.executeSql(query, [surveydate], function(tx) {
                                                            });
                    });   
                    }
                    if(surveydateExists>0){
                        
                        DiaryDatabase.transaction(function (tx) 
                        {
                        var query = "SELECT * FROM responseTable;"
            
                        tx.executeSql(query, [], function (tx, resultSet) {
                        
                                firstRow = resultSet.rows.item(0);
                                qlabels = Object.getOwnPropertyNames(firstRow);
                            
                        }
                        ) 
                        })
                        
                        DiaryDatabase.transaction(function (tx) {
   
                        for (var i = 3, len = qlabels.length; i < len; i++) {

                            var query = "SELECT "+qlabels[i]+" FROM responseTable WHERE surveydate = ?"
                            //DIT IS NOG GEEN COOLE FUNCTIE
                            tx.executeSql(query, [surveydate], function (tx, resultSet3) {
                                var answer = JSON.stringify((resultSet3.rows.item(0)));
                                answer = answer.split(":");
                                question = answer[0].replace('{"','#');
                                question =question.replace('"','')
                                answer = answer[1].replace('"}','');
                                answer = answer.replace('"','');
                                answer = answer.replace(/(?:\\[rn]|[\r\n]+)+/g, ' ');
                                
                                if(answer!="null}"){
                                    $(question).val(answer)
                                }
                            })
                        }
                        })
                    }
                    }
        );
}

// function to save answers in the database    
function saveAnswers(){
    var data = $("form").serializeArray();
        DiaryDatabase.transaction(function (tx) {
            for (var i = 0, len = data.length; i < len; i++) {
                tx.executeSql("UPDATE responseTable SET "+data[i].name+"=? WHERE surveydate=?", [data[i].value,surveydate]);
            }
        });        
}

//function to upload the answers
function uploadToServer(module){
    
     var uname= window.localStorage.getItem('uname');
     var pwd= window.localStorage.getItem('pwd');
     var timestamp = moment().format(); 

     var data = $("form").serialize();
     
     var dataString="uname="+uname+"&pwd="+pwd+"&surveydate="+surveydate+"&timestamp="+timestamp+"&"+data+"&module=module"+module;

        $.ajax({
                 type:"POST",  
                 url:"https://peterkruyen.net/diary/dearscholar.php", data: dataString,
                 crossDomain: true,
                 cache: false, 
                 success:function(data)  
                 {  
                
                  if(data=="success") {
                      
                      if (adhoc=='NO'){
                        // set the module to complete and return to the survey page. 
                        setModuleComplete(surveydate,module) 
                          
                        app.views.main.router.navigate('/survey/');
                      }
                      if (adhoc=='YES'){
                        app.views.main.router.navigate('/schedule/');
                      }
                     }
                     if(data=="error") {
                         app.dialog.alert("Op dit moment kunnen uw antwoorden niet worden opgeslagen, probeer later opnieuw.","DearScholar");
                     }
                     
                 }  
            });  
        }  



// function to set module to complete (when uploaded succesfully)
function setModuleComplete(surveydate ,module){
    DiaryDatabase.transaction(function (tx) {
                
        var query = "SELECT * FROM surveyInformation WHERE surveydate = ?"
            
        tx.executeSql(query, [surveydate], function (tx, resultSet2) { 
                       surveydateExists = resultSet2.rows.length;
                     })
        },
        function (error) {
                         },
        function () {
                    if(surveydateExists<1){
                        DiaryDatabase.transaction(function (tx) {

                        var query = "INSERT INTO surveyInformation (surveydate, "+ module+") VALUES (?,?)";

                        tx.executeSql(query, [surveydate,"Y"], function(tx) {
                                                            });
                    });   
                    }
                    if(surveydateExists>0){
                        DiaryDatabase.transaction(function (tx) {

                        var query = "UPDATE surveyInformation SET "+ module+"=? WHERE surveydate=?";

                        tx.executeSql(query, ["Y", surveydate], function(tx) {
                                                            });
                    }); 
                    }
                    }
        );
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions for the mailbox

// Code to show emailsymbol if there are new messages, run on app init
function checkNewMessages(){
         var uname= window.localStorage.getItem('uname');
         var pwd= window.localStorage.getItem('pwd');

         var dataString="uname="+uname+"&pwd="+pwd+"&messagesCheck=true";
                 $.ajax({
                 type:"POST",  
                 url:"https://peterkruyen.net/diary/dearscholar.php", data: dataString,
                 crossDomain: true,
                 cache: false, 
                 success:function(data)  
                 {  
                     
                    messages = JSON.parse(data)
                    
                    totalMessages = messages.length;
                     
                    var seen =[];
                    
                    for (i = 0; i < messages.length ; i++) {
                       seen.push(parseInt(messages[i].data.seen)) 
                    };
                     
                    const arrSum = arr => arr.reduce((a,b) => a + b, 0);
                     
                    if(arrSum(seen)<totalMessages){
                        $("#newmessages").attr("href", "/messages/");
                        $("#emailsymbol").text('chat_bubble_text');
                    }   
                 }
              })
}

// Code to populate the messagebox, run on app init
function populateMessageboxrun(){
    // Parse the message archive (i.e., push notifactions) in an array
         var uname= window.localStorage.getItem('uname');
         var pwd= window.localStorage.getItem('pwd');

         var dataString="uname="+uname+"&pwd="+pwd+"&messagesCheck=true";
                 $.ajax({
                 type:"POST",  
                 url:"https://peterkruyen.net/diary/dearscholar.php", data: dataString,
                 crossDomain: true,
                 cache: false, 
                 success:function(data)  
                 {  
                    messages = JSON.parse(data)
                     
                    if(messages==null){
                       var cards = document.getElementById("cards");
                       var push = '<div class="row">' +
                      '<div class="col s12 m6">' +
                      '  <div class="card darken-1">' +
                      '    <div class="card-content black-text">' +
                      '      <span class="card-title black-text">' + "Bericht" + '</span>' +
                      '      <p>' + "U heeft geen berichten" + '</p>' +
                      '    </div>' +
                      '  </div>' +
                      ' </div>' +
                      '</div>';
                      cards.innerHTML += push;  
                    } 
                    
                    if(messages!==null){ 
                    
                    // new added messages come first    
                    var messages = messages.reverse()
                    
                    for (i = 0; i < messages.length ; i++) {
                         var id = messages[i].data.id;
                        
                         var date = messages[i].data.datum;
                         var day = date.slice(8,10);
                         var month = date.slice(5,7);
                         var year = date.slice(0,4);
                         var datum = day + "-" + month + "-" + year;
                                                
                         var cards = document.getElementById("cards");
                         var push = '<div class="row">' +
                        '<div class="col s12 m6">' +
                        '  <div id='+id+' class="card darken-1 unseen">' +
                        '    <div class="card-content black-text">' +
                        '      <span class="card-title black-text"><b>' + datum + '</b></span>' +
                        '      <p>' + messages[i].data.message + '</p>' +
                        '    </div>' +
                        '  </div>' +
                        ' </div>' +
                        '</div>';
                       cards.innerHTML += push;
                        
                       if(messages[i].data.seen==1){$("#"+id).css( "background-color", "darkgrey" )};

                    } 
                    }
                 }  
                });    
}

// function to color message if user has seen the message.
function seen(item) {
    
    var uname= window.localStorage.getItem('uname');
    var pwd= window.localStorage.getItem('pwd');
    var id = $(item).attr("id");
    
         var dataString="uname="+uname+"&pwd="+pwd+"&id="+id+"&messagesSeen=true";
                 $.ajax({
                 type:"POST",  
                 url:"https://peterkruyen.net/diary/dearscholar.php", data: dataString,
                 crossDomain: true,
                 cache: false, 
                 success:function(data)  
                 {  
                   
                 }
            })
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Miscellaneous functions

// function to populate the consent page
 function startConsent(){
      document.getElementById("emptyconsentform").innerHTML = ""   

      DiaryDatabase.transaction(function (tx) {
            
                var query = "SELECT consent FROM surveyStructure WHERE rowid = ?"
                tx.executeSql(query,[1],function (tx, resultSet) {
                    consentText = resultSet.rows.item(0).consent
                })
      },
      function (tx, error) {
        app.dialog.alert("Er is iets mis gegaan. Probeer opnieuw of neem contact op met Peter Kruyen.","DearScholar")
      },
      function (tx, succes) {
         app.popup.open(".consent");
         document.getElementById("emptyconsentform").innerHTML += consentText;
          
         //restyle the Android toolbar 
         if(device.platform == "Android"|| device.platform == "android"){
            $(".toolbar-bottom").css("height", "120px");
            $(".toolbar-inner").css("height", "40px");
         }  
     })
 }

// function to populate the consent page in the About page
 function startConsentAbout(){
      document.getElementById("emptyconsentformAbout").innerHTML = ""   

      DiaryDatabase.transaction(function (tx) {
            
                var query = "SELECT consent FROM surveyStructure WHERE rowid = ?"
                tx.executeSql(query,[1],function (tx, resultSet) {
                    consentText = resultSet.rows.item(0).consent
                })
      },
      function (tx, error) {
        app.dialog.alert("Er is iets mis gegaan. Probeer opnieuw of neem contact op met Peter Kruyen.","DearScholar")
      },
      function (tx, succes) {
         app.popup.open(".consentAbout");
         document.getElementById("emptyconsentformAbout").innerHTML += consentText;
          
         //restyle the Android toolbar 
         if(device.platform == "Android"|| device.platform == "android"){
            $(".toolbar-bottom").css("height", "120px");
            $(".toolbar-inner").css("height", "40px");
         }
     })
 }

//Add event handler to the close consent link in the About button.
$$('#closeConsent').on('click', function (e) {
    app.popup.close(".consentAbout")
    app.views.main.router.navigate('/schedule/');
})

// function to populate the manual
  function startManual(){
      var emptypage = document.getElementById("emptypage")

      DiaryDatabase.transaction(function (tx) {
            
                var query = "SELECT manual FROM surveyStructure WHERE rowid = ?"
                tx.executeSql(query,[1],function (tx, resultSet) {
                    emptypage.innerHTML += resultSet.rows.item(0).manual
                })
      }),
      function (tx, error) {
        app.dialog.alert("Er is iets mis gegaan. Probeer opnieuw of neem contact op met Peter Kruyen.","DearScholar")
     }
  }