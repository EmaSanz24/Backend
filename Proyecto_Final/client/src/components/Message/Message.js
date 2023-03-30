export const Message = ({ data }) => {
  return (
    <div>
      <p>{data.email}:</p>
      <p>{data.text}</p>
    </div>
  );
};
