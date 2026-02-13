export default function FloatingBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      <div className="floating-blob blob-1" style={{ top: '10%', left: '5%' }} />
      <div className="floating-blob blob-2 hidden sm:block" style={{ top: '60%', right: '8%' }} />
      <div className="floating-blob blob-3 hidden sm:block" style={{ bottom: '15%', left: '40%' }} />
    </div>
  );
}
