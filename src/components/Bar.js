


const Bar = ({percentage, alignment, color}) => {
    return <>

    <div style={{height: '6px', borderRadius: '3px', backgroundColor: 'rgb(30, 42, 58)', position: 'relative'}}>
    
        <div style={{width: `${percentage}%`, borderRadius: '3px', height: '6px', backgroundColor: color, position: 'absolute', [alignment]: 0, transition: 'width 0.3s linear 0s'}} />
    </div>

 </>
}

export default Bar;
