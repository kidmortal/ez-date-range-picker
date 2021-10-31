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
          multiple={true}
        />
   )
  
}

```

## Props explanation

```js
 <DatePicker

  first={first} 
  // Must be a date

  last={last}   
  // Must be a date

  startDate={startDate}  
  // The first day that can be selected (optional)

  limitDate={limitDate}  
  // The last day that can be selected (optional)

  onFirstDateSelected={(date) => setFirst(date)} 
  // Callback when the day is clicked, you receive the date clicked 

  onLastDateSelected={(date) => setLast(date)} 
  // Callback when the day is clicked, you receive the date clicked

  onRequestClose={() => alert('Requested Close')} 
  // Callback when the user clicks outside the calendar

  onSelectionComplete={() => alert('Selected !')}  
  // Callback when the user picked both dates

  visible={true} // Diplay block or none

  multiple={true} // Diplay two calendars instead of one
  />
 ```


 ## Some others props

 ```js
  <DatePicker 
      weekdaysName={["MON", "TUE", "Anything"]}
      monthsName={["Jan", "February", "any name"]}
  />
 ```

 These props allows you to rename the weekdays and month names.


# How it works


### Just provide two states that you want to be controlled by this callendar, and set the state using the callback functions



