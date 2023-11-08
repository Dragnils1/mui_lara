import { styled } from "@mui/system";

const StyledForm = styled("form")({
    // border: '1px dashed grey',
    textAlign: "center",
    // width: '800px',
    backgroundColor: "white",
    minHeight: "700px",
    borderRadius: "10px",
    "& > div": {
        border: "1px solid rgb(80, 61, 122)",
        borderRadius: "8px",
        // margin: '0 2%',
        // width: '95%'
    },
    "& > div > label.MuiFormLabel-filled": {
        display: "none",
    },
    "& > div > label.css-1sumxir-MuiFormLabel-root-MuiInputLabel-root": {
        display: "none",
    },
});

export default StyledForm;