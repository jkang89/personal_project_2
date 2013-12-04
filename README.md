# KonoKawaii

KonoKawaii is a web application that simulates the Purikura Japanese photobooths.  Users are able to use their webcam, apply a filter, take a snapshot, and then customize their snapshot by adding stickers, borders, or text.

## Web Framework
### (my_app.py)

Flask used for the web framework.

## User Interface
###(webcam3.js)

An interface that utilizes JavaScript and HTML5 (Canvas) to allow users to take filtered snapshots that are viewable on their browsers.  The JavaScript portion calls the webcam on a user's computer, and canvas is utilized to manipulate the pixels in order to apply a filter to the video stream that is then drawn onto canvas.

