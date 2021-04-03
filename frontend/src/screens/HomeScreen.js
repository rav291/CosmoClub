import React from 'react'
import products from '../products';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product'

const HomeScreen = () => {
    // sm, md etc are number of columns to be occupied for small, medium, large screens
    return (
        <div>
            <h1>Latest Products</h1>
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}/>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HomeScreen
