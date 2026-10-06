"use client"; // Error boundaries must be Client Components

export default function Error({ error, reset }) {
  return (
    <div className="error-box">
      <h2 style={{ marginTop: 0 }}>Something went wrong</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
