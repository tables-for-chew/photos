CRUD API

Create-(Post)
'/api/create/photos/:id'
use this endpoint to post pictures to the specified restaurant ID
Response Codes:
Status Code: 200 OK
Status Code: 400 Bad Request error
Content: { error : "Bad Request error" }

Read-(get)
'/api/photos/:id'
use this endpoint to retrieve all photos from DB based on the id of the restuarant
Response Codes:
Status Code: 200 OK
Status Code: 400 Bad Request error
Content: { error : "Bad Request error" }

Update-(put)
'/api/update/photos/:id/:photoName'
use this endpoint to update an existing photo.
requires the id of the item as well as the photo name.
Response Codes:
Status Code: 200 OK
Status Code: 400 Bad Request error
Content: { error : "Bad Request error" }

Delete-(delete)
'/api/delete/photos/:id/:photoName'
deleted the photo  when no longer needed, based on which restaurant id, and picture name.
Response Codes:
Status Code: 200 OK
Status Code: 400 Bad Request error
Content: { error : "Bad Request error" }