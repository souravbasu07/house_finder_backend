import { createListing, deleteListing, getAllListings, getOwnListings, updateListing } from './listings.entity';
import { auth } from '../middlewares';

export default function listings() {
  this.route.post('/listings/create', auth, createListing(this));

  this.route.get('/listings', getAllListings(this));

  this.route.patch('/listings/:id', auth, updateListing(this));

  this.route.delete('/listings/:id', auth, deleteListing(this));

  this.route.get('/listings/myListings', auth, getOwnListings(this));
}