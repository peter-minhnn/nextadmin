import Placeholder from 'react-bootstrap/Placeholder';
import Card from 'react-bootstrap/Card';

export default function ProductPlaceHolder() {
    return (
        <div className="col-md-3 col-sm-6 col-xs-6 pro-loop animated zoomIn">
            <div className="product-block product-resize site-animation fixheight" style={{ height: '355px' }}>
                <div className="product-img">
                    <div className="image-resize fade-box" style={{ height: '268px' }}>
                        <Placeholder as={Card.Text} animation="glow">
                            <Placeholder xs={12} style={{ height: '268px' }}/>
                        </Placeholder>
                    </div>
                    <div className="pro-price-mb">
                        <Placeholder as={Card.Text} animation="glow">
                            <Placeholder xs={7} />
                            <Placeholder xs={6} />
                            <Placeholder xs={4} />
                        </Placeholder>
                    </div>
                </div>
                <div className="product-detail clearfix">
                    <div className="box-pro-detail">
                        <h3 className="pro-name">
                            <Placeholder as={Card.Text} animation="glow">
                                <Placeholder xs={7} />
                            </Placeholder>
                        </h3>
                        <div className="box-pro-prices">
                            <div className="pro-price highlight">
                                <Placeholder as={Card.Text} animation="glow">
                                    <Placeholder xs={6} />
                                </Placeholder>
                            </div>
                            <div className="pro-price highlight">
                                <Placeholder as={Card.Text} animation="glow">
                                    <Placeholder xs={3} />
                                </Placeholder>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}