import { z } from "zod";

async function checkIfExists(username: string): Promise<boolean> {
  // Simulates a database query ...
  return false;
}

const UsernameSchema = z.string().refine(
  async (username) => {
    const exists = await checkIfExists(username);
    return !exists;
  },
  { message: "This username already exists." }
);
