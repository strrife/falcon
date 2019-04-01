const { SchemaDirectiveVisitor } = require('graphql-tools');

class CustomerRequired extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve: defaultFieldResolver } = field;
    field.resolve = async (...args) => {
      const context = args[2];
      // TODO: use the actual API name instead of "magento2"
      const session = context.dataSources.magento2.session || {};
      const { customerToken = {} } = session;
      if (!customerToken.token) {
        throw new Error(`Customer token required to read "${field.name}" data`);
      }
      return defaultFieldResolver.apply(this, args);
    };
  }
}

module.exports = {
  customerRequired: CustomerRequired
};
