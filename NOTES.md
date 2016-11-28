## Data Modeling

  - *Collections*
    1. Timers
    2. Timer Templates
    3. Timer Notification Soundbytes
      - Stored on an internal server
    4. Locations
      - A collection of frequently used/pertinent locations that the user has defined
    5. Routes (Travel)
      - A collection of frequently used Routes that utilizes a locations from the Locations collection
  - *Models*
    1. User Defined Timer

      ```javascript
      timer = {
        timerValue : '',
        tags: [], // tags can be added to help sort timers
        timerLinks: [], // user can add pertinent links to timers - i.e.
        timerSound: 'soundByte.wav' // selectable sounds
      }
      ```
    2. Single Timer Template

      ```javascript
      timerTemplate = {
        timerValues: [5, 10, 25, 45, 60] // value of minutes
        tags: ['mindfulness', 'mobility', 'productivity', x] // where x = a tag that can be defined in the user's profile
        timerSounds: [...] // where ... is a list of timer sounds the user can select from
      }
      ```
    3. Multi-Timer Template

      ```javascript
      multiTimerTemplate = {
        timers = [
          {
            timerName: 'name',
            timerValue: 5,
            timerLink: 'link.html'.
            timerSound: 'soundByte.wav',
            tag: 'tag'
          },
          {...}] /// where ... is a set number of timer objects
      }
      ```
    4. Location

        ```javascript
          location = {
            name: 'home',
            longitude: '30.2672 N',
            latitiude: '97.7431 W',

          },
          getGeolocation() {...} // where ... is the ajax request to retrieve Geolocation from google API
        ```
    5. Routes

        ```javascript
          route = {
            startPoint: 'location data',
            endPoint: 'endPoint data'
          },
          getRoute() {...} // where ... is the ajax request to retrieve a route from the Google directions API
          getTime() {...} // where ... is the ajax request to retrieve the distance between two location points by different methods
        ```

## Relational data

  - Template Timers + Template Timer Groups
    - Relational data points until the User CRUDs on the template.
  - Shared Timers
    - Shared timers are relational data points, but only owner can CRUD
