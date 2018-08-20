/* Shorten syntax */
let sel = (sel) => {return document.querySelector(sel)};

let search_country = sel('#search_country'),
    nothing_found = sel('#nothing_found'),
    box_option = sel('#box_options');
   
search_country.onkeyup = () =>{
    let query = search_country.value.toUpperCase();

    /* If you are typing in russian translate letters to English and turn the query into english */
    let transl = () => {
        let ru = new RegExp('[a-z\u0400-\u04FF]');
        if(ru.test(query)){    
            var matchLet = {"Ё":"YO","Й":"I","Ц":"TS","У":"U","К":"K","Е":"E","Н":"N","Г":"G","Ш":"SH","Щ":"SCH","З":"Z","Х":"H","Ъ":"'","ё":"yo","й":"i","ц":"ts","у":"u","к":"k","е":"e","н":"n","г":"g","ш":"sh","щ":"sch","з":"z","х":"h","ъ":"'","Ф":"F","Ы":"I","В":"V","А":"a","П":"P","Р":"R","О":"O","Л":"L","Д":"D","Ж":"ZH","Э":"E","ф":"f","ы":"i","в":"v","а":"a","п":"p","р":"r","о":"o","л":"l","д":"d","ж":"zh","э":"e","Я":"Ya","Ч":"CH","С":"S","М":"M","И":"I","Т":"T","Ь":"'","Б":"B","Ю":"YU","я":"ya","ч":"ch","с":"s","м":"m","и":"i","т":"t","ь":"'","б":"b","ю":"yu"};
            
            let mapping = (word) =>{
               let word_get =  word.split('').map(letter => {
                   return matchLet[letter].toUpperCase();
                });
                return word_get.join('');
            }
        
            query = mapping(query);
        }
    };
    
    transl();

    let allOptions = box_option.querySelectorAll('.optionDiv');
    let totalNumber = allOptions.length;
    
    /* Search bar */
    Array.prototype.forEach.call(allOptions, opt =>{
        let option_text = opt.innerText.toUpperCase();
        
        if(option_text.indexOf(query) > -1){
            opt.style.display = '';
        } else{            
            opt.style.display = 'none';
            totalNumber -= 1;
        } 
        if(totalNumber < 1){
            nothing_found.style.display = 'block';
        } else {
            nothing_found.style.display = 'none';
        }
    });

}
