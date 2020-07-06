import React, { useEffect } from 'react';
import Mura from 'mura.js';
import MuraStyles from '../MuraStyles';

const MainLayout = props => {
  const { content, moduleStyleData, children } = props;

  Mura.moduleStyleData = moduleStyleData;

  useEffect(() => {
    contentDidChange(content);
  });

  return (
    <div>
      {children}
      <MuraStyles {...props} />
    </div>
  );
};

function contentDidChange(_content) {
  const content = Mura.getEntity('content').set(_content);

  if (content.get('redirect')) {
    // eslint-disable-next-line
    location.href = content.get('redirect');
    return;
  }

  if (typeof Mura.deInitLayoutManager !== 'undefined') {
    // Mura.deInitLayoutManager();
  }

  // Ensure edit classes are removed
  Mura('html,body').attr('class', '');

  setTimeout(() => {
    // console.log("timeout",_content);
    const htmlQueueContainer = Mura('#htmlqueues');
    if (htmlQueueContainer.length) {
      Mura('#htmlqueues').html(
        content.get('htmlheadqueue') + content.get('htmlfootqueue'),
      );
    }

    Mura.init(Mura.extend({ queueObjects: false, content }));
    Mura.holdReady(false);
  }, 5);
}

export default MainLayout;
