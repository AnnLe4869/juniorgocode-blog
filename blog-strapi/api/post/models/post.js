"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

const slugify = require("slugify");

module.exports = {
  /**
   * Triggered before user creation.
   */
  lifecycles: {
    async beforeCreate(data) {
      if (data.title) {
        // Automatically create slug from the title
        data.slug = slugify(data.title, { lower: true });
        /**
         * TODO: Adding http://localhost:1337 when we use media (i.e image, etc.)
         * As of for now, the rich text use relative path to the media, which won't work when we use API endpoint
         * We need to use ABSOLUTE PATH for media saved on Strapi
         */
      }
    },
    async beforeUpdate(params, data) {
      if (data.title) {
        // Automatically create slug from the title
        data.slug = slugify(data.title, { lower: true });
      }
    },
  },
};
