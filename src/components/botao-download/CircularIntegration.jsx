import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import CircularProgress from '@mui/material/CircularProgress';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import { green } from '@mui/material/colors';
import Tooltip from '@mui/material/Tooltip';

export default function CircularIntegration() {
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef < setTimeout > undefined > (undefined);
    const [fileUrl, setFileUrl] = React.useState('');

    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const downloadFile = async () => {
        setLoading(true);
        try {
            const url = 'https://gedbatchqa.unimed.coop.br/ged/v1/public/download/autorizacao/e2b2ef8b9a2c420395b3a4c374b129fd';  // Substitua pela URL real do arquivo CSV
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Erro ao baixar o arquivo');
            }

            const blob = await response.blob(); // Recebe o arquivo como blob
            const downloadUrl = URL.createObjectURL(blob); // Cria uma URL para o arquivo
            setFileUrl(downloadUrl); // Armazena a URL do arquivo para download

            setSuccess(true);

            timer.current = setTimeout(() => {
                setSuccess(false);
            }, 5000); 
        } catch (error) {
            console.error('Erro no download:', error);
        } finally {
            setLoading(false); // Finaliza o estado de carregamento
        }
    };

    const handleButtonClick = () => {
        if (!loading) {
            downloadFile();
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
                                <a href={fileUrl} download="arquivo.csv" style={{ color: 'white' }}>
                                    <CheckIcon />
                                </a>
                            ) : (
                                <a href={fileUrl} download="arquivo.csv" style={{ color: 'white' }}>
                                <DownloadForOfflineIcon />
                                </a>
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
                            top: -1.8,
                            left: -2,
                            zIndex: 1,
                        }}
                    />
                )}
            </Box>
        </Box>
    );
}