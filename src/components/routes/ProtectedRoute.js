import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({component:Component,...rest}) => {
    const {isAuthenticated,loading} = useSelector(state=>state.auth);
    return (
        <React.Fragment>
        {!loading && (
            <Route 
                {...rest}
                render={(props) =>
                    isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
                  }
            />
        )}
        </React.Fragment>
    )
}

export default ProtectedRoute
