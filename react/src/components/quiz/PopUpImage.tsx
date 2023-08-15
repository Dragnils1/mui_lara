import { Button, CardMedia, Popper } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

const PopUpImage = ({name, alt}: {name: string; alt?: string}) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    return(
        <>
            <Button variant="text" aria-describedby={id}  onClick={handleClick}>тут!</Button>
            <Popper id={id + name} open={open} anchorEl={anchorEl}>
                <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                    <CardMedia
                        component="img"
                        height="90%"
                        image={`/images/${name}`}
                        alt={alt ?? 'help image'}
                    />
                </Box>
            </Popper>
        </>
        
    )
}

export default PopUpImage