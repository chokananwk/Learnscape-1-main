import "./globals.css";
import Navbar from "./components/Navbar";
import FloatingMapButton from "./icon-map";
import { AuthProvider } from "./Providers";

export const metadata = {
  title: "Leanscape",
  description: "Learn about local culture through interactive experiences",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <AuthProvider>
          <main>{children}</main>
        </AuthProvider>
        <FloatingMapButton />
      </body>
    </html>
  );
}
