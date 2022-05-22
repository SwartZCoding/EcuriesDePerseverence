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

function Pensionnaire() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Liste des Utilisateurs</h4>
            <Link href="/admin/register/register-user" key="register-user">Ajouter un utilisateur</Link>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Nom", "Prénom", "Rôle", "Email", "Numéro de téléphone"]}
              tableData={[
                ["Dakota Rice", "Niger", "Admin", "test@gmail.com", "0606060606"],
                ["Minerva Hooper", "Curaçao", "Professionnel", "test@gmail.com", "0606060606"],
                ["Sage Rodriguez", "Netherlands", "Professionnel", "test@gmail.com", "0606060606"],
                ["Philip Chaney", "Korea, South", "Utilisateur", "test@gmail.com", "0606060606"],
                ["Doris Greene", "Malawi", "Utilisateur", "test@gmail.com", "0606060606"],
                ["Mason Porter", "Chile", "Utilisateur", "test@gmail.com", "0606060606"],
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

Pensionnaire.layout = Admin;

export default Pensionnaire;
