import "dotenv/config";
import { auth } from "@/lib/auth";

async function seed() {
  const newUser = await auth.api.createUser({
    body: {
      email: "juliozavala@julio-zavala.me",
      password: "Julio-zavala16@",
      name: "Julio Zavala",
      role: "admin",
    },
  });

  console.log("User created:", newUser);
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Error while seeding the user:", err);
    process.exit(1);
  });
