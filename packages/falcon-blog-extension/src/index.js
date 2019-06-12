/**
 * Blog Extension
 */
module.exports = () => ({
  resolvers: {
    BackendConfig: {
      // Returning an empty object to make BlogConfig resolvers work
      blog: () => ({})
    }
  }
});
