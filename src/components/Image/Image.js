import MuraDecorator from "../MuraDecorator";

function Image(props) {
  const { src, alt } = props;
  return (
    <MuraDecorator {...props}>
      <div className="mura-object-content">
        <figure>
          <img src={src} alt={alt} loading="lazy" />
        </figure>
      </div>
    </MuraDecorator>
  );
}

export default Image;
