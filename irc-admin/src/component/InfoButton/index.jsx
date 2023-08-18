function InfoButton({ title }) {
  return (
    <span style={{ cursor: "pointer" }} title={title}>
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16"> <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" /></svg>
      {/* <span title={title}>
        <svg style={{ cursor: "pointer",fontSize:"10px" }} xmlns="http://www.w3.org/2000/svg" width="28" height="28" id="information"><path fill="none" d="M0 0h24v24H0Z" data-name="Path 3672"></path><path fill="#525863" d="M5.211 18.787a9.6 9.6 0 1 1 6.788 2.814 9.6 9.6 0 0 1-6.788-2.814Zm1.274-12.3A7.806 7.806 0 1 0 12 4.206a7.808 7.808 0 0 0-5.515 2.278Zm4.163 9.879v-4.8a1.352 1.352 0 0 1 2.7 0v4.8a1.352 1.352 0 0 1-2.7 0Zm.017-8.7A1.335 1.335 0 1 1 12 9.033a1.35 1.35 0 0 1-1.335-1.369Z" data-name="Path 2683"></path></svg>
      </span> */}
    </span>
  );
}

export default InfoButton;
