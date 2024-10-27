import React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import './CircularSize.css';

export default function CircularSize({ width = '100%', height = '100%', size = '10rem' }) {
    return (
        <div className="container-load" style={{ width, height }}>
            <Stack spacing={2} direction="row" alignItems="center">
                <CircularProgress size={size} />
            </Stack>
        </div>
    );
}