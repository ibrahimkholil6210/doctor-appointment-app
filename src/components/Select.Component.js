import styled from 'styled-components';
import {typeScale} from '../utills';

const FlexWrapper = styled.div`
    display: flex;
    font-size: ${typeScale.helperText};
    align-items: center;
    margin-right: 15px;
`;

const FormLabel = styled.label`
    margin-right: 5px;
`;

const SelectDropDown = styled.select`
  width: 150px;
  height: 35px;
  background: ${props => props.theme.primaryColor};
  color: ${props => props.theme.textColorInverted};
  font-size: 14px;
  border: none;
  cursor: pointer;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 10px 5px;
  }
  &:active{
        border: none;
        outline: none;
    }
`;

const Select = (props) => {
    const {value,changeHandler,list,label,noMargin} = props;
    return(
        <FlexWrapper noMargin={noMargin}>
            <FormLabel>{label}</FormLabel>
            <SelectDropDown value={value} onChange={changeHandler}>            
                {
                    (list || []).map(item => (
                        <option value={item} key={item}>{item}</option>
                    ))
                }
            </SelectDropDown>
        </FlexWrapper>
    )
}

export default Select;