import { Typography } from "@mui/material"
import { FC, ReactNode } from "react"
import { SxProps } from '@mui/system';

interface typologyProps {
    children: ReactNode
    sx?: SxProps<any> | undefined
}

const T: FC<typologyProps> = ({ children, sx }) => {
    return(
        <Typography variant="subtitle1" component="p" sx={{ marginTop: 3, marginButtom: 3, ...sx }}>
            {children}
        </Typography>
    )
}

export default T