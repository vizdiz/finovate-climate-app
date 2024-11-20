import React from "react"
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { LineChart } from '@mui/x-charts/LineChart';

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
                            aria-label={() => "Price" }
                            valueLabelDisplay="on"
                            max = {354}/>
                        <Typography variant="h5">Environmental Preference</Typography>
                        <Slider
                            value = {environment}
                            onChange={handleEnvironment}
                            aria-label="Environment" 
                            valueLabelDisplay="on"
                            max = {1}/>
                    </Stack>
                </Box>

                <Box sx={{ml: 5, mt: 5, width: 1300, height: 600, border: '4px solid black' }}>
                    <Stack spacing={2} direction="row" sx={{alignItems: 'left', ml: 8, mt: 8}}>
                        <Stack spacing={7} direction="column" sx={{alignItems: 'left', mt: 16}}>
                            <Box sx={{ mt: 8 }} />
                            <Typography fontWeight="bold" variant="h6" sx={{ fontStyle: 'oblique' }}>Stock Name:</Typography>
                            <Typography fontWeight="bold" variant="h6" sx={{ fontStyle: 'oblique' }}>Stock Ticker:</Typography>
                            <Typography fontWeight="bold" variant="h6" sx={{ fontStyle: 'oblique' }}>Environment Grade:</Typography>
                            <Typography fontWeight="bold" variant="h6" sx={{ fontStyle: 'oblique' }}>Social Grade:</Typography>
                            <Typography fontWeight="bold" variant="h6" sx={{ fontStyle: 'oblique' }}>Governance Grade:</Typography>
                        </Stack>
                        <LineChart
                            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                            series={[
                                {
                                data: [2, 5.5, 2, 8.5, 1.5, 5],
                                },
                            ]}
                            width={800}
                            height={500}
                        />
                    </Stack>
                </Box>
            </div>;
}

export default Slide;