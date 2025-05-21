import Fastify from "fastify";
import { getRandomWord } from "./client/wordRandom.js";
import { validateWord } from "./client/wordValidator.js";

const fastify = Fastify();

fastify.get('/getRandomWord', async (request, reply) => {
    const word = await getRandomWord('words.txt');
    return word;
});

fastify.get('/validateWord', async (request, reply) => {
    const { word } = request.query;
    const result = await validateWord('words.txt', word);
    return result;
})

const start = async () => {
    await fastify.listen({ port: 5000 });
}
start();