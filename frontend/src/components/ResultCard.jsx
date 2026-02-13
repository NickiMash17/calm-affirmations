export default function ResultCard({ affirmation }) {
  if (!affirmation) return null;
  return (
    <section className="card">
      <h2>Your affirmation</h2>
      <p>{affirmation}</p>
    </section>
  );
}

