import styled from 'styled-components';

const StyledContainer = styled.div`
    margin: 0 auto;
    padding: 0 25px;
    max-width: 1260px;
    @media (min-width: 480px) {
        padding: 0 25px;
    }
`;

const FlexContainer = (props) => {
    return(
        <StyledContainer>
            {props.children}
        </StyledContainer>
    )
}

export default FlexContainer;