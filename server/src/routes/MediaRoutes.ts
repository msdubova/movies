// routes/MediaRoutes.ts

import { Router } from 'express';
import mediaController from '../controller/MediaController'; // Import the controller

const router = Router();

// Fetch all media items
router.get('/media', mediaController.getAllMedia);

// Fetch movies
router.get('/media/movies', mediaController.getMovies);

// Fetch TV shows
router.get('/media/tv', mediaController.getTVShows);

export default router;
