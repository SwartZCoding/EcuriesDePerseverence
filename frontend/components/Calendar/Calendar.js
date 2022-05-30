import React from "react";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"
import StrapiClient from "../../lib/strapi-client";

function Calendar({ eventList }) {

    return (
        <FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin ]}
            initialView="dayGridMonth"
            locale='fr'
            weekends={true}
            nowIndicator={true}
            events={eventList}
        />
        );
}

export async function getServerSideProps(context) {
    const client = new StrapiClient();
    const events = await client.fetchData("/calandars");
    let eventList = events.data;

    console.log("Salut");
    console.log(eventList);

    return { props: { eventList } };
}

export default Calendar;