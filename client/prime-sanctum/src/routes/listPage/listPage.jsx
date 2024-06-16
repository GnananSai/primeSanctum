import Card from '../../components/card/card';
import Filter from '../../components/filter/Filter';
import List from '../../components/list/list';
import Map from '../../components/map/map';
import { listData } from '../../lib/dummydata'
import './listPage.scss'


function ListPage(){
    const data=listData;
    return(
     <div className="listPage">

    <div className="listContainer">
        <div className="wrapper">
            <Filter/>
            <List/>
        </div>
    </div>
    <div className="mapContainer">
        <Map items={data}/>
    </div>
     </div>
   
    );
}

export default ListPage