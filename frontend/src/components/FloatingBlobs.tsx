export default function FloatingBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      <div className="floating-blob blob-1" style={{ top: "10%", left: "12%" }} />
      <div className="floating-blob blob-2" style={{ top: "60%", right: "10%" }} />
      <div className="floating-blob blob-3" style={{ bottom: "12%", left: "45%" }} />
    </div>
  );
}
