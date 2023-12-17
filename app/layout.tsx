import Navbar from "./components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Provider from "./providers/Provider";
import { Toolbar } from "./mui/mui";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PGF",
  description: "Political Governance Framework",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Navbar />
          <Toolbar />
          <div>{children}</div>
        </Provider>
      </body>
    </html>
  );
}
