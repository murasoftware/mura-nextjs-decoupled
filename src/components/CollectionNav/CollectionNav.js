const CollectionNav = (props) => {
	const {collection,pos,nextn,setPos} = props;
	const items = collection.get('items');
	const next = pos+nextn;
	const prev = pos > 0 ? pos-nextn > 0 ? pos-nextn : 0 : 0;
	const itemsOf = pos+nextn > items.length ? items.length: pos+nextn;
	let nav = [];
  
	if(pos > 0) {
	  nav.push (
		<NavButton key="prev" pos={pos} val={prev} onItemClick={setPos} label="Prev"/>
	  )
	}
  
	if(next<items.length) {
	  nav.push (
		<NavButton key="next" pos={pos} val={next} onItemClick={setPos} label="Next"/>
	  )
	}
  
	return (
	  <div>
		<p>Items {pos+1}-{itemsOf} of {items.length}</p>
		{nav}
	  </div>
	);
  }
  
  const NavButton = props => {
	let {val,onItemClick} = props;
  
	const _onClick = () => {
	  onItemClick(val);
	}
  
	return (
	  <button onClick={_onClick}>{props.label}</button>
	)
  }
  
  export default CollectionNav;