import React from "react"
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

const Slide = (props) => {
    const [environment, setEnvironment] = React.useState(props.defaultEnvironment);
    const [price, setPrice] = React.useState(props.defaultPrice);
    // const [width, setWidth] = useState(window.innerWidth);

    // useEffect(() => {
    //     const handleResize = () => setWidth(window.innerWidth);
    //     window.addEventListener("resize", handleResize);
    //     return () => window.removeEventListener("resize", handleResize);
    // }, []);

    const handlePrice = (event, newValue) => {
        setPrice(newValue);
    };

    const handleEnvironment = (event, newValue) => {
        setEnvironment(newValue)
    };

    return <div>
                <Box sx = {{mt: 8, width: 1300, alignItems: 'left'}}>
                    <Stack spacing={4} direction="row" sx={{alignItems: 'left', ml: 8}}>
                        <Typography variant="h5">Price</Typography>
                        <Slider 
                            value = {price}
                            onChange={handlePrice}
                            aria-label="Price" 
                            valueLabelDisplay="on"/>
                        <Typography variant="h5">Environmental Preference</Typography>
                        <Slider
                            value = {environment}
                            onChange={handleEnvironment}
                            aria-label="Environment" 
                            valueLabelDisplay="on"
                            max = {1}/>
                    </Stack>
                </Box>

                <Box sx={{ml: 5, mt: 5, width: 1300, height: 600, border: '4px solid black' }}></Box>
            </div>;
}

export default Slide;