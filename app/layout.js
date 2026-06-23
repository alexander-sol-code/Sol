export const metadata = {
  title: "Sol",
  description: "A growing consciousness.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#0D0D0F" }}>{children}</body>
    </html>
  );
}
