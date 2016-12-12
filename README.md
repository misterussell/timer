 # Final Project Proposal

## Pitch

  - OnTime is a multi-tasking resource that implements customizable timers to maximize productivity, mindfulness, and mobility. Be on time, be present, stay on track.

## MVP User Stories

  - User can register/login
  - User can run a basic timer using an existing template
  - User can view the timer as a template
  - Logged in User can create a basic timer that runs in the timer page
    - This timer will have a unique URL that is shareable

## Wireframes

  - [MVP Wireframes](/app/assets/images/timermvpwireframes.jpg)
  - [Single Timer Wireframe](/app/assets/images/singletimerwireframe.jpg)

## Basic Features Planning

  - *Registration/Secure Login*
    - Include Gmail/Facebook authentication
  - *User Settings*
    - Minimal accessibility options
  - *User Defined Timer Creation*
    - Quick Timer Creation: Make simple timer with Value and Description
  - *Pre-made Timer Template Selection* `user can also CRUD on these templates`
    - Productivity
      * Timer's centered around keeping on tracking/hitting goals. I.E. pomodoro style timers
    - Mobility
      * Timer's centered around mobility, when to leave, travel times, reminders
      * These will utilize Google API's to assist with timer creation
    - Mindfulness
      * Timer's centered around practice of mindfulness
      * Link to pertinent relative data elsewhere on the web
  - *Multi-Timer Template Creation*
    - Creates a predefined number of pre-made timers (of the classes listed above)
  - *Timer/Template Sharing*
    - Allows for user's to export a timer/template of timers as a sharable link
  - *Pausable Timers* `late-stage priority`
    - Allow server to track if timers are paused (outside of just browser window)
    - Adds usability for long-term project timers

## React Routes/Components Planning

  - Home `/`
    - Includes persistent and collapsable menu
  - User Profile `/profile`
  - Simple Timer Creator `/createTimer`
  - Template Timer Selection `/selectTemplate`
  - Create Template `/createTemplate`
  - Find Route `/findRoute`

## Libraries/Special Features

  - `Travel Time Anticipation` - provided with use of Google Distance Matrix + Directions API to allow for multi-point travel
  - `Geolocation` - provided with use of Google API/Native browser geoLocation

## UI/Design

  - Anticipating a relatively busy/active screen by the use of multiple visual timers - the UI/visual assets for this application will concentrate on simplicity and open visual structures.
  - Visual Assets - Logo/vectors will be handled with Illustrator.
    - Logo + Timer Avatar `baseline hand-made requirements`
    - Customizable Timer Backgrounds + Avatars `goal hand-made assets`
  - Accessibility - Base level accessibility requirements will be for audio/visual alarms. These settings will be able to be adjusted in user settings.
    - Visual notifications will utilize styling/animations with high impact/contrast.
    - More research will need to be done to understand how to bridge visual impairments/screen readers `late-stage priority`

## Testing

  - Anticipating to test baseline React components, and timer creation functions

## Resources/API Documentation

- [Backendless Backend Server](https://backendless.com/)
- [Google API database](https://developers.google.com/maps/documentation/)
- [Distance Matrix Output Documentation](https://developers.google.com/maps/documentation/distance-matrix/intro#travel_modes)
- [Google Distance Matrix API Proofing](images/apireturn.png) - This service requires a registered API key that can be linked to other google maps API's for additional resources
- [Google GeoLocation API Documentation](https://developers.google.com/maps/documentation/)
- [Recharts API](http://recharts.org/) - This API generates SVG charts in React from an array of objects
