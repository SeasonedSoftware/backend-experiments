## Fastify

* Seems less oppinionated than Rails, but follows the same footsteps. It is built mostly around JSON schema.
* Simple endpoint such as `/health` could be implemented in a matter of minutes.
* Packages can be found [in this page](https://www.fastify.io/ecosystem/) and [in the main repo](https://github.com/fastify/fastify/blob/master/docs/Ecosystem.md#core).
* [PostgreSQL connector](https://github.com/fastify/fastify-postgres) is first-class and well maintened.

## Meteor

* Very oppinionated designed around the concept of a transparent storage based on MongoDB
* Very straight-forward endpoints such as `/health` are not very quick to implement out of the box.
* Packages can be found at https://atmospherejs.meteor.com/
* Packages related to [PostgreSQL](https://github.com/numtel/meteor-pg/) [are](https://github.com/EndyKaufman/meteor-postgres/) [all](https://github.com/storeness/meteor-postgres/) [abandonware](https://github.com/meteor-stream/meteor-postgres/)[.](https://github.com/numtel/meteor-pg-server/)
* The official documentation does not mention SQL databases neither GraphQL, although [this blog post](https://blog.meteor.com/reactive-graphql-d78d307bbcbb) mentions Apollo.