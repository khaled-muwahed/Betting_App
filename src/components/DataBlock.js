import Bar from "./Bar";

const DataBlock = ({home, away, header, showPercentSymbol = false}) => {

    const total = parseFloat(home) + parseFloat(away);
    const homePercentage = (home / total) * 100;
    const awayPercentage = (away / total) * 100;

    return <>
    <div style={{ color: '#fff', marginTop: '6px' }}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr'}}>
              <div>{home}{showPercentSymbol ? '%' : ''}</div>
              <div style={{textAlign: 'center'}}>{header}</div>
              <div style={{textAlign: 'right'}}>{away}{showPercentSymbol ? '%' : ''}</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: '6px' }}>
              <Bar percentage={homePercentage} alignment="right" color="rgb(239, 229, 46)" />
              <Bar percentage={awayPercentage} alignment="left" color="rgb(68, 219, 94)" />
            </div>

          </div>
    </>
}

export default DataBlock;