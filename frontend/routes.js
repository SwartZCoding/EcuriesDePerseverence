// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import Notifications from "@material-ui/icons/Notifications";

const dashboardRoutes = [
    {
        path: "/dashboard",
        name: "Accueil",
        icon: Dashboard,

        layout: "/admin",
    },
    {
        path: "/users",
        name: "Utilisateurs",
        icon: Person,

        layout: "/admin",
    },
    {
        path: "/pensionnaire",
        name: "Pensionnaires",
        icon: Person,

        layout: "/admin",
    },
    {
        path: "/install",
        name: "Installations",
        icon: BubbleChart,

        layout: "/admin",
    },
    {
        path: "/calendar",
        name: "Calendrier",
        icon: Notifications,

        layout: "/admin",
    },
    {
        path: "/documents",
        name: "Documents",
        icon: LibraryBooks,

        layout: "/admin",
    },
];

export default dashboardRoutes;
