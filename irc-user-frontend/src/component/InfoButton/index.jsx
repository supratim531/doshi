function InfoButton({ title }) {
  return (
    <span title={title}>
      <svg style={{ cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" id="information"><path fill="none" d="M0 0h24v24H0Z" data-name="Path 3672"></path><path fill="#525863" d="M5.211 18.787a9.6 9.6 0 1 1 6.788 2.814 9.6 9.6 0 0 1-6.788-2.814Zm1.274-12.3A7.806 7.806 0 1 0 12 4.206a7.808 7.808 0 0 0-5.515 2.278Zm4.163 9.879v-4.8a1.352 1.352 0 0 1 2.7 0v4.8a1.352 1.352 0 0 1-2.7 0Zm.017-8.7A1.335 1.335 0 1 1 12 9.033a1.35 1.35 0 0 1-1.335-1.369Z" data-name="Path 2683"></path></svg>
    </span>
  );
}

export default InfoButton;