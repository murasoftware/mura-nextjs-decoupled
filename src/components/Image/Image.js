function Image(props) {
  const { src, alt } = props;
  return (
      <figure>
        <img src={src} alt={alt} loading="lazy" />
      </figure>
  );
}

export default Image;
