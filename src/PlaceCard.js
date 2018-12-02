import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

const PlaceCard = (props) => {
  const child   = { width: `16em`}
  const { thePlace } = props;
  const photoUrl = thePlace.photos && thePlace.photos[0].getUrl();
  return (
    <div style={child}>
      <Card style={{position:'absolute', width:'16em', height:'100%', overflowY:'auto'}}>
        <CardImg top width="100%" style={{height:'120px'}} src={photoUrl} alt="Card image cap" />
        <CardBody style={{overflowX:'hidden'}}>
          <CardTitle>{thePlace.name}</CardTitle>
          <CardSubtitle style={{fontSize:'0.6em'}}>{thePlace.vicinity}</CardSubtitle>
          <CardText>{thePlace.reviews && thePlace.reviews[0].text}</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default PlaceCard;