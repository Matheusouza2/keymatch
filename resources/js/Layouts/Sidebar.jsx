import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { SidebarTheme } from "@Themes/Sidebar";
import { RiDashboardFill } from "react-icons/ri";
import { FaUsers, FaUsersCog } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { BsFillCalendarRangeFill } from "react-icons/bs";
import { FaBalanceScale } from "react-icons/fa";

const sidebarItems = [
    {
        title: "Painel",
        icon: RiDashboardFill,
        href: "/painel",
    },
    {
        title: "Clientes",
        icon: FaUsers,
        href: "/clientes",
    },
    {
        title: "Financeiro",
        icon: FaFileInvoiceDollar,
        href: "/financeiro",
    },
    /* {
        title: "Ações Judiciais",
        icon: FaBalanceScale,
        href: "/instrumentacao",
    }, */
    {
        title: "Agenda",
        icon: BsFillCalendarRangeFill,
        href: "/agenda",
    },
    {
        title: "Usuários",
        icon: FaUsersCog,
        href: "/usuarios",
    },
];


export function SidebarComponent() {

    const path = window.location.pathname;

    return (
        <Sidebar theme={SidebarTheme}>
            <SidebarItems>
                <SidebarItemGroup>
                    {sidebarItems.map((item, index) => (
                        <SidebarItem key={index} icon={item.icon} href={item.href} active={item.href == path}>
                            <span className="max-sm:hidden">{item.title}</span>
                        </SidebarItem>
                    ))}
                </SidebarItemGroup>
            </SidebarItems>
        </Sidebar>
    );
}
