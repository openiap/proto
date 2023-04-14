# OpenIAP offical proto3 defenition

NodeJS client: [repo](https://github.com/openiap/nodeapi) [doc](https://openiap.github.io/nodeapi/)
Browser client: [repo](https://github.com/openiap/jsapi) [vue3 example](https://github.com/openiap/vue3-web-template)
Python client: [repo](https://github.com/openiap/pyapi) [doc](https://openiap.github.io/nodeapi/)

## Basic usage
We use proto3 as a base protocol in OpenAIP flow and the layer that on top of other transportation protocols.
The goal has been to create a protool that is easy to pass and implement over any transport that support streaming data.
For this reason, all messages are wrapped in an envelop message to add transport consistency.

All meesages require the current connection to be authenticated sending a SigninRequest first.
In nodejs that would look something like this
```
const signinmessage = SigninRequest.create();
signinmessage.username = "henrik"
signinmessage.password = "SuperSecretPassword"
signinmessage.agent = "node"
signinmessage.version = "1.0.0"
signinmessage.longtoken = false
signinmessage.ping = true
signinmessage.validateonly = false
const data = Any.create({type_url: "type.googleapis.com/openiap.SigninRequest", value: SigninRequest.encode(signinmessage).finish()})
const envelope = Envelope.create({ command: "signin", data, jwt: opt.jwt });
```
We can now send this enveloper over any transport protocol, like GRPC, WebSocket, REST, named pipes or even raw TCP sockets
