import React from "react";
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
import {useRouter} from "next/router";
import {useState} from "react";
import StrapiClient from "../../../lib/strapi-client";

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
    
    const [data, setData] = useState({
            name: '',
            genre: '',
            birthday: '',
            weight: '',
            race: '',
    })
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const strapiClient = new StrapiClient();
        const horses = {
            data
        }
        console.log("data : ", horses)
        await strapiClient.postData(null, "/horses", horses)
          .catch((error) => {
              console.log('An error occurred:', error.response);
          });
        router.push("/admin/pensionnaire")
        
        
    }
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({...data, [name]: value });
    }
    
    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                    <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Fiche Pensionnaire</h4>
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
                                            name: "name",
                                            onChange: (e) => handleChange(e)
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="Genre"
                                        id="gender"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            name: "genre",
                                            onChange: (e) => handleChange(e)
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Date de naissance"
                                        id="birthday-date"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            name: "birthday",
                                            onChange: (e) => handleChange(e)
                                        }}
                                    />
                                </GridItem>

                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Poids"
                                        id="weight"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            name: "weight",
                                            onChange: (e) => handleChange(e)
                                        }}
                                    />
                                </GridItem>

                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Race"
                                        id="race"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            name: "race",
                                            onChange: (e) => handleChange(e)
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter>
                            <Button type="submit" color="primary">Créer le pensionnaire</Button>
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
