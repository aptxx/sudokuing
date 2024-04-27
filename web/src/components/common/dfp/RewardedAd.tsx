'use client';

import { useEffect } from 'react';

export type Props = {
  adunit: string;
  onRewardReady: (event: any) => void;
  onRewardGranted?: (event: any) => void;
  onRewardClosed?: (event: any) => void;
};

export const RewardedAd = ({ adunit, onRewardReady, onRewardGranted, onRewardClosed }: Props) => {
  useEffect(() => {
    let cleanup = () => {};
    let googletag = window.googletag || { cmd: [] };
    googletag.cmd.push(() => {
      const slot = googletag
        .defineOutOfPageSlot(adunit, googletag.enums.OutOfPageFormat.REWARDED)
        .addService(googletag.pubads());

      const _onRwardReady = (event: any) => {
        event.slot === slot && onRewardReady?.(event);
      };
      const _onRewardGranted = (event: any) => {
        event.slot === slot && onRewardGranted?.(event);
      };
      const _onRewardClosed = (event: any) => {
        event.slot === slot && onRewardClosed?.(event);
      };

      googletag.pubads().addEventListener('rewardedSlotReady', _onRwardReady);
      googletag.pubads().addEventListener('rewardedSlotGranted', _onRewardGranted);
      googletag.pubads().addEventListener('rewardedSlotClosed', _onRewardClosed);
      googletag.enableServices();
      googletag.display(slot);

      cleanup = () => {
        googletag.pubads().removeEventListener('rewardedSlotReady', _onRwardReady);
        googletag.pubads().removeEventListener('rewardedSlotGranted', _onRewardGranted);
        googletag.pubads().removeEventListener('rewardedSlotClosed', _onRewardClosed);
        googletag.destroySlots([slot]);
      };
    });

    return () => {
      cleanup();
    };
  }, []);

  return <ins className="hidden"></ins>;
};
