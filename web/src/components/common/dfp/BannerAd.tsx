import { useEffect } from 'react';
import { SizeMapping } from './types';

export type Props = {
  style?: React.CSSProperties;
  className?: string;
  id: string;
  adunit: string;
  sizes: any[];
  sizeMapping?: SizeMapping[];
  collapseEmptyDivs?: boolean;
};

export const BannerAd = ({
  style,
  className,
  id,
  adunit,
  sizes,
  collapseEmptyDivs,
  sizeMapping,
}: Props) => {
  useEffect(() => {
    let cleanup = () => {};
    let googletag = window.googletag || { cmd: [] };
    googletag.cmd.push(() => {
      const slot = googletag.defineSlot(adunit, sizes, id).addService(googletag.pubads());

      if (sizeMapping && Object.keys(sizeMapping).length > 0) {
        let mapping = googletag.sizeMapping();
        Object.entries(sizeMapping).map(([_, value]) => {
          mapping.addSize(value.viewport, value.sizes);
        });
        slot.defineSizeMapping(mapping.build());
      }

      collapseEmptyDivs && slot.setCollapseEmptyDiv(true);

      googletag.pubads().enableSingleRequest();
      googletag.enableServices();

      cleanup = () => {
        googletag.destroySlots([slot]);
      };
    });

    googletag.cmd.push(function () {
      googletag.display(id);
    });

    return () => {
      cleanup();
    };
  }, []);
  return <div id={id} className={className} style={style}></div>;
};

export default BannerAd;
