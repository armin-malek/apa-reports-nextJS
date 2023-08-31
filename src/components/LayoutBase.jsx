export default function LayoutBase({ children }) {
  return (
    <>
      <main className="pink-theme">
        <div className="container">{children}</div>
      </main>
    </>
  );
}
