# Assignment

Tolstoy developer project - Matan Shemesh
https://docs.google.com/document/d/1rBqxPzTgY5uZ1Ay0KFH51te2eJN0fwLqPVROj6zGStw/edit


## Run
Just run `docker compose up`
then browse it on http://localhost. You can add images with name and description, click on one of the thumbnails to open the full size image and remove an images once it is selected.

## Short description
The project is build with a Flask BE server, and sqlite DB. Image files are saved on the server and served using nginx using a shared volume. 
The FE is built with react.

## Things to do before it will be production ready
#### OR thing that I would have done it if I had more time
- Add tests
- Some styling in the FE
- Build FE instead of running it
- Use a production server for BE
- Close DB connections
- BE error handling, Wrap with a few try except, and send more explaining error messages.
- Delete the images file when deleting the DB entry
- Save the images on external service (S3?)