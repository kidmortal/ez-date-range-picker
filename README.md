# Another datepicker lib, yeah, but its a lot simpler.

![image](https://user-images.githubusercontent.com/18023467/139587816-a6026dd5-fe8e-4864-b591-8cc136a23a4d.png)



### Features

- Easy control of the selectable range
- Doesn't come with default input, so you get to make your own
- Its just a calendar, so place anywhere you want
- You can rename the month and weekdays easily


## Installing
```bash
npm install ez-date-range-picker
```
or
```bash
yarn add ez-date-range-picker
```



## Usage 

```js
import { DateRangePicker } from 'ez-date-range-picker';

function Home(){
  const [first, setFirst] = useState(undefined);
  const [last, setLast] = useState(undefined);
  const startDate = new Date()
  const limitDate = new Date('3-01-2022');
   return (
      <DateRangePicker
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
 <DateRangePicker

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
  <DateRangePicker 
      weekdaysName={['周一', '周二', '周三', '周四', '周五', '周六', '星期日']}
      monthsName={["Jan", "February", "any name"]}
  />
 ```

 These props allows you to rename the weekdays and month names.
 Just make sure you provide 7 days name, and 12 month names  (*/ω＼*)


  ## Customizing css

   You can change some css by passing some props

 ```js
  <DateRangePicker 
      customStyles={{
        HeaderContainer: {
          backgroundColor: 'pink',
        },
        ColorPallet: {
          BackgroundColor: {
            firstSelected: 'pink',
            lastSelected: 'green',
            between: "red"
          },
          BackgroundHoverColor: {
            allowed: "pink"
          }
        },
      }}
  />
 ```


 ColorPallet props can only receive the new color value, 
 but the components container can receive any valid css property.








