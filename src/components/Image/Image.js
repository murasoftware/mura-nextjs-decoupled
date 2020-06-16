import MuraDecorator from "../MuraDecorator";

function Image(props) {
  const { src, alt } = props;
  return (
    <MuraDecorator {...props}>
      <figure>
        <img src={src} alt={alt} loading="lazy" />
      </figure>
    </MuraDecorator>
  );
}

export default Image;
