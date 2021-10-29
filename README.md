Easiest lib for datepicker


## Installing
```bash
npm install ezdatepicker
```
or
```bash
yarn add ezdatepicker
```



## Usage 

```js
import { DatePicker } from 'ezdatepicker';

function Home(){
  const [first, setFirst] = useState(undefined);
  const [last, setLast] = useState(undefined);

   return (
      <DatePicker
          first={first}
          last={last}
          onFirstDateSelected={(date) => setFirst(date)}
          onLastDateSelected={(date) => setLast(date)}
        />
   )
  
}

```


# How it works


### Just provide two dates and two functions for manipulating these dates, the returned value on click will the a Date object



