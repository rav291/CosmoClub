import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
    return (
        <>
            <Spinner variant='warning' animation="grow" role="status" style={{ margin: 'auto', width: '100px', height: '100px', display: 'block' }}>
                <span className="sr-only">Loading</span>
            </Spinner>

        </>

    )
}

Loader.defaultProps = {
    variant: 'info'
}

export default Loader
