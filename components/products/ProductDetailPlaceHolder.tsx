import Placeholder from 'react-bootstrap/Placeholder';
import Card from 'react-bootstrap/Card';

export default function ProductDetailPlaceHolder() {
    return (
        <div id='product' className="productDetail-page">
            <div className="container">
                <div className="row product-detail-wrapper">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="row product-detail-main pr_style_03">
                            <div className="col-md-6 col-sm-12 col-xs-12 product-content-img n_padding">
                                <Placeholder as={Card.Text} animation="glow">
                                    <Placeholder xs={12} style={{ height: '500px' }} />
                                </Placeholder>
                            </div>
                            <div className="col-md-6 col-sm-12 col-xs-12 product-content-desc">
                                <div className="product-title">
                                    <Placeholder as={Card.Text} animation="glow">
                                        <Placeholder xs={8} />
                                    </Placeholder>
                                    <span className="pro-soldold hidden"></span>
                                </div>
                                <div className="product-price" id="price-preview">
                                    <Placeholder as={Card.Text} animation="glow">
                                        <Placeholder xs={6} />
                                    </Placeholder>
                                </div>
                                <form id="add-item-form" className="variants clearfix">
                                    <div className="select clearfix">
                                        <div className="selector-wrapper">
                                            <Placeholder as={Card.Text} animation="glow">
                                                <Placeholder xs={5} />
                                            </Placeholder>
                                            <Placeholder as={Card.Text} animation="glow">
                                                <Placeholder xs={5} />
                                            </Placeholder>
                                        </div>
                                        <div className="selector-wrapper">
                                            <Placeholder as={Card.Text} animation="glow">
                                                <Placeholder xs={5} />
                                            </Placeholder>
                                            <Placeholder as={Card.Text} animation="glow">
                                                <Placeholder xs={5} />
                                            </Placeholder>
                                        </div>
                                        {/* <select id="product-select" name="id" style={{ display: 'none' }}>
                                            <option value="1105376883">M / ĐEN - 850,000₫</option>
                                            <option value="1105376884">L / ĐEN - 850,000₫</option>
                                            <option value="1105376885">XL / ĐEN - 850,000₫</option>
                                        </select> */}
                                    </div>
                                    <div className="select-swatch clearfix ">
                                        <div id="variant-swatch-0" className="swatch clearfix" data-option="option1" data-option-index="0">
                                            <Placeholder as={Card.Text} animation="glow">
                                                <Placeholder xs={5} />
                                            </Placeholder>
                                            <Placeholder as={Card.Text} animation="glow">
                                                <Placeholder xs={5} />
                                            </Placeholder>
                                        </div>
                                        <div id="variant-swatch-1" className="swatch clearfix" data-option="option2" data-option-index="1">
                                            <Placeholder as={Card.Text} animation="glow">
                                                <Placeholder xs={5} />
                                            </Placeholder>
                                            <Placeholder as={Card.Text} animation="glow">
                                                <Placeholder xs={5} />
                                            </Placeholder>
                                        </div>
                                    </div>
                                    {/* <div className="selector-actions">
                                        <div className="quantity-area">
                                            <input type="button" value="-" className="qty-btn btn-left-quantity" />
                                            <input type="text" id="quantity" name="quantity" value="1" min="1" className="quantity-selector" />
                                            <input type="button" value="+" className="qty-btn btn-right-quantity" />
                                        </div>
                                        <div className="wrap-addcart">
                                            <button type="button" id="add-to-cart" className="add-to-cartProduct button drakpay btn-addtocart" name="add">Thêm vào giỏ</button>
                                        </div>
                                    </div>
                                    <div className="product-action-bottom d-none">
                                        <div className="input-bottom">
                                            <input id="quan-input" name="quantiti_mb" type="number" value="1" min="1" />
                                        </div>
                                        <button type="button" id="add-to-cartbottom" className="add-to-cartProduct add-cart-bottom button drakpay" name="add">Thêm vào giỏ</button>
                                    </div> */}
                                </form>
                                <div className="product-description">
                                    <section className="proDetailInfo">
                                        <Placeholder as={Card.Text} animation="glow">
                                            <Placeholder xs={1} /> {' '}
                                            <Placeholder xs={2} />
                                        </Placeholder>
                                        <div className="tab-content">
                                            <Placeholder as={Card.Text} animation="glow">
                                                <Placeholder xs={12} style={{ height: '192px' }} />
                                            </Placeholder>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}