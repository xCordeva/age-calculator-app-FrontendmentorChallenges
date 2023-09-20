const calculateButton = document.querySelector('.calculate');
const inputs = document.querySelectorAll('.input');

const showYearResult = document.querySelector('.year-result')
const showMonthResult = document.querySelector('.month-result')
const showDayResult = document.querySelector('.day-result')

inputs.forEach((input)=>{
    input.addEventListener('keydown', (event)=>{
        if(event.key === 'Enter'){
            calculateAge()
        }
    })
})

calculateButton.addEventListener('click',calculateAge);
function calculateAge(){
    const inputStorage = [];

    inputs.forEach((input) => {
        inputStorage.push(input.value);
    });

    // check if all three inputs are filled
    if(inputStorage.length === 3 && inputStorage.every(Boolean)){
        
        const day = inputStorage[0];
        const month = inputStorage[1];
        const year = inputStorage[2];

        // check if the month is a valid month
        if(month >= 1 && month <= 12){
            // check if the day is within a valid range for the selected month
            const lastDayOfMonth = new Date(year, month, 0).getDate();
            if(day >= 1 && day <= lastDayOfMonth){
                const date = new Date(year, month - 1, day); 
                const today = new Date();
                // check if the date is valid
                if(date.getTime() < today){

                    // calculate the age
                    
                    let yearResult = today.getYear() - date.getYear();
                    let monthResult = today.getMonth() - date.getMonth();
                    let dayResult = today.getDate() - date.getDate();
                    if(dayResult < 0){
                        monthResult--;
                        const lastMonth = new Date(today.getFullYear(), date.getMonth() - 1, 0);
                        dayResult += lastMonth.getDate();
                    }
                    
                    if(monthResult < 0){
                        yearResult--;
                        monthResult += 12;
                    }

                    showYearResult.innerHTML =`${yearResult}`
                    showMonthResult.innerHTML =`${monthResult}`
                    showDayResult.innerHTML =`${dayResult}`

                    // reomve errors
                    inputs.forEach((input)=>{
                        document.querySelector(`.js-${input.getAttribute('data-type')}-required`).style.display = 'none'
                        document.querySelector(`.js-${input.getAttribute('data-type')}-valid`).style.display = 'none'
                        document.querySelector(`.${input.getAttribute('data-type')}-p`).style.color = ''
                    })
                }else{
                    document.querySelector(`.js-year-valid`).style.display = 'block'
                    document.querySelector(`.year-p`).style.color = 'hsl(0, 100%, 67%)'
                }
            }else{
                document.querySelector(`.js-day-valid`).style.display = 'block'
                document.querySelector(`.day-p`).style.color = 'hsl(0, 100%, 67%)'
            }
        }else{
            document.querySelector(`.js-month-valid`).style.display = 'block'
            document.querySelector(`.month-p`).style.color = 'hsl(0, 100%, 67%)'
        }
    }else{
        inputs.forEach((input)=>{
            if(!input.value){   
                document.querySelector(`.js-${input.getAttribute('data-type')}-required`).style.display = 'block'
                document.querySelector(`.js-${input.getAttribute('data-type')}-valid`).style.display = 'none'
                document.querySelector(`.${input.getAttribute('data-type')}-p`).style.color = 'hsl(0, 100%, 67%)'
            }
        })
    }
}