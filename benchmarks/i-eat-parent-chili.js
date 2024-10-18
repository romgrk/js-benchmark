
const opts = {
  showBadge: true,
  showPrice: true,
  showPriceDiscount: true,
  showPriceFull: true,
  showPriceMode: true,
  showPriceSize: true,
  showPriceMetric: true,
  showTitle: true,
  showDescription: true,
  showLogo: true,
  showRestaurantId: true,
  showImages: true
};

const generateOfferBadgeSimple = (opts, offer) => {
  let badge = '';
  if (opts.showBadge) {
    badge = offer.badge;
  }
  return badge;
};

const populateData = (searchEntries, excludeTags, terms) => {
  const se = (i) => ({
    isOpen: () => true,
    getOffers: () => [
      {
        id: i,
        title: 'title',
        description: 'description',
        tag: 'tag',
        metric_description: 'metric_description',
        size_info: 'size_info',
        full_price: 'full_price',
        mode: 'mode',
        price: 'price',
        logo: 'logo',
        restaurant_id: i,
        badge: 'badge',
        images: {
          menu: null,
          menu_bh: null
        }
      }
    ],
    getId: () => i
  });
  for (let i = 0; i < 10000; i++) {
    const seInstance = se(i);
    searchEntries.push(seInstance);
    excludeTags.push('tag' + i);
    terms.push('title' + i);
  }
};

const forEachWay = (searchEntries, excludeTags, terms, validOffers, validRestaurantsIds) => {
  searchEntries.forEach((se, sid) => {
    if (!se.isOpen()) {return;}
    const offers = se.getOffers([], excludeTags);
    offers.forEach((o) => {
      terms.forEach((t) => {
        if (o.titleSlug?.includes(t) || o.descriptionSlug?.includes(t)) {
          const offer = {
            id:o.id,
            title:o.title,
            description:o.description,
            tag:o.tag,
            metric_description:o.metric_description,
            size_info:o.size_info,
            full_price:o.full_price,
            mode:o.mode,
            price:o.price,
            logo:o.logo,
            restaurant_id: se.getId(),
            badge: generateOfferBadgeSimple(opts, o),
            images: {
              menu: null,
              menu_bh: null
            }
          };
          validOffers.push(offer);
          validRestaurantsIds.push(sid);
        }
      });
    });
  });
};

const forWay = (searchEntries, excludeTags, terms, validOffers, validRestaurantsIds) => {
  for (let sid = 0; sid < searchEntries.length; sid++) {
    const se = searchEntries[sid];
    if (!se.isOpen()) {
      continue;
    }
  
    const offers = se.getOffers([], excludeTags);
    for (let i = 0; i < offers.length; i++) {
      const o = offers[i];
      for (let j = 0; j < terms.length; j++) {
        const t = terms[j];
        if (o.titleSlug?.includes(t) || o.descriptionSlug?.includes(t)) {
          const offer = {
            id: o.id,
            title: o.title,
            description: o.description,
            tag: o.tag,
            metric_description: o.metric_description,
            size_info: o.size_info,
            full_price: o.full_price,
            mode: o.mode,
            price: o.price,
            logo: o.logo,
            restaurant_id: se.getId(),
            badge: generateOfferBadgeSimple(opts, o),
            images: {
              menu: null,
              menu_bh: null
            }
          };
          validOffers.push(offer);
          validRestaurantsIds.push(sid);
        }
      }
    }
  }
};


const iterations = 1

export default {
  blocks: [
    {
      id: 'forEachWay',
      setup: () => {
        let searchEntries = [];
        let excludeTags = [];
        let terms = [];
        const validOffers = [];
        const validRestaurantsIds = [];
        populateData(searchEntries, excludeTags, terms)

        return () => {
          let result = 0
          for (let i = 0; i < iterations; i++) {
            forEachWay(searchEntries, excludeTags, terms, validOffers, validRestaurantsIds);
          }
          return result
        }
      }
    },
    {
      id: 'forWay',
      setup: () => {
        let searchEntries = [];
        let excludeTags = [];
        let terms = [];
        const validOffers = [];
        const validRestaurantsIds = [];
        populateData(searchEntries, excludeTags, terms)

        return () => {
          let result = 0
          for (let i = 0; i < iterations; i++) {
            forWay(searchEntries, excludeTags, terms, validOffers, validRestaurantsIds);
          }
          return result
        }
      }
    },
  ]
}
