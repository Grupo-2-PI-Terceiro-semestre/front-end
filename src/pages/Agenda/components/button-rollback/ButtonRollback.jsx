import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { CancelarAgendamento, AtualizarEvento } from '../../services/agendaServices';
import CheckIcon from '@mui/icons-material/Check';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import ErrorIcon from '@mui/icons-material/Error';
import CircularProgress from '@mui/material/CircularProgress';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import { green, red } from '@mui/material/colors';
import { Pilha } from "../../../../utils/Pilha";

export default function ButtonRollback({ refreshDate, data }) {

    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [message, setMessage] = React.useState('Reverter Última Ação');
    const timer = React.useRef(null);

    let pilhaSessao = localStorage.getItem('pilha') ? JSON.parse(localStorage.getItem('pilha')) : null;
    let pilha = new Pilha();

    if (pilhaSessao != null) {
        pilha.pilha = pilhaSessao.pilha;
        pilha.topo = pilhaSessao.topo;
    }

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
        if (pilha.isEmpty()) {
            viewError('Nada Para Reverter');
            return;
        } else {
            let objAcao = pilha.pop();

            if (objAcao.horaAgendamento == null) {
                reverterAgendamento(objAcao.idAgendamento, 'AGENDADO');
            } else {
                reverterAtualizacao(objAcao);
            }

            localStorage.setItem('pilha', JSON.stringify(pilha));
        }
    };

    const reverterAtualizacao = async (objAcao) => {
        setLoading(true);
        setMessage('Aguarde...');
        setError(false);

        try {
            await AtualizarEvento(objAcao);
            viewSuccess('Ação Desfeita');
        } catch (error) {
            viewError('Erro ao Reverter Ação');
        } finally {
            setLoading(false);
        }
    }

    const reverterAgendamento = async (idAgendamento, status) => {
        setLoading(true);
        setMessage('Aguarde...');
        setError(false);

        try {
            await CancelarAgendamento(idAgendamento, status);
            viewSuccess('Ação Desfeita');
        } catch (error) {
            viewError('Erro ao Reverter Ação');
        } finally {
            setLoading(false);
        }
    };

    const viewSuccess = (msg) => {
        setMessage(msg);
        refreshDate(new Date(data));
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
            setMessage('Reverter Última Ação');
        }, 3000);
    }

    const viewError = (msg) => {
        setMessage(msg);
        setError(true);
        setTimeout(() => {
            setError(false);
            setMessage('Reverter Última Ação');
        }, 3000);
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ m: 1, position: 'relative' }}>
                <Tooltip title={message}>
                    <span>
                        <Fab
                            aria-label='save'
                            style={{ marginLeft: '-0.6rem', width: '2.2rem', height: '1rem' }}
                            color='warning'
                            sx={buttonSx}
                            onClick={handleButtonClick}
                        >
                            {success ? (
                                <CheckIcon style={{ color: 'white' }} />
                            ) : error ? (
                                <ErrorIcon style={{ color: 'white' }} />
                            ) : (
                                <KeyboardReturnIcon style={{ color: 'white' }} />
                            )}
                        </Fab>
                    </span>
                </Tooltip>
                {loading && (
                    <CircularProgress
                        size={42.5}
                        sx={{
                            color: green[500],
                            position: 'absolute',
                            top: -2.8,
                            left: -13.5,
                            zIndex: 1,
                        }}
                    />
                )}
            </Box>
        </Box>
    );
}
