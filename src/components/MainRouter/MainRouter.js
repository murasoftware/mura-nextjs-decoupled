
import Link from "next/link"

const MainRouter = ({items}) => {
  return (
    <div>
      <nav>
        <ul>
            {items && items.map((item) => 
                <Link key={item.contentid} href={`/${item.filename}`} >
                    <a>{item.menutitle}</a>
                </Link>)
            }
        </ul>
      </nav>
    </div>
  );
};

export default MainRouter;
