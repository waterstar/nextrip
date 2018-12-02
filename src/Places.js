import React from 'react';
import HorizontalScroll from 'react-scroll-horizontal';
import PlaceCard from './PlaceCard';

const Places = (props) => {
  const parent  = { width: `100%`, height: `380px`}
  return (
    <div style={parent}>
    <HorizontalScroll>
    {props.thePlaces.filter((_p)=>(_p.photos && 
                                   _p.reviews.length > 0 && 
                                   _p.reviews[0].text !== "")).map((p,idx) => {
      return <PlaceCard key={idx} thePlace={p}/>;
    })}
    </HorizontalScroll>
    </div>
  );
};

export default Places;