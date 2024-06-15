import React, { useState, useEffect } from 'react';
import Card from '../../components/card/card';
import Filter from '../../components/filter/Filter';
import './listPage.scss';
import Map from '../../components/map/map';

function ListPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await fetch("http://localhost:8000/api/flats-list"); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setData(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
            {data.map(item => (
              <Card key={item.id} item={item} />
            ))}
        </div>
      </div>
      <div className="mapContainer">
        <Map items={data}/>
      </div>
    </div>
  );

}

export default ListPage;