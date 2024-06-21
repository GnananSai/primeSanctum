import { useContext } from 'react'
import SearchBar from '../../components/searchBar/SearchBar'
import './homePage.scss'
import { AuthContext } from '../../context/AuthContext'

function HomePage(){
    const {currentUser} = useContext(AuthContext)

    console.log(currentUser)
    return(
        <div className='homePage'>
        <div className="textContainer">
           <div className="wrapper">
             <h1 className="title">
                Find Realestate and Get your dream place 

             </h1>
             <p>
                fg;j;p fgjer;oglji;oijo;fsadhflsdhjvbdfj
                lhbrtrbssdfklfhdskjvghdfkgjfdbkldjkfbjf
             </p>
             <SearchBar/>
             <div className="boxes">
                <div className="box">
                    <h1>16+</h1>
                    <h2>Years of Experience</h2>
                </div>
                <div className="box">
                    <h1>200</h1>
                    <h2>awards gained</h2>
                </div>
                <div className="box">
                    <h1>1200+</h1>
                    <h2>Property ready </h2>
                </div>
             </div>
            </div> 
            </div>
           
        <div className="imageContainer">
            <img src="/bg.png" alt="" />
        </div>
        </div>
        
    )
}

export default HomePage