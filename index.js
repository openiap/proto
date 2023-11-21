const express = require('express');
const app = express();

app.use(express.static(__dirname));
app.use(express.json());


const schema = require('./apischema.json');
app.post('/*', (req, res) => {
  const urlPath = req.path;
  const path = schema.paths[urlPath]?.post;
  if(!path) {
    return res.status(404).send('Path not found in schema');
  }
  const response = path.responses[200];
  const _schema = response.content['*/*'].schema;
  const responseschema = schema.components.schemas[_schema.$ref.replace('#/components/schemas/', '')];
  var reply = {};
  var keys = Object.keys(responseschema.properties);
  for(let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const prop = responseschema.properties[key];
    if(prop.type === 'string') {
      reply[key] = key + " goes here";
    } else if(prop.type === 'integer' || prop.type === 'number') {
      reply[key] = 1;
    } else if(prop.type === 'boolean') {
      reply[key] = true;
    } else if(prop.type == null) {
      reply[key] = "a " + prop.$ref.replace('#/components/schemas/', '') + " goes here";
    } else {
      reply[key] = "a " + prop.type + " goes here";
    }

    
  }

  return res.json(reply);

});

app.listen(3000);
console.info('Served at port 3000');