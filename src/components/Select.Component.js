

const Select = (props) => {
    const {value,changeHandler,list} = props;
    return(
        <select value={value} onChange={changeHandler}>            
            {
                (list || []).map(item => (
                    <option value={item} key={item}>{item}</option>
                ))
            }
          </select>
    )
}

export default Select;