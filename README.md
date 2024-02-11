# randomartviewer
This is a fun little project that makes use of the awesome API from the Art Institute of Chicago:
https://api.artic.edu/docs/

It works by generating a random number between 1 and 10,000 for the page number (the collection has even more than that, but I kept it lower to be safe) and then generating another random number between 1 and 12 for the image index position. Each page request returns an array of 12 objects.

This is very rough and is really just meant to be a proof of concept. 
