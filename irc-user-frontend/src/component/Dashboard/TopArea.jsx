import InfoButton from "../../component/InfoButton";

function TopArea({ record }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "4px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" style={{ "width": "240px", "height": "110px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <span style={{ fontSize: "12px", fontWeight: "bold", color: "gray" }}>Total No. of records <InfoButton title={"Total number of ODD/EVEN compliances that are created all accross the Calender"} /></span>
          <p style={{ fontSize: "27px", fontWeight: "bold", marginTop: "4px" }}>{record?.record_count}</p>
        </div>

        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" style={{ "width": "220px", "height": "110px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <span style={{ fontSize: "12px", fontWeight: "bold", color: "gray" }}>Applicable compliances <InfoButton title={"Update Tax Payer Type & State in your Profile to get accurate Results."} /></span>
          <p style={{ fontSize: "27px", fontWeight: "bold", marginTop: "4px" }}>{record?.record_applicable}</p>
        </div>

        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" style={{ "width": "220px", "height": "110px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <span style={{ fontSize: "12px", fontWeight: "bold", backgroundColor: "#F6BE00", width: "inherit", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>Compliances Due this Month <InfoButton title={"Compliances Due this Calender Month"} /></span>
          <p style={{ fontSize: "27px", fontWeight: "bold", marginTop: "4px" }}>{record?.due_this_month}</p>
        </div>
      </div>
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" style={{ "width": "220px", "height": "110px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <span style={{ fontSize: "12px", fontWeight: "bold", color: "white", backgroundColor: "#008080", width: "inherit", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>Compliances Due Today <InfoButton title={"Compliances Due Today"} /></span>
        <p style={{ fontSize: "27px", fontWeight: "bold", marginTop: "4px" }}>{record?.due_today}</p>
      </div>
    </div>
  )
}

export default TopArea;
