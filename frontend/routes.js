// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Language from "@material-ui/icons/Language";

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
        path: "/installations",
        name: "Installations",
        icon: BubbleChart,

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
