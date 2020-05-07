import React from 'react'
import { View, TextInput, Text, Button, InteractionManager } from 'react-native';
// import { Helpers, Fonts } from '../Theme';
import PropTypes from 'prop-types'
import AuthActions from '../../Stores/Auth/Actions';
import { connect } from 'react-redux'



class LoginScreen extends React.Component {
    // Used to store reference to input element
    inputRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            userId: null
        }
    }

    onIdChange = (userId) => {
        // Only modify if new userId is number
        if (isNaN(userId) || parseInt(userId) <= 0) {
          return;
        }
    
        this.setState({
          userId: parseInt(userId)
        });
      }

    componentDidMount() {
        this.focusInputWithKeyboard()
    }
    
    // Make keyboard pop open by focus on input element.
    focusInputWithKeyboard() {
        InteractionManager.runAfterInteractions(() => {
            this.inputRef.current.focus()
        });
    }

    submit = () => {
        console.log('submit')
        const id = this.state.userId;
        console.log('id: ', id);
        this.props.setId(id);
    }
    render(){
        const { setId } = this.props;
        return(
        <View>
            <Text>אנא כתבו את המספר האישי שלכם</Text>
          <TextInput  
            placeholder="מספר אישי"
            underlineColorAndroid='transparent'  
            keyboardType='numeric'
            onChangeText={(newId) => this.onIdChange(newId)}
            ref={this.inputRef}
          />
          <Button title="אישור" onPress={this.submit}/>
        </View>
        )
    }


}

LoginScreen.propTypes = {
    setId: PropTypes.func.isRequired,
    id: PropTypes.number,
}

const mapDispatchToProps = (dispatch) => ({
    setId: (id) => dispatch(AuthActions.setId(id))
});

export default connect(null, mapDispatchToProps)(LoginScreen);