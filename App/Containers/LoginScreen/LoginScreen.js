import React from 'react'
import { View, TextInput, Text, Button, InteractionManager } from 'react-native';
// import { Helpers, Fonts } from '../Theme';
import PropTypes from 'prop-types'
import AuthActions from '../../Stores/Auth/Actions';


class LoginScreen extends React.Component {
    // Used to store reference to input element
    inputRef = React.createRef();

    submit = () => {
        const id = this.inputRef.getValue();
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
            ref={this.inputRef}
          />
          <Button title="אישור" onPress={this.submit}/>
        </View>
        )
    }


}

LoginScreen.PropTypes = {
    setId: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
    setId: () => dispatch(AuthActions.setId()),
})

export default connect(
    mapDispatchToProps
  )(LoginScreen)