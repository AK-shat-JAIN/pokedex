
function useDebounce(cb, delay=2000){
    let timerid;

    return function(...args){
        if(timerid){
            clearTimeout(timerid);
        }
        timerid = setTimeout(()=>{
            cb(...args);
        }, delay);
    }
}

export default useDebounce;