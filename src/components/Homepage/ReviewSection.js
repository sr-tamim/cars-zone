import { Box, styled } from '@mui/system';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import axios from 'axios';
import { Rating } from '@mui/material';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

const Icon = styled('i')(({ theme }) => ({
    color: '#ffffff44', fontSize: '40px', position: 'absolute', left: 40, top: 30
}));

const slideStyles = {
    maxHeight: 300, textAlign: 'justify',
    maxWidth: 400, position: 'relative',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', overflow: 'hidden',
    background: 'radial-gradient(#ff878744,#ff000000)',
    width: '100%', px: 5, py: 6,
}

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


const ReviewSection = () => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const [reviews, setReviews] = React.useState(null);
    const maxSteps = reviews?.length || 0;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    React.useEffect(() => {
        axios.get('https://cars-zone.herokuapp.com/review')
            .then(({ data }) => setReviews(data))
            .catch(err => console.log(err))
    }, [])

    return (reviews &&
        <Box sx={{ display: 'flex', justifyContent: 'center', background: '#00000077', py: 10 }}>
            <Box sx={{
                maxWidth: 700, flexGrow: 1, color: 'white',
                '& > div > div': { alignItems: 'center', }
            }}>
                <AutoPlaySwipeableViews
                    axis={'x'}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents interval={5000}
                >
                    {
                        reviews.map((step, index) => (
                            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}
                                key={step._id}>
                                {Math.abs(activeStep - index) <= 2 ? (
                                    <Box
                                        sx={slideStyles}>
                                        <Rating value={step.rating} readOnly
                                            icon={<StarRoundedIcon
                                                sx={{ color: 'white' }}
                                                fontSize="inherit" />}
                                            emptyIcon={<StarBorderRoundedIcon
                                                style={{ color: 'white', opacity: 0.55 }} fontSize="inherit" />}
                                            sx={{ mb: 3, mt: 1 }}
                                        />
                                        <Typography component="q" fontSize={15} color="#ffffffdd">
                                            {step.review}
                                        </Typography>
                                        <Typography variant="h5" sx={{ my: 3, fontWeight: 'medium' }}>
                                            {step.reviewBy}
                                        </Typography>
                                        <Icon className="fas fa-quote-right" />
                                    </Box>
                                ) : null}
                            </Box>
                        ))
                    }
                </AutoPlaySwipeableViews>
                <MobileStepper
                    sx={{ background: 'transparent', color: 'inherit' }}
                    steps={maxSteps} variant="progress"
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                        <Button
                            size="small"
                            onClick={handleNext}
                            disabled={activeStep === maxSteps - 1}
                            sx={{ color: 'inherit', pr: 1, pl: 2 }}
                        >
                            Next
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowLeft />
                            ) : (
                                <KeyboardArrowRight />
                            )}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}
                            sx={{ color: 'inherit', pl: 1, pr: 2 }}
                        >
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowRight />
                            ) : (
                                <KeyboardArrowLeft />
                            )}
                            Back
                        </Button>
                    }
                />
            </Box>
        </Box>
    );
};

export default ReviewSection;