import fastify from "fastify";
import { config } from "dotenv";
config();

const app = fastify();
console.log('Saad');


app.listen({ port: parseInt(process.env.PORT!) });
