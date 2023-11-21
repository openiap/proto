const fs = require('fs');
const files = fs.readdirSync('.').filter((file) => file.endsWith('.proto'));
module.exports = {
    // ERQU
    files,
    // Optional
    dist: 'apischema.json',
    // Optional
    formatServicePath: (path) => {
      const responses = path.replace(/\./g, '/').replace('/openiap/FlowService/', '/rest/v1/');
      return responses
    },
    // Optional, will convert long to string by default
    long: 'number',
    // Optional
    // This will merge and overwrite the result parsed from protobuffer file.
    // `paths` will merge by path
    // `components` will merge by component except shcemas
    // customSchema: {
    //   swagger: '2.0',
    //   paths: {
    //     '/api/test': {
    //       get: {
    //         responses: {
    //           200: {
    //             schema: {
    //               $ref: 'GetDataResponse', // Tell me the protobuf message name
    //             },
    //           },
    //         },
    //         params: [],
    //       },
    //     },
    //   },
    //   components: {
    //     securitySchemes: {
    //       cookieAuth: {
    //         type: 'apiKey',
    //         in: 'cookie',
    //         name: 'token',
    //       },
    //     },
    //   },
    //   security: [
    //     {
    //       cookieAuth: [],
    //     },
    //   ],
    // },
    // Optional, you may use this hook to overwrite the original transform result.
    // transform(type, result, args) {
    //   switch (type) {
    //     case 'field': {
    //       const [field, options] = args;
    //       console.log('message field:', field);
    //       console.log('options:', options);
    //       break;
    //     }
    //     case 'message': {
    //       const [message, options] = args;
    //       console.log('message:', message);
    //       console.log('options:', options);
    //       break;
    //     }
    //     case 'enum': {
    //       const [_enum] = args;
    //       console.log('enum:', _enum);
    //       break;
    //     }
    //     case 'service': {
    //       const [service, root, options] = args;
    //       console.log('service:', service);
    //       console.log('proto root:', root);
    //       console.log('options:', options);
    //     }
    //   }
    //   return result;
    // },
  };