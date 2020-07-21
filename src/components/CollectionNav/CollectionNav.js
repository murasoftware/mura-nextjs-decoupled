import Mura from 'mura.js';
import {useEffect} from "react";

const CollectionNav = (props) => {
	const {collection,pos,nextn,setPos,scrollpages,instanceid,itemsTo,setItemsTo} = props;
	const items = collection.get('items');

	if(scrollpages){
		useEffect(()=>{
			if(!Mura.isInNode()){
				const isEndVisible = () => {
					const end=Mura(`div.mura-collection-end[data-instanceid="${instanceid}"]`);
					if(itemsTo  && items.length && Mura.isScrolledIntoView(end.node)){
						if(itemsTo < (items.length)){
							setItemsTo(itemsTo+1);
						}
					} else if(itemsTo < (items.length)){
						setTimeout(isEndVisible,50);
					}
					
				}
				isEndVisible();
			}	
		},[]);

		return (
			<div className="mura-collection-end" data-instanceid={instanceid}/>
		)
	}

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