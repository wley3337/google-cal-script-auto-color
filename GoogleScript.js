//note that at the time of creation google scripts is using JS 1.6
//base code for this is from: https://rickpastoor.com/2019/05/30/google-calendar-color-coder.html

function ColorEvents() {
    //this adds .includes() until gscripts is updated to include ecma 2017
    if (!String.prototype.includes) {
      String.prototype.includes = function(search, start) {
        'use strict';
        if (typeof start !== 'number') {
          start = 0;
        }
    
        if (start + search.length > this.length) {
          return false;
        } else {
          return this.indexOf(search, start) !== -1;
        }
      };
    }  
    
      var today = new Date();
      var nextweek = new Date();
      nextweek.setDate(nextweek.getDate() + 7);
      Logger.log(today + " " + nextweek);
    
      var calendars = CalendarApp.getAllOwnedCalendars();
      Logger.log("found number of calendars: " + calendars.length);
    
      for (var i=0; i<calendars.length; i++) {
        var calendar = calendars[i];
        var events = calendar.getEvents(today, nextweek);
        for (var j=0; j<events.length; j++) {
          var e = events[j];
          var title = e.getTitle();
          
          // change string inside of includes and/or add multiple conditions to change event color
          if (title.includes("- Technical Interview -")) {
              //colors available https://developers.google.com/apps-script/reference/calendar/event-color
              e.setColor(CalendarApp.EventColor.YELLOW);
          }
          if (title.includes("CANCELED")) {
            //colors available https://developers.google.com/apps-script/reference/calendar/event-color
            e.setColor(CalendarApp.EventColor.RED);
          }
          if (title.includes("- Prework")) {
              //colors available https://developers.google.com/apps-script/reference/calendar/event-color
              e.setColor(CalendarApp.EventColor.MAUVE);
          }
        }
      }
    }