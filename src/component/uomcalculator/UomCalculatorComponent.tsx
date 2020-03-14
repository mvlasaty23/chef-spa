import React, { useState } from 'react';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

export default function UomCalculatorComponent() {
  const [fromUom, setFromUom] = useState('kg');
  const handleFromUomChange = (event: React.ChangeEvent<any>) => setFromUom(event.target.value);
  const [toUom, setToUom] = useState('g');
  const handleToUomChange = (event: React.ChangeEvent<any>) => setToUom(event.target.value);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <h1>Unit of Measure Calculator</h1>
      </Grid>
      <Grid item xs={12}>
        <form>
          <TextField id="input-from-amount" label="From" />
          <FormControl>
            <InputLabel id="select-label-from-uom">UoM</InputLabel>
            <Select labelId="select-label-from-uom" id="select-from-uom" value={fromUom} onChange={handleFromUomChange}>
              <MenuItem value={'kg'}>kg</MenuItem>
              <MenuItem value={'g'}>g</MenuItem>
              <MenuItem value={'cups'}>cups</MenuItem>
            </Select>
          </FormControl>
          <TextField id="input-to-amount" label="To" />
          <FormControl>
            <InputLabel id="select-label-to-uom">UoM</InputLabel>
            <Select labelId="select-label-to-uom" id="select-to-uom" value={toUom} onChange={handleToUomChange}>
              <MenuItem value={'kg'}>kg</MenuItem>
              <MenuItem value={'g'}>g</MenuItem>
              <MenuItem value={'cups'}>cups</MenuItem>
            </Select>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
}
