## auth
- POST /Signup
- POST /login
- POST /logout

## profile
- GET /profile
- PATCH /profile/edit
- PATCH /forgotPassword

## connection request

- POST /request/send/interest/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accept/:userId
- GET  /request/review/regject/:userId

## user

- GET /user/request/received   -get the request the other user send to you
- GET /user/connection - get all the connection of the user

- GET /user/feed -get all the profiles card

