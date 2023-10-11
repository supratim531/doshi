import InfoButton from "../../component/InfoButton";


function Box({backgroundColor,value,text,infoText,textColor,spanWidth}) {
    return (
    <div style={{"width":"220px","height":"110px",border: "1px solid gray",boxShadow:"1px 1px 1px 1px gray",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <span style={{fontSize:"12px",fontWeight:"bold",color:{textColor},backgroundColor:{backgroundColor},width:{spanWidth},display:"flex",alignItems:"center",justifyContent:"space-evenly"}}>{text} <InfoButton title={infoText}/></span>
        <p style={{fontSize:"27px",fontWeight:"bold",marginTop:"4px"}}>{value}</p>
    </div>
  )
}

export default Box