import React from "react";
import Link from "next/link";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import StrapiClient from "../../lib/strapi-client";

const styles = {
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0",
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF",
        },
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: "400",
            lineHeight: "1",
        },
    },
};

function Pensionnaire({ data }) {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Liste des Pensionnaires</h4>
                        <Link href="/admin/register/register-pensionnaire" key="register-pensionnaire">Ajouter un pensionnaire</Link>
                    </CardHeader>
                    <CardBody>
                        <Table
                            tableHeaderColor="primary"
                            tableHead={["Nom", "Sexe", "Date de naissance", "Poids", "Race"]}
                            tableData={data}
                        />
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}

export async function getServerSideProps(context) {
    const client = new StrapiClient();
    const horses = await client.fetchData("/horses");
    console.log(horses);
    let data = [];
    for (let i in horses.data) {
        data.push([horses.data[i].attributes.name, horses.data[i].attributes.genre, horses.data[i].attributes.birthday, horses.data[i].attributes.weight + " kg", horses.data[i].attributes.race]);
    }
    console.log(data);
    return { props: { data } };
}

Pensionnaire.layout = Admin;

export default Pensionnaire;
