import { useContext, useState } from 'react';
import apiRequest from '../../lib/apiRequest';
import './card.scss'
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';

function Card({item}){

    const {currentUser} = useContext(AuthContext)
    const [saved,setSaved] = useState(item.isSaved)
    

    const navigate = useNavigate();
    
    const handleChat= async (e)=>{

        e.preventDefault();

        try{

            const res= await apiRequest.get(`/posts/${item.id}`)
            const userId = res.data.userId

            if(!currentUser){
                navigate("/login")
             }

            if (userId !== currentUser.id) {
                const chatsRes = await apiRequest.get('/chats');
                const chats = chatsRes.data;
    
                // Check if a chat already exists between the current user and the post owner
                const existingChat = chats.find(chat =>
                    chat.userIDs.includes(currentUser.id) && chat.userIDs.includes(userId)
                );
    
                if (existingChat) {
                    // Navigate to profile page with the existing chat ID
                    navigate("/profile", { state: { chatId: existingChat.id } });
                } else {
                    // Create a new chat
                    const newChatRes = await apiRequest.post("/chats", {
                        receiverId: userId
                    });
                    const newChat = newChatRes.data;
    
                    // Navigate to profile page with the new chat ID
                    navigate("/profile", { state: { chatId: newChat.id } });
                }
            }

        }catch(err){
            console.log(err);

        }
        
    }
    return(
     <div className="card">
        <Link to={`/${item.id}`} className="imageContainer">
        
        <img src={item.images[0]} alt="" />
        
        </Link>

        <div className="textContainer">
            <h2 className='title'>
                <Link to={`/${item.id}`}>{item.title}</Link>
            </h2>

            <p className='address'>
                <img src="/pin.png" alt="" />

                <span>{item.address}</span>

            </p>

            <p className='price'>
                ${item.price}
            </p>

            <div className="bottom">
                <div className="features">
                    <div className="feature">
                        <img src="/bed.png" alt="" />
                        <span>{item.bedroom} bedroom</span>
                    </div>

                    <div className="feature">
                        <img src="/bath.png" alt="" />
                        <span>{item.bathroom} bathroom</span>
                    </div>
                </div>
                <div className="icons">

                    <div className="icon">
                        <img src="/chat.png" onClick={handleChat} alt="" />
                    </div>
                </div>
            </div>
        </div>
     </div>
   
    );
}

export default Card