import {Link} from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components';
import Container from './components/helper/Container';
import {Button} from './components/Button';

const CenterEveryThing = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    min-height: 100vh;
    width: 100%;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
`;

const FlexContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    
    p{
        width: 100%;
        text-align: center;
    }
`;



const HomeContainer = (props) => {
    const currentDate = moment().format('MM-YYYY').split('-');
    return(
        <Container>
            <CenterEveryThing>
                <FlexContainer>
                    <p>Please visit /year/2020/month/1 </p>
                    <br/>
                    <StyledLink to={`/year/${currentDate[1]}/month/${currentDate[0]*1}`}>
                        <Button>
                            Or Click Start With Current Date
                        </Button>
                    </StyledLink>
                </FlexContainer>
            </CenterEveryThing>
        </Container>
    )
}

export default HomeContainer;