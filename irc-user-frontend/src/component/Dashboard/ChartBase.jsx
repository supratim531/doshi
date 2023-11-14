import { axiosClient } from '../../network/axiosClient'
import InfoButton from '../InfoButton'
import PieCharts from './PieChart'
import SpeedoChart from './SpeedoChart'

function ChartBase({ record }) {
  return (
    <>
      <div style={{ display: "flex" }}>
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded shadow dark:bg-gray-800 dark:border-gray-700" style={{ display: "flex", flexDirection: "column", padding: "10px" }}>
          <div>
            <p style={{ fontWeight: "bold", fontSize: "18px" }}>Compliance Meter</p>
          </div>
          <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
            <SpeedoChart />
          </div>
        </div>

        <div className='max-w-sm p-6 bg-white border border-gray-200 rounded shadow dark:bg-gray-800 dark:border-gray-700' style={{ width: "350px", height: "350px", marginLeft: "15px", display: "flex", flexDirection: "column", "justifyContent": "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignSelf: "flex-start", padding: "0px" }}>
            <p style={{ fontWeight: "bold", fontSize: "18px" }}>Compliance Types</p>
          </div>

          <div style={{ width: "200px", height: "200px" }}>
            <PieCharts record={record} />
          </div>

          <div className='block max-w-sm p-6 bg-white' style={{ height: "80px", width: "inherit", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
            <div style={{ "height": "50px", width: "100px", display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ width: "inherit", height: "50%", display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ height: "10px", width: "10px", backgroundColor: "red", borderRadius: "50%" }}></div>
                <span style={{ fontSize: "12px", fontWeight: "bold" }}>({record?.record_count}) <span>100%</span></span>
              </div>
              <p style={{ fontSize: "12px" }}>Total</p>
            </div>

            <div style={{ "height": "50px", width: "100px", display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ width: "inherit", height: "50%", display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ height: "10px", width: "10px", backgroundColor: "#F6BE00", borderRadius: "50%" }}></div>
                <span style={{ fontSize: "12px", fontWeight: "bold" }}>({record?.record_odd}) <span>{(record?.record_odd / record?.record_count) * 100}%</span></span>
              </div>
              <p style={{ fontSize: "12px" }}>Odd</p>
            </div>

            <div style={{ "height": "50px", width: "100px", display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ width: "inherit", height: "50%", display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ height: "10px", width: "10px", backgroundColor: "teal", borderRadius: "50%" }}></div>
                <span style={{ fontSize: "12px", fontWeight: "bold" }}>({record?.record_even}) <span>{(record?.record_even / record?.record_count) * 100}%</span></span>
              </div>
              <p style={{ fontSize: "12px" }}>Even</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChartBase