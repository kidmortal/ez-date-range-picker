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
  const startDate = new Date()
  const limitDate = new Date('3-01-2022');
   return (
      <DatePicker
          first={first}
          last={last}
          startDate={startDate}
          limitDate={limitDate}
          onFirstDateSelected={(date) => setFirst(date)}
          onLastDateSelected={(date) => setLast(date)}
          onRequestClose={() => alert('Requested Close')}
          onSelectionComplete={() => alert('Selected !')}
          visible={true}
        />
   )
  
}

```


# How it works


### Just provide two dates and two functions for manipulating these dates, the returned value on click will be a Date object



