import { Typography } from "@mui/material"
import { FC } from "react"
import { SxProps } from '@mui/system';

const T: FC<{ sx?: SxProps<any> | undefined }> = ({ children, sx }) => {
    return(
        <Typography variant="subtitle1" component="p" sx={{ marginTop: 3, marginButtom: 3, ...sx }}>
            {children}
        </Typography>
    )
}

export default T