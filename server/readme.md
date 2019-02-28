CRUD API

Create-(Post)
'/api/create/photos/:id'
use this endpoint to post pictures to the specified restaurant ID

Read-(get)
'/api/photos/:id'
use this endpoint to retrieve all photos from DB based on the id of the restuarant

Update-(put)
'/api/update/photos/:id/:photoName'
use this endpoint to update an existing photo.
requires the id of the item as well as the photo name.

Delete-(delete)
'/api/delete/photos/:id/:photoName'
deleted the photo  when no longer needed, based on which restaurant id, and picture name.