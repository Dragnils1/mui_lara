import { Button } from "@mui/material"

const FileInput = ({ name }: {name: string}) => {
    return(
        <>
            <Button
                variant="contained"
                component="label"
            >
                Upload File
                <input
                    type="file"
                    name={name}
                    hidden
                />
            </Button>

        </>
    )
}

export default FileInput