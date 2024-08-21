import { FastifyInstance } from "fastify";
import { StreamChat } from "stream-chat";
const streamChat = StreamChat.getInstance(
  process.env.STREAM_API_KEY!,
  process.env.STREAN_PRIVATE_API_KEY!
);
async function userRoutes(app: FastifyInstance) {
  app.post<{ Body: { id: string; name: string; image?: string } }>(
    "/signup",
    async (req, res) => {
      const { id, name, image } = req.body;
      if (id == null || id == "" || name == null || name == "") {
        return res.status(400).send();
      }
      //TODO: check for existing user
      const existingUsers = await streamChat.queryUsers({ id });
      if (existingUsers.users.length > 0) {
        return res.status(400).send("User Id is already taken");
      }

      await streamChat.upsertUser({ id, name, image });
    }
  );
}

export default userRoutes;
