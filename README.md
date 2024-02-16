# randomartviewer
This is a fun little project that makes use of the awesome API from the Art Institute of Chicago:
https://api.artic.edu/docs/

It works by generating a random number between 1 and 10,300 for the page number and then generating another random number between 1 and 12 for the image index position. Each page request returns an array of 12 objects.

TO-DO LIST:
Incorporate search by artist name
Add ability to see specific image/page number
Include list of recently viewed images
Screen for 403s before they are shown and move on to next image instead
Save pic to desktop
