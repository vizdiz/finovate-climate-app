import React, { useEffect } from "react"
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { LineChart } from '@mui/x-charts/LineChart';
import * as d3 from "d3";

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
        setEnvironment(newValue);
    
        const weightedData = data.map(d => ({
        ...d,
        weighted_value: newValue * +d.total_score + (1 - newValue) * +d['P/E_to_EPS']
        }));

        weightedData.sort((a, b) => d3.descending(+a.weighted_value, +b.weighted_value));
        
        setData(weightedData);
    };

    const [data, setData] = React.useState(undefined);

    // TODO: modify the file structure so that csv files are available
    // TODO: make the visualization dynamic rather than static
    useEffect(() => {
        const fetchData = async () => {
          try {

            // Load ESG_data.csv
            const esg = await d3.csv("public/esg.csv");
            esg.sort((a, b) => d3.descending(+a.total_score, +b.total_score));
            esg.forEach(d => (d.ticker = d.ticker.toUpperCase()));
    
            // Load financials.csv
            const financials = await d3.csv("public/esg.csv");
            financials.forEach(d => {
              d['P/E_to_EPS'] = +d["Price/Earnings"] / +d["Earnings/Share"];
            });
            financials.sort((a, b) => 
              d3.descending(+a['P/E_to_EPS'], +b['P/E_to_EPS']) || 
              d3.ascending(+a['Market Cap'], +b['Market Cap'])
            );
    
            // Merge datasets
            const mergedData = esg
              .filter(d1 => financials.some(d2 => d1.ticker === d2.ticker))
              .map(d1 => {
                const d2 = financials.find(d => d.ticker === d1.ticker);
                return { ...d1, ...d2 };
              });
    
            mergedData.sort((a, b) => d3.descending(+a['P/E_to_EPS'], +b['P/E_to_EPS']));
    
            // Update state
            setData(mergedData);
            console.log('Loaded');
          } catch (error) {
            console.error("Error loading data:", error);
          }
        };
    
        fetchData();

      }, []); // Run only once when the component mounts    


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
                            aria-label={() => "Environment"}
                            valueLabelDisplay="on"
                            max = {1}/>
                    </Stack>
                </Box>
                <Box sx={{ml: 5, mt: 5, width: 1300, height: 600, border: '4px solid black' }}>
                    <Stack spacing={2} direction="row" sx={{alignItems: 'left', ml: 8, mt: 8}}>
                        <Stack spacing={7} direction="column" sx={{alignItems: 'left', mt: 16}}>
                            <Box sx={{ mt: 8 }} />
                            <Typography fontWeight="bold" variant="h6" sx={{ fontStyle: 'oblique' }}>Stock Name:</Typography>
                            <Typography fontWeight="bold" variant="h6" sx={{ fontStyle: 'oblique' }}>Stock Ticker</Typography>
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

    // return (
    //     <div>
    //       <h1>Data Overview</h1>
    //       <pre>{JSON.stringify(data, null, 2)}</pre>
    //     </div>
    //   );
}

export default Slide;