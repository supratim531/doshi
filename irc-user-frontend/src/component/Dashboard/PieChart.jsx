import { PieChart } from 'react-minimal-pie-chart';

function PieCharts() {
  return (
    <PieChart
  data={[
    { title: 'One', value: 10, color: 'red' },
    { title: 'Two', value: 15, color: '#F6BE00 ' },
    { title: 'Three', value: 20, color: 'teal' },
  ]}
/>
  )
}

export default PieCharts