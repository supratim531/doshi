import ReactSpeedometer from "react-d3-speedometer";

function SpeedoChart() {
  return (
    <ReactSpeedometer
      height={200}
      customSegmentStops={[0, 333, 666, 1000]}
      segmentColors={['teal', '#F6BE00 ', 'red']}
      customSegmentLabels={[
        {
          text: 'Success',
          position: 'INSIDE',
          color: 'black',
        },
        {
          text: 'Warning',
          position: 'INSIDE',
          color: 'black',
        },
        {
          text: 'Fail',
          position: 'INSIDE',
          color: 'black',
        }
      ]}
      currentValueText=""
      needleColor="black"
    />
  );
}

export default SpeedoChart;
