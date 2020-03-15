import { FormControl, Grid, IconButton, MenuItem, Select, TextField } from '@material-ui/core';
import { Autorenew } from '@material-ui/icons';
import React, { useState } from 'react';

interface UnitOfMeasure {
  id: string;
  short: string;
  long: string;
  baseUom: string;
  baseFactor: number;
  system: 'metric' | 'nonmetric';
  category: string;
}
const uoms: UnitOfMeasure[] = [
  {
    id: 'g',
    short: 'g',
    long: 'Gramm',
    baseUom: 'g',
    baseFactor: 1,
    system: 'metric',
    category: 'Gewicht',
  },
  {
    id: 'dg',
    short: 'dg',
    long: 'Dekagramm',
    baseUom: 'g',
    baseFactor: 10,
    system: 'metric',
    category: 'Gewicht',
  },
  {
    id: 'kg',
    short: 'kg',
    long: 'Kilogramm',
    baseUom: 'g',
    baseFactor: 1000,
    system: 'metric',
    category: 'Gewicht',
  },
];
function findUom(id: string) {
  return uoms.find(uom => uom.id === id) || uoms[1];
}
export default function UomCalculatorComponent() {
  const [fromUom, setFromUom] = useState(uoms[2]);
  const handleFromUomChange = (event: React.ChangeEvent<any>) => setFromUom(findUom(event.target.value));
  const [toUom, setToUom] = useState(uoms[0]);
  const handleToUomChange = (event: React.ChangeEvent<any>) => setToUom(findUom(event.target.value));
  const [from, setFrom] = useState('');
  const handleFromChange = (event: React.ChangeEvent<any>) => {
    setFrom(event.target.value);
  };

  let to = '';
  if (fromUom.baseFactor > toUom.baseFactor) {
    to = ((parseInt(from, 10) * fromUom.baseFactor) / toUom.baseFactor).toString();
  } else if (fromUom.baseFactor < toUom.baseFactor) {
    to = (parseInt(from, 10) / fromUom.baseFactor / toUom.baseFactor).toString();
  } else {
    to = from;
  }

  const switchUom = () => {
    const tmpFrom = fromUom;
    setFromUom(toUom);
    setToUom(tmpFrom);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <h1>Unit of Measure Calculator</h1>
      </Grid>
      <Grid item xs={12}>
        <TextField id="input-from-amount" placeholder="From" value={from} onChange={handleFromChange} />
        <FormControl>
          <Select id="select-from-uom" value={fromUom.id} onChange={handleFromUomChange}>
            {uoms.map(uom => (
              <MenuItem key={uom.id} value={uom.id}>
                {uom.short}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <IconButton aria-label={'Switch'} onClick={switchUom}>
          <Autorenew />
        </IconButton>
      </Grid>
      <Grid item xs={12}>
        <TextField id="input-to-amount" placeholder="To" value={to} />
        <FormControl>
          <Select id="select-to-uom" value={toUom.id} onChange={handleToUomChange}>
            {uoms
              .filter(uom => uom.category === fromUom.category)
              .map(uom => (
                <MenuItem key={uom.id} value={uom.id}>
                  {uom.short}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}
