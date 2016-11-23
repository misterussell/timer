# Final Project Proposal

## Pitch
  - [AppName]

## Basic Features
  - *Registration/Secure Login*
    - Include Gmail/Facebook authentication
  - *User Settings*
    - Minimal accessibility options
  - *Timer Creation*
  - *Pre-made Timer Template Selection* `user can also CRUD on these templates`
    - Productivity
      1.
    - Mobility
    - Mindfulness
  - *Multi-Timer Template Creation*
  - *Timer/Template Sharing*

## Data Modeling
  - *Collections*
    1. Timers
    2. Templates
  - *Models*
    1. Timer
      ```javascript
      timer = {
        timerValue : '',
        tags: [], // tags can be added to help sort timers
        timerLinks : [] // user can add pertinent links to timers - i.e.
      }
      ```
    2. Template

## Libraries/Special Features
  - `Travel Time Anticipation` - provided with use of Google Distance Matrix + Directions API to allow for multi-point travel
  - `Geolocation` - provided with use of Google API

## UI/Design
  - Anticipating a relatively busy/active screen by the use of multiple visual timers - the UI/visual assets for this application will concentrate on simplicity and an open structure.
  - Logo/Vector assets will be handled in Illustrator
  - Accessibility - Base level accessibility requirements will be for audio/visual alarms. These settings will be able to be adjusted in user settings.
    - More research will need to be done to understand how to bridge visual impairments

## Resources/API Documentation

- [Google API database](https://developers.google.com/maps/documentation/)

- [Distance Matrix Output Documentation](https://developers.google.com/maps/documentation/distance-matrix/intro#travel_modes)

- [Google Distance Matrix API Proofing](images/apireturn.png) - This service requires a registered API key that can be linked to other google maps API's for additional resources

- [Google GeoLocation API Documentation](https://developers.google.com/maps/documentation/)
