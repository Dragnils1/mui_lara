import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Controller } from 'react-hook-form';
import { FormInputProps } from '../../../types/formInputProps';


interface CheckBoxProps extends Omit<FormInputProps, 'label'> {
    names_array: string[];
    label: string
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const MultipleSelectCheckmarks: React.FC<CheckBoxProps> = ({
    name,
    control,
    names_array,
    label
}) => {

  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }} >
        <InputLabel id={"demo-multiple-checkbox-label" + label}>{label}</InputLabel>
        <Controller
            control={control}
            name={name}
            render={
                ({ field: { onChange, value } }) => (

                    <Select
                        labelId={"demo-multiple-checkbox-label-" + label}
                        id={"demo-multiple-checkbox" + label}
                        multiple
                        value={personName}
                        onChange={(e) => {
                            handleChange(e)
                            onChange(e)
                        }}
                        input={<OutlinedInput label={label} />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                        >
                        {names_array.map((name, index) => (
                            <MenuItem key={'form_' + name + index}  value={name}>
                                <Checkbox id={'form_' + name + index} checked={personName.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                    </Select>
            )}
        />

      </FormControl>
    </div>
  );
}


export default MultipleSelectCheckmarks;
