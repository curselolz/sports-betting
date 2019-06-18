export default {
    fetchLobby: ({ host }) => (
        `${host}/api/instant/v2/events.json`
    ),

    // url for redirects
    redirect: {
        example: ({ poolKey, delta }) => {
            const secureHost = typeof window !== 'undefined' ? window.dkConfig?.secureDepositUrl : null;
            const redirectUrl = encodeURIComponent(`/pools/pick-pool/${poolKey}`);
            const overriddenCost = delta > 200 ? `&overriddenCost=${delta}` : '';
            const isSportsBook = typeof window !== 'undefined' && window.__productConfig?.activeSite === 'sportsbook';
            const redirectSource = isSportsBook ? '&entrySource=SportsBook' : null;
            return `${secureHost}?depositRedirectUrl=${redirectUrl}${overriddenCost}${redirectSource}`;
        },
    },
};
