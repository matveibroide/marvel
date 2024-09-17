const Description = ({ text }) => {
  return (
    <p className="randomchar__descr">
      {text ? text : "No description for this character was found..."}
    </p>
  );
};

export default Description;
