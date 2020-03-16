import {
  FormControl,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Add, Autorenew, Delete } from '@material-ui/icons';
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
  {
    id: 'l',
    short: 'l',
    long: 'Liter',
    baseUom: 'l',
    baseFactor: 1,
    system: 'metric',
    category: 'Volumen',
  },
  {
    id: 'ml',
    short: 'ml',
    long: 'Milliliter',
    baseUom: 'l',
    baseFactor: 0.0001,
    system: 'metric',
    category: 'Volumen',
  },
  {
    id: 'cl',
    short: 'cl',
    long: 'Centiliter',
    baseUom: 'l',
    baseFactor: 0.001,
    system: 'metric',
    category: 'Volumen',
  },
];
function findUom(id: string) {
  return uoms.find(uom => uom.id === id) || uoms[1];
}
function findUomByCategory(uom: UnitOfMeasure): UnitOfMeasure {
  return (
    uoms.find(el => el.id !== uom.id && el.category === uom.category) || {
      id: 'none',
      short: 'none',
      long: 'None',
      baseUom: 'none',
      baseFactor: 1,
      system: 'metric',
      category: uom.category,
    }
  );
}
interface Amount {
  uom: string;
  amount: number;
}
interface Item {
  name: string;
  to: Amount;
}

const useStyles = makeStyles(() => ({
  fullWidth: {
    width: '100%',
  },
  center: {
    textAlign: 'center',
  },
}));

export default function UomCalculatorComponent() {
  const classes = useStyles();

  const [fromUom, setFromUom] = useState(uoms[2]);
  const handleFromUomChange = (event: React.ChangeEvent<any>) => {
    const nextFromUom = findUom(event.target.value);
    setFromUom(nextFromUom);
    if(nextFromUom.category !== toUom.category) {
      setToUom(findUomByCategory(nextFromUom));
    }
  };
  const [toUom, setToUom] = useState(findUomByCategory(fromUom));
  const handleToUomChange = (event: React.ChangeEvent<any>) => setToUom(findUom(event.target.value));
  const [from, setFrom] = useState(0);
  const handleFromChange = (event: React.ChangeEvent<any>) => setFrom(event.target.value);
  const switchUom = () => {
    const tmpFrom = fromUom;
    setFromUom(toUom);
    setToUom(tmpFrom);
  };

  let to = 0;
  if (fromUom.baseFactor > toUom.baseFactor) {
    to = (from * fromUom.baseFactor) / toUom.baseFactor;
  } else if (fromUom.baseFactor < toUom.baseFactor) {
    to = from / fromUom.baseFactor / toUom.baseFactor;
  } else {
    to = from;
  }

  const [itemName, setItemName] = useState('');
  const handleItemNameChange = (event: React.ChangeEvent<any>) => setItemName(event.target.value);
  const [items, setItems] = useState<Item[]>([]);
  const handleAddItem = () =>
    setItems([
      ...items,
      {
        name: itemName,
        to: {
          uom: toUom.short,
          amount: to,
        },
      },
    ]);
  const handleRemoveItem = (item: Item) => () => setItems(items.filter(i => i.name !== item.name));

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h5">Maßeinheiten Rechner</Typography>
      </Grid>
      <Grid item xs={9}>
        <TextField
          id="input-from-amount"
          placeholder="From"
          value={from}
          onChange={handleFromChange}
          type="number"
          className={classes.fullWidth}
        />
      </Grid>
      <Grid item xs={3}>
        <FormControl className={classes.fullWidth}>
          <Select id="select-from-uom" value={fromUom.id} onChange={handleFromUomChange}>
            {uoms.map(uom => (
              <MenuItem key={uom.id} value={uom.id}>
                {uom.short}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} className={classes.center}>
        <IconButton aria-label={'Switch'} onClick={switchUom}>
          <Autorenew />
        </IconButton>
      </Grid>
      <Grid item xs={9}>
        <TextField
          id="input-to-amount"
          placeholder="To"
          value={to}
          type="number"
          disabled
          className={classes.fullWidth}
        />
      </Grid>
      <Grid item xs={3}>
        <FormControl className={classes.fullWidth}>
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
      <Grid item xs={12}>
        <Typography variant="h5">Zutaten Liste</Typography>
      </Grid>
      <Grid item xs={10}>
        <TextField
          id="input-add-item"
          placeholder="Zutat hinzufügen"
          value={itemName}
          onChange={handleItemNameChange}
          className={classes.fullWidth}
        />
      </Grid>
      <Grid item xs={2}>
        <IconButton
          color="primary"
          aria-label="add item"
          component="span"
          onClick={handleAddItem}
          disabled={itemName === ''}
        >
          <Add />
        </IconButton>
      </Grid>
      <Grid item xs={12}>
        <List>
          {items.map(item => (
            <ListItem key={item.name}>
              <ListItemText primary={`${item.to.amount.toFixed(2)} ${item.to.uom}`} secondary={item.name} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={handleRemoveItem(item)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
