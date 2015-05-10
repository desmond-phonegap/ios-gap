/*// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('localNotifyApp', ['ionic', 'localNotifyApp.controllers', 'localNotifyApp.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
*/

var app = angular.module('NotifyApp', ['ionic', 'ngCordova']);

app.controller('NotifyCtrl', function($scope, $ionicPlatform, $cordovaLocalNotification) {
    alert("HI v0.0.1");
    $ionicPlatform.ready(function () {
        $cordovaLocalNotification.add({message: 'Hello Local Notification'}) ;
        var db = windows.sqllitePlugin.openDatabase({name: "phonegap.db", location: 1 });
        db.transaction(function (tx){
            tx.executeSql('DROP TABLE IF EXISTS test_table') ;
            tx.executeSql('CREATE TABLE IF NOT EXISTS test_table (id integer primary key, data text, data_num integer)');
            
            db.executeSql("pragma table_info (test_table);", [], function(res){
                alert("PARGMA res: " + JSON.stringify(res));
            });
            tx.executeSql("INSERT INTO test_table (data, data_num) VALUES (?,?)", ["test",100], function (tx, res) {
                alert("insertedId: "+ res.insertedId + " -- probably 1");
                alert("row affected: " + res.rowsAffected + " -- should be 1");
                
                db.transaction(function (tx) {
                    tx.executeSql("select count(id) as cnt from test_table;", [], function (tx, res) {
                      alert("res.rows.length: " + res.rows.length + " -- should be 1");
                      alert("res.rows.item(0).cnt: " + res.rows.item(0).cnt + " -- should be 1");
                    });
                });
            });
        }, function(e) {
            alert("Error: "+ e.message);
        });
    });
});
