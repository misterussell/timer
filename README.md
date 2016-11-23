# Final Project Proposal

## Pitch

  - [AppName] is a multi-tasking resource that implements customizable timers to maximize productivity, mindfulness, and mobility. Be on time, be present, stay on track.

## Basic Features

  - *Registration/Secure Login*
    - Include Gmail/Facebook authentication
  - *User Settings*
    - Minimal accessibility options
  - *User Defined Timer Creation*
    - Quick Timer Creation: Make simple timer with Value and Description
    - Form Timer Creation: Conditional selection of timer properties
  - *Pre-made Timer Template Selection* `user can also CRUD on these templates`
    - Productivity
      * Timer's centered around keeping on tracking/hitting goals. I.E. pomodoro style timers
    - Mobility
      * Timer's centered around mobility, when to leave, travel times, reminders
      * These will utilize Google API's to assist with timer creation
    - Mindfulness
      * Timer's centered around practice of mindfulness
      * Link to pertinent relative data elsewhere
  - *Multi-Timer Template Creation*
    - Creates a predefined number of pre-made timers
  - *Timer/Template Sharing*
    - Allows for user's to export a timer/template of timers as a sharable link
  - *Pausable Timers* `late-stage priority`
    - Allow server to track if timers are paused
    - Adds usability for long-term project timers

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

## React Routes/Components

  - Home `/`
    - Includes persistent and collapsable menu
  - User Profile `/profile`
  - Simple Timer Creator `/createTimer`
  - Template Timer Selection `/selectTemplate`
  - Create Template `/createTemplate`
  - Find Route `/findRoute`

## Libraries/Special Features

  - `Travel Time Anticipation` - provided with use of Google Distance Matrix + Directions API to allow for multi-point travel
  - `Geolocation` - provided with use of Google API

## UI/Design

  - Anticipating a relatively busy/active screen by the use of multiple visual timers - the UI/visual assets for this application will concentrate on simplicity and open visual structures.
  - Visual Assets - Logo/vectors will be handled with Illustrator.
    - Logo + Timer Avatar `baseline hand-made requirements`
    - Customizable Timer Backgrounds + Avatars `goal hand-made assets`
  - Accessibility - Base level accessibility requirements will be for audio/visual alarms. These settings will be able to be adjusted in user settings.
    - Visual notifications will utilize styling/animations with high impact/contrast.
    - More research will need to be done to understand how to bridge visual impairments/screen readers `late-stage priority`

## Resources/API Documentation

- [Backendless Backend Server](https://backendless.com/)
- [Google API database](https://developers.google.com/maps/documentation/)
- [Distance Matrix Output Documentation](https://developers.google.com/maps/documentation/distance-matrix/intro#travel_modes)
- [Google Distance Matrix API Proofing](images/apireturn.png) - This service requires a registered API key that can be linked to other google maps API's for additional resources
- [Google GeoLocation API Documentation](https://developers.google.com/maps/documentation/)
