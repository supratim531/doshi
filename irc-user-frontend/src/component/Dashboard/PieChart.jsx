import { PieChart } from 'react-minimal-pie-chart';

function PieCharts({ record }) {
  return (
    <PieChart
      data={[
        { title: 'One', value: record?.record_count, color: 'red' },
        { title: 'Two', value: record?.record_odd, color: '#F6BE00 ' },
        { title: 'Three', value: record?.record_even, color: 'teal' },
      ]}
    />
  )
}

export default PieCharts;
