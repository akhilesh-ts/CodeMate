## auth
- POST /Signup
- POST /login
- POST /logout

## profile
- GET /profile
- PATCH /profile
- PATCH /forgotPassword

## connection request

- POST /request/send/interest/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accept/:userId
- GET  /request/review/regject/:userId

## user

- GET /user/feed -get all the profiles card
- GET /user/connection -get all the connection request
- GET /user/request -get the request the other user send to you
