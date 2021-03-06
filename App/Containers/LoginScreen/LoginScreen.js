import React from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  InteractionManager,
} from "react-native";
import PropTypes from "prop-types";
import AuthActions from "../../Stores/Auth/Actions";
import { connect } from "react-redux";
import {
  Wrapper,
  Title,
  WelcomeWrapper,
  Info,
  InfoWrapper,
} from "./LoginScreenStyle";

class LoginScreen extends React.Component {
  // Used to store reference to input element
  inputRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      userId: null,
    };
  }

  onIdChange = (userId) => {
    // Only modify if new userId is number
    if (isNaN(userId) || parseInt(userId) <= 0) {
      return;
    }

    this.setState({
      userId: parseInt(userId),
    });
  };

  componentDidMount() {
    this.focusInputWithKeyboard();
  }

  // Make keyboard pop open by focus on input element.
  focusInputWithKeyboard() {
    InteractionManager.runAfterInteractions(() => {
      this.inputRef.current.focus();
    });
  }

  submit = () => {
    this.props.setId(this.state.userId);
  };

  render() {
    return (
      <Wrapper>
        <Title>שלום!</Title>
        <WelcomeWrapper>
          <Text>
            ברוכים הבאים לTrackIn, שתוודא שמי שנחשף לנגיף ייכנס לבידוד ומי שלא
            לא :)
          </Text>
          <Text>למקרה שנצטרך ליצור אתכם קשר, אנא כתבו את המספר האישי שלכם</Text>
          <TextInput
            placeholder="מספר אישי"
            underlineColorAndroid="transparent"
            keyboardType="numeric"
            onChangeText={(newId) => this.onIdChange(newId)}
            ref={this.inputRef}
          />
          <Button title="אישור" onPress={this.submit} />
        </WelcomeWrapper>
        <InfoWrapper>
          <Info>במסך הבא, תתבקשו לאשר לאפליקציה גישה למיקום שלכם.</Info>
          <Info bold>
            אנא אשרו. האפליקציה משתמשת בחיישנים רק כשאתם בבסיס, והמידע ישמש
            למטרות בריאותיות, ולמחקר ופיתוח של האפליקציה בלבד.
          </Info>
        </InfoWrapper>
      </Wrapper>
    );
  }
}

LoginScreen.propTypes = {
  setId: PropTypes.func.isRequired,
  id: PropTypes.number,
};

const mapDispatchToProps = (dispatch) => ({
  setId: (id) => dispatch(AuthActions.setId(id)),
});

export default connect(null, mapDispatchToProps)(LoginScreen);
