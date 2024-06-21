import Slider from '../../components/slider/slider';
import './singlePage.scss';
import { singlePostData, userData } from '../../lib/dummydata';
import Map from '../../components/map/map';
import { useLoaderData } from 'react-router-dom';
import DOMPurify from "dompurify";


function SinglePage(){
   const post = useLoaderData();
   console.log(post)
   return(
    <div className="singlePage">
      <div className="details">
         <div className="wrapper">
            <Slider images={post.images}/>
            <div className="info">
               <div className="top">
                  <div className="post">
                     <h1>{post.title}</h1>
                     <div className="address">
                        <img src="/pin.png" alt="" />
                        <span>{post.address}</span>
                     </div>
                     <div className="price">${post.price}</div>
                  </div>
                  <div className="user">
                     <img src={post.user.avatar} alt="" />
                     <span>{post.user.username}</span>
                  </div>
               </div>
               <div className="bottom" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.postDetail.desc)}}>
                  
               </div>
            </div>
         </div>
      </div>
      <div className="features">
         <div className="wrapper">
            <p className='title'>General</p>
            <div className="listVertical">
               <div className="feature">
                  <img src="/utility.png" alt="" srcSet="" />
                  <div className="featureText">
                     <span>Utilities</span>
                     {
                        post.postDetail.utilities === "owner " ?
                        <p>Owner is responsible</p>
                        :
                        <p>tenant is resposnible</p>
                     }
                  </div>
               </div>
               <div className="feature">
                  <img src="/pet.png" alt="" srcSet="" />
                  <div className="featureText">
                     <span>Pet-policy</span>
                     {
                        post.postDetail.pet === "allowed" ?
                        <p>Pets are allowed</p>
                        :
                        <p>pets are not Allowed</p>
                     }
                  </div>
               </div>
               <div className="feature">
                  <img src="/fee.png" alt="" srcSet="" />
                  <div className="featureText">
                     <span>Income Policy</span>
                     <p>{post.postDetail.income}</p>
                  </div>
               </div>
            </div>
            <p className='title'>Sizes</p>
            <div className="sizes">
               <div className="size">
                  <img src="/size.png" alt="" srcSet="" />
                  <span>{post.postDetail.size} sqft</span>
               </div>
               <div className="size">
                  <img src="/bed.png" alt="" srcSet="" />
                  <span>{post.bedroom} beds</span>
               </div>
               <div className="size">
                  <img src="/bath.png" alt="" srcSet="" />
                  <span>{post.bathroom} bathroom</span>
               </div>
            </div>

            <p className='title'>Nearby Places</p>
            <div className="listHorizontal">
                  <div className="feature">
                  <img src="/school.png" alt="" srcSet="" />
                  <div className="featureText">
                     <span>School</span>
                     <p>{post.postDetail.school > 999 ? post.postDetail.school/1000 + "km": post.postDetail.school+"m"} away</p>
                  </div>
                  </div>

                  <div className="feature">
                  <img src="/bus.png" alt="" srcSet="" />
                  <div className="featureText">
                     <span>Bus Stop</span>
                     <p>{post.postDetail.bus > 999 ? post.postDetail.bus/1000 + "km": post.postDetail.bus+"m"} away</p>
                  </div>
                  </div>

                  <div className="feature">
                  <img src="/bus.png" alt="" srcSet="" />
                  <div className="featureText">
                     <span>Restaurant</span>
                     <p>{post.postDetail.restaurant > 999 ? post.postDetail.restaurant/1000 + "km": post.postDetail.restaurant+"m"} away</p>
                  </div>
                  </div>


            </div>
            <p className='title'>Location</p>
            <div className="mapContainer"><Map items={[post]}/></div>
            <div className="buttons">
               <button>
                  <img src="/chat.png" alt="" srcSet="" />
                  Send a message
               </button>
               <button>
                  <img src="/save.png" alt="" srcSet="" />
                  Save the place
               </button>
            </div>
            
         </div>
      </div>
    </div>
   )
}

export default SinglePage