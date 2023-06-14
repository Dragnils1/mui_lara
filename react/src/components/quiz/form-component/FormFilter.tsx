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
import { FormInputProps } from "../../../types/formInputProps";


interface CheckBoxProps extends Omit<FormInputProps, 'label'> {
    names_array: string[];
    label: string
}

const useStyles = makeStyles({
  fieldset: {
    paddingLeft: "20px !important",
    paddingTop: "20px !important",
    paddingBottom: "20px !important",
    width: "100%"
  },
  formgroup: {
    marginTop: 25
  },
  selectionheading: {
    color: "#FFBA2C",
    fontWeight: "600 !important",
    fontSize: "18px !important"
  },
  switchcontrol: {
    marginLeft: "0 !important",
    textTransform: "capitalize"
  }
});

const Filter: React.FC<CheckBoxProps> = ({
    name,
    control,
    names_array,
    label
}) => {
  const classes = useStyles();

  const [active, setActive] = useState(false);
  const [checkedState, setCheckedState] = useState(
    new Array(names_array.length).fill(false)
  );

  const handleSwitch = (e: any) => {
    if (e.target.checked) {
      setActive(true);
      setCheckedState(new Array(names_array.length).fill(true));
    } else {
      setActive(false);
      setCheckedState(new Array(names_array.length).fill(false));
    }
  };

  const handleOnChange = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) => {
      return index === position ? !item : item;
    });

    setCheckedState(updatedCheckedState);

    if (updatedCheckedState.includes(false)) {
      setActive(false);
    } else {
      setActive(true);
    }
  };

  return (
    <FormControl component="fieldset" className={classes.fieldset}>
      <FormGroup className={classes.formgroup}>
        <FormLabel component="fieldset">
          <Grid container direction="row" spacing={3} alignItems="center">
            <Grid item>
              <Typography variant="h5" className={classes.selectionheading}>
                {label}
              </Typography>
            </Grid>
            <Grid item>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography>Deselect All</Typography>
                <Switch size="small" checked={active} onChange={handleSwitch} />
                <Typography>Select All</Typography>
              </Stack>
            </Grid>
          </Grid>
        </FormLabel>

        <Grid container>
          {names_array.map((item, index) => {
            return (
              <Grid item sm={4} md={3} key={index}>
                <FormControlLabel
                  className={classes.switchcontrol}
                  control={
                    <Checkbox
                      size="small"
                      name={item}
                      value={item}
                      checked={checkedState[index]}
                      onChange={() => handleOnChange(index)}
                    />
                  }
                  label={item}
                />
              </Grid>
            );
          })}
        </Grid>
      </FormGroup>
    </FormControl>
  );
};

export default Filter;
