"use server";

// SERVER ACTION: runs on the server when the guestbook form is submitted.

import { revalidatePath } from "next/cache";
import { addMessage, getStateSlugs } from "@/lib/storage";

export async function postMessage(prevState, formData) {
  const name = String(formData.get("name") ?? "").trim();
  const state = String(formData.get("state") ?? "");
  const text = String(formData.get("text") ?? "").trim();

  if (!name || !text) {
    return { ok: false, error: "Please fill in your name and a message." };
  }
  if (text.length > 200) {
    return { ok: false, error: "Messages can be at most 200 characters." };
  }
  if (!getStateSlugs().includes(state)) {
    return { ok: false, error: "Please choose a state." };
  }

  await addMessage({ name: name.slice(0, 40), state, text });
  revalidatePath("/dashboard/guestbook"); // show the new message
  revalidatePath("/dashboard"); // update the message count
  return { ok: true, error: null };
}
