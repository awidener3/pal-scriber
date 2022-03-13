# ✍ Pal Scriber

[![Project Status: WIP – Initial development is in progress, but there has not yet been a stable, usable release suitable for the public.](https://www.repostatus.org/badges/latest/wip.svg)](https://www.repostatus.org/#wip)

Pal Scriber is an application that listens to a users microphone or input and transcribes it into an editable textarea that can then be downloaded. The aim of this application is to simplify transcription, note taking, and journaling.

This application is still in development.

## 🌎 Planned Features
* ~~Listen to user microphone and transcribe to an in-app editor.~~
* ~~Editor can export file into a text file for the user to download.~~
* The user can change the inputs to allow use of other audio inputs such as mixers and system audio.
* A playback function is implemented that will read the transcription back to the user.
* The user can set different speakers in-app that have corresponding buttons. This replaces the current "add" button and instead adds a button for each speaker that inserts their name/id before the added text.
* Add animation to mic icon that reacts to speaker. Shows feedback that the mic is on and listening.

## 🧠 App Reflection

This app was a spur-of-the-moment idea I had when I was thinking about a way to incorporate inputs *outside* of the browser in an application. My background in music and music production instantly lead me to microphone input and manipulating what the browser is hearing. As I was doing some research on ways to take in audio input, I found a React package/component called `react-speech-recognition` which seemed like a great place to start.

While working with this new input type, I have also been practicing writing in React, as I am currently (March 2022) a bit rocky on how components can be implemented. I am hoping by the end of this project, I have separated most of the project into components for better organization and reusability.
