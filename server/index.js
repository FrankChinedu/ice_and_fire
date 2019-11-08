const { app }  = require('./app');

const PORT = process.env.PORT || 4000;

//listen for request 
app.listen(PORT, function () {
  console.log(`listening in port ${PORT}`);
});