import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const FormContainer = ({ children }) => {
    return (
        <Container>
            <Row className="justify-content-md-center"> {/* justify for medium screen, in center */}
                <Col xs={12} md={6}>                        {/* for small screens, (sm) it will take up all 12 columns */}
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainer
