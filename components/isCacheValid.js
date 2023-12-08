const EXPIRATION_DURATION = 30 * 1000; // 30 seconds

module.exports = function isCacheValid(cacheEntry) {
  return (
    cacheEntry &&
    cacheEntry.timestamp &&
    Date.now() - cacheEntry.timestamp < EXPIRATION_DURATION
  );
};
