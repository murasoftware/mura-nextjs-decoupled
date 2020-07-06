import React from 'react';
import Link from 'next/link';

const MainRouter = ({ items }) => (
  <div>
    <nav>
      <ul>
        {items &&
          items.map(item => (
            <Link key={item.contentid} href={`/${item.filename}`}>
              {item.menutitle}
            </Link>
          ))}
      </ul>
    </nav>
  </div>
);

export default MainRouter;
