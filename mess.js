var casper = require('casper').create({
    pageSettings: {
        loadImages: false,//The script is much faster when this field is set to false
        loadPlugins: false,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36'
    },
    verbose : true,
    logLevel : 'info',
});
var x = require('casper').selectXPath;



/**
 * Configuration here
 */
var login_username = "#username@yahoo.com";
var login_password = "#password";
//person suppose to talk
var talkTo_username = "#person";

/**
 * Everything starts here!
 */
casper.start('https://www.messenger.com', function() {

    // The pretty HUGE viewport allows for roughly 1200 images.
    this.viewport(1900,1000);

    //login with your account
    this.evaluate(function(username, password){
        document.querySelector('input[type="text"]').value = username;
        document.querySelector('input[type="password"]').value = password;
        document.querySelector('button[type="submit"]').click();
    }, login_username, login_password);
});

casper.thenOpen("https://www.messenger.com/t/"+talkTo_username, function(){
});

casper.then(function() {
    this.clickLabel('Change Color', 'div');
});

casper.then(function() {
    //random color selected
    this.evaluate(function() {
        var color = document.querySelectorAll('div._5dr4')[Math.floor((Math.random() * 18) + 1)];
        color.click();
    })
    
    //take picture to check if you are logged
    casper.waitForSelector('a[title="Conversation Information"]', function () {
        this.capture("photo+index.png");
    });
});


casper.run(function(){
    this.exit();
});
