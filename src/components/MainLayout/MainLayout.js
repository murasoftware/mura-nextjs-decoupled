import React, { useEffect } from 'react';
import Mura from 'mura.js';
import Footer from '@components/Footer';
import ContentCarousel from '@components/ContentCarousel';
import theme from '@styles/theme';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@styles/global'
import MuraStyles from '../MuraStyles';

const MainLayout = props => {
  const { content, moduleStyleData, children } = props;

  Mura.moduleStyleData = moduleStyleData;

  useEffect(() => {
    contentDidChange(content);
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
        <MuraStyles {...props} />
        <ContentCarousel />
        <Footer />
      </ThemeProvider>
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

    if (typeof Mura.deInitLayoutManager !== 'undefined') {
      // Mura.deInitLayoutManager();
    }

    // Ensure edit classes are removed
    if (typeof MuraInlineEditor === 'undefined') {
      Mura('html,body').attr('class', '');
    }

    setTimeout(() => {
      // console.log("timeout",_content);
      const htmlQueueContainerInner = Mura('#htmlqueues');
      if (htmlQueueContainerInner.length) {
        Mura('#htmlqueues').html(
          content.get('htmlheadqueue') + content.get('htmlfootqueue'),
        );
      }

      Mura.init(Mura.extend({ queueObjects: false, content }));
      Mura.holdReady(false);

      if (!htmlQueueContainerInner.length) {
        // Mura.loader().loadjs(Mura.rootpath + "/core/modules/v1/core_assets/js/variation.js?siteid=" + Mura.siteid)
      }
    }, 5);

    Mura.init(Mura.extend({ queueObjects: false, content }));
    Mura.holdReady(false);
  }, 5);
}

export default MainLayout;
