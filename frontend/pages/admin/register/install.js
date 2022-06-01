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
import {useRouter} from "next/router";
import StrapiClient from "../../../lib/strapi-client";
import {FormControlLabel, MenuItem, Select} from "@material-ui/core";
import MenuList from "@material-ui/core/MenuList";
import SelectInput from "@material-ui/core/Select/SelectInput";
import Checkbox from "@material-ui/core/Checkbox";
import {stringify} from "postcss";

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

function Install() {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const router = new useRouter();
    
    const [install, setInstall] = useState({
        name: '',
        disponibility: true,
    })
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const strapiClient = new StrapiClient();
        console.log("Requête : ", install)
        const data = {
            install
        }
        console.log("data : ", data)
        await strapiClient.postData(null, "/installations", data)
          .catch((error) => {
              console.log('An error occurred:', error.response);
          });
        router.push("/admin/install")
        
        
    }
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "disponibility") {
            setInstall({...install, [name]: e.target.checked });
        } else {
            setInstall({...install, [name]: value });
        }
        
    }
    
    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                    <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Ajouter une installation</h4>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="Nom de l'espace"
                                        id="name"
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
                                    <FormControlLabel
                                      value="start"
                                      control={<Checkbox
                                        checked={install.disponibility}
                                        onChange={(e) => handleChange(e)}
                                        inputProps={{ name: "disponibility" }}
                                      />}
                                      label="Disponibilité : "
                                      labelPlacement="start"
                                    />
                                    {/*<InputLabel id="demo-simple-select">Disponibilité</InputLabel>*/}
                                    {/*<Select*/}
                                    {/*  labelId="demo-simple-select"*/}
                                    {/*  id="demo-simple-select"*/}
                                    {/*  value={install.disponibility}*/}
                                    {/*  label="Disponibilité"*/}
                                    {/*  autoWidth*/}
                                    {/*  name={"disponibility"}*/}
                                    {/*  onChange={(e) => handleChange(e)}*/}
                                    {/*>*/}
                                    {/*    <MenuItem value={"Disponible"} default>Disponible</MenuItem>*/}
                                    {/*    <MenuItem value={"Non Disponible"}>Non Disponible</MenuItem>*/}
                                    {/*</Select>*/}
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter>
                            <Button type="submit" color="primary">Créer une installation</Button>
                        </CardFooter>
                    </Card>
                    </form>
                </GridItem>
            </GridContainer>
        </div>
    );
}


Install.layout = Admin;

export default Install;
