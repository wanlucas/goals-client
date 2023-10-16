'use client';

export default function Error({ error }: { error: Error }) {
  return (
    <div>
      <h1>Oops!</h1>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
}
