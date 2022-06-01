import React, {useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import avatar from "assets/img/faces/marc.jpg";
import StrapiClient from "../../../lib/strapi-client";
import axios from "axios";
import {setCookie} from "nookies";
import {useRouter} from "next/router";

const styles = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0",
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
    },
};

function AddUserPage() {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const router = new useRouter();
    
    const [userData, setUserData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        address: '',
    })
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        userData.username = `${userData.firstName} ${userData.lastName}`
        console.log("userData : ", userData)
        const strapiClient = new StrapiClient();
        await strapiClient.postData(null, "/users", userData)
          .catch((error) => {
              console.log('An error occurred:', error.response);
          });
        router.push("/admin/users")
        
        
    }
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({...userData, [name]: value });
    }
    
    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                    <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Fiche Utilisateur</h4>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="Prénom"
                                        id="first-name"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            name: "firstName",
                                            onChange: (e) => handleChange(e)
                                        }}
                                        
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="Nom de Famille"
                                        id="last-name"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            name: "lastName",
                                            onChange: (e) => handleChange(e)
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Adresse Mail"
                                        id="email"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            name: "email",
                                            onChange: (e) => handleChange(e)
                                        }}
                                    />
                                </GridItem>

                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Mot de passe"
                                        id="password"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: "password",
                                            name: "password",
                                            onChange: (e) => handleChange(e)
                                        }}
                                    />
                                </GridItem>

                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Numéro de Téléphone"
                                        id="phone"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            name: "phone",
                                            onChange: (e) => handleChange(e)
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Adresse"
                                        id="address"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            name: "address",
                                            onChange: (e) => handleChange(e)
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter>
                            <Button type="submit" color="primary">Créer le compte</Button>
                        </CardFooter>
                    </Card>
                    </form>
                </GridItem>
            </GridContainer>
        </div>
    );
}

AddUserPage.layout = Admin;

export default AddUserPage;
