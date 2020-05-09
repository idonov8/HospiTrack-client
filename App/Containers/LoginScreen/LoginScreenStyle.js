import styled from 'styled-components';

export const Wrapper = styled.View`
    margin: 10%;
    justify-content: space-around;
    flex-wrap: wrap;
    flex: 1;
`

export const Title = styled.Text` 
    font-size: 60px;
    align-self: center;
    flex: 1;
`
export const WelcomeWrapper = styled.View`
    flex: 2;
`

export const InfoWrapper = styled.View`
    flex: 1;
`
export const Info = styled.Text`
    align-self: center;
    margin-bottom: 3%;
    font-weight: ${props => props.bold ? 'bold' : 'normal'};
`
