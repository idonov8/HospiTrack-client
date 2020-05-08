import React, { Component } from 'react'
import NavigationService from 'App/Services/NavigationService'
import AppNavigator from 'App/Navigators/AppNavigator'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import StartupActions from 'App/Stores/Startup/Actions'
import { PropTypes } from 'prop-types'
import { Helpers } from 'App/Theme'
import LoginScreen from '../LoginScreen/LoginScreen'

class RootScreen extends Component {
  componentDidMount() {
    // Run the startup saga only if userId is available
    if (this.props.userId !== null)
       this.props.startup()
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      // Start the app after user entered id
        this.props.startup()
    }
  }

  render() {
    return (
      <View style={Helpers.fill}>
      {
        this.props.userId === null ?
        (
          <LoginScreen/>
        ) : (
          <AppNavigator
          // Initialize the NavigationService (see https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html)
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef)
          }}
        />
        )  
      }
        
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
