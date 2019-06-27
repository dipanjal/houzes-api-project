# Houzes Socket

## Installation
```npm install```

## Usage
####jQuery
Create Socket Connection with Auth Token
```javascript
let host = '58.84.34.65:3001';
let socket = io(host,{
    query: "token=<access_token>"
});
```
Socket Connection on Success
```javascript
socket.on('connected', userEmail => {
            console.log(userEmail+' connected');
        });
```
Socket Connection on Error
```javascript
socket.on('error', err=>{
            console.log('');
        });
```
Driver To Share Location with Nearby Users
```javascript
socket.emit('location::share',{
    latitude: 23.831735,
    longitude: 90.416504
});
```
Sharing Location on Error
```javascript
socket.on('location::error', err => {
            console.log(err);
        });
```

Track Nearby Drivers' Location
```javascript
socket.on('location::receive', data => {
            console.log(data);
        });
```
See also 
- [Socket.io Android Client](https://github.com/socketio/socket.io-client-java)
- [Socket.io iOS Client](https://github.com/socketio/socket.io-client-swift)
