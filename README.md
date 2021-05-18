## Requirements

* Render the results of a custom PostgreSQL Query.
* Receive data through a POST, parse and validate the input before sending it to database or external service.
* Fetch data from another HTTP source and consume it before rendering a GET request.
* Send asynchronous notifications to clients connected via websocket
* Execute asynchronous jobs and implement aynchronous API calls using a POST request.
## Fastify

* Seems less oppinionated than Rails, but follows the same footsteps. It is built mostly around JSON schema, but it also provides logging, routing and a middleware interface.
* Typescript support [out of the box](https://github.com/fastify/fastify/blob/master/docs/TypeScript.md).
* Simple endpoint such as `/health` could be implemented in a matter of minutes.
* Packages can be found [in this page](https://www.fastify.io/ecosystem/) and [in the main repo](https://github.com/fastify/fastify/blob/master/docs/Ecosystem.md#core).
* [PostgreSQL connector](https://github.com/fastify/fastify-postgres) is first-class and well maintened.

## Meteor

* Very oppinionated designed around the concept of a transparent storage based on MongoDB.
* Typescript support uses a [community package](https://github.com/Meteor-Community-Packages/meteor-typescript/).
* Very straight-forward endpoints such as `/health` are not very quick to implement out of the box.
* Packages can be found at https://atmospherejs.meteor.com/
* Packages related to [PostgreSQL](https://github.com/numtel/meteor-pg/) [are](https://github.com/EndyKaufman/meteor-postgres/) [all](https://github.com/storeness/meteor-postgres/) [abandonware](https://github.com/meteor-stream/meteor-postgres/)[.](https://github.com/numtel/meteor-pg-server/)
* The official documentation does not mention SQL databases neither GraphQL, although [this blog post](https://blog.meteor.com/reactive-graphql-d78d307bbcbb) mentions Apollo.

## PostgREST

* Exposes too much information about the database implementation.
* Remove some control from the main code-base, so the developer would have to know details about PostgREST interface and perhaps even some implementation details. Filtering data according to which user is logged in comes to mind.
* Any sophisticated use of user privileges in the PostgREST world can get quite deep in the database role system, which is greatly limited on some PostgreSQL as a service providers (Heroku I'm looking at you).
* Data validation and input parsing is relegated entirely to the database. This could work in a 100% event sourced system, but in this case the stack is defining the architecture :(

## Deno (through Aleph.js)

* It seems to get a lot of things right from the past node.js mistakes (as expected)
* Native typescript rocks!
* Still not ripe for every scenario, several libraries are still in an experimental stage or dead
* It would require a lot of good will to own the stack in case some libraries get dropped