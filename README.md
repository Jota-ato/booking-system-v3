# Next.js 16 template

The most important resource of every person is their time. Their is no doubt. Losing 15 minutes installing and configuring the same things takes down your workflow and inspiration.

This template was build to simplify that. Most of my work is with the same stack so I use this resources a lot.

---

## Stack

As the title says, it is for Next.js; specially for the 16.0 version (the most advanced to this day August 1st 2026).
But that is not the only modern technology.

- `Drizzle ORM`: For managing the backend I'll use drizzle, its simple, fast and eficcient; combined with Neon for free hosting and postgrSQL.
- `Better-auth`: Mananing safe sign-in, sign-up, password recovery, external providers, etc.
- `Shadcn`: Beautiful styled and editable components, simplifies lots of things.

---

## Features

Is based on **feature based** architecture. All in `/src` but separate on its own `features/*/**`.
Includes helpers for server actions.

### Errors.ts

Its located on `/src/shared/lib/errors.ts`. Declares a custom class called AppError, this helps displaying use-full error messages, its and extension of the default Error instance, you can customize it! When writing functions use this instead of _Error()_

```ts
import { AppError } from "@/shared/lib/errors";

export const myFunction = (params: any) => {
  const error = true;

  if (error) throw new AppError("Something went work!!");
};
```

### Actions.ts

One of the most crucial features of Next.js are the server actions, which allows you to communicate safely from the client to the server. The template includes helpers for this too!

Most of the logic in your actions will repeat, so it's a good practice to wrap your actions to simplify them. I only added 1 action wrapper: the `logInAction`. It's design to be used only by auth users, if someone doesn't have a session the action triggers an error using the AppError class.

```ts
"use server";

import { logInAction } from "@/shared/lib/actions";

export const action = logInAction(async () => {
  // If the user is log in the action works, if not an error will occur

  console.log("Do something...");
});
```

### client-actions.ts

Lastly, client-actions.ts. This helps you notify the user something. When you call your server actions from a client component use the function `showResponse()` to display a toast to the user. It already discriminate when its and error or a success.

```tsx
"use client";
import { serverAction } from "@/actions"; // Generic route, use your feature based route

export function MyComponent() {
  const action = async () => {
    showResponse(await serverAction());
  };

  return (
    <div>
      <button onClick={action}>Display the toast!</button>
    </div>
  );
}
```
