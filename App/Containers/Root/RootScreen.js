import React, { Component } from 'react'
import NavigationService from 'App/Services/NavigationService'
import AppNavigator from 'App/Navigators/AppNavigator'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import StartupActions from 'App/Stores/Startup/Actions'
// import AuthActions from '../../Stores/Auth/Actions'
import { PropTypes } from 'prop-types'
import { Helpers } from 'App/Theme'
import LoginScreen from '../LoginScreen/LoginScreen'

class RootScreen extends Component {
  componentDidMount() {
    // Run the startup saga when the application is starting
    // this.props.startup()
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.userId !== prevProps.userId) {
      const { userId } = this.props;
        this.props.startup()
        console.log("I noticed! ", userId);
      
    }
  }

  render() {
    const { userId } = this.props;
    console.log("user id is: ", userId);
    return (
      <View style={Helpers.fill}>
      {userId !== null ?
      (<AppNavigator
          // Initialize the NavigationService (see https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html)
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef)
          }}
        />) : (
          <View>
            <LoginScreen/>
          </View>
              )}
        
      </View>
    )
  }
}

RootScreen.propTypes = {
  startup: PropTypes.func,
  userId: PropTypes.number
}

const mapStateToProps = (state) => ({
    userId: state.auth.id,
})

const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootScreen)
