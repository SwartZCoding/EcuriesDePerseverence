import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import StrapiClient from "../../lib/strapi-client";

import dynamic from 'next/dynamic';

const Calendar = dynamic(() => import("../../components/Calendar/Calendar.js"), {
  ssr: false
});

function Dashboard({ horsesCount, usersCount, installCount }) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="dark" stats icon>
              <CardIcon color="dark">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Pensionnaires</p>
              <h3 className={classes.cardTitle}>{horsesCount}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                A ce jour
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Utilisateurs</p>
              <h3 className={classes.cardTitle}>{usersCount}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                A ce jour
              </div>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="dark" stats icon>
              <CardIcon color="dark">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Installations</p>
              <h3 className={classes.cardTitle}>{installCount}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                A ce jour
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <Calendar/>
    </div>
  );
}

export async function getServerSideProps(context) {
  const client = new StrapiClient();
  const horses = await client.fetchData("/horses");
  const users = await client.fetchData("/users")
  const install = await client.fetchData("/installations")
  let horsesCount = horses.data.length;
  let usersCount = users.length;
  let installCount = install.data.length;


  return { props: { horsesCount, usersCount, installCount } };
}

Dashboard.layout = Admin;

export default Dashboard;
