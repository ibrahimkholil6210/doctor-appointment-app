import {Link} from 'react-router-dom';
import moment from 'moment';

const HomeContainer = (props) => {
    const currentDate = moment().format('MM-YYYY').split('-');
    return(
        <div>
            Please visit /year/2020/month/1 
            <br/>
            <Link to={`/year/${currentDate[1]}/month/${currentDate[0]*1}`}>Or Click Start With Current Date</Link>
        </div>
    )
}

export default HomeContainer;