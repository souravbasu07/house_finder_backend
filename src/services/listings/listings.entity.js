import Listing from './listings.schema';

const createAllowed = new Set(['owner', 'propertyFor', 'propertyType', 'propertyArea', 'description', 'minCost', 'maxCost', 'bedrooms', 'bathrooms', 'attachments', 'amenities']);

export const createListing = ({ db }) => async (req, res) => {
  console.log(req.body);
  try {
    const valid = Object.keys(req.body).every(k => createAllowed.has(k));
    if (!valid) return res.status(400).send('Bad request');

    db.create({ table: Listing, key: { ...req.body } })
      .then(async listing => {
        console.log(listing);
        await db.save(listing);
        res.status(200).send(listing);
      })
      .catch(({ message }) => res.status(400).send({ message }));
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong!');
  }
};

export const getAllListings = ({ db }) => async (req, res) => {
  try {
    const listings = await db.find({
      table: Listing, key: {
        populate: { path: 'owner', select: 'fullname' },
        paginate: false,
      }
    });
    res.status(200).send(listings);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong');
  }
};

export const getOwnListings = ({ db }) => async (req, res) => {
  console.log(req.user.id);
  try {
    const listings = await db.find({
      table: Listing, key: {
        allowedQuery: new Set(['_id', 'owner', 'email', 'page']),
        // paginate: req.query.paginate === 'true',
        paginate: false,
        query: { owner: req.user.id }
      }
    });
    res.status(200).send(listings);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong');
  }
};

export const updateListing = ({ db }) => async (req, res) => {
  try {
    const listing = await db.findOne({ table: Listing, key: { id: req.params.id } });
    if (!listing) return res.status(400).send('Listing not found');

    Object.keys(req.body).forEach(k => listing[k] = req.body[k]);

    await db.save(listing);
    res.status(200).send(listing);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong');
  }
};

export const deleteListing = ({ db }) => async (req, res) => {
  try {
    const { id } = req.params;
    const listing = db.remove({ table: Listing, key: { id } });

    if (!listing) return res.status(404).send('Listing not found');

    res.status(200).send('Deleted successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong!');
  }
};