/* Shorten syntax */
let sel = (sel) => {return document.querySelector(sel)};

let search_country = sel('#search_country'),
    nothing_found = sel('#nothing_found'),
    box_option = sel('#box_options');

/* When a user types something in the Seach field, fire this function */    
search_country.onkeyup = () =>{
    /* Get the value of what the user is typing */
    let query = search_country.value.toUpperCase();

    /* If you are typing in russian translate letters to English and turn the query into english */
    let transl = () => {
        /* Check if the entered data fits the Regex */
        let ru = new RegExp('[a-z\u0400-\u04FF]');
        if(ru.test(query)){
            /* Create the key:value object */            
            var matchLet = {"Ё":"YO","Й":"I","Ц":"TS","У":"U","К":"K","Е":"E","Н":"N","Г":"G","Ш":"SH","Щ":"SCH","З":"Z","Х":"H","Ъ":"'","ё":"yo","й":"i","ц":"ts","у":"u","к":"k","е":"e","н":"n","г":"g","ш":"sh","щ":"sch","з":"z","х":"h","ъ":"'","Ф":"F","Ы":"I","В":"V","А":"a","П":"P","Р":"R","О":"O","Л":"L","Д":"D","Ж":"ZH","Э":"E","ф":"f","ы":"i","в":"v","а":"a","п":"p","р":"r","о":"o","л":"l","д":"d","ж":"zh","э":"e","Я":"Ya","Ч":"CH","С":"S","М":"M","И":"I","Т":"T","Ь":"'","Б":"B","Ю":"YU","я":"ya","ч":"ch","с":"s","м":"m","и":"i","т":"t","ь":"'","б":"b","ю":"yu"};
            
            /* Create the funciton to turn letters into english*/
            let mapping = (word) =>{
                /* Split each word into an array --> map through each letter --> match with it's value in the object*/
               let word_get =  word.split('').map(letter => {
                   return matchLet[letter].toUpperCase();
                });
                /* Join all the letters into words */
                return word_get.join('');
            }
            
            /* Assing the query a different value in Enlish */
            query = mapping(query);
        }
    };
    
    /* Fire the function */
    transl();

    /* Get all the possible country options */
    let allOptions = box_option.querySelectorAll('.optionDiv');

    /* Get the total number of country options */
    let totalNumber = allOptions.length;

    /* Loop through all the options */
    Array.prototype.forEach.call(allOptions, opt =>{
        /* Tuen each option to upperCase, to stay consistent */
        let option_text = opt.innerText.toUpperCase();
        
        /* If there is a match, leave the display the same */
        if(option_text.indexOf(query) > -1){
            opt.style.display = '';
        /* If the match wasn't found, hide the option */
        } else{            
            opt.style.display = 'none';
            /* Minus one option from the total number */
            totalNumber -= 1;
        } 

        /* If there are no more options left, show the error */
        if(totalNumber < 1){
            nothing_found.style.display = 'block';
        /* If the options are found again, hide the error */
        } else {
            nothing_found.style.display = 'none';
        }
    });

}
