import React from "react";
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
import Link from "next/link";
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

function Installations({ data }) {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Liste des Installations</h4>
                        <Link href="/admin/register/install" key="register-install">Ajouter une installation</Link>
                    </CardHeader>
                    <CardBody>
                        <Table
                            tableHeaderColor="primary"
                            tableHead={["Nom", "Disponibilité"]}
                            tableData={data}
                        />
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}

export async function getServerSideProps(ctx) {
    const client = new StrapiClient();
    const install = await client.fetchData(ctx, "/installations");
    console.log(install);
    const nothing = "Aucune donnée";
    let data = [];
    for (let i in install.data) {
        data.push([install.data[i].attributes.name, install.data[i].attributes.disponibility === true ? "Disponible" : "Non Disponible"]);
    }

    if(data.length === 0) {
        data.push([nothing, nothing]);
    }

    return { props: { data } };
}

Installations.layout = Admin;

export default Installations;
