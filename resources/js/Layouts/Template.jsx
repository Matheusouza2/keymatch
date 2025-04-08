import Navbar from "@Layouts/Navbar";
import { ThemeProvider } from "flowbite-react";
import baseTheme from "@Themes/Index";

export default function Template({ title = "", showSidebar = true, children }) {

    return (
        <ThemeProvider theme={baseTheme}>
            <div className="antialiased bg-gray-200 min-h-screen">

                <div className="pb-10">
                    {children}
                </div>

                <Navbar />
            </div>
        </ThemeProvider>
    );
}
