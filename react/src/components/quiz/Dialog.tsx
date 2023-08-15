import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

interface dialogProps {
    children: React.ReactNode
    mainPage?: boolean
    fullScreenDialog?: boolean
}

const ScrollDialog: React.FC<dialogProps> = ({ children, mainPage, fullScreenDialog = false }) => {

    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('body');

    const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef<HTMLElement>(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <>
            {/* <Button onClick={handleClickOpen('paper')}>scroll=paper</Button> */}
            {mainPage ? <Button onClick={handleClickOpen('body')} sx={{ 
                    height: '50px',
                    width: '60%',
                    color: '#fff',
                    backgroundColor:'#f99df0',
                    backgroundImage: 'linear-gradient(155deg, #8768c8, #f99df0)' }}
                    >
                    ЗАПОЛНИТЬ АНКЕТУ
            </Button> : <Button onClick={handleClickOpen('body')}>показать диалоговое окно</Button>}
            
            <Dialog
                open={open}
                fullScreen={fullScreenDialog}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogContent dividers={scroll === 'paper'} 
                    id="scroll-dialog-description"
                    ref={descriptionElementRef}>
                  {children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Закрыть</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}


export default ScrollDialog