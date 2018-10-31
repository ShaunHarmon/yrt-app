//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/yrt-realtime'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/yrt-realtime/index.html'));
});


app.listen(process.env.PORT || 8080);