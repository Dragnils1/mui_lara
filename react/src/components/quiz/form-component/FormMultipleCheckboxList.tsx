import React, { useState } from "react";
import {
  Grid,
  Typography,
  FormGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Switch,
  Stack,
  Checkbox
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Controller } from "react-hook-form";
import { FormInputProps } from "../../../types/formInputProps";
import { pink } from "@mui/material/colors";

interface CheckBoxProps extends Omit<FormInputProps, 'label'> {
    names_array: string[];
}

const useStyles = makeStyles({
  fieldset: {
    marginTop: "20px !important",
    marginBottom: "5px !important",
    width: "100%"
  },
  selectionheading: {
    color: "#FFBA2C",
    fontWeight: "600 !important",
    fontSize: "18px !important"
  },
  switchcontrol: {
    textTransform: "capitalize",
    border: '1px, solid, rgb(103 38 255)',
    color: 'white',
    borderRadius: '5px',
    backgroundColor: '#8768c8',
    marginTop: '5px',
    marginBottom: '5px',
    width: 'calc(50% - 10px)'
  }
});

const FormMultipleCheckboxList: React.FC<CheckBoxProps> = ({
    name,
    control,
    names_array,
}) => {
  const classes = useStyles();

  const [checkedState, setCheckedState] = useState(
    new Array(names_array.length).fill(false)
  );


  const handleOnChange = (checked: boolean, value: any, position: number, callback: any) => {
    const updatedCheckedState = checkedState.map((item, index) => {
      return index === position ? (checked ? value : checked) : item
    });

    setCheckedState(updatedCheckedState);
    callback(updatedCheckedState.filter(e => !!e))
  };


  return (
    <FormControl component="fieldset" className={classes.fieldset}>

    <Controller
        control={control}
        name={name}
        render={
            ({ field: { onChange, value } }) => (
                <FormGroup >

                    <Grid container>
                    {names_array.map((item, index) => {

                        return (
                            <FormControlLabel
                                key={'form-controller' + item + index}
                                className={classes.switchcontrol}
                                labelPlacement="start"
                                label={item}
                                // value={item}
                                // sx={{
                                //     border: ['1px', 'solid', 'rgb(103 38 255)'],
                                //     color: 'white',
                                //     borderRadius: '5px',
                                //     backgroundColor: '#8768c8',
                                //     marginTop: '5px',
                                //     marginBottom: '5px',
                                //     width: 'calc(50% - 10px)'
                                // }}
                                // sx={{ border: ['1px', 'solid', pink[300]], backgroundColor: '#8768c8', width: 'calc(50% - 10px)' }}
                                control={
                                    <Checkbox
                                        // size="small"
                                        // name={item}
                                        id={'form_' + item + name + index}
                                        value={item}
                                        checked={checkedState[index]}
                                        onChange={(e) => {
                                            handleOnChange(e.target.checked, item, index, onChange)
                                        }}
                                />
                            }

                            />
                        );
                    })}
                    </Grid>
                </FormGroup>
            )
        }

    />
    </FormControl>
  );
};

export default FormMultipleCheckboxList;


{/* <FormControlLabel
key={option + name}
value={option ?? ' '}
sx={{
    border: ['1px', 'solid', 'rgb(103 38 255)'],
    color: 'white',
    borderRadius: '5px',
    backgroundColor: '#8768c8',
    margin: '5px',
    width: 'calc(50% - 10px)'
}}
label={option}
labelPlacement="start"
onChange={onChange}
control={<Radio checked={value === option} />}
/> */}
