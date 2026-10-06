"use client";

// CLIENT component: a form that calls a Server Action.
// useActionState gives us the action's result (errors) and a pending flag.

import { useActionState } from "react";
import { postMessage } from "@/app/dashboard/guestbook/actions";

export default function GuestbookForm({ states }) {
  const [state, formAction, pending] = useActionState(postMessage, { ok: false, error: null });

  return (
    <form action={formAction} className="card form">
      <span className="badge client">Client Component + Server Action</span>
      <label>
        Your name
        <input type="text" name="name" maxLength={40} placeholder="e.g. Ahmad" required />
      </label>
      <label>
        Your state
        <select name="state" defaultValue="" required>
          <option value="" disabled>
            Choose a state…
          </option>
          {states.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Message
        <textarea name="text" rows={3} maxLength={200} placeholder="Share a food or place you love…" required />
      </label>
      <div>
        <button type="submit" className="primary" disabled={pending}>
          {pending ? "Posting…" : "Post message"}
        </button>
      </div>
      {state.error && <p className="error-text">{state.error}</p>}
      {state.ok && <p className="muted" role="status">Terima kasih! Your message was posted.</p>}
    </form>
  );
}
