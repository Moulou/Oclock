angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
    .config(function($ionicConfigProvider) {
      $ionicConfigProvider.tabs.position('bottom');
    })

    .controller('mainCtrl', function($scope, $ionicModal, $timeout) {

      var title;
      var categ;
      var time;

      $scope.recup = function() {
        title = this.title;
        categ = this.cate;
        time = this.time;
        console.log(title);
        console.log(categ);
        console.log(time);
      };
      // Timer
      var mytimeout = null; // the current timeoutID
      // actual timer method, counts down every second, stops on zero
      $scope.onTimeout = function() {
        if ($scope.timer === 0) {
          $scope.$broadcast('timer-stopped', 0);
          $timeout.cancel(mytimeout);
          return;
        }
        $scope.timer--;
        mytimeout = $timeout($scope.onTimeout, 1000);
      };
      // functions to control the timer
      // starts the timer
      $scope.startTimer = function() {
        mytimeout = $timeout($scope.onTimeout, 1000);
        $scope.started = true;
      };

      // stops and resets the current timer
      $scope.stopTimer = function(closingModal) {
        if (closingModal != true) {
          $scope.$broadcast('timer-stopped', $scope.timer);
        }
        $scope.timer = $scope.timeForTimer;
        $scope.started = false;
        $scope.paused = false;
        $timeout.cancel(mytimeout);
      };
      // pauses the timer
      $scope.pauseTimer = function() {
        $scope.$broadcast('timer-stopped', $scope.timer);
        $scope.started = false;
        $scope.paused = true;
        $timeout.cancel(mytimeout);
      };

      // triggered, when the timer stops, you can do something here, maybe show a visual indicator or vibrate the device
      $scope.$on('timer-stopped', function(event, remaining) {
        if (remaining === 0) {
          $scope.done = true;
        }
      });
      // UI
      // When you press a timer button this function is called
      $scope.selectTimer = function() {
        $scope.timeForTimer = time;
        $scope.timer = time;
        $scope.started = false;
        $scope.paused = false;
        $scope.done = false;
      };

      // This function helps to display the time in a correct way in the center of the timer
      $scope.humanizeDurationTimer = function(input, units) {
        // units is a string with possible values of y, M, w, d, h, m, s, ms
        if (input == 0) {
          return 0;
        } else {
          var duration = moment().startOf('day').add(input, units);
          var format = "";
          if (duration.hour() > 0) {
            format += "H[h] ";
          }
          if (duration.minute() > 0) {
            format += "m[m] ";
          }
          if (duration.second() > 0) {
            format += "s[s] ";
          }
          return duration.format(format);
        }
      };
      // function for the modal
      $ionicModal.fromTemplateUrl('templates/timer.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });
    });


