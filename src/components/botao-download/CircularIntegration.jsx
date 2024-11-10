import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import ErrorIcon from '@mui/icons-material/Error';
import CircularProgress from '@mui/material/CircularProgress';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import { green, red } from '@mui/material/colors';
import Tooltip from '@mui/material/Tooltip';
import { findCSV } from '../../services/exportarServices';

export default function CircularIntegration({ endpoint, path, param }) {
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false); // Estado para o erro
    const timer = React.useRef(null); // Ajustar o timer corretamente

    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
        ...(error && {
            bgcolor: red[500],
            '&:hover': {
                bgcolor: red[700],
            },
        }),
    };

    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const handleButtonClick = () => {
        if (!loading) {
            downloadFile(endpoint, path, param);
        }
    };

    const downloadFile = async (endpoint, path, dataAgendamento) => {
        setLoading(true);
        setError(false);
        try {
            const arquivo = await findCSV(endpoint, { path }, { dataAgendamento });

            if (arquivo.data === undefined) {
                throw new Error('Erro ao baixar o arquivo');
            }

            const dadosString = arquivo.data;

            const blob = new Blob([dadosString], { type: 'text/csv;charset=utf-8;' });
            const downloadUrl = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = 'agendamentos.csv';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 3000);
        } catch (error) {
            setError(true); 
            setTimeout(() => {
                setError(false); 
            }, 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ m: 1, position: 'relative' }}>
                <Tooltip title={success ? "Download completo!" : "Baixar arquivo CSV"}>
                    <span>
                        <Fab
                            aria-label="save"
                            style={{ width: '2.2rem', height: '1rem' }}
                            color="primary"
                            sx={buttonSx}
                            onClick={handleButtonClick}
                        >
                            {success ? (
                                <CheckIcon style={{ color: 'white' }} />
                            ) : error ? (
                                <ErrorIcon style={{ color: 'white' }} />
                            ) : (
                                <DownloadForOfflineIcon style={{ color: 'white' }} />
                            )}
                        </Fab>
                    </span>
                </Tooltip>
                {loading && (
                    <CircularProgress
                        size={41}
                        sx={{
                            color: green[500],
                            position: 'absolute',
                            top: -2,
                            left: -3,
                            zIndex: 1,
                        }}
                    />
                )}
            </Box>
        </Box>
    );
}