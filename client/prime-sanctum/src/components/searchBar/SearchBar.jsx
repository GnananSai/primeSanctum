import { Link } from 'react-router-dom';
import './searchBar.scss'
import { useState } from 'react';

function SearchBar(){

    const types=["buy","rent"];

    const[query,setQuery] = useState({
        type:"buy",
        city : "",
        minPrice: 0 ,
        maxPrice:1000000 ,
    });

   


    const switchType = (val)=>{
        setQuery((prev)=>({...prev,type:val}));
    };

    const handleChange= (e)=>{
        setQuery((prev)=>({...prev,[e.target.name]:e.target.value}));
    }

    return(
        <div className='searchBar'>
            <div className="type">
                {types.map((type)=>(
                    <button key={type} onClick={()=> switchType(type)} className={query.type === type ?"active":""}>{type}</button>
                ))}
            </div>
                
                <form action="">
                    <input type="text" name='city' placeholder='City' onChange={handleChange}/>
                    <input type="text" name='minPrice' min={0} max={10000} placeholder='Min Price' onChange={handleChange}/>
                    <input type="text" name='maxPrice' min={0} max={1000000} placeholder='Max Price' onChange={handleChange}/>

                    <Link to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}>
                    <button>
                        <img src="/search.png" alt="" />
                    </button>

                    </Link>
                </form>
            
            
        </div>
    )
}
export default SearchBar