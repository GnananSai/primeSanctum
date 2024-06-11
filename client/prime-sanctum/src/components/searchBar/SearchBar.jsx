import './searchBar.scss'
import { useState } from 'react';

function SearchBar(){

    const[query,setQuery] = useState({
        type:"Buy",
        location : "",
        minPrice: 0 ,
        maxPrise:0 ,
    });

    const types=["Buy","Rent"];


    const switchType = (val)=>{
        setQuery((prev)=>({...prev,type:val}));
    };

    return(
        <div className='searchBar'>
            <div className="type">
                {types.map((type)=>(
                    <button key={type} onClick={()=> switchType(type)} className={query.type === type ?"active":""}>{type}</button>
                ))}
            </div>
                
                <form action="">
                    <input type="text" name='location' placeholder='City Location' />
                    <input type="text" name='minPrice' min={0} max={10000} placeholder='Min Price' />
                    <input type="text" name='maxPrice' min={0} max={1000000} placeholder='Max Price' />
                    <button>
                        <img src="/search.png" alt="" />
                    </button>
                </form>
            
            
        </div>
    )
}
export default SearchBar