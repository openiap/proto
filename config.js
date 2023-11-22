const fs = require('fs');
const files = fs.readdirSync('.').filter((file) => file.endsWith('.proto'));
module.exports = {
  files,
  dist: 'apischema.json',
  formatServicePath: (path) => {
    const responses = path.replace(/\./g, '/').replace('/openiap/FlowService/', '/rest/v1/');
    return responses
  },
  // Optional, will convert long to string by default
  long: 'number',
  customSchema: {
    // swagger: '2.0',
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "OpenIAP api",
      description: "OpenAPI for openflow. Allow you to work directly with mongodb and amqp message queues",
      license: {
        name: "MPL-2.0",
        url: "https://github.com/open-rpa/openflow/blob/master/LICENSE"
      },
      termsOfService: "https://openiap.io/terms",
      privacyPolicy: "https://openiap.io/privacy"
    },
    // paths: {
    // },


    components: {
      securitySchemes: {
        OAuth2: {
          type: 'oauth2'
        }
      }
    },
    security: [
      {
        OAuth2: [],
      },
    ],
  },
  transform(type, result, args) {
    // field | message | enum | service
    if (type === 'service') {
      const servicekeys = Object.keys(result);
      for (let x = 0; x < servicekeys.length; x++) {
        const path = servicekeys[x];
        const removeendpoints = [
          "/rest/v1/SetupStream",
          "/rest/v1/Signin",
          "/rest/v1/Download",
          "/rest/v1/Upload",
          "/rest/v1/Watch",
          "/rest/v1/UnWatch",
          "/rest/v1/RegisterQueue",
          "/rest/v1/UnRegisterQueue",
          "/rest/v1/RegisterExchange",
          
          
        ]
        if (removeendpoints.includes(path)) {
          delete result[path];
          continue;
        }
        const getpoints = [
          // "/rest/v1/ListCollections",
        ]

        // console.log('servicekey'. servicekey);
        console.log('servicekey', path);
        const service = result[path];
        const methodkeys = Object.keys(service);
        for (let y = 0; y < methodkeys.length; y++) {
          const methodkey = methodkeys[y];
          const method = service[methodkey];
          method.operationId =  method.operationId.replace("openiap.FlowService.", "");
          method.security = [
            {
              OAuth2: [],
            },
          ];
          method["is_consequential"] = false;
          for(let i = 0; i < method.parameters.length; i++) {
            const param = method.parameters[i];
            // console.log(param.in); // body/path/query
            param.required = true;
          }
          if (getpoints.includes(path) && method != "get") {
            service["get"] = method;
            delete service[methodkey];
          }

        }
      }
    }
    return result;
  }
};