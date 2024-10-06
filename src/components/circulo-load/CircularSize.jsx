import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import './CircularSize.css';

export default function CircularSize(width, height) {
    return (
        <Stack spacing={2} direction="row" alignItems="center">
            <div className='container-load' style={{ width: width, height: height }}>
                <CircularProgress size="10rem" />
            </div>
        </Stack>
    );
}