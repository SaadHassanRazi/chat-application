import { FastifyInstance } from "fastify";
import { StreamChat } from "stream-chat";

const streamChat = StreamChat.getInstance(
  process.env.STREAM_API_KEY!,
  process.env.STREAM_PRIVATE_API_KEY!
);

async function userRoutes(app: FastifyInstance) {
  app.post<{ Body: { id: string; name: string; image?: string } }>(
    "/signup",
    async (req, res) => {
      const { id, name, image } = req.body;

      if (id == null || id === "" || name == null || name === "") {
        return res.status(400).send("Id and Name are required");
      }

      try {
        // Check for existing user
        const existingUsers = await streamChat.queryUsers({ id });
        if (existingUsers.users.length > 0) {
          return res.status(400).send("User Id is already taken");
        }

        // Upsert the user
        await streamChat.upsertUser({ id, name, image });
        return res.status(200).send("User created successfully");
      } catch (error) {
        console.error("Error during signup:", error);
        return res.status(500).send("Internal Server Error");
      }
    }
  );
}

export default userRoutes;
