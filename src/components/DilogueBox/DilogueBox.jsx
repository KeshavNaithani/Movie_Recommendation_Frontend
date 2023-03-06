import React, { useState, useEffect } from 'react';
import { Typography, Button, ButtonGroup, Grid, Box, CircularProgress, Rating } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material';
import axios from 'axios';
import useStyles from './styles';
import { Modal } from '@mantine/core';
import { useTheme } from '@mui/styles';




function DilogueBox({ modalOpened, setmodalOpened }) {
    const classes = useStyles();
    const theme = useTheme();
    const [image_data, setImg] = useState("");
    const onImageChange = (e) => {
        let res = "";
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = () => {
                res = reader.result //base64encoded string
                setImg(res);
            };
        }
    }

    const handleSubmit = async (e) => {
        let actorName = "";
        let actorId = "";
        let actorPredictUrl = "http://127.0.0.1:5000/classifyImage";
        await axios.post(actorPredictUrl, { "image_data": image_data })
            .then((res) => {
                // console.log("response", res.data[0].class);
                actorName = res.data[0].class;

            })
            .catch((err) => {
                console.log("error", err);
            });
            
        const options = {
            method: 'GET',
            url: 'https://actor-movie-api1.p.rapidapi.com/getid/' + actorName,
            params: { apiKey: '62ffac58c57333a136053150eaa1b587' },
            headers: {
                'X-RapidAPI-Key': '22ae33e488msh9610a5ced3d5892p156733jsnd743c96faaa4',
                'X-RapidAPI-Host': 'actor-movie-api1.p.rapidapi.com'
            }
        };

        await axios.request(options).then(function (response) {
            actorId = response.data[0].actorId;
        }).catch(function (error) {
            console.error(error);
        });

        console.log("actorId", actorId);
        setmodalOpened(false);
        window.location.href = "/actors/" + actorId;

    }



    return (
        <div>
            <Modal
                centered
                className={classes.modal}
                opened={modalOpened}
                onClose={() => setmodalOpened(false)}
                title="Upload Image of Actor To predict his/her identity"
            >
                <div className=''>
                    <input type="file" name="myImage" onChange={onImageChange} />
                </div>
                <div className={classes.buttonContainer}>
                    <Button variant="contained"
                        color={theme.palette.mode === 'dark' ? "error" : "primary"}
                        className={classes.imageButton}
                        onClick={() => handleSubmit()}
                    >
                        Submit
                    </Button>
                </div>
            </Modal>
        </div>
    )

}
export default DilogueBox